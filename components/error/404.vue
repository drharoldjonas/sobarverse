<template>
  <div class="error-404">
    <h2>404 <i class="icon_error-triangle_alt"></i></h2>
    <p>We're sorry, but the page you were looking for doesn't exist.</p>
    <form>
      <div class=" text-center">
        <nuxt-link to="/meetings/aa" type="button" class="btn_1">AA Meetings</nuxt-link>
        <nuxt-link to="/meetings/na" type="button" class="btn_1">NA Meetings</nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>

  export default {
    name: 'error-404',
    props: {
      error: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>
