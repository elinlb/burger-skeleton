<template>
  <div class="main-size">
  <div id="ordering">
    <img class="example-panel" src="@/assets/white.jpeg">
    <button class="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <router-link to="/">
    <button class="Cancel" v-on:click="cancel()">{{uiLabels.cancel}}</button>
    </router-link>
 <h1 class="headline">{{uiLabels.createburger}}</h1>

<div class="flex-container">
  <h3 v-for="(cat, key) in nameMainMenu" :class="['flex-item', { active : '' + slideNumber === key }]" v-on:click="thisCategory(key)" :key="key">{{ cat }} </h3>

  <!-- <div class="flex-item" v-on:click="thisCategory(1)">{{ uiLabels.bread }} </div>
  <div class="flex-item" v-on:click="thisCategory(2)"> {{ uiLabels.protein }} </div>
  <div class="flex-item" v-on:click="thisCategory(3)"> {{ uiLabels.vegetables }} </div>
  <div class="flex-item" v-on:click="thisCategory(4)"> {{ uiLabels.sauce }} </div>
  <div class="flex-item" v-on:click="thisCategory(5)"> {{ uiLabels.addons }} </div> -->

</div>

<h3 class="headline">{{ uiLabels.ingredients }}</h3>
<div class="allergy-container">
    <h6> {{uiLabels.allergy}}: (m) = {{uiLabels.containsMilk}}
    (g)= {{uiLabels.containsGluten}}
    (v)=  {{uiLabels.vegan}} </h6>
  </div>

    <div class="boxWrapper">
        <Ingredient
        v-if = "item.category == slideNumber"
          ref="ingredient"
           v-for="item in ingredients"
          v-on:increment="addToBurger(item)"
          v-on:decrement="removeFromBurger(item)"
          v-bind:item="item"
          :lang="lang"
          :counter_initial="countIngredientsChosen(item)"
          :key="item.ingredient_id">
        </Ingredient>
      </div>

      <div v-if =  "slideNumber<5">
            <button class = "Next" v-on:click="nextSlide()">{{ uiLabels.next }} </button>
          </div>
              <div v-if =  "slideNumber> 1">
          <button class = "Back" v-on:click="previousSlide()">{{ uiLabels.back }} </button>
        </div>

    <div class="orderWrapper">
      <h3 class="headline orderText">{{ uiLabels.yourOrder }}</h3>
      <div class="orderBox">
            <h5 class="coolHeadline">{{uiLabels.addedOrder}}:</h5>
      <div v-for="(burger, key) in currentOrder.burgers" :key="key">
      <span v-for="(item, key2) in burger.ingredients" :key="key2">
        {{ item['ingredient_' + lang] }},
      </span>
      <div v-if="burger.price > 0">
      {{burger.price}} kr
      <hr>
    </div>
      </div>
      </div>

      <div class="orderBox">
        <h5 class="coolHeadline">{{uiLabels.chosenIngredients}}:</h5>
      <br>
        {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
      </div>

         <!-- <button class ="orderButton" v-on:click="addToOrder()">{{ uiLabels.addToOrder }}</button> -->
    <!-- <button class="orderButton" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button> -->

    <button class ="orderButton" v-on:click="addToOrder()"><router-link to="sides" STYLE="text-decoration: none; color:black" >  {{uiLabels.continueSides}} ⟶ </router-link></button>

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
  name: 'Ordering',
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
      slideNumber: 1,
    }
  },
  computed: {
      currentOrder: function () {
        return this.$store.state.currentOrder;
      },
      nameMainMenu: function() {
        return {1: this.uiLabels.bread, 2: this.uiLabels.protein, 3: this.uiLabels.vegetables, 4: this.uiLabels.sauce, 5: this.uiLabels.addons};
      }
    },
      created: function () {
        this.$store.state.socket.on('orderNumber', function (data) {
        this.orderNumber = data;
      }.bind(this));
    },
  methods: {
    countIngredientsChosen: function (item) {
      //count the number of times the item(full ingredient) is in the chosen
      //ingredients array
      let countedIngredients = 0;
      for (let i=0; i<this.chosenIngredients.length; i += 1) {
        if (this.chosenIngredients[i] === item) {
        countedIngredients += 1;
        }
      }

      return countedIngredients;
    },
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
    // placeOrder: function () {
    //   // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
    //   this.$store.state.socket.emit('order', this.currentOrder);
    //   this.$store.commit('clearOrder');
    //   this.category = 1;
    //
    // },
    nextSlide: function() {
      if (this.slideNumber <5 ){
        this.slideNumber += 1
      }
    },
    previousSlide: function() {
      if(this.slideNumber >1){
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


#ordering {
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

.coolHeadline {
  top: 0;
  font-weight: bold;
  font-family:Comfortaa;
}

h5 {
      text-decoration: none;
      font-family:Comfortaa;
    }

.orderText {
  margin-left: 10%;

}

.orderWrapper {
  background-color: #F2F3F4;
  border-style: dashed;
  /* border-color: black; */
  padding: 2%;
  margin: 10% 0 6% 0%;
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
     color: black;
     border-style: outset;
    border-width: 20%;
    font-family: Comfortaa;
    padding: 2%;
    font-size: 100%;
    margin-left: 4%;
    height: auto;
    max-width: 30%;
}

.sidesWrapper {
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

.orderButton {
  background-color: #79BAEC;
  margin: 10% 10% 0 4%;
  padding: 0%;
  width: 30%;
  max-width: 30%;
  height: 30%;
  right: 70%;
  border-style: outset;
  font-family: Comfortaa;
}

.orderButton:hover {
  background-color: #AED581;
  border-style: inset;
  cursor: pointer;
  textDecoration: none;

}

.languageButton{
  font-family:Comfortaa;
}

.languageButton:hover {
  background-color: #AED581;
}

button:hover{
  cursor: pointer;
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
background-color: #AED581;
  cursor: pointer;
}

.Back {
background-color: #79BAEC;
width: 4em;
height: 2em;
font-family: Comfortaa;
}

.Back:hover {
background-color: #AED581;
  cursor: pointer;
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

.Cancel:hover {
  background-color: #ECF0F1;
  border-style: inset;
  border-radius: 5%;
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
  max-width: 5em;
}

 .boxWrapper {
   /* grid-template-columns: 100% 100% 100%; */
   /* border-style: outset; */
   grid-template-columns: repeat(auto-fit,1%);
   grid-gap: 2%;
   display: flex;
   justify-content: space-evenly;
   flex-wrap: wrap;
   max-height: 100%;
   max-width: 100%;
   margin-bottom: 4%;
   margin: auto;
 }

 .box {
      /* color: #fff; */
      color: black;
     /* border-radius: 1em; */
     font-family: Comfortaa;
     padding: 2%;
     font-size: 100%;
     /*margin-left: 8%;
     /* background-color: orange; */
     height: auto;
     width: 25%;
     max-width: 25%;
     /* border-style:  outset;
     border-radius: 1em;
     border-width: thick; */
     text-align: center;
 }

 .box:hover {
   border-style: outset;
   border-radius: 1em;
   border-width: thick;
 }

.flex-container {
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
  padding: 2%;
  margin: 0;
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

.allergy-container {
  /* background-color: blue; */
  /* border-style: groove; */
  /* border-color: black; */
  padding: 0%;
  margin: 0 0 5% 0%;
  height: 30px;
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

.allergy-item {
  /* background: tomato; */
  color: black;
  font-family: Comfortaa;
  padding: 0 10% 0 0;
  width: 100%;
  height: 30px;

  line-height: 50px;
  font-weight: bold;
  font-size: 0.75em;
  text-align: center;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
}

.flex-item {
  /* background: tomato; */
  color: black;
  font-family: Comfortaa;
  padding: 0,75em;
  width: 100%;
  height: auto;
  margin-top: 10px;

  line-height: 50px;
  font-weight: bold;
  font-size: 0.75em;
  text-align: center;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
  cursor: pointer;
}

/* .active, .flex-item:hover {
  border-style: outset;
  background-color: #AED581;
  text-transform: uppercase;
  font-weight: 700;
} */

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


@media only screen and (max-width: 600px) {
  .box {
    width: 40%;
    max-width: 40%;
  }

}
</style>
