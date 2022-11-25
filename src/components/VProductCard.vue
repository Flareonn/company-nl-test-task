<script>
class Product {
  constructor(product) {
    this.image = product.main_image_thumb_300;
    this.category = product.category.name;
    this.present = product.present_name;
    this.comment = product.comment_name;
    this.price = product.price;
    this.available = product.allowed && product.available;
  }
}
export default {
  name: "VProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    normalizedProduct() {
      return new Product(this.product);
    },
  },
};
</script>
<template>
  <div class="product-card">
    <div class="product-card-thumb">
      <img :src="normalizedProduct.image" alt="" />
    </div>
    <div class="product-card-description">
      <span class="product-card__category-name">{{
        normalizedProduct.category
      }}</span>
      <h3 class="product-card__name">{{ normalizedProduct.present }}</h3>
      <span class="product-card__comment">{{ normalizedProduct.comment }}</span>
      <span class="product-card__price"
        >{{ normalizedProduct.price }}&#8381;</span
      >
      <button
        v-if="!normalizedProduct.available"
        class="btn product-card__buy"
        disabled
      >
        Нет в наличии
      </button>
      <button v-else class="btn product-card__buy">В корзину</button>
    </div>
  </div>
</template>
