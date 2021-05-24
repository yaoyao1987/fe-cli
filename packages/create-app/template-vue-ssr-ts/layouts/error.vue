<template>
  <div class="error-page">
    <div class="error">
      <div class="where-is-panfish">
        <img
          class="elem bg"
          src="https://b-gold-cdn.xitu.io/v3/static/img/bg.1f516b3.png"
        />
        <img
          class="elem panfish"
          src="https://b-gold-cdn.xitu.io/v3/static/img/panfish.9be67f5.png"
        />
        <img
          class="elem sea"
          src="https://b-gold-cdn.xitu.io/v3/static/img/sea.892cf5d.png"
        />
        <img
          class="elem spray"
          src="https://b-gold-cdn.xitu.io/v3/static/img/spray.bc638d2.png"
        />
      </div>
      <div class="title">{{ statusCode }} - {{ message }}</div>
      <nuxt-link class="error-link" to="/">回到首页</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  serverCacheKey: () => Math.floor(Date.now() / 1000) + 'Error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: `${
        this.statusCode === 404 ? '找不到页面' : '呈现页面出错'
      } - 掘金`,
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || 'Error'
    },
  },
}
</script>

<script>
export default {
  setup() {},
}
</script>

<style lang="scss" scoped>
.error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 960px;
  }

  .title {
    font-size: 1.5rem;
    margin-top: 15px;
    color: #47494e;
    margin-bottom: 8px;
  }
}

.error-link {
  display: block;
  margin-top: 24px;
  padding: 14px 24px;
  font-size: 18px;
  color: #fff;
  background-color: $theme;
  border-radius: 5px;
}

.where-is-panfish {
  position: relative;
  width: 624px;
  max-width: 70%;
  padding-top: 48%;

  .elem {
    position: absolute;
    top: 35%;
    left: 50%;
  }

  .bg {
    width: 77.724%;
    transform: translate(-50%, -50%);
  }

  .panfish {
    width: 20.994%;
    transform: translate(-55%, 32%);
    animation: panfish 2s ease-in-out infinite alternate;
  }

  .sea {
    width: 99.199%;
    transform: translate(-50%, 75.3%);
    opacity: 0.7;
  }

  .spray {
    width: 40.545%;
    transform: translate(-55%, 162%);
    opacity: 0.4;
  }
}

@keyframes panfish {
  0% {
    transform: translate(-55%, 30%);
  }
  100% {
    transform: translate(-55%, 36%);
  }
}
</style>
