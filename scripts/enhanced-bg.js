class EnhancedBackground {
  constructor() {
    this.canvas = document.getElementById('bg');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Particles system
    this.particles = [];
    this.particleCount = 80;
    this.connectionDistance = 120;
    
    // Wave system
    this.waves = [];
    this.waveCount = 3;
    this.time = 0;
    
    // Color palette
    this.colors = {
      primary: 'rgba(255, 255, 255, 0.4)',
      secondary: 'rgba(255, 255, 255, 0.2)',
      accent: 'rgba(255, 255, 255, 0.1)',
      wave: 'rgba(255, 255, 255, 0.05)'
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
    // Initialize particles
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
    
    // Initialize waves
    this.waves = [];
    for (let i = 0; i < this.waveCount; i++) {
      this.waves.push({
        amplitude: Math.random() * 30 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.005,
        y: this.height * (0.2 + i * 0.3)
      });
    }
  }
  
  drawWaves() {
    this.ctx.save();
    
    this.waves.forEach((wave, index) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors.wave;
      this.ctx.lineWidth = 1;
      
      for (let x = 0; x <= this.width; x += 5) {
        const y = wave.y + Math.sin(x * wave.frequency + this.time * wave.speed + wave.phase) * wave.amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
      
      // Create gradient fill
      const gradient = this.ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
    
    this.ctx.restore();
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary checking with gentle bounce
      if (particle.x <= 0 || particle.x >= this.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(this.width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= this.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(this.height, particle.y));
      }
      
      // Subtle pulsing effect
      particle.opacity = 0.2 + Math.sin(this.time * particle.pulseSpeed) * 0.3;
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, particle.opacity);
      
      // Draw particle with glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, this.colors.primary);
      gradient.addColorStop(0.5, this.colors.secondary);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Core particle
      this.ctx.fillStyle = this.colors.primary;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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
          const opacity = (1 - distance / this.connectionDistance) * 0.3;
          
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.colors.secondary;
          this.ctx.lineWidth = 0.5;
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
    const numElements = 5;
    for (let i = 0; i < numElements; i++) {
      const x = (this.width / numElements) * i + Math.sin(this.time * 0.001 + i) * 50;
      const y = this.height * 0.7 + Math.cos(this.time * 0.0015 + i * 2) * 30;
      const size = 20 + Math.sin(this.time * 0.002 + i) * 10;
      
      this.ctx.save();
      this.ctx.globalAlpha = 0.03;
      this.ctx.fillStyle = this.colors.accent;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background gradient
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.01)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
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
    
    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Subtle particle attraction to mouse
      this.particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.002;
          particle.vx += dx * force;
          particle.vy += dy * force;
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