<template>
  <div class="container">
    <div class="layout">
      {{ isLogin }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  // useContext,
  // ref,
  // useAsync,
  // useFetch,
} from '@nuxtjs/composition-api'
import { useUser } from '@/compositions'

export default defineComponent({
  name: 'IndexPage',
  serverCacheKey: () => Math.floor(Date.now() / 1000),
  setup() {
    const { isLogin } = useUser()
    return {
      isLogin,
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
