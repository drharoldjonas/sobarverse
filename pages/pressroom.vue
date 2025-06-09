<template>
  <div class="container margin_60_35">
    <h2>Press Room</h2>

    <div style="margin-top:20px" class="col-md-12">
      <div class="col-md-12" style="margin-top:40px">
        <div class="row">
          <template v-for="(item, index) in items">
            <div v-if="item.image" class="col-md-2 col-xs-4" :key="index">
              <a :href="item.link" rel="nofollow" target="_blank">
                <img :src="item.image" style="width:100%;">
              </a>
            </div>
          </template>
        </div>
      </div>

      <div class="col-md-12" style="margin-top:40px">
        <ul style="list-style-type:circle">
          <li>
            <a href="http://www.prweb.com/releases/Addiction_App/Wins_SAMHSA/prweb13583635.htm" target="_blank" rel="nofollow">SAMHSA awards Sober Network Inc. first prize in a national competition for best mobile app to help with people recovering from Opioid dependence</a>
          </li>
          <template v-for="(item, index) in items">
            <li v-if="!item.image" :key="index">
              <a :href="item.link" target="_blank" rel="nofollow">{{ item.title }}</a>
            </li>
          </template>
        </ul>
      </div>

      <div style="display:block;clear:both;">
        <span style="display:block;">Ria Romano, Partner</span>
        <span style="display:block;">RPR Public Relations, Inc.</span>


        <span style="display:block;">Email: <a href="mailto:rromano@romanopr.com">rromano@romanopr.com</a></span>
        <span style="display:block;"><a href="http://www.romanopr.com">www.romanopr.com</a></span>

        <span style="display:block;">Direct Dial <a href="tel:786-290-6413">786-290-6413</a></span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    asyncData({ params, error, $axios }) {
      return $axios.get(`/pressroom/`).then((res) => {
        return { items: res.data.data || {total:0, data:[]}}
      }).catch((e) => {
        console.log(e)
      })
    },
    head: {
      title: `Press Room`,
    },
    components: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>
