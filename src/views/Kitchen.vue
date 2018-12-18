<template>
<div id="orders">
  <img class="background-kitchen" src="@/assets/brick.jpg">
<button id="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>

  <!-- <div v-for="countIng in countAllIngredients"
      v-if="countIng.count>0"
      :key="countAllIngredients.indexOf(countIng)">
    {{countIng.name}}: {{countIng.count}}
  </div> -->


  <div class ="column left">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <div class="order-wrapper">
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
  <router-link :to="{ name: 'stock' }">
  <button id="stockButton"><img src="@/assets/stock.png" width="50vw">{{uiLabels.stock}}</button>
  </router-link>
</div>
<div class="column right">

  <div class="rowa">
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
<div class="rowb">
  <div>
    <h1>{{ uiLabels.ordersFinished }}</h1>
    <!--<OrderItem
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>-->

  <div v-for="order in orders" v-if="order.status ==='done' " :key="order.orderId">
      Order {{order.orderId}}
  </div>
  </div>
</div>
</div>
</div>
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
    },
    countAllIngredients: function() {
    let ingredientTuples = []
      for (let i = 0; i < this.ingredients.length; i += 1) {
        ingredientTuples[i] = {};
        ingredientTuples[i].name = this.ingredients[i]['ingredient_' + this.lang];
        ingredientTuples[i].count = this.countNumberOfIngredients(this.ingredients[i].ingredient_id);
      }
      return ingredientTuples;
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
      this.countNumberOfIngredients(orderid)
    },

        countNumberOfIngredients: function(id) {
          let counter = 0;
          for (let order in this.orders) {
            // for (let i = 0; i < this.orders[order].ingredients.length; i+= 1) {
            //   if (this.orders[order].ingredients[i].ingredient_id === id) {
            //     counter += 1;
            //   }
            let burgers = this.orders[order].burgers;

            for (let j = 0; j < burgers.length; j += 1) {
              for (let i = 0; i < burgers[j].ingredients.length; i += 1) {
                if (this.orders[order].status !== "done" &&
                burgers[j].ingredients[i].ingredient_id === id) {
                  counter +=1;
                }
                if(this.orders[order].ingredients[i].ingredient_id === id && this.orders[order].status === 'done') {
                  counter -= 1;
                }
              }
            }
            return counter;
          }
      /*ingredientCategory: function() {
          let list = [];
          for (let order in this.orders){
            for (let i = 0; i < this.orders[order].ingredients.length; i += 1) {
              list.push(this.orders[order].ingredients[i].category)
            }
          }
          return list;
        },*/

  }
}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');

	#orders {
    font-size:13pt;
    max-width: 100%;
    height: auto;
    font-family:Comfortaa;
    margin: 1.2%;
  }

  .background-kitchen {
    position: fixed;
    left:0;
    top:0;
    z-index: -2;
    opacity: 0.2;
    width: 100%;
    height: 100%;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.6em;
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    text-align: center;
    padding: 2vh;
  }

  .flexcontainer {
    color: black;
    background-color: #F2F3F4;
    display:inline-table;
    flex-direction:row;
    border: 4px double black;/*Pixlar???*/
    margin: 0.9%;
    height: auto;
    width: 28%;
  }

  .order-wrapper {
    min-height: calc(100vh - 140px);
  }

  .column {
    float:left;

  }
  .left {
  width: 65%;
  height: 100vh;
  margin-top: 1%;

  }

  .right {
  width: 35%;
  height: 100vh;
  }

  .rowa {
      /*height: 50%;*/
      /*background-color: green;*/
      min-height: 50%;
      padding: 3%;
  }

  .rowb {
    min-height: 50%;
    /*background-color: pink;*/
    padding: 3%
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  #languageButton {
    position: absolute;
    top: 0;
    right: 0;
    font-family:Comfortaa;
    margin-top: 1.2%;
    margin-right: 1.2%;

  }

  #stockButton {
    position: static;
    left: 0;
    bottom: 0;
    font-size: 3vh;
    font-family:Comfortaa;
  }

  button:hover {
    background-color: #AED581;
  }



</style>
