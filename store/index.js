export const state = () => ({
  settings: {
    general: {},
    social: {},
    adsense: {active: ''},
    banners: {},
    banners_ads: {},
    advertise: null,
    active_menu: [],
    passive_menu: []
  },
  blog_settings: {},
  menus: {},
  roles : [],
  seeking: '',
  banners: []
})

export const mutations = {
  SET_SETTINGS (state, data) {
    state.settings.general = data.settings.general;
    state.settings.social = data.settings.social;
    state.settings.banners = data.settings.banners;
    state.settings.banners_ads = data.settings.banners_ads;
    state.settings.adsense = (data.settings.adsense && data.settings.adsense.active === 'yes') ? data.settings.adsense : {};
    state.settings.advertise = data.settings.advertise;
    state.roles = data.roles;
    state.menus = data.menus
    state.categories = data.categories;
    state.settings.active_menu = data.settings.active_menu;
    state.settings.passive_menu = data.settings.passive_menu;
  },
  updateElement: (state, payload) => {
    state.menus.active_menu = payload
  },
  updatePassiveElement: (state, payload) => {
    state.menus.passive_menu = payload
  },
  updateBlogSettings: (state, payload) => {
    state.blog_settings = payload
  },
  setBannerAds: (state, payload) => {
    state.banners = payload
  },
  SET_SEEKING (state, data) {
    state.seeking = data;
  }
};

export const actions = {
  async nuxtServerInit({commit, dispatch}, {req}) {
    commit('SET_SETTINGS', req)
    await dispatch('storeDispatchFunc')
  },

  async storeDispatchFunc({ commit }) {
//    const { data } = await this.$axios.$get('/blog-settings')
//    commit('updateBlogSettings', data)

//    const banner = await this.$axios.$get('/banners')
//    commit('setBannerAds', banner)
  },

  SET_SEEKING({commit}, data) {
    commit('SET_SEEKING', data)
  },
  SET_BLOG_SETTINGS({commit}, data) {
    commit('updateBlogSettings', data)
  }
}
