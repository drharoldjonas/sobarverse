<template>
  <div class="container margin_60_35">
    <div class="content white-bg">
      <div class="container">
        <div class="row aic">
          <div class="col-md-12"><h2>Add Enhanced Profile</h2></div>
          <div class="col-md-12">
            <h6>Add your facility in two minutes for free!</h6>
            <p>Are you a doctor, treatment center or recovery house looking for new patients? Give us two minutes of your time and we will give you qualified web visitors each and every month at no cost. Simply answer a few questions, upload your pictures and videos. It's our way of giving back.</p>
            <p>
              <nuxt-link :to="{name: 'facility-id', params: {id: '5dd826f688c32b758fab6d15'}}">Here is a Sample of an Enhanced Listing Ad</nuxt-link>
            </p>
            <div class="row">
              <div class="col-md-3">
                <p class="text-center">
                  <a style="color:#fff;" @click="setType('tc')" class="btn_1 rounded">Add Treatment Center</a>
                </p>
              </div>
              <div class="col-md-3">
                <p class="text-center">
                  <a style="color:#fff;" @click="setType('sl')" class="btn_1 rounded">Add Sober Living</a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <h3>You'll receive these great benefits</h3>
            <ul class="benefits row">
              <li class="col-md-6">
                <div>
                  <h6>Full page profile</h6>
                  <p>An entire web page with all the important information about your organization -- Services provided, costs, pictures, maps, brochures, etc. Everything a person needs to make an informed decision.</p>
                </div>
              </li>
              <li class="col-md-6">
                <div>
                  <h6>Qualified Traffic</h6>
                  <p>We receive thousands of targeted visitors each month. You'll generate qualified traffic to your organization -- people looking specifically for your services in your geography.</p>
                </div>
              </li>
              <li class="col-md-6">
                <div>
                  <h6>Reach New Patients</h6>
                  <p>Internet marketing complements your existing marketing effort and often prove more profitable than traditional marketing and you'll reach those who only search online for services.</p>
                </div>
              </li>
              <li class="col-md-6">
                <div>
                  <h6>Brand Awareness</h6>
                  <p>Sober.com is the oldest major recovery website on the Internet. By associating your organization with our trusted brand, you will be more likely to convert tire kickers.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    validate ({ params }) {
      // Must be a number
      return /^[a-z0-9]{24,24}$/.test(params.id)
    },
    components: {},
    data () {
      return {}
    },
    computed: {},
    methods: {
      setType: function(type) {
        this.$router.push({name: `facility-profile-add-${type}-id`, params: {id: this.$route.params.id}})
      }
    }
  }
</script>
