import { GiphyFetch } from '@giphy/js-fetch-api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type Pet, client } from '../fetsClient'
import { useUser } from './auth'

export async function fetchPets() {
  const response = await client['/pets'].get()
  if (response.status === 401) {
    throw new Error('Unauthorized')
  }
  if (response.status !== 200) {
    throw new Error('Failed to fetch pets')
  }
  const pets = await response.json()
  return pets
}

const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

async function addPet(pet: Pet) {
  if (pet.name.length === 0) {
    throw new Error('Name is required')
  }
  const image = await giphyFetch.search(pet.name, { limit: 1 })
  const response = await client['/pet'].post({
    json: {
      ...pet,
      photoUrls: [image.data[0].images.original.url],
      id: Math.floor(Math.random() * 1000000).toString()
    }
  })
  if (response.status !== 200) {
    throw new Error('Failed to add pet')
  }
}

export function usePets() {
  const { loggedIn: enabled } = useUser()
  return useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
    enabled
  })
}

export function useAddPet() {
  return useMutation({
    mutationKey: ['addPet'],
    mutationFn: addPet
  })
}
