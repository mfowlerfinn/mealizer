[
  {
    title: "Recipe title sample",
    id: 1234,
    category: "Main or cat_code?",
    description: "recipe description",
    story: "backstory from author, could be anything",
    measure: "weight",
    time: 40,
    difficulty: 2,
    previous_prep_needed: false,
    servings: 2,
    ingredients: {
      subheader: ["crust", "stuff"],
      crust: ["flour", 400, "yeast", 2],
      stuff: ["flour", 5],
      total: ["flour", 405, "yeast", 2]
    },
    procedures: [
      "do some prep",
      "start cooking some things",
      "cook aromatics",
      "plate and serve"
    ],
    tools_needed: ["special tools here?"],
    notes: ["author notes"],
    credit: ["author", "recipe url?"],
    days_planned: [200113, 191222, 0], //server-side only?
    days_rejected: [200102, 0, 0], //server-side only?
    rating: 5
  }
];
