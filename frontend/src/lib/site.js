// Static site configuration: nav, contact, content snippets
export const SITE = {
  name: 'Bahari Global Holdings',
  short: 'BAHARI',
  tagline: 'Navigating Trade, Connecting Markets',
  subTagline: 'Maritime Logistics • Vessel Chartering • Port Agency • Husbandry Services • Freight Forwarding • Global Trade Solutions',
  contact: {
    email: 'info@bahariglobal.com',
    phones: ['+1 (470) 667-6938', '+1 (347) 606-6228'],
    address: '2455 Hollywood Blvd, Suite 107, Hollywood, FL 33020, USA',
    web: 'bahariglobal.com',
  },
  social: [
    { name: 'LinkedIn', href: '#' },
    { name: 'X / Twitter', href: '#' },
    { name: 'YouTube', href: '#' },
  ],
  hero: {
    posterUrl: 'https://images.pexels.com/photos/20216716/pexels-photo-20216716.jpeg?auto=compress&cs=tinysrgb&w=1920',
    // Cinematic maritime stock videos (Pexels CDN, royalty-free)
    videoSources: [
      'https://videos.pexels.com/video-files/4434286/4434286-uhd_2560_1440_24fps.mp4',
      'https://videos.pexels.com/video-files/30706079/13119618_2560_1440_30fps.mp4',
    ],
  },
};

export const NAV_PRIMARY = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Maritime',
    to: '/maritime-services',
    children: [
      { label: 'Overview', to: '/maritime-services' },
      { label: 'Vessel Chartering', to: '/vessel-chartering' },
      { label: 'Vessel Brokerage', to: '/vessel-brokerage' },
      { label: 'Port Agency & Husbandry', to: '/port-agency-husbandry' },
    ],
  },
  {
    label: 'Logistics',
    to: '/logistics-services',
    children: [
      { label: 'Overview', to: '/logistics-services' },
      { label: 'Ocean Freight', to: '/logistics-services#ocean' },
      { label: 'Air Freight', to: '/logistics-services#air' },
      { label: 'Inland Transportation', to: '/logistics-services#inland' },
      { label: 'Customs & Compliance', to: '/logistics-services#customs' },
    ],
  },
  { label: 'Ports & Regions', to: '/ports-regions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Investors', to: '/investors' },
];

export const CORE_VALUES = [
  { title: 'Integrity', body: 'We act with transparency and consistency across every counterparty, port and partnership.' },
  { title: 'Reliability', body: 'Our operating discipline is built on schedule integrity and predictable execution.' },
  { title: 'Safety', body: 'Zero-harm culture across vessels, ports and cargo handling — without compromise.' },
  { title: 'Excellence', body: 'A relentless focus on operational quality, documentation and client outcomes.' },
  { title: 'Innovation', body: 'We modernize maritime services with technology, data and disciplined service design.' },
];

export const SERVICES_MARITIME = [
  { key: 'chartering', title: 'Vessel Chartering', desc: 'Time, voyage, bareboat and project cargo chartering across the Caribbean and Americas.', items: ['Time Charter', 'Voyage Charter', 'Bareboat Charter', 'Project Cargo Charter'] },
  { key: 'brokerage', title: 'Vessel Brokerage', desc: 'Sale & purchase, charter brokerage and vessel sourcing for owners and charterers.', items: ['Sale & Purchase', 'Charter Brokerage', 'Vessel Sourcing'] },
  { key: 'husbandry', title: 'Husbandry Services', desc: 'Comprehensive owner-side support to keep your vessels and crew moving.', items: ['Crew Changes', 'Immigration Assistance', 'Bunkering Coordination', 'Fresh Water Supply', 'Provisions', 'Medical Assistance'] },
  { key: 'port-agency', title: 'Port Agency', desc: 'Port clearance, customs coordination and end-to-end documentation.', items: ['Port Clearance', 'Customs Coordination', 'Documentation'] },
];

export const SERVICES_LOGISTICS = [
  { key: 'ocean', title: 'Ocean Freight', desc: 'FCL, LCL, project cargo and breakbulk solutions across Caribbean and global lanes.', items: ['FCL (Full Container Load)', 'LCL (Less than Container Load)', 'Project Cargo', 'Breakbulk'] },
  { key: 'air', title: 'Air Freight', desc: 'Import, export and time-critical air freight for high-value or time-sensitive cargo.', items: ['Import', 'Export', 'Time-Critical Cargo'] },
  { key: 'inland', title: 'Inland Transportation', desc: 'FTL, LTL, drayage and cross-border inland logistics across North America and the Caribbean.', items: ['FTL (Full Truckload)', 'LTL (Less than Truckload)', 'Drayage', 'Cross-Border'] },
  { key: 'customs', title: 'Customs & Compliance', desc: 'Customs brokerage, ISF filing, insurance and trade compliance support.', items: ['Customs Brokerage', 'ISF Filing', 'Cargo Insurance', 'Trade Compliance'] },
];

export const REGIONS = [
  { key: 'caribbean', name: 'Caribbean', ports: ['Kingston, Jamaica', 'Port-au-Prince, Haiti', 'Bridgetown, Barbados', 'Port of Spain, Trinidad', 'San Juan, Puerto Rico', 'Santo Domingo, Dominican Republic'] },
  { key: 'united-states', name: 'United States', ports: ['Port of Miami, FL', 'Port Everglades, FL', 'Port of Houston, TX', 'Port of New Orleans, LA', 'Port of Jacksonville, FL'] },
  { key: 'international', name: 'International', ports: ['Cartagena, Colombia', 'Manzanillo, Panama', 'Veracruz, Mexico', 'Rotterdam (Partner Network)', 'Singapore (Partner Network)'] },
];

export const KPI_HOME = [
  { id: 'years', value: 15, suffix: '+', label: 'Years of Operating Experience' },
  { id: 'ports', value: 32, suffix: '+', label: 'Ports Served Across the Americas' },
  { id: 'fleet', value: 24, suffix: '', label: 'Vessels Under Management & Network' },
  { id: 'teus', value: 280, suffix: 'K+', label: 'TEUs Moved Annually (Network)' },
];

export const KPI_INVESTOR = [
  { id: 'cagr', value: 18, suffix: '%', label: 'YoY Volume CAGR (3y)' },
  { id: 'retention', value: 96, suffix: '%', label: 'Client Retention' },
  { id: 'safety', value: 0, suffix: '', label: 'Lost-Time Incidents (2025)' },
  { id: 'corridors', value: 12, suffix: '', label: 'Active Trade Corridors' },
];
