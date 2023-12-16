<template>
  <main>
    <h1>Accueil</h1>
    <section class="welcome">
      <p>Bienvenue sur notre site de critiques de films ! Découvrez les derniers films et partagez vos avis.</p>
    </section>
    <section class="recent-films">
      <FilmRecent :films="recentFilms" :page-size="3"></FilmRecent>
    </section>
  </main>
</template>

<script>
import {getAllFilms} from "@/services/FilmService";
import FilmRecent from "@/components/FilmRecent.vue";

export default {
  components: {
    FilmRecent,
  },
  data() {
    return {
      recentFilms: []
    }
  },
  mounted() {
    getAllFilms().then(response => {
      this.recentFilms = response.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(0, 3);
      console.log( response.results)
    });
  },
};
</script>

<style lang="css" scoped>

</style>

