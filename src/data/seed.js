const imageSets = {
  flat: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
  ],
  commercial: [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
  ],
  plot: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80'
  ]
};

const baseProperties = [
  ['Premium 3BHK Skyline Residency', 'Patna, Boring Road', 'flat', 8500000, 1650, 3, 3, true, true, 25.6093, 85.1235],
  ['Commercial Hub Office Space', 'Patna, Bailey Road', 'commercial', 12500000, 2400, 0, 2, true, false, 25.6148, 85.0924],
  ['Gated Residential Plot', 'Patna, Bihta', 'plot', 3200000, 1800, 0, 0, false, true, 25.5782, 84.8504],
  ['Luxury Riverfront 4BHK', 'Patna, Digha', 'flat', 14200000, 2280, 4, 4, true, true, 25.636, 85.1012],
  ['Boutique Retail Corner', 'Patna, Kankarbagh', 'commercial', 9800000, 1900, 0, 2, false, false, 25.5942, 85.1581],
  ['Township Green Plot', 'Patna, Naubatpur', 'plot', 2800000, 1500, 0, 0, false, false, 25.5102, 84.9621],
  ['Smart 2BHK Metro Heights', 'Patna, Rajendra Nagar', 'flat', 6400000, 1240, 2, 2, true, false, 25.6125, 85.1474],
  ['Signature Business Suites', 'Patna, Exhibition Road', 'commercial', 15400000, 2750, 0, 3, true, true, 25.6121, 85.1438],
  ['Registry Ready Plot Estate', 'Patna, Danapur', 'plot', 4100000, 2000, 0, 0, false, true, 25.6228, 85.0412],
  ['Family 3BHK Garden Homes', 'Patna, Ashiana Nagar', 'flat', 7600000, 1580, 3, 3, false, false, 25.5933, 85.0827],
  ['High Street Showroom Space', 'Patna, Fraser Road', 'commercial', 18600000, 3100, 0, 2, true, false, 25.6099, 85.1379],
  ['Lakeview Premium Plot', 'Patna, Sampatchak', 'plot', 3550000, 1700, 0, 0, false, false, 25.5664, 85.1856],
  ['Elite Duplex Residence', 'Patna, Boring Canal Road', 'flat', 16800000, 2550, 4, 4, true, true, 25.6114, 85.1204],
  ['Corporate Tower Floor', 'Patna, Gandhi Maidan', 'commercial', 21200000, 3600, 0, 4, false, true, 25.6201, 85.1472],
  ['Future Growth Plot', 'Patna, Masaurhi Road', 'plot', 2400000, 1350, 0, 0, false, true, 25.4635, 85.0712],
  ['Clubhouse 3BHK Premium', 'Patna, Saguna More', 'flat', 8150000, 1625, 3, 3, false, false, 25.5937, 85.0479],
  ['Studio Office Launchpad', 'Patna, Patliputra Colony', 'commercial', 7200000, 1180, 0, 1, false, false, 25.6218, 85.1073],
  ['Corner Plot Gold Enclave', 'Patna, Maner', 'plot', 2950000, 1600, 0, 0, false, false, 25.6472, 84.8724],
  ['Skydeck 2BHK Comfort', 'Patna, AG Colony', 'flat', 5980000, 1160, 2, 2, false, true, 25.6067, 85.0978],
  ['Medical Plaza Units', 'Patna, Bypass Road', 'commercial', 13200000, 2300, 0, 2, false, false, 25.6018, 85.1792],
  ['Investor Smart Plot', 'Patna, Fatuha', 'plot', 2250000, 1250, 0, 0, false, false, 25.5091, 85.306],
  ['Panorama Penthouse 4BHK', 'Patna, Patliputra', 'flat', 18900000, 2780, 4, 4, true, true, 25.6226, 85.1031],
  ['Warehouse And Trade Bay', 'Patna, Didarganj', 'commercial', 14400000, 4200, 0, 2, false, true, 25.5905, 85.2391],
  ['Secure Plot Residency Phase 2', 'Patna, Khagaul', 'plot', 3380000, 1750, 0, 0, false, true, 25.5814, 85.0438]
];

const descriptions = {
  flat: 'A modern residential apartment with strong connectivity, premium amenities, and high livability for end users as well as investors.',
  commercial: 'A high-visibility commercial asset designed for offices, retail brands, clinics, and businesses looking for strong footfall.',
  plot: 'A clear-title plotted development with long-term appreciation potential, smooth registry support, and fast-growing surrounding infrastructure.'
};

const amenityMap = {
  flat: ['Clubhouse', 'Power backup', 'Lift', 'Parking', '24x7 Security'],
  commercial: ['Lift', 'Reception lobby', 'CCTV', 'Visitor parking', 'Power backup'],
  plot: ['Gated entry', 'Street lights', 'Drainage', 'Park', 'Wide roads']
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const seedProperties = baseProperties.map((item, index) => {
  const [title, location, property_type, price, area_sqft, bedrooms, bathrooms, featured, only_few_left, latitude, longitude] = item;
  const images = imageSets[property_type];
  return {
    id: String(index + 1),
    title,
    slug: slugify(title),
    location,
    property_type,
    price,
    area_sqft,
    bedrooms,
    bathrooms,
    only_few_left,
    featured,
    description: descriptions[property_type],
    amenities: amenityMap[property_type],
    hero_image: images[0],
    images,
    latitude,
    longitude,
  };
});

export const testimonials = [
  { name: 'Ritika S.', quote: 'We got qualified leads in the first week and the admin panel is genuinely easy to manage.' },
  { name: 'Aman Verma', quote: 'Fast website, clean UI, and the WhatsApp enquiry flow converts surprisingly well.' },
  { name: 'Nidhi Realty', quote: 'Exactly the kind of real estate lead funnel we needed for project launches.' },
];
