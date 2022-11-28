import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'
import App from './App.vue'
import router from './router'

import 'animate.css'
import 'uno.css'
import '~/styles/main.less'

createApp(App).use(router).use(createPinia().use(piniaPluginPersist)).mount('#app')
