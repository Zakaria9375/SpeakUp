<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/UserStore';
const newPostText = ref('')

const emit = defineEmits(['updatePosts'])
function addPost() {
	const post = {
		text: newPostText.value,
		publishedAt: Math.floor(Date.now() / 1000),
		userId: useUserStore().authId,
		id: ''
	}
	emit('updatePosts', { post })
}
</script>

<template>
	<div class="col-full">
		<form action="" @submit.prevent="addPost">
			<div class="form-group">
				<textarea v-model="newPostText" name="" id="" cols="30" rows="10"></textarea>
			</div>
			<div class="form-acions">
				<button type="submit">add</button>
			</div>
		</form>
	</div>
</template>