/**
 * Nakshatra determination engine
 * Converts Moon's sidereal longitude to Nakshatra, Pada, and associated data
 */
import { NAKSHATRAS } from '../data/nakshatras.js';
import { getRashiFromDegree } from '../data/rashis.js';

const NAKSHATRA_SPAN = 13 + 20 / 60; // 13°20' = 13.3333...°
const PADA_SPAN = 3 + 20 / 60;       // 3°20'  = 3.3333...°

/**
 * Get Nakshatra info from sidereal Moon longitude
 */
export function getNakshatraFromDegree(siderealLongitude) {
  const deg = ((siderealLongitude % 360) + 360) % 360;

  const nakshatraIndex = Math.min(26, Math.floor(deg / NAKSHATRA_SPAN));
  const posInNakshatra = deg - nakshatraIndex * NAKSHATRA_SPAN;
  const padaIndex = Math.min(3, Math.floor(posInNakshatra / PADA_SPAN));

  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const rashi = getRashiFromDegree(deg);

  return {
    nakshatra,
    nakshatraIndex,
    pada: padaIndex + 1, // 1-based (1st, 2nd, 3rd, 4th pada)
    padaIndex,
    syllable: nakshatra.syllables[padaIndex],
    syllableKr: nakshatra.syllablesKr[padaIndex],
    rashi,
    exactDegree: deg,
    degreeInNakshatra: posInNakshatra,
  };
}

/**
 * Calculate Vimshottari Dasha (planetary period) at birth
 * The Dasha sequence: Ketu→Venus→Sun→Moon→Mars→Rahu→Jupiter→Saturn→Mercury
 */
const DASHA_SEQUENCE = [
  { planet: 'Ketu',    years: 7 },
  { planet: 'Venus',   years: 20 },
  { planet: 'Sun',     years: 6 },
  { planet: 'Moon',    years: 10 },
  { planet: 'Mars',    years: 7 },
  { planet: 'Rahu',    years: 18 },
  { planet: 'Jupiter', years: 16 },
  { planet: 'Saturn',  years: 19 },
  { planet: 'Mercury', years: 17 },
];

const TOTAL_DASHA_YEARS = 120; // Full Vimshottari cycle

const PLANET_KR = {
  'Ketu': '케투',
  'Venus': '금성 (슈크라)',
  'Sun': '태양 (수리야)',
  'Moon': '달 (찬드라)',
  'Mars': '화성 (망갈)',
  'Rahu': '라후',
  'Jupiter': '목성 (구루)',
  'Saturn': '토성 (샤니)',
  'Mercury': '수성 (부다)',
};

/**
 * Get the Dasha lord for a given Nakshatra
 */
function getDashaLordIndex(nakshatraIndex) {
  return nakshatraIndex % 9;
}

/**
 * Calculate Mahadasha periods from birth
 */
export function calculateDasha(nakshatraIndex, padaIndex, degreeInNakshatra, birthYear) {
  const dashaLordIdx = getDashaLordIndex(nakshatraIndex);
  const dashaLord = DASHA_SEQUENCE[dashaLordIdx];

  // Balance of first Dasha at birth
  // = proportion of Nakshatra remaining × lord's full period
  const proportionRemaining = 1 - (degreeInNakshatra / NAKSHATRA_SPAN);
  const balanceYears = proportionRemaining * dashaLord.years;

  // Build Dasha timeline from birth
  const timeline = [];
  let currentYear = birthYear;
  let currentFraction = balanceYears;

  // First (partial) Dasha
  timeline.push({
    planet: dashaLord.planet,
    planetKr: PLANET_KR[dashaLord.planet],
    startYear: Math.round(currentYear),
    endYear: Math.round(currentYear + currentFraction),
    years: parseFloat(currentFraction.toFixed(1)),
    isFirst: true,
  });
  currentYear += currentFraction;

  // Subsequent full Dashas
  let idx = (dashaLordIdx + 1) % 9;
  for (let i = 0; i < 8; i++) {
    const dasha = DASHA_SEQUENCE[idx];
    timeline.push({
      planet: dasha.planet,
      planetKr: PLANET_KR[dasha.planet],
      startYear: Math.round(currentYear),
      endYear: Math.round(currentYear + dasha.years),
      years: dasha.years,
      isFirst: false,
    });
    currentYear += dasha.years;
    idx = (idx + 1) % 9;
  }

  // Find current Mahadasha
  const now = new Date().getFullYear();
  const currentDasha = timeline.find(d => d.startYear <= now && d.endYear > now) || timeline[0];

  return {
    birthDashaLord: dashaLord.planet,
    birthDashaLordKr: PLANET_KR[dashaLord.planet],
    balanceYears: parseFloat(balanceYears.toFixed(1)),
    timeline,
    currentDasha,
  };
}
