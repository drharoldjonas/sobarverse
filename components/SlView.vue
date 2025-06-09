<template>
  <div>
    <div v-if="details">
      <hr>
      <h4 class="add_bottom_15">Details</h4>
      <hr>
    </div>
    <div v-if="details" class="row add_bottom_30">
      <div v-if="profile.livingHouse" class="col-md-6">
        <h6>Sober living house type</h6>
        <ul class>
          <li>{{ profile.livingHouse }}</li>
        </ul>
      </div>
      <div v-if="profile.gender" class="col-md-6">
        <h6>Gender</h6>
        <ul class>
          <li>{{ profile.gender }}</li>
        </ul>
      </div>
      <div v-if="profile.organizationType" class="col-md-6">
        <h6>Organization Type</h6>
        <ul class>
          <li>{{ profile.organizationType }}</li>
        </ul>
      </div>
      <div v-if="profile.noOfBeds" class="col-md-6">
        <h6>Number of beds</h6>
        <ul class>
          <li>{{ profile.noOfBeds }}</li>
        </ul>
      </div>
    </div>
    <div v-if="lease">
      <hr>
      <h4 class="add_bottom_15">Lease Terms</h4>
      <hr>
    </div>
    <div v-if="lease" class="row add_bottom_30">
      <div v-if="profile.securityDeposit" class="col-md-6">
        <h6>Security deposit required</h6>
        <ul class>
          <li>{{ profile.securityDeposit }}</li>
        </ul>
      </div>
      <div v-if="profile.costRange" class="col-md-6">
        <h6>Range of typical weekly fees</h6>
        <ul class>
          <li>{{ profile.costRange }}</li>
        </ul>
      </div>
      <div v-if="profile.rentRequired" class="col-md-6">
        <h6>First month's rent required at move in?</h6>
        <ul class>
          <li>{{ profile.rentRequired }}</li>
        </ul>
      </div>
      <div v-if="profile.minStay" class="col-md-6">
        <h6>Minimum length of stay requirement in weeks</h6>
        <ul class>
          <li>{{ profile.minStay }}</li>
        </ul>
      </div>
    </div>
    <div v-if="general">
      <hr>
      <h4 class="add_bottom_15">General Information</h4>
      <hr>
    </div>
    <div v-if="general" class="row add_bottom_30">
      <div v-if="profile.employmentRequired" class="col-md-6">
        <h6>Is employment required?</h6>
        <ul class>
          <li>{{ profile.employmentRequired }}</li>
        </ul>
      </div>
      <div v-if="profile.highRiskEmployment" class="col-md-6">
        <h6>Is high risk employment allowed (e.g., cab driving, working where drugs/alcohol are sold)?</h6>
        <ul class>
          <li>{{ profile.highRiskEmployment }}</li>
        </ul>
      </div>
      <div v-if="profile.petsAllowed" class="col-md-6">
        <h6>Pets Allowed?</h6>
        <ul class>
          <li>{{ profile.petsAllowed }}</li>
        </ul>
      </div>
      <div v-if="profile.serviceOffered.length" class="col-md-6 add_bottom_15">
        <h6>Services offered</h6>
        <ul class="bullets">
          <li v-for="(service, index) in profile.serviceOffered" :key="index">{{ service }}</li>
        </ul>
      </div>
      <div v-if="profile.residentRequirements.length" class="col-md-6 add_bottom_15" key="index">
        <h6>Resident's requirements</h6>
        <ul class="bullets">
          <li v-for="(requirement, index) in profile.residentRequirements" :key="index">{{ requirement }}</li>
        </ul>
      </div>
      <div v-if="profile.amenitiesProvided.length" class="col-md-6 add_bottom_15">
        <h6>Amenities provided</h6>
        <ul class="bullets">
          <li v-for="(amenitie, index) in profile.amenitiesProvided" :key="index">{{ amenitie }}</li>
        </ul>
      </div>
      <div v-if="profile.neighborhood" class="col-md-12">
        <h6>Name and Description of the neighborhood</h6>
        <p>{{ profile.neighborhood }}</p>
      </div>
      <div v-if="profile.attractionsOfInterest.length" class="col-md-6 add_bottom_15">
        <h6>Local area attractions of interest</h6>
        <ul class="bullets">
          <li v-for="(attraction, index) in profile.attractionsOfInterest" :key="index">{{ attraction }}</li>
        </ul>
      </div>
      <div v-if="profile.otherInfo" class="col-md-12">
        <h6>Other Information</h6>
        <p>{{ profile.otherInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import constants from '../constants'

  export default {
    props: ['profile'],
    asyncData({ params, error }) {
      return axios.get(`/facilities`).then((res) => {
        return { featured: res.data.data }
      })
    },
    data () {
      return {}
    },
    computed: {
      details: function() {
        if(this.profile.livingHouse || this.profile.gender || this.profile.organizationType) return true;
        else return false;
      },
      lease: function() {
        if(this.profile.securityDeposit || this.profile.costRange || this.profile.rentRequired || this.profile.minStay) return true;
        else return false;
      },
      general: function() {
        if(this.profile.employmentRequired || this.profile.highRiskEmployment || this.profile.petsAllowed || this.profile.serviceOffered.length
          || this.profile.residentRequirements.length || this.profile.amenitiesProvided.length || this.profile.neighborhood
          || this.profile.neighborhood || this.profile.attractionsOfInterest.length || this.profile.otherInfo) return true;
        else return false;
      }
    },
    methods: {}
  }
</script>

