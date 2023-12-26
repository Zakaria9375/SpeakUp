<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/UserStore'
const userStore = useUserStore()
const userdb = computed(() => userStore.userdb)

const emit = defineEmits(['save', 'cancel'])
const props = defineProps({
	content: { type: String, default: '' },
	btnSubmit: { type: String, default: 'add' },
	btnCancel: { type: Boolean, default: false },
})

const content = ref(props.content)
function save() {
	const post = {
		content: content.value,
		madeBy: userdb.value.$id,
	}
	emit('save', post)
}
function cancel() {
	emit('cancel')
}
</script>
<template>
	<div class="post-editor">
		<div class="u-info">
			<router-link :to="{ name: 'myprofile' }" class="user">
				<img class="xavatar" :src="userdb.avatar" alt="post.madeBy.username" />
				<div class="user-name">{{ userdb.fullName }}</div>
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
				<button v-if="btnCancel" @click="cancel" type="button" class="gh-btn">Cancel</button>
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
		.form-act {
			.gh-btn {
				@include zfont(1.125rem, 400, #000);
				margin-right: 12px;
				background: none;
				border: none;
				padding: 15px 36px;
				border-radius: 8px;
				&:hover {
					background-color: #adaaaa;
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
