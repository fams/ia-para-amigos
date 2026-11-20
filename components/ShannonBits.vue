<script setup>
const rows = [
  ['A',8,'00','0'], ['B',4,'01','10'], ['C',2,'10','110'], ['D',2,'11','111'],
]
const expand = column => rows.flatMap(([symbol,count,...codes]) => Array.from({length:count * codes[column].length},() => symbol))
const fixed = expand(0)
const variable = expand(1)
</script>

<template>
  <div class="shannon-encode">
    <div class="shannon-code" role="table" aria-label="Código fixo e código variável, por sinal">
      <div role="row"><span role="columnheader">Sinal</span><span role="columnheader">Fixo</span><span role="columnheader">Variável</span></div>
      <div v-for="[symbol,count,f,v] in rows" :key="symbol" role="row">
        <b role="rowheader" class="shannon-symbol" :class="'sh-'+symbol.toLowerCase()">{{symbol}} × {{count}}</b>
        <span role="cell" class="shannon-digits"><code v-for="(bit,i) in f" :key="i">{{bit}}</code></span>
        <span role="cell" class="shannon-digits"><code v-for="(bit,i) in v" :key="i">{{bit}}</code></span>
      </div>
    </div>
    <div class="shannon-tally">
      <div class="shannon-tally-label"><b>Código fixo</b><span>{{fixed.length}} bits</span></div>
      <div class="shannon-bit-grid" role="img" aria-label="32 células, um bit em cada célula">
        <i v-for="(symbol,i) in fixed" :key="i" :class="'sh-'+symbol.toLowerCase()"></i>
      </div>
      <div v-click class="shannon-result">
        <div class="shannon-tally-label"><b>Código variável</b><span>{{variable.length}} bits</span></div>
        <div class="shannon-bit-grid" role="img" aria-label="28 células usadas e 4 células poupadas na mesma escala">
          <i v-for="(symbol,i) in variable" :key="i" :class="'sh-'+symbol.toLowerCase()"></i>
          <i v-for="i in fixed.length - variable.length" :key="'gap'+i" class="shannon-saved"></i>
        </div>
        <strong>{{fixed.length}} → {{variable.length}} bits</strong>
        <small>Os mesmos 16 sinais, sem perder nenhum.</small>
      </div>
    </div>
  </div>
</template>
