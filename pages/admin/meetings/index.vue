<template>
  <div class="meetings margin_60_35">
    <div class="container">
      <h3 class="mb-5">Meetings</h3>
      <div class="form-group row">
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1" style="margin-top: 0px;">
            <input class="form-control" type="text" placeholder="Search..." id="searchTerm" v-model="filters.search">
             <i class="icon_search" v-if="!filters.search"></i>
            <a  v-else @click="refresh" style="cursor: pointer;">
            <i class="icon_close"></i>  </a>
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
          <a class="btn_1" @click="uploadMeeting" data-dialog-width-percent="30">
            <i class="fa fa-upload"></i>
          </a>
          <a v-if="selected.length" class="btn_1" style="background-color:red;" @click="rejectAll" data-dialog-width-percent="30">
            <i class="fa fa-close"></i>
          </a>
          <a v-if="selected.length" class="btn_1" style="background-color:green;" @click="approveAll" data-dialog-width-percent="30">
            <i class="fa fa-check"></i>
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th></th>
            <th scope="col">
              <a @click="sortby('name')">Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('cToPublic')">CToPublic</a>
            </th>
            <th scope="col">
              <a @click="sortby('time')">Time</a>
            </th>
            <th scope="col">
              <a @click="sortby('street1')">Street1</a>
            </th>
            <th scope="col">
              <a @click="sortby('street2')">Street2</a>
            </th>
            <th scope="col">
              <a @click="sortby('city')">City</a>
            </th>
            <th scope="col">
              <a @click="sortby('state')">State</a>
            </th>
            <th scope="col">
              <a @click="sortby('zip')">Zip</a>
            </th>
            <th scope="col">
              IS
            </th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>
              <input type="checkbox" v-model="selected" :value="item._id" :disabled="item.status != 'pending'">
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.ctp }}</td>
            <td v-if="item.time">{{getTime(item.time)}}</td>            
            <td v-else-if="item.new_data">{{getTime2(item)}}</td>
            <td v-else>{{ getHour(item.time_utc) }}:{{ getMinutes(item.time_utc) }} {{ getAmPm(item.time_utc) }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.address2 }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.zip }}</td>
            <td>{{ item.is }}</td>
            <td>
              <template v-if="item.status != 'approved' || item.mod_status == 'pending'">
                <nuxt-link v-if="item.is == 'DELETE'" class="btn_1" :to="{name: 'admin-meetings-delete-id', params: {id: item._id}}">Check</nuxt-link>
                <nuxt-link v-else-if="item.is == 'MODIFIED'" class="btn_1" :to="{name: 'admin-meetings-modify-id', params: {id: item._id}}">Check</nuxt-link>
                <nuxt-link v-else class="btn_1" :to="{name: 'admin-meetings-id', params: {id: item._id}}">Check</nuxt-link>
              </template>
              <div class="d-flex" v-else>
                <nuxt-link :to="{name: 'admin-meetings-id', params: {id: item._id}}"><i class="fa fa-edit"></i></nuxt-link>
                <a class="pl-2" @click="remove(item)" style="color: red;">
                  <i class="fa fa-trash"></i>
                </a>
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

      <div class="modal fade in" id="meetingModal" tabindex="-1" role="dialog" aria-labelledby="meetingModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Upload Meetings</h2>
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
                              <option value="na">Narcotics Anonymous</option>
                              <option value="aa">Alcoholics Anonymous</option>
                            </select>
                            <span class="err-msg"><span class="field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true"></span></span>
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
    </div>
  </div>
</template>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";
  import moment from 'moment'

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/meeting`, {params: {max: 25, page: 0, filters: {status: 'pending'}}}).then((res) => {
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
        selected: [],
        isSearch: false,
        item: {
          type: ''
        },
        file: null,
        filters: {
          search: '',
          status: 'pending',
          sortby: {
            id: 1,
            cToPublic: 1,
            name: 1,
            time: 1,
            street1: 1,
            street2: 1,
            city: 1,
            state: 1,
            zip: 1
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
      getTime(date){
        let zone = date.zone ? date.zone.substring(3):'';
        var time = '05 27 2021 '+date.hour+':'+date.minute+' '+date.ampm+ zone
        console.log(time);
        console.log(moment(time).local().format('hh:mmA'))
        return moment(time).local().format('hh:mmA')
      },
      getTime2(data){
           while(data.new_data.new_data){
          data.new_data = data.new_data.new_data;
        }
        return this.getTime(data.new_data.time);
      },
      getAmPm: function(date) {
        date = new Date(date)
        var hours = date.getUTCHours();
        console.log("date",date)
        return moment.utc(date).local().format('A');
      },
      getHour: function(date) {
        date = new Date(date)
        var hours = date.getUTCHours();
        hours = hours % 12;
        return  moment.utc(date).local().format('hh')
      },
      getMinutes: function(date) {
        date = new Date(date)
        var minutes = date.getUTCMinutes();
        return moment.utc(date).local().format('mm');
      },
      onSelect: function() {
        var file = this.$refs.file.files[0];
        this.file = file;
      },
      uploadMeeting: function(item) {
        this.item = {
          type: ''
        };
        $('#meetingModal').modal('show')
      },
      cancel: function() {
        this.item = {};
        $('#meetingModal').modal('hide')
      },
      uploadFile: function() {
        var formData = new FormData();
        formData.append('file', this.file);
        formData.append('type', this.item.type);

        this.$nuxt.$loading.start();

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios.post(`/admin/meeting/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
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
          swal({title:"Error", text: err.err.message, icon:"error"});
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
      approveAll: function() {
        swal({title:"Approve", text:"Are you sure want to approve the selected meetings", icon:"info", buttons:['No','Yes']}).then(function(val) {
          if (!val) return;
          this.$nuxt.$loading.start();

          this.$axios.post(`/admin/meeting/approve`, {meetings: this.selected}).then((res) => {
            if (res.data && !res.data.error) {
              swal({title: "Notice", text: "Meetings Approved Successfully", icon: "success"}).then(function (val) {
                this.selected = [];
                this.search(this.page);
              }.bind(this));
            } else {
              //Handle errors
              swal({title: "Notice", text: res.data.error, icon: "error"});
            }
            this.$nuxt.$loading.finish()
          }).catch((err) => {
            console.log(err)
            swal({title: "Error", text: err.err.message, icon: "error"});
            this.$nuxt.$loading.finish()
          });
        }.bind(this))
      },
      rejectAll: function() {
        swal({title:"Reject", text:"Are you sure want to reject the selected meetings", icon:"info", buttons:['No','Yes']}).then(function(val) {
          this.$nuxt.$loading.start();

          this.$axios.post(`/admin/meeting/reject`, {meetings: this.selected}).then((res) => {
            if (res.data && !res.data.error) {
              swal({title: "Notice", text: "Meetings Rejected Successfully", icon: "success"}).then(function (val) {
                this.selected = [];
                this.search(this.page);
              }.bind(this));
            } else {
              //Handle errors
              swal({title: "Notice", text: res.data.error, icon: "error"});
            }
            this.$nuxt.$loading.finish()
          }).catch((err) => {
            console.log(err)
            swal({title: "Error", text: err.err.message, icon: "error"});
            this.$nuxt.$loading.finish()
          });
        }.bind(this))
      },
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = { id:obj._id };
          this.$nuxt.$loading.start()

          this.$axios.delete(`/admin/meeting/${obj._id}`, request).then((res) => {
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
        this.$nuxt.$loading.start();

        var request = {sSearch:null, filters:{}};
        if(this.filters.search) request.sSearch = this.filters.search;
        if(this.filters.sort) request.filters.sort = this.filters.sortby;
        if(this.filters.status) request.filters.status = this.filters.status;
        request.page = (this.page) ? this.page : 0;
        request.max = this.max;

        this.$axios.get(`/admin/meeting`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : {data: [], total: 0};
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
