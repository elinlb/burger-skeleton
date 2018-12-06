<template>
<div id="styling">
Hej
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <router-link to="ordering">Order stuff</router-link>
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


  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
</style>
