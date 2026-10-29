/** Fisher–Yates. If `avoidFirst` is given (and there's a choice), the result won't start with it. */
export function shuffle<T>(items: readonly T[], avoidFirst?: T): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  if (out.length > 1 && avoidFirst !== undefined && out[0] === avoidFirst) {
    const k = 1 + Math.floor(Math.random() * (out.length - 1))
    ;[out[0], out[k]] = [out[k], out[0]]
  }
  return out
}
