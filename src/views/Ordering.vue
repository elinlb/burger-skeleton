<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/white.jpeg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

<h1 class="headline">Create your burger</h1>

<div class="flex-container">

  <div class="flex-item">Bread</div>
  <div class="flex-item">Protein</div>
  <div class="flex-item">Vegetables</div>
  <div class="flex-item">Sauce</div>
  <div class="flex-item">Add-ons</div>

</div>


    <h1>{{ uiLabels.ingredients }}</h1>



<div class="boxWrapper">
    <Ingredient
      ref="ingredient"
      v-for="item in ingredients"
      v-if="item.category === 4"
      v-on:increment="addToOrder(item)"
      :item="item"
      :lang="lang"
      :key="item.ingredient_id"
      >
      <!-- <img src="https://cdn.shopify.com/s/files/1/1205/7170/products/tinywhite_7bbbee20-b41f-477e-97d5-9103704c9975_530x.png?v=1489000542" alt="Span" title="Crispy Burga" width="300"> -->
    </Ingredient>
  </div>

    <h1>{{ uiLabels.order }}</h1>
    {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
    <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>

    <h1 class="headline">{{ uiLabels.ordersInQueue }}</h1>
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
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */

@import url('https://fonts.googleapis.com/css?family=Comfortaa');

#ordering {
  margin:auto;
  width: 40em;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
  opacity: 0.2;
}

.headline {
  font-family:Comfortaa;
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
     font-family: Comfortaa;
 }

.flex-container {
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
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
  /* background: tomato; */
  padding: 5px;
  width: 100%;
  height: auto;
  margin-top: 10px;

  line-height: 50px;
  color: black;
  font-family: Comfortaa;
  font-weight: bold;
  font-size: 1em;
  text-align: center;

  -webkit-flex-flow: row wrap;
  justify-content: space-around;
}

</style>
