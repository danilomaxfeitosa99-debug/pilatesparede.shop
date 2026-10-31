/* =========================================================
   MOTOR DO QUIZ
   Renderiza as etapas definidas em js/steps.js usando as
   configurações de js/config.js. Normalmente você não precisa
   mexer aqui — edite steps.js e config.js.
   ========================================================= */
(function () {
  "use strict";

  const CFG = window.QUIZ_CONFIG || {};
  const STEPS = window.QUIZ_STEPS || [];
  const STORAGE_KEY = "quiz-pilates-parede";

  const app = document.getElementById("app");
  const progressBar = document.getElementById("progressBar");
  const backBtn = document.getElementById("backBtn");
  const stickyCta = document.getElementById("stickyCta");
  const stickyCtaLink = document.getElementById("stickyCtaLink");
  const toast = document.getElementById("toast");

  let current = 0;
  let answers = loadAnswers();
  let timers = [];

  /* ---------- utilidades ---------- */
  function el(tag, cls, html) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function clearTimers() {
    timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    timers = [];
  }

  function later(fn, ms) { const t = setTimeout(fn, ms); timers.push(t); return t; }
  function every(fn, ms) { const t = setInterval(fn, ms); timers.push(t); return t; }

  function loadAnswers() {
    if (!CFG.persistAnswers) return {};
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (e) { return {}; }
  }

  function saveAnswer(key, value) {
    if (!key) return;
    answers[key] = value;
    if (CFG.persistAnswers) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch (e) { /* ignore */ }
    }
  }

  function interpolate(str) {
    return String(str).replace(/\{\{(\w+)\}\}/g, (_, k) => {
      const v = answers[k];
      return v ? escapeHtml(String(v)) : "";
    });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function checkoutHref() {
    return CFG.checkoutUrl || "#";
  }

  function makeCtaLink(text, extraClass) {
    const a = el("a", "btn btn--green btn--pulse " + (extraClass || ""), text);
    a.href = checkoutHref();
    if (CFG.checkoutNewTab) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  /* ---------- navegação ---------- */
  function go(index) {
    if (index < 0 || index >= STEPS.length) return;
    clearTimers();
    current = index;
    render();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function next() { go(current + 1); }
  function prev() { go(current - 1); }

  backBtn.addEventListener("click", prev);

  function updateChrome(step) {
    const pct = Math.round(((current + 1) / STEPS.length) * 100);
    progressBar.style.width = pct + "%";
    backBtn.hidden = current === 0 || step.type === "final";
    stickyCta.hidden = step.type !== "final";
    document.body.classList.toggle("has-sticky", step.type === "final");
  }

  /* ---------- render ---------- */
  function render() {
    const step = STEPS[current];
    app.innerHTML = "";
    app.className = "step step--" + step.type + (step.align === "left" ? " step--left" : "");
    updateChrome(step);

    const renderers = {
      info: renderInfo,
      single: renderChoice,
      multi: renderChoice,
      weight: renderWeight,
      input: renderInput,
      loadingTestimonials: renderLoadingTestimonials,
      loadingBars: renderLoadingBars,
      final: renderFinal
    };
    (renderers[step.type] || renderInfo)(step);
  }

  /* INFO */
  function renderInfo(step) {
    if (step.title) app.appendChild(el("h1", "title", interpolate(step.title)));
    if (step.subtitle) app.appendChild(el("p", "subtitle", step.subtitle));
    if (step.carousel) app.appendChild(buildCarousel(step.carousel, { captions: true, autoplay: 3500 }));
    if (step.image) {
      const wrap = el("div", "media" + (step.imageRounded ? " media--rounded" : ""));
      const img = el("img"); img.src = step.image; img.alt = ""; img.loading = "lazy";
      wrap.appendChild(img);
      app.appendChild(wrap);
    }
    if (step.text) app.appendChild(el("p", "text", step.text));
    if (step.html) app.appendChild(el("div", "rich", step.html));
    const btn = el("button", "btn btn--primary", step.button || "Continuar");
    btn.type = "button";
    btn.addEventListener("click", next);
    app.appendChild(btn);
    if (step.note) app.appendChild(el("div", "note-box", step.note));
  }

  /* SINGLE / MULTI */
  function renderChoice(step) {
    const multi = step.type === "multi";
    app.appendChild(el("h1", "title", step.title));
    if (step.subtitle) app.appendChild(el("p", "subtitle", step.subtitle));

    const list = el("div", "options" + (step.layout === "grid" ? " options--grid" : ""));
    const selected = new Set();

    step.options.forEach((opt, i) => {
      const card = el("button", "option" + (opt.desc ? " option--rich" : "") + (opt.img ? " option--img" : ""));
      card.type = "button";
      let inner = "";
      if (opt.img) inner += `<img class="option__img" src="${opt.img}" alt="">`;
      inner += `<span class="option__body"><span class="option__title">${opt.title}</span>` +
               (opt.desc ? `<span class="option__desc">${opt.desc}</span>` : "") + `</span>`;
      inner += multi
        ? `<span class="option__check option__check--box" aria-hidden="true"></span>`
        : `<span class="option__check" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></span>`;
      card.innerHTML = inner;

      card.addEventListener("click", () => {
        if (multi) {
          card.classList.toggle("is-selected");
          if (selected.has(i)) selected.delete(i); else selected.add(i);
          contBtn.disabled = selected.size === 0;
        } else {
          [...list.children].forEach((c) => c.classList.remove("is-selected"));
          card.classList.add("is-selected");
          saveAnswer(step.key, opt.title.replace(/<[^>]+>/g, ""));
          later(next, 250);
        }
      });
      list.appendChild(card);
    });
    app.appendChild(list);

    let contBtn;
    if (multi) {
      contBtn = el("button", "btn btn--primary", step.button || "Continuar");
      contBtn.type = "button";
      contBtn.disabled = true;
      contBtn.addEventListener("click", () => {
        saveAnswer(step.key, [...selected].map((i) => step.options[i].title.replace(/<[^>]+>/g, "")));
        next();
      });
      app.appendChild(contBtn);
    }
    if (step.note) app.appendChild(el("div", "note-box", step.note));
  }

  /* PESO (slider) */
  function renderWeight(step) {
    if (step.intro) app.appendChild(el("p", "text text--muted", step.intro));
    app.appendChild(el("h1", "title", step.title));

    let unit = "kg";
    let value = step.initial || 70;

    const toggle = el("div", "unit-toggle");
    const kgBtn = el("button", "unit-toggle__btn is-active", "kg"); kgBtn.type = "button";
    const lbBtn = el("button", "unit-toggle__btn", "lb"); lbBtn.type = "button";
    toggle.append(kgBtn, lbBtn);

    const display = el("div", "weight-display");
    const PX = 12; // pixels por unidade na régua
    let min = step.min || 40, max = step.max || 250;

    const ruler = el("div", "ruler");
    ruler.tabIndex = 0;
    ruler.setAttribute("role", "slider");
    ruler.setAttribute("aria-label", "Peso");
    const strip = el("div", "ruler__strip");
    const pointer = el("div", "ruler__pointer");
    ruler.append(strip, pointer);
    const hint = el("div", "hint", "Arraste para ajustar");

    function buildStrip() {
      strip.innerHTML = "";
      strip.style.width = (max - min) * PX + "px";
      for (let v = min; v <= max; v++) {
        const t = el("span", "ruler__tick" + (v % 10 === 0 ? " ruler__tick--major" : v % 5 === 0 ? " ruler__tick--mid" : ""));
        t.style.left = (v - min) * PX + "px";
        if (v % 10 === 0) t.innerHTML = `<i>${v}</i>`;
        strip.appendChild(t);
      }
    }
    function setUnit(u) {
      if (u === unit) return;
      if (u === "lb") { value = Math.round(value * 2.2046); min = Math.round((step.min || 40) * 2.2046); max = Math.round((step.max || 250) * 2.2046); }
      else { value = Math.round(value / 2.2046); min = step.min || 40; max = step.max || 250; }
      unit = u;
      kgBtn.classList.toggle("is-active", u === "kg");
      lbBtn.classList.toggle("is-active", u === "lb");
      buildStrip();
      update();
    }
    function update() {
      value = Math.max(min, Math.min(max, Math.round(value)));
      display.innerHTML = `${value}<small>${unit}</small>`;
      const center = ruler.clientWidth / 2;
      strip.style.transform = `translateX(${center - (value - min) * PX}px)`;
      ruler.setAttribute("aria-valuenow", value);
      ruler.setAttribute("aria-valuemin", min);
      ruler.setAttribute("aria-valuemax", max);
    }

    let dragging = false, startX = 0, startVal = 0;
    ruler.addEventListener("pointerdown", (e) => { dragging = true; startX = e.clientX; startVal = value; ruler.setPointerCapture(e.pointerId); });
    ruler.addEventListener("pointermove", (e) => { if (!dragging) return; value = startVal - (e.clientX - startX) / PX; update(); });
    ruler.addEventListener("pointerup", () => { dragging = false; });
    ruler.addEventListener("pointercancel", () => { dragging = false; });
    ruler.addEventListener("wheel", (e) => { e.preventDefault(); value += Math.sign(e.deltaX || e.deltaY); update(); }, { passive: false });
    ruler.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") { value++; update(); e.preventDefault(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") { value--; update(); e.preventDefault(); }
    });
    kgBtn.addEventListener("click", () => setUnit("kg"));
    lbBtn.addEventListener("click", () => setUnit("lb"));

    const btn = el("button", "btn btn--primary", step.button || "Continuar");
    btn.type = "button";
    btn.addEventListener("click", () => { saveAnswer(step.key, value + unit); next(); });

    app.append(toggle, display, ruler, hint, btn);
    buildStrip();
    later(update, 0);
    window.addEventListener("resize", update);
  }

  /* INPUT */
  function renderInput(step) {
    app.appendChild(el("h1", "title", step.title));
    const form = el("form", "form");
    form.noValidate = true;
    if (step.label) form.appendChild(el("label", "form__label", step.label));
    const input = el("input", "form__input");
    input.type = step.inputType || "text";
    input.placeholder = step.placeholder || "";
    input.required = true;
    if (step.inputType === "number") { input.inputMode = "decimal"; input.min = 1; }
    if (step.inputType === "email") input.autocomplete = "email";
    if (step.key === "nome") input.autocomplete = "given-name";
    const error = el("div", "form__error", "");
    const btn = el("button", "btn btn--primary", step.button || "Continuar");
    btn.type = "submit";
    form.append(input, error, btn);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      let ok = v.length > 0;
      if (ok && step.inputType === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (ok && step.inputType === "number") ok = Number(v) > 0;
      if (!ok) { error.textContent = step.inputType === "email" ? "Digite um e-mail válido." : "Preencha este campo."; input.focus(); return; }
      saveAnswer(step.key, v);
      next();
    });

    app.appendChild(form);
    (step.notes || []).forEach((n, i) => app.appendChild(el("p", "note" + (i === 0 ? " note--strong" : ""), n)));
    later(() => input.focus(), 50);
  }

  /* CARREGANDO + DEPOIMENTOS */
  function renderLoadingTestimonials(step) {
    app.appendChild(el("p", "text", step.text));
    const slides = step.testimonials.map((t) => ({ html:
      `<div class="testi"><div class="stars">★★★★★</div><div class="testi__name">${t.name}</div><div class="testi__handle">${t.handle}</div><div class="testi__text">${t.text}</div></div>` }));
    app.appendChild(buildCarousel(slides, { autoplay: 2500, html: true, compact: true }));

    const row = el("div", "load-row", `<span>${step.label || "Carregando..."}</span><span class="load-row__pct">0%</span>`);
    const bar = el("div", "load-bar", `<div class="load-bar__fill"></div>`);
    app.append(row, bar);

    const fill = bar.firstChild;
    const pctEl = row.querySelector(".load-row__pct");
    const total = CFG.loadingTestimonialsMs || 7000;
    const start = Date.now();
    every(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / total) * 100));
      fill.style.width = p + "%";
      pctEl.textContent = p + "%";
      if (p >= 100) { clearTimers(); later(next, 400); }
    }, 60);
  }

  /* CARREGANDO 3 BARRAS */
  function renderLoadingBars(step) {
    const wrap = el("div", "bars");
    const items = step.bars.map((label) => {
      const row = el("div", "load-row", `<span>${label}</span><span class="load-row__pct">0%</span>`);
      const bar = el("div", "load-bar", `<div class="load-bar__fill"></div>`);
      wrap.append(row, bar);
      return { fill: bar.firstChild, pct: row.querySelector(".load-row__pct") };
    });
    app.appendChild(wrap);
    app.appendChild(el("h2", "title title--sm", step.headline));
    const btn = el("button", "btn btn--primary", step.button || "Continuar");
    btn.type = "button";
    btn.hidden = true;
    btn.addEventListener("click", next);
    app.appendChild(btn);

    const dur = CFG.loadingBarMs || 1800;
    let i = 0;
    function runBar() {
      if (i >= items.length) { btn.hidden = false; return; }
      const it = items[i]; const start = Date.now();
      const iv = every(() => {
        const p = Math.min(100, Math.round(((Date.now() - start) / dur) * 100));
        it.fill.style.width = p + "%"; it.pct.textContent = p + "%";
        if (p >= 100) { clearInterval(iv); i++; runBar(); }
      }, 50);
    }
    runBar();
  }

  /* PÁGINA FINAL */
  function renderFinal(step) {
    const s = (html) => app.appendChild(el("section", "block", html));

    s(`<h2 class="title title--left">${interpolate(step.headline)}</h2>` + step.intro.map((p) => `<p>${p}</p>`).join(""));

    const hero = el("section", "block hero");
    hero.innerHTML = `<img src="${step.heroImage}" alt="">` +
      (step.heroLabels ? `<div class="hero__labels"><span>${step.heroLabels[0]}</span><span>${step.heroLabels[1]}</span></div>` : "");
    app.appendChild(hero);

    if (step.highlight) s(`<div class="box box--yellow"><p><b>${step.highlight.title}</b></p><p>${step.highlight.text}</p></div>`);

    s(`<h3 class="h3 h3--green">${step.receiveTitle}</h3>` + step.receiveItems.map((i) => `<p>${i}</p>`).join(""));

    if (step.access) s(`<div class="box box--blue"><h3 class="h3 h3--blue">${step.access.title}</h3>${step.access.paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>`);

    const p = step.price;
    s(`<div class="price"><div class="price__badge">${p.badge}</div>
        <div class="price__row">
          <div class="price__inst"><b>${p.installments}</b> <b class="green">${p.installmentValue}</b> <span>ou</span></div>
          <div class="price__total"><div class="price__off">${p.discountLabel}</div><div class="price__value"><span>R$</span> ${p.total}</div><div class="price__suffix">${p.totalSuffix}</div></div>
        </div></div>
       <p class="center small">${p.note}</p>`);

    s(step.bonuses.map((b) => `<div class="bonus"><div><span class="accent"><b>${b.label}</b></span> <b>${b.title}</b> ${b.desc}<br><b>De ${b.from} por <span class="accent"><u>R$0,00</u> (De Graça)</span></b></div><span class="bonus__dot"></span></div>`).join(""));

    const timer = el("section", "block timer");
    timer.innerHTML = `<div class="timer__box"><div class="timer__num" id="tMin">${String(CFG.timerMinutes || 10).padStart(2, "0")}</div><div class="timer__label">min</div></div><div class="timer__sep">:</div><div class="timer__box"><div class="timer__num" id="tSec">00</div><div class="timer__label">seg</div></div>`;
    app.appendChild(timer);
    startTimer(timer.querySelector("#tMin"), timer.querySelector("#tSec"));

    s(`<img class="full" src="${step.offerImage}" alt="">`);

    const cta1 = el("section", "block");
    cta1.appendChild(makeCtaLink(step.ctaText));
    app.appendChild(cta1);

    if (step.raffle) s(`<div class="box box--purple center">${step.raffle.lines.map((l) => `<p>${l}</p>`).join("")}${step.raffle.items.map((l) => `<p class="left">${l}</p>`).join("")}</div>`);

    const testiSlides = step.testimonials.map((t) => ({ html:
      `<div class="testi testi--avatar"><img src="${t.img}" alt=""><div><div class="testi__name">${t.name}</div><div class="testi__handle">${t.handle}</div><div class="testi__text">${t.text}</div></div></div>` }));
    const tWrap = el("section", "block");
    tWrap.appendChild(buildCarousel(testiSlides, { autoplay: 4000, html: true, compact: true }));
    app.appendChild(tWrap);

    s(`<p class="center">${step.resultsTitle}</p>`);
    const rWrap = el("section", "block");
    rWrap.appendChild(buildCarousel(step.resultsImages.map((img) => ({ img })), { autoplay: 4000 }));
    app.appendChild(rWrap);

    s(`<h3 class="h3">${step.benefitsTitle}</h3>` + step.benefits.map((b) => `<p>${b}</p>`).join(""));
    s(`<div class="box box--yellow">${step.priceArgument.map((b) => `<p>${b}</p>`).join("")}</div>`);
    s(`<img class="full" src="${step.offerImage}" alt="">`);

    const cta2 = el("section", "block");
    cta2.appendChild(makeCtaLink(step.ctaText2 || step.ctaText));
    app.appendChild(cta2);

    s(`<img class="full" src="${step.guaranteeImage}" alt="Garantia de 90 dias">`);

    const faq = el("section", "block faq");
    step.faq.forEach((item, i) => {
      const d = el("details", "faq__item");
      if (i === 0) d.open = true;
      d.innerHTML = `<summary>${item.q}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></summary><div class="faq__body"><p>${item.a}</p></div>`;
      faq.appendChild(d);
    });
    app.appendChild(faq);

    stickyCtaLink.href = checkoutHref();
    stickyCtaLink.textContent = step.ctaText;
    if (CFG.checkoutNewTab) { stickyCtaLink.target = "_blank"; stickyCtaLink.rel = "noopener"; }

    startSocialProof();
  }

  /* ---------- timer ---------- */
  function startTimer(minEl, secEl) {
    let remaining = (CFG.timerMinutes || 10) * 60;
    const tick = () => {
      const m = Math.floor(remaining / 60), s = remaining % 60;
      minEl.textContent = String(m).padStart(2, "0");
      secEl.textContent = String(s).padStart(2, "0");
      if (remaining > 0) remaining--;
    };
    tick();
    every(tick, 1000);
  }

  /* ---------- prova social ---------- */
  function startSocialProof() {
    const sp = CFG.socialProof;
    if (!sp || !sp.enabled) return;
    let spots = CFG.initialSpots || 8;
    let n = 0;
    const show = () => {
      const name = sp.names[n % sp.names.length];
      const src = sp.sources[Math.floor(Math.random() * sp.sources.length)];
      spots = Math.max(1, spots - 1);
      n++;
      toast.innerHTML = `<b>🧹 ${name} acabou de garantir o Pilates de Parede via ${src}!</b><span>Corra! Faltam apenas <b>${spots}</b> ofertas disponíveis nessa promoção</span>`;
      toast.hidden = false;
      toast.classList.add("is-visible");
      later(() => { toast.classList.remove("is-visible"); later(() => { toast.hidden = true; }, 400); }, 5000);
    };
    later(() => { show(); every(show, sp.intervalMs || 14000); }, sp.firstDelayMs || 6000);
  }

  /* ---------- carrossel ---------- */
  function buildCarousel(items, opts) {
    opts = opts || {};
    const root = el("div", "carousel" + (opts.compact ? " carousel--compact" : ""));
    const track = el("div", "carousel__track");
    items.forEach((it) => {
      const slide = el("div", "carousel__slide");
      if (opts.html) slide.innerHTML = it.html;
      else {
        slide.innerHTML = `<div class="card"><img src="${it.img}" alt="" loading="lazy">${opts.captions && it.caption ? `<div class="card__caption">${it.caption}</div>` : ""}</div>`;
      }
      track.appendChild(slide);
    });
    const dots = el("div", "carousel__dots");
    const maxDots = Math.min(items.length, 5);
    for (let i = 0; i < maxDots; i++) dots.appendChild(el("span", "carousel__dot" + (i === 0 ? " is-active" : "")));
    root.append(track, dots);

    let idx = 0;
    let pause = false;
    function goTo(i) {
      idx = (i + items.length) % items.length;
      const slide = track.children[idx];
      track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
      [...dots.children].forEach((d, k) => d.classList.toggle("is-active", k === idx % maxDots));
    }
    track.addEventListener("scroll", () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bestD = Infinity;
      [...track.children].forEach((s, k) => {
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
        if (d < bestD) { bestD = d; best = k; }
      });
      idx = best;
      [...dots.children].forEach((d, k) => d.classList.toggle("is-active", k === idx % maxDots));
    }, { passive: true });
    ["pointerdown", "touchstart"].forEach((ev) => track.addEventListener(ev, () => { pause = true; }, { passive: true }));
    ["pointerup", "touchend"].forEach((ev) => track.addEventListener(ev, () => { later(() => { pause = false; }, 4000); }, { passive: true }));
    if (opts.autoplay) every(() => { if (!pause) goTo(idx + 1); }, opts.autoplay);
    later(() => goTo(0), 50);
    return root;
  }

  /* ---------- start ---------- */
  go(0);
})();
