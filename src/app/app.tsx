import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import Button from "components/atoms/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "./app.module.css";
import { client } from "../fetsClient";
import { useState } from "react";

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

async function addPet({ name }: { name: string }) {
  if (!name) {
    throw new Error("Name is required");
  }
  const response = await client["/pet"].post({
    json: {
      id: "123",
      name,
      photoUrls: [],
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

  const { data: pet } = useQuery({
    queryKey: ["pet", 10],
    queryFn: () => fetchPet(10),
  });

  const [petName, setPetName] = useState("");

  if (!pet) {
    return <div>Loading...</div>;
  }
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>PETS'r'US</h3>
        <p className={styles.headerDescription}>
          Do you like pets? Well buy them here! Current offers include:{" "}
          {topPets?.map((pet) => (
            <code key={pet.name} className={styles.headerDescriptionCode}>
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

          <Button
            disabled={submitting}
            onClick={async () => {
              await mutateAsync({ name: petName });
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
        {topPets?.map((props, index) => (
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
