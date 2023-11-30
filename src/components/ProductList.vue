<template>
  <div>
    <h2>{{ title }}</h2>
    <fieldset class="filters">
      Trier par:
      <button @click="sort('name')">Nom</button>
      <button @click="sort('price')">Prix</button>
      <button @click="sort('modifiedDate')">Date</button>
      <span>Recherche par nom: <input v-model="filterName"/></span>
    </fieldset>
    <button @click="previousPage" :disabled="pageNumber===1">
      &lt; Précédent
    </button>
    Page {{ pageNumber }}
    <button @click="nextPage" :disabled="pageNumber >= pageCount">
      Suivant &gt;
    </button>
    <ul class="products">
      <li v-for="product in sortedFilteredPaginatedProducts" v-bind:key="product.id"
          v-bind:class='{ discontinued: product.discontinued, selected: selectedProduct === product }'
          @click="selectedProduct = product"
          :title="JSON.stringify(product)">
<!--        <router-link :to="{ name: 'productDetailsView', params: { id: product.id }}">-->
          <span class="name">{{ product.name }}</span>
          <span class="description">{{ product.description }}</span>
          <span class="price">{{ product.price }}</span>
<!--        </router-link>-->
      </li>
    </ul>
            <ProductDetails :product="selectedProduct" />
  </div>
</template>

<script>
import ProductDetails from '@/components/ProductDetails.vue';
import {RouterLink} from "vue-router";

export default {
  components: {
    RouterLink,
    ProductDetails,
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      required: false,
      default: 5
    },
  },
  data() {
    return {
      title: "Liste des produits",
      selectedProduct: null,
      pageNumber: 1,
      filterName: '',
      sortName: 'modifiedDate',
      sortDir: 'asc',
    }
  },
  methods: {
    sort: function (fieldToSort) {
      if (fieldToSort === this.sortName) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      }
      this.sortName = fieldToSort;
    },
    nextPage() {
      this.pageNumber++;
      this.selectedProduct = null;
    },
    previousPage() {
      this.pageNumber--;
      this.selectedProduct = null;
    },
  },
  computed: {
    filteredProducts() {
      let filter = new RegExp(this.filterName, 'i')
      return this.products.filter(elem => elem.name.match(filter))
    },
    sortedFilteredProducts() {
      return this.filteredProducts.sort((a, b) => {
        //return [...this.filteredProducts].sort((a,b) => {
        let modifier = 1;
        if (this.sortDir === 'desc') modifier = -1;
        if (a[this.sortName] < b[this.sortName]) return -1 * modifier;
        if (a[this.sortName] > b[this.sortName]) return 1 * modifier;
        return 0;
      })
    },
    sortedFilteredPaginatedProducts() {
      const start = (this.pageNumber - 1) * this.pageSize,
          end = start + this.pageSize;

      return this.sortedFilteredProducts.slice(start, end);
    },
    pageCount() {
      let nbProducts = this.products.length;
      return Math.ceil(nbProducts / this.pageSize);
    }
  },
  watch: {
    // reset pagination when filtering
    filterName() {
      this.pageNumber = 1;
    },
    // reset pagination when sorting
    sortName() {
      this.pageNumber = 1;
    },
    sortDir() {
      this.pageNumber = 1;
    }
  }
}
</script>

<style lang="css" scoped>
.filters {
  padding: 10px;
  margin-bottom: 10px;
}

.filters button {
  margin: 3px;
}

.filters span {
  margin: 10px;
}

.products {
  margin: 0;
  list-style-type: none;
  padding: 0;
}

.products li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0em;
  height: 1.8em;
  border-radius: 4px;
}

.products li:hover {
  color: #607D8B;
  background-color: yellow;
  left: .1em;
}

.products li:hover .name,
.products li:hover .price {
  color: #607D8B;
  background-color: #FFD800;
  left: .1em;
}

.products li.selected {
  background-color: #0094FF;
  color: white;
}

.products li.selected:hover {
  color: white;
}

.products li.selected .name,
.products li.selected .price {
  background-color: #0026FF;
  color: white;
}

.products .text {
  position: relative;
  top: -3px;
}

.products .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products .price {
  float: right;
  width: 20%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: .8em;
  border-radius: 0px 4px 4px 0px;
}

.products .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.products .discontinued, .products .discontinued * {
  color: red !important;
}
</style>