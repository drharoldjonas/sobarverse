<template>
  <div class="container margin_60_35">
    <div class="wpb_text_column wpb_content_element">
      <div class="wpb_wrapper">
        <h2>Submit a Vendor</h2>
        <p>
          We appreciate you taking a couple of minutes to add your vendor to
          our database.<br />
          The submission will be reviewed by our team.<br />
          We may contact you for extra information if necessary.
        </p>
        <p><span style="color: #f25a4f">* Required fields</span></p>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col-lg-12">
          <h4 class="submit-form-user-info">New Vendor</h4>
          <div class="row">
            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Vendor Name <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.name"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.name
                    }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Vendor Type <span>*</span>:</label>
                  <select
                    class="selectpicker form-control"
                    v-model="facility.profile_type"
                    disabled
                  >
                    <option value="">---Select Vendor Type ---</option>
                    <option value="TC">Treatment Center</option>
                    <option value="SL">Sober Living</option>
                    <option value="EP">Education Provider</option>
                  </select>
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.profile_type
                    }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-12"
              v-if="facility.profile_type == 'EP'"
            >
              <h6 class="formlabel">School Information</h6>
              <div class="row">
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    cols="20"
                    v-model="facility.schoolInfo"
                    maxlength="3000"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Street1 <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.address"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.address
                    }}</span>
                  </span>
                </div>

                <div class="col-md-6">
                  <label>Street2 :</label>
                  <input
                    class="form-control"
                    v-model="facility.address2"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>City <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.city"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.city
                    }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Country <span>*</span>:</label>
                  <select
                    class="selectpicker form-control"
                    v-model="facility.country"
                  >
                    <option value="">---Select A Country ---</option>
                    <option
                      v-for="(country, index) in countries"
                      :value="country.code"
                      :key="index"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>State/Province <span>*</span>:</label>
                  <select
                    class="selectpicker form-control"
                    v-model="facility.state"
                    v-if="facility.country == 'US' || facility.country == 'CA'"
                  >
                    <option value="">---Select A State/Province ---</option>
                    <template v-if="facility.country == 'US'">
                      <option
                        v-for="(state, index) in states"
                        :value="state.code"
                        :key="index"
                      >
                        {{ state.name }}
                      </option>
                    </template>
                    <template v-if="facility.country == 'CA'">
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
                    v-model="facility.state"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.state
                    }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Zip <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.zip"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{ errors.zip }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Contact Name (Not Published) <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.contactname"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.contact
                    }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label
                    >Where do you want the contact forms to be
                    emailed?<span>*</span>:</label
                  >
                  <input
                    class="form-control"
                    v-model="facility.email"
                    type="text"
                  />
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.email
                    }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Phone <span>*</span>:</label>
                  <input
                    class="form-control"
                    v-model="facility.phone"
                    type="text"
                  />
                  <span>eg. - (xxx) xxx-xxxx </span>
                  <span class="err-msg">
                    <span class="field-validation-valid">{{
                      errors.phone
                    }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Website:</label>
                  <div class="row">
                    <div class="col-md-3" style="padding-right: 0px">
                      <select
                        class="form-control"
                        data-val="true"
                        data-val-required="The Protocol field is required."
                        v-model="facility.protocol"
                      >
                        <option value="http://">http://</option>
                        <option value="https://">https://</option>
                      </select>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="form-control"
                        v-model="facility.website"
                        placeholder="www."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6 required">
                  <label>Category</label>
                  <client-only>
                    <v-select label="name" :filterable="false" :taggable="true" :multiple="true" :reduce="tag => tag._id || tag" :options="cat_options" v-model="facility.vendor_category" @search="onCatSearch">
                      <template slot="no-options">
                        type to search for Category..
                      </template>
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          {{ option.name }}
                        </div>
                      </template>
                      <template #selected-option="{name}">
                        <div class="selected d-center">
                          {{ getLabel(name) }}
                        </div>
                      </template>
                    </v-select>
                  </client-only>
                  <span class="err-msg">
                    <span class="field-validation-valid">{{ errors.vendor_category }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <new_vendor_attachments :value="facility.profile" @logo="setLogo"></new_vendor_attachments>
      </div>
      <p class="text-right">
        <a
          @click="checkForm"
          class="btn_1 rounded add_top_30"
          style="color: white"
          >Submit</a
        >
      </p>
    </form>
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
            :data-ad-slot="$store.state.settings.adsense.list_slot">
            </InFeedAdsense>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constants from "../../constants";
import New_vendor_attachments from "../../components/new_vendor_attachments.vue";
import 'vue-select/dist/vue-select.css'

export default {
  async asyncData({$axios}) {
    let [db_vendor_categories] = await Promise.all([
      $axios.$post('/vendor-cat-populated')
    ]).catch((err) => {
      console.log(err)
    })

    return { db_vendor_categories: db_vendor_categories.data }
  },

  head: {
    title: `Add a new Vendor`,
  },
  components: {New_vendor_attachments},
  data() {
    return {
      states: constants.states,
      provinces: constants.provinces,
      countries: constants.countries,
      copy: false,
      logo: null,
      errors: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        contact: "",
        vendor_category: "",
      },
      company: {},
      facility: {
        featured: "no",
        protocol: "http://",
        primaryFocus: [],
        servicesProvided: [],
        careType: [],
        specialPrograms: [],
        acceptedPayments: [],
        paymentAssistance: [],
        specialLanguage: [],
        accreditations: [],
        vendor_category: [],
        profile: { logo: null },
        licensing: {
          by: "",
          type: "",
        },
        membership: "",
        category: ["Drug and Alcohol Treatment Centers"],
        surveyCategory: [],
        location: { type: "Point", coordinates: [] },
      },
      cat_options: []
    };
  },
  methods: {
    getLabel(option) {
      if (typeof option === 'object') {
        return option.name
      } else if (typeof option === 'string' && /^[a-fA-F0-9]{24}$/.test(option) && this.db_vendor_categories.length > 0) {
        const data = this.db_vendor_categories.find(i => option.toString() === i._id.toString())
        return data.name
      } else {
        return option
      }
    },
    setLogo(logo) {
      this.logo = logo;
    },
    checkForm: function () {
      this.$nuxt.$loading.start();
      this.errors = {};
      if (
        this.facility.name &&
        this.facility.address &&
        this.facility.city &&
        this.facility.zip &&
        this.facility.state &&
        this.facility.contactname &&
        this.facility.email &&
        this.facility.vendor_category.length > 0
      ) {
        // this.getLocation();
        this.check();
        return;
      }

      if (!this.facility.name) {
        this.errors.name = "Vendor Name required.";
      }
      if (!this.facility.address) {
        this.errors.address = "Vendor Street Address required.";
      }
      if (!this.facility.city) {
        this.errors.city = "Vendor City required.";
      }
      if (!this.facility.state) {
        this.errors.state = "Vendor State required.";
      }
      if (!this.facility.zip) {
        this.errors.zip = "Vendor Zip Code required.";
      }
      if (!this.facility.contactname) {
        this.errors.contact = "Contact Name required.";
      }
      if (!this.facility.email) {
        this.errors.email = "Vendor Email required.";
      }
      if (this.facility.vendor_category.length === 0) {
        this.errors.vendor_category = "Vendor Category required.";
      }
      $("html,body").stop().animate(
        {
          scrollTop: 0,
        },
        "slow",
        "swing"
      );
      this.$nuxt.$loading.finish();
      this.$forceUpdate();
    },
    getLocation: function () {
      var geocoder = new google.maps.Geocoder();
      var address = [
        this.facility.address,
        this.facility.city,
        this.facility.state,
        this.facility.zip,
        this.facility.country,
      ].join(" ");
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          console.log(
            results[0].geometry.location.lng(),
            results[0].geometry.location.lat()
          );
          this.facility.location.coordinates[0] =
            results[0].geometry.location.lng();
          this.facility.location.coordinates[1] =
            results[0].geometry.location.lat();
          this.check();
        } else {
          this.errors.address = "Could not verify address.";
          this.errors.city = "Could not verify address.";
          this.errors.state = "Could not verify address.";
          this.errors.zip = "Could not verify address.";
          $("html,body").stop().animate(
            {
              scrollTop: 0,
            },
            "slow",
            "swing"
          );
          this.$nuxt.$loading.finish();
          this.$forceUpdate();
        }
      });
    },
    check: function () {
      var request = { facilityname: this.facility.name };

      this.$axios
        .post(`/facilities/check`, request)
        .then((res) => {
          if (res.data && !res.data.error) {
            if (res.data.facility) {
              this.errors.name = "Vendor already exist!";
              this.$forceUpdate();
              $("html,body").stop().animate(
                {
                  scrollTop: 0,
                },
                "slow",
                "swing"
              );
              this.$nuxt.$loading.finish();
            } else {
              this.save();
            }
          } else {
            //Handle errors
            swal({ title: "Notice", text: res.data.error, icon: "error" });
            this.$nuxt.$loading.finish();
          }
        })
        .catch((e) => {
          swal({ title: "Notice", text: e.message, icon: "error" });
          this.$nuxt.$loading.finish();
        });
    },
    save: function () {
      let formData = new FormData();

      formData.append('logo', this.logo);
      formData.append('args', JSON.stringify(this.facility));

      this.$axios.post(`/facilities`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
          if (res.data && !res.data.error) {
            swal({
              title: "Notice",
              text: "Facility Created Successfully",
              icon: "success",
            }).then( function (val) {
                this.facility = {
                  featured: "no",
                  protocol: "http://",
                  primaryFocus: [],
                  servicesProvided: [],
                  careType: [],
                  specialPrograms: [],
                  acceptedPayments: [],
                  paymentAssistance: [],
                  specialLanguage: [],
                  accreditations: [],
                  profile: {logo: null},
                  licensing: {
                    by: "",
                    type: "",
                  },
                  membership: "",
                  // category: ["Drug and Alcohol Treatment Centers"],
                  surveyCategory: [],
                  location: { type: "Point", coordinates: [] },
                };
              location.reload()
              }.bind(this)
            );
            this.$nuxt.$loading.finish();
          } else {
            //Handle errors
            swal({ title: "Notice", text: res.data.error, icon: "error" });
            this.$nuxt.$loading.finish();
          }
        })
        .catch((e) => {
          swal({ title: "Notice", text: e.message, icon: "error" });
          this.$nuxt.$loading.finish();
        });
    },
    onCatSearch(search, loading) {
      loading(true);
      this.searchCategory(loading, search, this);
    },
    searchCategory(loading, search, vm) {
      this.$axios.$post(`/vendor-cat-search`, {search: search}).then( res => {
        vm.cat_options = res.data;
        loading(false);
      }).catch(e => {
        console.log(e)
        loading(false)
      });
    }
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
.v-select {
  background: #ffffff !important;
}
</style>
