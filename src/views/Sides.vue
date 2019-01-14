<template>
  <div class="main-size">
  <div id="sides">
    <img class="example-panel" src="@/assets/white.jpeg">
    <button class="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <router-link to="/">
    <button class="Cancel" v-on:click="cancel()">{{uiLabels.cancel}}</button>
    </router-link>
 <h1 class="headline">{{ uiLabels.pickSides }}</h1>

<div class="flex-container">
<h3 v-for="(cat, key) in nameSidesMenu" :class="['flex-item', { active : '' + slideNumber === key }]" v-on:click="thisCategory(key)" :key="key">{{ cat }} </h3>
<!--  <div class="flex-item" v-on:click="thisCategory(6)">{{uiLabels.sides}}</div>
  <div class="flex-item" v-on:click="thisCategory(7)">{{uiLabels.drinks}}</div> -->

</div>

    <h1 class="headline">{{ uiLabels.ingredients }}</h1>

    <div class="boxWrapper">
        <Ingredient
        v-if = "item.category == slideNumber"
          ref="ingredient"
          v-for="item in ingredients"
          v-on:increment="addToBurger(item)"
          v-on:decrement="removeFromBurger(item)"
          :item="item"
          :lang="lang"
          :key="item.ingredient_id">
        </Ingredient>
      </div>

      <button class = "Next" v-on:click="nextSlide()">{{ uiLabels.next }} </button>
      <button class = "Back" v-on:click="previousSlide()">{{ uiLabels.back }} </button>


<div class="orderWrapper">
  <h3 class="headline">{{ uiLabels.yourOrder }}</h3>
  <div class="orderBox">
        <h5 class="headline">{{uiLabels.addedOrder}}:</h5>
  <div v-for="(burger, key) in currentOrder.burgers" :key="key">
  <!-- {{key}}: -->
  <span v-for="(item, key2) in burger.ingredients" :key="key2">
    {{ item['ingredient_' + lang] }},
  </span>
  {{burger.price}} kr
  <hr>
  </div>
  </div>



  <div class="orderBox">
    <h5 class="headline">{{uiLabels.chosenIngredients}}:</h5>
  <br>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
  </div>
    <!-- <button class="orderButton" v-on:click="addToOrder()">{{ uiLabels.addToOrder }}</button> -->
    <!-- <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button> -->
    <button class="basketButton" v-on:click="addToOrder()"> <router-link to="basket" STYLE="text-decoration: none; color:black" > {{uiLabels.basket}} </router-link></button>
    <!-- <router-link tag ="button" class="basketButton" to="basket" STYLE="text-decoration: none; color:black" v-on:click="addToOrder()"> {{uiLabels.basket}} </router-link> -->

<!--
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
  </div>
    <button class = "Next" v-on:click="nextSlide()">{{ uiLabels.next }} </button> -->
  <!-- <button class = "Back" v-on:click="previousSlide()">{{ uiLabels.back }} </button> -->
</div>

    <!-- <h1 class="headline">{{ uiLabels.ordersInQueue }}</h1>
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
    </div> -->
  </div>
</div>

</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Sides',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      slideNumber: 6,
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  computed: {
      currentOrder: function () {
        return this.$store.state.currentOrder;
      },
      nameSidesMenu: function () {
        return {6: this.uiLabels.sides, 7: this.uiLabels.drinks}
      }
  },
  methods: {

    // addToOrder: function (item) {
    //   this.chosenIngredients.push(item);
    //   this.price += +item.selling_price;
    // },
    // placeOrder: function () {
    //   var i,
    //   //Wrap the order in an object
    //     order = {
    //       ingredients: this.chosenIngredients,
    //       price: this.price
    //     }
    //   },
    //   addToOrder: function (){
    //     this.$store.commit("addToCurrentBurger", {
    //       ingredients: this.chosenIngredients.splice(0),
    //       price: this.price
    //   });
    //
    //   for (let i = 0; i < this.$refs.ingredient.length; i += 1) {
    //         this.$refs.ingredient[i].resetCounter();
    //       }
    //       this.chosenIngredients = [];
    //       this.price = 0;
    //   },
    addToBurger: function (item) {
           this.chosenIngredients.push(item);
           this.price += +item.selling_price;
         },
         removeFromBurger: function (item) {
           let indexToDelete = -1;
           for (let i = 0; i < this.chosenIngredients.length; i += 1 ) {
             if (this.chosenIngredients[i] === item) {
               indexToDelete = i;
               break;
             }
           }
           if (indexToDelete >= 0) {
             this.chosenIngredients.splice(indexToDelete, 1);
             this.price -= +item.selling_price;
           }
         },
         addToOrder: function (){
           this.$store.commit("addToCurrentBurger", {
             ingredients: this.chosenIngredients.splice(0),
             price: this.price
         });
         for (let i = 0; i < this.$refs.ingredient.length; i += 1) {
               this.$refs.ingredient[i].resetCounter();
             }
             this.chosenIngredients = [];
             this.price = 0;
         },
nextSlide: function() {
  if (this.slideNumber <7 ){
    this.slideNumber += 1
  }
},
  previousSlide: function() {
    if(this.slideNumber >6){
      this.slideNumber -=1
    }
  },
  cancel: function(){
    if(this.slideNumber >1){
      this.slideNumber =1
    }
  },
  thisCategory: function(Number) {
    this.slideNumber = Number
  }

}

}

</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
@import url('https://fonts.googleapis.com/css?family=Comfortaa');


#sides {
  margin:auto;
  max-width: 40em;
  position: relative;
}

.main-size {
height: auto;
max-width: 100%;

}

.headline {
  font-family:Comfortaa;
}

.orderWrapper {
  background-color: #F2F3F4;
  border-style: dashed;
  /* border-color: black; */
  padding: 2%;
  margin: 10% 0 6% 0 ;
  list-style: none;
  font-family: Comfortaa;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
}

.orderBox {
     /* color: #fff; */
     color: black;
     border-style: outset;
    border-width: 20%;
    font-family: Comfortaa;
    padding: 2%;
    font-size: 100%;
    margin-left: 8%;
    /* background-color: orange; */
    height: auto;
    max-width: 30%;
    /* border-style:  outset;
    border-radius: 1em;
    border-width: thick; */


}
.orderButton {
  width: 15%;
  height: 10%;
  right: 70%;
  border-style: outset;
  font-family: Comfortaa;

}
.orderButton:hover {
  background-color: #8BC34A;
  cursor: pointer;

}

.basketButton {
  margin: 10% 0 0 4%;
  width: 15%;
  height: 10%;
  right: 70%;
  border-style: outset;
  font-family: Comfortaa;


}
.basketButton:hover {
  background-color: #8BC34A;
  cursor: pointer;

}


.Back {
background-color: #008CBA;
width: 4em;
height: 2em;
font-family: Comfortaa;
}

.Back:hover {
  background-color: #8BC34A;
  cursor: pointer;
}

.Cancel {
  width: 5em;
  height: 2em;
  background-color: red;
  position: absolute;
  right: 0;
  top: 0;
  font-family: Comfortaa;

}

.Next {
background-color: #79BAEC;
width: 4em;
height: 2em;
position: absolute;
right: 0%;
font-family: Comfortaa;
}

.Next:hover {
  background-color: #8BC34A;
  cursor: pointer;
}

.Back {
background-color: #79BAEC;
width: 4em;
height: 2em;
font-family: Comfortaa;
}

.Back:hover {
  background-color: #8BC34A;
  cursor: pointer;
}


.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
  opacity: 0.2;
}

.ingredient {
  /* border: 1em solid #ccd; */
  padding: 1%;
  color: black;
}


 .boxWrapper {
   /* grid-template-columns: 350px 350px 350px; */
   grid-template-columns: repeat(auto-fit,1%);
   grid-gap: 2%;
   display: flex;
   justify-content: space-evenly;
   flex-wrap: wrap;
   height: auto;
   width: 100%;

 }

 .box {
      /* color: #fff; */
      color: black;
     /* border-radius: 1em; */
     font-family: Comfortaa;
     padding: 2%;
     font-size: 100%;
     margin-left: 8%;
     /* background-color: orange; */
     height: auto;
     max-width: 30%;
     /* border-style:  outset;
     border-radius: 1em;
     border-width: thick; */


 }

 .box:hover {
   border-style: outset;
   border-radius: 1em;
   border-width: thick;
 }

 .box:active{
   border-style: double;
 }

.flex-container {
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
  padding: 2%;
  margin: 0;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
}

.flex-item {
  /* background: tomato; */
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
  cursor: pointer;
}

.active {
  border-style: outset;
  border-radius: 10px;
  background-color: #AED581;
  text-transform: uppercase;
  font-weight: 700;
}

.flex-item:hover {
  border-style: dashed;
  border-radius: 10px;
  border-width: 2px;
  border-color: #CACFD2;
  text-transform: uppercase;
  font-weight: 700;
}


button{
  font-family:Comfortaa;
}

button:hover{
  cursor: pointer;

}

.languageButton:hover{
  background-color: #AED581;
}
</style>
