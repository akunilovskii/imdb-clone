"use strict";

import { SLIDESHOWSPEED, TRANSITIONSPEED } from "./config.js";
import * as Model from "./model.js";
import posterSlider from "./posterSlider.js";
import trailerSlider from "./trailerSlider.js";

//////////////////////////////////////////////////////////////////////////
// VARIABLES & STATE /////////////////////////////////////////////////////

let counter = 0;

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////
const data = await Model.loadMovies();
trailerSlider.render(data);
trailerSlider.initializeItemsOrder("X", "slide", 1);
posterSlider.render(data);
trailerSlider.initializeItemsOrder("Y", "poster__list-item", 1);
const posterListTitle = await Model.posterListTitle;
document.querySelector(".poster__list-title").innerHTML = posterListTitle;

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
  }, TRANSITIONSPEED);
}

addListeners();
//////////////////////////////////////////////////////////////////////////
// SLIDESHOW CONTROLLER //////////////////////////////////////////////////

const onLoadSlideShow = setInterval(() => {
  if (counter < Model.moviesSet.length) {
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
// SLIDE CONTROLLER //////////////////////////////////////////////////////

function slideChangeHandler(direction) {
  removeListeners();
  trailerSlider.itemMove(direction);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  posterSlider.itemMove(direction);
  posterSlider.initializeItemsOrder("Y", "poster__list-item", 1);
}

//////////////////////////////////////////////////////////////////////////
// FETCH MOVIES  /////////////////////////////////////////////////////////
