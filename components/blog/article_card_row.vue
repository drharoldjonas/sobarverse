<script>
  export default {
    name: 'article_card',
    props: ['title', 'slug', 'excerpt', 'featured', 'date', 'comments']
  }
</script>

<template>
  <div class="strip list_view">
    <div class="row g-0">
      <div class="col-lg-5">
        <figure v-if="featured['wp:featuredmedia']">
          <a :href="'/blog/' + slug"><img :src="featured['wp:featuredmedia'][0].source_url" class="img-fluid" alt=""><div class="read_more"><span>Read more</span></div></a>
        </figure>
        <figure v-else>
          <a :href="'/blog/' + slug"><img src="/images/blog-default-image-list.png" class="img-fluid" alt=""><div class="read_more"><span>Read more</span></div></a>
        </figure>
      </div>
      <div class="col-lg-7">
        <div class="wrapper">
          <h3><a :href="'/blog/' + slug" v-html="title.rendered" /></h3>
          <small>{{ featured['wp:term'][0]['0'].name }} - {{ date|blog_list_date_format }}</small>
          <p v-html="excerpt.rendered"></p>
        </div>
        <ul>
          <li v-if="comments !== 'closed'" class="my-auto"><i class="ti-comment"></i>20</li>
          <li v-else>No Comments</li>
          <li><div class="score"><span class="my-auto"> {{ featured.author[0].name }}</span></div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
