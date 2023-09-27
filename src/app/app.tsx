import Logos from 'components/logos'
import Card from 'components/card'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import Button from 'components/button'
import { useQueryClient } from '@tanstack/react-query'

import styles from './app.module.css'
import { useState } from 'react'
import { useAddPet, usePets } from 'hooks/data'
import { authorizeCallback, useUser } from 'hooks/auth'
import { refetchPets } from '../utils'

function App() {
  const queryClient = useQueryClient()
  const { data: topPets } = usePets()
  const { loggedIn } = useUser()

  const { mutate, isError, error } = useAddPet()

  const [petName, setPetName] = useState('')
  const [petPhoto, setPetPhoto] = useState('')
  const [category, setCategory] = useState('Dogs')
  const categories = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles']

  function handleAddPet() {
    mutate({
      name: petName,
      category: {
        name: category,
        id: category
      },
      photoUrls: petPhoto ? [petPhoto] : undefined
    })
    refetchPets(queryClient)
    setPetName('')
    setPetPhoto('')
    setCategory('Dogs')
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>PETS'r'US</h3>
        <p className={styles.headerDescription}>
          Do you like pets? Well buy them here!
          {loggedIn && (
            <>
              <p>Recently Sold: </p>
              <ul>
                {topPets
                  ?.filter((pet) => pet.name && pet?.status !== 'unavailable')
                  .map((pet) => (
                    <li key={pet.id}>
                      <code className={styles.headerDescriptionCode}>
                        {pet.name}
                      </code>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </p>
        <p className={styles.headerDescription}>Place your order today!</p>
        <div className={styles.viteLogoContainer}>
          <Logos.Vite className={styles.viteLogo} />
        </div>
      </header>
      {loggedIn ? (
        <>
          <section className={styles.copy}>
            <div className="flex flex-col w-fit gap-2">
              <input
                placeholder="Pet Name"
                className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
                type="text"
                value={petName}
                onChange={(e) => {
                  setPetName(e.target.value)
                }}
              />
              <select
                placeholder="Type of Pet"
                className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                placeholder="Pet Photo URL"
                className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
                type="text"
                value={petPhoto}
                onChange={(e) => {
                  setPetPhoto(e.target.value)
                }}
              />

              <Button onClick={handleAddPet}>
                <p>Add a new pet</p>
              </Button>
              {isError && (
                <div className="flex items-center gap-2">
                  <CubeTransparentIcon className="w-6 h-6 text-red-500" />
                  <span className="text-red-500">
                    Failed to add pet - {error?.message}
                  </span>
                </div>
              )}
            </div>
          </section>
          <section className={styles.features}>
            {topPets
              ?.filter((pet) => pet.name && pet?.status !== 'unavailable')
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
        </>
      ) : (
        <section className={styles.copy}>
          <div className={styles.copyInner}>
            <Button
              onClick={() => {
                authorizeCallback()
              }}
            >
              Login
            </Button>
          </div>
        </section>
      )}
      <footer className={styles.footer}>Powered by Site and XTDB</footer>
    </main>
  )
}

export default App
