import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, join, relative, resolve, sep } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Builds dist/sw.js from pwa/sw.template.js: lists every built file for precaching and stamps a content-hash
 * version, so the service worker changes exactly when the app changes. Production builds only.
 */
function serviceWorker(): Plugin {
  let root = ''
  let outDir = ''
  return {
    name: 'yalla-talk:service-worker',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      if (!existsSync(join(outDir, 'index.html'))) return // build failed or was empty
      const files: string[] = []
      const walk = (dir: string) => {
        for (const name of readdirSync(dir)) {
          const full = join(dir, name)
          if (statSync(full).isDirectory()) walk(full)
          else files.push(full)
        }
      }
      walk(outDir)
      const urls = files
        .map((f) => relative(outDir, f).split(sep).join('/'))
        .filter((p) => p !== 'sw.js' && !p.endsWith('.map') && !basename(p).startsWith('.'))
        .sort()
      const hash = createHash('sha256')
      for (const u of urls) hash.update(u).update(readFileSync(join(outDir, u)))
      let sw = readFileSync(resolve(root, 'pwa/sw.template.js'), 'utf8')
      const fill = (token: string, value: string) => {
        // Each placeholder must appear exactly once; otherwise fail the build rather than ship a broken service worker.
        if (sw.split(token).length !== 2) throw new Error(`pwa/sw.template.js: expected exactly one ${token}`)
        sw = sw.replace(token, () => value)
      }
      fill('__VERSION__', hash.digest('hex').slice(0, 12))
      fill('__PRECACHE__', JSON.stringify(urls, null, 2))
      writeFileSync(join(outDir, 'sw.js'), sw)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serviceWorker()],
})
