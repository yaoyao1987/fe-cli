import store from '@/store'

function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const clientTitleMixin = {
  mounted () {
    this.setCommonInfo()
  },
  activated () {
    this.setCommonInfo()
  },
  methods: {
    setCommonInfo () {
      const title = getTitle(this)
      if (title) {
        document.title = `${title}`
        store.commit('SET_HEAD_TITLE', title)
      }
    }
  }
}

export default clientTitleMixin
