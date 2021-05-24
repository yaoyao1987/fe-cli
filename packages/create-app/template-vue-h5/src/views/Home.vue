<template>
  <div class="home">
    <div class="banner">
      <img src="http://placehold.it/690x208/09f/fff.png" alt="">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  mounted () {
    // 查看全局变量
    console.log('GLOBAL', this.GLOBAL.PAGE_SIZE)
    // 查看枚举
    console.log('GLOBAL', this.GLOBAL.enums['是否']['是'])
  },
  components: {
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
  padding: 10px 15px;
  background:@bgColorDefault;
}
.banner {
  height: 104px;

  img {
    height: 100%;
  }
}
</style>
