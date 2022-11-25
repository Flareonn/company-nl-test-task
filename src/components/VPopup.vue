<script>
export default {
  name: "VPopup",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
      document.body.classList.add("modal-open");

      window.onkeydown = (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      };
    },
    close() {
      this.isOpen = false;
      document.body.classList.remove("modal-open");

      window.onkeydown = null;
    },
  },
  expose: ["open", "close"],
};
</script>
<template>
  <Teleport to="body" v-if="isOpen">
    <div ref="popup" class="modal" v-bind="$attrs">
      <div class="modal-close" @click="close">&#10005;</div>
      <slot></slot>
    </div>
  </Teleport>
</template>
