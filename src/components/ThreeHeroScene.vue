<template>
  <div class="three-scene-wrapper" ref="containerRef">
    <canvas ref="canvasRef" class="three-canvas"></canvas>
    
    <!-- Floating Cyber HUD Overlays -->
    <div class="hud-element top-left">
      <span class="hud-code">SYS://CLUSTER_ONLINE</span>
      <span class="hud-status"><span class="hud-pulse"></span>ACTIVE</span>
    </div>
    
    <div class="hud-element top-right">
      <span class="hud-code">REGION://AWS_EU_WEST_3</span>
      <span class="hud-detail">TERRAFORM_MANAGED</span>
    </div>

    <div class="hud-element bottom-left">
      <span class="hud-code">NODES://K3S_READY</span>
      <span class="hud-detail">ZERO_DOWNTIME</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref(null)
const canvasRef = ref(null)

let scene = null
let camera = null
let renderer = null
let animFrameId = null
let isVisible = true

// 3D Objects
let coreGroup = null
let innerIcosahedron = null
let outerWireframe = null
let ring1 = null
let ring2 = null
let ring3 = null
let techNodes = []
let starParticles = null
let pointLight1 = null
let pointLight2 = null

// Mouse tracking
let targetMouseX = 0
let targetMouseY = 0
let mouseX = 0
let mouseY = 0

const initThree = () => {
  if (!canvasRef.value || !containerRef.value) return

  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight

  // 1. Scene & Camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
  camera.position.z = 18

  // 2. Renderer with optimal settings
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  // 3. Central Core Group (Cyber Cloud Core)
  coreGroup = new THREE.Group()
  scene.add(coreGroup)

  // Outer Glowing Wireframe Icosahedron
  const outerGeom = new THREE.IcosahedronGeometry(4.2, 1)
  const outerMat = new THREE.MeshStandardMaterial({
    color: 0xF68300,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
    metalness: 0.8
  })
  outerWireframe = new THREE.Mesh(outerGeom, outerMat)
  coreGroup.add(outerWireframe)

  // Inner Solid Core with facet reflections
  const innerGeom = new THREE.OctahedronGeometry(2.4, 0)
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x616808,
    roughness: 0.15,
    metalness: 0.9,
    wireframe: false,
    emissive: 0x3d4104,
    emissiveIntensity: 0.4
  })
  innerIcosahedron = new THREE.Mesh(innerGeom, innerMat)
  coreGroup.add(innerIcosahedron)

  // Glowing center node (represents core infrastructure kernel)
  const kernelGeom = new THREE.SphereGeometry(0.8, 16, 16)
  const kernelMat = new THREE.MeshBasicMaterial({
    color: 0xF68300,
    wireframe: true
  })
  const kernelMesh = new THREE.Mesh(kernelGeom, kernelMat)
  coreGroup.add(kernelMesh)

  // 4. Orbital Rings (Cloud Security & Network Perimeters)
  const createRing = (radius, tube, color, rotX, rotY) => {
    const geom = new THREE.TorusGeometry(radius, tube, 16, 120)
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.55
    })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.rotation.x = rotX
    mesh.rotation.y = rotY
    coreGroup.add(mesh)
    return mesh
  }

  ring1 = createRing(5.6, 0.04, 0xF68300, Math.PI / 3, Math.PI / 6)
  ring2 = createRing(6.4, 0.03, 0x616808, -Math.PI / 4, Math.PI / 4)
  ring3 = createRing(7.2, 0.025, 0xd9740a, Math.PI / 2.2, -Math.PI / 5)

  // 5. Orbiting Tech Nodes (representing AWS, K8s, Docker, Terraform, Go, Vue)
  const nodeCount = 6
  const techColors = [0xF68300, 0x616808, 0xd9740a, 0x6d7a0a, 0xffa333, 0x8a4b00]
  
  for (let i = 0; i < nodeCount; i++) {
    const nodeGeom = i % 2 === 0 ? new THREE.BoxGeometry(0.5, 0.5, 0.5) : new THREE.OctahedronGeometry(0.35)
    const nodeMat = new THREE.MeshStandardMaterial({
      color: techColors[i % techColors.length],
      metalness: 0.8,
      roughness: 0.2,
      emissive: techColors[i % techColors.length],
      emissiveIntensity: 0.5
    })
    const mesh = new THREE.Mesh(nodeGeom, nodeMat)
    
    // Wireframe cage around node
    const cageGeom = new THREE.BoxGeometry(0.7, 0.7, 0.7)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    })
    const cage = new THREE.Mesh(cageGeom, cageMat)
    mesh.add(cage)

    techNodes.push({
      mesh,
      angle: (i / nodeCount) * Math.PI * 2,
      radius: 5.8 + (i % 3) * 0.9,
      speed: 0.008 + (i % 2) * 0.004,
      elevation: Math.sin(i) * 1.8
    })
    scene.add(mesh)
  }

  // 6. Deep Space Cloud Network Particles (Constellation)
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const c1 = new THREE.Color(0xF68300) // Neon Orange
  const c2 = new THREE.Color(0x616808) // Olive
  const c3 = new THREE.Color(0xd9740a) // Amber

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    // Distribute in a spherical cloud volume
    const radius = 8 + Math.random() * 22
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi) - 2

    const selectedColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3
    colors[i3] = selectedColor.r
    colors[i3 + 1] = selectedColor.g
    colors[i3 + 2] = selectedColor.b
  }

  const particleGeom = new THREE.BufferGeometry()
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMat = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  })
  starParticles = new THREE.Points(particleGeom, particleMat)
  scene.add(starParticles)

  // 7. Dynamic Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  pointLight1 = new THREE.PointLight(0xF68300, 3.5, 40)
  pointLight1.position.set(12, 10, 8)
  scene.add(pointLight1)

  pointLight2 = new THREE.PointLight(0x80ff72, 2.8, 35)
  pointLight2.position.set(-12, -8, -4)
  scene.add(pointLight2)

  // Mouse Listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize)

  // Start Animation Loop
  animate()
}

const onMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = -(e.clientY / window.innerHeight) * 2 + 1
  targetMouseX = x * 2.5
  targetMouseY = y * 2.0
}

const onResize = () => {
  if (!containerRef.value || !camera || !renderer) return
  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

let clock = new THREE.Clock()

const animate = () => {
  if (!isVisible) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  const elapsed = clock.getElapsedTime()

  // Smooth lerp mouse tracking
  mouseX += (targetMouseX - mouseX) * 0.04
  mouseY += (targetMouseY - mouseY) * 0.04

  // Parallax camera sway
  if (camera) {
    camera.position.x = mouseX * 1.5
    camera.position.y = mouseY * 1.2
    camera.lookAt(0, 0, 0)
  }

  // Rotate Core Group
  if (coreGroup) {
    coreGroup.rotation.y = elapsed * 0.15 + mouseX * 0.3
    coreGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.15 - mouseY * 0.25
  }

  if (outerWireframe) {
    outerWireframe.rotation.y = elapsed * 0.2
    outerWireframe.rotation.z = elapsed * 0.12
  }

  if (innerIcosahedron) {
    innerIcosahedron.rotation.y = -elapsed * 0.3
    innerIcosahedron.rotation.x = elapsed * 0.25
    const scale = 1 + Math.sin(elapsed * 2.5) * 0.05
    innerIcosahedron.scale.set(scale, scale, scale)
  }

  // Rotate Orbital Rings
  if (ring1) ring1.rotation.z = elapsed * 0.25
  if (ring2) ring2.rotation.z = -elapsed * 0.2
  if (ring3) ring3.rotation.z = elapsed * 0.15

  // Move Orbiting Tech Nodes
  techNodes.forEach((node) => {
    node.angle += node.speed
    node.mesh.position.x = Math.cos(node.angle) * node.radius
    node.mesh.position.z = Math.sin(node.angle) * node.radius
    node.mesh.position.y = Math.sin(elapsed * 1.5 + node.angle) * 1.2 + node.elevation
    node.mesh.rotation.x += 0.02
    node.mesh.rotation.y += 0.03
  })

  // Rotate Background Cloud Constellation
  if (starParticles) {
    starParticles.rotation.y = elapsed * 0.025
    starParticles.rotation.x = Math.sin(elapsed * 0.015) * 0.05
  }

  // Light pulsation & orbit
  if (pointLight1) {
    pointLight1.position.x = Math.cos(elapsed * 0.5) * 14
    pointLight1.position.z = Math.sin(elapsed * 0.5) * 14
  }
  if (pointLight2) {
    pointLight2.position.x = -Math.cos(elapsed * 0.4) * 14
    pointLight2.position.z = -Math.sin(elapsed * 0.4) * 14
  }

  renderer.render(scene, camera)
  animFrameId = requestAnimationFrame(animate)
}

let observer = null

onMounted(() => {
  initThree()

  // Conserve battery & CPU using IntersectionObserver
  observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting
  }, { threshold: 0.05 })

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
  if (observer) observer.disconnect()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)

  // Proper Three.js resource disposal
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
  }
  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
  }
})
</script>

<style scoped>
.three-scene-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.three-canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* Futuristic HUD Overlays */
.hud-element {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  padding: 8px 14px;
  background: rgba(17, 17, 17, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
  pointer-events: none;
  z-index: 1;
  opacity: 0.8;
  transition: opacity var(--transition-base);
}

[data-theme="light"] .hud-element {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(0, 0, 0, 0.08);
}

.hud-element.top-left {
  top: 100px;
  left: 40px;
  border-left: 2px solid var(--accent-primary);
}

.hud-element.top-right {
  top: 100px;
  right: 40px;
  border-right: 2px solid var(--accent-secondary);
  text-align: right;
}

.hud-element.bottom-left {
  bottom: 40px;
  left: 40px;
  border-left: 2px solid #d9740a;
}

.hud-code {
  color: var(--accent-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hud-status {
  color: #80ff72;
  font-size: 0.68rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hud-pulse {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 8px #80ff72;
  animation: pulseGlow 1.8s ease-in-out infinite;
}

.hud-detail {
  color: var(--text-muted);
  font-size: 0.68rem;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

@media (max-width: 900px) {
  .hud-element {
    display: none;
  }
}
</style>
