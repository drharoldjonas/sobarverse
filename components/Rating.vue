<template>
  <ul class="rating">
    <li :class="getClass(1)">
      <input v-model="rating" type="radio" value="1">
    </li>
    <li :class="getClass(2)">
      <input v-model="rating" type="radio" value="2">
    </li>
    <li :class="getClass(3)">
      <input v-model="rating" type="radio" value="3">
    </li>
    <li :class="getClass(4)">
      <input v-model="rating" type="radio" value="4">
    </li>
    <li :class="getClass(5)">
      <input v-model="rating" type="radio" value="5">
    </li>
  </ul>
</template>

<style scoped>
  .rating li input {
    opacity: 0;
    padding: 0px;
    margin: 0px;
    height: 20px !important;
    cursor: pointer;
  }
  .star {
    background: url(/images/star.png) no-repeat;
    width: 14px;
    height: 14px;
    float: left;
    margin-right: 3px;
  }
  .halfstar {
    background: url(/images/halfstar.png) no-repeat;
    width: 14px;
    height: 14px;
    float: left;
    margin-right: 3px;
  }
  .star-x {
    background: url(/images/star-x.png) no-repeat;
    width: 14px;
    height: 14px;
    float: left;
    margin-right: 3px;
  }
</style>

<script>
  import axios from '~/plugins/axios'
  import constants from '../constants'

  export default {
    props: ['value'],
    mounted: function() {
      this.rating = this.value;
    },
    watch: {
      rating: function(oldVal, newVal) {
        this.$emit('ratings', this.rating)
      },
      value: function(oldVal, newVal) {
        this.rating = Number(this.value);
        this.$forceUpdate()
      }
    },
    data: function() {
      return {
        rating: 0,
      }
    },
    methods: {
      getClass: function(pos) {
        var cls = 'star-x';
        if(this.rating != 5) {
          if(this.rating > pos && this.rating < (pos + 1) && (this.rating) >= pos + 0.5) {
            var cls = 'halfstar';
          }
          if(this.rating >= pos) {
            var cls = 'star';
          }
        } else {
          var cls = 'star';
        }

        return cls;
      }
    }
  }
</script>
