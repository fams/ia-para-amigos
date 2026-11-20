<script setup>
import { ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client/logic/slides.ts'
const active = useIsSlideActive()
const video = ref(null)
const base = import.meta.env.BASE_URL
watch(active, (isActive) => { if (!isActive) video.value?.pause() })
</script>

<template>
  <figure class="markov-film">
    <video ref="video" controls playsinline preload="none"
      :poster="base + 'videos/markov-tema-claro-poster.jpg'"
      :src="base + 'videos/markov-tema-claro.mp4'"
      aria-label="Animação: a distribuição da próxima letra muda conforme o texto passa"
      @keydown.stop>
      Seu navegador não conseguiu reproduzir o vídeo.
    </video>
    <figcaption>
      <span>Q → U: o vídeo inclui o espaço (6.230/6.231); os controles contam só dentro das palavras (6.230/6.230).</span>
      <a :href="base + 'videos/markov-tema-claro.mp4'" target="_blank" rel="noopener noreferrer">Abrir vídeo</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.markov-film { margin: 0 auto; width: 690px; max-width: 100%; }
video { display:block; width:100%; aspect-ratio:16/9; object-fit:contain; background:var(--paper,#fcfdfb); border:1px solid var(--line,#688b88); border-radius:9px; }
figcaption { display:flex; justify-content:space-between; gap:16px; color:var(--muted); font-size:15px; margin-top:8px; line-height:1.24; }
figcaption a { color:var(--accent); text-decoration:underline; white-space:nowrap; }
</style>
