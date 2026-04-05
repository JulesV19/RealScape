<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const used = ref(null);   // MB or null if unsupported
const total = ref(null);  // MB
const limit = ref(null);  // MB — V8 heap size limit (jsHeapSizeLimit)
const peak = ref(0);      // MB

let intervalId = null;

function update() {
  const mem = performance?.memory;
  if (!mem) return;
  const mb = v => Math.round(v / 1048576);
  const u = mb(mem.usedJSHeapSize);
  const t = mb(mem.totalJSHeapSize);
  used.value = u;
  total.value = t;
  limit.value = mb(mem.jsHeapSizeLimit);
  if (u > peak.value) peak.value = u;
}

onMounted(() => {
  update();
  intervalId = setInterval(update, 500);
});

onUnmounted(() => clearInterval(intervalId));
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 font-mono text-[11px] tabular-nums select-none whitespace-nowrap pointer-events-none">
    <span class="text-white/50 uppercase tracking-wider text-[9px]">{{ t('memoryWidget.mem') }}</span>
    <template v-if="used !== null">
      <span :class="used / limit > 0.85 ? 'text-red-400' : used / limit > 0.65 ? 'text-yellow-400' : 'text-green-400'">
        {{ used }} MB
      </span>
      <span class="text-white/30">/</span>
      <span class="text-white/50">{{ t('memoryWidget.max', { value: limit }) }}</span>
      <span class="text-white/25">·</span>
      <span class="text-white/35">{{ t('memoryWidget.peak', { value: peak }) }}</span>
    </template>
    <span v-else class="text-white/30 italic">{{ t('memoryWidget.unavailable') }}</span>
  </div>
</template>
