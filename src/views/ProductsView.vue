<script setup>
import ProductList from '@/components/ProductList.vue';
</script>
<script>

export default {
  props: {
    nom: {
      type: String
    }
  },
  data() {
    return {
      id: 1,
      products: null
    }
  },
  methods : {
    async fetchData() {
      const response = await fetch('http://storerestservice.azurewebsites.net/api/products/');
      this.products = await response.json();
    }
  },
  created () { // aura lieu au chargement du component
    this.fetchData();
  },
}
</script>

<template>
  <main>
    <ProductList :products="products" :page-size="5" />
  </main>
</template>
<style scoped>

</style>