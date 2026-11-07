(function () {
  var hx = document.querySelector('[data-hx]');
  if (hx) {
    var imgs = hx.querySelectorAll('.hx-media img'), k = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (imgs.length > 1 && !reduce) setInterval(function () {
      imgs[k].classList.remove('is-active'); k = (k + 1) % imgs.length; imgs[k].classList.add('is-active');
    }, 6000);
  }
  var head = document.querySelector('.site-header');
  if (head && document.body.classList.contains('home')) {
    var upd = function () { head.classList.toggle('solid', window.scrollY > 40); };
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }
})();
document.querySelectorAll('[data-show]').forEach(function (show) {
  var slides = Array.prototype.slice.call(show.querySelectorAll('.slide'));
  var count = show.querySelector('.show-count');
  if (slides.length < 2) return;
  var i = 0, timer = null, paused = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(n) {
    slides[i].classList.remove('is-active'); slides[i].setAttribute('aria-hidden', 'true'); slides[i].tabIndex = -1;
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active'); slides[i].removeAttribute('aria-hidden'); slides[i].removeAttribute('tabindex');
    if (count) count.textContent = (i + 1) + ' / ' + slides.length;
  }
  function start() { if (!reduce && !timer) timer = setInterval(function () { if (!paused) go(i + 1); }, 5000); }
  function restart() { clearInterval(timer); timer = null; start(); }
  show.querySelector('.show-prev').addEventListener('click', function () { go(i - 1); restart(); });
  show.querySelector('.show-next').addEventListener('click', function () { go(i + 1); restart(); });
  show.addEventListener('mouseenter', function () { paused = true; });
  show.addEventListener('mouseleave', function () { paused = false; });
  show.addEventListener('focusin', function () { paused = true; });
  show.addEventListener('focusout', function () { paused = false; });
  show.classList.add('js');
  start();
});
(function () {
  var toc = document.querySelector('[data-toc]');
  if (!toc || !('IntersectionObserver' in window)) return;
  var links = {};
  toc.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var heads = Array.prototype.slice.call(document.querySelectorAll('.sheet h2[id]'));
  function mark(id) {
    Object.keys(links).forEach(function (k) { if (k === id) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current'); });
  }
  var io = new IntersectionObserver(function () {
    var cur = heads[0];
    heads.forEach(function (h) { if (h.getBoundingClientRect().top < 140) cur = h; });
    if (cur) mark(cur.id);
  }, { rootMargin: '0px 0px -60% 0px', threshold: [0, 1] });
  heads.forEach(function (h) { io.observe(h); });
  window.addEventListener('scroll', function () {
    var cur = heads[0];
    heads.forEach(function (h) { if (h.getBoundingClientRect().top < 140) cur = h; });
    if (cur) mark(cur.id);
  }, { passive: true });
  if (heads[0]) mark(heads[0].id);
})();
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var txt = btn.getAttribute('data-copy') || '';
    var done = function () { var p = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = p; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () {});
    }
  });
});
