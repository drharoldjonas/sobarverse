<template>
  <div class="container margin_60_35">
    <div class="wpb_text_column wpb_content_element ">
      <div class="wpb_wrapper">
        <h4 v-if="facility._id" class="submit-form-user-info">Edit Vendor</h4>
        <h4 v-else class="submit-form-user-info">New Vendor</h4>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Facility Name <span>*</span>:</label>
                  <input class="form-control" v-model="facility.name" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.name }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Facility Type <span>*</span>:</label>
                  <select class="selectpicker form-control" v-model="facility.profile_type" disabled>
                    <option value="">---Select Facility Type ---</option>
                    <option value="TC">Treatment Center</option>
                    <option value="SL">Sober Living</option>
                    <option value="EP">Education Provider</option>
                  </select>
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.profile_type }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12" v-if="facility.profile_type == 'EP'">
              <h6 class="formlabel">School Information</h6>
              <div class="row">
                <div class="col-md-9">
                  <textarea class="form-control" cols="20" v-model="facility.schoolInfo" maxlength="3000" rows="5"></textarea>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Street1 <span>*</span>:</label>
                  <input class="form-control" v-model="facility.address" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.address }}</span>
                  </span>
                </div>

                <div class="col-md-6">
                  <label>Street2 :</label>
                  <input class="form-control" v-model="facility.address2" type="text">
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>City <span>*</span>:</label>
                  <input class="form-control" v-model="facility.city" type="text">
                  <span class="err-msg">
                     <span class="field-validation-valid">{{ errors.city }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Country <span>*</span>:</label>
                  <select class="selectpicker form-control" v-model="facility.country">
                    <option value="">---Select A Country ---</option>
                    <option v-for="(country, index) in countries" :value="country.code" :key="index">{{ country.name }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>State/Province <span>*</span>:</label>
                  <select class="selectpicker form-control" v-model="facility.state" v-if="facility.country == 'US' || facility.country == 'CA'">
                    <option value="">---Select A State/Province ---</option>
                    <template v-if="facility.country == 'US'">
                      <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
                    </template>
                    <template v-if="facility.country == 'CA'">
                      <option v-for="(province, index) in provinces" :value="province.code" :key="index">{{ province.name }}</option>
                    </template>
                  </select>
                  <input v-else class="form-control" v-model="facility.state" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.state }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Zip <span>*</span>:</label>
                  <input class="form-control" v-model="facility.zip" type="text">
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
                  <input class="form-control" v-model="facility.contactname" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.contact }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Where do you want the contact forms to be emailed?<span>*</span>:</label>
                  <input class="form-control" v-model="facility.email" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.email }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-md-6 required">
                  <label>Phone <span>*</span>:</label>
                  <input class="form-control" v-model="facility.phone" type="text">
                  <span>eg. - (xxx) xxx-xxxx </span>
                  <span class="err-msg">
                     <span class="field-validation-valid">{{ errors.phone }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Website:</label>
                  <div class="row">
                    <div class="col-md-3" style="padding-right:0px;">
                      <select class="form-control" data-val="true" data-val-required="The Protocol field is required." v-model="facility.protocol">
                        <option value="http://">http://</option>
                        <option value="https://">https://</option>
                      </select>
                    </div>
                    <div class="col-md-9">
                      <input class="form-control" v-model="facility.website" placeholder="www." type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 required">
                  <label>Category</label>
                  <client-only>
                    <v-select label="name" :filterable="false" :taggable="true" :reduce="tag => tag._id || tag" :multiple="true"  :options="cat_options" v-model="facility.vendor_category" @search="onCatSearch">
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
                </div>
              </div>
            </div>
          </div>
        </div>


<!--        <template v-if="facility.profile_type">-->
<!--          <TcEdit v-if="facility.profile_type == 'TC'" :profile="facility.profile" @data="setProfile"></TcEdit>-->
<!--          <SlEdit v-if="facility.profile_type == 'SL'" :profile="facility.profile" @data="setProfile"></SlEdit>-->
<!--        </template>-->

        <Attachments :value="facility.profile" @data="setProfile" @images="setImages" @logo="setLogo"></Attachments>

        <div class="col-lg-12">
          <h4 class="submit-form-user-info">Admin Fields</h4>
          <hr>
          <div class="row">
            <div class="col-lg-3">
              <label class="container_check">Show Website
                <input type="checkbox" v-model="facility.showWebsite" value="yes">
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="col-lg-3">
              <label class="container_check">Certified Partner
                <input type="checkbox" v-model="facility.certifiedPartner" value="yes">
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="col-lg-3">
              <label class="container_check">Featured
                <input type="checkbox" v-model="facility.featured" value="true">
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="col-lg-3">
              <h6 class="formlabel">Status</h6>
              <select class="form-control" v-model="facility.status">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="disabled">Disabled</option>
                <option value="not approved">Not Approved</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      <p class="text-right"><a @click="checkForm" class="btn_1 rounded add_top_30" style="color: white;">Save</a></p>
    </form>
  </div>
</template>

<script>
  import SlEdit from "~/components/SlEdit";
  import TcEdit from "~/components/TcEdit";
  import Attachments from "~/components/Attachments";
  import constants from "~/constants";
  import 'vue-select/dist/vue-select.css'

  var item = {
    protocol: 'http://',
    primaryFocus: [],
    servicesProvided: [],
    careType: [],
    specialPrograms: [],
    acceptedPayments: [],
    paymentAssistance: [],
    specialLanguage: [],
    accreditations: [],
    licensing : {
      by: '',
      type: ''
    },
    membership: '',
    category: [],
    surveyCategory: [],
    showWebsite: false,
    certifiedPartner: false,
    status: '',
    quickPay: 'MEBK8B',
    profile: constants.profile,
    review: {
      avg: 0,
      overallAvg: 0,
      treatmentAvg: 0,
      accommodationAvg: 0,
      staffAvg: 0,
      valueAvg: 0,
      foodAvg: 0,
      total: 0
    },
    vendor_category: [],
    db_vendor_category: []
  };

  export default {
    middleware: 'auth',
    validate ({ params }) {
      // Must be a number
      return /^[a-z0-9]{24,24}$/.test(params.id)
    },

    async asyncData({$axios, params}) {
      let [facility, db_vendor_categories] = await Promise.all([
        $axios.get(`/portal/facilities/${params.id}`),
        $axios.$post('/vendor-cat-populated')
      ]).catch((err) => {
        console.log(err)
      })

      return { facility: Object.assign(item, facility.data.data), db_vendor_categories: db_vendor_categories.data }
    },

    components: {
      SlEdit,
      TcEdit,
      Attachments
    },
    data () {
      return {
        states: constants.states,
        provinces: constants.provinces,
        countries: constants.countries,
        errors: {
          name: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
          email: '',
          contact: ''
        },
        status: 'pending',
        terms: false,
        images: [],
        logo: null,
        facility: item,
        cat_options: []
      }
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
      checkForm: function () {
        this.errors = {};
        if (this.facility.name && this.facility.address && this.facility.city && this.facility.zip && this.facility.state &&
          this.facility.contactname && this.facility.email && this.facility.phone) {
          this.save();
          return;
        }

        if (!this.facility.name) {
          this.errors.name = 'Facility Name required.';
        }
        if (!this.facility.address) {
          this.errors.address = 'Facility Street Address required.';
        }
        if (!this.facility.city) {
          this.errors.city = 'Facility City required.';
        }
        if (!this.facility.state) {
          this.errors.state = 'Facility State required.';
        }
        if (!this.facility.zip) {
          this.errors.zip = 'Facility Zip Code required.';
        }
        if (!this.facility.phone) {
          this.errors.phone = 'Facility Telephone required.';
        }
        if (!this.facility.contactname) {
          this.errors.contact = 'Contact Name required.';
        }
        if (!this.facility.email) {
          this.errors.email = 'Facility Email required.';
        }
        $('html,body').stop().animate({
          scrollTop: 0
        }, 'slow', 'swing');
      },
      setLogo: function(logo) {
        this.logo = logo;
      },
      setImages: function(images) {
        this.images = images;
      },
      setProfile: function(data) {
        Object.assign(this.facility.profile, data)
      },
      getLocation: function() {
        var geocoder = new google.maps.Geocoder();
        var address = [this.facility.address, this.facility.city, this.facility.state, this.facility.zip, this.facility.country].join(' ');
        geocoder.geocode({'address': address}, (results, status) => {
          if (status === 'OK') {
            this.facility.location.coordinates[0] = results[0].geometry.location.lng();
            this.facility.location.coordinates[1] = results[0].geometry.location.lat();
            this.save()
          } else {
            this.errors.address = 'Could not verify address.';
            this.errors.city = 'Could not verify address.';
            this.errors.state = 'Could not verify address.';
            this.errors.zip = 'Could not verify address.';
            $('html,body').stop().animate({
              scrollTop: 0
            }, 'slow', 'swing');
          }
        });
      },
      save: function() {
        this.$nuxt.$loading.start()

        var formData = new FormData();
        formData.append('id', this.$route.params.id);
        for(var i = 0; i < this.images.length; i++) {
          formData.append('image', this.images[i]);
        }
        formData.append('logo', this.logo);
        formData.append('args', JSON.stringify(this.facility));

        this.$axios.put(`/portal/facilities`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Facility Successfully Saved", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            console.log('eroor')
            swal({title:"Notice", text: res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: this.errormsg, icon:"error"});
          this.$nuxt.$loading.finish()
        });
      },
      onCatSearch(search, loading) {
        loading(true);
        this.searchCategory(loading, search, this);
      },
      searchCategory(loading, search, vm) {
        this.$axios.$post(`/admin/category/search`, {search: search}).then( res => {
          vm.cat_options = res.data;
          loading(false);
        }).catch(e => {
          console.log(e)
          loading(false)
        });
      },
    }
  }
</script>
<style scoped>
  .v-select {
    background: #ffffff !important;
  }
</style>
