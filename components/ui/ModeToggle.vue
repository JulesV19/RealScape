<template>
  <div class="flex p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 gap-1">
    <BaseButton
      block
      variant="ghost"
      :class="[tabBase, !batchMode ? tabSingleActive : tabInactive]"
      @click="$emit('set-batch-mode', false)"
    >
      <Map :size="12" />
      Single Tile
    </BaseButton>
    <BaseButton
      block
      variant="ghost"
      :class="[tabBase, batchMode ? tabBatchActive : tabInactive]"
      @click="$emit('set-batch-mode', true)"
    >
      <Grid3X3 :size="12" />
      Batch Job
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '../base/BaseButton.vue';
import { Grid3X3, Map } from 'lucide-vue-next';

const tabBase = 'flex-1 py-1.5 px-3 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all';
const tabInactive = 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800';
const tabSingleActive = '!bg-gray-900 !text-white shadow-sm';
const tabBatchActive = '!bg-[#FF6600] !text-white shadow-sm';

defineProps({
  batchMode: { type: Boolean, default: false },
});

defineEmits(['set-batch-mode']);
</script>
