/* =====================================================
   premium.js · PixelForge
   Animaciones, diseño premium, plantillas profesionales y QR.
   Se activa con UNA línea en index.html:
   <script defer src="premium.js"></script>
   ===================================================== */

/* ---------- AJUSTES: aquí pegas tus datos (sin tocar index.html) ---------- */
const AJUSTES = {
  origin: "",            // dónde / cómo empezó el negocio (lo usa Forja AI)
  FORM_ENDPOINT: "",     // "https://api.web3forms.com/submit"
  FORM_KEY: "",          // access key de Web3Forms
  WHATSAPP: "",          // código de país + número, ej. "5216671234567" (queda público)
  PAY_LINK: "",          // link de pago (Stripe, Mercado Pago...)
  FIREBASE: null,        // {apiKey:"...",authDomain:"...",projectId:"...",appId:"..."}
  SOCIAL: { instagram: "", tiktok: "", email: "", phone: "" }   // todo es público en la página
};

(function () {
"use strict";
const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const q = s => document.querySelector(s), qa = s => Array.from(document.querySelectorAll(s));
let io2;

/* ---------- INTRO: cortina de pixeles ---------- */
function intro() {
  if (RM) return;
  try { if (sessionStorage.getItem("pf_i")) return; sessionStorage.setItem("pf_i", "1"); } catch (e) {}
  const cw = Math.ceil(innerWidth / 64), ch = Math.ceil(innerHeight / 64), cv = document.createElement("div");
  cv.id = "curtain";
  cv.innerHTML = `<div class="cg" style="grid-template-columns:repeat(${cw},1fr);grid-template-rows:repeat(${ch},1fr)">${"<i></i>".repeat(cw * ch)}</div><div class="lo"><b>PIXEL</b><br>FORGE<div class="lb"><i></i></div></div>`;
  document.body.appendChild(cv);
  const st = document.createElement("style");
  st.textContent = "#curtain{position:fixed;inset:0;z-index:2000;display:grid;place-items:center}#curtain .cg{position:absolute;inset:0;display:grid}#curtain .cg i{background:#0a0f1f;transition:opacity .35s}#curtain .lo{position:relative;font-family:'Press Start 2P',monospace;color:#fff;font-size:clamp(14px,3vw,22px);text-align:center;line-height:1.8;transition:opacity .3s}#curtain .lo b{background:linear-gradient(135deg,#6366f1,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}#curtain .lb{width:160px;height:6px;background:rgba(255,255,255,.12);margin:18px auto 0;overflow:hidden}#curtain .lb i{display:block;height:100%;width:0;background:linear-gradient(135deg,#6366f1,#22d3ee);animation:pfld .9s steps(8) forwards}@keyframes pfld{to{width:100%}}";
  document.head.appendChild(st);
  setTimeout(() => {
    cv.querySelector(".lo").style.opacity = "0";
    cv.querySelectorAll(".cg i").forEach(i => { i.style.transitionDelay = (Math.random() * .7) + "s"; i.style.opacity = "0"; });
  }, 1000);
  setTimeout(() => cv.remove(), 2000);
}

/* ---------- CSS PREMIUM ---------- */
function addCSS() {
  const s = document.createElement("style"); s.id = "pf-premium";
  s.textContent = `
.reveal{opacity:0;transform:translateY(34px) scale(.98);filter:blur(6px);transition:opacity .8s,transform .8s cubic-bezier(.2,.7,.2,1),filter .8s;transition-delay:var(--rd,0s)}
.reveal.in{opacity:1;transform:none;filter:none}
header.nav{transition:box-shadow .3s,background .3s}.nav-in{transition:height .3s}
header.nav.sc{box-shadow:0 10px 30px rgba(0,0,0,.28)}header.nav.sc .nav-in{height:58px}
.hero .blobs{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.blob{position:absolute;border-radius:50%;filter:blur(64px);opacity:.5;animation:pfl 14s ease-in-out infinite alternate}
.b1{width:380px;height:380px;background:#6366f1;left:-80px;top:-40px}
.b2{width:320px;height:320px;background:#22d3ee;right:-60px;top:60px;animation-delay:-5s}
.b3{width:260px;height:260px;background:#ec4899;left:42%;bottom:-120px;opacity:.28;animation-delay:-9s}
@keyframes pfl{to{transform:translate(40px,30px) scale(1.15)}}
.blobs::after{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 72%);mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 72%)}
.px2{position:absolute;left:var(--x);top:var(--y);width:var(--s);height:var(--s);background:var(--k);opacity:0;animation:pfp var(--t) steps(8) infinite;animation-delay:var(--dl)}
@keyframes pfp{0%{opacity:0;transform:translateY(0)}25%{opacity:.85}100%{opacity:0;transform:translateY(-70px)}}
.btn.primary{position:relative;overflow:hidden}
.btn.primary::after{content:"";position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-20deg);transition:left .6s}
.btn.primary:hover::after{left:140%}
.card{position:relative}
.card:not(.plan)::after,.soc-i::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(99,102,241,.2),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.card:not(.plan):hover::after,.soc-i:hover::after{opacity:1}
.soc-i{position:relative}
#servGrid{grid-template-columns:repeat(6,1fr)}
#servGrid>.card{grid-column:span 2}#servGrid>.card:nth-child(1),#servGrid>.card:nth-child(4){grid-column:span 4}
#servGrid>.card:nth-child(5),#servGrid>.card:nth-child(6){grid-column:span 3}
@media(max-width:900px){#servGrid{grid-template-columns:1fr 1fr}#servGrid>.card,#servGrid>.card:nth-child(n){grid-column:auto}}
@media(max-width:560px){#servGrid{grid-template-columns:1fr}}
.eyebrow::after{content:"";display:block;width:0;height:3px;background:var(--grad);margin-top:8px;transition:width .8s .2s}
.vis .eyebrow::after{width:56px}
.step.reveal.in .n{animation:pfg 1.2s both}
@keyframes pfg{50%{text-shadow:0 0 18px var(--brand)}}
.marq.rev .track{animation-direction:reverse;animation-duration:38s}
.marq.rev{border-top:none}
#glow{position:fixed;width:440px;height:440px;border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(99,102,241,.15),transparent 65%);transform:translate(-50%,-50%);left:-999px;top:-999px}
#dots{position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:90;display:none;flex-direction:column;gap:10px}
@media(min-width:1180px){#dots{display:flex}}
#dots a{display:block;padding:4px}
#dots i{display:block;width:10px;height:10px;border:2px solid var(--muted);transition:.25s}
#dots a.on i{background:var(--brand2);border-color:var(--brand2);transform:scale(1.4)}
#site[style*="none"]~#dots{display:none!important}
.qrc{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
.qr{background:#fff;padding:14px;border:3px solid #1b1b1b;box-shadow:4px 4px 0 var(--hard);display:inline-block;line-height:0}
.qr img,.qr canvas{display:block;width:200px;height:200px}
.thumb::after{content:"Vista previa";position:absolute;inset:auto 10px 10px auto;background:var(--surface);border:2px solid var(--line);padding:3px 8px;font-family:var(--pf);font-size:9px;opacity:0;transition:.3s}
.card:hover .thumb::after{opacity:1}
`;
  document.head.appendChild(s);
}

/* ---------- AJUSTES -> CONFIG ---------- */
function applyConfig() {
  const A = AJUSTES;
  ["origin", "FORM_ENDPOINT", "FORM_KEY", "WHATSAPP", "PAY_LINK"].forEach(k => { if (A[k]) CONFIG[k] = A[k]; });
  if (A.FIREBASE) { CONFIG.FIREBASE = A.FIREBASE; if (!FB) initFirebase(); }
  Object.keys(A.SOCIAL || {}).forEach(k => { if (A.SOCIAL[k]) CONFIG.SOCIAL[k] = A.SOCIAL[k]; });
  renderSocial();
  if (CONFIG.WHATSAPP) {
    const w = q("#waBtn");
    if (w) { w.style.display = ""; w.href = "https://wa.me/" + CONFIG.WHATSAPP.replace(/\D/g, "") + "?text=" + encodeURIComponent("Hola, vi su página y quiero cotizar un proyecto."); }
  }
}

/* ---------- HERO: luces, cuadrícula, pixeles, profundidad ---------- */
function hero() {
  const h = q(".hero"); if (!h || h.querySelector(".blobs")) return;
  const b = document.createElement("div"); b.className = "blobs";
  b.innerHTML = '<i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>' +
    Array.from({ length: 16 }, () => `<i class="px2" style="--x:${(Math.random() * 100).toFixed(0)}%;--y:${(20 + Math.random() * 70).toFixed(0)}%;--s:${6 + (Math.random() * 8 | 0)}px;--t:${(4 + Math.random() * 5).toFixed(1)}s;--dl:-${(Math.random() * 6).toFixed(1)}s;--k:${Math.random() < .5 ? "#6366f1" : "#22d3ee"}"></i>`).join("");
  h.prepend(b);
  if (!RM) window.addEventListener("scroll", () => {
    const y = scrollY; if (y > 900) return;
    b.style.transform = `translateY(${y * .12}px)`;
    const cw = q(".codewin"); if (cw) cw.style.transform = `translateY(${y * -.05}px)`;
  }, { passive: true });
}

/* ---------- REVEAL ESCALONADO ---------- */
function stagger() {
  io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } }), { threshold: .12 });
  qa(".grid").forEach(g => Array.from(g.children).forEach((c, i) => { if (c.classList.contains("reveal")) c.style.setProperty("--rd", (i * .09).toFixed(2) + "s"); }));
}

/* ---------- TARJETAS: luz + inclinación 3D (solo con mouse) ---------- */
function cards() {
  if (RM || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const g = document.createElement("div"); g.id = "glow"; document.body.appendChild(g);
  document.addEventListener("pointermove", e => {
    g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px";
    const c = e.target.closest && e.target.closest(".card:not(.plan),.soc-i,.stat");
    if (!c || c.querySelector("input,textarea,select") || c.closest(".wiz")) return;
    const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
    c.style.transform = `perspective(900px) rotateX(${((y / r.height) - .5) * -6}deg) rotateY(${((x / r.width) - .5) * 6}deg) translateY(-3px)`;
  });
  document.addEventListener("pointerout", e => {
    const c = e.target.closest && e.target.closest(".card,.soc-i,.stat");
    if (c && !c.contains(e.relatedTarget)) c.style.transform = "";
  });
}
function magnet() {
  if (RM) return;
  qa(".btn.primary.lg").forEach(b => {
    b.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .12}px,${(e.clientY - r.top - r.height / 2) * .2}px)`; });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });
}

/* ---------- TÍTULOS: efecto decodificar ---------- */
function scramble() {
  if (RM) return;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, fin = el.dataset.t, n = fin.length; let f = 0;
    const id = setInterval(() => {
      f++; el.textContent = fin.split("").map((ch, i) => (ch === " " || i < f * n / 14) ? ch : chars[Math.random() * chars.length | 0]).join("");
      if (f >= 14) { clearInterval(id); el.textContent = fin; }
    }, 34);
  }), { threshold: .6 });
  qa(".sec h2").forEach(h => { if (h.children.length) return; h.dataset.t = h.textContent; io.observe(h); });
}

/* ---------- NAV, PUNTITOS, SECCIONES ---------- */
function navScroll() {
  const h = q("header.nav");
  addEventListener("scroll", () => { h.classList.toggle("sc", scrollY > 20); }, { passive: true });
}
function sections() {
  const v = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); v.unobserve(e.target); } }), { threshold: .2 });
  qa(".sec .container").forEach(c => v.observe(c));
}
function dots() {
  const ids = ["servicios", "proceso", "comparativa", "ejemplos", "portafolio", "precios", "probar", "simulador", "cotizador", "faq", "contacto", "conecta"];
  const names = ["Servicios", "Proceso", "Comparativa", "Ejemplos", "Portafolio", "Precios", "Constructor", "Simulador", "Cotizador", "FAQ", "Contacto", "Conecta"];
  const n = document.createElement("nav"); n.id = "dots";
  n.innerHTML = ids.map((id, i) => `<a href="#${id}" data-id="${id}" title="${names[i]}" aria-label="${names[i]}"><i></i></a>`).join("");
  document.body.appendChild(n);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) qa("#dots a").forEach(a => a.classList.toggle("on", a.dataset.id === e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
  ids.forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
}
function extraMarquee() {
  const m = q(".marq"); if (!m || q(".marq.rev")) return;
  const w = ["DISEÑO", "CÓDIGO", "ANIMACIÓN", "PIXEL ART", "RENDIMIENTO", "SEO", "SOPORTE", "IDEAS"];
  const r = document.createElement("div"); r.className = "marq rev";
  r.innerHTML = `<div class="track">${[...w, ...w].map(x => `<span>${x}</span>`).join("")}</div>`;
  m.after(r);
}

/* ---------- CONFETI PIXEL ---------- */
function burst() {
  if (RM) return;
  const cols = ["#6366f1", "#22d3ee", "#34d399", "#fbbf24", "#ec4899"];
  for (let i = 0; i < 26; i++) {
    const p = document.createElement("i"), s = 6 + Math.random() * 8;
    p.style.cssText = `position:fixed;left:50%;bottom:70px;width:${s}px;height:${s}px;background:${cols[i % 5]};z-index:900;pointer-events:none`;
    document.body.appendChild(p);
    const a = p.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${(Math.random() - .5) * 420}px,${-120 - Math.random() * 320}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" });
    a.onfinish = () => p.remove();
  }
}
function confetti() {
  const orig = window.toast;
  window.toast = function (m) { orig(m); if (/enviad|guardad|creada|plantilla cargada|descargado|exportado/i.test(m)) burst(); };
}

/* ---------- SECCIÓN CONECTA: QR + redes ---------- */
function loadScript(src) { return new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
function conecta() {
  if (q("#conecta")) return;
  const S = CONFIG.SOCIAL, ph = (S.phone || "").replace(/\D/g, ""), site = location.origin + location.pathname;
  const sec = document.createElement("section"); sec.className = "sec alt"; sec.id = "conecta";
  sec.innerHTML = `<div class="container"><span class="eyebrow">CONECTA</span><h2>Escanea y conecta con nosotros</h2><p class="sub">Comparte PixelForge con un QR o guarda nuestro contacto en tu teléfono.</p>
  <div class="two"><div class="card qrc reveal"><h3>Visita nuestra web</h3><div class="qr" id="qrSite"></div><div class="row left"><button class="btn" id="qrDl">${ic("download")} Descargar QR</button><button class="btn" id="qrCp">${ic("copy")} Copiar enlace</button></div></div>
  <div class="card qrc reveal"><h3>Guarda nuestro contacto</h3><div class="qr" id="qrCard" style="display:none"></div><p class="note" id="qrNote"></p><button class="btn" id="qrDl2" style="display:none">${ic("download")} Descargar QR</button></div></div></div>`;
  q("main").appendChild(sec);
  sec.querySelectorAll(".reveal").forEach((c, i) => { c.style.setProperty("--rd", i * .1 + "s"); io2.observe(c); });
  const dl = el => { const im = el.querySelector("img"); if (!im) return; const a = document.createElement("a"); a.href = im.src; a.download = "qr-pixelforge.png"; a.click(); };
  q("#qrDl").onclick = () => dl(q("#qrSite"));
  q("#qrDl2").onclick = () => dl(q("#qrCard"));
  q("#qrCp").onclick = () => navigator.clipboard.writeText(site).then(() => toast("Enlace copiado")).catch(() => toast("No se pudo copiar"));
  const mk = (el, text) => { el.innerHTML = ""; new QRCode(el, { text, width: 200, height: 200, colorDark: "#0a0f1f", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M }); };
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js").then(() => {
    mk(q("#qrSite"), site);
    if (S.email || ph) {
      const v = "BEGIN:VCARD\nVERSION:3.0\nFN:" + CONFIG.brand + "\nORG:" + CONFIG.brand + (S.email ? "\nEMAIL:" + S.email : "") + (ph ? "\nTEL:+" + ph : "") + "\nURL:" + site + "\nEND:VCARD";
      q("#qrCard").style.display = ""; q("#qrDl2").style.display = ""; mk(q("#qrCard"), v);
      q("#qrNote").textContent = "Escanéalo con la cámara para agregarnos a tus contactos.";
    } else q("#qrNote").textContent = "Aquí aparecerá el QR de contacto cuando agreguemos nuestro correo y teléfono.";
  }).catch(() => { q("#qrSite").innerHTML = '<p style="font-size:13px;color:#333;padding:8px;line-height:1.4">No se pudo cargar el generador de QR. Revisa tu conexión.</p>'; });
}

/* ---------- PLANTILLAS PROFESIONALES v2 ---------- */
function pv2(w) {
  w = w || W;
  const k = TPL[w.tpl] ? w.tpl : "cafe", t = TPL[k], E = esc, S = sv,
    c = /^#[0-9a-f]{6}$/i.test(w.color) ? w.color : "#6366f1", d = !!w.dark, px = w.round === "pixel",
    nm = E(w.name || "Tu marca"), tag = E(w.tag), cta = E(w.cta),
    hf = w.font === "pixel" ? "'Silkscreen',monospace" : w.font === "elegante" ? "'Playfair Display',Georgia,serif" : "'Inter',system-ui,sans-serif",
    ig = (w.ig || "").replace(/^@/, ""), tt = (w.tt || "").replace(/^@/, ""),
    stars = Array.from({ length: 5 }, () => S("star", 13, 'fill="currentColor"')).join("");
  const css = `:root{--c:${c};--bg:${d ? "#0b1020" : "#ffffff"};--bg2:${d ? "#111a33" : "#f4f5fb"};--tx:${d ? "#eef2ff" : "#0f1530"};--mu:${d ? "#9aa7c9" : "#5b668a"};--bd:${d ? "rgba(255,255,255,.1)" : "rgba(15,21,48,.1)"};--r:${px ? 0 : 14}px;--cs:color-mix(in srgb,var(--c) 14%,transparent)}
*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth}html,body{overflow-x:hidden}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.6}
h1,h2,h3{font-family:${hf};line-height:1.12;letter-spacing:-.01em}a{color:inherit;text-decoration:none}.w{max-width:1080px;margin:auto;padding:0 24px}
.js .rv{opacity:0;transform:translateY(26px);transition:opacity .8s,transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0s)}.js .rv.in{opacity:1;transform:none}
nav{position:sticky;top:0;z-index:9;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--bd)}
nav .w{display:flex;align-items:center;justify-content:space-between;height:64px;gap:14px}
.lg{font-weight:800;font-family:${hf};display:flex;align-items:center;gap:9px;font-size:18px}.lg i{width:30px;height:30px;border-radius:var(--r);background:var(--c);color:#fff;display:grid;place-items:center}
.nl{display:flex;gap:24px;font-size:14px;color:var(--mu);font-weight:500}
.btn{display:inline-flex;gap:8px;align-items:center;background:var(--c);color:#fff;padding:13px 24px;border-radius:var(--r);font-weight:700;font-size:14px;box-shadow:0 10px 24px color-mix(in srgb,var(--c) 38%,transparent);transition:.2s}.btn:hover{transform:translateY(-2px)}
.btn.o{background:transparent;color:var(--tx);border:1.5px solid var(--bd);box-shadow:none}.btn.wh{background:#fff;color:var(--c);box-shadow:none}.btn.sm{padding:8px 14px;font-size:12px}
.eb{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--c)}
section{padding:72px 0}section.alt{background:var(--bg2)}.sh{margin-bottom:34px}.sh h2{font-size:clamp(26px,4vw,38px);margin:8px 0}.sh p{color:var(--mu);max-width:540px}
.hero{padding:64px 0 56px;position:relative;overflow:hidden;background:radial-gradient(700px 300px at 85% -10%,color-mix(in srgb,var(--c) 26%,transparent),transparent 70%)}
.hero .w{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
h1{font-size:clamp(32px,5.6vw,58px);margin:14px 0}.hero p.l{color:var(--mu);font-size:17px;margin-bottom:26px;max-width:520px}.rw{display:flex;gap:12px;flex-wrap:wrap}
.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.cd{background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.3);overflow:hidden;transition:.25s}.cd:hover{transform:translateY(-4px);box-shadow:0 20px 40px color-mix(in srgb,var(--c) 18%,transparent)}
.cd .bd{padding:18px}.cd h3{font-size:17px;margin-bottom:4px}.cd p{color:var(--mu);font-size:13px}
.pr{display:flex;justify-content:space-between;align-items:center;margin-top:14px}.pr b{color:var(--c);font-size:18px}
.stars{display:flex;gap:2px;color:#f59e0b;margin-bottom:8px}
.meta{display:flex;gap:8px;align-items:center;margin-top:22px;color:var(--mu);font-size:14px}.meta svg{color:var(--c)}
.plate{position:relative;aspect-ratio:1;max-width:380px;margin:auto;width:100%;display:grid;place-items:center}
.ring{position:absolute;border-radius:50%}.r1{inset:0;background:conic-gradient(var(--c),color-mix(in srgb,var(--c) 25%,#fff),var(--c));opacity:.22;animation:spin 20s linear infinite}
.r2{inset:13%;background:radial-gradient(circle at 30% 28%,color-mix(in srgb,var(--c) 65%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 55%,#000));box-shadow:0 30px 70px color-mix(in srgb,var(--c) 45%,transparent)}
.core{position:relative;color:#fff;animation:bob 5s ease-in-out infinite}
.chip{position:absolute;background:var(--bg);color:var(--tx);border-radius:var(--r);padding:9px 13px;font-size:12px;font-weight:700;box-shadow:0 14px 30px rgba(0,0,0,.22);display:flex;gap:7px;align-items:center;animation:bob 4s ease-in-out infinite}.chip svg{color:var(--c)}.c1{top:8%;left:-2%}.c2{bottom:10%;right:-2%;animation-delay:-2s}
.strip{overflow:hidden;background:var(--c);color:#fff;padding:13px 0}.trk2{display:flex;gap:26px;width:max-content;animation:mq 32s linear infinite;font-family:${hf};font-weight:700;font-size:15px;white-space:nowrap}
.mn{display:grid;gap:24px;max-width:740px}.mt{display:flex;align-items:baseline;gap:12px}.mt h3{font-size:19px}.dots{flex:1;border-bottom:2px dotted var(--bd);transform:translateY(-4px)}.mt b{color:var(--c);font-size:18px}.mi p{color:var(--mu);font-size:14px;margin-top:2px}
.rs{display:grid;grid-template-columns:1.4fr repeat(3,1fr) auto;gap:12px;align-items:center;background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.3);padding:22px}.rs p{color:var(--mu);font-size:13px}
.fi{border:1.5px solid var(--bd);border-radius:var(--r);padding:12px 14px;color:var(--mu);font-size:14px;background:var(--bg2)}
.ann{background:var(--c);color:#fff;text-align:center;font-size:12px;font-weight:700;padding:8px;letter-spacing:.06em}
.cart{position:relative;display:grid;place-items:center;width:40px;height:40px;border:1.5px solid var(--bd);border-radius:var(--r)}.cart b{position:absolute;top:-6px;right:-6px;background:var(--c);color:#fff;font-size:10px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center}
.pill{display:inline-block;background:var(--cs);color:var(--c);font-weight:700;font-size:12px;padding:6px 12px;border-radius:99px}
.prod{position:relative;max-width:380px;margin:auto;width:100%}.pimg{aspect-ratio:1;border-radius:calc(var(--r)*2);background:linear-gradient(145deg,color-mix(in srgb,var(--c) 80%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 50%,#000));display:grid;place-items:center;color:#fff;box-shadow:0 30px 60px color-mix(in srgb,var(--c) 40%,transparent);animation:bob 6s ease-in-out infinite}
.badge{position:absolute;top:12px;left:12px;background:var(--bg);color:var(--c);font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}.prod .badge{top:16px;left:16px}
.ptag{position:absolute;bottom:-16px;right:-8px;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:10px 16px;box-shadow:0 14px 30px rgba(0,0,0,.2)}.ptag small{display:block;color:var(--mu);font-size:11px}.ptag b{font-size:20px;color:var(--c)}
.cats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}.cats span{padding:8px 16px;border:1.5px solid var(--bd);border-radius:99px;font-size:13px;font-weight:600;color:var(--mu)}.cats .on{background:var(--c);border-color:var(--c);color:#fff}
.pc .pi{position:relative;height:170px;background:linear-gradient(145deg,color-mix(in srgb,var(--c) 22%,var(--bg2)),color-mix(in srgb,var(--c) 55%,var(--bg2)));display:grid;place-items:center;color:var(--c)}
.feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px}.feat div{display:flex;flex-direction:column;gap:4px;align-items:flex-start}.feat svg{color:var(--c)}.feat span{color:var(--mu);font-size:13px}
.ticks{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px;font-size:13px;font-weight:600;color:var(--mu)}.ticks span{display:flex;gap:6px;align-items:center}.ticks svg{color:var(--c)}
.dash{background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.6);padding:22px;box-shadow:0 30px 60px rgba(0,0,0,.14);max-width:380px;margin:auto;width:100%}.dh{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.bars{display:flex;gap:10px;align-items:flex-end;height:120px;margin-bottom:16px}.bars i{flex:1;background:linear-gradient(var(--c),color-mix(in srgb,var(--c) 40%,transparent));border-radius:calc(var(--r)/2) calc(var(--r)/2) 0 0;transform-origin:bottom;animation:grow 1.2s cubic-bezier(.2,.7,.2,1) both}
.dl{display:grid;gap:8px;font-size:13px;font-weight:600}.dl div{display:flex;gap:8px;align-items:center}.dl svg{color:var(--c)}
.sv .num,.stp b{font-family:${hf};font-size:26px;color:var(--c);display:block;margin-bottom:10px}
.stp{padding:22px;border:1px solid var(--bd);border-radius:calc(var(--r)*1.3);background:var(--bg)}.stp p{color:var(--mu);font-size:14px}
details{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:16px 20px;margin-bottom:10px}summary{cursor:pointer;font-weight:700;list-style:none;display:flex;justify-content:space-between}summary::after{content:"+";color:var(--c)}details[open] summary::after{content:"-"}details p{color:var(--mu);margin-top:8px;font-size:14px}
.hp{padding:90px 0 70px}.hp .w{display:block}.big{font-size:clamp(46px,10vw,104px);line-height:1;margin:18px 0}.avail{display:inline-flex;gap:8px;align-items:center;font-size:13px;font-weight:700;border:1.5px solid var(--bd);padding:7px 14px;border-radius:99px}.avail i{width:9px;height:9px;background:#34d399;border-radius:50%;animation:pulse 1.6s infinite}
.pg{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}.pj{position:relative;min-height:260px;border-radius:calc(var(--r)*1.6);padding:24px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;transition:.3s}.pj:hover{transform:translateY(-6px) scale(1.01)}
.pn{position:absolute;top:18px;left:22px;font-family:${hf};font-size:34px;opacity:.5}.pt h3{font-size:22px}.pt p{opacity:.9;font-size:14px}.pt small{opacity:.8}.go{position:absolute;top:20px;right:20px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;transition:.3s}.pj:hover .go{background:#fff;color:var(--c);transform:rotate(-45deg)}
.tg{display:flex;gap:10px;flex-wrap:wrap}.tg span{padding:10px 18px;border:1.5px solid var(--bd);border-radius:99px;font-weight:600;font-size:14px;background:var(--bg)}
.sb{display:flex;align-items:center;gap:12px;background:var(--bg);border:1.5px solid var(--bd);border-radius:99px;padding:8px 8px 8px 20px;max-width:460px;box-shadow:0 14px 30px rgba(0,0,0,.08);color:var(--mu)}.sb span{flex:1;font-size:14px}
.stack{position:relative;height:300px;max-width:360px;margin:auto;width:100%}.mc{position:absolute;width:78%;background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.4);padding:18px;box-shadow:0 24px 50px rgba(0,0,0,.16);display:grid;gap:8px;animation:bob 5s ease-in-out infinite}.m0{top:0;left:0}.m1{bottom:0;right:0;animation-delay:-2.5s}.ico{width:40px;height:40px;border-radius:var(--r);background:var(--c);color:#fff;display:grid;place-items:center}.pb{height:8px;border-radius:9px;background:var(--bg2);overflow:hidden}.pb i{display:block;height:100%;background:var(--c);border-radius:9px}.mc small{color:var(--mu)}
.cc .im{height:130px;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 85%,#fff),color-mix(in srgb,var(--c) 45%,#000));display:grid;place-items:center;color:#fff;position:relative}.lvl{position:absolute;top:12px;left:12px;background:rgba(255,255,255,.9);color:#101733;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px}
.tg2{display:flex;gap:6px;margin-top:10px}.tg2 span{font-size:11px;font-weight:700;color:var(--c);background:var(--cs);padding:3px 9px;border-radius:99px}
.gl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.gl div{aspect-ratio:1;border-radius:var(--r);display:grid;place-items:center;color:rgba(255,255,255,.6)}
.ab{display:grid;grid-template-columns:1.2fr .8fr;gap:34px;align-items:center}.ab-p{color:var(--mu);font-size:17px;line-height:1.8}.fl{display:grid;gap:12px}.fl div{display:flex;gap:10px;align-items:center;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:14px 16px;font-weight:600;font-size:14px}.fl svg{color:var(--c)}
.q{color:var(--tx)!important;font-size:15px!important;margin-bottom:14px}.who{display:flex;gap:10px;align-items:center}.who i{width:34px;height:34px;border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:14px}.who b{font-size:13px}
.ci{display:flex;gap:12px;align-items:center;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:16px;font-size:14px}.ci svg{color:var(--c);flex:none}
.cta{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 50%,#000))!important;color:#fff;text-align:center}.cta h2{font-size:clamp(26px,4vw,40px);margin-bottom:8px}.cta p{opacity:.9;margin-bottom:20px}.nw{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.nw .fi{min-width:240px;background:#fff;color:#667;border:0}
footer{padding:28px 0;font-size:12px;color:var(--mu);border-top:1px solid var(--bd)}footer .w{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
@keyframes mq{to{transform:translateX(-50%)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes bob{50%{transform:translateY(-9px)}}@keyframes pulse{50%{opacity:.35}}@keyframes grow{from{transform:scaleY(0)}}
@media(max-width:760px){.hero .w,.ab{grid-template-columns:1fr}.nl{display:none}.rs{grid-template-columns:1fr 1fr}.rs>div:first-child{grid-column:1/-1}.stack{height:260px}.plate{max-width:260px}}`;
  const nav = (extra) => `<nav><div class="w"><div class="lg"><i>${S(t.i, 16)}</i>${nm}</div><div class="nl"><span>Inicio</span><span>${E(t.sec)}</span><span>Contacto</span></div><div style="display:flex;gap:10px;align-items:center">${extra || ""}<a class="btn sm">${cta}</a></div></div></nav>`;
  const head = (eb, h, p) => `<div class="sh"><div class="eb">${eb}</div><h2>${h}</h2>${p ? `<p>${p}</p>` : ""}</div>`;
  const gal = w.gal ? `<section><div class="w">${head("Galería", "Un vistazo a lo que hacemos")}<div class="gl">${Array.from({ length: w.galN }, (_, i) => `<div class="rv" style="--d:${(i % 3) * .08}s;background:linear-gradient(${135 + i * 28}deg,color-mix(in srgb,var(--c) ${92 - i * 6}%,#fff),color-mix(in srgb,var(--c) ${58 - i * 3}%,#000))">${S(t.i, 26)}</div>`).join("")}</div></div></section>` : "";
  const rev = w.rev ? `<section class="alt"><div class="w">${head("Reseñas", "Lo que dicen nuestros clientes", "Opiniones de personas que ya confiaron en nosotros.")}<div class="g">${w.revs.map((r, i) => `<div class="cd rv" style="--d:${i * .1}s"><div class="bd"><div class="stars">${stars}</div><p class="q">${E(r[1])}</p><div class="who"><i>${E((r[0] || "?").trim().charAt(0).toUpperCase())}</i><b>${E(r[0])}</b></div></div></div>`).join("")}</div></div></section>` : "";
  const about = `<section><div class="w ab"><div class="rv">${head("Nosotros", "Sobre nosotros")}<p class="ab-p">${E(w.about)}</p></div><div class="fl rv" style="--d:.12s"><div>${S("check", 18)}Atención cercana</div><div>${S("check", 18)}Calidad constante</div><div>${S("check", 18)}Resultados a tiempo</div></div></div></section>`;
  const ci = (i2, x) => `<div class="ci rv">${S(i2, 20)}<span>${E(x)}</span></div>`;
  const contact = `<section class="alt"><div class="w">${head("Contacto", "Visítanos o escríbenos", "Estamos para ayudarte.")}<div class="g">${[w.hours && ci("clock", w.hours), w.addr && ci("pin", w.addr), w.mail && ci("mail", w.mail), w.phone && ci("call", w.phone), ig && ci("ig", "@" + ig), tt && ci("tt", "@" + tt)].filter(Boolean).join("")}</div></div></section>`;
  const ctaS = `<section class="cta"><div class="w"><h2>${cta}</h2><p>${tag}</p><a class="btn wh">${cta}</a></div></section>`;
  const foot = `<footer><div class="w"><span>© ${new Date().getFullYear()} ${nm}</span><span>Hecho con PixelForge</span></div></footer>`;
  const B = {
    cafe: () => `${nav()}<header class="hero"><div class="w"><div class="rv"><div class="eb">${E(t.eb)}</div><h1>${nm}</h1><p class="l">${tag}</p><div class="rw"><a class="btn">${cta}</a><a class="btn o">Ver menú</a></div><div class="meta">${S("clock", 16)}<span>${E(w.hours)}</span></div></div><div class="plate rv" style="--d:.15s"><i class="ring r1"></i><i class="ring r2"></i><div class="core">${S(t.i, 96)}</div><div class="chip c1">${S("check", 14)}${E(t.chip1)}</div><div class="chip c2">${S("star", 14, 'fill="currentColor"')}${E(t.chip2)}</div></div></div></header>
<div class="strip"><div class="trk2">${Array(8).fill(`<span>${E(t.sec)}</span><span>·</span><span>${nm}</span><span>·</span>`).join("")}</div></div>
<section><div class="w">${head("Menú", E(t.sec), E(t.subsec))}<div class="mn">${w.items.map((it, i) => `<div class="mi rv" style="--d:${i * .09}s"><div class="mt"><h3>${E(it[0])}</h3><i class="dots"></i><b>${E(it[2])}</b></div><p>${E(it[1])}</p></div>`).join("")}</div></div></section>
<section class="alt"><div class="w"><div class="rs rv"><div><b>Reserva tu mesa</b><p>Ven a disfrutar con quien quieras.</p></div><div class="fi">Nombre</div><div class="fi">Personas</div><div class="fi">Fecha</div><a class="btn">${cta}</a></div></div></section>${gal}${about}${rev}${contact}${ctaS}${foot}`,
    tienda: () => `<div class="ann">${E(t.chip1)} · ${E(t.chip2)}</div>${nav(`<span class="cart">${S("bag", 20)}<b>0</b></span>`)}<header class="hero"><div class="w"><div class="rv"><span class="pill">Nueva colección</span><h1>${nm}</h1><p class="l">${tag}</p><div class="rw"><a class="btn">${cta}</a><a class="btn o">Ver catálogo</a></div></div><div class="prod rv" style="--d:.15s"><div class="pimg">${S(t.i, 110)}</div><span class="badge">Nuevo</span><div class="ptag"><small>Desde</small><b>${E(w.items[0][2])}</b></div></div></div></header>
<section><div class="w">${head("Catálogo", E(t.sec), E(t.subsec))}<div class="cats rv"><span class="on">Todo</span><span>Nuevo</span><span>Más vendido</span><span>Ofertas</span></div><div class="g">${w.items.map((it, i) => `<div class="cd pc rv" style="--d:${i * .09}s"><div class="pi">${S(t.i, 48)}<span class="badge">${["Nuevo", "Popular", "Oferta"][i] || "Nuevo"}</span></div><div class="bd"><div class="stars">${stars}</div><h3>${E(it[0])}</h3><p>${E(it[1])}</p><div class="pr"><b>${E(it[2])}</b><a class="btn sm">${E(t.btn)}</a></div></div></div>`).join("")}</div></div></section>
<section class="alt"><div class="w"><div class="feat">${[["truck", "Envíos", "Recibe en tu puerta"], ["shield", "Pago seguro", "Protegemos tus datos"], ["refresh", "Cambios fáciles", "Sin complicaciones"]].map((f, i) => `<div class="rv" style="--d:${i * .1}s">${S(f[0], 26)}<b>${f[1]}</b><span>${f[2]}</span></div>`).join("")}</div></div></section>${gal}${rev}
<section class="cta"><div class="w"><h2>Recibe novedades y ofertas</h2><p>Suscríbete y sé la primera persona en enterarte.</p><div class="nw"><div class="fi">tu@correo.com</div><a class="btn wh">Suscribirme</a></div></div></section>${contact}${foot}`,
    serv: () => `${nav()}<header class="hero"><div class="w"><div class="rv"><div class="eb">${E(t.eb)}</div><h1>${nm}</h1><p class="l">${tag}</p><div class="rw"><a class="btn">${cta}</a><a class="btn o">Conocer servicios</a></div><div class="ticks"><span>${S("check", 15)}${E(t.chip1)}</span><span>${S("check", 15)}${E(t.chip2)}</span></div></div><div class="dash rv" style="--d:.15s"><div class="dh"><b>Panel de avance</b><span class="pill">En curso</span></div><div class="bars"><i style="height:38%"></i><i style="height:55%"></i><i style="height:48%"></i><i style="height:72%"></i><i style="height:86%"></i></div><div class="dl"><div>${S("check", 16)}Diagnóstico</div><div>${S("check", 16)}Plan de acción</div><div>${S("clock", 16)}Seguimiento</div></div></div></div></header>
<section><div class="w">${head("Servicios", E(t.sec), E(t.subsec))}<div class="g">${w.items.map((it, i) => `<div class="cd sv rv" style="--d:${i * .09}s"><div class="bd"><span class="num">0${i + 1}</span><h3>${E(it[0])}</h3><p>${E(it[1])}</p><div class="pr"><b>${E(it[2])}</b><a class="btn sm">${E(t.btn)}</a></div></div></div>`).join("")}</div></div></section>
<section class="alt"><div class="w">${head("Proceso", "Así trabajamos", "Tres pasos claros, sin complicaciones.")}<div class="g">${[["Escuchamos", "Entendemos tu situación y objetivos."], ["Proponemos", "Te presentamos un plan claro y medible."], ["Acompañamos", "Damos seguimiento hasta ver resultados."]].map((s2, i) => `<div class="stp rv" style="--d:${i * .1}s"><b>${i + 1}</b><h3>${s2[0]}</h3><p>${s2[1]}</p></div>`).join("")}</div></div></section>${about}${rev}
<section><div class="w" style="max-width:760px">${head("FAQ", "Preguntas frecuentes")}<details class="rv"><summary>¿Cómo empezamos?</summary><p>Agenda una llamada y platicamos tu caso sin compromiso.</p></details><details class="rv"><summary>¿Cuál es su horario?</summary><p>${E(w.hours)}.</p></details><details class="rv"><summary>¿Dónde se encuentran?</summary><p>${E(w.addr)}.</p></details></div></section>${contact}${ctaS}${foot}`,
    port: () => `${nav()}<header class="hero hp"><div class="w"><div class="rv"><span class="avail"><i></i>${E(t.chip1)}</span><h1 class="big">${nm}</h1><p class="l">${tag}</p><div class="rw"><a class="btn">${cta}</a><a class="btn o">Saber más</a></div></div></div></header>
<div class="strip"><div class="trk2">${Array(8).fill("<span>Diseño</span><span>·</span><span>Web</span><span>·</span><span>Marca</span><span>·</span><span>Producto</span><span>·</span>").join("")}</div></div>
<section><div class="w">${head("Trabajo", E(t.sec), E(t.subsec))}<div class="pg">${w.items.map((it, i) => `<a class="pj rv" style="--d:${i * .09}s;background:linear-gradient(${120 + i * 35}deg,color-mix(in srgb,var(--c) ${92 - i * 10}%,#fff),color-mix(in srgb,var(--c) ${50 - i * 6}%,#000))"><span class="pn">0${i + 1}</span><div class="pt"><h3>${E(it[0])}</h3><p>${E(it[1])}</p><small>${E(it[2])}</small></div><span class="go">${S("arrow", 20)}</span></a>`).join("")}</div></div></section>
<section class="alt"><div class="w">${head("Habilidades", "Con qué trabajo")}<div class="tg rv">${["Diseño de interfaz", "Desarrollo web", "Identidad de marca", "Prototipos", "Animación", "SEO"].map(x => `<span>${x}</span>`).join("")}</div></div></section>${about}${gal}${rev}
<section class="cta"><div class="w"><p>¿Tienes un proyecto en mente?</p><h2>Hablemos${w.mail ? " en " + E(w.mail) : ""}</h2><a class="btn wh">${cta}</a></div></section>${contact}${foot}`,
    edu: () => `${nav()}<header class="hero"><div class="w"><div class="rv"><div class="eb">${E(t.eb)}</div><h1>${nm}</h1><p class="l">${tag}</p><div class="sb">${S("search", 18)}<span>¿Qué quieres aprender hoy?</span><a class="btn sm">Buscar</a></div></div><div class="stack rv" style="--d:.15s">${w.items.slice(0, 2).map((it, i) => `<div class="mc m${i}"><div class="ico">${S(t.i, 22)}</div><b>${E(it[0])}</b><div class="pb"><i style="width:${i ? 45 : 72}%"></i></div><small>${i ? 45 : 72}% completado</small></div>`).join("")}</div></div></header>
<section><div class="w">${head("Cursos", E(t.sec), E(t.subsec))}<div class="g">${w.items.map((it, i) => `<div class="cd cc rv" style="--d:${i * .09}s"><div class="im">${S(t.i, 38)}<span class="lvl">${["Inicial", "Intermedio", "Práctico"][i] || "Curso"}</span></div><div class="bd"><h3>${E(it[0])}</h3><p>${E(it[1])}</p><div class="tg2"><span>En vivo</span><span>A tu ritmo</span></div><div class="pr"><b>${E(it[2])}</b><a class="btn sm">${E(t.btn)}</a></div></div></div>`).join("")}</div></div></section>
<section class="alt"><div class="w">${head("Cómo funciona", "Aprende en 3 pasos")}<div class="g">${[["Elige", "Encuentra el curso ideal para ti."], ["Aprende", "Clases claras con ejemplos reales."], ["Practica", "Aplica lo aprendido con ejercicios."]].map((s2, i) => `<div class="stp rv" style="--d:${i * .1}s"><b>${i + 1}</b><h3>${s2[0]}</h3><p>${s2[1]}</p></div>`).join("")}</div></div></section>${about}${rev}${contact}${ctaS}${foot}`
  };
  const js = 'document.documentElement.className="js";addEventListener("DOMContentLoaded",function(){var els=document.querySelectorAll(".rv");if(!window.IntersectionObserver){els.forEach(function(e){e.classList.add("in")});return}var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}})},{threshold:.1});els.forEach(function(e){o.observe(e)})})';
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(w.seoT || w.name)}</title><meta name="description" content="${E(w.seoD || w.tag)}"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><script>${js}</script>${B[k]()}</body></html>`;
}
function ex2() {
  q("#exGrid").innerHTML = PRESETS.map(([k, o], i) => {
    const w = newW(k, o);
    return `<div class="card ex"><div class="thumb"><iframe loading="lazy" sandbox="allow-scripts" tabindex="-1" title="${esc(w.name)}" srcdoc="${esc(pv2(w))}"></iframe></div><h3 style="margin-top:14px">${esc(w.name)}</h3><p>${TPL[k].eb}</p><button class="btn" style="margin-top:12px" onclick="usePreset(${i})">Usar esta plantilla</button></div>`;
  }).join("");
  qa("#exGrid .card").forEach((c, i) => { c.classList.add("reveal"); c.style.setProperty("--rd", (i * .09).toFixed(2) + "s"); io2.observe(c); });
  requestAnimationFrame(scaleThumbs);
}
function tpl() {
  Object.assign(IP, {
    truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
  });
  ["#prev", "#pvFull"].forEach(s => { const f = q(s); if (f) f.setAttribute("sandbox", "allow-scripts"); });
  window.pvHTML = pv2;
  window.renderEx = ex2;
  ex2();
  schedPrev();
}

/* ---------- ARRANQUE ---------- */
function boot() {
  [addCSS, stagger, applyConfig, hero, cards, magnet, scramble, navScroll, sections, extraMarquee, confetti, conecta, dots, tpl].forEach(f => {
    try { f(); } catch (e) { console.warn("premium:", f.name, e); }
  });
}
try { intro(); } catch (e) {}
if (document.readyState === "complete") boot(); else addEventListener("load", boot);
})();
