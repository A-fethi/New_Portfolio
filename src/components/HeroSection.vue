<template>
  <section class="hero">
    <canvas ref="particleCanvas" class="hero-particles"></canvas>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">Available for opportunities</span>
      </div>

      <h1 class="hero-name">
        <span class="name-line" ref="nameLine1">
          <span v-for="(char, i) in 'Abderrahmane'" :key="'first-'+i" class="char" :style="{ animationDelay: `${i * 0.05}s` }">{{ char }}</span>
        </span>
        <span class="name-line name-last" ref="nameLine2">
          <span v-for="(char, i) in 'FETHI'" :key="'last-'+i" class="char" :style="{ animationDelay: `${0.65 + i * 0.05}s` }">{{ char }}</span>
        </span>
      </h1>

      <div class="hero-title-wrapper">
        <span class="hero-title-bracket">{</span>
        <div class="hero-title-text">
          <span class="typing-text" ref="typingText"></span>
          <span class="typing-cursor">|</span>
        </div>
        <span class="hero-title-bracket">}</span>
      </div>

      <p class="hero-description">
        Crafting modern, scalable web applications from front-end to back-end.
        <br />
        <span class="text-accent">JavaScript</span> ·
        <span class="text-accent">Go</span> ·
        <span class="text-accent">Java</span> ·
        <span class="text-accent">Vue.js</span> ·
        <span class="text-accent">Docker</span>
      </p>

      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('projects')">
          <span>View My Work</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a href="#contact" class="btn btn-outline" @click.prevent="scrollTo('contact')">
          <span>Get in Touch</span>
        </a>
      </div>

      <div class="hero-socials">
        <a href="https://github.com/A-fethi" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/abderrahmane-fethi" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:fethiabderrahmane1@gmail.com" class="social-link" aria-label="Email">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>

    <div class="scroll-indicator" @click="scrollTo('about')">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
      <span class="scroll-text">Scroll to explore</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particleCanvas = ref(null)
const typingText = ref(null)

let animFrame = null
let typingTimeout = null

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Typing animation
const titles = ['Full Stack Developer', 'Go & Java Developer', 'Problem Solver', 'DevOps Learner']
let titleIndex = 0
let charIndex = 0
let isDeleting = false

const typeEffect = () => {
  if (!typingText.value) return
  const currentTitle = titles[titleIndex]

  if (!isDeleting) {
    typingText.value.textContent = currentTitle.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentTitle.length) {
      isDeleting = true
      typingTimeout = setTimeout(typeEffect, 2000)
      return
    }
    typingTimeout = setTimeout(typeEffect, 80)
  } else {
    typingText.value.textContent = currentTitle.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      titleIndex = (titleIndex + 1) % titles.length
      typingTimeout = setTimeout(typeEffect, 500)
      return
    }
    typingTimeout = setTimeout(typeEffect, 40)
  }
}

// Particle system
const initParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = window.innerWidth
  let height = window.innerHeight
  canvas.width = width
  canvas.height = height

  const particles = []
  const particleCount = Math.min(150, Math.floor((width * height) / 8000))
  let mouseX = width / 2
  let mouseY = height / 2

  class Particle {
    constructor() {
      this.reset()
    }
    reset() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.size = Math.random() * 2 + 0.5
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.2
      // Using orange (30) and olive (65) hues
      this.hue = Math.random() > 0.5 ? 30 : 65
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Mouse attraction
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 200) {
        this.x += dx * 0.002
        this.y += dy * 0.002
        this.opacity = Math.min(1, this.opacity + 0.01)
      }

      if (this.x < 0 || this.x > width) this.speedX *= -1
      if (this.y < 0 || this.y > height) this.speedY *= -1
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const drawConnections = () => {
    // Determine connection color based on current theme Document
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const connectionRGB = isLightTheme ? '217, 114, 0' : '246, 131, 0'; // #d97200 in light, #F68300 in dark

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.15
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(${connectionRGB}, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height)
    particles.forEach(p => {
      p.update()
      p.draw()
    })
    drawConnections()
    animFrame = requestAnimationFrame(animate)
  }

  animate()

  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  const handleResize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
}

onMounted(() => {
  initParticles()
  setTimeout(typeEffect, 1000)
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--gradient-hero);
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 var(--container-padding);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(var(--accent-primary-rgb), 0.08);
  border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
  border-radius: var(--radius-full);
  margin-bottom: 32px;
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-emerald);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.badge-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 20px;
  letter-spacing: -2px;
}

.name-line {
  display: block;
  overflow: hidden;
}

.name-last {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.char {
  display: inline-block;
  animation: charReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
  transform: translateY(40px) rotateX(40deg);
}

@keyframes charReveal {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

.hero-title-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease 0.9s forwards;
  opacity: 0;
}

.hero-title-bracket {
  font-family: var(--font-mono);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: var(--accent-secondary);
  font-weight: 700;
}

.hero-title-text {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--accent-primary);
}

.typing-cursor {
  animation: blink 1s step-end infinite;
  color: var(--accent-primary);
  font-weight: 100;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-description {
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 36px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease 1.1s forwards;
  opacity: 0;
}

.hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease 1.3s forwards;
  opacity: 0;
}

.hero-socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  animation: fadeInUp 0.8s ease 1.5s forwards;
  opacity: 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-base);
  text-decoration: none;
}

/* Light theme overrides for social links */
[data-theme="light"] .social-link {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.social-link:hover {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.1);
  border-color: rgba(var(--accent-primary-rgb), 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(var(--accent-primary-rgb), 0.15);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  right: 40px; /* Moved to bottom right */
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  animation: fadeInUp 0.8s ease 1.8s forwards;
  opacity: 0;
  z-index: 1;
}

.scroll-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.scroll-mouse {
  width: 26px;
  height: 40px;
  border: 2px solid var(--text-muted);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  transition: border-color var(--transition-base);
}

.scroll-indicator:hover .scroll-mouse {
  border-color: var(--text-primary);
}

[data-theme="light"] .scroll-mouse {
  border-color: rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .scroll-indicator:hover .scroll-mouse {
  border-color: var(--text-primary);
}

.scroll-wheel {
  width: 3px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 2px;
  animation: scrollWheel 2s ease-in-out infinite;
}

@keyframes scrollWheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}

@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
  }

  .hero-name {
    letter-spacing: -1px;
  }
  
  .scroll-indicator {
    right: 20px;
    bottom: 20px;
  }
}
</style>
