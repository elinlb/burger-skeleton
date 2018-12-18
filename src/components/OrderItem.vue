<template>
	<div>

		{{"order.type"}} {{uiLabels.ingredients}}<br><br>
		<!-- {{order.orderId}}
		{{order.burgers}} -->
		<div v-for="(burger, key) in burgers" :key="key">
		<div v-for = "item in showCategory" :key="item">
			<div v-if ="item === uiLabels.bread">
					<div class="categoryHeadline">
						{{ item }}:
					</div>
					<div v-for = "(list, key) in displayBread" :key="key">
							<div v-if = "list.length > 1">
								<div class = "allergy_treatment">{{list[0]}}</div>
							</div>
							<div v-else>
								{{list[0]}}
							</div>
					</div>
			</div>
			<div v-if="item === uiLabels.protein">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displayProtein" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if="item === uiLabels.vegetables">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displayVegetables" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if="item === uiLabels.sauce">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displaySauce" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if="item === uiLabels.addons">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displayAddOns" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if="item === uiLabels.sides">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displaySides" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if="item === uiLabels.drinks">
				<div class="categoryHeadline">
					{{ item }}:
				</div>
				<div v-for = "(list, key) in displayDrinks" :key="key">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    burgers: Array,
    orderId: String,
    lang: String,
		//nameMapping: Object,
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
			// for (let j = 0; j < this.orders.burgers.length; j += 1){
			let ingredientList = this.burgers[0].ingredients;
			// let ingredientList = this.orders.burgers.ingredients;

			for (let i = 0; i < ingredientList.length; i += 1) {
				let categoryNumber = ingredientList[i].category;
				let categoryName = this.nameMapping[categoryNumber]
				if (!list.includes(categoryName)) {
						list.push(categoryName)
					}
					}
				// }
					return list;
				},
			displayBread: function() {
				return this.sendInfo(1)
			},
			displayProtein: function() {
				return this.sendInfo(2)
			},
			displayVegetables: function() {
				return this.sendInfo(3)
			},
			displaySauce: function() {
				return this.sendInfo(4)
			},
			displayAddOns: function() {
				return this.sendInfo(5)
			},
			displaySides: function() {
				return this.sendInfo(6)
			},
			displayDrinks: function() {
				return this.sendInfo(7)
			}
		},
	methods: {
		sendInfo: function(id) {
				let listIncludingLists = [];
				let ingredientList = this.burgers[0].ingredients;
				for (let i = 0; i < ingredientList.length; i += 1) {
					let list = [];
					if (ingredientList[i].category === id) {
							let array = ingredientList.map(item=>item["ingredient_"+ this.lang]);
							list.push(array[i])
					}
					if (ingredientList[i].category === id && ingredientList[i].allergy_treatment === 1) {
							let array1 = ingredientList.map(item=>item["allergy_treatment"])
							list.push(array1[i])
					}
					listIncludingLists.push(list)
		}
		return listIncludingLists;
		}
}
}
</script>
<style scoped>
	.allergy_treatment {
		color: red;
	}

	.categoryHeadline{
		font-weight: bold;
	}
</style>
