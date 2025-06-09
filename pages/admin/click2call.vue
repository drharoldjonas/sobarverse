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
          <a @click="addPhone" class="btn_1">
            <i class="fa fa-plus"></i> New
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th scope="col">Treatment</th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.treatment }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.status }}</td>
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
      <div class="modal fade in" id="phoneModal" tabindex="-1" role="dialog" aria-labelledby="phoneModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" v-if="!item._id">New Click to Call</h2>
              <h2 class="modal-title" v-else>Edit</h2>
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
                          <select class="selectpicker form-control" v-model="item.status">
                            <option value="">---Select Treatment ---</option>
                            <option value="alcohol">Alcohol</option>
                            <option value="drugs">Drugs</option>
                            <option value="mental_health">Mental Health</option>
                            <option value="dual_diagnosis">Dual Diagnosis</option>
                          </select>
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

<style>
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

  export default {
    middleware: 'admin',
    asyncData({ $axios }) {
      return $axios.get(`/admin/click2call`).then((res) => {
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
        filters: {
          search: ''
        },
        isSearch: false,
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
      edit: function(item) {
        this.item = item;
        this.item.expires = this.formatDate(this.item.expires);
        $('#adsModal').modal('show')
      },
      addPhone: function(item) {
        this.item = {};
        $('#phoneModal').modal('show')
      },
      cancel: function() {
        $('#phoneModal').modal('hide')
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
        if(this.item.facility) request.args.facility_id = this.item.facility._id;
        delete request.args.facility;
        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/click2call`, request).then((res) => {
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

          this.$axios.delete(`/admin/click2call/${obj._id}`, request).then((res) => {
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

        this.$axios.get(`/admin/click2call`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
