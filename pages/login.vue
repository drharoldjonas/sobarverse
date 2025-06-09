<template>
  <div class="container margin_60">
    <div class="row justify-content-center">
      <div class="col-xl-6 col-lg-6 col-md-8">
        <div class="box_account">
          <h3 class="client">Already Client</h3>
          <div class="form_container">
            <!--<div class="row no-gutters">-->
              <!--<div class="col-lg-6 pr-lg-1">-->
                <!--<a @click="facebook" class="social_bt facebook" style="color: #fff;">Login with Facebook</a>-->
              <!--</div>-->
              <!--<div class="col-lg-6 pl-lg-1">-->
                <!--<a @click="google" class="social_bt google" style="color: #fff;">Login with Google</a>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="divider"><span>Or</span></div>-->
            <div class="err">{{ errorMsg }}</div>
            <div class="form-group">
              <input type="email" class="form-control" name="email" v-model="email" placeholder="Email*">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="password_in" id="password_in" v-model="password" placeholder="Password*">
            </div>
            <div class="clearfix add_bottom_15">
              <div class="checkboxes float-left">
                <label class="container_check">Remember me
                  <input type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="float-right"><a href="#forgot-dialog" id="forgot-password">Lost Password?</a></div>
            </div>
            <div class="text-center"><input type="button" @click="login" value="Log In" class="btn_1 full-width"></div>
            <div v-if="reset_pwd" id="forgot_pw">
              <div class="form-group">
                <input type="email" class="form-control" name="email_forgot" id="forgotten" placeholder="Type your email">
              </div>
              <p>A new password will be sent shortly.</p>
              <div class="text-center"><input type="button" value="Reset Password" class="btn_1"></div>
            </div>
          </div>
          <!-- /form_container -->
        </div>
        <!-- /box_account -->
        <div class="row hidden_tablet">
          <div class="col-md-6">
            <ul class="list_ok">
              <li>Find Locations</li>
              <li>Quality Location check</li>
              <li>Data Protection</li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list_ok">
              <li>Secure Payments</li>
              <li>H24 Support</li>
            </ul>
          </div>
        </div>
        <!-- /row -->
      </div>
      <div class="col-xl-6 col-lg-6 col-md-8">
        <div class="box_account">
          <h3 class="new_client">New Client</h3> <small class="float-right pt-2">* Required Fields</small>
          <div class="form_container">
            <div class="form-group">
              <input type="email" class="form-control" v-model="form.user.email"  name="email" placeholder="Email*">
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.userEmail }}</span>
              </span>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="form.user.password" name="password_in_2" id="password_in_2" value="" placeholder="Password*">
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.userPassword }}</span>
              </span>
            </div>
            <div class="private box">
              <div class="row no-gutters">
                <div class="col-6 pr-1">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="form.user.firstname" placeholder="First Name*">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.firstname }}</span>
                    </span>
                  </div>
                </div>
                <div class="col-6 pl-1">
                  <div class="form-group">
                    <input type="text" class="form-control" v-model="form.user.lastname" placeholder="Last Name*">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.lastname }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <hr class="mt-3 mb-3">
              <!-- /row -->
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <input type="text" class="form-control" name="name" v-model="form.company.name" placeholder="Company Name*">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.companyname }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-6 pr-1">
                  <div class="form-group">
                    <input type="text" class="form-control" name="telephone" v-model="form.company.phone" placeholder="Telephone *">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.phone }}</span>
                    </span>
                  </div>
                </div>
                <div class="col-6 pl-1">
                  <div class="form-group">
                    <input type="text" class="form-control" name="email" v-model="form.company.email" placeholder="Email *">
                    <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.companyemail }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 ">
                  <div class="form-group">
                    <input type="text" class="form-control" name="address" v-model="form.company.address" placeholder="Address">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <input type="text" class="form-control" name="address2" v-model="form.company.address2" placeholder="Address 2">
                  </div>
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-6 pr-1">
                  <div class="form-group">
                    <input type="text" class="form-control" name="city" v-model="form.company.city" placeholder="City">
                  </div>
                </div>
                <div class="col-6 pl-1">
                  <div class="form-group">
                    <input type="text" class="form-control" name="zip" v-model="form.company.zip" placeholder="Postal Code">
                  </div>
                </div>
                <div class="row no-gutters">
                  <div class="col-6 pr-1">
                    <div class="form-group">
                      <select class="form-control" name="state" v-model="form.company.state">
                        <option value="" selected>State</option>
                        <option v-for="(state, index) in states" :value="state.name" :key="index">{{ state.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6 pl-1">
                    <div class="form-group">
                      <select class="form-control" name="country" v-model="form.company.country">
                        <option value="" selected>Country</option>
                        <option v-for="(country, index) in countries" :value="country.name" :key="index">{{ country.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /row -->
            </div>
            <!-- /privato -->
            <div class="form-group">
              <label class="container_check">Accept <a href="/terms">Terms and conditions</a>
                <input type="checkbox" v-model="terms">
                <span class="checkmark"></span>
                <span class="err-msg">
                  <span class="field-validation-valid">{{ errors.terms }}</span>
                </span>
              </label>
            </div>
            <div class="text-center"><input type="button" value="Register" class="btn_1 full-width" @click="checkForm"></div>
          </div>
          <!-- /form_container -->
        </div>
        <!-- /box_account -->
      </div>
    </div>
    <!-- /row -->

    <!-- Sign In Popup -->
    <div id="forgot-dialog" class="zoom-anim-dialog mfp-hide">
      <div class="small-dialog-header">
        <h3>Forget Password</h3>
      </div>
      <form>
        <div class="sign-in-wrapper">
          <div>
            <div class="form-group">
              <label>Please confirm login email below</label>
              <input type="email" class="form-control" v-model="email_reset">
              <i class="icon_mail_alt"></i>
            </div>
            <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
            <div class="text-center"><input type="button" value="Reset Password" class="btn_1" @click="reset"></div>
          </div>
        </div>
      </form>
      <!--form -->
    </div>
    <!-- /Sign In Popup -->
  </div>
</template>

<style>
  .err {
    color: red;
    font-size: 20px;
    text-align: left;
    margin-bottom: 10px;
  }
</style>

<script>
  import constants from '~/constants'

  export default {
    head: {
      title: `Sign in to Sober`,
    },
    components: {},
    data () {
      return {
        countries: constants.countries,
        states: constants.states,
        email: '',
        password: '',
        email_reset: '',
        form: {
          company: {
            country: '',
            state: ''
          },
          user: {}
        },
        errorMsg: null,
        terms: false,
        reset_pwd: false,
        errors: {}
      }
    },
    mounted() {
      $('#forgot-password').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
        mainClass: 'my-mfp-zoom-in'
      });
    },
    computed: {},
    methods: {
      facebook: function() {
        this.$auth.loginWith('facebook')
      },
      google: function() {
        this.$auth.loginWith('google')
      },
      checkForm: function () {
        this.$nuxt.$loading.start();
        this.errors = {};
        if (this.form.user.firstname && this.form.user.lastname && this.form.user.email && this.form.user.password &&
          this.form.company.name && this.form.company.phone && this.form.company.email && this.terms) {
          this.register();
          return;
        }

        if (!this.terms) {
          this.errors.terms = 'Please accept the terms and conditions to continue';
        }

        if (!this.form.user.firstname) {
          this.errors.firstname = 'User first name required.';
        }
        if (!this.form.user.lastname) {
          this.errors.lastname = 'User last name required.';
        }
        if (!this.form.user.email) {
          this.errors.userEmail = 'User email required.';
        }
        if (!this.form.user.password) {
          this.errors.userPassword = 'User password required.';
        }
        if (!this.form.company.name) {
          this.errors.companyname = 'Company name required.';
        }
        if (!this.form.company.phone) {
          this.errors.phone = 'Company Telephone required.';
        }
        if (!this.form.company.email) {
          this.errors.companyemail = 'Company email required.';
        }
        $('html,body').stop().animate({
          scrollTop: 0
        }, 'slow', 'swing');
        this.$nuxt.$loading.finish();
      },
      async login() {
        this.$nuxt.$loading.start();
        var request = {email: this.email, password: this.password};
        this.errorMsg = null;

        try {
          await this.$auth.loginWith('local', {
            data: request
          });
        } catch (e) {
          this.$nuxt.$loading.finish();
          console.log('Error')
          this.errorMsg = 'Invalid Credentials';
        }
      },
      register: function() {
        this.$nuxt.$loading.start();
        var request = this.form;

        this.$axios.post(`/register`, request).then((res) => {
          if(res.data.user && !res.data.error){
            swal({title:"Notice", text:"Your Registration was Successful", icon:"success"}).then(async function(val){
              var request = {email: this.form.user.email, password: this.form.user.password};

              try {
                await this.$auth.loginWith('local', {
                  data: request
                });
              } catch (e) {
                console.log('Error')
                this.errorMsg = 'Invalid Credentials';
              }
            }.bind(this));
          } else {
            //Handle errors
            if(res.data.error_code == 1) this.errors.companyname = 'Company Name already exist';
            if(res.data.error_code == 2) this.errors.userEmail = 'User already exist';

            this.$forceUpdate()
            this.$nuxt.$loading.finish();
            this.errormsg = (res.data && res.data.error)? res.data.error : false;
            swal({title:"Notice", text:res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish();
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: this.errormsg, icon:"error"});
        });
      },
      reset: function() {
        this.$nuxt.$loading.start();
        var request = {email: this.email_reset};

        this.$axios.post(`/reset/password`, request).then((res) => {
          if(res.data.data && !res.data.error){
            swal({title:"Password Reset Successful", text:"Please check your email for login credentials.", icon:"success"}).then(async function(val){
              $('.mfp-close').click();
            }.bind(this));
          } else {
            //Handle errors
            this.errormsg = (res.data && res.data.error)? res.data.error : false;
            swal({title:"Notice", text:res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish();
        }).catch((err) => {
          this.$nuxt.$loading.finish();
          swal({title:"Error", text: this.errormsg, icon:"error"});
        });
      }
    }
  }
</script>
