import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";
import './index.css'
import Vue3TouchEvents from "vue3-touch-events";
import Popper from "vue3-popper";

const app = createApp(App)

app.use(Vue3TouchEvents);

app.component("Popper",Popper)

app.use(router)

app.use(Toast)

app.mount('#app')
