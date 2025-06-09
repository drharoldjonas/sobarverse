<template>
  <div>
    <div v-if="other">
      <hr>
      <h4 class="add_bottom_15">Other Information</h4>
      <hr>
    </div>
    <div v-if="other" class="row add_bottom_30">
      <div v-if="profile.gender" class="col-md-6">
        <h6>Gender</h6>
        <ul class>
          <li>{{ profile.gender }}</li>
        </ul>
      </div>
      <div v-if="profile.petsAllowed" class="col-md-6">
        <h6>Pets Allowed?</h6>
        <ul class>
          <li>{{ profile.petsAllowed }}</li>
        </ul>
      </div>
      <div v-if="profile.patientStaffRatio" class="col-md-6">
        <h6>Patient To Staff Ratio</h6>
        <ul class>
          <li>{{ profile.patientStaffRatio }}</li>
        </ul>
      </div>
      <div v-if="programLength" class="col-md-12">
        <h4>Avg. Length Of Program (In Days)</h4>
        <div class="opening" style="margin-bottom: 25px;padding: 25px 25px 25px 25px;">
          <div class="row">
            <div class="col-md-6">
              <ul>
                <li v-if="residentialProgram">Residential</li>
                <li v-if="outpatientProgram">Outpatient</li>
                <li v-if="hospitalProgram">Hospital Inpatient/Partial Hospitalization</li>
                <li v-if="intensiveProgram">Intensive Outpatient</li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul>
                <li v-if="profile.programLength.residential && profile.programLength.residential.min && profile.programLength.outpatient.max">{{ profile.programLength.outpatient.min }} - {{ profile.programLength.residential.max }}</li>
                <li v-else-if="profile.programLength.residential && profile.programLength.residential.min">{{ profile.programLength.outpatient.min }}</li>
                <li v-else-if="profile.programLength.residential && profile.programLength.residential.max">{{ profile.programLength.outpatient.max }}</li>
                <li v-if="profile.programLength.outpatient && profile.programLength.outpatient.min && profile.programLength.residential.max">{{ profile.programLength.outpatient.min }} - {{ profile.programLength.outpatient.max }}</li>
                <li v-else-if="profile.programLength.outpatient && profile.programLength.outpatient.min">{{ profile.programLength.outpatient.min }}</li>
                <li v-else-if="profile.programLength.outpatient && profile.programLength.outpatient.max">{{ profile.programLength.outpatient.max }}</li>
                <li v-if="profile.programLength.hospital && profile.programLength.hospital.min && profile.programLength.hospital.max">{{ profile.programLength.hospital.min }} - {{ profile.programLength.hospital.max }}</li>
                <li v-else-if="profile.programLength.hospital && profile.programLength.hospital.min">{{ profile.programLength.hospital.min }}</li>
                <li v-else-if="profile.programLength.hospital && profile.programLength.hospital.max">{{ profile.programLength.hospital.max }}</li>
                <li v-if="profile.programLength.intensive && profile.programLength.intensive.min && profile.programLength.intensive.max">{{ profile.programLength.intensive.min }} - {{ profile.programLength.intensive.max }}</li>
                <li v-else-if="profile.programLength.intensive && profile.programLength.intensive.min">{{ profile.programLength.intensive.min }}</li>
                <li v-else-if="profile.programLength.intensive && profile.programLength.intensive.max">{{ profile.programLength.intensive.max }}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- /opening -->
      </div>
      <div v-if="profile.successReason" class="col-md-12">
        <h6>What Success Means To Us</h6>
        <p>{{ profile.successReason }}</p>
      </div>
    </div>
    <!-- /row -->
    <div v-if="org">
      <hr>
      <h4 class="add_bottom_15">Organization & Facilities</h4>
      <hr>
    </div>
    <div v-if="org" class="row add_bottom_30">
      <div v-if="profile.yearStarted" class="col-md-6">
        <h6>Year Started</h6>
        <ul class>
          <li>{{ profile.yearStarted }}</li>
        </ul>
      </div>
      <div v-if="profile.organizationType" class="col-md-6">
        <h6>Business Status</h6>
        <ul class>
          <li>{{ profile.organizationType }}</li>
        </ul>
      </div>
      <div v-if="profile.noOfBeds" class="col-md-6">
        <h6>Number Of Beds</h6>
        <ul class>
          <li>{{ profile.noOfBeds }}</li>
        </ul>
      </div>
      <div v-if="profile.privateRooms" class="col-md-6">
        <h6>Private Rooms Available</h6>
        <ul class>
          <li>{{ profile.privateRooms }}</li>
        </ul>
      </div>
      <div v-if="residentialProgram" class="col-md-6">
        <h6>Average stay (Residential)</h6>
        <ul class>
          <li v-if="profile.programLength.residential.min && profile.programLength.residential.max">Average stay in days :  {{ profile.programLength.residential.min }} - {{ profile.programLength.residential.max }}</li>
          <li v-else-if="profile.programLength.residential.min">Average stay in days :  {{ profile.programLength.residential.min }}</li>
          <li v-else-if="profile.programLength.residential.max">Average stay in days :  {{ profile.programLength.residential.max }}</li>
        </ul>
      </div>
      <div v-if="intensiveProgram" class="col-md-6">
        <h6>Average stay (Intensive Outpatient)</h6>
        <ul class>
          <li v-if="profile.programLength.intensive.min && profile.programLength.intensive.max">Average stay in days :  {{ profile.programLength.intensive.min }} - {{ profile.programLength.intensive.max }}</li>
          <li v-else-if="profile.programLength.intensive.min">Average stay in days :  {{ profile.programLength.intensive.min }}</li>
          <li v-else-if="profile.programLength.intensive.max">Average stay in days :  {{ profile.programLength.intensive.max }}</li>
        </ul>
      </div>
      <div v-if="outpatientProgram" class="col-md-6">
        <h6>Average stay (Outpatient)</h6>
        <ul class>
          <li v-if="profile.programLength.outpatient.min && profile.programLength.outpatient.max">Average stay in days :  {{ profile.programLength.outpatient.min }} - {{ profile.programLength.outpatient.max }}</li>
          <li v-else-if="profile.programLength.outpatient.min">Average stay in days :  {{ profile.programLength.outpatient.min }}</li>
          <li v-else-if="profile.programLength.outpatient.max">Average stay in days :  {{ profile.programLength.outpatient.max }}</li>
        </ul>
      </div>
      <div v-if="hospitalProgram" class="col-md-6">
        <h6>Average stay (Hospital Inpatient/Partial Hospitalization)</h6>
        <ul class>
          <li v-if="profile.programLength.hospital.min && profile.programLength.hospital.max">Average stay in days :  {{ profile.programLength.hospital.min }} - {{ profile.programLength.hospital.max }}</li>
          <li v-else-if="profile.programLength.hospital.min">Average stay in days :  {{ profile.programLength.hospital.min }}</li>
          <li v-else-if="profile.programLength.hospital.max">Average stay in days :  {{ profile.programLength.hospital.max }}</li>
        </ul>
      </div>
    </div>
    <!-- /row -->
    <div v-if="pharma">
      <hr>
      <h4 class="add_bottom_15">Pharmacotherapies</h4>
      <hr>
    </div>
    <div v-if="Object.keys(profile.drug).length || Object.keys(profile.maintenance).length" class="row add_bottom_30">
      <div v-if="Object.keys(profile.drug).length" class="col-md-6">
        <h6>Provided During Treatment</h6>
        <ul class="bullets">
          <li v-if="profile.drug.antabuse == 'Yes'">Antabuse</li>
          <li v-if="profile.drug.naltrexone == 'Yes'">Naltrexone</li>
          <li v-if="profile.drug.campral == 'Yes'">Campral</li>
          <li v-if="profile.drug.nicotine == 'Yes'">Nicotine replacement</li>
          <li v-if="profile.drug.psychiatric == 'Yes'">Medications for psychiatric disorders</li>
          <li v-if="profile.drug.methadone == 'Yes'">Methadone</li>
          <li v-if="profile.drug.subutex == 'Yes'">Subutex</li>
          <li v-if="profile.drug.suboxone == 'Yes'">Suboxone</li>
        </ul>
      </div>
      <div v-if="Object.keys(profile.maintenance).length" class="col-md-6">
        <h6>Maintenance Program</h6>
        <ul class="bullets">
          <li v-if="profile.maintenance.methadone == 'Yes'">Methadone</li>
          <li v-if="profile.maintenance.subutex == 'Yes'">Subutex</li>
          <li v-if="profile.maintenance.suboxone == 'Yes'">Suboxone</li>
        </ul>
      </div>
    </div>
    <div v-if="aftercare || alumini" class="row add_bottom_15">
      <div v-if="aftercare" class="col-md-6">
        <hr>
        <h4>Aftercare</h4>
        <hr>
      </div>
      <div v-if="alumini" class="col-md-6">
        <hr>
        <h4>Alumni</h4>
        <hr>
      </div>
    </div>
    <div v-if="aftercare || alumini" class="row add_bottom_30">
      <div v-if="aftercare" class="col-md-6">
        <h6>Services Offered</h6>
        <ul class="bullets">
          <li v-if="profile.afterCare == 'Yes'">After care services offered.</li>
          <li v-if="profile.afterCareFree == 'Yes'">After care services offered are free.</li>
          <li v-if="profile.postCare == 'Yes'">Track patients' progress post care</li>
        </ul>
      </div>
      <div v-if="alumini" class="col-md-6">
        <h6>Alumni Services</h6>
        <ul class="bullets">
          <li v-if="profile.specialEvents == 'Yes'">Alumni networking and special events</li>
          <li v-if="profile.alumini == 'Yes'">Special programs for alumni</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['profile'],
    data () {
      return {}
    },
    computed: {
      other: function() {
        if(this.profile.successReason || this.profile.patientStaffRatio || this.profile.gender || this.profile.petsAllowed || this.programLength) return true;
        else return false;
      },
      programLength: function() {
        if(this.residentialProgram || this.intensiveProgram || this.outpatientProgram || this.hospitalProgram) return true;
        else return false;
      },
      residentialProgram: function() {
        if(this.profile.programLength && this.profile.programLength.residential) {
          return Object.keys(this.profile.programLength.residential).length
        }
        return false
      },
      intensiveProgram: function() {
        if(this.profile.programLength && this.profile.programLength.intensive) {
          return Object.keys(this.profile.programLength.intensive).length
        }
        return false
      },
      outpatientProgram: function() {
        if(this.profile.programLength && this.profile.programLength.outpatient) {
          return Object.keys(this.profile.programLength.outpatient).length
        }
        return false
      },
      hospitalProgram: function() {
        if(this.profile.programLength && this.profile.programLength.hospital) {
          return Object.keys(this.profile.programLength.hospital).length
        }
        return false
      },
      org: function() {
        if(this.profile.organizationType || this.profile.noOfBeds || this.profile.yearStarted || this.profile.privateRooms ||
          this.residentialProgram || this.intensiveProgram || this.outpatientProgram || this.hospitalProgram) return true;
        else return false;
      },
      pharma: function() {
        if(Object.keys(this.profile.drug).length || Object.keys(this.profile.maintenance).length) return true;
        else return false;
      },
      aftercare: function() {
        if(this.profile.afterCare || this.profile.afterCareFree || this.profile.postCare) return true;
        else return false;
      },
      alumini: function() {
        if(this.profile.specialEvents || this.profile.alumini) return true;
        else return false;
      }
    },
    methods: {}
  }
</script>
