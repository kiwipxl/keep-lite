import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// This is required for apollo-client to send cookies to the server.
// Cookies store our authentication token (login information).
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage (if it exists)
  const authToken = localStorage.getItem("authToken");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
