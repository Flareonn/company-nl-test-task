<script>
import useStore from "@/store";

export default {
  name: "IndexPage",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<template>
  <main class="categories">
    <div class="container">
      <h1 class="categories__title">Категории товаров</h1>
      <ul class="categories-list">
        <li
          class="categories-list-item"
          v-for="(category, idx) in store.categories"
          :key="idx"
          :style="{ backgroundImage: `url(${category.image})` }"
        >
          <span
            class="categories-list-item__name"
            :style="{ color: category.text_color }"
            >{{ category.name }}</span
          >
          <router-link
            :to="`/category/${category.slug}`"
            class="categories-list-item__link"
          ></router-link>
        </li>
      </ul>
    </div>
  </main>
</template>
