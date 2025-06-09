<template>
  <div class="setup section--bg row">
    <div
      class="col-12 col-sm-8 border p-3"
      style="background-color:white;height: 100%;"
    >
      <h2 v-if="step == 1" class="text-muted step-title text-center">
        How soon do you need help?
      </h2>

      <h2 v-if="step == 2" class="text-muted step-title text-center">
        I need help with
      </h2>

      <h2 v-if="step == 3" class="text-muted step-title text-center">
        Will you go through withdrawal if you stop using?
      </h2>

      <h2 v-if="step == 4" class="text-muted step-title text-center">
        How will you pay for treatment?
      </h2>

      <h2 v-if="step == 5" class="text-muted step-title text-center">
        Where are you located?
      </h2>

      <h2 v-if="step == 6" class="text-muted step-title text-center">
        Connect
      </h2>

      <div class="steps">
        <div class="progress mt-2 mb-3" style="height:0.25rem; border-radius:8px;">
          <div
            v-if="step === 1"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
          <div
            v-else-if="step === 2"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
          <div
            v-else-if="step === 3"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
          <div
            v-else-if="step === 4"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
          <div
            v-else-if="step === 5"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
          <div
            v-else-if="step === 6"
            class="progress-bar bg-success progress-bar-striped progress-bar-animated"
            role="progressbar"
            :aria-valuenow="(step / steps) * 100"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': (step / steps) * 100 + '%'}"
          />
        </div>

        <div v-if="step === 1">
          <ul class="list-option mobile-hideimages">
            <li class="">
              <label>
                <input type="radio" v-model="form.time" @click="next" value="ASAP">
                <span>ASAP</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.time" @click="next" value="A few days">
                <span>A few days</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.time" @click="next" value="In 2 weeks">
                <span>In 2 weeks</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.time" @click="next" value="Within a month">
                <span>Within a month</span>
              </label>
            </li>
          </ul>
        </div>

        <div v-if="step === 2">
          <ul class="list-option mobile-hideimages">
            <li class="">
              <label>
                <input type="radio" v-model="form.treatment" @click="next" value="Alcohol">
                <span>Alcohol</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.treatment" @click="next" value="Drugs">
                <span>Drugs</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.treatment" @click="next" value="Mental Health">
                <span>Mental Health</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.treatment" @click="next" value="Dual Diagnosis">
                <span>Dual Diagnosis</span>
              </label>
            </li>
          </ul>
        </div>

        <div v-if="step === 3">
          <ul class="list-option mobile-hideimages">
            <li class="">
              <label>
                <input type="radio" v-model="form.withdrawal" @click="next" value="Yes">
                <span>Yes</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.withdrawal" @click="next" value="No">
                <span>No</span>
              </label>
            </li>
          </ul>
        </div>

        <div v-if="step === 4">
          <ul class="list-option mobile-hideimages">
            <li class="">
              <label>
                <input type="radio" v-model="form.payment" @click="next" value="Insurance">
                <span>Insurance</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.payment" @click="next" value="Medicare">
                <span>Medicare</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.payment" @click="next" value="Medicaid">
                <span>Medicaid</span>
              </label>
            </li>
            <li class="">
              <label>
                <input type="radio" v-model="form.payment" @click="next" value="Self Pay">
                <span>Self Pay</span>
              </label>
            </li>
          </ul>
        </div>

        <div v-if="step === 5" class="text-center mt-5">
          <h4>Enter your ZIP</h4>
          <div class="custom-search-input-1 mt-3" style="max-width: 300px;margin: 0 auto;">
            <div class="form-group">
                <input class="form-control" type="text" v-model="form.location" placeholder="Zip">
                <i class="icon_pin_alt"></i>
            </div>
          </div>
          <input class="btn_1 m-5" type="button" @click="next" value="Next">
        </div>

        <div v-if="step === 6" class="text-center mt-5">
          <h4>Please complete the form below so we can connect you to treatment options</h4>
          <div class="container text-left">
            <form class="mt-5" autocomplete="off">
              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <label>First Name</label>
                      <input class="form-control" type="text" v-model="form.firstname" autocomplete="none">
                      <span class="err-msg">
                        <span class="field-validation-valid">{{ errors.firstname }}</span>
                      </span>
                    </div>
                    <div class="col-lg-6">
                      <label>Last Name</label>
                      <input class="form-control" type="text" v-model="form.lastname" autocomplete="none">
                      <span class="err-msg">
                        <span class="field-validation-valid">{{ errors.lastname }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-lg-4">
                      <label>Email</label>
                      <input class="form-control" type="text" v-model="form.email" autocomplete="none">
                      <span class="err-msg">
                        <span class="field-validation-valid">{{ errors.email }}</span>
                      </span>
                    </div>
                    <div class="col-lg-4">
                      <label>Telephone</label>
                      <input class="form-control" type="text" v-model="form.phone" v-mask="'(###) ###-####'" autocomplete="none">
                      <span class="err-msg">
                        <span class="field-validation-valid">{{ errors.phone }}</span>
                      </span>
                    </div>
                    <div class="col-lg-4">
                      <label>Date of Birth</label>
                      <input class="form-control" type="date" v-model="form.dob" autocomplete="none">
                      <span class="err-msg">
                        <span class="field-validation-valid">{{ errors.dob }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <a class="btn_1 m-5" :href="'tel:' + phone" @click.prevent="connect">Connect</a>
        </div>
      </div>
      <div class="text-right">
        <button v-if="step != 1 && step != 'complete'" class="modal-default-button" @click="back">
          back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import {mask} from 'vue-the-mask';

  export default {
    name: 'Match',
    directives: {mask},
    data () {
      return {
        errors: {},
        items: [],
        form: {
          time: null,
          treatment: null,
          withdrawal: null,
          payment: null,
          location: null
        },
        step: 1,
        steps: 6,
        states: []
      }
    },
    computed: {
      ...mapState('auth', ['user']),
      phone() {
        let item = this.$store.state.settings.general;
        if(item.click_number && item.click_number === 'primary') return item.primary_click_number;
        else if(item.click_number && item.click_number === 'secondary') return item.secondry_click_number;
        return item.support_number
      }
    },
    methods: {
      back() {
        this.step--
      },
      next() {
        setTimeout(() => {
          if (this.step !== 6) {
            this.step++;
          } else {
            this.update();
          }
        });
      },
      connect() {
        this.errors = {};
        this.form.seeking = this.$store.state.seeking;
        if (this.form.firstname && this.form.lastname && this.form.phone && this.form.dob && this.form.email) {
          this.$nuxt.$loading.start();
          this.$axios.$post(`/connect`, this.form).then(async (res) => {
            if(res.data && !res.data.error){
              swal({title:"Notice", text:"Your request have been submitted successfully", icon:"success"}).then(function(val){
                this.$router.push('/');
              }.bind(this));
              this.$nuxt.$loading.finish()
              
            } else {
              //Handle errors
              swal({title:"Notice", text: 'Something Went Wrong',icon:"error"});
              this.$nuxt.$loading.finish()
            }
            this.$nuxt.$loading.finish()
          }).catch((err) => {
            console.log(err)
            this.$nuxt.$loading.finish()
            window.swal({ title: "Notice", text: 'Something Went Wrong', icon: "error" });
          });
          return;
        }

        if (!this.form.email) {
          this.errors.email = 'Email required.';
        }
        if (!this.form.firstname) {
          this.errors.firstname = 'First Name required.';
        }
        if (!this.form.lastname) {
          this.errors.lastname = 'Last Name required.';
        }
        if (!this.form.phone) {
          this.errors.phone = 'Valid Phone number is required.';
        }
        if (!this.form.dob) {
          this.errors.dob = 'Valid date of birth required.';
        }
      }
    }
  }
</script>

<style scoped>
  form {
    border: none !important;
  }
  .setup {
    background: #444444;
    background: url(/images/home_clear.png);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.81);
    background-blend-mode: multiply;
  }

  .setup {
    justify-content: center;
    align-items: center;
    margin-right: 0px;
    margin-left: 0px;
  }

  h1.text-center {
    font-size: 20px;
    margin-bottom: 16px;
    color: #343a40;
  }

  p.text-center {
    margin-bottom: 24px;
    color: #6d6d6d;
  }

  .step-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .spacing {
    margin-bottom: 8px;
  }

  .back-button:not(:disabled):not(.disabled).active, .back-button:not(:disabled):not(.disabled):active, .show>.back-button.dropdown-toggle {
    color: #eed657;
    background-color: #333439;
    border-color: #333439;
  }

  .progress-bar {
    background-color: #eed657 !important;
  }

  .back-button:hover {
    color: #eed657;
    background-color: #333439;
    border-color: #333439;
  }

  .back-button {
    color: #333439;
    border-color: #333439;
  }

  .setup .modal-default-button {
    border: 1px solid;
    border-radius: 2px;
    box-sizing: content-box;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    justify-content: center;
    padding: 0 8px;
    position: relative;
    text-align: center;
    text-shadow: none;
    vertical-align: middle;
    background-color: #f5f6f7;
    border-color: #ccd0d5;
    color: #4b4f56;
  }

  .setup .save-btn {
    background-color: #4267b2;
    border-color: #4267b2;
    color: #ffffff;
  }

  .list-option {
    text-align: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .list-option li {
    display: inline-block;
    position: relative;
    width: 19%;
    background: #fff;
    margin: 20px;
    border: 1px solid #4cb6e4;
    border-radius: 8px;
  }
  .list-option li label {
    width: 100%;
    cursor: pointer;
    padding: 20px 9px;
    margin: 0!important;
  }

  .list-option li label input[type=radio] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  input[type=radio] {
    position: relative;
    display: inline-block;
    margin-right: 2px;
    width: 1.5em;
    height: 1.5em;
    top: 3px;
    cursor: pointer;
  }

  .list-option li img {
    margin: 10px 0;
  }
  img {
    vertical-align: middle;
  }
  .list-option li span {
    display: block;
    position: relative;
    color: #000;
    font-size: 20px;
    font-family: Lato,sans-serif;
    font-weight: 300;
  }

  @media only screen and (max-width: 992px) {
   .list-option li {
      display: block;
      position: relative;
      width: 100%;
      background: #fff;
      margin: 0;
      text-align: left;
      padding: 0;
      border: 0;
      border-bottom: 1px solid #d6d6d6;
      border-radius: 0;
    }
  }
</style>
