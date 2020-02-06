[
  {
    title: "Recipe title sample",
    id: 1234, //auto generated on submit
    author: "john doe", //author import OR this user
    url: "recipe url", //only on import
    imageUrl: "image/url", //will need server storage
    cookingMethod: "frying, steaming, baking, grilling, etc.",
    category: "Main or cat_code?", //
    cuisine: "culture", //may be difficult to maintain, but helpful if possible
    description: "recipe description",
    story: "backstory from author, could be anything",
    measureMethod: "weight", //or volume
    time: 40,
    //difficulty: 2,
    previous_prep_needed: false,
    yield: 3,
    yieldUnit: "loaf",
    servingSize: 500, //guess based on type of recipe (dessert vs main vs side)
    servingUnit: "ml",
    servings: "best guess", //(servings = (yieldUnit * yield) / servingSize) OR by user definition

    //future pan scaling possible?
    //containerQuantity
    //containerSize
    //containerUnit
    //containerTotalVolume
    //use external reference array of common pan sizes and their volume (per cookbook definitions) to help
    
    
    ingredients: {
      subheader: ["iList1", "iList2"],
      iList1: ["flour", 1000, "yeast", 10, "water", 700, "salt", 20],
      iList2: ["flour", 5],
      total: ["flour", 1005, "yeast", 10, "water", 700, "salt", 20]
    },
    procedures: [
      "do some prep",
      "iList1",
      "start cooking some things",
      "iList2",
      "cook aromatics",
      "plate and serve"
    ],
    tools_needed: ["special tools here?"],
    notes: ["author notes"],

    days_planned: [200113, 191222, 0], //server-side only?
    days_rejected: [200102, 0, 0], //server-side only?
    rating: 5
  }
];
