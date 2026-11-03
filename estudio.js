/* estudio.js · PixelForge · pixeleo duro, generador de plantillas, simulador, ventaja y QR
   Línea en index.html (debajo de las otras): <script defer src="estudio.js"></script> */
const DATOS = { email: "pixelforge.cb@outlook.com", instagram: "pixellforge.cb", tiktok: "", phone: "" };
(function () {
"use strict";
const q = s => document.querySelector(s), qa = s => Array.from(document.querySelectorAll(s));
const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
try { Object.keys(DATOS).forEach(k => { if (DATOS[k] && !CONFIG.SOCIAL[k]) CONFIG.SOCIAL[k] = DATOS[k]; }); } catch (e) {}
const EST = window.EST = {};

/* ---------- SPRITES PIXEL ---------- */
const PAL = { y: "#fbbf24", o: "#fb923c", d: "#9a3412", w: "#ffffff", k: "#120a24", r: "#ef4444" };
const BOT = ["......yy......", "......yy......", "..oooooooooo..", ".oooooooooooo.", ".ooowwooowwooo", ".ooowkooowkooo", ".oooooooooooo.", ".oooodddddoooo", "..oooooooooo..", "...dddddddd...", "..oooooooooo..", ".oo.oooooo.oo.", ".oo.dddddd.oo.", "ddd........ddd"];
const COIN = ["..yyyy..", ".yyyyyy.", "yyyoyyyy", "yyyoyyyy", "yyyoyyyy", "yyyoyyyy", ".yyyyyy.", "..yyyy.."];
const HEART = [".rr...rr.", "rrrr.rrrr", "rrrrrrrrr", "rrrrrrrrr", ".rrrrrrr.", "..rrrrr..", "...rrr...", "....r...."];
const STAR = ["....y....", "....y....", "...yyy...", "yyyyyyyyy", ".yyyyyyy.", "..yyyyy..", "..yyyyy..", ".yyy.yyy.", ".yy...yy."];
function spr(rows, s) {
  let r = "";
  rows.forEach((row, y) => { let x = 0; while (x < row.length) { const ch = row[x]; if (ch === ".") { x++; continue; } let n = 1; while (row[x + n] === ch) n++; r += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${PAL[ch]}"/>`; x += n; } });
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" width="${rows[0].length * s}" height="${rows.length * s}">${r}</svg>`;
}
function scene(C, R) {
  const sky = ["#1e1040", "#3b1a74", "#7e22a3", "#d6409f", "#fb923c"], far = "#4a1a70", near = "#2a0f45", gr = "#8a3a14", sun = "#fde68a";
  const rnd = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return v - Math.floor(v); };
  const sx = Math.round(C * .7), sy = Math.round(R * .5), sr = Math.round(R * .2);
  const hF = x => Math.round(R * .66 + Math.sin(x / 6) * R * .1 + Math.sin(x / 2.7) * R * .04), hN = x => Math.round(R * .84 + Math.sin(x / 4 + 2) * R * .05);
  const col = (x, y) => { if (y >= R - 2) return (x % 4 < 2) ? "#5a240c" : gr; if (y >= hN(x)) return near; if (y >= hF(x)) return far; if ((x - sx) ** 2 + (y - sy) ** 2 <= sr * sr) return sun; if (y < R * .45 && rnd(x, y) > .985) return "#fff"; return sky[Math.min(4, Math.floor(y / R * 5))]; };
  let o = ""; for (let y = 0; y < R; y++) { let x = 0; while (x < C) { const k = col(x, y); let n = 1; while (x + n < C && col(x + n, y) === k) n++; o += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${k}"/>`; x += n; } }
  return `<svg viewBox="0 0 ${C} ${R}" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" style="width:100%;height:100%;display:block">${o}</svg>`;
}

/* ---------- CSS: PIXELEO DURO ---------- */
function css() {
  const s = document.createElement("style"); s.id = "pf-estudio";
  s.textContent = `
:root{--pxb:#fff4e0}[data-theme="light"]{--pxb:#1b1030}
h1,h2{font-family:'Press Start 2P',monospace!important;text-shadow:3px 3px 0 #000;line-height:1.45}
.hero h1{font-size:clamp(20px,4vw,40px)!important}.sec h2{font-size:clamp(14px,2.3vw,23px)!important}
.card,.stat,.cmp,.soc-i,.codewin,details,.item,.palbox,.paybox,.auth,#chat{border:none!important;border-radius:0!important;box-shadow:0 -4px 0 var(--pxb),0 4px 0 var(--pxb),-4px 0 0 var(--pxb),4px 0 0 var(--pxb),10px 10px 0 rgba(0,0,0,.55)!important}
.card{margin:4px}.codewin{margin:4px}
.btn,.icon-btn,.seg2 button,.sg button,.tpl,.wb,.tag,.badge{border-radius:0!important}
.btn{border:none!important;box-shadow:inset -4px -4px 0 rgba(0,0,0,.35),inset 4px 4px 0 rgba(255,255,255,.22),0 -4px 0 #000,0 4px 0 #000,-4px 0 0 #000,4px 0 0 #000!important}
.btn:active{transform:translateY(4px)!important}
.pxscene{height:190px;position:relative;overflow:hidden;border-block:4px solid #000;background:#1e1040}
.pxscene .coins{position:absolute;top:26%;left:50%;transform:translateX(-50%);display:flex;gap:18px}
.pxscene .coins span{animation:pfc 1s steps(4) infinite alternate}@keyframes pfc{to{transform:translateY(-8px)}}
.pxscene .spr{position:absolute;bottom:14px;left:0;animation:pfw2 20s linear infinite}@keyframes pfw2{from{margin-left:-80px}to{margin-left:100%}}
.rcol{position:relative;margin-bottom:84px}
.mas{position:absolute;right:-6px;bottom:-84px;z-index:3;display:flex;flex-direction:column;align-items:flex-end}
.bub{background:#120a24;color:#fff4e0;font-family:'Silkscreen',monospace;font-size:13px;padding:8px 12px;margin-bottom:8px;box-shadow:0 -3px 0 #fff4e0,0 3px 0 #fff4e0,-3px 0 0 #fff4e0,3px 0 0 #fff4e0}
.botw{animation:pfb 1.2s steps(2) infinite}@keyframes pfb{50%{transform:translateY(-6px)}}
.mas .fl{position:absolute;animation:pfb 1.6s steps(3) infinite}.f1{left:-30px;top:26px}.f2{left:-6px;bottom:90px}.f3{right:-24px;top:34px}
#rpg{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);width:min(720px,calc(100vw - 28px));z-index:400}
.rp{display:flex;gap:14px;background:#120a24;color:#fff4e0;padding:16px;box-shadow:0 -4px 0 #fff4e0,0 4px 0 #fff4e0,-4px 0 0 #fff4e0,4px 0 0 #fff4e0,10px 10px 0 rgba(0,0,0,.6)}
.rpp{background:#3b1a74;padding:8px;flex:none;align-self:flex-start;box-shadow:0 0 0 4px #fff4e0}
.rpt b{font-family:'Press Start 2P',monospace;font-size:10px;color:#fb923c}.rpt p{font-family:'Silkscreen',monospace;font-size:17px;margin:8px 0;min-height:56px}.rpb{display:flex;gap:10px;flex-wrap:wrap}
.vt .card h3{font-size:12px!important}.cmp .r span:nth-child(2){font-weight:700}
.tpls{grid-template-columns:repeat(2,1fr)}
.qr img,.qr canvas{width:170px!important;height:170px!important}
@keyframes pfdraw{to{stroke-dashoffset:0}}
#conecta .two{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
`;
  document.head.appendChild(s);
}

/* ---------- PORTADA: paisaje + monedas + mascota ---------- */
function banner() {
  const old = q(".pxscene"); if (old) old.remove();
  const m = q(".marq"); if (!m) return;
  const d = document.createElement("div"); d.className = "pxscene";
  d.innerHTML = scene(96, 26) + `<div class="coins">${[0, 1, 2, 3, 4].map(i => `<span style="animation-delay:${i * .15}s">${spr(COIN, 5)}</span>`).join("")}</div><span class="spr">${spr(BOT, 5)}</span>`;
  m.before(d);
}
function hero() {
  const cw = q(".codewin"); if (!cw || q(".rcol")) return;
  const w = document.createElement("div"); w.className = "rcol"; cw.before(w); w.append(cw);
  w.insertAdjacentHTML("beforeend", `<div class="mas"><div class="bub">¡Hola! Soy PixelBot</div><div class="botw">${spr(BOT, 8)}</div><span class="fl f1">${spr(COIN, 5)}</span><span class="fl f2">${spr(HEART, 4)}</span><span class="fl f3">${spr(STAR, 4)}</span></div>`);
}

/* ---------- DIÁLOGO RPG DE BIENVENIDA ---------- */
function dialog() {
  if (RM) return; try { if (sessionStorage.getItem("pf_d")) return; } catch (e) {}
  const L = ["¡Hola! Soy PixelBot, el guía de PixelForge.", "Aquí hacemos webs, apps y bots con identidad pixel. Pagas una vez y el código es tuyo.", "¿Quieres ver cómo quedaría tu web? Escribe tu negocio en el generador y la armo al instante."];
  const d = document.createElement("div"); d.id = "rpg";
  d.innerHTML = `<div class="rp"><div class="rpp">${spr(BOT, 6)}</div><div class="rpt"><b>PIXELBOT</b><p id="rpx"></p><div class="rpb"><button class="btn primary" id="rpn">Siguiente</button><button class="btn" id="rpc">Cerrar</button></div></div></div>`;
  document.body.appendChild(d);
  let i = 0, t; const close = () => { clearInterval(t); d.remove(); try { sessionStorage.setItem("pf_d", "1"); } catch (e) {} };
  const say = () => { const s = L[i], p = q("#rpx"); let k = 0; clearInterval(t); t = setInterval(() => { p.textContent = s.slice(0, ++k); if (k >= s.length) clearInterval(t); }, 22); q("#rpn").textContent = i === L.length - 1 ? "Probar generador" : "Siguiente"; };
  q("#rpn").onclick = () => { if (i < L.length - 1) { i++; say(); } else { close(); location.hash = "probar"; } };
  q("#rpc").onclick = close; say();
}

/* ---------- NUESTRA VENTAJA ---------- */
function ventaja() {
  const c = q("#comparativa .container"); if (!c || c.dataset.v) return; c.dataset.v = 1;
  const rows = [["Modelo de pago", "Pago único", "Mensual + créditos"], ["Código fuente completo", "Sí, al liquidar", "Según el plan"], ["Trato directo con personas", "Sí, con los fundadores", "Según el plan"], ["Diseño con identidad propia", "Sí, incluido pixel art", "Basado en plantillas"], ["Precios en pesos mexicanos", "Sí", "En dólares"]];
  c.innerHTML = `<span class="eyebrow">NUESTRA VENTAJA</span><h2>Tu web es tuya. Pagas una vez.</h2>
<p class="sub">Los constructores con IA son rápidos, pero cobran cada mes por créditos y guardan tu proyecto en su plataforma. Nosotros hacemos lo contrario: código completo, hecho por personas y con identidad propia.</p>
<div class="grid g4 vt">${[["zap", "Pago único, sin renta", "Sin créditos ni mensualidades obligatorias. Pagas tu plan una vez."], ["code", "Código 100% tuyo", "Al liquidar el proyecto recibes todo el código fuente, no solo acceso a una plataforma."], ["user", "Hecho por personas", "Dos fundadores programando, en español y con soporte directo después de entregar."], ["gamepad", "Identidad pixel", "Pixel art, animaciones y diseño con personalidad. Nada de plantillas genéricas."]].map(x => `<div class="card"><div class="ic">${ic(x[0])}</div><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div>
<div class="cmp" style="margin-top:28px"><div class="r h"><span></span><span>PIXELFORGE</span><span>POR SUSCRIPCIÓN</span></div>${rows.map(r => `<div class="r"><span>${r[0]}</span><span class="ok">${r[1]}</span><span class="no">${r[2]}</span></div>`).join("")}</div>
<p class="note">Comparación general con constructores por suscripción y créditos. Las condiciones de cada plataforma cambian; revísalas antes de decidir.</p>`;
}

/* ---------- SIMULADOR DE NEGOCIO ---------- */
function simulador() {
  const c = q("#simulador .container"); if (!c) return;
  const P = { restaurante: ["Restaurante o cafetería", 85, 5000, 1.2, 3.5], tienda: ["Tienda en línea", 620, 8000, 1, 3.2], servicios: ["Servicios profesionales", 1500, 3000, .8, 3], salud: ["Salud y belleza", 700, 3000, 1.5, 4], otro: ["Otro negocio", 300, 3000, .8, 3] };
  c.innerHTML = `<span class="eyebrow">SIMULADOR</span><h2>Simulador de negocio: tu web en 12 meses</h2><p class="sub">Elige tu tipo de negocio, ajusta los números y mira cómo podría crecer tu venta con una web profesional frente a no tenerla.</p>
<div class="two"><div class="card"><label class="f" style="margin-top:0">Tipo de negocio</label><select class="in" id="mBiz">${Object.entries(P).map(([k, v]) => `<option value="${k}">${v[0]}</option>`).join("")}</select>
<label class="f">Escenario</label><div class="sg" id="mSc"><button data-k=".6">Conservador</button><button data-k="1" class="on">Realista</button><button data-k="1.5">Optimista</button></div>
<label class="f">Visitas mensuales: <b id="mv1"></b></label><input type="range" id="mVis" min="100" max="30000" step="100">
<label class="f">Ticket promedio: <b id="mv2"></b></label><input type="range" id="mTk" min="20" max="10000" step="10">
<label class="f">Conversión actual: <b id="mv3"></b></label><input type="range" id="mC0" min="0.1" max="5" step="0.1">
<label class="f">Conversión con web nueva: <b id="mv4"></b></label><input type="range" id="mC1" min="0.1" max="10" step="0.1">
<label class="f">Crecimiento mensual de visitas: <b id="mv5"></b></label><input type="range" id="mG" min="0" max="15" step="1" value="4">
<label class="f">Inversión (MXN)</label><input class="in" type="number" id="mInv" value="399" min="0"></div>
<div class="card sim-out"><div id="mChart"></div><div class="kpi"><span>Ganancia extra en 12 meses</span><b class="grad" id="mK1"></b></div><div class="kpi"><span>Tu inversión se paga en</span><b id="mK2"></b></div><div class="kpi"><span>Retorno sobre la inversión</span><b id="mK3"></b></div><p class="note">Proyección con los datos que ingresas. Son estimaciones, no una garantía de resultados.</p></div></div>`;
  let k = 1;
  const upd = () => {
    const V = +q("#mVis").value, T = +q("#mTk").value, c0 = +q("#mC0").value, c1 = +q("#mC1").value * k, g = +q("#mG").value / 100, inv = +q("#mInv").value || 0;
    q("#mv1").textContent = V.toLocaleString("es-MX"); q("#mv2").textContent = money(T); q("#mv3").textContent = c0 + "%"; q("#mv4").textContent = (+c1.toFixed(1)) + "%"; q("#mv5").textContent = Math.round(g * 100) + "%";
    const A = [], B = []; let cum = 0, pay = 0;
    for (let m = 1; m <= 12; m++) { const a = V * c0 / 100 * T, conv = c0 + (c1 - c0) * Math.min(1, m / 3), b = V * Math.pow(1 + g, m - 1) * conv / 100 * T; A.push(a); B.push(b); cum += b - a; if (!pay && inv > 0 && cum >= inv) pay = m; }
    const W2 = 640, H2 = 240, pd = 34, mx = Math.max(...A, ...B, 1), x = i => pd + i * (W2 - pd * 2) / 11, y = v => H2 - pd - (v / mx) * (H2 - pd * 2);
    const path = a => a.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
    q("#mChart").innerHTML = `<svg viewBox="0 0 ${W2} ${H2}" style="width:100%;height:auto"><defs><linearGradient id="gA" x1="0" x2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#22d3ee"/></linearGradient><linearGradient id="gF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".35"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>${[0, 1, 2, 3].map(i => `<line x1="${pd}" x2="${W2 - pd}" y1="${pd + i * (H2 - pd * 2) / 3}" y2="${pd + i * (H2 - pd * 2) / 3}" stroke="rgba(255,255,255,.12)"/>`).join("")}<path d="${path(B)} L${x(11)} ${H2 - pd} L${x(0)} ${H2 - pd} Z" fill="url(#gF)"/><path d="${path(A)}" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="6 6"/><path pathLength="1" d="${path(B)}" fill="none" stroke="url(#gA)" stroke-width="4" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1" style="animation:pfdraw 1.4s ease forwards"/>${pay ? `<circle cx="${x(pay - 1)}" cy="${y(B[pay - 1])}" r="6" fill="#34d399"/><text x="${x(pay - 1)}" y="${y(B[pay - 1]) - 12}" fill="#34d399" font-size="12" text-anchor="middle">Se paga</text>` : ""}<text x="${pd}" y="${H2 - 10}" fill="#94a3b8" font-size="11">Mes 1</text><text x="${W2 - pd}" y="${H2 - 10}" fill="#94a3b8" font-size="11" text-anchor="end">Mes 12</text><text x="${W2 - pd}" y="${pd - 10}" fill="#22d3ee" font-size="12" text-anchor="end">Con web</text><text x="${W2 - pd}" y="${pd + 6}" fill="#94a3b8" font-size="12" text-anchor="end">Sin web</text></svg>`;
    q("#mK1").textContent = "+" + money(Math.round(cum)); q("#mK2").textContent = pay ? "Mes " + pay : (inv ? "No en 12 meses" : "Inmediato"); q("#mK3").textContent = inv ? Math.round(cum / inv * 100) + "%" : "-";
  };
  const set = () => { const v = P[q("#mBiz").value]; q("#mTk").value = v[1]; q("#mVis").value = v[2]; q("#mC0").value = v[3]; q("#mC1").value = v[4]; upd(); };
  qa("#simulador input").forEach(i => i.oninput = upd); q("#mBiz").onchange = set;
  qa("#mSc button").forEach(b => b.onclick = () => { qa("#mSc button").forEach(x => x.classList.remove("on")); b.classList.add("on"); k = +b.dataset.k; upd(); });
  set();
}

/* ---------- QR DE REDES ---------- */
function qrSocial() {
  const S = CONFIG.SOCIAL, ig = (S.instagram || "").replace(/^@/, ""), tt = (S.tiktok || "").replace(/^@/, "");
  const two = q("#conecta .two"); if (!two || q("#qrSoc") || (!ig && !tt)) return;
  const d = document.createElement("div"); d.className = "card qrc"; d.id = "qrSoc";
  d.innerHTML = `<h3>Síguenos en redes</h3>${ig ? `<div><div class="qr" id="qrIg"></div><p class="note">Instagram @${ig}</p></div>` : ""}${tt ? `<div><div class="qr" id="qrTt"></div><p class="note">TikTok @${tt}</p></div>` : ""}`;
  two.appendChild(d);
  let n = 0; const go = () => { if (!window.QRCode) { if (n++ < 40) setTimeout(go, 300); return; } const mk = (sel, text) => new QRCode(q(sel), { text, width: 170, height: 170, colorDark: "#0a0f1f", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M }); if (ig) mk("#qrIg", "https://instagram.com/" + ig); if (tt) mk("#qrTt", "https://tiktok.com/@" + tt); }; go();
}

/* =====================================================
   GENERADOR INTELIGENTE DE PLANTILLAS + 5 PLANTILLAS
   ===================================================== */
const FIVE = ["cafe", "tienda", "serv", "salud", "port"];
const GEN = ["", "Mi|Tu|Nuevo|Pro", "star", "Negocio", ["Servicio principal|Lo que mejor sabemos hacer|Cotiza", "Servicio complementario|Para completar tu solución|Cotiza", "Atención personalizada|Cuéntanos qué necesitas|Gratis"], "Soluciones a tu medida, con atención cercana y resultados claros.", "Contáctanos", "Lo que ofrecemos", "Ver", "Atención cercana", "Resultados claros", "#6366f1", "#22d3ee", "split", "Inter", true];
/* [palabras, nombres, icono, etiqueta, items, frase, botón, sección, acción, chip1, chip2, color, color2, portada, letra, oscuro] */
const BIZ = [
["gimnasio|gym|crossfit|fitness|entrenador|pesas", "Forma|Titán|Impulso|Vitalia", "activity", "Gimnasio", ["Plan mensual|Acceso a todas las áreas|$499", "Clases grupales|Funcional, spinning y más|$699", "Entrenamiento personal|Rutina a tu medida|$1,200"], "Entrena con coaches y un ambiente que te impulsa.", "Prueba una clase", "Planes y clases", "Elegir", "Clases guiadas", "Todos los niveles", "#ef4444", "#f59e0b", "bold", "Bebas Neue", true],
["barberia|barbero|salon|estetica|unas|peluqueria|spa|maquillaje|belleza", "Navaja|Aura|Glow|Estilo", "scissors", "Belleza y barbería", ["Corte|Corte y peinado a tu estilo|$150", "Color|Tintes y mechas profesionales|$650", "Cuidado facial|Limpieza y tratamiento|$350"], "Cortes, color y cuidado personal con atención de principio a fin.", "Reservar cita", "Servicios", "Reservar", "Con cita previa", "Productos profesionales", "#ec4899", "#a855f7", "center", "Outfit", true],
["taller|mecanico|refacciones|automotriz|llantas|autolavado|carros|autos", "Motor|Garage|AutoPro|Torque", "wrench", "Taller mecánico", ["Afinación|Motor en su mejor momento|$890", "Frenos|Revisión y cambio de balatas|$650", "Diagnóstico|Escáner computarizado|$350"], "Cuidamos tu auto con diagnóstico claro y precios justos.", "Pedir cotización", "Servicios", "Cotizar", "Diagnóstico claro", "Atención directa", "#f59e0b", "#ef4444", "split", "Bebas Neue", true],
["dentista|dental|odontologo|ortodoncia|sonrisa", "Sonríe|Denta|Blanca|Oris", "shield", "Clínica dental", ["Limpieza dental|Profilaxis y revisión|$600", "Ortodoncia|Brackets y alineadores|Desde $1,500", "Blanqueamiento|Sonrisa más luminosa|$1,800"], "Cuidamos tu sonrisa con tecnología y trato amable.", "Agendar cita", "Tratamientos", "Agendar", "Citas rápidas", "Atención amable", "#0ea5e9", "#22d3ee", "split", "Outfit", false],
["clinica|doctor|medico|consultorio|nutriologo|psicologo|terapia|salud", "Alba|Vida|Sana|Cuida", "heart", "Consultorio", ["Consulta general|Revisión y seguimiento|$500", "Nutrición|Plan alimenticio personalizado|$600", "Bienestar emocional|Sesiones en línea o presenciales|$700"], "Atención cercana, con citas rápidas y seguimiento.", "Agendar cita", "Especialidades", "Agendar", "Citas rápidas", "Atención cercana", "#14b8a6", "#22d3ee", "cards", "Poppins", false],
["veterinaria|mascotas|perro|gato|canina|veterinario", "Patitas|Huella|PetCare|Amigo", "heart", "Veterinaria", ["Consulta|Revisión y vacunas|$350", "Estética canina|Baño y corte|$300", "Hospedaje|Cuidado mientras no estás|$250"], "Cuidamos a tu mejor amigo como parte de la familia.", "Agendar cita", "Servicios", "Agendar", "Con cariño", "Cuidado profesional", "#f59e0b", "#10b981", "split", "Outfit", false],
["pasteleria|panaderia|reposteria|pasteles|cupcakes|postres|galletas", "Dulce|Migas|Horneado|Sugar", "coffee", "Pastelería", ["Pastel personalizado|Para cada celebración|Desde $450", "Caja de cupcakes|6 piezas decoradas|$240", "Pan artesanal|Horneado cada mañana|$45"], "Postres y pan hechos con ingredientes de calidad.", "Hacer mi pedido", "Nuestros productos", "Pedir", "Hecho al momento", "Ingredientes de calidad", "#ec4899", "#f59e0b", "split", "DM Serif Display", false],
["cafeteria|cafe|restaurante|taqueria|pizzeria|comida|hamburguesas|sushi|bar|tacos|fonda", "Brasa|Sazón|Fogón|Mesa", "coffee", "Restaurante", ["Platillo del día|Cocina casera con sazón|$95", "Especialidad de la casa|Lo que más piden|$140", "Bebida y postre|Para cerrar con broche de oro|$65"], "Cocina con sazón, ingredientes frescos y buen ambiente.", "Reservar mesa", "Lo más pedido", "Pedir", "Abierto hoy", "Hecho al momento", "#f59e0b", "#ef4444", "split", "DM Serif Display", true],
["abogado|despacho|notario|contador|contabilidad|fiscal|consultoria|asesoria", "Lex|Nexo|Pauta|Norte", "brief", "Despacho profesional", ["Primera asesoría|Revisamos tu caso|Sin costo", "Trámites|Gestión clara y ordenada|Desde $1,500", "Acompañamiento|Seguimiento continuo|$2,000/mes"], "Asesoría clara y confiable para decisiones importantes.", "Agendar asesoría", "Servicios", "Cotizar", "Primera asesoría", "Atención personalizada", "#0f766e", "#22d3ee", "cards", "Playfair Display", false],
["inmobiliaria|bienes raices|propiedades|casas|departamentos|renta", "Casa|Hogar|Nido|Techo", "home", "Inmobiliaria", ["Departamento céntrico|2 recámaras, 85 m²|$2,450,000", "Casa con jardín|3 recámaras, 180 m²|$3,900,000", "Local comercial|Zona de alto tráfico|$1,800,000"], "Encuentra tu próximo hogar con asesoría de principio a fin.", "Ver propiedades", "Propiedades", "Ver", "Asesoría completa", "Visitas guiadas", "#f59e0b", "#6366f1", "split", "Space Grotesk", true],
["fotografo|fotografia|video|audiovisual|camara", "Luz|Lente|Sal|Foco", "camera", "Fotografía", ["Retrato|Sesión de 1 hora, 15 fotos editadas|$1,800", "Evento|Cobertura por horas|$3,500", "Marca|Fotos para tu negocio|$2,900"], "Retratos, eventos y marca con mirada propia.", "Reservar sesión", "Sesiones", "Reservar", "Entrega en días", "Fotos editadas", "#6366f1", "#ec4899", "scene", "Playfair Display", true],
["musica|banda|dj|cantante|productor|grabacion|rock|mariachi", "Eco|Ritmo|Vinilo|Sonido", "music", "Música", ["Sencillo nuevo|Disponible en todas las plataformas|2026", "Presentaciones|Eventos y festivales|Cotiza", "Producción|Grabación y mezcla|Desde $1,500"], "Música original y presentaciones en vivo que se sienten.", "Escuchar ahora", "Lanzamientos", "Escuchar", "Nuevo sencillo", "Próximas fechas", "#a855f7", "#ec4899", "scene", "Silkscreen", true],
["escuela|academia|idiomas|ingles|cursos|tutor|clases|guarderia|talleres", "Aula|Saber|Brújula|Aprende", "book", "Academia", ["Curso inicial|Bases claras paso a paso|$890", "Curso intermedio|Práctica con ejemplos reales|$1,200", "Asesoría personalizada|Clases uno a uno|$350"], "Aprende a tu ritmo, con acompañamiento y práctica real.", "Ver cursos", "Cursos", "Inscribirme", "En vivo", "A tu ritmo", "#2563eb", "#22d3ee", "center", "Outfit", false],
["floreria|flores|regalos|arreglos|ramos|detalles", "Pétalo|Jardín|Bouquet|Flor", "heart", "Florería", ["Ramo clásico|Flores frescas del día|$450", "Arreglo especial|Para cada ocasión|$690", "Caja de regalo|Flores y detalle|$850"], "Flores frescas y detalles para decir lo que sientes.", "Hacer pedido", "Arreglos", "Pedir", "Flores frescas", "Entrega a domicilio", "#ec4899", "#10b981", "split", "Playfair Display", false],
["ropa|boutique|moda|zapatos|accesorios|joyeria|tienda|marca|streetwear", "Nómada|Urbano|Trama|Estilo", "bag", "Tienda de moda", ["Colección nueva|Piezas de temporada|Desde $399", "Más vendidos|Favoritos de la gente|Desde $299", "Accesorios|Detalles que completan|Desde $149"], "Moda y accesorios con identidad, enviados a todo el país.", "Comprar ahora", "Colección", "Agregar", "Envíos a todo el país", "Pago seguro", "#22d3ee", "#6366f1", "split", "Space Grotesk", true],
["electronica|celulares|computadoras|reparacion|tecnologia|software|app|desarrollo|sistemas|tecnico", "Byte|Nodo|Circuito|Pixel", "code", "Tecnología", ["Reparación|Diagnóstico y solución|Desde $250", "Soporte técnico|Atención a empresas|$800/mes", "Desarrollo a medida|Software y automatización|Cotiza"], "Soluciones de tecnología claras, rápidas y confiables.", "Pedir cotización", "Servicios", "Cotizar", "Soporte cercano", "Soluciones a medida", "#6366f1", "#22d3ee", "cards", "Space Grotesk", true],
["hotel|hostal|cabanas|turismo|viajes|tours|hospedaje", "Ruta|Brisa|Destino|Nómada", "pin", "Turismo", ["Escapada de fin de semana|Hospedaje y actividades|Desde $2,500", "Tour guiado|Descubre la región|$650", "Paquete familiar|Todo incluido|Desde $6,000"], "Experiencias para viajar sin preocupaciones.", "Planear mi viaje", "Experiencias", "Reservar", "Reserva fácil", "Guías locales", "#0ea5e9", "#f59e0b", "split", "Outfit", false],
["constructora|construccion|arquitecto|remodelacion|plomero|electricista|herreria|carpinteria|albanil|pintura", "Cimiento|Obra|Trazo|Maestro", "wrench", "Construcción y oficios", ["Remodelación|Renueva tus espacios|Cotiza", "Instalaciones|Eléctricas y de plomería|Desde $500", "Obra nueva|Del proyecto a la entrega|Cotiza"], "Trabajo bien hecho, con tiempos claros y buen precio.", "Pedir cotización", "Servicios", "Cotizar", "Presupuesto claro", "Atención directa", "#f59e0b", "#ef4444", "bold", "Bebas Neue", true],
["eventos|bodas|xv|banquetes|salon de fiestas|decoracion|fiestas", "Momentos|Fiesta|Gala|Celebra", "heart", "Eventos", ["Boda|Planeación y coordinación|Desde $8,000", "Cumpleaños|Decoración, música y logística|Desde $3,500", "Evento empresarial|Producción y atención|Desde $6,000"], "Organizamos tu evento para que solo disfrutes.", "Cotizar evento", "Paquetes", "Cotizar", "Planeación completa", "Atención personalizada", "#14b8a6", "#ec4899", "center", "Playfair Display", false],
["videojuegos|juegos|pixel|gamer|esports|arcade|retro", "Pixel|Byte|Quest|Realm", "gamepad", "Estudio de videojuegos", ["Dungeon Byte|Explora mazmorras al azar|Gratis", "Neon Racer|Carreras arcade|$49", "Slime Kingdom|Defiende tu reino|$79"], "Juegos retro con alma: pixel art, chiptune y diversión.", "Jugar demo", "Nuestros juegos", "Jugar", "Demo gratis", "Estilo pixel art", "#22c55e", "#a855f7", "scene", "Press Start 2P", true],
["marketing|publicidad|diseno|agencia|branding|redes sociales|community", "Impulso|Marca|Viral|Tinta", "star", "Agencia creativa", ["Branding|Identidad visual completa|Desde $3,000", "Redes sociales|Contenido y estrategia|$2,500/mes", "Campañas|Publicidad que convierte|Cotiza"], "Hacemos que tu marca se vea, se escuche y se recuerde.", "Hablemos", "Servicios", "Cotizar", "Estrategia clara", "Diseño con identidad", "#a855f7", "#f59e0b", "editorial", "Space Grotesk", true],
["tatuajes|tatuador|piercing|tattoo", "Tinta|Aguja|Negro|Línea", "star", "Estudio de tatuajes", ["Tatuaje pequeño|Diseño personalizado|Desde $800", "Tatuaje mediano|Sesión completa|Desde $1,800", "Cover up|Renueva tu piel|Cotiza"], "Arte en la piel con higiene, estilo y mucho cuidado.", "Agendar cita", "Servicios", "Agendar", "Material nuevo", "Diseño personalizado", "#ef4444", "#f59e0b", "editorial", "Bebas Neue", true]
];
const cap = s => s.replace(/\b\p{L}/gu, c => c.toUpperCase());
function local(p) {
  const low = norm(p); let best = null, sc = 0;
  BIZ.forEach(b => { let s = 0; b[0].split("|").forEach(k => { if (k && low.includes(k)) s += k.length; }); if (s > sc) { sc = s; best = b; } });
  const b = best || GEN, st = b[1].split("|"), sfx = ["Studio", "& Co.", "Pro", "Lab", "MX", "Express", ""];
  const name = (best ? st[Math.random() * st.length | 0] + " " + sfx[Math.random() * sfx.length | 0] : cap(p)).trim().slice(0, 32);
  const [kw, nm, icon, label, items, tag, cta, sec, btn, c1, c2, color, color2, hero, hf, dark] = b;
  const t = { n: label, i: icon, eb: best ? label : cap(p), color, name, tag, cta, sec, subsec: "Lo mejor de lo que ofrecemos, pensado para ti.", btn, chip1: c1, chip2: c2, items: items.map(s => s.split("|")), about: `En ${name} cuidamos cada detalle: atención cercana, trabajo de calidad y compromiso con lo que prometemos. Cuéntanos qué necesitas y lo hacemos realidad.`, hours: "Lun a Sáb · 9:00 a 19:00", addr: "Tu ciudad" };
  const px = hero === "scene" || label === "Estudio de videojuegos";
  return { t, o: { color2, hf, hero, dark, art: ["plate", "browser", "cards"][Math.random() * 3 | 0], radius: hero === "bold" ? 6 : 16, pxd: px, pxb: px } };
}
function fromAI(j, p) {
  if (!j || typeof j !== "object") return null;
  const ok = h => /^#[0-9a-f]{6}$/i.test(h || ""), s = (v, n) => String(v || "").slice(0, n);
  const items = (Array.isArray(j.items) ? j.items : []).slice(0, 6).map(x => [s(x[0], 40), s(x[1], 90), s(x[2], 18)]); if (!items.length) return null;
  const color = ok(j.color) ? j.color : "#6366f1", color2 = ok(j.color2) ? j.color2 : "#22d3ee";
  const t = { n: s(j.label || p, 30), i: ["coffee", "bag", "brief", "user", "book", "star", "pin", "music", "camera", "heart", "home", "scissors", "gamepad", "activity", "shield", "truck", "wrench", "code"].includes(j.icon) ? j.icon : "star", eb: s(j.eyebrow || p, 30), color, name: s(j.name, 32) || p, tag: s(j.tag, 140), cta: s(j.cta, 28) || "Contáctanos", sec: s(j.sec, 40) || "Lo que ofrecemos", subsec: s(j.subsec, 100), btn: s(j.btn, 16) || "Ver", chip1: s(j.chip1, 30), chip2: s(j.chip2, 30), items, about: s(j.about, 400), hours: s(j.hours, 60), addr: s(j.addr, 80) };
  return { t, o: { color2, hf: "Inter", hero: ["split", "center", "editorial", "cards", "bold", "scene"].includes(j.hero) ? j.hero : "split", dark: !!j.dark, art: "plate", radius: 14, pxd: !!j.pixel, pxb: false } };
}
EST.gen = async function (txt) {
  if (!(window.PF && PF.retro)) { toast("Falta conectar mejoras.js para usar el generador"); return; }
  const inp = q("#gQ"), p = (txt || (inp && inp.value) || "").trim(); if (!p) { toast("Escribe qué negocio tienes"); return; }
  if (inp) inp.value = p;
  const msg = q("#gMsg"), steps = ["Analizando tu negocio", "Eligiendo colores y estilo", "Escribiendo los textos", "Armando las secciones", "Afinando detalles"];
  for (const s of steps) { if (msg) msg.textContent = s + "..."; await new Promise(r => setTimeout(r, 320)); }
  let g = null;
  if (CONFIG.AI_ENDPOINT) { try { const r = await fetch(CONFIG.AI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: "template", prompt: p }) }); g = fromAI(await r.json(), p); } catch (e) {} }
  if (!g) g = local(p);
  TPL.gen = g.t;
  W = newW("gen", Object.assign({ color: g.t.color, color2: g.o.color2, hf: g.o.hf, hero: g.o.hero, dark: g.o.dark, art: g.o.art, radius: g.o.radius, pxd: g.o.pxd, pxb: g.o.pxb, gen: g.t, step: 2, done: Math.max(W.done, 1), dev: W.dev }));
  renderWiz(); schedPrev(); saveW(); toast("Plantilla lista: " + g.t.name);
};
function step1() {
  const five = FIVE.filter(k => TPL[k]);
  return `<div class="ig3" style="margin-top:12px"><b>Generador inteligente de plantillas</b><label class="f">¿Qué negocio tienes? Escríbelo y armamos tu plantilla al instante</label><div class="row left" style="flex-wrap:nowrap"><input class="in" id="gQ" placeholder="Ej. gimnasio, barbería, taller..." maxlength="60" onkeydown="if(event.key==='Enter')EST.gen()"><button class="btn primary" onclick="EST.gen()">${ic("zap")} Generar</button></div><div class="sg" style="margin-top:10px">${["Gimnasio", "Barbería", "Taller mecánico", "Pastelería", "Veterinaria", "Abogado", "Fotógrafo"].map(x => `<button onclick="EST.gen('${x}')">${x}</button>`).join("")}</div><p class="note" id="gMsg">${CONFIG.AI_ENDPOINT ? "IA conectada." : "Funciona con nuestro generador inteligente. Se conecta a una IA real cuando activemos el servidor."}</p></div><label class="f" style="margin-top:16px">O empieza con una de las 5 más usadas</label><div class="tpls">${five.map(k => `<button class="tpl ${W.tpl === k ? "on" : ""}" onclick="pickTpl('${k}')">${ic(TPL[k].i)}<span>${TPL[k].n}</span></button>`).join("")}</div><div class="row left" style="margin-top:12px"><button class="btn" onclick="PF.surprise()">${ic("zap")} Sorpréndeme</button></div>`;
}

/* ---------- PLANTILLAS: mismo look que PixelForge ---------- */
const DECO_CSS = `.mesh{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}.mesh i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.45;animation:pm 16s ease-in-out infinite alternate}.mesh i:nth-child(1){width:380px;height:380px;background:var(--c);left:-6%;top:-20%}.mesh i:nth-child(2){width:320px;height:320px;background:var(--c2);right:-4%;top:10%;animation-delay:-6s}.mesh i:nth-child(3){width:260px;height:260px;background:color-mix(in srgb,var(--c) 50%,#ec4899);left:40%;bottom:-25%;opacity:.28;animation-delay:-11s}.mesh::after{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 72%);mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 72%)}.hero .w{position:relative;z-index:1}.gr{background:linear-gradient(135deg,var(--c),var(--c2));-webkit-background-clip:text;background-clip:text;color:transparent}.hero.bold .gr{background:none;color:inherit}.cd{position:relative}.cd::after{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--c) 22%,transparent),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}.cd:hover::after{opacity:1}#pg{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--c),var(--c2));z-index:99}.btn{position:relative;overflow:hidden}.btn::after{content:"";position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-20deg);transition:left .6s}.btn:hover::after{left:140%}nav a.on{color:var(--c)}section:nth-of-type(even){background:color-mix(in srgb,var(--bg2) 85%,transparent)}@keyframes pm{to{transform:translate(40px,30px) scale(1.15)}}`;
const DECO_JS = `(function(){var pg=document.getElementById("pg");addEventListener("scroll",function(){var h=document.documentElement;pg.style.width=(h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%";var cur="";document.querySelectorAll("section[id]").forEach(function(s){if(s.getBoundingClientRect().top<120)cur="#"+s.id});document.querySelectorAll("nav .nl a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")===cur)})},{passive:true});document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".cd");if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})})();`;
function decorate(html) {
  html = html.replace(/(<header class="hero[^"]*">)/, '$1<div class="mesh"><i></i><i></i><i></i></div>');
  html = html.replace(/<h1>([^<]*)<\/h1>/, (m, t) => { const p = t.trim().split(" "), last = p.pop(); return `<h1>${p.length ? p.join(" ") + " " : ""}<span class="gr">${last}</span></h1>`; });
  html = html.replace("</style>", DECO_CSS + "</style>").replace(/(<body[^>]*>)/, '$1<div id="pg"></div>').replace("</body>", "<script>" + DECO_JS + "<\/script></body>");
  return html;
}
function ex4() {
  q("#exGrid").innerHTML = PRESETS.map(([k, o], i) => { const w = newW(k, o); return `<div class="card ex"><div class="thumb"><iframe loading="lazy" sandbox="allow-scripts" tabindex="-1" title="${esc(w.name)}" srcdoc="${esc(window.pvHTML(w))}"></iframe></div><h3 style="margin-top:14px">${esc(w.name)}</h3><p>${esc(TPL[k].n)}</p><button class="btn" style="margin-top:12px" onclick="usePreset(${i})">Usar esta plantilla</button></div>`; }).join("");
  requestAnimationFrame(scaleThumbs);
}
function builder() {
  if (!(window.PF && PF.surprise && TPL.salud)) { console.warn("estudio: falta mejoras.js"); return; }
  if (!window.__pvw) { const base = window.pvHTML; window.pvHTML = w => decorate(base(w)); window.__pvw = 1; }
  PRESETS.splice(0, PRESETS.length,
    ["cafe", { color: "#f59e0b", color2: "#ef4444", dark: true, hf: "DM Serif Display", hero: "split", art: "plate", istyle: "list", radius: 18, pxd: true }],
    ["tienda", { color: "#22d3ee", color2: "#6366f1", dark: true, hf: "Space Grotesk", hero: "split", art: "browser", istyle: "bento", radius: 16, btn: "pill" }],
    ["serv", { color: "#10b981", color2: "#22d3ee", dark: true, hf: "Poppins", hero: "cards", radius: 12, secs: newW("serv").secs.map(s => s.id === "steps" ? { id: "steps", on: true } : s) }],
    ["salud", { color: "#ec4899", color2: "#a855f7", dark: true, hf: "Outfit", hero: "center", art: "cards", radius: 22 }],
    ["port", { color: "#a855f7", color2: "#22d3ee", dark: true, hf: "Press Start 2P", hero: "scene", radius: 0, pxb: true, pxd: true, pxs: true, shadow: "hard" }]);
  const prevRW = window.renderWiz;
  window.renderWiz = function () { prevRW(); if (W.step === 1) { const p = q("#wpane"); if (p) p.innerHTML = `<h3 style="font-size:14px">Paso 1 de 12: Plantilla</h3><p class="note" style="margin-top:4px">Escribe tu negocio o elige una plantilla</p>` + step1(); } };
  const prevLW = window.loadW; window.loadW = function () { prevLW(); if (W.gen) TPL.gen = W.gen; };
  window.renderEx = ex4;
  const sub = q("#probar .sub"); if (sub) sub.textContent = "Escribe tu negocio y generamos tu plantilla al instante, o elige una de las 5 más usadas. Después cámbialo todo en 12 pasos. Con tu cuenta gratis haces 5 pasos hoy y 7 mañana.";
  const sub2 = q("#ejemplos .sub"); if (sub2) sub2.textContent = "Cinco webs terminadas, hechas con nuestro constructor. Elige una y cámbialo todo, o escribe tu negocio y generamos una nueva.";
  window.loadW(); window.renderWiz(); schedPrev(); ex4();
}

/* ---------- ARRANQUE ---------- */
function boot() { [css, banner, hero, ventaja, simulador, qrSocial, builder].forEach(f => { try { f(); } catch (e) { console.warn("estudio:", f.name, e); } }); setTimeout(() => { try { dialog(); } catch (e) {} }, 2600); }
if (document.readyState === "complete") boot(); else addEventListener("load", boot);
})();
