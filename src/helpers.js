import { SLIDESHOWSPEED, moviesSet } from "./config.js";
import { slideChangeHandler } from "./controller.js";

export const AJAX = async function (url, year, genre) {
  try {
    if (year || genre) {
      const res = await fetch(`${url}&year=${year}&with_genres=${genre}`);
      const { results } = await res.json();
      return results.slice(0, 10);
    }
    if (!year && !genre) {
      const res = await fetch(url);
      const results = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return results;
    }
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////////////////////////////////////
// SLIDESHOW //////////////////////////////////////////////////

const onLoadSlideShow = setInterval(() => {
  if (moviesSet.counter < moviesSet.loadedMovies.length) {
    slideChangeHandler("next", true);
    moviesSet.counter++;
  } else {
    stopSlideShow();
  }
}, SLIDESHOWSPEED * 1000);

export function stopSlideShow() {
  clearInterval(onLoadSlideShow);
  moviesSet.counter = "";
}
