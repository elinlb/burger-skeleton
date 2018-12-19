<template>
<div id="stockID">
  <img class="background-stock" src="@/assets/white.jpeg">
    <button id="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <div class="column left">
      <div id = "myDIV">
          <h2>{{uiLabels.categories}}:</h2>
          <h3 v-for="(cat, key) in nameMapping" :class="['categorybox', { active : '' + categoryNumber === key }]" v-on:click="thisCategory(key)" :key="key">{{ cat }} </h3>
      </div>
    </div>

    <div class="column right">
    <div class="stylecolumnright">

    <!--  <h1>{{uiLabels.stock}}</h1>-->
    <div v-for="(name,key) in nameMapping" v-if="key == categoryNumber" :key="key">
        <h2>{{name}} {{uiLabels.instock}}</h2>
      </div>

      <div class = "lowInStockWarning">
      <div class ="bottom">
            <img src="@/assets/warning.png" width= "25vw">{{uiLabels.lowInStock}}:
            <!--<span v-for= "(item, key) in ingredients" :key="key" v-if = "item.stock < 20">
              {{item["ingredient_"+ lang]}}
            </span><br>-->
            <span>
              {{ lowInStockItems() }}
            </span>
      </div>
      </div>


    <div class="flex-wrapper">
      <div v-for="(item, key) in ingredients"
           v-if="item.category == categoryNumber"
           :class="['flex-table', { lowInStock : item.stock <= 20 } ]"
           :key="key">
           <div class="flex-center">
              <div class="flex-content">
                <p>{{item["ingredient_"+ lang]}}:</p>
                <img class="picture" :src="findImage(item.image)">
                <p>
                   {{item.stock}} {{uiLabels.pieces}} {{uiLabels.instock}} {{ item.stock <= 20 ? "(" + uiLabels.low + ")" : ""}}
                </p>
             </div>
           </div>
      </div>
    </div>
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
      price: 0,
      categoryNumber: 1,
    }
  },
  computed: {
    nameMapping: function() {
      return {1: this.uiLabels.bread, 2: this.uiLabels.protein, 3: this.uiLabels.vegetables, 4: this.uiLabels.sauce, 5: this.uiLabels.addons, 6: this.uiLabels.sides, 7: this.uiLabels.drinks};
    }

  },
  methods:{
    findImage: function(image){
      if(image !== "") {
        let img=require('../assets/'+ image);
        return img;
      }
      else return require('../assets/burger.png')
    },
    thisCategory: function(Number) {
      this.categoryNumber = Number
    },
    lowInStockItems: function () {
      return this.ingredients
        .filter( function (a) {
          if (a.stock <= 20)
            return a;
        })
        .map( function (a) {
        return a['ingredient_' + this.lang];
        }.bind(this))
        .join(", ");
    },

}
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');

#stockID {
  font-size:12pt;
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
  margin-bottom: 1%;
  padding: 2vh;
}

.categorybox{
  text-transform: capitalize;
  font-size: 1em;
  background-color: #F2F3F4;
  border-style: double;
  border-color: black;
  padding: 5%;
  width: 90%;
  margin-bottom: 4%;
}

.active, .categorybox:hover{
  background-color: #AED581;
  cursor: pointer;
  text-transform: uppercase;
}

.column{
  float: left;
}

.stylecolumnright{
  margin-left: 3%;
}

.right{
  width: 75%;
  height: 100vh;
}

.left {
width: 25%;
height: 100vh;
}

.rowa {
    min-height: 100%;
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
  background-color: #AED581;
  cursor: pointer;
}

.picture {
  height: 15vh;
  width: 10vh;
  /*display: table-cell; vertical-align: middle;*/
}

.bottom > * {
  vertical-align: bottom;
}

.flex-wrapper {
  width: 80vw;
}

.flex-table {
  color: black;
  display:inline-table;
  border: 4px double black;/*Pixlar???*/
  width: 30vh;
  min-height: 30vh;
  max-height: 30vh;
  margin-bottom:2%;
  margin-right: 2%;
  padding: 1%;
  background-color: #F2F3F4;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  width: 30vh;
}

.flex-content {
  text-align: center;
}

.lowInStock {
  background-color: pink;
}

.lowInStockWarning {
  border-style: solid;
  border-width: medium;
  border-color: red;
  background-color: pink;
  color: black;
  font-size: 14pt;
  /*font-weight: bold;*/
  padding: 1%;
  margin-bottom: 2%;
}


</style>
