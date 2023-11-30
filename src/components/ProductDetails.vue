<template>
    <div v-if="product">
        <h2>{{product.name}}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://placeimg.com/200/200/tech'" width="200" style="float:right" />
        <h3>{{product.description}}</h3>
        <p>Prix: {{product.price}}</p>
        <p>Prix fixe? {{product.fixedPrice}}</p>
        <p>Discontinué? {{product.discontinued}}</p>
        <p>Date de modification: {{product.modifiedDate }}</p>
    </div>
</template>

<script>

    export default {
        props: {
            product: {
                type: Object,
                default: null
            },
        },
    }
</script>

<style scoped>

</style>