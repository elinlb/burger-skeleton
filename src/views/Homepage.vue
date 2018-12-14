<template>
<div id="styling">
  <img class="backgroundpic" src="@/assets/brick.jpg" >

   <h1 class="head">{{ uiLabels.crafty }}</h1>

    <button class ="language" v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <router-link to="ordering">
    <div class = "burgerContainer" >
      <div class ="burgerBox">
        <h1>{{uiLabels.build}}</h1>
      <img src="@/assets/burger.png" width="120em">

    </div>
        </div>
          </router-link>

          <router-link to="sides" >
      <div class = "sideContainer">
    <div class ="sideBox">
      <h1>{{uiLabels.pickSides}}</h1>
        <img src="@/assets/soda.png" width="80em">
        <img src="@/assets/fries.png" width="80em">
     </div>
   </div>
    </router-link>

</div>
</template>
<script>
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Homepage',
  components: {
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
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
  .language {
    position: absolute;
    top: 1%;
    left: 25%;
    font-family: Comfortaa;
  }
  .head {
    font-family: Comfortaa;
    position:absolute;
    left: 25%;
    font-size: 4em;
  }
  .sideContainer {
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    padding: 10px;
    margin: 0;
    list-style: none;
    font-family: Comfortaa;
    width: 20em;
    height: 18em;
    position: absolute;
    top: 20%;
    right: 25%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }
  .burgerContainer {
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    left: 5px;
    padding: 10px;
    margin: 0;
    list-style: none;
    font-family: Comfortaa;
    width: 20em;
    height: 18em;
    position: absolute;
    top: 20%;
    left: 25%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }
.burgerBox {
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
  }
  .sideBox {
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
