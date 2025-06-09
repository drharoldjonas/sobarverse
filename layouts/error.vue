<template>
  <div id="error_page">
    <div class="wrapper">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-xl-7 col-lg-9">
            <component :is="errorPage" />
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>
    <!-- /wrapper -->
  </div>
  <!-- /error_page -->
</template>

<script>
  import error404 from '~/components/error/404.vue';
  import error500 from '~/components/error/500.vue';
  export default {
    name: 'nuxt-error',
    layout: 'default', // optional
    props: {
      error: {
        type: Object,
        default: () => {
        },
      },
    },
    computed: {
      errorPage() {
        if (this.error.statusCode === 404) {
          return error404;
        }
        // catch everything else
        return error500;
      },
    }
  };
</script>
