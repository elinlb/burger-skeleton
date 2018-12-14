<template>
	<div>

		{{order.type}} {{uiLabels.ingredients}}<br><br>
		<div v-for = "item in showCategory" :key="item">
			<div v-if ="showCategory.indexOf(item)==0">
					{{ item }}:
					<div v-for = "list in displayBread">
							<div v-if = "list.length > 1">
								<div class = "allergy_treatment">{{list[0]}}</div>
							</div>
							<div v-else>
								{{list[0]}}
							</div>
					</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==1">
				{{ item }}:
				<div v-for = "list in displayProtein">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==2">
				{{ item }}:
				<div v-for = "list in displayVegetables">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==3">
				{{ item }}:
				<div v-for = "list in displaySauce">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==4">
				{{ item }}:
				<div v-for = "list in displayAddOns">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==5">
				{{ item }}:
				<div v-for = "list in displayAddons">
						<div v-if = "list.length > 1">
							<div class = "allergy_treatment">{{list[0]}}</div>
						</div>
						<div v-else>
							{{list[0]}}
						</div>
				</div>
			</div>
			<div v-if ="showCategory.indexOf(item)==6">
				{{ item }}:
				<div v-for = "list in displayAddons">
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
				let ingredientList = this.order.ingredients;
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
</style>
