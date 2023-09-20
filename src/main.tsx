import { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";
import { registerOAuth2Worker, authorize } from "@juxt/pass";
import { StrictMode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

registerOAuth2Worker();

const resource_server = "https://data.home.juxt.site";
const authorization_server = "https://auth.home.juxt.site";
const app_server = "http://localhost:5173";

// this callback wraps the `authorize` function and will be invoked when the user clicks for example on a login button
function authorizeCallback() {
  authorize({
    origin: resource_server,
    client_id: "swagger-ui",
    authorization_endpoint: `${authorization_server}/oauth/authorize`,
    token_endpoint: `${authorization_server}/oauth/token`,
    redirect_uri: `${app_server}`,
    requested_scopes: [
      "https://auth.home.juxt.site/scopes/petstore/write",
      "https://auth.home.juxt.site/scopes/petstore/read",
    ],
  });
}

function afterAuthorize() {
  const queryParams = new URLSearchParams(window.location.search);
  const storedState = localStorage.getItem("pkce_state");
  const queryParamState = queryParams.get("state");
  const code = queryParams.get("code");

  if (!code || !queryParamState) {
    throw new Error("No code or state in query params");
  }

  if (storedState !== queryParamState) {
    throw new Error(
      "exchangeCodeForAccessToken mismatch between stored state and query param state",
    );
  }

  const redirect_uri = localStorage.getItem("oauth2_redirect_uri") || "";
  const client_id = localStorage.getItem("oauth2_client_id") || "";
  const code_verifier = localStorage.getItem("pkce_code_verifier") || "";

  const payload_params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    code_verifier: code_verifier,
  });

  const token_endpoint = localStorage.getItem("oauth2_token_endpoint") || "";

  fetch(token_endpoint, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: payload_params,
  }).then(() => window.close());
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
  const [hasClicked, setHasClicked] = useState(false);
  if (hasClicked) {
    return null;
  }
  return (
    <div className="flex flex-col m-4 bg-red-50">
      <button
        onClick={() => {
          setHasClicked(true);
          return authorizeCallback();
        }}
      >
        First Click Me
      </button>
      <button onClick={afterAuthorize}>Then click me!</button>
    </div>
  );
}

root.render(
  <StrictMode>
    <LoginButtons />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
