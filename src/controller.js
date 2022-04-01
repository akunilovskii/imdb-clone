"use strict";

import * as Model from "./model.js";
import * as buttons from "./buttons.js";
import { moviesSet } from "./config.js";
import * as helpers from "./helpers.js";
import posterSlider from "./posterSlider.js";
import trailerSlider from "./trailerSlider.js";
import * as movieTrailer from "./movieTrailer.js";

//////////////////////////////////////////////////////////////////////////
// DOM INIT  /////////////////////////////////////////////////////////////

async function loadHomeScreen() {
  await Model.loadMovies();
  trailerSlider.rendercontainerMarkup();
  trailerSlider.render(moviesSet.loadedMovies);
  posterSlider.render(moviesSet.loadedMovies);
  buttons.render();
  buttons.addButtonListeners(slideChangeHandler);
  Model.renderPosterListTitle();
  Model.newMovieListener(loadTrailerScreen);
  trailerSlider.initializeItemsOrder("X", "slide", 1);
  trailerSlider.initializeItemsOrder("Y", "poster__list-item", 1);
  helpers.controlSlideShow("start");
}

async function loadTrailerScreen() {
  Model.getSelectedMovie();
  await Model.getYoutubeIds();
  helpers.controlSlideShow("stop");
  movieTrailer.render(moviesSet.selectedMovie.youtubeIds);
  movieTrailer.backButtonListener(loadHomeScreen);
}

//////////////////////////////////////////////////////////////////////////
// SLIDE CONTROLLER //////////////////////////////////////////////////////

export function slideChangeHandler(direction, slideshow = false) {
  if (slideshow === false) {
    helpers.controlSlideShow("stop");
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
