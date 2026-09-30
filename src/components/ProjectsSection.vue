<template>
  <section class="projects section" id="projects">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Engineered Systems</span>
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">Production cloud infrastructure, automated CI/CD pipelines, and high-performance full-stack applications</p>
      </div>

      <!-- Filter Controls -->
      <div class="project-filters">
        <button
          v-for="filter in filterTabs"
          :key="filter.key"
          class="filter-btn"
          :class="{ active: currentFilter === filter.key }"
          @click="filterProjects(filter.key)"
        >
          <span class="filter-icon">{{ filter.icon }}</span>
          <span>{{ filter.label }}</span>
          <span class="filter-count">{{ getFilterCount(filter.key) }}</span>
        </button>
      </div>

      <!-- 3D Perspective Projects Grid with GSAP Stagger -->
      <div class="projects-grid" ref="projectsGridRef">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.title"
          class="project-card glass-card 3d-card"
          :style="{
            '--project-color': project.color,
            '--mouse-x': cardMouseStates[project.title]?.x || '50%',
            '--mouse-y': cardMouseStates[project.title]?.y || '50%',
            '--tilt-x': cardMouseStates[project.title]?.tiltX || '0deg',
            '--tilt-y': cardMouseStates[project.title]?.tiltY || '0deg'
          }"
          @mouseenter="onCardEnter(project.title)"
          @mousemove="onCardMouseMove($event, project.title)"
          @mouseleave="onCardLeave(project.title)"
        >
          <!-- Dynamic Holographic Specular Highlight -->
          <div class="card-specular-shine"></div>
          <div class="project-glow"></div>

          <div class="card-top-row">
            <div class="project-number text-mono">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="category-pill" :class="project.category">
                {{ project.category === 'devops' ? '☁️ DevOps & Cloud' : '🌐 Full Stack' }}
              </span>
            </div>
            <div class="project-icon">{{ project.icon }}</div>
          </div>

          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-subtitle">{{ project.subtitle }}</p>
          <p class="project-description">{{ project.description }}</p>

          <!-- Architectural Highlights -->
          <div v-if="project.highlights" class="project-highlights">
            <span v-for="hl in project.highlights" :key="hl" class="highlight-chip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {{ hl }}
            </span>
          </div>

          <!-- Tech Stack Tags -->
          <div class="project-tech">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="tech-tag"
              :style="{ '--tag-color': project.color }"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Action Buttons with System Architecture Modal Trigger (DevOps & Cloud Only) -->
          <div class="project-links">
            <button
              v-if="project.category === 'devops'"
              class="project-link btn-arch-trigger"
              @click.stop="openArchitecture(project)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <span>Architecture</span>
            </button>
            <a :href="project.github" target="_blank" rel="noopener" class="project-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>Repository</span>
            </a>
          </div>

          <!-- Animated border gradient -->
          <div class="project-border-glow" :class="{ active: hoveredProjectKey === project.title }"></div>
        </div>
      </div>
    </div>

    <!-- Interactive Architecture Diagram Modal -->
    <ProjectArchitectureModal
      v-if="selectedArchitectureProject"
      :project="selectedArchitectureProject"
      @close="closeArchitecture"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { projects } from '../data/portfolio.js'
import ProjectArchitectureModal from './ProjectArchitectureModal.vue'

const hoveredProjectKey = ref(null)
const currentFilter = ref('all')
const cardMouseStates = ref({})
const projectsGridRef = ref(null)
const isAnimating = ref(false)
const selectedArchitectureProject = ref(null)

const filterTabs = [
  { key: 'all', label: 'All Projects', icon: '⚡' },
  { key: 'devops', label: 'Cloud & DevOps Specialty', icon: '☁️' },
  { key: 'fullstack', label: 'Full Stack Web', icon: '🌐' }
]

const filteredProjects = computed(() => {
  if (currentFilter.value === 'all') return projects
  return projects.filter(p => p.category === currentFilter.value)
})

const getFilterCount = (key) => {
  if (key === 'all') return projects.length
  return projects.filter(p => p.category === key).length
}

const openArchitecture = (project) => {
  selectedArchitectureProject.value = project
}

const closeArchitecture = () => {
  selectedArchitectureProject.value = null
}

const filterProjects = (filterKey) => {
  if (currentFilter.value === filterKey || isAnimating.value) return
  isAnimating.value = true

  const cards = projectsGridRef.value?.querySelectorAll('.project-card')

  if (!cards || cards.length === 0) {
    currentFilter.value = filterKey
    isAnimating.value = false
    return
  }

  // Animate outgoing cards
  gsap.to(cards, {
    opacity: 0,
    y: 18,
    scale: 0.95,
    duration: 0.22,
    stagger: 0.03,
    ease: 'power2.in',
    onComplete: () => {
      currentFilter.value = filterKey

      nextTick(() => {
        const newCards = projectsGridRef.value?.querySelectorAll('.project-card')
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
      })
    }
  })
}

// 3D Card Interactive Tilt Math
const onCardEnter = (key) => {
  hoveredProjectKey.value = key
}

const onCardMouseMove = (e, key) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const tiltX = -((y - centerY) / centerY) * 10
  const tiltY = ((x - centerX) / centerX) * 10

  cardMouseStates.value[key] = {
    x: `${(x / rect.width) * 100}%`,
    y: `${(y / rect.height) * 100}%`,
    tiltX: `${tiltX.toFixed(2)}deg`,
    tiltY: `${tiltY.toFixed(2)}deg`
  }
}

const onCardLeave = (key) => {
  hoveredProjectKey.value = null
  cardMouseStates.value[key] = {
    x: '50%',
    y: '50%',
    tiltX: '0deg',
    tiltY: '0deg'
  }
}

onMounted(() => {
  nextTick(() => {
    const cards = projectsGridRef.value?.querySelectorAll('.project-card')
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
  })
})
</script>

<style scoped>
/* Filter Buttons */
.project-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

[data-theme="light"] .filter-btn {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.filter-btn:hover {
  color: var(--text-primary);
  border-color: rgba(var(--accent-primary-rgb), 0.35);
  background: rgba(var(--accent-primary-rgb), 0.06);
  transform: translateY(-2px);
}

.filter-btn.active {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.14);
  border-color: var(--accent-primary);
  box-shadow: 0 0 16px rgba(var(--accent-primary-rgb), 0.25);
  transform: translateY(-2px);
}

.filter-count {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 7px;
  border-radius: var(--radius-full);
}

.filter-btn.active .filter-count {
  background: var(--accent-primary);
  color: #111;
  font-weight: 800;
}

/* 3D Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  perspective: 1200px;
}

.project-card {
  padding: 32px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

.project-card:hover {
  transform: perspective(1000px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale3d(1.02, 1.02, 1.02) !important;
  border-color: var(--project-color) !important;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5), 0 0 30px color-mix(in srgb, var(--project-color) 25%, transparent) !important;
}

/* Dynamic Specular Flashlight Shine */
.card-specular-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-specular-shine {
  opacity: 1;
}

[data-theme="light"] .card-specular-shine {
  background: radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(0, 0, 0, 0.05), transparent 70%);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.project-number {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--project-color);
  font-weight: 700;
}

.category-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-family: var(--font-primary);
}

.category-pill.devops {
  background: rgba(246, 131, 0, 0.12);
  color: var(--accent-primary);
  border: 1px solid rgba(246, 131, 0, 0.25);
}

.category-pill.fullstack {
  background: rgba(97, 104, 8, 0.15);
  color: #80ff72;
  border: 1px solid rgba(97, 104, 8, 0.3);
}

.project-icon {
  font-size: 2.2rem;
  transition: transform var(--transition-base);
}

.project-card:hover .project-icon {
  transform: scale(1.15) rotate(6deg);
}

.project-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.project-subtitle {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--project-color);
  margin-bottom: 14px;
  font-weight: 600;
}

.project-description {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 18px;
}

/* Architecture Highlights */
.project-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.highlight-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #80ff72;
  background: rgba(128, 255, 114, 0.08);
  border: 1px solid rgba(128, 255, 114, 0.2);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.project-tech .tech-tag {
  color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 8%, transparent);
  border-color: color-mix(in srgb, var(--tag-color) 22%, transparent);
}

.project-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all var(--transition-base);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

[data-theme="light"] .project-link {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.btn-arch-trigger {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.08);
  border-color: rgba(var(--accent-primary-rgb), 0.3);
}

.btn-arch-trigger:hover {
  background: var(--accent-primary) !important;
  color: #111 !important;
  box-shadow: 0 0 16px rgba(var(--accent-primary-rgb), 0.35);
  transform: translateY(-2px);
}

.project-link:hover {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.1);
  border-color: rgba(var(--accent-primary-rgb), 0.3);
  transform: translateY(-2px);
}

/* Animated border */
.project-border-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.project-border-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, var(--project-color), transparent 50%, var(--project-color));
  background-size: 300% 300%;
  animation: gradient-shift 3s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.project-border-glow.active {
  opacity: 1;
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
