export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function rangesFor(matrix, current) {
  const row = matrix[current]
  if (!Array.isArray(row) || row.length !== 26) throw new RangeError('Linha não encontrada')
  const total = row.reduce((sum, count) => sum + count, 0)
  if (total === 0) return []
  let count = 0
  let prior = 0
  return row.flatMap((frequency, index) => {
    count += frequency
    const end = Math.floor(count * 1000 / total)
    const length = end - prior
    const entry = { letter: alphabet[index], start: prior + 1, end, length, index }
    prior = end
    return length ? [entry] : []
  })
}

export function choose(ranges, input) {
  const raw = String(input).trim()
  if (!/^\d{1,4}$/.test(raw)) return undefined
  const n = Number(raw)
  if (n < 1 || n > 1000) return undefined
  const range = ranges.find(r => r.start <= n && n <= r.end)
  return range ? { ...range, n } : undefined
}
