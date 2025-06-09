<template>
  <div class="account">
    <div class="sub_header_in">
      <div class="container">
        <h1>Account Settings</h1>
      </div>
      <!-- /container -->
    </div>
    <!-- /sub_header -->

    <!-- User Popup -->
    <div id="user-man-dialog" class="zoom-anim-dialog mfp-hide">
      <div class="small-dialog-header">
        <h3 v-if="item._id">Edit User</h3>
        <h3 v-else>New User</h3>
      </div>
      <form>
        <div class="sign-in-wrapper">
          <div class="err">{{ errorMsg }}</div>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="item.firstname">
            <i class="icon_profile"></i>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="item.lastname">
            <i class="icon_profile"></i>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="item.email">
            <i class="icon_mail_alt"></i>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" name="password" v-model="item.password">
            <i class="icon_lock_alt"></i>
          </div>
          <div class="text-center"><input type="button" @click="saveUser" value="Save" class="btn_1 full-width"></div>
        </div>
      </form>
      <!--form -->
    </div>

    <div class="container margin_60_35">
      <div class="row">
        <aside class="col-lg-3" id="faq_cat">
          <div class="box_style_cat" id="faq_box">
            <ul id="cat_nav">
              <li><a href="#account" class="active"><i class="fa fa-gear"></i>Account</a></li>
              <li><a href="#company"><i class="fa fa-building"></i>Company</a></li>
              <li><a href="#users"><i class="fa fa-users"></i>Users</a></li>
            </ul>
          </div>
          <!--/sticky -->
        </aside>

        <div class="col-lg-9" id="faq">
          <h4 class="nomargin_top">Account Information</h4>
          <div class="card" id="account">
            <div class="card-body">
              <form class="pt-4" id="userForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>First name<span>*</span></label><br>
                        <input class="form-control" v-model="data.firstname" placeholder="First Name" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Last Name<span>*</span></label><br>
                        <input class="form-control" v-model="data.lastname" placeholder="Last Name" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Email<span>*</span></label><br>
                        <input class="form-control" v-model="data.email" placeholder="Email" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Telephone<span>*</span></label><br>
                        <input class="form-control" v-model="data.phone" placeholder="Telephone" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Password<span>*</span></label><br>
                        <input class="form-control" v-model="data.password"  placeholder="Password" type="password">
                      </div>
                      <div class="col-md-6 required">
                        <label>Confirm Password<span>*</span></label><br>
                        <input class="form-control" v-model="data.confirmPassword"  placeholder="Confirm Password" type="password">
                      </div>
                    </div>
                  </div>
                  <!--<div class="col-md-6 form-group required">-->
                    <!--<label>User Role<span>*</span></label><br>-->
                    <!--<select class="form-control" v-model="data.role_id">-->
                      <!--<option v-for="(role, index) in roles" :value="role._id" :key="index">{{ role.name }}</option>-->
                    <!--</select>-->
                  <!--</div>-->
                </div>
                <div class="text-right"><a @click="updateUser" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <h4 class="mt-5">Company Information</h4>
          <div class="card" id="company">
            <div class="card-body">
              <form class="pt-4">
                <div class="row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Company Name <span>*</span>:</label>
                        <input class="form-control" v-model="company.name" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Email <span>*</span>:</label>
                        <input class="form-control" v-model="company.email" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Address <span>*</span>:</label>
                        <input class="form-control" v-model="company.address" type="text">
                      </div>
                      <div class="col-md-6">
                        <label>Address 2:</label>
                        <input class="form-control" v-model="company.address2" type="text" value="">
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>City <span>*</span>:</label>
                        <input class="form-control" v-model="company.city" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>State <span>*</span>:</label>
                        <select class="selectpicker form-control" v-model="company.state">
                          <option value="">---Select A State ---</option>
                          <option v-for="(state, index) in states" :value="state.code" :key="index">{{ state.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-6 required">
                        <label>Zip <span>*</span>:</label>
                        <input class="form-control" v-model="company.zip" type="text">
                      </div>
                      <div class="col-md-6 required">
                        <label>Phone Number <span>*</span>:</label>
                        <input class="form-control" v-model="company.phone" type="text">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right"><a @click="updateCompany" class="btn_1 rounded add_top_30" style="color: white;">Update</a></div>
              </form>
            </div>
          </div>
          <h4 class="mt-5">Users</h4>
          <div class="card" id="users">
            <div class="card-header">
              <div class="text-right">
                <a @click="addUser" href="#user-man-dialog" id="user-man" class="btn_2 rounded add_top_30" style="color: white;display: inline;">
                  <i class="fa fa-plus"></i> New
                </a>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-condensed">
                  <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <!--<th scope="col">Role</th>-->
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in users.data" :key="index">
                      <td>{{ item.firstname }}</td>
                      <td>{{ item.lastname }}</td>
                      <td>{{ item.email }}</td>
                      <!--<td>{{ item.role ? item.role.name : '' }}</td>-->
                      <td>
                        <a href="#user-man-dialog" id="user-edit" @click="edit(item)"><i class="fa fa-edit"></i></a>
                        <a @click="remove(item)"><i class="fa fa-trash"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from '~/constants'
  import { mapState } from 'vuex'

  export default {
    middleware: 'auth',
    asyncData({ $axios }) {
      return $axios.get(`/portal/users`).then((res) => {
        return { users: res.data }
      }).catch((e) => {
        console.log(e)
      })
    },
    mounted() {
      this.company = Object.assign({}, this.user.company);
      this.data = Object.assign({}, this.user);
      delete this.data.company;

      $('#user-man, #user-edit').magnificPopup({
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
        errorMsg: null,
        company: {},
        item: {},
        data: {},
        roles: [],
        users: [],
        countries: constants.countries
      }
    },
    computed: {
      ...mapState('auth', ['user']),
    },
    methods: {
      edit(item) {
        this.item = item;
      },
      addUser () {
        this.item = {}
      },
      updateCompany() {
        var request = {id:this.company._id, args:this.company};
        this.$nuxt.$loading.start();

        var type = (this.company['_id']) ? 'put' : 'post'

        this.$axios[type](`/portal/companies`, request).then((res) => {
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
      updateUser() {
        var request = {id:this.data._id, args:this.data};
        this.$nuxt.$loading.start();

        var type = (this.data['_id']) ? 'put' : 'post'

        this.$axios[type](`/portal/users`, request).then((res) => {
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
      saveUser () {
        var request = {id:this.item._id, args:this.item};
        request.args.company_id = this.user.company_id;
        this.$nuxt.$loading.start();


        this.$store.state.roles.forEach(function(role){
          if(role.name == 'User') {
            request.args.role_id = role._id;
          }
        });

        var type = (this.item['_id']) ? 'put' : 'post'

        this.$axios[type](`/portal/users`, request).then((res) => {
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
      remove(obj) {
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          var request = { id:obj._id };
          this.$nuxt.$loading.start()

          this.$axios.delete(`/portal/users/${obj._id}`, request).then((res) => {
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
      search() {
        this.$nuxt.$loading.start()
        this.$axios.get(`/portal/users`).then((res) => {
          this.users = res.data || [];
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
