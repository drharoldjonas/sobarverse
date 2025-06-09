export const state = () => ({
  success: false,
  email: ''
})

export const mutations = {
  setSuccess (state, data) {
    state.success = data;
  },
  setEmail (state, data) {
    state.email = data;
  }
}
