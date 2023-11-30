<script setup> 
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)
const {timeStamp, act} = defineProps({
	timeStamp: {type: Number, required: true},
	act: {type: Boolean, required: false, default: false}
})
function fromNowDate(timeStamp) {
	return dayjs.unix(timeStamp).fromNow();
}
function actualDate(timeStamp) {
	return dayjs.unix(timeStamp).format('llll')
}
function theDate(act) {
	if(act) {
		return actualDate(timeStamp)
	}
	else {
		return fromNowDate(timeStamp)
	}
}
</script>

<template>
	<span 
		
		:title="actualDate(timeStamp)"
	>
		{{ theDate(act) }}
</span>
</template>
<style>
</style>
