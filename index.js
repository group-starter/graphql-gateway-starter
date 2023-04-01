import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "localhost", url: "http://localhost:3001/graphql-ms" },
      {
        name: "online graphql",
        url: "https://flyby-locations-sub.herokuapp.com/",
      },
      // ...additional subgraphs...
    ],
  }),
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

// Note the top-level `await`!
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3002,
  },
});
console.log(`🚀  Server ready at ${url}`);
