import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', () => {
  const baseURL = ref('http://localhost:3000/api/v1.0.0')

  return { baseURL }
})
