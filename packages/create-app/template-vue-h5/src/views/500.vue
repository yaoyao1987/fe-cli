<template>
  <blank :thumb="thumb" text="哎呀！服务器崩溃了..."></blank>
</template>
<script>
import Blank from '@/components/Blank'
export default {
  name: 'err500',
  title: '500',
  data () {
    return {
      thumb: require('../assets/images/500.svg')
    }
  },
  components: {
    Blank
  }
}
</script>
