<template>
  <div class="container margin_60_35">
    <div class="wpb_text_column wpb_content_element ">
      <div class="wpb_wrapper">
        <h4 class="submit-form-user-info">Edit Vendor Category</h4>
      </div>
    </div>
    <form>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="form-group col-md-12">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="form-group mb-2 mt-0">
                    <label>Status <span>*</span>:</label>
                    <select class="form-control" name="status" v-model="category.status">
                      <option value="" disabled>Status</option>
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 required">
                  <label>Category Name <span>*</span>:</label>
                  <input class="form-control" v-model="category.name" type="text">
                  <span class="err-msg">
                      <span class="field-validation-valid">{{ errors.name }}</span>
                  </span>
                </div>
                <div class="col-md-6 required">
                  <label>Slug:</label>
                  <input class="form-control" v-model="category.slug" type="text" disabled>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12">
                  <label>Description:</label>
                  <client-only>
                    <ckeditor type="classic" style="height: 500px;" v-model="category.description"></ckeditor>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-right">
        <a @click="$router.go(-1)" class="btn_1 rounded add_top_30" style="color: white;">Cancel</a>
        <a @click="validateForm" class="btn_1 rounded add_top_30" style="color: white;">Update</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  asyncData({ $axios, params }) {
    return $axios.$get(`/admin/category/${params.id}`).then((res) => {
      return { category: res }
    }).catch((e) => {
      console.log(e)
    })
  },


  middleware: 'admin',
  name: 'edit-vendor-category',
  data () {
    return {
      category: {},
      errors: {
        name: ''
      },
      terms: false,
      images: [],
      logo: null,
    }
  },
  watch: {
    'category.name'(s) {
      this.category.slug = s.replaceAll(' ', '-').toLowerCase()
    }
  },
  methods: {
    validateForm() {
      this.$nuxt.$loading.start()
      this.errors = {};
      if (this.category.name) {
        this.$nuxt.$loading.finish()
        this.save();
        return;
      }

      if (!this.category.name) {
        this.errors.name = 'Category Name required.';
      }
      $('html,body').stop().animate({
        scrollTop: 0
      }, 'slow', 'swing');
      this.$nuxt.$loading.finish()
    },
    save() {
      this.$axios.$put('/admin/category', this.category).then((res) => {
        if(res.data && !res.data.error){
          swal({title:"Notice", text:"Category Successfully Updated", icon:"success"}).then(() => {
            this.$router.go(-1)
          })
        }
      })
    }
  }
}
</script>
