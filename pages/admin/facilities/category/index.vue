<script>
import Pagination from "~/components/Pagination";
export default {
  middleware: 'admin',
  asyncData({ $axios }) {
    return $axios.$post(`/admin/category/load`, {max: 5, page: 0}).then((res) => {
      return { items: res.data, total: res.total }
    }).catch((e) => {
      console.log(e)
    })
  },

  name: 'VendorCategory',
  components: { Pagination },
  data () {
    return {
      filters: { status: '' },
      max: 5,
      page: 0,
    }
  },
  methods: {
    load() {
      this.filters.max = this.max
      this.filters.page = this.page
      this.filters.status = this.filters.status ? this.filters.status : ''
      this.$axios.$post(`/admin/category/load`, this.filters).then((re) => {
        this.items = re.data
        this.total = re.total
      })
    },
    search($event) {
      if ($event.keyCode === 13) {
        this.filters.all = true
        this.$axios.$post(`/admin/category/search`, this.filters).then((re) => {
          this.items = re.data
        })
      }
    },
    refresh() {
      this.filters.max = this.max
      this.filters.page = 0
      delete this.filters.search
      delete this.filters.all

      this.$axios.$post(`/admin/category/load`, this.filters).then((re) => {
        this.items = re.data
        this.total = re.total
      })
    },
    remove(id) {
      this.$axios.$post(`/admin/category/delete`, { id: id, delete: false }).then((res) => {
        if (res.deleted) {
          swal({title:"Notice", text:"Category Deleted Successfully", icon:"success"})
          this.load()
        } else {
          swal({title:"Info", text: res.message, icon:"info", buttons:['No','Yes']}).then((opt) => {
            if (!opt) return;

            this.$axios.$post(`/admin/category/delete`, { id: id, delete: true }).then((res) => {
              if (res.deleted) {
                swal({title:"Notice", text:"Category Deleted Successfully", icon:"success"})
                this.load()
              }
            })
          })
        }

        if (res.error) {
          swal({title:"Notice", text: res.error.message, icon:"error"})
        }
      })
    },
    changePage(n) {
      console.log(n)
      this.page = n - 1;
      this.load();
    },
  }
}
</script>

<template>
  <div class="company margin_60_35">
    <div class="container">
      <h3 class="mb-5">Vendor Categories</h3>

      <div class="form-group row">
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1 mb-2 mt-0">
            <input class="form-control" type="text" @keypress="search" placeholder="Vendor Name..." id="searchTerm" v-model="filters.search">
            <i class="icon_search" v-if="!filters.search"></i>
            <a v-else @click="search" style="cursor: pointer;">
              <i class="icon_close" @click="refresh"></i></a>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group custom-search-input-1 mb-2 mt-0">
            <select class="form-control" name="status" @change="load" v-model="filters.status">
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
        <div class="col-xs-12 col-lg-6">
          <div class="row">
            <div class="col-xs-4 m-1">
              <a id="searchBtn" class="btn_1" @click="search(0)">Search</a>
            </div>
            <div class="col-xs-4 m-1">
              <nuxt-link :to="{path: '/admin/facilities/category/new'}" class="btn_1">
                <i class="fa fa-plus"></i> New
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th scope="col">
              <a>Name</a>
            </th>
            <th scope="col">
              <a>Created Date</a>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <nuxt-link target="_blank" :to="{name: 'facility-category-slug', params: {slug: item.slug}}">{{ item.name }}</nuxt-link>
            </td>
            <td>{{ item.created_ts | date_format }}</td>
            <td>
              <nuxt-link :to="{name: 'admin-facilities-category-id', params: {id: item._id}}"><i class="fa fa-edit"></i></nuxt-link>
              <a @click="remove(item._id)"><i style="color: red; cursor: pointer;" class="fa fa-trash"></i></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-12 text-right">
          <div><span>{{items.length}}</span> of <span>{{total}}</span></div>
          <Pagination :source="total" :max="max" :page="page" @update="changePage"></Pagination>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>
