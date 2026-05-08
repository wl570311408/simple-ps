import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './lang/index.js'

const app = createApp(App)
app.use(i18n)

const updatePageTitle = (title) => {
  const titleEl = document.getElementById('page-title')
  if (titleEl) {
    titleEl.textContent = title
  }
}

app.config.globalProperties.$updatePageTitle = updatePageTitle

app.mount('#app')
