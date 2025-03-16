// Core Apollo Client imports for GraphQL functionality
// ApolloClient: Main client class for making GraphQL requests
// InMemoryCache: Caching solution for storing query results
// HttpLink: Configures HTTP connection to GraphQL endpoint
// ApolloLink: Enables creation of middleware chain for request/response handling
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

// Error handling middleware for Apollo Client
// Provides detailed error information for both GraphQL and network errors
import { onError } from "@apollo/client/link/error";

// Configure error handling middleware
// This will intercept and log any GraphQL or network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // Handle GraphQL-specific errors (e.g., validation, resolver errors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location:${locations} , Path:${path}`
      );
    });
  }
  if (networkError) {
    // Handle network-level errors (e.g., connection issues)
    console.error(`[Network Error]: ${networkError}`);
  }
});

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

// Create the Apollo Link chain
// Order matters: errorLink will run before httpLink
const link = ApolloLink.from([errorLink, httpLink]);

// Initialize Apollo Client with:
// - Configured link chain for network requests
// - In-memory cache for storing query results
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
