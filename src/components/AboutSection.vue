<template>
  <section class="about section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// About Me</span>
        <h2 class="section-title">Who I Am</h2>
        <p class="section-subtitle">A passionate developer who loves building things that live on the internet</p>
      </div>

      <div class="about-grid">
        <div class="about-text" ref="aboutText">
          <div class="about-intro glass-card gradient-border">
            <div class="about-terminal-bar">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="terminal-title">about.js</span>
            </div>
            <div class="about-code">
              <pre><code><span class="code-keyword">const</span> <span class="code-var">developer</span> = {
  <span class="code-key">name</span>: <span class="code-string">"Abderrahmane Fethi"</span>,
  <span class="code-key">role</span>: <span class="code-string">"Full Stack Developer"</span>,
  <span class="code-key">location</span>: <span class="code-string">"Morocco 🇲🇦"</span>,
  <span class="code-key">languages</span>: [<span class="code-string">"Arabic"</span>, <span class="code-string">"French"</span>, <span class="code-string">"English"</span>],
  <span class="code-key">passions</span>: [
    <span class="code-string">"Clean Code"</span>,
    <span class="code-string">"Problem Solving"</span>,
    <span class="code-string">"User Experience"</span>,
    <span class="code-string">"Continuous Learning"</span>
  ],
  <span class="code-key">motto</span>: <span class="code-string">"Code, Create, Repeat ♻️"</span>
};</code></pre>
            </div>
          </div>
        </div>

        <div class="about-stats" ref="aboutStats">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-card glass-card gradient-border"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="stat-value">
              <span class="stat-number" :data-target="stat.value" ref="statNumbers">0</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="about-soft-skills">
        <div
          v-for="(skill, index) in softSkills"
          :key="skill"
          class="soft-skill-pill"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ skill }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { personalInfo, softSkills } from '../data/portfolio.js'

const stats = personalInfo.stats
const aboutText = ref(null)
const aboutStats = ref(null)
const statNumbers = ref([])

const animateCounters = () => {
  const elements = document.querySelectorAll('.stat-number')
  elements.forEach(el => {
    const target = parseInt(el.dataset.target)
    const duration = 2000
    const start = performance.now()

    const update = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      el.textContent = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )

  if (aboutStats.value) {
    observer.observe(aboutStats.value)
  }
})
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: start;
}

/* Terminal-style code block */
.about-intro {
  padding: 0;
  overflow: hidden;
  background: var(--bg-secondary);
}

.about-terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .about-terminal-bar {
  background: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #febc2e; }
.terminal-dot.green { background: #28c840; }

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-left: 8px;
}

.about-code {
  padding: 24px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.8;
  overflow-x: auto;
  color: #E7E7E7;
  background: #1a1a1a;
}
/* Keep code block dark for readability even in light mode */

.about-code pre {
  margin: 0;
}

.about-code code {
  white-space: pre;
}

.code-keyword { color: #c678dd; }
.code-var { color: #e06c75; }
.code-key { color: #e5c07b; }
.code-string { color: #98c379; }

/* Stats */
.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  padding: 24px;
  text-align: center;
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px) scale(1.02);
}

.stat-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-suffix {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Soft Skills */
.about-soft-skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 48px;
}

.soft-skill-pill {
  padding: 8px 20px;
  background: rgba(var(--accent-secondary-rgb), 0.08);
  border: 1px solid rgba(var(--accent-secondary-rgb), 0.15);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--accent-secondary);
  font-weight: 600;
  transition: all var(--transition-base);
}

.soft-skill-pill:hover {
  background: rgba(var(--accent-secondary-rgb), 0.15);
  border-color: rgba(var(--accent-secondary-rgb), 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
