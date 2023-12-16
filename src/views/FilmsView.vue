<template>
  <FilmList :films="films" :page-size="10"></FilmList>
</template>

<script>
import FilmList from "@/components/FilmList.vue";
import { getAllFilms } from '@/services/Filmservice.js';

export default {
  components: {
    FilmList,
  },
  data() {
    return {
      films: []
    }
  },
  mounted() {
    getAllFilms().then(response => this.films = response.results);
  },
};
</script>
