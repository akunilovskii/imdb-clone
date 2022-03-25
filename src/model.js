import { API_CONF_URL, API_URL } from "./config.js";
import { AJAX } from "./helpers.js";

export let moviesSet;
//  = [
//   {
//     id: 1,
//     title: "The Endgame",
//     image: "1-trailer.jpg",
//     poster: "1-poster.jpg",
//     duration: "2:01",
//     subtitle: "Watch the New Trailer",
//   },
//   {
//     id: 2,
//     title: "Doctor Strange in the Multiverse of Madness",
//     image: "2-trailer.jpg",
//     poster: "2-poster.jpg",
//     duration: "2:17",
//     subtitle: "Watch the New Trailer",
//   },
//   {
//     id: 3,
//     title: "The Lord of the Rings: The Rings of Power",
//     image: "3-trailer.jpg",
//     poster: "3-poster.jpg",
//     duration: "1:01",
//     subtitle: "Watch the New Trailer",
//   },
//   {
//     id: 4,
//     title: "Fantastic Beasts: The Secrets of Dumbledore",
//     image: "4-trailer.jpg",
//     poster: "4-poster.jpg",
//     duration: "2:44",
//     subtitle: "Watch the New Trailer",
//   },
//   {
//     id: 5,
//     title: "Bullet Train",
//     image: "5-trailer.jpg",
//     poster: "5-poster.jpg",
//     duration: "2:37",
//     subtitle: "Watch the Action-Packed Trailer",
//   },
// ];

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
const year = getGenreYear("year");
const { genre } = getGenreYear("genres");
export const loadMovies = async function (userGenre = undefined) {
  const { genreId } =
    arrayGenresYears.genres[
      arrayGenresYears.genres.findIndex(
        (el) => el.genre === (userGenre ?? genre)
      )
    ];

  const data = await AJAX(API_URL, year, genreId);

  return (moviesSet = [
    ...data.map((el) => {
      return {
        id: el.id,
        title: el.title,
        image: `http://image.tmdb.org/t/p/w1280/${el.backdrop_path}`,
        poster: `http://image.tmdb.org/t/p/w92/${el.poster_path}`,
        duration: el.vote_average,
        subtitle: "Watch the New Trailer",
      };
    }),
  ]);
};

// const configData = await AJAX(API_CONF_URL);

export const posterListTitle = `Top 10 ${genre} movies of ${year}`;
