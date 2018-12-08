const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  movies: [Movie]!
}

type Movie {
  id: ID!
  imdbId: String
  year: String
  website: String
  updatedAt: String
  title: String
  showtimes: [Showtime]
  runtime: String
  releaseDate: String
  poster: String
  production: String
  plot: String
  imdbRating: String
  mediaType: String
  language: String
  genre: String
  director: String
  country: String
  boxOffice: String
  awards: String
  actors: String
  ORuntime: String
  OReleaseDate: String
  OPlot: String
  OGenre: String
  ODirector: String
  OActor: String
}

type Showtime {
  id: ID!
  imdbId: String
  movieId: Int
  title: String
  cinemahall: String
  showtime: String
  created_at: String
  updated_at: String
}

`

module.exports = typeDefs;

