<script setup>
import { useAccDbStore } from '@/stores/AccDbStore.js'
import { useAccountStore } from '@/stores/AccountStore.js'
import AccountName from '@/components/account/AccountName.vue'
import { ref, computed, onMounted } from 'vue'

import AccountPassword from '@/components/account/AccountPassword.vue'
import AccountEmail from '@/components/account/AccountEmail.vue'
import AccountPhone from '@/components/account/AccountPhone.vue'
import { useToggle } from '@/composables/toggle.js'
import AccountDevices from '@/components/account/AccountDevices.vue'
const { refValue: deleteAccount, open: openDelete, close: closeDelete } = useToggle()

const accDbStore = useAccDbStore()
const accountStore = useAccountStore()

const dbUser = computed(() => accDbStore.dbUser)
const accUser = computed(() => accDbStore.accUser)
const isReady = ref(false)
function deleteMyAccount() {
	accountStore.deleteAccount(accUser.value.$id)
}
onMounted(() => {
	setTimeout(() => isReady.value = true, 700)
})
</script>

<template>
	<div v-show="isReady" class="account-page z-page p-48">
		<div class="container">
			<div class="account-content">
				<div class="sides">
					<AccountPassword />
					<AccountDevices />
				</div>
				<div class="elements">
					<AccountName
						v-if="dbUser.fullName"
						:fullName="dbUser.fullName"
					/>
					<AccountEmail v-if="dbUser.email" :email="dbUser.email" :status="accUser.emailVerification"/>
					<AccountPhone v-if="dbUser.email"  :phone="dbUser.phone" :status="accUser.phoneVerification" />
					<div class="acc-delete">
						<div class="info-delete">
							<span>Delete your account</span>
							<p>
								If you delete your account, your personal information and your data will be wiped
								from our servers. This action cannot be undone!
							</p>
						</div>

						<div class="form-act">
							<button type="button" class="nobtn del-btn" @click="openDelete">
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<AppLoading v-show="!isReady" />
	<PopUp class="del-main" v-if="deleteAccount" @close="closeDelete">
		<div class="del-content">
			<p>Are you sure you want to delete your account?</p>
			<div class="form-act">
				<button @click="closeDelete" class="gh-btn">Cancel</button>
				<button @click="deleteMyAccount" class="blu-sm-btn">Confirm</button>
			</div>
		</div>
	</PopUp>
</template>
<style lang="scss">
.account-page {
	background-color: #f7f7f7;
	.container {
		.account-content {
			@include zflex(row, wrap, center, flex-start);
			gap: 16px;
			.elements {
				background-color: #fff;
				flex: 1;
				padding: 16px;
				border: 1px solid #ccc;
				border-radius: 8px;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
				.acc-delete {
					.info-delete {
						padding-right: 16px;
						span {
							@include zfont(1.325rem, 500, $gra2clr);
							margin-right: 16px;
						}
						p {
							@include zfont(1.125rem, 400, $wdark);
							line-height: 1.4;
						}
					}
					.form-act {
						.del-btn {
							@include zfont(1.25rem, 500, #333);
							border: 1px solid #999;
							padding: 8px 16px;
							border-radius: 8px;
							&:hover {
								background-color: #bf280d;
								border: 1px solid #bf280d;
								color: #fff;
							}
						}
					}
				}
			}
		}
	}
}

.del-content {
	p {
		@include zfont(1.5rem, 400, #333);
		padding: 16px;
	}
}
</style>
