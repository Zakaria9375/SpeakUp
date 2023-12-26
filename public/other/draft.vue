<script setup>
import { reactive, computed, ref } from 'vue'

import { useAuthStore } from '@/stores/AuthStore.js'
import { loginSchema } from '@/validations/schemas.js'
const authStore = useAuthStore()
const tryLogin = ref(false)
const formData = reactive({
	email: '',
	password: '',
})
const formErrors = reactive({
	email: '',
	password: '',
})
const outputErr = computed(() => authStore.ce)

function onLogin() {
	tryLogin.value = true
	if (isDataValid.value) {
		authStore.login(email.value, password.value)
		tryLogin.value = false
	}
}
const onSubmit = async () => {
  try {
    await loginSchema.validate(formData, { abortEarly: false });
    console.log('Form data is valid:', formData);
    // Perform signup logic here
  } catch (error) {
    // Form data is invalid, update error messages
    error.inner.forEach((e) => {
      formErrors[e.path] = e.message;
    });
  }
};
</script>

<template>
	<div>
		<div v-if="!authStore.loggedIn" class="login-container">
			<h2>Login</h2>
			<form @submit.prevent="onSubmit" class="login-form">
				<BI
					type="text"
					label="Email"
					name="email"
					v-model="formData.email"
					:validation-schema="loginSchema.pick({ password: true })"
				/>
				<BI
					type="password"
					label="Password"
					name="password"
					v-model="formData.password"
					:validation-schema="loginSchema.pick({ password: true })"
				/>
				<router-link :to="{ name: 'forgetPass' }" class="link">Forget password ?!</router-link>
				<button type="submit" class="login">Login</button>
			</form>

			<div class="error-message" v-if="outputErr">{{ outputErr }}</div>

			<router-link :to="{ name: 'register' }" 
			class="create">Create new account</router-link>
		</div>

		<button type="button" @click="authStore.logout">logout</button>
	</div>
</template>


<style lang="scss">
.login-container {
	margin: 16px auto;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	h2 {
		text-align: center;
		color: #333;
	}
	.login-form {
		padding: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.link {
			padding: 12px;
			margin-bottom: 16px;
			@include zfont(1.2rem, 500, $bluclr);
		}

		.login {
			@include zbtn;
			@include zfont(1.2rem, 600, #fff);
		}
	}
	.create {
		@include zfont(1.2rem, 600, $bluclr);
		padding: 12px;
		width: 80%;
		margin-top: 24px;
		border-radius: 10px;
		text-align: center;
		border: 1px solid $bluclr;
		&:hover {
			background-color: $bluhclr;
			color: #fff;
		}
	}
}
</style>



<template>
	<div>
		<p>
			{{ loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in' }}
		</p>

		<form>
			<input type="email" placeholder="Email" v-model="email" />
			<input type="password" placeholder="Password" v-model="password" />
			<input type="text" placeholder="Name" v-model="name" />
			<button type="button" @click="login(email, password)">Login</button>
			<button type="button" @click="register">Register</button>
			<button type="button" @click="logout">Logout</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { account, ID } from '@/config/AppWrite.js'

const loggedInUser = ref(null)
const email = ref('')
const password = ref('')
const name = ref('')

const login = async (email, password) => {
	await account.createEmailSession(email, password)
	loggedInUser.value = await account.get()
}

const register = async () => {
	await account.create(ID.unique(), email.value, password.value, name.value)
	login(email.value, password.value)
}

const logout = async () => {
	await account.deleteSession('current')
	loggedInUser.value = null
}
//////////////////////////////

import { Client, Databases, ID } from 'appwrite'

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('<PROJECT_ID>')

const databases = new Databases(client)

const promise = databases.createDocument('<DATABASE_ID>', '<COLLECTION_ID>', ID.unique(), {
	title: 'Hamlet',
})

promise.then(
	function (response) {
		console.log(response)
	},
	function (error) {
		console.log(error)
	}
)

/*
{
  title: 'Hamlet',
  '$id': '65013138dcd8618e80c4',
  '$permissions': [],
  '$createdAt': '2023-09-13T03:49:12.905+00:00',
  '$updatedAt': '2023-09-13T03:49:12.905+00:00',
  '$databaseId': '650125c64b3c25ce4bc4',
  '$collectionId': '650125cff227cf9f95ad'
}

*/

import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("<PROJECT_ID>")

const databases = new Databases(client);

let promise = databases.listDocuments(
    "[DATABASE_ID]"
    "[COLLECTION_ID]",
    [
        Query.equal('title', 'Hamlet')
    ]
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
</script>
