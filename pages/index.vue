<template>
  <div class="home" style="background: #fff">
    <section class="hero_single version_5">
      <div class="wrapper">
        <div class="container">
          <div v-if="$store.state.settings.banners_ads.home_top === 'on'" class="row justify-content-center pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 ">
            <div class="col-8 col-lg-8">
              <banner-ads v-if="$store.state.settings.banners_ads.active === 'yes'"  />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-xl-7 col-lg-8">
              <h3>WHERE HELP FOR ADDICTION STARTS!</h3>
              <!--              <p>Discover the best treatment center for your needs</p>-->
              <div>
                <p>I'm seeking help for...</p>
                <a
                  class="btn_1"
                  @click="match('Myself')"
                  style="cursor: pointer"
                  >Myself</a
                >

                <a
                  class="btn_1"
                  @click="match('Someone else')"
                  style="cursor: pointer"
                  >Someone else</a
                >
              </div>
              <div>
                <a
                  class="btn_1 mt-2"
                  href="https://soberverse.com/community/signup"
                  target="_blank"
                  style="cursor: pointer"
                  >Join The SoberVerse</a
                >
              </div>
            </div>
            <div class="col-xl-5 col-lg-6 text-right d-none d-lg-block"></div>
          </div>
        </div>
      </div>
    </section>
    <section style="background: #f8f8f8">
      <div class="container margin_60_35">
        <div class="row">
          <div class="col-md-12">
            <!-- <a class="cta-custom" href="tel:+18009436094">
              <span class="in">
                <span class="line1">Suffering From Addiction?</span>
                <span class="line2">Speak to a Specialist & Get Help Now!</span>
                <span class="line3">800-943-6094</span>
              </span>
            </a> -->
            <div v-if="$store.state.settings.adsense">
              <client-only>
                <InFeedAdsense
                  ins-class="adsbygoogle"
                  :data-ad-layout-key="
                    $store.state.settings.adsense.list_slot_layout
                  "
                  :data-ad-client="$store.state.settings.adsense.client_id"
                  data-ad-format="fluid"
                  :data-ad-slot="$store.state.settings.adsense.list_slot"
                >
                </InFeedAdsense>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="container margin_60_350">
        <div class="row">
          <div class="col-lg-12 col-sm-12">
            <div class="main_title_3">
              <span></span>
              <h2>Featured</h2>
              <p>Featured listing</p>
            </div>
            <div class="row add_bottom_30">
              <template v-for="indexs in 6">
                <div class="slider-wrapper col-sm-4" :key="indexs">
                  <div :id="'owl-slider-' + indexs" class="owl-carousel">
                    <!-- Slider item one -->
                    <div
                      v-for="(data, index) in featured"
                      class="item"
                      :key="index"
                    >
                      <nuxt-link
                        target="_blank"
                        :to="{ name: 'facility-id', params: { id: data.slug } }"
                        class="grid_item small"
                        style="
                          box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1) !important;
                          background: #fff !important;
                        "
                      >
                        <figure>
                          <img
                            style="width: 200px; height: auto"
                            v-if="data.profile && data.profile.logo"
                            :src="data.profile.logo"
                            alt=""
                          />
                          <img
                            v-else
                            src="/images/logo.png"
                            style="width: 200px; height: auto"
                            alt=""
                          />
                          <div class="info" style="background: none">
                            <!--<div class="cat_star" style="display: inline-block;">-->
                            <!--<Rating :value="item.review ? item.review.avg : 0"></Rating>-->
                            <!--</div>-->
                            <h3 style="color: #000000">{{ data.name }}</h3>
                          </div>
                        </figure>
                      </nuxt-link>
                    </div>
                    <!-- /.Slider item one -->
                  </div>
                </div>
                <!--<div v-if="item" class="col-sm-6" :key="index">-->
                <!--<nuxt-link target="_blank" :to="{name: 'facility-id', params: {id: item.slug}}" class="grid_item small" style="box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1) !important; background: #fff !important;">-->
                <!--<figure>-->
                <!--<img v-if="item.profile && item.profile.images && item.profile.images.length" :src="item.profile.images[0]" alt="">-->
                <!--<img v-else src="/images/SOBER-LOGO.png" alt="">-->
                <!--<div class="info" style="background: none;">-->
                <!--&lt;!&ndash;<div class="cat_star" style="display: inline-block;">&ndash;&gt;-->
                <!--&lt;!&ndash;<Rating :value="item.review ? item.review.avg : 0"></Rating>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--<h3 style="color: #000000;">{{ item.name }}</h3>-->
                <!--</div>-->
                <!--</figure>-->
                <!--</nuxt-link>-->
                <!--</div>-->
              </template>
            </div>
          </div>
          <!-- <div class="col-lg-4 col-sm-12">
            <div class="ad-block p-0">
              <client-only>
               <Adsense
                  ins-class="adsbygoogle"
                  :data-ad-client="$store.state.settings.adsense.client_id"
                  :data-full-width-responsive="true"
                  data-ad-format="auto"
                  :data-ad-slot="$store.state.settings.adsense.responsive_slot"
                >
                </Adsense>
        <img
        src="/images/rehab2.jpg"
        alt=""
        class="img-fluid shadow-lg m-0"

        />

              </client-only>
            </div>
          </div>-->
        </div>

        <!-- /row -->
      </div>
    </section>
    <div class="main_categories mt-4">
      <div class="container">
        <ul class="clearfix">
          <li>
            <nuxt-link
              :to="{
                name: 'directory-slug',
                params: { slug: 'detox_centers' },
              }"
            >
              <!--<i class="icon-shop"></i>-->
              <h3>Detox</h3>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'directory-slug', params: { slug: 'drug_alcohol' } }"
            >
              <!--<i class="icon-lodging"></i>-->
              <h3>Treatment</h3>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'directory-slug', params: { slug: 'outpatient' } }"
            >
              <!--<i class="icon-restaurant"></i>-->
              <h3>Outpatient</h3>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{ name: 'directory-slug', params: { slug: 'housing' } }"
            >
              <h3>Housing</h3>
            </nuxt-link>
            <!--            <nuxt-link to="/get-sober">-->
            <!--              &lt;!&ndash;<i class="icon-bar"></i>&ndash;&gt;-->
            <!--              <h3>Epic</h3>-->
            <!--            </nuxt-link>-->
          </li>
          <li>
            <a
              class="dropdown-toggle"
              type="button"
              id="menu1"
              data-toggle="dropdown"
            >
              <h3>More</h3>
            </a>
            <div>
              <ul
                class="dropdown-menu"
                role="menu"
                aria-labelledby="menu1"
                style="width: 100%; top: 20px"
              >
                <!--                <li role="presentation">-->
                <!--                  <nuxt-link :to="{name: 'directory-slug', params: { slug: 'housing' } }">-->
                <!--                    <h3>Housing</h3>-->
                <!--                  </nuxt-link>-->
                <!--                </li>-->
                <li role="presentation">
                  <nuxt-link
                    :to="{
                      name: 'directory-slug',
                      params: { slug: 'adolescent_treatment' },
                    }"
                  >
                    <h3>Adolescent</h3>
                  </nuxt-link>
                </li>
                <li role="presentation">
                  <nuxt-link
                    :to="{
                      name: 'directory-slug',
                      params: { slug: 'non12step' },
                    }"
                  >
                    <h3>Non 12 Step</h3>
                  </nuxt-link>
                </li>
                <li role="presentation">
                  <nuxt-link
                    :to="{
                      name: 'directory-slug',
                      params: { slug: 'alternative_treatment' },
                    }"
                  >
                    <h3>Alternative</h3>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- /container -->
    </div>

    <section>
      <div class="container margin_60_35">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="rehab-state">
              <h2>Find treatment by state</h2>
              <p>
                Find treatment near you for drug abuse, alcoholism and
                addiction.
              </p>
              <ul class="ul-md-4 ul-sm-3 ul-xs-2">
                <li
                  v-for="(state, index) in states"
                  :key="index"
                  @click="
                    $router.push({
                      path: '/directory/search',
                      query: { state: state.code },
                    })
                  "
                  style="cursor: pointer"
                >
                  <nuxt-link
                    :to="{
                      path: '/directory/search',
                      query: { state: state.code },
                    }"
                    class="item-link"
                    style="
                      font-family: 'Poppins', Helvetica, sans-serif;
                      font-size: 0.875rem;
                    "
                  >
                    {{ state.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style="background: #f8f8f8">
      <div class="container margin_60_35">
        <div class="main_title_2">
          <span><em></em></span>
          <h2>NEVER BE ALONE AGAIN</h2>
          <a
            class="btn_1"
            :href="`tel:${$store.state.settings.general.support_number}`"
            >{{ $store.state.settings.general.support_text }} CALL:
            {{ $store.state.settings.general.support_number }}</a
          >
        </div>
      </div>
      <div class="container margin_60_35 pt-0">
        <div class="row">
          <div class="col-sm-12">
            <div class="main_title_3">
              <span></span>
              <h2>Blogs</h2>
              <p>Latest blog posts</p>
            </div>
            <Blog></Blog>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container margin_60_35">
        <div class="main_title_2">
          <span><em></em></span>
          <h2>BECOME THE WINNER YOU WERE MEANT TO BE</h2>
          <a class="btn_1" :href="`tel:${$store.state.settings.general.support_number}`"
            >{{ $store.state.settings.general.support_text }} CALL:
            {{ $store.state.settings.general.support_number }}</a
          >
        </div>
        <div class="row justify-content-center text-center">
          <div class="col-md-12">
            <div v-if="$store.state.settings.adsense">
              <client-only>
                <InFeedAdsense
                  ins-class="adsbygoogle"
                  :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
                  :data-ad-client="$store.state.settings.adsense.client_id"
                  data-ad-format="fluid"
                  :data-ad-slot="$store.state.settings.adsense.list_slot"
                >
                </InFeedAdsense>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section></section>
    <Lightbox />
  </div>
</template>

<style>
.iframe-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}
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

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.bottom_aid {
  height: 250px;
  width: 100%;
}
.main_categories .dropdown-toggle::after {
  display: none;
}

.main_categories .dropdown-menu li {
  width: 25%;
}
@media (max-width: 927px) {
  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }
}

.hero_single {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), 20%, rgb(248, 248, 248, 1), 100%, transparent) !important;
  //background: url(/images/home_clear.png) center center no-repeat !important;
  background-size: inherit !important;
}
.newimg {
  background: url(/images/bg.jpg) !important;
  background-size: cover !important;
}
.wparticleText a {
  color: #fff700 !important;
}
@media only screen and (max-width: 767px) {
  .main_categories {
    display: none;
  }
}
.cat-star ul,
ol {
  margin: 0px;
}
.home video {
  opacity: 0.7 !important;
}
.a.grid_item .info {
  background: -webkit-linear-gradient(top, transparent, #00000052);
  background: linear-gradient(to bottom, transparent, #00000052);
}
.rehab-state ul li {
  display: block;
  height: 35px;
  padding-top: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #f9f9f9;
  width: 24.5%;
  padding-left: 16px;
  text-align: left;
  margin: 0 0.5% 0.5% 0;
}
.rehab-state ul li:after {
  display: inline-block;
  height: 0;
  vertical-align: 0.255em;
  font: normal normal normal 15px/1 FontAwesome;
  font-weight: 900;
  content: "\f054";
  border: 0;
  margin-right: 16px;
  text-align: right;
  float: right;
  margin-top: 3px;
}
.ul-md-4 {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.ul-md-4 {
  height: 100%;
  padding: 0;
  margin-top: 15px;
  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;
  column-gap: 103px;
}

.rehab-state ul li a {
  font-size: 16px;
  color: #222;
  text-decoration: none;
  font-family: Roboto, Open Sans, Helvetica Neue, "sans-serif";
  font-weight: 400;
}
/*a.grid_item.small {*/
/*height: 270px;*/
/*}*/
</style>

<script>
import Blog from "../components/Blog";
import constants from "~/constants";
import Lightbox from "../components/Lightbox";
import BannerAds from "../components/banner_ads.vue"
import axios from "axios";

export default {
  components: {
    Blog,
    Lightbox,
    BannerAds
    //Rating
  },
  async asyncData({ params, error, $axios }) {
try {   
 return await $axios
      .get(`/featured`, { params: { filters: { sample: 10 } } })
      .then((res) => {
        return { featured: res.data ? res.data.data : [] };
      });
} catch(e) {
console.log(e)
      return { featured: [], error: e };
}
  },
  computed: {
    settings: function () {
      return this.$store.state.settings;
    },
  },
  async mounted() {
    await axios.get("/api/featured").then((res) => {
      console.log("reab");
      return { featured: res.data ? res.data.data : [] };
    });

    // $('#sign-in').click();
    // $('.mfp-close').click();
    //
    this.$nextTick(() => {
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

      setTimeout(() => {
        this.toggle();
      }, 600);
    });
  },
  data() {
    return {
      states: constants.states,
      province: constants.province,
      videos: [],
      featured: [],
      video: {},
      place: null,
      form: {
        category: "",
        state: "",
        name: "",
      },
    };
  },
  head() {
    return {
      meta: [
        { property: "og:image", content: "https://sober.com/images/logo.png" },
      ],
    };
  },
  methods: {
    open() {
      $("#exampleModal").modal("show");
    },
    async match(seeking) {
      await this.$store.dispatch("SET_SEEKING", seeking);
      this.$router.push("/match");
    },
    toggle() {
      $(".feedback_form_area, .feedback-overlay").animate({
        width: "toggle",
      });
    },
    advanceSearch: function (e) {
      // console.log(e);
      this.$router.push({ name: "directory-search", query: this.form });
      e.preventDefault();
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
