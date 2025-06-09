<template>
  <div class="feedback">
    <!--<div class="feedback-overlay"></div>-->
    <!--feedback-form-->
    <div id="feedback-form" class="feedback-form shadow">
      <div class="feedback_form_area">
        <i class="fa fa-close" style="float: right;font-size: 30px;padding: 6px;color:#fff;" @click="toggle"></i>
        <div class="feedback_form_area_inner">
          <h6 class="text-center" v-html="general.lightbox" style="color:#fff;"></h6>

          <form>
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="form.name" class="custom-inp" />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="form.email" class="custom-inp" />
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input type="text" v-model="form.phone" class="custom-inp" v-mask="'(###) ###-####'" />
            </div>

            <div class="form-group">
              <label>Comments</label>
              <textarea v-model="form.comment" class="custom-inp-txt"></textarea>
            </div>

            <div class="text-left">
              <button type="button" class="btn btn-success" @click="checkForm">Submit</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mask} from 'vue-the-mask';

  export default {
    components: {},
    directives: {mask},
    computed: {
      general() {
        return this.$store.state.settings.general
      }
    },
    data () {
      return {
        form: {}
      }
    },
    mounted() {

    },
    methods: {
      toggle() {
        $(".feedback_form_area, .feedback-overlay").animate({
          width: "toggle"
        });
      },
      checkForm: function () {
        this.$nuxt.$loading.start();
        this.errors = {};
        if (this.form.name && this.form.email && this.form.phone && this.form.comment) {
          this.recaptcha();
          return;
        }

        if (!this.form.name) {
          this.errors.name = 'Name required.';
        }
        if (!this.form.email) {
          this.errors.email = 'Email required.';
        }
        if (!this.form.phone) {
          this.errors.phone = 'Phone required.';
        }
        if (!this.form.comment) {
          this.errors.phone = 'Comment required.';
        }
        this.$nuxt.$loading.finish();
        this.$forceUpdate()
      },
      recaptcha() {
        this.$recaptchaLoaded().then(() => {
          this.$recaptcha('login').then((token) => {
            this.form.token = token
            this.save()
          })
        })
      },
      save: function() {
        this.$nuxt.$loading.start()
        var request = this.form;

        this.$axios.post(`/form-fill`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Submitted Successfully", icon:"success"}).then(function(val){
              this.form = {}
              this.toggle();
            }.bind(this));
            this.$nuxt.$loading.finish()
          } else {
            //Handle errors
            swal({title:"Notice", text:res.data.error,icon:"error"});
            this.$nuxt.$loading.finish()
          }
        }).catch((err) => {
          swal({title:"Error", text: this.errormsg, icon:"error"});
          this.$nuxt.$loading.finish()
        });

      }
    }
  }
</script>

<style>
	@media (max-width: 500px) {
		.feedback_form_area_inner {
			width: 300px !important;
		}
    }
  .feedback-overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #00000047;
    display:none;
    z-index: 99999999;
  }
  .feedback-form label {
    color: #fff;
  }
  .feedback-form {
    position:fixed;
    bottom: 0;
    right:0;
    min-height:450px;
    z-index: 9999999999;
  }

  .feedback-form-show {
    right:0 !important;
  }

  .feedback_form_area {
    position:relative;
    display:none;
    overflow: hidden;
    background: #afafaf;
  }

  .feedback_form_area_inner {
    width:400px;
    min-height:450px;
    color:#fff;
    padding:15px;
  }

  .feedback_form_area h3 {
    margin-top:0;
  }

  .custom-inp {
    width:100%;
    height:35px;
    padding-left:5px;
    color:#fff;
    border:1px #fff solid;
    background:transparent;
  }

  .custom-inp-txt {
    width:100%;
    height:100px;
    padding:5px;
    color:#fff;
    border:1px #fff solid;
    background:transparent;
  }

  .feedback-form-btn {
    position: absolute;
    left: -81px;
    color: #000000;
    transform: rotate(90deg);
    top: 40%;
    border-radius:0;
  }

  @media only screen and (max-width: 320px) {
    .feedback_form_area_inner {
      width:260px;
      min-height:450px;
      color:#000000;
      padding:15px;
    }
  }

  .mt-50 {
    margin-top:50px;
  }
</style>
