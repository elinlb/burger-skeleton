<template>
<div id="styling">
  <img class="backgroundpic" src="@/assets/brick.jpg" >
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

<div class ="burgerContainer">
<h1 class="headline">Your basket</h1>
<img src="@/assets/basket.png" width="100em" height="70em">
  <div class="burgerBox">
    <h1>{{uiLabels.yourOrder}}</h1>
    <div>
      <OrderItem
        v-for="(order, key) in orders"
        v-if="order.status !== 'done'"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItem>
    </div>
  </div>
  Price:
</div>
<button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    <div class = "burgerContainer">
      <div class ="burgerBox">
        <router-link to="ordering">
      <h1>Build your burger</h1>
      <img src="@/assets/burger.png" width="60em">
      </router-link>
    </div>
    <div class ="burgerBox">
      <router-link to="sides">
        <h1>Pick sides</h1>

        <img src="@/assets/soda.png" width="30em">
        <img src="@/assets/fries.png" width="30em">
</router-link>
     </div>
   </div>

</div>
</template>
<script>

//import methods and data that are shared between ordering and kitchen views
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Basket',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      slideNumber: 1,
    }
  },
  methods: {

  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');


  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }

  .headline {
    font-family:Comfortaa;
  }

  .burgerContainer {
    padding: 10px;
    margin: 0 0 0 40%;
    list-style: none;
    font-family: Comfortaa;
    width: 10em;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
   grid-gap: 2%;
  }

  .burgerBox {
    /* background: tomato; */
    background-color: #F2F3F4;

    color: black;
    font-family: Comfortaa;
    padding: 0 10em 0 10em;
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-left: 20%;

    line-height: 2em;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
  }

  .sideBox {
    /* background: tomato; */
    background-color: #F2F3F4;

    color: black;
    font-family: Comfortaa;
    padding: 5px;
    width: 100%;
    height: auto;
    margin-top: 10px;

    line-height: 50px;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
    padding: 2%;
    font-size: 100%;
    margin-left: 8%;
  }

  .backgroundpic {
    position: fixed;
    left:0;
    top:0;
    z-index: -2;
    opacity: 0.2;
    width: 80em;
  }

</style>
