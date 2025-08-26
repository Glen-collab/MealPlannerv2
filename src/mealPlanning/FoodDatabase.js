// FoodDatabase.js - MERGED COMPREHENSIVE DATABASE with dietary tags

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
    'Cod': {
      protein: 20, carbs: 0, fat: 0.7, sugar: 0, calories: 89,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Tilapia': {
      protein: 20, carbs: 0, fat: 1.7, sugar: 0, calories: 96,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Shrimp': {
      protein: 18, carbs: 1, fat: 0.3, sugar: 0, calories: 85,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'Lean Ground Turkey': {
      protein: 27, carbs: 0, fat: 8, sugar: 0, calories: 176,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    // Enhanced additions
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
    'Cereal (oats)': {
      protein: 3, carbs: 27, fat: 2, sugar: 1, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Jasmine Rice (cooked)': {
      protein: 2.7, carbs: 28, fat: 0.3, sugar: 0.1, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Ezekiel Bread': {
      protein: 4, carbs: 15, fat: 0.5, sugar: 0, calories: 80,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Rice Cakes': {
      protein: 0.7, carbs: 7, fat: 0.4, sugar: 0.1, calories: 35,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Cream of Rice (dry)': {
      protein: 1.5, carbs: 22, fat: 0.5, sugar: 0, calories: 95,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Instant Oats (dry)': {
      protein: 5, carbs: 27, fat: 3, sugar: 1, calories: 150,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    // Enhanced additions
    'Cauliflower Rice': {
      protein: 2, carbs: 5, fat: 0.1, sugar: 2, calories: 25,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
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
    'Kiwi': {
      protein: 1.1, carbs: 15, fat: 0.5, sugar: 9, calories: 61,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Grapes': {
      protein: 0.6, carbs: 16, fat: 0.2, sugar: 16, calories: 62,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Raspberries': {
      protein: 1.2, carbs: 12, fat: 0.7, sugar: 4, calories: 52,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Watermelon': {
      protein: 0.6, carbs: 8, fat: 0.2, sugar: 6, calories: 30,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Blackberries': {
      protein: 1.4, carbs: 10, fat: 0.5, sugar: 5, calories: 43,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Gooseberries': {
      protein: 0.9, carbs: 10, fat: 0.6, sugar: 8, calories: 44,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Orange': {
      protein: 0.9, carbs: 12, fat: 0.1, sugar: 9, calories: 47,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Lemon': {
      protein: 1.1, carbs: 9, fat: 0.3, sugar: 2.5, calories: 29,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Lime': {
      protein: 0.7, carbs: 11, fat: 0.2, sugar: 1.7, calories: 30,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Clementine': {
      protein: 0.9, carbs: 12, fat: 0.2, sugar: 9, calories: 47,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Cantaloupe': {
      protein: 0.8, carbs: 8, fat: 0.2, sugar: 8, calories: 34,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Honeydew Melon': {
      protein: 0.5, carbs: 9, fat: 0.1, sugar: 8, calories: 36,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Cuties (Mandarin)': {
      protein: 0.8, carbs: 13, fat: 0.3, sugar: 11, calories: 53,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    // Enhanced additions
    'Berries': {
      protein: 0.7, carbs: 12, fat: 0.3, sugar: 8, calories: 52,
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
    'Chia Seeds': {
      protein: 5, carbs: 12, fat: 9, sugar: 0, calories: 138,
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
    },
    'Flaxseeds': {
      protein: 1.9, carbs: 2.9, fat: 4.3, sugar: 0.2, calories: 55,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Hemp Seeds': {
      protein: 3.3, carbs: 1.2, fat: 4.9, sugar: 0.2, calories: 57,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Sunflower Seeds': {
      protein: 2.4, carbs: 2.1, fat: 5.2, sugar: 0.3, calories: 64,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Pumpkin Seeds': {
      protein: 2.5, carbs: 1.5, fat: 4, sugar: 0.1, calories: 47,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Pecans': {
      protein: 1, carbs: 1.4, fat: 7, sugar: 0.4, calories: 69,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Brazil Nuts': {
      protein: 2, carbs: 1.2, fat: 8.5, sugar: 0.2, calories: 93,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Macadamia Nuts': {
      protein: 1.1, carbs: 1.6, fat: 10.6, sugar: 0.6, calories: 102,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Sesame Seeds': {
      protein: 1.6, carbs: 2.1, fat: 4.5, sugar: 0.1, calories: 52,
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
    'Cucumber': {
      protein: 0.7, carbs: 4, fat: 0.1, sugar: 2, calories: 16,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Tomatoes': {
      protein: 0.9, carbs: 3.9, fat: 0.2, sugar: 2.6, calories: 18,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Lettuce (Romaine)': {
      protein: 1.2, carbs: 2, fat: 0.3, sugar: 1.2, calories: 17,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
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
    // Protein Powders
    'Whey Protein (generic)': {
      protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'ON Gold Standard Whey': {
      protein: 24, carbs: 1, fat: 1, sugar: 1, calories: 110,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Ryse Protein': {
      protein: 25, carbs: 2, fat: 1, sugar: 1, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Bucked Up Protein': {
      protein: 24, carbs: 1, fat: 1, sugar: 0, calories: 110,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Raw Nutrition Protein': {
      protein: 25, carbs: 2, fat: 1.5, sugar: 1, calories: 125,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'EAS Protein': {
      protein: 23, carbs: 3, fat: 2, sugar: 2, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Whey Protein Isolate': {
      protein: 25, carbs: 1, fat: 0.5, sugar: 0, calories: 110,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Collagen Protein': {
      protein: 20, carbs: 0, fat: 0, sugar: 0, calories: 80,
      dietaryTags: { glutenFree: true, dairyFree: true, keto: true }
    },
    'AdvoCare Body Lean 25': {
      protein: 25, carbs: 6, fat: 1.5, sugar: 4, calories: 138,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Plant Protein (pea/rice)': {
      protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },

    // Meal Replacements
    'AdvoCare Meal Replacement': {
      protein: 24, carbs: 24, fat: 2, sugar: 6, calories: 210,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },

    // Protein Bars
    'Quest Bar': {
      protein: 20, carbs: 4, fat: 8, sugar: 1, calories: 190,
      dietaryTags: { glutenFree: true }
    },
    'Pure Protein Bar': {
      protein: 20, carbs: 17, fat: 2, sugar: 3, calories: 180,
      dietaryTags: { glutenFree: true }
    },
    'Met-RX Big 100': {
      protein: 30, carbs: 22, fat: 9, sugar: 16, calories: 410,
      dietaryTags: { glutenFree: true }
    },
    'Fit Crunch Bar': {
      protein: 16, carbs: 25, fat: 6, sugar: 5, calories: 190,
      dietaryTags: { glutenFree: true }
    },
    'Atkins Meal Bar': {
      protein: 15, carbs: 19, fat: 11, sugar: 1, calories: 250,
      dietaryTags: { glutenFree: true }
    },
    'Atkins Snack Bar': {
      protein: 10, carbs: 15, fat: 9, sugar: 1, calories: 170,
      dietaryTags: { glutenFree: true }
    },
    'Protein Bar (generic)': {
      protein: 20, carbs: 15, fat: 6, sugar: 8, calories: 190,
      dietaryTags: { glutenFree: true }
    },

    // Ready-to-Drink (RTD)
    'Pure Protein RTD': {
      protein: 35, carbs: 5, fat: 1.5, sugar: 2, calories: 160,
      dietaryTags: { glutenFree: true }
    },
    'Atkins RTD': {
      protein: 15, carbs: 5, fat: 10, sugar: 1, calories: 160,
      dietaryTags: { glutenFree: true }
    },
    'Fairlife Core Power 42g': {
      protein: 42, carbs: 6, fat: 6, sugar: 6, calories: 230,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Fairlife Core Power 26g': {
      protein: 26, carbs: 5, fat: 4.5, sugar: 5, calories: 150,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Fairlife Milk (8oz)': {
      protein: 13, carbs: 6, fat: 4.5, sugar: 6, calories: 110,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },

    // High-Protein Snacks
    'Beef Jerky (1oz)': {
      protein: 9, carbs: 6, fat: 1.5, sugar: 6, calories: 80,
      dietaryTags: { glutenFree: true, dairyFree: true }
    },
    'Turkey Jerky (1oz)': {
      protein: 11, carbs: 4, fat: 1, sugar: 3, calories: 70,
      dietaryTags: { glutenFree: true, dairyFree: true }
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

  // CRITICAL: Added missing 'snacks' category
  snacks: {
    'Popcorn (air-popped)': {
      protein: 3.2, carbs: 19, fat: 1.1, sugar: 0.1, calories: 93,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Pretzels': {
      protein: 2.8, carbs: 22, fat: 0.8, sugar: 0.5, calories: 108,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Rice Cakes (plain)': {
      protein: 0.7, carbs: 7, fat: 0.4, sugar: 0.1, calories: 35,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Crackers (whole wheat)': {
      protein: 1.9, carbs: 11, fat: 1.4, sugar: 0.4, calories: 60,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },

    // Junk foods
    'Chocolate Chip Cookies (2 medium)': {
      protein: 2, carbs: 22, fat: 8, sugar: 15, calories: 160,
      dietaryTags: { vegetarian: true }
    },
    'Frosted Donut': {
      protein: 3, carbs: 31, fat: 13, sugar: 16, calories: 240,
      dietaryTags: { vegetarian: true }
    },
    'Chocolate Cake (slice)': {
      protein: 4, carbs: 51, fat: 15, sugar: 35, calories: 340,
      dietaryTags: { vegetarian: true }
    },
    'Ice Cream (1/2 cup)': {
      protein: 2.5, carbs: 16, fat: 7, sugar: 14, calories: 130,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Potato Chips (1 oz bag)': {
      protein: 2, carbs: 15, fat: 10, sugar: 0.5, calories: 150,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Beer (12 oz)': {
      protein: 1.6, carbs: 13, fat: 0, sugar: 0, calories: 150,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Red Wine (5 oz)': {
      protein: 0.1, carbs: 4, fat: 0, sugar: 1, calories: 125,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Cola/Soda (12 oz)': {
      protein: 0, carbs: 39, fat: 0, sugar: 39, calories: 150,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Snickers Bar (fun size)': {
      protein: 2, carbs: 12, fat: 4, sugar: 10, calories: 80,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'French Fries (medium)': {
      protein: 4, carbs: 43, fat: 17, sugar: 0.5, calories: 320,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Pizza Slice (cheese)': {
      protein: 12, carbs: 30, fat: 10, sugar: 4, calories: 250,
      dietaryTags: { vegetarian: true }
    },
    'Energy Drink (8 oz)': {
      protein: 0, carbs: 27, fat: 0, sugar: 27, calories: 110,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Chocolate Milkshake (12 oz)': {
      protein: 8, carbs: 56, fat: 12, sugar: 52, calories: 340,
      dietaryTags: { vegetarian: true, glutenFree: true }
    },
    'Frosted Cereal (1 cup)': {
      protein: 1, carbs: 27, fat: 0.5, sugar: 12, calories: 110,
      dietaryTags: { vegetarian: true }
    },
    'Blueberry Muffin (large)': {
      protein: 4, carbs: 47, fat: 8, sugar: 25, calories: 270,
      dietaryTags: { vegetarian: true }
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
    'Lemon Juice': {
      protein: 0.1, carbs: 1.3, fat: 0, sugar: 0.4, calories: 7,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Soy Sauce (low sodium)': {
      protein: 1.3, carbs: 0.8, fat: 0, sugar: 0.1, calories: 10,
      dietaryTags: { vegetarian: true, dairyFree: true }
    },
    'Salsa': {
      protein: 0.2, carbs: 1, fat: 0, sugar: 0.5, calories: 4,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Ketchup': {
      protein: 0.2, carbs: 4.1, fat: 0.1, sugar: 3.7, calories: 17,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Sriracha': {
      protein: 0.2, carbs: 1, fat: 0.1, sugar: 1, calories: 5,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Balsamic Vinegar': {
      protein: 0, carbs: 2.7, fat: 0, sugar: 2.4, calories: 10,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
    },
    'Apple Cider Vinegar': {
      protein: 0, carbs: 0.1, fat: 0, sugar: 0.1, calories: 3,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Garlic Powder': {
      protein: 0.5, carbs: 2, fat: 0, sugar: 0.1, calories: 10,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Onion Powder': {
      protein: 0.3, carbs: 1.9, fat: 0, sugar: 0.4, calories: 8,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Black Pepper': {
      protein: 0.1, carbs: 0.4, fat: 0, sugar: 0, calories: 2,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Paprika': {
      protein: 0.3, carbs: 1.2, fat: 0.3, sugar: 0.9, calories: 6,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Italian Seasoning': {
      protein: 0.1, carbs: 0.6, fat: 0.1, sugar: 0.1, calories: 3,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Everything Bagel Seasoning': {
      protein: 0.2, carbs: 0.5, fat: 0.2, sugar: 0, calories: 5,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true }
    },
    'Hummus': {
      protein: 2, carbs: 5, fat: 2.5, sugar: 0.5, calories: 50,
      dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true }
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

// Serving size conversions (comprehensive from original database)
export const servingSizeConversions = {
  protein: {
    'Chicken Breast': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Egg Whites': { grams: 33, ounces: 1.2, cups: 0.15, palm: '1 egg white' },
    'Tuna (canned in water)': { grams: 85, ounces: 3, cups: 0.5, palm: '1 palm' },
    'Turkey Breast': { grams: 85, ounces: 3, cups: 0.5, palm: '1 palm' },
    'Lean Beef (90/10)': { grams: 85, ounces: 3, cups: 0.5, palm: '1 palm' },
    'Salmon': { grams: 85, ounces: 3, cups: 0.5, palm: '1 palm' },
    'Greek Yogurt (non-fat)': { grams: 245, ounces: 8.6, cups: 1, palm: '2 cupped palms' },
    'Cottage Cheese (low-fat)': { grams: 113, ounces: 4, cups: 0.5, palm: '1 cupped palm' },
    'Eggs (whole)': { grams: 50, ounces: 1.8, cups: 0.25, palm: '1 egg' },
    'Cod': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Tilapia': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Shrimp': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Lean Ground Turkey': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Tofu (firm)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Tempeh': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 palm' },
    'Lentils (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'Chickpeas (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' }
  },

  carbohydrate: {
    'Brown Rice (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'Oats (dry)': { grams: 40, ounces: 1.4, cups: 0.5, palm: '1 cupped palm' },
    'Sweet Potato': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 fist' },
    'White Rice (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'Quinoa (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'Whole Wheat Bread': { grams: 28, ounces: 1, cups: 0.125, palm: '1 slice' },
    'Bagel (plain)': { grams: 85, ounces: 3, cups: 0.5, palm: '1 bagel' },
    'Pasta (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'White Bread': { grams: 28, ounces: 1, cups: 0.125, palm: '1 slice' },
    'Potato (baked)': { grams: 150, ounces: 5.3, cups: 0.5, palm: '1 fist' },
    'Cereal (oats)': { grams: 40, ounces: 1.4, cups: 0.5, palm: '1 cupped palm' },
    'Jasmine Rice (cooked)': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 cupped palm' },
    'Ezekiel Bread': { grams: 34, ounces: 1.2, cups: 0.125, palm: '1 slice' },
    'Rice Cakes': { grams: 9, ounces: 0.3, cups: 0.06, palm: '1 cake' },
    'Cream of Rice (dry)': { grams: 30, ounces: 1, cups: 0.25, palm: '1/4 cup' },
    'Instant Oats (dry)': { grams: 40, ounces: 1.4, cups: 0.5, palm: '1/2 cup' },
    'Cauliflower Rice': { grams: 100, ounces: 3.5, cups: 1, palm: '1 cupped palm' }
  },

  fruits: {
    'Apple': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 medium' },
    'Banana': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 medium' },
    'Strawberries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Blueberries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Kiwi': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 large' },
    'Grapes': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Raspberries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Watermelon': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Blackberries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Gooseberries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Orange': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 medium' },
    'Lemon': { grams: 60, ounces: 2, cups: 0.25, palm: '1 medium' },
    'Lime': { grams: 60, ounces: 2, cups: 0.25, palm: '1 medium' },
    'Clementine': { grams: 75, ounces: 2.5, cups: 0.33, palm: '1 small' },
    'Cantaloupe': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Honeydew Melon': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' },
    'Cuties (Mandarin)': { grams: 75, ounces: 2.5, cups: 0.33, palm: '1 small' },
    'Berries': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 cupped palm' }
  },

  fat: {
    'Avocado': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1/2 avocado' },
    'Almonds': { grams: 28, ounces: 1, cups: 0.25, palm: '1 handful' },
    'Peanut Butter': { grams: 32, ounces: 1.1, cups: 0.125, palm: '1 thumb' },
    'Olive Oil': { grams: 14, ounces: 0.5, cups: 0.06, palm: '1 thumb' },
    'Chia Seeds': { grams: 28, ounces: 1, cups: 0.125, palm: '1 thumb' },
    'Walnuts': { grams: 28, ounces: 1, cups: 0.25, palm: '1 handful' },
    'Cashews': { grams: 28, ounces: 1, cups: 0.25, palm: '1 handful' },
    'Coconut Oil': { grams: 14, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'MCT Oil': { grams: 14, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Flaxseeds': { grams: 12, ounces: 0.4, cups: 0.06, palm: '1 tbsp' },
    'Hemp Seeds': { grams: 10, ounces: 0.35, cups: 0.06, palm: '1 tbsp' },
    'Sunflower Seeds': { grams: 16, ounces: 0.56, cups: 0.06, palm: '1 tbsp' },
    'Pumpkin Seeds': { grams: 8, ounces: 0.28, cups: 0.06, palm: '1 tbsp' },
    'Pecans': { grams: 10, ounces: 0.35, cups: 0.06, palm: '1 tbsp' },
    'Brazil Nuts': { grams: 10, ounces: 0.35, cups: 0.06, palm: '1 tbsp' },
    'Macadamia Nuts': { grams: 11, ounces: 0.39, cups: 0.06, palm: '1 tbsp' },
    'Sesame Seeds': { grams: 9, ounces: 0.32, cups: 0.06, palm: '1 tbsp' }
  },

  vegetables: {
    'Broccoli': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Spinach': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Bell Peppers': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Carrots': { grams: 100, ounces: 3.5, cups: 0.5, palm: '1 fist' },
    'Cucumber': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Tomatoes': { grams: 100, ounces: 3.5, cups: 0.75, palm: '1 fist' },
    'Lettuce (Romaine)': { grams: 100, ounces: 3.5, cups: 2, palm: '2 cupped palms' },
    'Asparagus': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Green Beans': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' },
    'Zucchini': { grams: 100, ounces: 3.5, cups: 1, palm: '1 fist' }
  },

  supplements: {
    // Protein Powders (per scoop)
    'Whey Protein (generic)': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'ON Gold Standard Whey': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'Ryse Protein': { grams: 31, ounces: 1.1, cups: 0.125, palm: '1 scoop' },
    'Bucked Up Protein': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'Raw Nutrition Protein': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'EAS Protein': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'Whey Protein Isolate': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'Collagen Protein': { grams: 20, ounces: 0.7, cups: 0.1, palm: '1 scoop' },
    'AdvoCare Body Lean 25': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },
    'Plant Protein (pea/rice)': { grams: 30, ounces: 1, cups: 0.125, palm: '1 scoop' },

    // Meal Replacements
    'AdvoCare Meal Replacement': { grams: 35, ounces: 1.2, cups: 0.15, palm: '1 scoop' },

    // Protein Bars
    'Quest Bar': { grams: 60, ounces: 2.1, cups: 0.25, palm: '1 bar' },
    'Pure Protein Bar': { grams: 50, ounces: 1.8, cups: 0.2, palm: '1 bar' },
    'Met-RX Big 100': { grams: 100, ounces: 3.5, cups: 0.4, palm: '1 large bar' },
    'Fit Crunch Bar': { grams: 88, ounces: 3.1, cups: 0.35, palm: '1 bar' },
    'Atkins Meal Bar': { grams: 60, ounces: 2.1, cups: 0.25, palm: '1 bar' },
    'Atkins Snack Bar': { grams: 35, ounces: 1.2, cups: 0.15, palm: '1 small bar' },
    'Protein Bar (generic)': { grams: 60, ounces: 2, cups: 0.25, palm: '1 bar' },

    // Ready-to-Drink (RTD) 
    'Pure Protein RTD': { grams: 325, ounces: 11, cups: 1.4, palm: '1 bottle' },
    'Atkins RTD': { grams: 325, ounces: 11, cups: 1.4, palm: '1 bottle' },
    'Fairlife Core Power 42g': { grams: 414, ounces: 14, cups: 1.75, palm: '1 bottle' },
    'Fairlife Core Power 26g': { grams: 325, ounces: 11, cups: 1.4, palm: '1 bottle' },
    'Fairlife Milk (8oz)': { grams: 240, ounces: 8, cups: 1, palm: '1 cup' },

    // High-Protein Snacks
    'Beef Jerky (1oz)': { grams: 28, ounces: 1, cups: 0.125, palm: '1 handful' },
    'Turkey Jerky (1oz)': { grams: 28, ounces: 1, cups: 0.125, palm: '1 handful' },
    'String Cheese': { grams: 28, ounces: 1, cups: 0.125, palm: '1 stick' },
    'Hard-Boiled Egg': { grams: 50, ounces: 1.8, cups: 0.25, palm: '1 egg' },
    'Coconut Yogurt': { grams: 245, ounces: 8.6, cups: 1, palm: '1 cup' }
  },

  snacks: {
    'Popcorn (air-popped)': { grams: 24, ounces: 0.85, cups: 3, palm: '3 cups popped' },
    'Pretzels': { grams: 30, ounces: 1, cups: 0.5, palm: '1 handful' },
    'Rice Cakes (plain)': { grams: 9, ounces: 0.3, cups: 0.06, palm: '1 cake' },
    'Crackers (whole wheat)': { grams: 16, ounces: 0.56, cups: 0.1, palm: '5 crackers' },
    'Chocolate Chip Cookies (2 medium)': { grams: 32, ounces: 1.1, cups: 0.15, palm: '2 cookies' },
    'Frosted Donut': { grams: 60, ounces: 2.1, cups: 0.25, palm: '1 donut' },
    'Chocolate Cake (slice)': { grams: 95, ounces: 3.4, cups: 0.4, palm: '1 slice' },
    'Ice Cream (1/2 cup)': { grams: 66, ounces: 2.3, cups: 0.5, palm: '1 scoop' },
    'Potato Chips (1 oz bag)': { grams: 28, ounces: 1, cups: 0.5, palm: '1 small bag' },
    'Beer (12 oz)': { grams: 355, ounces: 12, cups: 1.5, palm: '1 bottle' },
    'Red Wine (5 oz)': { grams: 148, ounces: 5, cups: 0.6, palm: '1 glass' },
    'Cola/Soda (12 oz)': { grams: 355, ounces: 12, cups: 1.5, palm: '1 can' },
    'Snickers Bar (fun size)': { grams: 20, ounces: 0.7, cups: 0.1, palm: '1 fun size' },
    'French Fries (medium)': { grams: 115, ounces: 4, cups: 1, palm: '1 serving' },
    'Pizza Slice (cheese)': { grams: 107, ounces: 3.8, cups: 0.4, palm: '1 slice' },
    'Energy Drink (8 oz)': { grams: 240, ounces: 8, cups: 1, palm: '1 can' },
    'Chocolate Milkshake (12 oz)': { grams: 355, ounces: 12, cups: 1.5, palm: '1 medium' },
    'Frosted Cereal (1 cup)': { grams: 30, ounces: 1, cups: 1, palm: '1 cup' },
    'Blueberry Muffin (large)': { grams: 110, ounces: 3.9, cups: 0.5, palm: '1 large muffin' }
  },

  condiments: {
    'Mustard': { grams: 5, ounces: 0.2, cups: 0.02, palm: '1 tsp' },
    'Hot Sauce': { grams: 5, ounces: 0.2, cups: 0.02, palm: '1 tsp' },
    'Lemon Juice': { grams: 15, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Soy Sauce (low sodium)': { grams: 18, ounces: 0.6, cups: 0.07, palm: '1 tbsp' },
    'Salsa': { grams: 15, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Ketchup': { grams: 15, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Sriracha': { grams: 5, ounces: 0.2, cups: 0.02, palm: '1 tsp' },
    'Balsamic Vinegar': { grams: 15, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Apple Cider Vinegar': { grams: 15, ounces: 0.5, cups: 0.06, palm: '1 tbsp' },
    'Garlic Powder': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Onion Powder': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Black Pepper': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Paprika': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Italian Seasoning': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Everything Bagel Seasoning': { grams: 2.5, ounces: 0.09, cups: 0.02, palm: '1 tsp' },
    'Hummus': { grams: 30, ounces: 1, cups: 0.125, palm: '2 tbsp' },
    'Honey': { grams: 21, ounces: 0.74, cups: 0.06, palm: '1 tbsp' },
    'Coconut Aminos': { grams: 18, ounces: 0.6, cups: 0.07, palm: '1 tbsp' },
    'Nutritional Yeast': { grams: 16, ounces: 0.56, cups: 0.125, palm: '2 tbsp' }
  }
};

// Helper function to get serving info for a specific food
export const getServingInfo = (category, food) => {
  return servingSizeConversions[category]?.[food] || {
    grams: 100,
    ounces: 3.5,
    cups: 0.5,
    palm: '1 serving'
  };
};

// Helper function to get all foods in a category
export const getFoodsInCategory = (category) => {
  return Object.keys(FoodDatabase[category] || {});
};

// Helper function to get all categories
export const getAllCategories = () => {
  return Object.keys(FoodDatabase);
};

// Helper function to get food nutrition data
export const getFoodNutrition = (foodName, category) => {
  return FoodDatabase[category]?.[foodName] || {
    calories: 100, protein: 5, carbs: 10, fat: 3, sugar: 2,
    dietaryTags: {}
  };
};

// Helper function to check dietary compatibility
export const checkDietaryCompatibility = (foodName, category, dietaryFilters) => {
  const food = FoodDatabase[category]?.[foodName];
  if (!food || !food.dietaryTags) return true; // Assume compatible if no tags

  return dietaryFilters.every(filter => food.dietaryTags[filter] === true);
};