<script>
import VPopup from "@/components/VPopup.vue";
import VInputSearch from "@/components/controls/VInputSearch.vue";

import useCatalogService from "@/composables/catalog.service";
import useDebounce from "@/composables/debounce";
import useStore from "@/store";
export default {
  name: "VHeader",
  components: {
    VPopup,
    VInputSearch,
  },
  setup() {
    const catalogService = new useCatalogService();
    const store = useStore();

    return {
      catalogService,
      store,
    };
  },
  data() {
    const searchDebounce = useDebounce(async (value) => {
      this.tips = await this.catalogService.getTipsCities(value);
    }, 1000);
    return {
      tips: [],
      search: "",
      selectedTip: null,
      searchDebounce,
    };
  },
  methods: {
    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    onSubmit() {
      this.store.setCity(this.selectedTip);
      this.selectedTip = null;
      this.search = "";
      this.tips = [];
      this.closePopup();
    },
  },
  computed: {
    city() {
      return this.store.currentCity
        ? this.store.currentCity.city
        : "Выберите город";
    },
  },
  watch: {
    search(value) {
      this.searchDebounce(value);
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-geo" @click="openPopup">
        <img src="@/assets/images/geo.svg" alt="location" />
        <span>{{ city }}</span>
      </div>
    </div>
  </header>
  <v-popup ref="popup" class="modal-geo">
    <form class="modal-form" @submit.prevent="onSubmit">
      <div class="modal-form-item">
        <label for="geo" class="modal-form-item__label">
          Выбор населённого пункта:
        </label>
        <v-input-search
          id="geo"
          v-model="search"
          placeholder="Например, Санкт-петербург"
          v-model:tip="selectedTip"
          :tips="tips"
        >
          <template #tips="{ tip }">
            {{ tip.label }}
          </template>
        </v-input-search>
      </div>
      <button type="submit" class="btn" :disabled="!selectedTip">
        Подтвердить
      </button>
    </form>
  </v-popup>
</template>
