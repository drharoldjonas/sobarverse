<template>
  <div class="transactions">
    <div class="sub_header_in">
      <div class="container">
        <h1>Stats</h1>
      </div>
      <!-- /container -->
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
              <th scope="col">Facility</th>
              <th scope="col">Page Views</th>
              <th scope="col">Phone Views</th>
              <th scope="col">Phone Clicks</th>
              <th scope="col">Website Views</th>
              <th scope="col">Form Fills</th>
              <!--<th scope="col">-->
              <!--</th>-->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items.data" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.page_views || 0 }}</td>
              <td>{{ item.phone_views || 0 }}</td>
              <td>{{ item.phone_clicks || 0 }}</td>
              <td>{{ item.website_views || 0 }}</td>
              <td>{{ item.form_fills || 0 }}</td>
              <!--<td>{{ item.status }}</td>-->
              <!--<td>-->
              <!--<div style="display: flex; justify-content: space-between;">-->
              <!--<a class="btn_2" href="#invoice-dialog" id="invoice" @click="invoice(item)">View Receipt</a>-->
              <!--</div>-->
              <!--</td>-->
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
      return $axios.get(`/portal/stats`, {params: {sSearch: query.name, max: 25}}).then((res) => {
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

        this.$axios.get(`/portal/stats`, {params: request}).then((res) => {
          this.items = (res.data) ? res.data : this.items;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
