import './assets/main.css'
import '@oruga-ui/theme-oruga/dist/oruga.css'

import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Oruga)
app.use(router)
app.mount('#app')
