import { ClientPlugin, createClient, OASModel, type NormalizeOAS } from "fets";
import openAPIDoc from "./oas";

export type Pet = OASModel<NormalizeOAS<typeof openAPIDoc>, "Pet">;

export function auth(): ClientPlugin {
  return {
    onRequestInit({ requestInit }) {
      requestInit.headers = {
        ...requestInit.headers,
        Authorization: `Bearer eyJraWQiOiJoYWlUUG1BNXlTYVpVMHhNIiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJodHRwczovL2RhdGEuaG9tZS5qdXh0LnNpdGUiLCJzdWIiOiJodHRwczovL2F1dGguaG9tZS5qdXh0LnNpdGUvc3ViamVjdHMvYTM3NDA4ODRmZDc1NGVhNzZjZTYiLCJuYmYiOjE2OTUyMjU3NTAsInNjb3BlIjoiaHR0cHM6Ly9hdXRoLmhvbWUuanV4dC5zaXRlL3Njb3Blcy9wZXRzdG9yZS93cml0ZSBodHRwczovL2F1dGguaG9tZS5qdXh0LnNpdGUvc2NvcGVzL3BldHN0b3JlL3JlYWQiLCJpc3MiOiJodHRwczovL2F1dGguaG9tZS5qdXh0LnNpdGUiLCJleHAiOjE2OTUyMjY3NzAsImlhdCI6MTY5NTIyNTg3MCwianRpIjoiYWFmZmEyNWUzYTg1MDFmMGQzOWQ0MjIwNmQ3ZGNkNWU3MTM0ZGFjNiIsImNsaWVudF9pZCI6InN3YWdnZXItdWkifQ.R9SXZE9r_gSAZDCkflQWOQ3FxyBEh_ikMjpIoxQFy-aQuTqHpB9ewPv_O8zEKuLuY8DKUuZdUkBlj6XLWsEufD-h7rdXn8WgxkAiI2Q9vZA19HV7JgGZsWOWwYlve9HrHg0FWo5fqm5tEBlFDgz81PYWYMLMfq2ZTL-KsdUKqfO8hTqGk_yVNnDQ4s4adAWG4dMbtr3efxZB5wT5ywZq7zIJKi6ChftTTmnqH4uXLDXzxCoTNLZ7VPnInCHIc6HQl17tORwUxOiEhCZKwwH6dE-NPu7DkZ2QdTrhI1CkpSPI-9S58akgtFc86B4LO4cvsMfElhDjR0WCbNUBTEl1hYDL0G3ObfXPSwUmtIU70EpcWx04b6ew5L84a9nSurFn-2lEU44oE_0zR7JOGGEzA6h2i88DMHY7nXiYsMrbsz4NmkzX-fqkExBJ2uBQccHJmOvpyKA1Zduuf5d8-xSJXeeLjG8CiCawgX3s0lnBpYO59-2cWLGHsM7jEBhZJ-mw`,
      };
    },
  };
}

export const client = createClient<NormalizeOAS<typeof openAPIDoc>>({
  endpoint: "https://data.home.juxt.site/petstore",
});
