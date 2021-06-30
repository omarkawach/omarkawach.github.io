const navToggle = document.querySelector("#navToggle");
const navClosedIcon = document.querySelector("#navClosed");
const navOpenIcon = document.querySelector("#navOpen");
const navIcon = document.querySelectorAll(".navIcon");
const nav = document.querySelector("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  navIcon.forEach((icon) => {
    icon.classList.toggle("hidden");
  });
});

window.addEventListener(
  "resize", () => {
    if (document.body.clientWidth > 720) {
      nav.classList.remove("open");
      navIcon.forEach((icon) => {
        icon.classList.remove("hidden");
      });
      navOpenIcon.classList.add("hidden");
    }
  },
  { passive: false }
);

// For handling menu closure in mobile mode
let tabs = document.querySelectorAll("li");
let tabContent = document.getElementsByClassName("tabcontent");

for (let index = 0; index < tabs.length; index++) {
  tabs[index].addEventListener("click", tabHandler);
}

function tabHandler(ev){
  closeMenu();
  updateContent(ev);
}

function closeMenu(){
  nav.classList.remove("open");
  navIcon.forEach((icon) => {
    icon.classList.remove("hidden");
  });
  navOpenIcon.classList.add("hidden");
}

// For switching between tab content
function updateContent(ev){
  for (let index = 0; index < tabContent.length; index++) {
    tabContent[index].style.display = "none";
    tabs[index].style.fontWeight = 'normal';
  }

  tabContent[ev.target.innerText].style.display = "contents"
}


// Show default content
tabContent[0].style.display = "contents";