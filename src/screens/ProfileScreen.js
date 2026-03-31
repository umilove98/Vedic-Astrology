/**
 * Profile Screen - Comprehensive fortune/personality analysis
 * The main "사주풀이" screen with accordion sections
 */
import { generateProfile, formatDashaTimeline } from '../engine/profileAnalyzer.js';

export class ProfileScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
    this.profile = null;
  }

  render(data) {
    const div = document.createElement('div');
    div.className = 'screen profile-screen';

    this.profile = generateProfile(data.nakshatraResult, data.birthYear);
    const p = this.profile;

    div.innerHTML = `
      <div class="profile-header">
        <h2>당신의 별자리 분석</h2>
        <div class="nakshatra-name text-shimmer">${p.basic.nakshatraSymbol} ${p.basic.nakshatraNameKr}</div>
        <div class="nakshatra-sub">${p.basic.nakshatraName} · ${p.basic.pada}번째 파다(Pada)</div>
      </div>

      <div class="profile-summary">
        <div class="tag"><strong>라시:</strong> ${p.basic.rashiSymbol} ${p.basic.rashiName}</div>
        <div class="tag"><strong>지배 행성:</strong> ${p.basic.lordSymbol} ${p.basic.lordName}</div>
        <div class="tag"><strong>원소:</strong> ${p.basic.rashiElement}</div>
        <div class="tag"><strong>수호신:</strong> ${p.basic.deityName}</div>
        <div class="tag"><strong>구나:</strong> ${p.basic.guna}</div>
        <div class="tag"><strong>가나:</strong> ${p.basic.gana}</div>
      </div>

      <div class="profile-sections" id="profile-sections">
        ${this.renderSection('personality', '✦', '성격 분석', '당신은 어떤 사람인가요', p.personality)}
        ${this.renderPastLifeSection(p.pastLife)}
        ${this.renderSection('career', '◈', '적성 & 직업', '별이 가리키는 길', p.career)}
        ${this.renderSection('relationships', '❋', '대인관계 & 궁합', '인연의 별자리', p.relationships)}
        ${this.renderSection('health', '✧', '건강 & 웰빙', '몸과 마음의 균형', p.health)}
        ${this.renderLuckySection(p.lucky)}
        ${this.renderDashaSection(p.dasha, data.birthYear)}
        ${this.renderPlanetSection(p.planet)}
        ${this.renderRashiSection(p.rashiDetail)}
      </div>

      <button class="btn-primary profile-next-btn" id="btn-to-names">
        이름 추천 받기 →
      </button>
    `;
    return div;
  }

  onEnter(data) {
    // Accordion toggle
    this.el.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.parentElement;
        const body = section.querySelector('.section-body');
        const isOpen = section.classList.contains('open');

        if (isOpen) {
          section.classList.remove('open');
          body.style.maxHeight = '0';
          body.style.padding = '0 22px';
        } else {
          section.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 40 + 'px';
          body.style.padding = '0 22px 20px';
        }
      });
    });

    // Auto-open first section
    const first = this.el.querySelector('.profile-section');
    if (first) {
      first.classList.add('open');
      const body = first.querySelector('.section-body');
      body.style.maxHeight = body.scrollHeight + 40 + 'px';
      body.style.padding = '0 22px 20px';
    }

    // Next button
    this.el.querySelector('#btn-to-names').addEventListener('click', () => {
      this.router.navigateTo('names', data);
    });
  }

  // === Section renderers ===

  renderSection(type, icon, title, subtitle, data) {
    if (!data) return '';
    let bodyHTML = '';

    if (type === 'personality') {
      bodyHTML = `
        <p>${data.summary}</p>
        <div class="keyword-list">
          ${(data.keywords || []).map(k => `<span class="keyword">${k}</span>`).join('')}
        </div>
        ${data.strengths ? `<p><strong style="color:var(--accent-gold)">강점:</strong> ${data.strengths.join(', ')}</p>` : ''}
        ${data.weaknesses ? `<p><strong style="color:var(--accent-rose)">약점:</strong> ${data.weaknesses.join(', ')}</p>` : ''}
        ${data.innerDesire ? `<p><strong style="color:var(--accent-purple-light)">내면의 욕구:</strong> ${data.innerDesire}</p>` : ''}
      `;
    } else if (type === 'career') {
      bodyHTML = `
        <p>${data.summary}</p>
        ${data.fields ? `<div class="keyword-list">${data.fields.map(f => `<span class="keyword">${f}</span>`).join('')}</div>` : ''}
        ${data.talents ? `<p><strong style="color:var(--accent-gold)">타고난 재능:</strong> ${data.talents.join(', ')}</p>` : ''}
      `;
    } else if (type === 'relationships') {
      bodyHTML = `
        <p>${data.summary}</p>
        ${data.style ? `<p>${data.style}</p>` : ''}
      `;
    } else if (type === 'health') {
      bodyHTML = `
        <p>${data.summary}</p>
        ${data.vulnerabilities ? `<p><strong style="color:var(--accent-rose)">주의 영역:</strong> ${data.vulnerabilities.join(', ')}</p>` : ''}
        ${data.recommendations ? `<p><strong style="color:var(--accent-cyan)">추천:</strong> ${data.recommendations.join(', ')}</p>` : ''}
      `;
    }

    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">${icon}</span> ${title} <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— ${subtitle}</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          ${bodyHTML}
        </div>
      </div>
    `;
  }

  renderPastLifeSection(pastLife) {
    if (!pastLife) return '';
    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">☾</span> 영혼의 여정 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— 전생과 이번 생의 과제</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          <div style="margin-bottom:16px">
            <p style="color:var(--accent-purple-light);font-size:0.82em;margin-bottom:6px">✦ 케투(Ketu) — 전생에서 가져온 것</p>
            <p>${pastLife.ketu}</p>
          </div>
          <div style="margin-bottom:16px">
            <p style="color:var(--accent-cyan);font-size:0.82em;margin-bottom:6px">✦ 라후(Rahu) — 이번 생의 과제</p>
            <p>${pastLife.rahu}</p>
          </div>
          ${pastLife.soulLesson ? `
          <div style="border-top:1px solid var(--border-subtle);padding-top:12px;margin-top:8px">
            <p style="color:var(--accent-gold-light);font-style:italic">"${pastLife.soulLesson}"</p>
          </div>` : ''}
        </div>
      </div>
    `;
  }

  renderLuckySection(lucky) {
    if (!lucky) return '';
    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">✦</span> 행운의 요소 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— 당신의 행운</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          <div class="lucky-grid">
            ${lucky.numbers ? `<div class="lucky-item"><div class="lucky-label">행운의 숫자</div><div class="lucky-value">${lucky.numbers.join(', ')}</div></div>` : ''}
            ${lucky.colors ? `<div class="lucky-item"><div class="lucky-label">행운의 색상</div><div class="lucky-value">${lucky.colors.join(', ')}</div></div>` : ''}
            ${lucky.day ? `<div class="lucky-item"><div class="lucky-label">행운의 요일</div><div class="lucky-value">${lucky.day}</div></div>` : ''}
            ${lucky.direction ? `<div class="lucky-item"><div class="lucky-label">행운의 방위</div><div class="lucky-value">${lucky.direction}</div></div>` : ''}
            ${lucky.gemstone ? `<div class="lucky-item"><div class="lucky-label">행운의 보석</div><div class="lucky-value">${lucky.gemstone}</div></div>` : ''}
            ${lucky.mantra ? `<div class="lucky-item"><div class="lucky-label">만트라</div><div class="lucky-value" style="font-size:0.8em">${lucky.mantra}</div></div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  renderDashaSection(dasha, birthYear) {
    if (!dasha || !dasha.timeline) return '';
    const timeline = formatDashaTimeline(dasha);

    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">⟳</span> 인생의 대운 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— 다샤(Dasha) 시스템</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          <p style="margin-bottom:12px">베딕 점성술의 비밀쇼타리 다샤(Vimshottari Dasha) 시스템은 120년의 인생을 9개 행성이 순서대로 지배한다고 봅니다.</p>
          ${dasha.description ? `<p style="margin-bottom:16px">${dasha.description}</p>` : ''}
          <div style="display:flex;flex-direction:column;gap:6px">
            ${timeline.map(d => `
              <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;
                background:${d.isCurrent ? 'rgba(201,168,76,0.12)' : 'rgba(15,15,50,0.4)'};
                border:1px solid ${d.isCurrent ? 'var(--border-glow)' : 'transparent'};
                opacity:${d.isPast ? '0.5' : '1'}">
                <span style="font-size:0.85em;color:${d.isCurrent ? 'var(--accent-gold-light)' : 'var(--text-secondary)'};min-width:130px">
                  ${d.planetKr}
                </span>
                <span style="font-size:0.8em;color:var(--text-secondary)">${d.startYear}~${d.endYear}</span>
                <span style="font-size:0.75em;color:var(--text-secondary)">(${d.years}년)</span>
                ${d.isCurrent ? '<span style="font-size:0.7em;color:var(--accent-gold);margin-left:auto">← 현재</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderPlanetSection(planet) {
    if (!planet) return '';
    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">${planet.symbol}</span> 지배 행성 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— ${planet.name} (${planet.nameSanskrit})</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          <p>${planet.description}</p>
          ${planet.qualities ? `<div class="keyword-list">${planet.qualities.map(q => `<span class="keyword">${q}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    `;
  }

  renderRashiSection(rashi) {
    if (!rashi) return '';
    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">${rashi.symbol}</span> 라시 (별자리) <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— ${rashi.name}</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">
          <p>${rashi.description}</p>
          <div class="keyword-list">${rashi.traits.map(t => `<span class="keyword">${t}</span>`).join('')}</div>
          <p style="font-size:0.85em;color:var(--text-secondary);margin-top:8px">
            <strong>원소:</strong> ${rashi.element} · <strong>지배자:</strong> ${rashi.ruler}
          </p>
        </div>
      </div>
    `;
  }
}
