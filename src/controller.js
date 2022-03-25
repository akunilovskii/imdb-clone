"use strict";

import { SLIDESHOWSPEED, TRANSITIONSPEED } from "./config.js";
import * as Model from "./model.js";
import posterSlider from "./posterSlider.js";
import trailerSlider from "./trailerSlider.js";
import * as buttons from "./buttons.js";

//////////////////////////////////////////////////////////////////////////
// VARIABLES & STATE /////////////////////////////////////////////////////

let counter = 0;

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////
buttons.render();
const data = await Model.loadMovies();
trailerSlider.render(data);
trailerSlider.initializeItemsOrder("X", "slide", 1);
posterSlider.render(data);
trailerSlider.initializeItemsOrder("Y", "poster__list-item", 1);
const posterListTitle = await Model.posterListTitle;
document.querySelector(".poster__list-title").innerHTML = posterListTitle;

//////////////////////////////////////////////////////////////////////////
// BUTTON CONTROLLER /////////////////////////////////////////////////////

buttons.addListeners(slideChangeHandler);

//////////////////////////////////////////////////////////////////////////
// SLIDESHOW CONTROLLER //////////////////////////////////////////////////

const onLoadSlideShow = setInterval(() => {
  if (counter < Model.moviesSet.length) {
    slideChangeHandler("next", true);
    counter++;
  } else {
    stopSlideShow();
  }
}, SLIDESHOWSPEED * 1000);

function stopSlideShow() {
  clearInterval(onLoadSlideShow);
  console.log("Slideshow stopped");
}

//////////////////////////////////////////////////////////////////////////
// SLIDE CONTROLLER //////////////////////////////////////////////////////

export function slideChangeHandler(direction, slideshow = false) {
  if (
    (typeof counter === "number" && slideshow === false) ||
    counter === Model.moviesSet.length
  ) {
    stopSlideShow();
    counter = "";
  }

  trailerSlider.itemMove(direction);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  posterSlider.itemMove(direction);
  posterSlider.initializeItemsOrder("Y", "poster__list-item", 1);
}
