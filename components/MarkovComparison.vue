<script setup>
import pairs from '../data/sertoes-contagens.json'
import triples from '../data/sertoes-trigramas.json'
import { choose, rangesFor, sampleWord } from './markov-ranges.mjs'

const comparisons = [
  ['Digrama', 'U', pairs],
  ['Trigrama', 'QU', triples],
  ['Trigrama', 'OU', triples],
].map(([kind, context, data]) => ({ kind, context, ...choose(rangesFor(data, context), 500) }))
const samples = [[113, 271, 389], [500, 167, 703], [797, 337, 622]].map(draws => ({
  draws: draws.join(' · '),
  digram: sampleWord(pairs, 'QU', 1, draws),
  trigram: sampleWord(triples, 'QU', 2, draws),
}))
</script>

<template>
  <section class="comparison" aria-label="Comparação controlada entre digrama e trigrama">
    <div class="comparison-top">
      <strong>Mesmo número: 500</strong>
      <span>O contexto muda a faixa.</span>
      <details class="samples" @keydown.stop>
        <summary>Ver 3 amostras</summary>
        <div class="sample-card">
          <p>Começamos em <b>QU</b>. Em cada linha, os modelos recebem os mesmos três números e tentam completar cinco letras.</p>
          <table>
            <thead><tr><th>Sorteios</th><th>Digrama</th><th>Trigrama</th></tr></thead>
            <tbody><tr v-for="sample in samples" :key="sample.draws"><th scope="row">{{ sample.draws }}</th><td>{{ sample.digram }}</td><td>{{ sample.trigram }}</td></tr></tbody>
          </table>
          <p>Exemplos, não prova de que um modelo é sempre melhor.</p>
        </div>
      </details>
    </div>
    <div class="comparison-cards">
      <div v-for="card in comparisons" :key="card.context" class="comparison-card" :data-context="card.context">
        <span>{{ card.kind }}</span>
        <strong>{{ card.context }} → <b>{{ card.letter }}</b></strong>
        <span>{{ card.start }}–{{ card.end }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comparison { margin: 0 0 10px; }
.comparison-top { display:flex; align-items:baseline; gap:10px; color:#bdd4d7; font-size:14px; margin-bottom:5px; }
.comparison-top strong { color:#edf5f6; font-size:16px; }
.comparison-cards { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; max-width:864px; }
.comparison-card { display:flex; align-items:center; justify-content:space-between; gap:6px; padding:4px 10px; border:1px solid #365b63; border-radius:6px; background:#1b313f; color:#bdd4d7; font-size:14px; }
.comparison-card strong { color:#edf5f6; font-size:21px; }
.comparison-card b { color:#ffdc95; }
.samples { margin-left:auto; position:relative; }
.samples summary { cursor:pointer; text-decoration:underline; }
.sample-card { position:absolute; z-index:10; top:100%; right:0; width:435px; padding:10px 14px; background:#172c38; border:1px solid #82b1b3; border-radius:8px; color:#ecf4f4; font-size:16px; box-shadow:0 6px 20px #0007; }
.sample-card p { margin:3px 0; line-height:1.3; }
.sample-card table { width:100%; margin:7px 0; font-size:16px; }
.sample-card th,.sample-card td { padding:3px 6px; }
.sample-card td { color:#ffdc95; font-family:monospace; letter-spacing:.1em; }
</style>
