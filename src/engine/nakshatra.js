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
  { planet: 'Ketu',    years: 7,
    desc: '영적 각성과 내면 탐구의 시기입니다. 물질적 집착에서 벗어나 직관과 영성이 강화되며, 과거의 카르마가 정리됩니다. 갑작스러운 변화나 분리를 경험할 수 있지만, 이는 진정한 자아를 찾기 위한 과정입니다.' },
  { planet: 'Venus',   years: 20,
    desc: '사랑, 아름다움, 풍요의 시기입니다. 예술적 감각이 꽃피고, 관계에서 깊은 행복을 경험합니다. 물질적 안정과 여유를 누릴 수 있으나, 과도한 탐닉은 경계해야 합니다.' },
  { planet: 'Sun',     years: 6,
    desc: '자아 발견과 리더십의 시기입니다. 자신감과 권위가 높아지며, 공적 영역에서 인정받을 기회가 찾아옵니다. 아버지나 권위자와의 관계가 중요해지는 기간입니다.' },
  { planet: 'Moon',    years: 10,
    desc: '감정과 직관이 깊어지는 시기입니다. 어머니나 여성과의 관계가 중요해지고, 가정생활과 내면의 평화에 초점이 맞춰집니다. 상상력과 창의성이 풍부해지나 감정 변동에 주의하세요.' },
  { planet: 'Mars',    years: 7,
    desc: '에너지, 용기, 행동력이 넘치는 시기입니다. 목표를 향한 강한 추진력이 생기고, 부동산이나 기술 분야에서 성과를 낼 수 있습니다. 성급함이나 분노 조절이 과제가 될 수 있습니다.' },
  { planet: 'Rahu',    years: 18,
    desc: '야망과 욕망이 극대화되는 격동의 시기입니다. 예상치 못한 기회와 도전이 동시에 찾아오며, 비전통적인 분야에서 성공할 수 있습니다. 집착과 환상에 빠지지 않도록 경계가 필요합니다.' },
  { planet: 'Jupiter', years: 16,
    desc: '지혜, 행운, 확장의 황금기입니다. 학문·영성·법률 분야에서 성장하고, 스승이나 멘토를 만날 수 있습니다. 관대함과 낙관주의가 넘치며, 인생에서 가장 축복받는 시기 중 하나입니다.' },
  { planet: 'Saturn',  years: 19,
    desc: '인내와 성숙의 시기입니다. 노력과 규율을 통해 단단한 기반을 쌓게 되며, 쉽지 않지만 가장 값진 성장을 이룹니다. 책임감이 커지고 진정한 실력이 증명되는 기간입니다.' },
  { planet: 'Mercury', years: 17,
    desc: '지성과 소통이 빛나는 시기입니다. 학습, 비즈니스, 글쓰기, 기술 분야에서 뛰어난 성과를 올릴 수 있습니다. 분석력과 적응력이 강화되며 다양한 분야를 넘나드는 활동이 활발해집니다.' },
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
    desc: dashaLord.desc,
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
      desc: dasha.desc,
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
