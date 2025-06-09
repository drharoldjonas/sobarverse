<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header" />
            <i class="fa fa-close" style="cursor: pointer;" @click="$emit('close')" />
          </div>

          <div class="modal-body">
            <Cropper
              ref="avatarCropper"
              :src="data"
              stencil-component="RectangleStencil"
              :stencil-props="{
                handlers: {},
                movable: true,
                scalable: true,
                aspectRatio: aspectRatio,
              }"
            />
            <div class="d-flex justify-content-end">
              <button type="button" class="btn_2 mt-3" @click="rotateImage">
                rotates
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="modal-default-button" @click="$emit('close')">
              cancel
            </button>
            <button type="button" class="modal-default-button save-btn" @click="save">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

    export default {
        name: "Crop",
        props: {
          'image': {
              type: String,
              default () {
                  return null
              }
          },
          "aspectRatio": {
            type: Number,
            default () {
              return 1
            }
          }
        },
        data() {
            return {
                data: null,
                coordinates: null,
                minheight: 306,
                minwidth: 460,
            }
        },
        mounted() {
            this.data = this.image;
        },
        methods: {
            save() {
                const { coordinates, canvas } = this.$refs.avatarCropper.getResult()
                this.coordinates = coordinates;
                // You able to do different manipulations at a canvas
                // but there we just get a cropped image
                const image = canvas.toDataURL();
                const type = image.split(';')[0].split('/')[1];
                const arr = image.split(',');
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const mime = arr[0].match(/:(.*?);/)[1];
                const u8arr = new Uint8Array(n);

                while (n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }

                const avatar = new File([u8arr], "avatar." + type, { type: mime });
                this.$emit('save', avatar);
            },
            rotateImage() {
                const image = document.createElement("img");
                image.crossOrigin = "anonymous";
                image.src = this.data;
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    if (image.width > image.height) {
                        canvas.width = image.height;
                        canvas.height = image.width;
                        ctx.translate(image.height, image.width / image.height);
                    } else {
                        canvas.height = image.width;
                        canvas.width = image.height;
                        ctx.translate(image.height, image.width / image.height);
                    }
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(image, 0, 0);
                    this.data = canvas.toDataURL();
                };
            }
        }
    };
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 600px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header {
        background-color: #f5f6f7;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 3px 3px 0 0;
        color: #1d2129;
        font-weight: bold;
        line-height: 19px;
        padding: 10px 12px;
    }

    .modal-footer {
        border-radius: 0 0 3px 3px;
        margin: 0;
        padding: 8px 12px;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        background: #f2f2f2;
    }

    .modal-default-button {
        border: 1px solid;
        border-radius: 2px;
        box-sizing: content-box;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        font-weight: bold;
        justify-content: center;
        padding: 0 8px;
        position: relative;
        text-align: center;
        text-shadow: none;
        vertical-align: middle;
        background-color: #f5f6f7;
        border-color: #ccd0d5;
        color: #4b4f56;
    }

    .save-btn {
        background-color: #4267b2;
        border-color: #4267b2;
        color: #ffffff;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
