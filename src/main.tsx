import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { FavoritesProvider } from './favorites/FavoritesContext'
import { SessionProvider } from './game/SessionContext'
import { RouterProvider } from './router/Router'

// Offline support. Registered after load so it never competes with first paint. The app works fine without it.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <FavoritesProvider>
        <SessionProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </SessionProvider>
      </FavoritesProvider>
    </LanguageProvider>
  </StrictMode>,
)
