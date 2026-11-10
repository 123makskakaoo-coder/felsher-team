(function () {
  var data = window.TEAM || {};
  var info = data.info || {};
  var roster = data.roster || [];
  var links = data.links || {};
  var join = data.join || {};

  var LINK_LABELS = {
    discord: "Discord",
    telegram: "Telegram",
    steam: "Steam",
    faceit: "Faceit",
    youtube: "YouTube",
    tiktok: "TikTok"
  };

  var INFO_LABELS = {
    game: "Игра",
    region: "Регион",
    founded: "Основаны",
    voice: "Созвоны"
  };

  function normUrl(value) {
    return /^https?:\/\//i.test(value) ? value : "https://" + value;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  var factsList = document.getElementById("facts");
  Object.keys(INFO_LABELS).forEach(function (key) {
    var value = info[key];
    if (!value) return;
    var li = el("li", "fact");
    li.appendChild(el("span", "fact__label", INFO_LABELS[key]));
    li.appendChild(el("span", "fact__value", value));
    factsList.appendChild(li);
  });

  var grid = document.getElementById("roster-grid");
  roster.forEach(function (player) {
    if (!player || !player.nick) return;
    var card = el("article", "player");
    card.appendChild(el("span", "player__initial", player.nick.trim().charAt(0).toUpperCase()));
    var body = el("div", "player__body");
    body.appendChild(el("h3", "player__nick", player.nick));
    body.appendChild(el("p", "player__role", player.role || "Игрок"));
    card.appendChild(body);
    grid.appendChild(card);
  });
  document.getElementById("roster-empty").hidden = grid.children.length > 0;

  var linksBox = document.getElementById("links");
  Object.keys(LINK_LABELS).forEach(function (key) {
    var value = links[key];
    if (!value) return;
    var a = el("a", "link", LINK_LABELS[key]);
    a.href = normUrl(value);
    a.target = "_blank";
    a.rel = "noopener";
    linksBox.appendChild(a);
  });
  document.getElementById("contacts").hidden = linksBox.children.length === 0;

  if (join.open && join.text) {
    document.getElementById("join-text").textContent = join.text;
    document.getElementById("join").hidden = false;
  }

  var sections = [
    { id: "about", label: "О команде" },
    { id: "roster", label: "Состав" },
    { id: "contacts", label: "Контакты" },
    { id: "join", label: "Набор" }
  ].filter(function (item) {
    return !document.getElementById(item.id).hidden;
  });

  var nav = document.getElementById("nav");
  sections.forEach(function (item) {
    var a = el("a", "nav__link", item.label);
    a.href = "#" + item.id;
    nav.appendChild(a);
  });

  var actions = document.getElementById("hero-actions");
  var primary = el("a", "btn btn--accent", "Смотреть состав");
  primary.href = "#roster";
  actions.appendChild(primary);
  var secondary = el("a", "btn", document.getElementById("contacts").hidden ? "О команде" : "Контакты");
  secondary.href = document.getElementById("contacts").hidden ? "#about" : "#contacts";
  actions.appendChild(secondary);

  var ticker = document.getElementById("ticker");
  var phrase = "FELSHER TEAM · COUNTER-STRIKE 2 · ";
  for (var i = 0; i < 8; i++) ticker.appendChild(el("span", null, phrase));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
