"use strict";

//////////////////////////////////////////////////////////////////////////
// VARIABLES & STATE /////////////////////////////////////////////////////

let direction = "auto";
let counter = 0;
const slideShowSpeed = 5;
const slidesContainer = document.querySelector(".container__trailer-slider");
const trailersSet = [
  "trailer1.jpg",
  "trailer2.jpg",
  "trailer3.jpg",
  "trailer4.jpg",
];

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////

const setSlides = trailersSet
  .map((el, i) => {
    return `<div class="container__trailer-slide" style="transform: translateX(${
      100 * (i - 1)
    }%)" ><img src="img/${el}" alt="Trailer image" class="trailer__img" id="trailer-img-${i}"></div>`;
  })
  .join("");

slidesContainer.insertAdjacentHTML("afterbegin", setSlides);

//////////////////////////////////////////////////////////////////////////
// BUTTON CONTROLLER /////////////////////////////////////////////////////

document.querySelectorAll(".trailer__button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("next")) {
      direction = "next";
    } else {
      direction = "prev";
    }
    slideChangeHandler();
  })
);

//////////////////////////////////////////////////////////////////////////
// INTERVAL CONTROLLER ///////////////////////////////////////////////////

const onLoadSlideShow = setInterval(() => {
  if (direction === "auto" && counter < trailersSet.length) {
    slideChangeHandler();
    counter++;
  } else {
    stopSlideShow();
  }
}, slideShowSpeed * 1000);

function stopSlideShow() {
  clearInterval(initialSlideShow);
}

//////////////////////////////////////////////////////////////////////////
// SLIDE CONTROLLER ///////////////////////////////////////////////////

function slideChangeHandler() {
  moveSlide();
  initializeSlidesOrder();
}

//////////////////////////////////////////////////////////////////////////
// FIRST/LAST SLIDE MOVE /////////////////////////////////////////////////

function moveSlide() {
  if (direction === "next" || direction === "auto") {
    slidesContainer.appendChild(slidesContainer.firstElementChild);
  } else {
    slidesContainer.prepend(slidesContainer.lastElementChild);
  }
}

//////////////////////////////////////////////////////////////////////////
// SLIDES TRANSITION /////////////////////////////////////////////////////

function initializeSlidesOrder() {
  const curSlides = document.querySelectorAll(".container__trailer-slide");
  curSlides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - 1)}%)`;
  });
}
