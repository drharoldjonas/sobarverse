<template>
  <div class="container margin_60_35">
    <h1 class="panel box blue-bg">Edit User Review</h1>
    <div class="add-review">
      <form>
        <div class="row">
          <div class="form-group col-md-6">
            <label>Month of Stay</label>
            <select class="form-control" v-model="form.month">
              <option value="">Month</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label>Year of Stay</label>
            <select class="form-control" v-model="form.year">
              <option value="">Year</option>
              <option v-for="(year, index) in years" :value="year" :key="index">{{ year }}</option>
            </select>
          </div>
          <div class="form-group col-md-12">
            <label>How do you rate the place?</label>
            <div class="row mt-2 required">
              <div class="col-md-6 col-xs-6">
                <label>Overall <span>*</span></label>
                <Rating :value="form.rating.overall" @ratings="setRating('overall', $event)"></Rating>
              </div>
              <div class="col-md-6 col-xs-6">
                <label>Treatment <span>*</span></label>
                <Rating :value="form.rating.treatment" @ratings="setRating('treatment', $event)"></Rating>
              </div>
            </div>

            <div class="row required">
              <div class="col-md-6 col-xs-6">
                <label>Accommodation <span>*</span></label>
                <Rating :value="form.rating.accommodation" @ratings="setRating('accommodation', $event)"></Rating>
              </div>
              <div class="col-md-6 col-xs-6">
                <label>Staff <span>*</span></label>
                <Rating :value="form.rating.staff" @ratings="setRating('staff', $event)"></Rating>
              </div>
            </div>

            <div class="row required">
              <div class="col-md-6 col-xs-6">
                <label>Value <span>*</span></label>
                <Rating :value="form.rating.value" @ratings="setRating('value', $event)"></Rating>
              </div>
              <div class="col-md-6 col-xs-6">
                <label>Food <span>*</span></label>=
                <Rating :value="form.rating.food" @ratings="setRating('food', $event)"></Rating>
              </div>
            </div>
          </div>
          <div class="form-group col-md-12">
            <label>Your Review</label>
            <textarea name="review_text" id="review_text" class="form-control" style="height:130px;" v-model="form.review"></textarea>
          </div>
          <div class="form-group col-md-12 add_top_20 add_bottom_30 text-right">
            <input type="button" value="Save" class="btn_1" id="submit-review" @click="save">
            <input type="button" value="Delete" class="btn_1" id="delete-review" @click="remove" style="background: red;">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Rating from "~/components/Rating";
  import constants from "~/constants";

  export default {
    middleware: 'admin',
    asyncData({ params, error, $axios }) {
      return $axios.get(`/admin/reviews/${params.id}`).then((res) => {
        var date = new Date();
        var years = [];
        for(var i = 2004; i < date.getFullYear(); i++) {
          years.push(i)
        }
        return { form: Object.assign({
          rating: {
            overall: 0,
              treatment: 0,
              accommodation: 0,
              staff: 0,
              value: 0,
              food: 0
          }}, res.data), years: years }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {
      Rating
    },
    data () {
      return {
        states: constants.states,
        years: [],
        form: {
          rating: {
            overall: 0,
            treatment: 0,
            accommodation: 0,
            staff: 0,
            value: 0,
            food: 0
          }
        }
      }
    },
    methods: {
      setRating: function(type, rating) {
        this.form.rating[type] = Number(rating);
      },
      remove: function() {
        swal({title:"Remove", text:"Are you sure", icon:"info", buttons:['No','Yes']}).then(function(val){
          if(!val) return;

          this.$nuxt.$loading.start()
          var request = {id:this.form._id, args:this.form};

          this.$axios.delete(`/admin/reviews/${this.params.id}`, request).then((res) => {
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
      save: function() {
        this.$nuxt.$loading.start()
        var request = {id:this.form._id, args:this.form};

        this.$axios.put(`/admin/reviews`, request).then((res) => {
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
      },
      search: function() {
        var request = {};

        this.$nuxt.$loading.start()

        this.$axios.get(`/admin/reviews/${this.$route.params.id}`, {params: request}).then((res) => {
          this.form = (res.data) ? res.data : this.form;
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>
