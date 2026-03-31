/**
 * Starfield - Canvas 2D animated starry background
 * Renders behind all screens with twinkling + occasional shooting stars
 */
export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.animationId = null;
    this.resize();
    this.initStars();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStars() {
    const count = Math.min(400, Math.floor((this.canvas.width * this.canvas.height) / 4000));
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 1.8 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      alpha: 0,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2,
      // Slight color variation (warm white to cool blue)
      hue: Math.random() > 0.7 ? 40 + Math.random() * 20 : 200 + Math.random() * 60,
      saturation: Math.random() * 30,
    }));
  }

  spawnShootingStar() {
    if (this.shootingStars.length >= 2) return;
    this.shootingStars.push({
      x: Math.random() * this.canvas.width * 0.8,
      y: Math.random() * this.canvas.height * 0.4,
      length: 60 + Math.random() * 80,
      speed: 4 + Math.random() * 4,
      angle: Math.PI / 6 + Math.random() * 0.3,
      alpha: 1,
      life: 0,
      maxLife: 40 + Math.random() * 30,
    });
  }

  update(time) {
    // Update star twinkle
    for (const star of this.stars) {
      star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
      star.alpha = Math.max(0.05, Math.min(1, star.alpha));
    }

    // Update shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.life++;
      ss.alpha = 1 - ss.life / ss.maxLife;
      if (ss.life >= ss.maxLife) {
        this.shootingStars.splice(i, 1);
      }
    }

    // Random shooting star spawn
    if (Math.random() < 0.003) {
      this.spawnShootingStar();
    }
  }

  draw() {
    const ctx = this.ctx;
    // Clear with very slight trail
    ctx.fillStyle = 'rgba(5, 5, 20, 0.25)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars
    for (const star of this.stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 90%, ${star.alpha})`;
      ctx.fill();

      // Soft glow for brighter stars
      if (star.radius > 1.0 && star.alpha > 0.4) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 80%, ${star.alpha * 0.08})`;
        ctx.fill();
      }
    }

    // Draw shooting stars
    for (const ss of this.shootingStars) {
      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(1, `rgba(255, 240, 200, ${ss.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 250, 220, ${ss.alpha})`;
      ctx.fill();
    }
  }

  animate(time = 0) {
    this.update(time);
    this.draw();
    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  start() {
    // Initial full clear
    this.ctx.fillStyle = '#050514';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Briefly intensify brightness (used during screen transitions)
  pulse() {
    for (const star of this.stars) {
      star.baseAlpha = Math.min(1, star.baseAlpha + 0.3);
    }
    setTimeout(() => {
      for (const star of this.stars) {
        star.baseAlpha = Math.max(0.2, star.baseAlpha - 0.3);
      }
    }, 800);
  }
}
