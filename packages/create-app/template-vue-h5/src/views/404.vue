<template>
  <blank :thumb="thumb" text="抱歉！您访问的页面失联啦..."></blank>
</template>
<script>
import Blank from '@/components/Blank'
export default {
  name: 'err404',
  title: '404',
  data () {
    return {
      thumb: require('../assets/images/404.svg')
    }
  },
  components: {
    Blank
  }
}
</script>
