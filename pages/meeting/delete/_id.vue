<template>
  <div class="container margin_60_35">
    <div class="white-bg">
      <div class="container">
        <h1>Request to Delete Meeting</h1>

        <form novalidate="novalidate">
          <div class="row">
            <div class="col-md-12">
              <h4 class="blue-bg box panel">User Contact Info</h4>
            </div>

            <div class="col-md-12">
              <p>
                <strong>Note: We keep this information confidential. We may contact you if we have any questions about your submission but
                  <span style="text-decoration: underline; color: green">we never share your information with outside parties</span>.
                </strong>
              </p>
            </div>

            <div class="col-md-6 form-group required">
              <label>Name<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" v-model="form.contact.name">
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Email<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The UserEmail field is required." id="UserEmail" name="UserEmail" type="text" v-model="form.contact.email">
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserEmail" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-12 form-group required">
              <label>How are you associated with this meeting?<span>*</span></label>
              <textarea class="form-control" cols="20" id="UserAssociated" name="UserAssociated" rows="2" v-model="form.contact.association"></textarea>
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserAssociated" data-valmsg-replace="true"></span></span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4 class="blue-bg box panel">Reason</h4>
            </div>

            <div class="col-md-12 required">
              <label for="Reason">Why do you want to modify this NA Meeting<span>*</span></label>
              <textarea class="form-control" name="Reason" id="Reason" v-model="form.modReason"></textarea>
              <span class="err-msg" style="display: none;">This field is required</span>
            </div>
          </div>
          <div class="row">
            <div id="meeting_recaptcha_box" class="col-md-12"></div>
          </div>
          <p class="text-right"><a @click="remove" class="btn_1 rounded add_top_30" style="color: white;">Submit</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import constants from '~/constants'

  export default {
    asyncData({ params, error, $axios, redirect }) {
      if(/^[a-z0-9]{24,24}$/.test(params.id)) {
        return $axios.get(`/meeting/get/${params.id}`).then((res) => {
          if(res.data.error) return error({ statusCode: 500 });
          if(!res.data.data) return error({ statusCode: 404 });

          redirect(301, `/meeting/delete/${res.data.data.slug}`);
        }).catch((e) => {
          console.log(e)
        })
      }
      return $axios.get(`/meeting/${params.id}`).then((res) => {
        if(!res.data.data || !res.data.data._id) return error({ statusCode: 404 });
        return { form: Object.assign({time: {},
              contact: {},
              ctp: false,
              wheelChair: false,
            }, res.data.data) }
      })
    },
    head() {
      return {
        title: `Delete ${this.form.type} Meeting`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Delete ${this.form.type} Meeting`
          }
        ]
      }
    },
    data () {
      return {
        edit: false,
        states: constants.states,
        item: {},
        form: {
          contact: {},
          time: {}
        }
      }
    },
    methods: {
      remove: function() {
        var request = {contact: this.form.contact, modReason: this.form.modReason, id: this.form._id};

        this.$axios.post(`/meeting/delete`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Request Submitted Successfully", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            this.errormsg = (res.data && res.data.error)? res.data.error : false;
            swal({title:"Notice", text:res.data.error,icon:"error"});
          }
        }).catch((err) => {
          swal({title:"Error", text: this.errormsg, icon:"error"});
        });
      }
    }
  }
</script>
