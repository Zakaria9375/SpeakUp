<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const { isoTimestamp, act } = defineProps({
  isoTimestamp: { type: String, required: true },
  act: { type: Boolean, required: false, default: false },
	forma: {type: String, default: 'llll'}
});

function fromNowDate(isoTimestamp) {
  const unixTimestamp = dayjs(isoTimestamp).unix();
  return dayjs.unix(unixTimestamp).fromNow();
}

function actualDate(isoTimestamp, forma) {
  const unixTimestamp = dayjs(isoTimestamp).unix();
  return dayjs.unix(unixTimestamp).format(forma);
}

function theDate(act, forma) {
  if (act) {
    return actualDate(isoTimestamp, forma);
  } else {
    return fromNowDate(isoTimestamp);
  }
}
</script>

<template>
  <span :title="actualDate(isoTimestamp)">
    {{ theDate(act, forma) }}
  </span>
</template>

<style lang="scss">
span {
	@include zfont(1rem, 500, $gra2clr);
}
</style>

