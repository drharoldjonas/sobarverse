<template>

  <div>

    <header :class="{ header_in: !isHome, 'header fixed_nav': isHome }">
      <div :class="{ container: !isHome }">
        <div class="row">
          <div class="col-lg-3 col-12">
            <div id="logo">
              <a href="/">
                <img
                  src="/images/logo.png"
                  width="165"
                  height="35"
                  alt=""
                  class="logo_normal"
                  style="width: auto; height: 80px"
                />
                <img
                  src="/images/logo1.png"
                  width="165"
                  height="35"
                  alt=""
                  class="logo_sticky"
                  style="width: auto; height: 50px"
                />
              </a>
            </div>
          </div>
          <div class="col-lg-9 col-12">
            <ul id="top_menu">
              <li>
                <nuxt-link :to="{ name: 'facility-add' }" class="btn_add"
                  >Be a Vendor</nuxt-link
                >
              </li>
              <li class="follow_us social-nav" style="margin-top: 8px">
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
                   <li>
                    <a
                      target="_blank"
                      href="https://www.tiktok.com/@soberverse"
                      >
                       <img src="https://sober.com/tiktok.png" alt="People Icon" width="25" height="25">
                       </a>
                  </li>
                </ul>
              </li>
              <li>
                <span v-if="!loggedIn"
                  ><a href="#sign-in-dialog" id="sign-in" class="login"></a
                ></span>
                <span v-else><a @click="logout" class="login"></a></span>
              </li>
            </ul>
            <!-- /top_menu -->
            <a href="#menu" class="btn_mobile">
              <div class="hamburger hamburger--spin" id="hamburger">
                <div class="hamburger-box">
                  <div class="hamburger-inner"></div>
                </div>
              </div>
            </a>
            <nav id="menu" class="main-menu">
              <ul>
                <li v-for="menu in menus.active_menu" v-if="menu.login_required === 'no' || (menu.login_required === 'yes' && loggedIn)" :key="menu.id">
                  <nuxt-link v-if="typeof menu.route === 'object'" :to="{ name: menu.route.name, params: { slug: menu.route.params.slug }}">{{ menu.label }}</nuxt-link>
                  <span v-else><a :href="menu.route || 'javascript:void(0);'" :rel="menu.rel" :target="menu.target">{{ menu.label }}</a></span>

                  <ul v-if="menu.sub_elements && menu.sub_elements.length > 0">
                    <li v-for="sub in menu.sub_elements" :key="sub.id">
                      <nuxt-link v-if="typeof sub.route === 'object'" :to="{ name: sub.route.name, params: { slug: sub.route.params.slug }}">{{ sub.label }}</nuxt-link>
                      <span v-else-if="sub.sub_elements && sub.sub_elements.length > 0"><a :href="sub.route" :rel="sub.rel" :target="sub.target">{{ sub.label }}</a></span>
                      <a v-else :href="sub.route || 'javascript:void(0);'" :rel="sub.rel" :target="sub.target">{{ sub.label }}</a>
                      <ul class="third_level_left" v-if="sub.sub_elements && sub.sub_elements.length > 0">
                        <li v-for="subber in sub.sub_elements" :key="subber.id">
                          <nuxt-link v-if="typeof subber.route === 'object'" :to="{ name: subber.route.name, params: { slug: subber.route.params.slug }}">{{ subber.label }}</nuxt-link>
                          <a v-else :href="subber.route || 'javascript:void(0);'" :rel="subber.rel" :target="subber.target">{{ subber.label }}</a>
                          <ul class="third_level_left" v-if="subber.sub_elements && subber.sub_elements.length > 0">
                            <li v-for="s in subber.sub_elements" :key="s.id">
                              <nuxt-link v-if="typeof s.route === 'object'" :to="{ name: s.route.name, params: { slug: s.route.params.slug }}">{{ s.label }}</nuxt-link>
                              <a v-else :href="s.route" :rel="s.rel" :target="s.target">{{ s.label }}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
      <!-- search_mobile -->
      <div class="layer"></div>
      <div id="search_mobile">
        <a href="#" class="side_panel"><i class="icon_close"></i></a>
        <div class="custom-search-input-2">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="What are you looking.."
            />
            <i class="icon_search"></i>
          </div>
          <div class="form-group">
            <select
              class="form-control"
              v-model="form.state"
              placeholder="State"
            >
              <option value="">All States</option>
              <option
                v-for="(state, index) in states"
                :value="state.code"
                :key="index"
              >
                {{ state.name }}
              </option>
            </select>
            <!--<client-only>-->
            <!--<gmap-autocomplete-->
            <!--placeholder="Where"-->
            <!--@place_changed="setPlace">-->
            <!--</gmap-autocomplete>-->
            <!--</client-only>-->
            <i class="icon_pin_alt"></i>
          </div>
          <select class="wide" v-model="form.category">
            <option value="">All Categories</option>
            <option value="">All Categories</option>
            <option value="Alternative Drug Rehab Programs">
              Alternative Drug Rehab Programs
            </option>
            <option value="Outpatient Treatment">Outpatient Treatment</option>
            <option value="Drug Detox Centers">Drug Detox Centers</option>
            <option value="Drug and Alcohol Treatment Centers">
              Drug and Alcohol Treatment Centers
            </option>
            <option value="Non 12 Step">Non 12 Step</option>
            <option value="Adolescent Treatment">Adolescent Treatment</option>
            <!--<option value="Eating Disorder Treatment Centers">Eating Disorder Treatment Centers</option>-->
            <!--<option value="Exclusive Drug Rehabs">Exclusive Drug Rehabs</option>-->
            <!--<option value="Extended Care Facilities">Extended Care Facilities</option>-->
            <option value="Housing">Housing</option>
            <!--<option value="Men's Treatment">Men's Treatment</option>-->
            <!--<option value="Sober Houses">Sober Houses</option>-->
            <!--<option value="Women's Treatment">Women's Treatment</option>-->
            <!--<option value="Seniors/Baby Boomers">Seniors/Baby Boomers</option>-->
          </select>
          <input type="submit" value="Search" />
        </div>
      </div>
      <!-- /search_mobile -->
    </header>
    <!-- /header -->

    <!-- Purple Banner -->
     <a v-if="settings && settings.banners.active === 'yes'" class="rmn-cta-bottom" href="tel:+1800-943-6094">
      <span class="line1">
        <span class="img">
          <img src="/images/icon-people.png" alt="People Icon" width="125" height="126" loading="lazy">
        </span>

        <span class="txt">Seek Help. Get Sober.</span>
      </span>
      <!-- Line 1 -->

      <span class="line2">
        <span class="txt">Call Today to learn more!</span>

        <span class="phone">
          <img src="/images/icon-phone.svg" alt="Phone Icon" width="80" height="80" loading="lazy">
          <span class="number">800-943-6094</span>
        </span>
      </span>
    <!-- Line 2 -->
    </a>

    <!-- Admin NavBar-->
    <nav
      v-if="$route.name != 'index' && $route.name && $route.name.includes('admin')"
      class="secondary_nav sticky_horizontal_2"
    >
      <div class="container">
        <ul class="clearfix">
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('companies'),
                }"
                to="/admin"
                >Companies</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('users'),
                }"
                to="/admin/users"
                >Users</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('facilities'),
                }"
                to="/admin/facilities"
                >Vendors</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('category'),
                }"
                to="/admin/facilities/category"
                >Vendor Categories</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('meetings'),
                }"
                to="/admin/meetings"
                >Meetings</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('inquiries'),
                }"
                to="/admin/inquiries"
                >Inquiries</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('reviews'),
                }"
                to="/admin/reviews"
                >Reviews</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('contact'),
                }"
                to="/admin/contact"
                >Contact Form</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('stats'),
                }"
                to="/admin/stats"
                >Stats</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('transactions'),
                }"
                to="/admin/transactions"
                >Transactions</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('pressroom'),
                }"
                to="/admin/pressroom"
                >Press Room</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('expertvideos'),
                }"
                to="/admin/expertvideos"
                >Expert Videos</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('packages'),
                }"
                to="/admin/packages"
                >Packages</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('subscriptions'),
                }"
                to="/admin/subscriptions"
                >Subscriptions</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('categories'),
                }"
                to="/admin/categories"
                >Categories</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('adspots'),
                }"
                to="/admin/adspots"
                >Ad Spots</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active:
                    $route.name && $route.name.includes('adspot-requests'),
                }"
                to="/admin/adspot-requests"
                >Ad Spot Requests</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('connect'),
                }"
                to="/admin/connect"
                >Connect</nuxt-link
              ></span
            >
          </li>
          <!--          <li><span><nuxt-link :class="{'active': $route.name && $route.name.includes('form-fill')}" to="/admin/click2call">Click to call</nuxt-link></span></li>-->
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('form-fill'),
                }"
                to="/admin/form-fill"
                >Form Fills</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('web-cms'),
                }"
                to="/admin/web-cms"
                >WebCMS</nuxt-link
              ></span
            >
          </li>
          <li>
            <span
              ><nuxt-link
                :class="{
                  active: $route.name && $route.name.includes('settings'),
                }"
                to="/admin/settings"
                >Settings</nuxt-link
              ></span
            >
          </li>
          <li></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
.rmn-cta-bottom {
		position: fixed;
		bottom: 24px;
		left: 38px;
		width: calc(100% - 54px);
		z-index: 50;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.rmn-cta-bottom .line1 {
		display: block;
		position: relative;
		height: 44px;
		background: #6F0096;
		border-radius: 16px 16px 0 0;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line1 {
			display: flex;
			flex-direction: column;
			height: 108px;
			border-radius: 16px 0 0 16px;
			justify-content: center;
			padding-left: 104px;
		}
	}

	.rmn-cta-bottom .line1 .img {
		display: block;
		position: absolute;
		left: -22px;
		top: 0;
		z-index: 2;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line1 .img {
			top: -9px;
		}
	}

	.rmn-cta-bottom .line1 .img img {
		display: block;
		width: 80px;
		height: 80px;
		border-radius: 100%;
		border: 4px solid #6F0096;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line1 .img img {
			width: 126px;
			height: 126px;
		}
	}

	.rmn-cta-bottom .line1 .txt {
		display: block;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		line-height: 42px;
	}

	@media (min-width: 425px) {
		.rmn-cta-bottom .line1 .txt {
			font-size: 18px;
		}
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line1 .txt {
			font-size: 20px;
			line-height: 1.2;
		}
	}

	@media (min-width: 992px) {
		.rmn-cta-bottom .line1 .txt {
			font-size: 32px;
		}
	}

	.rmn-cta-bottom .line2 {
		display: block;
		position: relative;
		height: 36px;
		background: #9100C5;
		border-radius: 0 0 16px 16px;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line2 {
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: 12px;
			height: 108px;
			border-radius: 0 16px 16px 0;
		}
	}

	@media (min-width: 992px) {
		.rmn-cta-bottom .line2 {
			column-gap: 32px;
		}
	}

	.rmn-cta-bottom .line2 .txt {
		display: block;
		font-size: 14px;
		line-height: 32px;
		font-weight: 600;
		color: #fff;
		text-align: center;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line2 .txt {
			display: flex;
			font-size: 18px;
			line-height: 1.2;
			max-width: 135px;
		}
	}

	@media (min-width: 992px) {
		.rmn-cta-bottom .line2 .txt {
			font-size: 20px;
			max-width: 150px;
		}
	}

	.rmn-cta-bottom .line2 .phone {
		display: block;
		position: absolute;
		right: 8px;
		bottom: 13px;
		width: 54px;
		height: 54px;
		padding-top: 15px;
		line-height: 54px;
		background: #FFA654;
		border-radius: 10px;
		color: #000;
		font-weight: 700;
	}

	@media (min-width: 425px) {
		.rmn-cta-bottom .line2 .phone {
			bottom: 8px;
			width: 64px;
			height: 64px;
			padding-top: 20px;
			line-height: 64px;
		}
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line2 .phone {
			display: grid;
			grid-template-columns: repeat(2, auto);
			align-items: center;
			column-gap: 4px;
			position: static;
			width: auto;
			height: 52px;
			padding: 0 8px;
			line-height: 50px;
		}
	}

	@media (min-width: 992px) {
		.rmn-cta-bottom .line2 .phone {
			column-gap: 8px;
			padding: 0 16px;
		}
	}

	.rmn-cta-bottom .line2 .phone img {
		display: block;
		margin: auto;
		width: 24px;
		height: 24px;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line2 .phone img {
		}
	}

	.rmn-cta-bottom .line2 .phone .number {
		display: none;
	}

	@media (min-width: 768px) {
		.rmn-cta-bottom .line2 .phone .number {
			display: grid;
			font-size: 18px;
			font-weight: 600;
		}
	}

	@media (min-width: 992px) {
		.rmn-cta-bottom .line2 .phone .number {
			font-size: 24px;
		}
	}
.err {
  color: red;
  text-align: center;
  font-size: 20px;
}
@media (max-width: 991px) {
  header.header_in {
    height: 65px;
  }
  .social-nav {
    display: none;
  }
}
header.header_in .logo_sticky {
  display: none;
}
</style>

<script>
import { mapState } from "vuex";
import constants from "~/constants";

export default {
  components: {},
  props: ["settings", 'menus'],
  data() {
    return {
      states: constants.states,
      form: {
        category: "",
        state: ""
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),
    isHome: function() {
      return this.$route.name == "index";
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    setPlace: function(place) {
      this.place = place;
      this.form.lat = place.geometry.location.lat();
      this.form.lng = place.geometry.location.lng();
      this.$forceUpdate();
    }
  }
};
</script>
