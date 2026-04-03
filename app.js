/* ============================================================
   Giftly — app.js
   State, config, UI logic, API call, result rendering
   ============================================================ */

// --- State -------------------------------------------------
var selGender = '';
var selAge    = '';
var selOcc    = '';
var sym       = '\u20b9';
var budget    = 2000;

// --- Config ------------------------------------------------
var apiKey = 'AIzaSyB1MnjE8PfenZd2rVep2qKVIVTh7EJAJH0';

var PRESETS = {
  '\u20b9': [500, 1000, 2000, 5000, 10000],
  '$':      [25, 50, 100, 200, 500],
  '\u20ac': [25, 50, 100, 200, 500],
  '\u00a3': [20, 50, 100, 200, 400],
};

var MSGS = [
  'Curating thoughtful gifts...',
  'Thinking like a gift expert...',
  'Matching interests to ideas...',
  'Finding something truly special...',
];

// --- Store URL builders ------------------------------------
function q(query) { return encodeURIComponent(query.trim()).replace(/%20/g, '+'); }

var STORE_URLS = {
  '\u20b9': {
    'Amazon':           function(s){ return 'https://www.amazon.in/s?k=' + q(s) + '&tag=lipsanayak-21'; },
    'Flipkart':         function(s){ return 'https://www.flipkart.com/search?q=' + q(s); },
    'Myntra':           function(s){ return 'https://www.myntra.com/' + q(s); },
    'Ajio':             function(s){ return 'https://www.ajio.com/search/?text=' + q(s); },
    'Nykaa':            function(s){ return 'https://www.nykaa.com/search/result/?q=' + q(s); },
    'Nykaa Fashion':    function(s){ return 'https://www.nykaafashion.com/search?q=' + q(s); },
    'Purplle':          function(s){ return 'https://www.purplle.com/search?q=' + q(s); },
    'Mamaearth':        function(s){ return 'https://mamaearth.in/search?q=' + q(s); },
    'ComicSense':       function(s){ return 'https://www.comicsense.in/search?type=product&q=' + q(s); },
    'Bookswagon':       function(s){ return 'https://www.bookswagon.com/search-books/' + q(s); },
    'Crossword':        function(s){ return 'https://www.crossword.in/search?q=' + q(s); },
    'Croma':            function(s){ return 'https://www.croma.com/searchB?q=' + q(s); },
    'Reliance Digital': function(s){ return 'https://www.reliancedigital.in/search?q=' + q(s); },
    'FNP':              function(s){ return 'https://www.fnp.com/search?q=' + q(s); },
    'IGP':              function(s){ return 'https://www.igp.com/search?q=' + q(s); },
    'Chumbak':          function(s){ return 'https://www.chumbak.com/search?type=product&q=' + q(s); },
    'The Souled Store': function(s){ return 'https://www.thesouledstore.com/search?q=' + q(s); },
    'Bewakoof':         function(s){ return 'https://www.bewakoof.com/search/' + q(s); },
    'Pepperfry':        function(s){ return 'https://www.pepperfry.com/site-search.html?q=' + q(s); },
    'HealthKart':       function(s){ return 'https://www.healthkart.com/search?searchstring=' + q(s); },
    'Decathlon':        function(s){ return 'https://www.decathlon.in/search?Ntt=' + q(s); },
    'FirstCry':         function(s){ return 'https://www.firstcry.com/search/?q=' + q(s); },
    'Jaypore':          function(s){ return 'https://www.jaypore.com/search/?q=' + q(s); },
    'Tata CLiQ':        function(s){ return 'https://www.tatacliq.com/search/?searchCategory=all&text=' + q(s); },
  },
  '$': {
    'Amazon':                 function(s){ return 'https://www.amazon.com/s?k=' + q(s); },
    'Target':                 function(s){ return 'https://www.target.com/s?searchTerm=' + q(s); },
    'Walmart':                function(s){ return 'https://www.walmart.com/search?q=' + q(s); },
    'Etsy':                   function(s){ return 'https://www.etsy.com/search?q=' + q(s); },
    'Uncommon Goods':         function(s){ return 'https://www.uncommongoods.com/search?q=' + q(s); },
    'Firebox':                function(s){ return 'https://www.firebox.com/search?q=' + q(s); },
    'Not On The High Street': function(s){ return 'https://www.notonthehighstreet.com/search?search_term=' + q(s); },
    'Barnes & Noble':         function(s){ return 'https://www.barnesandnoble.com/s/' + q(s); },
    'Sephora':                function(s){ return 'https://www.sephora.com/search?keyword=' + q(s); },
    'Ulta':                   function(s){ return 'https://www.ulta.com/shop/catalog/results.jsp?Ntt=' + q(s); },
    'Ffern':                  function(s){ return 'https://ffern.com'; },
    'Best Buy':               function(s){ return 'https://www.bestbuy.com/site/searchpage.jsp?st=' + q(s); },
    'Apple':                  function(s){ return 'https://www.apple.com/search/' + q(s); },
    'LEGO':                   function(s){ return 'https://www.lego.com/en-us/search?q=' + q(s); },
    'Smyths':                 function(s){ return 'https://www.smythstoys.com/us/en-us/search/?text=' + q(s); },
    'Ravensburger':           function(s){ return 'https://www.ravensburger.us/search?q=' + q(s); },
    'REI':                    function(s){ return 'https://www.rei.com/search?q=' + q(s); },
    'Nike':                   function(s){ return 'https://www.nike.com/w?q=' + q(s); },
    'Goldbelly':              function(s){ return 'https://www.goldbelly.com/search?q=' + q(s); },
    'Liberty London':         function(s){ return 'https://www.libertylondon.com/us/search?q=' + q(s); },
  },
  '\u20ac': {
    'Amazon':      function(s){ return 'https://www.amazon.de/s?k=' + q(s); },
    'Zalando':     function(s){ return 'https://www.zalando.de/catalogSearch/?q=' + q(s); },
    'About You':   function(s){ return 'https://www.aboutyou.de/suche?term=' + q(s); },
    'Thalia':      function(s){ return 'https://www.thalia.de/suche?sq=' + q(s); },
    'Hugendubel':  function(s){ return 'https://www.hugendubel.de/de/search.html?q=' + q(s); },
    'MediaMarkt':  function(s){ return 'https://www.mediamarkt.de/de/search.html?query=' + q(s); },
    'Saturn':      function(s){ return 'https://www.saturn.de/de/search.html?query=' + q(s); },
    'Sephora':     function(s){ return 'https://www.sephora.de/search?keyword=' + q(s); },
    'Douglas':     function(s){ return 'https://www.douglas.de/de/search?searchterm=' + q(s); },
    'Etsy':        function(s){ return 'https://www.etsy.com/search?q=' + q(s); },
    'Westwing':    function(s){ return 'https://www.westwing.de/search/?q=' + q(s); },
    'LEGO':        function(s){ return 'https://www.lego.com/de-de/search?q=' + q(s); },
    'Ravensburger':function(s){ return 'https://www.ravensburger.de/suche?q=' + q(s); },
    'Smyths':      function(s){ return 'https://www.smythstoys.com/de/de-de/search/?text=' + q(s); },
    'Decathlon':   function(s){ return 'https://www.decathlon.de/search?Ntt=' + q(s); },
    'Mytheresa':   function(s){ return 'https://www.mytheresa.com/de-de/search/?q=' + q(s); },
  },
  '\u00a3': {
    'Amazon':                 function(s){ return 'https://www.amazon.co.uk/s?k=' + q(s) + '&tag=lipsa084-21'; },
    'John Lewis':             function(s){ return 'https://www.johnlewis.com/search?search-term=' + q(s); },
    'Argos':                  function(s){ return 'https://www.argos.co.uk/search/' + q(s); },
    'Very':                   function(s){ return 'https://www.very.co.uk/e/q/' + q(s) + '.end'; },
    'Etsy':                   function(s){ return 'https://www.etsy.com/uk/search?q=' + q(s); },
    'Not On The High Street': function(s){ return 'https://www.notonthehighstreet.com/search?search_term=' + q(s); },
    'Find Me A Gift':         function(s){ return 'https://www.findmeagift.co.uk/search/?q=' + q(s); },
    'Prezzybox':              function(s){ return 'https://www.prezzybox.com/search.aspx?q=' + q(s); },
    'Gift Republic':          function(s){ return 'https://www.giftrepublic.com/search?q=' + q(s); },
    'Firebox':                function(s){ return 'https://www.firebox.com/search?q=' + q(s); },
    'Waterstones':            function(s){ return 'https://www.waterstones.com/search/products/' + q(s); },
    'Sephora':                function(s){ return 'https://www.sephora.co.uk/search?keyword=' + q(s); },
    'Boots':                  function(s){ return 'https://www.boots.com/search?q=' + q(s); },
    'Superdrug':              function(s){ return 'https://www.superdrug.com/search?q=' + q(s); },
    'Liberty London':         function(s){ return 'https://www.libertylondon.com/uk/search?q=' + q(s); },
    'Ffern':                  function(s){ return 'https://ffern.com'; },
    'Currys':                 function(s){ return 'https://www.currys.co.uk/gbuk/search-keywords/xx_xx_xx_xx_xx/' + q(s) + '/xx-criteria.html'; },
    'Apple':                  function(s){ return 'https://www.apple.com/uk/search/' + q(s); },
    'LEGO':                   function(s){ return 'https://www.lego.com/en-gb/search?q=' + q(s); },
    'Smyths':                 function(s){ return 'https://www.smythstoys.com/uk/en-gb/search/?text=' + q(s); },
    'Ravensburger':           function(s){ return 'https://www.ravensburger.com/en-GB/search?q=' + q(s); },
    'The Works':              function(s){ return 'https://www.theworks.co.uk/search?q=' + q(s); },
    'Forbidden Planet':       function(s){ return 'https://forbiddenplanet.com/catalog/?q=' + q(s); },
    'Zavvi':                  function(s){ return 'https://www.zavvi.com/search.html?q=' + q(s); },
    'Sports Direct':          function(s){ return 'https://www.sportsdirect.com/search?term=' + q(s); },
    'Decathlon':              function(s){ return 'https://www.decathlon.co.uk/search?Ntt=' + q(s); },
    'Wiggle':                 function(s){ return 'https://www.wiggle.co.uk/search?term=' + q(s); },
    'Cult Pens':              function(s){ return 'https://www.cultpens.com/search?q=' + q(s); },
    'Paperchase':             function(s){ return 'https://www.paperchase.com/search?q=' + q(s); },
    'Fortnum & Mason':        function(s){ return 'https://www.fortnumandmason.com/search?q=' + q(s); },
    'Hotel Chocolat':         function(s){ return 'https://www.hotelchocolat.com/uk/search?q=' + q(s); },
    'Virgin Wines':           function(s){ return 'https://www.virginwines.co.uk/search?q=' + q(s); },
    'Harvey Nichols':         function(s){ return 'https://www.harveynichols.com/search/?q=' + q(s); },
    'Selfridges':             function(s){ return 'https://www.selfridges.com/GB/en/search/?q=' + q(s); },
    'M&S':                    function(s){ return 'https://www.marksandspencer.com/s/' + q(s); },
  },
};

// --- Selector helpers --------------------------------------
function pick(group, el) {
  var cls = group === 'gender' ? '.gender-btn'
          : group === 'age'    ? '.age-btn'
          :                      '.occ-btn';
  document.querySelectorAll(cls).forEach(function(b) { b.classList.remove('active'); });
  el.classList.add('active');
  if      (group === 'gender') selGender = el.dataset.val;
  else if (group === 'age')    selAge    = el.dataset.val;
  else                          selOcc    = el.dataset.val;
}

function setCurrency(el) {
  document.querySelectorAll('.curr-btn').forEach(function(b) { b.classList.remove('active'); });
  el.classList.add('active');
  sym = el.dataset.sym;
  var max = parseInt(el.dataset.max);
  var s   = document.getElementById('budgetSlider');
  s.min   = 0;
  s.max   = max;
  s.step  = max <= 500 ? 5 : 100;
  budget  = Math.round(max * 0.15);
  s.value = budget;
  document.querySelectorAll('.preset-btn').forEach(function(b) { b.classList.remove('active'); });
  buildPresets();
  updateBudget(budget);
}

function buildPresets() {
  var c = document.getElementById('presets');
  c.innerHTML = '';
  (PRESETS[sym] || []).forEach(function(v) {
    var btn = document.createElement('button');
    btn.className   = 'preset-btn';
    btn.textContent = sym + v.toLocaleString();
    btn.onclick = function() {
      document.querySelectorAll('.preset-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('budgetSlider').value = v;
      updateBudget(v);
    };
    c.appendChild(btn);
  });
}

function updateBudget(val) {
  budget = parseInt(val);
  document.getElementById('budgetDisplay').textContent = sym + budget.toLocaleString();
  var s   = document.getElementById('budgetSlider');
  var mn  = parseInt(s.min) || 0;
  var mx  = parseInt(s.max) || 1;
  var pct = Math.max(0, Math.min(100, ((budget - mn) / (mx - mn)) * 100));
  s.style.background = 'linear-gradient(to right, #c9954a ' + pct + '%, #2e2a24 ' + pct + '%)';
}

// --- Main API call ----------------------------------------
async function findGifts() {
  var eb = document.getElementById('errorBox');
  eb.classList.remove('show');

  if (!selGender || !selAge || !selOcc) {
    eb.textContent = 'Please select gender, age group, and occasion.';
    eb.classList.add('show');
    return;
  }

  var hobbies = Array.from(document.querySelectorAll('.chip.active'))
    .map(function(c) { return c.textContent.trim().replace(/^\S+\s*/, ''); });
  var notes = document.getElementById('extraNotes').value.trim();

  document.getElementById('form-view').style.display = 'none';
  var lv  = document.getElementById('loadingView');
  lv.classList.add('show');

  var mi  = 0;
  var mel = document.getElementById('loadingText');
  var tmr = setInterval(function() {
    mi = (mi + 1) % MSGS.length;
    mel.textContent = MSGS[mi];
  }, 2200);

  var CNAME = {
    '\u20b9': 'Indian Rupees',
    '$':      'US Dollars',
    '\u20ac': 'Euros',
    '\u00a3': 'British Pounds'
  }[sym];

  var storeKeys = Object.keys(STORE_URLS[sym] || {}).join(', ');

  var pt = 'You are a gift recommendation expert.\n'
    + 'Suggest exactly 6 gifts for:\n'
    + '- Recipient: ' + selGender + ', ' + selAge + '\n'
    + '- Occasion: ' + selOcc + '\n'
    + '- Budget: up to ' + budget.toLocaleString() + ' ' + CNAME + '\n'
    + '- Hobbies: ' + (hobbies.length ? hobbies.join(', ') : 'not specified') + '\n'
    + '- Notes: ' + (notes || 'none') + '\n\n'
    + 'For each gift pick 2-3 of the most relevant stores from this list: ' + storeKeys + '\n'
    + 'Choose specialist stores that genuinely match the gift, not just Amazon every time.\n\n'
    + 'IMPORTANT: Reply with ONLY a raw JSON array. No markdown, no extra text.\n'
    + 'Each object must have exactly these fields:\n'
    + '  "name": specific product name (e.g. "Kindle Paperwhite 16GB" not just "e-reader")\n'
    + '  "description": one sentence\n'
    + '  "price": price range in ' + sym + '\n'
    + '  "tags": array of 2-3 short labels\n'
    + '  "why": max 5 words\n'
    + '  "searchQuery": 3-5 word search term for this exact product\n'
    + '  "stores": array of 2-3 store names chosen exactly from the list above\n'
    + 'Start with [ and end with ]. Nothing else.';

  var MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite-preview-06-17',
    'gemini-2.0-flash-lite',
  ];

  var gifts     = null;
  var lastError = null;

  for (var mi2 = 0; mi2 < MODELS.length; mi2++) {
    var model   = MODELS[mi2];
    var success = false;

    for (var attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) {
          var waitSec = attempt * 20;
          for (var s2 = waitSec; s2 > 0; s2--) {
            mel.textContent = 'Rate limited \u2014 retrying in ' + s2 + 's...';
            await new Promise(function(res) { setTimeout(res, 1000); });
          }
          mel.textContent = MSGS[0];
        }

        var r = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: pt }] }],
              generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
            }),
          }
        );

        var d = await r.json();

        if (r.status === 429) {
          var errMsg     = (d.error && d.error.message) || '';
          var retryMatch = errMsg.match(/retry in (\d+)/i);
          if (retryMatch) {
            var waitMs = Math.min(parseInt(retryMatch[1]) * 1000 + 2000, 60000);
            var waitS  = Math.ceil(waitMs / 1000);
            for (var s3 = waitS; s3 > 0; s3--) {
              mel.textContent = 'Rate limited \u2014 retrying in ' + s3 + 's...';
              await new Promise(function(res) { setTimeout(res, 1000); });
            }
            mel.textContent = MSGS[0];
            continue;
          }
          lastError = new Error('Rate limit hit \u2014 please try again in a moment.');
          break;
        }

        if (!r.ok) throw new Error((d.error && d.error.message) ? d.error.message : 'API error ' + r.status);

        var raw = d.candidates[0].content.parts[0].text.trim();
        var si  = raw.indexOf('[');
        var ei  = raw.lastIndexOf(']');
        if (si === -1 || ei === -1) throw new Error('Bad response format \u2014 please try again.');

        gifts   = JSON.parse(raw.slice(si, ei + 1));
        success = true;
        break;

      } catch (e) {
        lastError = e;
        if (attempt === 2) break;
      }
    }

    if (success) break;
  }

  clearInterval(tmr);

  if (!gifts) {
    lv.classList.remove('show');
    document.getElementById('form-view').style.display = 'block';
    eb.textContent = 'Error: ' + (lastError ? lastError.message : 'Something went wrong \u2014 please try again.');
    eb.classList.add('show');
    return;
  }

  lv.classList.remove('show');
  showResults(gifts);
}

// --- Render results ----------------------------------------
function showResults(gifts) {
  var list = document.getElementById('giftList');
  document.getElementById('resultsSubtitle').textContent =
    gifts.length + ' handpicked ideas for your ' + selOcc.toLowerCase() + ' gift';

  list.innerHTML = '';

  gifts.forEach(function(g, i) {
    var storeMap = STORE_URLS[sym] || {};
    var stores   = g.stores || [];
    var query    = g.searchQuery || g.name || '';

    var links = [];
    stores.forEach(function(s) {
      var urlFn = storeMap[s];
      if (urlFn) links.push({ store: s, url: urlFn(query) });
    });

    if (!links.length && g.buyLinks) {
      links = g.buyLinks.map(function(l) {
        return { store: l.store, url: l.url };
      });
    }

    var btns = links.map(function(l) {
      return '<a class="buy-link" href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.store + ' \u2192</a>';
    }).join('');

    var card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML =
      '<div class="gift-card-inner">'
      + '<div class="gift-rank">Gift ' + (i + 1) + ' of ' + gifts.length + '</div>'
      + '<div class="gift-name">'  + g.name        + '</div>'
      + '<div class="gift-desc">'  + g.description + '</div>'
      + '<div class="gift-meta">'
      +   '<span class="gift-price">' + g.price + '</span>'
      +   '<span class="gift-why">'   + g.why   + '</span>'
      + '</div>'
      + '<div class="buy-links-row">' + btns + '</div>'
      + '</div>'
      + '<div class="gift-card-footer">'
      + (g.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('')
      + '</div>';

    list.appendChild(card);
  });

  var res = document.getElementById('results');
  res.classList.add('show');
  res.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  document.getElementById('results').classList.remove('show');
  document.getElementById('form-view').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Init --------------------------------------------------
buildPresets();
updateBudget(2000);