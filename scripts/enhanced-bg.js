class EnhancedBackground {
  constructor() {
    this.canvas = document.getElementById('bg');
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    // Particles system - reduced for subtlety
    this.particles = [];
    this.particleCount = 35;
    this.connectionDistance = 150;

    // Wave system - gentler waves
    this.waves = [];
    this.waveCount = 4;
    this.time = 0;

    // Color palette - teal and blue, more subtle
    this.colors = {
      primary: 'rgba(77, 208, 200, 0.15)',
      secondary: 'rgba(91, 192, 222, 0.12)',
      accent: 'rgba(124, 154, 237, 0.08)',
      wave: 'rgba(77, 208, 200, 0.04)',
      glow: 'rgba(91, 192, 222, 0.03)'
    };

    this.init();
    this.animate();
    this.bindEvents();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  init() {
    // Initialize particles - slower, gentler movement
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.008 + 0.004
      });
    }

    // Initialize waves - softer, slower waves
    this.waves = [];
    for (let i = 0; i < this.waveCount; i++) {
      this.waves.push({
        amplitude: Math.random() * 15 + 10,
        frequency: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.001,
        y: this.height * (0.15 + i * 0.25)
      });
    }
  }
  
  drawWaves() {
    this.ctx.save();

    this.waves.forEach((wave, index) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors.wave;
      this.ctx.lineWidth = 0.5;

      for (let x = 0; x <= this.width; x += 8) {
        const y = wave.y + Math.sin(x * wave.frequency + this.time * wave.speed + wave.phase) * wave.amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.stroke();

      // Create subtle gradient fill with teal-blue tones
      const gradient = this.ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude);
      gradient.addColorStop(0, 'rgba(77, 208, 200, 0.015)');
      gradient.addColorStop(0.5, 'rgba(91, 192, 222, 0.01)');
      gradient.addColorStop(1, 'rgba(124, 154, 237, 0.005)');

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });

    this.ctx.restore();
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      // Update position - very gentle drift
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Soft boundary wrapping instead of bounce
      if (particle.x < -10) particle.x = this.width + 10;
      if (particle.x > this.width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = this.height + 10;
      if (particle.y > this.height + 10) particle.y = -10;

      // Very subtle pulsing effect
      particle.opacity = 0.1 + Math.sin(this.time * particle.pulseSpeed) * 0.15;
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.05, particle.opacity);

      // Draw particle with soft glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 4
      );
      gradient.addColorStop(0, this.colors.primary);
      gradient.addColorStop(0.6, this.colors.secondary);
      gradient.addColorStop(1, 'rgba(77, 208, 200, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = (1 - distance / this.connectionDistance) * 0.08;

          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.colors.secondary;
          this.ctx.lineWidth = 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }
  
  drawFloatingElements() {
    const numElements = 4;
    for (let i = 0; i < numElements; i++) {
      const x = (this.width / numElements) * i + this.width / (numElements * 2) + Math.sin(this.time * 0.0003 + i * 1.5) * 40;
      const y = this.height * 0.6 + Math.cos(this.time * 0.0004 + i * 2) * 25;
      const size = 30 + Math.sin(this.time * 0.0005 + i) * 15;

      this.ctx.save();
      this.ctx.globalAlpha = 0.015;
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, this.colors.accent);
      gradient.addColorStop(1, 'rgba(124, 154, 237, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Very subtle ambient glow in the center
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.6
    );
    gradient.addColorStop(0, 'rgba(77, 208, 200, 0.008)');
    gradient.addColorStop(0.5, 'rgba(91, 192, 222, 0.004)');
    gradient.addColorStop(1, 'rgba(124, 154, 237, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw all elements
    this.drawWaves();
    this.drawFloatingElements();
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    this.time += 1;
    requestAnimationFrame(() => this.animate());
  }
  
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    // Very gentle mouse interaction
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Very subtle particle drift toward mouse
      this.particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          const force = (250 - distance) / 250 * 0.0005;
          particle.vx += dx * force;
          particle.vy += dy * force;

          // Keep velocities very low for subtlety
          particle.vx = Math.max(-0.3, Math.min(0.3, particle.vx));
          particle.vy = Math.max(-0.3, Math.min(0.3, particle.vy));
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bg')) {
    new EnhancedBackground();
  }
});