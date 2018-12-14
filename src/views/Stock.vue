<template>
<div id="stockID">
  <img class="background-stock" src="@/assets/white.jpeg">
    <h1>{{uiLabels.stock}}</h1>
    <button id="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <div class="column left">


      <div v-for="item in ingredients" class="flex-wrapper">
          <div>
          <ol>
          {{item["ingredient_"+ lang]}}:
          {{item.stock}}
          <img class="picture" :src="findImage(item.image)">
        </ol>
      </div>
    </div>


    </div>

    <div class="column right">
      <div class="rowa">
          <h2>{{uiLabels.categories}}:</h2>
          <h3 class="categorybox">{{uiLabels.bread}}</h3>
          <h3 class="categorybox">{{uiLabels.protein}}</h3>
          <h3 class="categorybox">{{uiLabels.vegetables}}</h3>
          <h3 class="categorybox">{{uiLabels.sauce}}</h3>
          <h3 class="categorybox">{{uiLabels.addons}}</h3>
          <h3 class="categorybox">{{uiLabels.sides}}</h3>
          <h3 class="categorybox">{{uiLabels.drinks}}</h3>
      </div>

      <div class="rowb">
        <h2>{{uiLabels.lowInStock}}:</h2>
      </div>

    </div>

</div>
</template>
<script>
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    Ingredient,
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
  methods:{
    findImage: function(image){
    if(image !== "") {
      let img=require('../assets/'+ image);
      return img;
    }
    else return require('../assets/burger.png')

  }
  }


}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');

#stockID {
  font-size:13pt;
  max-width: 100%;
  height: auto;
  font-family:Comfortaa;
  margin: 1.2%;
}

.background-stock {
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
  text-align: center;
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
  margin-left: 30%;
  margin-right: 30%;
  padding: 2vh;
}

h2 {
  text-transform: uppercase;
}

.categorybox{
  text-transform: uppercase;
  font-size: 1em;
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
  padding: 2%;
  width: 90%;
}

.column{
  float: left;
}

.left{
  width: 80%;
  height: 100vh;
}

.right {
width: 20%;
height: 100vh;
}

.rowa {
    min-height: 50%;
}

.rowb {
  min-height: 50%;
  background-color: pink;
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

button:hover {
  background-color: green;
}

.picture {
  height: 50%;
  width: 50%;
  max-height: 50%;
  align-items: center;
}

.flex-wrapper {
  color: black;
  background-color: #F2F3F4;
  display:inline-table;
  flex-direction:row;
  border: 4px double black;/*Pixlar???*/
  margin: 0.9%;
  min-height: 30%;
  width: 30%;
}


</style>
