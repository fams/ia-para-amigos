<script setup>
import { computed, ref } from 'vue'

const inputs = [8,3,2]
const weights = ref([5,-5,0])
const bias = ref(0)
// Controls are tenths. Products and bias are hundredths, kept as integers for threshold comparison.
const sum = computed(() => inputs.reduce((n,x,i) => n + x * weights.value[i], Number(bias.value) * 10))
const output = computed(() => sum.value >= 0 ? 1 : 0)
const signed = (n, divisor=10) => (Number(n)/divisor).toFixed(divisor===10 ? 1 : 2).replace('.',',').replace('-', '−')
function reset() { weights.value = [5,-5,0]; bias.value = 0 }
</script>

<template>
<section class="neuron" aria-label="Perceptron com pesos editáveis">
  <svg class="perceptron-diagram" viewBox="0 0 820 228" role="img" aria-label="Três entradas passam por pesos e somam contribuições com o viés; o limiar produz uma saída binária">
    <defs><marker id="neuron-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)"/></marker></defs>
    <g class="diagram-caption">
      <text x="97" y="20">Entradas</text><text x="242" y="20">Pesos</text><text x="440" y="20">Soma</text><text x="609" y="20">Limiar</text><text x="757" y="20">Saída</text>
    </g>
    <g v-for="(x,i) in inputs" :key="i" class="path-entry">
      <path :d="'M 119 '+[56,114,172][i]+' H 320 L 402 '+[92,114,136][i]" marker-end="url(#neuron-arrow)"/>
      <circle cx="97" :cy="[56,114,172][i]" r="22"/>
      <text x="97" :y="[63,121,179][i]" class="node-number">{{ signed(x) }}</text>
      <text x="62" :y="[62,120,178][i]" class="input-name">{{ ['x₁','x₂','x₃'][i] }}</text>
      <rect x="187" :y="[41,99,157][i]" width="110" height="29" rx="5"/>
      <text x="242" :y="[62,120,178][i]" class="weight-text">{{ ['w₁','w₂','w₃'][i] }} · {{ signed(weights[i]) }}</text>
    </g>
    <path d="M 440 183 V 157" marker-end="url(#neuron-arrow)" class="bias-line"/>
    <rect x="384" y="184" width="112" height="31" rx="6" class="chip"/>
    <text x="440" y="206" class="weight-text">viés · {{ signed(bias) }}</text>
    <circle cx="440" cy="114" r="37" class="node-accent"/>
    <text x="440" y="111" class="sigma">Σ</text><text x="440" y="134" class="weight-text">{{ signed(sum,100) }}</text>
    <path d="M 478 114 H 543" marker-end="url(#neuron-arrow)" class="flow"/>
    <rect x="550" y="89" width="118" height="50" rx="7" class="node-accent"/>
    <text x="609" y="121" class="weight-text">soma ≥ 0?</text>
    <path d="M 669 114 H 724" marker-end="url(#neuron-arrow)" class="flow"/>
    <circle cx="757" cy="114" r="28" class="node-accent"/>
    <text x="757" y="124" class="output-number">{{ output }}</text>
  </svg>
  <div class="sliders">
    <label v-for="(_, i) in weights" :key="i">Peso {{ i+1 }}: {{ signed(weights[i]) }}
      <input v-model.number="weights[i]" :aria-label="'Peso '+(i+1)" type="range" min="-20" max="20" step="1" @keydown.stop></label>
    <label>Viés: {{ signed(bias) }} <input v-model.number="bias" aria-label="Viés" type="range" min="-20" max="20" step="1" @keydown.stop></label>
  </div>
  <div class="result" aria-live="polite"><b>Soma = {{ signed(sum,100) }}</b><strong>Saída = {{ output }}</strong><button type="button" @click="reset">Reiniciar pesos</button></div>
</section>
</template>
<style scoped>
.neuron {display:grid;gap:9px}
.perceptron-diagram {width:100%;max-height:227px;display:block;overflow:visible}
.perceptron-diagram text {text-anchor:middle;fill:var(--ink)}
.diagram-caption {font-size:15px;font-weight:700}
.path-entry path,.flow,.bias-line {fill:none;stroke:var(--accent);stroke-width:2.25}
.path-entry circle,.chip,.path-entry rect {fill:var(--paper);stroke:var(--line);stroke-width:1.4}
.path-entry rect,.chip {fill:var(--panel)}
.node-accent {fill:var(--panel);stroke:var(--accent);stroke-width:2}
.node-number,.input-name,.weight-text {font-size:17px;font-weight:700}
.sigma,.output-number {font-size:29px;font-weight:800}
.sliders {display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.sliders label {font-size:15px;display:grid;gap:3px;padding:6px 10px;border-top:1px solid var(--line);color:var(--ink)}
input {accent-color:var(--accent);width:100%}
.result {display:flex;align-items:center;gap:17px;font-size:15px;color:var(--muted)}
.result strong {color:var(--accent);font-size:19px}
button {margin-left:auto;background:var(--paper);color:var(--accent);border:1px solid var(--line);border-radius:5px;padding:4px 9px;cursor:pointer}
</style>
