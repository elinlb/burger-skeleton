<template>
	<div>
		{{order.type}} {{uiLabels.ingredients}}:<br>
		<!--{{showCategory()}}-->
		{{order.ingredients.map(item=>item["category"])}} {{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
  },
	/*methods: {
		showCategory: function() {
			console.log("Hej!")
			categoryList: this.order.ingredients.map(item=>item["category"]);
			for (category in categoryList) {
				if (category === 1) {
					return "Hej";
				}
			}
		}
	}*/

}
</script>
<style scoped>

</style>
