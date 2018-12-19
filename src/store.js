import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    uiLabels: {},
    lang: "en",
    // currentOrder.burgers: []
    // //currentOrder burgers

  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    setUiLabels: function (store, labels) {
      store.uiLabels = labels;
    },
    switchLang: function (store, lang) {
      store.lang = lang;
    // },
    // addToCurrentBurger: function (store, ingredient) {
    //   store.currentOrder.burgers = burgers;
    //
    // //addToCurrentBurger: function (store, ingredient) {

  }
},
  actions: {


}
})
