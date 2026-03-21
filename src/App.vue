<template>
  <div id="portfolio-app">
    <div class="noise-overlay"></div>
    <CustomCursor />
    <NavBar :activeSection="activeSection" @navigate="scrollToSection" />
    <HeroSection id="hero" />
    <hr class="section-divider" />
    <AboutSection id="about" />
    <hr class="section-divider" />
    <SkillsSection id="skills" />
    <hr class="section-divider" />
    <ProjectsSection id="projects" />
    <hr class="section-divider" />
    <TimelineSection id="timeline" />
    <hr class="section-divider" />
    <ContactSection id="contact" />
    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const activeSection = ref('hero')
const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact']

let observer = null

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  sections.forEach((sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
#portfolio-app {
  position: relative;
  min-height: 100vh;
}
</style>
