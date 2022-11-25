<script>
export default {
  name: "VInputSearch",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    tips: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["update:modelValue", "update:tip"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    onClear() {
      this.$emit("update:modelValue", "");
      this.$emit("update:tip", null);
      this.close();
    },
    onSelect(value, item) {
      this.$emit("update:modelValue", value);
      this.$emit("update:tip", item);
      this.close();
    },
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
  },
  mounted() {
    window.onclick = (e) => {
      if (!e.target.contains(this.$refs.search)) {
        this.close();
      }
    };
  },
  unmounted() {
    window.onclick = null;
  },
};
</script>
<template>
  <div class="v-input-search" ref="inputSearch">
    <div class="wrapper" :class="{ open: isOpen }">
      <input
        ref="search"
        type="search"
        v-bind="$attrs"
        :value="modelValue"
        @focus="open"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        class="v-input-search__cancel"
        v-show="isOpen"
        @click.prevent="onClear"
      >
        &#10005;
      </button>
    </div>
    <ul v-show="isOpen" class="v-input-search__autocomplete">
      <li v-if="!tips.length">Ничего не найдено!</li>
      <li
        v-else
        v-for="(tip, idx) in tips"
        @click="(e) => onSelect(e.target.textContent, tip)"
        :key="idx"
      >
        <slot name="tips" :tip="tip"></slot>
      </li>
    </ul>
  </div>
</template>
