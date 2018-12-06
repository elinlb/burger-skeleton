<template>
<!--<div class="row">-->
<div id="orders">
  <div class ="column left">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <div>
    <OrderItemToPrepare
      v-for="(order, key) in orders"
      v-if="order.status !== 'done'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order"
      :ui-labels="uiLabels"
      :lang="lang"
      :key="key">
    </OrderItemToPrepare>
  </div>
</div>
<div class="column right">
  <button id="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>
  <div class="rowa">
  <h1>{{ uiLabels.ordersFinished }}</h1>
  <div>
    <OrderItem
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>
</div>
<div class="rowb">
  <h1>{{ uiLabels.ordersToFry }}</h1>
  {{uiLabels.beenPatty}}: {{countBeanPatty}} {{uiLabels.pieces}}<br>
  {{uiLabels.beef100g}}: {{countBeef100}} {{uiLabels.pieces}}<br>
  {{uiLabels.beef200g}}: {{countBeef200}} {{uiLabels.pieces}}<br>
  {{uiLabels.chickenPatty}}: {{countChickenPatty}} {{uiLabels.pieces}}<br>
  {{uiLabels.deepFriedHalloumi}}: {{countDeepFriedHalloumi}} {{uiLabels.pieces}}<br>
  {{uiLabels.fishFilet}}: {{countFishFilet}} {{uiLabels.pieces}}<br>
  {{uiLabels.grilledEggplant}}: {{countGrilledEggplant}} {{uiLabels.pieces}}<br>
  {{uiLabels.lobster}}: {{countLobster}} {{uiLabels.pieces}}<br>
  {{uiLabels.pulledJackfruit}}: {{countPulledJackfruit}} {{uiLabels.pieces}}<br>
  {{uiLabels.pulledPork}}: {{countPulledPork}} {{uiLabels.pieces}}<br>
</div>
</div>
</div>
<!--</div>-->
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0
    }
  },
  computed: {
    countBeanPatty: function() {
      return this.countNumberOfIngredients(1)
    },
    countBeef100: function() {
      return this.countNumberOfIngredients(2)
    },
    countBeef200: function() {
      return this.countNumberOfIngredients(3)
    },
    countChickenPatty: function() {
      return this.countNumberOfIngredients(4)
    },
    countDeepFriedHalloumi: function() {
      return this.countNumberOfIngredients(5)
    },
    countFishFilet: function() {
      return this.countNumberOfIngredients(6)
    },
    countGrilledEggplant: function() {
      return this.countNumberOfIngredients(7)
    },
    countLobster: function() {
      return this.countNumberOfIngredients(8)
    },
    countPulledJackfruit: function() {
      return this.countNumberOfIngredients(9)
    },
    countPulledPork: function() {
      return this.countNumberOfIngredients(10)
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    countNumberOfIngredients: function(id) {
      let counter = 0;
      for (let order in this.orders) {
        for (let i = 0; i < this.orders[order].ingredients.length; i+= 1) {
          if (this.orders[order].ingredients[i].ingredient_id === id) {
            counter += 1;
          }
        }
      }
      return counter;
    }
  }
}
</script>
<style scoped>
	#orders {
    font-size:16pt;
    max-width: 100%;
    height: auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .flexcontainer {
    color: red;
    background-color: blue;
    display:inline-table;
    flex-direction:row;
    border: 5px solid black; /*Pixlar???*/
    margin: 0.9%;
    height: auto;
    width: 28%;

  }

  .column {
    float:left;
    /*width: 50%;*/
  }
  .left {
  width: 65%;
  }

  .right {
  width: 35%;
  height: 100vh;
  }

  .rowa {
      height: 50%;
      background-color: green;
  }

  .rowb {
    height: 50%;
    background-color: pink;
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  #languageButton {
    position: fixed;
    top: 0;
    right: 0;
  }

  button:hover {
    background-color: blue;
  }



</style>
