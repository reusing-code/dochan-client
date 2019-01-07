import Vue from 'vue';
import Vuex from 'vuex';
import fuel from '@/store/modules/fuel.js';
import * as notification from '@/store/modules/notification.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fuel,
    notification
  },
  state: {}
});
