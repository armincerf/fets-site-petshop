import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import Button from "components/atoms/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./app.module.css";
import { Pet, client } from "../fetsClient";
import { useId, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

async function fetchPet(id: number) {
  const response = await client["/pet/{petId}"].get({ params: { petId: id } });
  if (response.status !== 200) {
    throw new Error("Failed to fetch pet");
  }
  const pet = await response.json();
  return pet;
}

async function fetchPets() {
  const response = await client["/pets"].get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch pets");
  }
  const pets = await response.json();
  return pets;
}

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

async function addPet(pet: Pet) {
  if (!pet.name) {
    throw new Error("Name is required");
  }
  const image = await giphyFetch.search(pet.name, { limit: 1 });
  const response = await client["/pet"].post({
    json: {
      ...pet,
      photoUrls: [image.data[0].images.original.url],
      id: Math.floor(Math.random() * 1000000).toString(),
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to add pet");
  }
}

const App = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data: topPets } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  const {
    mutateAsync,
    isLoading: submitting,
    isError,
    error,
  } = useMutation({
    mutationKey: ["addPet"],
    mutationFn: addPet,
  });

  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState("Dogs");
  const categories = ["Dogs", "Cats", "Birds", "Fish", "Reptiles"];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>PETS'r'US</h3>
        <p className={styles.headerDescription}>
          Do you like pets? Well buy them here! Current offers include:{" "}
          {topPets?.map((pet) => (
            <code
              key={pet.id || pet.name + pet.photoUrls}
              className={styles.headerDescriptionCode}
            >
              {pet.name}
            </code>
          ))}
        </p>
        <p className={styles.headerDescription}>Place your order today!</p>
        <div className={styles.viteLogoContainer}>
          <Logos.Vite className={styles.viteLogo} />
        </div>
      </header>
      <section className={styles.copy}>
        <div className={styles.copyInner}>
          <a href="/list-pets">
            <Button>See all Pets</Button>
          </a>
        </div>
      </section>
      <section className={styles.copy}>
        <div className="flex flex-col w-fit gap-2">
          <input
            placeholder="Pet Name"
            className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <select
            placeholder="Type of Pet"
            className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <Button
            disabled={submitting}
            onClick={async () => {
              await mutateAsync({
                name: petName,
                category: {
                  name: category,
                  id: category,
                },
                photoUrls: [],
              });
              queryClient.invalidateQueries(["pets"]);
              setPetName("");
            }}
          >
            <p>Add a new pet</p>
          </Button>
          {isError && (
            <div className="flex items-center gap-2">
              <CubeTransparentIcon className="w-6 h-6 text-red-500" />
              <span className="text-red-500">
                Failed to add pet - {(error as Error)?.message}
              </span>
            </div>
          )}
        </div>
      </section>
      <section className={styles.features}>
        {topPets
          ?.filter((pet) => pet.name && pet?.status !== "unavailable")
          .map((props, index) => (
            <div
              key={props.name}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
            >
              <Card {...props} />
            </div>
          ))}
      </section>
      <footer className={styles.footer}>Powered by Site and XTDB</footer>
    </main>
  );
};

export default App;
