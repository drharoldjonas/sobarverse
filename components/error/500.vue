<template>
  <div class="error-500">
    <h2>Oops <i class="icon_error-triangle_alt"></i></h2>
    <p>There was a problem serving your request. Please try again later.</p>
  </div>
</template>
<script>

  export default {
    name: 'error-500',
    props: {
      error: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>
