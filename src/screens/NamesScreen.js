/**
 * Names Screen - Multilingual name recommendations
 * Tabs: 한국어 / 인도식 (Sanskrit) / 영어 (English)
 */
import { generateNames, getIndianNames, getEnglishNames, getSyllableInfo } from '../engine/nameGenerator.js';

/**
 * Romanized Sanskrit/Indian name → Korean pronunciation (한글 음역)
 * Greedy left-to-right matching with jamo post-processing
 */
function toKrPronunciation(name) {
  const s = name.toLowerCase();
  const map = [
    // Multi-consonant clusters
    ['ksh', '크쉬'], ['ng', '응'],
    // Aspirated + vowel (longest first)
    ['sha', '샤'], ['shi', '쉬'], ['shu', '슈'], ['she', '셰'], ['sho', '쇼'],
    ['cha', '차'], ['chi', '치'], ['chu', '추'], ['che', '체'], ['cho', '초'],
    ['tha', '타'], ['thi', '티'], ['thu', '투'], ['the', '테'], ['tho', '토'],
    ['pha', '파'], ['phi', '피'], ['phu', '푸'], ['phe', '페'], ['pho', '포'],
    ['kha', '카'], ['khi', '키'], ['khu', '쿠'], ['khe', '케'], ['kho', '코'],
    ['gha', '가'], ['ghi', '기'], ['ghu', '구'], ['ghe', '게'], ['gho', '고'],
    ['bha', '바'], ['bhi', '비'], ['bhu', '부'], ['bhe', '베'], ['bho', '보'],
    ['dha', '다'], ['dhi', '디'], ['dhu', '두'], ['dhe', '데'], ['dho', '도'],
    ['jha', '자'], ['jhi', '지'], ['jhu', '주'], ['jhe', '제'], ['jho', '조'],
    // Nasal + y
    ['nya', '냐'], ['nyu', '뉴'], ['nyo', '뇨'],
    // Standard consonant + vowel
    ['ka', '카'], ['ki', '키'], ['ku', '쿠'], ['ke', '케'], ['ko', '코'],
    ['ga', '가'], ['gi', '기'], ['gu', '구'], ['ge', '게'], ['go', '고'],
    ['ja', '자'], ['ji', '지'], ['ju', '주'], ['je', '제'], ['jo', '조'],
    ['ta', '타'], ['ti', '티'], ['tu', '투'], ['te', '테'], ['to', '토'],
    ['da', '다'], ['di', '디'], ['du', '두'], ['de', '데'], ['do', '도'],
    ['na', '나'], ['ni', '니'], ['nu', '누'], ['ne', '네'], ['no', '노'],
    ['pa', '파'], ['pi', '피'], ['pu', '푸'], ['pe', '페'], ['po', '포'],
    ['ba', '바'], ['bi', '비'], ['bu', '부'], ['be', '베'], ['bo', '보'],
    ['ma', '마'], ['mi', '미'], ['mu', '무'], ['me', '메'], ['mo', '모'],
    ['ya', '야'], ['yi', '이'], ['yu', '유'], ['ye', '예'], ['yo', '요'],
    ['ra', '라'], ['ri', '리'], ['ru', '루'], ['re', '레'], ['ro', '로'],
    ['la', '라'], ['li', '리'], ['lu', '루'], ['le', '레'], ['lo', '로'],
    ['va', '바'], ['vi', '비'], ['vu', '부'], ['ve', '베'], ['vo', '보'],
    ['wa', '와'], ['wi', '위'], ['wu', '우'], ['we', '웨'], ['wo', '워'],
    ['sa', '사'], ['si', '시'], ['su', '수'], ['se', '세'], ['so', '소'],
    ['ha', '하'], ['hi', '히'], ['hu', '후'], ['he', '헤'], ['ho', '호'],
    ['fa', '파'], ['fi', '피'], ['fu', '푸'], ['fe', '페'], ['fo', '포'],
    ['za', '자'], ['zi', '지'], ['zu', '주'], ['ze', '제'], ['zo', '조'],
    // Standalone vowels
    ['aa', '아'], ['ee', '이'], ['oo', '우'], ['ai', '아이'], ['au', '아우'],
    ['a', '아'], ['i', '이'], ['u', '우'], ['e', '에'], ['o', '오'],
    // Final consonants (no vowel follows)
    ['sh', '쉬'], ['ch', '치'], ['th', '트'], ['ph', '프'],
    ['n', 'ㄴ'], ['m', 'ㅁ'],
    ['k', '크'], ['g', '그'], ['t', '트'], ['d', '드'],
    ['p', '프'], ['b', '브'], ['r', '르'], ['l', '르'],
    ['s', '스'], ['h', '흐'],
  ];

  let result = '';
  let i = 0;
  while (i < s.length) {
    let matched = false;
    for (const [from, to] of map) {
      if (s.startsWith(from, i)) {
        result += to;
        i += from.length;
        matched = true;
        break;
      }
    }
    if (!matched) i++;
  }

  // Post-process: merge trailing jamo ㄴ/ㅁ into previous Korean syllable
  // Korean syllable = 0xAC00 + (cho*21+jung)*28 + jong
  // ㄴ=jong4, ㅁ=jong16
  result = result.replace(/([가-힣])ㄴ/g, (_, ch) => {
    const code = ch.charCodeAt(0) - 0xAC00;
    return (code % 28 === 0) ? String.fromCharCode(ch.charCodeAt(0) + 4) : _ ;
  });
  result = result.replace(/([가-힣])ㅁ/g, (_, ch) => {
    const code = ch.charCodeAt(0) - 0xAC00;
    return (code % 28 === 0) ? String.fromCharCode(ch.charCodeAt(0) + 16) : _;
  });

  return result;
}

export class NamesScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
    this.data = null;
    this.currentTab = 'korean';
  }

  render(data) {
    this.data = data;
    const { nakshatraResult } = data;
    const syllableInfo = getSyllableInfo(nakshatraResult.nakshatraIndex, nakshatraResult.padaIndex);

    const div = document.createElement('div');
    div.className = 'screen names-screen';
    div.innerHTML = `
      <h2 class="text-shimmer">이름 추천</h2>

      <div class="names-explanation">
        각 낙샤트라의 <em>파다(Pada, 1/4 구역)</em>에는 고유한 음절이 배정됩니다.<br/>
        이 음절로 시작하는 이름은 탄생 별의 에너지와 공명하며,<br/>
        베딕 전통에서는 이런 이름이 행운과 조화를 가져온다고 믿어요.
      </div>

      <div>
        <span style="font-size:0.85rem;color:var(--text-secondary)">
          ${nakshatraResult.nakshatra.nameKr}(${nakshatraResult.nakshatra.name}) · ${nakshatraResult.pada}파다가 부여한 음절
        </span>
      </div>

      <div class="syllable-badge">
        ${syllableInfo.korean} (${syllableInfo.romanized})
      </div>

      <div class="name-tabs" id="name-tabs">
        <button class="name-tab active" data-tab="korean">한국어</button>
        <button class="name-tab" data-tab="indian">인도식</button>
        <button class="name-tab" data-tab="english">영어</button>
      </div>

      <div class="names-grid" id="names-grid"></div>


      <div class="screen-nav">
        <button class="screen-nav-btn" data-go="profile">☾ 운세 분석</button>
        <button class="screen-nav-btn active-nav">✧ 이름 추천</button>
        <button class="screen-nav-btn" data-go="result">◈ 종합 결과</button>
      </div>
    `;
    return div;
  }

  onEnter(data) {
    this.renderTab('korean', data);

    // Tab switching
    this.el.querySelectorAll('.name-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.el.querySelectorAll('.name-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.tab;
        this.renderTab(this.currentTab, data);
      });
    });

    // Screen nav buttons
    this.el.querySelectorAll('.screen-nav-btn[data-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.go;
        if (target === 'result') {
          const { nakshatraResult } = data;
          const allNames = [
            ...generateNames(nakshatraResult.nakshatraIndex, nakshatraResult.padaIndex, { gender: data.gender, count: 5 }),
            ...getIndianNames(nakshatraResult.nakshatraIndex, { gender: data.gender }).slice(0, 3),
            ...getEnglishNames(nakshatraResult.nakshatraIndex, { gender: data.gender }).slice(0, 3),
          ];
          this.router.navigateTo('result', { ...data, selectedNames: allNames });
        } else {
          this.router.navigateTo(target, data);
        }
      });
    });
  }

  renderTab(tab, data) {
    const { nakshatraResult } = data;
    const grid = this.el.querySelector('#names-grid');
    let cards = '';

    if (tab === 'korean') {
      const names = generateNames(nakshatraResult.nakshatraIndex, nakshatraResult.padaIndex, {
        gender: data.gender, count: 10,
      });
      cards = names.map((n, i) => `
        <div class="name-card fade-in-up delay-${Math.min(i + 1, 8)}">
          <div class="name-hangul">${n.name}</div>
          <div class="name-meaning">${n.meaning}${n.hanja ? ` (${n.hanja})` : ''}</div>
          <div class="name-detail">${n.nakshatraConnection}</div>
        </div>
      `).join('');
    } else if (tab === 'indian') {
      const names = getIndianNames(nakshatraResult.nakshatraIndex, { gender: data.gender });
      cards = names.map((n, i) => `
        <div class="name-card fade-in-up delay-${Math.min(i + 1, 8)}">
          <div class="name-hangul" style="font-family:var(--font-sans)">${n.name}</div>
          <div style="font-size:0.9rem;color:var(--accent-purple-light);margin:2px 0 4px">읽는 법: ${toKrPronunciation(n.name)}</div>
          <div class="name-meaning">${n.meaning}</div>
          <div class="name-detail">${n.origin}</div>
        </div>
      `).join('');
    } else if (tab === 'english') {
      const names = getEnglishNames(nakshatraResult.nakshatraIndex, { gender: data.gender });
      cards = names.map((n, i) => `
        <div class="name-card fade-in-up delay-${Math.min(i + 1, 8)}">
          <div class="name-hangul" style="font-family:var(--font-sans)">${n.name}</div>
          <div class="name-meaning">${n.meaning}</div>
          <div class="name-detail">${n.origin}</div>
        </div>
      `).join('');
    }

    grid.innerHTML = cards;

    // Card click to expand
    grid.querySelectorAll('.name-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('expanded'));
    });
  }
}
