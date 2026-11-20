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
.track button{border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--ink);padding:16px 15px;font-size:20px;cursor:pointer;transition:background .2s,transform .2s;max-width:175px}
.track button.active{background:var(--accent);color:#fff;transform:translateY(-5px);border-color:var(--accent)}
.arrow{color:var(--accent)}.controls{display:flex;gap:14px;align-items:center;font-size:15px;color:var(--muted)}
.controls button{border:1px solid var(--line);border-radius:5px;padding:8px 12px;cursor:pointer;color:var(--ink);background:var(--panel)}
</style>
