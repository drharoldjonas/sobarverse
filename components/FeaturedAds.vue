<template>
  <div class="container">
    <div v-if="featured.length" class="main_title_2">
      <span><em></em></span>
      <h2>Featured listings</h2>
    </div>
    <div id="reccomended" class="owl-carousel owl-theme">
      <div v-for="(item, index) in featured" class="item" :key="index">
        <div v-if="item.profile" class="strip grid">
          <figure>
            <a @click="$router.push({name: 'facility-id', params: {id: item.slug}})">
              <img style="width: 200px;height: auto;" :src="item.profile.logo || '/images/crowd.png'" onerror="this.onerror=null; this.src='/images/crowd.png'" class="img-fluid" alt="">
              <a class="read_more" @click="$router.push({name: 'facility-id', params: {id: item.slug}})"><span>Read more</span></a>
              <small style="left: 0px;right: 0px;top: 0px;background: none;text-align: right;">
                <!--<img v-if="item.profile.logo" :src="item.profile.logo" class="img-fluid pull-right" alt="" style="width: 100px;">-->
              </small>
            </a>
          </figure>
          <div class="wrapper">
            <h3><a @click="$router.push({name: 'facility-id', params: {id: item.slug}})">{{ item.name }}</a></h3>
            <small>{{ item.address }} {{ item.state }}  {{ item.zip }}</small>
            <!--<p v-if="item.profile.description">{{ item.profile.description.substring(0, 250) }}...</p>-->
            <form v-if="item.location" action="http://maps.google.com/maps" method="get" target="_blank">
              <input name="saddr" value="" type="hidden"><input type="hidden" name="daddr" :value="item.location.coordinates[1] + ',' + item.location.coordinates[0]">
              <button type="submit" value="Get directions" class="btn_infobox_get_directions loc" style="font-weight: 500;color: #999;line-height: 1;font-size: .875rem;">Get directions</button>
            </form>
          </div>
          <ul>
            <li><span></span></li>
            <li>
              <div class="score"><span>Rating<em>{{ item.review ? item.review.total : 0 }} Reviews</em></span><strong>{{ item.review ? item.review.avg : 0 }}</strong></div>
            </li>
          </ul>
        </div>
        <div v-else class="strip grid">
          <div class="wrapper">
            <h3><a @click="$router.push({name: 'facility-id', params: {id: item.slug}})">{{ item.name }}</a></h3>
            <small>{{ item.address }} {{ item.state }}  {{ item.zip }}</small>
            <div>
              <form v-if="item.location" action="http://maps.google.com/maps" method="get" target="_blank">
                <input name="saddr" value="" type="hidden"><input type="hidden" name="daddr" :value="item.location.coordinates[1] + ',' + item.location.coordinates[0]">
                <button type="submit" value="Get directions" class="btn_infobox_get_directions loc" style="font-weight: 500;color: #999;line-height: 1;font-size: .875rem;">Get directions</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /item -->
    </div>
    <!-- /carousel -->
  </div>
  <!-- /container -->
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        featured: []
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      search: function() {
        var request = {filters: {sample: 12}};

        this.$axios.get(`/featured`, {params: request}).then((res) => {
          this.featured = (res.data) ? res.data.data : [];
          this.$nextTick(function() {
            $('#reccomended').owlCarousel({
              center: true,
              items: 2,
              loop: true,
              autoplay: true,
              smartSpeed: 600,
              margin: 0,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 2
                },
                767: {
                  items: 2
                },
                1000: {
                  items: 3
                },
                1400: {
                  items: 4
                }
              }
            });
          })
        })
      }
    }
  }
</script>
