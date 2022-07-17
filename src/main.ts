import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";
import './index.css'
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App)

app.use(Vue3TouchEvents);

app.use(router)

app.use(Toast)

app.mount('#app')
