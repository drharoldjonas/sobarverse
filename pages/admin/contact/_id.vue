<template>
  <div class="details">
    <div class="container margin_60_35">
      <h1 class="mb-4">Contact Details</h1>

      <div class="row">
        <div class="col-sm-12 col-md-7">
          <div class="row">
            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Name
                </div>
                <div class="col-md-6">
                  {{ item.name }}
                </div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Phone
                </div>
                <div class="col-md-6">
                  {{ item.phone }}
                </div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Email
                </div>
                <div class="col-md-6">
                  {{ item.email }}
                </div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Preferred Contact
                </div>
                <div class="col-md-6">
                  {{ item.preferredContact }}
                </div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Facility
                </div>
                <div class="col-md-6">
                  {{ item.facility ? item.facility.name : '' }}
                </div>
              </div>
            </div>
            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Company
                </div>
                <div class="col-md-6">
                  {{ item.company ? item.company.name : '' }}
                </div>
              </div>
            </div>
            <div class="col-md-12 form-group">
              <div class="row">
                <div class="col-md-6">
                  Message
                </div>
                <div class="col-md-6">
                  {{ item.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <nuxt-link class="btn btn-primary" to="/admin/contact">Back to List</nuxt-link>
        </div>
        <div class="col-md-2">
          <a class="btn btn-primary" :href="'mailto:?body=' + body">Email</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Rating from "~/components/Rating";
  import constants from "~/constants";

  export default {
    middleware: 'auth',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/contact/${params.id}`).then((res) => {
        return { item: Object.assign({}, res.data.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Rating
    },
    computed: {
      body() {
        return encodeURIComponent(`Name: ${this.item.name} \nPhone: ${this.item.phone} \nEmail: ${this.item.email} \nPreferred Contact: ${this.item.preferredContact} \nFacility: ${this.item.facility ? this.item.facility.name : ''} \nCompany: ${this.item.company ? this.item.company.name : ''} \nMessage: ${this.item.message}`)
      }
    },
    data () {
      return {
        states: constants.states,
        item: {}
      }
    },
    methods: {
      remove: function() {
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          this.$nuxt.$loading.start()
          var request = {id:this.form._id, args:this.form};

          this.$axios.delete(`/admin/contact/${this.item._id}`, request).then((res) => {
            if(res.data && !res.data.error){
              swal({title:"Notice", text:"Review Updated Successfully", icon:"success"}).then(function(val){
              }.bind(this));
            } else {
              //Handle errors
              swal({title:"Notice", text:res.data.error,icon:"error"});
            }
            this.$nuxt.$loading.finish()
          }).catch((e) => {
            this.$nuxt.$loading.finish()
            swal({title:"Notice", text:res.data.error,icon:"error"});
          })
        }.bind(this));
      },
      search: function() {
        var request = {};

        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/contact/${this.$route.params.id}`, {params: request}).then((res) => {
          this.form = (res.data) ? res.data : this.form;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>

