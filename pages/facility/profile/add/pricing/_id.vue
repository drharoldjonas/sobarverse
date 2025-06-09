<template>
  <div>
    <div class="sub_header_in">
      <div class="container">
        <h1>Pricing</h1>
      </div>
      <!-- /container -->
    </div>
    <!-- /sub_header -->

    <div class="container margin_60">
      <div class="pricing-container cd-has-margins">
        <!--<div class="pricing-switcher">-->
          <!--<p class="fieldset">-->
            <!--<input type="radio" name="duration-2" value="monthly" id="monthly-2" checked>-->
            <!--<label for="monthly-2">Monthly</label>-->
            <!--<input type="radio" name="duration-2" value="yearly" id="yearly-2">-->
            <!--<label for="yearly-2">Yearly</label>-->
            <!--<span class="switch"></span>-->
          <!--</p>-->
        <!--</div>-->
        <!--/pricing-switcher -->
        <ul class="pricing-list bounce-invert">
          <li v-for="(item, index) in items" :key="index">
            <ul class="pricing-wrapper">
              <li data-type="monthly" class="is-visible">
                <header class="pricing-header">
                  <h2>{{ item.name }}</h2>

                  <div class="price">
                    <span class="currency">$</span>
                    <span class="price-value">{{ item.price }}</span>
                    <span class="price-duration">mo</span>
                  </div>
                </header>
                <!-- /pricing-header -->
                <div class="pricing-body">
                  <ul class="pricing-features">
                    <li><em>{{ item.max_clicks }}</em> Maximum Phone Clicks</li>
                    <li><em v-if="!item.advanced">Non</em> Advanced Listing</li>
                    <li><em v-if="!item.featured">Non</em> Featured</li>
                    <li><em>30 days</em> Listing</li>
                    <li><em>24/7</em> Support</li>
                  </ul>
                </div>
                <!-- /pricing-body -->
                <footer class="pricing-footer">
                  <a class="select-plan" @click="selectPlan(item)">Select</a>
                </footer>
              </li>
              <li data-type="yearly" class="is-hidden">
                <header class="pricing-header">
                  <h2>Basic</h2>

                  <div class="price">
                    <span class="currency">$</span>
                    <span class="price-value">320</span>
                    <span class="price-duration">yr</span>
                  </div>
                </header>
                <!-- /pricing-header -->
                <div class="pricing-body">
                  <ul class="pricing-features">
                    <li><em>One Time</em> Fee</li>
                    <li><em>1</em> User</li>
                    <li><em>Lifetime</em> Availability</li>
                    <li><em>Non</em> Featured</li>
                    <li><em>30 days</em> Listing</li>
                    <li><em>24/7</em> Support</li>
                  </ul>
                </div>
                <!-- /pricing-body -->
                <footer class="pricing-footer">
                  <a class="select-plan" @click="selectPlan(item)">Select</a>
                </footer>
              </li>
            </ul>
            <!-- /pricing-wrapper -->
          </li>
        </ul>
        <!-- /pricing-list -->
      </div>
      <!-- /row -->
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    // validate ({ store }) {
    //   return store.state.profile.facility;
    // },
    asyncData({ params, error, $axios }) {
      return $axios.get(`/packages`).then((res) => {
        return { items: res.data.data || [] }
      }).catch((e) => {
        console.log(e)
      })
    },
    components: {},
    data () {
      return {}
    },
    mounted() {
      this.$store.commit('profile/set', null);
      this.$store.commit('profile/setPackage', null);
      this.$store.commit('profile/setSuccess', null);

      checkScrolling($('.pricing-body'));
      $(window).on('resize', function(){
        window.requestAnimationFrame(function(){checkScrolling($('.pricing-body'))});
      });
      $('.pricing-body').on('scroll', function(){
        var selected = $(this);
        window.requestAnimationFrame(function(){checkScrolling(selected)});
      });

      function checkScrolling(tables){
        tables.each(function(){
          var table= $(this),
            totalTableWidth = parseInt(table.children('.pricing-features').width()),
            tableViewport = parseInt(table.width());
          if( table.scrollLeft() >= totalTableWidth - tableViewport -1 ) {
            table.parent('li').addClass('is-ended');
          } else {
            table.parent('li').removeClass('is-ended');
          }
        });
      }

      //switch from monthly to annual pricing tables
      bouncy_filter($('.pricing-container'));

      function bouncy_filter(container) {
        container.each(function(){
          var pricing_table = $(this);
          var filter_list_container = pricing_table.children('.pricing-switcher'),
            filter_radios = filter_list_container.find('input[type="radio"]'),
            pricing_table_wrapper = pricing_table.find('.pricing-wrapper');

          //store pricing table items
          var table_elements = {};
          filter_radios.each(function(){
            var filter_type = $(this).val();
            table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
          });

          //detect input change event
          filter_radios.on('change', function(event){
            event.preventDefault();
            //detect which radio input item was checked
            var selected_filter = $(event.target).val();

            //give higher z-index to the pricing table items selected by the radio input
            show_selected_items(table_elements[selected_filter]);

            //rotate each pricing-wrapper
            //at the end of the animation hide the not-selected pricing tables and rotate back the .pricing-wrapper

            if( !Modernizr.cssanimations ) {
              hide_not_selected_items(table_elements, selected_filter);
              pricing_table_wrapper.removeClass('is-switched');
            } else {
              pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                hide_not_selected_items(table_elements, selected_filter);
                pricing_table_wrapper.removeClass('is-switched');
                //change rotation direction if .pricing-list has the .bounce-invert class
                if(pricing_table.find('.pricing-list').hasClass('bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
              });
            }
          });
        });
      }
      function show_selected_items(selected_elements) {
        selected_elements.addClass('is-selected');
      }

      function hide_not_selected_items(table_containers, filter) {
        $.each(table_containers, function(key, value){
          if ( key != filter ) {
            $(this).removeClass('is-visible is-selected').addClass('is-hidden');

          } else {
            $(this).addClass('is-visible').removeClass('is-hidden is-selected');
          }
        });
      }
    },
    computed: {},
    methods: {
      selectPlan: function (item) {
        this.$store.commit('profile/setPlan', item);
        if(item.advanced) {
          this.$router.push({name: `facility-profile-id`, params: {id: this.$route.params.id}})
        } else {
          this.$router.push({name: 'facility-profile-add-checkout'})
        }
      }
    }
  }
</script>
