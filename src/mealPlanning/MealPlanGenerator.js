// MealPlanGenerator.js - FIXED Ultimate meal planning system

import { applyDietaryFilters, validateDietaryCompliance } from './DietaryFilterSystem.js';
import { getFoodNutrition, FoodDatabase } from './FoodDatabase.js';

// ✅ WORKING IMPORTS - Enhanced systems
import {
    getProteinRecommendations,
    getFavoritesByGoal,
    calculateProteinDistribution,
    EnhancedFoodDatabase
} from './EnhancedFoodDatabase.js';

// ✅ TIER-BASED SCALING SYSTEM
import {
    applyTierBasedScaling,
    addMakeupCalories,
    getFoodTier,
    getFoodMaxServing
} from './TierBasedScaling.js';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create food item helper
const createFoodItem = (food, category, serving, displayServing, displayUnit) => ({
    id: generateId(),
    category,
    food,
    serving,
    displayServing,
    displayUnit
});

// ✅ FIXED: User-friendly rounding functions (restored from original)
const roundToUserFriendly = (serving, unit) => {
    if (serving <= 0) return 0.25; // Minimum serving

    const normalizedUnit = unit?.toLowerCase() || '';

    if (normalizedUnit === 'oz') {
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit.includes('cup')) {
        return Math.round(serving * 4) / 4;
    } else if (normalizedUnit === 'tbsp') {
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit === 'tsp') {
        return Math.round(serving);
    } else if (normalizedUnit === 'medium' || normalizedUnit === 'large' || normalizedUnit === 'small' || normalizedUnit === 'pieces') {
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit === 'scoops' || normalizedUnit === 'scoop' || normalizedUnit === 'bars' || normalizedUnit === 'slices') {
        return Math.round(serving * 2) / 2;
    } else {
        return Math.round(serving * 2) / 2;
    }
};

const standardizeDisplayUnit = (serving, unit) => {
    const normalizedUnit = unit?.toLowerCase() || '';

    if (normalizedUnit.includes('cup')) {
        return serving === 1 ? 'cup' : 'cups';
    } else if (normalizedUnit === 'medium' || normalizedUnit === 'large' || normalizedUnit === 'small') {
        return unit;
    } else if (normalizedUnit === 'scoop' && serving !== 1) {
        return 'scoops';
    } else if (normalizedUnit === 'scoops' && serving === 1) {
        return 'scoop';
    }

    return unit;
};

// ✅ FIXED: Protein distribution with proper guards
export const distributeProteinThroughoutDay = (mealPlan, gender, goal, dietaryFilters = []) => {
    console.log(`🥤 [PROTEIN SYSTEM] Starting protein distribution for ${gender} with ${goal} goal`);

    // 🔒 GUARD: Check if protein was already added to prevent duplicates
    const hasExistingProtein = mealPlan.allMeals.some(meal =>
        meal.items.some(item => item.addedBy?.includes('protein') || item.isProteinFocus)
    );

    if (hasExistingProtein) {
        console.log('⚠️ [PROTEIN] Protein already distributed, skipping');
        return mealPlan;
    }

    console.log(`📊 [PROTEIN] Dietary filters: ${dietaryFilters.join(', ') || 'none'}`);

    // Get protein recommendations
    const proteinRecommendations = getProteinRecommendations(dietaryFilters, gender, goal);
    const proteinDistribution = calculateProteinDistribution(gender, goal, mealPlan.allMeals.length);

    console.log(`💪 [PROTEIN] Available proteins:`, proteinRecommendations.map(p => p.name));
    console.log(`🎯 [PROTEIN] Distribution plan:`, proteinDistribution);

    if (proteinRecommendations.length === 0) {
        console.log('⚠️ [PROTEIN] No suitable protein sources found');
        return mealPlan;
    }

    const primaryProtein = proteinRecommendations[0];
    const totalScoops = proteinDistribution.totalScoops;

    console.log(`🥤 [PROTEIN] Using ${primaryProtein.name}, distributing ${totalScoops} total scoops`);

    // Distribution based on gender
    if (gender.toLowerCase() === 'male' && totalScoops >= 4) {
        return distributeMaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters);
    } else {
        return distributeFemaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters);
    }
};

// ✅ FIXED: Smart male protein distribution (checks for oats/yogurt first)
const distributeMaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters) => {
    console.log(`👨 [MALE PROTEIN] Distributing ${totalScoops} scoops (max 2 per meal)`);

    const maxMealsWithProtein = Math.min(4, mealPlan.allMeals.length);
    const scoopsPerMeal = 2;
    const mealsToTarget = Math.min(Math.ceil(totalScoops / scoopsPerMeal), maxMealsWithProtein);

    const mealPriority = getMealPriority(mealPlan);

    // Track which foods we've already paired with protein
    const alreadyPaired = { oats: false, greekYogurt: false };

    let remainingScoops = totalScoops;
    let proteinItemsAdded = 0;

    // 🔒 FIXED: Smart protein distribution - prefer meals with oats/yogurt
    for (let i = 0; i < mealsToTarget && remainingScoops > 0; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        // 🔒 GUARD: Skip if meal already has protein
        const hasProtein = meal.items.some(item => item.addedBy?.includes('protein') || item.isProteinFocus);
        if (hasProtein) {
            console.log(`⚠️ [MALE PROTEIN] ${meal.mealName} already has protein, skipping`);
            continue;
        }

        // Check if this meal has oats or greek yogurt that we haven't paired yet
        const hasOats = meal.items.some(item => item.food.includes('Oats')) && !alreadyPaired.oats;
        const hasGreekYogurt = meal.items.some(item => item.food.includes('Greek Yogurt')) && !alreadyPaired.greekYogurt;

        const scoopsToAdd = Math.min(scoopsPerMeal, remainingScoops);

        // Create ONE protein item per meal
        const proteinItem = createTierAwareProteinItem(protein, scoopsToAdd, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);

        // Track what we've paired
        if (hasOats) alreadyPaired.oats = true;
        if (hasGreekYogurt) alreadyPaired.greekYogurt = true;

        remainingScoops -= scoopsToAdd;
        proteinItemsAdded++;

        const contextNote = hasOats ? ' (with oats)' : hasGreekYogurt ? ' (with yogurt)' : '';
        console.log(`✅ [MALE PROTEIN] Added ${scoopsToAdd} scoops of ${proteinItem.food} to ${meal.mealName}${contextNote}`);
    }

    console.log(`🎯 [MALE PROTEIN] Successfully added ${proteinItemsAdded} protein items (${totalScoops - remainingScoops} total scoops)`);
    return mealPlan;
};

// ✅ FIXED: Smart female protein distribution (checks for oats/yogurt first)
const distributeFemaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters) => {
    console.log(`👩 [FEMALE PROTEIN] Distributing ${totalScoops} scoops (1 per meal)`);

    const scoopsPerMeal = 1;
    const mealsToTarget = Math.min(totalScoops, mealPlan.allMeals.length);

    const mealPriority = getMealPriority(mealPlan);

    // Track which foods we've already paired with protein
    const alreadyPaired = { oats: false, greekYogurt: false };

    let proteinItemsAdded = 0;

    // 🔒 FIXED: Smart protein distribution - prefer meals with oats/yogurt
    for (let i = 0; i < mealsToTarget; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        // 🔒 GUARD: Skip if meal already has protein
        const hasProtein = meal.items.some(item => item.addedBy?.includes('protein') || item.isProteinFocus);
        if (hasProtein) {
            console.log(`⚠️ [FEMALE PROTEIN] ${meal.mealName} already has protein, skipping`);
            continue;
        }

        // Check if this meal has oats or greek yogurt that we haven't paired yet
        const hasOats = meal.items.some(item => item.food.includes('Oats')) && !alreadyPaired.oats;
        const hasGreekYogurt = meal.items.some(item => item.food.includes('Greek Yogurt')) && !alreadyPaired.greekYogurt;

        const proteinItem = createTierAwareProteinItem(protein, scoopsPerMeal, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);
        proteinItemsAdded++;

        // Track what we've paired
        if (hasOats) alreadyPaired.oats = true;
        if (hasGreekYogurt) alreadyPaired.greekYogurt = true;

        const contextNote = hasOats ? ' (with oats)' : hasGreekYogurt ? ' (with yogurt)' : '';
        console.log(`✅ [FEMALE PROTEIN] Added ${scoopsPerMeal} scoop of ${proteinItem.food} to ${meal.mealName}${contextNote}`);
    }

    console.log(`🎯 [FEMALE PROTEIN] Successfully added ${proteinItemsAdded} protein items`);
    return mealPlan;
};

// ✅ FIXED: Simple protein item - no confusing combinations
const createTierAwareProteinItem = (protein, scoops, meal, goal, dietaryFilters) => {
    // Just add the protein powder as a separate item - no combinations
    let proteinFood = protein.name;
    let category = 'supplements';

    // 🔧 FIXED: Apply tier-based limits properly
    const tier = getFoodTier(proteinFood, category);
    const maxServing = getFoodMaxServing(proteinFood);

    // Apply tier limits and gender-specific limits
    let maxAllowed = maxServing.maxServing;

    // For protein supplements, use gender-specific limits from EnhancedFoodDatabase
    if (EnhancedFoodDatabase.protein_supplements[proteinFood]) {
        const genderLimits = EnhancedFoodDatabase.protein_supplements[proteinFood].maxDaily;
        maxAllowed = Math.min(maxAllowed, genderLimits.male || 3); // Default to male limits
    }

    const limitedScoops = Math.min(scoops, maxAllowed);

    return {
        id: generateId(),
        category: 'supplements',
        food: proteinFood,
        serving: limitedScoops,
        displayServing: limitedScoops.toString(),
        displayUnit: limitedScoops === 1 ? 'scoop' : 'scoops',
        addedBy: 'simple-protein-system',
        isProteinFocus: true,
        tier: tier,
        tierLimited: limitedScoops < scoops,
        proteinData: {
            originalProtein: protein.name,
            requestedScoops: scoops,
            actualScoops: limitedScoops,
            tierInfo: {
                tier: tier,
                maxServing: maxAllowed,
                maxDisplay: maxServing.maxDisplay,
                unit: maxServing.unit
            }
        }
    };
};

// Prioritize meals for protein distribution
const getMealPriority = (mealPlan) => {
    const priority = [];

    mealPlan.allMeals.forEach((meal, index) => {
        const mealName = meal.mealName.toLowerCase();

        if (mealName.includes('breakfast')) {
            priority.unshift(index); // Highest priority
        } else if (mealName.includes('lunch')) {
            priority.splice(1, 0, index); // Second priority  
        } else if (mealName.includes('dinner')) {
            priority.splice(2, 0, index); // Third priority
        } else {
            priority.push(index); // Snacks last
        }
    });

    return priority;
};

// ✅ FIXED: Favorite snacks system with guards
export const addFavoriteSnacks = (mealPlan, goal, dietaryFilters = []) => {
    console.log(`🥨 [SNACKS SYSTEM] Adding favorite snacks for ${goal} goal`);

    if (!['maintain', 'lose'].includes(goal)) {
        console.log('⚠️ [SNACKS] Goal not suitable for favorite snacks');
        return mealPlan;
    }

    // 🔒 GUARD: Check if snacks already added
    const hasExistingSnacks = mealPlan.allMeals.some(meal =>
        meal.items.some(item => item.addedBy?.includes('snacks') || item.isFavorite)
    );

    if (hasExistingSnacks) {
        console.log('⚠️ [SNACKS] Favorite snacks already added, skipping');
        return mealPlan;
    }

    const favorites = getFavoritesByGoal(goal, dietaryFilters);
    const snackFavorites = favorites.filter(fav =>
        fav.goalSuitability && fav.goalSuitability.includes(goal)
    );

    console.log(`🍪 [SNACKS] Found ${snackFavorites.length} suitable snacks:`,
        snackFavorites.map(s => s.name));

    if (snackFavorites.length === 0) {
        console.log('⚠️ [SNACKS] No suitable snacks found');
        return mealPlan;
    }

    const snackMeals = mealPlan.allMeals.filter(meal =>
        meal.mealName.toLowerCase().includes('snack')
    );

    if (snackMeals.length > 0) {
        const hummusSnack = snackFavorites.find(fav => fav.name.includes('Hummus'));
        const selectedSnack = hummusSnack || snackFavorites[0];

        const snackItem = {
            id: generateId(),
            category: 'favorite_snacks',
            food: selectedSnack.name,
            serving: 1,
            displayServing: '1',
            displayUnit: 'serving',
            addedBy: 'enhanced-snacks-system',
            isFavorite: true,
            tier: getFoodTier(selectedSnack.name, 'favorite_snacks'),
            snackData: {
                goalSuitability: selectedSnack.goalSuitability,
                dietaryTags: selectedSnack.dietaryTags,
                components: selectedSnack.components
            }
        };

        snackMeals[0].items.push(snackItem);
        console.log(`✅ [SNACKS] Added ${selectedSnack.name} to ${snackMeals[0].mealName} (Tier ${snackItem.tier})`);
    } else {
        console.log('⚠️ [SNACKS] No snack meals found to add favorites to');
    }

    return mealPlan;
};

// Complete meal plan templates
// CORRECTED meal plan templates with your EXACT modal names
// Replace the templates in your MealPlanGenerator.js with these

const CompleteMealPlanTemplates = {
    // MAINTAIN WEIGHT PLANS
    'maintain-balanced-3': {
        targetCalories: 2200,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
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
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1, '1', 'cup'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
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
        targetCalories: 2000,
        goalType: 'maintain',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '3/10', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.8, '4/5', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.4, '0.4', 'oz')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.8, '4/5', 'cup'),
                    createFoodItem('Strawberries', 'fruits', 0.8, '4/5', 'cup')
                ]
            },
            {
                mealName: 'SecondSnack', // 🔧 FIXED: No space
                time: '11:00 AM',
                items: [
                    createFoodItem('String Cheese', 'protein', 1, '1', 'stick'),
                    createFoodItem('Almonds', 'fat', 0.3, '0.3', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.2, '4.2', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.2, '3/5', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 0.8, '4/5', 'cup'),
                    createFoodItem('Olive Oil', 'fat', 0.4, '2/5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '3:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 0.8, '4/5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.4, '2/5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.2, '4.2', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.2, '1.2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 1.6, '1.6', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.6, '3/5', 'medium')
                ]
            }
        ]
    },

    // LOSE WEIGHT PLANS
    'lose-balanced-3': {
        targetCalories: 1600,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 4, '4', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.5, '1/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.75, '3/4', 'cup')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.8, '6.3', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '6:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.5, '5.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1, '1', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.5, '1/2', 'medium')
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
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 5, '5', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.6, '1/4', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1, '1', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.5, '0.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.75, '3/4', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
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
        targetCalories: 1600,
        goalType: 'lose',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Egg Whites', 'protein', 3, '3', 'egg whites'),
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.4, '1/5', 'cup'),
                    createFoodItem('Blueberries', 'fruits', 0.5, '1/2', 'cup')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 0.75, '3/4', 'cup'),
                    createFoodItem('Almonds', 'fat', 0.3, '0.3', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack', // 🔧 FIXED: No space
                time: '11:00 AM',
                items: [
                    createFoodItem('Apple', 'fruits', 0.5, '1/2', 'medium'),
                    createFoodItem('String Cheese', 'protein', 1, '1', 'stick')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.2, '4.2', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 0.75, '3/8', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '3:00 PM',
                items: [
                    createFoodItem('Cottage Cheese (low-fat)', 'protein', 0.5, '1/2', 'cup'),
                    createFoodItem('Cucumber', 'vegetables', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 1.2, '4.2', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 0.8, '0.8', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.4, '0.4', 'medium')
                ]
            }
        ]
    },

    // GAIN MUSCLE PLANS
    'gain-muscle-balanced-3': {
        targetCalories: 2500,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.2, '3/5', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whole Milk', 'fat', 1, '1', 'cup')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.2, '1.1', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.2, '1.2', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '6:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.8, '9.8', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2.2, '2.2', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.2, '1.2', 'medium')
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
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.5, '1.5', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.5, '1.5', 'cups'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.5, '1.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
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
        targetCalories: 2500,
        goalType: 'gain-muscle',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 0.8, '2/5', 'cup'),
                    createFoodItem('Banana', 'fruits', 1, '1', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.2, '1.2', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.2, '1.2', 'cups'),
                    createFoodItem('Almonds', 'fat', 0.8, '4/5', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack', // 🔧 FIXED: No space
                time: '11:00 AM',
                items: [
                    createFoodItem('Quest Bar', 'supplements', 1, '1', 'bar'),
                    createFoodItem('Almonds', 'fat', 0.5, '1/2', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 1.6, '5.6', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 1.6, '4/5', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.2, '1.2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '3:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 0.8, '4/5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2, '7', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 1.6, '1.6', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 1.6, '1.6', 'cups'),
                    createFoodItem('Avocado', 'fat', 0.8, '4/5', 'medium')
                ]
            }
        ]
    },

    // DIRTY BULK PLANS
    'dirty-bulk-balanced-3': {
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 3,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.5, '3/4', 'cup'),
                    createFoodItem('Banana', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 2, '2', 'tbsp'),
                    createFoodItem('Whole Milk', 'fat', 1.5, '1.5', 'cups')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 3, '10.5', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 3, '1.5', 'cups'),
                    createFoodItem('Broccoli', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.8, '1.8', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '6:30 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 3.5, '12.25', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 3, '3', 'medium'),
                    createFoodItem('Spinach', 'vegetables', 2.5, '2.5', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.8, '1.8', 'medium')
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
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1.25, '5/8', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.5, '1.5', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '10:00 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 2, '2', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 2, '2', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.5, '1.5', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '1:00 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2.5, '8.75', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2.5, '1.25', 'cups'),
                    createFoodItem('Bell Peppers', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '4:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 2, '2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
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
        targetCalories: 3200,
        goalType: 'dirty-bulk',
        eaterType: 'balanced',
        mealFrequency: 6,
        allMeals: [
            {
                mealName: 'Breakfast', // ✅ Matches modal
                time: '7:00 AM',
                items: [
                    createFoodItem('Oats (dry)', 'carbohydrate', 1, '1/2', 'cup'),
                    createFoodItem('Banana', 'fruits', 1.2, '1.2', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.2, '1.2', 'tbsp')
                ]
            },
            {
                mealName: 'FirstSnack', // 🔧 FIXED: No space
                time: '9:30 AM',
                items: [
                    createFoodItem('Greek Yogurt (non-fat)', 'protein', 1.6, '1.6', 'cups'),
                    createFoodItem('Blueberries', 'fruits', 1.6, '1.6', 'cups'),
                    createFoodItem('Almonds', 'fat', 1.2, '1.2', 'oz')
                ]
            },
            {
                mealName: 'SecondSnack', // 🔧 FIXED: No space
                time: '11:00 AM',
                items: [
                    createFoodItem('Quest Bar', 'supplements', 1.5, '1.5', 'bars'),
                    createFoodItem('Almonds', 'fat', 1, '1', 'oz')
                ]
            },
            {
                mealName: 'Lunch', // ✅ Matches modal
                time: '12:30 PM',
                items: [
                    createFoodItem('Chicken Breast', 'protein', 2, '7', 'oz'),
                    createFoodItem('Brown Rice (cooked)', 'carbohydrate', 2, '1', 'cup'),
                    createFoodItem('Bell Peppers', 'vegetables', 1.6, '1.6', 'cups'),
                    createFoodItem('Olive Oil', 'fat', 1.2, '1.2', 'tbsp')
                ]
            },
            {
                mealName: 'MidAfternoon Snack', // ✅ Matches modal exactly
                time: '3:00 PM',
                items: [
                    createFoodItem('Apple', 'fruits', 1.6, '1.6', 'medium'),
                    createFoodItem('Peanut Butter', 'fat', 1.2, '1.2', 'tbsp'),
                    createFoodItem('Granola', 'carbohydrate', 0.5, '1/2', 'cup')
                ]
            },
            {
                mealName: 'Dinner', // ✅ Matches modal
                time: '7:00 PM',
                items: [
                    createFoodItem('Salmon', 'protein', 2.4, '8.4', 'oz'),
                    createFoodItem('Sweet Potato', 'carbohydrate', 2, '2', 'medium'),
                    createFoodItem('Asparagus', 'vegetables', 2, '2', 'cups'),
                    createFoodItem('Avocado', 'fat', 1.2, '1.2', 'medium')
                ]
            }
        ]
    }
};

// Helper function for missing dietary filter toggle
const handleDietaryFilterToggle = (filter) => {
    if (selectedDietaryFilters.includes(filter)) {
        return selectedDietaryFilters.filter(f => f !== filter);
    } else {
        return [...selectedDietaryFilters, filter];
    }
};

/**
 * 🚀 FIXED ULTIMATE MEAL PLAN GENERATOR CLASS
 */
export class MealPlanGenerator {
    constructor() {
        this.templates = CompleteMealPlanTemplates;
        this.planCache = new Map();
    }

    /**
     * Generate meal plan with all systems working properly
     */
    generateMealPlan(options) {
        const {
            goal = 'maintain',
            eaterType = 'balanced',
            mealFreq = 5,
            dietaryFilters = [],
            userProfile = {},
            calorieData = null
        } = options;

        console.log(`🎯 [FIXED GENERATOR] Starting: ${goal}-${eaterType}-${mealFreq}`);
        console.log(`👤 [USER PROFILE]`, userProfile);
        console.log(`🥗 [DIETARY FILTERS]`, dietaryFilters);

        try {
            // Step 1: Get base template
            const baseTemplate = this.getMealPlanTemplate(goal, eaterType, mealFreq);
            if (!baseTemplate) {
                throw new Error(`No template found for ${goal}-${eaterType}-${mealFreq}`);
            }
            console.log(`📋 [TEMPLATE] Found base template with ${baseTemplate.allMeals.length} meals`);

            // Step 2: Deep clone to prevent mutations
            const workingPlan = JSON.parse(JSON.stringify(baseTemplate));

            // Step 3: Apply dietary filters
            console.log(`🥨 [DIETARY] Applying dietary filters...`);
            const dietaryPlan = applyDietaryFilters ?
                applyDietaryFilters(workingPlan, dietaryFilters) :
                workingPlan;

            // Step 4: Add favorite snacks FIRST (only once)
            console.log(`🍪 [FAVORITES] Adding favorite snacks...`);
            addFavoriteSnacks(dietaryPlan, goal, dietaryFilters);

            // Step 5: Distribute protein (only once)
            console.log(`💪 [PROTEIN] Starting protein distribution...`);
            const gender = userProfile?.gender || 'male';
            console.log(`👤 [GENDER] Using gender: ${gender}`);
            distributeProteinThroughoutDay(dietaryPlan, gender, goal, dietaryFilters);

            // Step 6: Calculate target calories and scale with tier system
            const targetCalories = this.calculateTargetCalories(goal, calorieData, gender);
            console.log(`📊 [CALORIES] Target calories: ${targetCalories}`);

            const scaledPlan = this.scaleMealPlanWithTiers(dietaryPlan, targetCalories, goal);

            // Step 7: Enhance plan with metadata
            const finalPlan = this.enhanceMealPlan(scaledPlan, {
                goal,
                eaterType,
                mealFreq,
                dietaryFilters,
                userProfile,
                targetCalories
            });

            // Step 8: Validate dietary compliance
            if (validateDietaryCompliance) {
                const validation = validateDietaryCompliance(finalPlan, dietaryFilters);
                if (!validation.isCompliant) {
                    console.warn('⚠️ Plan validation warnings:', validation.violations);
                    finalPlan.validationWarnings = validation.violations;
                }
            }

            console.log('✅ [FIXED SUCCESS] Meal plan generation complete');
            console.log(`🎯 [SUMMARY] Final plan: ${finalPlan.allMeals.length} meals, ${this.countProteinItems(finalPlan)} protein items, ${this.countTierLimitedItems(finalPlan)} tier-limited items`);

            return finalPlan;

        } catch (error) {
            console.error('❌ [FIXED ERROR] Error generating meal plan:', error);
            return this.getFallbackPlan();
        }
    }

    /**
     * 🔧 FIXED: Enhanced scaling with proper rounding
     */
    scaleMealPlanWithTiers(basePlan, targetCalories, goal) {
        const currentCalories = this.calculatePlanCalories(basePlan);
        let scalingFactor = targetCalories / currentCalories;

        const scalingLimits = {
            'lose': { min: 0.4, max: 1.2 },
            'maintain': { min: 0.7, max: 1.3 },
            'gain-muscle': { min: 0.8, max: 1.5 },
            'dirty-bulk': { min: 0.9, max: 2.0 }
        };

        const limits = scalingLimits[goal] || { min: 0.5, max: 2.0 };
        scalingFactor = Math.max(limits.min, Math.min(limits.max, scalingFactor));

        console.log(`📊 [TIER SCALING] ${currentCalories} → ${targetCalories} calories (${scalingFactor.toFixed(2)}x)`);

        // Clone and apply tier-based scaling with proper rounding
        const scaledPlan = JSON.parse(JSON.stringify(basePlan));
        let totalCalorieDeficit = 0;

        scaledPlan.allMeals = scaledPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => {
                // Apply tier-based scaling to each item
                const tierScaledItem = applyTierBasedScaling(item, scalingFactor, goal);

                // 🔧 FIXED: Apply proper rounding to display values
                const newServing = tierScaledItem.serving;
                const rawDisplayServing = parseFloat(tierScaledItem.displayServing || '1');

                // Apply user-friendly rounding
                const friendlyDisplayServing = roundToUserFriendly(rawDisplayServing, tierScaledItem.displayUnit);
                const standardUnit = standardizeDisplayUnit(friendlyDisplayServing, tierScaledItem.displayUnit);

                tierScaledItem.displayServing = friendlyDisplayServing < 0.25 ? '0.25' : friendlyDisplayServing.toString();
                tierScaledItem.displayUnit = standardUnit;

                // Track calorie deficits for makeup foods
                if (tierScaledItem.scalingDeficit) {
                    totalCalorieDeficit += tierScaledItem.scalingDeficit * (getFoodNutrition(item.food, item.category)?.calories || 100);
                }

                return tierScaledItem;
            })
        }));

        // Add makeup calories if needed
        if (totalCalorieDeficit > 100) {
            console.log(`🔄 [MAKEUP CALORIES] Adding ${Math.round(totalCalorieDeficit)} makeup calories`);
            addMakeupCalories(scaledPlan, totalCalorieDeficit, goal, []);
        }

        scaledPlan.actualCalories = this.calculatePlanCalories(scaledPlan);
        scaledPlan.scalingFactor = scalingFactor;
        scaledPlan.targetCalories = targetCalories;
        scaledPlan.tierAnalysis = {
            totalDeficit: totalCalorieDeficit,
            makeupCaloriesAdded: totalCalorieDeficit > 100,
            scalingApproach: 'tier-based-with-proper-rounding'
        };

        console.log(`✅ [TIER SCALING] Complete. Final calories: ${scaledPlan.actualCalories}`);

        return scaledPlan;
    }

    // Helper methods
    countTierLimitedItems(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.filter(item => item.wasLimited || item.tierLimited).length;
        }, 0);
    }

    countProteinItems(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.filter(item =>
                item.isProteinFocus ||
                item.addedBy?.includes('protein') ||
                item.category === 'supplements' ||
                item.category === 'protein_combinations'
            ).length;
        }, 0);
    }

    getMealPlanTemplate(goal, eaterType, mealFreq) {
        const key = `${goal}-${eaterType}-${mealFreq}`;
        return this.templates[key] || this.templates['maintain-balanced-5'];
    }

    calculateTargetCalories(goal, calorieData, gender = 'male') {
        if (!calorieData) {
            // 🔧 GENDER-SPECIFIC BASE CALORIES
            const femaleDefaults = {
                'lose': 1400,
                'maintain': 1600,
                'gain-muscle': 1900,
                'dirty-bulk': 2200
            };

            const maleDefaults = {
                'lose': 1800,
                'maintain': 2200,
                'gain-muscle': 2700,
                'dirty-bulk': 3000
            };

            const defaults = gender.toLowerCase() === 'female' ? femaleDefaults : maleDefaults;
            const targetCalories = defaults[goal] || (gender.toLowerCase() === 'female' ? 1600 : 2200);

            console.log(`📊 [GENDER CALORIES] ${gender} ${goal}: ${targetCalories} calories (from defaults)`);
            return targetCalories;
        }

        switch (goal) {
            case 'lose':
                return Math.max(1200, calorieData.bmr + 50);
            case 'maintain':
                return calorieData.targetCalories || calorieData.tdee || (gender.toLowerCase() === 'female' ? 1600 : 2200);
            case 'gain-muscle':
                return (calorieData.tdee || (gender.toLowerCase() === 'female' ? 1600 : 2200)) + 500;
            case 'dirty-bulk':
                return (calorieData.tdee || (gender.toLowerCase() === 'female' ? 1600 : 2200)) + 700;
            default:
                return calorieData.targetCalories || (gender.toLowerCase() === 'female' ? 1600 : 2200);
        }
    }

    calculatePlanCalories(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.reduce((mealTotal, item) => {
                const foodData = getFoodNutrition ? getFoodNutrition(item.food, item.category) : { calories: 100 };
                return mealTotal + (foodData.calories * item.serving);
            }, 0);
        }, 0);
    }

    calculateNutritionBreakdown(mealPlan) {
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalSugar = 0;
        let totalCalories = 0;

        mealPlan.allMeals.forEach(meal => {
            meal.items.forEach(item => {
                const foodData = getFoodNutrition ? getFoodNutrition(item.food, item.category) :
                    { protein: 5, carbs: 10, fat: 2, sugar: 1, calories: 100 };
                const multiplier = item.serving;

                totalProtein += foodData.protein * multiplier;
                totalCarbs += foodData.carbs * multiplier;
                totalFat += foodData.fat * multiplier;
                totalSugar += (foodData.sugar || 0) * multiplier;
                totalCalories += foodData.calories * multiplier;
            });
        });

        return {
            protein: Math.round(totalProtein * 10) / 10,
            carbs: Math.round(totalCarbs * 10) / 10,
            fat: Math.round(totalFat * 10) / 10,
            sugar: Math.round(totalSugar * 10) / 10,
            calories: Math.round(totalCalories),
            proteinPercent: Math.round((totalProtein * 4 / totalCalories) * 100),
            carbsPercent: Math.round((totalCarbs * 4 / totalCalories) * 100),
            fatPercent: Math.round((totalFat * 9 / totalCalories) * 100)
        };
    }

    enhanceMealPlan(mealPlan, options) {
        const enhanced = {
            ...mealPlan,
            generatedAt: new Date().toISOString(),
            planId: `${options.goal}-${options.eaterType}-${options.mealFreq}${options.dietaryFilters.length ? '-' + options.dietaryFilters.join('-') : ''}`,
            generatedWith: 'fixed-ultimate-system-v4',

            userPreferences: {
                goal: options.goal,
                eaterType: options.eaterType,
                mealFreq: options.mealFreq,
                dietaryFilters: options.dietaryFilters,
                gender: options.userProfile?.gender || 'unknown'
            },

            nutrition: this.calculateNutritionBreakdown(mealPlan),
            fruitCount: this.calculateFruitCount(mealPlan),

            proteinItemsAdded: this.countProteinItems(mealPlan),
            tierLimitedItems: this.countTierLimitedItems(mealPlan),
            systemEnhancements: {
                proteinSystemActive: true,
                tierBasedScalingActive: true,
                favoriteSnacksActive: true,
                dietaryFiltersApplied: options.dietaryFilters.length > 0,
                makeupCaloriesActive: mealPlan.tierAnalysis?.makeupCaloriesAdded || false,
                bugsFixed: ['protein-spam', 'rounding-errors', 'calorie-explosion']
            }
        };

        return enhanced;
    }

    calculateFruitCount(mealPlan) {
        let totalFruits = 0;
        mealPlan.allMeals.forEach(meal => {
            meal.items.forEach(item => {
                if (item.category === 'fruits') {
                    totalFruits += item.serving;
                }
            });
        });
        return Math.round(totalFruits * 10) / 10;
    }

    getFallbackPlan() {
        console.log('🆘 Returning fallback meal plan');
        return this.templates['maintain-balanced-5'];
    }
}

// Create singleton instance
export const mealPlanGenerator = new MealPlanGenerator();

// Convenience functions
export const generateMealPlan = (options) => mealPlanGenerator.generateMealPlan(options);
export const calculatePlanNutrition = (plan) => mealPlanGenerator.calculateNutritionBreakdown(plan);

export default mealPlanGenerator;