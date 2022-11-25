import axios from 'axios';
import { CacheFacadeService } from "@/composables/cache.service"

const cachedProducts = new CacheFacadeService();
const cachedCategories = new CacheFacadeService();

export default class CatalogService {
  async getTipsCities(term) {
    if (term.length >= 3) {
      // В Техническом задании не было уточнено про количество отображаемых элементов
      // в выпадающем списке. Из-за чего принято решение отображать первые 5 элементов
      return (await axios.get(`/api/city/?term=${term}&country=ru`)).data.data.slice(0, 5)
    } else {
      return Promise.resolve([])
    }
  }
  async getCategories(cityId) {
    if (!cityId) return Promise.reject("Отсутствует id города");

    return await cachedCategories.request(cityId, () => axios.get(`/api/menutags/?city_id=${cityId}`).then((resp) => resp.data.tags))
  }
  async getCategoryProducts(slug) {
    if (!slug) return Promise.reject("Отсутствует slug");

    return await cachedProducts.request(slug, () => axios.get(`/api/menutags/${slug}/`).then(resp => resp.data.products))
  }
}