<template>
  <div class="adspots margin_60_35">
    <div class="container">
      <h3 class="mb-5">Ad Spots Requests</h3>
      <div class="form-group row">
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Search" id="searchTerm" v-model="filters.search">
             <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a> 
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1" style="margin-top: 0px;">
            <select class="form-control" name="status" v-model="filters.status">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Facility</th>
            <th scope="col">Spot</th>
            <th scope="col">Placement</th>
            <th scope="col">Status</th>
            <th scope="col">
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.company ? item.company.name : ''  }}</td>
            <td>{{ item.facility ? item.facility.name : '' }}</td>
            <td>{{ item.spot ? item.spot.name : '' }}</td>
            <td>{{ item.spot ? item.spot.placement : '' }}</td>
            <td>{{ item.status }}</td>
            <td>
              <div style="display: flex;" v-if="item.status == 'pending'">
                <a class="btn_2" @click="approve(item._id)">
                  <i class="fa fa-tick"></i>Approve
                </a>
                <a class="btn_2 ml-2" @click="decline(item._id)" style="background: red;">
                  <i class="fa fa-close">Decline</i>
                </a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <div><span>{{items.data.length}}</span> of <span>{{items.total}}</span></div>
          <Pagination :source="items.total" :max="max" :page="page"
                      @update="changePage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #invoice-dialog {
    max-width: 600px;
  }
  .invoice-title h2, .invoice-title h3 {
    display: inline-block;
  }

  .table > tbody > tr > .no-line {
    border-top: none;
  }

  .table > thead > tr > .no-line {
    border-bottom: none;
  }

  .table > tbody > tr > .thick-line {
    border-top: 2px solid;
  }
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/admin/adspotrequests`, {params: {sSearch: query.name}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Pagination
    },
    mounted() {

    },
    data () {
      return {
        states: constants.states,
        isSearch: false,
        filters: {
          search: '',
          status: ''
        },
        item: {},
        max: 25,
        page: 0,
        items: {
          total: 0,
          data: []
        }
      }
    },
    methods: {
      refresh: function(){
        this.filters.search='';
        if(this.isSearch)this.search();
        this.isSearch = false
      },
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      sortby: function(field) {
        this.page = 0;
        this.filters.sortby[field] = this.filters.sortby[field] == 1 ? -1 : 1;
        this.search();
      },
      approve: function(id) {
        this.$nuxt.$loading.start();

        this.$axios.put(`/admin/adspotrequests/approve/${id}`,).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
              this.editor = false;
              this.search();
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
      decline: function(id) {
        this.$nuxt.$loading.start();

        this.$axios.put(`/admin/adspotrequests/deny/${id}`).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
              this.editor = false;
              this.search();
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
      search: function(o) {
        //Load the items
        if(o == 0) {
          this.page = 0;
        }

        var request = {sSearch: null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        if(this.filters.status) request.filters.status = this.filters.status;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;
        
        this.isSearch = true;
        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/adspotrequests`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
