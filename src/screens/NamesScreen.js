/**
 * Names Screen - Multilingual name recommendations
 * Tabs: 한국어 / 인도식 (Sanskrit) / 영어 (English)
 */
import { generateNames, getIndianNames, getEnglishNames, getSyllableInfo } from '../engine/nameGenerator.js';

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

      <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;justify-content:center">
        <button class="btn-primary" id="btn-more-names">다른 이름 보기</button>
        <button class="btn-primary" id="btn-to-result" style="background:rgba(123,104,238,0.08);border-color:rgba(123,104,238,0.3);color:var(--accent-purple-light)">
          종합 결과 보기 →
        </button>
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

    // More names (Korean only - regenerates with randomness)
    this.el.querySelector('#btn-more-names').addEventListener('click', () => {
      this.renderTab(this.currentTab, data);
    });

    // Result button
    this.el.querySelector('#btn-to-result').addEventListener('click', () => {
      const { nakshatraResult } = data;
      const allNames = [
        ...generateNames(nakshatraResult.nakshatraIndex, nakshatraResult.padaIndex, { gender: data.gender, count: 5 }),
        ...getIndianNames(nakshatraResult.nakshatraIndex, { gender: data.gender }).slice(0, 3),
        ...getEnglishNames(nakshatraResult.nakshatraIndex, { gender: data.gender }).slice(0, 3),
      ];
      this.router.navigateTo('result', { ...data, selectedNames: allNames });
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
