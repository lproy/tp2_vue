<template>
  <FilmList :films="films" :page-size="10"></FilmList>
</template>

<script>
import FilmList from "@/components/FilmList.vue";
import {getAllFilms, getMoviesByGenre} from '@/services/Filmservice.js';

export default {
  components: {
    FilmList,
  },
  data() {
    return {
      films: []
    }
  },
  props: {
    idGenre: {
      type: Number,
    },
  },
  mounted() {
    getAllFilms().then(response => this.films = response.results);
  },
  watch: {
    idGenre: function (newGenre) {
      getMoviesByGenre(newGenre).then(movies => this.films = movies.results);
    },
  },
};
</script>
