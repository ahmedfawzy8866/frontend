import { startTransition, useDeferredValue, useEffect, useEffectEvent, useMemo, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'handoff_requested', label: 'Human handoff' },
  { value: 'archived', label: 'Archived' }
];

const PRIORITY_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'priority', label: 'Priority' },
  { value: 'vip', label: 'VIP' }
];

const statusCopy = {
  active: 'Active',
  qualified: 'Qualified',
  handoff_requested: 'Human handoff',
  archived: 'Archived'
};

function getInitialQueryValue(name, fallback = '') {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return new URLSearchParams(window.location.search).get(name) || fallback;
}

function getLeadTitle(lead) {
  return lead.name || lead.firstName || lead.username || `Lead ${lead.chatId}`;
}

function getLeadSummary(lead) {
  const fragments = [
    lead.profile?.purpose?.en || lead.profile?.purpose?.ar,
    lead.profile?.location,
    lead.profile?.budget?.en || lead.profile?.budget?.ar
  ].filter(Boolean);

  return fragments.length > 0 ? fragments.join(' · ') : 'Qualification still in progress';
}

function getLeadCompletion(lead) {
  const fields = [
    lead.name,
    lead.profile?.purpose,
    lead.profile?.propertyType,
    lead.profile?.location,
    lead.profile?.budget,
    lead.profile?.bedrooms,
    lead.profile?.timeline,
    lead.profile?.phone
  ];
  const completedFields = fields.filter(Boolean).length;

  return Math.round((completedFields / fields.length) * 100);
}

function formatDateTime(value) {
  if (!value) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

function formatRelativeTime(value) {
  if (!value) {
    return 'No activity yet';
  }

  const elapsed = new Date(value).getTime() - Date.now();
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const minutes = Math.round(elapsed / 60000);

  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, 'minute');
  }

  const hours = Math.round(minutes / 60);

  if (Math.abs(hours) < 24) {
    return formatter.format(hours, 'hour');
  }

  const days = Math.round(hours / 24);
  return formatter.format(days, 'day');
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.error || 'Request failed.');
  }

  return body;
}

function StatStrip({ stats, env }) {
  const statusEntries = Object.entries(stats?.statuses || {});
  const channelEntries = Object.entries(stats?.channels || {});

  return (
    <section className="stat-strip" aria-label="Lead overview">
      <div>
        <span className="eyebrow">Lead pipeline</span>
        <strong>{stats?.total || 0}</strong>
        <span>Total records</span>
      </div>
      <div>
        <span className="eyebrow">Qualified</span>
        <strong>{stats?.completed || 0}</strong>
        <span>Reached full intake</span>
      </div>
      <div>
        <span className="eyebrow">Human handoff</span>
        <strong>{stats?.handoffRequested || 0}</strong>
        <span>Need advisor follow-up</span>
      </div>
      <div>
        <span className="eyebrow">Storage</span>
        <strong>{env?.leadStorage === 'firestore' ? 'Firestore' : 'Runtime file'}</strong>
        <span>Current persistence mode</span>
      </div>
      <div className="stat-strip-detail">
        <span className="eyebrow">Status mix</span>
        <p>{statusEntries.length > 0 ? statusEntries.map(([key, count]) => `${statusCopy[key] || key}: ${count}`).join(' · ') : 'No leads yet'}</p>
        <p>{channelEntries.length > 0 ? channelEntries.map(([key, count]) => `${key}: ${count}`).join(' · ') : 'No channel activity yet'}</p>
      </div>
    </section>
  );
}

function LeadList({ leads, selectedLeadId, onSelect }) {
  return (
    <section className="panel directory" aria-label="Lead directory">
      <div className="panel-header">
        <div>
          <span className="eyebrow">Directory</span>
          <h2>Lead inbox</h2>
        </div>
        <p>Sorted by freshest activity so advisors can move fast.</p>
      </div>

      <div className="lead-list">
        {leads.length === 0 ? (
          <div className="empty-state">
            <p>No leads match the current filter.</p>
          </div>
        ) : null}

        {leads.map(lead => {
          const isSelected = lead.chatId === selectedLeadId;

          return (
            <button
              key={lead.chatId}
              type="button"
              className={`lead-row ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(lead.chatId)}
            >
              <div className="lead-row-main">
                <div>
                  <strong>{getLeadTitle(lead)}</strong>
                  <p>{getLeadSummary(lead)}</p>
                </div>
                <span className={`status-pill status-${lead.status}`}>{statusCopy[lead.status] || lead.status}</span>
              </div>
              <div className="lead-row-meta">
                <span>{lead.channel || 'unknown'}</span>
                <span>{getLeadCompletion(lead)}% complete</span>
                <span>{formatRelativeTime(lead.updatedAt)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function LeadProfile({ lead }) {
  const profileRows = [
    ['Purpose', lead.profile?.purpose?.en || lead.profile?.purpose?.ar || 'Pending'],
    ['Property type', lead.profile?.propertyType?.en || lead.profile?.propertyType?.ar || 'Pending'],
    ['Location', lead.profile?.location || 'Pending'],
    ['Budget', lead.profile?.budget?.en || lead.profile?.budget?.ar || 'Pending'],
    ['Bedrooms', lead.profile?.bedrooms?.en || lead.profile?.bedrooms?.ar || 'Pending'],
    ['Decision time', lead.profile?.timeline?.en || lead.profile?.timeline?.ar || 'Pending'],
    ['Phone', lead.profile?.phone || 'Pending']
  ];

  return (
    <div className="detail-grid">
      {profileRows.map(([label, value]) => (
        <div key={label} className="detail-cell">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function UpdateFeed({ updates }) {
  return (
    <section className="panel updates-panel" aria-label="Recent updates">
      <div className="panel-header">
        <div>
          <span className="eyebrow">Live feed</span>
          <h2>Recent Telegram events</h2>
        </div>
        <p>Useful when an operator wants quick context before opening a thread.</p>
      </div>

      <div className="update-feed">
        {updates.length === 0 ? (
          <div className="empty-state">
            <p>No inbound updates captured yet.</p>
          </div>
        ) : null}

        {updates.map(update => (
          <article key={`${update.updateId}-${update.receivedAt}`} className="update-row">
            <div>
              <strong>{update.firstName || update.username || `Chat ${update.chatId}`}</strong>
              <p>{update.text || 'Non-text update received'}</p>
            </div>
            <span>{formatRelativeTime(update.receivedAt)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function LeadDetail({
  lead,
  noteDraft,
  onNoteDraftChange,
  onNoteSubmit,
  onFieldChange,
  saveState
}) {
  if (!lead) {
    return (
      <section className="panel detail-panel">
        <div className="empty-state">
          <p>Select a lead to see the full profile and advisor controls.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel detail-panel" aria-label="Lead detail">
      <div className="panel-header">
        <div>
          <span className="eyebrow">Lead detail</span>
          <h2>{getLeadTitle(lead)}</h2>
        </div>
        <p>Updated {formatDateTime(lead.updatedAt)}</p>
      </div>

      <div className="detail-hero">
        <div>
          <span className="detail-label">Conversation stage</span>
          <strong>{lead.stage.replaceAll('_', ' ')}</strong>
        </div>
        <div>
          <span className="detail-label">Progress</span>
          <strong>{getLeadCompletion(lead)}%</strong>
        </div>
        <div>
          <span className="detail-label">Language</span>
          <strong>{lead.preferredLanguage}</strong>
        </div>
      </div>

      <div className="controls-grid">
        <label>
          <span>Status</span>
          <select
            name="leadStatus"
            value={lead.status}
            onChange={event => onFieldChange({ status: event.target.value })}
          >
            {STATUS_OPTIONS.filter(option => option.value !== 'all').map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select
            name="leadPriority"
            value={lead.priority}
            onChange={event => onFieldChange({ priority: event.target.value })}
          >
            {PRIORITY_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Assigned advisor</span>
          <input
            autoComplete="off"
            name="assignedAdvisor"
            type="text"
            defaultValue={lead.assignedAdvisor || ''}
            placeholder="Enter owner name…"
            onBlur={event => onFieldChange({ assignedAdvisor: event.target.value })}
          />
        </label>
      </div>

      <LeadProfile lead={lead} />

      <section className="notes-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Advisor notes</span>
            <h3>Internal handoff context</h3>
          </div>
          <span aria-live="polite" className={`save-state ${saveState}`}>
            {saveState === 'saving' ? 'Saving changes…' : saveState === 'saved' ? 'Changes synced' : 'Ready'}
          </span>
        </div>

        <div className="note-log">
          {lead.notes?.length ? (
            lead.notes
              .slice()
              .reverse()
              .map(note => (
                <article key={note.id} className="note-row">
                  <div>
                    <strong>{note.author}</strong>
                    <p>{note.text}</p>
                  </div>
                  <span>{formatRelativeTime(note.createdAt)}</span>
                </article>
              ))
          ) : (
            <div className="empty-state">
              <p>No internal notes yet.</p>
            </div>
          )}
        </div>

        <form className="note-form" onSubmit={onNoteSubmit}>
          <label className="sr-only" htmlFor="advisor-note">
            Add advisor note
          </label>
          <textarea
            id="advisor-note"
            name="advisorNote"
            value={noteDraft}
            onChange={event => onNoteDraftChange(event.target.value)}
            placeholder="Add the next-step note, viewing schedule, or advisor context…"
            rows={4}
          />
          <button disabled={saveState === 'saving' || !noteDraft.trim()} type="submit">
            {saveState === 'saving' ? 'Saving Note…' : 'Add Note'}
          </button>
        </form>
      </section>
    </section>
  );
}

export default function App() {
  const [dashboard, setDashboard] = useState({
    env: null,
    leads: [],
    recentUpdates: [],
    stats: null
  });
  const [selectedLeadId, setSelectedLeadId] = useState(() => getInitialQueryValue('lead') || null);
  const [statusFilter, setStatusFilter] = useState(() => getInitialQueryValue('status', 'all'));
  const [search, setSearch] = useState(() => getInitialQueryValue('q'));
  const [noteDraft, setNoteDraft] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saveState, setSaveState] = useState('idle');
  const deferredSearch = useDeferredValue(search);

  const loadDashboard = useEffectEvent(async ({ preserveSelection = true, silent = false } = {}) => {
    try {
      if (!silent) {
        setErrorMessage('');
      }

      const nextDashboard = await requestJson('/api/dashboard');

      setDashboard(nextDashboard);
      setSelectedLeadId(currentSelectedLeadId => {
        if (preserveSelection && currentSelectedLeadId && nextDashboard.leads.some(lead => lead.chatId === currentSelectedLeadId)) {
          return currentSelectedLeadId;
        }

        return nextDashboard.leads[0]?.chatId || null;
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  });

  useEffect(() => {
    void loadDashboard({ preserveSelection: false });

    const intervalId = window.setInterval(() => {
      void loadDashboard({ preserveSelection: true, silent: true });
    }, 20000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadDashboard]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    if (search.trim()) {
      queryParams.set('q', search.trim());
    } else {
      queryParams.delete('q');
    }

    if (statusFilter !== 'all') {
      queryParams.set('status', statusFilter);
    } else {
      queryParams.delete('status');
    }

    if (selectedLeadId) {
      queryParams.set('lead', String(selectedLeadId));
    } else {
      queryParams.delete('lead');
    }

    const nextSearch = queryParams.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`;
    window.history.replaceState({}, '', nextUrl);
  }, [search, selectedLeadId, statusFilter]);

  const filteredLeads = useMemo(() => {
    const normalizedQuery = deferredSearch.trim().toLowerCase();

    return dashboard.leads.filter(lead => {
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        getLeadTitle(lead),
        lead.profile?.location,
        lead.profile?.purpose?.en,
        lead.profile?.purpose?.ar,
        lead.profile?.propertyType?.en,
        lead.profile?.propertyType?.ar,
        lead.profile?.phone,
        lead.username
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [dashboard.leads, deferredSearch, statusFilter]);

  const selectedLead =
    dashboard.leads.find(lead => lead.chatId === selectedLeadId) ||
    filteredLeads[0] ||
    null;

  async function persistLeadUpdate(updates) {
    if (!selectedLead) {
      return;
    }

    try {
      setSaveState('saving');
      setErrorMessage('');
      const response = await requestJson(`/api/leads/${encodeURIComponent(selectedLead.chatId)}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });

      setDashboard(currentDashboard => ({
        ...currentDashboard,
        leads: currentDashboard.leads.map(lead => {
          return lead.chatId === response.lead.chatId ? response.lead : lead;
        })
      }));
      setSaveState('saved');
    } catch (error) {
      setErrorMessage(error.message);
      setSaveState('idle');
    }
  }

  async function handleNoteSubmit(event) {
    event.preventDefault();

    if (!selectedLead || !noteDraft.trim()) {
      return;
    }

    try {
      setSaveState('saving');
      setErrorMessage('');
      const response = await requestJson(`/api/leads/${encodeURIComponent(selectedLead.chatId)}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          text: noteDraft,
          author: 'dashboard'
        })
      });

      setDashboard(currentDashboard => ({
        ...currentDashboard,
        leads: currentDashboard.leads.map(lead => {
          return lead.chatId === response.lead.chatId ? response.lead : lead;
        })
      }));
      setNoteDraft('');
      setSaveState('saved');
    } catch (error) {
      setErrorMessage(error.message);
      setSaveState('idle');
    }
  }

  return (
    <div className="shell">
      <header className="hero">
        <div>
          <span className="hero-kicker">Sierra AI Realty</span>
          <h1>Lead operations for high-intent property conversations.</h1>
        </div>
        <div className="hero-meta">
          <p>Review incoming Telegram and WhatsApp traffic, move qualified leads to advisors, and keep every handoff visible.</p>
          <div className="toolbar">
            <label className="toolbar-search">
              <span className="sr-only">Search leads</span>
              <input
                aria-label="Search leads"
                autoComplete="off"
                name="leadSearch"
                spellCheck={false}
                type="search"
                placeholder="Search by name, place, phone, or property type…"
                value={search}
                onChange={event => {
                  const nextValue = event.target.value;
                  startTransition(() => {
                    setSearch(nextValue);
                  });
                }}
              />
            </label>

            <label className="toolbar-filter">
              <span className="sr-only">Filter by status</span>
              <select
                aria-label="Filter leads by status"
                name="statusFilter"
                value={statusFilter}
                onChange={event => {
                  const nextValue = event.target.value;
                  startTransition(() => {
                    setStatusFilter(nextValue);
                  });
                }}
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <StatStrip stats={dashboard.stats} env={dashboard.env} />

      {errorMessage ? (
        <div aria-live="polite" className="error-banner" role="alert">
          {errorMessage}
        </div>
      ) : null}

      <main className="workspace">
        <div className="workspace-left">
          <LeadList leads={filteredLeads} selectedLeadId={selectedLead?.chatId} onSelect={setSelectedLeadId} />
          <UpdateFeed updates={dashboard.recentUpdates || []} />
        </div>

        <LeadDetail
          lead={selectedLead}
          noteDraft={noteDraft}
          onNoteDraftChange={setNoteDraft}
          onNoteSubmit={handleNoteSubmit}
          onFieldChange={persistLeadUpdate}
          saveState={saveState}
        />
      </main>
    </div>
  );
}
