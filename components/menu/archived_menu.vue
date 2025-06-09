<template>
  <draggable tag="div" v-bind="dragOptions" handle=".handle" :list="list" :value="value" class="list-group" @input="emitter">
    <a class="list-group-item list-group-item-action" :id="menu.id" @dblclick="modify({menu: 'passive_menu', id: $event.target.id})" v-for="menu in realValue" :key="menu.id">
      <span>{{ menu.label }}</span>
      <i class="ti icon-arrow-combo handle" style="cursor: grab;"></i>
      <nav-menu v-if="(Array.isArray(menu.sub_elements) && menu.sub_elements.length === 0) || (menu.sub_elements && menu.sub_elements.length > 0)" class="list-group-item list-group-item-action" :list="menu.sub_elements" />
    </a>
  </draggable>
</template>

<script>

export default {
  name: "navMenu",
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  },
  computed: {
    dragOptions() {
      return {
        group: "label"
      };
    },
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  methods: {
    modify(obj) {
      this.$emit('edit', obj)
    },
    emitter(value) {
      this.$emit("input", value);
    }
  },
}
</script>

<style scoped>
  .handle {
    float: right;
  }
</style>
