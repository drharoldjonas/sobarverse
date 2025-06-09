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
              <input class="form-control" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" v-model="form.delete_data.contact.name" disabled>
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Email<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The UserEmail field is required." id="UserEmail" name="UserEmail" type="text" v-model="form.delete_data.contact.email" disabled>
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserEmail" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-12 form-group required">
              <label>How are you associated with this meeting?<span>*</span></label>
              <textarea class="form-control" cols="20" id="UserAssociated" name="UserAssociated" rows="2" v-model="form.delete_data.contact.association" disabled></textarea>
              <span class="err-msg" style="display: none;"><span class="field-validation-valid" data-valmsg-for="UserAssociated" data-valmsg-replace="true"></span></span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4 class="blue-bg box panel">Reason</h4>
            </div>

            <div class="col-md-12 required">
              <label for="Reason">Why do you want to modify this NA Meeting<span>*</span></label>
              <textarea class="form-control" name="Reason" id="Reason" v-model="form.delete_data.modReason" disabled></textarea>
              <span class="err-msg" style="display: none;">This field is required</span>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" name="button" @click="approve">Approve</button>
            </div>
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" name="button" @click="reject">Reject</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from '~/constants'

  export default {
    middleware: 'admin',
    validate ({ params }) {
      // Must be a number
      return /^[a-z0-9]{24,24}$/.test(params.id)
    },
    asyncData({ params, error, $axios }) {

      return $axios.get(`/admin/meeting/${params.id}`).then((res) => {
        var form = Object.assign({
          ctp: false,
          wheelChair: false,
          contact: {},
          time: {}
        }, res.data)
        return { form: form }
      }).catch((e) => {
        console.log(e)
      })
    },
    mounted() {
      this.form.time.ampm = this.getAmPm(new Date(this.form.time_utc));
      this.form.time.hour = this.getHour(new Date(this.form.time_utc));
      this.form.time.minute = this.getMinutes(new Date(this.form.time_utc));
      this.$forceUpdate()
    },
    data () {
      return {
        states: constants.states,
        form: {
          ctp: false,
          wheelChair: false,
          contact: {},
          time: {}
        }
      }
    },
    methods: {
      getAmPm: function(date) {
        var hours = date.getUTCHours();
        return hours >= 12 ? 'pm' : 'am';
      },
      getHour: function(date) {
        var hours = date.getUTCHours();
        hours = hours % 12;
        return  hours ? '' + hours : '' + 12;
      },
      getMinutes: function(date) {
        var minutes = date.getUTCMinutes();
        return '' + minutes;
      },
      reject: function() {
        var request = {};
        request.id = this.form._id;
        this.$nuxt.$loading.start()

        this.$axios.post(`/admin/meeting/delete/reject`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Meeting Rejected", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            swal({title:"Notice", text: res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: this.errormsg, icon:"error"});
          this.$nuxt.$loading.finish()
        });

      },
      approve: function() {
        var request = {};
        request.id = this.form._id;
        this.$nuxt.$loading.start()

        this.$axios.post(`/admin/meeting/delete/approve`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Meeting Approved", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            swal({title:"Notice", text: res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: this.errormsg, icon:"error"});
          this.$nuxt.$loading.finish()
        });
      },
    }
  }
</script>
