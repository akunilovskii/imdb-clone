"use strict";

import * as config from "./config.js";

//////////////////////////////////////////////////////////////////////////
// VARIABLES & STATE /////////////////////////////////////////////////////

let direction = "auto";
let counter = 0;
const slideShowSpeed = 5;
const slidesContainer = document.querySelector(".container__trailer-slider");

const moviesSet = {
  id1: {
    title: "The Endgame",
    image: "1-trailer.jpg",
    poster: "1-poster.jpg",
    duration: "2:01",
    subtitle: "Watch the New Trailer",
  },
  id2: {
    title: "Doctor Strange in the Multiverse of Madness",
    image: "2-trailer.jpg",
    poster: "2-poster.jpg",
    duration: "2:17",
    subtitle: "Watch the New Trailer",
  },
  id3: {
    title: "The Lord of the Rings: The Rings of Power",
    image: "3-trailer.jpg",
    poster: "3-poster.jpg",
    duration: "1:01",
    subtitle: "Watch the New Trailer",
  },
  id4: {
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    image: "4-trailer.jpg",
    poster: "4-poster.jpg",
    duration: "2:44",
    subtitle: "Watch the New Trailer",
  },
};
const moveisSetKeysArray = Object.keys(moviesSet);

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////

const setSlides = moveisSetKeysArray
  .map((movie, i) => {
    console.log(moviesSet[movie]["image"]);
    return `<div class="container__trailer-slide" style="transform: translateX(${
      100 * (i - 1)
    }%)" ><img src="img/${
      moviesSet[movie]["image"]
    }" alt="Trailer image" class="trailer__img" id="trailer-img-${i}"></div>`;
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
  if (direction === "auto" && counter < moveisSetKeysArray.length) {
    slideChangeHandler();
    counter++;
  } else {
    stopSlideShow();
  }
}, slideShowSpeed * 1000);

function stopSlideShow() {
  clearInterval(onLoadSlideShow);
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
