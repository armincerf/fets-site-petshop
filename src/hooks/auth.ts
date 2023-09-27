import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { client } from '../fetsClient'
import { registerOAuth2Worker, authorize, clearToken } from '@juxt/pass'
import {
  app_server,
  authorization_server,
  photoPrismPreviewTokenKey,
  photoPrismTokenKey,
  resource_server
} from '../constants'
import { useAtom } from 'jotai'
import { atomWithLocalStorage } from '../utils'
import { type PhotoPrismLoginResponse } from '../photoprism'

const loggedInAtom = atomWithLocalStorage('loggedIn', false)

async function photoPrismLogin() {
  const existingApiToken = localStorage.getItem(photoPrismTokenKey)
  const existingPreviewToken = localStorage.getItem(photoPrismPreviewTokenKey)
  if (existingApiToken && existingPreviewToken) {
    return {
      apiToken: existingApiToken,
      previewToken: existingPreviewToken
    }
  }
  const res: PhotoPrismLoginResponse = await fetch('photo-api/v1/session', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-GB',
      'content-type': 'application/json'
    },
    body: `{username:"admin",password:"${
      import.meta.env.PHOTOPRISM_PASSWORD
    }"}`,
    method: 'POST'
  })
    .then(async (res) => await res.json())
    .catch((error) => {
      console.error('error logging in to photoprism', error)
      return {
        apiToken: null,
        previewToken: null
      }
    })

  if (res) {
    return {
      apiToken: res.id,
      previewToken: res.config.previewToken
    }
  }
}

// preload photoprism token
photoPrismLogin()
  .then((res) => {
    if (!res) {
      console.error('no data from photoprism login')
      return
    }
    if (res.apiToken) {
      localStorage.setItem(photoPrismTokenKey, res.apiToken)
    }
    if (res.previewToken) {
      localStorage.setItem(photoPrismPreviewTokenKey, res.previewToken)
    }
  })
  .catch((error) => {
    console.error('error logging in to photoprism', error)
  })

export function usePhotoPrismLogin() {
  return useQuery({
    queryKey: ['photoprism-login'],
    queryFn: async () => await photoPrismLogin()
  })
}

registerOAuth2Worker().catch((error) => {
  console.error('error registering pass SW', error)
})

// this callback wraps the `authorize` function and will be invoked when the user clicks for example on a login button
export function authorizeCallback(onSuccess?: () => void) {
  console.log('authorizing')
  authorize({
    resource_server,
    client_id: 'swagger-ui',
    authorization_endpoint: `${authorization_server}/oauth/authorize`,
    token_endpoint: `${authorization_server}/oauth/token`,
    redirect_uri: `${app_server}/oauth-redirect.html`,
    requested_scopes: [
      'https://auth.home.juxt.site/scopes/petstore/write',
      'https://auth.home.juxt.site/scopes/petstore/read'
    ]
  })
    .then(() => {
      console.log('authorized')
      onSuccess?.()
    })
    .catch((error) => {
      console.error('error authorizing', error)
    })
}

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

export function useUser() {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom)
  const userRes = useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      await fetchPets()
        .then((pets) => {
          setLoggedIn(true)
          return pets
        })
        .catch(async (error) => {
          console.error('error fetching pets', error)
          if (error.message === 'Unauthorized') {
            clearToken(resource_server)
              .then(() => {
                setLoggedIn(false)
              })
              .catch((error) => {
                console.error('error clearing token', error)
              })
          }
          return []
        })
  })

  return {
    ...userRes,
    loggedIn
  }
}
