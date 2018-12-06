<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/exampleImage.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <button class="Cancel" v-on:click="cancel()">{{uiLabels.cancel}}</button>


<h1>Create your burger</h1>

<div class="flex-container">

  <div class="flex-item">{{ uiLabels.bread }} </div>
  <div class="flex-item"> {{ uiLabels.protein }} </div>
  <div class="flex-item"> {{ uiLabels.vegetables }} </div>
  <div class="flex-item"> {{ uiLabels.sauce }} </div>
  <div class="flex-item"> {{ uiLabels.addons }} </div>

</div>



    <h1 class="headline">{{ uiLabels.ingredients }}</h1>



    <div class="boxWrapper">
        <Ingredient
        v-if = "item.category == slideNumber"
          ref="ingredient"
          v-for="item in ingredients"
          v-on:increment="addToOrder(item)"
          :item="item"
          :lang="lang"
          :key="item.ingredient_id">
        </Ingredient>
      </div>


    <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
    <button class = "Next" v-on:click="nextSlide()">{{ uiLabels.next }} </button>
  <button class = "Back" v-on:click="prevoiusSlide()">{{ uiLabels.back }} </button>


    <h1>{{ uiLabels.ordersInQueue }}</h1>
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
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };

      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    },
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
  }

}

}

</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  width: 40em;
}

.Next {
background-color: #008CBA;
width: 4em;
height: 2em;
position:absolute;
right: 450px;
}

.Back {
background-color: #008CBA;
width: 4em;
height: 2em;
}

.Cancel {
  width: 4em;
  height: 2em;
  background-color: red;
  position: absolute;
  right: 450px;

}


.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
  opacity: 0.2;
}

.ingredient {
  border: 1px solid #ccd;
  padding: 1em;
  color: white;
}


 .boxWrapper {
   grid-template-columns: 350px 350px 350px;
   grid-gap: 10px;
   display: flex;
   justify-content:space-evenly;
   flex-wrap: wrap;

 }

 .box {
      color: #fff;
     border-radius: 5px;
     padding: 10px;
     font-size: 100%;
     margin-left: 50px;
     background-color: orange;
 }

.flex-container {
  background-color: white;
  padding: 10px;
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
  background: tomato;
  padding: 5px;
  width: 100px;
  height: auto;
  margin-top: 10px;

  line-height: 50px;
  color: white;
  font-weight: bold;
  font-size: 1em;
  text-align: center;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
}

</style>
