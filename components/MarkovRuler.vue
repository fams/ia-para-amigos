<script setup>
import { computed, nextTick, ref, useId, watch } from 'vue'
import pairs from '../data/sertoes-contagens.json'
import triples from '../data/sertoes-trigramas.json'
import { alphabet, rangesFor, choose } from './markov-ranges.mjs'

const props = defineProps({ trigram: Boolean })
const uid = useId()
const first = props.trigram ? 'QU' : 'A'
const matrix = props.trigram ? triples : pairs
const current = ref(first)
const input = ref('')
const output = ref(null)
const error = ref('')
const history = ref(first)
const numberInput = ref(null)
const observations = computed(() => matrix[current.value]?.reduce((a,b) => a+b, 0) || 0)
const slices = computed(() => observations.value ? rangesFor(matrix, current.value) : [])
const broad = computed(() => slices.value.filter(s => s.length >= 70))
const colors = ['#83d4ca', '#afcfff', '#ffd991', '#c8baf6', '#a5db98', '#f6b8b1']
const format = n => new Intl.NumberFormat('pt-BR').format(n)
function clear() {
  input.value = ''
  output.value = null
  error.value = ''
}
function begin() {
  clear()
  history.value = current.value
}
function draw() {
  const result = choose(slices.value, input.value)
  output.value = result || null
  error.value = result ? '' : 'Digite um número inteiro de 1 a 1.000.'
}
function advance() {
  if (!output.value) return
  const next = output.value.letter
  current.value = props.trigram ? current.value.slice(-1) + next : next
  history.value += next
  clear()
  nextTick(() => numberInput.value?.focus())
}
function reset() {
  current.value = first
  begin()
}
function replay() {
  reset()
  input.value = '787'
  draw()
}
function setContext(value) {
  current.value = value.toUpperCase().replace(/[^A-Z]/g, '').slice(0,2)
  begin()
}
watch(input, () => {
  error.value = ''
  if (output.value && String(input.value).trim() !== String(output.value.n)) output.value = null
})
</script>

<template>
  <section class="ruler-demo" aria-label="Sorteio de letras com régua de Markov">
    <form class="controls" @submit.prevent="draw">
      <label v-if="trigram" :for="uid + '-pair'">Duas letras anteriores
        <input :id="uid + '-pair'" class="context-input" :value="current" maxlength="2" placeholder="QU"
          autocomplete="off" spellcheck="false" @input="setContext($event.target.value)" @keydown.stop />
      </label>
      <label v-else :for="uid + '-letter'">Letra atual
        <select :id="uid + '-letter'" v-model="current" @change="begin" @keydown.stop>
          <option v-for="letter in alphabet" :key="letter" :value="letter">{{ letter }}</option>
        </select>
      </label>
      <label :for="uid + '-number'">Número da turma
        <input :id="uid + '-number'" ref="numberInput" v-model="input" inputmode="numeric"
          maxlength="4" placeholder="1–1.000" autocomplete="off" :disabled="!observations" @keydown.stop />
      </label>
      <button class="apply" type="submit" :disabled="!observations" @keydown.stop>Aplicar número</button>
      <button type="button" :disabled="!output" @click="advance" @keydown.stop>Usar a letra sorteada</button>
    </form>

    <div class="ruler-head">
      <span v-if="trigram" class="examples">
        Digrama: 1 letra anterior. Trigrama: 2. Compare
        <button type="button" @click="setContext('QU')" @keydown.stop>QU</button>
        <button type="button" @click="setContext('OU')" @keydown.stop>OU</button>
      </span>
      <template v-if="observations"><strong>Depois de {{ current }}:</strong> <span v-if="trigram">{{ format(observations) }} ocorrências com outra letra.</span><span v-else> as faixas já estão definidas.</span></template>
      <strong v-else>Sem distribuição para esse contexto.</strong>
    </div>
    <div v-if="observations" class="ruler" role="img" :aria-label="'Faixas da próxima letra depois de ' + current">
      <div v-for="segment in slices" :key="segment.letter" class="segment"
        :class="{ active: output?.letter === segment.letter }"
        :style="{ width: (segment.length / 10) + '%', backgroundColor: colors[segment.index % colors.length] }"
        :title="segment.letter + ': ' + format(segment.start) + '–' + format(segment.end)">
        <b v-if="segment.length >= 31">{{ segment.letter }}</b>
      </div>
      <span v-if="output" class="draw-pin" aria-hidden="true"
        :style="{ left: ((output.n - 0.5) / 10) + '%' }">▼</span>
    </div>
    <div v-if="observations" class="endpoints"><span>1</span><span>1.000</span></div>
    <div v-if="observations" class="major-ranges" aria-label="Faixas mais largas">
      <span v-for="segment in broad" :key="segment.letter">
        <b :style="{ color: colors[segment.index % colors.length] }">{{ segment.letter }}</b>
        {{ format(segment.start) }}–{{ format(segment.end) }}
      </span>
    </div>
    <details v-if="observations" class="range-list" @keydown.stop>
      <summary>Ver faixas exatas antes do sorteio</summary>
      <ul aria-label="Faixas da régua">
        <li v-for="segment in slices" :key="segment.letter"><b>{{ segment.letter }}</b> {{ format(segment.start) }}–{{ format(segment.end) }}</li>
      </ul>
    </details>

    <p class="readout" role="status" aria-live="polite">
      <template v-if="output">
        <strong>{{ format(output.n) }}</strong> caiu na faixa <strong>{{ format(output.start) }}–{{ format(output.end) }}</strong>.
        Sai <strong class="letter-result">{{ output.letter }}</strong>.
      </template>
      <template v-else-if="trigram && current.length !== 2">Digite duas letras de A a Z.</template>
      <template v-else-if="!observations">Esse par não foi seguido por uma letra no corpus. Tente QU ou OU.</template>
      <template v-else-if="error">{{ error }}</template>
      <template v-else>Peça à turma um número de 1 a 1.000.</template>
    </p>
    <div class="footline">
      <div>Sequência <strong data-testid="markov-history">{{ history }}{{ output ? output.letter : '' }}</strong></div>
      <div class="secondary">
        <button v-if="!trigram" type="button" @click="replay" @keydown.stop>Rever 787 → S</button>
        <button type="button" @click="reset" @keydown.stop>Reiniciar</button>
      </div>
    </div>
    <small>Frequências de {{ trigram ? 'trincas' : 'pares' }} dentro das palavras de <i>Os Sertões</i>, sem acentos. A régua aproxima chances em 1.000 posições.</small>
  </section>
</template>

<style scoped>
.ruler-demo { max-width: 864px; font-size: 18px; }
.controls { display:flex; align-items:flex-end; flex-wrap:wrap; gap:10px; margin-bottom:13px; }
.controls label { display:grid; align-items:center; gap:4px; color:#bdd4d7; font-size:15px; }
.controls input, .controls select, button { color:#edf4f4; background:#213744; border:1px solid #516f7b; border-radius:7px; padding:7px 11px; min-height:39px; font-size:16px; font-weight:700; }
.controls select { width:84px; color-scheme:dark; }
.controls input { width:127px; }
.controls input::placeholder { color:#adc4c9; font-weight:400; }
button { cursor:pointer; white-space:nowrap; }
button:disabled { opacity:.5; cursor:not-allowed; }
.apply { background:#8cdec8; color:#14252e; border-color:#8cdec8; }
.ruler-head { margin-bottom:12px; }
.examples { display:flex; align-items:center; gap:7px; color:#bad4d9; font-size:16px; margin-bottom:7px; }
.examples button { min-height:25px; padding:2px 9px; line-height:1.1; font-size:14px; }
.controls .context-input { width:90px; }
.ruler { position:relative; display:flex; height:42px; outline:1px solid #899fa4; }
.segment { display:grid; align-content:center; justify-content:center; flex-shrink:0; color:#101d29; position:relative; overflow:hidden; }
.segment.active { box-shadow:inset 0 0 0 4px white; }
.draw-pin { position:absolute; z-index:1; top:-19px; transform:translateX(-50%); color:#fff; text-shadow:0 1px 3px #111; font-size:19px; line-height:1; }
.endpoints { display:flex; justify-content:space-between; color:#c7d6d9; font-size:13px; margin-top:3px; }
.major-ranges { display:flex; gap:5px 13px; flex-wrap:wrap; min-height:22px; margin:2px 0 3px; color:#c4d4d7; font-size:14px; font-variant-numeric:tabular-nums; }
.range-list { position:relative; color:#c4dddd; width:max-content; max-width:100%; font-size:14px; }
.range-list summary { cursor:pointer; }
.range-list ul { position:absolute; z-index:5; top:100%; left:0; display:grid; grid-template-columns:repeat(5,minmax(89px,1fr)); gap:5px 9px; background:#172c38; border:1px solid #82b1b3; padding:10px 12px; margin:3px 0; border-radius:8px; list-style:none; width:max-content; }
.range-list li { margin:0; font-variant-numeric:tabular-nums; }
.readout { height:45px; margin:8px 0!important; display:block; padding:5px 10px; background:#1b313f; border-radius:5px; line-height:35px!important; }
.letter-result { color:#ffdc95; font-size:23px; }
.footline,.secondary { display:flex; align-items:center; gap:9px; flex-wrap:wrap; }
.footline { justify-content:space-between; }
.footline strong { color:#a1e4d7; margin-left:7px; font-family:monospace; letter-spacing:.14em; word-break:break-all; }
.secondary button { min-height:30px; font-size:13px; padding:4px 8px; }
small { display:block; margin-top:8px; color:#96b6bf; font-size:12px; }
</style>
