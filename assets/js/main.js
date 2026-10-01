(function () {
  "use strict";

  var S = window.SITE;

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function text(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  // ---------- nav ----------
  function renderNav() {
    var list = document.getElementById("navList");
    S.nav.forEach(function (item) {
      var li = el("li");
      var a = el("a", null, item.label);
      a.href = item.href;
      li.appendChild(a);
      list.appendChild(li);
    });

    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("siteNav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- hero ----------
  function renderHero() {
    text("heroKicker", S.hero.kicker);
    text("heroTitle", S.hero.title);
    text("heroSubtitle", S.hero.subtitle);
    text("heroCtaPrimary", S.hero.ctaPrimary);
    text("heroCtaSecondary", S.hero.ctaSecondary);
    text("heroInitials", S.person.initials);
    var heroCta = document.getElementById("heroCtaPrimary");
    heroCta.href = S.contacts.cvFile;
    heroCta.setAttribute("download", S.contacts.cvFileName);
  }

  // ---------- pains ----------
  function renderPains() {
    var grid = document.getElementById("painsGrid");
    S.pains.forEach(function (p) {
      var card = el("div", "pain-card");
      card.appendChild(el("p", "problem", p.problem));
      card.appendChild(el("p", "arrow", "↓"));
      card.appendChild(el("p", "solution", p.solution));
      grid.appendChild(card);
    });
  }

  // ---------- steps ----------
  function renderSteps() {
    var grid = document.getElementById("stepsGrid");
    S.steps.forEach(function (s) {
      var card = el("div", "step");
      card.appendChild(el("h3", null, s.title));
      card.appendChild(el("p", null, s.text));
      grid.appendChild(card);
    });
  }

  // ---------- about ----------
  function renderAbout() {
    var wrap = document.getElementById("aboutText");
    S.about.text.forEach(function (line) {
      wrap.appendChild(el("p", null, line));
    });
    var skills = document.getElementById("skillList");
    S.about.skills.forEach(function (s) {
      skills.appendChild(el("li", null, s));
    });
  }

  // ---------- experience ----------
  function renderExperience() {
    var body = document.getElementById("expBody");
    S.experience.forEach(function (row) {
      var tr = el("tr");
      var cells = [
        ["Период", row.period],
        ["Роль", row.role],
        ["Место", row.place],
        ["Результат", row.result]
      ];
      cells.forEach(function (c) {
        var td = el("td", null, c[1]);
        td.setAttribute("data-label", c[0]);
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });

    var grid = document.getElementById("projectsGrid");
    S.projects.forEach(function (p) {
      var card = el("div", "project-card");
      card.appendChild(el("span", "project-tag", p.tag));
      card.appendChild(el("h3", null, p.title));
      card.appendChild(el("p", null, p.text));
      grid.appendChild(card);
    });
  }

  // ---------- research ----------
  function renderResearch() {
    text("researchIntro", S.research.intro);
    var iv = S.research.forms.interview;
    var sub = S.research.forms.subscribe;
    text("interviewTitle", iv.title);
    text("interviewText", iv.text);
    text("interviewSubmit", iv.submitLabel);
    text("subscribeTitle", sub.title);
    text("subscribeText", sub.text);
    text("subscribeSubmit", sub.submitLabel);
    applySubscribeVisibility();
  }

  function applySubscribeVisibility() {
    var card = document.getElementById("subscribeForm");
    var show = localStorage.getItem("siteAdmin.showResearchSubscribeForm");
    var visible = show === null ? true : show === "true";
    card.classList.toggle("is-hidden", !visible);
  }

  // ---------- trust ----------
  function renderTrust() {
    var grid = document.getElementById("testimonialGrid");
    S.testimonials.forEach(function (t) {
      var card = el("div", "testimonial");
      card.appendChild(el("p", "quote", "«" + t.text + "»"));
      card.appendChild(el("p", "author", t.author));
      grid.appendChild(card);
    });
    var logos = document.getElementById("logoRow");
    ["Studio Norden", "North Lab", "Formata", "Kvant Product"].forEach(function (name) {
      logos.appendChild(el("span", "logo-chip", name));
    });
  }

  // ---------- faq ----------
  function renderFaq() {
    var list = document.getElementById("faqList");
    S.faq.forEach(function (item) {
      var details = el("details", "faq-item");
      var summary = el("summary", null, item.q);
      var p = el("p", null, item.a);
      details.appendChild(summary);
      details.appendChild(p);
      list.appendChild(details);
    });
  }

  // ---------- final cta ----------
  function renderFinalCta() {
    text("finalCtaTitle", S.finalCta.title);
    text("finalCtaText", S.finalCta.text);
    text("finalCtaBtn", S.finalCta.button);
  }

  // ---------- contacts ----------
  function renderContacts() {
    var list = document.getElementById("contactList");
    var rows = [
      ["Почта", S.contacts.email, "mailto:" + S.contacts.email],
      ["Телефон", S.contacts.phone, "tel:" + S.contacts.phoneHref],
      ["Telegram", "написать", S.contacts.telegram],
      ["LinkedIn", "профиль", S.contacts.linkedin]
    ];
    rows.forEach(function (r) {
      var li = el("li");
      li.appendChild(el("span", "label", r[0]));
      var a = el("a", null, r[1]);
      a.href = r[2];
      li.appendChild(a);
      list.appendChild(li);
    });

    var downloadBtn = document.getElementById("downloadCvBtn");
    downloadBtn.href = S.contacts.cvFile;
    downloadBtn.setAttribute("download", S.contacts.cvFileName);

    document.getElementById("saveContactBtn").addEventListener("click", function () {
      var vcf = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:" + S.person.name.split(" ").reverse().join(";"),
        "FN:" + S.person.name,
        "TITLE:" + S.person.role,
        "EMAIL:" + S.contacts.email,
        "TEL:" + S.contacts.phone,
        "END:VCARD"
      ].join("\r\n");
      var blob = new Blob([vcf], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "mariya-volkova.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      document.getElementById("contactFeedback").textContent = "Файл mariya-volkova.vcf сохранён в загрузки";
    });
  }

  // ---------- form handling ----------
  var VALIDATORS = {
    name: function (v) { return v.trim().length >= 2; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    experience: function (v) { return v.trim().length >= 2; },
    message: function (v) { return v.trim().length >= 5; }
  };

  function validateForm(form) {
    var ok = true;
    form.querySelectorAll(".field").forEach(function (field) {
      var name = field.getAttribute("data-field");
      var input = field.querySelector("input, textarea");
      var validator = VALIDATORS[name];
      var valid = !validator || validator(input.value);
      field.classList.toggle("has-error", !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  function saveSubmission(type, data) {
    var key = "siteSubmissions";
    var list = [];
    try {
      list = JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      list = [];
    }
    list.push({
      type: type,
      data: data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(list));
  }

  function showNote(noteEl, text, kind) {
    noteEl.textContent = text;
    noteEl.className = "form-note show " + kind;
  }

  function wireForm(formId, type, noteId, successText, fields) {
    var form = document.getElementById(formId);
    var note = document.getElementById(noteId);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        showNote(note, "Проверьте поля, отмеченные красным", "error");
        return;
      }
      var data = {};
      fields.forEach(function (f) {
        data[f] = form.querySelector("[name=" + f + "]").value.trim();
      });
      saveSubmission(type, data);
      showNote(note, successText, "success");
      form.reset();
      form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
    });
  }

  function wireForms() {
    wireForm("interviewForm", "interview", "interviewNote", S.research.forms.interview.successText, ["name", "email", "experience"]);
    wireForm("subscribeForm", "subscribe", "subscribeNote", S.research.forms.subscribe.successText, ["email"]);
    wireForm("contactForm", "contact", "contactFormNote", "Сообщение отправлено, отвечу в течение двух дней", ["name", "email", "message"]);
  }

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", function () {
    renderNav();
    renderHero();
    renderPains();
    renderSteps();
    renderAbout();
    renderExperience();
    renderResearch();
    renderTrust();
    renderFaq();
    renderFinalCta();
    renderContacts();
    wireForms();

    window.addEventListener("storage", function (e) {
      if (e.key === "siteAdmin.showResearchSubscribeForm") {
        applySubscribeVisibility();
      }
    });
  });
})();
