<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <fieldset class="filters">
      Trier par:
      <button @click="sort('title')">Nom</button>
      <button @click="sort('release_date')">Date de sortie</button>

      <label for="genreSelect">Genre:</label>
      <select v-model="selectedGenre" @change="onSelectGenre(selectedGenre)" id="genreSelect">
        <option value="">Tous les genres</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>

      <span>Recherche par nom: <input v-model="filterName"/></span>
    </fieldset>
    <button @click="prevPage" :disabled="pageNumber === 1">
      &lt; Previous
    </button>
    Page {{ pageNumber }}
    <button @click="nextPage" :disabled="pageNumber >= pageCount">
      Next &gt;
    </button>

    <div v-if="sortedFilteredfilms.length !== 0">
      <p>Nombre de films: {{ sortedFilteredfilms.length }}</p>
      <!-- Render additional content for films found -->
    </div>
    <div v-else>
      <h3>On ne trouve aucun film répondant au(x) critère(s) de recherche</h3>
    </div>

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
            alt=""/>
        <span class="name">{{ film.title }}</span>
        <span class="release_date">{{ film.release_date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAllGenres, getMoviesByGenre} from '@/services/Filmservice.js';

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
      selectedGenre: '',
      genres: [],
    };
  },
  mounted() {
    getAllGenres().then(response => this.genres = response.genres);
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
      let nbfilms = this.sortedFilteredfilms.length;
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
    onSelectGenre(idGenre) {
      if (idGenre) {
        this.$router.push({name: "filmsGenre", params: {idGenre: idGenre}});
      } else {
        this.$router.push({name: "films"});
      }
    },
  },
};
</script>

<style lang="css" scoped>
.films {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0;
  list-style-type: none;
  padding: 0;
}

.films li {
  height: 390px;
  padding: 0.7em;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #eee;
  margin: 0.5em;
  border-radius: 4px;
}

.films li:hover {
  color: #181818;
  background-color: white;
  outline: 1px solid #E50914;
}

.films li:hover .name {
  color: white;
  background-color: #E50914;
}

.films li.selected {
  background-color: #0094ff;
  color: white;
}

.films li.selected:hover {
  color: white;
}

.films li.selected .name {
  background-color: #0026ff;
  color: white;
}


.films .name {
  display: inline-block;
  color: white;
  padding: 0.7em;
  background-color: #181818;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



.films .discontinued,
.films .discontinued * {
  color: red !important;
}
button{
  background: #E50914;
  padding: 7px;
  margin:10px;
  border-radius: 10px;
  color: white;
  border: none;
  &:disabled{
    background: #73060b;
  }
  &:hover{
    transition: 300ms;
    color: #181818;
    background: #f84853;
  }
}
</style>
