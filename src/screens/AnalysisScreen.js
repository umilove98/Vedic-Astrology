/**
 * Analysis Screen - Constellation calculation animation
 * Shows the celestial calculation process with visual flair
 */
import { calculateMoonPosition } from '../engine/astronomy.js';
import { getNakshatraFromDegree } from '../engine/nakshatra.js';
import { typewrite, contemplationPause } from '../utils/typewriter.js';

export class AnalysisScreen {
  constructor(router, starfield) {
    this.router = router;
    this.starfield = starfield;
    this.el = null;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'screen analysis-screen';
    div.innerHTML = `
      <canvas id="analysis-canvas" width="400" height="400"></canvas>
      <div class="analysis-text" id="analysis-text"></div>
      <div class="analysis-concept" id="analysis-concept" style="opacity:0;transition:opacity 0.8s"></div>
    `;
    return div;
  }

  async onEnter(data) {
    this.canvas = this.el.querySelector('#analysis-canvas');
    this.ctx = this.canvas.getContext('2d');
    const textEl = this.el.querySelector('#analysis-text');
    const conceptEl = this.el.querySelector('#analysis-concept');

    // Perform actual calculation
    const moonData = calculateMoonPosition(data.birthDate, data.birthTime, data.city.timezone);
    const nakshatraResult = getNakshatraFromDegree(moonData.siderealLongitude);

    // Store results for next screens
    const birthYear = parseInt(data.birthDate.split('-')[0]);
    Object.assign(data, { moonData, nakshatraResult, birthYear });

    // === Animation sequence ===

    // Phase 1: Draw ecliptic circle
    await this.animateEcliptic();
    await typewrite(textEl, '황도를 따라 27개의 낙샤트라가 펼쳐집니다...', 40);
    await contemplationPause(1000);

    // Phase 2: Draw Nakshatra divisions
    await this.animateNakshatraDivisions();
    textEl.textContent = '';
    await typewrite(textEl, '당신이 태어난 순간, 달의 위치를 찾고 있습니다...', 40);
    await contemplationPause(800);

    // Phase 3: Moon moves to position
    await this.animateMoonPosition(moonData.siderealLongitude);
    textEl.textContent = '';
    await typewrite(textEl,
      `달은 ${nakshatraResult.exactDegree.toFixed(1)}°에 위치해 있었습니다.`, 40);
    await contemplationPause(800);

    // Phase 4: Highlight Nakshatra
    await this.highlightNakshatra(nakshatraResult);
    textEl.textContent = '';
    await typewrite(textEl,
      `${nakshatraResult.nakshatra.symbol} ${nakshatraResult.nakshatra.nameKr}(${nakshatraResult.nakshatra.name})이 당신의 탄생 별입니다!`, 35);

    // Show concept explanation
    conceptEl.style.opacity = '1';
    conceptEl.textContent =
      '낙샤트라(Nakshatra)는 달이 하루에 머무는 별자리 구역으로, 27개가 있습니다. ' +
      '각 낙샤트라는 고유한 에너지와 성격을 가지며, 당신의 이름과 운명에 깊은 영향을 줍니다.';

    await contemplationPause(2500);

    // Navigate to profile
    this.router.navigateTo('profile', data);
  }

  onExit() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  // === Canvas Animations ===

  animateEcliptic() {
    return new Promise((resolve) => {
      const ctx = this.ctx;
      const cx = 200, cy = 200, r = 160;
      let angle = -Math.PI / 2;
      const targetAngle = Math.PI * 2 - Math.PI / 2;
      const speed = 0.08;

      const draw = () => {
        ctx.clearRect(0, 0, 400, 400);
        this.drawBackground();

        // Ecliptic circle (partial)
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, angle);
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glow
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, angle);
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
        ctx.lineWidth = 6;
        ctx.stroke();

        angle += speed;
        if (angle >= targetAngle) {
          // Draw full circle
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(201, 168, 76, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          resolve();
        } else {
          this.animationId = requestAnimationFrame(draw);
        }
      };
      draw();
    });
  }

  animateNakshatraDivisions() {
    return new Promise((resolve) => {
      const ctx = this.ctx;
      const cx = 200, cy = 200, r = 160;
      let idx = 0;

      const draw = () => {
        if (idx >= 27) {
          resolve();
          return;
        }

        const angle = (idx * 13.3333 / 360) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + (r - 15) * Math.cos(angle);
        const y1 = cy + (r - 15) * Math.sin(angle);
        const x2 = cx + (r + 5) * Math.cos(angle);
        const y2 = cy + (r + 5) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        idx++;
        setTimeout(() => {
          this.animationId = requestAnimationFrame(draw);
        }, 40);
      };
      draw();
    });
  }

  animateMoonPosition(degree) {
    return new Promise((resolve) => {
      const ctx = this.ctx;
      const cx = 200, cy = 200, r = 160;
      const targetAngle = (degree / 360) * Math.PI * 2 - Math.PI / 2;
      let currentAngle = -Math.PI / 2;
      const speed = 0.06;

      const draw = () => {
        // Redraw base
        this.redrawBase();

        // Moon trail
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, currentAngle);
        ctx.strokeStyle = 'rgba(200, 220, 255, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Moon position
        const mx = cx + r * Math.cos(currentAngle);
        const my = cy + r * Math.sin(currentAngle);

        // Moon glow
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 20);
        gradient.addColorStop(0, 'rgba(200, 220, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Moon dot
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#dde8ff';
        ctx.fill();

        // Moon symbol
        ctx.font = '16px serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('☽', mx, my - 14);

        const diff = targetAngle - currentAngle;
        if (diff < 0) {
          currentAngle += speed;
          if (currentAngle >= Math.PI * 2 + targetAngle - Math.PI / 2) {
            resolve();
            return;
          }
        } else {
          currentAngle += speed;
          if (currentAngle >= targetAngle) {
            resolve();
            return;
          }
        }

        this.animationId = requestAnimationFrame(draw);
      };
      draw();
    });
  }

  highlightNakshatra(result) {
    return new Promise((resolve) => {
      const ctx = this.ctx;
      const cx = 200, cy = 200, r = 160;
      const startAngle = (result.nakshatra.startDeg / 360) * Math.PI * 2 - Math.PI / 2;
      const endAngle = (result.nakshatra.endDeg / 360) * Math.PI * 2 - Math.PI / 2;
      let alpha = 0;
      const fadeSpeed = 0.03;

      const draw = () => {
        this.redrawBase();

        // Highlighted arc
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Sector glow
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r + 5, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha * 0.08})`;
        ctx.fill();

        // Moon at final position
        const moonAngle = (result.exactDegree / 360) * Math.PI * 2 - Math.PI / 2;
        const mx = cx + r * Math.cos(moonAngle);
        const my = cy + r * Math.sin(moonAngle);

        ctx.beginPath();
        ctx.arc(mx, my, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.font = '18px serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('☽', mx, my - 16);

        // Nakshatra name at center
        ctx.font = `bold ${14 + alpha * 6}px "Noto Serif KR", serif`;
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(result.nakshatra.nameKr, cx, cy - 10);
        ctx.font = `${10 + alpha * 3}px "Noto Sans KR", sans-serif`;
        ctx.fillStyle = `rgba(155, 151, 176, ${alpha})`;
        ctx.fillText(result.nakshatra.name, cx, cy + 12);

        alpha += fadeSpeed;
        if (alpha >= 1) {
          resolve();
        } else {
          this.animationId = requestAnimationFrame(draw);
        }
      };
      draw();
    });
  }

  drawBackground() {
    const ctx = this.ctx;
    // Subtle center dot
    ctx.beginPath();
    ctx.arc(200, 200, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.fill();
  }

  redrawBase() {
    const ctx = this.ctx;
    const cx = 200, cy = 200, r = 160;
    ctx.clearRect(0, 0, 400, 400);
    this.drawBackground();

    // Ecliptic circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201, 168, 76, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Division lines
    for (let i = 0; i < 27; i++) {
      const angle = (i * 13.3333 / 360) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + (r - 12) * Math.cos(angle);
      const y1 = cy + (r - 12) * Math.sin(angle);
      const x2 = cx + (r + 4) * Math.cos(angle);
      const y2 = cy + (r + 4) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.15)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }
}
