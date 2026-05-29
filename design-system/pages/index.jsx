import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProperty, setActiveProperty] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties?category=for-sale&location=dubai&limit=4');
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || getMockProperties());
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setProperties(getMockProperties());
    } finally {
      setLoading(false);
    }
  };

  const getMockProperties = () => [
    {
      id: 1,
      title: 'Luxury Villa - Mivida',
      price: 28500000,
      currency: 'EGP',
      bedrooms: 5,
      bathrooms: 6,
      area: 420,
      location: 'Fifth Settlement, New Cairo',
      image: 'https://picsum.photos/400/300?random=1',
      featured: true,
    },
    {
      id: 2,
      title: 'Modern Townhouse - Eastown',
      price: 19000000,
      currency: 'EGP',
      bedrooms: 4,
      bathrooms: 4,
      area: 310,
      location: 'Eastown, New Cairo',
      image: 'https://picsum.photos/400/300?random=2',
      featured: true,
    },
    {
      id: 3,
      title: 'Premium Apartment - El Rehab',
      price: 14200000,
      currency: 'EGP',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      location: 'El Rehab City, New Cairo',
      image: 'https://picsum.photos/400/300?random=3',
      featured: true,
    },
    {
      id: 4,
      title: 'Penthouse - Urban Area',
      price: 1600,
      currency: 'USD',
      bedrooms: 3,
      bathrooms: 2,
      area: 195,
      location: 'New Cairo',
      image: 'https://picsum.photos/400/300?random=4',
      featured: true,
    },
  ];

  const formatPrice = (price, currency) => {
    if (currency === 'USD') {
      return `USD ${price.toLocaleString()}`;
    }
    return `EGP ${price.toLocaleString()}`;
  };

  return (
    <div style={styles.page}>
      <style>{styles.css}</style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          {/* Left: Property Cards */}
          <div style={styles.heroProperties}>
            <div style={styles.heroBadge}>Featured in New Cairo</div>
            <h1 style={styles.heroTitle}>Discover Your Next Investment</h1>
            <p style={styles.heroSubtitle}>
              AI-matched luxury properties curated by 1,500+ elite brokers. Real-time market intelligence, zero compromises.
            </p>

            {loading ? (
              <div style={styles.loading}>Loading properties...</div>
            ) : error ? (
              <div style={styles.error}>Error: {error}</div>
            ) : (
              <div style={styles.propertyShowcase}>
                {properties.map((prop, idx) => (
                  <div
                    key={prop.id}
                    style={{
                      ...styles.propertyCard,
                      ...(activeProperty === idx && styles.propertyCardActive),
                    }}
                    onClick={() => setActiveProperty(idx)}
                  >
                    <div style={styles.propertyImage}>
                      <img src={prop.image} alt={prop.title} style={styles.propertyImg} />
                    </div>
                    <div style={styles.propertyInfo}>
                      <div>
                        <div style={styles.propertyPrice}>
                          {formatPrice(prop.price, prop.currency)}
                        </div>
                        <div style={styles.propertyName}>{prop.title}</div>
                      </div>
                      <div style={styles.propertySpecs}>
                        {prop.bedrooms} Beds • {prop.bathrooms} Baths • {prop.area} M²
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.heroCta}>
              <button style={styles.btnPrimary}>Explore Listings</button>
              <button style={styles.btnSecondary}>Book Consultation</button>
            </div>
          </div>

          {/* Right: Interactive Map */}
          <div style={styles.heroMap}>
            <div style={styles.mapLabel}>📍 New Cairo Market Grid</div>
            <div style={styles.mapGrid}>
              {Array.from({ length: 36 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.mapPin,
                    ...(idx === activeProperty && styles.mapPinActive),
                  }}
                  onClick={() => setActiveProperty(idx % properties.length)}
                >
                  {idx < properties.length && properties[idx]?.title?.split('-')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section style={styles.valueProps}>
        <div style={styles.valuePropCard}>
          <h3 style={styles.valueTitle}>25,916</h3>
          <p style={styles.valueText}>Premium properties across New Cairo, curated by 1,500+ elite brokers</p>
        </div>
        <div style={styles.valuePropCard}>
          <h3 style={styles.valueTitle}>AI-Driven</h3>
          <p style={styles.valueText}>Deterministic intelligence matching your exact requirements in real-time</p>
        </div>
        <div style={styles.valuePropCard}>
          <h3 style={styles.valueTitle}>Exclusive</h3>
          <p style={styles.valueText}>Access to off-market opportunities reserved for verified high-net-worth investors</p>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section style={styles.featured}>
        <h2 style={styles.sectionTitle}>Featured Properties</h2>
        <p style={styles.sectionSubtitle}>This month's most curated acquisitions</p>
        <div style={styles.listingsGrid}>
          {properties.slice(0, 4).map((prop) => (
            <div key={prop.id} style={styles.listingCard}>
              <div style={styles.listingImage}>
                <img src={prop.image} alt={prop.title} style={styles.listingImg} />
              </div>
              <div style={styles.listingContent}>
                <div style={styles.listingPrice}>{formatPrice(prop.price, prop.currency)}</div>
                <div style={styles.listingTitle}>{prop.title}</div>
                <div style={styles.listingLocation}>{prop.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Begin Your Search</h2>
        <p style={styles.ctaText}>Join 847 verified investors who have found their ideal property through Sierra Estates intelligence.</p>
        <button style={styles.btnPrimary}>Get Started Today</button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <h4 style={styles.footerTitle}>Product</h4>
          <a href="#" style={styles.footerLink}>Discover</a>
          <a href="#" style={styles.footerLink}>Intelligence</a>
          <a href="#" style={styles.footerLink}>Market Insights</a>
        </div>
        <div>
          <h4 style={styles.footerTitle}>Company</h4>
          <a href="#" style={styles.footerLink}>About</a>
          <a href="#" style={styles.footerLink}>Blog</a>
          <a href="#" style={styles.footerLink}>Careers</a>
        </div>
        <div>
          <h4 style={styles.footerTitle}>Legal</h4>
          <a href="#" style={styles.footerLink}>Privacy</a>
          <a href="#" style={styles.footerLink}>Terms</a>
          <a href="#" style={styles.footerLink}>Contact</a>
        </div>
        <div>
          <h4 style={styles.footerTitle}>Social</h4>
          <a href="#" style={styles.footerLink}>LinkedIn</a>
          <a href="#" style={styles.footerLink}>Twitter</a>
          <a href="#" style={styles.footerLink}>Instagram</a>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  css: `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0A1628; color: #F4F0E8; font-family: 'Inter', sans-serif; }
    a { color: #2B5A9E; text-decoration: none; }
    a:hover { color: #4A7BC4; }
  `,
  page: {
    background: '#0A1628',
    color: '#F4F0E8',
    fontFamily: '"Inter", sans-serif',
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    borderBottom: '1px solid rgba(43, 90, 158, 0.15)',
    background: 'linear-gradient(135deg, #0A1628 0%, #142850 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    maxWidth: '1400px',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
  },
  heroProperties: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(30, 139, 122, 0.2)',
    color: '#1E8B7A',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '16px',
    width: 'fit-content',
  },
  heroTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '3.2rem',
    lineHeight: '1.15',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#F4F0E8',
  },
  heroSubtitle: {
    fontSize: '1rem',
    color: 'rgba(244, 240, 232, 0.8)',
    marginBottom: '32px',
    maxWidth: '500px',
    lineHeight: '1.6',
  },
  propertyShowcase: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  propertyCard: {
    background: 'rgba(20, 40, 80, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 300ms cubic-bezier(0.25, 1, 0.5, 1)',
    display: 'flex',
    flexDirection: 'column',
  },
  propertyCardActive: {
    borderColor: '#2B5A9E',
    background: 'rgba(43, 90, 158, 0.15)',
    boxShadow: '0 12px 40px rgba(43, 90, 158, 0.3)',
  },
  propertyImage: {
    width: '100%',
    height: '120px',
    background: 'linear-gradient(135deg, #2B5A9E, #4A7BC4)',
    overflow: 'hidden',
  },
  propertyImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  propertyInfo: {
    padding: '14px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  propertyPrice: {
    fontFamily: '"Courier New", monospace',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4A7BC4',
    marginBottom: '4px',
  },
  propertyName: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '2px',
  },
  propertySpecs: {
    fontSize: '10px',
    color: 'rgba(244, 240, 232, 0.6)',
  },
  heroMap: {
    width: '100%',
    height: '500px',
    background: 'linear-gradient(135deg, rgba(43, 90, 158, 0.1), rgba(43, 90, 158, 0.05))',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  mapLabel: {
    position: 'absolute',
    top: '16px',
    left: '20px',
    fontSize: '11px',
    color: 'rgba(244, 240, 232, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600',
    zIndex: 10,
  },
  mapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(6, 1fr)',
    gap: '12px',
    width: 'calc(100% - 40px)',
    height: 'calc(100% - 40px)',
    padding: '20px',
  },
  mapPin: {
    background: 'rgba(20, 40, 80, 0.6)',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    color: 'rgba(244, 240, 232, 0.5)',
    cursor: 'pointer',
    transition: 'all 200ms',
    fontWeight: '600',
  },
  mapPinActive: {
    background: '#2B5A9E',
    borderColor: '#2B5A9E',
    color: '#0A1628',
    boxShadow: '0 0 16px rgba(43, 90, 158, 0.5)',
  },
  heroCta: {
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
  },
  btnPrimary: {
    padding: '14px 32px',
    background: '#2B5A9E',
    color: '#0A1628',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 200ms cubic-bezier(0.25, 1, 0.5, 1)',
    fontSize: '13px',
  },
  btnSecondary: {
    padding: '14px 32px',
    background: 'transparent',
    color: '#F4F0E8',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 200ms',
    fontSize: '13px',
  },
  valueProps: {
    padding: '80px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    borderBottom: '1px solid rgba(43, 90, 158, 0.15)',
  },
  valuePropCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
  },
  valueTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '1.8rem',
    marginBottom: '16px',
    color: '#2B5A9E',
  },
  valueText: {
    fontSize: '0.875rem',
    color: 'rgba(244, 240, 232, 0.8)',
    lineHeight: '1.6',
  },
  featured: {
    padding: '80px 40px',
    borderBottom: '1px solid rgba(43, 90, 158, 0.15)',
  },
  sectionTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.8rem',
    lineHeight: '1.2',
    marginBottom: '8px',
    color: '#F4F0E8',
  },
  sectionSubtitle: {
    fontSize: '0.875rem',
    color: 'rgba(244, 240, 232, 0.7)',
    marginBottom: '48px',
  },
  listingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  listingCard: {
    background: '#142850',
    border: '1px solid rgba(43, 90, 158, 0.15)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 200ms',
  },
  listingImage: {
    width: '100%',
    height: '160px',
    background: 'linear-gradient(135deg, #2B5A9E, #4A7BC4)',
    overflow: 'hidden',
  },
  listingImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  listingContent: {
    padding: '16px',
  },
  listingPrice: {
    fontFamily: '"Courier New", monospace',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4A7BC4',
    marginBottom: '6px',
  },
  listingTitle: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  listingLocation: {
    fontSize: '11px',
    color: 'rgba(244, 240, 232, 0.6)',
  },
  ctaSection: {
    padding: '120px 40px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(43, 90, 158, 0.15)',
  },
  ctaTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '3rem',
    lineHeight: '1.2',
    marginBottom: '24px',
  },
  ctaText: {
    fontSize: '1rem',
    color: 'rgba(244, 240, 232, 0.8)',
    marginBottom: '48px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    padding: '48px 40px',
    background: '#142850',
    borderTop: '1px solid rgba(43, 90, 158, 0.15)',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '12px',
    color: 'rgba(244, 240, 232, 0.7)',
  },
  footerLink: {
    fontSize: '11px',
    color: 'rgba(244, 240, 232, 0.6)',
    textDecoration: 'none',
    transition: 'color 200ms',
    display: 'block',
    marginBottom: '8px',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    color: 'rgba(244, 240, 232, 0.8)',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#DC2626',
  },
};
