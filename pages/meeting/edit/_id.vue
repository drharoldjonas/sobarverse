<template>
  <div class="container margin_60_35">
    <div v-if="edit" class="white-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <a class="btn btn-primary" @click="newMeeting">Add Meeting</a>
          </div>
        </div>

        <div class="row originalHTML">
          <h2>If you want to modify/delete a NA Meeting:</h2>
          <ol class="col-md-12">
            <li><a href="/#/meetings/na">Go to the NA Meeting main site</a></li>
            <li>Look for the NA Meeting you want to modify/delete using the search or filtering by states -&gt; city</li>
            <li>Click on the NA Meeting</li>
            <li>On the left choose modify or delete</li>
          </ol>
        </div>
      </div>
    </div>
    <div v-else class="white-bg">
      <div class="container">
        <h1 v-if="!form._id">Add New NA Meeting</h1>
        <h1 v-else>Edit {{ form.name }} meeting</h1>

        <form novalidate="novalidate">
          <div class="row">
            <div class="col-md-12">
              <h4 class="blue-bg box panel">Basic Information</h4>
            </div>

            <div class="col-md-6 form-group required">
              <label>Place (Location of meeting, e.g, "St. John's Church, Starbucks)<span>*</span>:</label>
              <input class="form-control" data-val="true" v-model="form.name" data-val-required="The Name field is required." id="Name" name="Name" type="text">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Day<span>*</span>:</label>
              <div class="form-group">
                <select class="form-control" data-val="true" v-model="form.day">
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="DayId" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Time<span>*</span>:</label>

              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
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
                  <span id="err-msg3" class="err-msg" style="display: none;">The Hour field is required</span>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
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
                  <span id="err-msg4" class="err-msg" style="display: none;">The Minutes field is required</span>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <select class="form-control" v-model="form.time.ampm" style="padding: 0.375rem 0.5rem;">
                      <option value="">Period</option>
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </select>
                  </div>
                  <span id="err-msg5" class="err-msg" style="display: none;">The Period field is required</span>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select class="form-control" v-model="form.time.zone">
                      <option value="">Period</option>
                      <option v-for="(zone, index) in zones" :value="zone.offset" :key="index">{{ zone.name }}</option>
                    </select>
                  </div>
                  <span class="err-msg" style="display: none;">The Zone field is required</span>
                </div>
              </div>

            </div>
            <div class="col-md-3 form-group">
              <div class="checkbox">
                <label class="container_check">Closed to public
                  <input data-val="true" v-model="form.ctp" type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>

              <div class="checkbox">
                <label class="container_check">Accept wheelchair
                  <input data-val="true" v-model="form.wheelChair" type="checkbox">
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

            <div class="col-md-6 form-group required">
              <label>State<span>*</span>:</label>
              <div class="form-group">
                <select class="form-control" v-model="form.state">
                  <option value="">Choose One</option>
                  <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
                </select>
              </div>
              <span id="err-msg6" class="err-msg" style="display: none;">State field is required</span>
            </div>

            <div class="col-md-6 form-group required">
              <label>City<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The City field is required." id="City" name="City" type="text" v-model="form.city">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="City" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Zip code<span>*</span>:</label>
              <input class="form-control numbersOnly" data-val="true" data-val-number="The field Zip code must be a number." data-val-required="The Zip code field is required." id="Zip" name="Zip" type="text" v-model="form.zip">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Zip" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Street 1<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The Street field is required." id="Street1" name="Street1" type="text" v-model="form.address">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Street1" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group">
              <label>Street 2:</label>
              <input class="form-control" id="Street2" name="Street2" type="text" v-model="form.address2">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Street2" data-valmsg-replace="true"></span></span>
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
              <input class="form-control" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" v-model="form.contact.name">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-6 form-group required">
              <label>Email<span>*</span>:</label>
              <input class="form-control" data-val="true" data-val-required="The UserEmail field is required." id="UserEmail" name="UserEmail" type="text" v-model="form.contact.email">
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="UserEmail" data-valmsg-replace="true"></span></span>
            </div>

            <div class="col-md-12 form-group required">
              <label>How are you associated with this meeting?<span>*</span></label>
              <textarea class="form-control" cols="20" id="UserAssociated" name="UserAssociated" rows="2" v-model="form.contact.association"></textarea>
              <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="UserAssociated" data-valmsg-replace="true"></span></span>
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
          <p class="text-right"><a @click="save" class="btn_1 rounded add_top_30" style="color: white;">Submit</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from '~/constants';
  import moment from 'moment'

  export default {
    asyncData({ params, error, $axios, redirect }) {
      if(/^[a-z0-9]{24,24}$/.test(params.id)) {
        return $axios.get(`/meeting/get/${params.id}`).then((res) => {
          if(res.data.error) return error({ statusCode: 500 });
          if(!res.data.data) return error({ statusCode: 404 });

          redirect(301, `/meeting/edit/${res.data.data.slug}`);
        }).catch((e) => {
          console.log(e)
        })
      }
      return $axios.get(`/meeting/${params.id}`).then((res) => {
        if(!res.data.data || !res.data.data._id) return error({ statusCode: 404 });
        var form = Object.assign({
          ctp: false,
          wheelChair: false,
          contact: {},
          time: {}
        }, res.data.data)
        return { form: form }
      })
    },
    mounted() {
if(!this.form.time.hour || this.form.new_data) {
         var approved = {};
         if(this.form.new_data){
         while(this.form.new_data.new_data){
          if(this.form.new_data.new_data)this.form.new_data = this.form.new_data.new_data;
          if(this.form.new_data.new_data !== undefined ){
          if(this.form.new_data.new_data.mod_status === 'pending' || this.form.new_data.new_data.mod_status === 'approved') {
          approved = this.form.new_data.new_data;
          console.log('here')
          }
          }
          
        }
        this.form.new_data = approved;
        this.form.time.ampm = this.form.new_data.time.ampm;
        this.form.time.hour = this.form.new_data.time.hour;
        this.form.time.minute = this.form.new_data.time.minute;
       }
       else{
          this.form.time.ampm = this.getAmPm(this.form.time_utc || this.form.time_stamp);
        this.form.time.hour = this.getHour(this.form.time_utc || this.form.time_stamp);
        this.form.time.minute = this.getMinutes(this.form.time_utc || this.form.time_stamp);
       }
       this.$forceUpdate()
      }
    },
    head() {
      return {
        title: `Modify ${this.form.type} Meeting`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Modify ${this.form.type} Meeting`
          }
        ]
      }
    },
    data () {
      return {
        edit: false,
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
    computed: {},
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
      newMeeting: function() {
        this. form = {
          contact: {},
          time: {}
        }
        this.edit = true;
      },
      save: function() {

        var time = '2000-01-01 '+this.form.time.hour+':'+this.form.time.minute;
        time = new Date(time);
        time = moment.utc(time);
        this.form.meetTime = time;
        var request = {args: this.form};
        request.id = this.form._id;
        console.log('form data: ',this.form)
        var type = (this.form['_id']) ? 'put' : 'post';

        this.$axios[type](`/meeting`, request).then((res) => {
          if(res.data && !res.data.error){
            var text = "Meeting Created Successfully";
            if(type == 'put') text = "Request Submitted Successfully";
            swal({title:"Notice", text: text, icon:"success"}).then(function(val){
              this.$router.push('/');
            }.bind(this));
          } else {
            //Handle errors
            this.errormsg = (res.data && res.data.error)? res.data.error : false;
            swal({title:"Notice", text:res.data.error,icon:"error"});
          }
        }).catch((err) => {
          swal({title:"Error", text: this.errormsg, icon:"error"});
        });
      },
    }
  }
</script>
