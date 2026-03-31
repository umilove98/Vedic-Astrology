/**
 * Result Screen - Final comprehensive result with birth chart
 */
import { generateProfile } from '../engine/profileAnalyzer.js';

export class ResultScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
  }

  render(data) {
    const { nakshatraResult, moonData, selectedNames = [] } = data;
    const profile = generateProfile(nakshatraResult, data.birthYear);
    const topNames = selectedNames.slice(0, 5);

    const div = document.createElement('div');
    div.className = 'screen result-screen';
    div.innerHTML = `
      <h2 class="text-shimmer">종합 결과</h2>

      <div class="result-chart-area">
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

      ${topNames.length > 0 ? `
      <div style="margin:20px 0;text-align:center">
        <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--text-primary);margin-bottom:12px">추천 이름</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${topNames.map(n => `
            <div style="padding:8px 18px;border:1px solid var(--border-glow);border-radius:20px;
              background:rgba(201,168,76,0.06);color:var(--accent-gold-light);font-family:var(--font-serif);font-size:1.1rem">
              ${n.name}
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

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

      <div class="result-actions">
        <button id="btn-save-image">결과 저장</button>
        <button id="btn-restart">처음으로</button>
      </div>
    `;
    return div;
  }

  async onEnter(data) {
    // Draw birth chart
    this.drawBirthChart(data);

    // Save image
    this.el.querySelector('#btn-save-image').addEventListener('click', () => {
      this.saveAsImage();
    });

    // Restart
    this.el.querySelector('#btn-restart').addEventListener('click', () => {
      this.router.data = {};
      this.router.navigateTo('welcome');
    });
  }

  drawBirthChart(data) {
    const canvas = this.el.querySelector('#result-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 360, h = 360;
    const cx = w / 2, cy = h / 2;

    // Background
    ctx.fillStyle = 'rgba(5, 5, 20, 0.3)';
    ctx.fillRect(0, 0, w, h);

    // North Indian style diamond chart
    const size = 140;

    // Outer square
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - size, cy - size, size * 2, size * 2);

    // Inner diamond (rotated square)
    ctx.beginPath();
    ctx.moveTo(cx, cy - size); // top
    ctx.lineTo(cx + size, cy); // right
    ctx.lineTo(cx, cy + size); // bottom
    ctx.lineTo(cx - size, cy); // left
    ctx.closePath();
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.stroke();

    // Cross lines through center
    ctx.beginPath();
    ctx.moveTo(cx - size, cy - size);
    ctx.lineTo(cx + size, cy + size);
    ctx.moveTo(cx + size, cy - size);
    ctx.lineTo(cx - size, cy + size);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // House numbers (12 houses)
    const housePositions = [
      { x: cx, y: cy - size + 25 },     // 1 (top)
      { x: cx - size / 2, y: cy - size / 2 }, // 2
      { x: cx - size + 20, y: cy },       // 3 (left)
      { x: cx - size / 2, y: cy + size / 2 }, // 4
      { x: cx, y: cy + size - 15 },       // 5 (bottom)
      { x: cx + size / 2, y: cy + size / 2 }, // 6
      { x: cx + size - 20, y: cy },       // 7 (right)
      { x: cx + size / 2, y: cy - size / 2 }, // 8
      { x: cx, y: cy - 15 },              // 9 (center-top)
      { x: cx - size / 3, y: cy + 15 },   // 10
      { x: cx, y: cy + 20 },              // 11
      { x: cx + size / 3, y: cy + 15 },   // 12
    ];

    // Find Moon's house (simplified: Rashi index + 1)
    const moonHouse = data.nakshatraResult.rashi.id;

    ctx.font = '11px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw house labels
    for (let i = 0; i < 12; i++) {
      const pos = housePositions[i];
      if (i === moonHouse) {
        // Highlight Moon's house
        ctx.fillStyle = 'rgba(201, 168, 76, 0.7)';
        ctx.font = '14px serif';
        ctx.fillText('☽', pos.x, pos.y);
        ctx.font = '11px "Noto Sans KR", sans-serif';
      }
    }

    // Outer ring - Nakshatra marker
    const nkDeg = data.nakshatraResult.exactDegree;
    const ringR = size + 18;
    const nkAngle = (nkDeg / 360) * Math.PI * 2 - Math.PI / 2;
    const nkX = cx + ringR * Math.cos(nkAngle);
    const nkY = cy + ringR * Math.sin(nkAngle);

    // Nakshatra glow
    const grd = ctx.createRadialGradient(nkX, nkY, 0, nkX, nkY, 12);
    grd.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
    grd.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.beginPath();
    ctx.arc(nkX, nkY, 12, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(nkX, nkY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.fill();

    // Center label
    ctx.font = 'bold 13px "Noto Serif KR", serif';
    ctx.fillStyle = 'rgba(201, 168, 76, 0.8)';
    ctx.textAlign = 'center';
    ctx.fillText('쿤달리', cx, cy - 5);
    ctx.font = '10px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(155, 151, 176, 0.6)';
    ctx.fillText('Kundali', cx, cy + 10);
  }

  async saveAsImage() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = '#050514';
      ctx.fillRect(0, 0, 800, 600);

      // Title
      ctx.font = 'bold 28px "Noto Serif KR", serif';
      ctx.fillStyle = '#c9a84c';
      ctx.textAlign = 'center';
      ctx.fillText('베딕 작명 - 종합 결과', 400, 50);

      // Info text
      ctx.font = '16px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#e8e6f0';
      ctx.fillText('결과를 브라우저에서 다시 확인하세요', 400, 300);

      // Download
      const link = document.createElement('a');
      link.download = 'vedic-naming-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Save failed:', e);
    }
  }
}
