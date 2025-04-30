import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({ 
  test: {
    browser: {
      enabled: false,
      headless: false,
      provider: 'playwright',
      instances: [
        {
          browser: "chromium"
        }
      ]
    }
  }
})
