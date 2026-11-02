/* =====================================================
   mejoras.js · PixelForge
   - Pixel + profesional: escena pixel, divisores, iconos pixelados
   - Ventaja competitiva
   - Constructor v3: 13 plantillas, diseño libre, efectos pixel, fotos propias
   Se activa con una línea en index.html (debajo de la de premium.js):
   <script defer src="mejoras.js"></script>
   ===================================================== */
(function () {
"use strict";
const q = s => document.querySelector(s), qa = s => Array.from(document.querySelectorAll(s));
const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mixc = (a, b, t) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
const lum = h => { const [r, g, b] = hx(h); return (.299 * r + .587 * g + .114 * b) / 255; };
function obs(sel) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  qa(sel).forEach((el, i) => { el.style.setProperty("--rd", (i * .08).toFixed(2) + "s"); io.observe(el); });
}

/* ---------- PAISAJE PIXEL ART (procedural) ---------- */
function pxScene(C, R, c, c2) {
  const sky = [0, 1, 2, 3, 4].map(i => mixc(mixc(c, "#050816", .75), mixc(c2, "#ffffff", .25), i / 4));
  const far = mixc(c, "#050816", .55), near = mixc(c, "#050816", .78), gr = mixc(c, "#050816", .9), sun = mixc(c2, "#ffffff", .35), cl = mixc(c2, "#ffffff", .7);
  const rnd = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return v - Math.floor(v); };
  const sx = Math.round(C * .72), sy = Math.round(R * .34), sr = Math.round(R * .17);
  const hFar = x => Math.round(R * .62 + Math.sin(x / 7) * R * .08 + Math.sin(x / 3.1) * R * .03);
  const hNear = x => Math.round(R * .8 + Math.sin(x / 5 + 2) * R * .06);
  const cloud = (x, y) => [[.2, .2], [.5, .12], [.88, .26]].some(([cx, cy]) => { const dx = x - Math.round(C * cx), dy = y - Math.round(R * cy); return (dy >= 0 && dy <= 1 && dx >= -4 && dx <= 4) || (dy === -1 && dx >= -2 && dx <= 2); });
  const col = (x, y) => {
    if (y >= hNear(x)) return y >= hNear(x) + 1 ? gr : near;
    if (y >= hFar(x)) return far;
    if ((x - sx) ** 2 + (y - sy) ** 2 <= sr * sr) return sun;
    if (cloud(x, y)) return cl;
    if (y < R * .5 && rnd(x, y) > .985) return "#ffffff";
    return sky[Math.min(4, Math.floor(y / R * 5))];
  };
  let out = "";
  for (let y = 0; y < R; y++) { let x = 0; while (x < C) { const k = col(x, y); let n = 1; while (x + n < C && col(x + n, y) === k) n++; out += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${k}"/>`; x += n; } }
  return `<svg viewBox="0 0 ${C} ${R}" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" style="width:100%;height:100%;display:block">${out}</svg>`;
}

/* ---------- CSS DEL SITIO ---------- */
function css() {
  const s = document.createElement("style"); s.id = "pf-mejoras";
  s.textContent = `
.pxscene{height:170px;position:relative;overflow:hidden;border-block:3px solid #000;background:#050816}
.pxscene .cl{position:absolute;left:0;width:8px;height:8px;--w:rgba(255,255,255,.85);background:var(--w);box-shadow:8px 0 0 var(--w),-8px 8px 0 var(--w),0 8px 0 var(--w),8px 8px 0 var(--w),16px 8px 0 var(--w);animation:pfdrift 46s linear infinite}
.pxscene .cl1{top:22px}.pxscene .cl2{top:58px;opacity:.55;animation-duration:70s;animation-delay:-30s;transform:scale(1.4)}
@keyframes pfdrift{from{margin-left:-80px}to{margin-left:calc(100vw + 80px)}}
.pxscene .spr{position:absolute;bottom:8px;left:0;color:#fff;animation:pfwalk 22s linear infinite}
.pxscene .spr svg{animation:pfbob .5s steps(2) infinite}
@keyframes pfwalk{from{margin-left:-60px}to{margin-left:calc(100vw + 60px)}}
@keyframes pfbob{50%{transform:translateY(-4px)}}
section.sec{--sb:var(--bg);position:relative}section.alt{--sb:var(--bg2)}
section.sec::before{content:"";position:absolute;left:0;right:0;top:-12px;height:12px;background:repeating-linear-gradient(90deg,var(--sb) 0 12px,transparent 12px 24px);z-index:2;pointer-events:none}
section.sec::after{content:"";position:absolute;left:0;right:0;top:-6px;height:6px;background:repeating-linear-gradient(90deg,transparent 0 12px,var(--sb) 12px 24px);z-index:2;pointer-events:none}
.card .ic svg{width:30px;height:30px}
.vt .card h3{font-size:14px}
.cmp .r span:nth-child(2){font-weight:700}
.srow{display:flex;align-items:center;justify-content:space-between;gap:8px;background:var(--surface2);border:2px solid var(--border);border-radius:8px;padding:8px 12px;margin-top:8px}
.srow label{display:flex;gap:10px;align-items:center;font-weight:600;font-size:13px}
.srow .mv button{background:var(--surface);border:2px solid var(--border);border-radius:6px;width:30px;height:30px;display:inline-grid;place-items:center;margin-left:4px}
.pal{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.pal button{display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:8px;background:var(--surface2);border:2px solid var(--border);font-size:12px;font-weight:600}
.pal button.on{border-color:var(--brand)}.pal i{width:16px;height:16px;border-radius:4px;display:inline-block}
.tpls{grid-template-columns:repeat(3,1fr)}.tpls .tpl{padding:12px 6px;font-size:12px;text-align:center}
`;
  document.head.appendChild(s);
}

/* ---------- PAISAJE + ROBOT EN LA PORTADA ---------- */
function strip() {
  const m = q(".marq"); if (!m || q(".pxscene")) return;
  const d = document.createElement("div"); d.className = "pxscene";
  d.innerHTML = pxScene(160, 34, "#6366f1", "#22d3ee") + '<i class="cl cl1"></i><i class="cl cl2"></i><span class="spr"><svg class="i px" style="width:34px;height:34px"><use href="#i-bot"/></svg></span>';
  m.before(d);
  const t = q(".trust"); if (t) t.textContent = "Pago único · Código 100% tuyo · Hecho por personas";
}

/* ---------- ICONOS PIXELADOS (convierte los iconos de línea a pixel art) ---------- */
function pixIcon(name, N) {
  return new Promise(res => {
    const sym = document.getElementById("i-" + name); if (!sym) return res("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="square" stroke-linejoin="miter">${sym.innerHTML}</svg>`;
    const im = new Image();
    im.onload = () => {
      const cv = document.createElement("canvas"); cv.width = cv.height = N;
      const cx = cv.getContext("2d"); cx.drawImage(im, 0, 0, N, N);
      const d = cx.getImageData(0, 0, N, N).data; let r = "";
      for (let y = 0; y < N; y++) { let x = 0; while (x < N) { if (d[(y * N + x) * 4 + 3] > 100) { let n = 1; while (x + n < N && d[(y * N + x + n) * 4 + 3] > 100) n++; r += `<rect x="${x}" y="${y}" width="${n}" height="1"/>`; x += n; } else x++; } }
      res(`<svg viewBox="0 0 ${N} ${N}" fill="currentColor" shape-rendering="crispEdges">${r}</svg>`);
    };
    im.onerror = () => res("");
    im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
}
async function pixIcons() {
  for (const el of qa("#servGrid .ic,#portGrid .ic")) {
    const u = el.querySelector("use"); if (!u) continue;
    const s = await pixIcon(u.getAttribute("href").replace("#i-", ""), 12); if (s) el.innerHTML = s;
  }
}

/* ---------- NUESTRA VENTAJA COMPETITIVA ---------- */
function ventaja() {
  const c = q("#comparativa .container"); if (!c) return;
  const rows = [["Modelo de pago", "Pago único", "Mensual + créditos"], ["Código fuente completo", "Sí, al liquidar", "Según el plan"], ["Trato directo con personas", "Sí, con los fundadores", "Según el plan"], ["Diseño con identidad propia", "Sí, incluido pixel art", "Basado en plantillas"], ["Precios en pesos mexicanos", "Sí", "En dólares"]];
  c.innerHTML = `<span class="eyebrow">NUESTRA VENTAJA</span><h2>Tu web es tuya. Pagas una vez.</h2>
<p class="sub">Los constructores con IA son rápidos, pero cobran cada mes por créditos y guardan tu proyecto en su plataforma. Nosotros hacemos lo contrario: código completo, hecho por personas y con identidad propia.</p>
<div class="grid g4 vt">${[["zap", "Pago único, sin renta", "Sin créditos ni mensualidades obligatorias. Pagas tu plan una vez."], ["code", "Código 100% tuyo", "Al liquidar el proyecto recibes todo el código fuente, no solo acceso a una plataforma."], ["user", "Hecho por personas", "Dos fundadores programando, en español y con soporte directo después de entregar."], ["gamepad", "Identidad pixel", "Diseño con personalidad: pixel art, retro y animaciones que no parecen una plantilla más."]].map(x => `<div class="card reveal"><div class="ic">${ic(x[0])}</div><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div>
<div class="cmp reveal" style="margin-top:28px"><div class="r h"><span></span><span>PIXELFORGE</span><span>POR SUSCRIPCIÓN</span></div>${rows.map(r => `<div class="r"><span>${r[0]}</span><span class="ok">${r[1]}</span><span class="no">${r[2]}</span></div>`).join("")}</div>
<p class="note">Comparación general con constructores por suscripción y créditos. Las condiciones de cada plataforma cambian; revísalas antes de decidir.</p>`;
  obs("#comparativa .reveal");
}

/* =====================================================
   CONSTRUCTOR V3
   ===================================================== */
const PF = window.PF = {};
const PAL = [["Índigo", "#6366f1", "#22d3ee"], ["Océano", "#0ea5e9", "#6366f1"], ["Bosque", "#10b981", "#f59e0b"], ["Atardecer", "#f97316", "#ec4899"], ["Rubí", "#ef4444", "#f59e0b"], ["Orquídea", "#a855f7", "#ec4899"], ["Café", "#b45309", "#f59e0b"], ["Menta", "#14b8a6", "#22d3ee"], ["Neón", "#22c55e", "#a855f7"], ["Grafito", "#475569", "#0ea5e9"]];
const HF = ["Inter", "Playfair Display", "Silkscreen", "Press Start 2P", "Space Grotesk", "DM Serif Display", "Poppins", "Bebas Neue", "Outfit", "Lora"];
const BF = ["Inter", "Poppins", "Outfit", "Lora"];
const GF = { "Inter": "Inter:wght@400;500;600;700;800", "Playfair Display": "Playfair+Display:wght@700;800", "Silkscreen": "Silkscreen:wght@400;700", "Press Start 2P": "Press+Start+2P", "Space Grotesk": "Space+Grotesk:wght@500;700", "DM Serif Display": "DM+Serif+Display", "Poppins": "Poppins:wght@400;500;600;700", "Bebas Neue": "Bebas+Neue", "Outfit": "Outfit:wght@400;500;700", "Lora": "Lora:wght@400;600;700" };
const SECN = { items: "Productos o servicios", gal: "Galería", about: "Sobre nosotros", steps: "Cómo trabajamos", rev: "Reseñas", faq: "Preguntas frecuentes", contact: "Contacto", cta: "Llamado a la acción", news: "Newsletter", custom: "Sección personalizada" };
const EXI = {
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
  gamepad: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  truck: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
};
function addTemplates() {
  const T = (n, i, eb, color, name, tag, cta, sec, subsec, btn, c1, c2, items, about, hours, addr) => ({ n, i, eb, color, name, tag, cta, sec, subsec, btn, chip1: c1, chip2: c2, items, about, hours, addr });
  Object.assign(TPL, {
    gym: T("Gimnasio", "activity", "Entrenamiento", "#ef4444", "Forma Gym", "Entrena con coaches, rutinas claras y un ambiente que te impulsa.", "Prueba una clase", "Planes y clases", "Elige cómo quieres entrenar.", "Elegir", "Clases guiadas", "Todos los niveles", [["Plan mensual", "Acceso libre a todas las áreas.", "$499"], ["Clases grupales", "Funcional, spinning y más.", "$699"], ["Entrenamiento personal", "Rutina a tu medida con coach.", "$1,200"]], "Creemos que entrenar debe ser accesible y motivante. Te acompañamos desde tu primera visita con rutinas pensadas para ti.", "Lun a Sáb · 6:00 a 22:00", "Tu sucursal más cercana"),
    belleza: T("Belleza y barbería", "scissors", "Estilo y cuidado", "#ec4899", "Studio Navaja", "Cortes, color y cuidado personal con atención de principio a fin.", "Reservar cita", "Servicios", "Todo lo que necesitas para verte y sentirte bien.", "Reservar", "Con cita previa", "Productos profesionales", [["Corte", "Corte y peinado a tu estilo.", "$150"], ["Color", "Tintes y mechas profesionales.", "$650"], ["Barba y afeitado", "Perfilado con toalla caliente.", "$120"]], "Un espacio donde cada visita es una experiencia. Escuchamos lo que quieres y lo hacemos realidad con cuidado y detalle.", "Mar a Sáb · 10:00 a 20:00", "Centro de la ciudad"),
    musica: T("Música y artistas", "music", "Música en vivo", "#a855f7", "Eco Sonoro", "Música original, fechas en vivo y todo en un solo lugar.", "Escuchar ahora", "Lanzamientos", "Lo último que hemos grabado.", "Escuchar", "Nuevo sencillo", "Próximas fechas", [["Sencillo nuevo", "Disponible en todas las plataformas.", "2026"], ["EP debut", "Cinco canciones, una historia.", "2025"], ["Sesión en vivo", "Grabada en estudio.", "2025"]], "Hacemos música que nace de historias reales. Cada canción se escribe, se graba y se toca con las manos.", "Contrataciones todo el año", "Gira por todo el país"),
    eventos: T("Bodas y eventos", "heart", "Eventos", "#14b8a6", "Momentos & Co.", "Organizamos tu evento para que solo te preocupes por disfrutarlo.", "Cotizar evento", "Paquetes", "Opciones para cada tipo de celebración.", "Cotizar", "Planeación completa", "Atención personalizada", [["Boda", "Planeación y coordinación del día.", "Desde $8,000"], ["Cumpleaños", "Decoración, música y logística.", "Desde $3,500"], ["Evento empresarial", "Producción y atención a invitados.", "Desde $6,000"]], "Convertimos tus ideas en celebraciones inolvidables. Nos encargamos de los detalles para que tú vivas el momento.", "Lun a Vie · 9:00 a 18:00", "Cobertura en toda la región"),
    salud: T("Salud y bienestar", "shield", "Atención médica", "#0ea5e9", "Clínica Alba", "Atención cercana, con citas rápidas y seguimiento.", "Agendar cita", "Especialidades", "Profesionales listos para ayudarte.", "Agendar", "Citas rápidas", "Atención cercana", [["Medicina general", "Consulta y seguimiento.", "$500"], ["Nutrición", "Plan alimenticio personalizado.", "$600"], ["Bienestar emocional", "Sesiones en línea o presenciales.", "$700"]], "Cuidamos de ti con un enfoque humano y claro. Te explicamos cada paso para que tomes decisiones con tranquilidad.", "Lun a Vie · 8:00 a 19:00", "Consultorio en tu ciudad"),
    inmob: T("Inmobiliaria", "home", "Bienes raíces", "#f59e0b", "Casa Norte", "Encuentra tu próximo hogar con asesoría de principio a fin.", "Ver propiedades", "Propiedades", "Opciones seleccionadas para ti.", "Ver", "Asesoría completa", "Visitas guiadas", [["Departamento céntrico", "2 recámaras, 85 m².", "$2,450,000"], ["Casa con jardín", "3 recámaras, 180 m².", "$3,900,000"], ["Local comercial", "Zona de alto tráfico.", "$1,800,000"]], "Te acompañamos en la búsqueda, la visita y el trámite para que comprar o rentar sea una experiencia simple.", "Lun a Sáb · 9:00 a 19:00", "Oficina en tu ciudad"),
    foto: T("Fotografía", "camera", "Fotografía", "#6366f1", "Luz & Sal", "Retratos, eventos y marca con mirada propia.", "Reservar sesión", "Sesiones", "Elige la sesión ideal para ti.", "Reservar", "Entrega en días", "Fotos editadas", [["Retrato", "Sesión de 1 hora, 15 fotos editadas.", "$1,800"], ["Evento", "Cobertura por horas.", "$3,500"], ["Marca", "Fotos para tu negocio.", "$2,900"]], "Capturo momentos con luz natural y un estilo limpio. Cada sesión se planea contigo para que las fotos cuenten tu historia.", "Agenda abierta toda la semana", "Estudio y locaciones"),
    juego: T("Estudio de videojuegos", "gamepad", "Indie game studio", "#22c55e", "Pixel Realm", "Juegos retro con alma: pixel art, música chiptune y mucha diversión.", "Jugar demo", "Nuestros juegos", "Aventuras hechas con cariño.", "Jugar", "Demo gratis", "Estilo pixel art", [["Dungeon Byte", "Explora mazmorras generadas al azar.", "Gratis"], ["Neon Racer", "Carreras arcade a toda velocidad.", "$49"], ["Slime Kingdom", "Defiende tu reino de slimes.", "$79"]], "Somos un estudio pequeño que ama los videojuegos clásicos. Cada juego se diseña pixel por pixel.", "Respondemos en menos de 24 h", "Estudio remoto")
  });
}
function newW3(k, o) {
  const t = TPL[k] || TPL.cafe; k = TPL[k] ? k : "cafe";
  return Object.assign({
    tpl: k, step: 1, done: 0, dev: "desk", name: t.name, tag: t.tag, cta: t.cta, cta2: "Saber más", eyebrow: t.eb, ann: "", logo: "",
    color: t.color, color2: mixc(t.color, "#22d3ee", .45), bg: "", dark: false, hf: "Inter", bf: "Inter", radius: 14, btn: "fill", shadow: "soft", dens: "normal",
    hero: "split", art: "plate", himg: "", pxb: false, pxg: false, pxs: false, pxbtn: false, pxd: false,
    secs: [{ id: "items", on: true }, { id: "gal", on: true }, { id: "about", on: true }, { id: "steps", on: false }, { id: "rev", on: true }, { id: "faq", on: false }, { id: "contact", on: true }, { id: "cta", on: true }, { id: "news", on: false }, { id: "custom", on: false }],
    secT: t.sec, secS: t.subsec, istyle: "cards", items: t.items.map(x => [x[0], x[1], x[2], ""]),
    galN: 6, imgs: [], revs: [["María G.", "Excelente atención y resultados. Lo recomiendo mucho."], ["Carlos R.", "Todo salió como lo pedí y a tiempo."]],
    about: t.about, points: ["Atención cercana", "Calidad constante", "Resultados a tiempo"],
    steps: [["Escuchamos", "Entendemos lo que necesitas."], ["Proponemos", "Te presentamos un plan claro."], ["Entregamos", "Ejecutamos y damos seguimiento."]],
    faq: [["¿Cómo empiezo?", "Escríbenos o agenda una cita y te guiamos."], ["¿Cuál es su horario?", ""], ["¿Dónde se encuentran?", ""]],
    cTitle: "Algo que nos distingue", cText: "Cuenta aquí lo que quieras destacar de tu negocio.",
    hours: t.hours, addr: t.addr, mail: "", phone: "", ig: "", tt: "", seoT: "", seoD: "", foot: ""
  }, o || {});
}

/* ---------- MOTOR DE VISTA PREVIA V3 ---------- */
function pv3(w) {
  w = w || W;
  const t = TPL[w.tpl] || TPL.cafe, E = esc, S = sv, ok = h => /^#[0-9a-f]{6}$/i.test(h || ""),
    c = ok(w.color) ? w.color : "#6366f1", c2 = ok(w.color2) ? w.color2 : "#22d3ee",
    bg = ok(w.bg) ? w.bg : (w.dark ? "#0b1020" : "#ffffff"), dk = lum(bg) < .5, tx = dk ? "#eef2ff" : "#0f1530",
    bg2 = mixc(bg, dk ? "#ffffff" : "#0f1530", dk ? .07 : .04), mu = mixc(tx, bg, .42), bd = mixc(tx, bg, .86), oc = lum(c) > .62 ? "#101733" : "#ffffff",
    hf = w.hf || "Inter", bf = w.bf || "Inter", fb = f => /Playfair|Lora|DM Serif/.test(f) ? "Georgia,serif" : "system-ui,sans-serif",
    hs = hf === "Press Start 2P" ? .58 : hf === "Silkscreen" ? .92 : hf === "Bebas Neue" ? 1.25 : 1,
    rad = Math.max(0, Math.min(40, +w.radius || 0)), sp = w.dens === "compact" ? 48 : w.dens === "airy" ? 100 : 72,
    nm = E(w.name || "Tu marca"), tag = E(w.tag), cta = E(w.cta), cta2 = E(w.cta2 || "Saber más"),
    ig = (w.ig || "").replace(/^@/, ""), tt = (w.tt || "").replace(/^@/, ""),
    stars = Array.from({ length: 5 }, () => S("star", 13, 'fill="currentColor"')).join(""),
    slug = (w.name || "tu-marca").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tu-marca",
    fams = Array.from(new Set([hf, bf])).map(f => GF[f]).filter(Boolean).join("&family="),
    grad = i => `linear-gradient(${135 + i * 30}deg,color-mix(in srgb,var(--c) ${90 - i * 8}%,#fff),color-mix(in srgb,var(--c2) ${60 - i * 4}%,#000))`;
  const css = `:root{--c:${c};--c2:${c2};--bg:${bg};--bg2:${bg2};--tx:${tx};--mu:${mu};--bd:${bd};--r:${rad}px;--oc:${oc};--sp:${sp}px;--hs:${hs};--cs:color-mix(in srgb,var(--c) 14%,transparent)}
*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth}html,body{overflow-x:hidden}
body{font-family:'${bf}',${fb(bf)};background:var(--bg);color:var(--tx);line-height:1.6}
h1,h2,h3{font-family:'${hf}',${fb(hf)};line-height:1.15;letter-spacing:-.01em;font-weight:700}a{color:inherit;text-decoration:none}.w{max-width:1080px;margin:auto;padding:0 24px}
.js .rv{opacity:0;transform:translateY(26px);transition:opacity .8s,transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0s)}.js .rv.in{opacity:1;transform:none}
.ann{background:var(--c);color:var(--oc);text-align:center;font-size:12px;font-weight:700;padding:8px;letter-spacing:.06em}
nav{position:sticky;top:0;z-index:9;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--bd)}
nav .w{display:flex;align-items:center;justify-content:space-between;height:64px;gap:14px}
.lg{font-weight:800;font-family:'${hf}',${fb(hf)};display:flex;align-items:center;gap:9px;font-size:calc(var(--hs)*18px)}.lg i{width:30px;height:30px;border-radius:var(--r);background:var(--c);color:var(--oc);display:grid;place-items:center}.lg img{height:32px;border-radius:var(--r)}
.nl{display:flex;gap:24px;font-size:14px;color:var(--mu);font-weight:500}
.btn{display:inline-flex;gap:8px;align-items:center;background:var(--c);color:var(--oc);padding:13px 24px;border-radius:var(--r);font-weight:700;font-size:14px;border:2px solid var(--c);transition:.2s;font-family:'${bf}',${fb(bf)}}.btn:hover{transform:translateY(-2px)}
.bt-fill .btn{box-shadow:0 10px 24px color-mix(in srgb,var(--c) 38%,transparent)}.bt-outline .btn:not(.wh){background:transparent;color:var(--c);box-shadow:none}.bt-pill .btn{border-radius:99px}
.btn.o{background:transparent;color:var(--tx);border-color:var(--bd);box-shadow:none!important}.btn.wh{background:#fff;color:var(--c);border-color:#fff;box-shadow:none!important}.btn.sm{padding:8px 14px;font-size:12px}
.eb{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--c);font-family:'${bf}',${fb(bf)}}
section{padding:var(--sp) 0}section:nth-of-type(even){background:var(--bg2)}.sh{margin-bottom:34px}.sh h2{font-size:calc(var(--hs)*clamp(26px,4vw,38px));margin:8px 0}.sh p{color:var(--mu);max-width:540px}
.hero{padding:calc(var(--sp)*.9) 0 var(--sp);position:relative;overflow:hidden;background:radial-gradient(700px 300px at 85% -10%,color-mix(in srgb,var(--c) 26%,transparent),transparent 70%)}
.g2{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
h1{font-size:calc(var(--hs)*clamp(32px,5.4vw,56px));margin:14px 0}.hero p.l{color:var(--mu);font-size:17px;margin-bottom:26px;max-width:540px}.rw{display:flex;gap:12px;flex-wrap:wrap}
.ctr{text-align:center}.ctr .l,.ctr .rw{margin-inline:auto;justify-content:center}.wide{margin-top:36px}
.hero.bold{background:var(--c)!important;color:var(--oc)}.bold h1,.bold .l,.bold .eb{color:var(--oc)}.bold .btn{background:var(--oc);color:var(--c);border-color:var(--oc)}.bold .btn.o{background:transparent;color:var(--oc);border-color:var(--oc)}
.edit h1{font-size:calc(var(--hs)*clamp(46px,11vw,118px));line-height:.95}
.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}.bn{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.bn .cd:first-child{grid-column:span 2}
.cd{background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.3);overflow:hidden;transition:.25s}.cd:hover{transform:translateY(-4px)}
.sh-soft .cd{box-shadow:0 18px 40px rgba(0,0,0,.10)}.sh-hard .cd{border:2px solid var(--tx);box-shadow:6px 6px 0 var(--tx)}
.cd .im{background-size:cover;background-position:center;display:grid;place-items:center;color:#fff}.cd .bd{padding:18px}.cd h3{font-size:calc(var(--hs)*17px);margin-bottom:4px}.cd p{color:var(--mu);font-size:13px}
.pr{display:flex;justify-content:space-between;align-items:center;margin-top:14px;gap:8px}.pr b{color:var(--c);font-size:18px}
.stars{display:flex;gap:2px;color:#f59e0b;margin-bottom:8px}
.plate{position:relative;aspect-ratio:1;max-width:380px;margin:auto;width:100%;display:grid;place-items:center}.ring{position:absolute;border-radius:50%}
.r1{inset:0;background:conic-gradient(var(--c),color-mix(in srgb,var(--c2) 40%,#fff),var(--c));opacity:.22;animation:spin 20s linear infinite}
.r2{inset:13%;background:radial-gradient(circle at 30% 28%,color-mix(in srgb,var(--c) 65%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 55%,#000));box-shadow:0 30px 70px color-mix(in srgb,var(--c) 45%,transparent)}
.core{position:relative;color:var(--oc);animation:bob 5s ease-in-out infinite}
.chip{position:absolute;background:var(--bg);color:var(--tx);border-radius:var(--r);padding:9px 13px;font-size:12px;font-weight:700;box-shadow:0 14px 30px rgba(0,0,0,.22);display:flex;gap:7px;align-items:center;animation:bob 4s ease-in-out infinite}.chip svg{color:var(--c)}.c1{top:8%;left:-2%}.c2{bottom:10%;right:-2%;animation-delay:-2s}
.bw{max-width:460px;margin:auto;background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.2);box-shadow:0 30px 60px rgba(0,0,0,.2);overflow:hidden}.bwb{display:flex;gap:6px;align-items:center;padding:10px 14px;background:var(--bg2);border-bottom:1px solid var(--bd)}.bwb i{width:9px;height:9px;border-radius:50%;background:var(--bd)}.bwb span{margin-left:10px;font-size:11px;color:var(--mu)}
.bwc{padding:22px;display:grid;gap:10px}.bwc b{font-family:'${hf}',${fb(hf)};font-size:calc(var(--hs)*18px)}.l1,.l2{height:10px;border-radius:9px;background:var(--bd)}.l1{width:80%}.l2{width:55%}.bws{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.bws i{height:60px;border-radius:calc(var(--r)/1.5);background:linear-gradient(135deg,var(--c),var(--c2))}.bwbtn{justify-self:start;background:var(--c);color:var(--oc);font-size:12px;font-weight:700;padding:8px 14px;border-radius:var(--r)}
.stack{position:relative;height:300px;max-width:360px;margin:auto;width:100%}.mc{position:absolute;width:78%;background:var(--bg);border:1px solid var(--bd);border-radius:calc(var(--r)*1.4);padding:18px;box-shadow:0 24px 50px rgba(0,0,0,.16);display:grid;gap:8px;animation:bob 5s ease-in-out infinite}.m0{top:0;left:0}.m1{bottom:0;right:0;animation-delay:-2.5s}.ico{width:40px;height:40px;border-radius:var(--r);background:var(--c);color:var(--oc);display:grid;place-items:center}.pb{height:8px;border-radius:9px;background:var(--bg2);overflow:hidden}.pb i{display:block;height:100%;background:var(--c);border-radius:9px}.mc small{color:var(--mu)}
.scn{height:260px;border:3px solid var(--tx);overflow:hidden;border-radius:var(--r);box-shadow:8px 8px 0 var(--c)}.himg{aspect-ratio:1;max-width:400px;margin:auto;background-size:cover;background-position:center;border-radius:calc(var(--r)*1.6);box-shadow:0 30px 60px rgba(0,0,0,.25)}
.strip{overflow:hidden;background:var(--c);color:var(--oc);padding:13px 0}.trk2{display:flex;gap:26px;width:max-content;animation:mq 32s linear infinite;font-family:'${hf}',${fb(hf)};font-weight:700;font-size:15px;white-space:nowrap}
.mn{display:grid;gap:24px;max-width:740px}.mt{display:flex;align-items:baseline;gap:12px}.mt h3{font-size:calc(var(--hs)*19px)}.dots{flex:1;border-bottom:2px dotted var(--bd);transform:translateY(-4px)}.mt b{color:var(--c);font-size:18px}.mi p{color:var(--mu);font-size:14px;margin-top:2px}
.gl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.gl div{aspect-ratio:1;border-radius:var(--r);background-size:cover;background-position:center;display:grid;place-items:center;color:rgba(255,255,255,.6)}
.ab{display:grid;grid-template-columns:1.2fr .8fr;gap:34px;align-items:center}.abp{color:var(--mu);font-size:17px;line-height:1.8}.fl{display:grid;gap:12px}.fl div{display:flex;gap:10px;align-items:center;background:var(--bg2);border:1px solid var(--bd);border-radius:var(--r);padding:14px 16px;font-weight:600;font-size:14px}.fl svg{color:var(--c)}
.stp{padding:22px;border:1px solid var(--bd);border-radius:calc(var(--r)*1.3);background:var(--bg)}.stp b{font-family:'${hf}',${fb(hf)};font-size:calc(var(--hs)*26px);color:var(--c);display:block;margin-bottom:10px}.stp p{color:var(--mu);font-size:14px}
.q{color:var(--tx)!important;font-size:15px!important;margin-bottom:14px}.who{display:flex;gap:10px;align-items:center}.who i{width:34px;height:34px;border-radius:50%;background:var(--c);color:var(--oc);display:grid;place-items:center;font-style:normal;font-weight:800;font-size:14px}.who b{font-size:13px}
details{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:16px 20px;margin-bottom:10px}summary{cursor:pointer;font-weight:700;list-style:none;display:flex;justify-content:space-between}summary::after{content:"+";color:var(--c)}details[open] summary::after{content:"-"}details p{color:var(--mu);margin-top:8px;font-size:14px}
.ci{display:flex;gap:12px;align-items:center;background:var(--bg);border:1px solid var(--bd);border-radius:var(--r);padding:16px;font-size:14px}.ci svg{color:var(--c);flex:none}
.cta{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c2) 45%,#000))!important;color:#fff;text-align:center}.cta h2{font-size:calc(var(--hs)*clamp(26px,4vw,40px));margin-bottom:8px}.cta p{opacity:.9;margin-bottom:20px}.nw{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.fi{border:1.5px solid var(--bd);border-radius:var(--r);padding:12px 14px;color:var(--mu);font-size:14px;background:#fff;min-width:240px}
footer{padding:28px 0;font-size:12px;color:var(--mu);border-top:1px solid var(--bd)}footer .w{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.pxb .cd,.pxb .btn,.pxb .ci,.pxb .stp,.pxb details,.pxb .fl div,.pxb .bw,.pxb .mc,.pxb .himg{border-radius:0!important}
.pxb .cd,.pxb .stp,.pxb .ci,.pxb details,.pxb .bw,.pxb .mc{border:3px solid var(--tx)!important;box-shadow:6px 6px 0 var(--tx)!important}
.pxbtn .btn{border-radius:0!important;border:3px solid #000;box-shadow:inset -4px -4px 0 rgba(0,0,0,.25),0 4px 0 #000!important}.pxbtn .btn:active{transform:translateY(4px);box-shadow:inset -4px -4px 0 rgba(0,0,0,.25),0 0 0 #000!important}
.pxg{background-image:linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px);background-size:24px 24px}
.pxs::after{content:"";position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(0,0,0,.07) 2px 3px);pointer-events:none;z-index:50}
.pxd .eb::before{content:"";display:inline-block;width:10px;height:10px;background:var(--c);margin-right:18px;box-shadow:12px 0 0 var(--c2)}
@keyframes mq{to{transform:translateX(-50%)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes bob{50%{transform:translateY(-9px)}}
@media(max-width:760px){.g2,.ab{grid-template-columns:1fr}.nl{display:none}.stack{height:260px}.plate{max-width:260px}.bn{grid-template-columns:1fr}.bn .cd:first-child{grid-column:auto}}`;
  const imgBox = (it, i, h) => it[3] ? `<div class="im" style="background-image:url(${it[3]});height:${h}px"></div>` : `<div class="im" style="background:${grad(i)};height:${h}px">${S(t.i, 38)}</div>`;
  const itemCard = (it, i, h) => `<div class="cd rv" style="--d:${(i % 3) * .08}s">${imgBox(it, i, h)}<div class="bd"><h3>${E(it[0])}</h3><p>${E(it[1])}</p><div class="pr"><b>${E(it[2])}</b><a class="btn sm">${E(t.btn)}</a></div></div></div>`;
  const items = w.istyle === "list" ? `<div class="mn">${w.items.map((it, i) => `<div class="mi rv" style="--d:${i * .08}s"><div class="mt"><h3>${E(it[0])}</h3><i class="dots"></i><b>${E(it[2])}</b></div><p>${E(it[1])}</p></div>`).join("")}</div>` : w.istyle === "bento" ? `<div class="bn">${w.items.map((it, i) => itemCard(it, i, i ? 110 : 200)).join("")}</div>` : `<div class="g">${w.items.map((it, i) => itemCard(it, i, 130)).join("")}</div>`;
  const artP = () => `<div class="plate"><i class="ring r1"></i><i class="ring r2"></i><div class="core">${S(t.i, 96)}</div><div class="chip c1">${S("check", 14)}${E(t.chip1)}</div><div class="chip c2">${S("star", 14, 'fill="currentColor"')}${E(t.chip2)}</div></div>`;
  const artB = () => `<div class="bw"><div class="bwb"><i></i><i></i><i></i><span>${slug}.com</span></div><div class="bwc"><b>${nm}</b><div class="l1"></div><div class="l2"></div><div class="bws"><i></i><i></i><i></i></div><div class="bwbtn">${cta}</div></div></div>`;
  const artC = () => `<div class="stack">${w.items.slice(0, 2).map((it, i) => `<div class="mc m${i}"><div class="ico">${S(t.i, 22)}</div><b>${E(it[0])}</b><div class="pb"><i style="width:${i ? 45 : 72}%"></i></div><small>${E(it[2])}</small></div>`).join("")}</div>`;
  const artS = () => `<div class="scn">${pxScene(112, 40, c, c2)}</div>`;
  const art = { plate: artP, browser: artB, cards: artC, scene: artS, image: () => w.himg ? `<div class="himg" style="background-image:url(${w.himg})"></div>` : artP() }[w.art] || artP;
  const txt = cls => `<div class="rv ${cls || ""}"><div class="eb">${E(w.eyebrow || t.eb)}</div><h1>${nm}</h1><p class="l">${tag}</p><div class="rw"><a class="btn">${cta}</a><a class="btn o">${cta2}</a></div></div>`;
  const HERO = {
    split: () => `<header class="hero"><div class="w g2">${txt()}<div class="rv" style="--d:.15s">${art()}</div></div></header>`,
    center: () => `<header class="hero"><div class="w">${txt("ctr")}<div class="rv wide" style="--d:.15s">${art()}</div></div></header>`,
    editorial: () => `<header class="hero edit"><div class="w">${txt()}</div></header><div class="strip"><div class="trk2">${Array(8).fill(`<span>${nm}</span><span>·</span><span>${E(t.sec)}</span><span>·</span>`).join("")}</div></div>`,
    cards: () => `<header class="hero"><div class="w g2">${txt()}<div class="rv" style="--d:.15s">${artC()}</div></div></header>`,
    bold: () => `<header class="hero bold"><div class="w g2">${txt()}<div class="rv" style="--d:.15s">${artP()}</div></div></header>`,
    scene: () => `<header class="hero"><div class="w">${txt("ctr")}</div><div class="w rv" style="--d:.15s;margin-top:34px">${artS()}</div></header>`
  };
  const head = (eb, h, p) => `<div class="sh"><div class="eb">${eb}</div><h2>${h}</h2>${p ? `<p>${p}</p>` : ""}</div>`;
  const sec = (id, inner) => `<section id="s-${id}"><div class="w">${inner}</div></section>`;
  const ci = (i2, x) => `<div class="ci rv">${S(i2, 20)}<span>${E(x)}</span></div>`;
  const imgs = (w.imgs || []).slice(0, w.galN), gn = imgs.length || w.galN;
  const SEC = {
    items: () => sec("items", head(E(t.eb), E(w.secT || t.sec), E(w.secS || t.subsec)) + items),
    gal: () => sec("gal", head("Galería", "Un vistazo a lo que hacemos") + `<div class="gl">${Array.from({ length: gn }, (_, i) => imgs[i] ? `<div class="rv" style="--d:${(i % 3) * .08}s;background-image:url(${imgs[i]})"></div>` : `<div class="rv" style="--d:${(i % 3) * .08}s;background:${grad(i)}">${S(t.i, 26)}</div>`).join("")}</div>`),
    about: () => sec("about", `<div class="ab"><div class="rv">${head("Nosotros", "Sobre nosotros")}<p class="abp">${E(w.about)}</p></div><div class="fl rv" style="--d:.12s">${(w.points || []).filter(Boolean).map(p => `<div>${S("check", 18)}${E(p)}</div>`).join("")}</div></div>`),
    steps: () => sec("steps", head("Proceso", "Cómo trabajamos") + `<div class="g">${(w.steps || []).map((s, i) => `<div class="stp rv" style="--d:${i * .1}s"><b>0${i + 1}</b><h3>${E(s[0])}</h3><p>${E(s[1])}</p></div>`).join("")}</div>`),
    rev: () => sec("rev", head("Reseñas", "Lo que dicen nuestros clientes", "Opiniones de personas que ya confiaron en nosotros.") + `<div class="g">${(w.revs || []).map((r, i) => `<div class="cd rv" style="--d:${i * .1}s"><div class="bd"><div class="stars">${stars}</div><p class="q">${E(r[1])}</p><div class="who"><i>${E((r[0] || "?").trim().charAt(0).toUpperCase())}</i><b>${E(r[0])}</b></div></div></div>`).join("")}</div>`),
    faq: () => sec("faq", head("FAQ", "Preguntas frecuentes") + `<div style="max-width:760px">${(w.faq || []).map((f, i) => `<details class="rv"><summary>${E(f[0])}</summary><p>${E(f[1] || (i === 1 ? w.hours : i === 2 ? w.addr : "Escríbenos y con gusto te ayudamos."))}</p></details>`).join("")}</div>`),
    contact: () => sec("contact", head("Contacto", "Visítanos o escríbenos", "Estamos para ayudarte.") + `<div class="g">${[w.hours && ci("clock", w.hours), w.addr && ci("pin", w.addr), w.mail && ci("mail", w.mail), w.phone && ci("call", w.phone), ig && ci("ig", "@" + ig), tt && ci("tt", "@" + tt)].filter(Boolean).join("")}</div>`),
    cta: () => `<section class="cta"><div class="w"><h2>${cta}</h2><p>${tag}</p><a class="btn wh">${cta}</a></div></section>`,
    news: () => `<section class="cta"><div class="w"><h2>Recibe novedades</h2><p>Suscríbete y entérate primero.</p><div class="nw"><div class="fi">tu@correo.com</div><a class="btn wh">Suscribirme</a></div></div></section>`,
    custom: () => sec("custom", head("Destacado", E(w.cTitle)) + `<p class="abp rv">${E(w.cText)}</p>`)
  };
  const main = (w.secs || []).filter(s => s.on && SEC[s.id]).map(s => SEC[s.id]()).join("");
  const cls = `${w.pxb ? "pxb " : ""}${w.pxbtn ? "pxbtn " : ""}${w.pxg ? "pxg " : ""}${w.pxs ? "pxs " : ""}${w.pxd ? "pxd " : ""}sh-${w.shadow || "soft"} bt-${w.btn || "fill"}`;
  const navH = `<nav><div class="w"><div class="lg">${w.logo ? `<img src="${w.logo}" alt="">` : `<i>${S(t.i, 16)}</i>`}${nm}</div><div class="nl"><a href="#s-items">${E(w.secT || t.sec)}</a><a href="#s-contact">Contacto</a></div><a class="btn sm">${cta}</a></div></nav>`;
  const js = 'document.documentElement.className="js";addEventListener("DOMContentLoaded",function(){var els=document.querySelectorAll(".rv");if(!window.IntersectionObserver){els.forEach(function(e){e.classList.add("in")});return}var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}})},{threshold:.1});els.forEach(function(e){o.observe(e)})})';
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(w.seoT || w.name)}</title><meta name="description" content="${E(w.seoD || w.tag)}"><link href="https://fonts.googleapis.com/css2?family=${fams}&display=swap" rel="stylesheet"><style>${css}</style></head><body class="${cls}"><script>${js}</script>${w.ann ? `<div class="ann">${E(w.ann)}</div>` : ""}${navH}${(HERO[w.hero] || HERO.split)()}${main}<footer><div class="w"><span>${E(w.foot || ("© " + new Date().getFullYear() + " " + (w.name || "")))}</span><span>Hecho con PixelForge</span></div></footer></body></html>`;
}

/* ---------- INTERFAZ DEL CONSTRUCTOR V3 ---------- */
function shrink(file, max) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => { const im = new Image(); im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)), cv = document.createElement("canvas"); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); res(cv.toDataURL("image/jpeg", .72)); }; im.onerror = () => res(null); im.src = r.result; };
    r.onerror = () => res(null); r.readAsDataURL(file);
  });
}
PF.upload = function (path, max, multi) {
  const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; if (multi) i.multiple = true;
  i.onchange = async () => {
    const files = Array.from(i.files); if (!files.length) return;
    const outs = []; for (const f of files) { const u = await shrink(f, max || 700); if (u) outs.push(u); }
    if (!outs.length) { toast("No se pudo leer la imagen"); return; }
    if (path === "imgs") setW("imgs", (W.imgs || []).concat(outs).slice(0, 9)); else setW(path, outs[0]);
    if (JSON.stringify(W).length > 1500000) toast("Tus imágenes ocupan mucho espacio. Usa menos o más pequeñas.");
  };
  i.click();
};
PF.pal = i => { W.color = PAL[i][1]; W.color2 = PAL[i][2]; renderWiz(); schedPrev(); saveW(); };
PF.mv = (i, d) => { const j = i + d; if (j < 0 || j >= W.secs.length) return; const a = W.secs; [a[i], a[j]] = [a[j], a[i]]; renderWiz(); schedPrev(); saveW(); };
PF.addItem = () => { if (W.items.length < 6) { W.items.push(["Nuevo elemento", "Describe aquí lo que ofreces.", "$0", ""]); renderWiz(); schedPrev(); saveW(); } };
PF.delItem = i => { if (W.items.length > 1) { W.items.splice(i, 1); renderWiz(); schedPrev(); saveW(); } };
PF.surprise = () => {
  const p = PAL[Math.random() * PAL.length | 0], H = ["Inter", "Playfair Display", "Space Grotesk", "DM Serif Display", "Poppins", "Outfit", "Bebas Neue"], L = ["split", "center", "editorial", "cards", "bold", "scene"];
  Object.assign(W, { color: p[1], color2: p[2], hf: H[Math.random() * H.length | 0], hero: L[Math.random() * L.length | 0], dark: Math.random() < .4, radius: [0, 8, 14, 24][Math.random() * 4 | 0], pxb: Math.random() < .3, pxd: Math.random() < .5, bg: "" });
  renderWiz(); schedPrev(); saveW();
};
PF.retro = () => {
  Object.assign(W, { hf: "Press Start 2P", bf: "Inter", radius: 0, btn: "fill", shadow: "hard", pxb: true, pxg: true, pxs: true, pxbtn: true, pxd: true, hero: "scene", dark: true, color: "#22c55e", color2: "#a855f7", bg: "" });
  renderWiz(); schedPrev(); saveW(); toast("Modo retro total activado");
};
const tog = (p, v, l) => `<label class="opt" style="margin:6px 0"><input type="checkbox" ${v ? "checked" : ""} onchange="setW('${p}',this.checked)">${l}</label>`;
const rng = (l, p, v, a, b) => `<label class="f">${l}: <b>${v}</b></label><input type="range" min="${a}" max="${b}" value="${v}" oninput="setW('${p}',+this.value,1);this.previousElementSibling.querySelector('b').textContent=this.value">`;
const upl = (l, p, v, max) => `<label class="f">${l}</label><div class="row left"><button class="btn" onclick="PF.upload('${p}',${max})">${ic("plus")} Subir imagen</button>${v ? `<img src="${v}" alt="" style="height:44px;border-radius:6px;border:2px solid var(--border)"><button class="btn danger" onclick="setW('${p}','')">Quitar</button>` : ""}</div>`;
const sel = (l, p, list, cur) => `<label class="f">${l}</label><select class="in" onchange="setW('${p}',this.value)">${list.map(f => `<option ${cur === f ? "selected" : ""}>${f}</option>`).join("")}</select>`;
const PANES = {
  1: () => `<div class="tpls">${Object.entries(TPL).map(([k, t]) => `<button class="tpl ${W.tpl === k ? "on" : ""}" onclick="pickTpl('${k}')">${ic(t.i)}<span>${t.n}</span></button>`).join("")}</div><div class="row left" style="margin-top:12px"><button class="btn" onclick="PF.surprise()">${ic("zap")} Sorpréndeme</button></div><p class="note">Elige una plantilla como punto de partida. Después puedes cambiar absolutamente todo.</p>`,
  2: () => fld("Nombre", "name", W.name, { max: 32 }) + fld("Etiqueta sobre el título", "eyebrow", W.eyebrow, { max: 30 }) + fld("Frase principal", "tag", W.tag, { area: 1, max: 140 }) + fld("Botón principal", "cta", W.cta, { max: 28 }) + fld("Botón secundario", "cta2", W.cta2, { max: 24 }) + fld("Barra de anuncio (opcional)", "ann", W.ann, { max: 70, ph: "Envío gratis en compras mayores a $999" }) + upl("Logo (opcional)", "logo", W.logo, 200),
  3: () => `<label class="f">Paletas</label><div class="pal">${PAL.map((p, i) => `<button class="${W.color === p[1] && W.color2 === p[2] ? "on" : ""}" onclick="PF.pal(${i})"><i style="background:${p[1]}"></i><i style="background:${p[2]}"></i>${p[0]}</button>`).join("")}</div><label class="f">Color principal</label><input class="in" type="color" value="${W.color}" oninput="setW('color',this.value,1)"><label class="f">Color secundario</label><input class="in" type="color" value="${W.color2}" oninput="setW('color2',this.value,1)"><label class="f">Modo</label>${seg("dark", [[false, "Claro"], [true, "Oscuro"]], W.dark)}<label class="f">Color de fondo personalizado</label><div class="row left"><input class="in" style="max-width:120px" type="color" value="${/^#[0-9a-f]{6}$/i.test(W.bg) ? W.bg : (W.dark ? "#0b1020" : "#ffffff")}" oninput="setW('bg',this.value,1)"><button class="btn" onclick="setW('bg','')">Automático</button></div>`,
  4: () => sel("Letra de títulos", "hf", HF, W.hf) + sel("Letra de textos", "bf", BF, W.bf) + rng("Redondeo de esquinas", "radius", W.radius, 0, 32) + `<label class="f">Botones</label>${seg("btn", [["fill", "Relleno"], ["outline", "Contorno"], ["pill", "Píldora"]], W.btn)}<label class="f">Sombras</label>${seg("shadow", [["none", "Ninguna"], ["soft", "Suave"], ["hard", "Dura"]], W.shadow)}<label class="f">Espaciado</label>${seg("dens", [["compact", "Compacto"], ["normal", "Normal"], ["airy", "Amplio"]], W.dens)}`,
  5: () => `<label class="f">Diseño de portada</label>${seg("hero", [["split", "Dividida"], ["center", "Centrada"], ["editorial", "Editorial"], ["cards", "Tarjetas"], ["bold", "Impacto"], ["scene", "Escena pixel"]], W.hero)}<label class="f">Ilustración (en Dividida y Centrada)</label>${seg("art", [["plate", "Círculo"], ["browser", "Navegador"], ["cards", "Tarjetas"], ["scene", "Escena pixel"], ["image", "Mi imagen"]], W.art)}${upl("Imagen de portada", "himg", W.himg, 900)}`,
  6: () => `<p class="note">Combina lo profesional con el pixel art. Activa lo que quieras:</p>${tog("pxb", W.pxb, "Bordes pixel y sombras duras")}${tog("pxbtn", W.pxbtn, "Botones 8 bits")}${tog("pxg", W.pxg, "Cuadrícula pixel de fondo")}${tog("pxs", W.pxs, "Líneas de pantalla retro (scanlines)")}${tog("pxd", W.pxd, "Adornos pixel en los títulos")}<div class="row left" style="margin-top:12px"><button class="btn primary" onclick="PF.retro()">${ic("gamepad")} Modo retro total</button></div>`,
  7: () => `<p class="note">Activa, oculta y ordena las secciones como quieras.</p>${W.secs.map((s, i) => `<div class="srow"><label><input type="checkbox" ${s.on ? "checked" : ""} onchange="setW('secs.${i}.on',this.checked)">${SECN[s.id]}</label><span class="mv"><button onclick="PF.mv(${i},-1)" aria-label="Subir">${ic("up")}</button><button onclick="PF.mv(${i},1)" aria-label="Bajar" style="transform:rotate(180deg)">${ic("up")}</button></span></div>`).join("")}` + (W.secs.some(s => s.id === "custom" && s.on) ? fld("Título de tu sección", "cTitle", W.cTitle, { max: 50 }) + fld("Texto", "cText", W.cText, { area: 1, max: 400 }) : ""),
  8: () => fld("Título de la sección", "secT", W.secT, { max: 40 }) + fld("Subtítulo", "secS", W.secS, { max: 100 }) + `<label class="f">Estilo</label>${seg("istyle", [["cards", "Tarjetas"], ["list", "Menú"], ["bento", "Bento"]], W.istyle)}` + W.items.map((it, i) => `<div class="ig3"><b>Elemento ${i + 1}</b>${fld("Título", `items.${i}.0`, it[0], { max: 40 })}${fld("Descripción", `items.${i}.1`, it[1], { max: 90 })}${fld("Precio", `items.${i}.2`, it[2], { max: 18 })}${upl("Foto (opcional)", `items.${i}.3`, it[3] || "", 600)}${W.items.length > 1 ? `<button class="btn danger" style="margin-top:8px" onclick="PF.delItem(${i})">Quitar</button>` : ""}</div>`).join("") + (W.items.length < 6 ? `<div class="row left" style="margin-top:12px"><button class="btn" onclick="PF.addItem()">${ic("plus")} Agregar elemento</button></div>` : ""),
  9: () => `<label class="f">Espacios de galería</label>${seg("galN", [[3, "3"], [6, "6"], [9, "9"]], W.galN)}<div class="row left" style="margin-top:12px"><button class="btn" onclick="PF.upload('imgs',640,true)">${ic("plus")} Subir fotos</button>${(W.imgs || []).length ? `<button class="btn danger" onclick="setW('imgs',[])">Quitar fotos</button>` : ""}</div><p class="note">${(W.imgs || []).length} foto(s). Sin fotos se muestran espacios de ejemplo.</p>` + W.revs.map((r, i) => `<div class="ig3"><b>Reseña ${i + 1}</b>${fld("Nombre", `revs.${i}.0`, r[0], { max: 30 })}${fld("Opinión", `revs.${i}.1`, r[1], { area: 1, max: 140 })}</div>`).join("") + `<p class="note">Usa opiniones reales de tus clientes.</p>`,
  10: () => fld("Sobre nosotros", "about", W.about, { area: 1, max: 400 }) + W.points.map((p, i) => fld("Punto destacado " + (i + 1), `points.${i}`, p, { max: 40 })).join("") + W.steps.map((s, i) => `<div class="ig3"><b>Paso ${i + 1}</b>${fld("Título", `steps.${i}.0`, s[0], { max: 30 })}${fld("Descripción", `steps.${i}.1`, s[1], { max: 80 })}</div>`).join("") + W.faq.map((f, i) => `<div class="ig3"><b>Pregunta ${i + 1}</b>${fld("Pregunta", `faq.${i}.0`, f[0], { max: 70 })}${fld("Respuesta", `faq.${i}.1`, f[1], { area: 1, max: 160, ph: "(vacía: se usa tu horario o dirección)" })}</div>`).join(""),
  11: () => fld("Horario", "hours", W.hours, { max: 60 }) + fld("Dirección o zona", "addr", W.addr, { max: 80 }) + fld("Correo", "mail", W.mail, { type: "email", ph: "hola@tunegocio.com" }) + fld("Teléfono", "phone", W.phone, { ph: "+52 000 000 0000" }) + fld("Instagram", "ig", W.ig, { ph: "tunegocio" }) + fld("TikTok", "tt", W.tt, { ph: "tunegocio" }) + fld("Texto del pie de página", "foot", W.foot, { max: 80, ph: "© 2026 Tu negocio" }),
  12: () => `<label class="f">Título en Google</label><input class="in" maxlength="60" value="${esc(W.seoT)}" placeholder="${esc(W.name + " | " + TPL[W.tpl].eb)}" oninput="setW('seoT',this.value,1);updSeo()"><label class="f">Descripción en Google</label><textarea class="in" rows="3" maxlength="160" oninput="setW('seoD',this.value,1);updSeo()">${esc(W.seoD)}</textarea><div class="snip"><b id="sT"></b><small>${esc((q("#furl") && q("#furl").textContent) || "tu-marca.com")}</small><p id="sD"></p></div><div class="chk">${STEPS12.slice(0, 11).map((x, i) => `<div class="st ${W.done > i ? "done" : ""}">${ic(W.done > i ? "check" : "lock")} ${i + 1}. ${x[0]}</div>`).join("")}</div><div class="row left" style="margin-top:16px"><button class="btn primary" onclick="publishW(false)">${ic("download")} Descargar mi web</button><button class="btn" onclick="publishW(true)">${ic("globe")} Publicar en mi dominio</button></div><p class="note">Con tu cuenta gratis diseñas y guardas los 12 pasos. Descargar el código y publicar son parte de los planes de pago.</p>`
};
function renderWiz3() {
  const s = W.step, cap = stepCap();
  q("#wgrid").innerHTML = STEPS12.map((x, i) => { const n = i + 1; return `<button class="wb ${s === n ? "on" : ""} ${W.done >= n ? "done" : ""}" onclick="wizGo(${n})" title="${x[0]}">${n > cap ? ic("lock") : n}</button>`; }).join("");
  q("#prog").style.width = (W.done / 12 * 100) + "%"; q("#progTxt").textContent = `${W.done} de 12 pasos completados`;
  q("#wpane").innerHTML = `<h3 style="font-size:14px">Paso ${s} de 12: ${STEPS12[s - 1][0]}</h3><p class="note" style="margin-top:4px">${STEPS12[s - 1][1]}</p>` + (PANES[s] ? PANES[s]() : "");
  q("#wnav").innerHTML = (s > 1 ? `<button class="btn" onclick="wizGo(${s - 1})">${ic("arrowl")} Atrás</button>` : "") + (s < 12 ? `<button class="btn primary" onclick="nextStep()">Siguiente ${ic("arrow")}</button>` : "");
  if (s === 12) updSeo(); wizInfo();
}
function pickTpl3(k) {
  const keep = {}; ["hf", "bf", "radius", "btn", "shadow", "dens", "hero", "art", "pxb", "pxg", "pxs", "pxbtn", "pxd", "dark", "logo", "himg", "imgs"].forEach(x => keep[x] = W[x]);
  W = newW3(k, Object.assign(keep, { step: W.step, done: W.done, dev: W.dev }));
  renderWiz(); schedPrev(); saveW();
}

/* ---------- EJEMPLOS (8 plantillas) ---------- */
function ex3() {
  q("#exGrid").innerHTML = PRESETS.map(([k, o], i) => { const w = newW3(k, o); return `<div class="card ex reveal"><div class="thumb"><iframe loading="lazy" sandbox="allow-scripts" tabindex="-1" title="${esc(w.name)}" srcdoc="${esc(pv3(w))}"></iframe></div><h3 style="margin-top:14px">${esc(w.name)}</h3><p>${esc(TPL[k].n)}</p><button class="btn" style="margin-top:12px" onclick="usePreset(${i})">Usar esta plantilla</button></div>`; }).join("");
  obs("#exGrid .card");
  requestAnimationFrame(scaleThumbs);
}
function builder() {
  const defs = q("svg defs");
  if (defs) defs.insertAdjacentHTML("beforeend", Object.keys(EXI).map(k => `<symbol id="i-${k}" viewBox="0 0 24 24">${EXI[k]}</symbol>`).join(""));
  Object.assign(IP, EXI);
  addTemplates();
  STEPS12.splice(0, 12, ["Plantilla", "Elige un punto de partida"], ["Marca", "Nombre, frases, botones y logo"], ["Colores", "Paletas o tus propios colores"], ["Letra y formas", "Tipografías, esquinas, botones y sombras"], ["Portada", "Diseño, ilustración e imagen"], ["Pixel", "Mezcla profesional con pixel art"], ["Secciones", "Activa, oculta y reordena"], ["Productos", "Hasta 6, con fotos"], ["Galería y reseñas", "Tus fotos y opiniones"], ["Contenido", "Historia, puntos, pasos y preguntas"], ["Contacto", "Horario, correo, teléfono y redes"], ["SEO y publicar", "Google, descarga y publicación"]);
  PRESETS.splice(0, PRESETS.length,
    ["cafe", { color: "#b45309", color2: "#f59e0b", hf: "DM Serif Display", hero: "split", art: "plate", istyle: "list", radius: 18 }],
    ["tienda", { color: "#0ea5e9", color2: "#6366f1", dark: true, hf: "Space Grotesk", hero: "split", art: "browser", istyle: "bento", radius: 16, btn: "pill" }],
    ["serv", { color: "#0f766e", color2: "#22d3ee", hf: "Poppins", hero: "cards", radius: 12, secs: newW3("serv").secs.map(s => s.id === "steps" ? { id: "steps", on: true } : s) }],
    ["port", { color: "#a855f7", color2: "#ec4899", dark: true, hf: "Press Start 2P", hero: "editorial", radius: 0, pxb: true, pxd: true, pxs: true, shadow: "hard" }],
    ["edu", { color: "#2563eb", color2: "#22d3ee", hf: "Outfit", hero: "center", art: "cards", radius: 20 }],
    ["gym", { color: "#ef4444", color2: "#f59e0b", dark: true, hf: "Bebas Neue", hero: "bold", radius: 4, shadow: "hard" }],
    ["musica", { color: "#ec4899", color2: "#a855f7", dark: true, hf: "Silkscreen", hero: "scene", pxd: true, pxbtn: true, radius: 0 }],
    ["juego", { color: "#22c55e", color2: "#a855f7", dark: true, hf: "Press Start 2P", hero: "scene", radius: 0, pxb: true, pxg: true, pxs: true, pxbtn: true, pxd: true, shadow: "hard" }]
  );
  window.newW = newW3; window.pvHTML = pv3; window.renderWiz = renderWiz3; window.pickTpl = pickTpl3; window.renderEx = ex3;
  ["#prev", "#pvFull"].forEach(s => { const f = q(s); if (f) f.setAttribute("sandbox", "allow-scripts"); });
  const sub = q("#probar .sub"); if (sub) sub.textContent = "12 pasos con libertad total: 13 plantillas, tus colores, tus letras, tus fotos y mezcla de pixel art. Con tu cuenta gratis haces 5 pasos hoy y 7 mañana. Para descargar y publicar necesitas un plan.";
  const sub2 = q("#ejemplos .sub"); if (sub2) sub2.textContent = "Ocho webs terminadas, hechas con nuestro constructor. Elige una y cámbialo todo: colores, letras, secciones, fotos y estilo pixel.";
  loadW(); renderWiz(); schedPrev(); ex3();
}

/* ---------- ARRANQUE ---------- */
function boot() { [css, strip, pixIcons, ventaja, builder].forEach(f => { try { f(); } catch (e) { console.warn("mejoras:", f.name, e); } }); }
if (document.readyState === "complete") boot(); else addEventListener("load", boot);
})();
