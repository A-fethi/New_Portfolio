<template>
  <button
    class="sound-toggle"
    :class="{ enabled: isAudioEnabled }"
    @click="handleToggle"
    :aria-label="isAudioEnabled ? 'Mute audio SFX' : 'Enable audio SFX'"
    :title="isAudioEnabled ? 'Mute Cyber Audio (SFX Enabled)' : 'Enable Cyber Audio (Opt-in SFX)'"
  >
    <Transition name="icon-flip" mode="out-in">
      <!-- Sound On Icon -->
      <svg v-if="isAudioEnabled" key="sound-on" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
      <!-- Sound Muted Icon -->
      <svg v-else key="sound-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    </Transition>
    <span v-if="isAudioEnabled" class="audio-active-dot"></span>
  </button>
</template>

<script setup>
import { isAudioEnabled, toggleAudio, playClick } from '../utils/audioSystem.js'

const handleToggle = () => {
  toggleAudio()
}
</script>

<style scoped>
.sound-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

[data-theme="light"] .sound-toggle {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.04);
  color: var(--text-secondary);
}

.sound-toggle:hover {
  border-color: rgba(var(--accent-primary-rgb), 0.35);
  color: var(--text-primary);
  transform: scale(1.05);
}

.sound-toggle.enabled {
  border-color: rgba(var(--accent-primary-rgb), 0.35);
  background: rgba(var(--accent-primary-rgb), 0.08);
  color: var(--accent-primary);
  box-shadow: 0 0 16px rgba(var(--accent-primary-rgb), 0.2);
}

.sound-toggle.enabled:hover {
  background: rgba(var(--accent-primary-rgb), 0.15);
  transform: scale(1.1);
}

.audio-active-dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 8px var(--accent-primary);
  animation: pulse-ring 2s infinite ease-in-out;
}

@keyframes pulse-ring {
  0%, 100% { opacity: 0.9; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Icon flip transition */
.icon-flip-enter-active,
.icon-flip-leave-active {
  transition: all 0.2s ease;
}

.icon-flip-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

.icon-flip-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
