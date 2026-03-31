/**
 * Sanskrit pada syllable → Korean (한글) phonetic mapping
 * + Korean name ending syllables database for name generation
 */

// Pada syllable to Korean initial syllable mapping
export const SYLLABLE_TO_KOREAN = {
  // Ashwini (0)
  'Chu': { kr: '추', initial: 'ㅊ', vowel: 'ㅜ', variants: ['추', '츄'] },
  'Che': { kr: '체', initial: 'ㅊ', vowel: 'ㅔ', variants: ['체', '채'] },
  'Cho': { kr: '초', initial: 'ㅊ', vowel: 'ㅗ', variants: ['초'] },
  'La':  { kr: '라', initial: 'ㄹ', vowel: 'ㅏ', variants: ['라'] },

  // Bharani (1)
  'Li': { kr: '리', initial: 'ㄹ', vowel: 'ㅣ', variants: ['리'] },
  'Lu': { kr: '루', initial: 'ㄹ', vowel: 'ㅜ', variants: ['루'] },
  'Le': { kr: '레', initial: 'ㄹ', vowel: 'ㅔ', variants: ['레'] },
  'Lo': { kr: '로', initial: 'ㄹ', vowel: 'ㅗ', variants: ['로'] },

  // Krittika (2)
  'A':  { kr: '아', initial: 'ㅇ', vowel: 'ㅏ', variants: ['아'] },
  'I':  { kr: '이', initial: 'ㅇ', vowel: 'ㅣ', variants: ['이'] },
  'U':  { kr: '우', initial: 'ㅇ', vowel: 'ㅜ', variants: ['우'] },
  'E':  { kr: '에', initial: 'ㅇ', vowel: 'ㅔ', variants: ['에'] },

  // Rohini (3)
  'O':  { kr: '오', initial: 'ㅇ', vowel: 'ㅗ', variants: ['오'] },
  'Va': { kr: '바', initial: 'ㅂ', vowel: 'ㅏ', variants: ['바', '와'] },
  'Vi': { kr: '비', initial: 'ㅂ', vowel: 'ㅣ', variants: ['비', '위'] },
  'Vu': { kr: '부', initial: 'ㅂ', vowel: 'ㅜ', variants: ['부', '우'] },

  // Mrigashira (4)
  'Ve': { kr: '베', initial: 'ㅂ', vowel: 'ㅔ', variants: ['베'] },
  'Vo': { kr: '보', initial: 'ㅂ', vowel: 'ㅗ', variants: ['보'] },
  'Ka': { kr: '카', initial: 'ㅋ', vowel: 'ㅏ', variants: ['카', '가'] },
  'Ki': { kr: '키', initial: 'ㅋ', vowel: 'ㅣ', variants: ['키', '기'] },

  // Ardra (5)
  'Ku':   { kr: '쿠', initial: 'ㅋ', vowel: 'ㅜ', variants: ['쿠', '구'] },
  'Gha':  { kr: '가', initial: 'ㄱ', vowel: 'ㅏ', variants: ['가'] },
  'Ng':   { kr: '나', initial: 'ㄴ', vowel: 'ㅏ', variants: ['나'] },
  'Chha': { kr: '차', initial: 'ㅊ', vowel: 'ㅏ', variants: ['차'] },

  // Punarvasu (6)
  'Ke': { kr: '케', initial: 'ㅋ', vowel: 'ㅔ', variants: ['케', '게'] },
  'Ko': { kr: '코', initial: 'ㅋ', vowel: 'ㅗ', variants: ['코', '고'] },
  'Ha': { kr: '하', initial: 'ㅎ', vowel: 'ㅏ', variants: ['하'] },
  'Hi': { kr: '히', initial: 'ㅎ', vowel: 'ㅣ', variants: ['히'] },

  // Pushya (7)
  'Hu': { kr: '후', initial: 'ㅎ', vowel: 'ㅜ', variants: ['후'] },
  'He': { kr: '헤', initial: 'ㅎ', vowel: 'ㅔ', variants: ['헤'] },
  'Ho': { kr: '호', initial: 'ㅎ', vowel: 'ㅗ', variants: ['호'] },
  'Da': { kr: '다', initial: 'ㄷ', vowel: 'ㅏ', variants: ['다'] },

  // Ashlesha (8)
  'Di': { kr: '디', initial: 'ㄷ', vowel: 'ㅣ', variants: ['디'] },
  'Du': { kr: '두', initial: 'ㄷ', vowel: 'ㅜ', variants: ['두'] },
  'De': { kr: '데', initial: 'ㄷ', vowel: 'ㅔ', variants: ['데'] },
  'Do': { kr: '도', initial: 'ㄷ', vowel: 'ㅗ', variants: ['도'] },

  // Magha (9)
  'Ma': { kr: '마', initial: 'ㅁ', vowel: 'ㅏ', variants: ['마'] },
  'Mi': { kr: '미', initial: 'ㅁ', vowel: 'ㅣ', variants: ['미'] },
  'Mu': { kr: '무', initial: 'ㅁ', vowel: 'ㅜ', variants: ['무'] },
  'Me': { kr: '메', initial: 'ㅁ', vowel: 'ㅔ', variants: ['메'] },

  // Purva Phalguni (10)
  'Mo': { kr: '모', initial: 'ㅁ', vowel: 'ㅗ', variants: ['모'] },
  'Ta': { kr: '타', initial: 'ㅌ', vowel: 'ㅏ', variants: ['타'] },
  'Ti': { kr: '티', initial: 'ㅌ', vowel: 'ㅣ', variants: ['티'] },
  'Tu': { kr: '투', initial: 'ㅌ', vowel: 'ㅜ', variants: ['투'] },

  // Uttara Phalguni (11)
  'Te': { kr: '테', initial: 'ㅌ', vowel: 'ㅔ', variants: ['테'] },
  'To': { kr: '토', initial: 'ㅌ', vowel: 'ㅗ', variants: ['토'] },
  'Pa': { kr: '파', initial: 'ㅍ', vowel: 'ㅏ', variants: ['파'] },
  'Pi': { kr: '피', initial: 'ㅍ', vowel: 'ㅣ', variants: ['피'] },

  // Hasta (12)
  'Pu':  { kr: '푸', initial: 'ㅍ', vowel: 'ㅜ', variants: ['푸'] },
  'Sha': { kr: '샤', initial: 'ㅅ', vowel: 'ㅏ', variants: ['사', '샤'] },
  'Na':  { kr: '나', initial: 'ㄴ', vowel: 'ㅏ', variants: ['나'] },
  'Tha': { kr: '타', initial: 'ㅌ', vowel: 'ㅏ', variants: ['타'] },

  // Chitra (13)
  'Pe': { kr: '페', initial: 'ㅍ', vowel: 'ㅔ', variants: ['페'] },
  'Po': { kr: '포', initial: 'ㅍ', vowel: 'ㅗ', variants: ['포'] },
  'Ra': { kr: '라', initial: 'ㄹ', vowel: 'ㅏ', variants: ['라'] },
  'Ri': { kr: '리', initial: 'ㄹ', vowel: 'ㅣ', variants: ['리'] },

  // Swati (14)
  'Ru': { kr: '루', initial: 'ㄹ', vowel: 'ㅜ', variants: ['루'] },
  'Re': { kr: '레', initial: 'ㄹ', vowel: 'ㅔ', variants: ['레'] },
  'Ro': { kr: '로', initial: 'ㄹ', vowel: 'ㅗ', variants: ['로'] },
  // 'Ta' already defined above

  // Vishakha (15) - Ti, Tu, Te, To already defined above

  // Anuradha (16)
  // 'Na' already defined
  'Ni': { kr: '니', initial: 'ㄴ', vowel: 'ㅣ', variants: ['니'] },
  'Nu': { kr: '누', initial: 'ㄴ', vowel: 'ㅜ', variants: ['누'] },
  'Ne': { kr: '네', initial: 'ㄴ', vowel: 'ㅔ', variants: ['네'] },

  // Jyeshtha (17)
  'No': { kr: '노', initial: 'ㄴ', vowel: 'ㅗ', variants: ['노'] },
  'Ya': { kr: '야', initial: 'ㅇ', vowel: 'ㅑ', variants: ['야'] },
  'Yi': { kr: '이', initial: 'ㅇ', vowel: 'ㅣ', variants: ['이'] },
  'Yu': { kr: '유', initial: 'ㅇ', vowel: 'ㅠ', variants: ['유'] },

  // Mula (18)
  'Ye':  { kr: '예', initial: 'ㅇ', vowel: 'ㅖ', variants: ['예'] },
  'Yo':  { kr: '요', initial: 'ㅇ', vowel: 'ㅛ', variants: ['요'] },
  'Bha': { kr: '바', initial: 'ㅂ', vowel: 'ㅏ', variants: ['바'] },
  'Bhi': { kr: '비', initial: 'ㅂ', vowel: 'ㅣ', variants: ['비'] },

  // Purva Ashadha (19)
  'Bhu': { kr: '부', initial: 'ㅂ', vowel: 'ㅜ', variants: ['부'] },
  'Dha': { kr: '다', initial: 'ㄷ', vowel: 'ㅏ', variants: ['다'] },
  'Pha': { kr: '파', initial: 'ㅍ', vowel: 'ㅏ', variants: ['파'] },
  // 'Dha' repeated in original data

  // Uttara Ashadha (20)
  'Bhe': { kr: '베', initial: 'ㅂ', vowel: 'ㅔ', variants: ['베'] },
  'Bho': { kr: '보', initial: 'ㅂ', vowel: 'ㅗ', variants: ['보'] },
  'Ja':  { kr: '자', initial: 'ㅈ', vowel: 'ㅏ', variants: ['자'] },
  'Ji':  { kr: '지', initial: 'ㅈ', vowel: 'ㅣ', variants: ['지'] },

  // Shravana (21)
  'Ju': { kr: '주', initial: 'ㅈ', vowel: 'ㅜ', variants: ['주'] },
  'Je': { kr: '제', initial: 'ㅈ', vowel: 'ㅔ', variants: ['제'] },
  'Jo': { kr: '조', initial: 'ㅈ', vowel: 'ㅗ', variants: ['조'] },
  // 'Gha' already defined

  // Dhanishta (22)
  'Ga': { kr: '가', initial: 'ㄱ', vowel: 'ㅏ', variants: ['가'] },
  'Gi': { kr: '기', initial: 'ㄱ', vowel: 'ㅣ', variants: ['기'] },
  'Gu': { kr: '구', initial: 'ㄱ', vowel: 'ㅜ', variants: ['구'] },
  'Ge': { kr: '게', initial: 'ㄱ', vowel: 'ㅔ', variants: ['게'] },

  // Shatabhisha (23)
  'Go': { kr: '고', initial: 'ㄱ', vowel: 'ㅗ', variants: ['고'] },
  'Sa': { kr: '사', initial: 'ㅅ', vowel: 'ㅏ', variants: ['사'] },
  'Si': { kr: '시', initial: 'ㅅ', vowel: 'ㅣ', variants: ['시'] },
  'Su': { kr: '수', initial: 'ㅅ', vowel: 'ㅜ', variants: ['수'] },

  // Purva Bhadrapada (24)
  'Se': { kr: '세', initial: 'ㅅ', vowel: 'ㅔ', variants: ['세'] },
  'So': { kr: '소', initial: 'ㅅ', vowel: 'ㅗ', variants: ['소'] },
  // 'Da', 'Di' already defined

  // Uttara Bhadrapada (25)
  // 'Du', 'Tha' already defined
  'Jha': { kr: '자', initial: 'ㅈ', vowel: 'ㅏ', variants: ['자'] },
  // 'Da' already defined - uses 'Na' variant: { kr: '나' }

  // Revati (26)
  // 'De', 'Do' already defined
  'Cha': { kr: '차', initial: 'ㅊ', vowel: 'ㅏ', variants: ['차'] },
  'Chi': { kr: '치', initial: 'ㅊ', vowel: 'ㅣ', variants: ['치'] },
};

/**
 * Korean name ending syllables (종성) with meanings
 * Used to combine with Nakshatra initial syllable to form complete names
 */
export const NAME_ENDINGS = [
  // 자연 / 하늘 계열
  { syllable: '하', meaning: '크고 넓은', hanja: '夏/河', tags: ['nature', 'grand'] },
  { syllable: '별', meaning: '빛나는 별', hanja: null, tags: ['sky', 'light'] },
  { syllable: '빛', meaning: '밝은 빛', hanja: null, tags: ['light'] },
  { syllable: '달', meaning: '달빛', hanja: null, tags: ['sky', 'moon'] },
  { syllable: '솔', meaning: '소나무처럼 곧은', hanja: null, tags: ['nature', 'strong'] },
  { syllable: '봄', meaning: '봄처럼 따뜻한', hanja: null, tags: ['nature', 'warm'] },
  { syllable: '새', meaning: '새로운 시작', hanja: null, tags: ['new', 'nature'] },
  { syllable: '숲', meaning: '깊고 풍요로운', hanja: null, tags: ['nature', 'deep'] },
  { syllable: '온', meaning: '온전한, 따뜻한', hanja: '溫', tags: ['warm', 'whole'] },

  // 밝음 / 지혜 계열
  { syllable: '현', meaning: '밝고 지혜로운', hanja: '賢/玄', tags: ['wisdom', 'bright'] },
  { syllable: '준', meaning: '준수하고 뛰어난', hanja: '俊/準', tags: ['talent', 'beauty'] },
  { syllable: '민', meaning: '민첩하고 영리한', hanja: '敏/旻', tags: ['smart', 'quick'] },
  { syllable: '서', meaning: '상서롭고 빛나는', hanja: '瑞/書', tags: ['auspicious', 'light'] },
  { syllable: '율', meaning: '으뜸, 율동', hanja: '律/率', tags: ['first', 'rhythm'] },
  { syllable: '찬', meaning: '빛나고 찬란한', hanja: '燦/讚', tags: ['light', 'praise'] },
  { syllable: '빈', meaning: '빛나는', hanja: '彬/玭', tags: ['light', 'elegant'] },
  { syllable: '윤', meaning: '빛날 윤', hanja: '潤/允', tags: ['light', 'virtue'] },

  // 아름다움 / 고귀 계열
  { syllable: '린', meaning: '고운 옥, 맑은', hanja: '璘/琳', tags: ['beauty', 'jade'] },
  { syllable: '아', meaning: '아름다운', hanja: '雅/娥', tags: ['beauty', 'elegant'] },
  { syllable: '연', meaning: '아름답고 고운', hanja: '妍/蓮', tags: ['beauty', 'grace'] },
  { syllable: '우', meaning: '빼어난', hanja: '優/宇', tags: ['excellent', 'universe'] },
  { syllable: '인', meaning: '어질고 고귀한', hanja: '仁/寅', tags: ['virtue', 'noble'] },
  { syllable: '은', meaning: '은혜, 숨은 빛', hanja: '恩/銀', tags: ['grace', 'silver'] },

  // 강함 / 리더십 계열
  { syllable: '강', meaning: '강하고 굳센', hanja: '剛/康', tags: ['strong', 'health'] },
  { syllable: '진', meaning: '참되고 진실한', hanja: '眞/珍', tags: ['truth', 'precious'] },
  { syllable: '호', meaning: '호방하고 넓은', hanja: '浩/豪', tags: ['grand', 'brave'] },
  { syllable: '건', meaning: '굳세고 건강한', hanja: '健/建', tags: ['strong', 'build'] },
  { syllable: '웅', meaning: '영웅의 기상', hanja: '雄', tags: ['hero', 'grand'] },

  // 따뜻함 / 조화 계열
  { syllable: '누리', meaning: '세상, 온 누리', hanja: null, tags: ['world', 'nature'] },
  { syllable: '나래', meaning: '날개, 비상', hanja: null, tags: ['fly', 'freedom'] },
  { syllable: '나', meaning: '나아가는', hanja: null, tags: ['progress'] },
  { syllable: '담', meaning: '담백하고 맑은', hanja: '淡/潭', tags: ['pure', 'calm'] },
  { syllable: '결', meaning: '맑고 깨끗한 결', hanja: '潔', tags: ['pure', 'clean'] },
  { syllable: '한', meaning: '크고 한결같은', hanja: '翰/韓', tags: ['grand', 'steady'] },
  { syllable: '름', meaning: '아름다운 (어미)', hanja: null, tags: ['beauty'] },

  // 평화 / 행복 계열
  { syllable: '평', meaning: '평화로운', hanja: '平', tags: ['peace'] },
  { syllable: '안', meaning: '편안한', hanja: '安', tags: ['peace', 'comfort'] },
  { syllable: '랑', meaning: '사랑', hanja: null, tags: ['love'] },
  { syllable: '희', meaning: '기쁨, 빛', hanja: '熙/喜', tags: ['joy', 'light'] },
  { syllable: '복', meaning: '복된', hanja: '福', tags: ['blessing'] },

  // 성장 / 꿈 계열
  { syllable: '솟', meaning: '솟아오르는', hanja: null, tags: ['rise'] },
  { syllable: '꿈', meaning: '꿈을 품은', hanja: null, tags: ['dream'] },
  { syllable: '잎', meaning: '싹트는 생명', hanja: null, tags: ['growth', 'nature'] },
  { syllable: '샘', meaning: '샘솟는 생명력', hanja: null, tags: ['spring', 'life'] },
  { syllable: '길', meaning: '길하고 좋은', hanja: '吉', tags: ['auspicious', 'path'] },

  // 추가 2음절 이름용
  { syllable: '루', meaning: '빛나는 보석', hanja: null, tags: ['gem', 'light'] },
  { syllable: '라', meaning: '빛나는', hanja: null, tags: ['light'] },
  { syllable: '리', meaning: '이로운', hanja: '利/理', tags: ['benefit', 'reason'] },
  { syllable: '수', meaning: '빼어난, 수려한', hanja: '秀/壽', tags: ['excellent', 'long-life'] },
  { syllable: '이', meaning: '이로운', hanja: '利', tags: ['benefit'] },
];

/**
 * Nakshatra quality tags → preferred name ending tags mapping
 * Used to score name endings based on Nakshatra energy
 */
export const QUALITY_TAG_MAP = {
  'healing': ['warm', 'life', 'spring'],
  'speed': ['quick', 'fly', 'freedom'],
  'creativity': ['beauty', 'light', 'dream'],
  'nurturing': ['warm', 'nature', 'comfort'],
  'leadership': ['strong', 'hero', 'grand'],
  'wisdom': ['wisdom', 'bright', 'truth'],
  'transformation': ['deep', 'truth', 'rise'],
  'abundance': ['blessing', 'nature', 'grand'],
  'communication': ['smart', 'quick', 'benefit'],
  'spirituality': ['peace', 'pure', 'whole'],
  'courage': ['strong', 'brave', 'hero'],
  'beauty': ['beauty', 'elegant', 'jade'],
  'devotion': ['love', 'virtue', 'grace'],
  'independence': ['freedom', 'fly', 'new'],
  'royalty': ['noble', 'grand', 'first'],
  'service': ['virtue', 'peace', 'benefit'],
};
