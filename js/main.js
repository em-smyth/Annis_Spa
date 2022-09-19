// Set dates on booking page on dropdown list
// day-select
const dropdownBookingDates = () => {
  // Get current date from tomorrow
  const nextDay = new Date(); // set nextDay to today
  nextDay.setDate(nextDay.getDate() + 1); // set nextDay to actual tomorrow bu geting today + 1

  const bookingDays = document.querySelectorAll(".booking-date");
  bookingDays.forEach((day, i) => {
    // 1. For each to give the correct dates - done
    // 2. Format correctly
    // Formatted dates

    let weekDay = nextDay.getDay();

    let month = nextDay.getMonth();
    let date = nextDay.getDate();
    let year = nextDay.getFullYear();

    day.innerText = `${getFormattedWeekDay(
      weekDay
    )} ${date} ${getFormattedMonth(month)} ${year}`; // Assign date to element
    nextDay.setDate(nextDay.getDate() + 1); // Increment day by 1 (which gives us next day)
  });
};

// Get formatted week day
const getFormattedWeekDay = (weekDay) => {
  let formattedWeekDay = "";
  switch (weekDay) {
    case 0:
      formattedWeekDay = "Sunday";
      break;
    case 1:
      formattedWeekDay = "Monday";
      break;
    case 2:
      formattedWeekDay = "Tuesday";
      break;
    case 3:
      formattedWeekDay = "Wednesday";
      break;
    case 4:
      formattedWeekDay = "Thursday";
      break;
    case 5:
      formattedWeekDay = "Friday";
      break;
    case 6:
      formattedWeekDay = "Saturday";
      break;
    default:
      throw new Error("Invalid Day");
  }

  return formattedWeekDay;
};

// Get formatted month
const getFormattedMonth = (month) => {
  let formattedMonth = "";
  switch (month) {
    case 0:
      formattedMonth = "January";
      break;
    case 1:
      formattedMonth = "February";
      break;
    case 2:
      formattedMonth = "March";
      break;
    case 3:
      formattedMonth = "April";
      break;
    case 4:
      formattedMonth = "May";
      break;
    case 5:
      formattedMonth = "June";
      break;
    case 6:
      formattedMonth = "July";
      break;
    case 7:
      formattedMonth = "August";
      break;
    case 8:
      formattedMonth = "September";
      break;
    case 9:
      formattedMonth = "October";
      break;
    case 10:
      formattedMonth = "Novemeber";
      break;
    case 11:
      formattedMonth = "December";
      break;
    default:
      throw new Error("Invalid Month");
  }
  return formattedMonth;
};

// =============

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
    const APPEAR_BTN_BUFFER = 200;
    const btnPosition = backToTopButton.getBoundingClientRect().top;

    if (window.innerHeight > btnPosition + APPEAR_BTN_BUFFER) {
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
      }
    }
  }
};
// ====================================================
// Show Pop up Display

const showPopUp = (
  firstNameText,
  lastNameText,
  dayText,
  timeText,
  emailText,
  treatmentText
) => {
  const revealMessages = document.querySelectorAll(".pop-up-message");

  function showMessages(btnTargetData) {
    // console.log("clicked on: ", btnTargetData);

    revealMessages.forEach((message) => {
      let msgTargetData = message.dataset.target;
      if (btnTargetData === msgTargetData) {
        // console.log("show msg with index: ", msgTargetData);
        message.classList.remove("hidden");
      } else {
        // console.log("hide msg with index: ", msgTargetData);
        message.classList.add("hidden");
      }
    });
  }

  const btnPopUps = document.querySelectorAll(".pop-up");
  btnPopUps.forEach((btnPopUp, btnIndex) => {
    let btnTargetData = btnPopUp.dataset.target; // get data from html element
    btnPopUp.addEventListener("click", function () {
      showMessages(btnTargetData);
      if (
        firstNameText === null ||
        lastNameText === null ||
        dayText === "Select Day" ||
        timeText === "Select Hour" ||
        emailText === null ||
        treatmentText === "Select Treatment"
      ) {
        console.log("Gotcha");
      }
      if (btnPopUp.classList.contains("confirm-booking")) {
        getCustomerData();
      }
    });
  });
};

// ====================================================

/**
 * Hide Pop up Display
 * */
const closePopUpMessages = () => {
  // Getting all elements with "close" class & all elements with "pop-up-message" class
  const closeBtns = document.querySelectorAll(".close");
  const popUps = document.querySelectorAll(".pop-up-message");

  closeBtns.forEach((closeBtn) => {
    let btnTargetData = closeBtn.dataset.target;
    closeBtn.addEventListener("click", function () {
      closePopUp(btnTargetData);
    });
  });

  const closePopUp = (btnTargetData) => {
    popUps.forEach((popUp) => {
      let msgTargetData = popUp.dataset.target;
      if (btnTargetData === msgTargetData) {
        popUp.classList.add("hidden");
      }
    });
  };
};

// ====================================================
// Book Now Message Content
const getCustomerData = () => {
  const firstName = document.getElementById("booking-first-name");
  const lastName = document.getElementById("booking-last-name");
  const day = document.getElementById("booking-day");
  const time = document.getElementById("booking-hours");
  const email = document.getElementById("booking-email");
  const treatment = document.getElementById("booking-treatment");

  const firstNameText = firstName.value;
  const lastNameText = lastName.value;
  const dayText = day.options[day.selectedIndex].text;
  const timeText = time.options[time.selectedIndex].text;
  const emailText = email.value;
  const treatmentText = treatment.options[treatment.selectedIndex].text;
  // const treatment = document.querySelector(".treatment");
  replaceMessageText(
    firstNameText,
    lastNameText,
    dayText,
    timeText,
    emailText,
    treatmentText
  );
  showPopUp(
    firstNameText,
    lastNameText,
    dayText,
    timeText,
    emailText,
    treatmentText
  );
};

const replaceMessageText = (
  firstNameText,
  lastNameText,
  dayText,
  timeText,
  emailText,
  treatmentText
) => {
  const firstName = document.querySelectorAll("#confirmation-first-name");
  const lastName = document.getElementById("confirmation-last-name");
  const day = document.getElementById("confirmation-date");
  const time = document.getElementById("confirmation-time");
  const email = document.getElementById("confirmation-email");
  const treatment = document.getElementById("confirmation-treatment");

  // firstName.innerText = "Miles";
  firstName.forEach((name) => {
    name.innerText = firstNameText;
  });

  lastName.innerText = lastNameText;
  day.innerText = dayText;
  time.innerText = timeText;
  email.innerText = emailText;
  treatment.innerText = treatmentText;
};

// ====================================================

// Utility functions
const addLeadingZeros = (num, totalLength) => {
  return String(num).padStart(totalLength, "0");
};

burgerMenuSlide(); // burger menu
carousel(); // carousel
backToTopButton(); // back to top button
dropdownBookingDates(); // get booking dates
showPopUp(); //show pop up message
closePopUpMessages(); //close pop up message
// Reveal All elements
window.addEventListener("scroll", revealAction);
window.addEventListener("load", revealAction);
window.addEventListener("resize", revealAction);
