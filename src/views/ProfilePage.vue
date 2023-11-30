<script setup>

import { useUserStore } from '@/stores/UserStore';
import PostList from '@/components/PostList.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileEdit from '@/components/ProfileEdit.vue';
import { ref } from 'vue'
const { id } = defineProps({
	id: { required: true, type: String },
})
const userStore = useUserStore()
const user = userStore.authUser
const editing = ref(false)

function goToEdit() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
	editing.value = !editing.value
}
function updateAuthUser (e) {
	editing.value = false
	userStore.updateAuthUser(e)
}
</script>

<template>
	<div>
		<div class="flex-grid">
			<div class="col-3 push-top">
				<profile-card v-if="!editing" :user="user"/>
				<ProfileEdit v-if="editing" :user="user" @updateAuthUser="updateAuthUser" @cancel="goToEdit"/>

				<p class="text-xsmall text-faded text-center">
					Member since <AppDate :act="true" :timeStamp="user.registeredAt"/> , last visited <AppDate :timeStamp="user.lastVisitAt"/>
				</p>

				<div class="text-center">
					<hr />
					<button @click="goToEdit" v-if="!editing" class="btn-green btn-small">Edit Profile</button>
				</div>
			</div>

			<div class="col-7 push-top">
				<div class="profile-header">
					<span class="text-lead"> {{user.username}}'s recent activity </span>
					<a href="#">See only started threads?</a>
				</div>

				<hr />

				<div class="activity-list">
					<PostList :posts="user.posts" />
					<!-- <div class="activity">
						<div class="activity-header">
							<img src="https://i.imgur.com/OqlZN48.jpg" alt="" class="hide-mobile avatar-small" />
							<p class="title">
								How can I chop onions without crying?
								<span>Joker started a topic in Cooking</span>
							</p>
						</div>

						<div class="post-content">
							<div>
								<p>
									I absolutely love onions, but they hurt my eyes! Is there a way where you can chop
									onions without crying?
								</p>
							</div>
						</div>

						<div class="thread-details">
							<span>4 minutes ago</span>
							<span>1 comments</span>
						</div>
					</div>

					<div class="activity">
						<div class="activity-header">
							<img src="http://i.imgur.com/s0AzOkO.png" alt="" class="hide-mobile avatar-small" />

							<p class="title">
								Wasabi vs horseraddish?
								<span>Joker replied to Robin's topic in Cooking</span>
							</p>
						</div>

						<div class="post-content">
							<div>
								<blockquote class="small">
									<div class="author">
										<a href="/user/robin" class=""> robin</a>
										<span class="time">a month ago</span>
										<i class="fa fa-caret-down"></i>
									</div>

									<div class="quote">
										<p>
											Is horseradish and Wasabi the same thing? I&amp;#39;ve heard so many different
											things.
										</p>
									</div>
								</blockquote>

								<p>They're not the same!</p>
							</div>
						</div>

						<div class="thread-details">
							<span>2 days ago</span>
							<span>1 comment</span>
						</div>
					</div>

					<div class="activity">
						<div class="activity-header">
							<img src="https://i.imgur.com/OqlZN48.jpg" alt="" class="hide-mobile avatar-small" />
							<p class="title">
								Where is the sign in button??????!?!?!?!
								<span>Joker replied to his own topic in Questions & Feedback</span>
							</p>
						</div>

						<div class="post-content">
							<div>
								<p>
									<strong><i>Post deleted due to inappropriate language</i></strong>
								</p>
							</div>
						</div>

						<div class="thread-details">
							<span>7 days ago</span>
							<span>7 comments</span>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
