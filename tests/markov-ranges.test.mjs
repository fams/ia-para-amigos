import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { rangesFor, choose, alphabet } from '../components/markov-ranges.mjs'

const matrix = JSON.parse(await readFile(new URL('../data/sertoes-contagens.json', import.meta.url), 'utf8'))
assert.equal(Object.values(matrix).flat().reduce((a,b)=>a+b), 653289)
for (const letter of alphabet) {
  const row = rangesFor(matrix, letter)
  assert.equal(row[0].start, 1)
  assert.equal(row.at(-1).end, 1000)
  assert.equal(row.reduce((n,r)=>n+r.length, 0), 1000)
  for (const [j, r] of row.entries()) {
    assert.equal(choose(row, r.start).letter, r.letter)
    assert.equal(choose(row, r.end).letter, r.letter)
    if (j) assert.equal(row[j-1].end + 1, r.start)
  }
}
const a = rangesFor(matrix, 'A')
assert.deepEqual(choose(a, 787), { letter:'S', start:710, end:892, length:183, index:18, n:787 })
assert.equal(choose(a, 1).letter, 'A')
assert.equal(choose(a, 1000).letter, 'Z')
for(const invalid of [0,1001,'',1.5,'3e2','+8']) assert.equal(choose(a, invalid),undefined)
let seq='A'
for(const n of [787,854,147,868]) seq+=choose(rangesFor(matrix, seq.at(-1)),n).letter
assert.equal(seq,'ASTAS')
console.log('26 linhas válidas e contíguas; limites 1 e 1000, rejeições e sequência ASTAS verificados.')
const triples = JSON.parse(await readFile(new URL('../data/sertoes-trigramas.json', import.meta.url), 'utf8'))
assert.equal(Object.values(triples).flat().reduce((a,b)=>a+b),514200)
assert.equal(Object.keys(triples).length, 348)
assert.equal(triples.QU.reduce((a,b)=>a+b),6230)
assert.equal(triples.OU.reduce((a,b)=>a+b),1136)
assert.equal(choose(rangesFor(triples,'QU'),500).letter,'E')
assert.equal(choose(rangesFor(triples,'OU'),500).letter,'T')
assert.equal(triples.QQ,undefined)
for (const context of Object.keys(triples)) {
  const ranges = rangesFor(triples, context)
  assert.equal(ranges.reduce((n,r)=>n+r.length,0),1000)
}
console.log('Trigramas: cobertura, contagens e exemplo QU/OU verificados.')
