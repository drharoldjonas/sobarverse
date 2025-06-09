<template>
  <div class="settings">
    <div class="container margin_60_35">
      <h3 class="mb-5">Website CMS</h3>
      <div class="row">
        <aside class="col-lg-3" id="faq_cat">
          <div class="box_style_cat" id="faq_box">
            <ul id="cat_nav">
              <li><a href="#menu" class="active"><i class="fa fa-gear"></i>Menus</a></li>
              <li><a href="#blog" class=""><i class="fa fa-gear"></i>Blog Settings</a></li>
              <li><a href="#banner" class=""><i class="fa fa-gear"></i>Banner Ad Settings</a></li>
            </ul>
          </div>
        </aside>
        <div class="col-lg-9" id="faq">
          <div class="card" id="menu">
            <div class="card-header bg-white"><button class="btn btn-success btn-sm" @click="newMenu"> Add New</button><button class="btn btn-primary btn-sm ml-2" @click="saveUpdate"> Save</button><p class="lead m-0 float-right font-weight-bold">Menus </p></div>
            <div class="card-body">
              <h5 v-if="new_menu">New Menu Item</h5>
              <div class="row" v-if="new_menu">
                <div class="col-6">
                  <label>Name:</label>
                  <input class="form-control" v-model="newMenuItem.label" type="text">
                </div>
                <div class="col-6 my-auto">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio1" value="url">
                    <label class="form-check-label" for="inlineRadio1">URL</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio2" value="categories">
                    <label class="form-check-label" for="inlineRadio2">Categories</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio3" value="pages" disabled>
                    <label class="form-check-label" for="inlineRadio3">Pages</label>
                  </div>
                </div>
                <div class="col-12 mt-2" v-if="newMenuItem.menu_type === 'url'">
                  <label>URL:</label>
                  <input class="form-control" v-model="newMenuItem.route" type="text" placeholder="https://google.com">
                </div>
                <div class="col-12 mt-2" v-if="newMenuItem.menu_type === 'categories'">
                  <label>Categories:</label>
                  <select class="custom-select form-control" v-model="newMenuItem.route">
                    <option value="">Select Category</option>
                    <optgroup :label="cat.label" v-for="(cat, idx) in categories" :key="idx">
                      <option v-for="(route, i) in cat.routes" :key="i" :value="route.route">{{ route.category }}</option>
                    </optgroup>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Login Required:</label>
                  <select class="selectpicker form-control" v-model="newMenuItem.login_required">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Open In:</label>
                  <select class="selectpicker form-control" v-model="newMenuItem.target">
                    <option value="_self">Same Tab</option>
                    <option value="_blank">New Tab</option>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Allow Sub Menus:</label>
                  <select class="selectpicker form-control" v-model="newMenuItem.sub_elements">
                    <option :value=null >No</option>
                    <option :value=[] >Yes</option>
                  </select>
                </div>
                <div class="col-6 mt-4">
                  <button class="btn btn-secondary" @click="cancel">CANCEL</button>
                  <button class="btn btn-success" @click="save">SAVE</button>
                </div>
              </div>
              <div class="row" v-if="edit_menu">
                <div class="col-6">
                  <label>Name:</label>
                  <input class="form-control" v-model="newMenuItem.label" type="text">
                </div>
                <div class="col-6 my-auto">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio1" value="url">
                    <label class="form-check-label" for="inlineRadio1">URL</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio2" value="categories">
                    <label class="form-check-label" for="inlineRadio2">Categories</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="newMenuItem.menu_type" id="inlineRadio3" value="pages" disabled>
                    <label class="form-check-label" for="inlineRadio3">Pages</label>
                  </div>
                </div>
                <div class="col-12 mt-2" v-if="newMenuItem.menu_type === 'url'">
                  <label>URL:</label>
                  <input class="form-control" :disabled="Object.keys(newMenuItem.route) > 0" v-model="newMenuItem.route" type="text" placeholder="https://google.com">
                </div>
                <div class="col-12 mt-2" v-if="newMenuItem.menu_type === 'categories'">
                  <label>Categories:</label>
                  <select class="custom-select form-control" v-model="newMenuItem.route">
                    <option value="">Select Category</option>
                    <optgroup :label="cat.label" v-for="(cat, idx) in categories" :key="idx">
                      <option v-for="(route, i) in cat.routes" :key="i" :value="route.route">{{ route.category }}</option>
                    </optgroup>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Login Required:</label>
                  <select class="selectpicker form-control" :disabled="!new RegExp(/^https?:\/\//, '').test(newMenuItem.route)" v-model="newMenuItem.login_required">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Open In:</label>
                  <select class="selectpicker form-control" v-model="newMenuItem.target">
                    <option value="_self">Same Tab</option>
                    <option value="_blank">New Tab</option>
                  </select>
                </div>
                <div class="col-12 col-md-4 mt-2">
                  <label>Allow Sub Menus:</label>
                  <select class="selectpicker form-control" v-model="newMenuItem.sub_elements">
                    <option :value = null >No</option>
                    <option :value = [] >Yes</option>
                    <option v-if="Array.isArray(newMenuItem.sub_elements) && newMenuItem.sub_elements.length > 0" :value="newMenuItem.sub_elements" disabled>Populated</option>
                  </select>
                </div>
                <div class="col-6 mt-4">
                  <button class="btn btn-secondary" @click="cancel">CANCEL</button>
                  <button class="btn btn-warning" @click="update">UPDATE</button>
                  <button v-if="selected_menu === 'passive_menu'" class="btn btn-danger" @click="remove">DELETE</button>
                </div>
              </div>
              <div class="row" v-if="!new_menu && !edit_menu">
                <div class="col-12 col-md-5" v-if="!new_menu">
                  <h5>Archived Menu</h5>
                  <client-only>
                    <archived_menu v-model="passive_menu" @input="newPassiveValue" @edit="update" />
                  </client-only>
                </div>
                <div class="col-12 col-md-7" v-if="!new_menu">
                  <h5>Active Menu</h5>
                  <client-only>
                    <nav_menu v-model="active_menu" @input="newValue" @edit="update" />
                  </client-only>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-5" id="blog">
            <div class="card-header bg-white"><button class="btn btn-primary btn-sm ml-2" @click="saveSettings"> Save</button><p class="lead m-0 float-right font-weight-bold">Blog Settings </p></div>
            <div class="card-body">
              <p class="lead mb-2">Layout</p>
              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-12 col-md-4 mt-2">
                      <label>Blog:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.blog">
                        <option value="full">Full Width</option>
                        <option value="content_widget">Content + Widgets</option>
                      </select>
                      <small>This affects the <strong>Single Blog</strong> page.</small>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Category:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.category">
                        <option value="full">Full Width</option>
                        <option value="content_widget">Content + Widgets</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Search:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.search">
                        <option value="full">Full Width</option>
                        <option value="content_widget">Content + Widgets</option>
                      </select>
                    </div>
                  </div>
                  <p class="lead mb-2 mt-4">Layout Settings</p>
                  <div class="row">
                    <div class="col-12 col-md-4 mt-2">
                      <label>Blog List Type:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.blog_list_type">
                        <option value="list">List</option>
                        <option value="grid">Grid</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Category List Type:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.cat_list_type">
                        <option value="list">List</option>
                        <option value="grid">Grid</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Search List Type:</label>
                      <select class="selectpicker form-control" v-model="blog_settings.layout.search_list_type">
                        <option value="list">List</option>
                        <option value="grid">Grid</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Blog List Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.layout.blog_count" type="number">
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Category List Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.layout.cat_count" type="number">
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Search List Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.layout.search_count" type="number">
                    </div>
                  </div>
                </div>
              </div>
              <p class="lead mb-2 mt-5">Widgets</p>
              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row">
                    <div class="col-12 col-md-4 mt-2">
                      <label>Blog:</label>
                      <select class="selectpicker form-control" :disabled="blog_settings.layout.blog === 'full'" multiple v-model="blog_settings.blog_widgets">
                        <option value="categories">Categories</option>
                        <option value="tags">Tags</option>
                        <option value="search">Search</option>
                        <option value="latest">Latest Post</option>
                      </select>
                      <small>This affects the <strong>Single Blog</strong> page.</small>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Category:</label>
                      <select class="selectpicker form-control" :disabled="blog_settings.layout.category === 'full'" multiple v-model="blog_settings.category_widgets">
                        <option value="categories">Categories</option>
                        <option value="tags">Tags</option>
                        <option value="search">Search</option>
                        <option value="latest">Latest Post</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4 mt-2">
                      <label>Search:</label>
                      <select class="selectpicker form-control" :disabled="blog_settings.layout.search === 'full'" multiple v-model="blog_settings.search_widgets">
                        <option value="categories">Categories</option>
                        <option value="tags">Tags</option>
                        <option value="search">Search</option>
                        <option value="latest">Latest Post</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <p class="lead mb-2 mt-5" v-if="blog_settings.category_widgets.length > 0 || blog_settings.blog_widgets.length > 0">Widget Settings</p>
              <div class="row">
                <div class="form-group col-md-12">
                  <div class="row" v-if="blog_settings.category_widgets.includes('categories') || blog_settings.blog_widgets.includes('categories') || blog_settings.search_widgets.includes('categories')">
                    <div class="col-12 mt-2"><label>> Category Settings</label> <hr class="mt-2 mb-3" /></div>
                    <div class="col-12 col-md-6 mt-2">
                      <label>Display Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.widget_settings.cat_count" type="number">
                    </div>
                  </div>
                  <div class="row mt-2" v-if="blog_settings.category_widgets.includes('tags') || blog_settings.blog_widgets.includes('tags') || blog_settings.search_widgets.includes('tags')">
                    <div class="col-12 mt-2"><label>> Tag Settings</label> <hr class="mt-2 mb-3" /></div>
                    <div class="col-12 col-md-6 mt-2">
                      <label>Display Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.widget_settings.tag_count" type="number">
                    </div>
                  </div>
                  <div class="row mt-2" v-if="blog_settings.category_widgets.includes('latest') || blog_settings.blog_widgets.includes('latest') || blog_settings.search_widgets.includes('latest')">
                    <div class="col-12 mt-2"><label>> Latest Post Settings</label> <hr class="mt-2 mb-3" /></div>
                    <div class="col-12 col-md-6 mt-2">
                      <label>Display Count:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.widget_settings.latest_count" type="number">
                    </div>
                  </div>
                  <div class="row mt-2" v-if="blog_settings.category_widgets.includes('search') || blog_settings.blog_widgets.includes('search') || blog_settings.search_widgets.includes('search')">
                    <div class="col-12 mt-2"><label>> Search Settings</label> <hr class="mt-2 mb-3" /></div>
                    <div class="col-12 col-md-6 mt-2">
                      <label>Result per Page:</label>
                      <input class="form-control" min="1" v-model.number="blog_settings.widget_settings.search_perPage" type="number">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-5" id="banner">
            <div class="card-header bg-white"><button class="btn btn-primary btn-sm ml-2" @click="banner_one = true; " :disabled="banner_one"> Add New</button><p class="lead m-0 float-right font-weight-bold">Banner Ad Settings </p></div>
            <div class="card-body">
              <div class="row" v-if="banner_one">
                <div class="col-12 mb-3 border p-2" v-if="banner._id">
                  <p class="m-0 small">Current Creative: </p>
                  <img class="img-fluid" ref="creative" :src="banner.creative" :alt="banner.label">
                </div>
                <div class="col-12 col-md-3" v-if="banner._id">
                  <select class="selectpicker form-control" v-model="banner.status">
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div class="col-12 col-md-3">
                  <input class="form-control" v-model="banner.label" type="text" placeholder="Banner Label">
                </div>
                <div class="col-12 col-md-6 my-auto">
                  <input class="" type="file" @change="loadFile" accept="image/png, image/jpeg, image/jpg">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <input class="form-control" v-model="banner.url" type="text" placeholder="UTM URL" v-if="banner_one" />
                </div>
              </div>
              <div class="row mt-3 d-flex justify-content-end" v-if="banner_one">
                <div class="col-6 col-md-2">
                  <button v-if="banner._id" class="btn btn-info" @click="updateBanner">UPDATE</button>
                  <button v-else class="btn btn-success" @click="saveBanner">SAVE</button>
                </div>
                <div class="col-6 col-md-2 my-auto">
                  <button class="btn btn-link text-secondary" @click="banner_one = false; banner = {};">CANCEL</button>
                </div>
              </div>
              <div class="row" v-if="!banner_one">
                <div class="col-12">
                  <div v-if="banners && banners.length> 0" class="table-responsive">
                    <table class="table table-striped table-condensed table-borderless">
                      <thead class="">
                        <tr>
                          <th scope="col"><a>Label</a></th>
                          <th scope="col"><a>Status</a></th>
                          <th scope="col"><a>Created Date</a></th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, idx) in banners" :key="item._id">
                        <td>{{ item.label }}</td>
                        <td><span class="badge" :class="item.status === 'active' ? 'badge-success' : 'badge-danger'">{{ item.status }}</span></td>
                        <td>{{ item.created_ts | date_format }}</td>
                        <td>
                          <i class="fa fa-edit" @click="banner = item; banner_one = true;"></i>
                          <a @click="removeBanner(item._id, idx)"><i style="color: red; cursor: pointer;" class="fa fa-trash"></i></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row d-flex justify-content-center" v-else>
                    <p class="lead">No Banners Added</p>
                  </div>

                  <div class="row" v-if="banners && banners.length> 0">
                    <div class="col-12 text-right">
                      <div><span>{{banners.length}}</span> of <span>{{total}}</span></div>
                      <Pagination :source="total" :max="max" :page="page" @update="changePage"></Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import archived_menu from '../../../components/menu/archived_menu.vue'
import Pagination from "~/components/Pagination";
import nav_menu from '../../../components/menu/'

export default {
  async asyncData({$axios}) {
    let [menu, blog_settings, vendor_categories, banners] = await Promise.all([
      $axios.$get(`/admin/settings/menu`),
      $axios.$get(`/admin/settings/blog-settings`),
      $axios.$post(`/admin/category/load-menu`),
      $axios.$post('/admin/banner-ads/load', {page: 0, max: 5})
    ]).catch((err) => { console.log(err) })
    return { id: menu.data._id, active_menu: menu.data.active_menu, passive_menu: menu.data.passive_menu, blog_settings: blog_settings.data, vendor_categories: vendor_categories.data, total: banners.total, banners: banners.data }
  },

  middleware: 'admin',
  name: "web-cms",
  components: {
    nav_menu,
    archived_menu,
    Pagination
  },
  watch: {
    'newMenuItem.sub_elements'(nval, oval) {
      if (nval === null && this.deletedTop) {
        this.passive_menu = this.passive_menu.concat(oval)
      }
    }
  },
  data() {
    return {
      arr: [],
      new_menu: false,
      banner_one: false,
      banner: {},
      tempBanner: null,
      max: 5,
      page: 0,
      edit_menu: false,
      deletedTop: false,
      selected_menu: null,
      newMenuItem: {
        menu_type: 'url',
        login_required: 'no',
        target: '_self',
        rel: 'nofollow',
        sub_elements: null
      }
    }
  },
  computed: {
    categories() {
      let fullCategoryList = []
      if (this.vendor_categories.length > 0) {
        let vendor_obj = { routes: [] }
        for ( let c = 0; c < this.vendor_categories.length; c++ ) {
          vendor_obj.label = 'Vendor Categories'
          vendor_obj.routes.push({category: this.vendor_categories[c].name, route: `/facility/category/${this.vendor_categories[c].slug}`})
        }
        fullCategoryList = fullCategoryList.concat(vendor_obj)
      }

      // Future Categories are added here and concatenated to fullCategoryList

      return fullCategoryList
    }
  },
  methods: {
    load() {
      this.filters.max = this.max
      this.filters.page = this.page
      this.filters.status = this.filters.status ? this.filters.status : ''
      this.$axios.$post(`/admin/banner-ads/load`, this.filters).then((re) => {
        this.banners = re.data
        this.total = re.total
      })
    },
    saveBanner() {
      let formData = new FormData();

      formData.append('creative', this.banner.creative);
      formData.append('label', this.banner.label);
      formData.append('url', this.banner.url);

      this.$axios.$post(`/admin/banner-ads`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
        if (res.created) {
          swal({title:"Success", text: 'Banner Created!', icon:"success"})
          this.banner_one = false
          this.banner = {}
        }
      })
    },
    updateBanner() {
      let formData = new FormData();

      formData.append('creative', this.tempBanner);
      formData.append('args', JSON.stringify(this.banner));

      this.$axios.$post(`/admin/banner-ads/update`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
        if (res.updated) {
          swal({title:"Success", text: 'Banner Updated!', icon: "success"})
          this.banner_one = false
          this.banner = {}
        }
      })
    },
    loadFile(e) {
      if (this.banner._id) {
        this.$refs.creative.src = URL.createObjectURL(e.target.files[0])
        this.tempBanner = e.target.files[0]
      } else {
        this.banner.creative = e.target.files[0]
      }
    },
    changePage(n) {
      this.page = n - 1;
      this.load();
    },
    newValue(val) {
      this.$store.commit('updateElement', JSON.parse(JSON.stringify(val)))
    },
    newPassiveValue(val) {
      this.$store.commit('updatePassiveElement', JSON.parse(JSON.stringify(val)))
    },
    newMenu() {
      this.new_menu = true
      this.newMenuItem.id = Math.floor(Math.random() * 1000) + 20
      this.newMenuItem.login_required = 'no'
      this.newMenuItem.route = ''
      this.newMenuItem.target = '_self'
      this.newMenuItem.rel = 'nofollow'
      this.newMenuItem.sub_elements = null
      this.newMenuItem.menu_type = 'url'
    },
    saveSettings() {
      this.$store.dispatch('SET_BLOG_SETTINGS', JSON.parse(JSON.stringify(this.blog_settings)))
      this.$axios.$post('/admin/settings/blog-settings', this.blog_settings).then((resp) => {
        if (!resp.error) {
          swal({title:"Success", text: 'Blog Settings Updated', icon:"success"})
        }
      })
    },
    validate() {
      if (!this.newMenuItem.label) {
        swal({title:"Notice", text: 'Please enter menu label.', icon:"warning"})
        return false
      } else {
        return true
      }
    },
    cancel() {
      this.new_menu = false
      this.edit_menu = false
      this.newMenuItem = {}
      this.newMenuItem.login_required = 'no'
      this.newMenuItem.target = '_self'
      this.newMenuItem.rel = 'nofollow'
      this.newMenuItem.sub_elements = null
      this.newMenuItem.menu_type = 'url'
    },
    save() {
      if (this.validate()) {
        this.passive_menu.push(this.newMenuItem)
        this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
          if (!resp.error) {
            swal({title:"Success", text: 'Menu Created!', icon:"success"})
            this.cancel()
          }
        })
      }
    },
    saveUpdate() {
      this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
        if (!resp.error) {
          swal({title:"Success", text: 'Menu Updated!', icon:"success"})
          this.cancel()
        }
      })
    },
    update(val) {
      if (val.id) {
        this.selected_menu = val.menu
        for (let t = 0; t < this[val.menu].length; t++) {
          if (this[val.menu][t].id === Number(val.id)) {
            this.newMenuItem = this[val.menu][t]
            this.edit_menu = true
          } else if (Array.isArray(this[val.menu][t].sub_elements) && this[val.menu][t].sub_elements.length > 0) {
            for (let s = 0; s < this[val.menu][t].sub_elements.length; s++) {
              if (this[val.menu][t].sub_elements[s].id === Number(val.id)) {
                this.newMenuItem = this[val.menu][t].sub_elements[s]
                this.edit_menu = true
              } else if (Array.isArray(this[val.menu][t].sub_elements[s].sub_elements) && this[val.menu][t].sub_elements[s].sub_elements.length > 0) {
                let thirdlvl = this[val.menu][t].sub_elements[s].sub_elements
                for (let th = 0; th < thirdlvl.length; th++) {
                  if (thirdlvl[th].id === Number(val.id)) {
                    this.newMenuItem = thirdlvl[th]
                    this.edit_menu = true
                  } else if (Array.isArray(thirdlvl[th].sub_elements) && thirdlvl[th].sub_elements.length > 0) {
                    let forthlvl = thirdlvl[th].sub_elements
                    for (let fo = 0; fo < forthlvl.length; fo++) {
                      if (forthlvl[fo].id === Number(val.id)) {
                        this.newMenuItem = forthlvl[fo]
                        this.edit_menu = true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
       if (this.selected_menu) {
         for (let t = 0; t < this[this.selected_menu].length; t++) {
           if (this[this.selected_menu][t].id === Number(this.newMenuItem.id)) {
             this[this.selected_menu][t] = this.newMenuItem
             this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
               if (!resp.error) {
                 swal({title:"Success", text: 'Menu Updated!', icon:"success"})
                 this.cancel()
               }
             })
           } else if (Array.isArray(this[this.selected_menu][t].sub_elements) && this[this.selected_menu][t].sub_elements.length > 0) {
             for (let s = 0; s < this[this.selected_menu][t].sub_elements.length; s++) {
               if (Array.isArray(this[this.selected_menu][t].sub_elements) && this[this.selected_menu][t].sub_elements[s].id === Number(this.newMenuItem.id)) {
                 this[this.selected_menu][t].sub_elements[s] = this.newMenuItem
                 this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
                   if (!resp.error) {
                     swal({title:"Success", text: 'Menu Updated!', icon:"success"})
                     this.cancel()
                   }
                 })
               }
             }
           }
         }
       }
      }
    },
    removeBanner(id, idx) {
      this.$axios.$delete(`/admin/banner-ads/${id}`).then((res) => {
        if (res.deleted) {
          swal({title: "Success", text: 'Banner Deleted!', icon:"success"})
          this.banners.splice(idx, 1)
        }
      })
    },
    remove() {
      try {
        for (let t = 0; t < this[this.selected_menu].length; t++) {
          if (this[this.selected_menu][t].id === Number(this.newMenuItem.id)) {

            // Checking if SubElements exist
            if (Array.isArray(this[this.selected_menu][t].sub_elements) && this[this.selected_menu][t].sub_elements.length > 0) {
              swal({title: `Remove top level Menu item ${this.newMenuItem.label}?`, text: "Are you sure? This menu has sub menu items.", icon:"info", buttons:['No','Yes']}).then((ans) => {
                if (!ans) return;

                if (ans) {
                  this.deletedTop = true
                  this.passive_menu = this.passive_menu.concat(this[this.selected_menu][t].sub_elements)
                  this[this.selected_menu].splice(t, 1)
                  this.deletedTop = false
                  this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
                    if (!resp.error) {
                      swal({title:"Success", text: 'Menu Updated!', icon:"success"})
                      this.cancel()
                    }
                  })
                }
              })
            } else {
              // No SubElements exist
              this[this.selected_menu].splice(t, 1)
              this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
                if (!resp.error) {
                  swal({title:"Success", text: 'Menu Updated!', icon:"success"})
                  this.cancel()
                }
              })
            }
          } else if (Array.isArray(this[this.selected_menu][t].sub_elements) && this[this.selected_menu][t].sub_elements.length > 0) {
            for (let s = 0; s < this[this.selected_menu][t].sub_elements.length; s++) {
              if (this[this.selected_menu][t].sub_elements[s].id === Number(this.newMenuItem.id)) {
                this[this.selected_menu][t].sub_elements.splice(s, 1)
                this.$axios.$post('/admin/settings/menu', { id: this.id, active_menu: this.active_menu, passive_menu: this.passive_menu }).then((resp) => {
                  if (!resp.error) {
                    swal({title:"Success", text: 'Menu Updated!', icon:"success"})
                    this.cancel()
                  }
                })
              }
            }
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
