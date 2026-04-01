/**
 * Result Screen - Final comprehensive result with birth chart + sharing
 */
import { generateProfile } from '../engine/profileAnalyzer.js';

export class ResultScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
    this.profile = null;
    this.data = null;
  }

  render(data) {
    this.data = data;
    const { nakshatraResult, moonData, selectedNames = [], isShared } = data;
    const profile = generateProfile(nakshatraResult, data.birthYear);
    this.profile = profile;
    const topNames = selectedNames.slice(0, 5);

    const div = document.createElement('div');
    div.className = 'screen result-screen';
    div.innerHTML = `
      ${isShared ? `
      <div class="shared-banner">
        <div class="shared-banner-text">
          ✦ 누군가의 별이 당신에게 전해졌습니다
        </div>
        <button class="btn-primary shared-try-btn" id="btn-try-mine">
          나도 내 별을 찾아보기 ✦
        </button>
      </div>
      ` : ''}

      <h2 class="text-shimmer">종합 결과</h2>

      <div class="result-chart-area">
        <div style="text-align:center;margin-bottom:8px">
          <span style="font-family:var(--font-serif);font-size:0.95rem;color:var(--accent-gold);letter-spacing:2px">쿤달리</span>
          <span style="font-size:0.75rem;color:var(--text-secondary);margin-left:6px">Kundali · 황도 12궁 출생 차트</span>
        </div>
        <canvas id="result-chart" width="360" height="360"></canvas>
      </div>

      <div style="text-align:center;margin:16px 0">
        <div style="font-family:var(--font-serif);font-size:1.6rem;color:var(--accent-gold-light)">
          ${profile.basic.nakshatraSymbol} ${profile.basic.nakshatraNameKr}
        </div>
        <div style="color:var(--text-secondary);font-size:0.9rem">
          ${profile.basic.nakshatraName} · ${profile.basic.pada}파다 · ${profile.basic.rashiName}
        </div>
        <div style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">
          지배 행성: ${profile.basic.lordSymbol} ${profile.basic.lordName} · 수호신: ${profile.basic.deityName}
        </div>
        <div style="color:var(--text-secondary);font-size:0.8rem;margin-top:4px">
          달의 위치: ${moonData.siderealLongitude.toFixed(2)}° (사이드리얼) · 아야남사: ${moonData.ayanamsa.toFixed(2)}°
        </div>
      </div>


      <div style="max-width:500px;text-align:center;margin:16px 0">
        <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.9">
          ${profile.personality.summary}
        </div>
      </div>

      ${profile.pastLife ? `
      <div style="max-width:500px;margin:12px 0;padding:16px;background:rgba(123,104,238,0.06);border:1px solid rgba(123,104,238,0.15);border-radius:12px">
        <div style="font-size:0.8rem;color:var(--accent-purple-light);margin-bottom:8px">영혼의 여정</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;font-style:italic">
          "${profile.pastLife.soulLesson}"
        </div>
      </div>
      ` : ''}

      ${!isShared ? `
      <div class="screen-nav">
        <button class="screen-nav-btn" data-go="profile">☾ 운세 분석</button>
        <button class="screen-nav-btn" data-go="names">✧ 이름 추천</button>
        <button class="screen-nav-btn active-nav">◈ 종합 결과</button>
      </div>

      <div class="result-actions">
        <button id="btn-share-link">링크 복사</button>
        <button id="btn-save-image">이미지 저장</button>
        <button id="btn-restart">✦ 새로운 별을 찾다</button>
      </div>
      <div class="share-toast" id="share-toast">링크가 복사되었습니다!</div>
      ` : ''}
    `;
    return div;
  }

  async onEnter(data) {
    this.drawBirthChart(data);

    // Share link
    this.el.querySelector('#btn-share-link').addEventListener('click', () => {
      this.copyShareLink();
    });

    // Save image
    this.el.querySelector('#btn-save-image').addEventListener('click', () => {
      this.saveAsImage();
    });

    // Restart
    this.el.querySelector('#btn-restart').addEventListener('click', () => {
      this.router.data = {};
      this.router.history = [];
      this.router.navigateTo('welcome');
    });

    // "나도 해보기" (shared result)
    const tryBtn = this.el.querySelector('#btn-try-mine');
    if (tryBtn) {
      tryBtn.addEventListener('click', () => {
        this.router.data = {};
        this.router.history = [];
        this.router.navigateTo('welcome');
      });
    }

    // Screen nav buttons
    this.el.querySelectorAll('.screen-nav-btn[data-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.router.navigateTo(btn.dataset.go, data);
      });
    });
  }

  // === Share link ===

  copyShareLink() {
    const data = this.router.data;
    const payload = {
      d: data.birthDate, t: data.birthTime,
      c: data.city.name, k: data.city.nameKr,
      la: data.city.lat, lo: data.city.lng,
      z: data.city.timezone, g: data.gender,
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const url = `${window.location.origin}${window.location.pathname}#s=${encoded}`;

    navigator.clipboard.writeText(url).then(() => {
      const toast = this.el.querySelector('#share-toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    });
  }

  // === Birth chart canvas ===

  drawBirthChart(data) {
    const canvas = this.el.querySelector('#result-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 360, h = 360;
    const cx = w / 2, cy = h / 2;

    const RASHIS = [
      { sym: '♈', kr: '양' },     { sym: '♉', kr: '황소' },
      { sym: '♊', kr: '쌍둥이' }, { sym: '♋', kr: '게' },
      { sym: '♌', kr: '사자' },   { sym: '♍', kr: '처녀' },
      { sym: '♎', kr: '천칭' },   { sym: '♏', kr: '전갈' },
      { sym: '♐', kr: '궁수' },   { sym: '♑', kr: '염소' },
      { sym: '♒', kr: '물병' },   { sym: '♓', kr: '물고기' },
    ];

    ctx.fillStyle = 'rgba(5, 5, 20, 0.3)';
    ctx.fillRect(0, 0, w, h);

    const size = 140;

    // Outer square
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - size, cy - size, size * 2, size * 2);

    // Inner diamond
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.stroke();

    // Diagonals
    ctx.beginPath();
    ctx.moveTo(cx - size, cy - size);
    ctx.lineTo(cx + size, cy + size);
    ctx.moveTo(cx + size, cy - size);
    ctx.lineTo(cx - size, cy + size);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // 12 house positions (North Indian layout)
    const hp = [
      { x: cx, y: cy - size + 28 },            // 0: top center
      { x: cx - size / 2, y: cy - size / 2 },  // 1: top-left
      { x: cx - size + 24, y: cy },             // 2: left
      { x: cx - size / 2, y: cy + size / 2 },  // 3: bottom-left
      { x: cx, y: cy + size - 18 },             // 4: bottom center
      { x: cx + size / 2, y: cy + size / 2 },   // 5: bottom-right
      { x: cx + size - 24, y: cy },              // 6: right
      { x: cx + size / 2, y: cy - size / 2 },   // 7: top-right
      { x: cx - size / 3, y: cy - 18 },          // 8: inner top-left
      { x: cx - size / 3, y: cy + 18 },          // 9: inner bottom-left
      { x: cx + size / 3, y: cy + 18 },          // 10: inner bottom-right
      { x: cx + size / 3, y: cy - 18 },          // 11: inner top-right
    ];

    const moonHouse = data.nakshatraResult.rashi.id;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw all 12 rashi labels
    for (let i = 0; i < 12; i++) {
      const pos = hp[i];
      const isMoon = (i === moonHouse);

      if (isMoon) {
        // Glow behind moon's rashi
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 28);
        glow.addColorStop(0, 'rgba(201, 168, 76, 0.15)');
        glow.addColorStop(1, 'rgba(201, 168, 76, 0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.font = '15px serif';
        ctx.fillStyle = '#f0d078';
        ctx.fillText('☽', pos.x, pos.y - 10);
        ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
        ctx.fillStyle = '#f0d078';
        ctx.fillText(RASHIS[i].kr, pos.x, pos.y + 8);
      } else {
        ctx.font = '13px serif';
        ctx.fillStyle = 'rgba(155, 151, 176, 0.35)';
        ctx.fillText(RASHIS[i].sym, pos.x, pos.y - 6);
        ctx.font = '9px "Noto Sans KR", sans-serif';
        ctx.fillStyle = 'rgba(155, 151, 176, 0.25)';
        ctx.fillText(RASHIS[i].kr, pos.x, pos.y + 9);
      }
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.fill();
  }

  // === Share image generation ===

  async saveAsImage() {
    const profile = this.profile;
    const data = this.data;
    const names = (data.selectedNames || []).slice(0, 4);

    const W = 800, H = 1060;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // --- Background ---
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#06061a');
    bgGrad.addColorStop(0.5, '#0a0a2e');
    bgGrad.addColorStop(1, '#080820');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Scatter stars
    for (let i = 0; i < 120; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sr = Math.random() * 1.2 + 0.3;
      const sa = Math.random() * 0.5 + 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 220, 255, ${sa})`;
      ctx.fill();
    }

    // Subtle golden vignette at top
    const vigGrad = ctx.createRadialGradient(W / 2, 0, 50, W / 2, 0, 500);
    vigGrad.addColorStop(0, 'rgba(201, 168, 76, 0.06)');
    vigGrad.addColorStop(1, 'rgba(201, 168, 76, 0)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, W, 400);

    ctx.textAlign = 'center';

    // --- Header ---
    ctx.font = '16px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(201, 168, 76, 0.6)';
    ctx.fillText('✦', W / 2, 52);

    ctx.font = 'bold 32px "Noto Serif KR", serif';
    ctx.fillStyle = '#c9a84c';
    ctx.fillText('베딕 작명', W / 2, 92);

    ctx.font = '14px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.8)';
    ctx.fillText('별이 알려주는 당신의 이름과 운명', W / 2, 118);

    // Separator
    this._drawSeparator(ctx, 145, W);

    // --- Nakshatra Info ---
    ctx.font = 'bold 42px "Noto Serif KR", serif';
    ctx.fillStyle = '#f0d078';
    ctx.fillText(
      `${profile.basic.nakshatraSymbol}  ${profile.basic.nakshatraNameKr}`,
      W / 2, 200
    );

    ctx.font = '17px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#9b97b0';
    ctx.fillText(
      `${profile.basic.nakshatraName}  ·  ${profile.basic.pada}파다  ·  ${profile.basic.rashiName}`,
      W / 2, 235
    );

    ctx.font = '15px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.7)';
    ctx.fillText(
      `${profile.basic.lordSymbol} ${profile.basic.lordName}  ·  수호신 ${profile.basic.deityName}`,
      W / 2, 265
    );

    ctx.font = '13px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.5)';
    ctx.fillText(
      `달의 위치: ${data.moonData.siderealLongitude.toFixed(2)}° (사이드리얼)`,
      W / 2, 292
    );

    // --- Mini birth chart ---
    this._drawMiniChart(ctx, W / 2, 400, 90, data);

    // Separator
    this._drawSeparator(ctx, 510, W);

    // --- Names ---
    let nextY = 545;
    if (names.length > 0) {
      ctx.font = '15px "Noto Serif KR", serif';
      ctx.fillStyle = '#9b97b0';
      ctx.fillText('추천 이름', W / 2, nextY);
      nextY += 35;

      const nameStr = names.map(n => n.name);
      const totalWidth = nameStr.reduce((sum, n) => {
        ctx.font = 'bold 20px "Noto Serif KR", serif';
        return sum + ctx.measureText(n).width + 48;
      }, -16);
      let nameX = (W - totalWidth) / 2;

      for (const name of nameStr) {
        ctx.font = 'bold 20px "Noto Serif KR", serif';
        const tw = ctx.measureText(name).width;
        const pw = tw + 40;
        const ph = 38;

        // Badge background
        ctx.beginPath();
        this._roundRect(ctx, nameX, nextY - 22, pw, ph, 19);
        ctx.fillStyle = 'rgba(201, 168, 76, 0.08)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#f0d078';
        ctx.textAlign = 'center';
        ctx.fillText(name, nameX + pw / 2, nextY + 2);

        nameX += pw + 12;
      }
      ctx.textAlign = 'center';
      nextY += 55;
    }

    // --- Personality ---
    this._drawSeparator(ctx, nextY, W);
    nextY += 30;

    ctx.font = '14.5px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#b8b4c8';
    nextY = this._wrapText(ctx, profile.personality.summary, W / 2, nextY, 620, 26);

    // --- Soul lesson ---
    if (profile.pastLife) {
      nextY += 16;
      this._drawSeparator(ctx, nextY, W);
      nextY += 28;

      ctx.font = '13px "Noto Sans KR", sans-serif';
      ctx.fillStyle = 'rgba(165, 148, 249, 0.7)';
      ctx.fillText('영혼의 여정', W / 2, nextY);
      nextY += 24;

      ctx.font = 'italic 14px "Noto Sans KR", sans-serif';
      ctx.fillStyle = 'rgba(165, 148, 249, 0.55)';
      nextY = this._wrapText(ctx, `"${profile.pastLife.soulLesson}"`, W / 2, nextY, 580, 24);
    }

    // --- Bottom CTA ---
    nextY = Math.max(nextY + 30, H - 100);
    this._drawSeparator(ctx, nextY, W);
    nextY += 36;

    ctx.font = 'bold 18px "Noto Serif KR", serif';
    ctx.fillStyle = '#c9a84c';
    ctx.fillText('✦  나도 내 별을 찾아보기  ✦', W / 2, nextY);

    nextY += 28;
    ctx.font = '13px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.5)';
    ctx.fillText('베딕 작명 — 별이 알려주는 당신의 이름', W / 2, nextY);

    // --- Download ---
    const link = document.createElement('a');
    link.download = `vedic-${profile.basic.nakshatraName.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // === Canvas helpers ===

  _drawSeparator(ctx, y, W) {
    const grad = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
    grad.addColorStop(0, 'rgba(201, 168, 76, 0)');
    grad.addColorStop(0.3, 'rgba(201, 168, 76, 0.25)');
    grad.addColorStop(0.5, 'rgba(201, 168, 76, 0.4)');
    grad.addColorStop(0.7, 'rgba(201, 168, 76, 0.25)');
    grad.addColorStop(1, 'rgba(201, 168, 76, 0)');
    ctx.beginPath();
    ctx.moveTo(W * 0.15, y);
    ctx.lineTo(W * 0.85, y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Center diamond
    ctx.fillStyle = 'rgba(201, 168, 76, 0.35)';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('◆', W / 2, y + 3);
  }

  _drawMiniChart(ctx, cx, cy, size, data) {
    ctx.save();
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - size, cy - size, size * 2, size * 2);

    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.2)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - size, cy - size);
    ctx.lineTo(cx + size, cy + size);
    ctx.moveTo(cx + size, cy - size);
    ctx.lineTo(cx - size, cy + size);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.1)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Moon marker
    const moonHouse = data.nakshatraResult.rashi.id;
    const housePos = [
      [0, -size + 18], [-size / 2, -size / 2], [-size + 14, 0],
      [-size / 2, size / 2], [0, size - 12], [size / 2, size / 2],
      [size - 14, 0], [size / 2, -size / 2],
      [0, -10], [-size / 3, 12], [0, 16], [size / 3, 12],
    ];
    if (moonHouse < 12) {
      const [ox, oy] = housePos[moonHouse];
      ctx.font = '13px serif';
      ctx.fillStyle = 'rgba(201, 168, 76, 0.65)';
      ctx.textAlign = 'center';
      ctx.fillText('☽', cx + ox, cy + oy + 4);
    }

    // Center label
    ctx.font = 'bold 11px "Noto Serif KR", serif';
    ctx.fillStyle = 'rgba(201, 168, 76, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('쿤달리', cx, cy - 3);
    ctx.font = '9px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.4)';
    ctx.fillText('Kundali', cx, cy + 10);

    ctx.restore();
  }

  _wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, curY);
        line = word;
        curY += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, curY);
      curY += lineHeight;
    }
    return curY;
  }

  _roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }
}
