<script>
import VHeader from "@/components/VHeader.vue";

export default {
  name: "App",
  components: {
    VHeader,
  },
};
</script>

<template>
  <v-header />
  <router-view />
</template>

<style></style>
