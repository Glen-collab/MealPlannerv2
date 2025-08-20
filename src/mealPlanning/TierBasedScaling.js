// TierBasedScaling.js - Intelligent food scaling with realistic portion limits

export const FoodTierSystem = {
    // Tier 1: Lean Proteins (primary, moderate limits)
    tier1_lean_proteins: {
        maxLimits: {
            'Chicken Breast': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Turkey Breast': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Cod': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Tuna (canned in water)': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Egg Whites': { maxServing: 15, maxDisplay: '15', unit: 'whites' },
            'Tofu (firm)': { maxServing: 2.5, maxDisplay: '10', unit: 'oz' },
            'Tempeh': { maxServing: 2, maxDisplay: '8', unit: 'oz' }
        }
    },

    // Tier 2: Higher Fat Proteins (can go higher for bulk goals)
    tier2_fat_proteins: {
        maxLimits: {
            'Salmon': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Lean Beef (90/10)': { maxServing: 6, maxDisplay: '20', unit: 'oz' },
            'Eggs (whole)': { maxServing: 18, maxDisplay: '18', unit: 'eggs' },
            'Greek Yogurt (non-fat)': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Cottage Cheese (low-fat)': { maxServing: 2.5, maxDisplay: '2.5', unit: 'cups' }
        }
    },

    // Tier 3: Starchy Carbs (strict limits to prevent overconsumption)
    tier3_starches: {
        maxLimits: {
            'Oats (dry)': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Brown Rice (cooked)': { maxServing: 4, maxDisplay: '2', unit: 'cups' },
            'White Rice (cooked)': { maxServing: 4, maxDisplay: '2', unit: 'cups' },
            'Quinoa (cooked)': { maxServing: 3, maxDisplay: '1.5', unit: 'cups' },
            'Sweet Potato': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Potato (baked)': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Whole Wheat Bread': { maxServing: 4, maxDisplay: '4', unit: 'slices' },
            'Pasta (cooked)': { maxServing: 3, maxDisplay: '1.5', unit: 'cups' }
        }
    },

    // Tier 4: Fruits (limited to reasonable portions)
    tier4_fruits: {
        maxLimits: {
            'Apple': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Banana': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Orange': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Blueberries': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Strawberries': { maxServing: 2, maxDisplay: '2', unit: 'cups' },
            'Blackberries': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Raspberries': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Grapes': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Berries': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' }
        }
    },

    // Tier 5: Vegetables (more flexible but still reasonable)
    tier5_vegetables: {
        maxLimits: {
            'Broccoli': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Spinach': { maxServing: 4, maxDisplay: '4', unit: 'cups' },
            'Bell Peppers': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Asparagus': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Green Beans': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Zucchini': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Carrots': { maxServing: 2.5, maxDisplay: '2.5', unit: 'cups' },
            'Cauliflower Rice': { maxServing: 4, maxDisplay: '4', unit: 'cups' }
        }
    },

    // Tier 6: Healthy Fats (calorie dense - can scale more)
    tier6_fats: {
        maxLimits: {
            'Almonds': { maxServing: 3, maxDisplay: '3', unit: 'oz' },
            'Walnuts': { maxServing: 2.5, maxDisplay: '2.5', unit: 'oz' },
            'Cashews': { maxServing: 2.5, maxDisplay: '2.5', unit: 'oz' },
            'Peanut Butter': { maxServing: 4, maxDisplay: '4', unit: 'tbsp' },
            'Almond Butter': { maxServing: 4, maxDisplay: '4', unit: 'tbsp' },
            'Avocado': { maxServing: 2, maxDisplay: '2', unit: 'medium' },
            'Olive Oil': { maxServing: 4, maxDisplay: '4', unit: 'tbsp' },
            'Coconut Oil': { maxServing: 3, maxDisplay: '3', unit: 'tbsp' },
            'MCT Oil': { maxServing: 2, maxDisplay: '2', unit: 'tbsp' }
        }
    },

    // Tier 7: Supplements & Calorie Dense (most flexible for high goals)
    tier7_supplements: {
        maxLimits: {
            'Whey Protein (generic)': { maxServing: 3, maxDisplay: '3', unit: 'scoops' },
            'Plant Protein (pea/rice)': { maxServing: 3, maxDisplay: '3', unit: 'scoops' },
            'Quest Bar': { maxServing: 2, maxDisplay: '2', unit: 'bars' },
            'Pure Protein Bar': { maxServing: 2, maxDisplay: '2', unit: 'bars' },
            'Hard-Boiled Egg': { maxServing: 6, maxDisplay: '6', unit: 'eggs' },
            'String Cheese': { maxServing: 4, maxDisplay: '4', unit: 'sticks' },
            'Coconut Yogurt': { maxServing: 2, maxDisplay: '2', unit: 'cups' }
        }
    },

    // Tier 8: Mass Gainer Foods (for extreme bulk goals)
    tier8_mass_gainers: {
        maxLimits: {
            'Dried Fruit Mix': { maxServing: 1, maxDisplay: '1', unit: 'cup' },
            'Granola': { maxServing: 1.5, maxDisplay: '1.5', unit: 'cups' },
            'Trail Mix': { maxServing: 1, maxDisplay: '1', unit: 'cup' },
            'Protein Smoothie': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Mass Gainer Shake': { maxServing: 2, maxDisplay: '2', unit: 'scoops' }
        }
    }
};

// Map foods to their tiers
export const getFoodTier = (foodName, category) => {
    const tierMappings = {
        // Tier 1 - Lean Proteins
        'Chicken Breast': 1, 'Turkey Breast': 1, 'Cod': 1, 'Tuna (canned in water)': 1,
        'Egg Whites': 1, 'Tofu (firm)': 1, 'Tempeh': 1,

        // Tier 2 - Fat Proteins
        'Salmon': 2, 'Lean Beef (90/10)': 2, 'Eggs (whole)': 2,
        'Greek Yogurt (non-fat)': 2, 'Cottage Cheese (low-fat)': 2,

        // Tier 3 - Starches
        'Oats (dry)': 3, 'Brown Rice (cooked)': 3, 'White Rice (cooked)': 3,
        'Quinoa (cooked)': 3, 'Sweet Potato': 3, 'Potato (baked)': 3,
        'Whole Wheat Bread': 3, 'Pasta (cooked)': 3,

        // Tier 4 - Fruits
        'Apple': 4, 'Banana': 4, 'Orange': 4, 'Blueberries': 4,
        'Strawberries': 4, 'Blackberries': 4, 'Raspberries': 4, 'Grapes': 4, 'Berries': 4,

        // Tier 5 - Vegetables
        'Broccoli': 5, 'Spinach': 5, 'Bell Peppers': 5, 'Asparagus': 5,
        'Green Beans': 5, 'Zucchini': 5, 'Carrots': 5, 'Cauliflower Rice': 5,

        // Tier 6 - Fats
        'Almonds': 6, 'Walnuts': 6, 'Cashews': 6, 'Peanut Butter': 6,
        'Avocado': 6, 'Olive Oil': 6, 'Coconut Oil': 6, 'MCT Oil': 6,

        // Tier 7 - Supplements
        'Whey Protein (generic)': 7, 'Plant Protein (pea/rice)': 7,
        'Quest Bar': 7, 'Pure Protein Bar': 7, 'Hard-Boiled Egg': 7,
        'String Cheese': 7, 'Coconut Yogurt': 7
    };

    return tierMappings[foodName] || 5; // Default to tier 5 if not found
};

// Get maximum serving for a food
export const getFoodMaxServing = (foodName) => {
    const tier = getFoodTier(foodName);
    const tierKey = `tier${tier}_${getTierName(tier)}`;
    const tierData = FoodTierSystem[tierKey];

    return tierData?.maxLimits?.[foodName] || { maxServing: 2, maxDisplay: '2', unit: 'servings' };
};

// Helper to get tier name
const getTierName = (tierNumber) => {
    const tierNames = {
        1: 'lean_proteins',
        2: 'fat_proteins',
        3: 'starches',
        4: 'fruits',
        5: 'vegetables',
        6: 'fats',
        7: 'supplements',
        8: 'mass_gainers'
    };
    return tierNames[tierNumber] || 'supplements';
};

/**
 * Apply tier-based scaling to an individual food item
 */
export const applyTierBasedScaling = (item, targetScaling, goal) => {
    const maxServing = getFoodMaxServing(item.food);
    const tier = getFoodTier(item.food);

    // Calculate desired serving after scaling
    const desiredServing = item.serving * targetScaling;

    // Apply tier-based limits
    let finalServing = Math.min(desiredServing, maxServing.maxServing);

    // Special rules based on goal
    if (goal === 'dirty-bulk' && tier >= 6) {
        // Allow more flexibility for fats and supplements in dirty bulk
        finalServing = Math.min(desiredServing, maxServing.maxServing * 1.5);
    } else if (goal === 'lose' && tier <= 4) {
        // Be more conservative with portions for weight loss
        finalServing = Math.min(desiredServing, maxServing.maxServing * 0.8);
    }

    // Calculate how much we "lost" due to limits
    const scalingDeficit = desiredServing - finalServing;

    const finalDisplayServing = parseFloat(item.displayServing || '1') * (finalServing / item.serving);

    return {
        ...item,
        serving: finalServing,
        displayServing: finalDisplayServing < 0.1 ? '0.1' : finalDisplayServing.toFixed(1),
        tier,
        wasLimited: scalingDeficit > 0.1,
        scalingDeficit: scalingDeficit > 0.1 ? scalingDeficit : 0,
        maxPossible: maxServing.maxServing
    };
};

/**
 * Add calorie-dense foods to make up for scaling deficits
 */
export const addMakeupCalories = (mealPlan, totalCalorieDeficit, goal, dietaryFilters = []) => {
    if (totalCalorieDeficit < 100) return mealPlan; // Not worth adding makeup foods

    console.log(`🔄 Adding ${Math.round(totalCalorieDeficit)} makeup calories with tier-appropriate foods`);

    // Choose makeup foods based on goal and dietary restrictions
    const makeupFoods = getMakeupFoods(goal, dietaryFilters);

    // Add to the largest meal (usually lunch or dinner)
    const largestMealIndex = findLargestMeal(mealPlan);

    let remainingCalories = totalCalorieDeficit;

    for (const makeupFood of makeupFoods) {
        if (remainingCalories < 50) break;

        const caloriesPerServing = makeupFood.calories;
        const servingsNeeded = Math.min(remainingCalories / caloriesPerServing, makeupFood.maxServings);

        if (servingsNeeded >= 0.3) {
            const makeupItem = {
                id: generateId(),
                category: makeupFood.category,
                food: makeupFood.name,
                serving: servingsNeeded,
                displayServing: servingsNeeded.toFixed(1),
                displayUnit: makeupFood.unit,
                addedBy: 'tier-system-makeup',
                makeupCalories: Math.round(servingsNeeded * caloriesPerServing)
            };

            mealPlan.allMeals[largestMealIndex].items.push(makeupItem);
            remainingCalories -= servingsNeeded * caloriesPerServing;
        }
    }

    return mealPlan;
};

// Helper functions
const getMakeupFoods = (goal, dietaryFilters) => {
    const baseFoods = [
        { name: 'Olive Oil', category: 'fat', calories: 119, maxServings: 3, unit: 'tbsp' },
        { name: 'Almonds', category: 'fat', calories: 164, maxServings: 2, unit: 'oz' },
        { name: 'Peanut Butter', category: 'fat', calories: 188, maxServings: 2, unit: 'tbsp' },
        { name: 'Avocado', category: 'fat', calories: 160, maxServings: 1, unit: 'medium' }
    ];

    // Filter based on dietary restrictions
    return baseFoods.filter(food => {
        if (dietaryFilters.includes('dairyFree')) return true; // All these are dairy-free
        if (dietaryFilters.includes('vegetarian')) return true; // All these are vegetarian
        if (dietaryFilters.includes('glutenFree')) return true; // All these are gluten-free
        if (dietaryFilters.includes('keto')) return true; // All fats are keto-friendly
        return true;
    });
};

const findLargestMeal = (mealPlan) => {
    let largestIndex = 0;
    let largestItemCount = 0;

    mealPlan.allMeals.forEach((meal, index) => {
        if (meal.items.length > largestItemCount) {
            largestItemCount = meal.items.length;
            largestIndex = index;
        }
    });

    return largestIndex;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default {
    applyTierBasedScaling,
    addMakeupCalories,
    getFoodTier,
    getFoodMaxServing
};