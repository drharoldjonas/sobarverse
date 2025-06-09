<template>
  <div class="inquiry margin_60_35">
    <div class="container">
      <h3 class="mb-5">Inquiries</h3>
      <a class="btn_1 float-md-right mb-4" @click="exportFile">Export</a>

      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
          <tr>
            <th scope="col">
              <a @click="sortby('firstname')">First Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('lastname')">Last Name</a>
            </th>
            <th scope="col">
              <a @click="sortby('phone')">Phone</a>
            </th>
            <th scope="col">
              <a @click="sortby('email')">Email</a>
            </th>
            <th scope="col">Preferred Contact</th>
            <th scope="col">Reason</th>
            <!--<th scope="col">Facility Name</th>-->
            <!--<th scope="col">Facility Type</th>-->
            <th scope="col">
              <a @click="sortby('created_ts')">Date</a>
            </th>
            <th scope="col">
              <i class="fa fa-check"></i>
            </th>
            <th scope="col">
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items.data" :key="index">
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.preferredContact }}</td>
            <td>{{ item.reason }}</td>            
            <!--<td>{{ item.facility ? item.facility.name : '' }}</td>-->
            <!--<template>-->
              <!--<td v-if="item.facility && item.facility.profile && item.facility.profile.type == 'TC'">Treatment Center</td>-->
              <!--<td v-else-if="item.facility && item.facility.profile && item.facility.profile.type == 'SL'">Sober Living</td>-->
              <!--<td v-else></td>-->
            <!--</template>-->
            <td>
              <span>{{ item.created_ts | date_format}}</span>
            </td>
            <td>
              <input type="checkbox" v-model="item.read" :value="item.read" @click="updateRead(item)" :checked="item.read == true">
            </td>
            <td>
              <div style="display: flex; justify-content: space-between;">
                <nuxt-link class="btn_3 mt-0" :to="{name: 'admin-inquiries-id',  params: { id: item._id } }">Details</nuxt-link>
                <span> | </span>
                <a class="btn_2" @click="remove(item)">Delete</a>
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
  </div>
</template>

<script>
  import Pagination from "~/components/Pagination";
  import constants from "~/constants";
  import FileDownload from 'js-file-download';

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/inquiry`, {params: {max: 25}}).then((res) => {
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
        filters: {
          sortby: {
            id: 1,
            firstname: 1,
            lastname: 1,
            email: 1,
            phone: 1,
            created_ts: 1
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
      changePage: function (n, obj) {
        this.page = n - 1;
        this.search();
      },
      updateRead(obj){
        if(obj.read === undefined){
          obj.read = true;
        }
        else{
           obj.read = !obj.read;
        }
        var request = obj;
               this.$nuxt.$loading.start()
          this.$axios.post(`/admin/inquiry/reviewed/${obj._id}`, request).then((res) => {
            if(res.data && !res.data.error){
              swal({title:"Update", text:"Your request was completed successfully", icon:"success"}).then(function(val){
                this.search();
              }.bind(this));
            } else {
              //Handle errors
              swal({title:"Update", text:"Unable to complete your request", icon:"error"});
            }
            this.$nuxt.$loading.finish()
          }).catch((err) => {
            swal({title:"Error", text: err, icon:"error"});
            this.$nuxt.$loading.finish()
          });
      },
       exportFile: function(obj){
        this.$axios.get(`/admin/inquiry/export/excel`, {responseType: 'arraybuffer'}).then((res) => {
          if(res.data && !res.data.error){
           FileDownload(res.data, 'form.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
          } else {
            //Handle errors
            swal({title:"Remove", text:"Unable to complete your request", icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          swal({title:"Error", text: err, icon:"error"});
          this.$nuxt.$loading.finish()
        });
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

          var request = {id:obj._id};
          this.$nuxt.$loading.start()

          this.$axios.delete(`/admin/inquiry/${obj._id}`, request).then((res) => {
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

        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/inquiry`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
