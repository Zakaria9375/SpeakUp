import './assets/normalize.css'
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import BaseInput from '@/components/utils/BaseInput.vue'
import BaseDate from '@/components/utils/BaseDate.vue'
import PopUp from '@/components/utils/PopUp.vue'
import BaseSpinner from '@/components/utils/BaseSpinner.vue'

import App from './App.vue'
import router from './router'
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

app.use(router)

app.component('BI', BaseInput)
app.component('BaseDate', BaseDate)
app.component('PopUp', PopUp)
app.component('Spinner', BaseSpinner)

app.mount('#app')
