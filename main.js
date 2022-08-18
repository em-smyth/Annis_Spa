// Carousel

document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel-item");
  console.log("items", items);
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel-button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `
    <div class="carousel-nav">
    ${buttonsHtml.join("")}
    `
  );

  const buttons = carousel.querySelectorAll(".carousel-button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      // Unselect all the items
      items.forEach((item) => item.classList.remove("carousel-item-selected"));

      buttons.forEach((button) =>
        button.classList.remove("carousel-button-selected")
      );

      // Set all the items oppacity to 0
      items.forEach((item) => (item.style.opacity = "0"));

      items[i].classList.add("carousel-item-selected");
      button.classList.add("carousel-button-selected");
      // items[i].style.opacity = "0.9";

      let style = window.getComputedStyle(items[i]);
      let opacity = style.getPropertyValue("opacity");

      console.log("showMe items, ", opacity);

      // Increase oppacity of a carousel item after a delay
      if (opacity === "0") {
        for (let j = 0; j <= 999; j++) {
          setTimeout(() => {
            items[i].style.opacity = `0.${addLeadingZeros(j, 3)}`;
          }, 0.7 * j);
        }
      }
    });
  });

  items[0].classList.add("carousel-item-selected");
  buttons[0].classList.add("carousel-button-selected");
});

function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, "0");
}

// Reveal Elements on Scroll and load from below

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowheight = window.innerHeight;
    let revealtop = reveals[i].getBoundingClientRect().top;
    let revealpoint = 150;

    // console.log("element number: " + i);
    // console.log(`window Height: ${windowheight - revealpoint}`);
    // console.log("revealtop: " + revealtop);
    // console.log("=================================== ");
    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

// Reveal Elements on Scroll and load from left

window.addEventListener("scroll", revealLeft);
window.addEventListener("load", revealLeft);
function revealLeft() {
  const revealsLeft = document.querySelectorAll(".reveal-left");

  for (let i = 0; i < revealsLeft.length; i++) {
    let windowheight = window.innerHeight;
    let revealtop = revealsLeft[i].getBoundingClientRect().top;
    let revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      revealsLeft[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

// Reveal Elements on Scroll and load from right

window.addEventListener("scroll", revealRight);
window.addEventListener("load", revealRight);
function revealRight() {
  const revealsRight = document.querySelectorAll(".reveal-right");

  for (let i = 0; i < revealsRight.length; i++) {
    let windowheight = window.innerHeight;
    let revealtop = revealsRight[i].getBoundingClientRect().top;
    let revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      revealsRight[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

// Back to top button

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  const backToTopButton = document.querySelector("#back-to-top");
  backToTopButton.addEventListener("click", backToTop);

  let windowHeight = window.innerHeight;
  let revealtop = backToTopButton.getBoundingClientRect().top;
  let revealpoint = 250;

  // // console.log("==============");
  console.log("(S)reveal top: " + revealtop);
  console.log("(B)window height: " + (windowHeight - revealpoint));
  // // console.log("==============");

  if (revealtop < windowHeight - revealpoint) {
    console.log(" ADD ACTIVE!!!");
    backToTopButton.classList.add("active");
  } else {
  }
}

function backToTop() {
  window.scrollTo(0, 0);
}
