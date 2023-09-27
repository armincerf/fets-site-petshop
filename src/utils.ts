import { type QueryClient } from '@tanstack/react-query'
import { atom } from 'jotai'

export const atomWithLocalStorage = (key: string, initialValue: unknown) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

export function refetchPets(queryClient: QueryClient) {
  void queryClient.refetchQueries({ queryKey: ['pets'] })
}
