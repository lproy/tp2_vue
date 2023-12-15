<template>
  <ProductList :products="products" :page-size="5"></ProductList>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { getAllProducts } from '@/services/ProductService.js';

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      products: []
    }
  },
  mounted() {
    getAllProducts().then(response => this.products = response);
  },
};
</script>
