import { GiphyFetch } from '@giphy/js-fetch-api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type Pet, client } from '../fetsClient'
import { usePhotoPrismLogin, useUser } from './auth'
import { type PhotosResponse } from '../photoprism'

export async function fetchPets() {
  const response = await client['/pets'].get()
  switch (response.status) {
    case 400:
      throw new Error(response.statusText)
    case 401:
      throw new Error(response.statusText)
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
  const hasPhoto = pet?.photoUrls && pet.photoUrls.length > 0
  const response = await client['/pet'].post({
    json: {
      ...pet,
      photoUrls: hasPhoto ? pet.photoUrls : [image.data[0].images.original.url],
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
    refetchInterval: 500,
    enabled
  })
}

export function useAddPet() {
  return useMutation({
    mutationKey: ['addPet'],
    mutationFn: addPet
  })
}

async function uploadPetPhoto({
  photoPrismToken,
  formData
}: {
  photoPrismToken?: string
  formData: FormData
}) {
  if (!photoPrismToken) {
    return null
  }
  await fetch(
    'https://photos.juxt.site/api/v1/users/urbtut4alt5a7tnv/upload/tjqf9xj',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en',
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundaryiFxDSEs0ZBRYdg1O',
        'x-session-id': photoPrismToken
      },
      body: formData,
      method: 'POST'
    }
  )
}

async function getPetPhotos({
  photoPrismToken,
  previewToken
}: {
  photoPrismToken?: string
  previewToken?: string
}) {
  const res = await fetch(
    'https://photos.juxt.site/api/v1/photos?count=240&offset=0&s=as1g6jt3ddx4usoy&merged=true&country=&camera=0&order=added&q=',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en',
        'x-session-id': photoPrismToken ?? ''
      }
    }
  )
  const json = (await res.json()) as PhotosResponse
  const hashes = json.map((photo) => photo.Hash)
  const urls = hashes.map(
    (hash) =>
      `https://photos.juxt.site/api/v1/t/${hash}/${previewToken}/fit_1920`
  )

  return urls
}

export function usePetPhotos() {
  const { data: tokens } = usePhotoPrismLogin()
  const token = tokens?.apiToken
  const previewToken = tokens?.previewToken
  return useQuery({
    queryKey: ['petPhotos', token],
    queryFn: async () =>
      await getPetPhotos({ photoPrismToken: token, previewToken }),
    enabled: !!token && !!previewToken
  })
}
