import {
  moviesSet,
  API_CONF_URL,
  API_KEY,
  API_URL,
  API_VIDEO_URL,
} from "./config.js";
import { stopSlideShow, AJAX, counter } from "./helpers.js";
import * as movieTrailer from "./movieTrailer.js";

// const configData = await AJAX(API_CONF_URL);

const YOUTUBE = `https://www.youtube.com/watch?v=`;
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
  const { genre } = { genre: "Science Fiction", genreId: 878 };
  // getGenreYear("genres");
  const year = 2019;
  // getGenreYear("year");
  const { genreId } = { genre: "Science Fiction", genreId: 878 };

  // arrayGenresYears.genres[
  //   arrayGenresYears.genres.findIndex(
  //     (el) => el.genre === (userGenre ?? genre)
  //   )
  // ];

  const data = await AJAX(API_URL, year, genreId);

  posterListTitle = `Top 10 ${genre} movies of ${year}`;

  moviesSet.loadedMovies = data.map((el) => {
    return {
      id: el.id,
      title: el.title,
      image: `http://image.tmdb.org/t/p/w1280${el.backdrop_path}`,
      poster: `http://image.tmdb.org/t/p/w92${el.poster_path}`,
      duration: el.vote_average,
      subtitle: "Watch the New Trailer",
      overview: el.overview,
    };
  });
};

export function getSelectedMovie() {
  if (typeof counter === "number") {
    stopSlideShow();
  }

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

  // getStatus(movie, movieId);
}

export function getStatus(movie, movieId) {
  console.log(movieId);
  console.log(movie);
  console.log(moviesSet.selectedMovie);
}

export async function getYoutubeIds() {
  const { results: trailerLinks } = await AJAX(
    `${API_VIDEO_URL}${moviesSet.selectedMovie.id}/videos?${API_KEY}&language=en-US}`
  );
  const tempFilteredLinks = trailerLinks.filter((el) =>
    el.name.toLowerCase().includes("official")
  );
  moviesSet.selectedMovie.youtubeIds = (
    tempFilteredLinks.length > 1 ? tempFilteredLinks : trailerLinks.slice(0, 5)
  ).map((el, i) => {
    if (el.site === "YouTube") {
      return `${el.key}`;
    }
  });
  console.log(moviesSet.selectedMovie.youtubeIds + "get youtubeIds");
}

export function renderPosterListTitle() {
  document.querySelector(".poster__list-title").innerHTML = posterListTitle;
}

export function newMovieListener(handler) {
  Array.from(document.querySelectorAll("a")).forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      moviesSet.selectedMovie.id = e.currentTarget
        .getAttribute("href")
        .slice(1);
      handler();
    });
  });
}
