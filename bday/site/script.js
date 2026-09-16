document.body.classList.add('locked');

document.getElementById('gateForm').addEventListener('submit', checkName);
document.getElementById('waxSeal').addEventListener('click', openEnvelope);
document.getElementById('playBtn').addEventListener('click', toggleMusic);
document.getElementById('miniPlayer').addEventListener('click', toggleMusic);
document.getElementById('cakeScene').addEventListener('click', blowCandles);

function checkName(event) {
  event.preventDefault();
  const input = document.getElementById('nameInput');
  const error = document.getElementById('gateError');
  const name = input.value.trim().toLowerCase();

  if (name === 'tatiana') {
    document.getElementById('screen-gate').classList.remove('active');
    document.body.classList.remove('locked');
    document.body.classList.add('unlocked');
    document.documentElement.scrollTop = 0;
  } else {
    error.hidden = false;
    input.classList.remove('shake');
    // restart the animation even on repeated wrong guesses
    void input.offsetWidth;
    input.classList.add('shake');
  }
}

function openEnvelope() {
  document.getElementById('envelope').classList.add('open');
  launchConfetti(24);
  startMusic();
  // No forced navigation from here — she can take her time with the
  // letter, then scroll freely (both ways) between it and everything else.
  document.getElementById('envelopeHint').hidden = true;
  document.getElementById('envelopeScrollCue').hidden = false;
}

// Fade sections in as they scroll into view.
const sections = document.querySelectorAll('.screen');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.35 });
sections.forEach((s) => observer.observe(s));

// Scroll progress rail.
function updateProgress() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });

let isPlaying = false;

function toggleMusic() {
  if (!isPlaying) {
    startMusic();
  } else {
    pauseMusic();
  }
}

function startMusic() {
  const audio = document.getElementById('bg-music');
  const record = document.getElementById('record');
  const tonearm = document.getElementById('tonearm');
  const playBtn = document.getElementById('playBtn');
  const mini = document.getElementById('miniPlayer');
  const miniIcon = document.getElementById('miniPlayerIcon');

  audio.play().catch(() => {});
  record.classList.add('spinning');
  tonearm.classList.add('on');
  playBtn.textContent = '❚❚ Pause';
  mini.hidden = false;
  mini.classList.add('spinning');
  mini.setAttribute('aria-label', 'Pause song');
  miniIcon.innerHTML = '&#10073;&#10073;';
  isPlaying = true;
}

function pauseMusic() {
  const audio = document.getElementById('bg-music');
  const record = document.getElementById('record');
  const tonearm = document.getElementById('tonearm');
  const playBtn = document.getElementById('playBtn');
  const mini = document.getElementById('miniPlayer');
  const miniIcon = document.getElementById('miniPlayerIcon');
  if (!audio) return;
  audio.pause();
  record.classList.remove('spinning');
  tonearm.classList.remove('on');
  playBtn.textContent = '▶ Play';
  mini.classList.remove('spinning');
  mini.setAttribute('aria-label', 'Play song');
  miniIcon.innerHTML = '&#9834;';
  isPlaying = false;
}

function blowCandles() {
  const candles = document.querySelectorAll('.candle');
  const hint = document.getElementById('wishHint');
  const allOut = Array.from(candles).every((c) => c.classList.contains('out'));

  if (allOut) {
    candles.forEach((c) => c.classList.remove('out'));
    hint.textContent = 'tap the cake to blow out the candles';
    return;
  }

  candles.forEach((c) => c.classList.add('out'));
  hint.textContent = 'wish made ✨ happy birthday!';
  launchConfetti(40);
}

const confettiColors = ['#ff6fae', '#c9a6ff', '#ffb4d8', '#fff6fb', '#6a2f8f'];

function launchConfetti(count) {
  const layer = document.getElementById('confetti-layer');
  if (!layer) return;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}
