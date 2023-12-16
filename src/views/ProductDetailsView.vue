<template>
  <h1>Id: {{ id }}</h1>
  <h2>{{ product.original_title }}</h2>
  <img
      :src="product.imageUrl ? product.imageUrl : 'https://placeimg.com/200/200/tech'" width="200"  style="float: right" />
  <h3>{{ product.description }}</h3>
  <p>Prix: {{ product.price }}</p>
  <p>Prix fixe? {{ product.fixedPrice }}</p>
  <p>Discontinué? {{ product.discontinued }}</p>
  <p>Date de modification: {{ product.modifiedDate }}</p>
</template>

<script>
import { getProduct } from '@/services/ProductService.js';

export default {
  data() {
    return {
      product: Object,
    };
  },
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    getProduct(this.id).then(response => this.product = response);
  },
};
</script>

<style lang="css" scoped></style>
