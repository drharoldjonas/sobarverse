<template>
  <div>
    <div id="results">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-10">
            <h4>
              <strong>{{ items.total }}</strong> result found
            </h4>
          </div>
          <!--<div class="col-lg-7 col-md-6 col-2">-->
          <!--<a class="search_mob btn_search_mobile"></a> &lt;!&ndash; /open search panel &ndash;&gt;-->
          <!--<form @submit="navSearch">-->
          <!--<div class="row no-gutters custom-search-input-1 inner">-->
          <!--<div class="col-lg-5">-->
          <!--<select class="form-control" v-model="filters.category">-->
          <!--<option value="">All Categories</option>-->
          <!--<option value="Alternative Drug Rehab Programs">Alternative Drug Rehab Programs</option>-->
          <!--<option value="Outpatient Treatment">Outpatient Treatment</option>-->
          <!--<option value="Drug Detox Centers">Drug Detox Centers</option>-->
          <!--<option value="Drug and Alcohol Treatment Centers">Drug and Alcohol Treatment Centers</option>-->
          <!--<option value="Non 12 Step">Non 12 Step</option>-->
          <!--<option value="Adolescent Treatment">Adolescent Treatment</option>-->
          <!--&lt;!&ndash;<option value="Eating Disorder Treatment Centers">Eating Disorder Treatment Centers</option>&ndash;&gt;-->
          <!--&lt;!&ndash;<option value="Exclusive Drug Rehabs">Exclusive Drug Rehabs</option>&ndash;&gt;-->
          <!--&lt;!&ndash;<option value="Extended Care Facilities">Extended Care Facilities</option>&ndash;&gt;-->
          <!--&lt;!&ndash;<option value="Education Provider">Education Provider</option>&ndash;&gt;-->
          <!--<option value="Housing">Halfway Houses</option>-->
          <!--&lt;!&ndash;<option value="Men's Treatment">Men's Treatment</option>&ndash;&gt;-->
          <!--<option value="Housing">Sober Houses</option>-->
          <!--&lt;!&ndash;<option value="Women's Treatment">Women's Treatment</option>&ndash;&gt;-->
          <!--&lt;!&ndash;<option value="Seniors/Baby Boomers">Seniors/Baby Boomers</option>&ndash;&gt;-->
          <!--</select>-->
          <!--</div>-->
          <!--<div class="col-lg-5">-->
          <!--<div class="form-group">-->
          <!--<client-only>-->
          <!--<gmap-autocomplete-->
          <!--class="form-control"-->
          <!--placeholder="Where"-->
          <!--:options="{componentRestrictions: {country: 'us'}}"-->
          <!--@place_changed="setPlace">-->
          <!--</gmap-autocomplete>-->
          <!--</client-only>-->
          <!--<i class="icon_pin_alt"></i>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="col-lg-2">-->
          <!--<input type="submit" value="Search">-->
          <!--</div>-->
          <!--</div>-->
          <!--</form>-->
          <!--</div>-->
        </div>
        <!-- /row -->
        <!--<div class="search_mob_wp">-->
        <!--<form @submit="advanceSearch">-->
        <!--<div class="custom-search-input-1">-->
        <!--<div class="form-group">-->
        <!--<client-only>-->
        <!--<gmap-autocomplete-->
        <!--placeholder="Where"-->
        <!--class="form-control"-->
        <!--:options="{componentRestrictions: {country: 'us'}}"-->
        <!--@place_changed="setPlace">-->
        <!--</gmap-autocomplete>-->
        <!--</client-only>-->
        <!--<i class="icon_pin_alt"></i>-->
        <!--</div>-->
        <!--<select class="form-control" v-model="form.category">-->
        <!--<option value="">All Categories</option>-->
        <!--<option value="Alternative Drug Rehab Programs">Alternative Drug Rehab Programs</option>-->
        <!--<option value="Outpatient Treatment">Outpatient Treatment</option>-->
        <!--<option value="Drug Detox Centers">Drug Detox Centers</option>-->
        <!--<option value="Drug and Alcohol Treatment Centers">Drug and Alcohol Treatment Centers</option>-->
        <!--<option value="Non 12 Step">Non 12 Step</option>-->
        <!--<option value="Adolescent Treatment">Adolescent Treatment</option>-->
        <!--&lt;!&ndash;<option value="Eating Disorder Treatment Centers">Eating Disorder Treatment Centers</option>&ndash;&gt;-->
        <!--&lt;!&ndash;<option value="Exclusive Drug Rehabs">Exclusive Drug Rehabs</option>&ndash;&gt;-->
        <!--&lt;!&ndash;<option value="Extended Care Facilities">Extended Care Facilities</option>&ndash;&gt;-->
        <!--&lt;!&ndash;<option value="Education Provider">Education Provider</option>&ndash;&gt;-->
        <!--<option value="Housing">Halfway Houses</option>-->
        <!--&lt;!&ndash;<option value="Men's Treatment">Men's Treatment</option>&ndash;&gt;-->
        <!--<option value="Housing">Sober Houses</option>-->
        <!--&lt;!&ndash;<option value="Women's Treatment">Women's Treatment</option>&ndash;&gt;-->
        <!--&lt;!&ndash;<option value="Seniors/Baby Boomers">Seniors/Baby Boomers</option>&ndash;&gt;-->
        <!--</select>-->
        <!--<input type="submit" value="Search">-->
        <!--</div>-->
        <!--</form>-->
        <!--</div>-->
      </div>
      <!-- /container -->
    </div>
    <div class="filters_listing version_2 sticky_horizontal">
      <div class="container">
        <ul class="clearfix">
          <li></li>
          <li></li>
          <li>
            <a
              class="btn_map"
              data-text-swap="Hide map"
              data-text-original="View on map"
              @click="toggleMap"
              >View on map</a
            >
          </li>
        </ul>
      </div>
      <!-- /container -->
    </div>
    <transition
      enter-active-class="enter-active"
      leave-active-class="leave-active"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="showMap">
        <client-only>
          <gmap-map
            class="map"
            ref="mapRef"
            :center="center"
            :zoom="zoom"
            map-type-id="terrain"
          >
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <div class="infoBox">
                <div class="marker_info" id="marker_info">
                  <img
                    v-if="infoContent.profile && infoContent.profile.logo"
                    :src="infoContent.profile.logo"
                    onerror="this.onerror=null; this.src='/images/crowd.png'"
                    alt=""
                  />
                  <img v-else src="img/thumb_map_single_hotel.jpg" alt="" />
                  <span>
                    <span v-if="infoContent.rating" class="infobox_rate">{{
                      infoContent.rating.avg
                    }}</span>
                    <h3>{{ infoContent.name }}</h3>
                    <em
                      >{{ infoContent.address }} {{ infoContent.state }}
                      {{ infoContent.zip }}</em
                    >
                    <a
                      @click="
                        $router.push({
                          name: 'facility-id',
                          params: { id: infoContent.slug }
                        })
                      "
                      class="btn_infobox_detail"
                    ></a>
                    <form
                      v-if="infoContent.location"
                      action="http://maps.google.com/maps"
                      method="get"
                      target="_blank"
                    >
                      <input name="saddr" value="" type="hidden" /><input
                        type="hidden"
                        name="daddr"
                        :value="
                          infoContent.location.coordinates[0] +
                            ',' +
                            infoContent.location.coordinates[1]
                        "
                      />
                      <button
                        type="submit"
                        value="Get directions"
                        class="btn_infobox_get_directions"
                      >
                        Get directions
                      </button>
                    </form>
                    <a
                      :href="'tel://' + infoContent.phone"
                      class="btn_infobox_phone"
                      >{{ infoContent.phone }}</a
                    >
                  </span>
                </div>
              </div>
            </gmap-info-window>
            <!--<gmap-circle-->
            <!--:center="center"-->
            <!--:radius="radius"-->
            <!--:visible="true"-->
            <!--:options="{fillColor:'red',fillOpacity:0}"-->
            <!--&gt;</gmap-circle>-->
            <template v-for="(item, index) in items.data">
              <gmap-marker
                v-if="
                  item.location &&
                    item.location.coordinates &&
                    item.location.coordinates.length
                "
                :position="{
                  lat: item.location.coordinates[1],
                  lng: item.location.coordinates[0]
                }"
                @click="openWindow(item)"
                :clickable="true"
                :draggable="false"
                :key="index"
              />
            </template>
          </gmap-map>
        </client-only>
      </div>
    </transition>
    <div class="container margin_60_35">
      <div class="row">
        <aside class="col-lg-3" id="sidebar">
          <div id="filters_col">
            <a
              data-toggle="collapse"
              href="#collapseFilters"
              aria-expanded="false"
              aria-controls="collapseFilters"
              id="filters_col_bt"
              >Filters
            </a>
            <div class="collapse show" id="collapseFilters">
              <div class="filter_type">
                <div class="form-group">
                  <h6 style="margin: 10px 0px">Facility Name</h6>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="filters.name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <h6 style="margin: 10px 0px">Country</h6>
                  <div class="custom-search-input-1 inner custom-border">
                    <div class="form-group">
                      <select
                        class="form-control"
                        v-model="filters.country"
                        placeholder="Country"
                      >
                        <option value="">All Countries</option>
                        <option
                          v-for="(country, index) in countriesFilter"
                          :value="country.code"
                          :key="index"
                        >
                          {{ country.name }}
                        </option>
                      </select>
                      <i class="icon_pin_alt"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <h6 style="margin: 10px 0px">State/Provinces</h6>
                  <div class="custom-search-input-1 inner custom-border">
                    <div class="form-group">
                      <select
                        class="selectpicker form-control"
                        v-model="filters.state"
                        v-if="
                          filters.country == 'US' || filters.country == 'CA'
                        "
                      >
                        <option value="">---Select A State/Province ---</option>
                        <template v-if="filters.country == 'US'">
                          <option
                            v-for="(state, index) in states"
                            :value="state.code"
                            :key="index"
                          >
                            {{ state.name }}
                          </option>
                        </template>
                        <template v-if="filters.country == 'CA'">
                          <option
                            v-for="(province, index) in provinces"
                            :value="province.code"
                            :key="index"
                          >
                            {{ province.name }}
                          </option>
                        </template>
                      </select>
                      <input
                        v-else
                        class="form-control"
                        v-model="filters.state"
                        type="text"
                      />
                      <!--<client-only>-->
                      <!--<gmap-autocomplete-->
                      <!--class="form-control"-->
                      <!--placeholder="Where"-->
                      <!--:options="{componentRestrictions: {country: 'us'}}"-->
                      <!--@place_changed="setPlace">-->
                      <!--</gmap-autocomplete>-->
                      <!--</client-only>-->
                      <i class="icon_pin_alt"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <h6 style="margin: 10px 0px">City</h6>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="filters.city"
                      placeholder="New York"
                    />
                  </div>
                </div>
                <div
                  class="form-group custom-search-input-1 inner custom-border"
                >
                  <h6 style="border-top: none; margin: 10px 0px; padding: 0">
                    Services
                  </h6>
                  <select class="form-control" v-model="filters.services">
                    <option value="">Mental Health & Substance Abuse</option>
                    <option value="MH">Mental Health</option>
                    <option value="SA">Substance Abuse</option>
                  </select>
                </div>
                <div
                  class="form-group custom-search-input-1 inner custom-border"
                >
                  <h6 style="border-top: none; margin: 10px 0px; padding: 0">
                    Category
                  </h6>
                  <select class="form-control" v-model="filters.category">
                    <option value="">All Categories</option>
                    <option
                      v-for="(category, index) in $store.state.categories"
                      :value="category.name"
                      :key="index"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!--              <div class="filter_type">-->
              <!--                <h6>Distance</h6>-->
              <!--                <div class="distance"> Radius around selected destination <span></span> mi</div>-->
              <!--                <input type="range" min="25" max="200" step="25" data-orientation="horizontal">-->
              <!--              </div>-->
              <div v-if="showMore" class="filter_type">
                <h6>Type of care</h6>
                <ul>
                  <li>
                    <label class="container_check"
                      >Hospital inpatient
                      <input
                        type="checkbox"
                        value="Hospital inpatient"
                        v-model="filters.careType"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >OutPatient
                      <input
                        type="checkbox"
                        value="OutPatient"
                        v-model="filters.careType"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Partial hospitalization/day treatment
                      <input
                        type="checkbox"
                        value="Partial hospitalization/day treatment"
                        v-model="filters.careType"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Residential long-term treatment (more than 30 days)
                      <input
                        type="checkbox"
                        value="Residential long-term treatment (more than 30 days)"
                        v-model="filters.careType"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Residential short-term treatment (30 days or less)
                      <input
                        type="checkbox"
                        value="Residential short-term treatment (30 days or less)"
                        v-model="filters.careType"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
              <div v-if="showMore" class="filter_type">
                <h6>Special Program</h6>
                <ul>
                  <li>
                    <label class="container_check"
                      >Adolescents
                      <input
                        type="checkbox"
                        value="Adolescents"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Residential beds for clients' children
                      <input
                        type="checkbox"
                        value="Residential beds for clients' children"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Criminal justice clients
                      <input
                        type="checkbox"
                        value="Criminal justice clients"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Persons with co-occurring mental and substance abuse
                      disorders
                      <input
                        type="checkbox"
                        value="Persons with co-occurring mental and substance abuse disorders"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >DUI/DWI offenders
                      <input
                        type="checkbox"
                        value="DUI/DWI offenders"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Gays and Lesbians
                      <input
                        type="checkbox"
                        value="Gays and Lesbians"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Persons with HIV/AIDS
                      <input
                        type="checkbox"
                        value="Persons with HIV/AIDS"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Men
                      <input
                        type="checkbox"
                        value="Men"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Pregnant/postpartum women
                      <input
                        type="checkbox"
                        value="Pregnant/postpartum women"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Seniors/older adults
                      <input
                        type="checkbox"
                        value="Seniors/older adults"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="container_check"
                      >Women
                      <input
                        type="checkbox"
                        value="Women"
                        v-model="filters.specialProgram"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
              <div v-if="showMore" class="filter_type">
                <div
                  class="form-group custom-search-input-1 inner custom-border"
                >
                  <h6 style="border-top: none; margin: 10px 0px; padding: 0">
                    Cost
                  </h6>
                  <select class="form-control" v-model="filters.costRange">
                    <option value="">Any</option>
                    <option value="Sliding Scale">Sliding Scale</option>
                    <option value="Free">Free</option>
                    <option value="$1 - $1,000">$1 - $1,000</option>
                    <option value="$1,001 - $3,500">$1,001 - $3,500</option>
                    <option value="$3,501 - $5,000">$3,501 - $5,000</option>
                    <option value="$5,001 - $10,000">$5,001 - $10,000</option>
                    <option value="$10,001 - $15,000">$10,001 - $15,000</option>
                    <option value="$15,001 - $30,000">$15,001 - $30,000</option>
                    <option value="$30,001 - $50,000">$30,001 - $50,000</option>
                    <option value="$50,001 +">$50,001 +</option>
                  </select>
                </div>
              </div>
              <div class="mt-3">
                <a v-if="!showMore" @click="showMore = true">Show More...</a>
                <a v-if="showMore" @click="showMore = false">Show Less...</a>
              </div>
              <div class="text-center">
                <p class="text-center">
                  <a @click="search(0)" class="btn_1 rounded add_top_30"
                    >Filter</a
                  >
                </p>
              </div>
            </div>
            <!--/collapse -->
          </div>
          <!--/filters col-->
        </aside>
        <!-- /aside -->

        <div class="col-lg-9">
          <div class="row d-flex justify-content-center">
            <div v-if="!items.data.length" class="container">
              <h3 style="text-align: center">No results returned!</h3>
            </div>

            <template v-for="(item, index) in items.data">
              <div v-if="index != 0 && index % 2 == 0" class="strip" :key="'ad' + index">
                <div v-if="$store.state.settings.adsense">
                  <client-only>
                    <InFeedAdsense
                      ins-class="adsbygoogle"
                      :data-ad-layout-key="
                      $store.state.settings.adsense.search_slot_layout
                    "
                      :data-ad-client="$store.state.settings.adsense.client_id"
                      data-ad-format="fluid"
                      :data-ad-slot="$store.state.settings.adsense.search_slot"
                    >
                    </InFeedAdsense>
                  </client-only>
                </div>
              </div>
              <div class="col-12 col-md-5 ml-2 mr-2 mb-2 strip list_view" :key="index">
                <nuxt-link target="_blank" v-if="item.profile" class="row no-gutters" :to="{ name: 'facility-id', params: { id: item.slug } }">
                  <div class="col-lg-5">
                    <figure>
                      <a @click="$router.push({ name: 'facility-id', params: { id: item.slug } })">
                        <img
                          v-if="item.profile.logo && isActive(item)"
                          :src="item.profile.logo"
                          onerror="this.onerror=null; this.src='/images/crowd.png'"
                          class="img-fluid"
                          alt=""
                        />
                        <img
                          v-else
                          src="/images/crowd.png"
                          class="img-fluid"
                          alt=""
                        />
                        <div class="read_more">
                          <span>Read more</span>
                        </div>
                      </a>
                      <!--<small style="right: 0px;top: 0px;background: none;">-->
                      <!--<img v-if="item.profile.logo" :src="item.profile.logo" onerror="this.onerror=null; this.src='/images/crowd.png'" class="img-fluid" alt="" style="width: 100px;">-->
                      <!--</small>-->
                    </figure>
                  </div>
                  <div class="col-lg-7">
                    <div class="wrapper">
                      <h3>
                        <a
                          @click="
                          $router.push({
                            name: 'facility-id',
                            params: { id: item.slug }
                          })
                        "
                        >{{ item.name }}</a
                        >
                      </h3>
                      <small
                      >{{ item.address }}, {{ item.city }}, {{ item.state }},
                        {{ item.zip }}</small
                      >
                      <p v-if="item.profile.description">
                        {{ item.profile.description.substring(0, 250) }}...
                      </p>
                      <form
                        v-if="item.location"
                        action="http://maps.google.com/maps"
                        method="get"
                        target="_blank"
                      >
                        <input name="saddr" value="" type="hidden" />
                        <input type="hidden" name="daddr" :value="item.location.coordinates[1] + ',' + item.location.coordinates[0]" />
                        <button
                          type="submit"
                          value="Get directions"
                          class="btn_infobox_get_directions loc"
                          style="
                          font-weight: 500;
                          color: #999;
                          line-height: 1;
                          font-size: 0.875rem;
                        "
                        >
                          Get directions
                        </button>
                      </form>
                    </div>
                    <ul>
                      <li v-if="item.dist">
                      <span class="loc_open"
                      >{{ item.dist.calculated }} Miles</span
                      >
                      </li>
                      <li v-else></li>
                      <li>
                        <div class="score">
                        <span
                        >Rating<em
                        >{{
                            item.review ? item.review.total : 0
                          }}
                            Reviews</em
                        ></span
                        ><strong>{{
                            item.review ? item.review.avg : 0
                          }}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nuxt-link>
                <nuxt-link
                  target="_blank"
                  v-else
                  class="row no-gutters"
                  :to="{ name: 'facility-id', params: { id: item.slug } }"
                >
                  <div class="col-lg-12">
                    <div class="wrapper">
                      <h3>
                        <a
                          @click="
                          $router.push({
                            name: 'facility-id',
                            params: { id: item.slug }
                          })
                        "
                        >{{ item.name }}</a
                        >
                      </h3>
                      <small
                      >{{ item.address }}, {{ item.city }}, {{ item.state }},
                        {{ item.zip }}</small
                      >
                      <form
                        v-if="item.location"
                        action="http://maps.google.com/maps"
                        method="get"
                        target="_blank"
                      >
                        <input name="saddr" value="" type="hidden" /><input
                        type="hidden"
                        name="daddr"
                        :value="
                          item.location.coordinates[1] +
                            ',' +
                            item.location.coordinates[0]
                        "
                      />
                        <button
                          type="submit"
                          value="Get directions"
                          class="btn_infobox_get_directions loc"
                          style="
                          font-weight: 500;
                          color: #999;
                          line-height: 1;
                          font-size: 0.875rem;
                        "
                        >
                          Get directions
                        </button>
                      </form>
                    </div>
                    <ul>
                      <li v-if="item.dist">
                      <span class="loc_open"
                      >{{ item.dist.calculated }} Miles</span
                      >
                      </li>
                      <li v-else></li>
                      <li>
                        <div class="score">
                        <span
                        >Rating<em
                        >{{
                            item.review ? item.review.total : 0
                          }}
                            Reviews</em
                        ></span
                        ><strong>{{
                            item.review ? item.review.avg : 0
                          }}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nuxt-link>
              </div>
            </template>
            <!-- /row -->


          </div>
          <p v-if="items.total != 0 && page + 1 < Math.ceil(items.total / max)" class="text-center">
            <a @click="more" class="btn_1 rounded add_top_30">Load more</a>
          </p>
        </div>
        <!-- /col -->
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- <a class="cta-custom" href="tel:+18009436094">
            <span class="in">
              <span class="line1">Suffering From Addiction?</span>
              <span class="line2">Speak to a Specialist & Get Help Now!</span>
              <span class="line3">800-943-6094</span>
            </span>
          </a> -->
          <client-only>
            <InFeedAdsense
              ins-class="adsbygoogle"
              :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
              :data-ad-client="$store.state.settings.adsense.client_id"
              data-ad-format="fluid"
              :data-ad-slot="$store.state.settings.adsense.list_slot"
            >
              -->
            </InFeedAdsense>
          </client-only>
        </div>
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

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
.enter-active,
.leave-active {
  overflow: hidden;
  transition: height 1s linear;
}
</style>

<script>
import constants from "~/constants";

export default {
  asyncData({ query, error, $axios }) {
    if (query.category)
      query.category = query.category.replace(new RegExp("%20", "g"), " ");
    return $axios
      .get(`/facilities`, {
        params: {
          filters: {
            state: query.state,
            category: query.category,
            lng: query.lng,
            lat: query.lat,
            name: query.name,
            country: "US"
          },
          max: 10,
          orderby: { spot: -1, subscription: -1 }
        }
      })
      .then(res => {
        console.log(res.data);
        return { items: res.data || { total: 0, data: [] } };
      })
      .catch(e => {
        console.log(e);
      });
  },
  mounted: function() {
    if (this.$route.query.category) {
      this.filters.category = this.$route.query.category;
    }
    if (this.$route.query.state) {
      this.filters.state = this.$route.query.state;
    }
    if (this.$route.query.state) {
      this.filters.state = this.$route.query.state;
    }
    if (this.$route.query.name) {
      this.filters.name = this.$route.query.name;
    }
    if (this.$route.query.lat && this.$route.query.lng) {
      this.filters.coords = [this.$route.query.lng, this.$route.query.lat];
      this.zoom = 13;
    }
    var that = this;
    // Range slider
    $('input[type="range"]').rangeslider({
      polyfill: false,
      onInit: function() {
        this.output = $(".distance span").html(this.$element.val());
        that.filters.radius = this.$element.val();
      },
      onSlide: function(position, value) {
        this.output.html(value);
        that.filters.radius = value;
      }
    });

    this.$nextTick(() => {
      // Sticky horizontal results list page or detail page
      $("#results").stick_in_parent({
        offset_top: 0
      });
    });
  },
  computed: {
    countriesFilter: function() {
      return this.countries.filter(function(country) {
        return country.code == "US" || country.code == "CA";
      });
    },
    radius: function() {
      return Number(this.filters.radius) * 1000;
    },
    center: function() {
      if (!this.items.data || !this.items.data.length) {
        if (this.filters.coords) {
          return { lat: this.filters.coords[1], lng: this.filters.coords[0] };
        }
        return { lat: 39.8097343, lng: -98.5556199 };
      }
      var x = 0,
        y = 0,
        z = 0;
      if (this.items.data.length == 1 && this.items.data[0].location) {
        if (this.items.data[0].location)
          return { lat: 39.8097343, lng: -98.5556199 };
        return {
          lat: this.items.data[0].location.coordinates[1],
          lng: this.items.data[0].location.coordinates[0]
        };
      }

      var total = 0;

      this.items.data.forEach(function(item) {
        if (item.location) {
          total++;
          var latitude = (item.location.coordinates[1] * Math.PI) / 180;
          var longitude = (item.location.coordinates[0] * Math.PI) / 180;

          x += Math.cos(latitude) * Math.cos(longitude);
          y += Math.cos(latitude) * Math.sin(longitude);
          z += Math.sin(latitude);
        }
      });

      x = x / total;
      y = y / total;
      z = z / total;

      var centralLongitude = Math.atan2(y, x);
      var centralSquareRoot = Math.sqrt(x * x + y * y);
      var centralLatitude = Math.atan2(z, centralSquareRoot);

      return {
        lat: (centralLatitude * 180) / Math.PI,
        lng: (centralLongitude * 180) / Math.PI
      };
    }
  },
  data() {
    return {
      states: constants.states,
      provinces: constants.provinces,
      countries: constants.countries,
      showMap: false,
      zoom: 7,
      showMore: false,
      place: null,
      form: {
        category: "",
        state: ""
      },
      filters: {
        services: "",
        name: "",
        country: "US",
        category: "",
        coords: null,
        state: "",
        zip: "",
        costRange: "",
        careType: [],
        specialProgram: [],
        radius: 30
      },
      category: {},
      max: 10,
      page: 0,
      items: {
        total: 0,
        data: []
      },
      infoContent: {},
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    isActive: function(item) {
      if (item.subscription || item.spot) return true;
      return false;
    },
    beforeEnter: function(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = "0px";
        }

        element.style.display = null;
      });
    },
    enter: function(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`;
        });
      });
    },
    afterEnter: function(element) {
      element.style.height = null;
    },
    beforeLeave: function(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`;
        }
      });
    },
    leave: function(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = "0px";
        });
      });
    },
    afterLeave: function(element) {
      element.style.height = null;
    },
    toggleMap: function() {
      this.showMap = this.showMap ? false : true;
    },
    advanceSearch: function(e) {
      this.$router.push({ name: "directoryListing", query: this.form });
      e.preventDefault();
    },
    openWindow: function(item) {
      this.infoContent = item;
      this.infoWinOpen = true;
      this.infoWindowPos = {
        lat: item.location.coordinates[1],
        lng: item.location.coordinates[0]
      };
    },
    more: function() {
      this.$nuxt.$loading.start();
      this.page++;

      var request = {
        max: this.max,
        page: this.page,
        orderby: { spot: -1, subscription: -1 },
        sSearch: null,
        filters: {}
      };
      if (this.filters.state) request.filters.state = this.filters.state;
      if (this.filters.costRange)
        request.filters.costRange = this.filters.costRange;
      if (this.filters.zip) request.filters.zip = this.filters.zip;
      if (this.filters.specialProgram && this.filters.specialProgram.length)
        request.filters.specialProgram = this.filters.specialProgram;
      if (this.filters.careType && this.filters.careType.length)
        request.filters.careType = this.filters.careType;
      if (this.filters.coords) {
        this.zoom = 11;
        request.filters.lng = this.filters.coords[0];
        request.filters.lat = this.filters.coords[1];
        if (this.filters.radius) request.filters.radius = this.filters.radius;
      }
      if (this.filters.category)
        request.filters.category = this.filters.category.replace(
          new RegExp("%20", "g"),
          " "
        );
      if (this.filters.location)
        request.filters.location = this.filters.location.replace(
          new RegExp("%20", "g"),
          " "
        );

      this.$axios
        .get(`/facilities`, { params: request })
        .then(res => {
          this.items.data = this.items.data.concat(res.data.data);
          console.log(this.items.data);
          this.$nuxt.$loading.finish();
        })
        .catch(err => {
          this.$nuxt.$loading.finish();
          console.log(err);
        });
    },
    setPlace: function(place) {
      this.place = place;
      this.filters.coords = [
        place.geometry.location.lng(),
        place.geometry.location.lat()
      ];
      this.$forceUpdate();
    },
    readMore: function(id) {
      $("#" + id).css({ display: "block" });
      $("#more" + id).css({ display: "none" });
      $("#less" + id).css({ display: "block" });
    },
    readLess: function(id) {
      $("#" + id).css({ display: "none" });
      $("#more" + id).css({ display: "block" });
      $("#less" + id).css({ display: "none" });
    },
    changePage: function(n, obj) {
      this.page = n - 1;
      this.search();
    },
    navSearch: function(e) {
      e.preventDefault();
      this.search(0);
    },
    search: function(o) {
      this.$nuxt.$loading.start();
      //Load the items
      if (o == 0) {
        this.page = 0;
      }

      var request = {
        max: this.max,
        page: this.page,
        orderby: { profile: -1 },
        sSearch: null,
        filters: {}
      };
      if (this.filters.state) request.filters.state = this.filters.state;
      if (this.filters.city) request.filters.city = this.filters.city;
      if (this.filters.country) request.filters.country = this.filters.country;
      if (this.filters.costRange)
        request.filters.costRange = this.filters.costRange;
      if (this.filters.zip) request.filters.zip = this.filters.zip;
      if (this.filters.specialProgram && this.filters.specialProgram.length)
        request.filters.specialProgram = this.filters.specialProgram;
      if (this.filters.careType && this.filters.careType.length)
        request.filters.careType = this.filters.careType;
      if (this.filters.radius) request.filters.radius = this.filters.radius;
      if (this.filters.coords) {
        this.zoom = 11;
        request.filters.lng = this.filters.coords[0];
        request.filters.lat = this.filters.coords[1];
      }
      if (this.filters.category)
        request.filters.category = this.filters.category;
      if (this.filters.name) request.filters.name = this.filters.name;
      if (this.filters.services)
        request.filters.services = this.filters.services;
      if (this.filters.state) request.filters.state = this.filters.state;

      this.$axios
        .get(`/facilities`, { params: request })
        .then(res => {
          console.log(res);
          this.items = res.data ? res.data : { data: [], total: 0 };
          this.items.total = this.items.data.length;
          this.$nuxt.$loading.finish();
        })
        .catch(err => {
          console.log(err);
          this.$nuxt.$loading.finish();
        });
    }
  }
};
</script>
