<script>
  export default {
    name: 'blog-header',
    props: ['search_query']
  }
</script>

<template>
  <div>
    <h2 class="text-uppercase">Sober Blog <a href="/blog"><i class="ti-home" /></a> <span class="h4" v-if="search_query"> > Search Results for: {{ search_query }}</span> </h2>
    <hr />
  </div>
</template>

<style scoped>

</style>
