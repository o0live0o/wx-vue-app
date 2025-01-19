import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menuState', () => {
  const state = ref(false)
  function invert() {
    state.value = !state.value
  }

  return { state, invert }
})
