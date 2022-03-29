"use strict";

import * as Model from "./model.js";
import * as buttons from "./buttons.js";
import * as config from "./config.js";
import * as helpers from "./helpers.js";
import posterSlider from "./posterSlider.js";
import trailerSlider from "./trailerSlider.js";
import * as movieTrailer from "./movieTrailer.js";

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////

async function loadHomeScreen() {
  await Model.loadMovies();
  trailerSlider.rendercontainerMarkup();
  trailerSlider.render(config.moviesSet.loadedMovies);
  posterSlider.render(config.moviesSet.loadedMovies);
  buttons.render();
  buttons.addButtonListeners(slideChangeHandler);
  Model.renderPosterListTitle();
  Model.newMovieListener(loadTrailerScreen);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  trailerSlider.initializeItemsOrder("Y", "poster__list-item", 1);
}

async function loadTrailerScreen() {
  Model.getSelectedMovie();
  await Model.getYoutubeIds();
  movieTrailer.render(config.moviesSet.selectedMovie.youtubeIds);
  movieTrailer.backButtonListener(loadHomeScreen);
}

//////////////////////////////////////////////////////////////////////////
// SLIDE CONTROLLER //////////////////////////////////////////////////////

export function slideChangeHandler(direction, slideshow = false) {
  if (
    (typeof helpers.counter === "number" && slideshow === false) ||
    helpers.counter === config.moviesSet.loadedMovies.length
  ) {
    helpers.stopSlideShow();
  }

  trailerSlider.itemMove(direction);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  posterSlider.itemMove(direction);
  posterSlider.initializeItemsOrder("Y", "poster__list-item", 1);
}

function init() {
  loadHomeScreen();
}

init();
