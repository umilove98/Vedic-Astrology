/**
 * Astronomical calculation engine
 * Calculates Moon's sidereal longitude using simplified Moshier-like algorithm
 * (Pure JS, no external dependencies)
 */
import { toJulianDay, julianCenturies, localToUTC, getTimezoneOffset } from '../utils/datetime.js';

/**
 * Calculate Moon's ecliptic longitude (tropical) using simplified lunar theory
 * Based on Jean Meeus "Astronomical Algorithms" Chapter 47
 * Accuracy: ~0.3 degrees (sufficient for Nakshatra determination)
 */
export function getMoonTropicalLongitude(jd) {
  const T = julianCenturies(jd);
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  // Moon's mean longitude (L')
  const Lp = normalize(218.3164477 + 481267.88123421 * T
    - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000);

  // Moon's mean elongation (D)
  const D = normalize(297.8501921 + 445267.1114034 * T
    - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000);

  // Sun's mean anomaly (M)
  const M = normalize(357.5291092 + 35999.0502909 * T
    - 0.0001536 * T2 + T3 / 24490000);

  // Moon's mean anomaly (M')
  const Mp = normalize(134.9633964 + 477198.8675055 * T
    + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000);

  // Moon's argument of latitude (F)
  const F = normalize(93.2720950 + 483202.0175233 * T
    - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000);

  // Additional arguments
  const A1 = normalize(119.75 + 131.849 * T);
  const A2 = normalize(53.09 + 479264.290 * T);
  const A3 = normalize(313.45 + 481266.484 * T);

  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const E2 = E * E;

  // Periodic terms for longitude (simplified - major terms only)
  let sumL = 0;
  sumL += 6288774 * sinDeg(Mp);
  sumL += 1274027 * sinDeg(2 * D - Mp);
  sumL += 658314 * sinDeg(2 * D);
  sumL += 213618 * sinDeg(2 * Mp);
  sumL += -185116 * E * sinDeg(M);
  sumL += -114332 * sinDeg(2 * F);
  sumL += 58793 * sinDeg(2 * D - 2 * Mp);
  sumL += 57066 * E * sinDeg(2 * D - M - Mp);
  sumL += 53322 * sinDeg(2 * D + Mp);
  sumL += 45758 * E * sinDeg(2 * D - M);
  sumL += -40923 * E * sinDeg(M - Mp);
  sumL += -34720 * sinDeg(D);
  sumL += -30383 * E * sinDeg(M + Mp);
  sumL += 15327 * sinDeg(2 * D - 2 * F);
  sumL += -12528 * sinDeg(Mp + 2 * F);
  sumL += 10980 * sinDeg(Mp - 2 * F);
  sumL += 10675 * sinDeg(4 * D - Mp);
  sumL += 10034 * sinDeg(3 * Mp);
  sumL += 8548 * sinDeg(4 * D - 2 * Mp);
  sumL += -7888 * E * sinDeg(2 * D + M - Mp);
  sumL += -6766 * E * sinDeg(2 * D + M);
  sumL += -5163 * sinDeg(D - Mp);
  sumL += 4987 * E * sinDeg(D + M);
  sumL += 4036 * E * sinDeg(2 * D - M + Mp);
  sumL += 3994 * sinDeg(2 * D + 2 * Mp);
  sumL += 3861 * sinDeg(4 * D);
  sumL += 3665 * sinDeg(2 * D - 3 * Mp);
  sumL += -2689 * E * sinDeg(M - 2 * Mp);
  sumL += -2602 * sinDeg(2 * D - Mp + 2 * F);
  sumL += 2390 * E * sinDeg(2 * D - M - 2 * Mp);
  sumL += -2348 * sinDeg(D + Mp);
  sumL += 2236 * E2 * sinDeg(2 * D - 2 * M);
  sumL += -2120 * E * sinDeg(M + 2 * Mp);
  sumL += -2069 * E2 * sinDeg(2 * M);

  // Additional corrections
  sumL += 3958 * sinDeg(A1);
  sumL += 1962 * sinDeg(Lp - F);
  sumL += 318 * sinDeg(A2);

  const longitude = Lp + sumL / 1000000;
  return normalize(longitude);
}

/**
 * Calculate Lahiri Ayanamsa (precession correction for sidereal zodiac)
 * Lahiri is the official ayanamsa used by the Indian government
 */
export function calculateLahiriAyanamsa(jd) {
  const T = julianCenturies(jd);
  // Lahiri ayanamsa polynomial approximation
  // Reference point: 23°51'11" on Jan 1, 2000
  const ayanamsa = 23.85194444
    + 0.013971111 * T
    + 0.000031056 * T * T
    - 0.000000095 * T * T * T;
  return ayanamsa;
}

/**
 * Get Moon's sidereal longitude (Vedic/Jyotish position)
 */
export function getMoonSiderealLongitude(jd) {
  const tropical = getMoonTropicalLongitude(jd);
  const ayanamsa = calculateLahiriAyanamsa(jd);
  return normalize(tropical - ayanamsa);
}

/**
 * Main calculation: birth info → Moon's sidereal longitude
 */
export function calculateMoonPosition(birthDate, birthTime, timezone) {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hours, minutes] = birthTime.split(':').map(Number);

  const tzOffset = getTimezoneOffset(timezone);
  const utc = localToUTC(year, month, day, hours, minutes, tzOffset);
  const jd = toJulianDay(utc.year, utc.month, utc.day, utc.hours, utc.minutes);

  return {
    tropicalLongitude: getMoonTropicalLongitude(jd),
    siderealLongitude: getMoonSiderealLongitude(jd),
    ayanamsa: calculateLahiriAyanamsa(jd),
    julianDay: jd,
  };
}

// === Helper functions ===

function sinDeg(deg) {
  return Math.sin(deg * Math.PI / 180);
}

function normalize(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}
