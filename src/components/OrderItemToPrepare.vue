<template>
  <!-- Note in this component that it is using another component -->
<div class="flexcontainer">
<ol>
  <h4>Order {{orderId}}</h4>
<div>
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :burgers="burgers">
  </OrderItem>
  <button v-on:click="orderDone">
    {{uiLabels.ready}}
  </button>
</div>
</ol>

</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    burgers: Array,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>

</style>
