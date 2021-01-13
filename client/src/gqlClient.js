import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import config from "./config";

// This is required for apollo-client to send cookies to the server.
// Cookies store our authentication token (login information).
const httpLink = createHttpLink({
  uri: `${config.serverUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage (if it exists)
  // const authToken = localStorage.getItem("authToken");
  const authToken = "TEST-USER-TOKEN";

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
