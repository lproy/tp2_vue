<template>
  <ProductList :products="products" :page-size="10"></ProductList>
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
    getAllProducts().then(response => {
      this.products = response.results;
      console.log('Liste des produits :',response.results);
    });
    // getAllProducts().then(response => this.products = response);
  },
};
</script>
