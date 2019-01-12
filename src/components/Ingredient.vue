
<template>
<div class="ingredient box" >

    <img class="picture" :src="findImage(item.image)">
      <br>
      <button v-on:click="decrementCounter">-</button>
      {{ counter }}
      <label>
      <button v-on:click="incrementCounter">+</button>
      <th>{{item["ingredient_"+ lang]}}</th>
          </label>
      {{allergyInfo(item)}}, {{item.selling_price}}:-
  </div>
<!-- </div> -->
<!-- </div> -->



</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String,
    uiLabels: Object,
  },
    data: function () {
    return {
      counter: 0,
      allergies: ""
    };
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
  max-height: 40%;
  /* width: 60%; */
  max-width: 40%;
  /* max-width: 100px; */
  padding-left: 2em;
  align-items: center;
}

button{
  cursor: pointer;
}


</style>
