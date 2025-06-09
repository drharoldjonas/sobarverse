<script>
  export default {
    name: 'article_card',
    props: ['title', 'slug', 'excerpt', 'featured', 'date', 'comments']
  }
</script>

<template>
  <article class="blog">
    <figure>
      <a v-if="featured['wp:featuredmedia']" :href="'/blog/' + slug"><img :src="featured['wp:featuredmedia'][0].source_url" alt="">
        <div class="preview"><span>Read more</span></div>
      </a>
      <a v-else :href="'/blog/' + slug"><img src="/images/blog-default-image.png" alt="">
        <div class="preview"><span>Read more</span></div>
      </a>
    </figure>
    <div class="post_info">
      <small>{{ featured['wp:term'][0]['0'].name }} - {{ date|blog_list_date_format }}</small>
      <h2><a :href="'/blog/' + slug" v-html="title.rendered" /></h2>
      <p v-html="excerpt.rendered"></p>
      <ul>
        <li>
          <div class="thumb"><img :src="featured.author[0].avatar_urls['48']" alt=""></div> {{ featured.author[0].name }}
        </li>
        <li v-if="comments !== 'closed'"><i class="ti-comment"></i>20</li>
        <li v-else>No Comments</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>

</style>
