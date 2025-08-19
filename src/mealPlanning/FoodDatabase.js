// FoodDatabase.js - Complete enhanced food database with dietary tags

export const FoodDatabase = {
  protein: {
    'Chicken Breast': {
      protein: 31, carbs: 0, fat: 3.6, sugar: 0, calories: 165,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Egg Whites': {
      protein: 3.6, carbs: 0.2, fat: 0.1, sugar: 0.2, calories: 17,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Tuna (canned in water)': {
      protein: 23, carbs: 0, fat: 1, sugar: 0, calories: 108,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Turkey Breast': {
      protein: 29, carbs: 0, fat: 1, sugar: 0, calories: 135,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Lean Beef (90/10)': {
      protein: 26, carbs: 0, fat: 10, sugar: 0, calories: 176,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Salmon': {
      protein: 20, carbs: 0, fat: 13, sugar: 0, calories: 208,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Greek Yogurt (non-fat)': {
      protein: 23, carbs: 9, fat: 0, sugar: 6, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Cottage Cheese (low-fat)': {
      protein: 14, carbs: 5, fat: 2, sugar: 4, calories: 90,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Eggs (whole)': {
      protein: 6, carbs: 0.6, fat: 5, sugar: 0.6, calories: 70,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Tofu (firm)': {
      protein: 15, carbs: 4, fat: 8, sugar: 1, calories: 144,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Tempeh': {
      protein: 19, carbs: 9, fat: 11, sugar: 0, calories: 193,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Lentils (cooked)': {
      protein: 9, carbs: 20, fat: 0.4, sugar: 2, calories: 116,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Chickpeas (cooked)': {
      protein: 8, carbs: 27, fat: 2.6, sugar: 5, calories: 164,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    }
  },

  carbohydrate: {
    'Brown Rice (cooked)': {
      protein: 2.6, carbs: 23, fat: 0.9, sugar: 0.4, calories: 112,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Oats (dry)': {
      protein: 5, carbs: 27, fat: 3, sugar: 1, calories: 150,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Sweet Potato': {
      protein: 1.6, carbs: 20, fat: 0.1, sugar: 4.2, calories: 86,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'White Rice (cooked)': {
      protein: 2.7, carbs: 28, fat: 0.3, sugar: 0.1, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Quinoa (cooked)': {
      protein: 4.1, carbs: 21, fat: 1.9, sugar: 0.9, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Whole Wheat Bread': {
      protein: 4, carbs: 12, fat: 1, sugar: 2, calories: 74,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Bagel (plain)': {
      protein: 9, carbs: 48, fat: 1.5, sugar: 6, calories: 245,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Pasta (cooked)': {
      protein: 5, carbs: 25, fat: 1.1, sugar: 0.6, calories: 131,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'White Bread': {
      protein: 2.7, carbs: 13, fat: 0.8, sugar: 1.5, calories: 70,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Potato (baked)': {
      protein: 2.9, carbs: 37, fat: 0.2, sugar: 1.6, calories: 161,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Cauliflower Rice': {
      protein: 2, carbs: 5, fat: 0.1, sugar: 2, calories: 25,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Rice Cakes': {
      protein: 0.7, carbs: 7, fat: 0.4, sugar: 0.1, calories: 35,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    }
  },

  fruits: {
    'Apple': {
      protein: 0.3, carbs: 14, fat: 0.2, sugar: 10, calories: 52,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Banana': {
      protein: 1.3, carbs: 23, fat: 0.3, sugar: 12, calories: 89,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Strawberries': {
      protein: 0.7, carbs: 7, fat: 0.3, sugar: 5, calories: 32,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Blueberries': {
      protein: 0.7, carbs: 14, fat: 0.3, sugar: 10, calories: 57,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Orange': {
      protein: 0.9, carbs: 12, fat: 0.1, sugar: 9, calories: 47,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Grapes': {
      protein: 0.6, carbs: 16, fat: 0.2, sugar: 16, calories: 62,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Berries': {
      protein: 0.7, carbs: 12, fat: 0.3, sugar: 8, calories: 52,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Blackberries': {
      protein: 1.4, carbs: 10, fat: 0.5, sugar: 5, calories: 43,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Raspberries': {
      protein: 1.2, carbs: 12, fat: 0.7, sugar: 4, calories: 52,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    }
  },

  fat: {
    'Avocado': {
      protein: 2, carbs: 9, fat: 15, sugar: 0.7, calories: 160,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Almonds': {
      protein: 6, carbs: 6, fat: 14, sugar: 1.2, calories: 164,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Peanut Butter': {
      protein: 8, carbs: 6, fat: 16, sugar: 3, calories: 188,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Olive Oil': {
      protein: 0, carbs: 0, fat: 14, sugar: 0, calories: 119,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Walnuts': {
      protein: 4, carbs: 4, fat: 18, sugar: 1, calories: 185,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Cashews': {
      protein: 5, carbs: 9, fat: 12, sugar: 1.7, calories: 157,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Coconut Oil': {
      protein: 0, carbs: 0, fat: 14, sugar: 0, calories: 121,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'MCT Oil': {
      protein: 0, carbs: 0, fat: 14, sugar: 0, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    }
  },

  vegetables: {
    'Broccoli': {
      protein: 2.8, carbs: 6, fat: 0.4, sugar: 1.5, calories: 25,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Spinach': {
      protein: 2.9, carbs: 3.6, fat: 0.4, sugar: 0.4, calories: 23,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Bell Peppers': {
      protein: 1, carbs: 7, fat: 0.3, sugar: 5, calories: 31,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Carrots': {
      protein: 0.9, carbs: 10, fat: 0.2, sugar: 4.7, calories: 41,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Asparagus': {
      protein: 2.2, carbs: 3.9, fat: 0.1, sugar: 1.9, calories: 20,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Green Beans': {
      protein: 1.8, carbs: 7, fat: 0.2, sugar: 3.3, calories: 31,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Zucchini': {
      protein: 1.2, carbs: 3.1, fat: 0.3, sugar: 2.5, calories: 17,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    }
  },

  supplements: {
    'Whey Protein (generic)': {
      protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Plant Protein (pea/rice)': {
      protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Quest Bar': {
      protein: 20, carbs: 4, fat: 8, sugar: 1, calories: 190,
      dietaryTags: { glutenFree: true }
    },
    'Pure Protein Bar': {
      protein: 20, carbs: 17, fat: 2, sugar: 3, calories: 180,
      dietaryTags: { glutenFree: true }
    },
    'String Cheese': {
      protein: 6, carbs: 1, fat: 5, sugar: 0, calories: 70,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Hard-Boiled Egg': {
      protein: 6, carbs: 0.5, fat: 5, sugar: 0, calories: 70,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Coconut Yogurt': {
      protein: 1, carbs: 6, fat: 5, sugar: 4, calories: 70,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    }
  },

  condiments: {
    'Mustard': {
      protein: 0.2, carbs: 0.3, fat: 0.2, sugar: 0.1, calories: 3,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Hot Sauce': {
      protein: 0.1, carbs: 0.1, fat: 0, sugar: 0, calories: 1,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Honey': {
      protein: 0.1, carbs: 17, fat: 0, sugar: 16, calories: 64,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Coconut Aminos': {
      protein: 0.5, carbs: 1, fat: 0, sugar: 1, calories: 5,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Nutritional Yeast': {
      protein: 8, carbs: 5, fat: 1, sugar: 0, calories: 60,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    }
  }
};

// Helper functions
export const getFoodNutrition = (foodName, category) => {
  return FoodDatabase[category]?.[foodName] || {
    calories: 100, protein: 5, carbs: 10, fat: 3, sugar: 2,
    dietaryTags: {}
  };
};

export const checkDietaryCompatibility = (foodName, category, dietaryFilters) => {
  const food = FoodDatabase[category]?.[foodName];
  if (!food || !food.dietaryTags) return true; // Assume compatible if no tags

  return dietaryFilters.every(filter => food.dietaryTags[filter] === true);
};

export const getFoodsInCategory = (category) => {
  return Object.keys(FoodDatabase[category] || {});
};

export const getAllCategories = () => {
  return Object.keys(FoodDatabase);
};

export const getServingInfo = (category, food) => {
  // Simple serving reference for palm method
  const servingReferences = {
    protein: '1 palm',
    carbohydrate: '1 cupped palm',
    fruits: '1 fist',
    fat: '1 thumb',
    vegetables: '1 fist',
    supplements: '1 serving',
    condiments: '1 tsp'
  };

  return {
    palm: servingReferences[category] || '1 serving',
    grams: 100,
    ounces: 3.5
  };
};