import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Homepage from './views/Homepage.vue'
import Sides from './views/Sides.vue'
import Basket from './views/Basket.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/ordering',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/sides',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'sides',
      component: Sides
    },
    {
      path: '/basket',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'basket',
      component: Basket
    },

    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
