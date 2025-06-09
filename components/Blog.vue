<template>
  <div class="row">
    <div class="col-md-4 d-flex align-self-stretch" v-for="(blog, index) in blogs" :key="index">
      <article class="blog">
        <div class="post_info">
          <small>Published - {{ blog.date || format_date }}</small>
          <h2><a :href="`/blog/${blog.slug}`" v-html="blog.title.rendered"></a></h2>
          <p class="mb-0 mt-3" v-html="blog.excerpt.rendered"></p>
        </div>
      </article>
      <!-- /article -->
    </div>
  </div>
</template>

<style>
  .blog li {
    margin-bottom: 10px;
  }
  .blog .main_title_3 a {
    left: 0;
  }
</style>

<script>
  export default {
    head() {
      return {
        link: [
          { rel: 'stylesheet', href: '/css/blog.css' },
        ]
      }
    },
    components: {},
    data () {
      return {
        blogs: []
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      search() {
        this.$axios.get(`blog`).then((res) => {
          this.blogs = (res.data.data) ? res.data.data : [];
        })
      }
    }
  }
</script>
