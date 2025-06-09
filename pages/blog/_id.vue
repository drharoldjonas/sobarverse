<script>
  import tags from "../../components/blog/widgets/tags.vue";
  import categories from "../../components/blog/widgets/categories.vue";
  import category_footer from "../../components/blog/category_footer.vue";
  import BlogHeader from "../../components/blog/blog_header.vue";
  import latest_post from "../../components/blog/widgets/latest_post.vue";
  import WidgetSearch from "../../components/blog/widgets/search.vue";

  export default {
    components: {WidgetSearch, latest_post, BlogHeader, category_footer, categories, tags},
    async asyncData({$axios, params}) {
      let [ single_post ] = await Promise.all([
        $axios.$get(encodeURI(`/sober_blog/single-post/${params.id}`))
      ]).catch((err) => {
        console.log(err)
      })

      return { single_post: single_post.data }
    },

    head() {
      return {
        link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
      }
    },

    name: 'single-post'
  }
</script>

<template>
  <div class="container margin_60_35">
    <blog-header />
    <div class="row">
      <div :class="$store.state.blog_settings.layout.blog === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <div class="singlepost">
          <figure><img v-if="single_post._embedded['wp:featuredmedia']" alt="" class="img-fluid" :src="single_post._embedded['wp:featuredmedia'][0].source_url"></figure>
          <h1 v-html="single_post.title.rendered"></h1>
          <div class="postmeta">
            <ul>
              <li v-if="single_post._embedded['wp:term']"><a href="#"><i class="ti-folder"></i> {{ single_post._embedded['wp:term'][0]['0'].name }}</a></li>
              <li><a href=""><i class="ti-calendar"></i> {{ single_post.date|blog_list_date_format }}</a></li>
              <li v-if="single_post._embedded.author"><a href=""><i class="ti-user"></i> {{ single_post._embedded.author[0].name }}</a></li>
              <li v-if="single_post.comment_status === 'closed'"><a href="">Comments Closed</a></li>
              <li v-else><a href="#"><i class="ti-comment"></i> (14) Comments</a></li>
            </ul>
          </div>
          <!-- /post meta -->
          <div class="post-content">
            <div class="dropcaps">
              <p v-html="single_post.content.rendered"></p>
            </div>
          </div>
        </div>
      </div>
      <aside v-if="$store.state.blog_settings.layout.blog === 'content_widget'" class="col-lg-3">
        <widget-search v-if="$store.state.blog_settings.blog_widgets.includes('search')" />
        <categories v-if="$store.state.blog_settings.blog_widgets.includes('categories')" :settings="$store.state.blog_settings.widget_settings" />
        <tags v-if="$store.state.blog_settings.blog_widgets.includes('tags')" :settings="$store.state.blog_settings.widget_settings" />
        <latest_post v-if="$store.state.blog_settings.category_widgets.includes('latest')" />
      </aside>
    </div>
    <div class="row mt-4">
      <div :class="$store.state.blog_settings.layout.blog === 'content_widget' ? 'col-lg-9' : 'col-lg-12'">
        <category_footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
