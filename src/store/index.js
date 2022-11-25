import { defineStore } from "pinia";
import useCatalogService from '@/composables/catalog.service';
const catalogService = new useCatalogService()
export default defineStore({
  id: "main",
  state: () => ({
    currentCity: JSON.parse(localStorage.getItem('currentCity')) || null,
    categories: [],
  }),
  actions: {
    setCity(city) {
      this.currentCity = city
      localStorage.setItem("currentCity", JSON.stringify(city))
      this.fetchCategories();
    },
    async fetchCategories() {
      this.categories = await catalogService.getCategories(this.currentCity.id);
    }
  },
  getters: {
    currentCategory() {
      return (slug) => this.categories.find(category => category.slug === slug);
    }
  }
});
