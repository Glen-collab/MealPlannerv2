// Enhanced FoodDatabase.js - Phase 1: Just better nutrition data
// This replaces your existing food database with more accurate data

export const FoodDatabase = {
    protein: {
        'Chicken Breast': { protein: 31, carbs: 0, fat: 3.6, sugar: 0, calories: 165 },
        'Egg Whites': { protein: 3.6, carbs: 0.2, fat: 0.1, sugar: 0.2, calories: 17 },
        'Tuna (canned in water)': { protein: 23, carbs: 0, fat: 1, sugar: 0, calories: 108 },
        'Turkey Breast': { protein: 29, carbs: 0, fat: 1, sugar: 0, calories: 135 },
        'Lean Beef (90/10)': { protein: 26, carbs: 0, fat: 10, sugar: 0, calories: 176 },
        'Salmon': { protein: 20, carbs: 0, fat: 13, sugar: 0, calories: 208 },
        'Greek Yogurt (non-fat)': { protein: 23, carbs: 9, fat: 0, sugar: 6, calories: 130 },
        'Cottage Cheese (low-fat)': { protein: 14, carbs: 5, fat: 2, sugar: 4, calories: 90 },
        'Eggs (whole)': { protein: 6, carbs: 0.6, fat: 5, sugar: 0.6, calories: 70 },
        'Cod': { protein: 20, carbs: 0, fat: 0.7, sugar: 0, calories: 89 },
        'Tilapia': { protein: 20, carbs: 0, fat: 1.7, sugar: 0, calories: 96 },
        'Shrimp': { protein: 18, carbs: 1, fat: 0.3, sugar: 0, calories: 85 },
        'Lean Ground Turkey': { protein: 27, carbs: 0, fat: 8, sugar: 0, calories: 176 }
    },

    carbohydrate: {
        'Brown Rice (cooked)': { protein: 2.6, carbs: 23, fat: 0.9, sugar: 0.4, calories: 112 },
        'Oats (dry)': { protein: 5, carbs: 27, fat: 3, sugar: 1, calories: 150 },
        'Sweet Potato': { protein: 1.6, carbs: 20, fat: 0.1, sugar: 4.2, calories: 86 },
        'White Rice (cooked)': { protein: 2.7, carbs: 28, fat: 0.3, sugar: 0.1, calories: 130 },
        'Quinoa (cooked)': { protein: 4.1, carbs: 21, fat: 1.9, sugar: 0.9, calories: 120 },
        'Whole Wheat Bread': { protein: 4, carbs: 12, fat: 1, sugar: 2, calories: 74 },
        'Bagel (plain)': { protein: 9, carbs: 48, fat: 1.5, sugar: 6, calories: 245 },
        'Pasta (cooked)': { protein: 5, carbs: 25, fat: 1.1, sugar: 0.6, calories: 131 },
        'White Bread': { protein: 2.7, carbs: 13, fat: 0.8, sugar: 1.5, calories: 70 },
        'Potato (baked)': { protein: 2.9, carbs: 37, fat: 0.2, sugar: 1.6, calories: 161 }
    },

    fruits: {
        'Apple': { protein: 0.3, carbs: 14, fat: 0.2, sugar: 10, calories: 52 },
        'Banana': { protein: 1.3, carbs: 23, fat: 0.3, sugar: 12, calories: 89 },
        'Strawberries': { protein: 0.7, carbs: 7, fat: 0.3, sugar: 5, calories: 32 },
        'Blueberries': { protein: 0.7, carbs: 14, fat: 0.3, sugar: 10, calories: 57 },
        'Orange': { protein: 0.9, carbs: 12, fat: 0.1, sugar: 9, calories: 47 },
        'Grapes': { protein: 0.6, carbs: 16, fat: 0.2, sugar: 16, calories: 62 },
        'Berries': { protein: 0.7, carbs: 12, fat: 0.3, sugar: 8, calories: 52 }
    },

    fat: {
        'Avocado': { protein: 2, carbs: 9, fat: 15, sugar: 0.7, calories: 160 },
        'Almonds': { protein: 6, carbs: 6, fat: 14, sugar: 1.2, calories: 164 },
        'Peanut Butter': { protein: 8, carbs: 6, fat: 16, sugar: 3, calories: 188 },
        'Olive Oil': { protein: 0, carbs: 0, fat: 14, sugar: 0, calories: 119 },
        'Walnuts': { protein: 4, carbs: 4, fat: 18, sugar: 1, calories: 185 },
        'Cashews': { protein: 5, carbs: 9, fat: 12, sugar: 1.7, calories: 157 }
    },

    vegetables: {
        'Broccoli': { protein: 2.8, carbs: 6, fat: 0.4, sugar: 1.5, calories: 25 },
        'Spinach': { protein: 2.9, carbs: 3.6, fat: 0.4, sugar: 0.4, calories: 23 },
        'Bell Peppers': { protein: 1, carbs: 7, fat: 0.3, sugar: 5, calories: 31 },
        'Carrots': { protein: 0.9, carbs: 10, fat: 0.2, sugar: 4.7, calories: 41 },
        'Asparagus': { protein: 2.2, carbs: 3.9, fat: 0.1, sugar: 1.9, calories: 20 },
        'Green Beans': { protein: 1.8, carbs: 7, fat: 0.2, sugar: 3.3, calories: 31 }
    },

    supplements: {
        'Whey Protein (generic)': { protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120 },
        'Quest Bar': { protein: 20, carbs: 4, fat: 8, sugar: 1, calories: 190 },
        'Pure Protein Bar': { protein: 20, carbs: 17, fat: 2, sugar: 3, calories: 180 },
        'String Cheese': { protein: 6, carbs: 1, fat: 5, sugar: 0, calories: 70 },
        'Hard-Boiled Egg': { protein: 6, carbs: 0.5, fat: 5, sugar: 0, calories: 70 }
    },

    condiments: {
        'Mustard': { protein: 0.2, carbs: 0.3, fat: 0.2, sugar: 0.1, calories: 3 },
        'Hot Sauce': { protein: 0.1, carbs: 0.1, fat: 0, sugar: 0, calories: 1 },
        'Honey': { protein: 0.1, carbs: 17, fat: 0, sugar: 16, calories: 64 },
        'Olive Oil': { protein: 0, carbs: 0, fat: 14, sugar: 0, calories: 119 }
    }
};

// Helper function to get food nutrition (same interface as before)
export const getFoodNutrition = (foodName, category) => {
    return FoodDatabase[category]?.[foodName] || { calories: 100, protein: 5, carbs: 10, fat: 3, sugar: 2 };
};

// Helper to check if a food exists
export const foodExists = (foodName, category) => {
    return Boolean(FoodDatabase[category]?.[foodName]);
};