import {
  moviesSet,
  API_CONF_URL,
  API_KEY,
  API_URL,
  API_VIDEO_URL,
} from "./config.js";

import { AJAX } from "./helpers.js";
import * as movieTrailer from "./movieTrailer.js";

// const configData = await AJAX(API_CONF_URL);

export let posterListTitle;

const arrayGenresYears = {
  genres: [
    { genre: "Drama", genreId: 18 },
    { genre: "Family", genreId: 10751 },
    { genre: "Fantasy", genreId: 14 },
    { genre: "Mystery", genreId: 9648 },
    { genre: "Science Fiction", genreId: 878 },
  ],
  year: [2018, 2019, 2020, 2021],
};

function getGenreYear(key) {
  return arrayGenresYears[key][
    Math.ceil(Math.random() * arrayGenresYears[key].length - 1)
  ];
}

export const loadMovies = async function (userGenre = undefined) {
  const { genre } = getGenreYear("genres");
  const year = getGenreYear("year");
  const { genreId } =
    arrayGenresYears.genres[
      arrayGenresYears.genres.findIndex(
        (el) => el.genre === (userGenre ?? genre)
      )
    ];

  const data = await AJAX(API_URL, year, genreId);

  posterListTitle = `Top 10 ${genre} movies of ${year}`;

  moviesSet.loadedMovies = data.map((el) => {
    return {
      id: el.id,
      title: el.title,
      image: `https://image.tmdb.org/t/p/w1280${el.backdrop_path}`,
      poster: `https://image.tmdb.org/t/p/w92${el.poster_path}`,
      duration: el.vote_average,
      subtitle: "Watch the New Trailer",
      overview: el.overview,
    };
  });
};

export function getSelectedMovie() {
  const movieId = moviesSet.selectedMovie.id;
  const [movie] = moviesSet.loadedMovies.filter(
    (el) => el.id.toString() === movieId.toString()
  );

  moviesSet.selectedMovie = {
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    overview: movie.overview,
  };
}

export async function getYoutubeIds() {
  const { results: trailerLinks } = await AJAX(
    `${API_VIDEO_URL}${moviesSet.selectedMovie.id}/videos?${API_KEY}&language=en-US}`
  );
  let tempFilteredLinks = trailerLinks.filter((el) => {
    if (
      el.name.toLowerCase().includes("official") &&
      el.site.toLowerCase() === "youtube"
    ) {
      return el;
    }
  });

  tempFilteredLinks =
    tempFilteredLinks.length > 0
      ? tempFilteredLinks.slice(0, 3)
      : trailerLinks.slice(0, 3);

  moviesSet.selectedMovie.youtubeIds = tempFilteredLinks.map((el) => {
    return `${el.key}`;
  });
}

export function renderPosterListTitle() {
  document.querySelector(".poster__list-title").innerHTML = posterListTitle;
}

export function newMovieListener(handler) {
  Array.from(document.querySelectorAll("a")).forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      moviesSet.selectedMovie.id = e.currentTarget.getAttribute("id");
      handler();
    });
  });
}
