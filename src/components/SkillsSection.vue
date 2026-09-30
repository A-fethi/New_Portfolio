<template>
  <section class="skills section" id="skills">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Technical Arsenal</span>
        <h2 class="section-title">Skills & Capabilities</h2>
        <p class="section-subtitle">Deep technical competencies spanning Cloud Infrastructure, CI/CD automation, backend systems, and modern frontend</p>
      </div>

      <!-- Quick Category Toggle Pills -->
      <div class="skill-category-filters">
        <button
          class="skill-filter-pill"
          :class="{ active: activeCategory === 'all' }"
          @click="filterCategory('all')"
        >
          <span>⚡</span>
          <span>All Domains</span>
        </button>
        <button
          v-for="cat in skills"
          :key="cat.category"
          class="skill-filter-pill"
          :class="{ active: activeCategory === cat.category }"
          @click="filterCategory(cat.category)"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.category }}</span>
        </button>
      </div>

      <!-- Skills Grid with GSAP Stagger Animations -->
      <div class="skills-grid" ref="skillsGridRef">
        <div
          v-for="category in displayedSkills"
          :key="category.category"
          class="skill-card glass-card gradient-border"
          :style="{ '--card-color': category.color }"
        >
          <div class="skill-card-header">
            <span class="skill-icon">{{ category.icon }}</span>
            <div class="header-titles">
              <h3 class="skill-category">{{ category.category }}</h3>
              <span class="skill-badge-sub">Specialty Level</span>
            </div>
          </div>

          <div class="skill-items">
            <div
              v-for="skill in category.items"
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
                  :data-fill="`${skill.level}%`"
                  :style="{
                    '--fill-color': category.color,
                    width: `${skill.level}%`
                  }"
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
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { skills } from '../data/portfolio.js'

const activeCategory = ref('all')
const skillsGridRef = ref(null)
const isAnimating = ref(false)

const displayedSkills = computed(() => {
  if (activeCategory.value === 'all') return skills
  return skills.filter(s => s.category === activeCategory.value)
})

const filterCategory = (categoryKey) => {
  if (activeCategory.value === categoryKey || isAnimating.value) return
  isAnimating.value = true

  const cards = skillsGridRef.value?.querySelectorAll('.skill-card')

  if (!cards || cards.length === 0) {
    activeCategory.value = categoryKey
    isAnimating.value = false
    return
  }

  // Smooth GSAP exit animation
  gsap.to(cards, {
    opacity: 0,
    y: 18,
    scale: 0.95,
    duration: 0.22,
    stagger: 0.03,
    ease: 'power2.in',
    onComplete: () => {
      activeCategory.value = categoryKey

      nextTick(() => {
        const newCards = skillsGridRef.value?.querySelectorAll('.skill-card')
        if (!newCards || newCards.length === 0) {
          isAnimating.value = false
          return
        }

        // Staggered spring entrance
        gsap.fromTo(
          newCards,
          {
            opacity: 0,
            y: 28,
            scale: 0.93
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
            onComplete: () => {
              isAnimating.value = false
            }
          }
        )

        // Smooth progress bar fill sweep
        const bars = skillsGridRef.value?.querySelectorAll('.skill-bar-fill')
        if (bars) {
          bars.forEach((bar) => {
            const targetWidth = bar.getAttribute('data-fill') || '80%'
            gsap.fromTo(
              bar,
              { width: '0%' },
              {
                width: targetWidth,
                duration: 0.85,
                ease: 'power2.out',
                delay: 0.1
              }
            )
          })
        }
      })
    }
  })
}

onMounted(() => {
  nextTick(() => {
    const cards = skillsGridRef.value?.querySelectorAll('.skill-card')
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        }
      )
    }

    const bars = skillsGridRef.value?.querySelectorAll('.skill-bar-fill')
    if (bars) {
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-fill') || '80%'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.1,
            ease: 'power2.out',
            delay: 0.15
          }
        )
      })
    }
  })
})
</script>

<style scoped>
.skill-category-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.skill-filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

[data-theme="light"] .skill-filter-pill {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.skill-filter-pill:hover {
  color: var(--text-primary);
  border-color: rgba(var(--accent-primary-rgb), 0.35);
  transform: translateY(-2px);
  background: rgba(var(--accent-primary-rgb), 0.06);
}

.skill-filter-pill.active {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.14);
  border-color: var(--accent-primary);
  box-shadow: 0 0 16px rgba(var(--accent-primary-rgb), 0.25);
  transform: translateY(-2px);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}

.skill-card {
  padding: 28px;
  opacity: 1;
  transform: translateY(0);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  will-change: transform, opacity;
}

.skill-card:hover {
  border-color: var(--card-color) !important;
  box-shadow: 0 12px 35px color-mix(in srgb, var(--card-color) 25%, transparent);
  transform: translateY(-4px);
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
  gap: 14px;
  margin-bottom: 24px;
}

.skill-icon {
  font-size: 1.8rem;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .skill-icon {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.header-titles {
  display: flex;
  flex-direction: column;
}

.skill-category {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}

.skill-badge-sub {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
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
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

[data-theme="light"] .skill-bar {
  background: rgba(0, 0, 0, 0.08);
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--fill-color), color-mix(in srgb, var(--fill-color) 60%, white));
  border-radius: 3px;
  position: relative;
  will-change: width;
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
