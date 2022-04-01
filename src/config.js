export const moviesSet = {
  selectedMovie: {
    id: "",
    title: "",
    poster: "",
    overview: "",
    youtubeIds: [],
  },
  loadedMovies: [],
  counter: 0,
};
export const SLIDESHOWSPEED = 5;
export const TRANSITIONSPEED = 500;
export const API_KEY = "api_key=c65f2cd7740e8f0cb6ca50ace675fc14";
export const API_URL = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&certification_country=USA&include_video=true&page=1&vote_average.gte=7`;
export const API_CONF_URL = `https://api.themoviedb.org/3/configuration?${API_KEY}`;
export const API_VIDEO_URL = `https://api.themoviedb.org/3/movie/`;
