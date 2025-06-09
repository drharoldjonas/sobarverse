<template>
  <div>
    <section class="hero_single version_4">
      <div class="wrapper">
        <div class="container">
          <h3 class="text-left">Privacy Policy</h3>
          <strong><p class="text-left">This Privacy Policy is effective as of	{{ privacy.updated | format_date }}</p></strong>
        </div>
      </div>
    </section>
    <section>
      <div class="container margin_60_35" v-html="privacy.content"></div>
    </section>
  </div>
</template>

<script>
  export default {
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/privacy`).then((res) => {
        return { privacy: res.data.data }
      }).catch((e) => {
        console.log(e)
      })
    },
    head: {
      title: `Privacy Policy`,
    },
    components: {},
    data () {
      return {
        privacy: {}
      }
    },
    methods: {}
  }
</script>
