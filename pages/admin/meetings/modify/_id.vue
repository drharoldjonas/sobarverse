<template>
  <div class="container margin_60_35">
    <h1 class="mb-4">Request to Delete Meeting</h1>

    <form novalidate="novalidate">
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Basic Information</h4>
        </div>

        <div class="col-md-6 form-group required">
          <label>Place (Location of meeting, e.g, "St. John's Church, Starbucks)<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.new_data.name" type="text" disabled>
        </div>

        <div class="col-md-6 form-group required bg-azure">
          <label>Day<span>*</span>:</label>
          <select class="form-control" v-model="form.new_data.day" disabled>
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

          <div class="row bg-azure" title="Original: 12:30:00">
            <div class="col-md-1">Hour: </div>
            <div class="col-md-2">
              <select class="form-control" v-model="form.new_data.time.hour" disabled>
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
              <select class="form-control" v-model="form.new_data.time.minute" disabled>
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
              <select class="form-control" v-model="form.new_data.time.ampm" style="padding: 0.375rem 0.5rem;" disabled>
                <option value="">Period</option>
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <select class="form-control" v-model="form.time.zone" disabled>
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
              <input v-model="form.new_data.ctp" type="checkbox" value="true" disabled>
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="checkbox bg-azure" title="Changed">
            <label class="container_check">Accept wheelchair
              <input v-model="form.new_data.wheelChair" type="checkbox" value="true" disabled>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="col-md-3 form-group">
          <div class="checkbox">
            <label class="container_check">Alcoholic Anonymous
              <input v-model="form.new_data.type" id="aa" name="type" type="radio" value="aa" disabled>
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="checkbox">
            <label class="container_check">Narcotics Anonymous
              <input v-model="form.new_data.type" id="na" name="type" type="radio" value="na" disabled>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Location</h4>
        </div>

        <div class="col-md-6 form-group required bg-azure" title="Original: TX">
          <label>State<span>*</span>:</label>
          <select class="form-control" v-model="form.new_data.state" id="State" name="State" disabled>
            <option value="">State</option>
            <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
          </select>
        </div>

        <div class="col-md-6 form-group required">
          <label>City<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.new_data.city" type="text" disabled>
        </div>

        <div class="col-md-6 form-group required">
          <label>Zip code<span>*</span>:</label>
          <input class="form-control numbersOnly bg-azure" v-model="form.new_data.zip" type="number" disabled>
        </div>

        <div class="col-md-6 form-group required">
          <label>Street 1<span>*</span>:</label>
          <input class="form-control bg-azure" v-model="form.new_data.address" type="text" disabled>
        </div>

        <div class="col-md-6 form-group">
          <label>Street 2:</label>
          <input class="form-control bg-azure" v-model="form.new_data.address2" type="text" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">User Contact Info</h4>
        </div>
        <div class="col-md-12">
          <p><strong>Note: We keep this information confidential. We may contact you if we have any questions about your submission but <span style="text-decoration: underline; color: green">we never share your information with outside parties</span>.</strong></p>
        </div>
        <div class="col-md-6 form-group required">
          <label>Name<span>*</span>:</label>
          <input class="form-control" v-model="form.new_data.contact.name" type="text" disabled>
        </div>

        <div class="col-md-6 form-group required">
          <label>Email<span>*</span>:</label>
          <input class="form-control" v-model="form.new_data.contact.email" type="text" disabled>
        </div>

        <div class="col-md-12 form-group required">
          <label>How are you associated with this meeting?<span>*</span></label>
          <textarea class="form-control" v-model="form.new_data.contact.association" cols="20" rows="2" disabled></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4 class="blue-bg box panel">Reason</h4>

          <div class="row">
            <div class="col-md-12 required">
              <label for="Reason">Why do you want to modify this NA Meeting<span>*</span></label>
              <textarea class="form-control" v-model="form.new_data.modReason" name="Reason" id="Reason" disabled></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-2">
          <button type="button" class="btn btn-primary" name="button" value="Approve" @click="approve">Approve</button>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary" name="button" value="Reject" @click="reject">Reject</button>
        </div>
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
          time: {},
          new_data: {time: {}}
        }, res.data)
        if(!form.new_data.contact) form.new_data.contact = {};
        return { form: form }
      }).catch((e) => {
        console.log(e)
      })
    },
    mounted() {
      if(!this.form.time.hour) {
         while(this.form.new_data.new_data){
          this.form.new_data = this.form.new_data.new_data;
        }
        // this.form.new_data.time.ampm = this.getAmPm(new Date(this.form.new_data.time_utc));
        // this.form.new_data.time.hour = this.getHour(new Date(this.form.new_data.time_utc));
        // this.form.new_data.time.minute = this.getMinutes(new Date(this.form.new_data.time_utc));
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
      reject: function() {
        var request = {};
        request.id = this.form._id;
        this.$nuxt.$loading.start()

        this.$axios.post(`/admin/meeting/modify/reject`, request).then((res) => {
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

        var request = {args: this.form.new_data};
        request.id = this.form._id;
        this.$nuxt.$loading.start();

        this.$axios.post(`/admin/meeting/modify/approve`, request).then((res) => {
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
