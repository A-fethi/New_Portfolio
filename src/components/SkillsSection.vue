<template>
  <section class="skills section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Tech Stack</span>
        <h2 class="section-title">Skills & Technologies</h2>
        <p class="section-subtitle">Technologies I've been working with and continuously learning</p>
      </div>

      <div class="skills-grid" ref="skillsGrid">
        <div
          v-for="(category, catIndex) in skills"
          :key="category.category"
          class="skill-card glass-card gradient-border"
          :style="{ '--card-color': category.color }"
          ref="skillCards"
        >
          <div class="skill-card-header">
            <span class="skill-icon">{{ category.icon }}</span>
            <h3 class="skill-category">{{ category.category }}</h3>
          </div>

          <div class="skill-items">
            <div
              v-for="(skill, skillIndex) in category.items"
              :key="skill.name"
              class="skill-item"
            >
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-bar-fill"
                  :style="{
                    '--fill-width': `${skill.level}%`,
                    '--fill-color': category.color,
                    '--fill-delay': `${(catIndex * 0.2) + (skillIndex * 0.1)}s`
                  }"
                  ref="skillBars"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { skills } from '../data/portfolio.js'

const skillsGrid = ref(null)
const skillCards = ref([])
const skillBars = ref([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          // Animate skill bars
          const bars = entry.target.querySelectorAll('.skill-bar-fill')
          bars.forEach(bar => {
            bar.classList.add('fill-animate')
          })
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card)
  })
})
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.skill-card {
  padding: 28px;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skill-card:hover {
  border-color: var(--card-color) !important;
  box-shadow: 0 8px 30px color-mix(in srgb, var(--card-color) 20%, transparent);
}

.skill-card::before {
  background: linear-gradient(135deg, var(--card-color), transparent) !important;
  opacity: 0.3 !important;
}

[data-theme="light"] .skill-card::before {
  opacity: 0.15 !important;
}

.skill-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.skill-icon {
  font-size: 1.8rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .skill-icon {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.skill-category {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--card-color);
  font-weight: 700;
}

.skill-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08); /* slight contrast bump */
  border-radius: 3px;
  overflow: hidden;
}

[data-theme="light"] .skill-bar {
  background: rgba(0, 0, 0, 0.08);
}

.skill-bar-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--fill-color), color-mix(in srgb, var(--fill-color) 60%, white));
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--fill-delay);
  position: relative;
}

.skill-bar-fill.fill-animate {
  width: var(--fill-width);
}

.skill-bar-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(2px);
}

[data-theme="light"] .skill-bar-fill::after {
  background: rgba(255,255,255,0.6);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
