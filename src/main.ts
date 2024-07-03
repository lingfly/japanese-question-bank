

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'
import Root from '@/graph/Root.vue'

// createApp(App).use(Antd).use(router).mount('#app')
createApp(Root).mount('#app')
