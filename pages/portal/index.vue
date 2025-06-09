<template>
  <div class="listing">
    <div class="sub_header_in">
      <div class="container">
        <h1>Vendors</h1>
      </div>
      <!-- /container -->
    </div>

    <div class="container margin_60_35">
      <div class="row">
        <div v-for="(item, index) in items.data" class="col-xl-4 col-lg-6 col-md-6" :key="index">
          <div class="strip grid">
            <div class="wrapper">
              <h3><a @click="$router.push({name: 'facility-id', params: {id: item.slug}})">{{ item.name }}</a></h3>
              <small>{{ item.address }} {{ item.state }}  {{ item.zip }}</small>
              <div>Plan: {{ item.plan ? item.plan.name: 'None' }}
                <span style="float: right;">
                  <nuxt-link v-tooltip="'Change facility subscription'" :to="{name: 'portal-checkout-id', params: {id: item._id}}">upgrade</nuxt-link>/
                  <a v-if="item.subscription_status == 'active'" v-tooltip="'Cancel facility subscription'" href="#" @click="cancelSubscription(item)">cancel</a>
                </span>
              </div>
              <div>Subscription Status: {{ item.subscription_status || 'None' }}</div>
              <div>Expires: {{ item.expires | format_date }}</div>
              <div v-if="item.plan && item.plan.featurd">Spot: {{ item.spot ? item.spot.placement: 'None' }} <span><a>upgrade/downgrade</a></span></div>
            </div>
            <ul>
              <li></li>
              <li>
                <div class="score">
                  <span><nuxt-link v-tooltip="'View Vendor'" :to="{name: 'facility-id', params: {id: item.slug}}" class="btn_2"><i class="fa fa-eye"></i></nuxt-link></span>
                  <span><nuxt-link v-tooltip="'Edit Vendor'" :to="{name: 'portal-facility-id', params: {id: item._id}}" class="btn_2"><i class="fa fa-pencil"></i></nuxt-link></span>
                  <span><nuxt-link v-tooltip="'View Vendor Comments'" :to="{name: 'portal-reviews', query: {name: item.name}}" class="btn_2"><i class="fa fa-comment"></i></nuxt-link></span>
                  <span><nuxt-link v-tooltip="'View Vendor Inquiries'" :to="{name: 'portal-inquiries', query: {name: item.name}}" class="btn_2"><i class="fa fa-envelope"></i></nuxt-link></span>
                  <span><nuxt-link v-tooltip="'View Vendor Transactions'" :to="{name: 'portal-transactions', query: {name: item.name}}" class="btn_2"><i class="fa fa-file"></i></nuxt-link></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /col -->
      <p v-if="items.total != 0 && (page + 1) < (Math.ceil(items.total/max))" class="text-center"><a @click="more" class="btn_1 rounded add_top_30">Load more</a></p>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import constants from '../../constants'

  export default {
    asyncData({ params, error, $axios }) {
      return $axios.get(`/portal/facilities/`, {params: {max: 25, page: 0}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    computed: {
    },
    data () {
      return {
        form: {
          category: ''
        },
        place: null,
        filters: {},
        category: {},
        max: 25,
        page: 0,
        items: {
          total: 0,
          data: []
        }
      }
    },
    methods: {
      cancelSubscription: function (item) {
        swal({title:"Cancel Subscription", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val) {
          if (!val) return;
          this.$axios.post(`/portal/facilities/cancel/${item._id}`).then((res) => {
            if(res.data && !res.data.error) {
              swal({title: "Cancel Subscription", text: "Your subscription was successfully canceled", icon: "success"});
            } else {
              swal({title: "Cancel Subscription", text: "Unable to complete your request", icon: "error"});
            }
            this.$nuxt.$loading.finish();
          }).catch((err) => {
            swal({title:"Cancel Subscription", text:"Unable to complete your request", icon:"error"});
            this.$nuxt.$loading.finish();
            console.log(err)
          });
        }.bind(this))
      },
      getStatus: function (item) {
        if(!item.expires) return 'InActive';
        if(new Date(item.expires) < new Date()) {
          return 'InActive'
        } else {
          return 'Active'
        }
      },
      more: function() {
        this.page++;
        this.$nuxt.$loading.start();
        var request = {max: this.max, page: this.page};
        this.$axios.get(`/portal/facilities/`, {params: request}).then((res) => {
          this.items.data = this.items.data.concat(res.data.data.data)
          this.$nuxt.$loading.finish();
        }).catch((err) => {
          this.$nuxt.$loading.finish();
          console.log(err)
        });
      },
    }
  }
</script>

<style>
  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
