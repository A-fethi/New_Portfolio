<template>
  <section class="timeline section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Journey</span>
        <h2 class="section-title">Experience & Education</h2>
        <p class="section-subtitle">My professional journey and academic background</p>
      </div>

      <div class="timeline-container">
        <div class="timeline-line" ref="timelineLine">
          <div class="timeline-line-fill" ref="timelineLineFill"></div>
        </div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item"
          :class="[index % 2 === 0 ? 'left' : 'right', item.type]"
          ref="timelineItems"
        >
          <div class="timeline-node">
            <span class="timeline-icon">{{ item.icon }}</span>
          </div>

          <div class="timeline-card glass-card gradient-border">
            <div class="timeline-card-header">
              <span class="timeline-type-badge" :class="item.type">
                {{ item.type === 'work' ? '💼 Work' : '🎓 Education' }}
              </span>
              <span class="timeline-period">{{ item.period }}</span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-org">{{ item.organization }}</p>
            <p class="timeline-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { experience, education } from '../data/portfolio.js'

const timelineItems = computed(() => {
  return [...education, ...experience].sort((a, b) => {
    // Sort by most recent first (rough comparison)
    const getYear = (period) => {
      const match = period.match(/\d{4}/)
      return match ? parseInt(match[0]) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })
})

const timelineLine = ref(null)
const timelineLineFill = ref(null)

onMounted(() => {
  // Scroll-triggered reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item)
  })

  // Timeline line fill on scroll
  const handleScroll = () => {
    if (!timelineLine.value || !timelineLineFill.value) return
    const rect = timelineLine.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const lineHeight = rect.height

    if (rect.top < windowHeight && rect.bottom > 0) {
      const visiblePortion = Math.min(windowHeight - rect.top, lineHeight)
      const progress = Math.max(0, Math.min(1, visiblePortion / lineHeight))
      timelineLineFill.value.style.height = `${progress * 100}%`
    }
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})
</script>

<style scoped>
.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(-50%);
}

[data-theme="light"] .timeline-line {
  background: rgba(0, 0, 0, 0.08); /* Darker line in light mode */
}

.timeline-line-fill {
  width: 100%;
  height: 0%;
  background: var(--gradient-primary);
  border-radius: 1px;
  transition: height 0.1s linear;
  box-shadow: 0 0 10px rgba(var(--accent-primary-rgb), 0.3);
}

/* Timeline Item */
.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  position: relative;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item.left {
  flex-direction: row;
  padding-right: calc(50% + 32px);
  transform: translateX(-40px);
}

.timeline-item.right {
  flex-direction: row-reverse;
  padding-left: calc(50% + 32px);
  transform: translateX(40px);
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

/* Timeline Node */
.timeline-node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 2px solid rgba(var(--accent-primary-rgb), 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all var(--transition-base);
}

.timeline-item.animate-in .timeline-node {
  border-color: var(--accent-primary);
  box-shadow: 0 0 15px rgba(var(--accent-primary-rgb), 0.2);
}

.timeline-icon {
  font-size: 1.1rem;
}

/* Timeline Card */
.timeline-card {
  padding: 24px;
  flex: 1;
}

.timeline-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline-type-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.timeline-type-badge.work {
  background: rgba(var(--accent-primary-rgb), 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
}

.timeline-type-badge.education {
  background: rgba(var(--accent-secondary-rgb), 0.1);
  color: var(--accent-secondary);
  border: 1px solid rgba(var(--accent-secondary-rgb), 0.2);
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.timeline-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline-org {
  font-size: 0.9rem;
  color: var(--accent-secondary);
  margin-bottom: 12px;
  font-weight: 600;
}

.timeline-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-node {
    left: 20px;
    width: 36px;
    height: 36px;
  }

  .timeline-item.left,
  .timeline-item.right {
    padding-left: 56px;
    padding-right: 0;
    flex-direction: row;
  }

  .timeline-item.left {
    transform: translateX(-20px);
  }

  .timeline-item.right {
    transform: translateX(-20px);
    flex-direction: row;
  }
}
</style>
