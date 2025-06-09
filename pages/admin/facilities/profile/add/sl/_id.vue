<template>
  <div class="container margin_60_35">
    <h1 class="mb-5">Add Sober Living Profile</h1>
    <div class="row">
      <SlEdit :profile="form" @data="setProfile"></SlEdit>
    </div>
    <div class="row">
      <Attachments :value="form" @data="setProfile" @images="setImages" @logo="setLogo"></Attachments>
    </div>
    <p class="text-right"><a @click="save" class="btn_1 rounded add_top_30" style="color: white;">Next</a></p>
  </div>
</template>

<script>
  import SlEdit from "~/components/SlEdit";
  import Attachments from "~/components/Attachments";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    validate ({ params }) {
      // Must be a number
      return /^[a-z0-9]{24,24}$/.test(params.id)
    },
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/facilities/${params.id}`).then((res) => {
        var form = constants.profile;
        Object.assign(form, res.data.data.profile)
        var item = res.data.data;
        delete item.profile;
        return { form: form, item: item}
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      SlEdit,
      Attachments
    },
    data () {
      return {
        privacy: false,
        companyErr: '',
        facilityErr: '',
        terms: false,
        images: [],
        logo: null,
        item: null,
        form: constants.profile
      }
    },
    computed: {},
    methods: {
      setLogo: function(logo) {
        this.logo = logo;
      },
      setImages: function(images) {
        this.images = images;
      },
      setProfile: function(data) {
        Object.assign(this.form, data)
      },
      save: function() {
        this.form.type = 'SL';
        this.item.profile_type = 'SL';

        var formData = new FormData();
        formData.append('id', this.$route.params.id);
        for(var i = 0; i < this.images.length; i++) {
          formData.append('image', this.images[i]);
        }

        formData.append('logo', this.logo);
        formData.append('args', JSON.stringify(this.form));

        this.$nuxt.$loading.start()

        this.$axios.post(`/admin/facilities/profile`, formData, { headers: { 'Content-Type': 'multipart/form-data'} }).then((res) => {
          if(res.data && !res.data.error){
            swal({title:"Notice", text:"Facility Updated Successfully", icon:"success"}).then(function(val){
            }.bind(this));
          } else {
            //Handle errors
            console.log('eroor')
            swal({title:"Notice", text: res.data.error,icon:"error"});
          }
          this.$nuxt.$loading.finish()
        }).catch((err) => {
          console.log(err)
          swal({title:"Error", text: this.errormsg, icon:"error"});
          this.$nuxt.$loading.finish()
        });
      }
    }
  }
</script>
