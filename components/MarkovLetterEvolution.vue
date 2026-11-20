<script setup>
import { computed, ref } from 'vue'

const sentence = 'A LUA CLARA SURGE NO CÉU'
const letters = [...sentence.normalize('NFD').replace(/[^A-Z ]/g, '')]
const kind = l => 'AEIOU'.includes(l) ? 'V' : 'C'
const cells = letters.map((l, i) => ({
  letter: Array.from(sentence)[i],
  kind: l === ' ' ? '' : kind(l),
  number: letters.slice(0, i + 1).filter(c => c !== ' ').length
}))
const classified = cells.filter(c => c.kind)
const step = ref(0)
const counts = computed(() => {
  const result = { V: { V: 0, C: 0 }, C: { V: 0, C: 0 } }
  for (let i = 1; i < step.value; i++) result[classified[i-1].kind][classified[i].kind]++
  return result
})
const lastPair = computed(() => step.value > 1 ? classified.slice(step.value-2,step.value) : [])
const word = { V: 'vogal', C: 'consoante' }
const share = (count, total) => total ? (100 * count / total).toFixed(0) + '%' : '—'
</script>

<template>
<section class="evolution" aria-label="Evolução das transições entre vogais e consoantes">
  <div class="legend" aria-hidden="true"><span><b class="v">V</b> vogal</span><span><b class="c">C</b> consoante</span></div>
  <div class="letter-line" aria-hidden="true">
    <span v-for="(cell, i) in cells" :key="i" class="letter-cell" :class="{blank:!cell.kind, active:cell.kind && cell.number===step}">
      <template v-if="cell.kind">
        <strong>{{ cell.letter }}</strong>
        <b :class="cell.number<=step ? cell.kind.toLowerCase() : 'unseen'">{{ cell.number<=step ? cell.kind : '·' }}</b>
      </template>
    </span>
  </div>
  <p class="latest" role="status">
    <template v-if="lastPair.length">Último par: <b>{{ lastPair[0].letter }} → {{ lastPair[1].letter }}</b> &nbsp;({{ word[lastPair[0].kind] }} → {{ word[lastPair[1].kind] }})</template>
    <template v-else>{{ step ? 'Primeira letra classificada. Ainda não há par.' : 'Nenhuma letra classificada ainda.' }}</template>
  </p>
  <div v-for="prev in ['V','C']" :key="prev" class="bar-row" :data-from="prev">
    <template v-for="total in [counts[prev].V+counts[prev].C]" :key="prev">
      <b>Depois de {{ word[prev] }}</b>
      <div class="track" aria-hidden="true">
        <span v-for="next in ['V','C']" :key="next" :class="next.toLowerCase()" :style="{ width: total ? (100*counts[prev][next]/total)+'%' : '0%' }"></span>
      </div>
      <div class="stats"><span class="vtext">{{ counts[prev].V }} V · {{ share(counts[prev].V,total) }}</span><span class="ctext">{{ counts[prev].C }} C · {{ share(counts[prev].C,total) }}</span></div>
    </template>
  </div>
  <div class="evolution-actions">
    <button type="button" @click="step++" :disabled="step===classified.length">Próxima letra</button>
    <button type="button" @click="step=classified.length" :disabled="step===classified.length">Ver tudo</button>
    <button type="button" @click="step=0" :disabled="step===0">Reiniciar contagem</button>
    <span>{{ step }} de {{ classified.length }} letras • {{ Math.max(0,step-1) }} pares</span>
  </div>
</section>
</template>

<style scoped>
.evolution {display:grid;gap:10px}
.legend {display:flex;justify-content:flex-end;gap:16px;font-size:14px;color:var(--muted)}
.legend b,.letter-cell b {border-radius:4px;display:inline-grid;place-items:center;height:19px;width:24px;font-size:12px}
.v {background:#e7aa50;color:#522902}
.c {background:#5fae9f;color:#113831}
.letter-line {display:flex;align-items:stretch;gap:4px}
.letter-cell {min-width:25px;display:grid;line-height:1.2;text-align:center;place-items:center;gap:3px;padding-bottom:3px;border-bottom:2px solid transparent}
.letter-cell strong {font-size:17px}
.letter-cell.active {border-color:var(--accent);background:var(--panel);border-radius:3px 3px 0 0}
.blank {min-width:8px}
.unseen {background:var(--panel);color:var(--muted)}
.latest {margin:0;min-height:23px;color:var(--muted);font-size:15px}
.bar-row {display:grid;grid-template-columns:173px 1fr 222px;gap:12px;align-items:center}
.bar-row>b {font-size:16px}
.track {display:flex;height:18px;border:1px solid var(--line);border-radius:4px;overflow:hidden;background:var(--panel)}
.track span {display:block;transition:width .24s ease}
.stats {display:flex;justify-content:space-between;font-size:14px;font-variant-numeric:tabular-nums}
.vtext {color:var(--amber)}.ctext {color:var(--accent)}
.evolution-actions {display:flex;align-items:center;gap:8px;margin-top:4px;font-size:13px;color:var(--muted)}
.evolution-actions button {border:1px solid var(--line);border-radius:5px;background:#fff;color:var(--ink);padding:6px 10px;font-size:14px;cursor:pointer}
.evolution-actions button:first-child {background:var(--accent);color:white}
.evolution-actions button:disabled {opacity:.48;cursor:default}
.evolution-actions span {margin-left:auto}
</style>
