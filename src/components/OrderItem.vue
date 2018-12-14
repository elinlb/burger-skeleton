<template>
	<div>
		{{order.type}} {{uiLabels.ingredients}}<br><br>
		<div v-for = "item in showCategory" :key="item">
			<div v-if ="showCategory.indexOf(item)==0">
					{{ item }}:
					{{ displayBread }}
			</div>
		</div>

			<div v-if ="showCategory.indexOf(item)==1">
				{{ item }}:
				{{ displayProtein }}<br>
		</div>
		<div v-if ="showCategory.indexOf(item)==2">
			{{ item }}:
			{{ displayVegetables }}<br>
	</div>
	<div v-if ="showCategory.indexOf(item)==3">
		{{ item }}:
		{{ displaySauce }}<br>
</div>
<div v-if ="showCategory.indexOf(item)==4">
	{{ item }}:
	{{ displayAddOns }}<br>
</div>
<div v-if ="showCategory.indexOf(item)==5">
	{{ item }}:
	{{ displaySides }}<br>
</div>
<div v-if ="showCategory.indexOf(item)==6">
	{{ item }}:
	{{ displayDrinks }}<br>
</div>

		<!-- {{order.ingredients.map(item=>item["category"])}} -->
		<!--{{ order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}-->
		</div>
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

	}
},
	computed: {
		nameMapping: function() {
			return {1: this.uiLabels.bread, 2: this.uiLabels.protein, 3: this.uiLabels.vegetables, 4: this.uiLabels.sauce, 5: this.uiLabels.addons, 6: this.uiLabels.sides, 7: this.uiLabels.drinks};
		},
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
				},
			displayBread: function() {
				return this.displayIngredient(1)
			},
			displayProtein: function() {
				return this.displayIngredient(2)
			},
			displayVegetables: function() {
				return this.displayIngredient(3)
			},
			displaySauce: function() {
				return this.displayIngredient(4)
			},
			displayAddOns: function() {
				return this.displayIngredient(5)
			},
			displaySides: function() {
				return this.displayIngredient(6)
			},
			displayDrinks: function() {
				return this.displayIngredient(7)
			}
		},
	methods: {
		displayIngredient: function(id) {
			let list = [];
			let ingredientList = this.order.ingredients;
			for (let i = 0; i < ingredientList.length; i += 1) {
				if (ingredientList[i].category === id) {
						let array = ingredientList.map(item=>item["ingredient_"+ this.lang]);
						list.push(array[i])
				}
			}
			return list.join(", ");
	},


		}

	}
</script>
<style scoped>

</style>
