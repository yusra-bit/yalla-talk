import { useEffect } from 'react'
import LanguageToggle from './components/LanguageToggle'
import SkipLink from './components/SkipLink'
import Wordmark from './components/Wordmark'
import { BRAND } from './config/brand'
import { useLanguage } from './i18n/LanguageContext'
import Favorites from './pages/Favorites'
import Game from './pages/Game'
import Home from './pages/Home'
import ModeIntro from './pages/ModeIntro'
import { hrefFor, useRouter } from './router/Router'

export default function App() {
  const { t, lang } = useLanguage()
  const { route, direction } = useRouter()

  // Document title follows the current screen and language.
  useEffect(() => {
    const brand = BRAND.name[lang]
    document.title =
      route.name === 'home' ? brand : route.name === 'favorites' ? `${t.ui.favorites.title} — ${brand}` : `${t.modes[route.mode].title} — ${brand}`
  }, [route, lang, t])

  const screenKey = route.name === 'home' || route.name === 'favorites' ? route.name : `${route.name}-${route.mode}`

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col overflow-x-clip px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
      <SkipLink />
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <a href={hrefFor({ name: 'home' })} aria-label={t.ui.homeLink} className="flex min-h-11 items-center rounded-2xl">
          <Wordmark />
        </a>
        <LanguageToggle />
      </header>

      <div key={screenKey} className={`flex flex-1 flex-col ${direction === 'forward' ? 'animate-screen-fwd' : 'animate-screen-back'}`}>
        {route.name === 'home' && <Home />}
        {route.name === 'favorites' && <Favorites />}
        {route.name === 'intro' && <ModeIntro mode={route.mode} />}
        {route.name === 'play' && <Game mode={route.mode} />}
      </div>
    </div>
  )
}
