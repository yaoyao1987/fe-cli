export default {
  format (enums) {
    const result = {}
    enums.forEach(item => {
      if (item.name) {
        result[item.name] = {}
        item.values.forEach(value => {
          result[item.name][value.name] = value.value
        })
      }
      if (item.code) {
        result[item.code] = {}
        item.values.forEach(value => {
          result[item.code][value.code] = value.value
        })
      }
    })
    return result
  }
}
