import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { GRAPHQL_API_URL } from "./consts.ts"

export const apolloClient = new ApolloClient({
	uri: GRAPHQL_API_URL,
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <App/>
)
