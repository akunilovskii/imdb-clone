"use strict";

import { SLIDESHOWSPEED } from "./config.js";
import { moviesSet } from "./model.js";
import posterSlider from "./posterSlider.js";
import trailerSlider from "./trailerSlider.js";

//////////////////////////////////////////////////////////////////////////
// VARIABLES & STATE /////////////////////////////////////////////////////

let counter = 0;

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////

trailerSlider.render(moviesSet);
trailerSlider.initializeItemsOrder("X", "slide", 1);
posterSlider.render(moviesSet);
trailerSlider.initializeItemsOrder("Y", "poster__list-item", 1);

//////////////////////////////////////////////////////////////////////////
// BUTTON CONTROLLER /////////////////////////////////////////////////////

const buttons = document.querySelectorAll(".trailer__button");

function eventListenerFunction(e) {
  if (typeof counter === "number") {
    stopSlideShow();
    counter = "";
  }
  if (e.currentTarget.classList.contains("next")) {
    slideChangeHandler("next");
  } else {
    slideChangeHandler("prev");
  }
}

function addListeners() {
  buttons.forEach((btn) =>
    btn.addEventListener("click", eventListenerFunction)
  );
}

function removeListeners() {
  buttons.forEach((btn) =>
    btn.removeEventListener("click", eventListenerFunction)
  );
  setTimeout(() => {
    addListeners();
  }, 500);
}

addListeners();
//////////////////////////////////////////////////////////////////////////
// SLIDESHOW CONTROLLER //////////////////////////////////////////////////

const onLoadSlideShow = setInterval(() => {
  if (counter < moviesSet.length) {
    slideChangeHandler("next");
    counter++;
  } else {
    stopSlideShow();
  }
}, SLIDESHOWSPEED * 1000);

function stopSlideShow() {
  clearInterval(onLoadSlideShow);
}

//////////////////////////////////////////////////////////////////////////
// SLIDE CONTROLLER ///////////////////////////////////////////////////

function slideChangeHandler(direction) {
  removeListeners();
  trailerSlider.itemMove(direction);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  posterSlider.itemMove(direction);
  posterSlider.initializeItemsOrder("Y", "poster__list-item", 1);
}
