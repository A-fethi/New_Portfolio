<template>
  <nav class="navbar" :class="{ 'navbar-visible': isScrolled, 'navbar-hidden': !isScrolled }">
    <div class="nav-container">
      <a href="#hero" class="nav-logo" @click.prevent="$emit('navigate', 'hero')">
        <span class="logo-bracket">&lt;</span>
        <span class="logo-name">AF</span>
        <span class="logo-bracket">/&gt;</span>
      </a>

      <div class="nav-links" :class="{ 'nav-open': isMobileOpen }">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          :class="{ active: activeSection === link.id }"
          @click.prevent="navigate(link.id)"
        >
          {{ link.label }}
          <span class="nav-link-indicator"></span>
        </a>
      </div>

      <div class="nav-actions">
        <ThemeToggle />
        <button class="nav-toggle" @click="isMobileOpen = !isMobileOpen" :class="{ open: isMobileOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps({
  activeSection: String
})

const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const navigate = (id) => {
  emit('navigate', id)
  isMobileOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all var(--transition-base);
  transform: translateY(-100%);
  opacity: 0;
}

.navbar-visible {
  transform: translateY(0);
  opacity: 1;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(var(--accent-primary-rgb), 0.05);
}

.nav-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: all var(--transition-base);
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-bracket {
  color: var(--accent-primary);
}

.logo-name {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(var(--accent-primary-rgb), 0.05);
}

.nav-link.active {
  color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.08);
}

.nav-link-indicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 1px;
  transition: transform var(--transition-base);
}

.nav-link.active .nav-link-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Mobile Toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1001;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.nav-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.open span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--overlay-bg);
    backdrop-filter: blur(30px);
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base);
  }

  .nav-links.nav-open {
    opacity: 1;
    pointer-events: all;
  }

  .nav-link {
    font-size: 1.5rem;
    padding: 12px 32px;
  }
}
</style>
