<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <fieldset class="filters">
      Trier par:
      <button @click="sort('title')">Nom</button>
      <button @click="sort('price')">Prix</button>
      <button @click="sort('release_date')">Date</button>
      <span>Recherche par nom: <input v-model="filterName"/></span>
    </fieldset>
    <button @click="prevPage" :disabled="pageNumber === 1">
      &lt; Previous
    </button>
    Page {{ pageNumber }}
    <button @click="nextPage" :disabled="pageNumber >= pageCount">
      Next &gt;
    </button>
    <ul class="films">
      <li
          v-for="film in sortedFilteredPaginatedfilms"
          :key="film.id"
          v-bind:class="{
          discontinued: film.discontinued,
          selected: selectedfilm === film,
        }"
          @click="onSelect(film)"
      >

        <img
            :src="imageBaseUrl + 'w200' + film.poster_path"
            width="200"
        />
        <span class="name">{{ film.title }}</span>
        <span class="release_date">{{ film.release_date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    films: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  data() {
    return {
      title: "Films",
      selectedfilm: null,
      pageNumber: 1,
      filterName: '',
      sortName: 'release_date',
      sortDir: 'asc',
      imageBaseUrl: 'https://image.tmdb.org/t/p/', // Ajoutez le préfixe de base ici
    };
  },
  computed: {
    filteredfilms() {
      let filter = new RegExp(this.filterName, 'i')
      return this.films.filter(elem => elem.title.match(filter))
    },
    sortedFilteredfilms() {
      return this.filteredfilms.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === 'desc') modifier = -1;
        if (a[this.sortName] < b[this.sortName]) return -1 * modifier;
        if (a[this.sortName] > b[this.sortName]) return modifier;
        return 0;
      })
    },
    sortedFilteredPaginatedfilms() {
      const start = (this.pageNumber - 1) * this.pageSize,
          end = start + this.pageSize;

      return this.sortedFilteredfilms.slice(start, end);
    },
    pageCount() {
      let nbfilms = this.films.length;
      return Math.floor(nbfilms / this.pageSize);
    },
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
      this.selectedfilm = null;
    },
    prevPage() {
      this.pageNumber--;
      this.selectedfilm = null;
    },
    onSelect(film) {
      this.$router.push({name: "film", params: {id: film.id}});
    },
  },
};
</script>

<style lang="css" scoped>
.films {
  margin: 0;
  list-style-type: none;
  padding: 0;
}

.films li {
  cursor: pointer;
  position: relative;
  left: 0;
  height: 100%;
  background-color: #eee;
  margin: 0.5em;
  padding: 0.3em 0em;
  //height: 1.8em;
  border-radius: 4px;
}

.films li:hover {
  color: #607d8b;
  background-color: yellow;
}

.films li:hover .name,
.films li:hover .price {
  color: #607d8b;
  background-color: #ffd800;
}

.films li.selected {
  background-color: #0094ff;
  color: white;
}

.films li.selected:hover {
  color: white;
}

.films li.selected .name,
.films li.selected .price {
  background-color: #0026ff;
  color: white;
}

.films .text {
  position: relative;
  top: -3px;
}

.films .name {
  display: inline-block;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: 0.8em;
  border-radius: 4px 0px 0px 4px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.films .price {
  float: right;
  width: 15%;
  color: white;
  padding: 0.5em 0.7em 0em 0.7em;
  background-color: #607d8b;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-left: 0.8em;
  border-radius: 0px 4px 4px 0px;
}

.films .description {
  height: 1.8em;
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.films .discontinued,
.films .discontinued * {
  color: red !important;
}
</style>
