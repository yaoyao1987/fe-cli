<template>
  <div class="blank blank-column">
    <div class="blank-thumb">
      <img :src="imgUrl">
    </div>
    <div class="blank-title mt10">{{text?text:'暂无数据'}}</div>
  </div>
</template>
<script>
const noData = require('../assets/images/no-data.svg')
export default {
  name: 'Blank',
  props: ['thumb', 'text'],
  computed: {
    imgUrl: function () {
      return this.thumb || noData
    }
  }
}
</script>
