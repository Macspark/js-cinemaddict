import {generateMovie} from '../mock/movie.js';

export default class MoviesModel {
  movies = Array.from({length: 5}, generateMovie);

  getMovies() {
    return this.movies;
  }
}