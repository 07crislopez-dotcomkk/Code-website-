/* ultimate.js · PixelForge · versión Ultimate
   Línea en index.html (debajo de las otras): <script defer src="ultimate.js"></script> */
const ULTIMATE = { tickets: 7, reward: { code: "PIXEL10", text: "10% de descuento en tu primer proyecto" } };
(function () {
"use strict";
const q = s => document.querySelector(s), qa = s => Array.from(document.querySelectorAll(s));
const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mixc = (a, b, t) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };

/* ---------- SPRITES (con contorno automático) ---------- */
const PX = { o: "#ff8a3d", l: "#ffc27a", d: "#c2410c", y: "#ffd23f", c: "#2dd4bf", w: "#ffffff", r: "#ff3d3d", k: "#120a24", p: "#ff3d81" };
const G = (w, h) => Array.from({ length: h }, () => Array(w).fill(""));
const P = (g, x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j] && i >= 0 && i < g[0].length) g[j][i] = c; };
function R(g, s) {
  const h = g.length, w = g[0].length, at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h) ? "" : g[y][x];
  const cell = (x, y) => { let c = at(x, y); if (!c && (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1))) c = "k"; return c; };
  let o = ""; for (let y = -1; y <= h; y++) { let x = -1; while (x <= w) { const c = cell(x, y); if (!c) { x++; continue; } let n = 1; while (x + n <= w && cell(x + n, y) === c) n++; o += `<rect x="${x + 1}" y="${y + 1}" width="${n}" height="1" fill="${PX[c]}"/>`; x += n; } }
  return `<svg viewBox="0 0 ${w + 2} ${h + 2}" shape-rendering="crispEdges" width="${(w + 2) * s}" height="${(h + 2) * s}">${o}</svg>`;
}
function bot(f, s) {
  const g = G(14, 14); P(g, 6, 0, 2, 2, "r"); P(g, 6, 2, 2, 1, "d"); P(g, 1, 3, 12, 6, "o"); P(g, 2, 3, 10, 1, "l"); P(g, 1, 8, 12, 1, "d"); P(g, 3, 4, 8, 4, "k");
  if (f === 2) { P(g, 4, 6, 2, 1, "c"); P(g, 8, 6, 2, 1, "c"); } else { P(g, 4, 5, 2, 2, "c"); P(g, 8, 5, 2, 2, "c"); P(g, 4, 5, 1, 1, "w"); P(g, 8, 5, 1, 1, "w"); }
  P(g, 0, 5, 1, 2, "d"); P(g, 13, 5, 1, 2, "d"); P(g, 3, 9, 8, 3, "o"); P(g, 3, 11, 8, 1, "d"); P(g, 6, 10, 2, 1, "y"); P(g, 1, 9, 2, 3, "o"); P(g, 11, 9, 2, 3, "o");
  if (f === 1) { P(g, 4, 12, 2, 2, "d"); P(g, 8, 12, 2, 2, "d"); } else { P(g, 3, 12, 2, 2, "d"); P(g, 9, 12, 2, 2, "d"); }
  return R(g, s);
}
function coin(s) { const g = G(8, 8); for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (Math.hypot(x - 3.5, y - 3.5) <= 3.8) g[y][x] = "y"; P(g, 2, 1, 2, 1, "w"); P(g, 1, 2, 1, 2, "w"); P(g, 6, 3, 1, 3, "o"); return R(g, s); }
function heart(s) { const g = G(9, 8); ["..rr.rr..", ".rrrrrrr.", "rrrrrrrrr", "rrrrrrrrr", ".rrrrrrr.", "..rrrrr..", "...rrr...", "....r...."].forEach((r, y) => r.split("").forEach((c, x) => { if (c === "r") g[y][x] = "r"; })); P(g, 1, 1, 1, 1, "w"); return R(g, s); }
function ticket(s) { const g = G(12, 7); P(g, 0, 0, 12, 7, "y"); P(g, 0, 3, 1, 1, ""); P(g, 11, 3, 1, 1, ""); P(g, 3, 1, 1, 5, "o"); P(g, 5, 2, 4, 3, "w"); P(g, 6, 1, 2, 5, "w"); P(g, 0, 0, 12, 1, "l"); return R(g, s); }

/* ---------- ICONOS PIXEL DE COLOR (se convierten solos) ---------- */
function pixSvg(markup, N, c1, c2, cb) {
  var mix = function (a, b, t) { var A = [1, 3, 5].map(function (i) { return parseInt(a.substr(i, 2), 16); }), B = [1, 3, 5].map(function (i) { return parseInt(b.substr(i, 2), 16); }); return "rgb(" + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(",") + ")"; };
  var img = new Image();
  img.onload = function () {
    var cv = document.createElement("canvas"); cv.width = cv.height = N; var cx = cv.getContext("2d"); cx.drawImage(img, 0, 0, N, N);
    var d = cx.getImageData(0, 0, N, N).data, on = function (x, y) { return x >= 0 && y >= 0 && x < N && y < N && d[(y * N + x) * 4 + 3] > 110; }, o = "";
    for (var y = -1; y <= N; y++) for (var x = -1; x <= N; x++) { var f = on(x, y), e = !f && (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1)); if (f) o += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="1" height="1" fill="' + mix(c1, c2, y / N) + '"/>'; else if (e) o += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="1" height="1" fill="#120a24"/>'; }
    cb('<svg viewBox="0 0 ' + (N + 2) + ' ' + (N + 2) + '" shape-rendering="crispEdges">' + o + '</svg>');
  };
  img.onerror = function () { cb(""); };
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(markup);
}
const COL = [["#ffe27a", "#ff8a3d"], ["#7ef2d8", "#14b8a6"], ["#ffb3c8", "#ff3d81"], ["#d4c2ff", "#8b5cf6"], ["#fff0a0", "#f5a623"], ["#b8f5a8", "#22c55e"]];
async function icons() {
  let i = 0;
  for (const el of qa("#servGrid .ic,#comparativa .ic")) {
    const u = el.querySelector("use"); if (!u) continue; const sym = document.getElementById(u.getAttribute("href").slice(1)); if (!sym) continue;
    const m = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.8" stroke-linecap="square" stroke-linejoin="miter">${sym.innerHTML}</svg>`, [a, b] = COL[i++ % 6];
    await new Promise(r => pixSvg(m, 16, a, b, s => { if (s) el.innerHTML = s; r(); }));
  }
}

/* ---------- CSS ---------- */
function css() {
  const s = document.createElement("style"); s.id = "pf-ultimate";
  s.textContent = `
:root{--bg:#0e0818;--bg2:#160c28;--surface:#1d1135;--surface2:#291848;--text:#fff1dc;--muted:#bba8d8;--brand:#ff8a3d;--brand2:#ffd23f;--border:rgba(255,241,220,.12);--line:rgba(255,241,220,.2);--grad:linear-gradient(135deg,#ff8a3d 0%,#ff3d81 55%,#8b5cf6 100%);--pxb:#fff1dc}
[data-theme="light"]{--bg:#fff6e6;--bg2:#ffe9c8;--surface:#fffdf8;--surface2:#ffe6c0;--text:#2a1440;--muted:#6b5483;--brand:#e8590c;--brand2:#d97706;--border:rgba(42,20,64,.12);--line:rgba(42,20,64,.25);--pxb:#2a1440}
#lg stop:first-child{stop-color:#ff8a3d}#lg stop:last-child{stop-color:#ff3d81}
.b1{background:#ff7a3d!important}.b2{background:#ff3d81!important}.b3{background:#8b5cf6!important}
.btn.primary{border-color:#000!important}
.card:not(.plan)::after,.soc-i::after{background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(255,138,61,.28),transparent 60%)!important}
#glow{background:radial-gradient(circle,rgba(255,138,61,.22),transparent 65%)!important}
.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(460px circle at var(--hx,70%) var(--hy,25%),rgba(255,138,61,.24),transparent 62%);pointer-events:none;z-index:0}
.card .ic{background:transparent!important;width:60px;height:60px}.card .ic svg{width:56px;height:56px}
.twl{display:block;min-height:1.6em;white-space:nowrap;font-size:.82em}
.rcol{height:440px;margin-bottom:34px;perspective:1100px}
.codewin,.mas{display:none!important}
.stk{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(calc(var(--ry,0)*1deg)) rotateY(calc(var(--rx,0)*1deg));transition:transform .15s}
.sw{position:absolute;width:72%;aspect-ratio:16/11;left:var(--l);top:var(--t);background:#fff;overflow:hidden;transform:translateZ(var(--z)) rotateY(-12deg) rotateX(4deg);box-shadow:0 -4px 0 var(--pxb),0 4px 0 var(--pxb),-4px 0 0 var(--pxb),4px 0 0 var(--pxb),14px 14px 0 rgba(0,0,0,.5);animation:swf 6s ease-in-out infinite;animation-delay:var(--d)}
@keyframes swf{50%{margin-top:-10px}}
.sw .tb{position:absolute;top:0;left:0;right:0;height:22px;background:#120a24;display:flex;gap:5px;align-items:center;padding:0 8px;z-index:2}.sw .tb i{width:8px;height:8px;background:#ff5f56}.sw .tb i:nth-child(2){background:#ffbd2e}.sw .tb i:nth-child(3){background:#27c93f}
.sw iframe{position:absolute;top:22px;left:0;width:1100px;height:760px;border:none;transform-origin:top left;pointer-events:none}
.abot{display:inline-block;line-height:0}
.bigrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;margin:8px 0 34px}
.bigb{display:flex;align-items:center;gap:16px;padding:22px 24px;font-size:34px;color:#fff;text-shadow:2px 2px 0 rgba(0,0,0,.4);box-shadow:inset -5px -5px 0 rgba(0,0,0,.3),inset 5px 5px 0 rgba(255,255,255,.25),0 -4px 0 #000,0 4px 0 #000,-4px 0 0 #000,4px 0 0 #000,10px 10px 0 rgba(0,0,0,.5);transition:.15s}
.bigb:hover{transform:translate(-3px,-3px);filter:brightness(1.12)}.bigb:active{transform:translateY(4px)}
.bigb span{display:flex;flex-direction:column;line-height:1.25}.bigb small{font-family:'Silkscreen',monospace;font-size:12px;opacity:.9}.bigb b{font-family:'Press Start 2P',monospace;font-size:12px;word-break:break-all}
.bigb.ig{background:linear-gradient(135deg,#ffb020,#ff3d81 55%,#8b5cf6)}.bigb.mail{background:linear-gradient(135deg,#10b981,#0d9488)}.bigb.web{background:linear-gradient(135deg,#ff8a3d,#e8590c)}.bigb.tt{background:#18101f}.bigb.wa{background:#1fa855}
.fbtn{display:grid;place-items:center;width:52px;height:52px;color:#fff;font-size:24px;box-shadow:inset -4px -4px 0 rgba(0,0,0,.3),inset 4px 4px 0 rgba(255,255,255,.25),0 -3px 0 #000,0 3px 0 #000,-3px 0 0 #000,3px 0 0 #000}
.fbtn.ig{background:linear-gradient(135deg,#ffb020,#ff3d81 55%,#8b5cf6)}.fbtn.mail{background:#0d9488}.fbtn.tt{background:#18101f}.fbtn.wa{background:#1fa855}
#fsoc{display:flex;gap:14px;margin-top:18px}
.tk{position:absolute;z-index:6;background:none;border:none;padding:0;cursor:pointer;animation:tkf 2.2s steps(4) infinite;filter:drop-shadow(0 0 10px rgba(255,210,63,.7))}.tk:hover{transform:scale(1.25)}
@keyframes tkf{50%{transform:translateY(-8px)}}
#tkh{position:fixed;left:20px;bottom:78px;z-index:160;background:#120a24;color:#fff1dc;padding:8px 10px;display:flex;gap:8px;align-items:center;font-family:'Press Start 2P',monospace;font-size:9px;box-shadow:0 -3px 0 #fff1dc,0 3px 0 #fff1dc,-3px 0 0 #fff1dc,3px 0 0 #fff1dc,6px 6px 0 rgba(0,0,0,.5)}
#tkh i{width:10px;height:10px;background:#3b2a5c;display:inline-block}#tkh i.on{background:#ffd23f}
#rwd{position:fixed;inset:0;background:rgba(5,2,12,.8);z-index:700;display:none;place-items:center;padding:16px}#rwd.show{display:grid}
.rwb{max-width:460px;width:100%;background:#120a24;color:#fff1dc;padding:26px;text-align:center;box-shadow:0 -4px 0 #fff1dc,0 4px 0 #fff1dc,-4px 0 0 #fff1dc,4px 0 0 #fff1dc,12px 12px 0 rgba(0,0,0,.6)}
.rwb h3{font-family:'Press Start 2P',monospace;font-size:14px;color:#ffd23f;margin:14px 0;line-height:1.6}.rwb p{font-family:'Silkscreen',monospace;font-size:16px;margin-bottom:14px}
.rwc{font-family:'Press Start 2P',monospace;font-size:20px;background:#3b1a74;padding:14px;margin:12px 0 18px;letter-spacing:2px;box-shadow:0 0 0 4px #ffd23f}
#chat{background:#120a24!important;font-family:'Silkscreen',monospace}
.chat-h{background:#3b1a74!important;border-bottom:4px solid #fff1dc;padding:12px!important}.chat-h>div{display:flex;gap:10px;align-items:center}.chat-h b{font-family:'Press Start 2P',monospace!important;font-size:11px!important;color:#ffd23f}
.m{border-radius:0!important;font-family:'Silkscreen',monospace;font-size:15px!important;box-shadow:0 -3px 0 rgba(255,241,220,.5),0 3px 0 rgba(255,241,220,.5),-3px 0 0 rgba(255,241,220,.5),3px 0 0 rgba(255,241,220,.5)}
.m.bot{background:#241548!important;color:#fff1dc;padding-left:48px!important;position:relative;margin:4px 4px 4px 0}
.m.bot::before{content:"";position:absolute;left:8px;top:8px;width:30px;height:30px;background:var(--botimg) center/contain no-repeat;image-rendering:pixelated}
.m.me{background:#ff8a3d!important;color:#120a24;margin:4px 0 4px 4px}
.quick button{border-radius:0!important;font-family:'Silkscreen',monospace;box-shadow:0 -2px 0 #fff1dc,0 2px 0 #fff1dc,-2px 0 0 #fff1dc,2px 0 0 #fff1dc;border:none!important}
.chat-f input{border-radius:0!important;font-family:'Silkscreen',monospace}
#chatFab{border-radius:0!important;background:#3b1a74!important;border:none!important;box-shadow:0 -4px 0 #fff1dc,0 4px 0 #fff1dc,-4px 0 0 #fff1dc,4px 0 0 #fff1dc,8px 8px 0 rgba(0,0,0,.55)!important;width:70px!important;height:70px!important}
.pop{position:fixed;right:20px;z-index:190;width:260px;background:#241548;color:#fff1dc;box-shadow:0 -3px 0 #fff1dc,0 3px 0 #fff1dc,-3px 0 0 #fff1dc,3px 0 0 #fff1dc,8px 8px 0 rgba(0,0,0,.5);animation:pin .3s steps(4)}
@keyframes pin{from{transform:translateY(30px);opacity:0}}
.pop .pt{background:#3b1a74;padding:7px 10px;display:flex;justify-content:space-between;font-family:'Press Start 2P',monospace;font-size:9px}.pop .pt button{background:none;border:none;color:#ff5f6d;cursor:pointer;font-size:14px}
.pop p{padding:10px;font-family:'Silkscreen',monospace;font-size:14px;cursor:pointer}
#sfxb{font-family:'Press Start 2P',monospace}
`;
  document.head.appendChild(s);
}

/* ---------- ARREGLO: la página ya no se mueve sola ---------- */
function fixJitter() {
  const tw = q("#tw"), c = q(".caret"); if (!tw || q(".twl")) return;
  const w = document.createElement("span"); w.className = "twl"; tw.before(w); w.append(tw); if (c) w.append(c);
  const br = q(".hero h1 br"); if (br) br.remove();
}
function trim() {
  ["#portafolio", ".stats", ".marq.rev", ".marq"].forEach(s => qa(s).forEach(e => e.remove()));
  qa('a[href="#portafolio"],#dots a[data-id="portafolio"]').forEach(a => { const li = a.closest("li"); (li || a).remove(); });
}

/* ---------- PORTADA: ventanas de plantillas apiladas en 3D ---------- */
function banner() {
  const old = q(".pxscene"); if (old) old.remove(); const h = q(".hero"); if (!h) return;
  const d = document.createElement("div"); d.className = "pxscene";
  d.innerHTML = scene(96, 26, null) + `<div class="coins">${[0, 1, 2, 3, 4].map(i => `<span style="animation-delay:${i * .15}s">${coin(4)}</span>`).join("")}</div><span class="spr abot" data-s="5">${bot(0, 5)}</span>`;
  h.after(d);
}
function stack() {
  const rc = q(".rcol"); if (!rc || q(".stk") || !window.PRESETS || !window.newW) return;
  const idx = [0, 1, 3, 4].filter(i => PRESETS[i]), pos = [["26%", "0%", "-90px"], ["16%", "17%", "-45px"], ["6%", "34%", "0px"], ["-4%", "51%", "45px"]];
  const st = document.createElement("div"); st.className = "stk";
  st.innerHTML = idx.map((i, k) => { const [key, o] = PRESETS[i], w = newW(key, o); return `<div class="sw" style="--l:${pos[k][0]};--t:${pos[k][1]};--z:${pos[k][2]};--d:-${k * 1.4}s"><div class="tb"><i></i><i></i><i></i></div><iframe sandbox="allow-scripts" tabindex="-1" title="${esc(w.name)}" srcdoc="${esc(window.pvHTML(w))}"></iframe></div>`; }).join("");
  rc.prepend(st);
  const fit = () => qa(".sw").forEach(s => { const f = s.querySelector("iframe"); if (f && s.clientWidth) f.style.transform = `scale(${s.clientWidth / 1100})`; }); fit(); addEventListener("resize", fit); setTimeout(fit, 400);
  if (!RM) h_move(rc);
}
function h_move(rc) {
  const h = q(".hero"); h.addEventListener("pointermove", e => { const r = h.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; rc.style.setProperty("--rx", (x * 18).toFixed(1)); rc.style.setProperty("--ry", (-y * 12).toFixed(1)); h.style.setProperty("--hx", (e.clientX - r.left) + "px"); h.style.setProperty("--hy", (e.clientY - r.top) + "px"); });
}
function scene(C, R2, pal) {
  const p = pal || { sky: ["#1e1040", "#3b1a74", "#7e22a3", "#d6409f", "#fb923c"], far: "#4a1a70", near: "#2a0f45", gr: "#8a3a14", sun: "#fde68a" };
  const rnd = (x, y) => { const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return v - Math.floor(v); };
  const sx = Math.round(C * .7), sy = Math.round(R2 * .5), sr = Math.round(R2 * .2);
  const hF = x => Math.round(R2 * .66 + Math.sin(x / 6) * R2 * .1 + Math.sin(x / 2.7) * R2 * .04), hN = x => Math.round(R2 * .84 + Math.sin(x / 4 + 2) * R2 * .05);
  const col = (x, y) => { if (y >= R2 - 2) return (x % 4 < 2) ? mixc(p.gr, "#000000", .35) : p.gr; if (y >= hN(x)) return p.near; if (y >= hF(x)) return p.far; if ((x - sx) ** 2 + (y - sy) ** 2 <= sr * sr) return p.sun; if (y < R2 * .45 && rnd(x, y) > .985) return "#ffffff"; return p.sky[Math.min(4, Math.floor(y / R2 * 5))]; };
  let o = ""; for (let y = 0; y < R2; y++) { let x = 0; while (x < C) { const k = col(x, y); let n = 1; while (x + n < C && col(x + n, y) === k) n++; o += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${k}"/>`; x += n; } }
  return `<svg viewBox="0 0 ${C} ${R2}" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" style="width:100%;height:100%;display:block">${o}</svg>`;
}
function animBots() { const seq = [0, 1, 0, 1, 0, 2]; let i = 0; setInterval(() => { i = (i + 1) % seq.length; qa(".abot").forEach(e => { e.innerHTML = bot(seq[i], +e.dataset.s || 5); }); }, 380); }

/* ---------- BOTONES GRANDES: Instagram, correo, compartir ---------- */
function connect() {
  const c = q("#conecta .container"); if (!c || q(".bigrow")) return;
  const S = CONFIG.SOCIAL, ig = (S.instagram || "").replace(/^@/, ""), tt = (S.tiktok || "").replace(/^@/, ""), B = [];
  if (ig) B.push(["ig", "ig", "Instagram", "@" + ig, "https://instagram.com/" + ig]);
  if (S.email) B.push(["mail", "mail", "Correo", S.email, "mailto:" + S.email]);
  if (tt) B.push(["tt", "tt", "TikTok", "@" + tt, "https://tiktok.com/@" + tt]);
  if (CONFIG.WHATSAPP) B.push(["msg", "wa", "WhatsApp", "Escríbenos", "https://wa.me/" + CONFIG.WHATSAPP.replace(/\D/g, "")]);
  B.push(["globe", "web", "Esta web", "Compartir enlace", "#share"]);
  const row = document.createElement("div"); row.className = "bigrow";
  row.innerHTML = B.map(b => `<a class="bigb ${b[1]}" href="${esc(b[4])}" ${b[4] === "#share" ? 'id="shr"' : 'target="_blank" rel="noopener"'}>${ic(b[0])}<span><small>${b[2]}</small><b>${esc(b[3])}</b></span></a>`).join("");
  const sub = c.querySelector(".sub"); (sub || c.firstChild).after(row);
  const sh = q("#shr"); if (sh) sh.onclick = e => { e.preventDefault(); const u = location.origin + location.pathname; if (navigator.share) navigator.share({ title: CONFIG.brand, url: u }).catch(() => {}); else navigator.clipboard.writeText(u).then(() => toast("Enlace copiado")); };
  const f = q("#fsoc"); if (f) f.innerHTML = B.filter(b => b[4] !== "#share").map(b => `<a class="fbtn ${b[1]}" href="${esc(b[4])}" target="_blank" rel="noopener" aria-label="${b[2]}">${ic(b[0])}</a>`).join("");
}

/* ---------- FORJA AI: ventana pixel ---------- */
function chatSkin() {
  const url = "url(\"data:image/svg+xml," + encodeURIComponent(bot(0, 1)) + "\")"; document.documentElement.style.setProperty("--botimg", url);
  const fab = q("#chatFab"); if (fab) fab.innerHTML = `<span class="abot" data-s="3">${bot(0, 3)}</span>`;
  const h = q(".chat-h"), d = h && h.firstElementChild; if (d && !d.querySelector(".abot")) { const w = document.createElement("span"); while (d.firstChild) w.appendChild(d.firstChild); const a = document.createElement("span"); a.className = "abot"; a.dataset.s = 4; a.innerHTML = bot(0, 4); d.append(a, w); }
  const b = q("#chat b"); if (b) b.textContent = "FORJA AI";
}
function popup(title, txt, delay, bottom) {
  setTimeout(() => {
    if (q("#chat.show")) return; const p = document.createElement("div"); p.className = "pop"; p.style.bottom = bottom + "px";
    p.innerHTML = `<div class="pt"><span>${title}</span><button aria-label="Cerrar">x</button></div><p>${txt}</p>`; document.body.appendChild(p);
    p.querySelector("button").onclick = () => p.remove(); p.querySelector("p").onclick = () => { p.remove(); openChat(true); }; setTimeout(() => p.remove(), 12000);
  }, delay);
}
function popups() { try { if (sessionStorage.getItem("pf_pp")) return; sessionStorage.setItem("pf_pp", "1"); } catch (e) {} popup("CHAT NUEVO", "¿Te armo una plantilla para tu negocio?", 9000, 110); popup("CHAT NUEVO", "Pagas una vez y el código es tuyo.", 12500, 200); }

/* ---------- JUEGO DE TICKETS ---------- */
function game() {
  const N = ULTIMATE.tickets, key = "pf_tk"; let got = []; try { got = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) {}
  const hud = document.createElement("div"); hud.id = "tkh"; document.body.appendChild(hud);
  const draw = () => { hud.innerHTML = `<span>TICKETS</span>${Array.from({ length: N }, (_, i) => `<i class="${i < got.length ? "on" : ""}"></i>`).join("")}`; };
  draw();
  const secs = qa("main section.sec").slice(0, N);
  secs.forEach((s, i) => {
    if (got.includes(i)) return; const t = document.createElement("button"); t.className = "tk"; t.setAttribute("aria-label", "Ticket"); t.innerHTML = ticket(4);
    t.style.left = (8 + Math.random() * 78).toFixed(0) + "%"; t.style.top = (14 + Math.random() * 62).toFixed(0) + "%"; s.appendChild(t);
    t.onclick = () => { got.push(i); try { localStorage.setItem(key, JSON.stringify(got)); } catch (e) {} t.remove(); draw(); sfx.beep(988); burst(t); toast("Ticket " + got.length + " de " + N); if (got.length >= N) setTimeout(reward, 600); };
  });
  if (got.length >= N) draw();
}
function burst(el) { if (RM) return; const r = el.getBoundingClientRect(); for (let i = 0; i < 14; i++) { const p = document.createElement("i"); p.style.cssText = `position:fixed;left:${r.left + 20}px;top:${r.top + 10}px;width:8px;height:8px;background:${["#ffd23f", "#ff8a3d", "#ff3d81"][i % 3]};z-index:900;pointer-events:none`; document.body.appendChild(p); p.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${(Math.random() - .5) * 160}px,${-30 - Math.random() * 120}px)`, opacity: 0 }], { duration: 700 }).onfinish = () => p.remove(); } }
function reward() {
  let o = q("#rwd"); if (!o) { o = document.createElement("div"); o.id = "rwd"; document.body.appendChild(o); }
  const R2 = ULTIMATE.reward;
  o.innerHTML = `<div class="rwb"><div class="abot" data-s="8">${bot(0, 8)}</div><h3>¡NIVEL COMPLETADO!</h3><p>Juntaste todos los tickets. Tu premio: ${esc(R2.text)}.</p><div class="rwc">${esc(R2.code)}</div><div class="row"><button class="btn primary" id="rwg">Canjear</button><button class="btn" id="rwx">Cerrar</button></div></div>`;
  o.classList.add("show"); q("#rwx").onclick = () => o.classList.remove("show");
  q("#rwg").onclick = () => { o.classList.remove("show"); const m = q("#cMsg"); if (m) m.value = "Hola, junté todos los tickets y quiero canjear el código " + R2.code + "."; location.hash = "contacto"; };
}

/* ---------- SONIDOS 8 BITS ---------- */
const sfx = { on: false, ac: null, beep(f) { if (!this.on) return; try { this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)(); const o = this.ac.createOscillator(), g = this.ac.createGain(); o.type = "square"; o.frequency.value = f; g.gain.value = .05; g.gain.exponentialRampToValueAtTime(.001, this.ac.currentTime + .12); o.connect(g); g.connect(this.ac.destination); o.start(); o.stop(this.ac.currentTime + .12); } catch (e) {} } };
function sound() {
  const t = q("#themeBtn"); if (!t) return; const b = document.createElement("button"); b.className = "icon-btn"; b.id = "sfxb"; b.setAttribute("aria-label", "Sonido"); b.innerHTML = '<span style="font-size:8px">SFX</span>'; t.before(b);
  b.onclick = () => { sfx.on = !sfx.on; b.firstChild.textContent = sfx.on ? "ON" : "SFX"; sfx.beep(660); };
  document.addEventListener("click", e => { if (e.target.closest(".btn,.bigb,.fbtn,.tpl,.wb")) sfx.beep(520); });
}

/* ---------- PLANTILLAS: iconos pixel, paisaje, partículas, luz ---------- */
const D2CSS = `.band{height:150px;border-block:4px solid #000;overflow:hidden}.pq{position:absolute;inset:0;pointer-events:none;z-index:0}.pq b{position:absolute;width:8px;height:8px;background:var(--c2);opacity:0;animation:pq 6s steps(8) infinite}@keyframes pq{0%{opacity:0;transform:translateY(0)}25%{opacity:.9}100%{opacity:0;transform:translateY(-60px)}}.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--hx,70%) var(--hy,20%),color-mix(in srgb,var(--c) 30%,transparent),transparent 60%);pointer-events:none;z-index:0}`;
const D2JS = `var pixSvg=${pixSvg.toString()};(function(){var cs=getComputedStyle(document.documentElement),c=cs.getPropertyValue("--c").trim(),c2=cs.getPropertyValue("--c2").trim(),ok=/^#[0-9a-f]{6}$/i;function lite(h){var n=[1,3,5].map(function(i){return parseInt(h.substr(i,2),16)});return "#"+n.map(function(v){return ("0"+Math.round(v+(255-v)*.5).toString(16)).slice(-2)}).join("")}if(ok.test(c)&&ok.test(c2)){document.querySelectorAll(".im svg,.core svg,.lg i svg,.ico svg,.fl svg,.ci svg").forEach(function(s){var sz=parseInt(s.getAttribute("width"))||28,m=s.outerHTML.replace(/currentColor/g,"#000").replace(/stroke-width="2"/g,'stroke-width="3.2"');if(m.indexOf("xmlns")<0)m=m.replace("<svg",'<svg xmlns="http://www.w3.org/2000/svg"');pixSvg(m,16,lite(c2),c,function(r){if(!r)return;var t=document.createElement("span");t.innerHTML=r;var n=t.firstChild;n.setAttribute("width",sz);n.setAttribute("height",sz);s.replaceWith(n)})})}var h=document.querySelector(".hero");if(h)document.addEventListener("pointermove",function(e){var r=h.getBoundingClientRect();h.style.setProperty("--hx",(e.clientX-r.left)+"px");h.style.setProperty("--hy",(e.clientY-r.top)+"px")})})();`;
function decorate2(html) {
  const m = html.match(/--c:(#[0-9a-f]{6});--c2:(#[0-9a-f]{6})/i), c = m ? m[1] : "#ff8a3d", c2 = m ? m[2] : "#ffd23f";
  const pal = { sky: [0, 1, 2, 3, 4].map(i => mixc(mixc(c, "#0b0618", .75), mixc(c2, "#ffffff", .25), i / 4)), far: mixc(c, "#0b0618", .55), near: mixc(c, "#0b0618", .78), gr: mixc(c2, "#000000", .6), sun: mixc(c2, "#ffffff", .55) };
  html = html.replace("<footer", `<div class="band">${scene(96, 18, pal)}</div><footer`);
  html = html.replace(/(<header class="hero[^"]*">)/, '$1<div class="pq">' + Array.from({ length: 10 }, (_, i) => `<b style="left:${(i * 41 + 7) % 96}%;top:${(i * 29 + 20) % 70}%;animation-delay:-${i % 6}s"></b>`).join("") + "</div>");
  return html.replace("</style>", D2CSS + "</style>").replace("</body>", "<script>" + D2JS + "<\/script></body>");
}
function templates() {
  if (!window.pvHTML || window.__pv2) return; const prev = window.pvHTML; window.pvHTML = w => decorate2(prev(w)); window.__pv2 = 1;
  if (window.renderEx) window.renderEx(); if (window.schedPrev) schedPrev();
}

/* ---------- ARRANQUE ---------- */
function boot() { [css, fixJitter, trim, templates, banner, stack, icons, connect, chatSkin, popups, sound, game, animBots].forEach(f => { try { f(); } catch (e) { console.warn("ultimate:", f.name, e); } }); }
if (document.readyState === "complete") boot(); else addEventListener("load", boot);
})();
