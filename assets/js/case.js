(function(){
  var doc = document.documentElement;
  var lang = 'es';
  try { var s = localStorage.getItem('lang'); if (s === 'en' || s === 'es') lang = s; else if ((navigator.language||'').slice(0,2) !== 'es') lang = 'en'; } catch(e){}
  var label = document.getElementById('lang-label');
  function apply(l){
    lang = l; doc.lang = l;
    if (label) label.textContent = l === 'es' ? 'EN' : 'ES';
    var t = doc.getAttribute('data-title-' + l); if (t) document.title = t;
    try { localStorage.setItem('lang', l); } catch(e){}
  }
  var btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', function(){ apply(lang === 'es' ? 'en' : 'es'); });
  apply(lang);

  // Botones de prototipo: se ocultan si no tienen link
  document.querySelectorAll('[data-proto]').forEach(function(a){
    var u = a.getAttribute('href');
    if (!u || u === '#') a.style.display = 'none';
  });
  document.querySelectorAll('.btn-row').forEach(function(r){
    var vis = Array.prototype.some.call(r.children, function(c){ return c.style.display !== 'none'; });
    if (!vis) r.style.display = 'none';
  });

  // Índice: resalta la sección visible
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a, .toc-mobile a'));
  var ids = []; links.forEach(function(a){ var id = a.getAttribute('href').slice(1); if (ids.indexOf(id) < 0) ids.push(id); });
  var secs = ids.map(function(id){ return document.getElementById(id); }).filter(Boolean);
  var mob = document.querySelector('.toc-mobile');
  function setActive(id){
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    if (mob) { var m = mob.querySelector('a.active'); if (m) mob.scrollTo({left: m.offsetLeft - 24, behavior: 'smooth'}); }
  }
  var current = null;
  function onScroll(){
    var y = window.innerHeight * 0.3, pick = secs[0];
    secs.forEach(function(s){ if (s.getBoundingClientRect().top <= y) pick = s; });
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4) pick = secs[secs.length-1];
    if (pick && pick.id !== current) { current = pick.id; setActive(current); }
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
})();

// Ampliar imágenes con un clic
(function(){
  var sel = '.full-img, .mc-media img, .split img.r8, .c-cover img';
  var box = document.createElement('div');
  box.className = 'lightbox'; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true');
  box.innerHTML = '<img alt=""><button type="button" aria-label="Cerrar">×</button>';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  function close(){ box.classList.remove('open'); document.body.style.overflow=''; }
  box.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  document.querySelectorAll(sel).forEach(function(im){
    im.classList.add('zoomable'); im.tabIndex = 0;
    function open(){ big.src = im.currentSrc || im.src; big.alt = im.alt; box.classList.add('open'); document.body.style.overflow='hidden'; }
    im.addEventListener('click', open);
    im.addEventListener('keydown', function(e){ if(e.key==='Enter') open(); });
  });
})();
