import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from "@/views/AccueilView.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/products',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductsView.vue')
    },
    {
      /* ProductDetails sera appelé dans <RouterView> de ProductsHome
      lorsque la route est /products/:id */
      path: '/product/:id',
      name: 'productDetailsView',
      component: ProductDetailsView,
      props: true
    }
  ]
})

export default router
