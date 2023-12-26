<!-- ProgressBar.vue -->
<script setup>
import { ref } from 'vue';

const progress = ref(0);
const visible = ref(false);

const start = () => {
  progress.value = 0;
  visible.value = true;
  updateProgress();
};

const updateProgress = () => {
  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
      complete();
    }
  }, 500);
};

const complete = () => {
  setTimeout(() => {
    visible.value = false;
  }, 300);
};
</script>
<template>
  <div class="progress-bar" :style="{ width: `${progress}%` }" v-if="visible"></div>
</template>

<style scoped>
.progress-bar {
  height: 4px;
  background-color: #29d;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: width 0.2s ease;
}
</style>
