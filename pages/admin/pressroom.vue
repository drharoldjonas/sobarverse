<template>
  <div class="pressroom margin_60_35">
    <div class="container">
      <h3 class="mb-5">Press Room Articles</h3>
      <div class="form-group row">
        <div class="col-lg-5">
          <div class="form-group custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Search..." id="searchTerm" v-model="filters.search">
             <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a> 
          </div>
        </div>
        <div class="col-lg-7">
          <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
          <a @click="addArticle" class="btn_1">
            <i class="fa fa-plus"></i> New
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Visible</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>
              <img :src="item.image" style="max-width:100px;">
            </td>
            <td>
              <a :href="item.link" target="_blank" style="font-size:16px"> {{ item.title }}</a>
            </td>
            <td>
              <a @click="visible(item)" class="disableArticle" data-articleid="2" style="font-size:25px;" :class="{ 'checked' : item['visible'] == 'yes',  'unchecked': item['visible'] == 'no'}">
                <i class="fa fa-check-circle"></i>
              </a>
            </td>
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
    </div>

    <!-- Modal -->
    <div class="modal fade in" id="articleModal" tabindex="-1" role="dialog" aria-labelledby="articleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" v-if="!item._id">New Article</h2>
            <h2 class="modal-title" v-else>Edit Article</h2>
            <button type="button" class="bootbox-close-button close" @click="cancel" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <div class="bootbox-body">
              <div id="pressRoomItemForm" class="">
                <form class="form-horizontal row" id="form0" method="post">
                  <input id="ImageUrl" name="ImageUrl" type="hidden" value="">
                  <div class="form-group col-md-12">
                    <div class="col-md-6 required">
                      <label>Title <span>*</span>:</label>
                      <input class="form-control" data-val="true" data-val-required="The Title field is required." v-model="item.title" type="text" value="">
                      <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Title" data-valmsg-replace="true"></span></span>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="col-md-6 required">
                      <label>Link</label>
                      <input class="form-control" data-val="true" data-val-required="The LinkUrl field is required." v-model="item.link" type="text" value="">
                      <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="LinkUrl" data-valmsg-replace="true"></span></span>
                    </div>
                  </div>
                  <div class="col-md-12 form-group">

                    <div class="col-md-12">
                      <label>Image (Optional)</label>
                      <div class="col-md-12">
                        <div class="form-group ">

                          <input type="button" class="protocolFileUpload form-control" @click="addFile" value="File upload" style="margin-bottom:15px;">
                          <input type="file" name="file" id="fileupload" class="form-control hidden" accept="image/*" ref="file" @change="onSelect">
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="progress">
                              <span class="sr-only">
                                  {{ percentage }}% Complete
                              </span>
                            </div>
                          </div>
                        </div>
                        <img id="logoDisplayImage" style="max-width:200px;max-height:200px;">
                      </div>
                    </div>
                  </div>
                  <div>

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
  </div>
</template>

<style>
  .checked {
    color: green !important;
  }
  .unchecked {
    color: red !important;
  }
  #articleModal{
  z-index: 99999999999999999; 
}
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/pressroom`).then((res) => {
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
        file: null,
        states: constants.states,
        isSearch: false,
        item: {},
        filters: {
          search: ''
        },
        percentage: 0,
        progress: '0%',
        page: 0,
        max: 25,
        items: {
          data: [],
          total: 0
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
        this.file = null;
        $('#articleModal').modal('show')
      },
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      addFile: function() {
        $('#fileupload').click()
      },
      addArticle: function(item) {
        this.item = {visible: 'yes'};
        this.file = null;
        $('#articleModal').modal('show')
      },
      onSelect: function() {
        var file = this.$refs.file.files[0];
        this.file = file;
      },
      cancel: function() {
        this.item = {};
        $('#articleModal').modal('hide')
      },
      uploadProgress: function(e) {
        if(e.lengthComputable){
          var max = e.total;
          var current = e.loaded;

          this.percentage = (current * 100)/max;
          this.progress = 'width: ' + this.percentage + '%';


          if(this.percentage >= 100)
          {
            this.$nuxt.$loading.start();
          }
        }
      },
      save: function() {
        //Handle saving the changes
        var formData = new FormData();
        formData.append('args', JSON.stringify(this.item));
        formData.append('file', this.file);
        formData.append('id', this.item._id);

        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/pressroom`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
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

          this.$axios.delete(`/admin/pressroom/${obj._id}`, request).then((res) => {
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
      visible: function (item) {
        var visible = item.visible == 'yes' ? 'no' : 'yes';
        var request = {id: item._id, args: {visible: visible}};

        this.$axios.post(`/admin/pressroom/visible`, request).then((res) => {
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

        this.isSearch = true;
        this.$nuxt.$loading.start()

        var request = {sSearch: null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/pressroom`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
