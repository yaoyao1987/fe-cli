<template>
  <blank :thumb="thumb" text="哎呀！您访问的页面出错啦..."></blank>
</template>
<script>
import Blank from '@/components/Blank'
export default {
  name: 'err403',
  title: '403',
  data () {
    return {
      thumb: require('../assets/images/403.svg')
    }
  },
  components: {
    Blank
  }
}
</script>
