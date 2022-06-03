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
