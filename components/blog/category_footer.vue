<script>
  export default {
    name: 'footer-category',
    data() {
      return {
        data: []
      }
    },
    created() {
      this.$axios.$get(`/sober_blog/all-categories`).then((res) => {
        this.data = res.data
      })
    }
  }
</script>

<template>
  <div>
      <strong class="small font-weight-bold" style="font-size: 100% !important;">Categories: </strong><small class="m-0 font-italic" style="font-size: 100% !important;" v-for="cat in data" :key="cat.id"><nuxt-link :to="{ path: `/blog/category`, query: { id: cat.id } }"> #{{ cat.name }} </nuxt-link></small>
  </div>
</template>

<style scoped>

</style>
