const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const CinemaAPI = require('./src/datasources/cinema-api.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    CinemaAPI: new CinemaAPI()
  })}
);

server.listen({port: 9003}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
