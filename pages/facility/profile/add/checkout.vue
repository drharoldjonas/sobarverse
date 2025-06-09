<template>
  <div class="checkout">
    <div class="sub_header_in">
      <div class="container">
        <h1>Checkout - Profiled Listing</h1>
      </div>
      <!-- /container -->
    </div>
    <!-- /sub_header -->

    <div class="container margin_60">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="step first">
            <h3>1. User info and billing address</h3>

            <div class="billing">
              <div class="row no-gutters">
                <div class="row no-gutters">
                  <div class="col-6 form-group pr-1">
                    <input type="text" class="form-control" name="firstname" placeholder="First Name" v-model="card.firstname">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.firstname }}</span>
                  </span>
                  </div>
                  <div class="col-6 form-group pl-1">
                    <input type="text" class="form-control" name="lastname" placeholder="Last Name" v-model="card.lastname">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.lastname }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- /row -->
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Card number" v-model="card.number">
                <span class="err-msg">
                    <span class="field-validation-valid">{{ errors.number }}</span>
                </span>
              </div>
              <div class="row no-gutters">
                <div class="col-6 form-group pr-1">
                  <input type="text" class="form-control" v-mask="'##/##'" placeholder="mm/yy" v-model="card.exp">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.exp }}</span>
                  </span>
                </div>
                <div class="col-6 form-group pl-1">
                  <input type="password" class="form-control" placeholder="CVV" v-model="card.cvv">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.cvv }}</span>
                  </span>
                </div>
              </div>
              <hr>
              <div class="row no-gutters">
                <div class="col-md-6 form-group pr-1">
                  <input type="email" class="form-control" name="email" placeholder="Email" v-model="card.email">
                </div>
                <div class="col-md-6 form-group pl-1">
                  <input type="text" class="form-control" name="phone" placeholder="Telephone"  v-model="card.phone" v-mask="'(###) ###-####'">
                </div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="address" placeholder="Address" v-model="card.address">
                <span class="err-msg">
                    <span class="field-validation-valid">{{ errors.address }}</span>
                </span>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Address 2" v-model="card.address2">
              </div>
              <div class="row no-gutters">
                <div class="col-6 form-group pr-1">
                  <input type="text" class="form-control" name="city" placeholder="City" v-model="card.city">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.city }}</span>
                  </span>
                </div>
                <div class="col-6 form-group pl-1">
                  <input type="text" class="form-control" name="zip" placeholder="Postal code" v-model="card.zip">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.zip }}</span>
                  </span>
                </div>
              </div>
              <!-- /row -->
              <div class="row no-gutters">
                <div class="col-md-6 form-group pr-1">
                  <select class="form-control" name="state" v-model="card.state">
                    <option value="">Select State</option>
                    <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
                  </select>
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.state }}</span>
                  </span>
                </div>
                <div class="col-md-6 form-group pl-1">
                  <select class="form-control" name="country" v-model="card.country">
                    <option v-for="(country, index) in countries" :value="country.code" :key="index">{{ country.name }}</option>
                  </select>
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.country }}</span>
                  </span>
                </div>
              </div>
              <!-- /row -->
              <hr>
              <figure><img src="/img/cards_all.svg" alt=""></figure>
              <figure><img src="/img/paypal.svg" alt=""></figure>
            </div>
          </div>
          <!-- /step -->
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="step middle">
            <h3>2. Package</h3>
            <div class="payments">
              <ul>
                <template v-for="(item, index) in items">
                  <li v-if="item.advanced && !item.featured" :key="index">
                    <label class="container_radio">{{ item.name }}
                      <input type="checkbox" v-model="plan_id" :true-value="item._id" false-value="">
                      <span class="checkmark"></span>
                      <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.plan }}</span>
                    </span>
                    </label>
                  </li>
                </template>
              </ul>
            </div>
            <div class="payment_info d-none d-sm-block">
              <div>
                <div v-if="plan" class="pt-2">
                  <p>{{ plan.description }}</p>
                  <ul>
                    <li>Advanced Profile - {{ plan.advanced ? 'Yes' : 'No'}}</li>
                    <li>Featured - {{ plan.featured ? 'Yes' : 'No'}}</li>
                  </ul>
                </div>
                <!--<div v-if="plan.featured" class="step middle">-->
                  <!--<h3>2.1 Requested Placements</h3>-->
                  <!--<div>-->
                    <!--<ul>-->
                      <!--<li v-for="(item, index) in spotRequests" :key="index">-->
                        <!--<label class="container_radio">{{ item.spot.placement == 'inner' ? 'Inner Pages' : 'Home Page' }}  - <small>{{ item.status }}</small>-->
                          <!--<input :disabled="item.status != 'approved'" type="radio" name="spot" :value="item.spot" @change="spot = item.spot">-->
                          <!--<span class="checkmark"></span>-->
                        <!--</label>-->
                      <!--</li>-->
                    <!--</ul>-->
                    <!--<span class="err-msg">-->
                      <!--<span class="field-validation-valid">{{ errors.spot }}</span>-->
                    <!--</span>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div v-if="plan.featured" class="step middle">-->
                  <!--<h3>Request Placement</h3>-->
                  <!--<div>-->
                    <!--<ul>-->
                      <!--<template v-for="(item, index) in adspots" >-->
                        <!--<li v-if="checkStatus" :key="index">-->
                          <!--<div class="mt-2">-->
                            <!--{{ item.placement == 'inner' ? 'Inner Pages' : 'Home Page' }} - ${{ item.price }} - -->
                            <!--<small v-if="!checkStatus(item._id)">requested</small>-->
                            <!--<small v-else>{{ item.available > 0 ? 'available': 'unavailable' }}</small>-->
                            <!--<span style="float: right;">-->
                            <!--<small>-->
                              <!--<button v-if="checkStatus(item._id)" class="btn_3" @click="requestSpot(item._id)">request</button>-->
                            <!--</small>-->
                          <!--</span>-->
                          <!--</div>-->
                        <!--</li>-->
                      <!--</template>-->
                    <!--</ul>-->
                    <!--<span class="err-msg">-->
                      <!--<span class="field-validation-valid">{{ errors.spot }}</span>-->
                    <!--</span>-->
                  <!--</div>-->
                <!--</div>-->
              </div>
            </div>
          </div>
          <!-- /step -->
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="step last">
            <h3>3. Order Summary</h3>
            <div class="box_general summary">
              <ul>
                <li>{{ plan.name }}</li>
                <li v-if="facility">Name <span class="float-right">{{ facility.name }}</span></li>
                <li v-if="facility">Profile
                  <span v-if="facility.profile_type == 'TC'" class="float-right">Treatment Center</span>
                  <span v-if="facility.profile_type == 'SL'" class="float-right">Sober Living</span>
                </li>
                <li>Date <span class="float-right">{{ date | format_date }}</span></li>
                <li v-if="plan.featured && spot && spot.price">{{ spot.placement == 'inner' ? 'Inner Pages' : 'Home Page' }} <span class="float-right">${{ spot.price }}</span></li>
                <li>Tax <span class="float-right">0%</span></li>
                <li>TOTAL COST <span class="float-right">${{ total || 0 }}</span></li>
              </ul>
              <div class="form-group">
                <label class="container_check">Please accepts <a target="_blank" href="/terms">Terms and conditions</a>.
                  <input type="checkbox" v-model="terms" value="true">
                  <span class="checkmark"></span>
                  <span class="err-msg">
                    <span class="field-validation-valid">{{ errors.terms }}</span>
                  </span>
                </label>
              </div>

              <a v-if="plan_id" class="btn_1 full-width cart" @click="checkForm">CONFIRM AND PAY</a>
              <a v-else class="btn_1 full-width cart" style="background: #da6f00;" @click="claim">Claim</a>
              <hr>
              <div id="paypal-button-container"></div>
            </div>
            <!-- /box_general -->
          </div>
          <!-- /step -->
        </div>
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  import constants from '~/constants';
  import {mask} from 'vue-the-mask';
  import { mapState } from 'vuex'

  export default {
    middleware: 'auth',
    validate ({ store }) {
      return store.state.profile.facility;
    },
    asyncData({ params, error, $axios, store }) {

      let URL1 = `/packages`;
      let URL2 = `/adspots`;
      let URL3 = `/portal/placement/${store.state.profile.facility._id}`;

      const fetchURL = (url) => $axios.get(url);

      const promiseArray = [URL1, URL2, URL3].map(fetchURL);

      return Promise.all(promiseArray).then((res) => {
        return { items: res[0].data.data || [],  adspots: res[1].data.data || [], spotRequests: res[2].data.data || []}
      }).catch((e) => {
        console.log(e)
      })
    },
    directives: {mask},
    components: {},
    mounted () {
      // this.initPayPal()
    },
    data () {
      return {
        errors: {},
        adspots: [],
        items: [],
        spotRequests: [],
        plan_id: null,
        spot: {},
        terms: false,
        date: new Date(),
        type: 'card',
        card: {
          state: '',
          country: 'US'
        },
        otherAddress: false,
        countries: constants.countries,
        states: constants.states
      }
    },
    computed: {
      ...mapState('profile', ['facility', 'images', 'logo', 'item']),
      total () {
        var price = Number(this.plan.price);
        if (this.plan.featured && this.spot.price) price = price + Number(this.spot.price);
        return price
      },
      plan() {
        let plan = this.items.filter((plan) => {
          return plan._id == this.plan_id;
        });
        return plan[0] || {};
      }
    },
    methods: {
      checkStatus (id) {
        var vspot = this.spotRequests.filter(function(spot){
          return spot.spot_id == id
        })
        return !vspot.length || vspot.length && vspot[0].status != 'pending';
      },
      requestSpot (spot_id) {
        this.$nuxt.$loading.start()
        var request = {facility_id: this.$store.state.profile.facility._id, spot_id: spot_id}
        this.$axios.post(`/portal/placement`, request).then((res) => {
          if(res.data && !res.data.data.error){
            swal({title:"Request Spot", text:"Your request was completed successfully", icon:"success"})
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
      initPayPal: function() {
        document.getElementById('paypal-button-container').innerHTML = "";
        if(this.plan.price) {
          this.$nextTick(function(){
            paypal.Buttons({
              createOrder: function (data, actions) {
                // Set up the transaction
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: this.plan.price,
                      currency_code: 'USD'
                    }
                  }]
                });
              },
              onApprove: function (data, actions) {
                // Capture the funds from the transaction

                return actions.order.capture().then(function (details) {
                  // Show a success message to your buyer

                  this.$axios.post(`/checkout-paypal`, {orderID: data.orderID}).then((res) => {
                    if(res.data && !res.data.error){
                      swal({
                        title: "Notice",
                        text: "Your Purchase was Successful",
                        icon: "success"
                      }).then(function (val) {
                        this.$store.commit('profile/setSuccess', true);
                        this.$router.push({name: 'facility-add-confirm'})
                      });
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
                });
              },
              onError: function (err) {
                console.log(err)
                swal({
                  title: "Sorry",
                  text: "PayPal has encountered a problem. Please try again later.",
                  icon: "error"
                });
              }
            }).render('#paypal-button-container');
          })
        }
      },
      checkForm: function () {
        this.errors = {};
        if (this.card.firstname && this.card.lastname && this.card.number && this.card.cvv &&
          this.card.exp && this.card.address && this.card.city && this.card.state &&
          this.card.country && this.terms && this.plan_id && ((this.plan.featured && this.spot._id) || !this.plan.featured)) {
            this.checkout();
            return;
        }

        if (!this.plan_id) {
          this.errors.plan = 'Please select a plan';
        }
        if (this.plan.featured && !this.spot._id) {
          this.errors.spot = 'Please select an ad spot';
        }
        if (!this.terms) {
          this.errors.terms = 'Please accept the terms and conditions to continue';
        }
        if (!this.card.firstname) {
          this.errors.firstname = 'Card First Name required.';
        }
        if (!this.card.lastname) {
          this.errors.lastname = 'Card Last Name required.';
        }
        if (!this.card.number) {
          this.errors.number = 'Card Number required.';
        }
        if (!this.card.cvv) {
          this.errors.cvv = 'Card Cvv required.';
        }
        if (!this.card.exp) {
          this.errors.exp = 'Card Expiration required.';
        }
        if (!this.card.address) {
          this.errors.address = 'Billing Address required.';
        }
        if (!this.card.city) {
          this.errors.city = 'Billing City required.';
        }
        if (!this.card.state) {
          this.errors.state = 'Billing State required.';
        }
        if (!this.card.country) {
          this.errors.country = 'Billing Country required.';
        }
        if (!this.card.zip) {
          this.errors.zip = 'Billing Postal Code required.';
        }
        $('html,body').stop().animate({
          scrollTop: 0
        }, 'slow', 'swing');
      },
      claim: function() {
        this.errors = {};

        if(!this.terms) {
          if (!this.terms) {
            this.errors.terms = 'Please accept the terms and conditions to continue';
          }

          $('html,body').stop().animate({
            scrollTop: 0
          }, 'slow', 'swing');
          return
        }

        var data = {id: this.$store.state.profile.facility._id};
        this.$axios.post(`/claim`, data).then((res) => {
          if(res.data && !res.data.error){
            this.$store.commit('profile/setSuccess', true);
            this.$router.push({name: 'facility-profile-add-claim'})
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
      checkout: function() {
        this.$nuxt.$loading.start();

        var formData = new FormData();
        formData.append('id', this.facility._id);
        for(var i = 0; i < this.images.length; i++) {
          formData.append('image', this.images[i]);
        }

        formData.append('logo', this.logo);
        formData.append('args', JSON.stringify(this.item));

        formData.append('card', JSON.stringify(this.card));
        formData.append('plan_id', this.plan_id);
        formData.append('spot', this.spot.placement);

        this.$axios.post(`/profile`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
          if(res.data && !res.data.error){
            this.$store.commit('profile/setSuccess', true);
            this.$router.push({name: 'facility-profile-add-confirm'})
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
      }
    }
  }
</script>
