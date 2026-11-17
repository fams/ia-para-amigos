<script setup>
import { computed, ref } from 'vue'
const w1=ref(0.5),w2=ref(-0.5),bias=ref(0)
const x1=0.8,x2=0.3
const sum=computed(()=>x1*Number(w1.value)+x2*Number(w2.value)+Number(bias.value))
function reset(){w1.value=.5;w2.value=-.5;bias.value=0}
</script>
<template>
<section class="neuron" aria-label="Perceptron com pesos editáveis">
<div class="sliders">
<label>Peso 1: {{Number(w1).toFixed(1)}} <input v-model.number="w1" aria-label="Peso 1" type="range" min="-2" max="2" step=".1"></label>
<label>Peso 2: {{Number(w2).toFixed(1)}} <input v-model.number="w2" aria-label="Peso 2" type="range" min="-2" max="2" step=".1"></label>
<label>Viés: {{Number(bias).toFixed(1)}} <input v-model.number="bias" aria-label="Viés" type="range" min="-2" max="2" step=".1"></label>
</div>
<div class="result" aria-live="polite">
<span>Entradas fixas: 0,8 e 0,3</span>
<b>Soma = {{sum.toFixed(2)}}</b>
<strong>Saída = {{sum>=0?1:0}}</strong>
<span>Limiar: soma ≥ 0</span>
<button @click="reset">Reiniciar pesos</button>
</div>
</section>
</template>
<style scoped>
.neuron{display:grid;grid-template-columns:1.3fr 1fr;gap:30px;background:#1a2e3a;padding:20px 25px;border-radius:10px}
.sliders{display:flex;flex-direction:column;gap:12px}.sliders label{font-size:16px;display:flex;justify-content:space-between;align-items:center;gap:20px}
input{accent-color:#81d5c4;width:200px}.result{display:flex;flex-direction:column;gap:5px;font-size:14px}.result b{font-size:23px}.result strong{color:#a3e5d8;font-size:25px}
button{background:#203642;color:#edf3f3;border:1px solid #53747d;border-radius:4px;padding:5px;cursor:pointer}
</style>
