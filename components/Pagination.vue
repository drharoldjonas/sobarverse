<template>
    <span>
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" @click="navPage(1)" v-if="pages[0] != 1" aria-label="Next">
                    <span aria-hidden="true">&laquo; &laquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="navPrevious" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" :class="{'active':(p-1) == $parent.page}" v-for="p in pages" :key="p">
                <a class="page-link" @click="navPage(p)" :aria-label="p">
                    <span aria-hidden="true">{{p}}</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="navNext" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="navPage(numPages)" v-if="pages[pages.length -1] != numPages" aria-label="Next">
                    <span aria-hidden="true">&raquo; &raquo;</span>
                </a>
            </li>

        </ul>
    </span>
</template>

<style scoped>
  .pagination {
    flex-wrap: wrap;
    float: right;
  }
  .page-item.active .page-link {
    background-color: #004dda;
    border-color: #004dda;
  }
</style>

<script>
  export default {
    props: ["source", "max", "page"],
    created: function() {},
    mounted: function() {
      this.$nextTick(function() {
        this.draw();
      });
    },
    watch: {
      source: function() {
        this.draw();
      },
      page: function() {
        this.draw();
      }
    },
    data: function() {
      return {
        start: 0,
        display: 25,
        pages: [],
        numPages: 0,
      };
    },
    methods: {
      draw: function() {
        console.log("Drawing Array");
        var pages = Math.ceil(this.source / Number(this.max));
        if (pages <= 0) {
          pages = 1;
        }
        this.numPages = pages;

        var pages_to_show = Number(this.display);
        var pages_to_show_minus_1 = pages_to_show - 1;
        var start_page = Number(this.page) < (pages_to_show - 2) ? 0 : Number(this.page);
        var max_page = pages;
        var end_page = pages;

        if (end_page - start_page != pages_to_show_minus_1) {
          end_page = start_page + pages_to_show_minus_1;
        }

        if (end_page > max_page) {
          start_page = max_page - pages_to_show_minus_1;
          end_page = max_page;
        }

        this.start = start_page;

        this.pages = [];
        for (var i = start_page; i <= end_page; i++) {
          if (i - 1 >= 0) this.pages.push(i);
        }
      },
      navPrevious: function() {
        if (this.page - 1 > -1) {
          this.$emit("update", this.page, this);
          this.draw();
        }
      },
      navNext: function() {
        var pages = Math.ceil(this.source / Number(this.max));
        if (this.page + 1 < pages) {
          this.$emit("update", this.page + 2, this);
          this.draw();
        }
      },
      navPage: function(n) {
        this.$emit("update", n, this);
        this.draw();
      },
      navLast: function() {
        var pages = Math.ceil(this.source / Number(this.max));
        if (this.page + 1 < pages) {
          this.$emit("update", pages, this);
          this.draw();
        }
      }
    }
  }
</script>
