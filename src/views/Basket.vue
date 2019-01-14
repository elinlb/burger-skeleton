<template>
<div class= "main-size">
<div id="styling">
  <img class="backgroundpic" src="@/assets/brick.jpg" >
    <button class ="language" v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <router-link to="/">
    <button class="Cancel" v-on:click="cancel()">{{uiLabels.cancel}}</button>
    </router-link>


<div class ="OrderContainer">
<!-- <h1 class="headline">{{uiLabels.yourbasket}}</h1> -->
<img id="basketPicture" src="@/assets/basket.png" width="100em" height="70em">
  <div class="orderBox">
    <h1 class="headline">{{uiLabels.yourOrder}}</h1>
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
        <router-link to="ordering" STYLE="text-decoration: none; color:black">
      <h1>{{uiLabels.newBuild}}</h1>
      <img src="@/assets/burger.png" width="100em">
      </router-link>
    </div>
    <div class ="burgerBox">
      <router-link to="sides" STYLE="text-decoration: none; color:black">
        <h1>{{uiLabels.extraSides}}</h1>

        <img src="@/assets/soda.png" width="50em">
        <img src="@/assets/fries.png" width="50em">
</router-link>
     </div>
   </div>
<footer class="footer">
  <div class = "payBox">
      <h1> {{uiLabels.price}} {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}:
        {{totalPrice(currentOrder.burgers)}} kr
      </h1>
    <router-link to="pay"> <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.pay }}</button> </router-link>
     </div>
</footer>
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
  computed: {
      currentOrder: function () {
        return this.$store.state.currentOrder;
      },
},
  methods: {
    cancel: function(){
      if(this.slideNumber >1){
        this.slideNumber =1
      }
  },
  totalPrice: function(burger){
    let totPrice = this.price;
    for (let i=0; i<this.currentOrder.burgers.length; i +=1) {
      totPrice += this.currentOrder.burgers[i].price;
    }
    return totPrice;
  },

  placeOrder: function () {
    // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    this.$store.state.socket.emit('order', this.currentOrder);
    this.$store.commit('clearOrder');
    this.category = 1;
  },


  }
}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');


  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  #basketPicture{
    margin-top: 5%;
    /* position: absolute; */

  }
  #styling {
    margin:auto;
    margin-top: 0;
    max-width: 40em;
    position: relative;
}

  .main-size{
    height: 0;
    min-width: 100%;
  }

  .language{
    font-family: Comfortaa;
    position: absolute;
    top: 0;
    left: 0;
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
    background-color: #FB402A;
    position: absolute;
    right: 0;
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
    font-size: 2em;
    /* position:absolute; */
    /* text-align: center;
    left: 43.8%;
    /* top: 4%; */
    /* margin-bottom: 100%; */
  }



  .orderContainer {
    padding-top: 20%;
    margin: 0 0 0 30%;
    list-style: none;
    font-family: Comfortaa;
    width: 100%;
    /* margin-top: 2%; */
    left: 100%;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-evenly;
    /* grid-gap: 2%; */
  }

  .orderBox {
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    /* padding: 0 40% 0 40%; */
    width: 60%;
    height: auto;
    /* padding-top: 5em; */
    /* margin-top: 5%; */
    /* top: 10%; */
    margin-left: 20%;
    align: center;

    line-height: 150%;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    /* -webkit-flex-flow: row wrap;
    justify-content: space-around; */
    border-style: double;
    border-color: black;
  }
  .burgerContainer {
    /* padding: 2%; */
    /* margin: 0 0 0 30%; */
    padding-top: 4%;
    padding-bottom: 4%;
    list-style: none;
    font-family: Comfortaa;
    width: 100%;
    /* top: 50%; */
    /* left: 100%; */

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-evenly;
    /* grid-gap: 2%; */
  }

  .burgerBox {
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    /* padding: 0 80% 0 80%; */
    width: 100%;
    height: 12em;
    /* margin-top: 10%; */
    /* left: 80%; */

    line-height: 150%;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;
  }

  .backgroundpic {
    position: fixed;
    left:0;
    top:0;
    z-index: -2;
    opacity: 0.2;
    width: 100%;
  }

  button:hover {
    cursor: pointer;
  }

  .footer{
    position: sticky;
    bottom: 0;

  }

  .payBox{
    background-color: #F2F3F4;
    color: black;
    font-family: Comfortaa;
    padding: 0 0 2% 0;
    width: 100%;
    /* height: auto; */
    /* margin-top: 10%; */
     /* left: 10%; */
    /* right: -20%; */

    line-height: 150%;
    font-weight: bold;
    font-size: 1em;
    text-align: center;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    border-style: double;
    border-color: black;

  }

</style>
