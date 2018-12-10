<template>
	<div>
		{{order.type}} {{uiLabels.ingredients}}:<br>
		<div v-for = "item in showCategory">
		{{ item }}
		</div>
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
	data: function () {
	return {
		nameMapping: {1: "Bread", 2: "Protein", 3: "Vegetables", 4: "Sauce", 5: "Add-ons", 6: "Drinks"}
	}
},
	computed: {
		showCategory: function() {
			let list = [];
			let ingredientList = this.order.ingredients;
			for (let i = 0; i < ingredientList.length; i += 1) {
				let categoryNumber = ingredientList[i].category;
				let categoryName = this.nameMapping[categoryNumber]
				if (!list.includes(categoryName)) {
						list.push(categoryName)
					}
					}
					return list;
				}
			}
		}
</script>
<style scoped>

</style>
