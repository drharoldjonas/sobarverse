<template>
  <div class="col-lg-12">
    <h4 class="submit-form-user-info">Pharmacotherapies</h4>
    <hr>
    <div class="row">
      <div class="form-group col-md-12">
        <h6 class="formlabel">Do you provide the following during treatment? <span>*</span></h6>
        <div class="row">
          <div class="col-md-4">Antabuse</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.antabuse" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.antabuse" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Naltrexone</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.naltrexone" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.naltrexone" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Campral</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.campral" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.campral" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Nicotine replacement</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.nicotine" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.nicotine" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Medications for psychiatric disorders</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.psychiatric" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.psychiatric" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Methadone</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.methadone" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.methadone" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Subutex</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.subutex" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.subutex" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Suboxone</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.drug.suboxone" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.drug.suboxone" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group col-md-12">
        <h6 class="formlabel">Does this facility operate maintenance programs for...</h6>
        <div class="row">
          <div class="col-md-4">Methadone</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.maintenance.methadone" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.maintenance.methadone" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Subutex</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.maintenance.subutex" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.maintenance.subutex" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">Suboxone</div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-lg-6">
                <label class="container_check">Yes
                  <input type="radio" v-model="form.maintenance.suboxone" value="Yes">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="col-lg-6">
                <label class="container_check">No
                  <input type="radio" v-model="form.maintenance.suboxone" value="No">
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="submit-form-user-info">Other information</h4>
    <hr>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Are private rooms available? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.privateRooms" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.privateRooms" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Number of beds at this facility <span>*</span></h6>
        <div class="row">
          <div class="col-lg-3">
            <input class="form-control" type="number" v-model="form.noOfBeds">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Gender <span>*</span></h6>
        <div class="row">
          <div class="col-lg-3">
            <label class="container_check">Male
              <input type="radio" v-model="form.gender" value="Male">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-3">
            <label class="container_check">Female
              <input type="radio" v-model="form.gender" value="Female">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-3">
            <label class="container_check">Both
              <input type="radio" v-model="form.gender" value="Both">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Do you offer aftercare services? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.afterCare" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.afterCare" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">If Aftercare is offered, are those services free? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.afterCareFree" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.afterCareFree" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Does your facility track patients' progress post care? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.postCare" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.postCare" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Do you provide specific programs for alumni? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.alumni" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.alumni" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Do you offer alumni networking and special events? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-2">
            <label class="container_check">Yes
              <input type="radio" v-model="form.specialEvents" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-2">
            <label class="container_check">No
              <input type="radio" v-model="form.specialEvents" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Pets Allowed? <span>*</span></h6>
        <div class="row">
          <div class="col-lg-3">
            <label class="container_check">Yes
              <input type="radio" v-model="form.petsAllowed" value="Yes">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-3">
            <label class="container_check">No
              <input type="radio" v-model="form.petsAllowed" value="No">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-3">
            <label class="container_check">Unknown
              <input type="radio" v-model="form.petsAllowed" value="Unknown">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <h4 class="submit-form-user-info">Insurance and other information</h4>
    <hr>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">What is the patients to staff ratio?</h6>
        <div class="row">
          <div class="col-lg-4">
            <input class="form-control" type="text" v-model="form.patientStaffRatio">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Average Cost (specify range). Note: Only put $0 if absolutely free. Free treatment centers appear in a different area of site.<span>*</span></h6>
        <div class="row">
          <div class="col-md-3">Residential cost- per month</div>
          <div class="col-md-3">
            <select class="form-control" v-model="form.costRange">
              <option value="Sliding Scale">Sliding Scale</option>
              <option value="Free">Free</option>
              <option value="$1 - $1,000">$1 - $1,000</option>
              <option value="$1,001 - $3,500">$1,001 - $3,500</option>
              <option value="$3,501 - $5,000">$3,501 - $5,000</option>
              <option value="$5,001 - $10,000">$5,001 - $10,000</option>
              <option value="$10,001 - $15,000">$10,001 - $15,000</option>
              <option value="$15,001 - $30,000">$15,001 - $30,000</option>
              <option value="$30,001 - $50,000">$30,001 - $50,000</option>
              <option value="$50,001 +">$50,001 +</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 form-group">
        <h6 class="formlabel">Average length of program (specify range in days)<span>*</span></h6>
        <div class="row form-group">
          <div class="col-md-3">Residential</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.residential.min" type="text">
          </div>
          <div class="col-md-1 text-center">to</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.residential.max" type="text">
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-3">Outpatient</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.outpatient.min" type="text">
          </div>
          <div class="col-md-1 text-center">to</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.outpatient.max" type="text">
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-3">Hospital Inpatient/Partial Hospitalization</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.hospital.min" type="text">
          </div>
          <div class="col-md-1 text-center">to</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.hospital.max" type="text">
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-3">Intensive Outpatient</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.intensive.min" type="text">
          </div>
          <div class="col-md-1 text-center">to</div>
          <div class="col-md-2">
            <input class="form-control numbersOnly" v-model="form.programLength.intensive.max" type="text">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Other pertinent cost information you would like to share (max 3,000 characters)</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.otherCost" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group">
        <h6 class="formlabel">How do you define success? What is your success rate? How is it measured? (Max 3,000 characters)</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.successReason" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>
    <h4 class="submit-form-user-info">Organizational Information</h4>
    <hr>
    <div class="row">
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Organization Type: <span>*</span></h6>
        <div class="row">
          <div class="col-lg-4">
            <label class="container_check">None Profit
              <input type="radio" v-model="form.organizationType" value="None Profit">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">For Profit
              <input type="radio" v-model="form.organizationType" value="For Profit">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
        <h6 class="formlabel">Year Business Started <span>*</span></h6>
        <div class="row">
          <div class="col-lg-3">
            <input class="form-control" type="number" v-model="form.yearStarted">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Please enter a detailed description of your facility (Max 3,000 characters)</h6>
        <div class="row">
          <div class="col-md-9">
            <textarea class="form-control" cols="20" v-model="form.description" maxlength="3000" rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>
    <h4 class="submit-form-user-info">Insurance and other information</h4>
    <hr>
    <div class="row">
      <div class="form-group col-md-12">
        <h6 class="formlabel">In Network Insurance Providers<span>*</span></h6>
        <div class="row">
          <div class="col-lg-4">
            <label class="container_check">We do not accept Insurance
              <input type="checkbox" v-model="form.acceptInsurance" value="We do not accept Insurance">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col-lg-4">
            <label class="container_check">Spanish
              <input type="checkbox" v-model="form.acceptInsurance" value="We accept out of network insurance carriers">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-12">
        <div class="row">
          <div class="col-md-5">
            <select class="form-control multi-select-insurance valid" id="leftvalues" multiple="multiple" style="height:200px !important;" v-model="selected">
              <template v-for="(provider, index) in providers">
                <option v-if="!form.otherProviders.includes(provider)" :value="provider" :key="index">{{ provider }}</option>
              </template>
            </select>
          </div>
          <div class="mselect-btns-cont col-md-1">
            <br>
            <br>
            <div class="btn btn-primary" id="right" @click="toRight">»</div>
            <br>
            <br>
            <div class="btn btn-primary" id="left" @click="toLeft">«</div>
          </div>
          <div class="col-md-5">
            <select class="form-control multi-select-insurance" id="rightvalues" multiple="multiple" style="height:200px !important;" v-model="newSelected">
              <option v-for="(provider, index) in form.otherProviders" :value="provider" :key="index">{{ provider }}</option>
            </select>
          </div>
        </div>
        <h6 class="formlabel mt-3">Other Insurance Providers (Please list)</h6>
      </div>
    </div>
  </div>
</template>

<script>
  import constants from '~/constants'

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
      this.form = this.profile;
    },
    data () {
      return {
        selected: [],
        newSelected: [],
        providers: constants.providers,
        form: constants.profile
      }
    },
    computed: {},
    methods: {
      selectProvider: function(e) {
        if(this.selected.includes(e)) {
          this.selected = this.selected.filter(function(item) {
            return item !== e
          })
        } else {
          this.selected.push(e)
        }
      },
      newSelectProvider: function(e) {
        if(this.newSelected.includes(e)) {
          this.newSelected = this.newSelected .filter(function(item) {
            return item !== e
          })
        } else {
          this.newSelected.push(e)
        }
      },
      toRight: function() {
        for(var i = 0; i < this.selected.length; i++) {
          this.form.otherProviders.push(this.selected[i]);
          this.selected.splice(i, 1)
        }
      },
      toLeft: function() {
        for(var i = 0; i < this.newSelected.length; i++) {
          this.form.otherProviders = this.form.otherProviders.filter(function(item) {
            return item !== this.newSelected[i]
          }.bind(this))
        }
      },
    }
  }
</script>
