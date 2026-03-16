/* clock-card.js */

const CLOCK_CARD_VERSION = "2.4.0";
console.info("[clock-card] loaded", CLOCK_CARD_VERSION);

class ClockCard extends HTMLElement {

  static getStubConfig() {
    return {
      hour24: true,
      padZero: true,
      showWeekday: true,
      showSeconds: true,
      showAmPm: false,
      showLabels: true,

      tabularNumbers: false,

      align: "center",

      animateDividers: false,
      dividerBlinkSpeed: 1,

      weekdays: ["SU","MO","TU","WE","TH","FR","SA"],

      labels: {
        day: "DAY",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        ampm: "AM/PM"
      },

      background: "#000000",
      color: "#ffffff",
      dividerColor: "rgba(255,255,255,0.35)",
      fontFamily: "system-ui",

      padding: "12px 14px",

      valueFontSize: 48,
      labelFontSize: 10,
      dividerFontSize: 34,
      ampmFontSize: 18,

      valueFontWeight: 500,
      labelFontWeight: 600,
      dividerFontWeight: 300,
      ampmFontWeight: 600,

      dividerSpacing: 12
    };
  }

  setConfig(config) {

    const stub = ClockCard.getStubConfig();

    this._config = {
      ...stub,
      ...config,
      labels: { ...stub.labels, ...(config.labels || {}) }
    };

    this._ensureDom();
    this._applyStaticText();
    this._applyStyles();
    this._start();
  }

  connectedCallback() {
    if (this._config) {
      this._ensureDom();
      this._applyStaticText();
      this._applyStyles();
      this._start();
    }
  }

  disconnectedCallback() {
    this._stop();
  }

  getCardSize() {
    return 2;
  }

  _ensureDom() {

    if (this._root) return;

    this._root = this.attachShadow({ mode: "open" });

    this._root.innerHTML = `
    <style>

      :host { display:block; }

      @keyframes dividerBlink {
        0%,45% { opacity:0.35 }
        50%,95% { opacity:0.08 }
        100% { opacity:0.35 }
      }

      .row{
        display:flex;
        align-items:baseline;
      }

      .block{
        display:flex;
        flex-direction:column;
        align-items:center;
      }

      .value{
        line-height:1;
        white-space:nowrap;
        letter-spacing:0.02em;
      }

      .label{
        margin-top:10px;
        letter-spacing:0.12em;
        text-transform:uppercase;
        opacity:0.55;
        white-space:nowrap;
      }

      .divider{
        line-height:1;
        opacity:0.35;
        transform:translateY(-6px);
      }

      .ampm-wrap{
        display:flex;
        flex-direction:column;
        align-items:center;
      }

    </style>

    <ha-card id="card">

      <div class="row" id="row">

        <div class="block" id="b-day">
          <div class="value" id="v-day">--</div>
          <div class="label" id="l-day">DAY</div>
        </div>

        <div class="divider" id="div-day">:</div>

        <div class="block">
          <div class="value" id="v-hh">--</div>
          <div class="label" id="l-hh">HOURS</div>
        </div>

        <div class="divider">:</div>

        <div class="block">
          <div class="value" id="v-mm">--</div>
          <div class="label" id="l-mm">MINUTES</div>
        </div>

        <div class="divider" id="div-ms">:</div>

        <div class="block" id="b-ss">
          <div class="value" id="v-ss">--</div>
          <div class="label" id="l-ss">SECONDS</div>
        </div>

        <div class="divider" id="div-sa">:</div>

        <div class="ampm-wrap" id="b-ampm">
          <div class="value" id="v-ampm">AM</div>
          <div class="label" id="l-ampm">AM/PM</div>
        </div>

      </div>

    </ha-card>
    `;

    const $ = id => this._root.getElementById(id);

    this._els = {
      card: $("card"),
      row: $("row"),

      bDay: $("b-day"),
      bSS: $("b-ss"),
      bAmPm: $("b-ampm"),

      divDay: $("div-day"),
      divMS: $("div-ms"),
      divSA: $("div-sa"),

      vDay: $("v-day"),
      vHH: $("v-hh"),
      vMM: $("v-mm"),
      vSS: $("v-ss"),
      vAmPm: $("v-ampm"),

      lDay: $("l-day"),
      lHH: $("l-hh"),
      lMM: $("l-mm"),
      lSS: $("l-ss"),
      lAmPm: $("l-ampm"),

      values: this._root.querySelectorAll(".value"),
      labels: this._root.querySelectorAll(".label"),
      dividers: this._root.querySelectorAll(".divider")
    };

  }

  _applyStaticText() {

    const cfg = this._config;

    this._els.lDay.textContent = cfg.labels.day;
    this._els.lHH.textContent = cfg.labels.hours;
    this._els.lMM.textContent = cfg.labels.minutes;
    this._els.lSS.textContent = cfg.labels.seconds;
    this._els.lAmPm.textContent = cfg.labels.ampm;

    const showLabels = cfg.showLabels !== false;

    this._els.labels.forEach(l => {
      l.style.display = showLabels ? "" : "none";
    });

    const showSec = cfg.showSeconds !== false;

    this._els.bSS.style.display = showSec ? "flex" : "none";
    this._els.divMS.style.display = showSec ? "" : "none";

    const showAmPm = cfg.hour24 === false && cfg.showAmPm;

    this._els.bAmPm.style.display = showAmPm ? "flex" : "none";
    this._els.divSA.style.display = showAmPm ? "" : "none";

  }

  _applyStyles() {

    const cfg = this._config;

    const card = this._els.card;

    card.style.background = cfg.background;
    card.style.color = cfg.color;
    card.style.padding = cfg.padding;

    if (cfg.align === "left") this._els.row.style.justifyContent = "flex-start";
    else if (cfg.align === "right") this._els.row.style.justifyContent = "flex-end";
    else this._els.row.style.justifyContent = "center";

    this._els.values.forEach(v => {

      v.style.fontFamily = cfg.fontFamily;
      v.style.fontSize = cfg.valueFontSize + "px";
      v.style.fontWeight = cfg.valueFontWeight;

      if (cfg.tabularNumbers) {
        v.style.fontVariantNumeric = "tabular-nums";
      }

    });

    this._els.labels.forEach(l => {

      l.style.fontFamily = cfg.fontFamily;
      l.style.fontSize = cfg.labelFontSize + "px";
      l.style.fontWeight = cfg.labelFontWeight;

    });

    this._els.dividers.forEach(d => {

      d.style.fontFamily = cfg.fontFamily;
      d.style.fontSize = cfg.dividerFontSize + "px";
      d.style.fontWeight = cfg.dividerFontWeight;
      d.style.color = cfg.dividerColor;

      d.style.marginLeft = cfg.dividerSpacing + "px";
      d.style.marginRight = cfg.dividerSpacing + "px";

      if (cfg.animateDividers) {
        d.style.animation = `dividerBlink ${cfg.dividerBlinkSpeed}s step-end infinite`;
      }

    });

  }

  _start() {

    this._stop();

    this._tick();

    const now = new Date();

    const msToNext = 1000 - now.getMilliseconds();

    this._timeout = setTimeout(() => {

      this._tick();

      this._interval = setInterval(() => this._tick(), 1000);

    }, msToNext);

  }

  _stop() {

    if (this._timeout) clearTimeout(this._timeout);
    if (this._interval) clearInterval(this._interval);

  }

  _pad2(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  _tick() {

    const cfg = this._config;

    const d = new Date();

    if (cfg.showWeekday !== false) {

      const idx = d.getDay();

      this._els.vDay.textContent = cfg.weekdays[idx];

    }

    let hh = d.getHours();

    let ampm = "";

    if (cfg.hour24 === false) {

      ampm = hh >= 12 ? "PM" : "AM";

      hh = hh % 12;

      if (hh === 0) hh = 12;

    }

    const mm = d.getMinutes();
    const ss = d.getSeconds();

    const pad = cfg.padZero !== false;

    this._els.vHH.textContent = pad ? this._pad2(hh) : hh;
    this._els.vMM.textContent = pad ? this._pad2(mm) : mm;
    this._els.vSS.textContent = pad ? this._pad2(ss) : ss;

    this._els.vAmPm.textContent = ampm;

  }

}

customElements.define("clock-card", ClockCard);

window.customCards = window.customCards || [];

window.customCards.push({
  type: "clock-card",
  name: "Clock Card",
  description: "Minimal digital clock."
});