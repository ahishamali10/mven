import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const status = ref(false)
  const message = ref('')

  function startNotification (msg) {
    status.value = true
    message.value = msg
  }
  function closeNotification () {
    status.value = false
  }

  return { status,message,startNotification,closeNotification }
})
