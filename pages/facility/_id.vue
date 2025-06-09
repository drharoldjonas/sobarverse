<template>
  <div>
    <div class="hero_in shop_detail">
      <div class="wrapper">
        <span
          v-if="
            item.profile &&
            active &&
            item.profile.images &&
            item.profile.images.length
          "
          class="magnific-gallery"
        >
          <a
            :href="item.profile.images[0]"
            class="btn_photos"
            data-effect="mfp-zoom-in"
            >View photos</a
          >
          <a
            v-for="(image, index) in images"
            :href="image"
            data-effect="mfp-zoom-in"
            :key="index"
          ></a>
        </span>
      </div>
    </div>
    <!--/hero_in-->

    <nav class="secondary_nav sticky_horizontal_2">
      <div class="container">
        <ul class="clearfix">
          <li><a href="#description" class="active">Description</a></li>
          <li v-if="item.location && active"><a href="#map">Map</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li v-if="item.company_id"><a href="#sidebar">Contact</a></li>
          <li v-else><a href="#sidebar">Claim</a></li>
          <li></li>
        </ul>
      </div>
    </nav>

    <div class="container margin_60_35">
      <div class="row flex-column-reverse flex-md-row">
        <div class="col-lg-8">
          <section id="description">
            <div class="detail_title_1">
              <h1>{{ item.name }}</h1>
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
                  {{ item.address }} {{ item.state }} {{ item.zip }}
                </button>
              </form>
            </div>

            <div
              v-if="active"
              v-html="item.profile.description"
              v-linkified
            ></div>

            <div v-if="item.profile_type == 'EP' && item.schoolInfo">
              <hr />
              <h4 class="add_bottom_15">School Information</h4>
              <hr />
              <p>{{ item.schoolInfo }}</p>
            </div>

            <div id="services">
              <div
                v-if="
                  item.primaryFocus.length ||
                  item.servicesProvided.length ||
                  item.careType.length ||
                  item.specialPrograms.length
                "
              >
                <hr />
                <h4 class="add_bottom_15">
                  Primary Focus, Services Provided, Type of Care, And Special
                  Programs
                </h4>
                <hr />
              </div>
              <div
                v-if="
                  item.primaryFocus.length ||
                  item.servicesProvided.length ||
                  item.careType.length ||
                  item.specialPrograms.length
                "
                class="row add_bottom_30"
              >
                <div v-if="item.primaryFocus.length" class="col-md-6 mb-3">
                  <h6>Primary Focus</h6>
                  <ul class="bullets">
                    <li
                      v-for="(focus, index) in item.primaryFocus"
                      :key="index"
                    >
                      {{ focus }}
                    </li>
                  </ul>
                </div>
                <div v-if="item.servicesProvided.length" class="col-md-6 mb-3">
                  <h6>Services Provided</h6>
                  <ul class="bullets">
                    <li
                      v-for="(service, index) in item.servicesProvided"
                      :key="index"
                    >
                      {{ service }}
                    </li>
                  </ul>
                </div>
                <div v-if="item.careType.length" class="col-md-6 mb-3">
                  <h6>Type of Care</h6>
                  <ul class="bullets">
                    <li v-for="(type, index) in item.careType" :key="index">
                      {{ type }}
                    </li>
                  </ul>
                </div>
                <div v-if="item.specialPrograms.length" class="col-md-6 mb-3">
                  <h6>Special Programs</h6>
                  <ul class="bullets">
                    <li
                      v-for="(special, index) in item.specialPrograms"
                      :key="index"
                    >
                      {{ special }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="payment">
              <div
                v-if="
                  item.acceptedPayments.length || item.paymentAssistance.length
                "
              >
                <hr />
                <h4 class="add_bottom_15">
                  Form Of Payment, Insurance Accepted, And Treatment Center Cost
                </h4>
                <hr />
              </div>
              <div
                v-if="
                  item.acceptedPayments.length || item.paymentAssistance.length
                "
                class="row add_bottom_30"
              >
                <div v-if="item.acceptedPayments.length" class="col-md-6 mb-3">
                  <h6>Form Of Payment</h6>
                  <ul class="bullets">
                    <li
                      v-for="(payment, index) in item.acceptedPayments"
                      :key="index"
                    >
                      {{ payment }}
                    </li>
                  </ul>
                </div>
                <div v-if="item.paymentAssistance.length" class="col-md-6 mb-3">
                  <h6>Payment Assistance</h6>
                  <ul class="bullets">
                    <li
                      v-for="(assistance, index) in item.paymentAssistance"
                      :key="index"
                    >
                      {{ assistance }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- /row -->
            <TcView
              v-if="item.profile_type == 'TC' && active"
              :profile="item.profile"
            ></TcView>
            <SlView
              v-if="item.profile_type == 'SL' && active"
              :profile="item.profile"
            ></SlView>
            <div
              v-if="item.accreditations && item.accreditations.length"
              class="row add_bottom_30"
            >
              <div class="col-md-12">
                <h6>Accreditations</h6>
                <div
                  class="opening"
                  style="margin-bottom: 25px; padding: 25px 25px 25px 25px"
                >
                  <div class="row">
                    <div
                      v-for="(accreditation, index) in item.accreditations"
                      class="col-md-6"
                      :key="index"
                    >
                      <ul>
                        <li>{{ accreditation }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- /opening -->
              </div>
            </div>
            <div v-if="item.specialLanguage.length" class="row add_bottom_30">
              <div class="col-md-12">
                <h6>Special Lanuages</h6>
                <ul class="bullets">
                  <li
                    v-for="(lanuage, index) in item.specialLanguage"
                    :key="index"
                  >
                    {{ lanuage }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- row -->
          </section>
          <!-- /section -->

          <section
            v-if="
              item.profile &&
              item.profile.images &&
              item.profile.images.length &&
              active
            "
            id="gallery"
          >
            <h3 class="mb-3">Images</h3>
            <div class="grid-gallery">
              <ul class="magnific-gallery text-left">
                <li
                  v-for="(image, index) in item.profile.images"
                  style="margin: 5px !important"
                  :key="index"
                >
                  <figure>
                    <img :src="image" alt="" />
                    <figcaption>
                      <div class="caption-content">
                        <a
                          :href="image"
                          title="Photo title"
                          data-effect="mfp-zoom-in"
                        >
                          <i class="pe-7s-albums"></i>
                        </a>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </div>
            <!-- /grid gallery -->
          </section>

          <section v-if="item.location && active" id="map">
            <h3>Location</h3>
            <div class="map map_single add_bottom_45">
              <client-only>
                <gmap-map
                  class="map"
                  ref="mapRef"
                  :center="{
                    lat: item.location.coordinates[1],
                    lng: item.location.coordinates[0],
                  }"
                  :zoom="13"
                  map-type-id="terrain"
                >
                  <gmap-marker
                    :position="{
                      lat: item.location.coordinates[1],
                      lng: item.location.coordinates[0],
                    }"
                    :clickable="false"
                    :draggable="false"
                  />
                </gmap-map>
              </client-only>
            </div>
            <!-- End Map -->
          </section>
          <!-- /section -->

          <section id="reviews" v-if="item.company_id">
            <h2>Reviews</h2>
            <div class="reviews-container add_bottom_30">
              <div class="row">
                <div class="col-lg-3">
                  <div id="review_summary" style="padding: 46px 10px">
                    <strong
                      >{{ item.review.avg }}
                      <span><small>/5</small></span></strong
                    >
                    <small>Based on {{ item.review.total }} reviews</small>
                  </div>
                </div>
                <div class="col-lg-9">
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' + (item.review.overallAvg / 5) * 100 + '%'
                          "
                          :aria-valuenow="(item.review.overallAvg / 5) * 100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Overall</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' + (item.review.valueAvg / 5) * 100 + '%'
                          "
                          :aria-valuenow="(item.review.valueAvg / 5) * 100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Value</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' + (item.review.staffAvg / 5) * 100 + '%'
                          "
                          :aria-valuenow="(item.review.staffAvg / 5) * 100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Staff</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' +
                            (item.review.accommodationAvg / 5) * 100 +
                            '%'
                          "
                          :aria-valuenow="
                            (item.review.accommodationAvg / 5) * 100
                          "
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Accommodation</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' +
                            (item.review.treatmentAvg / 5) * 100 +
                            '%'
                          "
                          :aria-valuenow="(item.review.treatmentAvg / 5) * 100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Treatment</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                  <div class="row">
                    <div class="col-lg-10 col-8">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          :style="
                            'width: ' + (item.review.foodAvg / 5) * 100 + '%'
                          "
                          :aria-valuenow="(item.review.foodAvg / 5) * 100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-4">
                      <small><strong>Food</strong></small>
                    </div>
                  </div>
                  <!-- /row -->
                </div>
              </div>
              <!-- /row -->
            </div>

            <div class="reviews-container">
              <!-- /review-box -->
              <div
                v-for="(content, index) in reviews.data"
                class="review-box clearfix"
                :key="index"
              >
                <figure class="rev-thumb">
                  <img src="/images/User_Avatar-512.png" alt="" />
                </figure>
                <div
                  class="rev-content row"
                  style="padding: 25px 25px 1px 10px"
                >
                  <div class="rating col-lg-12">
                    <Rating :value="content.rating.avg"></Rating>
                  </div>
                  <div class="rev-info col-lg-12">
                    {{ content.user ? content.user.firstname : "" }} –
                    {{ content.created_ts | format_date }}
                  </div>
                  <div class="rev-text col-lg-12">
                    <p>
                      {{ content.review }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- /review-box -->
              <p
                v-if="
                  reviews.total != 0 &&
                  page + 1 < Math.ceil(reviews.total / max)
                "
                class="text-center"
              >
                <a @click="moreReviews" class="btn_1 rounded add_top_30"
                  >More</a
                >
              </p>
            </div>
            <!-- /review-container -->
          </section>
          <!-- /section -->
          <hr />

          <div class="add-review">
            <h5>Leave a Review</h5>
            <form>
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Month of Stay</label>
                  <select class="form-control" v-model="form.month">
                    <option value="">Month</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label>Year of Stay</label>
                  <select class="form-control" v-model="form.year">
                    <option value="">Year</option>
                    <option
                      v-for="(year, index) in years"
                      :value="year"
                      :key="index"
                    >
                      {{ year }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-12">
                  <label>How do you rate the place?</label>
                  <div class="row mt-2 required">
                    <div class="col-6">
                      <label>Overall <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Overall"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating @ratings="setRating('overall', $event)"></Rating>
                    </div>
                    <div class="col-6">
                      <label>Treatment <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Treatment"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating
                        @ratings="setRating('treatment', $event)"
                      ></Rating>
                    </div>
                  </div>

                  <div class="row required">
                    <div class="col-6">
                      <label>Accommodation <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Accomodation"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating
                        @ratings="setRating('accommodation', $event)"
                      ></Rating>
                    </div>
                    <div class="col-6">
                      <label>Staff <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Staff"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating @ratings="setRating('staff', $event)"></Rating>
                    </div>
                  </div>

                  <div class="row required">
                    <div class="col-6">
                      <label>Value <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Value"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating @ratings="setRating('value', $event)"></Rating>
                    </div>
                    <div class="col-6">
                      <label>Food <span>*</span></label>
                      <span class="err-msg"
                        ><span
                          class="field-validation-valid"
                          data-valmsg-for="Rating_Food"
                          data-valmsg-replace="true"
                        ></span
                      ></span>
                      <Rating @ratings="setRating('food', $event)"></Rating>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <label>Your Review</label>
                  <textarea
                    name="review_text"
                    id="review_text"
                    class="form-control"
                    style="height: 130px"
                    v-model="form.review"
                  ></textarea>
                </div>
                <div
                  class="
                    form-group
                    col-md-12
                    add_top_20 add_bottom_30
                    text-right
                  "
                >
                  <input
                    type="button"
                    value="Submit"
                    class="btn_1"
                    id="submit-review"
                    @click="saveReview"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- /col -->
        <aside class="col-lg-4" id="sidebar" style="z-index: 90">
          <!--<client-only>-->
          <!--<social-sharing :url="this.$route.fullPath"-->
          <!--hashtags="#sobernetwork"-->
          <!--twitter-user="sobernetwork"-->
          <!--inline-template>-->
          <!--<ul class="share-buttons">-->
          <!--<li>-->
          <!--<network network="facebook">-->
          <!--<a class="fb-share" href="#0"><i class="social_facebook"></i> Share</a>-->
          <!--</network>-->
          <!--</li>-->
          <!--<li>-->
          <!--<network network="twitter">-->
          <!--<a class="twitter-share" href="#0"><i class="social_twitter"></i> Share</a>-->
          <!--</network>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</social-sharing>-->
          <!--</client-only>-->
          <div class="box_detail booking">
            <div class="price">
              <h5 class="d-inline">Contact Us</h5>
              <div class="score">
                <span
                  ><em>{{ item.review.total }} Reviews</em></span
                ><strong>{{ item.review.avg }}</strong>
              </div>
            </div>
            <div id="message-contact-detail"></div>
            <form autocomplete="off">
              <div
                v-if="item.website && active && item.company_id"
                class="form-group"
              >
                <label>Visit Website: &nbsp;&nbsp;</label>
                <a
                  @click="viewWebsite"
                  :href="item.protocol + item.website"
                  itemprop="url"
                  class="big-link webLink"
                  target="_blank"
                >
                  {{ item.website.split("/")[0] }}
                </a>
              </div>
              <div
                v-if="telephone && active && item.company_id"
                class="form-group"
              >
                <input
                  @click="viewPhone"
                  v-if="!phone && active"
                  class="form-control"
                  type="button"
                  value="Show Contact Info"
                  style="color: #fff; background-color: #32a067"
                />
                <input
                  v-else
                  style="color: #ffffff; background: #428bca"
                  @click="callPhone(telephone)"
                  class="form-control"
                  type="button"
                  :value="'Click to Call ' + telephone"
                />
                <i
                  v-if="phone"
                  style="color: #ffffff; background: #428bca"
                  class="icon-phone"
                ></i>
                <i
                  v-else
                  class="icon-phone"
                  style="color: #fff; background-color: #32a067"
                ></i>
              </div>
              <hr />
              <div v-if="active && item.company_id">
                <div class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Name"
                    name="name_detail"
                    id="name_detail"
                    v-model="inquiry.name"
                  />
                  <i class="ti-user"></i>
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="email"
                    placeholder="Email"
                    name="email_detail"
                    id="email_detail"
                    v-model="inquiry.email"
                  />
                  <i class="icon_mail_alt"></i>
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    type="email"
                    placeholder="Phone"
                    name="phone_detail"
                    id="phone_detail"
                    v-model="inquiry.phone"
                  />
                  <i class="icon_mail_alt"></i>
                </div>
                <div class="form-group">
                  <label class="mb-2">Preferred Contact</label>
                  <div class="row">
                    <div class="col-6">
                      <label class="container_check"
                        >Phone
                        <input
                          type="radio"
                          v-model="inquiry.preferredContact"
                          value="Phone"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="col-6">
                      <label class="container_check"
                        >Email
                        <input
                          type="radio"
                          v-model="inquiry.preferredContact"
                          value="Email"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <textarea
                    placeholder="Message"
                    class="form-control"
                    name="message_detail"
                    id="message_detail"
                    v-model="inquiry.message"
                  ></textarea>
                  <i class="ti-pencil"></i>
                </div>
                <div class="form-group">
                  <input
                    type="button"
                    value="Contact us"
                    class="add_top_30 btn_1 full-width purchase"
                    id="submit-contact-detail"
                    @click="recaptcha"
                  />
                </div>
              </div>
              <div>
                <div v-if="!active" class="form-group">
                  <label>
                    Is this your Company?
                    <small
                      ><a
                        v-if="
                          $store.state.settings &&
                          $store.state.settings.general &&
                          $store.state.settings.general.phone
                        "
                        :href="'tel:' + $store.state.settings.general.phone"
                        >Need Help?</a
                      ></small
                    >
                  </label>
                  <input
                    type="button"
                    value="Add Profile"
                    class="btn_1 full-width purchase"
                    @click="
                      $router.push({
                        name: 'facility-profile-id',
                        params: { id: item._id },
                      })
                    "
                  />
                </div>
                <div v-if="!item.company_id" class="form-group add_top_30">
                  <label>
                    Claim this Listing
                    <small
                      ><a
                        v-if="
                          $store.state.settings &&
                          $store.state.settings.general &&
                          $store.state.settings.general.phone
                        "
                        :href="'tel:' + $store.state.settings.general.phone"
                        >Need Help?</a
                      ></small
                    >
                  </label>
                  <a
                    type="button"
                    class="btn_1 full-width purchase"
                    style="background: #da6f00"
                    @click="
                      $router.push({
                        name: 'facility-profile-id',
                        params: { id: item._id },
                      })
                    "
                    >Claim</a
                  >
                </div>
                <div v-if="item.company_id && !item.spot" class="form-group">
                  <label>
                    Do you want to make this listing featured?
                    <small
                      ><a
                        v-if="
                          $store.state.settings &&
                          $store.state.settings.general &&
                          $store.state.settings.general.phone
                        "
                        :href="'tel:' + $store.state.settings.general.phone"
                        >Need Help?</a
                      ></small
                    >
                  </label>
                  <a
                    class="btn_1 full-width purchase"
                    href="mailto:info@sobernetwork.com"
                    >Get Featured</a
                  >
                </div>
              </div>
            </form>
          </div>
        </aside>
      </div>
      <!-- /row -->
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
            :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
            :data-ad-client="$store.state.settings.adsense.client_id"
            data-ad-format="fluid"
            :data-ad-slot="$store.state.settings.adsense.list_slot"> -->
            </InFeedAdsense>
            </client-only>
           </div>
        </div>
      </div>
    </div>
    <!-- /container -->
    <FeaturedAds></FeaturedAds>
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
.map {
  width: 100%;
  height: 100%;
}
.hero_in.shop_detail:before {
  /* background: url(/images/bg.jpg) center center no-repeat;
   */
   background: url(/images/logo.png) center center no-repeat;

  /* background-size: cover; */
}
</style>

<script>
import constants from "~/constants";
import SlView from "~/components/SlView";
import TcView from "~/components/TcView";
import Rating from "~/components/Rating";
import FeaturedAds from "~/components/FeaturedAds";

import VueRecaptcha from "vue-recaptcha";

export default {
  components: {
    TcView,
    SlView,
    Rating,
    FeaturedAds,
    "vue-recaptcha": VueRecaptcha,
  },
  asyncData({ params, error, $axios, redirect }) {
    if (/^[a-z0-9]{24,24}$/.test(params.id)) {
      return $axios
        .get(`/facility/get/${params.id}`)
        .then((res) => {
          if (res.data.error) return error({ statusCode: 500 });
          if (!res.data.data) return error({ statusCode: 404 });

          redirect(301, `/facility/${res.data.data.slug}`);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    let URL1 = `/facility/${params.id}`;
    let URL2 = `/reviews/${params.id}`;

    const fetchURL = (url) =>
      $axios.get(url, { params: { filters: { status: "approved" }, max: 1 } });

    const promiseArray = [URL1, URL2].map(fetchURL);

    return Promise.all(promiseArray).then((res) => {
      var data = res[0].data.data || {};
      if (!res[0].data.data || !res[0].data.data._id)
        return error({ statusCode: 404 });
      var data = Object.assign(
        {
          protocol: "http://",
          primaryFocus: [],
          servicesProvided: [],
          careType: [],
          specialPrograms: [],
          acceptedPayments: [],
          paymentAssistance: [],
          specialLanguage: [],
          accreditations: [],
          licensing: {
            by: "",
            type: "",
          },
          membership: "",
          category: [],
          surveyCategory: [],
          showWebsite: false,
          certifiedPartner: false,
          status: "",
          quickPay: "MEBK8B",
          profile: {
            rentRequired: "",
            costRange: "",
            securityDeposit: "",
            noOfBeds: "",
            organizationType: "",
            gender: "",
            livingHouse: "",
            minStay: "",
            employmentRequired: "",
            highRiskEmployment: "",
            petsAllowed: "",
            serviceOffered: [],
            residentRequirements: [],
            amenitiesProvided: [],
            attractionsOfInterest: [],
            otherProviders: [],
            images: [],
            videos: [],
            drug: {},
            maintenance: {},
            otherInfo: "",
            insurance: {},
            programLength: {
              residential: {},
              intensive: {},
              hospital: {},
              outpatient: {},
            },
          },
          review: {
            avg: 0,
            overallAvg: 0,
            treatmentAvg: 0,
            accommodationAvg: 0,
            staffAvg: 0,
            valueAvg: 0,
            foodAvg: 0,
            total: 0,
          },
        },
        data
      );
      return {
        item: data,
        reviews: res[1].data.data || { total: 0, data: [] },
      };
    });
  },
  computed: {
    images: function () {
      if (this.item.profile && this.item.profile.images) {
        return this.item.profile.images.filter(function (img, index) {
          return index !== 0;
        });
      }
      return [];
    },
    active: function () {
      if (this.item.subscription || this.item.spot) return true;
      return false;
    },
    telephone: function () {
      var phone = this.item.phone;
      if (this.item.spot) phone = this.item.spot.phone;
      return phone;
    },
    image: function () {
      if (this.item.profile && this.active) {
        if (this.item.profile.images && this.item.profile.images.length) {
          return this.item.profile.images[0];
        }
      }
      return "";
    },
    limitDesc() {
      if (this.item.profile && this.item.profile.description && this.active) {
        var s = this.item.profile.description;
        s = s.replace(/(^\s*)|(\s*$)/gi, "");
        s = s.replace(/[ ]{2,}/gi, " ");
        s = s.replace(/\n /, "\n");
        s = s.split(" ");
        return s.slice(0, 50).join(" ") + (s.length > 50 ? "..." : "");
      }
    },
  },
  mounted: function () {
    var date = new Date();
    for (var i = 2004; i < date.getFullYear(); i++) {
      this.years.push(i);
    }
    this.impression("page_views");
    this.form.facility_id = this.item._id;
    this.inquiry.facility_id = this.item._id;
  },
  data() {
    return {
      center: { lat: 25.03, lng: -77.39 },
      pin: [{ lat: 25.03, lng: -77.39 }],
      phone: false,
      reviews: {
        total: 0,
      },
      inquiry: {
        facility_id: "",
      },
      years: [],
      item: {
        protocol: "http://",
        primaryFocus: [],
        servicesProvided: [],
        careType: [],
        specialPrograms: [],
        acceptedPayments: [],
        paymentAssistance: [],
        specialLanguage: [],
        accreditations: [],
        licensing: {
          by: "",
          type: "",
        },
        membership: "",
        category: [],
        surveyCategory: [],
        showWebsite: false,
        certifiedPartner: false,
        status: "",
        quickPay: "MEBK8B",
        profile: {
          rentRequired: "",
          costRange: "",
          securityDeposit: "",
          noOfBeds: "",
          organizationType: "",
          gender: "",
          livingHouse: "",
          minStay: "",
          employmentRequired: "",
          highRiskEmployment: "",
          petsAllowed: "",
          serviceOffered: [],
          residentRequirements: [],
          amenitiesProvided: [],
          attractionsOfInterest: [],
          otherProviders: [],
          images: [],
          videos: [],
          drug: {},
          maintenance: {},
          otherInfo: "",
          insurance: {},
          programLength: {
            residential: {},
            intensive: {},
            hospital: {},
            outpatient: {},
          },
        },
        review: {
          avg: 0,
          overallAvg: 0,
          treatmentAvg: 0,
          accommodationAvg: 0,
          staffAvg: 0,
          valueAvg: 0,
          foodAvg: 0,
          total: 0,
        },
      },
      form: {
        facility_id: "",
        month: "",
        year: "",
        review: "",
        rating: {
          overall: 0,
          treatment: 0,
          accommodation: 0,
          staff: 0,
          value: 0,
          food: 0,
        },
      },
      providers: constants.providers,
      infoWindowPos: null,
      infoContent: {
        name: "",
        description: "",
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      page: 0,
      max: 1,
    };
  },
  head() {
    return {
      title: `${this.item.name} ${this.item.city} ${this.item.state} - Reviews, cost, locations, and staff`,
      meta: [
        {
          property: "og:image",
          content: this.image,
        },
        {
          property: "og:description",
          content: `${
            this.item.profile ? (this.limitDesc ? this.limitDesc : "") : ""
          }`,
        },
        {
          property: "og:url",
          content: `https://sober.com/facility/${this.$route.params.id}`,
        },
        {
          property: "og:title",
          content: this.item.name,
        },
        {
          hid: "description",
          name: "description",
          content: `${
            this.item.profile ? (this.limitDesc ? this.limitDesc : "") : ""
          }`,
        },
      ],
    };
  },
  methods: {
    recaptcha() {
      this.$recaptchaLoaded().then(() => {
        this.$recaptcha("login").then((token) => {
          this.inquiry.token = token;
          this.saveInquiry();
        });
      });
    },
    moreReviews: function () {
      this.page++;
      this.searchReviews();
    },
    setRating: function (type, rating) {
      this.form.rating[type] = Number(rating);
    },
    callPhone: function (number) {
      this.impression("phone_clicks");
      location.href = "tel://" + number;
    },
    viewPhone: function () {
      this.phone = true;
      this.impression("phone_views");
    },
    viewWebsite() {
      this.impression("website_views");
    },
    impression: function (type) {
      var request = { type: type };
      request.facility_id = this.item._id;
      request.company_id = this.item.company_id;

      this.$axios.post(`/impressions`, request);
    },
    saveInquiry: function () {
      this.$nuxt.$loading.start();
      var request = this.inquiry;
      request.facility_id = this.item._id;
      request.company_id = this.item.company_id;
      request.receiver = this.item.email;
      this.$axios
        .post(`/contact`, request)
        .then((res) => {
          if (res.data && !res.data.error) {
            this.impression("form_fills");
            swal({
              title: "Notice",
              text: "Inquiry Created Successfully",
              icon: "success",
            }).then(
              function (val) {
                this.inquiry = {
                  facility_id: this.item._id,
                };
              }.bind(this)
            );
            this.$nuxt.$loading.finish();
          } else {
            //Handle errors
            swal({ title: "Notice", text: res.data.error, icon: "error" });
            this.$nuxt.$loading.finish();
          }
        })
        .catch((err) => {
          swal({ title: "Error", text: this.errormsg, icon: "error" });
          this.$nuxt.$loading.finish();
        });
    },
    saveReview: function () {
      this.$nuxt.$loading.start();
      var request = this.form;
      request.company_id = this.item.company_id;

      this.$axios
        .post(`/reviews`, request)
        .then((res) => {
          if (res.data && !res.data.error) {
            swal({
              title: "Notice",
              text: "Thank you, your review is under moderation. It will appear soon",
              icon: "success",
            }).then(
              function (val) {
                this.form = {
                  facility_id: this.item._id,
                  month: "",
                  year: "",
                  review: "",
                };
                this.setRating("overall", 0);
                this.setRating("treatment", 0);
                this.setRating("accommodation", 0);
                this.setRating("staff", 0);
                this.setRating("value", 0);
                this.setRating("food", 0);
              }.bind(this)
            );
          } else {
            //Handle errors
            swal({ title: "Notice", text: res.data.error, icon: "error" });
          }
          this.$nuxt.$loading.finish();
        })
        .catch((err) => {
          swal({ title: "Error", text: this.errormsg, icon: "error" });
          this.$nuxt.$loading.finish();
        });
    },
    searchReviews: function () {
      this.$nuxt.$loading.start();
      var request = {
        filters: { status: "approved" },
        page: this.page,
        max: this.max,
      };

      this.$axios
        .get(`/reviews/${this.item._id}`, { params: request })
        .then((res) => {
          if (res.data && !res.data.error) {
            console.log(res.data.data.data);
            this.reviews.data.push(res.data.data.data[0]);
            this.$forceUpdate();
          } else {
            //Handle errors
            console.log("eroor");
            swal({ title: "Notice", text: res.data.error, icon: "error" });
          }
          this.$nuxt.$loading.finish();
        })
        .catch((err) => {
          console.log(err);
          swal({ title: "Error", text: this.errormsg, icon: "error" });
          this.$nuxt.$loading.finish();
        });
    },
  },
};
</script>
