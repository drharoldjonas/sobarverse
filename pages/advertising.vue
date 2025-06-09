<template>
  <div class="container margin_60_35">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-left">
          <h2>Why advertise on Sober.com?</h2>
          <div class="advertise-underline"></div>
        </div>
        <div class="col-lg-12 why-advertise-sober">
          <div class="row">
            <div class="col-xs-12 col-sm-4 why-sober">
              <div class="col-xs-12 col-sm-3 text-center main-icon">
                <img src="/images/Advertising/cost_effective.svg">
              </div>
              <div class="row-info col-xs-12 col-sm-9">
                <h3>Cost Effective </h3>
                <p>Rates start at as little as $1.00 per day. Much less than pay per click ads.</p>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 why-sober">
              <div class="col-xs-12 col-sm-3 text-center main-icon">
                <img src="/images/Advertising/colective_marketing_tool.svg">
              </div>
              <div class="row-info col-xs-12 col-sm-9">
                <h3>Collective Marketing Tool </h3>
                <p>You will gain national, regional and local exposure</p>
              </div>
            </div>
            <div class="col-xs-12  col-sm-4 why-sober">
              <div class="col-xs-12 col-sm-3 text-center main-icon">
                <img src="/images/Advertising/brand_awareness.svg">
              </div>
              <div class="row-info col-xs-12 col-sm-9">
                <h3>Brand Awareness</h3>
                <p>Great exposure for you on the most trusted recovery website</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 subtitle-sober" v-if="$store.state.settings.general && $store.state.settings.advertise">
          <h4>We are growing!</h4>
          <div class="img-traffic">
            <div class="row">
              <img class="col-xs-12 col-sm-6 img-responsive" v-if="$store.state.settings.advertise.graph1" :src="$store.state.settings.advertise.graph1">
              <img class="col-xs-12 col-sm-6 img-responsive" v-if="$store.state.settings.advertise.graph2" :src="$store.state.settings.advertise.graph2">
            </div>
          </div>
          <div class="subtitle-margin">
            <div class="sober-info">
              <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
              <p>Sober.com has been online since 2000 and is the oldest drug and alcohol rehab site on the internet.</p>
            </div>
            <div class="sober-info">
              <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
              <p>We are dedicated to combating the disease of addiction and the attached stigma by providing information, education and hope to the public.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-12 text-left">
          <h2>Advertising Options</h2>
          <div class="options-underline"></div>
        </div>
        <div class="col-lg-12 subtitle-margin">
          <div class="subtitle-sober">
            <h4>Sober calls</h4>
          </div>
          <div class="sober-info">
            <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
            <p>Sober.com has been online since 2000 and is the oldest drug and alcohol rehab site on the internet.</p>
          </div>
        </div>
        <div class="col-lg-12 subtitle-margin">
          <div class="subtitle-sober">
            <h4>Enhanced Listing (available by state, region or national)</h4>
          </div>
          <div class="sober-info">
            <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
            <p>Link to Website</p>
          </div>
          <div class="sober-info">
            <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
            <p>Contact form for consumers to reach out to you directly</p>
          </div>
          <div class="sober-info">
            <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
            <p>Graphic logo (120x60)</p>
          </div>
          <div class="sober-info">
            <img class="hidden-xs" src="/images/Advertising/arrow_blue.svg">
            <p>3,000 character narrative about your facility</p>
          </div>
        </div>

        <!--<div class="subtitle-sober banners-subtitle">-->
          <!--<h4>Banner sizes available on Sober.com</h4>-->
        <!--</div>-->
        <!--<div class="banners col-lg-12">-->
          <!--<div class="row">-->
            <!--<div class="col-lg-4">-->
              <!--<img class="img-responsive" src="/images/Advertising/banner1.svg">-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
              <!--<img class="img-responsive" src="/images/Advertising/banner2.svg">-->
            <!--</div>-->
            <!--<div class="col-lg-4">-->
              <!--<img class="img-responsive" src="/images/Advertising/banner3.svg">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <div class="text-left">
          <h2>Contact Us</h2>
          <div class="contact-underline"></div>
          <div class="subtitle-sober additional-information">
            <h4>For additional information, please contact us at</h4>
          </div>
          <div class="contact-info">
            <img src="/images/Advertising/mail.svg">
            <p><a href="mailto:salesoffice@sober.com">salesoffice@sober.com</a></p>
          </div>
          <div class="contact-info">
            <img src="/images/Advertising/telephone.svg">
            <p><a href="tel:866-762-3747">866-762-3747 ext.301</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .why-advertise-sober {
    margin-bottom: 30px;
  }
  .main-icon {
    padding: 0;
  }
  .why-sober img {
    max-width: 100px;
  }
  .img-traffic {
    margin-bottom: 60px;
  }
  .sober-info img {
    float: left;
    margin-right: 13px;
    margin-top: 4px;
  }
  .contact-info img {
    float: left;
    margin-right: 10px;
  }
  .banners {
    margin-bottom: 30px;
    padding: 0;
  }
  .img-responsive, .thumbnail>img, .thumbnail a>img, .carousel-inner>.item>img, .carousel-inner>.item>a>img {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    height: auto;
  }
</style>

<script>
  export default {
    // asyncData({ query, params, error, $axios }) {
    //   return $axios.get(`/advertising`).then((res) => {
    //     return { advertise: res.data.data }
    //   })
    // },
    head: {
      title: `Advertising`,
    },
    components: {},
    data () {
      return {
        advertise: {}
      }
    },
    methods: {}
  }
</script>
