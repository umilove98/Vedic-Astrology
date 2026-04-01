/**
 * Nakshatra List Screen - Encyclopedia of all 27 Nakshatras
 */
import { NAKSHATRAS } from '../data/nakshatras.js';
import { PROFILES } from '../data/profiles.js';

export class NakshatraListScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'screen nakshatra-list-screen';
    div.innerHTML = `
      <h2 class="text-shimmer">27 낙샤트라</h2>
      <p style="text-align:center;font-size:0.88rem;color:var(--text-secondary);max-width:520px;margin-bottom:24px;line-height:1.8">
        달이 황도를 따라 이동하며 머무는 27개의 별자리 구역입니다.<br/>
        각 낙샤트라는 고유한 에너지, 수호신, 지배 행성을 가지고 있어요.
      </p>
      <div class="nakshatra-grid" id="nakshatra-grid">
        ${NAKSHATRAS.map((nk, i) => {
          const profile = PROFILES[i];
          return `
          <div class="nk-card" data-id="${i}">
            <div class="nk-card-header">
              <span class="nk-symbol">${nk.symbol}</span>
              <div class="nk-title">
                <span class="nk-name-kr">${nk.nameKr}</span>
                <span class="nk-name-en">${nk.name}</span>
              </div>
              <span class="nk-deg">${nk.startDeg.toFixed(1)}°–${nk.endDeg.toFixed(1)}°</span>
            </div>
            <div class="nk-card-body" style="display:none">
              <p style="margin-bottom:10px;line-height:1.8">${nk.description}</p>
              <div class="nk-info-grid">
                <div class="nk-info-item"><span class="nk-label">의미</span><span class="nk-value">${nk.meaning}</span></div>
                <div class="nk-info-item"><span class="nk-label">수호신</span><span class="nk-value">${nk.deityKr}</span></div>
                <div class="nk-info-item"><span class="nk-label">지배 행성</span><span class="nk-value">${nk.lordKr}</span></div>
                <div class="nk-info-item"><span class="nk-label">라시</span><span class="nk-value">${nk.rashiKr}</span></div>
                <div class="nk-info-item"><span class="nk-label">원소</span><span class="nk-value">${nk.element}</span></div>
                <div class="nk-info-item"><span class="nk-label">구나</span><span class="nk-value">${nk.guna}</span></div>
                <div class="nk-info-item"><span class="nk-label">가나</span><span class="nk-value">${nk.gana}</span></div>
                <div class="nk-info-item"><span class="nk-label">상징 동물</span><span class="nk-value">${nk.animalKr}</span></div>
                <div class="nk-info-item"><span class="nk-label">파다 음절</span><span class="nk-value">${nk.syllablesKr.join(', ')}</span></div>
              </div>
              ${profile?.personality?.keywords?.length ? `
              <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-subtle);display:flex;gap:6px;flex-wrap:wrap">
                ${profile.personality.keywords.map(k => `<span style="padding:4px 12px;border-radius:16px;font-size:0.8rem;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);color:var(--accent-gold-light)">${k}</span>`).join('')}
              </div>` : ''}
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
    return div;
  }

  onEnter() {
    // Card click to expand/collapse
    this.el.querySelectorAll('.nk-card').forEach(card => {
      card.querySelector('.nk-card-header').addEventListener('click', () => {
        const body = card.querySelector('.nk-card-body');
        const isOpen = body.style.display === 'block';
        // Close all
        this.el.querySelectorAll('.nk-card-body').forEach(b => b.style.display = 'none');
        this.el.querySelectorAll('.nk-card').forEach(c => c.classList.remove('nk-open'));
        if (!isOpen) {
          body.style.display = 'block';
          card.classList.add('nk-open');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }
}
