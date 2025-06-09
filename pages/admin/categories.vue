<template>
  <div class="company margin_60_35">
    <div class="container">
      <h3 class="mb-5">Categories</h3>
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
          <a class="btn_1" @click="addCategory" data-dialog-width-percent="30">
            <i class="fa fa-user-plus"></i>
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <!--<th scope="col">-->
            <!--<a @click="sortby('id')">ID</a>-->
            <!--</th>-->
            <th scope="col">
              <a @click="sortby('name')">Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('name')">Slug</a>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <!--<td>{{ item.id }}</td>-->
            <td>{{ item.name }}</td>
            <td>{{ item.slug }}</td>
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
          <Pagination :source="items.total" :max="max" :page="page" @update="changePage"></Pagination>
        </div>
      </div>

      <div class="modal fade in" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="top: 15% !important; right: 10% !important;" role="document">
          <div class="modal-content" style="min-width: 800px !important;">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">New Category</h2>
              <h2 class="modal-title" v-else>Edit Category</h2>
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
                            <label>Slug<span>*</span></label><br>
                            <input class="form-control" v-model="item.slug" placeholder="Slug" type="text" value="">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Name<span>*</span></label><br>
                            <input class="form-control" v-model="item.name" placeholder="Name" type="text" value="">
                          </div>
                          <div class="col-md-12 form-group required">
                            <label>Description<span>*</span></label><br>
                            <ckeditor type="classic" style="height: 500px;" v-model="item.description"></ckeditor>
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

<style>
  .ck-content { min-height:400px; max-height:400px; }
  #categoryModal {
  z-index: 99999999999999999;
}
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/categories`, {params: {max: 25}}).then((res) => {
        return { items: res.data || {total: 0, data: []}}
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
        }
      }
    },
    methods: {
      refresh: function(){
        this.filters.search='';
        if(this.isSearch)this.search();
        this.isSearch = false
      },
      edit: function(item) {
        this.item = item;
        $('#categoryModal').modal('show')
      },
      addCategory: function(item) {
        this.item = {};
        $('#categoryModal').modal('show')
      },
      cancel: function() {
        this.item = {};
        $('#categoryModal').modal('hide')
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

        this.$axios[type](`/admin/categories`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
              this.editor = false;
              this.cancel();
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

          this.$axios.delete(`/admin/categories/${obj._id}`, request).then((res) => {
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

        this.$axios.get(`/admin/categories`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
