/**Burger Menu - This function slides burger menu into the viewport */
const burgerMenuSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navbar-links-flex");
  const navLinks = document.querySelectorAll(`.navbar-links-flex li`);

  // Toggle Nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    // Animate Links
    navLinks.forEach((link, index) => {
      const linkTiming = index / 7 + 0.2;
      if (link.style.animation) {
        link.style.animation = ``;
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${linkTiming}s`;
      }
    });

    // Burger animation
    burger.classList.toggle("toggle");
  });
};

/**
 * @name carousel
 * @description This function slides burger menu into the viewport
 * */
const carousel = () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel-item");
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
        items.forEach((item) =>
          item.classList.remove("carousel-item-selected")
        );

        buttons.forEach((button) =>
          button.classList.remove("carousel-button-selected")
        );

        // Set all the items oppacity to 0
        items.forEach((item) => (item.style.opacity = "0"));

        items[i].classList.add("carousel-item-selected");
        button.classList.add("carousel-button-selected");

        let style = window.getComputedStyle(items[i]);
        let opacity = style.getPropertyValue("opacity");

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
};

// Back to top button
const backToTopButton = () => {
  const backToTopButton = document.querySelector("#back-to-top-btn");

  window.addEventListener("scroll", scrollFunction);

  function scrollFunction() {
    if (window.pageYOffset > 2100) {
      // Show backToTopButton
      if (!backToTopButton.classList.contains("btnEntrance")) {
        backToTopButton.classList.add("btnEntrance");
        backToTopButton.style.display = "block";
      }
    }
  }

  backToTopButton.addEventListener("click", backToTop);
  function backToTop() {
    window.scrollTo(0, 0);
  }
};

// Reveal elements
const revealAction = () => {
  const elementsToReveal = document.querySelectorAll(".reveal-action");
  for (let i = 0; i < elementsToReveal.length; i++) {
    if (!elementsToReveal[i].classList.contains("active")) {
      let windowheight = window.innerHeight;
      let revealtop = elementsToReveal[i].getBoundingClientRect().top;
      let revealpoint = 150;

      // If an element has a class "treatment-boxes" we want to reveal it sooner.
      if (elementsToReveal[i].classList.contains("treatment-boxes")) {
        revealpoint = 0;
      }

      if (revealtop < windowheight - revealpoint) {
        elementsToReveal[i].classList.add("active");
        if (i === 2) {
          console.log("add active");
        }
      }
    }
  }
};

// Utility functions
const addLeadingZeros = (num, totalLength) => {
  return String(num).padStart(totalLength, "0");
};

burgerMenuSlide(); // burger menu
carousel(); // carousel
backToTopButton(); // back to top button
// Reveal All elements
window.addEventListener("scroll", revealAction);
window.addEventListener("load", revealAction);
window.addEventListener("resize", revealAction);
