import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { GameModeId } from '../i18n/translations'
import { FAVORITES_STORAGE_KEY, loadFavorites, saveFavorites, type FavoriteEntry } from './storage'

interface FavoritesApi {
  favorites: FavoriteEntry[]
  count: number
  isFavorite: (mode: GameModeId, id: string) => boolean
  toggle: (mode: GameModeId, id: string) => void
}

const Ctx = createContext<FavoritesApi | null>(null)

/** Independent of game sessions: restarting or leaving a game never touches favorites. */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(loadFavorites)

  useEffect(() => saveFavorites(favorites), [favorites])

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY || e.key === null) setFavorites(loadFavorites())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const isFavorite = useCallback((mode: GameModeId, id: string) => favorites.some((f) => f.mode === mode && f.id === id), [favorites])

  const toggle = useCallback((mode: GameModeId, id: string) => {
    setFavorites((cur) =>
      cur.some((f) => f.mode === mode && f.id === id)
        ? cur.filter((f) => !(f.mode === mode && f.id === id))
        : [{ mode, id, savedAt: Date.now() }, ...cur],
    )
  }, [])

  const value = useMemo(() => ({ favorites, count: favorites.length, isFavorite, toggle }), [favorites, isFavorite, toggle])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useFavorites(): FavoritesApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return ctx
}
