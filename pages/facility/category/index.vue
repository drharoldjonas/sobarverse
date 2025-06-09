<script>
export default {
  async asyncData({$axios}) {
    let [categories, featured] = await Promise.all([
      $axios.$get(`/category`, {params: {max: 6, page: 0}}),
      $axios.$get(`/featured`)
    ]).catch((err) => {
      console.log(err)
    })

    return {categories: categories.data, total: categories.total, featured: featured.data}
  },
  head() {
    return {
      link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
    }
  },
  name: 'CategoryList',

  data() {
    return {
      max: 6,
      page: 0
    }
  },

  mounted() {
    if (this.featured.length > 0) {
      this.$nextTick(() => {
        // Sticky horizontal results list page or detail page
        $("#results").stick_in_parent({
          offset_top: 0,
        });

        for (let i = 0; i < this.featured.length; i++) {
          $(`#owl-slider-${i + 1}`).owlCarousel({
            mouseDrag: false,
            center: true,
            touchDrag: false,
            startPosition: i,
            dots: false,
            loop: true,
            autoplay: true,
            autoplayTimeout: 12000,
            items: 1,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
          });
        }
      });
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/category`, { params: { max: this.max, page: this.page += 1}}).then((d) => {
        this.categories = this.categories.concat(d.data)
      })
    }
  }
}
</script>

<template>
  <div class="container margin_60_35">
    <div class="row mb-3 d-flex justify-content-center">
      <!-- Featured Content Slider -->
      <template v-for="indexs in 3">
        <div class="col-xl-4 col-lg-6 col-md-6 premium" :key="indexs">
          <div :id="'owl-slider-' + indexs" class="owl-carousel">
            <!-- Slider item one -->
            <div v-for="(item, index) in featured" class="item" :key="index">
              <nuxt-link target="_blank" :to="{ name: 'facility-id', params: { id: item.slug } }" class="grid_item small shadow">
                <figure>
                  <img
                    v-if="item.profile && item.profile.logo"
                    :src="item.profile.logo"
                    onerror="this.onerror=null; this.src='/images/crowd.png'"
                    alt=""
                  />
                  <img v-else src="/images/crowd.png" alt="" />
                  <div class="info">
                    <small>
                      {{ item.address }} {{ item.state }} {{ item.zip }}
                    </small>
                    <h3>{{ item.name }}</h3>
                  </div>
                </figure>
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>
      <!-- Featured Content Slider -->
    </div>

    <div class="row mb-4">
      <h2 class="text-uppercase">Vendor Categories </h2>
      <hr />
    </div>

    <div class="row">
      <div v-if="!Array.isArray(categories) && !categories.length > 0 || Array.isArray(categories) && categories.length === 0" class="col-12 mt-5 mb-5">
        <h1 class="text-center">No Results Found</h1>
      </div>
      <div v-else class="col-12 col-md-6 col-lg-4 p-0 d-flex align-self-stretch" v-for="cat in categories" :key="cat._id">
        <div class="card m-3 shadow w-100" style="border-radius: 5px;">
          <img class="card-img-top img-fluid p-3" src="/images/blog-default-image-list.png" alt="">
          <div class="card-body d-flex border-top flex-column">
            <div class="row">
              <div class="col-12">
                <h4><nuxt-link :to="`/facility/category/${cat.slug}`" v-text="cat.name"/></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="Array.isArray(categories) && categories.length > 0 && total !== categories.length" class="text-center"><a @click="load" class="btn_1 rounded add_top_30">Load more</a></p>
  </div>
</template>

<style scoped>

</style>
