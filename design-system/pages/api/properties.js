// pages/api/properties.js
// Property Finder API Integration Layer

const PROPERTY_FINDER_BASE = 'https://api.propertyfinder.ae/api/v1';
const API_KEY = 'YHDNf.LadthM6TyLlAOs8fqQu8IpTt65yhzXE9ae';
const API_SECRET = 'GBuxCDac4pZ6GEFaTq4crIBNR7YXILon';

// Generate auth token
const getAuthToken = async () => {
  try {
    const response = await fetch(`${PROPERTY_FINDER_BASE}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY,
        apiSecret: API_SECRET,
      }),
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
};

// Fetch properties from Property Finder
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Failed to authenticate with Property Finder');
    }

    const { category = 'for-sale', location = 'dubai', limit = 12 } = req.query;

    const response = await fetch(
      `${PROPERTY_FINDER_BASE}/property?category=${category}&location=${location}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Property Finder API error');
    }

    const data = await response.json();

    // Transform Property Finder data to our schema
    const properties = data.properties?.map((prop) => ({
      id: prop.id,
      title: prop.title,
      price: prop.price,
      currency: prop.priceCurrency,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      area: prop.area,
      location: prop.locationName,
      image: prop.image?.url || 'https://picsum.photos/400/300?random=default',
      url: prop.url,
      featured: prop.featured || false,
    })) || [];

    res.status(200).json({ properties, total: data.total });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to fetch properties',
      message: error.message,
    });
  }
}
