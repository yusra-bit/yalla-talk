import { validateBank } from '../src/data/validate'

const { errors, counts, byCategory } = validateBank()
for (const [mode, n] of Object.entries(counts)) {
  console.log(`${mode.padEnd(15)} ${n} entries`)
  for (const [cat, c] of Object.entries(byCategory[mode as keyof typeof byCategory])) console.log(`   ${cat.padEnd(22)} ${c}`)
}
console.log(`total: ${Object.values(counts).reduce((a, b) => a + b, 0)}`)
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log('\nQuestion bank is valid: every entry complete in English and Arabic, IDs unique, no duplicates.')
