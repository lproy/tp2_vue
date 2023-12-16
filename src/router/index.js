import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/films",
      name: "films",
      component: () => import("../views/FilmsView.vue"),
    },
    {
      path: "/films&idGenre=:idGenre",
      name: "filmsGenre",
      component: () => import("../views/FilmsView.vue"),
      props: castRouteParamsGenre
    },
    {
      path: "/film/:id",
      name: "film",
      component: () => import("../views/FilmDetailsView.vue"),
      props: castRouteParams
    },
  ],
});

function castRouteParams(route) {
  return {
    id: Number(route.params.id),
  };
}
function castRouteParamsGenre(route) {
  return {
    idGenre: Number(route.params.idGenre),
  };
}

export default router;
