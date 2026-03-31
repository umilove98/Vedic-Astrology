/**
 * Profile Analyzer - Combines Nakshatra, Rashi, Planet data
 * to produce a comprehensive personalized analysis
 */
import { PROFILES } from '../data/profiles.js';
import { PLANETS } from '../data/planets.js';
import { calculateDasha } from './nakshatra.js';

/**
 * Generate complete profile analysis from birth chart data
 */
export function generateProfile(nakshatraResult, birthYear) {
  const { nakshatra, nakshatraIndex, pada, padaIndex, rashi, degreeInNakshatra } = nakshatraResult;

  const profile = PROFILES[nakshatraIndex];
  const planet = PLANETS[nakshatra.lord];
  const dasha = calculateDasha(nakshatraIndex, padaIndex, degreeInNakshatra, birthYear);

  return {
    // === Basic Info ===
    basic: {
      nakshatraName: nakshatra.name,
      nakshatraNameKr: nakshatra.nameKr,
      nakshatraSymbol: nakshatra.symbol,
      meaning: nakshatra.meaning,
      pada,
      rashiName: rashi.nameKr,
      rashiSymbol: rashi.symbol,
      rashiElement: rashi.elementKr,
      lordName: nakshatra.lordKr,
      lordSymbol: planet?.symbol || '☆',
      deityName: nakshatra.deityKr,
      gana: nakshatra.gana,
      guna: nakshatra.guna,
    },

    // === Personality ===
    personality: profile.personality,

    // === Career ===
    career: profile.career,

    // === Relationships ===
    relationships: profile.relationships,

    // === Health ===
    health: profile.health,

    // === Lucky Elements ===
    lucky: profile.lucky,

    // === Past Life & Soul Mission (Ketu/Rahu) ===
    pastLife: profile.pastLife,

    // === Dasha (Life Periods) ===
    dasha: {
      ...dasha,
      description: profile.dpiasha?.description || profile.dasha?.description || '',
      lordPeriod: profile.dpiasha?.lordPeriod || profile.dasha?.lordPeriod || 0,
    },

    // === Planet Info ===
    planet: planet ? {
      name: planet.nameKr,
      nameSanskrit: planet.nameSanskrit,
      symbol: planet.symbol,
      description: planet.description,
      qualities: planet.qualities,
    } : null,

    // === Rashi Detail ===
    rashiDetail: {
      name: rashi.nameKr,
      symbol: rashi.symbol,
      description: rashi.description,
      traits: rashi.traits,
      element: rashi.elementKr,
      ruler: rashi.rulerKr,
    },
  };
}

/**
 * Format Dasha timeline for display
 */
export function formatDashaTimeline(dasha) {
  const currentYear = new Date().getFullYear();
  return dasha.timeline.map(d => ({
    ...d,
    isCurrent: d.startYear <= currentYear && d.endYear > currentYear,
    isPast: d.endYear <= currentYear,
    isFuture: d.startYear > currentYear,
    label: `${d.planetKr} (${d.startYear}~${d.endYear})`,
  }));
}
