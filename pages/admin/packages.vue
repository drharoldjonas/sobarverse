<template>
  <div class="packages">
    <div class="inquiry margin_60_35">
      <div class="container">
        <h3 class="mb-5">Packages</h3>
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
            <a class="btn_1" @click="addPackage" data-dialog-width-percent="30">
              <i class="fa fa-plus"></i> New
            </a>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-condensed">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Max Phone Clicks</th>
              <th scope="col">Advanced Profile</th>
              <th scope="col">Featured</th>
              <th scope="col">Price</th>
              <th scope="col">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.max_clicks }}</td>
              <td>{{ item.advanced ? 'yes' : 'no' }}</td>
              <td>{{ item.featured ? 'yes' : 'no' }}</td>
              <td>{{ item.price }}</td>
              <td>
                <div style="display: flex;">
                  <a class="btn_2" @click="edit(item)">Edit</a>
                  <a class="btn_2 ml-2" style="background: red;" @click="remove(item)">Delete</a>
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

      <div class="modal fade in" id="packageModal" tabindex="-1" role="dialog" aria-labelledby="packageModalLabel" aria-hidden="true">
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
                            <label>Name<span>*</span></label><br>
                            <input class="form-control" v-model="item.name" placeholder="Name" type="text">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Description<span>*</span></label><br>
                            <textarea class="form-control" cols="20" v-model="item.description" maxlength="3000" rows="5"></textarea>
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Max Phone Clicks<span>*</span></label><br>
                            <input class="form-control" v-model="item.max_clicks"  placeholder="Max Clicks" type="number">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Price<span>*</span></label><br>
                            <input class="form-control" v-model="item.price"  placeholder="Price" type="number">
                          </div>
                          <div class="form-group col-md-12">
                            <h6 class="formlabel">Features</h6>
                            <div class="row">
                              <div class="col-md-6">
                                <label class="container_check">Advanced Profile
                                  <input type="checkbox" v-model="item.advanced" value="yes">
                                  <span class="checkmark"></span>
                                </label>
                              </div>
                              <div class="col-md-6">
                                <label class="container_check">Featured
                                  <input type="checkbox" v-model="item.featured" value="yes">
                                  <span class="checkmark"></span>
                                </label>
                              </div>
                            </div>
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
              <button type="button" class="btn btn-primary" @click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#packageModal{
  z-index: 99999999999999999; 
}
</style>
<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/admin/packages`, {params: {sSearch: query.name}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data) }
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
        filters: {
          search: ''
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
      addPackage: function(item) {
        this.item = {};
        $('#packageModal').modal('show')
      },
      cancel: function() {
        $('#packageModal').modal('hide')
      },
      edit: function(item) {
        this.item = item;
        $('#packageModal').modal('show')
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
        delete request.args.role;
        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/packages`, request).then((res) => {
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
          this.$nuxt.$loading.start();

          this.$axios.delete(`/admin/packages/${obj._id}`, request).then((res) => {
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

        this.$axios.get(`/admin/packages`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
