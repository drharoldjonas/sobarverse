<script>
  export default {
    name: 'search_article_card_grid',
    props: {
      title: {
        type: String,
        required: true
      },
      embed: {
        type: Object,
        required: true
      }
    }
  }
</script>

<template>
  <article class="blog">
    <div class="post_info">
      <small v-if="Array.isArray(embed.self)">{{ embed.self[0].date|blog_list_date_format }}</small>
      <h2 v-if="Array.isArray(embed.self)"><a :href="'/blog/' + embed.self[0].slug" v-html="title" /></h2>
      <p v-if="Array.isArray(embed.self)" v-html="embed.self[0].excerpt.rendered"></p>
    </div>
  </article>
</template>

<style scoped>

</style>
