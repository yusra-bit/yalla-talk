import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { isModeId } from '../config/modes'
import type { GameModeId } from '../i18n/translations'

export type Route =
  | { name: 'home' }
  | { name: 'favorites' }
  | { name: 'intro'; mode: GameModeId }
  | { name: 'play'; mode: GameModeId }

export const hrefFor = (r: Route): string =>
  r.name === 'home' ? '#/' : r.name === 'favorites' ? '#/favorites' : r.name === 'intro' ? `#/mode/${r.mode}` : `#/mode/${r.mode}/play`

const parentOf = (r: Route): Route | null =>
  r.name === 'home' ? null : r.name === 'favorites' ? { name: 'home' } : r.name === 'intro' ? { name: 'home' } : { name: 'intro', mode: r.mode }

const depth = (r: Route) => (r.name === 'home' ? 0 : r.name === 'play' ? 2 : 1)
const normalize = (h: string) => h || '#/'

function parseHash(hash: string): Route {
  const [first, mode, last] = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (first === 'favorites') return { name: 'favorites' }
  if (first === 'mode' && isModeId(mode)) return last === 'play' ? { name: 'play', mode } : { name: 'intro', mode }
  return { name: 'home' }
}

interface RouterValue {
  route: Route
  /** Used for transition direction: moving deeper is "forward". */
  direction: 'forward' | 'back'
  goBack: () => void
  hasNavigated: () => boolean
}

const RouterContext = createContext<RouterValue | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash(location.hash))
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const routeRef = useRef(route)
  const navigated = useRef(false)
  // In-app history, so Back can use real history.back() instead of stacking duplicates.
  const stack = useRef<string[]>([normalize(location.hash)])
  const replacing = useRef(false)

  useEffect(() => {
    const onHashChange = () => {
      const h = normalize(location.hash)
      const s = stack.current
      if (replacing.current) {
        s[s.length - 1] = h
        replacing.current = false
      } else if (s[s.length - 2] === h) s.pop()
      else s.push(h)

      const next = parseHash(h)
      setDirection(depth(next) >= depth(routeRef.current) ? 'forward' : 'back')
      routeRef.current = next
      navigated.current = true
      setRoute(next)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goBack = useCallback(() => {
    const parent = parentOf(routeRef.current)
    if (!parent) return
    const target = hrefFor(parent)
    const s = stack.current
    if (s[s.length - 2] === normalize(target)) history.back()
    else {
      // Deep-linked or refreshed: go to the parent without adding a history entry.
      replacing.current = true
      location.replace(location.pathname + location.search + target)
    }
  }, [])

  const value = useMemo(
    () => ({ route, direction, goBack, hasNavigated: () => navigated.current }),
    [route, direction, goBack],
  )
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <RouterProvider>')
  return ctx
}

/** After in-app navigation, move focus to the screen heading so keyboard/screen-reader users land in the right place. */
export function useArrivalFocus(ref: RefObject<HTMLElement | null>) {
  const { hasNavigated } = useRouter()
  useEffect(() => {
    if (hasNavigated()) ref.current?.focus({ preventScroll: true })
  }, [hasNavigated, ref])
}
