<script>
  export default {
    name: 'widget-latest-post',
    data() {
      return {
        loading: false,
        latest: []
      }
    },
    created() {
      this.loading = true
      this.$axios.$get(`/sober_blog/latest-post`, { params: { perPage: this.$store.state.blog_settings.widget_settings.latest_count}}).then((res) => {
        this.latest = res.data
        this.loading = false
      })
    }
  }
</script>

<template>
  <div class="widget">
    <div class="widget-title">
      <h4>Latest Post</h4>
    </div>
    <div v-if="loading" class="text-center">
      <img style="opacity: 50%; width: 50%;" src="/images/loading.svg" alt="">
    </div>
    <ul class="comments-list" v-if="!loading">
      <li v-for="l in latest" :key="l.id"  style="display: inline-block !important;">
        <div class="alignleft" v-if="l._embedded['wp:featuredmedia']">
          <a :href="'/blog/' + l.slug"><img :src="l._embedded['wp:featuredmedia'][0].source_url" alt=""></a>
        </div>
        <div class="alignleft" v-else>
          <a :href="'/blog/' + l.slug"><img src="/images/blog-default-image.png" alt=""></a>
        </div>
        <small>{{ l._embedded['wp:term'][0]['0'].name }} - {{ l.date|latest_date_format }}</small>
        <h3 class="text-truncate"><a :href="'/blog/' + l.slug" title="" v-html="l.excerpt.rendered"></a></h3>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>

