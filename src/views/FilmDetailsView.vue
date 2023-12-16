<template>
  <h1></h1>
  <h2>{{ film.title}}</h2>
  <p class="description">{{ film.overview}}</p>
  <p>Note: {{film.vote_average}}</p>
  <p>Durée: {{ film.runtime }}</p>
  <p>L’année de parution: {{ film.release_date }}</p>
  <a v-bind:href="film.homepage">Un lien vers le site officiel du film</a>
</template>

<script>
import {getFilm} from '@/services/Filmservice.js';

export default {
  data() {
    return {
      film: Object,
    };
  },
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    getFilm(this.id).then(response => this.film = response);
  },
};
</script>

<style lang="css" scoped>
.description{
  max-width: 400px;
}
</style>
