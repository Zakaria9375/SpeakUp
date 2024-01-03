<script setup>
import ProfileCard from '@/components/profile/ProfileCard.vue'
import ProfileEdit from '@/components/profile/ProfileEdit.vue'
import { useToggle } from '@/composables/toggle.js'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { useAccDbStore } from '@/stores/AccDbStore'
const AccDbStore = useAccDbStore()
const userStore = useUserStore()

const { refValue, open, close } = useToggle()
const isAuthUser = computed(() => id === AccDbStore.authId)
const { id } = defineProps({
	id: { type: String, required: true },
})
const user = ref({})
userStore.getUser(user, id)


function updateProfile(data) {
	console.log(data)
}
</script>

<template>
	<div class="main-profile cardW">
		<ProfileCard :user="user" />
		<button @click="open" v-if="isAuthUser" class="blu-btn">
			<span class="pen"><i class="fa fa-pencil"></i></span>Edit Profile
		</button>
	</div>
	<PopUp v-if="refValue" class="del-main" @close="close">
		<ProfileEdit :user="user" @cancel="close" @update-profile="updateProfile" />
	</PopUp>
</template>
<style lang="scss">
.main-profile {
	@include more($lS) {
		flex: 0 0 30%;
	}
	width: 100%;
	min-width: 270px;
	@include zflex(column, nowrap, center, center);

	.blu-btn {
		margin: 16px 0;
		.pen {
			@include zfont(1.125rem, normal, #fff);
			margin: 0 12px 0 0;
		}
	}
}
</style>
