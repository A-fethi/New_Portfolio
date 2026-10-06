<template>
  <div class="palette-switcher" ref="switcherRef">
    <!-- Palette Toggle Button -->
    <button
      class="palette-btn"
      @click="isOpen = !isOpen; playClick()"
      title="Change Color Palette Scheme"
      :aria-label="'Current palette: ' + currentPalette"
    >
      <span class="palette-preview-dots">
        <span class="dot dot-1" :style="{ background: currentThemeMeta.primary }"></span>
        <span class="dot dot-2" :style="{ background: currentThemeMeta.secondary }"></span>
      </span>
      <span class="palette-name text-mono">{{ currentThemeMeta.shortLabel }}</span>
    </button>

    <!-- Palette Dropdown Popover -->
    <Transition name="palette-fade">
      <div v-if="isOpen" class="palette-dropdown glass-card">
        <div class="dropdown-header">
          <span class="dropdown-label text-mono">// Color Schemes</span>
          <span class="dropdown-hint">Live Preview</span>
        </div>

        <div class="palettes-list">
          <button
            v-for="pal in palettes"
            :key="pal.id"
            class="palette-option-btn"
            :class="{ active: currentPalette === pal.id }"
            @click="selectPalette(pal.id)"
          >
            <div class="palette-swatches">
              <span class="swatch" :style="{ background: pal.primary }"></span>
              <span class="swatch" :style="{ background: pal.secondary }"></span>
            </div>
            <div class="palette-info">
              <span class="pal-title">{{ pal.name }}</span>
              <span class="pal-sub text-muted">{{ pal.sub }}</span>
            </div>
            <span v-if="currentPalette === pal.id" class="active-check">✓</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { playClick } from '../utils/audioSystem.js'

const STORAGE_KEY = 'portfolio-palette'

const palettes = [
  {
    id: 'cyber-cloud',
    shortLabel: 'Cyber',
    name: 'Option A: Cyber Cloud',
    sub: 'Electric Cyan & Cloud Indigo',
    primary: '#00F0FF',
    secondary: '#6366F1'
  },
  {
    id: 'sunset-hyperdrive',
    shortLabel: 'Sunset',
    name: 'Option B: Sunset Hyperdrive',
    sub: 'Neon Amber & AWS Sky Blue',
    primary: '#FF5E00',
    secondary: '#0284C7'
  },
  {
    id: 'devsecops-emerald',
    shortLabel: 'Emerald',
    name: 'Option C: DevSecOps Emerald',
    sub: 'Mint Matrix & Teal Cyan',
    primary: '#10B981',
    secondary: '#06B6D4'
  },
  {
    id: 'classic-orange',
    shortLabel: 'Classic',
    name: 'Classic: Orange & Olive',
    sub: 'Original Theme Palette',
    primary: '#F68300',
    secondary: '#616808'
  }
]

const isOpen = ref(false)
const currentPalette = ref('cyber-cloud')
const switcherRef = ref(null)

const currentThemeMeta = computed(() => {
  return palettes.find(p => p.id === currentPalette.value) || palettes[0]
})

const applyPalette = (id) => {
  currentPalette.value = id
  document.documentElement.setAttribute('data-palette', id)
  localStorage.setItem(STORAGE_KEY, id)
  window.dispatchEvent(new CustomEvent('palette-change', { detail: id }))
}

const selectPalette = (id) => {
  playClick()
  applyPalette(id)
  isOpen.value = false
}

const handleClickOutside = (e) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY) || 'cyber-cloud'
  applyPalette(saved)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.palette-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.palette-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-primary);
}

[data-theme="light"] .palette-btn {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.04);
}

.palette-btn:hover {
  border-color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.1);
  transform: scale(1.03);
}

.palette-preview-dots {
  display: flex;
  align-items: center;
  gap: -3px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
}

.dot-1 {
  z-index: 2;
}

.dot-2 {
  margin-left: -4px;
  z-index: 1;
}

.palette-name {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Dropdown */
.palette-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 290px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(var(--accent-primary-rgb), 0.15);
  padding: 14px;
  z-index: 1100;
}

[data-theme="light"] .palette-dropdown {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 10px;
}

[data-theme="light"] .dropdown-header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.dropdown-label {
  font-size: 0.75rem;
  color: var(--accent-primary);
  font-weight: 700;
}

.dropdown-hint {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.palettes-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.palette-option-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
}

[data-theme="light"] .palette-option-btn {
  background: rgba(0, 0, 0, 0.02);
}

.palette-option-btn:hover {
  background: rgba(var(--accent-primary-rgb), 0.08);
  border-color: rgba(var(--accent-primary-rgb), 0.25);
  transform: translateX(4px);
}

.palette-option-btn.active {
  background: rgba(var(--accent-primary-rgb), 0.12);
  border-color: var(--accent-primary);
}

.palette-swatches {
  display: flex;
  gap: 4px;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.palette-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.pal-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.pal-sub {
  font-size: 0.68rem;
}

.active-check {
  color: var(--accent-primary);
  font-weight: 800;
  font-size: 0.9rem;
}

/* Transition */
.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>
