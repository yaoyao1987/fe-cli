<template>
  <div class="common-layout">
    <el-container>
      <el-header><AppHeader /></el-header>
      <el-main><Nuxt /></el-main>
    </el-container>
    <!-- <app-footer /> -->
    <!-- <back-top></back-top> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import useUser from '@/compositions/useUser'

import { Container, Header, Main } from 'element-ui'
import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  name: 'Default',
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    AppHeader,
  },
  setup() {
    const { retryLogin } = useUser()
    useAsync(() => {
      if (process.server) {
        return false
      }
      const token = window.localStorage.getItem('token')
      if (token) {
        retryLogin(token)
      }
    })
  },
})
</script>
