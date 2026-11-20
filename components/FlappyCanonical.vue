<script setup>
import { ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client/logic/slides.ts'
const frame = ref(null)
watch(useIsSlideActive(), active => {
  if (!active) frame.value?.contentWindow?.postMessage('amigos:pause-flappy', location.origin)
})
const src = import.meta.env.BASE_URL + 'flappy-canonical/index.html'
</script>

<template>
  <section class="flappy-canonical" aria-label="Laboratório didático: Flappy e perceptron">
    <iframe ref="frame" :src="`${src}?slide=1`" title="Flappy: altere os pesos do perceptron que pilota o jogo" loading="lazy" />
    <div class="flappy-caption">
      <span>Pesos ajustados à mão. O jogo não aprende nesta demonstração.</span>
      <a :href="src" target="_blank" rel="noopener">Abrir o jogo em tela cheia ↗</a>
    </div>
  </section>
</template>

<style scoped>
.flappy-canonical {width:100%;margin:0}
.flappy-canonical iframe {display:block;width:100%;height:392px;border:1px solid var(--line,#688b88);border-radius:10px;background:var(--paper,#fcfdfb);}
.flappy-caption {display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-top:5px;color:var(--muted);font-size:14px;}
.flappy-canonical a {display:inline-block;white-space:nowrap;color:var(--accent,#10665c);font-size:14px;text-decoration:underline}
</style>
