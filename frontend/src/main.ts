import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
const options: PluginOptions = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router)
app.mount('#app')
