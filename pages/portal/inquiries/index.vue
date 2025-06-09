<template>
  <div class="inquiries">
    <div class="sub_header_in">
      <div class="container">
        <h1>Inquiries</h1>
      </div>
      <!-- /container -->
    </div>

    <div class="inquiry margin_60_35">
      <div class="container">
        <div class="form-group row">
          <div class="col-lg-3">
            <div class="form-group custom-search-input-1" style="margin-top: 0px;">
              <input class="form-control" type="text" placeholder="Facility Name" id="searchTerm" v-model="filters.search">
              <i class="icon_search"></i>
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
              <th scope="col">
                <a @click="sortby('name')">First Name</a>
              </th>
              <th scope="col">
                <a @click="sortby('name')">Lst Name</a>
              </th>
              <th scope="col">
                <a @click="sortby('phone')">Phone</a>
              </th>
              <th scope="col">
                <a @click="sortby('email')">Email</a>
              </th>
              <th scope="col">Preferred Contact</th>
              <th scope="col">Facility Name</th>
              <!--<th scope="col">Facility Type</th>-->
              <th scope="col">
                <a @click="sortby('created_ts')">Date</a>
              </th>
              <th scope="col">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td>{{ item.firstname }}</td>
              <td>{{ item.lastname }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.preferredContact }}</td>
              <td>{{ item.facility ? item.facility.name : '' }}</td>
              <!--<template>-->
                <!--<td v-if="item.facility && item.facility.profile && item.facility.profile.type == 'TC'">Treatment Center</td>-->
                <!--<td v-else-if="item.facility && item.facility.profile && item.facility.profile.type == 'SL'">Sober Living</td>-->
                <!--<td v-else></td>-->
              <!--</template>-->
              <td>
                <span>{{ item.created_ts | date_format}}</span>
              </td>
              <td>
                <div style="display: flex; justify-content: space-between;">
                  <nuxt-link class="btn_3 mt-0" :to="{name: 'portal-inquiries-id',  params: { id: item._id } }">Details</nuxt-link>
                  <span> | </span>
                  <a class="btn_2" @click="remove(item)">Delete</a>
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
  </div>
</template>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'auth',
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/portal/inquiries`, {params: {sSearch: query.name}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Pagination
    },
    mounted() {
      this.filters.search = this.$route.query.name
    },
    data () {
      return {
        states: constants.states,
        filters: {
          search: '',
          sortby: {
            id: 1,
            lastname: 1,
            firstname: 1,
            phone: 1,
            email: 1
          }
        },
        max: 25,
        page: 0,
        items: {
          total: 0,
          data: []
        }
      }
    },
    methods: {
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      sortby: function(field) {
        this.page = 0;
        this.filters.sortby[field] = this.filters.sortby[field] == 1 ? -1 : 1;
        this.search();
      },
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = {id:obj._id};
          this.$nuxt.$loading.start()

          this.$axios.delete(`/portal/inquiries/${obj._id}`, request).then((res) => {
            if(res.data && !res.data.error){
              swal({title:"Remove", text:"Your request was completed successfully", icon:"success"}).then(function(val){
                this.search();
              }.bind(this));
            } else {
              //Handle errors
              swal({title:"Remove", text:"Unable to complete your request", icon:"error"});
            }
            this.$nuxt.$loading.finish()
          }).catch((err) => {
            swal({title:"Error", text: err, icon:"error"});
            this.$nuxt.$loading.finish()
          });
        }.bind(this));
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

        this.$nuxt.$loading.start()

        this.$axios.get(`/portal/inquiries`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
