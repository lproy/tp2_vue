<script setup>
import ProductDetails from '@/components/ProductDetails.vue';
</script>


<script>

export default {

  props: {
    // Utilisez le paramètre de route pour obtenir l'ID du produit
    id: {
      type: String,
      required: true,
    }
  },
  computed: {
    // Utilisez un getter computed pour obtenir le produit correspondant à l'ID
    product() {
      return this.products.find(product => product.id === parseInt(this.id));
    }
  }
}

</script>

<template>
  <ProductDetails :product="product()" />
</template>

<style scoped>

</style>
