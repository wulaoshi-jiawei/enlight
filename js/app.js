/* Enlight — site interactions (no external dependencies) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function disableVideo(video) {
    if (!video) return;
    try { video.pause(); } catch (e) {}
    video.removeAttribute("autoplay");
    var source = video.querySelector("source");
    if (source) source.removeAttribute("src");
    video.removeAttribute("src");
    try { video.load(); } catch (e) {}
  }

  function initCover() {
    var cover = $(".cover");
    if (!cover) return;
    var brand = document.querySelector(".float-brand");
    var video = cover.querySelector(".cover-video");
    var fallback = cover.querySelector(".cover-fallback");
    if (video) {
      var showAerial = function () {
        cover.classList.add("is-fallback");
        if (fallback) fallback.removeAttribute("aria-hidden");
        disableVideo(video);
      };
      if (prefersReducedMotion()) {
        showAerial();
      } else {
        video.addEventListener("error", showAerial);
        var source = video.querySelector("source");
        if (source) source.addEventListener("error", showAerial);
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      }
    }
    var onScroll = function () {
      var past = cover.getBoundingClientRect().bottom < 80;
      document.body.classList.toggle("is-past-cover", past);
      if (brand) brand.setAttribute("aria-hidden", past ? "false" : "true");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var PLACES = {
    wudang: {
      tag: "The heartland · Hubei",
      title: "Wudang Mountain",
      body: [
        "A long ridge of temples and forest in north-western Hubei, and one of the old centres of Daoist practice. The temple complex on the mountain is a UNESCO World Heritage Site. It is where we hold the twenty-four solar-term retreats.",
        "The nearest airport and high-speed rail station are in Shiyan."
      ],
      list: [
        "24 Solar Terms retreats — ten days, nine nights",
        "Stays at Yuanhe Meisu or Wudang Mountain Narada Resort"
      ],
      actions: [
        { label: "Solar Terms retreats", href: "solar-terms.html", primary: true },
        { label: "Wudang Narada", href: "index.html#houses" }
      ]
    },
    jixinling: {
      tag: "The heartland · Zhuxi County, Hubei",
      title: "Jixinling",
      body: [
        "On a map, China has the outline of a rooster, and Jixinling — a ridge at the western edge of Zhuxi County, where Hubei, Shaanxi and Chongqing meet — sits close to its heart.",
        "It is the inward point of the summer masterclass: the Guanya wall, Hangtu Town and the tea hills are all nearby, and the road west runs on through Ankang to Xi’an and the Silk Road."
      ],
      list: [
        "The meeting-point of Hubei, Shaanxi and Chongqing",
        "Close to Wudang Mountain, in the same corner of north-western Hubei"
      ],
      actions: [
        { label: "Zhuxi Masterclass", href: "zhuxi.html#masterclass", primary: true },
        { label: "Zhuxi in more depth", href: "zhuxi.html" }
      ]
    },
    hangzhou: {
      tag: "Port of entry · and a destination",
      title: "Hangzhou",
      body: [
        "A port as well as a place to stay. West Lake and the tea hills are close at hand, and the city is an easy arrival from the east.",
        "We are preparing the Hangzhou Artificial Intelligence Camp. Dates and a syllabus will be published when they are ready."
      ],
      list: [
        "One of the six ports of entry",
        "West Lake, and Longjing tea country",
        "Eastern line: Shanghai → Hangzhou"
      ],
      actions: [
        { label: "Hangzhou Artificial Intelligence Camp", href: "hangzhou.html", primary: true },
        { label: "Plan a journey", href: "#contact" }
      ]
    },
    shanghai: {
      tag: "Port of entry · home of Enlight",
      title: "Shanghai",
      body: [
        "Enlight is based in Shanghai, a straightforward international arrival, with flights and high-speed rail onward toward Shiyan — the station for Wudang and for Zhuxi."
      ],
      list: [
        "Home of Enlight",
        "One of the six ports of entry",
        "Eastern line: Shanghai → Hangzhou"
      ],
      actions: [
        { label: "About Enlight", href: "about.html", primary: true }
      ]
    },
    beijing: {
      tag: "Port of entry · the north",
      title: "Beijing",
      body: [
        "In Beijing the older China and the present one share the same streets: the Forbidden City, the Summer Palace, the Temple of Heaven, the hutongs, and a capital that holds more than one century at once.",
        "Departing from Beijing, there is no shortage of travel inspiration: Pingyao, Chengde, Datong — so many stops in a lesser-known China. From here you can also follow the Wall east to Shanhaiguan, then on to Changbai’s Heaven Lake in the forests of Jilin.",
        "It is also a short flight, or a day’s rail journey, inland to Shiyan, for Wudang and Zhuxi."
      ],
      list: [
        "One of the six ports of entry",
        "Northern line: Beijing → Shanhaiguan → Changbai"
      ],
      actions: [
        { label: "View the lines", href: "map.html#routes" }
      ]
    },
    hongkong: {
      tag: "Port of entry · the south",
      title: "Hong Kong",
      body: [
        "A southern international port — a natural arrival for travellers coming from Southeast Asia, Australia and the Pacific — with onward connections into the mainland.",
        "For a southern beginning, Hong Kong and Xiamen are the two ports we use."
      ],
      list: [
        "One of the six ports of entry",
        "Southern line: Kunming → Xishuangbanna"
      ],
      actions: [
        { label: "View the lines", href: "map.html#routes" }
      ]
    },
    xiamen: {
      tag: "Port of entry · the south",
      title: "Xiamen",
      body: [
        "A coastal city in Fujian, and the mainland port we use for a southern arrival. The sea is close; a short flight or the rail line takes you north toward the heartland, or further into the south.",
        "Travellers who want to begin in the south come in through Xiamen or through Hong Kong."
      ],
      list: [
        "One of the six ports of entry",
        "Southern line: Kunming → Xishuangbanna"
      ],
      actions: [
        { label: "View the lines", href: "map.html#routes" }
      ]
    },
    xian: {
      tag: "Port of entry · the west and the heartland",
      title: "Xi’an",
      body: [
        "An ancient capital, and the classic starting point of the Silk Road in China. Arrive here and the west opens — Tianshui, Lanzhou, Zhangye, Jiayuguan, Dunhuang and Yumen Pass — and the heartland is already close.",
        "From Zhuxi, the road into Shaanxi comes first to Ankang, then on to Xi’an."
      ],
      list: [
        "One of the six ports of entry",
        "Silk Road: Xi’an → Tianshui → Lanzhou → Zhangye → Jiayuguan → Dunhuang → Yumen Pass"
      ],
      actions: [
        { label: "View the lines", href: "map.html#routes" }
      ]
    },
    tianshui: {
      tag: "Silk Road",
      title: "Tianshui",
      body: ["The first major Silk Road stop west of Xi’an, on the way into the Hexi Corridor."],
      list: ["Between Xi’an and Lanzhou"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    lanzhou: {
      tag: "Silk Road",
      title: "Lanzhou",
      body: ["The capital of Gansu, on the Yellow River — a working city, and a key node on the corridor west."],
      list: ["Between Tianshui and Zhangye"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    ankang: {
      tag: "Into Shaanxi",
      title: "Ankang",
      body: ["The first stop in Shaanxi when travelling from Zhuxi and Jixinling toward Xi’an and the Silk Road."],
      list: ["Zhuxi / Jixinling → Ankang → Xi’an"],
      actions: [{ label: "Zhuxi Masterclass", href: "zhuxi.html#masterclass", primary: true }]
    },
    zhangye: {
      tag: "Silk Road",
      title: "Zhangye",
      body: ["Rainbow-striped landforms and desert light along the Hexi Corridor."],
      list: ["Between Lanzhou and Dunhuang"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    jiayuguan: {
      tag: "Silk Road",
      title: "Jiayuguan",
      body: ["The Ming fortress at the western end of the Great Wall, on the Hexi Corridor between Zhangye and Dunhuang."],
      list: ["Between Zhangye and Dunhuang"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    yumen: {
      tag: "Silk Road",
      title: "Yumen Pass",
      body: ["The old western gate of the Silk Road, in the desert west of Dunhuang — the pass from which the long road west once left China."],
      list: ["West of Dunhuang, on the road toward Central Asia"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    dunhuang: {
      tag: "Silk Road",
      title: "Dunhuang",
      body: ["An oasis town of the Mogao Caves and singing dunes — a western chapter of the Silk Road line we draw."],
      list: ["The oasis city before Yumen Pass"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    shanhaiguan: {
      tag: "Northern line",
      title: "Shanhaiguan",
      body: ["From Beijing the Wall runs east until it meets the sea at Shanhaiguan — the old pass where China once watched the tide, and a place that still feels like an edge of the empire."],
      list: ["Beijing → Shanhaiguan → Changbai"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    changbai: {
      tag: "Northern line · Jilin",
      title: "Changbai Mountain",
      body: ["Farther on, in the forests of Jilin, Changbai Mountain rises to a crater lake so still it holds the sky. Heaven Lake feels a world away from Beijing, and yet belongs to the same north."],
      list: ["Northern line, northeast China"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    xishuangbanna: {
      tag: "Southern line · Yunnan",
      title: "Xishuangbanna",
      body: ["Tropical forest in southern Yunnan, on the China–Laos Railway from Kunming toward Southeast Asia."],
      list: ["Southern line: Kunming → Xishuangbanna (China–Laos Railway)"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    },
    kunming: {
      tag: "Southern line · Yunnan",
      title: "Kunming",
      body: ["The starting point of our southern line: from here the China–Laos Railway runs on through the forests of Yunnan to Xishuangbanna, and toward Southeast Asia."],
      list: ["Southern line: Kunming → Xishuangbanna (China–Laos Railway)"],
      actions: [{ label: "View the lines", href: "map.html#routes" }]
    }
  };

  function panelBody(d) {
    return '<div class="panel-tag">' + d.tag + "</div>" +
      '<h3 class="panel-title">' + d.title + "</h3>" +
      d.body.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      (d.list && d.list.length
        ? '<ul class="ticks">' + d.list.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>"
        : "") +
      '<div class="panel-actions">' +
        d.actions.map(function (a) {
          return '<a class="btn btn-sm ' + (a.primary ? "" : "btn-ghost") + '" href="' + a.href + '">' + a.label + "</a>";
        }).join("") +
      "</div>";
  }

  function setMarkerPressed(id) {
    $$(".map-marker").forEach(function (m) {
      m.setAttribute("aria-pressed", m.getAttribute("data-place") === id ? "true" : "false");
    });
  }

  var portsScrollLock = false;
  var portsScrollLockTimer = 0;
  var portsSyncPlace = null;

  function lockPortsScroll() {
    portsScrollLock = true;
    if (portsScrollLockTimer) clearTimeout(portsScrollLockTimer);
  }

  function unlockPortsScroll() {
    if (portsScrollLockTimer) clearTimeout(portsScrollLockTimer);
    portsScrollLockTimer = setTimeout(function () {
      portsScrollLock = false;
      portsScrollLockTimer = 0;
      var panel = document.querySelector("#detailPanel.ports-column");
      if (panel) syncPortsColumnToMap(panel);
    }, 80);
  }

  function portsStickyOffset(panel) {
    var fixed = panel && panel.querySelector(".ports-column-fixed");
    if (fixed) {
      var bottom = fixed.getBoundingClientRect().bottom;
      if (bottom > 0) return bottom + 16;
    }
    var topbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")) || 48;
    return topbar + 16;
  }

  function scrollPortsColumnTo(panel, el) {
    if (!el) return;
    var top = window.scrollY + el.getBoundingClientRect().top - portsStickyOffset(panel);
    if (top < 0) top = 0;
    lockPortsScroll();
    var done = function () {
      window.removeEventListener("scrollend", done);
      unlockPortsScroll();
    };
    // scrollend may not fire if we are already at the target
    if (portsScrollLockTimer) clearTimeout(portsScrollLockTimer);
    portsScrollLockTimer = setTimeout(done, 750);
    if (typeof window.scrollTo === "function") {
      window.addEventListener("scrollend", done);
      window.scrollTo({ top: top, behavior: "smooth" });
    } else {
      window.scrollTo(0, top);
      done();
    }
  }

  function setPortsCityActive(panel, id) {
    $$(".ports-city", panel).forEach(function (el) {
      el.classList.toggle("is-active", !!id && el.getAttribute("data-place") === id);
    });
  }

  function portsReadingPlace(panel) {
    var cities = $$(".ports-city", panel);
    if (!cities.length) return null;
    var line = portsStickyOffset(panel);
    var slop = 24;
    var firstHead = cities[0].querySelector(".ports-city-name") || cities[0];
    if (firstHead.getBoundingClientRect().top > line + slop) return null;
    var last = cities[cities.length - 1];
    // Past Hong Kong, into the next section: clear the reading highlight.
    if (last.getBoundingClientRect().bottom < line - 40) return null;
    var chosen = null;
    for (var i = 0; i < cities.length; i++) {
      var head = cities[i].querySelector(".ports-city-name") || cities[i];
      if (head.getBoundingClientRect().top <= line + slop) chosen = cities[i];
    }
    return chosen ? chosen.getAttribute("data-place") : null;
  }

  function syncPortsColumnToMap(panel) {
    if (!panel || portsScrollLock) return;
    var id = portsReadingPlace(panel);
    var pick = panel.querySelector(".panel-content.ports-column-pick");
    var pickOpen = !!(pick && !pick.hidden);
    if (!id) {
      if (pickOpen) return;
      if (portsSyncPlace !== null) {
        portsSyncPlace = null;
        setPortsCityActive(panel, null);
        setMarkerPressed(null);
      }
      return;
    }
    if (id === portsSyncPlace) return;
    portsSyncPlace = id;
    if (pick && !pick.hidden) {
      pick.hidden = true;
      pick.classList.remove("ports-column-pick");
      pick.innerHTML = "";
    }
    setPortsCityActive(panel, id);
    setMarkerPressed(id);
  }

  function initPortsScrollSync() {
    var panel = document.querySelector("#detailPanel.ports-column");
    if (!panel) return;
    var ticking = false;
    var onScroll = function () {
      if (portsScrollLock) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        syncPortsColumnToMap(panel);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function renderPanel(id, quiet) {
    var d = PLACES[id], panel = $("#detailPanel");
    if (!d || !panel) return;
    var c = $(".panel-content", panel);

    // Homepage: the right column is the six-city writing. Port clicks
    // highlight that city; other markers open a short card above it.
    if (panel.classList.contains("ports-column")) {
      var city = panel.querySelector('.ports-city[data-place="' + id + '"]');
      setPortsCityActive(panel, city ? id : null);
      portsSyncPlace = id;
      if (city) {
        if (c) {
          c.innerHTML = "";
          c.hidden = true;
          c.classList.remove("ports-column-pick");
        }
        if (!quiet) scrollPortsColumnTo(panel, city);
      } else if (c) {
        c.hidden = false;
        c.classList.add("ports-column-pick");
        c.innerHTML = panelBody(d);
        if (!quiet) scrollPortsColumnTo(panel, c);
      }
      setMarkerPressed(id);
      return;
    }

    var ph = $(".panel-placeholder", panel);
    if (ph) ph.style.display = "none";
    if (!c) return;
    c.innerHTML = panelBody(d);
    setMarkerPressed(id);
    if (!quiet && window.innerWidth < 960 && panel.getBoundingClientRect().top > window.innerHeight * 0.8) {
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
  window.EnlightRenderPanel = function (id) { renderPanel(id, true); };

  function initMap() {
    var markers = $$(".map-marker");
    if (!markers.length) return;
    markers.forEach(function (m) {
      var id = m.getAttribute("data-place");
      m.setAttribute("aria-pressed", "false");
      m.addEventListener("click", function () { renderPanel(id); });
      m.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); renderPanel(id); }
      });
    });
    $$("[data-open-place]").forEach(function (b) {
      b.addEventListener("click", function () { renderPanel(b.getAttribute("data-open-place")); });
    });
    // Auto-open Jixinling only on the standalone map page, not the homepage column.
    if ($("#detailPanel") && document.body.getAttribute("data-page") === "map") {
      setTimeout(function () { renderPanel("jixinling", true); }, 300);
    }
    initPortsScrollSync();
  }

  function initTerms() {
    var terms = $$(".term[data-start]");
    if (!terms.length) return;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var nextSet = false;
    terms.forEach(function (t) {
      var end = new Date(t.getAttribute("data-end") + "T23:59:59");
      var start = new Date(t.getAttribute("data-start") + "T00:00:00");
      if (end < today) t.classList.add("past");
      else if (!nextSet && start >= today) { t.classList.add("next"); nextSet = true; }
    });
  }

  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function initSteppers(root) {
    (root || document).querySelectorAll("[data-stepper]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-stepper");
        var input = document.getElementById(id);
        if (!input) return;
        var dir = parseInt(btn.getAttribute("data-dir"), 10) || 0;
        var min = input.min === "" ? -Infinity : Number(input.min);
        var max = input.max === "" ? Infinity : Number(input.max);
        var v = Number(input.value || 0) + dir;
        if (v < min) v = min;
        if (v > max) v = max;
        input.value = String(v);
      });
    });
  }

  function initCourtesy() {
    document.querySelectorAll(".tell-courtesy").forEach(function (group) {
      var labels = group.querySelectorAll(".tell-radio");
      function sync() {
        labels.forEach(function (lab) {
          var inp = lab.querySelector("input");
          lab.classList.toggle("is-on", !!(inp && inp.checked));
        });
      }
      labels.forEach(function (lab) {
        lab.addEventListener("change", sync);
      });
      sync();
    });
  }

  function initForm() {
    var f = $("#inquireForm");
    if (!f) return;
    initSteppers(f);
    initCourtesy();
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = (f.querySelector("[name=firstname]") || {}).value || "";
      var last = (f.querySelector("[name=surname]") || {}).value || "";
      var legacy = (f.querySelector("[name=name]") || {}).value || "";
      var n = first || last || legacy;
      var note = $("#formNote");
      if (!note) return;
      note.textContent = (n ? "Thank you, " + n + ". " : "Thank you. ") +
        "This form is not connected yet — please reach Enlight directly on WeChat or WhatsApp.";
      note.hidden = false;
    });
  }

  function initNaradaHomeFilm() {
    var root = document.querySelector(".narada-home-film");
    if (!root) return;
    var video = root.querySelector(".narada-home-video");
    if (!video) return;
    var fail = function () {
      root.classList.add("is-fallback");
      disableVideo(video);
    };
    if (prefersReducedMotion()) {
      fail();
      return;
    }
    video.addEventListener("error", fail);
    var source = video.querySelector("source");
    if (source) source.addEventListener("error", fail);
    var tryPlay = function () {
      var play = video.play();
      if (play && play.catch) play.catch(function () {});
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) tryPlay();
        });
      }, { threshold: 0.2 });
      io.observe(root);
    } else {
      tryPlay();
    }
  }

  function initNarada() {
    var root = document.querySelector("[data-narada-carousel]");
    if (!root) return;
    var slides = $$(".narada-slide", root);
    if (slides.length < 2) return;
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    }
    var prev = root.querySelector(".narada-arrow.prev");
    var next = root.querySelector(".narada-arrow.next");
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
  }

  function initMenu() {
    var head = document.querySelector(".site-head");
    var btn = document.querySelector(".site-menu-toggle");
    if (!head || !btn) return;
    var nav = head.querySelector(".site-head-nav");
    var submenus = [
      { wrap: head.querySelector(".nav-destinations"), toggle: head.querySelector(".nav-destinations-toggle"), timer: null },
      { wrap: head.querySelector(".nav-gateways"), toggle: head.querySelector(".nav-gateways-toggle"), timer: null },
      { wrap: head.querySelector(".nav-houses"), toggle: head.querySelector(".nav-houses-toggle"), timer: null }
    ];
    var setSubmenu = function (item, open) {
      if (!item || !item.wrap) return;
      item.wrap.classList.toggle("is-open", open);
      if (item.toggle) item.toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    var syncFlyoutClass = function () {
      if (!nav) return;
      var open = submenus.some(function (item) {
        return item.wrap && item.wrap.classList.contains("is-open");
      });
      nav.classList.toggle("has-flyout", open);
    };
    var clearSubmenuTimer = function (item) {
      if (item && item.timer) {
        clearTimeout(item.timer);
        item.timer = null;
      }
    };
    var clearAllSubmenuTimers = function () {
      submenus.forEach(clearSubmenuTimer);
    };
    var closeSubmenu = function () {
      clearAllSubmenuTimers();
      submenus.forEach(function (item) { setSubmenu(item, false); });
      syncFlyoutClass();
    };
    var openOneSubmenu = function (item) {
      clearAllSubmenuTimers();
      submenus.forEach(function (other) {
        if (other !== item) setSubmenu(other, false);
      });
      setSubmenu(item, true);
      syncFlyoutClass();
    };
    var scheduleCloseSubmenu = function (item) {
      clearSubmenuTimer(item);
      item.timer = setTimeout(function () {
        setSubmenu(item, false);
        item.timer = null;
        syncFlyoutClass();
      }, 180);
    };
    var menuTimer = null;
    var clearMenuTimer = function () {
      if (menuTimer) {
        clearTimeout(menuTimer);
        menuTimer = null;
      }
    };
    var canHover = true;
    try {
      if (window.matchMedia) canHover = window.matchMedia("(hover: hover)").matches;
    } catch (err) {}
    var openMenu = function () {
      clearMenuTimer();
      head.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
    };
    var close = function () {
      clearMenuTimer();
      head.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      closeSubmenu();
    };
    btn.addEventListener("click", function () {
      /* t274: on hover-capable pointers, a click after hover-open must not
         toggle the menu closed. Touch / no-hover still click-toggles. */
      if (canHover && head.classList.contains("is-open")) return;
      var open = head.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (!open) closeSubmenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", function (e) {
      if (head.classList.contains("is-open") && !head.contains(e.target)) close();
    });
    /* t272: close the hamburger as soon as the pointer leaves the header.
       A short grace lets the pointer cross from the toggle into the panel.
       Destinations/Gateway City/Houses lists stay open while the pointer
       moves onto them because they sit inside .site-head, so this
       mouseleave does not fire.
       t274: on hover-capable pointers, resting on the three-line toggle
       opens the panel; do not open it for the logo or the rest of the bar. */
    if (canHover) {
      var lastPointerX = 0;
      var lastPointerY = 0;
      var recordPointer = function (e) {
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      };
      var pointerStillOverMenu = function () {
        var el = null;
        try {
          el = document.elementFromPoint(lastPointerX, lastPointerY);
        } catch (err) {}
        if (!el) return false;
        /* t279/t290: do not close if hit-testing still finds the pointer over
           the header, the main panel, or the left flyout. */
        if (head.contains(el) || (nav && nav.contains(el))) return true;
        if (el.closest && el.closest(".nav-destinations-list, .nav-gateways-list, .nav-houses-list, .site-head-nav, .site-head")) return true;
        return false;
      };
      btn.addEventListener("mouseenter", openMenu);
      head.addEventListener("mouseenter", clearMenuTimer);
      document.addEventListener("mousemove", recordPointer);
      head.addEventListener("mouseleave", function (e) {
        recordPointer(e);
        clearMenuTimer();
        /* t279: do not close if hit-testing still finds the pointer over the
           header or the open panel (leftover sticky/video glitches). */
        menuTimer = setTimeout(function () {
          menuTimer = null;
          if (pointerStillOverMenu()) return;
          close();
        }, 120);
      });
    }
    var bindSubmenu = function (item) {
      if (!item || !item.toggle || !item.wrap) return;
      item.toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearSubmenuTimer(item);
        /* t279: on hover-capable pointers, a click after hover-open must not
           toggle the submenu closed. Touch / no-hover still click-toggles. */
        if (canHover && item.wrap.classList.contains("is-open")) return;
        var open = !item.wrap.classList.contains("is-open");
        if (open) openOneSubmenu(item);
        else {
          setSubmenu(item, false);
          syncFlyoutClass();
        }
      });
      /* Desktop hover opens the submenu (t267). Click/keyboard still toggle.
         A short grace delay keeps the list open while the pointer moves from
         the label onto the flyout. */
      if (canHover) {
        item.wrap.addEventListener("mouseenter", function () {
          openOneSubmenu(item);
        });
        item.wrap.addEventListener("mouseleave", function () {
          scheduleCloseSubmenu(item);
        });
      }
      item.wrap.addEventListener("focusin", function () {
        openOneSubmenu(item);
      });
      item.wrap.addEventListener("focusout", function (e) {
        if (!item.wrap.contains(e.relatedTarget)) scheduleCloseSubmenu(item);
      });
    };
    submenus.forEach(bindSubmenu);
    Array.prototype.forEach.call(head.querySelectorAll(".site-head-nav a"), function (a) {
      a.addEventListener("click", close);
    });
  }


  function initJourneyHeroFilm() {
    $$(".journey-hero-film").forEach(function (root) {
      var video = root.querySelector(".journey-hero-video");
      if (!video) return;
      var fail = function () {
        root.classList.add("is-fallback");
        disableVideo(video);
      };
      if (prefersReducedMotion()) {
        fail();
        return;
      }
      video.addEventListener("error", fail);
      var source = video.querySelector("source");
      if (source) source.addEventListener("error", fail);
      var tryPlay = function () {
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      };
      tryPlay();
    });
  }

  function initJourneyHero() {
    $$("[data-journey-hero]").forEach(function (root) {
      var slides = $$(".slide", root);
      if (!slides.length) return;
      var i = 0;
      var dotsWrap = root.querySelector(".journey-hero-dots");
      var count = root.querySelector(".journey-hero-count");
      function renderDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = "";
        slides.forEach(function (_, k) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", "Photograph " + (k + 1));
          if (k === i) b.className = "is-active";
          b.addEventListener("click", function () { show(k); });
          dotsWrap.appendChild(b);
        });
      }
      function show(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
        if (dotsWrap) {
          $$("button", dotsWrap).forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
        }
        if (count) count.textContent = (i + 1) + " / " + slides.length;
      }
      renderDots();
      show(0);
      var prev = root.querySelector("[data-hero-prev]");
      var next = root.querySelector("[data-hero-next]");
      if (prev) prev.addEventListener("click", function () { show(i - 1); });
      if (next) next.addEventListener("click", function () { show(i + 1); });
    });
  }



  var JOURNEY_PLACES = {
    zhuxi: {
      shiyan: { name: "Shiyan", lat: 32.6063, lng: 110.7769 },
      "lacquer-village": { name: "Lacquer Village", lat: 32.310, lng: 109.780, labelDir: "right" },
      guanya: { name: "Guanya", lat: 32.3257, lng: 109.5170 },
      jixinling: { name: "Jixinling", lat: 31.7241, lng: 109.5877, labelDir: "left" },
      "yunyang-heart": { name: "Yunyang Heart", lat: 31.7350, lng: 109.5950, labelDir: "right" },
      wuling: { name: "Zhuxi", lat: 32.3205, lng: 109.7104, labelDir: "left" },
      wudang: { name: "Wudang Mountain", lat: 32.3982, lng: 111.0102 },
      danjiangkou: { name: "Danjiangkou", lat: 32.5561, lng: 111.4890 },
      zhushan: { name: "Zhushan", lat: 32.2268, lng: 110.2237 }
    },
    "solar-terms": {
      shiyan: { name: "Shiyan", lat: 32.6063, lng: 110.7769, labelDir: "top" },
      zhuxi: { name: "Zhuxi", lat: 32.3205, lng: 109.7104, labelDir: "right" },
      zhushan: { name: "Zhushan", lat: 32.2268, lng: 110.2237, labelDir: "bottom" },
      wudang: { name: "Wudang Mountain", lat: 32.3982, lng: 111.0102, photo: "images/map-wudang.webp", photoDir: "bottom", labelDir: "left", labelNudge: [-42, -12] },
      danjiangkou: { name: "Danjiangkou Water Project", lat: 32.5561, lng: 111.4890, labelDir: "right", labelWrap: true, labelNudge: [10, -8] }
    },
    hangzhou: {
      "west-lake": { name: "West Lake", lat: 30.2460, lng: 120.1431 },
      longjing: { name: "Longjing tea hills", lat: 30.2219, lng: 120.0981 }
    }
  };
  /* Wudang product page uses data-page="solar"; the catalog key remains solar-terms. */
  JOURNEY_PLACES.solar = JOURNEY_PLACES["solar-terms"];

  function initJourneySubnav() {
    var nav = document.querySelector(".journey-subnav");
    if (!nav) return;
    var links = $$("a[href^='#']", nav).filter(function (a) {
      return !a.closest("[data-budgets-open]") && a.getAttribute("href") !== "#";
    });
    var ids = links.map(function (a) { return a.getAttribute("href").slice(1); }).filter(Boolean);
    var secs = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!secs.length) return;
    function current() {
      var probe = (window.innerHeight * 0.28) + 80;
      var active = secs[0];
      secs.forEach(function (s) {
        if (s.getBoundingClientRect().top <= probe) active = s;
      });
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + active.id);
      });
    }
    current();
    window.addEventListener("scroll", current, { passive: true });
    links.forEach(function (a) {
      a.addEventListener("click", function () {
        /* allow sticky offset via CSS scroll-margin */
      });
    });
  }

  function initGallerySlider() {
    $$("[data-gallery-slider]").forEach(function (root) {
      var viewport = root.querySelector(".gallery-viewport");
      var track = root.querySelector(".gallery-track");
      if (!viewport || !track) return;
      var origFigures = $$("figure", track);
      if (!origFigures.length) return;
      var prev = root.querySelector("[data-gallery-prev]");
      var next = root.querySelector("[data-gallery-next]");
      var caption = root.querySelector("[data-gallery-caption]");
      var section = root.closest(".journey-gallery") || root.closest(".section");

      /* t335: clone photos at both ends so the first and last slides also peek a neighbour, with no empty pad. */
      var nClone = Math.min(2, origFigures.length);
      var nOrig = origFigures.length;
      if (!track.getAttribute("data-gallery-loop-clones")) {
        var i, cl, src;
        for (i = 0; i < nClone; i++) {
          src = origFigures[nOrig - 1 - i];
          cl = src.cloneNode(true);
          cl.removeAttribute("data-gallery-start");
          cl.setAttribute("data-gallery-clone", "pre");
          cl.setAttribute("aria-hidden", "true");
          track.insertBefore(cl, track.firstChild);
        }
        for (i = 0; i < nClone; i++) {
          src = origFigures[i];
          cl = src.cloneNode(true);
          cl.removeAttribute("data-gallery-start");
          cl.setAttribute("data-gallery-clone", "post");
          cl.setAttribute("aria-hidden", "true");
          track.appendChild(cl);
        }
        track.setAttribute("data-gallery-loop-clones", String(nClone));
      }
      var figures = $$("figure", track);

      function captionText(fig) {
        var cap = fig.querySelector("figcaption");
        return cap ? cap.textContent.trim() : "";
      }
      function padEnds() {
        /* Peeking clones replace the old end padding, which left a blank on the first photograph. */
        track.style.paddingLeft = "0px";
        track.style.paddingRight = "0px";
      }
      function toOrig(i) {
        if (i < nClone) return i + (nOrig - nClone);
        if (i >= nClone + nOrig) return i - (nClone + nOrig);
        return i - nClone;
      }
      function origToFig(o) {
        return o + nClone;
      }
      function offsetOf(i) {
        var vRect = viewport.getBoundingClientRect();
        var fRect = figures[i].getBoundingClientRect();
        return viewport.scrollLeft + (fRect.left + fRect.width / 2) - (vRect.left + vRect.width / 2);
      }
      function nearestFig() {
        var vRect = viewport.getBoundingClientRect();
        var mid = vRect.left + vRect.width / 2;
        var best = nClone, bestDist = Infinity;
        figures.forEach(function (fig, k) {
          var r = fig.getBoundingClientRect();
          var d = Math.abs(r.left + r.width / 2 - mid);
          if (d < bestDist) { bestDist = d; best = k; }
        });
        return best;
      }
      function index() {
        return toOrig(nearestFig());
      }
      var GROUP_LABELS = { lacquer: "Lacquer", tea: "Tea", landscape: "Landscape" };
      function groupLabel(fig) {
        var g = fig.getAttribute("data-gallery-group");
        return (g && GROUP_LABELS[g]) || "";
      }
      function wrapIndex(n) {
        return ((n % nOrig) + nOrig) % nOrig;
      }
      function update() {
        var i = index();
        if (prev) prev.disabled = false;
        if (next) next.disabled = false;
        figures.forEach(function (fig, k) {
          var on = toOrig(k) === i;
          fig.classList.toggle("is-active", on && k === origToFig(i));
          fig.setAttribute("aria-hidden", on && k === origToFig(i) ? "false" : "true");
        });
        if (caption) {
          var live = origFigures[i];
          var label = groupLabel(live);
          var text = captionText(live);
          caption.textContent = label && text ? (label + " · " + text) : (text || label);
        }
      }
      var target = 0;
      var snapTimer = 0;
      function snapToOriginal(instant) {
        var f = nearestFig();
        if (f < nClone || f >= nClone + nOrig) {
          var dest = origToFig(toOrig(f));
          var prevBeh = viewport.style.scrollBehavior;
          viewport.style.scrollBehavior = "auto";
          viewport.scrollTo({ left: offsetOf(dest), behavior: "auto" });
          viewport.style.scrollBehavior = prevBeh;
        }
        update();
      }
      function go(n, instant) {
        var curFig = nearestFig();
        var curOrig = toOrig(curFig);
        n = wrapIndex(n);
        target = n;
        var dest;
        if (!instant && curOrig === nOrig - 1 && n === 0) {
          dest = nClone + nOrig;
        } else if (!instant && curOrig === 0 && n === nOrig - 1) {
          dest = nClone - 1;
        } else {
          dest = origToFig(n);
        }
        var jump = !!instant;
        var prevBeh = viewport.style.scrollBehavior;
        if (jump) viewport.style.scrollBehavior = "auto";
        viewport.scrollTo({ left: offsetOf(dest), behavior: jump ? "auto" : "smooth" });
        if (jump) viewport.style.scrollBehavior = prevBeh;
        update();
        if (!jump && (dest < nClone || dest >= nClone + nOrig)) {
          if (snapTimer) window.clearTimeout(snapTimer);
          snapTimer = window.setTimeout(function () { snapToOriginal(); }, 450);
        }
      }
      if (prev) prev.addEventListener("click", function () { go(index() - 1); });
      if (next) next.addEventListener("click", function () { go(index() + 1); });
      figures.forEach(function (fig, k) {
        fig.addEventListener("click", function () { go(toOrig(k)); });
      });
      viewport.addEventListener("scroll", function () {
        update();
        if (snapTimer) window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(function () { snapToOriginal(); }, 140);
      }, { passive: true });
      if (typeof viewport.addEventListener === "function") {
        viewport.addEventListener("scrollend", function () { snapToOriginal(); });
      }

      /* t335: size the gallery to the visible window under the sticky header and subnav, so the photographs and caption sit flush with no leftover band. */
      function fitSection() {
        if (!section) return;
        var head = document.querySelector(".site-head");
        var sub = document.querySelector(".journey-subnav");
        var top = 0;
        if (head) top += head.getBoundingClientRect().height;
        if (sub) top += sub.getBoundingClientRect().height;
        var h = Math.round(window.innerHeight - top);
        if (h > 80) {
          section.style.height = h + "px";
          section.style.maxHeight = h + "px";
          /* t434: land #gallery flush under the real sticky bars, so the next
             section cannot show as a pale strip under the caption. */
          section.style.scrollMarginTop = Math.round(top) + "px";
        }
      }
      window.addEventListener("resize", function () {
        fitSection();
        ready();
      }, { passive: true });
      root.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
      });
      root.setAttribute("tabindex", "0");
      var touched = false;
      var holdStart = true;
      function startIndex() {
        var start = 0;
        origFigures.forEach(function (fig, k) {
          if (fig.hasAttribute("data-gallery-start")) start = k;
        });
        return start;
      }
      function markTouched() { touched = true; holdStart = false; }
      if (prev) prev.addEventListener("click", markTouched);
      if (next) next.addEventListener("click", markTouched);
      figures.forEach(function (fig) { fig.addEventListener("click", markTouched); });
      root.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") markTouched();
      });
      viewport.addEventListener("pointerdown", markTouched, { passive: true });
      function ready() {
        fitSection();
        padEnds();
        /* Stay on the start photograph until the visitor or autoplay moves.
           Recentre the intended photograph, not the mid-scroll index(). */
        go((touched || !holdStart) ? target : startIndex(), true);
      }
      $$("img", track).forEach(function (img) {
        if (!img.complete) {
          img.addEventListener("load", ready, { once: true });
          img.addEventListener("error", ready, { once: true });
        }
      });
      ready();
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(function () { requestAnimationFrame(ready); });
      }
      if ("ResizeObserver" in window) {
        var lastPadKey = "";
        var ro = new ResizeObserver(function () {
          var startFig = origFigures[startIndex()];
          var key = viewport.clientWidth + "x" + viewport.clientHeight + ":" +
            (startFig ? startFig.offsetWidth : 0) + ":" +
            (origFigures[0] ? origFigures[0].offsetWidth : 0) + ":" +
            (origFigures[nOrig - 1] ? origFigures[nOrig - 1].offsetWidth : 0) + ":" +
            (section ? section.offsetHeight : 0);
          if (key === lastPadKey) return;
          lastPadKey = key;
          ready();
        });
        ro.observe(viewport);
        ro.observe(track);
        if (section) ro.observe(section);
        origFigures.forEach(function (fig) { ro.observe(fig); });
      }
      window.setTimeout(ready, 50);
      window.setTimeout(ready, 300);

      /* t323: loop from the last photograph back to the first; advance while in view */
      var autoTimer = null;
      var autoPaused = false;
      var autoInView = false;
      var autoReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      function stopAuto() {
        if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
      }
      function playAuto() {
        stopAuto();
        if (autoReduce || autoPaused || !autoInView) return;
        autoTimer = window.setInterval(function () { holdStart = false; go(index() + 1); }, 5000);
      }
      root.addEventListener("pointerenter", function () { autoPaused = true; stopAuto(); });
      root.addEventListener("pointerleave", function () { autoPaused = false; playAuto(); });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stopAuto();
        else playAuto();
      });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          autoInView = !!(entries[0] && entries[0].isIntersecting);
          if (autoInView) playAuto();
          else stopAuto();
        }, { threshold: 0.35 }).observe(root);
      } else {
        autoInView = true;
        playAuto();
      }
    });
  }

  function initBudgetsDrawer() {
    var drawer = document.getElementById("budgets-drawer");
    var backdrop = document.querySelector("[data-budgets-backdrop]");
    var openers = $$("[data-budgets-open]");
    if (!drawer || !openers.length) return;
    var closeBtn = drawer.querySelector("[data-budgets-close]");
    var lastFocus = null;
    var open = false;

    function setExpanded(val) {
      openers.forEach(function (btn) { btn.setAttribute("aria-expanded", val ? "true" : "false"); });
    }

    function trap(e) {
      if (!open || e.key !== "Tab") return;
      var nodes = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", drawer)
        .filter(function (el) { return !el.hasAttribute("disabled") && el.offsetParent !== null; });
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function close() {
      if (!open) return;
      open = false;
      drawer.classList.remove("is-open");
      document.body.classList.remove("is-budgets-open");
      setExpanded(false);
      document.removeEventListener("keydown", onKey);
      window.setTimeout(function () {
        drawer.setAttribute("hidden", "");
        if (backdrop) backdrop.setAttribute("hidden", "");
      }, 350);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function openDrawer() {
      if (open) { close(); return; }
      lastFocus = document.activeElement;
      drawer.removeAttribute("hidden");
      if (backdrop) backdrop.removeAttribute("hidden");
      document.body.classList.add("is-budgets-open");
      setExpanded(true);
      window.requestAnimationFrame(function () {
        drawer.classList.add("is-open");
        open = true;
        var focusEl = closeBtn || drawer;
        if (focusEl && focusEl.focus) focusEl.focus();
      });
      document.addEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else trap(e);
    }

    openers.forEach(function (btn) {
      btn.addEventListener("click", function () { openDrawer(); });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
  }


  var onJourneyDayChange = [];

  function initJourneyDays() {
    var days = $$(".journey-day");
    if (!days.length) return;

    function setActiveDay(day) {
      if (!day) return;
      days.forEach(function (d) { d.classList.toggle("is-active", d === day); });
      onJourneyDayChange.forEach(function (fn) { fn(day); });
    }

    /* The day whose head has reached just below the sticky header and subnav. */
    function currentDay() {
      var probe = 90;
      var header = document.querySelector(".site-head");
      var subnav = document.querySelector(".journey-subnav");
      if (header) probe = header.getBoundingClientRect().bottom;
      if (subnav) {
        var box = subnav.getBoundingClientRect();
        if (box.height && box.bottom > probe) probe = box.bottom;
      }
      probe += 36;
      var active = days[0];
      days.forEach(function (d) {
        if (d.getBoundingClientRect().top <= probe) active = d;
      });
      return active;
    }

    var last = null;
    function onScroll() {
      var day = currentDay();
      if (day && day !== last) {
        last = day;
        setActiveDay(day);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  function initJourneyMaps() {
    var root = document.querySelector("[data-journey-map]");
    if (!root || typeof L === "undefined") return;
    var page = document.body.getAttribute("data-page") || "";
    var journeyKey = root.getAttribute("data-journey-map") || "";
    var catalog = JOURNEY_PLACES[page] || JOURNEY_PLACES[journeyKey];
    if (!catalog) return;

    var map = L.map(root, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
      minZoom: 6,
      maxZoom: 11
    });
    /* Quiet light canvas so only the journey pins carry names, not a street map. */
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 16,
      attribution: "Tiles &copy; <a href=\"https://www.esri.com/\">Esri</a>"
    }).addTo(map);

    var markers = {};
    Object.keys(catalog).forEach(function (id) {
      var p = catalog[id];
      var label = String(p.name).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
      var dir = p.labelDir ? " is-label-" + p.labelDir : "";
      var photoHtml = "";
      if (p.photo) {
        var pdir = p.photoDir ? " is-photo-" + p.photoDir : "";
        var src = String(p.photo).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        photoHtml = '<span class="journey-photo-pin' + pdir + '"><img src="' + src + '" alt=""></span>';
      }
      var labelStyle = "";
      if (p.labelNudge && (p.labelNudge[0] || p.labelNudge[1])) {
        labelStyle = ' style="margin-left:' + Number(p.labelNudge[0] || 0) + "px;margin-top:" + Number(p.labelNudge[1] || 0) + 'px"';
      }
      var labelCls = "journey-marker-label" + (p.labelWrap ? " is-label-wrap" : "");
      var icon = L.divIcon({
        className: "journey-marker" + dir,
        html: photoHtml + '<span class="journey-marker-dot"></span><span class="' + labelCls + '"' + labelStyle + ">" + label + "</span>",
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
      var m = L.marker([p.lat, p.lng], { icon: icon, keyboard: false, title: p.name }).addTo(map);
      markers[id] = m;
    });

    function boundsOf(ids) {
      var pts = [];
      (ids || Object.keys(catalog)).forEach(function (id) {
        if (catalog[id]) pts.push([catalog[id].lat, catalog[id].lng]);
      });
      return pts.length ? L.latLngBounds(pts) : null;
    }

    function highlight(ids) {
      var set = {};
      (ids || []).forEach(function (id) { set[id] = true; });
      Object.keys(markers).forEach(function (id) {
        var el = markers[id].getElement();
        if (el) el.classList.toggle("is-active", !!set[id]);
      });
    }

    function focusPlaces(ids) {
      var list = (ids || []).filter(function (id) { return catalog[id]; });
      highlight(list.length ? list : Object.keys(catalog));
      /* Keep a stable regional frame so the journey stays locatable; do not dive into streets. */
    }

    var initial = boundsOf(Object.keys(catalog));
    if (initial) map.fitBounds(initial, { padding: [48, 48], maxZoom: 10, animate: false });

    var days = $$(".journey-day");
    if (!days.length) {
      highlight(Object.keys(catalog));
      window.setTimeout(function () { map.invalidateSize(); }, 200);
      return;
    }

    function syncFromDay(day) {
      var ids = (day.getAttribute("data-places") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      focusPlaces(ids);
    }
    onJourneyDayChange.push(syncFromDay);
    var active = document.querySelector(".journey-day.is-active") || days[0];
    if (active) syncFromDay(active);
    window.addEventListener("resize", function () { map.invalidateSize(); }, { passive: true });
    window.setTimeout(function () { map.invalidateSize(); }, 200);
    if (typeof ResizeObserver !== "undefined") {
      var ro = new ResizeObserver(function () { map.invalidateSize(); });
      ro.observe(root);
    }
  }

  function initDayAcc() {
    $$(".day-acc").forEach(function (item) {
      var btn = item.querySelector(".day-acc-btn");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }



  function initStayCardFilms() {
    var videos = document.querySelectorAll(".stay-card-photo video");
    if (!videos.length) return;
    var reduced = prefersReducedMotion();
    videos.forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      if (reduced) {
        try { video.pause(); } catch (e) {}
        video.removeAttribute("autoplay");
        return;
      }
      var tryPlay = function () {
        video.muted = true;
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      };
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) tryPlay();
            else {
              try { video.pause(); } catch (e) {}
            }
          });
        }, { threshold: 0.25 });
        io.observe(video);
      } else {
        tryPlay();
      }
    });
  }

  function initZhuxiOverviewFilm() {
    var videos = document.querySelectorAll("body[data-page=\"zhuxi\"] .intro-overview-video, body[data-page=\"solar\"] .intro-overview-video, body[data-page=\"solar-terms\"] .intro-overview-video");
    if (!videos.length) return;
    videos.forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      if (prefersReducedMotion()) {
        try { video.pause(); } catch (e) {}
        video.removeAttribute("autoplay");
        return;
      }
      var tryPlay = function () {
        video.muted = true;
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      };
      tryPlay();
      var onReady = function () {
        tryPlay();
        video.removeEventListener("canplay", onReady);
      };
      video.addEventListener("canplay", onReady);
    });
  }

  function initStayModals() {
    var modal = document.getElementById("stay-modal");
    var openers = document.querySelectorAll("[data-stay-modal]");
    if (!modal || !openers.length) return;
    var dialog = modal.querySelector(".stay-modal-dialog");
    var closeBtns = modal.querySelectorAll("[data-stay-modal-close]");
    var imgEl = modal.querySelector(".stay-modal-image");
    var placeEl = modal.querySelector(".stay-modal-place");
    var titleEl = document.getElementById("stay-modal-title");
    var textEl = modal.querySelector(".stay-modal-text");
    var dotsEl = modal.querySelector(".stay-modal-dots");
    var prevBtn = modal.querySelector(".stay-modal-prev");
    var nextBtn = modal.querySelector(".stay-modal-next");
    var media = modal.querySelector(".stay-modal-media");
    var lastFocus = null;
    var open = false;
    var slides = [];
    var index = 0;

    function setSlide(i) {
      if (!slides.length) return;
      index = (i + slides.length) % slides.length;
      var s = slides[index];
      imgEl.src = s.src;
      imgEl.alt = s.alt || "";
      if (s.width) imgEl.setAttribute("width", s.width);
      if (s.height) imgEl.setAttribute("height", s.height);
      var dots = dotsEl.querySelectorAll("button");
      dots.forEach(function (d, n) {
        var on = n === index;
        d.classList.toggle("is-active", on);
        d.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function loadDetail(id) {
      var tpl = document.getElementById("stay-detail-" + id);
      if (!tpl) return false;
      var root = tpl.content;
      var place = root.querySelector(".stay-modal-place");
      var title = root.querySelector("h2");
      var text = root.querySelector(".stay-modal-text");
      var imgs = root.querySelectorAll("[data-stay-slides] img");
      placeEl.textContent = place ? place.textContent : "";
      titleEl.textContent = title ? title.textContent : "";
      textEl.innerHTML = text ? text.innerHTML : "";
      slides = Array.prototype.map.call(imgs, function (im) {
        return {
          src: im.getAttribute("src"),
          alt: im.getAttribute("alt") || "",
          width: im.getAttribute("width"),
          height: im.getAttribute("height")
        };
      });
      dotsEl.innerHTML = "";
      var many = slides.length > 1;
      media.classList.toggle("has-many", many);
      prevBtn.hidden = !many;
      nextBtn.hidden = !many;
      slides.forEach(function (s, n) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Photograph " + (n + 1) + " of " + slides.length);
        b.addEventListener("click", function () { setSlide(n); });
        dotsEl.appendChild(b);
      });
      setSlide(0);
      return true;
    }

    function trap(e) {
      if (!open || e.key !== "Tab") return;
      var nodes = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", dialog)
        .filter(function (el) { return !el.hasAttribute("disabled") && el.offsetParent !== null; });
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function close() {
      if (!open) return;
      open = false;
      modal.classList.remove("is-open");
      document.body.classList.remove("is-stay-modal-open");
      openers.forEach(function (el) { el.setAttribute("aria-expanded", "false"); });
      document.removeEventListener("keydown", onKey);
      window.setTimeout(function () {
        modal.setAttribute("hidden", "");
        imgEl.removeAttribute("src");
      }, 250);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function openModal(id, opener) {
      if (!loadDetail(id)) return;
      lastFocus = opener || document.activeElement;
      modal.removeAttribute("hidden");
      document.body.classList.add("is-stay-modal-open");
      if (opener) opener.setAttribute("aria-expanded", "true");
      window.requestAnimationFrame(function () {
        modal.classList.add("is-open");
        open = true;
        var focusEl = modal.querySelector(".stay-modal-close") || dialog;
        if (focusEl && focusEl.focus) focusEl.focus();
      });
      document.addEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); setSlide(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); setSlide(index + 1); }
      else trap(e);
    }

    openers.forEach(function (el) {
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("aria-expanded", "false");
      el.setAttribute("aria-controls", "stay-modal");
      el.addEventListener("click", function (e) {
        var id = el.getAttribute("data-stay-modal");
        if (!id) return;
        e.preventDefault();
        openModal(id, el);
      });
    });
    closeBtns.forEach(function (btn) { btn.addEventListener("click", close); });
    if (prevBtn) prevBtn.addEventListener("click", function () { setSlide(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { setSlide(index + 1); });
  }


  document.addEventListener("DOMContentLoaded", function () {
    initCover();
    initMap();
    initTerms();
    initReveal();
    initForm();
    initNarada();
    initNaradaHomeFilm();
    initMenu();
    initJourneyHero();
    initJourneyHeroFilm();
    initZhuxiOverviewFilm();

    initStayCardFilms();
    initStayModals();
    initJourneySubnav();
    initGallerySlider();
    initBudgetsDrawer();
    initJourneyDays();
    initJourneyMaps();
    initDayAcc();
  });
})();
