/* Two Shores — Rajeev & Mana save the date */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };
  var body = document.body, root = document.documentElement;
  var audio = $('#music');
  var deskMQ = window.matchMedia('(min-width: 900px) and (min-height: 560px)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  var state = { lang: 'en', started: false, muted: false, vol: 0.7, prog: 0, cur: 0 };

  /* ---------- language ---------- */
  function initialLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'ja' || q === 'en') return q;
      var s = localStorage.getItem('twoshores-lang');
      if (s === 'ja' || s === 'en') return s;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';
  }
  function setLang(l) {
    state.lang = l;
    body.setAttribute('data-lang', l);
    root.lang = l;
    $$('[data-setlang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-setlang') === l)); });
    try { localStorage.setItem('twoshores-lang', l); } catch (e) {}
    buildCalendarLinks();
    relayout();
  }

  /* ---------- calendar ---------- */
  function buildCalendarLinks() {
    var ja = state.lang === 'ja', E = encodeURIComponent;
    var title = ja ? 'Rajeev & Mana · Save the Date' : 'Rajeev & Mana · Save the date';
    var det = ja ? '2027年4月11日（日）、フィリピン・ドゥマゲテにて。詳細は招待状でお知らせします。'
                 : 'Sunday, April 11, 2027 in Dumaguete, Philippines. More details will follow with the invitation.';
    var loc = 'Dumaguete, Philippines';
    var ol = function (host) {
      return 'https://' + host + '/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=' + E(title) +
        '&startdt=2027-04-11&enddt=2027-04-12&allday=true&body=' + E(det) + '&location=' + E(loc);
    };
    var urls = {
      google: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + E(title) + '&dates=20270411/20270412&details=' + E(det) + '&location=' + E(loc),
      outlook: ol('outlook.live.com'),
      o365: ol('outlook.office.com'),
      yahoo: 'https://calendar.yahoo.com/?v=60&title=' + E(title) + '&st=20270411&et=20270412&dur=allday&desc=' + E(det) + '&in_loc=' + E(loc),
      apple: 'assets/save-the-date-' + (ja ? 'ja' : 'en') + '.ics'
    };
    $$('[data-cal]').forEach(function (a) { a.href = urls[a.getAttribute('data-cal')]; });
  }

  /* ---------- iCloud / Apple Calendar (.ics) ---------- */
  var UA = navigator.userAgent || '';
  var isApple = /iPhone|iPad|iPod|Macintosh/.test(UA);
  var inAppBrowser = /FBAN|FBAV|FB_IAB|Instagram|Line\/|Messenger|MicroMessenger|KAKAOTALK|Twitter/i.test(UA);
  function icsFile() { return 'assets/save-the-date-' + (state.lang === 'ja' ? 'ja' : 'en') + '.ics'; }
  function downloadIcs(file) {
    if (!window.fetch || !window.URL || !URL.createObjectURL) { location.href = file; return; }
    fetch(file).then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); }).then(function (b) {
      var blob = new Blob([b], { type: 'text/calendar' });
      var u = URL.createObjectURL(blob), t = document.createElement('a');
      t.href = u; t.download = 'rajeev-and-mana-save-the-date.ics';
      document.body.appendChild(t); t.click();
      setTimeout(function () { URL.revokeObjectURL(u); t.remove(); }, 1500);
    }).catch(function () { location.href = file; });
  }
  $$('[data-cal="apple"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var file = icsFile(), abs = new URL(file, location.href).href;
      if (isApple && inAppBrowser) {
        // Messenger / LINE / Instagram etc. can't open .ics files; hand it to the iPhone's Calendar instead
        location.href = abs.replace(/^https?:/, 'webcal:');
      } else if (isApple) {
        // Safari opens the event straight in Apple Calendar (synced to iCloud)
        location.href = abs;
      } else {
        // Windows / Android: save the file; opening it adds the event to the default calendar
        downloadIcs(file);
      }
    });
  });

  /* ---------- copy details ---------- */
  function copyDetails(btn) {
    var ja = state.lang === 'ja';
    var text = ja ? '2027年4月11日（日）、フィリピン・ドゥマゲテ' : 'Sunday, April 11, 2027 · Dumaguete, Philippines';
    var done = function () {
      $$('[data-copy]').forEach(function (b) { b.setAttribute('data-copied', b === btn ? '1' : '0'); });
      $$('[data-copy-note]').forEach(function (n) { n.textContent = ja ? '✓' : 'Copied'; });
      clearTimeout(copyDetails.t);
      copyDetails.t = setTimeout(function () {
        $$('[data-copy]').forEach(function (b) { b.setAttribute('data-copied', '0'); });
        $$('[data-copy-note]').forEach(function (n) { n.textContent = ''; });
      }, 2400);
    };
    var fallback = function () {
      var ta = $('#copybuf'); ta.value = text; ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      done();
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, fallback); return; }
    } catch (e) {}
    fallback();
  }

  /* ---------- countdown (to April 11, 2027 00:00 UTC+8) ---------- */
  var TARGET = Date.UTC(2027, 3, 10, 16, 0, 0);
  function tickCountdown() {
    var ms = Math.max(0, TARGET - Date.now());
    var d = Math.floor(ms / 864e5); ms -= d * 864e5;
    var h = Math.floor(ms / 36e5); ms -= h * 36e5;
    var m = Math.floor(ms / 6e4); ms -= m * 6e4;
    var s = Math.floor(ms / 1000);
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    var v = { d: String(d), h: p(h), m: p(m), s: p(s) };
    $$('[data-cd]').forEach(function (el) { el.textContent = v[el.getAttribute('data-cd')]; });
  }

  /* ---------- music: three songs, always random, no immediate repeats ---------- */
  var TRACKS = ['assets/music.mp3', 'assets/bgm-summer.mp3', 'assets/bgm-one-summers-day.mp3'];
  var track = Math.floor(Math.random() * TRACKS.length);
  audio.loop = false;
  audio.src = TRACKS[track];
  audio.addEventListener('ended', function () {
    // pick a different song at random (never the same one twice in a row)
    track = (track + 1 + Math.floor(Math.random() * (TRACKS.length - 1))) % TRACKS.length;
    audio.src = TRACKS[track];
    if (!state.muted) playAudio();
  });
  var unlockEvents = ['pointerdown', 'touchend', 'keydown'];
  function unlock() {
    unlockEvents.forEach(function (t) { document.removeEventListener(t, unlock, true); });
    if (audio.paused) { state.cur = 0; playAudio(); }
  }
  function playAudio() {
    try { var p = audio.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }
  function startMusic() {
    try { audio.volume = 0; } catch (e) {}
    state.cur = 0; state.started = true;
    body.setAttribute('data-started', '1');
    var arm = function () { unlockEvents.forEach(function (t) { document.addEventListener(t, unlock, true); }); };
    try {
      var p = audio.play();
      if (p && p.then) p.then(function () {}, arm); else if (audio.paused) arm();
    } catch (e) { arm(); }
  }
  setInterval(function () {
    if (!state.started) return;
    var tgt = state.muted ? 0 : state.vol * (0.4 + 0.6 * state.prog);
    state.cur += (tgt - state.cur) * 0.05;
    if (Math.abs(tgt - state.cur) < 0.001) state.cur = tgt;
    try { audio.volume = Math.max(0, Math.min(1, state.cur)); audio.muted = state.muted; } catch (e) {}
  }, 60);
  function setMuted(m) {
    state.muted = m;
    body.setAttribute('data-muted', m ? '1' : '0');
    var b = $('#mute'); b.setAttribute('aria-pressed', String(m)); b.setAttribute('aria-label', m ? 'Unmute music' : 'Mute music');
    if (!m && audio.paused && state.started) playAudio();
  }

  /* ---------- shared visuals ---------- */
  var bg = $('#bg'), petals = $('#petals'), plane = $('#plane'), trail = $('#trail');
  function mix(x, S) {
    var a = S[S.length - 1], b = a;
    for (var i = 0; i < S.length - 1; i++) { if (x >= S[i][0] && x <= S[i + 1][0]) { a = S[i]; b = S[i + 1]; break; } }
    if (x < S[0][0]) { a = b = S[0]; }
    var t = b[0] === a[0] ? 0 : (x - a[0]) / (b[0] - a[0]);
    var k = t * t * (3 - 2 * t);
    return 'rgb(' + a[1].map(function (v, j) { return Math.round(v + (b[1][j] - v) * k); }).join(',') + ')';
  }
  var C = { gate: [232, 236, 229], jp: [226, 232, 224], cross: [229, 232, 222], prop: [237, 232, 220], neg: [243, 231, 210], end: [244, 229, 204] };
  function setProgress(p) {
    state.prog = p;
    plane.style.left = (p * 100).toFixed(3) + '%';
    trail.style.width = (p * 100).toFixed(3) + '%';
  }
  function applyWipes(scope, r, inset) {
    var wipes = $$('.wl', scope), edges = $$('.edge', scope), ticks = $$('.tick', scope);
    wipes.forEach(function (w, i) {
      var v = r[i], cp = 'inset(0 ' + ((1 - v) * 100).toFixed(2) + '% 0 0)';
      w.style.clipPath = cp; w.style.webkitClipPath = cp;
      var im = w.firstElementChild; if (im) im.style.transform = 'scale(' + (1.08 - 0.08 * v).toFixed(4) + ')';
    });
    edges.forEach(function (e, i) {
      var v = r[i];
      e.style.left = 'calc(' + inset + 'px + ' + (v * 100).toFixed(2) + '% - ' + (v * inset * 2).toFixed(1) + 'px)';
      e.style.opacity = (v > 0.005 && v < 0.995) ? '1' : '0';
    });
    ticks.forEach(function (t, i) { t.setAttribute('data-on', r[i] > 0.5 ? '1' : '0'); });
    scope.setAttribute('data-yes', r[2] > 0.55 ? '1' : '0');
  }
  function hydrate(scope) {
    $$('img[data-src]', scope).forEach(function (img) { if (!img.getAttribute('src')) img.src = img.getAttribute('data-src'); });
  }

  /* ---------- DESKTOP: sideways journey ---------- */
  var D = {
    spacer: $('#deskSpacer'), stage: $('#stage'), track: $('#track'), prop: $('#dProp'),
    X3: 6340, X4: 7780, PIN: 2900, MAXTX: 11460, TOT: 14360,
    J: [0, 1440, 3740, 6340, 10680, 12920, 14360],
    s: 1, rvs: [], ready: false
  };
  function deskLayout() {
    var W = window.innerWidth, H = window.innerHeight;
    D.s = Math.min(W / 1440, H / 900);
    D.stage.style.setProperty('--s', D.s.toFixed(4));
    D.spacer.style.height = Math.round(D.TOT * D.s + H) + 'px';
    if (!D.ready) {
      hydrate($('#desk'));
      D.rvs = $$('[data-rv]', D.track).map(function (el) {
        var x = 0, n = el;
        while (n && n !== D.track) { x += n.offsetLeft; n = n.offsetParent; }
        return { el: el, x: x, done: false };
      });
      $$('#dots .dot').forEach(function (b, i) { b.style.left = (D.J[i] / D.TOT * 100).toFixed(2) + '%'; });
      D.ready = true;
    }
  }
  function deskUpdate() {
    var s = Math.max(0, (window.scrollY - D.spacer.offsetTop) / D.s);
    var tx = s < D.X3 ? s : (s < D.X3 + D.PIN ? D.X3 : Math.min(s - D.PIN, D.MAXTX));
    D.track.style.transform = 'translate3d(' + (-tx).toFixed(1) + 'px,0,0)';
    setProgress(clamp(s / D.TOT));
    bg.style.backgroundColor = mix(tx, [[0, C.gate], [1440, C.jp], [3740, C.cross], [6340, C.prop], [7780, C.neg], [11460, C.end]]);
    petals.style.setProperty('--neg', clamp((tx - (D.X4 - 1500)) / 1200).toFixed(3));
    var cz = $('.cz', D.track); if (cz) cz.style.setProperty('--open', clamp((tx - (D.X4 - 1100)) / 1300).toFixed(3));
    applyWipes(D.prop, [clamp((tx - (D.X3 - 1200)) / 1000), clamp((s - D.X3 - 120) / 760), clamp((s - D.X3 - 1000) / 760), clamp((s - D.X3 - 1880) / 760)], 10);
    var right = 720 + (window.innerWidth / 2) / D.s;
    D.rvs.forEach(function (o) { if (!o.done && o.x - tx < right - 60) { o.el.setAttribute('data-in', '1'); o.done = true; } });
  }
  function deskGo(i) { window.scrollTo({ top: D.spacer.offsetTop + D.J[i] * D.s, behavior: 'smooth' }); }

  /* ---------- PHONE / NARROW: vertical story ---------- */
  var M = { secs: $$('[data-msec]'), prop: $('#mProp'), rvs: [], drifts: [], ready: false };
  function mobLayout() {
    if (!M.ready) {
      hydrate($('#mob'));
      M.rvs = $$('[data-rv]', $('#mob')).map(function (el) { return { el: el, done: false }; });
      M.drifts = $$('[data-drift]', $('#mob')).map(function (el) { return { el: el, inner: $('.dr', el) }; });
      M.ready = true;
    }
  }
  function topOf(el) { return el.getBoundingClientRect().top + window.scrollY; }
  function mobUpdate() {
    var s = window.scrollY, H = window.innerHeight;
    var tops = M.secs.map(topOf);
    var T3 = tops[3], T4 = tops[4];
    var end = Math.max(1, document.documentElement.scrollHeight - H);
    setProgress(clamp(s / end));
    bg.style.backgroundColor = mix(s, [[0, C.gate], [tops[1], C.jp], [tops[2], C.cross], [T3, C.prop], [T4, C.neg], [end, C.end]]);
    petals.style.setProperty('--neg', clamp((s - (T4 - 900)) / 700).toFixed(3));
    var cz = $('.cz', $('#mob')); if (cz) cz.style.setProperty('--open', clamp((s - (T4 - 520)) / 620).toFixed(3));
    var L = Math.max(1, M.prop.offsetHeight - H), q = s - T3, k = L / 2600;
    applyWipes(M.prop, [clamp((s - (T3 - 650)) / 550), clamp((q - 100 * k) / (650 * k)), clamp((q - 850 * k) / (650 * k)), clamp((q - 1600 * k) / (650 * k))], 8);
    M.rvs.forEach(function (o) { if (!o.done && o.el.getBoundingClientRect().top < H - 40) { o.el.setAttribute('data-in', '1'); o.done = true; } });
    M.drifts.forEach(function (d) {
      if (!d.inner) return;
      var b = d.el.getBoundingClientRect();
      var off = Math.max(-40, Math.min(40, (b.top + b.height / 2 - H / 2) * -0.06));
      d.inner.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });
  }
  function mobGo(i) { var sec = M.secs[i]; if (sec) window.scrollTo({ top: topOf(sec), behavior: 'smooth' }); }

  /* ---------- loop ---------- */
  var raf = 0;
  function isDesk() { return deskMQ.matches; }
  function update() { raf = 0; if (isDesk()) deskUpdate(); else mobUpdate(); }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  function relayout() { if (isDesk()) deskLayout(); else mobLayout(); schedule(); }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', relayout);
  if (deskMQ.addEventListener) deskMQ.addEventListener('change', relayout); else deskMQ.addListener(relayout);

  // sideways trackpad swipes move the story on desktop
  window.addEventListener('wheel', function (e) {
    if (isDesk() && Math.abs(e.deltaX) > Math.abs(e.deltaY)) window.scrollBy(0, e.deltaX);
  }, { passive: true });

  // photos react gently to the cursor
  window.addEventListener('mousemove', function (e) {
    if (!isDesk() || !finePointer.matches) return;
    root.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
    root.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
  });

  /* ---------- controls ---------- */
  $$('[data-choose]').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.getAttribute('data-choose'));
      if (!state.started) startMusic(); else if (audio.paused && !state.muted) playAudio();
      setTimeout(function () { if (isDesk()) deskGo(1); else mobGo(1); }, 450);
    });
  });
  $$('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-setlang')); if (!state.started) startMusic(); });
  });
  // music also begins once the guest starts scrolling (browsers that block this start it on the next tap or click)
  window.addEventListener('scroll', function onFirstScroll() {
    if (window.scrollY < 40) return;
    window.removeEventListener('scroll', onFirstScroll);
    if (!state.started) startMusic();
  }, { passive: true });
  $('#mute').addEventListener('click', function () { setMuted(!state.muted); });
  $('#vol').addEventListener('input', function (e) {
    var v = Number(e.target.value);
    state.vol = v / 100;
    setMuted(v === 0);
  });
  $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { copyDetails(b); }); });
  $$('[data-jump]').forEach(function (b) { b.addEventListener('click', function () { deskGo(Number(b.getAttribute('data-jump'))); }); });

  /* ---------- boot ---------- */
  setLang(initialLang());
  setMuted(false);
  tickCountdown();
  setInterval(tickCountdown, 1000);
  relayout();
  window.addEventListener('load', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
})();
