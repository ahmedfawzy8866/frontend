// Smart Context Switcher JavaScript
(function() {
    const vscode = acquireVsCodeApi();

    // Initialize the interface
    document.addEventListener('DOMContentLoaded', function() {
        initializeEventListeners();
        loadContextData();
    });

    function initializeEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'b':
                        e.preventDefault();
                        createBookmark();
                        break;
                    case 'm':
                        e.preventDefault();
                        addMeetingNotes();
                        break;
                    case 'f':
                        e.preventDefault();
                        findReferences();
                        break;
                    case 's':
                        e.preventDefault();
                        captureState();
                        break;
                }
            }
        });

        // Auto-refresh every 30 seconds
        setInterval(() => {
            refreshContextData();
        }, 30000);
    }

    function loadContextData() {
        // Request latest context data from extension
        vscode.postMessage({
            type: 'requestContextUpdate'
        });
    }

    function refreshContextData() {
        vscode.postMessage({
            type: 'refreshContext'
        });
    }

    // Global functions for HTML onclick handlers
    window.switchContext = function(workspacePath) {
        vscode.postMessage({
            type: 'switchContext',
            workspacePath: workspacePath
        });
        
        // Show loading indicator
        showLoadingIndicator('Switching context...');
    };

    window.createBookmark = function() {
        const title = prompt('Enter bookmark title:');
        if (!title) return;
        
        const description = prompt('Enter bookmark description (optional):');
        
        vscode.postMessage({
            type: 'createBookmark',
            title: title,
            description: description || ''
        });
    };

    window.navigateToBookmark = function(bookmarkId) {
        vscode.postMessage({
            type: 'navigateToBookmark',
            bookmarkId: bookmarkId
        });
    };

    window.addMeetingNotes = function() {
        showMeetingNotesDialog();
    };

    window.exportContext = function() {
        const contextId = getCurrentContextId();
        if (!contextId) {
            showNotification('No active context to export', 'warning');
            return;
        }
        
        vscode.postMessage({
            type: 'exportContext',
            contextId: contextId
        });
    };

    window.importContext = function() {
        vscode.postMessage({
            type: 'importContext'
        });
    };

    window.captureState = function() {
        vscode.postMessage({
            type: 'captureState'
        });
        
        showNotification('Context state captured', 'success');
    };

    window.findReferences = function() {
        const query = prompt('Enter search query for cross-project references:');
        if (!query) return;
        
        vscode.postMessage({
            type: 'findReferences',
            query: query
        });
        
        showLoadingIndicator('Searching references...');
    };

    window.showTimeTracking = function() {
        vscode.postMessage({
            type: 'showTimeTracking'
        });
    };

    function showMeetingNotesDialog() {
        // Create a simple dialog for meeting notes
        const dialog = document.createElement('div');
        dialog.className = 'meeting-dialog';
        dialog.innerHTML = `
            <div class="dialog-overlay">
                <div class="dialog-content">
                    <h3>Add Meeting Notes</h3>
                    <div class="form-group">
                        <label for="meeting-title">Title:</label>
                        <input type="text" id="meeting-title" placeholder="Meeting title">
                    </div>
                    <div class="form-group">
                        <label for="meeting-participants">Participants (comma-separated):</label>
                        <input type="text" id="meeting-participants" placeholder="John, Jane, Bob">
                    </div>
                    <div class="form-group">
                        <label for="meeting-content">Notes:</label>
                        <textarea id="meeting-content" rows="6" placeholder="Meeting notes and discussion points..."></textarea>
                    </div>
                    <div class="dialog-actions">
                        <button onclick="saveMeetingNotes()" class="btn-primary">Save</button>
                        <button onclick="closeMeetingDialog()" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        document.getElementById('meeting-title').focus();
    }

    window.saveMeetingNotes = function() {
        const title = document.getElementById('meeting-title').value;
        const participantsStr = document.getElementById('meeting-participants').value;
        const content = document.getElementById('meeting-content').value;
        
        if (!title || !content) {
            showNotification('Title and content are required', 'error');
            return;
        }
        
        const participants = participantsStr.split(',').map(p => p.trim()).filter(p => p);
        
        vscode.postMessage({
            type: 'addMeetingNotes',
            title: title,
            content: content,
            participants: participants
        });
        
        closeMeetingDialog();
    };

    window.closeMeetingDialog = function() {
        const dialog = document.querySelector('.meeting-dialog');
        if (dialog) {
            dialog.remove();
        }
    };

    function getCurrentContextId() {
        // Extract context ID from the current context display
        const contextElement = document.querySelector('.current-context .context-name');
        return contextElement ? contextElement.dataset.contextId : null;
    }

    function showLoadingIndicator(message) {
        const indicator = document.createElement('div');
        indicator.className = 'loading-indicator';
        indicator.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(indicator);
        
        // Remove after 3 seconds
        setTimeout(() => {
            indicator.remove();
        }, 3000);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" class="close-btn">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Handle messages from extension
    window.addEventListener('message', event => {
        const message = event.data;
        
        switch (message.type) {
            case 'contextSwitched':
                handleContextSwitched(message.context);
                break;
            case 'bookmarkCreated':
                showNotification(`Bookmark created: ${message.bookmark.title}`, 'success');
                break;
            case 'referencesFound':
                handleReferencesFound(message.references);
                break;
            case 'contextUpdated':
                updateContextDisplay(message.context);
                break;
            case 'error':
                showNotification(message.message, 'error');
                break;
            case 'success':
                showNotification(message.message, 'success');
                break;
        }
    });

    function handleContextSwitched(context) {
        // Remove loading indicator
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        showNotification(`Switched to ${context.name}`, 'success');
        
        // Refresh the entire view
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    function handleReferencesFound(references) {
        // Remove loading indicator
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        if (references.length === 0) {
            showNotification('No cross-project references found', 'info');
        } else {
            showNotification(`Found ${references.length} cross-project references`, 'success');
        }
    }

    function updateContextDisplay(context) {
        // Update specific parts of the UI without full reload
        updateCurrentContextInfo(context);
        updateBookmarksList(context.bookmarks);
        updateActivitiesList(context.activities);
    }

    function updateCurrentContextInfo(context) {
        const contextNameElement = document.querySelector('.context-name');
        if (contextNameElement) {
            contextNameElement.textContent = context.name;
            contextNameElement.dataset.contextId = context.id;
        }
        
        const workingOnElement = document.querySelector('.ai-memory .memory-item');
        if (workingOnElement && context.aiMemory.workingOn) {
            workingOnElement.innerHTML = `<strong>Working on:</strong> ${context.aiMemory.workingOn}`;
        }
    }

    function updateBookmarksList(bookmarks) {
        const bookmarksList = document.querySelector('.bookmarks-list');
        if (!bookmarksList || !bookmarks) return;
        
        // Update bookmark count indicators
        bookmarks.forEach(bookmark => {
            const bookmarkElement = document.querySelector(`[onclick="navigateToBookmark('${bookmark.id}')"]`);
            if (bookmarkElement) {
                const countElement = bookmarkElement.querySelector('.bookmark-count');
                if (countElement) {
                    countElement.textContent = bookmark.accessCount;
                }
            }
        });
    }

    function updateActivitiesList(activities) {
        // Update activities display if needed
        // This could be enhanced to show real-time activity updates
    }

    // Utility functions
    function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }

    function formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }

    // Add CSS for dialogs and notifications
    const style = document.createElement('style');
    style.textContent = `
        .meeting-dialog {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
        }
        
        .dialog-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .dialog-content {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 6px;
            padding: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .dialog-content h3 {
            margin: 0 0 15px 0;
            color: var(--vscode-foreground);
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 12px;
            color: var(--vscode-foreground);
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 3px;
            padding: 8px;
            font-family: var(--vscode-font-family);
            font-size: 13px;
            box-sizing: border-box;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--vscode-focusBorder);
        }
        
        .dialog-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
        }
        
        .loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .loading-content {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 6px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--vscode-foreground);
        }
        
        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid var(--vscode-descriptionForeground);
            border-top: 2px solid var(--vscode-focusBorder);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-info {
            background: var(--vscode-inputValidation-infoBackground);
            border-left: 3px solid var(--vscode-inputValidation-infoBorder);
            color: var(--vscode-inputValidation-infoForeground);
        }
        
        .notification-success {
            background: var(--vscode-inputValidation-infoBackground);
            border-left: 3px solid var(--vscode-charts-green);
            color: var(--vscode-foreground);
        }
        
        .notification-warning {
            background: var(--vscode-inputValidation-warningBackground);
            border-left: 3px solid var(--vscode-inputValidation-warningBorder);
            color: var(--vscode-inputValidation-warningForeground);
        }
        
        .notification-error {
            background: var(--vscode-inputValidation-errorBackground);
            border-left: 3px solid var(--vscode-inputValidation-errorBorder);
            color: var(--vscode-inputValidation-errorForeground);
        }
        
        .close-btn {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            margin-left: auto;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

})();
