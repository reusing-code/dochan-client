import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DocumentShow from './views/DocumentShow.vue';
import DocumentList from './views/DocumentList.vue';
import DocumentSearch from './views/DocumentSearch.vue';
import RefuelList from './views/RefuelList.vue';
import RefuelInput from './views/RefuelInput.vue';
import NProgress from 'nprogress';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/document',
      name: 'document-list',
      component: DocumentList,
      props: true
    },
    {
      path: '/search/:query',
      name: 'document-search',
      component: DocumentSearch,
      props: true
    },
    {
      path: '/document/:id',
      name: 'document-show',
      component: DocumentShow,
      props: true
    },
    {
      path: '/fuel',
      name: 'refuel-list',
      component: RefuelList,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('fuel/fetchRecords', {
            perPage: 10,
            page: parseInt(routeTo.query.page) || 1
          })
          .then(() => {
            next();
          });
      }
    },
    {
      path: '/fuel/new',
      name: 'refuel-input',
      component: RefuelInput,
      props: true
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
