// DietaryFilterSystem.js - Smart food substitutions with nutritional balance

import { FoodDatabase, getFoodNutrition, checkDietaryCompatibility } from './FoodDatabase.js';

// Advanced substitution rules with calorie adjustment ratios
export const DietarySubstitutions = {
    vegetarian: {
        'Chicken Breast': { newFood: 'Tofu (firm)', newCategory: 'protein', ratio: 1.1 },
        'Turkey Breast': { newFood: 'Tempeh', newCategory: 'protein', ratio: 1.0 },
        'Lean Beef (90/10)': { newFood: 'Lentils (cooked)', newCategory: 'protein', ratio: 1.5 },
        'Salmon': { newFood: 'Chickpeas (cooked)', newCategory: 'protein', ratio: 1.2 },
        'Cod': { newFood: 'Tofu (firm)', newCategory: 'protein', ratio: 1.2 },
        'Tuna (canned in water)': { newFood: 'Tempeh', newCategory: 'protein', ratio: 1.0 },
        'Shrimp': { newFood: 'Chickpeas (cooked)', newCategory: 'protein', ratio: 1.3 },
        'Lean Ground Turkey': { newFood: 'Lentils (cooked)', newCategory: 'protein', ratio: 1.5 }
    },

    glutenFree: {
        'Whole Wheat Bread': { newFood: 'Brown Rice (cooked)', newCategory: 'carbohydrate', ratio: 1.5 },
        'Bagel (plain)': { newFood: 'Sweet Potato', newCategory: 'carbohydrate', ratio: 0.35 },
        'Pasta (cooked)': { newFood: 'Quinoa (cooked)', newCategory: 'carbohydrate', ratio: 0.9 },
        'White Bread': { newFood: 'Rice Cakes', newCategory: 'carbohydrate', ratio: 2.0 },
        'Soy Sauce (low sodium)': { newFood: 'Coconut Aminos', newCategory: 'condiments', ratio: 1.0 }
    },

    keto: {
        'Oats (dry)': { newFood: 'Cauliflower Rice', newCategory: 'vegetables', ratio: 4.0 },
        'Brown Rice (cooked)': { newFood: 'Cauliflower Rice', newCategory: 'vegetables', ratio: 3.0 },
        'White Rice (cooked)': { newFood: 'Cauliflower Rice', newCategory: 'vegetables', ratio: 3.5 },
        'Quinoa (cooked)': { newFood: 'Cauliflower Rice', newCategory: 'vegetables', ratio: 3.2 },
        'Sweet Potato': { newFood: 'Avocado', newCategory: 'fat', ratio: 0.5 },
        'Potato (baked)': { newFood: 'Avocado', newCategory: 'fat', ratio: 0.3 },
        'Banana': { newFood: 'Blackberries', newCategory: 'fruits', ratio: 1.2 },
        'Apple': { newFood: 'Strawberries', newCategory: 'fruits', ratio: 1.6 },
        'Grapes': { newFood: 'Raspberries', newCategory: 'fruits', ratio: 1.2 },
        'Blueberries': { newFood: 'Blackberries', newCategory: 'fruits', ratio: 1.3 }
    },

    dairyFree: {
        'Greek Yogurt (non-fat)': { newFood: 'Coconut Yogurt', newCategory: 'supplements', ratio: 1.8 },
        'Cottage Cheese (low-fat)': { newFood: 'Tofu (firm)', newCategory: 'protein', ratio: 0.6 },
        'String Cheese': { newFood: 'Hard-Boiled Egg', newCategory: 'supplements', ratio: 1.0 },
        'Whey Protein (generic)': { newFood: 'Plant Protein (pea/rice)', newCategory: 'supplements', ratio: 1.0 }
    }
};

// Nutrition balancers to add when removing high-calorie foods
const NutritionBalancers = {
    keto: {
        addFats: [
            { food: 'MCT Oil', category: 'fat', serving: 0.5 },
            { food: 'Olive Oil', category: 'fat', serving: 0.5 },
            { food: 'Coconut Oil', category: 'fat', serving: 0.5 }
        ]
    },
    vegetarian: {
        addSupplements: [
            { food: 'Nutritional Yeast', category: 'condiments', serving: 0.5 }
        ]
    }
};

/**
 * Apply dietary filters to a meal plan with smart substitutions
 */
export const applyDietaryFilters = (basePlan, dietaryFilters = []) => {
    if (!dietaryFilters.length) return basePlan;

    console.log(`🥗 Applying dietary filters: ${dietaryFilters.join(', ')}`);

    // Deep clone the plan
    const modifiedPlan = JSON.parse(JSON.stringify(basePlan));

    // Apply each dietary filter
    dietaryFilters.forEach(filter => {
        console.log(`Applying ${filter} filter...`);

        modifiedPlan.allMeals = modifiedPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => applyDietarySubstitution(item, filter)).filter(Boolean)
        }));

        // Add nutrition balancers if needed
        addNutritionBalancers(modifiedPlan, filter);
    });

    // Update plan metadata
    modifiedPlan.dietaryFilters = dietaryFilters;
    modifiedPlan.planId = `${basePlan.goalType || 'custom'}-${basePlan.eaterType || 'balanced'}-${basePlan.mealFrequency || 5}-${dietaryFilters.join('-')}`;

    console.log(`✅ Dietary filtering complete`);
    return modifiedPlan;
};

/**
 * Apply a single dietary substitution to a food item
 */
const applyDietarySubstitution = (item, dietaryFilter) => {
    const { food, category } = item;

    // Check if food is already compatible with dietary restriction
    if (checkDietaryCompatibility(food, category, [dietaryFilter])) {
        return item; // No substitution needed
    }

    // Look for substitution rule
    const substitutions = DietarySubstitutions[dietaryFilter];
    if (substitutions && substitutions[food]) {
        const sub = substitutions[food];
        const newServing = item.serving * sub.ratio;
        const newDisplayServing = parseFloat(item.displayServing || '1') * sub.ratio;

        console.log(`  ${dietaryFilter}: ${food} → ${sub.newFood} (${sub.ratio}x serving)`);

        return {
            ...item,
            food: sub.newFood,
            category: sub.newCategory,
            serving: newServing,
            displayServing: newDisplayServing < 0.1 ? '0.1' : newDisplayServing.toFixed(1),
            originalFood: food, // Track original for reference
            substitutionReason: dietaryFilter
        };
    }

    // If no substitution rule exists but food is incompatible, try to find alternative
    const alternativeFood = findCompatibleAlternative(food, category, dietaryFilter);
    if (alternativeFood) {
        const originalNutrition = getFoodNutrition(food, category);
        const newNutrition = getFoodNutrition(alternativeFood.name, alternativeFood.category);
        const calorieRatio = originalNutrition.calories / newNutrition.calories;

        console.log(`  ${dietaryFilter}: ${food} → ${alternativeFood.name} (auto-match, ${calorieRatio.toFixed(1)}x)`);

        return {
            ...item,
            food: alternativeFood.name,
            category: alternativeFood.category,
            serving: item.serving * calorieRatio,
            displayServing: (parseFloat(item.displayServing || '1') * calorieRatio).toFixed(1),
            originalFood: food,
            substitutionReason: `${dietaryFilter}-auto`
        };
    }

    // If no alternative found, remove the item
    console.warn(`⚠️ No substitution found for ${food} with ${dietaryFilter} restriction - removing item`);
    return null;
};

/**
 * Find a compatible alternative food in the same or similar category
 */
const findCompatibleAlternative = (originalFood, category, dietaryFilter) => {
    // First try same category
    const categoryFoods = FoodDatabase[category] || {};

    for (const [foodName, foodData] of Object.entries(categoryFoods)) {
        if (foodName !== originalFood && checkDietaryCompatibility(foodName, category, [dietaryFilter])) {
            return {
                name: foodName,
                category: category,
                calories: foodData.calories
            };
        }
    }

    // If no same-category alternative, try related categories
    const relatedCategories = {
        'protein': ['supplements'],
        'supplements': ['protein'],
        'carbohydrate': ['vegetables'],
        'vegetables': ['carbohydrate']
    };

    const related = relatedCategories[category] || [];
    for (const relatedCategory of related) {
        const relatedFoods = FoodDatabase[relatedCategory] || {};
        for (const [foodName, foodData] of Object.entries(relatedFoods)) {
            if (checkDietaryCompatibility(foodName, relatedCategory, [dietaryFilter])) {
                return {
                    name: foodName,
                    category: relatedCategory,
                    calories: foodData.calories
                };
            }
        }
    }

    return null;
};

/**
 * Add nutrition balancers based on dietary modifications
 */
const addNutritionBalancers = (modifiedPlan, dietaryFilter) => {
    const balancers = NutritionBalancers[dietaryFilter];
    if (!balancers) return;

    const generateId = () => Math.random().toString(36).substr(2, 9);

    // Add nutrition balancers to appropriate meals
    if (balancers.addFats && dietaryFilter === 'keto') {
        // Add extra fats to breakfast and dinner for keto
        const fatToAdd = balancers.addFats[Math.floor(Math.random() * balancers.addFats.length)];

        // Add to breakfast
        if (modifiedPlan.allMeals[0]) {
            modifiedPlan.allMeals[0].items.push({
                id: generateId(),
                category: fatToAdd.category,
                food: fatToAdd.food,
                serving: fatToAdd.serving,
                displayServing: fatToAdd.serving.toString(),
                displayUnit: 'tbsp',
                addedBy: 'keto-balancer'
            });
        }
    }

    if (balancers.addSupplements && dietaryFilter === 'vegetarian') {
        // Add nutritional yeast to one meal for B12
        const suppToAdd = balancers.addSupplements[0];
        const randomMealIndex = Math.floor(Math.random() * modifiedPlan.allMeals.length);

        modifiedPlan.allMeals[randomMealIndex].items.push({
            id: generateId(),
            category: suppToAdd.category,
            food: suppToAdd.food,
            serving: suppToAdd.serving,
            displayServing: suppToAdd.serving.toString(),
            displayUnit: 'tbsp',
            addedBy: 'vegetarian-balancer'
        });
    }
};

/**
 * Validate that a meal plan meets dietary requirements
 */
export const validateDietaryCompliance = (mealPlan, dietaryFilters) => {
    const violations = [];

    mealPlan.allMeals.forEach((meal, mealIndex) => {
        meal.items.forEach((item, itemIndex) => {
            dietaryFilters.forEach(filter => {
                if (!checkDietaryCompatibility(item.food, item.category, [filter])) {
                    violations.push({
                        meal: meal.mealName,
                        food: item.food,
                        category: item.category,
                        violation: filter,
                        mealIndex,
                        itemIndex
                    });
                }
            });
        });
    });

    return {
        isCompliant: violations.length === 0,
        violations,
        summary: violations.length === 0
            ? `✅ Plan is fully compliant with ${dietaryFilters.join(', ')} dietary restrictions`
            : `⚠️ Found ${violations.length} dietary violations`
    };
};

/**
 * Get dietary-friendly foods for a specific restriction
 */
export const getDietaryFriendlyFoods = (dietaryFilter, category = null) => {
    const result = {};
    const categoriesToCheck = category ? [category] : Object.keys(FoodDatabase);

    categoriesToCheck.forEach(cat => {
        if (FoodDatabase[cat]) {
            result[cat] = {};
            Object.entries(FoodDatabase[cat]).forEach(([foodName, foodData]) => {
                if (foodData.dietaryTags && foodData.dietaryTags[dietaryFilter]) {
                    result[cat][foodName] = foodData;
                }
            });
        }
    });

    return result;
};

/**
 * Generate all possible meal plan combinations with dietary filters
 */
export const generateAllPlanCombinations = (
    goals = ['maintain', 'lose', 'gain-muscle', 'dirty-bulk'],
    eaterTypes = ['balanced', 'performance'],
    mealFreqs = [3, 5, 6],
    dietaryOptions = ['vegetarian', 'glutenFree', 'keto', 'dairyFree']
) => {
    const combinations = [];

    goals.forEach(goal => {
        eaterTypes.forEach(eaterType => {
            mealFreqs.forEach(mealFreq => {
                // Base plan (no dietary filters)
                combinations.push({
                    goal,
                    eaterType,
                    mealFreq,
                    dietaryFilters: [],
                    planKey: `${goal}-${eaterType}-${mealFreq}`
                });

                // Single dietary filter combinations
                dietaryOptions.forEach(dietary => {
                    combinations.push({
                        goal,
                        eaterType,
                        mealFreq,
                        dietaryFilters: [dietary],
                        planKey: `${goal}-${eaterType}-${mealFreq}-${dietary}`
                    });
                });

                // Common multiple dietary filter combinations
                const commonCombos = [
                    ['vegetarian', 'glutenFree'],
                    ['vegetarian', 'dairyFree'],
                    ['glutenFree', 'dairyFree'],
                    ['vegetarian', 'glutenFree', 'dairyFree']
                ];

                commonCombos.forEach(combo => {
                    combinations.push({
                        goal,
                        eaterType,
                        mealFreq,
                        dietaryFilters: combo,
                        planKey: `${goal}-${eaterType}-${mealFreq}-${combo.join('-')}`
                    });
                });
            });
        });
    });

    return combinations;
};

export default {
    applyDietaryFilters,
    validateDietaryCompliance,
    getDietaryFriendlyFoods,
    generateAllPlanCombinations
};