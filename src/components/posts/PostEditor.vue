<script setup>
import { ref, computed } from 'vue'
import { useAccDbStore } from '@/stores/AccDbStore'
const AccDbStore = useAccDbStore()
const user = computed(() => AccDbStore.dbUser)

const emit = defineEmits(['save'])
const props = defineProps({
	content: { type: String, default: '' },
	btnSubmit: { type: String, default: 'add' },
})

const content = ref(props.content)
function save() {
	const post = {
		content: content.value,
	}
	emit('save', post)
}
</script>
<template>
	<div class="post-editor">
		<div class="u-info">
			<router-link :to="{ name: 'profile', params: { id: user.$id } }" class="user">
				<img class="xavatar" :src="user.avatar" alt="post.madeBy.username" />
				<div class="user-name">{{ user.fullName }}</div>
			</router-link>
		</div>
		<form @submit.prevent="save">
			<BI
				:isTextarea="true"
				required
				placeholder="What's in your mind?..."
				class="nt-textarea"
				nom="content"
				v-model="content"
			></BI>
			<div class="form-act">
				<button class="blu-btn" type="submit">{{ btnSubmit }}</button>
			</div>
		</form>
	</div>
</template>
<style lang="scss">
.post-editor {
	width: 100%;
	padding: 32px;
	// margin: 0 auto;
	// 	max-width: $lS;
	.user {
		@include zflex(row, nowrap, flex-start, center);
		.user-name {
			@include zfont(1.125rem, 500, $darkblue);
		}
	}
	form {
		width: 100%;
		.nt-textarea {
			min-height: 200px;
			border-radius: 12px;
			@include zfont(1.125rem, 400, $dark);
			padding: 16px;
		}
	}
}
</style>
