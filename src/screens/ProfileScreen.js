/**
 * Profile Screen - Comprehensive fortune/personality analysis
 * The main "사주풀이" screen with accordion sections
 */
import { generateProfile, formatDashaTimeline } from '../engine/profileAnalyzer.js';

function gunaTooltip(guna) {
  const map = {
    'Sattva': '사트바 — 순수·조화·지혜의 에너지. 평온하고 영적인 성향',
    'Rajas':  '라자스 — 활동·열정·야망의 에너지. 역동적이고 추진력 있는 성향',
    'Tamas':  '타마스 — 안정·지구력·관성의 에너지. 현실적이고 단단한 성향',
  };
  return map[guna] || guna;
}

function ganaTooltip(gana) {
  const map = {
    'Deva':     '데바(신적) — 온화하고 자비로우며, 도덕적 가치를 중시하는 기질',
    'Manushya': '마누쉬야(인간적) — 균형 잡히고 실용적이며, 세상과 조화를 이루는 기질',
    'Rakshasa': '락샤사(마적) — 강렬하고 독립적이며, 관습에 얽매이지 않는 자유로운 기질',
  };
  return map[gana] || gana;
}

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
        <div class="tag tag-tooltip"><strong>구나:</strong> ${p.basic.guna}<span class="tooltip-text">${gunaTooltip(p.basic.guna)}</span></div>
        <div class="tag tag-tooltip"><strong>가나:</strong> ${p.basic.gana}<span class="tooltip-text">${ganaTooltip(p.basic.gana)}</span></div>
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

      <div class="screen-nav">
        <button class="screen-nav-btn active-nav">☾ 운세 분석</button>
        <button class="screen-nav-btn" data-go="names">✧ 이름 추천</button>
        <button class="screen-nav-btn" data-go="result">◈ 종합 결과</button>
      </div>
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

    // Dasha row click → toggle detail
    this.el.querySelectorAll('.dasha-row').forEach(row => {
      row.addEventListener('click', () => {
        const detail = row.nextElementSibling;
        if (!detail || !detail.classList.contains('dasha-detail')) return;
        const isOpen = detail.style.display === 'block';
        // Close all others
        this.el.querySelectorAll('.dasha-detail').forEach(d => d.style.display = 'none');
        detail.style.display = isOpen ? 'none' : 'block';
      });
    });

    // Screen nav buttons
    this.el.querySelectorAll('.screen-nav-btn[data-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.router.navigateTo(btn.dataset.go, data);
      });
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
        ${data.love ? `
        <div style="margin-top:14px">
          <p style="color:var(--accent-rose);font-size:0.82em;margin-bottom:4px">❤ 연애 스타일</p>
          <p>${data.love}</p>
        </div>` : ''}
        ${data.friendship ? `
        <div style="margin-top:14px">
          <p style="color:var(--accent-cyan);font-size:0.82em;margin-bottom:4px">✦ 우정 & 사회적 관계</p>
          <p>${data.friendship}</p>
        </div>` : ''}
        ${data.family ? `
        <div style="margin-top:14px">
          <p style="color:var(--accent-purple-light);font-size:0.82em;margin-bottom:4px">☾ 가족 관계</p>
          <p>${data.family}</p>
        </div>` : ''}
        ${data.idealPartner ? `
        <div style="margin-top:14px">
          <p style="color:var(--accent-gold);font-size:0.82em;margin-bottom:4px">✧ 이상적인 파트너</p>
          <p>${data.idealPartner}</p>
        </div>` : ''}
        ${data.challenges ? `
        <div style="margin-top:14px">
          <p style="color:var(--accent-rose);font-size:0.82em;margin-bottom:4px">⚡ 관계에서의 과제</p>
          <p>${data.challenges}</p>
        </div>` : ''}
        ${data.style ? `<p style="margin-top:14px;font-style:italic;color:var(--text-secondary)">${data.style}</p>` : ''}
      `;
    } else if (type === 'health') {
      bodyHTML = `
        <p>${data.summary}</p>
        ${data.bodyParts ? `<p style="margin-top:12px"><strong style="color:var(--accent-gold)">지배 신체 부위:</strong> ${data.bodyParts}</p>` : ''}
        ${data.constitution ? `<p style="margin-top:8px"><strong style="color:var(--accent-purple-light)">아유르베딕 체질:</strong> ${data.constitution}</p>` : ''}
        ${data.vulnerabilities ? `<p style="margin-top:12px"><strong style="color:var(--accent-rose)">주의 영역:</strong> ${data.vulnerabilities.join(', ')}</p>` : ''}
        ${data.recommendations ? `
        <div style="margin-top:12px">
          <strong style="color:var(--accent-cyan)">건강 추천:</strong>
          <ul style="margin-top:6px;padding-left:18px;list-style:none">
            ${data.recommendations.map(r => `<li style="margin-bottom:4px;position:relative;padding-left:14px"><span style="position:absolute;left:0;color:var(--accent-gold)">·</span>${r}</li>`).join('')}
          </ul>
        </div>` : ''}
        ${data.diet ? `
        <div style="margin-top:14px;padding:12px;border-radius:10px;background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.1)">
          <p style="color:var(--accent-cyan);font-size:0.82em;margin-bottom:4px">🍽 식이 추천</p>
          <p>${data.diet}</p>
        </div>` : ''}
        ${data.yoga ? `
        <div style="margin-top:10px;padding:12px;border-radius:10px;background:rgba(123,104,238,0.04);border:1px solid rgba(123,104,238,0.1)">
          <p style="color:var(--accent-purple-light);font-size:0.82em;margin-bottom:4px">🧘 요가 & 수련</p>
          <p>${data.yoga}</p>
        </div>` : ''}
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
    const currentPeriod = timeline.find(d => d.isCurrent);
    const birthPeriod = timeline[0];

    return `
      <div class="profile-section fade-in-up">
        <div class="section-header">
          <h3><span class="icon">⟳</span> 인생의 대운 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— 다샤(Dasha) 시스템</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">

          <p style="margin-bottom:6px">베딕 점성술에서 <strong style="color:var(--accent-gold-light)">대운(마하다샤, Mahadasha)</strong>이란 인생의 특정 시기를 지배하는 행성의 에너지를 뜻합니다.</p>
          <p style="margin-bottom:16px;font-size:0.85em;color:var(--text-secondary)">120년의 인생을 9개 행성이 순서대로 지배하며, 각 시기마다 삶의 테마와 에너지가 달라집니다.</p>

          ${currentPeriod ? `
          <div style="padding:16px;border-radius:12px;background:rgba(201,168,76,0.08);border:1px solid var(--border-glow);margin-bottom:20px">
            <div style="font-size:0.78em;color:var(--accent-gold);margin-bottom:6px;letter-spacing:1px">✦ 현재 대운</div>
            <div style="font-family:var(--font-serif);font-size:1.15em;color:var(--accent-gold-light);margin-bottom:4px">
              ${currentPeriod.planetKr}
              <span style="font-size:0.7em;color:var(--text-secondary);font-weight:300"> ${currentPeriod.startYear}~${currentPeriod.endYear} (${currentPeriod.years}년)</span>
            </div>
            <p style="font-size:0.9em;line-height:1.8;margin-top:8px">${currentPeriod.desc}</p>
          </div>
          ` : ''}

          <div style="font-size:0.82em;color:var(--text-secondary);margin-bottom:10px">전체 대운 타임라인</div>
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
            ${timeline.map(d => `
              <div class="dasha-row${d.isCurrent ? ' dasha-current' : ''}" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;
                background:${d.isCurrent ? 'rgba(201,168,76,0.12)' : 'rgba(15,15,50,0.4)'};
                border:1px solid ${d.isCurrent ? 'var(--border-glow)' : 'transparent'};
                opacity:${d.isPast ? '0.5' : '1'};cursor:pointer;transition:all 0.25s ease">
                <span style="font-size:0.85em;color:${d.isCurrent ? 'var(--accent-gold-light)' : 'var(--text-secondary)'};min-width:130px">
                  ${d.planetKr}
                </span>
                <span style="font-size:0.8em;color:var(--text-secondary)">${d.startYear}~${d.endYear}</span>
                <span style="font-size:0.75em;color:var(--text-secondary)">(${d.years}년)</span>
                ${d.isCurrent ? '<span style="font-size:0.7em;color:var(--accent-gold);margin-left:auto">← 현재</span>' : ''}
                ${d.isFirst ? '<span style="font-size:0.7em;color:var(--accent-purple-light);margin-left:auto">출생</span>' : ''}
              </div>
              <div class="dasha-detail" style="display:none;padding:8px 14px 12px;font-size:0.85em;color:var(--text-secondary);line-height:1.8;border-left:2px solid var(--border-glow);margin:0 0 4px 12px">
                ${d.desc}
              </div>
            `).join('')}
          </div>

          <div style="padding:12px;border-radius:10px;background:rgba(123,104,238,0.06);border:1px solid rgba(123,104,238,0.12);font-size:0.82em;color:var(--accent-purple-light);line-height:1.8">
            <strong>행성 참고:</strong> 화성·금성·태양·달·수성·목성·토성은 실제 천체이고,
            <strong>라후</strong>(달의 북쪽 교점)와 <strong>케투</strong>(남쪽 교점)는 달의 궤도가 황도와 만나는 천문학적 지점으로, 베딕 점성술에서 행성과 동등하게 다룹니다.
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
          <h3><span class="icon">${planet.symbol}</span> 낙샤트라 지배 행성 <span style="font-size:0.75em;color:var(--text-secondary);font-weight:300">— ${planet.modernName} · ${planet.name} (${planet.nameSanskrit})</span></h3>
          <span class="arrow">▼</span>
        </div>
        <div class="section-body" style="max-height:0;padding:0 22px;overflow:hidden;transition:max-height 0.5s ease,padding 0.3s ease">

          <div style="padding:12px 14px;border-radius:10px;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);margin-bottom:16px;font-size:0.82em;color:var(--text-secondary);line-height:1.8">
            지배 행성은 당신이 태어난 <strong style="color:var(--accent-gold-light)">낙샤트라(별자리 구역)</strong>를 다스리는 행성이에요.
            인생의 대운(다샤)에서 시기별로 변하는 에너지와 달리, 지배 행성의 영향은 <strong style="color:var(--accent-gold-light)">평생</strong> 당신의 기질과 성향에 녹아 있습니다.
          </div>

          <p>${planet.description}</p>

          ${planet.qualities ? `<div class="keyword-list">${planet.qualities.map(q => `<span class="keyword">${q}</span>`).join('')}</div>` : ''}

          <div style="margin-top:16px;padding:14px;border-radius:10px;background:rgba(123,104,238,0.06);border:1px solid rgba(123,104,238,0.12)">
            <div style="font-size:0.78em;color:var(--accent-purple-light);margin-bottom:6px">✦ 당신에게 미치는 영향</div>
            <p style="font-size:0.9em;line-height:1.9">${planet.influence}</p>
          </div>

          <div class="lucky-grid" style="margin-top:16px">
            <div class="lucky-item">
              <div class="lucky-label">성질</div>
              <div class="lucky-value" style="font-size:0.8em">${planet.nature}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">원소</div>
              <div class="lucky-value">${planet.element}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">지배 별자리</div>
              <div class="lucky-value" style="font-size:0.8em">${planet.rules}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">행운의 요일</div>
              <div class="lucky-value">${planet.day}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">상징 색상</div>
              <div class="lucky-value">${planet.color}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">행운의 보석</div>
              <div class="lucky-value" style="font-size:0.8em">${planet.gemstone}</div>
            </div>
            <div class="lucky-item">
              <div class="lucky-label">관련 신체</div>
              <div class="lucky-value" style="font-size:0.78em">${planet.body}</div>
            </div>
          </div>

          ${planet.mantra ? `
          <div style="margin-top:16px;text-align:center;padding:16px;border-radius:10px;background:rgba(15,15,50,0.6);border:1px solid var(--border-subtle)">
            <div style="font-size:0.75em;color:var(--text-secondary);margin-bottom:8px">행성 만트라</div>
            <div style="font-family:var(--font-devanagari);font-size:1.05rem;color:var(--accent-gold-light);letter-spacing:1px;margin-bottom:6px">${planet.mantra}</div>
            <div style="font-size:0.85em;color:var(--text-secondary);margin-bottom:4px">${planet.mantraKr}</div>
            <div style="font-size:0.8em;color:var(--accent-purple-light);font-style:italic;margin-top:8px">"${planet.mantraMeaning}"</div>
          </div>
          ` : ''}

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
