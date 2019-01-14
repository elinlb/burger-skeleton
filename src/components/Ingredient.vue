
<template>

<div class="ingredient box" >
  <p>
    <p>
    <span><th @click="incrementCounter">{{item["ingredient_"+ lang]}}</th>{{allergyInfo(item)}}</span>
    </p>
    <img class="picture" :src="findImage(item.image)" @click="incrementCounter">
      <br>
      <button class= "decrement" v-on:click="decrementCounter" >-</button>
      {{ counter }}
      <button class= "increment" v-on:click="incrementCounter" >+</button>
      <p @click="incrementCounter"></p>
      {{item.selling_price}}:-
    </p>
  </div>

</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String,
    uiLabels: Object,
    counter_initial: Number,
  },
    data: function () {
    return {
      counter: 0,
      allergies: ""
    };
  },
  mounted: function(){
    this.counter = this.counter_initial
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      // (see ingredient html-tag in Ordering.vue)
      this.$emit('increment');
    },
    decrementCounter: function () {
      if (this.counter > 0) {
        this.counter -= 1;
        // sending 'increment' message to parent component or view so that it
        // can catch it with v-on:increment in the component declaration
        // (see ingredient html-tag in Ordering.vue)
        this.$emit('decrement');
      }
    },
    resetCounter: function () {
      this.counter = 0;
    },
    findImage: function(image){
      if(image !== "") {
        let img=require('../assets/'+ image);
        return img;
      }
      else return require('../assets/burger.png')

    },
    allergyInfo: function (item) {
      let allergies = "";
      if (item.milk_free === 0){
        allergies += "(m)";

      }
      if (item.gluten_free === 0){
        allergies += "(g)";
      }
      if (item.vegan === 1){
        allergies += "(v)";
      }
      return allergies;
    }

  }
}

</script>
<style scoped>


.picture {
  display: block;
  /* height: auto; */
  max-height: 30%;
  width: 35%;
  max-width: 35%;
  /* max-width: 100px; */
  /*padding-left: 2em;*/
  align-items: center;
  margin: auto;

}
/* .increment {

  margin-left: 55%;
  margin-top: 5%;
  border-style: outset;
  font-family: Comfortaa;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    justify-content: space-around;
} */
/* .decrement {

  margin-left: 35%;
  margin-top: 0%;
  border-style: outset;
  font-family: Comfortaa;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    justify-content: space-around;
} */

button{
  cursor: pointer;
}


</style>
