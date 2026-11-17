<script setup>
import { ref } from 'vue'
const props = defineProps({ labels: {type:Array,required:true} })
const current = ref(0)
function advance(){current.value=(current.value+1)%props.labels.length}
</script>
<template>
<section class="steps" aria-label="Diagrama passo a passo">
  <div class="track">
    <template v-for="(label,index) in labels" :key="label">
      <span v-if="index" class="arrow" aria-hidden="true">→</span>
      <button :class="{active:current===index}" :aria-pressed="current===index" @click="current=index">{{label}}</button>
    </template>
  </div>
  <div class="controls">
    <button @click="advance">Próximo passo</button>
    <button @click="current=0">Reiniciar</button>
    <span aria-live="polite">{{current+1}} / {{labels.length}} · {{labels[current]}}</span>
  </div>
</section>
</template>
<style scoped>
.track{display:flex;align-items:center;gap:10px;margin:24px 0;flex-wrap:wrap}
.track button{border:1px solid #53747d;border-radius:10px;background:#203642;color:#eaf2f2;padding:16px 15px;font-size:20px;cursor:pointer;transition:background .2s,transform .2s;max-width:175px}
.track button.active{background:#a3e5d8;color:#10252d;transform:translateY(-5px);border-color:#a3e5d8}
.arrow{color:#81d5c4}.controls{display:flex;gap:14px;align-items:center;font-size:15px;color:#bacfd3}
.controls button{border:1px solid #53747d;border-radius:5px;padding:8px 12px;cursor:pointer;color:#edf3f3;background:#203642}
</style>
