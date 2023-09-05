import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { initMicroApps } from '@/micro/config'
import { elementSetting } from '@/settings/projectSetting'

const initMainApp = () => {
    const app = createApp(App)
    setupStore(app)
    setupRouter(app)
    app.use(ElementPlus, { ...elementSetting })
    app.mount('#app')
}

initMainApp()
initMicroApps()
