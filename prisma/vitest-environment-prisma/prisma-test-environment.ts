import { Environment } from 'vitest'

export default <Environment> {
  name: 'custom',
  transformMode: 'ssr',
  async setup() {
    // custom setup
    console.log('Exec')
    return {
      teardown() {
      }
    }
  }
}