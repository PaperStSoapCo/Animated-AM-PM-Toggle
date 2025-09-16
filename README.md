# Animated AM/PM Toggle Widget

A beautifully animated **Day/Night toggle** with SVG skylines, clouds, stars, and a glowing sun/moon knob.
The widget automatically switches between light and dark themes based on system time, with smooth manual toggling.

 AM Mode  |  Night Mode  
:-------------------------:|:-------------------------:  
<img src="./Screenshot (2).png" width="300"/> | <img src="./Sreenshot (1).png" width="300"/> 
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

## 🚀 Usage

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/day-night-toggle.git
cd day-night-toggle
```

### 2. Open Demo

Simply open `index.html` in your browser.

---

### 3. Embed the Widget

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

"# Animated-AM-PM-Toggle" 
