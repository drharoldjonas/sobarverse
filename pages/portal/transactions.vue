<template>
  <div class="transactions">
    <div class="sub_header_in">
      <div class="container">
        <h1>Transactions</h1>
      </div>
      <!-- /container -->
    </div>

    <div id="invoice-dialog" class="zoom-anim-dialog mfp-hide">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="invoice-title add_top_60">
              <h2>Invoice</h2><h3 class="float-right">Order # {{ item.transaction_id }}</h3>
            </div>
            <hr>
            <div class="row">
              <div class="col-6">
                <address>
                  <strong>Billed To:</strong><br>
                  {{ item.firstname }} {{ item.lastname }}<br>
                  {{ item.address }}<br>
                  {{ item.address2 }}<br>
                  {{ item.city }}, {{ item.state }} {{ item.zip }}
                </address>
              </div>
              <div class="col-6 text-right"></div>
            </div>
            <div class="row">
              <div class="col-6">
                <address>
                  <strong>Payment Method:</strong><br>
                  Visa ending **** {{ item.card }}<br>
                  {{ item.email }}
                </address>
              </div>
              <div class="col-6 text-right">
                <address>
                  <strong>Order Date:</strong><br>
                  {{ item.created_ts | format_date }}<br><br>
                </address>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="add_top_15">
              <h3><strong>Order summary</strong></h3>
              <div class="table-responsive">
                <table class="table table-condensed">
                  <thead>
                    <tr>
                      <td><strong>Item</strong></td>
                      <td class="text-center"><strong>Price</strong></td>
                      <td class="text-center"><strong>Quantity</strong></td>
                      <td class="text-right"><strong>Total</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(line, index) in item.items" :key="index">
                      <td>{{ line.name }}</td>
                      <td class="text-center">${{ line.unitPrice }}</td>
                      <td class="text-center">{{ line.quantity }}</td>
                      <td class="text-right">${{ item.total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inquiry margin_60_35">
      <div class="container">
        <div class="form-group row">
          <div class="col-lg-3">
            <div class="form-group custom-search-input-1" style="margin-top: 0px;">
              <input class="form-control" type="text" placeholder="Facility Name" id="searchTerm" v-model="filters.search">
              <i class="icon_search"></i>
            </div>
          </div>
          <div class="col-lg-6">
            <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-condensed">
            <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Facility</th>
              <th scope="col">Total</th>
              <!--<th scope="col">Status</th>-->
              <th scope="col">
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td>{{ item.created_ts | format_date }}</td>
              <td>{{ item.firstname }}</td>
              <td>{{ item.lastname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.facility ? item.facility.name : '' }}</td>
              <td>${{ item.total }}</td>
              <!--<td>{{ item.status }}</td>-->
              <td>
                <div style="display: flex; justify-content: space-between;">
                  <a class="btn_2" href="#invoice-dialog" id="invoice" @click="invoice(item)">View Receipt</a>
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
  </div>
</template>

<style>
  #invoice-dialog {
    max-width: 600px;
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

  export default {
    middleware: 'auth',
    asyncData({ query, params, error, $axios }) {
      return $axios.get(`/portal/transactions`, {params: {sSearch: query.name, max: 25}}).then((res) => {
        return { items: Object.assign({total:0, data:[]}, res.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Pagination
    },
    mounted() {
      this.filters.search = this.$route.query.name;

      $('#invoice').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
        mainClass: 'my-mfp-zoom-in'
      });
    },
    data () {
      return {
        states: constants.states,
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
      invoice: function(item) {
        this.item = item;
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
      remove: function(obj){
        //Handle removing the item
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = {id:obj._id};
          this.$nuxt.$loading.start()

          this.$axios.delete(`/portal/transactions/${obj._id}`, request).then((res) => {
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

        this.$axios.get(`/portal/transactions`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
