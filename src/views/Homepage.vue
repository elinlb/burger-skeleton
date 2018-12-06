<template>
<div id="styling">
Hej
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

    <router-link to="ordering">
    <div class = "burgerContainer">
      <div class ="burgerBox">
      <h1>Build your burger</h1>
      <img src="@/assets/burger.png" width="100em">
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


  .burgerContainer {
    background-color: #F2F3F4;
    border-style: double;
    border-color: black;
    padding: 10px;
    margin: 0;
    list-style: none;
    font-family: Comfortaa;
    width: 20em;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }

  .burgerBox {
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
  }

</style>
