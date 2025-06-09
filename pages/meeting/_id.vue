<template>
  <div class="container margin_60_35">
    <div class="white-bg" style="height: auto !important;">
      <div class="container" style="height: auto !important;">
        <div class="row">
          <div id="overview" class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <h1>{{ item.name }}</h1>
              </div>

              <div class="col-md-12">
                <br>
              </div>

              <div class="col-md-6">
                <label>Address</label>
              </div>
              <div class="col-md-6">
                <ul class="nolist">
                  <li>{{ item.address }} </li>
                  <li>{{ item.city }} {{ item.state }} {{ item.zip }}</li>
                </ul>
              </div>
              <div class="col-md-6">
                <label>Time</label>
              </div>
              <div class="col-md-6">
                <label v-if="item.time">{{getTime(item.time)}}</label>
                <label v-else>{{ getHour(item.time_utc) }}:{{ getMinutes(item.time_utc) }} {{ getAmPm(item.time_utc) }}</label>
              </div>
              <div class="col-md-6">
                <label>Day</label>
              </div>
              <div class="col-md-6">
                <label>{{ item.day }}</label>
              </div>
              <div class="col-md-6">
                <label>WheelChair Access</label>
              </div>
              <div class="col-md-6">
                <label v-if="item.wheelChair">Yes</label>
                <label v-else>No</label>
              </div>
              <div class="col-md-6">
                <label>Closed To Public<span style="color: red;">*</span></label>
              </div>
              <div class="col-md-6">
                <label v-if="item.ctp">Yes</label>
                <label v-else>No</label>
              </div>

              <div class="col-md-12 mt-2">
                <h4>
                  Is this information correct? Click to <nuxt-link style="color: #004dda;" :to="{name: 'meeting-edit-id', params: {id: item.slug}}">modify</nuxt-link> /
                  <nuxt-link style="color: #004dda;" :to="{name: 'meeting-delete-id', params: {id: item.slug}}">delete</nuxt-link> yourself.
                </h4>

                <p>
                  <span style="color:red">*</span>Note regarding the difference between open and closed meeting...
                </p>
                <p>
                  <span style="font-weight: bold">Closed to public</span> - These meetings are for addicts/alcoholics only.
                  To attend a closed meeting just show up if you have a substance abuse problem.
                  No invitation is needed. If this is your first meeting, we recommend arriving a few minutes early.
                  Closed meetings are closed to those who are not addicts/alcoholics.
                </p>
                <p>
                  <span style="font-weight: bold">Open to public</span> - These meetings are open to anyone - addicts/alcoholics, their loved ones, anyone in the community, etc.
                  Just like closed meetings, open meetings do not require an invitation to join.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <client-only>
              <gmap-map class="map" ref="mapRef" :center="center" :zoom="13" map-type-id="terrain">
                <gmap-marker v-if="item.location" :position="{lat: item.location.coordinates[1], lng: item.location.coordinates[0]}"
                             :clickable="false" :draggable="false" />
              </gmap-map>
            </client-only>
          </div>
          <div class="col-md-12">
            <div class="ad-block">
              <div v-if="$store.state.settings.adsense">
                <client-only>
                  <Adsense
                    ins-class="adsbygoogle"
                    :data-ad-client="$store.state.settings.adsense.client_id"
                    :data-full-width-responsive="true"
                    data-ad-format="auto"
                    :data-ad-slot="$store.state.settings.adsense.responsive_slot">
                  </Adsense>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from '~/constants';
  import moment from 'moment';

  export default {
    asyncData({ params, error, $axios, redirect }) {
      if(/^[a-z0-9]{24,24}$/.test(params.id)) {
        return $axios.get(`/meeting/get/${params.id}`).then((res) => {
          if(res.data.error) return error({ statusCode: 500 });
          if(!res.data.data) return error({ statusCode: 404 });

          redirect(301, `/meeting/${res.data.data.slug}`);
        }).catch((e) => {
          console.log(e)
        })
      }
      return $axios.get(`/meeting/${params.id}`).then((res) => {
        if(!res.data.data || !res.data.data._id) return error({ statusCode: 404 });
        return { item: Object.assign({time: {}}, res.data.data) }
      })
    },
    mounted () {
       if (!this.item.time.hour || this.item.new_data) {
         var approved = {};
         if (this.item.new_data) {
         while(this.item.new_data.new_data){
          if (this.item.new_data.new_data) this.item.new_data = this.item.new_data.new_data;
          if (this.item.new_data.new_data !== undefined ) {
            if ( this.item.new_data.new_data.mod_status === 'pending' || this.item.new_data.new_data.mod_status === 'approved') {
              approved = this.item.new_data.new_data;
              console.log('here')
            }
          }
        }
        this.item.new_data = approved;
        this.item.time.ampm = this.item.new_data.time.ampm;
        this.item.time.hour = this.item.new_data.time.hour;
        this.item.time.minute = this.item.new_data.time.minute;
       } else {
        this.item.time.ampm = this.getAmPm(this.time_utc || this.item.time_stamp);
        this.item.time.hour = this.getHour(this.time_utc || this.item.time_stamp);
        this.item.time.minute = this.getMinutes(this.time_utc || this.item.time_stamp);
       }
       this.$forceUpdate()
      }
    },
    head() {
      return {
        title: `${!this.item.type ? '' : this.item.type.toUpperCase()} Meetings in ${this.item.city} ${this.item.state} at ${this.item.address} on ${this.item.day}`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${!this.item.type ? '' : this.item.type.toLowerCase()} Meetings in ${this.item.city} ${this.item.state} at ${this.item.address} on ${this.item.day}`
          }
        ]
      }
    },
    computed: {
      center: function() {
        if(this.item.location && this.item.location.coordinates) {
          return {lat: this.item.location.coordinates[1], lng: this.item.location.coordinates[0]}
        } else {
          return {lat: 39.8097343, lng: -98.5556199}
        }
      }
    },
    data () {
      return {
        item: {
          time: {}
        },
        states: constants.states,
        infoWindowPos: null,
        infoContent: {
          name: '',
          description: '',
        },
        infoWinOpen: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    },
    methods: {
      getTime(date){
        let zone = date.zone ? date.zone.substring(3):'';
        var time = '05 27 2021 '+ isNaN(date.hour) ? 0 : date.hour  +':'+ isNaN(date.minute) ? 0 : date.minute +' '+date.ampm+ zone
        console.log(moment(time).local().format('hh:mmA'))
        return moment(time).local().format('hh:mmA')
      },
      getAmPm: function(date) {
        date = new Date(date)
        var hours = date.getUTCHours();
        return hours >= 12 ? 'pm' : 'am';
      },
      getHour: function(date) {
        date = new Date(date)
        var hours = date.getUTCHours();
        hours = hours % 12;
        return  hours ? hours < 10 ? '0'+hours : hours : 12;
      },
      getMinutes: function(date) {
        date = new Date(date)
        var minutes = date.getUTCMinutes();
        return minutes < 10 ? '0'+minutes : minutes;;
      },
    }
  }
</script>
