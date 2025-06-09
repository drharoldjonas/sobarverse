<script>
import categories from "../../../components/blog/widgets/categories.vue";
import latest_post from "../../../components/blog/widgets/latest_post.vue";
import search_article_card from "../../../components/blog/search/search_article_card.vue";
import tags from "../../../components/blog/widgets/tags.vue";
import search_article_card_row from "../../../components/blog/search/search_article_card_row.vue";
import WidgetSearch from "../../../components/blog/widgets/search.vue";
import BlogHeader from "../../../components/blog/blog_header.vue";
import category_footer from "../../../components/blog/category_footer.vue";

export default {
  async asyncData({$axios, store, params, redirect}) {
    if (!params.id) redirect('/blog')

    let [ search_blog ] = await Promise.all([
      $axios.$post(`/sober_blog/search`, { query_string: params.id, perPage: store.state.blog_settings.widget_settings.search_perPage, currentPage: 1})
    ]).catch((err) => {
      console.log(err)
    })

    return { search_blog: search_blog.data }
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
      query_string: this.$route.params.id,
      perPage: this.$store.state.blog_settings.layout.search_count,
      currentPage: 1,
      list: this.$store.state.blog_settings.layout.search_list_type
    }
  },

  name: 'search',
  components: {
    category_footer,
    BlogHeader,
    WidgetSearch,
    search_article_card_row,
    tags,
    search_article_card,
    latest_post,
    categories
  },
  watch: {
    currentPage() {
      this.$axios.$post(`/sober_blog/search`, { query_string: this.query_string, perPage: this.$store.state.blog_settings.widget_settings.search_perPage, currentPage: this.currentPage}).then((res) => {
        if (res.data.code === 'rest_post_invalid_page_number') {
          this.end = true
          this.loading = false
          return
        }
        this.search_blog = res.data
        this.loading = false
        this.loadingB = false
      })
    }
  }
}
</script>

<template>
  <div class="container margin_60_35">
    <blog-header :search_query="$route.params.id" />
    <div class="row">
      <div :class="$store.state.blog_settings.layout.search === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <div class="row">
          <div :class="list === 'grid' ? 'col-md-6' : 'col-md-12'" v-for="late in search_blog" :key="late.id">
            <search_article_card v-if="list === 'grid'" :title="late.title" :embed="late._embedded" />
            <search_article_card_row v-if="list === 'list'" :title="late.title" :embed="late._embedded" />
          </div>
          <div class="text-center col-md-12" v-if="search_blog.length === 0">
            <h1 class="display-4">Nothing found.</h1>
          </div>
        </div>
      </div>
      <aside v-if="$store.state.blog_settings.layout.search === 'content_widget'" class="col-lg-3">
        <widget-search v-if="$store.state.blog_settings.search_widgets.includes('search')" />
        <categories v-if="$store.state.blog_settings.search_widgets.includes('categories')" />
        <tags v-if="$store.state.blog_settings.search_widgets.includes('tags')" />
        <latest_post v-if="$store.state.blog_settings.search_widgets.includes('latest')" />
      </aside>
    </div>
    <div class="row" v-if="search_blog.length !== 0">
      <div class="col-12">
        <button class="btn btn-primary" :disabled="currentPage <= 1" @click="currentPage--; end = false; loadingB = true">Previous <i v-if="loadingB" class="icon-spin3 animate-spin"></i></button>
        <button class="btn btn-primary" :disabled="end" @click="currentPage++; loading = true;">More <i v-if="loading" class="icon-spin3 animate-spin"></i></button>
      </div>
    </div>
    <div class="row mt-4">
      <div :class="$store.state.blog_settings.layout.search === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <category_footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
