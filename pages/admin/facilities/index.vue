<template>
  <div class="company margin_60_35">
    <div class="container">
      <h3 class="mb-5">Vendors</h3>
      <div class="form-group row">
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1 mb-2 mt-0">
            <input class="form-control" type="text" placeholder="Vendor Name..." id="searchTerm" v-model="filters.search">
            <i class="icon_search" v-if="!filters.search"></i>
            <a v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1 mb-2 mt-0">
            <select class="form-control" name="status" v-model="filters.status">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
            <!--<select class="form-control" name="searchType">-->
            <!--<option value="All">All</option>-->
            <!--<option value="Basic Listings - Unclaimed">Basic Listings - Unclaimed</option>-->
            <!--<option value="Basic Listings - Claimed">Basic Listings - Claimed</option>-->
            <!--<option value="Free Profiles">Free Profiles</option>-->
            <!--<option value="Advertised Profiles">Advertised Profiles</option>-->
            <!--<option value="Pending Only">Pending Only</option>-->
            <!--<option value="Rejected Only">Rejected Only</option>-->
            <!--<option value="Expired Profiles">Expired Profiles</option>-->
            <!--</select>-->
          </div>
        </div>
        <div class="col-xs-12 col-lg-6">
          <div class="row">
            <div class="col-xs-4 m-1">
              <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
            </div>
            <div class="col-xs-4 m-1">
              <nuxt-link :to="{name: 'admin-facilities-new'}" class="btn_1">
                <i class="fa fa-plus"></i> New
              </nuxt-link>
            </div>
            <div class="col-xs-2 m-1">
              <a class="btn_1" @click="uploadFacility" data-dialog-width-percent="30">
                <i class="fa fa-upload"></i>
              </a>
            </div>
            <div class="col-xs-2 m-1">
              <button class="btn_1" :disabled="selected.length === 0" @click="updateVen" data-dialog-width-percent="30">
                Update Selected
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="row">-->
        <!--<div class="col-md-4">-->
          <!--<a href="/admin/#/pending/facilities">Pending Profiles</a>-->
        <!--</div>-->
      <!--</div>-->

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
            <tr>
              <th scope="col">
                <a>Select</a>
              </th>
              <th scope="col">
                <a>Logo</a>
              </th>
              <th scope="col">
                <a @click="sortby('name')">Name</a>
              </th>
              <th scope="col">
                <a @click="sortby('company_id')">Company</a>
              </th>
              <th scope="col">
                <a @click="sortby('city')">City</a>
              </th>
              <th scope="col" class="text-center">
                <a @click="sortby('state')">State</a>
              </th>
              <th scope="col">
                <a @click="sortby('status')">Status</a>
              </th>
              <th scope="col">
                <a @click="sortby('featured')">Featured</a>
              </th>
              <th scope="col">
                <a @click="sortby('expires')">Expires</a>
              </th>
              <th scope="col">
                <a @click="sortby('created_ts')">Created</a>
              </th>
              <th scope="col">Profile</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td class="text-center">
                <input type="checkbox" @click="addToArray(item._id)" :checked="isSelected(item._id)">
              </td>
              <td>
                <a v-if="item.profile && item.website" :href="item.protocol + item.website" target="_blank"><img v-if="item.profile.logo" width="45" :src="item.profile.logo" :alt="item.name" /></a>
              </td>
              <td>
                <nuxt-link target="_blank" :to="{name: 'facility-id', params: {id: item.slug}}">{{ item.name }}</nuxt-link>
              </td>
              <td>{{ item.company ? item.company.name : '' }}</td>
              <td>{{ item.city }}</td>
              <td class="text-center">{{ item.state }}</td>
              <td>{{ item.status }}</td>
              <td class="text-center">{{ item.featured }}</td>
              <td>{{ item.spot ? item.spot.expires : item.subscription ? item.subscription.subscription_end : '' | date_format}}</td>
              <td>{{ item.created_ts | date_format }}</td>
              <td class="ProfileCol">
                <span v-if="item.profile_type">{{ item.profile_type }}</span>
                <span v-else>
                    <div>
                      <nuxt-link class="btn_3" :to="{name: 'admin-facilities-profile-add-tc-id', params: {id: item._id}}">Add TC</nuxt-link>
                    </div>
                    <div>
                      <nuxt-link class="btn_3" :to="{name: 'admin-facilities-profile-add-sl-id', params: {id: item._id}}">Add SL</nuxt-link>
                    </div>
                </span>
              </td>
              <td>
                <nuxt-link :to="{name: 'admin-facilities-id', params: {id: item._id}}"><i class="fa fa-edit"></i></nuxt-link>
                <a @click="remove(item)"><i style="color: red;" class="fa fa-trash"></i></a>
                <!--<a @click="showStats"><i class="fa fa-chart-bar"></i></a>-->
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

      <div class="modal fade in" id="bulk_cat_modal" tabindex="-1" role="dialog" aria-labelledby="bulk_cat_modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Select Categories</h2>
              <button type="button" class="bootbox-close-button close my-auto" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="bootbox-body">

                <div id="spotForm">

                  <form id="form0">
                    <div class="modal-body">
                      <div class="col-md-12">
                        <div class="form-group">
                          <div class="col-12 form-group">
                            <label>Category <span>*</span>:</label>
                            <client-only>
                              <v-select label="name" :filterable="false" :taggable="true" :multiple="true" :reduce="tag => tag._id || tag" :options="options" v-model="vendor_category" @search="onSearch">
                                <template slot="no-options">
                                  type to search for Category..
                                </template>
                                <template slot="option" slot-scope="option">
                                  <div class="d-center">
                                    {{ option.name }}
                                  </div>
                                </template>
                                <template #selected-option="{name}">
                                  <div class="selected d-center">
                                    {{ getLabel(name) }}
                                  </div>
                                </template>
                              </v-select>
                            </client-only>
                            <span class="err-msg">
                          <span class="field-validation-valid">{{ error }}</span>
                        </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cancel2">Close</button>
              <button type="button" class="btn btn-primary" @click="applyCat">Save</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade in" id="facilityModal" tabindex="-1" role="dialog" aria-labelledby="facilityModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">Upload Facilities</h2>
              <h2 class="modal-title" v-else>Edit User</h2>
              <button type="button" class="bootbox-close-button close" @click="cancel" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="bootbox-body">
                <div class="content white-bg">
                  <div class="container">

                    <div id="sign-up-cont" class="sign-in-cont">
                      <form id="userForm">
                        <div class="row">
                          <div class="col-md-12 form-group required">
                            <label>Meeting Type<span>*</span></label><br>
                            <select class="form-control" v-model="item.type">
                              <option value="">All</option>
                              <option value="SA">Substance Use</option>
                              <option value="MH">Mental Health</option>
                            </select>
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>File<span>*</span></label><br>
                            <input class="form-control" ref="file" type="file" @change="onSelect">
                          </div>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cancel">Close</button>
              <button type="button" class="btn btn-primary" @click="uploadFile">Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade in" id="statsModal" tabindex="-1" role="dialog" aria-labelledby="statsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Facility Stats</h2>
              <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="bootbox-body">
                <div style="margin-top:5px;" id="pageStatsTab">
                  <div style="margin-top:5px;">
                    <span>Date: 10/01/2019 - Today</span>
                  </div>

                  <div class="row form-group">
                    <div class="col-md-4">
                      <label>
                        From
                      </label>
                      <input class="form-control datepicker mid-inp" name="FromDate" type="text">
                    </div>

                    <div class="col-md-4">
                      <label>
                        To
                      </label>
                      <input class="form-control datepicker mid-inp" id="ToDate" name="ToDate" type="text">
                    </div>
                    <div class="col-md-4" style="padding-top:27px;">
                      <button class="btn-danger btn" id="getStats">Get Stats</button>
                    </div>
                  </div>

                  <table class="table table-responsive table-striped" style="margin-top:15px;">
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Profile Views</th>
                        <th>Website Clicks</th>
                        <th>Phone Views</th>
                        <th>Form fills</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Cleveland-House</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="card mb-3">
                    <div class="card-header">
                      <i class="fa fa-chart-bar"></i> Only admins see this chart</div>
                    <div class="card-body">
                      <canvas id="myBarChart" width="100" height="50"></canvas>
                    </div>
                    <div class="card-footer small text-muted"></div>
                  </div>
                </div>
              </div>
            </div>
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
    middleware: 'admin',
    async asyncData({$axios}) {
      let [items, db_vendor_categories] = await Promise.all([
        $axios.get(`/admin/facilities`, {params: {max: 25}}),
        $axios.$post('/vendor-cat-populated')
      ]).catch((err) => {
        console.log(err)
      })

      return { items: Object.assign({total: 0, data: []}, items.data.data), db_vendor_categories: db_vendor_categories.data }
    },
    components: { Pagination },
    data () {
      return {
        error: '',
        vendor_category: [],
        options: [],
        states: constants.states,
        item: {},
        isSearch: false,
        selected: [],
        filters: {
          search: '',
          status: '',
          sortby: {
            id: 1,
            page_name: 1,
            company_id: 1,
            city: 1,
            state: 1,
            created_ts: 1,
            status: 1,
            trail_end: 1,
            featured: 1,
            campaign: 1
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
      getLabel(option) {
        if (typeof option === 'object') {
          return option.name
        } else if (typeof option === 'string' && /^[a-fA-F0-9]{24}$/.test(option) && this.db_vendor_categories.length > 0) {
          const data = this.db_vendor_categories.find(i => option.toString() === i._id.toString())
          return data.name
        } else {
          return option
        }
      },
      onSearch(search, loading) {
        loading(true);
        this.searchCompany(loading, search, this);
      },
      searchCompany(loading, search, vm) {
        this.$axios.$post(`/admin/category/search`, {search: search}).then( res => {
          vm.options = res.data;
          loading(false);
        }).catch(e => {
          console.log(e)
          loading(false)
        });
      },
      addToArray(id) {
        let found = false;
        if (this.selected.length === 0) {
          this.selected.push(id);
        } else {
          this.selected.forEach((item, index) => {
            if(item === id) {
              this.selected.splice(index, 1);
              found = true;
            } else if (index === this.selected.length - 1 || !found ) {
              this.selected.push(id);
            }
          });
        }
      },
      isSelected(id) {
        return this.selected.includes(id)
      },
      refresh: function(){
        this.filters.search='';
        if(this.isSearch)this.search();
        this.isSearch = false
      },
      onSelect: function() {
        var file = this.$refs.file.files[0];
        this.file = file;
      },
      uploadFacility: function() {
        this.item = {
          type: ''
        };
        $('#facilityModal').modal('show')
      },
      updateVen() {
        $('#bulk_cat_modal').modal('show')
      },
      cancel: function() {
        this.item = {};
        $('#facilityModal').modal('hide')
      },
      uploadFile: function() {
        var formData = new FormData();
        formData.append('file', this.file);
        formData.append('type', this.item.type);

        this.$nuxt.$loading.start();

        this.$axios.post(`/admin/facilities/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
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
      showStats: function() {
        $('#statsModal').modal('show')
      },
      addUser: function(item) {
        this.newUser = {};
        $('#userModal').modal('show')
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
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = { id:obj._id };
          this.$nuxt.$loading.start()

          this.$axios.delete(`/admin/facilities/${obj._id}`, request).then((res) => {
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
      applyCat() {
        let obj = {
          vendors: [...new Set(this.selected)],
          categories: this.vendor_category
        }

        if ( this.vendor_category.length === 0 ) {
          this.error = 'Please select a Vendor Category';
          return;
        }

        this.$axios.$post(`/admin/facilities/add-categories`, obj).then((r) => {
          if (r.updated) {
            swal({title:"Notice", text:"Vendors Successfully Updated", icon:"success"}).then(() => {
              this.selected = []
              $('#bulk_cat_modal').modal('hide')
            })
          }
        })
      },
      cancel2() {
        $('#bulk_cat_modal').modal('hide')
      },
      search: function(o) {
        //Load the items
        if(o == 0) {
          this.page = 0;
        }
        this.isSearch = true;
        this.$nuxt.$loading.start()

        var request = {sSearch:null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        if(this.filters.sort) request.filters.sort = this.filters.sortby;
        if(this.filters.status) request.filters.status = this.filters.status;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/facilities`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
