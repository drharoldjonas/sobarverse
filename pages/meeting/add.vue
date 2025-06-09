<template>
  <div class="container margin_60_35">
    <div v-if="!edit" class="white-bg">
      <div class="container">
<!--        <div class="row">-->
<!--          <div class="col-md-6">-->
<!--            <a class="btn_1 rounded" @click="newAAMeeting">Add AA Meeting</a>-->
<!--          </div>-->
<!--          <div class="col-md-6">-->
<!--            <a class="btn_1 rounded" @click="newNAMeeting">Add NA Meeting</a>-->
<!--          </div>-->
<!--        </div>-->
        <div class="mt-3 row">
          <div class="col-md-6">
            <a class="btn_1 rounded mb-2" @click="newAAMeeting">Add AA Meeting</a>
            <h2>If you want to modify/delete a AA Meeting:</h2>
            <ol class="col-md-12 navigate">
              <li><nuxt-link class="meeting-card" to="/meetings/aa" style="padding: 10px">Go to the AA Meeting main site <i class="fa fa-chevron-right" aria-hidden="true" ></i></nuxt-link></li>
              <li class="mt-3">Look for the AA Meeting you want to modify/delete using the search or filtering by states -&gt; city</li>
              <li>Click on the AA Meeting</li>
              <li>On the left choose modify or delete</li>
            </ol>
          </div>
        <div class="col-md-6">
          <a class="btn_1 rounded mb-2" @click="newNAMeeting">Add NA Meeting</a>
          <h2>If you want to modify/delete a NA Meeting:</h2>
          <ol class="col-md-12 navigate">
            <li><nuxt-link class="meeting-card" to="/meetings/na" style="padding: 10px">Go to the NA Meeting main site <i class="fa fa-chevron-right" aria-hidden="true"></i></nuxt-link></li>
            <li class="mt-3">Look for the NA Meeting you want to modify/delete using the search or filtering by states -&gt; city</li>
            <li>Click on the NA Meeting</li>
            <li>On the left choose modify or delete</li>
          </ol>
        </div>
      </div>
      </div>
    </div>
    <div v-else class="white-bg">
      <div class="container">
        <h1 v-if="!form._id">Add New {{ form.type.toUpperCase() }} Meeting</h1>
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
                <select class="form-control" data-val="true" v-model="form.day" data-val-number="The field Day must be a number." data-val-required="The Day field is required." id="DayId" name="DayId">
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
                    <select class="form-control" v-model="timezone.index" readonly disabled>
                      <option value="">Period</option>
                      <option v-for="(zone, index) in zones" :value="index" :key="index" >{{ zone.name }}</option>
                    </select>
                  </div>
                  <span class="err-msg" style="display: none;">The Zone field is required</span>
                </div>
              </div>
            </div>
            <div class="col-md-3 form-group">
              <div class="checkbox">
                <label class="container_check">Closed to public
                  <input data-val="true" v-model="form.ctp" data-val-required="The Closed to public? field is required." id="ClosedToPublic" name="ClosedToPublic" type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>

              <div class="checkbox">
                <label class="container_check">Accept wheelchair
                  <input data-val="true" v-model="form.wheelChair" data-val-required="The Accept wheelchair? field is required." id="WheelChair" name="WheelChair" type="checkbox">
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
<style scoped>
.meeting-card{

  /*background: #004dda;*/
  /*color: #fff;*/
  border-radius: 50px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.navigate{
  margin-top: 20px;
}
.meeting-card:hover{
  font-weight: bold;
  background: #ffc83d;
  color: white;
}
.meeting-card:hover > .meeting-card i {
  font-weight: bold;
  color: white;
}
.meeting-card i {
  padding-top: 6px;
  padding-left: 20px;
}
</style>
<script>
  import constants from '~/constants'
  import moment from 'moment'
  import 'moment-timezone'

  export default {
    head() {
      return {
        title: `Modify Meeting`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `Add Meeting`
          }
        ]
      }
    },
    data () {
      return {
        // timezone:{
        //   index: null
        // },
        edit: false,
        states: constants.states,
        zones: constants.timezones,
        form: {
          ctp: false,
          wheelChair: false,
          contact: {},
          type: 'na',
          time: {
            hour: '',
            minute: '',
            ampm: 'am',
          }
        }
      }
    },
    computed: {},
    mounted(){
      //this.form.time.zone = moment.tz.guess(true);
      var found = false
      //console.log(moment('05 27 2021 04:45 PM-05:00').format('lll'));
      constants.timezones.forEach((zone, index)=>{
        if(zone.name === moment.tz.guess(true)){
          //console.log('timezone', zone.offset)
          this.timezone = zone
          this.timezone.index = index;
          this.form.time.zone = zone.offset;
          found = true;
        }
      });
      if(!found){
        var offset = 'GMT'+moment().utc().local().format("Z");
         constants.timezones.forEach((zone, index)=>{
        if(zone.offset === offset){
          //console.log('timezone', zone.offset)
          this.timezone = zone
          this.timezone.index = index;
          this.form.time.zone = zone.offset;
          found = true;
        }
      });

      }
    },
    methods: {
      newAAMeeting: function() {
        this.form = {
          contact: {},
          time: {},
          type: 'aa'
        }
        this.edit = true;
      },
      newNAMeeting: function() {
        this.form = {
          contact: {},
          time: {},
          type: 'na'
        }
        this.edit = true;
      },
      save: function() {

        this.form.time.zone = this.timezone.offset;
        var time = '2000-01-01 '+this.form.time.hour+':'+this.form.time.minute;
        console.log(moment());
        time = new Date(time);
        this.form.meetTime = moment.utc(time);

        var request = this.form;

        var type = 'post';
        this.$axios[type](`/meeting`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Meeting Created Successfully", icon:"success"}).then(function(val){
              //this.edit = false;
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
