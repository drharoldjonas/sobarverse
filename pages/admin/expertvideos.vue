<template>
  <div class="expertVideos margin_60_35">

    <div class="container">
      <h3 class="mb-5">Expert Videos</h3>
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
          <a @click="addVideo" class="btn_1">
            <i class="fa fa-plus"></i> New
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th>Video</th>
            <th>Filename</th>
            <th>Visible</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>
              <video style="width:100%;max-width:200px;position: relative;opacity: 1;" controls="">
                <source :src="item.src" type="video/mp4">
              </video>
            </td>
            <td>
              <span>{{ item.name }}</span>
            </td>
            <td>
              <a @click="visible(item)" class="disableVideo" data-videoid="1" style="font-size:25px;" :class="{ 'checked' : item['visible'] == 'yes',  'unchecked': item['visible'] == 'no'}">
                <i class="fa fa-check-circle"></i></a>
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
    <div class="modal fade in" id="expertVidioModal" tabindex="-1" role="dialog" aria-labelledby="expertVidioModal" aria-hidden="true">
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

                <form class="form-horizontal row" id="form0">
                  <div class="form-group col-md-12">
                    <div class="col-md-6 required">
                      <label>Name <span>*</span>:</label>
                      <input class="form-control" data-val="true" data-val-required="The Name field is required." v-model="item.name" type="text" value="">
                      <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span></span>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label>Video Mp4 <span></span></label>
                    <div class="col-md-12">
                      <div class="form-group mp4">

                        <input type="button" class="protocolFileUpload form-control" @click="addMp4" value="File upload" style="margin-bottom:15px;">
                        <input type="file" name="videoMp4" id="videomp4FileUpload" class="form-control hidden" accept="video/mp4" @change="onSelect" ref="file">
                        <span class="field-validation-valid" data-valmsg-for="Mp4TempVideoName" data-valmsg-replace="true"></span>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="progress">
                            <span class="sr-only">
                                {{ percentage }}% Complete
                            </span>
                          </div>
                        </div>
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
</style>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/expertvideos`).then((res) => {
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
        file: null,
        max: 25,
        page: 0,
        item: {},
        percentage: 0,
        progress: '0%',
        filters: {
          search: ''
        },
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
        this.file = null;
        $('#expertVidioModal').modal('show')
      },
      addMp4: function() {
        $('#videomp4FileUpload').click()
      },
      onSelect: function() {
        var file = this.$refs.file.files[0];
        this.file = file;
      },
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      addVideo: function(item) {
        this.item = {};
        this.file = null;
        $('#expertVidioModal').modal('show')
      },
      cancel: function() {
        this.item = {};
        $('#expertVidioModal').modal('hide')
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
      visible: function (item) {
        var visible = item.visible == 'yes' ? 'no' : 'yes';
        var request = {id: item._id, args: {visible: visible}};

        this.$axios.post(`/admin/expertvideos/visible`, request).then((res) => {
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
      save: function() {
        //Handle saving the changes
        var formData = new FormData();
        formData.append('file', this.file);
        formData.append('args', JSON.stringify(this.item));
        formData.append('id', this.item._id);

        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/admin/expertvideos`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
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

          this.$axios.delete(`/admin/expertvideos/${obj._id}`, request).then((res) => {
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

        var request = {sSearch: null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/expertvideos`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
