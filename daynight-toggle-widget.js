
/* 
<div id="myToggleContainer"></div>
  <script src="daynight-toggle-widget.js"></script>
  <script>
    new DayNightToggle({
      parent: document.getElementById('myToggleContainer'),
      width: 160,
      height: 80
    });
  </script>
*/

const style = document.createElement("style");
style.innerHTML = `
  :root {
    --text-light: #222;
    --text-dark: #f5f5f5;
  }

  body.light-mode {
    background: linear-gradient(135deg, #ffb347, #fc5858ff, #ffcc33);
    color: var(--text-light);
    transition: background 1s, color 1s;
  }

  body.dark-mode {
    background: linear-gradient(120deg, #0d0d26, #1a1a3f, #00ffaa, #004466);
    color: var(--text-dark);
    transition: background 1s, color 1s;
  }
`;
document.head.appendChild(style);

class DayNightToggle {
  constructor(options = {}) {
    this.parent = options.parent || document.body;
    this.width = options.width || 350;
    this.height = options.height || 180;
    this.isNight = false;
    this.body = document.body;

    this._createToggle();
    this._autoDetectTime();
  }

  _createToggle() {
    // Container
    this.container = document.createElement("div");
    this.container.classList.add("toggle"); // add toggle class for CSS
    Object.assign(this.container.style, {
      position: "relative",
      width: `${this.width}px`,
      height: `${this.height}px`,
      cursor: "pointer",
      borderRadius: "100px",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
      transition: "background 1s ease-in-out",
      background: "rgba(255,255,255,0.1)"
    });

    // Knob
    this.knob = document.createElement("div");
    this.knob.classList.add("knob");
    Object.assign(this.knob.style, {
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%) rotate(0deg)",
      width: `${this.height - 20}px`,
      height: `${this.height - 20}px`,
      borderRadius: "50%",
      background: "radial-gradient(circle at 30% 30%, #fff8d9, #ffd369)",
      boxShadow: "0 0 40px rgba(255, 211, 105, 0.7)",
      zIndex: "2",
      transition: "all 1s cubic-bezier(.77,0,.18,1)"
    });

    // Moon craters (3) as in original: one big, one medium, one small
    this.craters = [];
    const craterPositions = [
      { size: 20, top: 15, left: 30 },
      { size: 12, top: 35, left: 15 },
      { size: 8, top: 40, left: 50 }
    ];
    craterPositions.forEach(pos => {
      const crater = document.createElement("span");
      Object.assign(crater.style, {
        position: "absolute",
        width: `${pos.size}px`,
        height: `${pos.size}px`,
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.15)",
        transition: "opacity 1s",
        opacity: "0" // hidden by default (sun)
      });
      this.knob.appendChild(crater);
      this.craters.push(crater);
    });

    // Day Scene with exact buildings from original
    this.dayScene = document.createElement("div");
    this.dayScene.classList.add("scene", "day-scene");
    Object.assign(this.dayScene.style, {
      position: "absolute",
      inset: "0",
      borderRadius: "100px",
      zIndex: "1",
      transition: "opacity 1s ease-in-out",
      background: "linear-gradient(to top, #fddbb0 40%, #fcb6b2 100%)",
      opacity: "1"
    });
    this.dayScene.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 180" preserveAspectRatio="none">
        <g fill="white" opacity="0.9">
          <g class="cloud cloud1">
            <circle cx="35" cy="30" r="12"/>
            <circle cx="48" cy="28" r="14"/>
            <circle cx="60" cy="32" r="10"/>
            <circle cx="45" cy="36" r="11"/>
          </g>
          <g class="cloud cloud2">
            <circle cx="110" cy="40" r="14"/>
            <circle cx="125" cy="38" r="16"/>
            <circle cx="138" cy="42" r="12"/>
            <circle cx="122" cy="46" r="13"/>
          </g>
          <g class="cloud cloud3">
            <circle cx="170" cy="28" r="10"/>
            <circle cx="182" cy="26" r="12"/>
            <circle cx="194" cy="30" r="10"/>
            <circle cx="180" cy="32" r="9"/>
          </g>
        </g>

        <!-- Layered Buildings -->
        <g class="buildings">
          <!-- Background layer (far) -->
          <rect x="20" y="80" width="40" height="100" fill="#a0a0c0"/>
          <rect x="70" y="70" width="50" height="110" fill="#9a9ac0"/>
          <rect x="130" y="90" width="35" height="90" fill="#8c8cb8"/>
          <rect x="180" y="75" width="55" height="105" fill="#8787b0"/>
          <rect x="240" y="95" width="40" height="85" fill="#7a7aa0"/>

          <!-- Midground layer -->
          <rect x="15" y="100" width="50" height="80" fill="#b5a5c0"/>
          <rect x="65" y="85" width="55" height="95" fill="#c0a0c5"/>
          <rect x="120" y="110" width="45" height="70" fill="#c89ac5"/>
          <rect x="170" y="90" width="60" height="90" fill="#d18fc0"/>
          <rect x="230" y="105" width="50" height="75" fill="#d98fb5"/>
          <rect x="280" y="95" width="55" height="85" fill="#e07aa5"/>

          <!-- Foreground layer with subtle windows -->
          <rect x="40" y="120" width="30" height="60" fill="#e6a8b0"/>
          <rect x="42" y="125" width="6" height="8" fill="#fff" opacity="0.3"/>
          <rect x="50" y="125" width="6" height="8" fill="#fff" opacity="0.3"/>
          <rect x="42" y="135" width="6" height="8" fill="#fff" opacity="0.3"/>
          <rect x="50" y="135" width="6" height="8" fill="#fff" opacity="0.3"/>

          <rect x="110" y="130" width="25" height="50" fill="#d88ca5"/>
          <rect x="112" y="135" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="120" y="135" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="112" y="143" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="120" y="143" width="5" height="6" fill="#fff" opacity="0.3"/>

          <rect x="190" y="115" width="35" height="65" fill="#c57695"/>
          <rect x="192" y="120" width="6" height="7" fill="#fff" opacity="0.3"/>
          <rect x="200" y="120" width="6" height="7" fill="#fff" opacity="0.3"/>
          <rect x="192" y="128" width="6" height="7" fill="#fff" opacity="0.3"/>
          <rect x="200" y="128" width="6" height="7" fill="#fff" opacity="0.3"/>

          <rect x="260" y="125" width="30" height="55" fill="#b56595"/>
          <rect x="262" y="130" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="270" y="130" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="262" y="138" width="5" height="6" fill="#fff" opacity="0.3"/>
          <rect x="270" y="138" width="5" height="6" fill="#fff" opacity="0.3"/>
        </g>
      </svg>
    `;

    // Night Scene (keep as is, matches original)
    this.nightScene = document.createElement("div");
    this.nightScene.classList.add("scene", "night-scene");
    Object.assign(this.nightScene.style, {
      position: "absolute",
      inset: "0",
      borderRadius: "100px",
      zIndex: "1",
      transition: "opacity 1s ease-in-out",
      background: "linear-gradient(to top, #1a1a40 30%, #2c3e70 100%)",
      opacity: "0"
    });
    this.nightScene.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 180" preserveAspectRatio="none">
        <g class="stars">
          <circle cx="40" cy="30" r="2" fill="white"/>
          <circle cx="90" cy="20" r="2" fill="white"/>
          <circle cx="150" cy="50" r="2" fill="white"/>
          <circle cx="200" cy="25" r="2" fill="white"/>
          <circle cx="260" cy="40" r="2" fill="white"/>
          <circle cx="310" cy="15" r="2" fill="white"/>
          <circle cx="330" cy="60" r="2" fill="white"/>
        </g>
        <g class="skyline">
          <g class="bg-buildings" opacity="0.4">
            <rect x="10" y="90" width="45" height="70" fill="#4a4180"/>
            <rect x="65" y="75" width="55" height="85" fill="#5b4a9a"/>
            <rect x="125" y="95" width="40" height="60" fill="#3f3675"/>
            <rect x="180" y="80" width="60" height="85" fill="#6950aa"/>
            <rect x="245" y="100" width="45" height="65" fill="#423b7f"/>
            <rect x="295" y="85" width="50" height="75" fill="#2c224f"/>
          </g>
          <g class="mid-buildings" opacity="0.8">
            <rect x="15" y="100" width="55" height="80" fill="#3b2f7a"/>
            <rect x="70" y="85" width="60" height="95" fill="#563f95"/>
            <rect x="135" y="110" width="45" height="70" fill="#33274e"/>
            <rect x="185" y="90" width="65" height="90" fill="#5b3f91"/>
            <rect x="250" y="105" width="50" height="75" fill="#3a2f6c"/>
            <rect x="300" y="95" width="55" height="85" fill="#201a38"/>
          </g>
          <g class="fg-buildings">
            <rect x="30" y="110" width="35" height="70" fill="#4a3b9c"/>
            <g fill="#fff" opacity="0.3">
              <rect x="32" y="115" width="5" height="6"/>
              <rect x="40" y="115" width="5" height="6"/>
              <rect x="32" y="123" width="5" height="6"/>
              <rect x="40" y="123" width="5" height="6"/>
            </g>
            <rect x="110" y="120" width="40" height="60" fill="#5c4fae"/>
            <g fill="#fff" opacity="0.3">
              <rect x="112" y="125" width="5" height="6"/>
              <rect x="120" y="125" width="5" height="6"/>
              <rect x="112" y="133" width="5" height="6"/>
              <rect x="120" y="133" width="5" height="6"/>
            </g>
            <rect x="190" y="105" width="50" height="80" fill="#6b52c0"/>
            <g fill="#fff" opacity="0.3">
              <rect x="192" y="110" width="6" height="7"/>
              <rect x="200" y="110" width="6" height="7"/>
              <rect x="192" y="118" width="6" height="7"/>
              <rect x="200" y="118" width="6" height="7"/>
            </g>
            <rect x="270" y="115" width="45" height="65" fill="#5b3fa0"/>
            <g fill="#fff" opacity="0.3">
              <rect x="272" y="120" width="5" height="6"/>
              <rect x="280" y="120" width="5" height="6"/>
              <rect x="272" y="128" width="5" height="6"/>
              <rect x="280" y="128" width="5" height="6"/>
            </g>
          </g>
        </g>
      </svg>
    `;

    this.container.appendChild(this.dayScene);
    this.container.appendChild(this.nightScene);
    this.container.appendChild(this.knob);
    this.parent.appendChild(this.container);

    this.container.addEventListener("click", () => this.toggle());
  }

  _autoDetectTime() {
    const hour = new Date().getHours();
    this.isNight = hour >= 18 || hour < 6;
    this._updateToggle();
  }

  _updateToggle() {
    if (this.isNight) {
      this.nightScene.style.opacity = "1";
      this.dayScene.style.opacity = "0";
      this.knob.style.left = `${this.width - this.height + 10}px`;
      this.knob.style.background = "radial-gradient(circle at 30% 30%, #d8dbe8, #a6aed1)";
      this.knob.style.boxShadow = "0 0 15px rgba(180, 185, 220, 0.6)";
      this.knob.style.transform = "translateY(-50%) rotate(360deg)";
      this.craters.forEach(c => c.style.opacity = "1"); // moon craters visible

      this.body.classList.add("dark-mode");
      this.body.classList.remove("light-mode");
    } else {
      this.nightScene.style.opacity = "0";
      this.dayScene.style.opacity = "1";
      this.knob.style.left = "10px";
      this.knob.style.background = "radial-gradient(circle at 30% 30%, #fff8d9, #ffd369)";
      this.knob.style.boxShadow = "0 0 20px rgba(255, 211, 105, 0.7)";
      this.knob.style.transform = "translateY(-50%) rotate(0deg)";
      this.craters.forEach(c => c.style.opacity = "0"); // hide craters

      this.body.classList.add("light-mode");
      this.body.classList.remove("dark-mode");
    }
  }

  toggle() {
    this.isNight = !this.isNight;
    this._updateToggle();
  }
}
