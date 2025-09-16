const toggle = document.getElementById("dayNightToggle");
const body = document.body;

function setByTime() {
  const hour = new Date().getHours();
  if (hour >= 18 || hour < 6) {
    toggle.classList.add("night");
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    toggle.classList.remove("night");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
}

// Manual toggle
toggle.addEventListener("click", () => {
  toggle.classList.toggle("night");
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
});

// Auto set on load + keep updating
setByTime();
// setInterval(setByTime, 60000);
