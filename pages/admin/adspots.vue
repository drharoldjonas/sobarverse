<template>
  <div class="adspots margin_60_35">
    <div class="container">
      <h3 class="mb-5">Ad Spots</h3>
      <div class="form-group row">
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Name" id="searchTerm" v-model="filters.search">
             <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a> 
          </div>
        </div>
        <div class="col-lg-6">
          <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
          <a @click="addSpot" class="btn_1">
            <i class="fa fa-plus"></i> New
          </a>
          <a class="btn_1" @click="edit2">
            <i class="fa fa-edit"></i>Edit Selected</a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Placement</th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">Facility</th>
            <th scope="col">Expires</th>
            <th scope="col">Edit</th>
            <th scope="col">
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.name  }}</td>
            <td>{{ item.placement }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.facility ? item.facility.name : '' }}</td>
            <td>{{ item.expires | format_date }}</td>
             <td>
              <input type="checkbox" @click="addToArray(item)" :checked ="isSelected(item)">
            </td>
            <td>
              <div style="display: flex;">
                <a class="btn_2" @click="edit(item)">
                  <i class="fa fa-edit"></i>Edit
                </a>
                <a class="btn_2 ml-2" @click="remove(item)" style="background: red;"><i class="fa fa-trash">Delete</i></a>
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
      <!-- Modal -->
      <div class="modal fade in" id="adsModal" tabindex="-1" role="dialog" aria-labelledby="adsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">New Ad Spot</h2>
              <h2 class="modal-title" v-else>Edit: {{ item.name }}</h2>
              <button type="button" class="bootbox-close-button close" @click="cancel" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="bootbox-body">

                <div id="spotForm">

                  <form id="form0">
                    <div class="col-md-12">
                      <div class="form-group">
                        <div class="col-md-8 form-group required">
                          <label>Name: <span>*</span>:</label>
                          <input class="form-control" v-model="item.name" type="text">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group required">
                          <label>Placement: <span>*</span>:</label>
                          <input class="form-control" v-model="item.placement" type="number">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group required">
                          <label>Phone: <span>*</span>:</label>
                          <input class="form-control" v-model="item.phone" type="text">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group">
                          <label>Status:</label>
                          <select class="selectpicker form-control" v-model="item.status">
                            <option value="">---Select A Status ---</option>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group">
                          <label>Price:</label>
                          <input class="form-control" v-model="item.price" type="number">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group">
                          <label>Facility</label>
                          <client-only>
                            <v-select label="name" :filterable="false" :options="options" v-model="item.facility" @search="onSearch">
                              <template slot="no-options">
                                type to search for Facility..
                              </template>
                              <template slot="option" slot-scope="option">
                                <div class="d-center">
                                  <img class="img-fluid" style="width: 25px" v-if="option.profile && option.profile.logo" :src='option.profile.logo'/>
                                  {{ option.name }}
                                </div>
                              </template>
                              <template slot="selected-option" slot-scope="option">
                                <div class="selected d-center">
                                  <img class="img-fluid" style="width: 25px" v-if="option.profile && option.profile.logo" :src='option.profile.logo'/>
                                  {{ option.name }}
                                </div>
                              </template>
                            </v-select>
                          </client-only>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group">
                          <label>Expires:</label>
                          <datepicker v-model="item.expires" input-class="form-control"></datepicker>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cancel">Close</button>
              <button type="button" class="btn btn-primary" @click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal -->

       <!-- 2Modal -->
      <div class="modal fade in" id="adsModal2" tabindex="-1" role="dialog" aria-labelledby="adsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="selected.length === 0">No items Select</h2>
              <h2 class="modal-title" v-else>Edit Multiple Item</h2>
              <button type="button" class="bootbox-close-button close" @click="cancel2" aria-hidden="true">×</button>
            </div>
            <div class="modal-body" v-if="selected.length > 0">
              <div class="bootbox-body">

                <div id="spotForm">

                  <form id="form0">
                    <div class="col-md-12">
                
                      <div class="form-group">
                        <!--<div class="col-md-8 form-group">
                          <label>Status:</label>
                          <select class="selectpicker form-control" v-model="status">
                            <option value="">---Select A Status ---</option>
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </div>-->
                      </div>
                      <div class="form-group">
                        <div class="col-md-8 form-group">
                          <label>Expires:</label>
                          <datepicker v-model="exp_date" input-class="form-control"></datepicker>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cancel2">Close</button>
              <button type="button" class="btn btn-primary" @click="save2" v-if="selected.length > 0">Save</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 2modal -->
    </div>
  </div>
</template>

<style>
#adsModal2{
  z-index: 99999999999999999; 
}
#adsModal{
  z-index: 99999999999999999; 
}
  input.vs__search {
    height: 30px !important;
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
  import 'vue-select/dist/vue-select.css';

  export default {
    middleware: 'admin',
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/admin/adspots`, {params: {sSearch: query.name}}).then((res) => {
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
          search: ''
        },
        selected: [],
        status: '',
        exp_date: '',
        item: {},
        max: 25,
        page: 0,
        items: {
          total: 0,
          data: []
        },
        options: []
      }
    },
    methods: {
      refresh: function(){
        this.filters.search='';
        if(this.isSearch)this.search();
        this.isSearch = false
      },
      isSelected(data){
         var found = false;
        this.selected.forEach((item, index)=>{
          if(item.id === data.id){
            found = true;}         
        }); 
        return found;       
          
      },
      addToArray(data){
        var found = false;
        if(this.selected.length === 0){
          this.selected.push(data);
          }
        else{
        this.selected.forEach((item, index)=>{
          if(item.id === data.id){
            this.selected.splice(index, 1);
            found = true;
          }
          else if(index === this.selected.length-1 || !found){
            this.selected.push(data);
          }
        });
        }               
      },
      onSearch(search, loading) {
        loading(true);
        this.searchFacility(loading, search, this);
      },
      searchFacility(loading, search, vm) {
        this.$axios.get(
          `/admin/facilities?sSearch=${escape(search)}&max=10`
        ).then(res => {
          vm.options = res.data.data.data;
          loading(false);
        }).catch(e => {
          console.log(e)
          loading(false)
        });
      },
      formatDate: function(date) {
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
      },
      edit: function(item) {
        this.item = item;
        this.item.expires = this.formatDate(this.item.expires);
        $('#adsModal').modal('show')
      },
      addSpot: function(item) {
        this.item = {};
        $('#adsModal').modal('show')
      },
      cancel: function() {
        $('#adsModal').modal('hide')
      },

         edit2: function(item) {
        $('#adsModal2').modal('show')
      },
      addSpot2: function(item) {
        this.item = {};
        $('#adsModal2').modal('show')
      },
      cancel2: function() {
        $('#adsModal2').modal('hide')
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
      save2: function(){
        this.cancel2();
        this.selected.forEach((item)=>{
          //if(this.status)item.status = this.status;
          if(this.exp_date)item.expires = this.exp_date;
          var request = {id:item._id, args:item};
        this.$nuxt.$loading.start();

        var type = (item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/adspots`, request).then((res) => {
          if(res.data && !res.data.error){
            this.selected.splice(0, 1);
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
        })
        this.status='';
        this.exp_date='';
      },
      save: function() {
        //Handle saving the changes
        var request = {id:this.item._id, args:this.item};
        if(this.item.facility) request.args.facility_id = this.item.facility._id;
        delete request.args.facility;
        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/adspots`, request).then((res) => {
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
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = {id:obj._id};
          this.$nuxt.$loading.start()

          this.$axios.delete(`/admin/adspots/${obj._id}`, request).then((res) => {
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

        this.isSearch = true;
        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/adspots`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
