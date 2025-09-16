# Animated AM/PM Toggle Widget

A beautifully animated **Day/Night toggle** with SVG skylines, clouds, stars, and a glowing sun/moon knob.
The widget automatically switches between light and dark themes based on system time, with smooth manual toggling.

 AM Mode  |  PM Mode  
:-------------------------:|:-------------------------:  
<img src="./Screenshot (2).png" width="600"/> | <img src="./Screenshot (1).png" width="600"/> 
---

## ✨ Features

* 🌇 **Day Scene** – Layered colorful buildings, animated drifting clouds, and a warm gradient background.
* 🌃 **Night Scene** – Starry sky with twinkling stars, glowing skyline, and moon craters.
* 🌓 **Interactive Toggle** – Click to switch instantly between day and night.
* ⏰ **Auto Mode** – Detects time (after 6 PM or before 6 AM → Night Mode).
* 🎨 **Glassmorphism Design** – Smooth blur effects with gradients.
* ⚡ **Reusable Widget** – Can be embedded in any webpage or footer.

---

## 📂 Project Structure

```
day-night-toggle/
│── index.html             # Main demo page
│── style.css              # Styles for animations and themes
│── script.js              # Time detection + toggle logic
│── daynight-toggle-widget.js  # Reusable widget version
```

---

## ⚙️ How It Works

The **AM/PM or Day/Night Toggle** is an interactive widget that visually switches between **day mode (AM)** and **night mode (PM)** while also updating the page’s theme.

1. **Automatic Detection by Time**

   * On page load, JavaScript checks the current system time.
   * Between **6 AM – 6 PM**, the toggle defaults to **Day Mode** (AM).
   * Between **6 PM – 6 AM**, it switches to **Night Mode** (PM).

2. **Manual Toggle**

   * Clicking the toggle knob (sun/moon) lets you override the current mode.
   * Smooth transitions animate the background gradient, knob position, and scene details.

3. **Day Scene (AM)**

   * Bright gradient background with animated **clouds drifting across the sky**.
   * Layered **buildings in soft pastel colors** give depth.
   * The knob shows a glowing **sun**.

4. **Night Scene (PM)**

   * Dark aurora-inspired gradient background with **twinkling stars**.
   * Layered **skyline buildings with glowing windows** for realism.
   * The knob transforms into the **moon with visible craters**.

5. **Glassmorphism Toggle Design**

   * The toggle container uses **frosted glass styling** with blur, rounded edges, and soft shadows.
   * The knob glides smoothly between left (sun) and right (moon).

6. **Theming**

   * The `<body>` switches between `.light-mode` and `.dark-mode` classes.
   * Text and colors across the page adapt automatically.

7. **Widget Reuse**

   * The project includes a `daynight-toggle-widget.js` script.
   * This allows easy embedding of the toggle in **any webpage**.

---

## 🚀 Usage

You can embed the toggle in **any webpage** using either your local copy or **jsDelivr CDN**:

### 1️⃣ Local usage

**1. Clone the Repo**

```bash
git clone https://github.com/your-username/day-night-toggle.git
cd day-night-toggle
```

**2. Open Demo**

Simply open `index.html` in your browser.

---

**3. Embed the Widget**

Add this snippet where you want the toggle:

```html
<div id="myToggleContainer"></div>
<script src="daynight-toggle-widget.js"></script>
<script>
  new DayNightToggle({
    parent: document.getElementById('myToggleContainer'),
    width: 160,
    height: 80
  });
</script>
```
### 2️⃣ Using jsDelivr (versioned release)

```html
<div id="myToggleContainer"></div>

<script src="https://cdn.jsdelivr.net/gh/Sagarika311/Animated-AM-PM-Toggle@v1.0.0/daynight-toggle-widget.js"></script>
<script>
  new DayNightToggle({
    parent: document.getElementById('myToggleContainer'),
    width: 160,
    height: 80
  });
</script>
```

---

## 🛠 Tech Stack

* **HTML5**
* **CSS3 (Glassmorphism, Animations, Gradients)**
* **Vanilla JavaScript (No dependencies)**
* **SVG Graphics**

---

## 📸 Preview

<p align="center">  
  <img src="./Preview.gif" alt="AM/PM or Day/Night Toggle Demo" width="600"/>  
</p>  

---

## 📜 License

MIT License © 2025 [Sagarika](https://github.com/Sagarika311)
