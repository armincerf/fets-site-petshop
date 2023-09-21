import { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";
import { registerOAuth2Worker, authorize } from "@juxt/pass";
import { StrictMode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "./fetsClient";

registerOAuth2Worker();

const resource_server = "https://data.home.juxt.site";
const authorization_server = "https://auth.home.juxt.site";
const app_server = window.location.origin;

// this callback wraps the `authorize` function and will be invoked when the user clicks for example on a login button
function authorizeCallback() {
  authorize({
    origin: resource_server,
    client_id: "swagger-ui",
    authorization_endpoint: `${authorization_server}/oauth/authorize`,
    token_endpoint: `${authorization_server}/oauth/token`,
    redirect_uri: `${app_server}/oauth-redirect.html`,
    requested_scopes: [
      "https://auth.home.juxt.site/scopes/petstore/write",
      "https://auth.home.juxt.site/scopes/petstore/read",
    ],
  });
}

function useUser() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUser() {
    try {
      const user = "hi";
      setUser(user);
    } catch (error) {
      setError("Couldn't fetch user");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, error };
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container found");
}

const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function LoginButtons() {
  const { user, isLoading, error } = useUser();

  if (user) {
    return <App />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col m-4 bg-red-50">
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={authorizeCallback}>Click Me To Login</button>
    </div>
  );
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginButtons />
    </QueryClientProvider>
  </StrictMode>,
);
