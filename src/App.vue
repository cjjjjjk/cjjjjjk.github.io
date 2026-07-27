<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'

/* ======================================================================
   ✦ cjjjjjk's chaos zone ✦
   a single-file playground. no routes, no structure, just noise.
   ====================================================================== */

const TITLE = 'cjjjjjk'
const titleLetters = TITLE.split('')

const SUBS = [
  'certified web goblin',
  'professional button avoider',
  'this site has no point (on purpose)',
  'drag stuff. click stuff. break nothing.',
  '100% organic pixels',
  'warning: googly eyes ahead',
]
const subtitle = ref(SUBS[0])

const MARQUEE_TOP =
  '✦ welcome to the chaos ✦ everything wiggles ✦ nothing is aligned ✦ ' +
  'drag the stickers ✦ chase the button ✦ '
const MARQUEE_BOTTOM =
  '★ made with too much coffee ★ no framework was harmed ★ ' +
  'click anywhere for confetti ★ vibes only ★ '

/* ---------- draggable stickers ---------- */
interface Sticker {
  text: string
  x: number
  y: number
  rot: number
  bg: string
  grabbed: boolean
  delay: number
}
const palette = ['#ff5ea3', '#b8ff4f', '#4fd2ff', '#ffd23f', '#9b5de5', '#ff6b3d', '#3ddc97']
const stickerSeed = [
  'hello!! 👋',
  'wanna drag me?',
  'i have no purpose ✨',
  'beep boop 🤖',
  'do NOT press the button →',
  '404: seriousness not found',
  'yes this is a website',
  'sticker #7 🍬',
  'wheee 🎈',
  'you found me 🐛',
]
const stickers = reactive<Sticker[]>(
  stickerSeed.map((text, i) => ({
    text,
    x: 8 + ((i * 37) % 78),
    y: 22 + ((i * 53) % 56),
    rot: (i % 2 ? 1 : -1) * (4 + ((i * 7) % 12)),
    bg: palette[i % palette.length],
    grabbed: false,
    delay: (i % 6) * 0.6,
  })),
)

let dragging: Sticker | null = null
let dragDX = 0
let dragDY = 0

function startDrag(s: Sticker, e: PointerEvent) {
  dragging = s
  s.grabbed = true
  s.rot = (Math.random() * 8 - 4)
  dragDX = e.clientX - (s.x / 100) * window.innerWidth
  dragDY = e.clientY - (s.y / 100) * window.innerHeight
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
}
function moveDrag(e: PointerEvent) {
  if (!dragging) return
  dragging.x = ((e.clientX - dragDX) / window.innerWidth) * 100
  dragging.y = ((e.clientY - dragDY) / window.innerHeight) * 100
}
function endDrag() {
  if (dragging) dragging.grabbed = false
  dragging = null
}

/* ---------- eyes that track the pointer ---------- */
const leftPupil = ref<HTMLElement | null>(null)
const rightPupil = ref<HTMLElement | null>(null)
function trackEyes(mx: number, my: number) {
  for (const el of [leftPupil.value, rightPupil.value]) {
    if (!el) continue
    const r = el.parentElement!.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const a = Math.atan2(my - cy, mx - cx)
    const dist = Math.min(r.width * 0.22, 14)
    el.style.transform = `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist}px))`
  }
}

/* ---------- runaway button ---------- */
const btn = ref<HTMLElement | null>(null)
const btnPos = reactive({ x: 50, y: 72 })
const btnLabel = ref("don't")
const DONT = ['don\'t', 'nope', 'catch me!', 'too slow', 'hehe', 'missed!', 'not today']
function flee() {
  btnPos.x = 12 + Math.random() * 76
  btnPos.y = 20 + Math.random() * 62
  btnLabel.value = DONT[Math.floor(Math.random() * DONT.length)]
  subtitle.value = SUBS[Math.floor(Math.random() * SUBS.length)]
}

/* ---------- chaos meter ---------- */
const chaos = ref(0)
const chaosPct = ref(0)
function bumpChaos(n = 1) {
  chaos.value += n
  chaosPct.value = Math.min(100, (chaos.value % 100))
}

/* ======================================================================
   canvas 1: bouncing buddies (background)
   canvas 2: fx — cursor comet trail + confetti (foreground)
   ====================================================================== */
const buddies = ref<HTMLCanvasElement | null>(null)
const fx = ref<HTMLCanvasElement | null>(null)
const cursor = ref<HTMLElement | null>(null)

let raf = 0
const mouse = { x: -999, y: -999 }

interface Buddy {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  face: string
  color: string
  spin: number
  angle: number
}
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  color: string
  rot: number
  vr: number
  emoji?: string
}

const buddyList: Buddy[] = []
const particles: Particle[] = []
const trail: { x: number; y: number; life: number }[] = []

const FACES = ['^‿^', 'o_o', '•ᴥ•', '>‿<', '⊙_⊙', 'ᵔᴥᵔ', '•_•', 'ʘ‿ʘ']
const CONFETTI_EMOJI = ['✦', '★', '❤', '✿', '●', '▲', '♦', '🎉', '🍬', '⚡']

function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function initBuddies(w: number, h: number) {
  buddyList.length = 0
  const count = Math.max(6, Math.min(14, Math.round((w * h) / 90000)))
  for (let i = 0; i < count; i++) {
    const r = rand(26, 54)
    buddyList.push({
      x: rand(r, w - r),
      y: rand(r, h - r),
      vx: rand(-1.6, 1.6) || 1,
      vy: rand(-1.6, 1.6) || 1,
      r,
      face: FACES[i % FACES.length],
      color: palette[i % palette.length],
      spin: rand(-0.02, 0.02),
      angle: rand(0, Math.PI * 2),
    })
  }
}

function spawnConfetti(x: number, y: number, n = 26) {
  for (let i = 0; i < n; i++) {
    const useEmoji = Math.random() < 0.45
    particles.push({
      x,
      y,
      vx: rand(-6, 6),
      vy: rand(-10, -2),
      life: 0,
      max: rand(50, 90),
      size: rand(8, 18),
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.3, 0.3),
      emoji: useEmoji ? CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)] : undefined,
    })
  }
  if (particles.length > 600) particles.splice(0, particles.length - 600)
}

function drawBuddy(ctx: CanvasRenderingContext2D, b: Buddy) {
  ctx.save()
  ctx.translate(b.x, b.y)
  ctx.rotate(Math.sin(b.angle) * 0.15)
  // body
  ctx.beginPath()
  ctx.arc(0, 0, b.r, 0, Math.PI * 2)
  ctx.fillStyle = b.color
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#171123'
  ctx.stroke()
  // cheeks
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.beginPath()
  ctx.arc(-b.r * 0.4, b.r * 0.2, b.r * 0.12, 0, Math.PI * 2)
  ctx.arc(b.r * 0.4, b.r * 0.2, b.r * 0.12, 0, Math.PI * 2)
  ctx.fill()
  // face text
  ctx.fillStyle = '#171123'
  ctx.font = `${Math.round(b.r * 0.7)}px 'Baloo 2', sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(b.face, 0, -b.r * 0.02)
  ctx.restore()
}

function loop() {
  const bc = buddies.value
  const fc = fx.value
  if (!bc || !fc) return
  const bctx = bc.getContext('2d')!
  const fctx = fc.getContext('2d')!
  const w = bc.width
  const h = bc.height

  // --- buddies ---
  bctx.clearRect(0, 0, w, h)
  for (const b of buddyList) {
    // gentle attraction/repulsion from the cursor
    const dx = b.x - mouse.x
    const dy = b.y - mouse.y
    const d2 = dx * dx + dy * dy
    if (d2 < 26000 && d2 > 1) {
      const f = 40 / d2
      b.vx += dx * f
      b.vy += dy * f
    }
    b.x += b.vx
    b.y += b.vy
    b.angle += b.spin + b.vx * 0.004
    // friction so cursor kicks settle
    b.vx *= 0.995
    b.vy *= 0.995
    // walls (bouncy)
    if (b.x < b.r) {
      b.x = b.r
      b.vx = Math.abs(b.vx)
    } else if (b.x > w - b.r) {
      b.x = w - b.r
      b.vx = -Math.abs(b.vx)
    }
    if (b.y < b.r) {
      b.y = b.r
      b.vy = Math.abs(b.vy)
    } else if (b.y > h - b.r) {
      b.y = h - b.r
      b.vy = -Math.abs(b.vy)
    }
    // keep a minimum drift so nobody falls asleep
    const sp = Math.hypot(b.vx, b.vy)
    if (sp < 0.6) {
      b.vx += rand(-0.5, 0.5)
      b.vy += rand(-0.5, 0.5)
    }
    drawBuddy(bctx, b)
  }

  // --- fx: trail + confetti ---
  fctx.clearRect(0, 0, w, h)
  // comet trail
  for (let i = trail.length - 1; i >= 0; i--) {
    const t = trail[i]
    t.life += 1
    const k = 1 - t.life / 22
    if (k <= 0) {
      trail.splice(i, 1)
      continue
    }
    fctx.globalAlpha = k
    fctx.fillStyle = palette[i % palette.length]
    fctx.beginPath()
    fctx.arc(t.x, t.y, 10 * k + 2, 0, Math.PI * 2)
    fctx.fill()
  }
  fctx.globalAlpha = 1
  // confetti
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.life += 1
    if (p.life > p.max) {
      particles.splice(i, 1)
      continue
    }
    p.vy += 0.28 // gravity
    p.vx *= 0.99
    p.x += p.vx
    p.y += p.vy
    p.rot += p.vr
    const k = 1 - p.life / p.max
    fctx.save()
    fctx.globalAlpha = k
    fctx.translate(p.x, p.y)
    fctx.rotate(p.rot)
    if (p.emoji) {
      fctx.font = `${p.size + 6}px 'Baloo 2', sans-serif`
      fctx.textAlign = 'center'
      fctx.textBaseline = 'middle'
      fctx.fillText(p.emoji, 0, 0)
    } else {
      fctx.fillStyle = p.color
      fctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
    }
    fctx.restore()
  }
  fctx.globalAlpha = 1

  raf = requestAnimationFrame(loop)
}

/* ---------- global pointer + resize wiring ---------- */
function onMove(e: PointerEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  trackEyes(e.clientX, e.clientY)
  if (cursor.value) cursor.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  trail.push({ x: e.clientX, y: e.clientY, life: 0 })
  if (trail.length > 24) trail.shift()
  moveDrag(e)
}

function onDown(e: PointerEvent) {
  // don't fire confetti when grabbing a sticker or poking the button
  const el = e.target as HTMLElement
  if (el.closest('.sticker') || el.closest('.runaway')) return
  spawnConfetti(e.clientX, e.clientY, 30)
  bumpChaos(3)
  cursor.value?.classList.add('poke')
  window.setTimeout(() => cursor.value?.classList.remove('poke'), 140)
}

function resize() {
  for (const c of [buddies.value, fx.value]) {
    if (!c) continue
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  initBuddies(window.innerWidth, window.innerHeight)
}

/* auto-confetti bursts once in a while, because chaos */
let autoTimer = 0

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', endDrag)
  raf = requestAnimationFrame(loop)
  autoTimer = window.setInterval(() => {
    spawnConfetti(rand(0, window.innerWidth), rand(-20, 60), 14)
  }, 3200)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.clearInterval(autoTimer)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', endDrag)
})
</script>

<template>
  <div class="stage"></div>

  <!-- background buddies -->
  <canvas ref="buddies" class="buddies"></canvas>

  <!-- floating doodles -->
  <svg class="doodle" style="top: 12%; left: 6%; width: 90px; animation-duration: 14s" viewBox="0 0 100 100">
    <path d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 74 L21 95 L32 61 L3 39 L39 39 Z" fill="var(--gold)" stroke="var(--ink)" stroke-width="5" stroke-linejoin="round" />
  </svg>
  <svg class="doodle" style="bottom: 16%; right: 8%; width: 80px; animation-duration: 9s; animation-direction: reverse" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="var(--mint)" stroke="var(--ink)" stroke-width="5" />
    <circle cx="50" cy="50" r="20" fill="var(--paper)" stroke="var(--ink)" stroke-width="5" />
  </svg>
  <svg class="doodle" style="top: 60%; left: 3%; width: 70px; animation-duration: 20s" viewBox="0 0 100 100">
    <rect x="18" y="18" width="64" height="64" rx="14" fill="var(--grape)" stroke="var(--ink)" stroke-width="5" transform="rotate(12 50 50)" />
  </svg>

  <!-- marquees -->
  <div class="marquee marquee--top"><span>{{ MARQUEE_TOP.repeat(4) }}</span></div>
  <div class="marquee marquee--bottom"><span>{{ MARQUEE_BOTTOM.repeat(4) }}</span></div>

  <!-- chaos meter -->
  <div class="meter">
    <small>chaos level</small>
    <b>{{ chaos }}</b>
    <div class="bar"><i :style="{ width: chaosPct + '%' }"></i></div>
  </div>

  <!-- hero -->
  <div class="hero">
    <div class="eyes">
      <div class="eye"><span ref="leftPupil" class="pupil"></span></div>
      <div class="eye"><span ref="rightPupil" class="pupil"></span></div>
    </div>
    <h1 class="title">
      <span v-for="(ch, i) in titleLetters" :key="i" :style="{ animationDelay: i * 0.12 + 's' }">{{ ch }}</span>
    </h1>
    <p class="subtitle">{{ subtitle }}</p>
  </div>

  <!-- draggable stickers -->
  <div
    v-for="(s, i) in stickers"
    :key="i"
    class="sticker"
    :class="{ grabbed: s.grabbed }"
    :style="{
      left: s.x + '%',
      top: s.y + '%',
      background: s.bg,
      transform: `rotate(${s.rot}deg)`,
      animationDelay: s.delay + 's',
    }"
    @pointerdown="startDrag(s, $event)"
  >
    {{ s.text }}
  </div>

  <!-- runaway button -->
  <button
    ref="btn"
    class="runaway"
    :style="{ left: btnPos.x + '%', top: btnPos.y + '%' }"
    @pointerenter="flee"
    @focus="flee"
    @click="flee"
  >
    {{ btnLabel }}
  </button>

  <div class="hint">psst — drag the stickers, tap anywhere, and try to press the button 😈</div>

  <!-- fx overlay -->
  <canvas ref="fx" class="fx"></canvas>

  <!-- custom cursor -->
  <div ref="cursor" class="cursor">✷</div>
</template>
