import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.js'
import en from './en.js'

const messages = {
  'zh-CN': zhCN,
  'en': en
}

const detectLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage
  const supported = ['zh-CN', 'en']
  
  if (supported.includes(browserLang)) {
    return browserLang
  }
  
  const prefix = browserLang.split('-')[0]
  if (prefix === 'zh') return 'zh-CN'
  if (prefix === 'en') return 'en'
  
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  locale: detectLanguage(),
  fallbackLocale: 'zh-CN',
  messages
})

export default i18n