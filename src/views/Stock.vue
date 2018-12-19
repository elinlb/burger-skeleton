<template>
<div id="stockID">
  <img class="background-stock" src="@/assets/white.jpeg">
    <button id="languageButton" v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <div class="column left">
      <div class="rowa">
          <h2>{{uiLabels.categories}}:</h2>
          <h3 class="categorybox" v-on:click="thisCategory(1)">{{uiLabels.bread}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(2)">{{uiLabels.protein}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(3)">{{uiLabels.vegetables}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(4)">{{uiLabels.sauce}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(5)">{{uiLabels.addons}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(6)">{{uiLabels.sides}}</h3>
          <h3 class="categorybox" v-on:click="thisCategory(7)">{{uiLabels.drinks}}</h3>
      </div>

      <div class="rowb">

        <!--<div v-for= "(item, key) in ingredients" :key="key" v-if = "item.stock < 20">
          <h2><img src="@/assets/warning.png" width= "30vw">{{uiLabels.lowInStock}}:</h2>
          {{item["ingredient_"+ lang]}}
        </div>-->
      </div>

    </div>

    <div class="column right">
    <div class="stylecolumnright">

    <!--  <h1>{{uiLabels.stock}}</h1>-->
    <div v-for="(name,key) in nameMapping" v-if="key == categoryNumber" :key="key">
        <h2>{{name}} {{uiLabels.instock}}</h2>
      </div>

      <img src="@/assets/warning.png" width= "30vw">{{uiLabels.lowInStock}}:
      <span v-for= "(item, key) in ingredients" :key="key" v-if = "item.stock < 20">
        {{item["ingredient_"+ lang]}}
      </span><br>



      <div v-for="(item, key) in ingredients" v-if="item.category == categoryNumber" class="flex-wrapper" :key="key">
          <div align="center">
              {{item["ingredient_"+ lang]}}:<br>
              <img class="picture" :src="findImage(item.image)"><br>
             {{item.stock}} {{uiLabels.pieces}}<br>
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
  }

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
  padding: 3%;
  width: 90%;
}

.categorybox:hover{
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
    min-height: 50%;
}

.rowb {
  min-height: 50%;
  /*background-color: #F2F3F4;*/
  /*border: 4px double black;*/
  padding: 1%;
  color: red;
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

.flex-wrapper {
  color: black;
  display:inline-table;
  flex-direction:row;
  border: 4px double black;/*Pixlar???*/
  width: 30vh;
  min-height: 30vh;
  max-height: 30vh;
  margin-bottom:2%;
  margin-right: 2%;
  padding: 1%;
  background-color: #F2F3F4;
}

.lowInStock {
  background-color: red;
}


</style>
