// ComprehensiveTemplateSystem.js - FIXED: All meal names + missing templates

// 🛠️ HELPER FUNCTIONS (self-contained to avoid circular imports)
const generateId = () => Math.random().toString(36).substr(2, 9);

const createFoodItem = (food, category, serving, displayServing, displayUnit) => ({
    id: generateId(),
    category,
    food,
    serving,
    displayServing,
    displayUnit
});

// 🚀 COMPLETE MEAL PLAN TEMPLATES - FIXED NAMES + ALL 48 COMBINATIONS
export const AllMealPlanTemplates = {

    // ===== LOSE WEIGHT TEMPLATES =====

    'lose-balanced-3': {
        targetCalories: 1400,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '8:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/2', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.75, '3/4', 'cup'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Cod', 'protein', 2, '7', 'oz'),
                    createFoodItem('Cauliflower Rice', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
                ]
            }
        ]
    },

    'lose-balanced-5': {
        targetCalories: 1600,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 4, '4', 'whites'),
                    createFoodItem('Spinach', 'vegetables', 1, '1', 'cup'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/2', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.5, '1/2', 'cup')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Quinoa (cooked)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Cod', 'protein', 2, '7', 'oz'),
                    createFoodItem('Zucchini', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Asparagus', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
                ]
            }
        ]
    },

    'lose-balanced-6': {
        targetCalories: 1700,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 3, '3', 'whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.4, '2/5', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.5, '1/2', 'cup')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.5, '1/2', 'cup'),
                    createFoodItem('Apple', 'fruits', 0.5, '1/2', 'medium')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.6, '1/3', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '3:30 PM',
                items: [
                    createFoodItem('String Cheese', 'supplements', 1, '1', 'stick'),
                    createFoodItem('Carrots', 'vegetables', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Cod', 'protein', 2, '7', 'oz'),
                    createFoodItem('Cauliflower Rice', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.4, '2/5', 'medium')
                ]
            },
            {
                mealName: 'Late Snack',
                time: '9:00 PM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.4, '2/5', 'cup'),
                    createFoodItem('Cucumber', 'vegetables', 1, '1', 'cup')
                ]
            }
        ]
    },

    'lose-performance-3': {
        targetCalories: 1500,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 5, '5', 'whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '3/5', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.8, '2/5', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.6, '3/5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            }
        ]
    },

    'lose-performance-5': {
        targetCalories: 1700,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 4, '4', 'whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '3/5', 'cup'),
                    createFoodItem('Banana', 'fruits', 0.75, '3/4', 'medium')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '9:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.6, '3/5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.6, '3/5', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Cod', 'protein', 2.2, '7.7', 'oz'),
                    createFoodItem('Quinoa (cooked)', 'carbohydrate', 0.7, '1/3', 'cup'),
                    createFoodItem('Zucchini', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.6, '3/5', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: lose-performance-6
    'lose-performance-6': {
        targetCalories: 1800,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 4, '4', 'whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 0.6, '3/5', 'medium')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '8:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.6, '3/5', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.6, '3/5', 'cup')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '10:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 0.8, '4/5', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.8, '2/5', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.6, '3/5', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.6, '3/5', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 0.8, '4/5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
                ]
            }
        ]
    },

    // ===== MAINTAIN TEMPLATES =====

    'maintain-balanced-3': {
        targetCalories: 1800,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '8:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.5, '1/2', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
                ]
            }
        ]
    },

    'maintain-balanced-5': {
        targetCalories: 2200,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1, '1', 'cup'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'maintain-balanced-6': {
        targetCalories: 2400,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Walnuts', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Turkey Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Quinoa (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '3:30 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Green Beans', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
                ]
            },
            {
                mealName: 'Late Snack',
                time: '9:00 PM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.5, '1/2', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.5, '1/2', 'cup')
                ]
            }
        ]
    },

    'maintain-performance-3': {
        targetCalories: 2000,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.3, '2/3', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.2, '1.2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.8, '1.8', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.8, '4/5', 'medium')
                ]
            }
        ]
    },

    'maintain-performance-5': {
        targetCalories: 2400,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.8, '4/5', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.6, '3/5', 'cup'),
                    createFoodItem('Walnuts', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '9:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.2, '7.7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Spinach', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Berries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Cashews', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Quinoa (cooked)', 'carbohydrate', 1.2, '3/5', 'cup'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.8, '4/5', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: maintain-performance-6
    'maintain-performance-6': {
        targetCalories: 2600,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.7, '7/10', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.5, '1/2', 'cup'),
                    createFoodItem('Walnuts', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '8:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '10:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.8, '4/5', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.2, '7.7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.3, '2/3', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.7, '7/10', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.8, '4/5', 'cup'),
                    createFoodItem('Cashews', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.2, '7.7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.4, '1.4', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.7, '7/10', 'medium')
                ]
            }
        ]
    },

    // ===== GAIN MUSCLE TEMPLATES =====

    'gain-muscle-balanced-3': {
        targetCalories: 2500,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.2, '1.2', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Almonds', 'fat', 0.8, '0.8', 'oz'),
                    createFoodItem('Peanut Butter', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.8, '9/10', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Avocado', 'fat', 0.8, '4/5', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.2, '2.2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Walnuts', 'fat', 0.8, '0.8', 'oz')
                ]
            }
        ]
    },

    'gain-muscle-balanced-5': {
        targetCalories: 2700,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Berries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: gain-muscle-balanced-6
    'gain-muscle-balanced-6': {
        targetCalories: 2900,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.8, '4/5', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '9:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '11:30 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Berries', 'fruits', 0.8, '4/5', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.3, '2/3', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.8, '4/5', 'cup'),
                    createFoodItem('Walnuts', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.2, '7.7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.8, '1.8', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.8, '4/5', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: gain-muscle-performance-3
    'gain-muscle-performance-3': {
        targetCalories: 2800,
        goalType: 'gain-muscle',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.3, '1.3', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1.2, '1.2', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3.2, '11.2', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Spinach', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            }
        ]
    },

    'gain-muscle-performance-5': {
        targetCalories: 2900,
        goalType: 'gain-muscle',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.2, '1.2', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.3, '1.3', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '9:30 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Berries', 'fruits', 1.2, '1.2', 'cups'),
                    createFoodItem('Cashews', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.8, '9/10', 'cup'),
                    createFoodItem('Spinach', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.2, '1.2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.2, '1.2', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.2, '2.2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.2, '1.2', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: gain-muscle-performance-6
    'gain-muscle-performance-6': {
        targetCalories: 3100,
        goalType: 'gain-muscle',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.7, '0.7', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '8:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '11:00 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Berries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Cashews', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.6, '4/5', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Walnuts', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.8, '9.8', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    // ===== DIRTY BULK TEMPLATES =====

    'dirty-bulk-balanced-3': {
        targetCalories: 3000,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '8:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '1.5', 'cups'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.2, '1.1', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 2, '2', 'tbsp'),
                    createFoodItem('Avocado', 'fat', 1.2, '1.2', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3, '3', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3.5, '3.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.2, '1.2', 'oz'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            }
        ]
    },

    'dirty-bulk-balanced-5': {
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.25, '1.25', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Berries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 2, '2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: dirty-bulk-balanced-6 (THE ONE YOU NEEDED!)
    'dirty-bulk-balanced-6': {
        targetCalories: 3400,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.2, '1.2', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1.2, '1.2', 'tbsp'),
                    createFoodItem('Almonds', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack',
                time: '9:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '11:30 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Berries', 'fruits', 1.2, '1.2', 'cups'),
                    createFoodItem('Walnuts', 'fat', 0.6, '0.6', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.8, '9/10', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Cashews', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            }
        ]
    },

    // 🆕 NEW: dirty-bulk-performance-3
    'dirty-bulk-performance-3': {
        targetCalories: 3300,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.6, '1.6', 'cups'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.8, '1.8', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 2, '2', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 1.2, '1.2', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 4, '14', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Spinach', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 2.2, '2.2', 'tbsp'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 4, '14', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3.5, '3.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 4, '4', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.5, '1.5', 'oz'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            }
        ]
    },

    'dirty-bulk-performance-5': {
        targetCalories: 3500,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '1.5', 'cups'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.8, '1.8', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '9:00 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 2, '2', 'cups'),
                    createFoodItem('Berries', 'fruits', 1.8, '1.8', 'cups'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Spinach', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 2, '2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 2.5, '2.5', 'tbsp'),
                    createFoodItem('Cashews', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3.2, '3.2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 4, '4', 'cups'),
                    createFoodItem('Avocado', 'fat', 2, '2', 'medium'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            }
        ]
    },

    // 🆕 NEW: dirty-bulk-performance-6
    'dirty-bulk-performance-6': {
        targetCalories: 3700,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.4, '1.4', 'cups'),
                    createFoodItem('Banana', 'fruits', 1.8, '1.8', 'medium'),
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Walnuts', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'PostWorkout',
                time: '8:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 2, '2', 'tbsp'),
                    createFoodItem('Almonds', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack',
                time: '11:00 AM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Berries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Cashews', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3.2, '11.2', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.2, '1.1', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 3, '3', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.8, '1.8', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Strawberries', 'fruits', 1.2, '1.2', 'cups'),
                    createFoodItem('Walnuts', 'fat', 0.8, '0.8', 'oz')
                ]
            },
            {
                mealName: 'Dinner',
                time: '8:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3, '3', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 4, '4', 'cups'),
                    createFoodItem('Avocado', 'fat', 2, '2', 'medium'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            }
        ]
    }
};

// 🛠️ DEBUGGING AND VERIFICATION HELPERS
export class TemplateDebugger {

    static logAllTemplates() {
        console.log('\n🔍 [TEMPLATE DEBUGGER] Available meal plan templates:');
        console.log('━'.repeat(60));

        Object.keys(AllMealPlanTemplates).forEach((key, index) => {
            const template = AllMealPlanTemplates[key];
            console.log(`${index + 1}. ${key}`);
            console.log(`   📊 Target: ${template.targetCalories} calories`);
            console.log(`   🍽️ Meals: ${template.allMeals.length}`);
            console.log(`   📋 Items: ${template.allMeals.reduce((total, meal) => total + meal.items.length, 0)}`);
            console.log('');
        });

        console.log(`✅ Total templates: ${Object.keys(AllMealPlanTemplates).length}`);
        console.log('━'.repeat(60));
    }

    static verifyTemplateCompleteness() {
        const goals = ['lose', 'maintain', 'gain-muscle', 'dirty-bulk'];
        const eaterTypes = ['balanced', 'performance'];
        const mealFreqs = [3, 5, 6];

        const expectedCombinations = [];
        const foundCombinations = [];
        const missingCombinations = [];

        // Generate all expected combinations
        goals.forEach(goal => {
            eaterTypes.forEach(eaterType => {
                mealFreqs.forEach(mealFreq => {
                    const key = `${goal}-${eaterType}-${mealFreq}`;
                    expectedCombinations.push(key);

                    if (AllMealPlanTemplates[key]) {
                        foundCombinations.push(key);
                    } else {
                        missingCombinations.push(key);
                    }
                });
            });
        });

        console.log('\n🔍 [TEMPLATE COMPLETENESS CHECK]');
        console.log('━'.repeat(50));
        console.log(`📋 Expected combinations: ${expectedCombinations.length}`);
        console.log(`✅ Found combinations: ${foundCombinations.length}`);
        console.log(`❌ Missing combinations: ${missingCombinations.length}`);

        if (missingCombinations.length > 0) {
            console.log('\n❌ Missing templates:');
            missingCombinations.forEach(combo => console.log(`   • ${combo}`));
        }

        console.log('\n✅ Available templates:');
        foundCombinations.forEach(combo => console.log(`   • ${combo}`));

        return {
            expected: expectedCombinations.length,
            found: foundCombinations.length,
            missing: missingCombinations,
            coverage: Math.round((foundCombinations.length / expectedCombinations.length) * 100)
        };
    }

    static verifyMealNames() {
        const correctMealNames = [
            'Breakfast', 'FirstSnack', 'SecondSnack', 'Lunch',
            'MidAfternoon Snack', 'Dinner', 'Late Snack', 'PostWorkout'
        ];

        console.log('\n🔍 [MEAL NAME VERIFICATION]');
        console.log('━'.repeat(50));

        let totalViolations = 0;
        Object.entries(AllMealPlanTemplates).forEach(([templateKey, template]) => {
            const mealNames = template.allMeals.map(meal => meal.mealName);
            const violations = mealNames.filter(name => !correctMealNames.includes(name));

            if (violations.length > 0) {
                console.log(`❌ ${templateKey}: ${violations.join(', ')}`);
                totalViolations += violations.length;
            }
        });

        if (totalViolations === 0) {
            console.log('✅ All meal names are correct!');
        } else {
            console.log(`❌ Found ${totalViolations} meal name violations`);
        }

        console.log('\n🎯 Correct meal names:', correctMealNames.join(', '));
    }
}

// 🚀 EXPORT EVERYTHING
export default AllMealPlanTemplates;