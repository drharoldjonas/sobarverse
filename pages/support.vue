<template>
  <div>
    <div class="sub_header_in sticky_header" style="margin-top: 0px">
      <div class="container">
        <h1>Contact Sober</h1>
      </div>
      <!-- /container -->
    </div>
    <!-- /sub_header -->

    <div class="container margin_60_35">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 pr-xl-5">
          <div class="main_title_3">
            <span></span>
            <h2>Contact Us</h2>
            <p>Please feel free to drop us some feedback.</p>
          </div>
          <div id="message-contact"></div>
          <form id="contactform" autocomplete="off">
            <div class="form-group">
              <label>First Name</label>
              <input
                class="form-control"
                type="text"
                id="firstname_contact"
                name="name_contact"
                v-model="form.firstname"
              />
              <span class="err-msg">
                <span class="field-validation-valid">{{
                  errors.firstname
                }}</span>
              </span>
            </div>
            <div class="form-group">
              <label>Last name</label>
              <input
                class="form-control"
                type="text"
                id="lastname_contact"
                name="lastname_contact"
                v-model="form.lastname"
              />
              <span class="err-msg">
                <span class="field-validation-valid">{{
                  errors.lastname
                }}</span>
              </span>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                class="form-control"
                type="email"
                id="email_contact"
                name="email_contact"
                v-model="form.email"
              />
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.email }}</span>
              </span>
            </div>
            <div class="form-group">
              <label>Telephone</label>
              <input
                class="form-control"
                type="text"
                id="phone_contact"
                name="phone_contact"
                v-model="form.phone"
              />
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.phone }}</span>
              </span>
            </div>
            <div class="form-group">
              <label>Reason</label>
              <select class="form-control" v-model="form.reason">
                <option value="Meeting Updates">Meeting Updates</option>
                <option value="Website information correction">
                  Website information correction
                </option>
                <option value="Advertising opportunities">
                  Advertising opportunities
                </option>
                <option value="I need Help">I need Help</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.reason }}</span>
              </span>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea
                class="form-control"
                id="message_contact"
                name="message_contact"
                style="height: 120px"
                v-model="form.message"
              ></textarea>
              <span class="err-msg">
                <span class="field-validation-valid">{{ errors.message }}</span>
              </span>
            </div>
            <p class="add_top_30">
              <input
                type="button"
                @click="checkForm"
                value="Submit"
                class="btn_1"
                id="submit-contact"
              />
            </p>
          </form>
        </div>
        <div class="col-xl-5 col-lg-6 pl-xl-5">
          <div class="box_contacts">
            <i class="ti-support"></i>
            <h2>Need Help?</h2>
            <!--<a :href="'tel:' + ($store.state.settings.general ? $store.state.settings.general.phone : '')">{{ $store.state.settings.general ? $store.state.settings.general.phone : '' }}</a> - -->
            <a
              :href="
                'mailto:' +
                ($store.state.settings.general
                  ? $store.state.settings.general.email
                  : '')
              "
              >{{
                $store.state.settings.general
                  ? $store.state.settings.general.email
                  : ""
              }}</a
            >
          </div>
          <div class="box_contacts">
            <i class="ti-help-alt"></i>
            <h2>Questions?</h2>
            <!--<a :href="'tel:' + ($store.state.settings.general ? $store.state.settings.general.phone2 : '')">{{ $store.state.settings.general ? $store.state.settings.general.phone2 : '' }}</a> - -->
            <a
              :href="
                'mailto:' +
                ($store.state.settings.general
                  ? $store.state.settings.general.email2
                  : '')
              "
              >{{
                $store.state.settings.general
                  ? $store.state.settings.general.email2
                  : ""
              }}</a
            >
          </div>
          <!--<div class="box_contacts">-->
          <!--<i class="ti-home"></i>-->
          <!--<h2>Address</h2>-->
          <!--<a href="#0">PO Box 97845 Baker st. 567, Los Angeles<br>California - US.</a>-->
          <!--</div>-->
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-12">
          <a class="cta-custom" href="tel:+18009436094">
            <span class="in">
              <span class="line1">Suffering From Addiction?</span>
              <span class="line2">Speak to a Specialist & Get Help Now!</span>
              <span class="line3">800-943-6094</span>
            </span>
          </a>
        </div>
      </div> -->
       <InFeedAdsense
          ins-class="adsbygoogle"
          :data-ad-layout-key="$store.state.settings.adsense.list_slot_layout"
          :data-ad-client="$store.state.settings.adsense.client_id"
          data-ad-format="fluid"
          :data-ad-slot="$store.state.settings.adsense.list_slot"> -->
          </InFeedAdsense>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  head: {
    title: `Contact Us`,
  },
  data() {
    return {
      form: {},
      errors: {},
    };
  },
  methods: {
    checkForm: function () {
      this.$nuxt.$loading.start();
      this.errors = {};
      if (
        this.form.firstname &&
        this.form.lastname &&
        this.form.email &&
        this.form.phone &&
        this.form.reason &&
        this.form.message
      ) {
        this.recaptcha();
        return;
      }

      if (!this.form.firstname) {
        this.errors.firstname = "First Name required.";
      }
      if (!this.form.lastname) {
        this.errors.lastname = "Last Name required.";
      }
      if (!this.form.email) {
        this.errors.email = "Email Address required.";
      }
      if (!this.form.phone) {
        this.errors.phone = "Telephone required.";
      }
      if (!this.form.reason) {
        this.errors.reason = "Reason required.";
      }
      if (!this.form.message) {
        this.errors.message = "Message required.";
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
    recaptcha() {
      this.$recaptchaLoaded().then(() => {
        this.$recaptcha("login").then((token) => {
          this.form.token = token;
          this.save();
        });
      });
    },
    save: function () {
      this.$nuxt.$loading.start();
      var request = this.form;

      this.$axios
        .post(`/inquiries`, request)
        .then((res) => {
          if (res.data && !res.data.error) {
            swal({
              title: "Notice",
              text: "Inquiry Created Successfully",
              icon: "success",
            }).then(
              function (val) {
                this.form = {};
                this.$router.push("/");
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
</style>
