<script>
  export default {
    name: 'widget-tags',
    data() {
      return {
        loading: false,
        tags: []
      }
    },
    created() {
      this.loading = true
      this.$axios.$get(`/sober_blog/widget-tags`, { params: { perPage: this.$store.state.blog_settings.widget_settings.tag_count}}).then((res) => {
        this.tags = res.data
        this.loading = false
      })
    }
  }
</script>

<template>
  <div class="widget">
    <div class="widget-title">
      <h4>Popular Tags</h4>
    </div>
    <div v-if="loading" class="text-center">
      <img style="opacity: 50%; width: 50%;" src="/images/loading.svg" alt="">
    </div>
    <div v-if="!loading" class="tags" v-for="tag in tags" :key="tag.id">
      <a href="#">{{ tag.name }}</a>
    </div>
  </div>
</template>

<style scoped>

</style>

