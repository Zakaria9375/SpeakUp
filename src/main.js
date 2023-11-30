import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppDate from '@/components/utils/AppDate.vue';

import App from './App.vue'
import router from './router'
import {firebaseApp}  from '@/config/firebase.js';
import { VueFire, VueFireAuth } from 'vuefire'


const vueApp = createApp(App)
const pinia = createPinia()

vueApp.use(pinia)
vueApp.use(router)
vueApp.component('AppDate', AppDate);
vueApp.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})
vueApp.mount('#app')





