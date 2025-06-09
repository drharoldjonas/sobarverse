<template>
  <div class="container margin_60_35">
    <blog-header />
    <div class="row">
      <div :class="$store.state.blog_settings.layout.blog === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <div class="row">
          <div :class="list === 'grid' ? 'col-md-6' : 'col-md-12'" v-for="late in latest_blog" :key="late.id">
            <article_card v-if="list === 'grid'" :title="late.title" :slug="late.slug" :comments="late.comment_status" :date="late.date" :excerpt="late.excerpt" :featured="late._embedded" />
            <article_card_row v-if="list === 'list'" :title="late.title" :slug="late.slug" :comments="late.comment_status" :date="late.date" :excerpt="late.excerpt" :featured="late._embedded" />
          </div>
        </div>
      </div>
      <aside v-if="$store.state.blog_settings.layout.blog === 'content_widget'" class="col-lg-3">
        <widget-search v-if="$store.state.blog_settings.blog_widgets.includes('search')" />
        <categories v-if="$store.state.blog_settings.blog_widgets.includes('categories')" />
        <tags v-if="$store.state.blog_settings.blog_widgets.includes('tags')" />
        <latest_post v-if="$store.state.blog_settings.category_widgets.includes('latest')" />
      </aside>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary" :disabled="currentPage <= 1" @click="currentPage--; end = false; loadingB = true">Previous <i v-if="loadingB" class="icon-spin3 animate-spin"></i></button>
        <button class="btn btn-primary" :disabled="end" @click="currentPage++; loading = true;">More <i v-if="loading" class="icon-spin3 animate-spin"></i></button>
      </div>
    </div>
    <div class="row mt-4">
      <div :class="$store.state.blog_settings.layout.blog === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <category_footer />
      </div>
    </div>
  </div>
</template>

<script>
import Article_card from "../../components/blog/article_card.vue";
import article_card_row from "../../components/blog/article_card_row.vue";
import categories from "../../components/blog/widgets/categories.vue";
import tags from "../../components/blog/widgets/tags.vue";
import category_footer from "../../components/blog/category_footer.vue";
import BlogHeader from "../../components/blog/blog_header.vue";
import WidgetSearch from "../../components/blog/widgets/search.vue";
import latest_post from "../../components/blog/widgets/latest_post.vue";
  export default {
    async asyncData({$axios, store}) {
      let [ latest_blog ] = await Promise.all([
        $axios.$get(`/sober_blog/all-post`, { params: { perPage: store.state.blog_settings.layout.blog_count, currentPage: 1}})
      ]).catch((err) => {
        console.log(err)
      })

      return { latest_blog: latest_blog.data }
    },
    head() {
      return {
        link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
      }
    },
    data() {
      return {
        end: false,
        loading: false,
        loadingB: false,
        currentPage: 1,
      }
    },
    name: 'index',
    components: {latest_post, WidgetSearch, BlogHeader, Article_card, categories, tags, article_card_row, category_footer},
    watch: {
      currentPage() {
        this.$axios.$get(`/sober_blog/all-post`, { params: { perPage: this.perPage, currentPage: this.currentPage}}).then((res) => {
          if (res.data.code === 'rest_post_invalid_page_number') {
            this.end = true
            this.loading = false
            return
          }
          this.latest_blog = res.data
          this.loading = false
          this.loadingB = false
        })
      }
    },
    computed: {
      perPage() {
        return this.$store.state.blog_settings.layout.blog_count
      },
      list() {
        return this.$store.state.blog_settings.layout.blog_list_type
      }
    }
  }
</script>

<style scoped>

</style>
