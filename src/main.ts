import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'animate.css'
import 'uno.css'
import '~/styles/main.less'

createApp(App).use(router).mount('#app')
