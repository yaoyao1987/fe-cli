export default {
  SET_HEAD_TITLE: (state, title) => {
    state.headTitle = title
  },
  UPDATE_LOADING_STATUS: (state, { isLoading }) => {
    state.isLoading = isLoading
  }
}
