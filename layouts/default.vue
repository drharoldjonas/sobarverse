<template>
  <div>
    <Header :settings="$store.state.settings" :menus="$store.state.menus" />
      <nuxt />
    <Footer :settings="$store.state.settings" />
    <!-- Sign In Popup -->
    <div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
      <div class="small-dialog-header">
        <h3>Sign In</h3>
      </div>
      <form @submit="reset">
        <div class="sign-in-wrapper">
          <!--<a href="#0" class="social_bt facebook">Login with Facebook</a>-->
          <!--<a href="#0" class="social_bt google">Login with Google</a>-->
          <!--<div class="divider"><span>Or</span></div>-->
          <div class="err">{{ errorMsg }}</div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" name="email" id="email" v-model="email">
            <i class="icon_mail_alt"></i>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" name="password" id="password" v-model="password">
            <i class="icon_lock_alt"></i>
          </div>
          <div class="clearfix add_bottom_15">
            <div class="checkboxes float-left">
              <label class="container_check">Remember me
                <input type="checkbox">
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="float-right mt-1"><a id="forgot" @click="forgot_pw=true">Forgot Password?</a></div>
          </div>
          <div class="text-center"><input type="button" @click="login" value="Log In" class="btn_1 full-width"></div>
          <div class="text-center">
            Don’t have an account? <a href="/register">Sign up</a>
          </div>
          <div v-if="forgot_pw" id="forgot_pw">
            <div class="form-group">
              <label>Please confirm login email below</label>
              <input type="email" class="form-control" v-model="email_reset">
              <i class="icon_mail_alt"></i>
            </div>
            <p>You will receive an email containing a link allowing you to reset your password to a new preferred one.</p>
            <div class="text-center"><input type="submit" value="Reset Password" class="btn_1"></div>
          </div>
        </div>
      </form>
      <!--form -->
    </div>
    <!-- /Sign In Popup -->
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";

  export default {
    components: {Footer, Header},
    data () {
      return {
        countries: [],
        states: [],
        user: {},
        settings: {general: {}, social: {}, adsense: {}, banners: {}},
        forgot_pw: false,
        errorMsg: null,
        email_reset: '',
        email: '',
        password: '',
      }
    },
    methods: {
      async login() {
        this.$nuxt.$loading.start();
        var request = {email: this.email, password: this.password};
        this.errorMsg = null;

        try {
          await this.$auth.loginWith('local', {
            data: request
          });
          $('.mfp-close').click();
        } catch (e) {
          this.$nuxt.$loading.finish();
          this.errorMsg = 'Invalid Credentials';
        }
        this.$nuxt.$loading.finish();
      },
      reset: function(e) {
        e.preventDefault()
        this.$nuxt.$loading.start();
        var request = {email: this.email_reset};

        this.$axios.post(`/reset/password`, request).then((res) => {
          if(res.data.data && !res.data.error){
            swal({title:"Password Reset Successful", text:"Please check your email for login credentials.", icon:"success"}).then(async function(val){
              this.forgot_pw = false;
            }.bind(this));
          } else {
            //Handle errors
            this.errormsg = (res.data && res.data.error)? res.data.error : false;
            swal({title:"Notice", text:res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish();
        }).catch((err) => {
          swal({title:"Error", text: this.errormsg, icon:"error"});
        });
      }
    }
  }
</script>
