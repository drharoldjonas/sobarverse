<script>
  export default {
    name: 'widget-category',
    data() {
      return {
        data: [],
        loading: false
      }
    },
    created() {
      this.loading = true
      this.$axios.$get(`/sober_blog/widget-categories`, { params: { perPage: this.$store.state.blog_settings.widget_settings.cat_count}}).then((res) => {
        this.data = res.data
        this.loading = false
      })
    }
  }
</script>

<template>
  <div class="widget">
    <div class="widget-title">
      <h4>Categories</h4>
    </div>
    <div v-if="loading" class="text-center">
      <img style="opacity: 50%; width: 50%;" src="/images/loading.svg" alt="">
    </div>
    <ul v-if="!loading" class="cats">
      <li v-for="cat in data" :key="cat.id"><nuxt-link :to="{ path: `/blog/category`, query: { id: cat.id } }">{{ cat.name }} <span>({{ cat.count }})</span></nuxt-link></li>
    </ul>
  </div>
</template>

<style scoped>

</style>
