<template>
<h1>Thank you!</h1>
</template>
<script>

export default {
  name: 'Pay',
  components: {
  },
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

    .sideBox {
      background-color: #F2F3F4;
      color: black;
      font-family: Comfortaa;
      width: 100%;
      /* margin-top: 70%; */
      /* margin-left: 10%; */

      line-height: 150%;
      font-weight: bold;
      text-align: center;
      font-size: 100%;

      -webkit-flex-flow: row wrap;
      justify-content: space-around;
      border-style: double;
      border-color: black;

      /* padding: 10% 30% 10% 30%; */
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
