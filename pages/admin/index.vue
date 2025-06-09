<template>
  <div class="company margin_60_35">
    <div class="container">
      <h3 class="mb-5">Companies</h3>
      <div class="form-group row">
        <div class="col-xs-12  col-lg-5 mb-2">
          <div class="custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Search..." id="searchTerm" v-model="filters.search">
             <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a>
          </div>
        </div>
        <div class="col-xs-12 col-lg-7">
          <div class="row">
            <div class="col-xs-4 m-1">
              <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
            </div>
            <div class="col-xs-4 m-1">
              <a @click="addCompany" class="btn_1">
                <i class="fa fa-plus"></i> New
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th scope="col">
              <a @click="sortby('name')">Name</a>
            </th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Vendors</th>
            <th scope="col">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.facilities ? item.facilities.count: 0 }}</td>
            <td>
              <!--<a @click="settings(item)"><i class="fa fa-cog"></i></a>-->
              <a @click="edit(item)">
                <i class="fa fa-edit"></i>
              </a>
              <a @click="remove(item)" style="color: red;">
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <div><span>{{items.data.length}}</span> of <span>{{items.total}}</span></div>
          <h4 class="text-center text-danger" v-if="items.data.length == 0">Data is loading Please Wait......!!!! </h4>
          <Pagination :source="items.total" :max="max" :page="page"
                          @update="changePage"></Pagination>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade in" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="companyModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">New Company</h2>
              <h2 class="modal-title" v-else>Edit Company: {{ item.name }}</h2>
              <button type="button" class="bootbox-close-button close" @click="cancel" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="bootbox-body">

                <div id="companyForm">

                  <form id="form0">
                    <div class="col-md-12">
                      <div class="form-group row">
                        <div class="col-md-6 form-group required">
                          <label>Company Name <span>*</span>:</label>
                          <input class="form-control" v-model="item.name" type="text">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-md-6 form-group required">
                          <label>Street 1 <span>*</span>:</label>
                          <input class="form-control" v-model="item.address" type="text">
                        </div>
                        <div class="col-md-6 form-group">
                          <label>Street 2:</label>
                          <input class="form-control" v-model="item.address2" type="text">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-md-6 form-group required">
                          <label>City <span>*</span>:</label>
                          <input class="form-control" v-model="item.city" type="text">
                        </div>
                        <div class="col-md-6 form-group required">
                          <label>State <span>*</span>:</label>
                          <select class="selectpicker form-control" v-model="item.state">
                            <option value="">---Select A State ---</option>
                            <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="col-md-6 form-group required">
                          <label>Zip <span>*</span>:</label>
                          <input class="form-control" v-model="item.zip" type="text">
                        </div>
                        <div class="col-md-6 form-group required">
                          <label>Email <span>*</span>:</label>
                          <input class="form-control" v-model="item.email" type="email">
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="col-md-6 form-group required">
                          <label>Phone Number <span>*</span>:</label>
                          <input class="form-control" v-model="item.phone" type="text">
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
    </div>
  </div>
</template>
<style scoped>
#companyModal{
  z-index: 99999999999999999;
}
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    mounted:function(){
      this.pageLoad()
    },

    components: {
      Pagination
    },
    data () {
      return {
        states: constants.states,
        loading: false,
        isSearch: false,
        item: {
          profile_amount: 0
        },
        filters: {
          search: '',
          sortby: {
            id: 1,
            company_name: 1,
            profile_amount: 1,
            campaign_name: 1,
            start_date: 1,
            end_date: 1,
            campaign_status: 1
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
      settings: function(item) {

      },
      refresh: function() {
        this.filters.search='';
        if (this.isSearch) this.search();
        this.isSearch = false
      },
      edit: function(item) {
        this.item = item;
        $('#companyModal').modal('show')
      },
      addUser: function(item) {
        this.newUser = {};
        $('#userModal').modal('show')
      },
      addCompany: function() {
        this.item = {
          profile_amount: 0
        };
        $('#companyModal').modal('show')
      },
      cancel: function() {
        $('#companyModal').modal('hide')
      },
      save: function() {
        //Handle saving the changes
        var request = {id:this.item._id, args:this.item};
        delete request.args.role;
        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/companies`, request).then((res) => {
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

          var request = { id:obj._id };
          this.$nuxt.$loading.start()

          this.$axios.delete(`/admin/companies/${obj._id}`, request).then((res) => {
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
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      sortby: function(field) {
        this.page = 0;
        this.filters.sortby[field] = this.filters.sortby[field] == 1 ? -1 : 1;
        this.search();
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
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/companies`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      },
      pageLoad: function(){

          // asyncData({ params, error, $axios }) {
          this.$axios.get(`/admin/companies`, {params: {max: 25}}).then((res) => {
            console.log(res.data);
             this.items = res.data || {total: 0, data: []}
          }).catch((e) => {
            console.log(e)
          })


        }
      }
    }
  // }
</script>
