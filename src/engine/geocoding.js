/**
 * Geocoding - City name to coordinates + timezone
 * Uses offline Korean city DB with Open-Meteo API fallback
 */
import { CITIES } from '../data/cities.js';

/**
 * Search cities from local database
 */
export function searchCitiesLocal(query) {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase().trim();

  return CITIES.filter(city =>
    city.nameKr.includes(q) ||
    city.name.toLowerCase().includes(q)
  ).slice(0, 10);
}

/**
 * Search cities via Open-Meteo Geocoding API (fallback for unknown cities)
 */
export async function searchCitiesOnline(query) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=ko`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map(r => ({
      name: r.name,
      nameKr: r.name, // Open-Meteo returns localized name
      lat: r.latitude,
      lng: r.longitude,
      timezone: r.timezone,
      country: r.country_code,
    }));
  } catch {
    return [];
  }
}

/**
 * Combined search: local first, then online
 */
export async function searchCities(query) {
  const local = searchCitiesLocal(query);
  if (local.length >= 3) return local;

  const online = await searchCitiesOnline(query);
  // Merge, avoiding duplicates
  const allNames = new Set(local.map(c => c.nameKr));
  const merged = [...local];
  for (const city of online) {
    if (!allNames.has(city.nameKr)) {
      merged.push(city);
      allNames.add(city.nameKr);
    }
  }
  return merged.slice(0, 10);
}
