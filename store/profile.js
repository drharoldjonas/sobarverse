export const state = () => ({
  item: null,
  facility: null,
  images: null,
  logo: null,
  plan: null,
  type: null,
  success: false
})

export const mutations = {
  set (state, data) {
    state.item = data;
  },
  setType (state, data) {
    state.type = data;
  },
  setPlan (state, data) {
    state.plan = data;
  },
  setFacility (state, data) {
    state.facility = data;
  },
  setLogo (state, data) {
    state.logo = data;
  },
  setImages (state, data) {
    state.images = data;
  },
  setSuccess (state, data) {
    state.success = data;
  }
}
