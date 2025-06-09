<template>
  <footer class="plus_border">
    <!--    <div v-if="$route.name && !$route.name.includes('admin')" class="callnow cta_footer_below_720 custom_js_footer">-->
    <!--      <div class="calltext">-->
    <!--        <div class="helpline">-->
    <!--          <span class="crossclose">-->
    <!--            <i class="fa fa-times onclickclosesticky"></i>-->
    <!--          </span>-->
    <!--          <span class="show_desk">24/7 Addiction Help</span>-->
    <!--          <span class="hide_desk" v-html="settings.general.support_text"></span>-->
    <!--        </div>-->
    <!--        <div class="stickycallingnumber">-->
    <!--          <span class="calldiv">-->
    <!--            <i class="fa fa-phone"></i>-->
    <!--            <a :href="'tel:' + settings.general.support_number">-->
    <!--              <span class="hide">CLICK TO CALL</span>-->
    <!--              <span class="show_desk">{{ settings.general.support_number }}</span>-->
    <!--            </a>-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div v-if="$route.name && !$route.name.includes('admin')"  class="callnow cta_footer_above_720 custom_js_footer">-->
    <!--      <div class="calltext">-->
    <!--        <div class="">-->
    <!--          <p class="customcatptag">-->
    <!--            <span class="show_full_add_text">-->
    <!--              <span class="dynamic_change_bill" v-html="settings.general.support_text"></span>-->
    <!--              <span>-->
    <!--                <a class="custombill_style" :href="'tel:' + settings.general.support_number">-->
    <!--                  <i class="fa fa-phone"></i> {{ settings.general.support_number }}-->
    <!--                </a>-->
    <!--              </span>-->
    <!--            </span>-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="container margin_60_35">
      <div class="row">
        <div class="col-lg-2 col-md-6 col-sm-6">
          <h3 data-target="#collapse_ft_1">Quick Links</h3>
          <div class="collapse dont-collapse-sm" id="collapse_ft_1">
            <ul class="links">
              <li v-if="user && user.role && user.role.name == 'Admin'">
                <a href="/admin">Admin Panel</a>
              </li>
              <!--<li><a href="/#/rehab_reviews">Rehab Reviews</a></li>-->
              <!--<li><a href="/#/rehab_reviews/writereview">Write Review</a></li>-->
              <li><nuxt-link to="/advertising">Advertising</nuxt-link></li>
              <li><nuxt-link to="/pressroom">Press Room</nuxt-link></li>
              <li>
                <nuxt-link :to="{ name: 'facility-add' }"
                  >Be a Vendor</nuxt-link
                >
              </li>
              <li><nuxt-link to="/support?a=careers">Careers</nuxt-link></li>
              <li><nuxt-link to="/support">Contact Us</nuxt-link></li>
              <li>
                <a
                  href="https://rehabaid.com/overdose-statistics/"
                  target="blank"
                  >RehabAid</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-6">
          <h3 data-target="#collapse_ft_2">Categories</h3>
          <div class="collapse dont-collapse-sm" id="collapse_ft_2">
            <ul class="links">
              <li>
                <nuxt-link
                  :to="{
                    name: 'directory-slug',
                    params: { slug: 'detox_centers' },
                  }"
                  >Detox</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'directory-slug',
                    params: { slug: 'drug_alcohol' },
                  }"
                  >Treatment</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'directory-slug',
                    params: { slug: 'outpatient' },
                  }"
                  >Outpatient</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'directory-slug',
                    params: { slug: 'non12step' },
                  }"
                  >Non 12 Step</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="{
                    name: 'directory-slug',
                    params: { slug: 'alternative_treatment' },
                  }"
                  >Alternative</nuxt-link
                >
              </li>
              <li>
                <a href="/blog" target="_blank">Sober Blog</a>
              </li>
              <!--<li><a href="/#/facilities/outpatient">Outpatient</a></li>-->
              <!--<li><a href="/#/facilities/halfway_houses">Housing</a></li>-->
              <!--<li><a href="/#/facilities/adolescent_treatment">Adolescent Treatment</a></li>-->
              <!--<li><a href="/#/facilities/drug_alcohol">Drug &amp; Alcohol Treatment</a></li>-->
              <!--<li><a href="/#/facilities/eating_disorders">Eating Disorders</a></li>-->
              <!--<li><a href="/#/facilities/exclusive_rehabs">Exclusive Rehabs</a></li>-->
              <!--<li><a href="/#/facilities/extended_care">Extended Care Facilities</a></li>-->
              <!--<li><a href="/#/facilities/mens_treatment">Men's Treatment</a></li>-->
              <!--<li><a href="/#/facilities/alternative_treatment">Non 12 Step</a></li>-->
              <!--<li><a href="/#/facilities/outpatient">Outpatient</a></li>-->
              <!--<li><a href="/#/facilities/womens_treatment">Women's Treatment</a></li>-->
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <h3 data-target="#collapse_ft_3">Affiliate Sites</h3>
          <div class="collapse dont-collapse-sm" id="collapse_ft_3">
            <ul class="links">
              <li>
               <a href="https://sobersystems.com/"
                  >sobersystems.com</a
                >
              </li>
               <li>
               <a href="https://sobercoin.com/"
                  >sobercoin.com</a
                >
              </li>
               <li>
               <a href="https://recoverycoaches.com/"
                  >Recoverycoaches.com</a
                >
              </li>

            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
          <h3 data-target="#collapse_ft_3">Contacts</h3>
          <div class="collapse dont-collapse-sm" id="collapse_ft_3">
            <ul class="contacts">
              <!--<li><i class="ti-home"></i>97845 Baker st. 567<br>Los Angeles - US</li>-->
              <!--<li><i class="ti-headphone-alt"></i><a :href="'tel:' + (settings.general ? settings.general.phone : '')">{{ settings.general ? settings.general.phone : '' }}</a></li>-->
              <!--<li><i class="ti-headphone-alt"></i><a :href="'tel:' + (settings.general ? settings.general.phone2 : '')">{{ settings.general ? settings.general.phone2 : '' }}</a></li>-->
              <li>
                <i class="ti-email"></i
                ><a
                  :href="
                    'mailto:' +
                    (settings.general ? settings.general.email2 : '')
                  "
                  >{{ settings.general ? settings.general.email2 : "" }}</a
                >
              </li>
              <li>
                <i class="ti-mobile"></i
                ><a
                  v-if="
                    $store.state.settings.general.click_number === 'primary'
                  "
                  class="btn_2 float-md-left"
                  :href="`tel:${$store.state.settings.general.primary_click_number}`"
                  >CALL:
                  {{ $store.state.settings.general.primary_click_number }}</a
                >
                <a
                  v-else
                  class="btn_1 float-md-left"
                  :href="`tel:${$store.state.settings.general.secondary_click_number}`"
                  >CALL:
                  {{ $store.state.settings.general.secondary_click_number }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-6">
          <h3 data-target="#collapse_ft_4">Follow Us</h3>
          <div class="collapse dont-collapse-sm" id="collapse_ft_4">
            <div class="follow_us">
              <ul>
                <li>
                  <a
                    target="_blank"
                    :href="settings.social ? settings.social.facebook : ''"
                    ><i class="ti-facebook"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    :href="settings.social ? settings.social.twitter : ''"
                    ><i class="ti-twitter-alt"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    :href="settings.social ? settings.social.instagram : ''"
                    ><i class="ti-instagram"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- /row-->
      <hr />
      <div class="row">
        <div class="col-lg-12">
          <p style="display: block; text-align: center">
            <!-- {{ settings.general ? settings.general.license : "" }} -->
            Sober Network is a Florida licensed Substance Abuse Marketing Service Provider (State license #TS5)
          </p>
        </div>
        <div class="col-lg-6">
          <ul id="footer-selector">
            <li>
              <img
                style="cursor: pointer; cursor: hand"
                src="https://seal.godaddy.com/images/3/en/siteseal_gd_3_h_l_m.gif"
                onclick="verifySeal();"
                alt="SSL site seal - click to verify"
              />
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul id="additional_links">
            <li><nuxt-link to="/terms">Terms and conditions</nuxt-link></li>
            <li><nuxt-link to="/privacy">Privacy</nuxt-link></li>
            <li>
              <span
                >© 2018
                <a href="https://sobernetwork.com/"
                  >{{ settings.general ? settings.general.company : "" }}.</a
                ></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  // head: {
  //   script: [
  //     { type: 'text/javascript', src: '/js/infolinks.js' },
  //     { type: 'text/javascript', src: '//resources.infolinks.com/js/infolinks_main.js' },
  //   ]
  // },
  props: ["settings"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["loggedIn", "user"])
  },
  methods: {}
};
</script>

<style>
.extend {
  margin-bottom: 100px;
}
@media (min-width: 720px) {
  .cta_footer_above_720.callnow {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
    background-color: #0000007a !important;
  }
  .cta_footer_above_720 {
    display: block;
  }
  .callnow {
    width: 100%;
    margin: 0 10px 10px auto;
    height: auto;
    border-radius: 10px;
    max-width: 280px;
  }
  .callnow {
    background-color: #181e4d;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999 !important;
    right: 0;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
  .callnow {
    background-color: #5c2984 !important;
  }
  .cta_footer_above_720 .calltext {
    color: #fff;
    font-size: 23px;
  }
  .calltext {
    color: #fff900;
    text-align: center;
    z-index: 999999 !important;
    font-size: 30px;
  }
}

@media (min-width: 720px) {
}

.calltext {
  line-height: 35px;
}

@media (min-width: 720px) {
  .cta_footer_above_720 p.customcatptag {
    text-align: center;
    padding: 0;
    overflow: inherit;
    margin-top: 24px;
    margin-bottom: 18px;
  }
  .cta_footer_above_720 .show_full_add_text {
    padding: 10px 40px;
    background: #4888f0;
    border-radius: 10px;
  }
}

.cta_footer_above_720 .show_full_add_text {
  background: #004dda !important;
}

@media (min-width: 720px) {
  .cta_footer_above_720 .custombill_style {
    background: none;
  }
  .calltext a {
    background-color: none;
    padding: 0;
  }
  .calltext a {
    color: #fff900;
    background-color: #74499d;
    border-radius: 5px;
    z-index: 999999 !important;
    text-decoration: none;
    font-weight: 700;
  }
}

.custombill_style {
  text-decoration: none;
  background-color: #029fe0;
  border-radius: 5px;
  padding: 7px;
  font-weight: 700;
  color: #fff900;
  font-size: 26px;
}
a {
  outline: none;
  color: #834295;
}
.onclickclosesticky {
  cursor: pointer;
}
@media (max-width: 720px) {
  .callnow {
    height: auto;
  }
  .cta_footer_below_720 {
    display: block;
  }
  .callnow {
    background-color: #0000007a;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
    right: 0;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
  .calltext {
    color: #fff;
    text-align: center;
    z-index: 999999;
    font-size: 22px;
  }
  .helpline {
    color: #fff900;
    font-size: 15px;
    z-index: 999999;
    text-align: center;
  }
  .helpline {
    padding-bottom: 5px !important;
    font-weight: bold !important;
    font-size: 18.5px !important;
  }
  .crossclose {
    display: none;
  }
  .show_desk {
    display: none;
  }
  .stickycallingnumber {
    font-size: 21px;
  }
  .stickycallingnumber .calldiv {
    font-size: 24px;
    max-width: 205px;
    background: #004dda;
    margin: 0 auto;
    border-radius: 10px;
    padding: 5px 10px;
    width: 100%;
    font-weight: 600;
    color: #fff900;
    font-weight: 700;
  }

  .calltext a {
    color: #fff900;
    background-color: #004dda;
    border-radius: 5px;
    z-index: 999999;
    padding: 2px;
    text-decoration: none;
  }

  .cta_footer_above_720 {
    display: none;
  }
}

@media (min-width: 720px) {
  .cta_footer_below_720 {
    display: none;
  }
}
</style>

