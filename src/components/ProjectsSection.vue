<template>
  <section class="projects section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Featured Work</span>
        <h2 class="section-title">Projects</h2>
        <p class="section-subtitle">Some things I've built that I'm proud of</p>
      </div>

      <div class="projects-grid" ref="projectsGrid">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-card glass-card"
          :style="{ '--project-color': project.color }"
          @mouseenter="hoveredProject = index"
          @mouseleave="hoveredProject = null"
          ref="projectCards"
        >
          <div class="project-glow"></div>

          <div class="project-number">
            <span class="text-mono">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <div class="project-icon">{{ project.icon }}</div>

          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-subtitle">{{ project.subtitle }}</p>
          <p class="project-description">{{ project.description }}</p>

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

          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener" class="project-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>View Code</span>
            </a>
          </div>

          <!-- Animated border gradient -->
          <div class="project-border-glow" :class="{ active: hoveredProject === index }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projects } from '../data/portfolio.js'

const hoveredProject = ref(null)
const projectsGrid = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card)
  })
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  padding: 32px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.project-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.project-card:nth-child(2).animate-in { transition-delay: 0.1s; }
.project-card:nth-child(3).animate-in { transition-delay: 0.2s; }
.project-card:nth-child(4).animate-in { transition-delay: 0.3s; }

.project-card:hover {
  transform: translateY(-8px) !important;
  border-color: var(--project-color) !important;
}

/* Glow effect on hover */
.project-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, var(--project-color), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.project-card:hover .project-glow {
  opacity: 0.05;
}

[data-theme="light"] .project-card:hover .project-glow {
  opacity: 0.08; /* Need slightly more opacity in light mode */
}

.project-number {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--project-color);
  opacity: 0.8;
  margin-bottom: 16px;
  font-weight: 700;
}

.project-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: inline-block;
  transition: transform var(--transition-base);
}

.project-card:hover .project-icon {
  transform: scale(1.2) rotate(5deg);
}

.project-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.project-subtitle {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--project-color);
  margin-bottom: 16px;
  font-weight: 600;
}

.project-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.project-tech .tech-tag {
  color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 8%, transparent);
  border-color: color-mix(in srgb, var(--tag-color) 20%, transparent);
}

.project-links {
  display: flex;
  gap: 16px;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-base);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .project-link {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.project-link:hover {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.08);
  border-color: rgba(var(--accent-primary-rgb), 0.2);
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

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
