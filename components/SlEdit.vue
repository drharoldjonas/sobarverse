<template>
  <div class="col-md-12">
    <h3>Details</h3>
    <hr>
    <div class="row">
      <div class="form-group col-md-12">
        <h6 class="formlabel">Sober living house type</h6>
        <div class="row">
          <div class="col-lg-4">
            <label class="container_check">Halfway House
              <input type="radio" v-model="form.livingHouse" value="Halfway House">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Sober House or 3/4 House
              <input type="radio" v-model="form.livingHouse" value="Sober House or 3/4 House">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Independent Sober Living
              <input type="radio" v-model="form.livingHouse" value="Independent Sober Living">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Gender</h6>
        <div class="row">
          <div class="col-lg-4">
            <label class="container_check">Male
              <input type="radio" v-model="form.gender" value="Male">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Female
              <input type="radio" v-model="form.gender" value="Female">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Both
              <input type="radio" v-model="form.gender" value="Both">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Organization Type</h6>
        <div class="row">
          <div class="col-lg-4">
            <label class="container_check">None Profit
              <input type="radio" v-model="form.organizationType" value="None Profit">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Profit
              <input type="radio" v-model="form.organizationType" value="Profit">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Number of beds <span>*</span></h6>
        <div class="row">
          <div class="col-lg-4">
            <input class="form-control" type="number" v-model="form.noOfBeds">
          </div>
        </div>
      </div>
    </div>
    <h3>Lease Terms</h3>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="form-group col-md-6">
            <h6 class="formlabel">Security deposit required (0 if none) <span>*</span>:</h6>
            <div class="row">
              <div class="col-lg-4">
                <input class="form-control" type="number" v-model="form.securityDeposit">
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <h6 class="formlabel">Range of typically weekly fees (all costs)  <span>*</span>:</h6>
            <div class="row">
              <div class="col-lg-4">
                <select class="form-control" v-model="form.costRange">
                  <option value="SoberHouse Costs">SoberHouse Costs</option>
                  <option value="1">Free</option>
                  <option value="$1 - $75">$1 - $75</option>
                  <option value="$76 - $150">$76 - $150</option>
                  <option value="$151 - $250">$151 - $250</option>
                  <option value="$251 - $325">$251 - $325</option>
                  <option value="$326 - $500">$326 - $500</option>
                  <option value="$501 - $750">$501 - $750</option>
                  <option value="$751 +">$751 +</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="form-group col-md-6">
            <h6 class="formlabel">First month's rent required at move in? <span>*</span>:</h6>
            <div class="row">
              <div class="col-lg-4">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.rentRequired" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-4">
                <label class="container_check">No
                  <input type="radio" v-model="form.rentRequired" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <h6 class="formlabel">Minimum length of stay requirement in weeks  <span>*</span>:</h6>
            <div class="row">
              <div class="col-lg-4">
                <input class="form-control" type="number" v-model="form.minStay">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>General Information</h3>
    <hr>
    <div class="row">
      <div class="form-group col-md-12">
        <h6 class="formlabel">Is employment required?</h6>
        <div class="row">
          <div class="col-md-3">
            <label class="container_check">Yes
              <input type="radio" v-model="form.employmentRequired" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-3">
            <label class="container_check">No
              <input type="radio" v-model="form.employmentRequired" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-3">
            <label class="container_check">No, but must be looking
              <input type="radio" v-model="form.employmentRequired" value="No, but must be looking">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-3">
            <label class="container_check">No, if active student
              <input type="radio" v-model="form.employmentRequired" value="No, if active student">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <div class="row">
          <div class="form-group col-md-8">
            <h6 class="formlabel">Is high risk employment allowed (e.g., cab driving, working where drugs/alcohol are sold)?</h6>
            <div class="row">
              <div class="col-lg-4">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.highRiskEmployment" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-4">
                <label class="container_check">No
                  <input type="radio" v-model="form.highRiskEmployment" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-group col-md-4">
            <h6 class="formlabel">Pets Allowed?<span>*</span>:</h6>
            <div class="row">
              <div class="col-lg-4">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.petsAllowed" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-4">
                <label class="container_check">No
                  <input type="radio" v-model="form.petsAllowed" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-4">
                <label class="container_check">Profit
                  <input type="radio" v-model="form.petsAllowed" value="Unknown">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Services offered (Please check all that apply):</h6>
        <div class="row">
          <div class="col-md-4">
            <label class="container_check">Counseling
              <input type="checkbox" v-model="form.serviceOffered" value="Counseling">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">12 step meetings
              <input type="checkbox" v-model="form.serviceOffered" value="12 step meetings">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Random drug testing
              <input type="checkbox" v-model="form.serviceOffered" value="Random drug testing">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Food
              <input type="checkbox" v-model="form.serviceOffered" value="Food">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Transportation
              <input type="checkbox" v-model="form.serviceOffered" value="Transportation">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Job coaching
              <input type="checkbox" v-model="form.serviceOffered" value="Job coaching">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Medications dispensed by staff
              <input type="checkbox" v-model="form.serviceOffered" value="Medications dispensed by staff">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">24 hour on site management
              <input type="checkbox" v-model="form.serviceOffered" value="24 hour on site management">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Resident's requirements (General - Please check all that are required):</h6>
        <div class="row">
          <div class="col-md-4">
            <label class="container_check">Checking in/out
              <input type="checkbox" v-model="form.residentRequirements" value="Checking in/out">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Attending 12 step meetings
              <input type="checkbox" v-model="form.residentRequirements" value="Attending 12 step meetings">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Must have a sponsor
              <input type="checkbox" v-model="form.residentRequirements" value="Must have a sponsor">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Attend house meetings
              <input type="checkbox" v-model="form.residentRequirements" value="Attend house meetings">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Chores
              <input type="checkbox" v-model="form.residentRequirements" value="Chores">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">No visitors without consent
              <input type="checkbox" v-model="form.residentRequirements" value="No visitors without consent">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Amenities provided (please check all that apply):</h6>
        <div class="row">
          <div class="col-md-4">
            <label class="container_check">Internet
              <input type="checkbox" v-model="form.amenitiesProvided" value="Internet">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Cable TV
              <input type="checkbox" v-model="form.amenitiesProvided" value="Cable TV">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">On site washer/dryer
              <input type="checkbox" v-model="form.amenitiesProvided" value="On site washer/dryer">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Fitness area/workout room
              <input type="checkbox" v-model="form.amenitiesProvided" value="Fitness area/workout room">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Swimming pool
              <input type="checkbox" v-model="form.amenitiesProvided" value="Swimming pool">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Private rooms
              <input type="checkbox" v-model="form.amenitiesProvided" value="Private rooms">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-md-4">
            <label class="container_check">Walking distance to public transportation
              <input type="checkbox" v-model="form.amenitiesProvided" value="Walking distance to public transportation">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Please enter a detailed description of your facility (Max 3,000 characters)</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.description" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Name and Description of the neighborhood (limit 2,000 characters) <span>*</span>:</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.neighborhood" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <h6 class="formlabel">Local area attractions of interest (please only list top 5) <span>*</span>:</h6>
        <div class="row">
          <div class="col-md-6 form-group">
            <input class="form-control" type="text" v-model="form.attractionsOfInterest[0]">
          </div>
          <div class="col-md-6 form-group">
            <input class="form-control" type="text" v-model="form.attractionsOfInterest[1]">
          </div>
          <div class="col-md-6 form-group">
            <input class="form-control" type="text" v-model="form.attractionsOfInterest[2]">
          </div>
          <div class="col-md-6 form-group">
            <input class="form-control" type="text" v-model="form.attractionsOfInterest[3]">
          </div>
          <div class="col-md-6 form-group">
            <input class="form-control" type="text" v-model="form.attractionsOfInterest[4]">
          </div>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Any other information that you want to add about your Sober Living Residences. (If you already have a narrative on the sober.com website, you can skip this question.) Limit 2000 characters:</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.otherInfo" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from "~/constants";

  export default {
    props: ['profile'],
    watch: {
      form: {
        handler(val){
          this.$emit('data', this.form)
        },
        deep: true
      }
    },
    mounted: function() {
      this.form = this.profile
    },
    data () {
      return {
        form: constants.profile
      }
    },
    computed: {},
    methods: {}
  }
</script>
