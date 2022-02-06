import { defineStore } from 'pinia'

export const apiStore = defineStore('api', {
  state: () => ({
    api1: '',
    api2: ''
  }),
  persist: true
})
