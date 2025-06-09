<template>
  <div class="col-lg-12">
    <h4 class="submit-form-user-info">Attachments</h4>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <p>
          To enhance the exposure of your listing and to assist
          addicts/alcoholics and their loved ones, please attach the following
          items so we can include them in your Enhanced Sober.com Profile. If
          you don't have these items readily available, you can always email
          them to us later at
          <a href="mailto:clients@sober.com">clients@sober.com</a>:
        </p>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Uploaded Images (jpg,png,jpeg)</h6>
        <div class="row">
          <ul id="imageListing" class="sortable col-md-12">
            <li v-for="(image, index) in form.images" :key="index">
              <img :src="image" style="width: 150px; height: 150px" />
              <span class="anchor imgdelete" @click="removeImage(image)"
                >Delete</span
              >
            </li>
            <li v-for="(image, index) in images" draggable="true" :key="index">
              <img
                :src="createObjectURL(image)"
                style="width: 150px; height: 150px"
              />
              <a class="anchor imgdelete" @click="removeNewImage(image)"
                >Delete</a
              >
            </li>
            <li draggable="false" @click="selectImage">
              <input
                id="imageUpload"
                ref="file"
                type="file"
                style="display: none"
                @change="onSelect"
              />
              <img
                src="/images/add-image-icon-png-15.jpg"
                style="width: 150px; height: 150px"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">
          You Tube Video Url of your housing and/or TV commercials
        </h6>
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-8">
                <input
                  ref="video"
                  class="form-control"
                  type="text"
                  style="width: 100%"
                />
              </div>
              <div class="col-md-4">
                <button
                  id="addVideo"
                  type="button"
                  class="btn_1"
                  @click="addVideo"
                >
                  Add Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">
          Uploaded Videos (change the order of the videos here)
        </h6>
        <div class="row">
          <ul id="videoListing" class="sortable col-md-12">
            <li
              v-for="(video, index) in form.videos"
              draggable="true"
              :key="index"
            >
              <div>
                <iframe
                  width="150"
                  height="150"
                  :src="'https://www.youtube.com/embed/' + getVideoID(video)"
                  frameborder="0"
                  allowfullscreen
                >
                </iframe>
              </div>
              <span class="anchor imgdelete" @click="removeVideo(video)"
                >Delete</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-12 form-group">
        <h6 class="formlabel">Uploaded Logo (400x267, jpg,png,jpeg)</h6>
        <div class="row">
          <ul id="logoListing" class="col-md-12">
            <li v-if="form.logo">
              <img :src="form.logo" style="width: 200px; height: 200px" />
              <span class="anchor imgdelete" @click="removeLogo">Delete</span>
            </li>
            <li v-else-if="logo">
              <img
                :src="createObjectURL(logo)"
                style="width: 150px; height: 150px"
              />
              <span class="anchor imgdelete" @click="removeNewLogo"
                >Delete</span
              >
            </li>
            <li v-else @click="selectLogo">
              <input
                id="logoUpload"
                ref="logo"
                type="file"
                style="display: none"
                @change="onSelectLogo"
              />
              <img
                src="/images/add-image-icon-png-15.jpg"
                style="width: 150px; height: 150px"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <cropper
      v-if="cropLogo"
      :image="image"
      @save="saveLogo"
      :aspectRatio="dynamicWidth / dynamicHeight"
      @close="cropLogo = false"
    >
      <slot slot="header"> Crop Image </slot>
    </cropper>
  </div>
</template>

<style>
.anchor {
  color: #337ab7;
  background-color: transparent;
  cursor: pointer;
}
</style>

<script>
import Cropper from "~/components/Cropper.vue";

export default {
  props: ["value"],
  components: {
    cropper: Cropper
  },
  watch: {
    form: {
      handler(val) {
        this.$emit("data", this.form);
      },
      deep: true
    },
    value: {
      handler(val) {
        this.form.logo = this.value.logo;
        this.form.images = this.value.images;
        this.form.videos = this.value.videos;
      },
      deep: true
    },
    images: function(oldVal, newVal) {
      this.$emit("images", this.images);
    },
    logo: function(oldVal, newVal) {
      this.$emit("logo", this.logo);
    }
  },
  mounted: function() {
    this.form.logo = this.value.logo;
    this.form.images = this.value.images;
    this.form.videos = this.value.videos;
    this.$emit("logo", this.value.logo);
    this.$emit("images", this.value.images);
  },
  data() {
    return {
      images: [],
      logo: null,
      form: {
        logo: "",
        images: [],
        videos: []
      },
      minheight: 267,
      minwidth: 400,
      dynamicHeight: 0,
      dynamicWidth: 0,
      crop: false,
      cropLogo: false,
      image: null,
      aspectRatio: { width: 0, height: 0 }
    };
  },
  computed: {},
  methods: {
    getVideoID(video) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = video.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    },
    addVideo: function() {
      this.form.videos.push(this.$refs.video.value);
      this.$refs.video.value = "";
    },
    removeVideo: function(e) {
      this.form.videos = this.form.videos.filter(function(item) {
        return item !== e;
      });
    },
    createObjectURL: function(file) {
      return URL.createObjectURL(file);
    },
    onSelectLogo: function(e) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = this.calculateAspectRatioFit(
          img.width,
          img.height,
          400,
          267
        );
        const canvas = document.createElement("canvas");
        canvas.width = aspectRatio.width;
        canvas.height = aspectRatio.height;

        this.dynamicWidth = aspectRatio.width;
        this.dynamicHeight = aspectRatio.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, aspectRatio.width, aspectRatio.height);

        this.image = canvas.toDataURL();
        this.cropLogo = true;
      };
      img.src = URL.createObjectURL(e.srcElement.files[0]);
    },
    selectLogo: function() {
      $("#logoUpload").click();
    },
    removeLogo: function() {
      this.form.logo = "";
    },
    removeNewLogo: function() {
      this.logo = null;
    },
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      return { width: srcWidth * ratio, height: srcHeight * ratio };
    },
    onSelect: function(e) {
      this.images.push(e.srcElement.files[0]);
    },
    saveImage(e) {
      this.images.push(e);
      this.crop = false;
    },
    saveLogo(e) {
      this.logo = e;
      this.cropLogo = false;
    },
    selectImage: function() {
      if (this.images.length + this.form.images.length < 15) {
        $("#imageUpload").click();
      }
    },
    removeImage: function(e) {
      this.form.images = this.form.images.filter(function(item) {
        return item !== e;
      });
    },
    removeNewImage: function(e) {
      this.images = this.images.filter(function(item) {
        return item !== e;
      });
    }
  }
};
</script>
