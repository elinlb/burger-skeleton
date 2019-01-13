<template>
<div id="styling">
  <img class="backgroundpic" src="@/assets/brick.jpg" >
    <button class ="language" v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <router-link to="/">
    <button class="Cancel" v-on:click="cancel()">{{uiLabels.cancel}}</button>
    </router-link>
<div class ="burgerContainer">
<h1 class="headline">{{uiLabels.yourbasket}}</h1>
<img src="@/assets/basket.png" width="100em" height="70em">
  <div class="orderBox">
    <h1>{{uiLabels.yourOrder}}</h1>
{{currentOrder}}
    <div>
      <OrderItem
        :burgers="currentOrder.burgers"
        :ui-labels="uiLabels"
        :lang="lang">
      </OrderItem>
    </div>
  </div>
</div>

    <div class = "burgerContainer">

      <div class ="burgerBox">
        <router-link to="ordering">
      <h1>{{uiLabels.newBuild}}</h1>
      <img src="@/assets/burger.png" width="60em">
      </router-link>
    </div>
    <div class ="burgerBox">
      <router-link to="sides">
        <h1>{{uiLabels.extraSides}}</h1>

        <img src="@/assets/soda.png" width="30em">
        <img src="@/assets/fries.png" width="30em">
</router-link>
     </div>
   </div>
<footer class="footer">
<div class="Price"> <h1> {{uiLabels.price}} {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}: {{ price }} kr </h1>
     </div>
     <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.pay }} </button>
</footer>
   <!-- </div> -->

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
  computed: {
      currentOrder: function () {
        return this.$store.state.currentOrder;
      }
  },
  methods: {
    cancel: function(){
      if(this.slideNumber >1){
        this.slideNumber =1
      }
  },
  placeOrder: function () {
    // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    this.$store.state.socket.emit('order', this.currentOrder);
    this.$store.commit('clearOrder');
    this.category = 1;

  }
}
}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');


  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }

  #styling {
    margin:auto;
    max-width: 40em;
}

  .language{
    font-family: Comfortaa;
    position: absolute;
    top: 0%;
    left: 16%;
  }

  .language:hover {
    background-color: #AED581;
  }

  .Price{
    font-family: Comfortaa;
    /* position: absolute; */
    top: 75%;
    left: 60%;
  }

  .Cancel {
    width: 5em;
    height: 2em;
    background-color: red;
    position: absolute;
    right: 28%;
    top: 0;
    font-family: Comfortaa;
  }

  .orderButton{
    font-family: Comfortaa;
    text-transform: uppercase;
    /* position: absolute; */
    font-size: 120%;
    left: 60%;
    top: 82%;
    right: 1%;
  }

  .headline {
    font-family:Comfortaa;
    position:absolute;
    left: 15%;
    top: 4%;
  }

  .burgerContainer {
    padding: 2%;
    margin: 0 0 0 30%;
    list-style: none;
    font-family: Comfortaa;
    width: 20%;
    top: 50%;
    left: 30%;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    /* grid-gap: 2%; */
  }

  .orderBox {
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    padding: 0 80% 0 80%;
    width: 100%;
    height: auto;
    margin-top: 80%;
    left: 30%;

    line-height: 150%;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
  }

  .burgerBox {
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    padding: 0 80% 0 80%;
    width: 100%;
    height: auto;
    margin-top: 10%;
    left: 80%;

    line-height: 150%;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
  }

  .sideBox {
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    padding: 2em;
    width: 100%;
    height: auto;
    margin-top: 2em;

    line-height: 10em;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
    padding: 2%;
    font-size: 100%;
    margin-left: 20%;
  }

  .backgroundpic {
    position: fixed;
    left:0;
    top:0;
    z-index: -2;
    opacity: 0.2;
    width: 80em;
  }

  button:hover {
    cursor: pointer;
  }

  .footer{
    position: sticky;
    bottom: 0;

  }

</style>
