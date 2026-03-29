<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition name="icon-flip" mode="out-in">
      <svg v-if="isDark" key="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
      <svg v-else key="moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    </Transition>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const applyTheme = (dark) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  isDark.value = dark
}

const toggleTheme = () => {
  const newDark = !isDark.value
  applyTheme(newDark)
  localStorage.setItem('portfolio-theme', newDark ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved) {
    applyTheme(saved === 'dark')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark)
  }
})
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
  background: rgba(var(--accent-primary-rgb), 0.06);
  color: var(--accent-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.theme-toggle:hover {
  background: rgba(var(--accent-primary-rgb), 0.15);
  border-color: rgba(var(--accent-primary-rgb), 0.4);
  transform: rotate(20deg) scale(1.1);
  box-shadow: 0 4px 20px rgba(var(--accent-primary-rgb), 0.2);
}

/* Icon flip transition */
.icon-flip-enter-active,
.icon-flip-leave-active {
  transition: all 0.25s ease;
}

.icon-flip-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.icon-flip-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>
