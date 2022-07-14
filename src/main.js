import { createApp } from 'vue'
import App from './App.vue'

// normalize.css
import 'normalize.css/normalize.css'
// 全局样式
import '@/styles/index.less'

import './registerServiceWorker'

const app = createApp(App)

// 按需注册 vant 组件
import { registerVantComp } from '@/plugins/registerVant'
registerVantComp(app)

app.mount('#app')
