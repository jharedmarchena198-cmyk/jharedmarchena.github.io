/* ===== DATOS DE CONTACTO ===== */
var CONFIG = {
  email: 'jharedmatias198@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jhared-marchena-412198255/',
  cv: 'assets/CV_JharedMarchena.pdf'              // <- sube tu CV (PDF) a esa ruta
};

var I18N = {
  es: {
    'nav.projects':'Proyectos','nav.about':'Sobre mí','nav.lab':'Laboratorio','nav.contact':'Contacto',
    'hero.title':'Mitad <em>diseñador,</em><br>mitad <em>explorador.</em>',
    'hero.sub':'Product Designer especializado en sistemas complejos, que integra IA en su proceso para mejorar resultados.',
    'hero.cta1':'Ver proyectos','hero.cta2':'Contáctame',
    'projects.title':'Proyectos','cta.case':'Ver caso',
    'p1.cat':'SaaS B2B · Inventario','p1.title':'Rediseño del inventario de Bizner para ferreterías',
    'p2.cat':'Sistemas complejos · Blockchain','p2.title':'Diseño del Gestor Perhusa: trazabilidad del café',
    'p3.cat':'Edtech · Research y test A/B','p3.title':'Mejora del drag and drop en una plataforma educativa',
    'about.title':'Hola, soy <em>Jhared</em>',
    'about.p1':'Hola, soy Jhared. Diseñador peruano y curioso por naturaleza, enfocado en transformar sistemas complejos en productos claros y funcionales.',
    'about.p2':'Exploro cómo la inteligencia artificial puede potenciar el proceso de diseño, ayudando a explorar ideas y crear prototipos en etapas tempranas.',
    'cv':'Currículum',
    'lab.title':'Laboratorio','lab.sub':'Experimentos, ideas locas y pequeños proyectos que no encajan en ningún otro lugar.','lab.soon':'Próximamente...','lab.c1.pill':'Agentes','lab.c1.title':'Agente conversacional de feedback en la etapa de ideación','lab.flask':'Frasco: toca para ver qué pasa',
    'contact.title':'¿Tienes una idea o proyecto en mente? Conversemos.',
    'contact.copy':'Copiar correo electrónico','contact.copied':'¡Correo copiado!','contact.linkedin':'Envíame un mensaje directo a LinkedIn'
  },
  en: {
    'nav.projects':'Projects','nav.about':'About','nav.lab':'Lab','nav.contact':'Contact',
    'hero.title':'Half <em>designer,</em><br>half <em>explorer.</em>',
    'hero.sub':'Product Designer specialized in complex systems, who brings AI into the process to improve results.',
    'hero.cta1':'View projects','hero.cta2':'Contact me',
    'projects.title':'Projects','cta.case':'View case',
    'p1.cat':'B2B SaaS · Inventory','p1.title':'Redesigning Bizner’s inventory management for hardware stores',
    'p2.cat':'Complex systems · Blockchain','p2.title':'Designing Gestor Perhusa: coffee traceability',
    'p3.cat':'Edtech · Research and A/B testing','p3.title':'Improving drag and drop on a learning platform',
    'about.title':'Hi, I’m <em>Jhared</em>',
    'about.p1':'Hi, I’m Jhared. A Peruvian designer, curious by nature, focused on turning complex systems into clear, functional products.',
    'about.p2':'I explore how artificial intelligence can strengthen the design process, helping to explore ideas and build prototypes in the early stages.',
    'cv':'Résumé',
    'lab.title':'Lab','lab.sub':'Experiments, wild ideas and small projects that don’t fit anywhere else.','lab.soon':'Coming soon...','lab.c1.pill':'Agents','lab.c1.title':'Conversational feedback agent for the ideation stage','lab.flask':'Flask: tap to see what happens',
    'contact.title':'Got an idea or project in mind? Let’s talk.',
    'contact.copy':'Copy email','contact.copied':'Email copied!','contact.linkedin':'Message me directly on LinkedIn'
  }
};

(function(){
  var doc = document.documentElement;
  doc.classList.add('js');
  var lang = 'es';
  try { var s = localStorage.getItem('lang'); if (s === 'en' || s === 'es') lang = s; else if ((navigator.language||'').slice(0,2) !== 'es') lang = 'en'; } catch(e){}

  function apply(l){
    lang = l; doc.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var v = I18N[l][el.getAttribute('data-i18n')]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){ var v = I18N[l][el.getAttribute('data-i18n-aria')]; if (v != null) el.setAttribute('aria-label', v); });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){ var v = I18N[l][el.getAttribute('data-i18n-html')]; if (v != null) el.innerHTML = v; });
    document.getElementById('lang-label').textContent = l === 'es' ? 'EN' : 'ES';
    document.title = 'Jhared Marchena · Product Designer';
    try { localStorage.setItem('lang', l); } catch(e){}
  }
  document.getElementById('lang-toggle').addEventListener('click', function(){ apply(lang === 'es' ? 'en' : 'es'); });
  apply(lang);

  // Menú hamburguesa (móvil)
  var menuBtn = document.getElementById('menu-btn'), siteNav = document.getElementById('site-nav');
  function setMenu(open){ if (!menuBtn || !siteNav) return; siteNav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', function(e){ e.stopPropagation(); setMenu(!siteNav.classList.contains('open')); });
    siteNav.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('click', function(e){ if (!siteNav.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function(){ if (window.innerWidth > 760) setMenu(false); });
  }


  // Laboratorio: tooltip "Próximamente..." al hacer clic en una card
  document.querySelectorAll('.exp').forEach(function(card){
    var t;
    card.addEventListener('click', function(){
      document.querySelectorAll('.exp.tip-on').forEach(function(o){ if (o !== card) o.classList.remove('tip-on'); });
      card.classList.add('tip-on'); clearTimeout(t);
      t = setTimeout(function(){ card.classList.remove('tip-on'); }, 1800);
    });
  });

  // Laboratorio: humo azul al tocar el frasco
  var flask = document.querySelector('.flask'), smoke = document.querySelector('.smoke'), art = document.querySelector('.lab-art');
  if (flask && smoke) flask.addEventListener('click', function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var colors = ['rgba(40,90,255,.95)','rgba(70,130,255,.9)','rgba(25,70,220,.95)','rgba(110,160,255,.8)','rgba(55,110,255,.9)','rgba(95,100,115,.6)'];
    var n = reduce ? 8 : 34;
    art.classList.remove('wobble'); void art.offsetWidth; art.classList.add('wobble');
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span'); p.className = 'puff';
      var s = 60 + Math.random() * 90;
      p.style.setProperty('--s', s + 'px');
      p.style.setProperty('--pc', colors[i % colors.length]);
      p.style.setProperty('--dx', (-50 + Math.random() * 120) + 'px');
      p.style.setProperty('--dy', -(140 + Math.random() * 200) + 'px');
      p.style.setProperty('--sc', (1.8 + Math.random() * 1.4).toFixed(2));
      p.style.setProperty('--d', (reduce ? 0.8 : 2.2 + Math.random() * 1.2).toFixed(2) + 's');
      p.style.setProperty('--dl', (reduce ? 0 : i * 0.035).toFixed(2) + 's');
      p.addEventListener('animationend', function(){ this.remove(); });
      smoke.appendChild(p);
    }
  });

  // Enlaces reales
  document.querySelectorAll('[data-link="linkedin"]').forEach(function(a){ a.href = CONFIG.linkedin; });
  document.querySelectorAll('[data-link="cv"]').forEach(function(a){ a.href = CONFIG.cv; });

  // Copiar correo
  var copyBtn = document.getElementById('copy-email'), copyLabel = document.getElementById('copy-label');
  copyBtn.addEventListener('click', function(){
    function done(){ copyLabel.textContent = I18N[lang]['contact.copied']; setTimeout(function(){ copyLabel.textContent = I18N[lang]['contact.copy']; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CONFIG.email).then(done, done);
    else { var t = document.createElement('textarea'); t.value = CONFIG.email; document.body.appendChild(t); t.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(t); done(); }
  });

  // Carrusel
  var car = document.getElementById('carousel'), prev = document.getElementById('prev'), next = document.getElementById('next');
  function step(){ var c = car.querySelector('.card'); return c ? c.getBoundingClientRect().width + 24 : 444; }
  function update(){
    var max = car.scrollWidth - car.clientWidth - 2;
    prev.disabled = car.scrollLeft <= 2; next.disabled = car.scrollLeft >= max;
  }
  prev.addEventListener('click', function(){ car.scrollBy({left:-step(), behavior:'smooth'}); });
  next.addEventListener('click', function(){ car.scrollBy({left:step(), behavior:'smooth'}); });
  car.addEventListener('scroll', update, {passive:true}); window.addEventListener('resize', update); update();
  car.addEventListener('keydown', function(e){ if(e.key==='ArrowRight') next.click(); if(e.key==='ArrowLeft') prev.click(); });

  // Reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, {threshold:.15});
    els.forEach(function(el){ io.observe(el); });
  } else els.forEach(function(el){ el.classList.add('in'); });
})();
