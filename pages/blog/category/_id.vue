<script>
import tags from "../../../components/blog/widgets/tags.vue";
import Article_card from "../../../components/blog/article_card.vue";
import categories from "../../../components/blog/widgets/categories.vue";
import category_footer from "../../../components/blog/category_footer.vue";
import latest_post from "../../../components/blog/widgets/latest_post.vue";
import BlogHeader from "../../../components/blog/blog_header.vue";
import article_card_row from "../../../components/blog/article_card_row.vue";
import WidgetSearch from "../../../components/blog/widgets/search.vue";

export default {
  components: {latest_post, WidgetSearch, article_card_row, BlogHeader, category_footer, categories, Article_card, tags},

  async asyncData({$axios, query, redirect, store}) {
    if (!query.id) redirect('/blog')

    let [ single_category, categories ] = await Promise.all([
      $axios.$get(`/sober_blog/single-category/${query.id}`, { params: { perPage: store.state.blog_settings.layout.cat_count, currentPage: 1}}),
      $axios.$get(`/sober_blog/all-categories`)
    ]).catch((err) => {
      console.log(err)
    })

    return { single_category: single_category.data, categories: categories.data }
  },

  head() {
    return {
      link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
    }
  },

  name: 'single-category',
  data() {
    return {
      end: false,
      loading: false,
      loadingB: false,
      perPage: this.$store.state.blog_settings.layout.cat_count,
      currentPage: 1,
      list: this.$store.state.blog_settings.layout.cat_list_type,
    }
  },
  watch: {
    currentPage() {
      this.$axios.$get(`/sober_blog/single-category/${this.$route.query.id}`, { params: { perPage: this.perPage, currentPage: this.currentPage}}).then((res) => {
        if (res.data.code === 'rest_post_invalid_page_number') {
          this.end = true
          this.loading = false
          return
        }
        this.single_category = res.data
        this.loading = false
        this.loadingB = false
      })
    },
    '$route.query'() {
      this.$nuxt.$loading.start()
      this.$axios.$get(`/sober_blog/single-category/${this.$route.query.id}`, { params: { perPage: this.perPage, currentPage: this.currentPage}}).then((res) => {
        this.single_category = res.data
        this.$nuxt.$loading.finish()
      })
    }
  }
}
</script>

<template>
  <div class="container margin_60_35">
    <blog-header />
    <div class="row">
      <div :class="$store.state.blog_settings.layout.category === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <div class="row">
          <div :class="list === 'grid' ? 'col-md-6' : 'col-md-12'" v-for="cat in single_category" :key="cat.id">
            <article_card v-if="list === 'grid'" :title="cat.title" :date="cat.date" :slug="cat.slug" :comments="cat.comment_status" :excerpt="cat.excerpt" :featured="cat._embedded" />
            <article_card_row v-if="list === 'list'" :title="cat.title" :slug="cat.slug" :comments="cat.comment_status" :date="cat.date" :excerpt="cat.excerpt" :featured="cat._embedded" />
          </div>
        </div>
      </div>
      <aside v-if="$store.state.blog_settings.layout.category === 'content_widget'" class="col-lg-3">
        <widget-search v-if="$store.state.blog_settings.blog_widgets.includes('search')" />
        <categories v-if="$store.state.blog_settings.category_widgets.includes('categories')" />
        <tags v-if="$store.state.blog_settings.category_widgets.includes('tags')" />
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
      <div :class="$store.state.blog_settings.layout.category === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <category_footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
