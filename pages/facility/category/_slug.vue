<script>
import BannerAds from "../../../components/banner_ads.vue";

export default {
  components: {BannerAds},
  async asyncData({$axios, params}) {
    let [vendors, featured] = await Promise.all([
      $axios.$get(`/category/${params.slug}`, {params: {max: 6, page: 0}}),
      $axios.$get(`/featured`)
    ]).catch((err) => {
      console.log(err)
    })

    return {vendors: vendors.data, total: vendors.total, message: vendors.message, description: vendors.description, featured: featured.data}
  },
  head() {
    return {
      link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
    }
  },
  name: 'category',
  data() { return { page: 0 } },
  computed: {
    unSlug() {
      if (this.$route.params.slug) {
          let words = this.$route.params.slug.split('-');

          for (let i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
          }
          return words.join(' ');
      }
    }
  },
  mounted() {
    if (!this.vendors) {
      swal({title: "Notice", text: this.message, icon: "warning"}).then(() => {
        this.$router.push('/facility/category')
      })
    }
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
      this.$axios.$get(`/category/${this.$route.params.slug}`, { params: { max: 6, page: this.page += 1}}).then((d) => {
        this.vendors = this.vendors.concat(d.data)
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
      <h2 class="text-uppercase">Vendor Category <span class="h4"> > Results for: {{ unSlug }}</span> </h2>
      <hr />
    </div>

    <div class="row" v-if="description">
      <div class="col-12">
        <div class="box_faq">
          <i class="icon-info-circled-1" />
          <p v-html="description" />
        </div>
      </div>
    </div>

    <div class="row">
      <div v-if="!Array.isArray(vendors) && !vendors.length > 0 || Array.isArray(vendors) && vendors.length === 0" class="col-12 mt-5 mb-5">
        <h1 class="text-center">No Results Found</h1>
      </div>
      <div v-else class="col-12 col-md-6 col-lg-4 p-0 d-flex align-self-stretch" v-for="vendor in vendors" :key="vendor._id">
        <div class="card m-3 shadow w-100" style="border-radius: 5px;">
          <img v-if="vendor.profile && vendor.profile.logo" class="card-img-top img-fluid p-3" :src="vendor.profile.logo" alt="">
          <div class="card-body d-flex border-top flex-column">
            <div class="row">
              <div class="col-12">
                <small>{{ vendor.city }}, {{ vendor.state }}</small>
                <h4><a :href="'https://' + vendor.website" target="_blank">{{ vendor.name }}</a></h4>
              </div>
            </div>
            <div class="row mt-auto">
              <div class="col-6">
                <a v-if="vendor.phone" :href="`tel:${vendor.phone}`"><span class="btn_3 btn-sm p-1 text-uppercase text-primary">call</span></a>
              </div>
              <div class="col-6">
                <a :href="`mailto:${vendor.email}`"><span class="btn_3 btn-sm p-1 text-uppercase text-primary">email</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="Array.isArray(vendors) && vendors.length > 0 && total !== vendors.length" class="text-center"><a @click="load" class="btn_1 rounded add_top_30">Load more</a></p>
    <client-only>
      <InFeedAdsense
        ins-class="adsbygoogle"
        :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
        :data-ad-client="$store.state.settings.adsense.client_id"
        data-ad-format="fluid"
        :data-ad-slot="$store.state.settings.adsense.list_slot">
      </InFeedAdsense>
    </client-only>
    <div v-if="$store.state.settings.banners_ads.category_bottom === 'on'" class="row justify-content-center pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 ">
      <div class="col-8 col-lg-8">
        <banner-ads v-if="$store.state.settings.banners_ads.active === 'yes'"  />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  width: 100%;
  height: 18vh;
  object-fit: scale-down;
}
</style>
