import Vue from 'vue';
import Vuex from 'vuex';
import Storage from 'vue-web-storage';

Vue.use(Vuex);
Vue.use(Storage);

export default new Vuex.Store({
  state: {
    user: Vue.$localStorage.get('user'),
    clientes: Vue.$localStorage.get('clientes', []),
    isLogged: Vue.$localStorage.get('isLogged', false),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      Vue.$localStorage.set('user', payload);
    },
    setClientes(state, payload) {
      state.clientes = payload;
      Vue.$localStorage.set('clientes', payload);
    },
    setUserLogged(state, payload) {
      state.isLogged = payload;
      Vue.$localStorage.set('isLogged', payload);
    },
  },
  actions: {
  },
  modules: {
  },
});
