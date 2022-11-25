<script>
import useCatalogService from "@/composables/catalog.service";
import useStore from "@/store";
import VProductCard from "@/components/VProductCard.vue";

export default {
  components: { VProductCard },
  name: "CategoryPage",
  setup() {
    const { getCategoryProducts } = new useCatalogService();
    const store = useStore();

    return {
      getCategoryProducts,
      store,
    };
  },
  data() {
    return {
      products: [],
    };
  },
  watch: {
    "store.currentCity"() {
      this.fetchProducts(this.$route.params.pathMatch);
    },
    "$route.params.pathMatch": {
      handler(category) {
        this.fetchProducts(category);
      },
      immediate: true,
    },
  },
  computed: {
    currentCategory() {
      return this.store.currentCategory(this.$route.params.pathMatch.at(0));
    },
  },
  methods: {
    async fetchProducts(category) {
      this.products = await this.getCategoryProducts(category.at(-1));
    },
  },
};
</script>
Z
<template>
  <div class="category-page">
    <div class="container">
      <div class="category-page__title" @click="() => $router.push('/')">
        <h1>
          <img src="@/assets/images/back.svg" alt="Назад" />
          <span>{{ currentCategory?.name }}</span>
        </h1>
      </div>
    </div>
    <div class="container category-page-catalog">
      <aside
        class="category-page-sidebar"
        v-if="currentCategory?.children.length >= 2"
      >
        <ul>
          <li>
            <router-link :to="`/category/${$route.params.pathMatch[0]}`"
              >Все продукты</router-link
            >
          </li>
          <li v-for="category in currentCategory?.children" :key="category.id">
            <router-link
              :to="`/category/${$route.params.pathMatch[0]}/${category.slug}`"
              >{{ category.name }}</router-link
            >
          </li>
        </ul>
      </aside>
      <main class="category-page-main">
        <v-product-card
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
      </main>
    </div>
  </div>
</template>
