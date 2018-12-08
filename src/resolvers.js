module.exports = {
  Query: {
    movies: async (_, __, { dataSources }) =>
      dataSources.CinemaAPI.getAllMovies()
  }
};
