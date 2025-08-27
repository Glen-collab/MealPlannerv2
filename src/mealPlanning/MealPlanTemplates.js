// CompleteMealPlanTemplates.js - All 24 base meal plan templates

const generateId = () => Math.random().toString(36).substr(2, 9);

const createFoodItem = (food, category, serving, displayServing, displayUnit) => ({
    id: generateId(),
    category,
    food,
    serving,
    displayServing,
    displayUnit
});

export const CompleteMealPlanTemplates = {

    // ===== MAINTAIN WEIGHT PLANS (TDEE calories ~2200) =====

    'maintain-balanced-3': {
        targetCalories: 2200,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
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
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Morning Snack',
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
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 0.75, '3/4', 'scoop')
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
        targetCalories: 2200,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '1/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 0.75, '3/4', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('String Cheese', 'supplements', 1, '1', 'stick')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Banana', 'fruits', 0.5, '1/2', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'maintain-performance-3': {
        targetCalories: 2300,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 8, '8', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    'maintain-performance-5': {
        targetCalories: 2300,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 6, '6', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Banana', 'fruits', 0.75, '3/4', 'medium')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:30 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    'maintain-performance-6': {
        targetCalories: 2300,
        goalType: 'maintain',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 5, '5', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '1/4', 'cup')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:00 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Banana', 'fruits', 0.75, '3/4', 'medium')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    // ===== LOSE WEIGHT PLANS (Base templates - scaled to BMR + 50) =====

    'lose-balanced-3': {
        targetCalories: 1800,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 6, '6', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'lose-balanced-5': {
        targetCalories: 1800,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 5, '5', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '1/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.75, '6.1', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.25, '1.25', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'lose-balanced-6': {
        targetCalories: 1800,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 4, '4', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/4', 'cup')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('String Cheese', 'supplements', 1, '1', 'stick')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.75, '6.1', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'lose-performance-3': {
        targetCalories: 1900,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 8, '8', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.5, '1.5', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'lose-performance-5': {
        targetCalories: 1900,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 6, '6', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '1/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:30 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.25, '1.25', 'scoop'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.25, '7.9', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.25, '1.25', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    'lose-performance-6': {
        targetCalories: 1900,
        goalType: 'lose',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 6, '6', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/4', 'cup')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:00 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.25, '7.9', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.75, '3/4', 'medium')
                ]
            }
        ]
    },

    // ===== GAIN MUSCLE PLANS (TDEE + 300-500 calories) =====

    'gain-muscle-balanced-3': {
        targetCalories: 2700,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
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
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1, '1', 'medium')
                ]
            }
        ]
    },

    'gain-muscle-balanced-6': {
        targetCalories: 2700,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Banana', 'fruits', 0.75, '3/4', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('String Cheese', 'supplements', 2, '2', 'sticks'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 0.75, '3/4', 'scoop')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.75, '7/8', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.25, '1.25', 'medium')
                ]
            }
        ]
    },

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
                    createFoodItem('Egg Whites', 'protein', 10, '10', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Almonds', 'fat', 1.5, '1.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            }
        ]
    },

    'gain-muscle-performance-5': {
        targetCalories: 2800,
        goalType: 'gain-muscle',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 8, '8', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:30 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.25, '1.25', 'medium')
                ]
            }
        ]
    },

    'gain-muscle-performance-6': {
        targetCalories: 2800,
        goalType: 'gain-muscle',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 6, '6', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:00 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.75, '0.75', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.25, '1.25', 'medium')
                ]
            }
        ]
    },

    // ===== DIRTY BULK PLANS (TDEE + 700+ calories) =====

    'dirty-bulk-balanced-3': {
        targetCalories: 3000,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 2, '2', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 2, '2', 'scoop')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 3, '1.5', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 2, '2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3, '3', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 2, '2', 'medium')
                ]
            }
        ]
    },

    'dirty-bulk-balanced-5': {
        targetCalories: 3000,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 2, '2', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 2, '2', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.5, '1.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Bell Peppers', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            }
        ]
    },

    'dirty-bulk-balanced-6': {
        targetCalories: 3000,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Morning Snack',
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.25, '1.25', 'oz')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('String Cheese', 'supplements', 3, '3', 'sticks'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.25, '1.125', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Afternoon Snack',
                time: '4:00 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 2, '2', 'scoop'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.25, '1.25', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.75, '1.75', 'medium')
                ]
            }
        ]
    },

    'dirty-bulk-performance-3': {
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 12, '12', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Almonds', 'fat', 2, '2', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 4, '14', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 3, '1.5', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 2, '2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner',
                time: '6:00 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 4, '14', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3, '3', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 2, '2', 'medium')
                ]
            }
        ]
    },

    'dirty-bulk-performance-5': {
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 5,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 10, '10', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:30 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 2, '2', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Almonds', 'fat', 1.5, '1.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 2, '2', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.5, '1.5', 'cups')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.5, '1.5', 'medium')
                ]
            }
        ]
    },

    'dirty-bulk-performance-6': {
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'performance',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast',
                time: '6:30 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 8, '8', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Mid-Morning',
                time: '9:00 AM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 2, '2', 'scoop'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.25, '1.25', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Lunch',
                time: '11:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.25, '1.25', 'oz')
                ]
            },
            {
                mealName: 'Lunch',
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Pre-Workout',
                time: '4:30 PM',
                items: [
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop'),
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium')
                ]
            },
            {
                mealName: 'Dinner',
                time: '7:30 PM',
                items: [
                    createFoodItem('Lean Beef (90/10)', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.5, '2.5', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.75, '1.75', 'medium')
                ]
            }
        ]
    }
};

// Helper function to get a meal plan template
export const getMealPlanTemplate = (goal, eaterType, mealFreq) => {
    const key = `${goal}-${eaterType}-${mealFreq}`;
    return CompleteMealPlanTemplates[key] || CompleteMealPlanTemplates['maintain-balanced-5']; // fallback
};

// Helper function to get all available template keys
export const getAvailableTemplates = () => {
    return Object.keys(CompleteMealPlanTemplates);
};

export default CompleteMealPlanTemplates;