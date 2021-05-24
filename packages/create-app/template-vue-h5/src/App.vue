<template>
  <div id="app" class="page">
    <!-- loading -->
    <transition name="router-fade" mode="out-in">
      <div class="blank" v-if="isLoading">
        <div class="loading"></div>
      </div>
    </transition>
    <!-- main -->
    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
// 全局常量
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}
</script>
<style lang="less">
</style>
