<template>
  <div class="company margin_60_35">
    <div class="container">
      <h3 class="mb-5">Users</h3>
      <div class="form-group row">
        <div class="col-lg-5 mb-3">
          <div class="custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Search..." id="searchTerm" v-model="filters.search">
            <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a> 
          </div>
        </div>
        <div class="col-lg-7">
          <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
          <a class="btn_1" @click="addUser" data-dialog-width-percent="30">
            <i class="fa fa-user-plus"></i>
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th scope="col">
            <a @click="sortby('company')">Company</a>
            </th>
            <th scope="col">
              <a @click="sortby('firstname')">First Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('lastname')">Last Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('email')">Email</a>
            </th>
            <th scope="col">
              <a @click="sortby('role')">Role</a>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.company ? item.company.name : '' }}</td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role ? item.role.name : '' }}</td>
            <td>
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
          <Pagination :source="items.total" :max="max" :page="page"
                          @update="changePage"></Pagination>
        </div>
      </div>

      <div class="modal fade in" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">New User</h2>
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
                            <label>First name<span>*</span></label><br>
                            <input class="form-control" v-model="item.firstname" placeholder="First Name" type="text" value="">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Last Name<span>*</span></label><br>
                            <input class="form-control" v-model="item.lastname" placeholder="Last Name" type="text" value="">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Email<span>*</span></label><br>
                            <input class="form-control" v-model="item.email"  placeholder="Email" type="text" value="">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Password<span>*</span></label><br>
                            <input class="form-control" v-model="item.password"  placeholder="Password" type="password">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Confirm Password<span>*</span></label><br>
                            <input class="form-control" v-model="item.confirm_password"  placeholder="ConfirmPassword" type="password">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>User Role<span>*</span></label><br>
                            <select class="form-control" v-model="item.role_id">
                              <option v-for="(role, index) in roles" :value="role._id" :key="index">{{ role.name }}</option>
                            </select>
                            <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true"></span></span>
                          </div>
                          <div class="col-md-12 form-group">
                            <label>Company:</label>
                            <client-only>
                              <v-select label="name" :filterable="false" :options="options" v-model="item.company" @search="onSearch">
                                <template slot="no-options">
                                  type to search for Company..
                                </template>
                                <template slot="option" slot-scope="option">
                                  <div class="d-center">
                                    {{ option.name }}
                                  </div>
                                </template>
                                <template slot="selected-option" slot-scope="option">
                                  <div class="selected d-center">
                                    {{ option.name }}
                                  </div>
                                </template>
                              </v-select>
                            </client-only>
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
              <button type="button" class="btn btn-primary" @click="checkUsername">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#userModal{
  z-index: 99999999999999999; 
}
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      let URL1 = `/admin/users`;
      let URL2 = `/admin/roles`;

      const fetchURL = (url) => $axios.get(url, {params: {filters: {}, max: 25}});

      const promiseArray = [URL1, URL2].map(fetchURL);

      return Promise.all(promiseArray).then((res) => {
        return { items: res[0].data || {total: 0, data: []}, roles: res[1].data.data || []}
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Pagination
    },
    data () {
      return {
        states: constants.states,
        isSearch: false,
        item: {},
        roles: [],
        filters: {
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
      onSearch(search, loading) {
        loading(true);
        this.searchCompany(loading, search, this);
      },
      searchCompany(loading, search, vm) {
        this.$axios.get(
          `/admin/companies?sSearch=${escape(search)}&max=10`
        ).then(res => {
          vm.options = res.data.data;
          loading(false);
        }).catch(e => {
          console.log(e)
          loading(false)
        });
      },
      edit: function(item) {
        this.item = item;
        $('#userModal').modal('show')
      },
      addUser: function(item) {
        this.item = {};
        $('#userModal').modal('show')
      },
      cancel: function() {
        this.item = {};
        $('#userModal').modal('hide')
      },
      checkUsername: function() {
        //Handle saving the changes
        var request = {username: this.item.username};
        this.$nuxt.$loading.start();

        this.$axios.get(`/admin/users/check`, {params: request}).then((res) => {
          if(res.data.data) {
            swal({title:"Notice", text:'Username already taken', icon:"error"});
            this.$nuxt.$loading.finish();
            return
          }

          this.save()
        }).catch((err) => {
          swal({title:"Error", text: err, icon:"error"});
          this.$nuxt.$loading.finish()
        });
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
      save: function() {
        //Handle saving the changes
        var request = {id:this.item._id, args:this.item};
        if(this.item.company) request.args.company_id = this.item.company._id;
        delete request.args.role;
        delete request.args.company;
        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/users`, request).then((res) => {
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

          this.$axios.delete(`/admin/users/${obj._id}`, request).then((res) => {
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

        this.isSearch = true;
        this.$nuxt.$loading.start()

        var request = {sSearch:null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        if(this.filters.sort) request.filters.sort = this.filters.sortby;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/users`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
