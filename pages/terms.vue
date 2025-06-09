<template>
  <div>
    <section class="hero_single version_4">
      <div class="wrapper">
        <div class="container">
          <div class="text-center">
            <h3 class="text-left">Website Terms And Conditions Of Use</h3>
            <p class="text-left">Revised as of	{{ terms.updated | format_date }}</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container margin_60_35" v-html="terms.content"></div>
    </section>
  </div>
</template>

<script>
  export default {
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/terms`).then((res) => {
        return { terms: res.data.data }
      }).catch((e) => {
        console.log(e)
      })
    },
    head: {
      title: `Terms and conditions`,
    },
    components: {},
    data () {
      return {
        terms: {}
      }
    },
    methods: {}
  }
</script>
