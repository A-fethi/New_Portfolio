<template>
  <div class="custom-cursor" ref="cursor">
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-ring" ref="cursorRing"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const cursorDot = ref(null)
const cursorRing = ref(null)

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let animationFrame = null

const onMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
  }
}

const animate = () => {
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  if (cursorRing.value) {
    cursorRing.value.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
  }
  animationFrame = requestAnimationFrame(animate)
}

const onMouseEnterInteractive = () => {
  if (cursorRing.value) {
    cursorRing.value.classList.add('cursor-hover')
  }
}

const onMouseLeaveInteractive = () => {
  if (cursorRing.value) {
    cursorRing.value.classList.remove('cursor-hover')
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  animate()

  // Add hover effects for interactive elements
  setTimeout(() => {
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .skill-card, .project-card, .tech-tag')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.custom-cursor {
  display: none;
}

@media (pointer: fine) {
  .custom-cursor {
    display: block;
  }

  :global(body) {
    cursor: none;
  }

  :global(a, button) {
    cursor: none;
  }
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10001;
  /* Using difference usually requires white background, 
     in our case the color shift works okay but let's make it more transparent */
  mix-blend-mode: normal;
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(var(--accent-primary-rgb), 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  will-change: transform;
  transition: width 0.3s, height 0.3s, border-color 0.3s;
}

[data-theme="light"] .cursor-ring {
  border: 2px solid rgba(var(--accent-primary-rgb), 0.7);
}

.cursor-ring.cursor-hover {
  width: 60px;
  height: 60px;
  border-color: var(--accent-secondary);
  background: rgba(var(--accent-secondary-rgb), 0.05);
}

[data-theme="light"] .cursor-ring.cursor-hover {
  background: rgba(var(--accent-secondary-rgb), 0.15);
}
</style>
