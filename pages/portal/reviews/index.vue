<template>
  <div class="reviews">
    <div class="margin_60_35">
      <div class="container">
        <h3 class="mb-5">User Reviews</h3>
        <div class="form-group row">
          <div class="col-lg-3">
            <div class="form-group custom-search-input-1" style="margin-top: 0px;">
              <input class="form-control" type="text" placeholder="Facility Name" id="searchTerm" v-model="filters.search">
              <i class="icon_search"></i>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="form-group custom-search-input-1" style="margin-top: 0px;">
              <select class="form-control" name="status" v-model="filters.status">
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
          <div class="col-lg-6">
            <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered table-listing">
            <thead>
            <tr>
              <th scope="col">
              </th>
              <th scope="col">
                <a @click="sortby('pagename')">Page Name</a>
              </th>
              <!--<th scope="col">-->
                <!--<a @click="sortby('title')">Review Title</a>-->
              <!--</th>-->
              <th scope="col">
                <a @click="sortby('ip')">IP Address</a>
              </th>
              <th scope="col">
                <a @click="sortby('summary')">Review Summary</a>
              </th>
              <th scope="col">
                Avg Rating
              <!--</th>-->
              <!--<th scope="col">-->
                <!--<a @click="sortby('username')">User-Name</a>-->
              <!--</th>-->
              <th scope="col">
                <a @click="sortby('created_ts')">CreatedOn</a>
              </th>
              <th scope="col">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td>
                <nuxt-link class="btn_3" :to="{name: 'portal-reviews-id',  params: { id: item._id } }" target="_blank">Edit</nuxt-link>
              </td>
              <td>{{ item.facility ? item.facility.name : '' }}</td>
              <!--<td>-->
                <!--<div class="more">-->
                  <!--{{ item.title }}-->
                <!--</div>-->
              <!--</td>-->
              <td>{{ item.ip }}</td>
              <td>
                <div class="more">
                  {{ item.review.substring(0, 300) }}
                  <span v-if="item.review.length > 300" class="moreelipses"> ...</span>
                  <span v-if="item.review.length > 300" class="morecontent">
                    <span style="display:none;">{{ item.review.substring(300, item.review.length) }}</span>
                    &nbsp;&nbsp;<a class="morelink">Read More</a>
                </span>
                </div>
              </td>
              <td>
                {{ item.rating.avg }}
              </td>
              <!--<td>{{ item.user ? item.user.email : '' }}</td>-->
              <td>{{ item.created_ts | date_format }}</td>
              <td>
                <div style="display: flex;justify-content: space-between;">
                  <a class="btn_2" v-if="item.status == 'pending'" @click="approve(item)">Approve</a>
                  <span v-if="item.status == 'pending'">&nbsp;</span>
                  <a class="btn_2" style="background: red;" @click="remove(item)">Delete</a>
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
      return $axios.get(`/portal/reviews`, {params: {sSearch: query.name}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    mounted() {
      this.filters.search = this.$route.query.name
    },
    components: {
      Pagination
    },
    data () {
      return {
        states: constants.states,
        filters: {
          search: '',
          fromdate: '',
          todate: '',
          status: '',
          sortby: {
            id: 1,
            username: 1,
            email: 1,
            role: 1
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
      approve: function(item) {
        var request = {id:item._id};
        this.$nuxt.$loading.start()

        this.$axios.post(`/portal/reviews/approve`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Remove", text:"Review Approved Successfully", icon:"success"}).then(function(val){
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
      },
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = {id:obj._id};
          this.$nuxt.$loading.start()

          this.$axios.delete(`/portal/reviews/${obj._id}`, request).then((res) => {
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

        this.$axios.get(`/portal/reviews`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
