<script setup>
import { reactive } from 'vue'

const { user } = defineProps({
	user: { required: true, type: Object }
})
const emit = defineEmits(['updateAuthUser', 'cancel'])

const activeUser = reactive({...user})
function save(){
	emit('updateAuthUser', { activeUser })
}
</script>
<template>
	<div>
		<div class="profile-card">
			<form @submit.prevent="save">
			<p class="text-center">
				<img :src="activeUser.avatar" :alt="activeUser.username" class="avatar-xlarge img-update" />
			</p>

			<div class="form-group">
				<input
					type="text"
					v-model="activeUser.username"
					placeholder="Username"
					class="form-input text-lead text-bold"
				/>
			</div>

			<div class="form-group">
				<input
					type="text"
					v-model="activeUser.name"
					placeholder="Full Name"
					class="form-input text-lead"
				/>
			</div>

			<div class="form-group">
				<label for="user_bio">Bio</label>
				<textarea
					class="form-input"
					id="user_bio"
					placeholder="Write a few words about yourself."
					v-model="activeUser.bio"
				></textarea>
			</div>

			<div class="stats">
				<span>{{ activeUser.postsCount }} posts</span>
				<span>{{ activeUser.threadsCount }} threads</span>
			</div>

			<hr />

			<div class="form-group">
				<label class="form-label" for="user_website">Website</label>
				<input autocomplete="off" class="form-input" id="user_website" v-model="activeUser.website" />
			</div>

			<div class="form-group">
				<label class="form-label" for="user_email">Email</label>
				<input autocomplete="off" class="form-input" id="user_email" v-model="activeUser.email" />
			</div>

			<div class="form-group">
				<label class="form-label" for="user_location">Location</label>
				<input autocomplete="off" class="form-input" id="user_location" v-model="activeUser.location"/>
			</div>

			<div class="btn-group space-between">
				<button @click="$emit('cancel')" class="btn-ghost">Cancel</button>
				<button type="submit" class="btn-blue">Save</button>
			</div>
		</form>
		</div>
	</div>
</template>
