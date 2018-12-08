const { RESTDataSource } = require('apollo-datasource-rest');

class CinemaAPI extends RESTDataSource {
  constructor () { super();
    this.baseURL = 'http://localhost:4000/api/'
  }

  async getAllMovies () {
    const res = await this.get('movies/cineplex')
    return res && res.length ? res.map(mov => this.movieReducer(mov)) : [];
  }

  movieReducer(movie) {
    return {
      id: movie.id,
      imdbId: movie.imdb_id,
      year: movie.year,
      website: movie.website,
      updatedAt: movie.updated_at,
      title: movie.title,
      runtime: movie.runtime,
      releaseDate: movie.releaseDate,
      poster: movie.poster,
      production: movie.production,
      plot: movie.plot,
      imdbRating: movie.imdb_rating,
      mediaType: movie.mediaType,
      language: movie.language,
      genre: movie.genre,
      director: movie.director,
      country: movie.country,
      boxOffice: movie.box_office,
      awards: movie.awards,
      actors: movie.actors,
      ORuntime: movie.o_runtime,
      OReleaseDate: movie.o_release_date,
      OPlot: movie.o_plot,
      OGenre: movie.o_genre,
      ODirector: movie.o_director,
      OActor: movie.o_actor,
      showtimes: movie.showtimes.map(st => ({
        id: st.id,
        imdbId: st.imdb_id,
        title: st.title,
        cinemahall: st.cinemahall,
        movieId: st.movieId,
        showtime: st.showtime,
        createdAt: st.created_at,
        updatedAt: st.updated_at
      }))
    }
  }

}

module.exports = CinemaAPI
