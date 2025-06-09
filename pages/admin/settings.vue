<template>
  <div class="settings">
    <div class="container margin_60_35">
      <h3 class="mb-5">System Settings</h3>
      <div class="row">
        <aside class="col-lg-3" id="faq_cat">
          <div class="box_style_cat" id="faq_box">
            <ul id="cat_nav">
              <li><a href="#general" class="active"><i class="fa fa-gear"></i>General</a></li>
              <li><a href="#smtp"><i class="fa fa-building"></i>Smtp</a></li>
              <li><a href="#social"><i class="fa fa-users"></i>Social</a></li>
              <li><a href="#adsense"><i class="icon-dollar"></i>Adsense</a></li>
              <li><a href="#gateway"><i class="fa fa-credit-card"></i>Payment Gateway</a></li>
              <li><a href="#privacy"><i class="fa fa-lock"></i>Privacy Policy</a></li>
              <li><a href="#terms"><i class="fa fa-file"></i>Terms & Conditions</a></li>
              <li><a href="#advertise"><i class="fa fa-ad"></i>Advertising</a></li>
              <li><a href="#banners"><i class="fa fa-file"></i>Banners</a></li>
              <li><a href="#banners_ads"><i class="fa fa-file"></i>Banner Ads</a></li>
            </ul>
          </div>
          <!--/sticky -->
        </aside>

        <div class="col-lg-9" id="faq">
          <div>
            <h4 class="nomargin_top">General Information <small style="float: right;">Last updated {{ general.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="general">
            <div class="card-body">
              <form class="pt-4" id="userForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>System Name<span>*</span></label><br>
                        <input class="form-control" v-model="general.name" placeholder="Name" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Company<span>*</span></label><br>
                        <input class="form-control" v-model="general.company" placeholder="Company" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>System Email<span>*</span></label><br>
                        <input class="form-control" v-model="general.email" placeholder="Email" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Contact Email<span>*</span></label><br>
                        <input class="form-control" v-model="general.email2" placeholder="Contact Email" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Inquiry Email<span>*</span></label><br>
                        <input class="form-control" v-model="general.inquiry_email" placeholder="Inquiry Email" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Form Fill Email<span>*</span></label><br>
                        <input class="form-control" v-model="general.form_fill_email" placeholder="Form Fill Email" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Connect Email<span>*</span></label><br>
                        <input class="form-control" v-model="general.connect_email" placeholder="Connect Email" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Telephone<span>*</span></label><br>
                        <input class="form-control" v-model="general.phone" placeholder="Telephone" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Telephone 2<span>*</span></label><br>
                        <input class="form-control" v-model="general.phone2" placeholder="Telephone 2" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Blog url<span>*</span></label><br>
                        <input class="form-control" v-model="general.blog"  placeholder="Blog url" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Domain<span>*</span></label><br>
                        <input class="form-control" v-model="general.domain"  placeholder="Domain" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>License<span>*</span></label><br>
                        <input class="form-control" v-model="general.license"  placeholder="License" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Google Map Key<span>*</span></label><br>
                        <input class="form-control" v-model="general.map_key"  placeholder="Key" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Email Discover More Link<span>*</span></label><br>
                        <input class="form-control" v-model="general.discover"  placeholder="" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Support Telephone<span>*</span></label><br>
                        <input class="form-control" v-model="general.support_number"  placeholder="" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>YPR Email Address<span>*</span></label><br>
                        <input class="form-control" v-model="general.yprEmail"  placeholder="" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-12 required">
                        <label>Support Text<span>*</span></label><br>
                        <input class="form-control" v-model="general.support_text"  placeholder="" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-12 required">
                        <label>Light box Message ( use &lt;br&gt; for newline)</label><br>
                        <textarea class="form-control" v-model="general.lightbox" type="text" rows="5"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-4 required">
                        <label>Click to Call</label>
                        <select class="selectpicker form-control" v-model="general.click_number">
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                      <div class="col-md-4 required">
                        <label>Primary click to call number</label><br>
                        <input class="form-control" v-model="general.primary_click_number"  placeholder="" type="text">
                      </div>
                      <div class="col-md-4 required">
                        <label>Secondary click to call number</label><br>
                        <input class="form-control" v-model="general.secondary_click_number"  placeholder="" type="text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateSettings('general')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Smtp Information <small style="float: right;">Last updated {{ smtp.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="smtp">
            <div class="card-body">
              <form class="pt-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>User <span>*</span>:</label>
                        <input class="form-control" v-model="smtp.smtp_user" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Password <span>*</span>:</label>
                        <input class="form-control" v-model="smtp.smtp_password" type="password">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Port <span>*</span>:</label>
                        <input class="form-control" v-model="smtp.smtp_port" type="number">
                      </div>
                      <div class="col-md-6">
                        <label>Host <span>*</span>:</label>
                        <input class="form-control" v-model="smtp.smtp_host" type="text" value="">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Secure <span>*</span>:</label>
                        <select class="selectpicker form-control" v-model="smtp.smtp_secure">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateSettings('smtp')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Social <small style="float: right;">Last updated {{ social.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="social">
            <div class="card-body">
              <form class="pt-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Facebook <span>*</span>:</label>
                        <input class="form-control" v-model="social.facebook" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Instagram <span>*</span>:</label>
                        <input class="form-control" v-model="social.instagram" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Twitter <span>*</span>:</label>
                        <input class="form-control" v-model="social.twitter" type="text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateSettings('social')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Adsense <small style="float: right;">Last updated {{ adsense.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="adsense">
            <div class="card-body">
              <form class="pt-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <label>Adsense Active:</label>
                        <select class="selectpicker form-control" v-model="adsense.active">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Client ID <span>*</span>:</label>
                        <input class="form-control" v-model="adsense.client_id" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Responsive Slot <span>*</span>:</label>
                        <input class="form-control" v-model="adsense.responsive_slot" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>List Feed Slot <span>*</span>:</label>
                        <input class="form-control" v-model="adsense.list_slot" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>List Feed Layout Key<span>*</span>:</label>
                        <input class="form-control" v-model="adsense.list_slot_layout" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Search Feed Slot <span>*</span>:</label>
                        <input class="form-control" v-model="adsense.search_slot" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Search Feed Layout Key<span>*</span>:</label>
                        <input class="form-control" v-model="adsense.search_slot_layout" type="text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateSettings('adsense')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Payment Gateway <small style="float: right;">Last updated {{ gateway.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="gateway">
            <div class="card-body">
              <form class="pt-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Name <span>*</span>:</label>
                        <input class="form-control" v-model="gateway.authorized_net_name" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Transaction Key <span>*</span>:</label>
                        <input class="form-control" v-model="gateway.authorized_net_transaction_key" type="password">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Test Mode <span>*</span>:</label>
                        <select class="selectpicker form-control" v-model="gateway.authorized_net_testing">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateSettings('gateway')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Privacy Policy <small style="float: right;">Last updated {{ privacy.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="privacy">
            <div class="card-body">
              <client-only>
                <ckeditor type="classic" style="height: 500px;" v-model="privacy.content"></ckeditor>
              </client-only>
              <div class="text-right"><a @click="updateSettings('privacy')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
            </div>
          </div>
          <div>
            <h4 class="mt-5">Terms and Conditions <small style="float: right;">Last updated {{ terms.updated | format_date }}</small></h4>
          </div>
          <div class="card" id="terms">
            <div class="card-body">
              <client-only>
                <ckeditor type="classic" style="height: 500px;" v-model="terms.content"></ckeditor>
              </client-only>
              <div class="text-right"><a @click="updateSettings('terms')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
            </div>
          </div>
          <h4 class="mt-5">Advertising Page <small style="float: right;">Last updated {{ advertise.updated | format_date }}</small></h4>
          <div class="card" id="advertise">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div v-if="advertise.graph1">
                    <img :src="advertise.graph1" style="width:150px;height:150px">
                    <span class="anchor imgdelete" @click="removeGraph('graph1')">Delete</span>
                  </div>
                  <div v-else-if="graph1">
                    <img :src="createObjectURL(graph1)" style="width:150px;height:150px">
                    <span class="anchor imgdelete" @click="removeNewGraph('graph1')">Delete</span>
                  </div>
                  <div v-else @click="selectGraph('graph1')">
                    <img src="/images/add-image-icon-png-15.jpg" style="width:150px;height:150px">
                  </div>
                </div>
                <div class="col-md-6">
                  <div v-if="advertise.graph2">
                    <img :src="advertise.graph2" style="width:150px;height:150px">
                    <span class="anchor imgdelete" @click="removeGraph('graph2')">Delete</span>
                  </div>
                  <div v-else-if="graph2">
                    <img :src="createObjectURL(graph2)" style="width:150px;height:150px">
                    <span class="anchor imgdelete" @click="removeNewGraph('graph2')">Delete</span>
                  </div>
                  <div v-else @click="selectGraph('graph2')">
                    <img src="/images/add-image-icon-png-15.jpg" style="width:150px;height:150px">
                  </div>
                </div>
                <input id="graphUpload" type="file" style="display: none;" @change="onSelect">
                <cropper v-if="crop" :image="image" @save="saveImage" :aspectRatio="4/3" @close="crop=false">
                  <slot slot="header">
                    Crop Image
                  </slot>
                </cropper>
              </div>
              <div class="text-right"><a @click="updateAdvertise()" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
            </div>
          </div>
          <h4 class="mt-5">Banners<small style="float: right;" >Last updated {{ banners.updated | format_date }}</small></h4>
          <div class="card" id="banners">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-md-6">
                  <label>Purple Banner Active:</label>
                  <select class="selectpicker form-control" v-model="banners.active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div class="text-right"><a @click="updateBanner('banners')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
            </div>
          </div>
          <h4 class="mt-5">Banner Ads<small style="float: right;" >Last updated {{ banners_ads.updated | format_date }}</small></h4>
          <div class="card" id="banners_ads">
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-md-6">
                  <label>Banner Ads Active:</label>
                  <select class="selectpicker form-control" v-model="banners_ads.active">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label>Banner Ads Autoplay Timeout:</label>
                  <input type="number" class="form-control" v-model.number="banners_ads.autoplayTimeout" />
                </div>
              </div>
              <div class="row">
                <div class="col-12 mt-3"><p class="lead mb-2">Banner Ads Location</p></div>
                <div class="col-12 col-md-6">
                  <label>Banner Home (Top):</label>
                  <select class="selectpicker form-control" v-model="banners_ads.home_top">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label>Category List (Bottom):</label>
                  <select class="selectpicker form-control" v-model="banners_ads.category_bottom">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label>Directory List (Bottom):</label>
                  <select class="selectpicker form-control" v-model="banners_ads.directory_bottom">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                  </select>
                </div>
              </div>
              <div class="text-right"><a @click="updateSettings('banners_ads')" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .ck-content { min-height:400px; max-height:400px; }
</style>

<script>

  import Cropper from '~/components/Cropper.vue';

  export default {
    middleware: 'admin',
    asyncData({ $axios }) {
      return $axios.get(`/admin/settings`).then((res) => {
        return { smtp: res.data.data.smtp || {}, gateway: res.data.data.gateway || {}, social: res.data.data.social || {}, advertise: res.data.data.advertise || {},
          general: res.data.data.general || {}, terms: res.data.data.terms || {}, privacy: res.data.data.privacy || {}, adsense: res.data.data.adsense || {}, banners: res.data.data.banners || {}, banners_ads: res.data.data.banners_ads || {} }
      })
    },
    components: {
      'cropper': Cropper,
    },
    mounted() {},
    data () {
      return {
        errorMsg: null,
        smtp: {},
        gateway: {},
        social: {},
        general: {},
        terms: {},
        adsense: {},
        privacy: {},
        advertise: {},
        banners: {},
        image: null,
        graph1: null,
        graph2: null,
        crop: false
      }
    },
    methods: {
      calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
      },
      createObjectURL: function(file) {
        return URL.createObjectURL(file);
      },
      onSelect: function(e) {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = this.calculateAspectRatioFit(img.width, img.height, 600, 700);
          const canvas = document.createElement("canvas");
          canvas.width = aspectRatio.width;
          canvas.height = aspectRatio.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, aspectRatio.width, aspectRatio.height);

          this.image = canvas.toDataURL();
          this.crop = true;
        };
        img.src = URL.createObjectURL(e.srcElement.files[0]);
      },
      selectGraph: function(graph) {
        this.graph = graph;
        $('#graphUpload').click()
      },
      removeGraph: function(graph) {
        this.advertise[graph] = '';
      },
      removeNewGraph: function(graph) {
        this[graph] = null
      },
      saveImage(e) {
        this[this.graph] = e;
        this.crop = false;
      },
      edit(item) {
        this.item = item;
      },
      addUser () {
        this.item = {}
      },
      updateAdvertise() {

        if(!this.graph1 && this.graph2) {
          swal({title:"Error", text: 'No Changes Found!', icon:"error"});
          return
        }

        this.$nuxt.$loading.start();

        var formData = new FormData();
        if(this.graph1) formData.append('graph1', this.graph1);
        if(this.graph2) formData.append('graph2', this.graph2);

        this.$axios.post(`/admin/settings/graph`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            swal({title:"Notice", text: res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: err.message, icon:"error"});
          this.$nuxt.$loading.finish()
        });
      },
      updateSettings(data) {
        this[data].updated = new Date();
        var request = {args:  {[data]: this[data]}};
        this.$nuxt.$loading.start();

        this.$axios.post(`/admin/settings`, request).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
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
      updateBanner(data) {
        this[data].updated = new Date();
        let request = {args:  {[data]: this[data]}};
        this.$nuxt.$loading.start();

        this.$axios.$post(`/admin/settings/banners`, request).then((res) => {
          if(res && !res.error){
            swal({title:"Notice", text:"Your changes were saved successfully", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            swal({title:"Notice", text: res.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          swal({title:"Error", text: err, icon:"error"});
          this.$nuxt.$loading.finish()
        });
      }
    }
  }
</script>
