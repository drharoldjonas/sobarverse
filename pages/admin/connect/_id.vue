<template>
  <div class="container margin_60_35">

    <h1 class="mb-4">Connect Details</h1>

    <div class="row">
      <div class="col-sm-12 col-md-7">
        <div class="row">
          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                First Name
              </div>
              <div class="col-md-6">
                {{ item.firstname }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                Last Name
              </div>
              <div class="col-md-6">
                {{ item.lastname }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                I'm seeking help for...
              </div>
              <div class="col-md-6">
                {{ item.seeking }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                How soon do you need help?
              </div>
              <div class="col-md-6">
                {{ item.time }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                I need help with
              </div>
              <div class="col-md-6">
                {{ item.treatment }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                Will you go through withdrawal if you stop using?
              </div>
              <div class="col-md-6">
                {{ item.withdrawal }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                How will you pay for treatment?
              </div>
              <div class="col-md-6">
                {{ item.payment }}
              </div>
            </div>
          </div>

          <div class="col-md-12 form-group">
            <div class="row">
              <div class="col-md-6">
                Where are you located?
              </div>
              <div class="col-md-6">
                {{ item.location }}
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
                Date of Birth
              </div>
              <div class="col-md-6">
                {{ item.dob }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <a class="btn btn-primary" href="/admin/connect">Back to List</a>
      </div>
      <div class="col-md-2">
        <a class="btn btn-primary" :href="'mailto:?body=' + body">Email</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Rating from "~/components/Rating";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/connect/${params.id}`).then((res) => {
        return { item: Object.assign({}, res.data) }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Rating
    },
    computed: {
      body() {
        return encodeURIComponent(`First Name: ${this.item.firstname} \nLast Name: ${this.item.lastname} \nI'm seeking help for... ${this.item.seeking} \nHow soon do you need help? ${this.item.time} \nI need help with: ${this.item.treatment} \nWill you go through withdrawal if you stop using? ${this.item.withdrawal} \nHow will you pay for treatment? ${this.item.payment} \nWhere are you located? ${this.item.location} \nEmail: ${this.item.email} \nPhone: ${this.item.phone} \nDate of Birth: ${this.item.dob}`)
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

          this.$axios.delete(`/admin/connect/${this.item._id}`, request).then((res) => {
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

        this.$axios.get(`/admin/connect/${this.$route.params.id}`, {params: request}).then((res) => {
          this.form = (res.data) ? res.data : this.form;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>

