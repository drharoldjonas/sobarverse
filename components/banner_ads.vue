<script>
export default {
  name: 'banner-ads',
  mounted() {
    this.$nextTick(() => {
      for (let i = 0; i < this.$store.state.banners.length; i++) {
        $(`#owl-slider-banner-ads`).owlCarousel({
          mouseDrag: false,
          center: true,
          touchDrag: false,
          startPosition: i,
          dots: false,
          loop: ( $('.owl-carousel .items').length > this.$store.state.banners.length ),
          rewind: true,
          autoplay: true,
          autoplayTimeout: (this.$store.state.settings.banners_ads.autoplayTimeout * 1000),
          items: 1,
          animateOut: "fadeOut",
          animateIn: "fadeIn",
        });
      }
    });
  }
}
</script>

<template>
  <div class="slider-wrapper">
    <div id="owl-slider-banner-ads" class="owl-carousel">
      <!-- Slider item one -->
      <div v-for="data in $store.state.banners" class="item" :key="data._id">
        <a :target="data.url ? '_blank' : '_self'" :href="data.url || `javascript:void(0)`" class="">
          <img class="img-fluid" :src="data.creative" :alt="data.label" />
        </a>
      </div>
      <!-- /.Slider item one -->
    </div>
  </div>
</template>

<style scoped>

</style>
