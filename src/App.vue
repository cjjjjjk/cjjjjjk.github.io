<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'

/* ======================================================================
   ✦ cjjjjjk's chaos zone ✦
   one file. no structure. only vibes, weather, and googly eyes.
   ====================================================================== */

const TAU = Math.PI * 2
const TITLE = 'cjjjjjk'
const titleLetters = TITLE.split('')

const SUBS = [
  'certified web goblin',
  'professional button avoider',
  'this site has no point (on purpose)',
  'drag stuff. click stuff. break nothing.',
  '100% organic pixels',
  'warning: googly eyes ahead',
  'now with weather!',
]
const subtitle = ref(SUBS[0])

const MARQUEE_TOP =
  '✦ welcome to the chaos ✦ everything wiggles ✦ nothing is aligned ✦ ' +
  'drag the stickers ✦ chase the button ✦ remix the whole vibe ✦ '
const MARQUEE_BOTTOM =
  '★ made with too much coffee ★ no framework was harmed ★ ' +
  'click anywhere for confetti ★ summon a storm ★ vibes only ★ '

const palette = ['#ff5ea3', '#b8ff4f', '#4fd2ff', '#ffd23f', '#9b5de5', '#ff6b3d', '#3ddc97']
function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
function randColor() {
  return `hsl(${Math.floor(rand(0, 360))} ${Math.floor(rand(62, 92))}% ${Math.floor(rand(52, 70))}%)`
}

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
  s.rot = rand(-4, 4)
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

/* ---------- eyes in the hero that track the pointer ---------- */
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

/* ---------- runaway button (dodges you) ---------- */
const btnPos = reactive({ x: 50, y: 74 })
const btnLabel = ref("don't")
const DONT = ["don't", 'nope', 'catch me!', 'too slow', 'hehe', 'missed!', 'not today']
function flee() {
  btnPos.x = 12 + Math.random() * 76
  btnPos.y = 20 + Math.random() * 60
  btnLabel.value = pick(DONT)
  subtitle.value = pick(SUBS)
}

/* ---------- chaos meter ---------- */
const chaos = ref(0)
const chaosPct = ref(0)
function bumpChaos(n = 1) {
  chaos.value += n
  chaosPct.value = Math.min(100, chaos.value % 100)
}

/* ======================================================================
   STYLE REMIX — the wandering button that reskins EVERYTHING
   ====================================================================== */
const FILTERS = [
  '', // back to normal
  'grayscale(1) contrast(1.15)', // black & white
  'grayscale(1) invert(1) contrast(1.1)', // inverted b/w
  'sepia(0.85) contrast(1.05) saturate(1.4) brightness(1.05)', // vintage
  'saturate(2.6) contrast(1.35) hue-rotate(18deg)', // pop art
  'invert(1) hue-rotate(180deg)', // photo negative
  'hue-rotate(120deg) saturate(1.6)', // alien
  'contrast(2.4) saturate(0) brightness(1.05)', // harsh ink comic
  'grayscale(1) contrast(3.5) brightness(1.1)', // pencil sketch
  'blur(0.5px) brightness(1.12) saturate(1.7) hue-rotate(300deg)', // dream
]
let appEl: HTMLElement | null = null
const wanderPos = reactive({ x: 28, y: 42 })
const remixLabel = ref('🎨 remix everything')
const REMIX_WORDS = ['🎨 remix!', '🌀 reskin!', '✨ new vibe', '🔮 randomize', '🖼️ restyle', '💥 chaos!']

function remixStyle() {
  if (appEl) appEl.style.filter = pick(FILTERS)
  // new base paper color
  document.documentElement.style.setProperty(
    '--paper',
    `hsl(${Math.floor(rand(0, 360))} ${Math.floor(rand(30, 70))}% ${Math.floor(rand(86, 96))}%)`,
  )
  // re-roll every buddy + sticker color
  for (const b of buddyList) b.color = randColor()
  for (const s of stickers) s.bg = randColor()
  remixLabel.value = pick(REMIX_WORDS)
  wander()
  spawnConfetti((wanderPos.x / 100) * window.innerWidth, (wanderPos.y / 100) * window.innerHeight, 40)
  bumpChaos(6)
}
function wander() {
  wanderPos.x = 10 + Math.random() * 78
  wanderPos.y = 22 + Math.random() * 58
}

/* ======================================================================
   WEATHER — rain / storm / wind / tornado / snow, solo or combined
   ====================================================================== */
interface WeatherPreset {
  label: string
  rain: number // 0 none, 1 light, 2 heavy
  snow: boolean
  wind: number
  storm: boolean
  tornado: boolean
}
const WEATHER: WeatherPreset[] = [
  { label: '☀️ clear skies', rain: 0, snow: false, wind: 0, storm: false, tornado: false },
  { label: '🌧️ rain', rain: 1, snow: false, wind: 0.6, storm: false, tornado: false },
  { label: '⛈️ thunderstorm', rain: 2, snow: false, wind: 2.4, storm: true, tornado: false },
  { label: '🌬️ big wind', rain: 0, snow: false, wind: 3.2, storm: false, tornado: false },
  { label: '🌪️ tornado', rain: 1, snow: false, wind: 3.4, storm: false, tornado: true },
  { label: '❄️ snowfall', rain: 0, snow: true, wind: 0.4, storm: false, tornado: false },
  { label: '🌨️ blizzard', rain: 0, snow: true, wind: 3.4, storm: false, tornado: false },
  { label: '🌪️⛈️ APOCALYPSE', rain: 2, snow: false, wind: 3.8, storm: true, tornado: true },
]
const weather = reactive<WeatherPreset>({ ...WEATHER[0] })
let weatherIdx = 0

interface Drop {
  x: number
  y: number
  len: number
  vy: number
}
interface Flake {
  x: number
  y: number
  r: number
  vy: number
  phase: number
}
interface Leaf {
  ang: number
  rad: number
  spin: number
  size: number
  char: string
}
const raindrops: Drop[] = []
const snowflakes: Flake[] = []
const leaves: Leaf[] = []
const LEAF_CHARS = ['🍂', '🍁', '🌀', '✦', '🗞️', '🍃']

function makeDrop(): Drop {
  return { x: rand(-60, window.innerWidth + 60), y: rand(-window.innerHeight, 0), len: rand(10, 22), vy: rand(9, 16) }
}
function makeFlake(): Flake {
  return { x: rand(0, window.innerWidth), y: rand(-window.innerHeight, 0), r: rand(1.5, 4.2), vy: rand(1, 2.8), phase: rand(0, TAU) }
}
function makeLeaf(): Leaf {
  return { ang: rand(0, TAU), rad: rand(24, 170), spin: rand(0.03, 0.07), size: rand(14, 28), char: pick(LEAF_CHARS) }
}
function ensureCount<T>(arr: T[], target: number, make: () => T) {
  while (arr.length < target) arr.push(make())
  if (arr.length > target) arr.length = target
}
function applyWeather(idx: number) {
  const p = WEATHER[idx]
  weatherIdx = idx
  Object.assign(weather, p)
  weather.wind = p.wind * (Math.random() < 0.5 ? -1 : 1)
  ensureCount(raindrops, p.rain * 150, makeDrop)
  ensureCount(snowflakes, p.snow ? 170 : 0, makeFlake)
  ensureCount(leaves, p.tornado ? 30 : 0, makeLeaf)
}
function nextWeather() {
  let i = weatherIdx
  while (i === weatherIdx) i = Math.floor(Math.random() * WEATHER.length)
  applyWeather(i)
  bumpChaos(4)
}

/* ======================================================================
   canvas 1: buddies (bg)   canvas 2: fx (cursor trail, confetti, weather)
   ====================================================================== */
const buddiesCv = ref<HTMLCanvasElement | null>(null)
const fx = ref<HTMLCanvasElement | null>(null)
const cursor = ref<HTMLElement | null>(null)

let raf = 0
let tick = 0
let tornadoX = 0.5
let flash = 0
let bolt: number[] = []
const mouse = { x: -9999, y: -9999 }

interface Buddy {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
  factors: number[]
  phase: number
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
const trail: { x: number; y: number }[] = []
const CONFETTI_EMOJI = ['✦', '★', '❤', '✿', '●', '▲', '♦', '🎉', '🍬', '⚡']

function initBuddies(w: number, h: number) {
  buddyList.length = 0
  const count = Math.max(6, Math.min(14, Math.round((w * h) / 90000)))
  for (let i = 0; i < count; i++) {
    const r = rand(28, 56)
    const factors: number[] = []
    for (let k = 0; k < 10; k++) factors.push(rand(0.8, 1.14)) // lumpy, not round
    buddyList.push({
      x: rand(r, w - r),
      y: rand(r, h - r),
      vx: rand(-1.6, 1.6) || 1,
      vy: rand(-1.6, 1.6) || 1,
      r,
      color: palette[i % palette.length],
      factors,
      phase: rand(0, TAU),
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
      color: pick(palette),
      rot: rand(0, TAU),
      vr: rand(-0.3, 0.3),
      emoji: useEmoji ? pick(CONFETTI_EMOJI) : undefined,
    })
  }
  if (particles.length > 700) particles.splice(0, particles.length - 700)
}

function drawBuddy(ctx: CanvasRenderingContext2D, b: Buddy) {
  ctx.save()
  ctx.translate(b.x, b.y)

  // lumpy body via a smooth closed curve through wobbling points
  const n = b.factors.length
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * TAU
    const rr = b.r * (b.factors[i] + 0.05 * Math.sin(tick * 0.05 + b.phase + i))
    pts.push([Math.cos(ang) * rr, Math.sin(ang) * rr])
  }
  ctx.beginPath()
  ctx.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2)
  for (let i = 0; i < n; i++) {
    const cur = pts[i]
    const nxt = pts[(i + 1) % n]
    ctx.quadraticCurveTo(cur[0], cur[1], (cur[0] + nxt[0]) / 2, (cur[1] + nxt[1]) / 2)
  }
  ctx.closePath()
  ctx.fillStyle = b.color
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#171123'
  ctx.stroke()

  // googly eyes — WHITE fill + black pupil that looks at the cursor
  const er = b.r * 0.3
  const ey = -b.r * 0.12
  for (const ex of [-b.r * 0.34, b.r * 0.34]) {
    ctx.beginPath()
    ctx.ellipse(ex, ey, er * 0.9, er, 0, 0, TAU)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.lineWidth = 3.5
    ctx.strokeStyle = '#171123'
    ctx.stroke()
    const gx = b.x + ex
    const gy = b.y + ey
    const a = Math.atan2(mouse.y - gy, mouse.x - gx)
    const md = Math.min(er * 0.42, 6)
    const px = ex + Math.cos(a) * md
    const py = ey + Math.sin(a) * md
    ctx.beginPath()
    ctx.arc(px, py, er * 0.44, 0, TAU)
    ctx.fillStyle = '#171123'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(px - er * 0.15, py - er * 0.15, er * 0.12, 0, TAU)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }

  // little smile
  ctx.beginPath()
  ctx.lineWidth = 3.5
  ctx.strokeStyle = '#171123'
  ctx.lineCap = 'round'
  ctx.arc(0, b.r * 0.16, b.r * 0.28, 0.15 * Math.PI, 0.85 * Math.PI)
  ctx.stroke()

  ctx.restore()
}

function makeBolt(w: number, h: number): number[] {
  const out: number[] = []
  let x = rand(w * 0.2, w * 0.8)
  let y = 0
  const end = rand(h * 0.5, h * 0.92)
  out.push(x, y)
  while (y < end) {
    y += rand(24, 60)
    x += rand(-42, 42)
    out.push(x, y)
  }
  return out
}

function loop() {
  const bc = buddiesCv.value
  const fc = fx.value
  if (!bc || !fc) return
  const bctx = bc.getContext('2d')!
  const fctx = fc.getContext('2d')!
  const w = bc.width
  const h = bc.height
  tick++

  const windNow = weather.wind * (1 + 0.25 * Math.sin(tick * 0.03))

  /* ---- buddies ---- */
  bctx.clearRect(0, 0, w, h)
  for (const b of buddyList) {
    const dx = b.x - mouse.x
    const dy = b.y - mouse.y
    const d2 = dx * dx + dy * dy
    if (d2 < 26000 && d2 > 1) {
      const f = 40 / d2
      b.vx += dx * f
      b.vy += dy * f
    }
    b.vx += windNow * 0.02
    b.x += b.vx
    b.y += b.vy
    b.vx *= 0.995
    b.vy *= 0.995
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
    if (Math.hypot(b.vx, b.vy) < 0.6) {
      b.vx += rand(-0.5, 0.5)
      b.vy += rand(-0.5, 0.5)
    }
    drawBuddy(bctx, b)
  }

  /* ---- fx layer ---- */
  fctx.clearRect(0, 0, w, h)

  // storm darkens the world
  if (weather.storm) {
    fctx.fillStyle = 'rgba(14,10,32,0.34)'
    fctx.fillRect(0, 0, w, h)
  }

  // rain
  if (weather.rain > 0) {
    fctx.strokeStyle = 'rgba(178,205,255,0.55)'
    fctx.lineWidth = 2
    fctx.beginPath()
    for (const d of raindrops) {
      d.y += d.vy
      d.x += windNow * 0.7
      if (d.y > h) {
        d.y = -d.len
        d.x = rand(-60, w + 60)
      }
      if (d.x < -80) d.x = w + 60
      else if (d.x > w + 80) d.x = -60
      fctx.moveTo(d.x, d.y)
      fctx.lineTo(d.x - windNow * 2.4, d.y - d.len)
    }
    fctx.stroke()
  }

  // snow
  if (weather.snow) {
    fctx.fillStyle = 'rgba(255,255,255,0.92)'
    for (const s of snowflakes) {
      s.phase += 0.03
      s.y += s.vy
      s.x += windNow * 0.45 + Math.sin(s.phase) * 0.6
      if (s.y > h) {
        s.y = -6
        s.x = rand(0, w)
      }
      if (s.x < -10) s.x = w + 6
      else if (s.x > w + 10) s.x = -6
      fctx.beginPath()
      fctx.arc(s.x, s.y, s.r, 0, TAU)
      fctx.fill()
    }
  }

  // tornado swirl
  if (weather.tornado) {
    tornadoX += weather.wind * 0.0013
    if (tornadoX > 1.12) tornadoX = -0.12
    else if (tornadoX < -0.12) tornadoX = 1.12
    const cx = tornadoX * w
    const cy = h * 0.52
    for (const lf of leaves) {
      lf.ang += lf.spin
      const x = cx + Math.cos(lf.ang) * lf.rad
      const y = cy + Math.sin(lf.ang) * lf.rad * 0.42
      fctx.save()
      fctx.translate(x, y)
      fctx.rotate(lf.ang * 2)
      fctx.font = `${lf.size}px 'Baloo 2', sans-serif`
      fctx.textAlign = 'center'
      fctx.textBaseline = 'middle'
      fctx.fillText(lf.char, 0, 0)
      fctx.restore()
    }
  }

  // cursor comet trail
  for (let i = 0; i < trail.length; i++) {
    const t = trail[i]
    const k = i / trail.length
    fctx.globalAlpha = k * 0.8
    fctx.fillStyle = palette[i % palette.length]
    fctx.beginPath()
    fctx.arc(t.x, t.y, 10 * k + 2, 0, TAU)
    fctx.fill()
  }
  fctx.globalAlpha = 1

  // confetti
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.life++
    if (p.life > p.max) {
      particles.splice(i, 1)
      continue
    }
    p.vy += 0.28
    p.vx *= 0.99
    p.x += p.vx + windNow * 0.3
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

  // lightning (topmost)
  if (weather.storm) {
    if (Math.random() < 0.012) {
      flash = 1
      bolt = makeBolt(w, h)
    }
    if (flash > 0.04) {
      fctx.fillStyle = `rgba(255,255,255,${flash * 0.55})`
      fctx.fillRect(0, 0, w, h)
      if (flash > 0.35 && bolt.length) {
        fctx.strokeStyle = '#ffffff'
        fctx.lineWidth = 3
        fctx.lineJoin = 'round'
        fctx.beginPath()
        fctx.moveTo(bolt[0], bolt[1])
        for (let i = 2; i < bolt.length; i += 2) fctx.lineTo(bolt[i], bolt[i + 1])
        fctx.stroke()
      }
      flash *= 0.86
    }
  }

  raf = requestAnimationFrame(loop)
}

/* ---------- global wiring ---------- */
function onMove(e: PointerEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  trackEyes(e.clientX, e.clientY)
  if (cursor.value) cursor.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  trail.push({ x: e.clientX, y: e.clientY })
  if (trail.length > 22) trail.shift()
  moveDrag(e)
}
function onDown(e: PointerEvent) {
  const el = e.target as HTMLElement
  if (el.closest('.sticker, .runaway, .wander, .wbtn')) return
  spawnConfetti(e.clientX, e.clientY, 30)
  bumpChaos(3)
  cursor.value?.classList.add('poke')
  window.setTimeout(() => cursor.value?.classList.remove('poke'), 140)
}
function resize() {
  for (const c of [buddiesCv.value, fx.value]) {
    if (!c) continue
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  initBuddies(window.innerWidth, window.innerHeight)
}

let autoConfetti = 0
let autoWeather = 0
let wanderTimer = 0

onMounted(() => {
  appEl = document.getElementById('app')
  if (appEl) appEl.style.transition = 'filter 0.5s ease'
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', endDrag)
  raf = requestAnimationFrame(loop)
  autoConfetti = window.setInterval(() => spawnConfetti(rand(0, window.innerWidth), rand(-20, 60), 12), 3400)
  // weather occasionally rolls itself, because chaos
  autoWeather = window.setInterval(() => {
    if (Math.random() < 0.4) nextWeather()
  }, 11000)
  wanderTimer = window.setInterval(wander, 1500)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.clearInterval(autoConfetti)
  window.clearInterval(autoWeather)
  window.clearInterval(wanderTimer)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', endDrag)
})
</script>

<template>
  <div class="stage"></div>

  <!-- background buddies -->
  <canvas ref="buddiesCv" class="buddies"></canvas>

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

  <!-- HUD: chaos meter + weather button -->
  <div class="meter">
    <small>chaos level</small>
    <b>{{ chaos }}</b>
    <div class="bar"><i :style="{ width: chaosPct + '%' }"></i></div>
  </div>
  <div class="controls">
    <button class="wbtn" @click="nextWeather">{{ weather.label }}</button>
    <small class="controls__hint">↑ tap to change weather</small>
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
    :style="{ left: s.x + '%', top: s.y + '%', background: s.bg, transform: `rotate(${s.rot}deg)`, animationDelay: s.delay + 's' }"
    @pointerdown="startDrag(s, $event)"
  >
    {{ s.text }}
  </div>

  <!-- runaway button (dodges) -->
  <button class="runaway" :style="{ left: btnPos.x + '%', top: btnPos.y + '%' }" @pointerenter="flee" @focus="flee" @click="flee">
    {{ btnLabel }}
  </button>

  <!-- wandering remix button (catchable, reskins everything) -->
  <button class="wander" :style="{ left: wanderPos.x + '%', top: wanderPos.y + '%' }" @click="remixStyle">
    {{ remixLabel }}
  </button>

  <div class="hint">psst — drag stickers · tap anywhere · catch the 🎨 remix · dodge the 🏃 button</div>

  <!-- fx overlay -->
  <canvas ref="fx" class="fx"></canvas>

  <!-- custom cursor -->
  <div ref="cursor" class="cursor"><i>✷</i></div>
</template>
