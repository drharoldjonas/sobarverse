<script>
  export default {
    name: 'widget-search',
    data() {
      return {
        query_string: '',
        error: false,
        message: ''
      }
    },
    watch: {
      query_string(v) {
        if (v) {
          this.error = false
          this.message = ''
        }
      },
    },
    methods: {
      search() {
        if (!this.query_string) {
          this.error = true
          this.message = 'Please enter search query.'
          return
        }

        this.$router.push(`/blog/search/${this.query_string}`)
      },
      onlyNumber($event) {
        if ($event.keyCode === 13) {
          this.search()
        }
      },
    }
  }
</script>

<template>
  <div class="widget search_blog">
    <div class="form-group">
      <input type="text" name="search" id="search" @keypress="onlyNumber" v-model="query_string" class="form-control" :class="error ? 'is-invalid' : ''" placeholder="Search..">
      <span><input type="submit" value="Search" @click="search"></span>
      <small v-if="error" class="text-danger">{{ message }}</small>
    </div>
  </div>
</template>

<style scoped>

</style>

