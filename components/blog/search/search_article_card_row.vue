<script>
  export default {
    name: 'article_card',
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
  <div class="strip list_view" style="min-height: 0 !important;">
    <div class="row g-0">
      <div class="col-lg-12">
        <div class="wrapper">
          <h3 v-if="Array.isArray(embed.self)"><a :href="'/blog/' + embed.self[0].slug" v-html="title" /></h3>
          <small v-if="Array.isArray(embed.self)">{{ embed.self[0].date|blog_list_date_format }}</small>
          <p v-if="Array.isArray(embed.self)" v-html="embed.self[0].excerpt.rendered"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
