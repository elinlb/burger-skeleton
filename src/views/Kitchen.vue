<template>
<!--<div class="row">-->
<div id="orders">
  <div class ="column left">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <div>
    <OrderItemToPrepare
      v-for="(order, key) in orders"
      v-if="order.status !== 'done'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order"
      :ui-labels="uiLabels"
      :lang="lang"
      :key="key">
    </OrderItemToPrepare>
  </div>
</div>
<div class="column right">
  <div class="rowa">
  <h1>{{ uiLabels.ordersFinished }}</h1>
  <div>
    <OrderItem
      v-for="(order, key) in orders"
      v-if="order.status === 'done'"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>
</div>
<div class="rowb">
  <h1>HEJ</h1>
</div>
</div>
</div>
<!--</div>-->
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
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
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    }
  }
}
</script>
<style scoped>
	#orders {
    font-size:16pt;
    max-width: 100%;
    height: auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .flexcontainer {
    color: red;
    background-color: blue;
    display:inline-table;
    flex-direction:row;
    border: 5px solid black; /*Pixlar???*/
    margin: 0.9%;
    height: auto;
    width: 28%;

  }

  .column {
    float:left;
    /*width: 50%;*/
  }
  .left {
  width: 65%;
  }

  .right {
  width: 35%;
  height: 100%;
  }

  .rowa {
      height: 50%;
      background-color: green;
  }

  .rowb {
    height: 50%;
    background-color: pink;
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }



</style>
