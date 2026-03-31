/**
 * Multilingual Name Generator
 * Korean (generated) + Indian/Sanskrit (curated) + English (curated)
 */
import { SYLLABLE_TO_KOREAN, NAME_ENDINGS, QUALITY_TAG_MAP } from '../data/koreanMappings.js';
import { NAKSHATRAS } from '../data/nakshatras.js';
import { VEDIC_NAMES } from '../data/namesDatabase.js';

/**
 * Generate Korean names based on Nakshatra and Pada
 */
export function generateNames(nakshatraIndex, padaIndex, options = {}) {
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const syllable = nakshatra.syllables[padaIndex];
  const mapping = SYLLABLE_TO_KOREAN[syllable];

  if (!mapping) {
    console.warn(`No Korean mapping for syllable: ${syllable}`);
    return [];
  }

  const { gender = 'neutral', count = 10 } = options;

  // Get all variant initial syllables
  const initials = mapping.variants || [mapping.kr];

  // Determine preferred tags based on Nakshatra qualities
  const preferredTags = getPreferredTags(nakshatra);

  // Generate and score name candidates
  const candidates = [];

  for (const initial of initials) {
    for (const ending of NAME_ENDINGS) {
      const name = initial + ending.syllable;

      // Skip names that are too short or too long
      if (name.length < 2 || name.length > 4) continue;

      // Skip if the initial and ending are the same syllable
      if (initial === ending.syllable) continue;

      // Calculate score
      let score = 0;

      // Tag matching bonus
      const tagMatches = ending.tags.filter(t => preferredTags.includes(t)).length;
      score += tagMatches * 15;

      // Hanja bonus (names with hanja meanings feel more "real")
      if (ending.hanja) score += 8;

      // Length preference (2-3 syllables preferred)
      if (name.length === 2) score += 10;
      if (name.length === 3) score += 5;

      // Phonetic harmony
      score += phoneticsScore(initial, ending.syllable);

      // Slight randomness for variety
      score += Math.random() * 5;

      candidates.push({
        name,
        initial,
        initialSyllable: syllable,
        initialKr: mapping.kr,
        ending: ending.syllable,
        meaning: ending.meaning,
        hanja: ending.hanja,
        score,
        tags: ending.tags,
        nakshatraConnection: buildNakshatraConnection(nakshatra, ending, mapping),
      });
    }
  }

  // Sort by score descending and return top N
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, count);
}

/**
 * Get preferred name tags based on Nakshatra energy
 */
function getPreferredTags(nakshatra) {
  const tags = new Set();

  // Map Nakshatra qualities to name tags
  const qualityMappings = {
    'Deva': ['light', 'virtue', 'auspicious', 'peace'],
    'Manushya': ['smart', 'talent', 'beauty', 'benefit'],
    'Rakshasa': ['strong', 'brave', 'deep', 'truth'],
  };

  // Gana-based tags
  if (nakshatra.gana && qualityMappings[nakshatra.gana]) {
    qualityMappings[nakshatra.gana].forEach(t => tags.add(t));
  }

  // Element-based tags
  const elementMap = {
    'Fire': ['strong', 'hero', 'rise', 'light'],
    'Earth': ['nature', 'grand', 'strong', 'blessing'],
    'Air': ['smart', 'freedom', 'fly', 'quick'],
    'Water': ['deep', 'pure', 'beauty', 'grace'],
    'Ether': ['sky', 'dream', 'whole', 'peace'],
  };
  if (nakshatra.element && elementMap[nakshatra.element]) {
    elementMap[nakshatra.element].forEach(t => tags.add(t));
  }

  return [...tags];
}

/**
 * Score phonetic harmony between two Korean syllables
 */
function phoneticsScore(initial, ending) {
  let score = 0;

  // Avoid doubled consonants (e.g., 마+민 sounds better than 마+망)
  const lastCharOfInitial = initial[initial.length - 1];
  const firstCharOfEnding = ending[0];

  // Same character repetition penalty
  if (lastCharOfInitial === firstCharOfEnding) score -= 5;

  // Vowel variety bonus
  if (initial.length === 1 && ending.length === 1) {
    score += 3; // Simple 2-char names have natural flow
  }

  return score;
}

/**
 * Build a description of how the name connects to the Nakshatra
 */
function buildNakshatraConnection(nakshatra, ending, mapping) {
  const syllableKr = mapping.kr;
  return `'${syllableKr}'는 ${nakshatra.nameKr}(${nakshatra.name}) 낙샤트라가 부여한 신성한 음절이에요. ` +
    `${nakshatra.lordKr}의 에너지와 공명하는 이 소리로 시작하는 이름은 ` +
    `탄생 별의 축복을 담고 있습니다.`;
}

/**
 * Get Indian/Sanskrit names for a Nakshatra
 */
export function getIndianNames(nakshatraIndex, options = {}) {
  const { gender = 'neutral' } = options;
  const data = VEDIC_NAMES[nakshatraIndex];
  if (!data?.indian) return [];

  if (gender === 'neutral') {
    return [
      ...(data.indian.male || []),
      ...(data.indian.female || []),
      ...(data.indian.neutral || []),
    ];
  }
  return [
    ...(data.indian[gender] || []),
    ...(data.indian.neutral || []),
  ];
}

/**
 * Get English names for a Nakshatra
 */
export function getEnglishNames(nakshatraIndex, options = {}) {
  const { gender = 'neutral' } = options;
  const data = VEDIC_NAMES[nakshatraIndex];
  if (!data?.english) return [];

  if (gender === 'neutral') {
    return [
      ...(data.english.male || []),
      ...(data.english.female || []),
      ...(data.english.neutral || []),
    ];
  }
  return [
    ...(data.english[gender] || []),
    ...(data.english.neutral || []),
  ];
}

/**
 * Get all names across all languages
 */
export function getAllNames(nakshatraIndex, padaIndex, options = {}) {
  return {
    korean: generateNames(nakshatraIndex, padaIndex, options),
    indian: getIndianNames(nakshatraIndex, options),
    english: getEnglishNames(nakshatraIndex, options),
  };
}

/**
 * Get a display-friendly summary for the syllable
 */
export function getSyllableInfo(nakshatraIndex, padaIndex) {
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const syllable = nakshatra.syllables[padaIndex];
  const mapping = SYLLABLE_TO_KOREAN[syllable];

  return {
    romanized: syllable,
    korean: mapping?.kr || syllable,
    variants: mapping?.variants || [syllable],
    explanation: `${nakshatra.nameKr}의 ${padaIndex + 1}번째 파다(Pada)에 배정된 음절`,
  };
}
