const _cache = new Map();

const REGION_PATTERNS = [
  [/île-de-france|paris/i,                                  'ile_de_france'],
  [/normandie/i,                                            'normandie'],
  [/grand[ -]est|alsace|bas-rhin|haut-rhin/i,               'alsace'],
  [/bretagne/i,                                             'bretagne'],
  [/provence|côte.d.azur|alpes-maritimes|var\b|bouches/i,   'paca'],
];

export async function detectFrenchRegion(bounds) {
  const lat = (bounds.north + bounds.south) / 2;
  const lng  = (bounds.east  + bounds.west)  / 2;
  const key  = `${lat.toFixed(2)},${lng.toFixed(2)}`;
  if (_cache.has(key)) return _cache.get(key);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=6`,
      { headers: { 'Accept-Language': 'fr' } }
    );
    const { address } = await res.json();
    const haystack = [address.state, address.region, address.county].filter(Boolean).join(' ');
    const match  = REGION_PATTERNS.find(([re]) => re.test(haystack));
    const region = match ? match[1] : 'generic_france';
    _cache.set(key, region);
    return region;
  } catch {
    return 'generic_france';
  }
}
