<template>
  <div class="epic">
    <div class="sub_header_in sticky_header">
      <div class="container">
        <h1>Epic - Purchase</h1>
      </div>
      <!-- /container -->
    </div>
    <!-- /sub_header -->

    <main>
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
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.email }}</span>
                    </span>
                  </div>
                  <div class="col-md-6 form-group pl-1">
                    <input type="text" class="form-control" name="phone" placeholder="Telephone"  v-model="card.phone">
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
              </div>
            </div>
            <!-- /step -->
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="step middle">
              <h3>2. Payment Method</h3>
              <div class="payments">
                <ul>
                  <li>
                    <label class="container_radio">Credit Card<a href="#0" class="info"></a>
                      <input type="radio" name="payment" checked>
                      <span class="checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="payment_info d-none d-sm-block">
                <div class="d-flex">
                  <figure><img src="images/ypr.png" alt=""></figure>
                  <figure class="ml-4"><img src="images/logo2.png" alt=""></figure>
                </div>
                <p>After you have successfully purchased this curriculum, you will receive an email to the provided email address on how to access.</p>
              </div>
            </div>
            <!-- /step -->
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="step last">
              <h3>3. Order Summary</h3>
              <div class="box_general summary">
                <ul>
                  <li>Get Sober - Epic Curriculum</li>
                  <li>Date <span class="float-right">{{ date | format_date }}</span></li>
                  <li>Tax <span class="float-right">0%</span></li>
                  <li>TOTAL COST <span class="float-right">${{ total }}</span></li>
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

                <a class="btn_1 full-width cart" @click="checkForm">CONFIRM AND PAY</a>
              </div>
              <!-- /box_general -->
            </div>
            <!-- /step -->
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </main>
    <!--/main-->
  </div>
</template>

<style>
  .epic .payment_info figure img {
    height: 45px;
    width: auto;
  }
</style>

<script>

  import constants from '~/constants';
  import {mask} from 'vue-the-mask'

  export default {
    mounted() {
    },
    data () {
      return {
        errors: {},
        card: {
          state: '',
          country: 'US'
        },
        terms: false,
        countries: constants.countries,
        states: constants.states,
        total: 450,
        tax: 0,
        date: new Date(),
      }
    },
    methods: {
      checkForm: function () {
        this.errors = {};
        if (this.card.firstname && this.card.lastname && this.card.number && this.card.cvv &&
          this.card.exp && this.card.address && this.card.city && this.card.state &&
          this.card.country && this.card.email && this.terms) {
          this.checkout();
          return;
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
        if (!this.card.email) {
          this.errors.email = 'Email Address required.';
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
      checkout: function() {
        this.$nuxt.$loading.start();
        var data = this.card;

        this.$axios.post(`/epic-checkout`, data).then((res) => {
          if(res.data && !res.data.error){
            this.$store.commit('epic/setSuccess', true);
            this.$store.commit('epic/setEmail', this.card.email);
            this.$router.push({name: 'confirm'})
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

