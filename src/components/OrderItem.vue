<template>
	<div>

		<!-- {{"order.type"}}--> {{uiLabels.ingredients}}<br><br>
		<!-- {{order.orderId}}
		{{order.burgers}} -->

		<div v-for="(burger, key) in burgers" :key="key">
		<!-- {{sortBurgers(burger)}} -->
		<div v-for = "item in showCategory(burger)" :key="item">
			<div v-if ="item === uiLabels.bread">
					<div class="categoryHeadline">
						{{ item }}:
					</div>
					<div v-for = "(list, key) in displayBread(burger)" :key="key">
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
				<div v-for = "(list, key) in displayProtein(burger)" :key="key">
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
				<div v-for = "(list, key) in displayVegetables(burger)" :key="key">
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
				<div v-for = "(list, key) in displaySauce(burger)" :key="key">
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
				<div v-for = "(list, key) in displayAddOns(burger)" :key="key">
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
				<div v-for = "(list, key) in displaySides(burger)" :key="key">
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
				<div v-for = "(list, key) in displayDrinks(burger)" :key="key">
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
    lang: String
  },
	data: function () {
	return {

	}
},

	computed:{},

	methods: {
	// 	sendInfo: function(id) {
	// 			let listIncludingLists = [];
	// 			for (let j = 0; j < this.burgers.length; j += 1){
	// 			let ingredientList = this.burgers[j].ingredients;
	// 			for (let i = 0; i < ingredientList.length; i += 1) {
	// 				let list = [];
	// 				if (ingredientList[i].category === id) {
	// 						let array = ingredientList.map(item=>item["ingredient_"+ this.lang]);
	// 						list.push(array[i])
	// 				}
	// 				if (ingredientList[i].category === id && ingredientList[i].allergy_treatment === 1) {
	// 						let array1 = ingredientList.map(item=>item["allergy_treatment"])
	// 						list.push(array1[i])
	// 				}
	// 				listIncludingLists.push(list)
	// 	}
	// }
	// 	return listIncludingLists;
	//
	// },
		nameMapping: function() {
			return {1: this.uiLabels.bread, 2: this.uiLabels.protein, 3: this.uiLabels.vegetables, 4: this.uiLabels.sauce, 5: this.uiLabels.addons, 6: this.uiLabels.sides, 7: this.uiLabels.drinks};
		},
				// sortBurgers: function(burger) {
				// 	let burgerNumber = 0;
				// 	for (let j = 0; j < this.burgers.length; j += 1){
				// 		if (this.burgers[j] === this.burgers)
				// 		{
				// 			burgerNumber = j;
				// 		}
				// 	}
				//
				// 	return burgerNumber;
				// },
			displayBread: function(burger) {
				//fix here and the other functions
				return this.sendInfo(1,burger)//,burger)
			},
			displayProtein: function(burger) {
				return this.sendInfo(2,burger)
			},
			displayVegetables: function(burger) {
				return this.sendInfo(3,burger)
			},
			displaySauce: function(burger) {
				return this.sendInfo(4,burger)
			},
			displayAddOns: function(burger) {
				return this.sendInfo(5,burger)
			},
			displaySides: function(burger) {
				return this.sendInfo(6,burger)
			},
			displayDrinks: function(burger) {
				return this.sendInfo(7,burger)
			},

		// don't loop through all the burgers again, have burger as an argument
		sendInfo: function(id,burger) {
				let listIncludingLists = [];
				//no for loop
				// for (let j = 0; j < this.burgers.length; j += 1){
				// let ingredientList = this.burgers[j].ingredients;
				//should be burger (the argument) instead burgers

				let ingredientList = burger.ingredients;
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

	},
	showCategory: function(burger) {
		let list = [];
		//
		// for (let j = 0; j < this.burgers.length; j += 1){
		// let ingredientList = this.burgers[j].ingredients;
		// // let ingredientList = burger.ingredients;
		// Man borde egentligen skicka in en burgare från html-forloopen och sen
		// bara ta ingredienserna för en burgare i taget, men måste ändra i sendinfo då också


		//for (let j = 0; j < this.orders.burgers.length; j += 1){
		let ingredientList = burger.ingredients;
	//	console.log(ingredientList);
		// let ingredientList = this.orders.burgers.ingredients;

		for (let i = 0; i < ingredientList.length; i += 1) {
			let categoryNumber = ingredientList[i].category;
			let categoryName = this.nameMapping()[categoryNumber];
			if (!list.includes(categoryName)) {
					list.push(categoryName)
				}
				}
			// }
			return list;
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
