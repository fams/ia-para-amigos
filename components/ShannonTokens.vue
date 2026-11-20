<script setup>
const entries = [
  {title:'Sem favorito', counts:[4,4,4,4], label:'4 A, 4 B, 4 C e 4 D'},
  {title:'A aparece mais', counts:[8,4,2,2], label:'8 A, 4 B, 2 C e 2 D'},
]
const labels = ['A','B','C','D']
</script>

<template>
  <div class="shannon-tokens">
    <div v-for="row in entries" :key="row.title" class="shannon-token-row">
      <div class="shannon-token-title"><b>{{row.title}}</b><span>16 sinais</span></div>
      <div class="shannon-token-grid" role="img" :aria-label="row.label">
        <div v-for="(count,k) in row.counts" :key="k" class="shannon-token-group" :class="'sh-'+labels[k].toLowerCase()" :style="{flexGrow:count}">
          <div class="shannon-token-cells">
            <span v-for="i in count" :key="i" aria-hidden="true">{{labels[k]}}</span>
          </div>
          <small aria-hidden="true">{{labels[k]}} × {{count}}</small>
        </div>
      </div>
    </div>
  </div>
</template>
