<template>
  <div class="container margin_60_35">
    <h1 class="mb-4">Edit <span style="text-transform: uppercase;">{{ form.type }}</span> Meeting</h1>

    <form novalidate="novalidate">
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Basic Information</h4>
        </div>

        <div class="col-md-6 form-group required">
          <label>Place (Location of meeting, e.g, "St. John's Church, Starbucks)<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.name" type="text">
        </div>

        <div class="col-md-6 form-group required bg-azure">
          <label>Day<span>*</span>:</label>
          <select class="form-control" v-model="form.day">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div class="col-md-6 form-group required">
          <label>Time<span>*</span>:</label>

          <div class="row bg-azure">
            <div class="col-md-1">Hour: </div>
            <div class="col-md-2">
              <select class="form-control" v-model="form.time.hour">
                <option value="">Hour</option>
                <option value="0">00</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div class="col-md-1">Min: </div>
            <div class="col-md-2">
              <select class="form-control" v-model="form.time.minute">
                <option value="">Minute</option>
                <option value="0">00</option>
                <option value="5">05</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
                <option value="50">50</option>
                <option value="55">55</option>
              </select>
            </div>
            <div class="col-md-2">
              <select class="form-control" v-model="form.time.ampm">
                <option value="">Period</option>
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <select class="form-control" v-model="form.time.zone" style="padding: 0.375rem 0.5rem;">
                  <option value="">Period</option>
                  <option v-for="(zone, index) in zones" :value="zone.offset" :key="index">{{ zone.name }}</option>
                </select>
              </div>
              <span class="err-msg" style="display: none;">The Zone field is required</span>
            </div>
          </div>

        </div>

        <div class="col-md-3 form-group">
          <div class="checkbox bg-azure" title="Changed">
            <label class="container_check">Closed to public
              <input v-model="form.ctp" type="checkbox" value="true">
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="checkbox bg-azure" title="Changed">
            <label class="container_check">Accept wheelchair
              <input v-model="form.wheelChair" type="checkbox" value="true">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="col-md-3 form-group">
          <div class="checkbox">
            <label class="container_check">Alcoholic Anonymous
              <input v-model="form.type" id="aa" name="type" type="radio" value="aa">
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="checkbox">
            <label class="container_check">Narcotics Anonymous
              <input v-model="form.type" id="na" name="type" type="radio" value="na">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Location</h4>
        </div>

        <div class="col-md-6 form-group required bg-azure">
          <label>State<span>*</span>:</label>
          <select class="form-control" v-model="form.state" id="State" name="State">
            <option value="">State</option>
            <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
          </select>
        </div>

        <div class="col-md-6 form-group required">
          <label>City<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.city" type="text">
        </div>

        <div class="col-md-6 form-group required">
          <label>Zip code<span>*</span>:</label>
          <input class="form-control numbersOnly bg-azure" v-model="form.zip" type="number">
        </div>

        <div class="col-md-6 form-group required">
          <label>Street 1<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.address" type="text">
        </div>

        <div class="col-md-6 form-group">
          <label>Street 2:</label>
          <input class="form-control bg-azure" v-model="form.address2" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">User Contact Info</h4>
        </div>
        <div class="col-md-12">
          <p>
            <strong>
              Note: We keep this information confidential. We may contact you if we have any questions about your submission but
              <span style="text-decoration: underline; color: green">we never share your information with outside parties</span>.
            </strong>
          </p>
        </div>
        <div class="col-md-6 form-group required">
          <label>Name<span>*</span>:</label>
          <input class="form-control" v-model="form.contact.name" type="text">
        </div>

        <div class="col-md-6 form-group required">
          <label>Email<span>*</span>:</label>
          <input class="form-control" v-model="form.contact.email" type="text">
        </div>

        <div class="col-md-12 form-group required">
          <label>How are you associated with this meeting?<span>*</span></label>
          <textarea class="form-control" v-model="form.contact.association" cols="20" rows="2"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Reason</h4>

          <div class="row">
            <div class="col-md-12 required">
              <label for="Reason">Why do you want to modify this NA Meeting<span>*</span></label>
              <textarea class="form-control" v-model="form.modReason" name="Reason" id="Reason"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-2">
          <button type="button" class="btn btn-primary" name="button" @click="save">Save</button>
        </div>

        <template v-if="form.status != 'approved'">
          <div class="col-md-2">
            <button type="button" class="btn btn-primary" name="button" @click="approve">Approve</button>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-primary" name="button" @click="reject">Reject</button>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
  import constants from "~/constants";

  export default {
    middleware: 'admin',
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
      if(!this.form.time.hour) {
        this.form.time.ampm = this.getAmPm(new Date(this.form.time_utc));
        this.form.time.hour = this.getHour(new Date(this.form.time_utc));
        this.form.time.minute = this.getMinutes(new Date(this.form.time_utc));
        this.$forceUpdate()
      }
    },
    data () {
      return {
        states: constants.states,
        zones: constants.timezones,
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
      save: function() {
        var request = {};
        request.args = this.form;
        request.id = this.form._id;
        this.$nuxt.$loading.start()

        var hour = request.args.time.hour;
        var minute = request.args.time.minute;
        if(request.args.time.ampm == 'pm') hour = hour + 12;
        request.args.time_utc = new Date(Date.UTC(1753, 1, 1, hour, minute, 0));
        request.args.time_utc = request.args.time_utc.getTime();
        request.args.time_zone = request.args.time.zone;

        this.$axios.put(`/admin/meeting`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
              this.$router.go(-1);
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
      reject: function() {
        var request = {};
        request.id = this.form._id;
        this.$nuxt.$loading.start()

        this.$axios.post(`/admin/meeting/reject`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Meeting Rejected", icon:"success"}).then(function(val){
              this.$router.go(-1);
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

        this.$axios.post(`/admin/meeting/approve`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Meeting Approved", icon:"success"}).then(function(val){
              this.$router.go(-1);
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
      search: function() {
        //Load the items

        var request = {filters:{}};
        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/meeting/${this.$route.params.id}`, {params: request}).then((res) => {
          this.form = (resp) ? resp : this.form;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
