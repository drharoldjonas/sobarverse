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
      <h2 class="text-uppercase">Directory <span class="h4"> > Results for: {{ category.name }}</span> </h2>
      <hr />
    </div>

    <div class="row" v-if="category.description">
      <div class="col-12">
        <div class="box_faq">
          <i class="icon-info-circled-1" />
          <p v-html="category.description" />
        </div>
      </div>
    </div>

    <div class="container margin_60_35 ssee">
      <!-- <FeaturedAds></FeaturedAds> -->
      <div class="row d-flex justify-content-center">
        <template v-for="item in items.data">
          <div v-if="item.subscription || item.spot" class="col-xl-4 col-lg-6 col-md-6 premium" :key="item._id">
            <nuxt-link target="_blank" :to="{ name: 'facility-id', params: { id: item.slug } }" class="grid_item small shadow">
              <figure>
                <img v-if="(item.subscription || item.spot) && item.profile && item.profile.logo" :src="item.profile.logo" onerror="this.onerror=null; this.src='/images/crowd.png'" alt="" />
                <img v-else src="/images/crowd.png" alt="" />
                <div class="info" style="background: transparent">
                  <small>{{ item.address }} {{ item.state }} {{ item.zip }}</small>
                  <h3>{{ item.name }}</h3>
                </div>
              </figure>
            </nuxt-link>
          </div>


<!--          Mine-->
          <div v-else class="col-xl-5 col-lg-6 col-md-6 d-flex align-self-stretch" :key="item._id">
            <article class="blog w-100">
              <div class="post_info">
<!--                <small>{{ vendor.city }}, {{ vendor.state }}</small>-->
                <h5>
                  <nuxt-link target="_blank" :to="{ name: 'facility-id', params: { id: item.slug } }">
                    {{ item.name }}
                  </nuxt-link>
                </h5>

                <ul>
                  <li class="pl-0"> <button class="btn_3 btn-sm p-1 text-uppercase"><a :href=" item.phone ? `tel:${item.phone}` : `javascript:void(0)`" v-text="'call'" /></button> </li>
                  <li> <span class="btn_3 btn-sm p-1 text-uppercase"><a :href="`mailto:${item.email}`" v-text="'email'" /></span> </li>
                </ul>
              </div>
            </article>


          </div>

        </template>
      </div>

      <p v-if="items.total != 0 && page + 1 < Math.ceil(items.total / max)" class="text-center">
        <a @click="more" class="btn_1 rounded add_top_30">Load more</a>
      </p>
        <client-only>
           <InFeedAdsense
            ins-class="adsbygoogle"
            :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
            :data-ad-client="$store.state.settings.adsense.client_id"
            data-ad-format="fluid"
            :data-ad-slot="$store.state.settings.adsense.list_slot">
          </InFeedAdsense>
       </client-only>
      <div v-if="$store.state.settings.banners_ads.directory_bottom === 'on'" class="row justify-content-center pt-lg-5 pb-lg-3 pt-md-5 pb-md-5 ">
        <div class="col-9 col-lg-8">
          <banner-ads v-if="$store.state.settings.banners_ads.active === 'yes'"  />
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import constants from "~/constants";
import FeaturedAds from "~/components/FeaturedAds";
import BannerAds from "../../components/banner_ads.vue";

export default {
  validate({ params }) {
    // Must be a number
    return /^[a-z]/.test(params.slug);
  },
  components: {
    BannerAds,
    FeaturedAds,
  },
  asyncData({ params, error, $axios, redirect }) {
    let URL1 = `/facilities/${params.slug}`;
    let URL2 = `/featured`;

    const fetchURL = (url) =>
      $axios.get(url, { params: { max: 24, orderby: { profile: -1 } } });

    const promiseArray = [URL1, URL2].map(fetchURL);

    return Promise.all(promiseArray)
      .then((res) => {
        var items = res[0].data.data || [];
        var category = res[0].data.category || {};
        var featured = res[1].data.data || [];
        return { items: items, featured: featured, category: category };
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    console.log('sof')
    this.$nextTick(() => {
      // Sticky horizontal results list page or detail page
      $("#results").stick_in_parent({
        offset_top: 0,
      });

      for (var i = 0; i < this.featured.length; i++) {
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
  },
  head() {
    return {
      title: `${this.category.name} Find the best care right now`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Complete list of ${this.category.name} with reviews, pictures, and cost information. Find the perfect fit at Sober.com right now!`,
        },
      ],
      link: [ { rel: 'stylesheet', href: '/css/blog.css' } ]
    };
  },
  data() {
    return {
      states: constants.states,
      form: {
        category: "",
        state: "",
      },
      place: null,
      filters: {},
      category: {},
      max: 12,
      page: 0,
      items: {
        total: 0,
        data: [],
      },
    };
  },
  methods: {
    isActive: function (item) {
      if (item.subscription || item.spot) return true;
      return false;
    },
    advanceSearch: function (e) {
      this.$router.push({ name: "directory-search", query: this.form });
      e.preventDefault();
    },
    more: function () {
      console.log("loading more");
      this.page++;
      this.$nuxt.$loading.start();
      var request = {
        max: this.max,
        page: this.page,
        orderby: { profile: -1 },
        sSearch: null,
        filters: {},
      };
      this.$axios
        .get(`/facilities/${this.$route.params.slug}`, { params: request })
        .then((res) => {
          this.items.data = this.items.data.concat(res.data.data.data);
          this.$nuxt.$loading.finish();
        })
        .catch((err) => {
          this.$nuxt.$loading.finish();
          console.log(err);
        });
    },
    setPlace: function (place) {
      this.place = place;
      this.form.lat = place.geometry.location.lat();
      this.form.lng = place.geometry.location.lng();
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.cta-custom {
  display: block;
  background: #000 url(https://sober.com/images/rehab.jpg) 70% center no-repeat;
}
.cta-custom .in {
  display: flex;
  flex-direction: column;
  height: 280px;
  background: rgba(0, 0, 0, 0.35);
  font-weight: 700;
}
.cta-custom .line1 {
  font-size: 30px;
  line-height: 1.1;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 0 10px rgb(0 0 0 / 25%);
  color: #fff;
  padding: 30px 0 60px;
}
.cta-custom .line2 {
  font-size: 18px;
  line-height: 1.3;
  text-align: center;
  text-shadow: 0 0 10px rgb(0 0 0 / 50%);
  color: #ffc107;
  padding: 0 5px;
}
.cta-custom .line3 {
  font-size: 23px;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 0 rgb(0 0 0 / 15%);
  margin: auto;
  width: 220px;
  background: #004dda;
  border-radius: 50px;
  border: 3px solid #ffc107;
  transition: all 0.2s;
}
.cta-custom:hover .line3 {
  color: #004dda;
  background-color: #ffc107;
  text-shadow: none;
}
@media (min-width: 480px) {
  .cta-custom .line1 {
    padding: 30px 20px 70px;
  }
}
@media (min-width: 576px) {
  .cta-custom .line1 {
    padding: 50px 20px 80px;
  }
}
@media (min-width: 768px) {
  .cta-custom {
    background-position: center center;
  }
  .cta-custom .line1 {
    text-align: left;
    font-size: 35px;
    padding: 30px 0 80px 30px;
  }
  .cta-custom .line2 {
    text-align: left;
    font-size: 20px;
    padding: 0 0 0 30px;
  }
  .cta-custom .line3 {
    font-size: 25px;
    width: 240px;
    margin: auto auto auto 30px;
    padding: 2px 0;
  }
}
@media (min-width: 992px) {
  .cta-custom .line1 {
    padding: 30px 0 80px 60px;
  }
  .cta-custom .line2 {
    padding: 0 0 0 60px;
  }
  .cta-custom .line3 {
    margin: auto auto auto 60px;
  }
}
.premium a.grid_item.small .info h3 {
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 15px;
  background-color: #004dda;
  line-height: 1;
  padding: 3px 5px 2px 5px;
}
.premium a.grid_item.small .info {
  background: transparent;
}
.premium a.grid_item.small {
  height: 200px;
  background: #fff;
}
</style>
