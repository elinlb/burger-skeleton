<template>
<div id="styling">
  <img class="backgroundpic" src="@/assets/brick.jpg" >

   <h1 class="head">{{ uiLabels.crafty }}</h1>

    <button class ="language" v-on:click="switchLang()">{{ uiLabels.language }}</button>


    <div class = "burgerContainer" >
      <div class ="burgerBox">
        <router-link to="ordering">
        <h1>{{uiLabels.build}}</h1>
      <img src="@/assets/burger.png" width="30%" >
      </router-link>
    </div>

      <!-- <div class = "sideContainer"> -->
    <div class ="sideBox">
        <router-link to="sides" >
      <h1>{{uiLabels.pickSides}}</h1>
        <img src="@/assets/soda.png" width="15%">
        <img src="@/assets/fries.png" width="15%">
            </router-link>
     </div>
    </div>
   <!-- </div> -->


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

#styling {
  margin:auto;
  max-width: 40em;
}
  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .language {
    position: absolute;
    top: 1%;
    left: 20%;
    font-family: Comfortaa;
  }
  .head {
    font-family: Comfortaa;
    position:absolute;
    left: 20%;
    right: 20%;
    font-size: 4em;
  }

  .burgerContainer {
    /* background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    left: 2em;
    padding: 2em;
    margin: 0;
    list-style: none; */
    font-family: Comfortaa;
    max-width: 60%;
    max-height: 100%;
    position: absolute;
    top: 30%;
    left: 20%; 
    right: 30%;
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
    /* padding: 2em; */
      /* left: 2em; */
    max-width: 100%;
    height: auto;
    margin-top: 100%;
    line-height: 100%;
    font-weight: bold;
    font-size: 100%;
    text-align: center;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    margin: 0;
    list-style: none;
  }

  .sideBox {
    color: black;
    font-family: Comfortaa;
    /* padding: 2em; */
      /* left: 2em; */
    max-width: 50%;
    height: auto;
    margin-top: 100%;
    line-height: 100%;
    font-weight: bold;
    font-size: 100%;
    text-align: center;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    margin: 0;
    list-style: none;
  }

  .sideContainer {
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    padding: 2em;
    margin: 0;
    list-style: none;
    font-family: Comfortaa;
    max-width: 20em;
    max-height: 18em;
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


  .backgroundpic {
    position: fixed;
    left:0;
    top:0;
    z-index: -2;
    opacity: 0.2;
    width: 80em;
  }
</style>
