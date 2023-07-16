const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // Apollo Server integration for Express
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');
// Import your GraphQL schema and resolvers here
const typeDefs = require('./schema/typeDefs'); // Import your GraphQL schema here
const resolvers = require('./schema/resolvers'); // Import your GraphQL resolvers here

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  // Serve the static assets from the 'client/build' directory
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Serve the 'index.html' file for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.use(routes);

// Create an ApolloServer instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  
});

// Apply the ApolloServer middleware to Express


const startApolloServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });;
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
