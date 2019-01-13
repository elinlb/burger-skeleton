import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    uiLabels: {},
    lang: "en",
    // counter: int,
    currentOrder: {
      burgers: []
    }
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
    },
    // storeCounter: function (store, counter) {
    //   store.counter = counter;
    // },
    addToCurrentBurger: function (store, burgers) {
      store.currentOrder.burgers.push(burgers);

    //addToCurrentBurger: function (store, ingredient) {
   },
   clearOrder: function (store){
     store.currentOrder = {
       burgers: []
     };
   }
  },
  actions: {


}
})
