<template>
  <blank :thumb="thumb" text="抱歉！系统发生错误..."></blank>
</template>
<script>
import Blank from '@/components/Blank'
export default {
  name: 'err502',
  title: '502',
  data () {
    return {
      thumb: require('../assets/images/502.svg')
    }
  },
  components: {
    Blank
  }
}
</script>
