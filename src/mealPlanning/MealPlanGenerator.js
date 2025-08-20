// MealPlanGenerator.js - Ultimate meal planning system with protein priority + tier scaling

import { applyDietaryFilters, validateDietaryCompliance } from './DietaryFilterSystem.js';
import { getFoodNutrition, FoodDatabase } from './FoodDatabase.js';

// ✅ WORKING IMPORTS - Enhanced systems
import {
    getProteinRecommendations,
    getFavoritesByGoal,
    calculateProteinDistribution,
    EnhancedFoodDatabase
} from './EnhancedFoodDatabase.js';

// ✅ TIER-BASED SCALING SYSTEM - Imported from your TierBasedScaling.js
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

// ✅ ENHANCED PROTEIN DISTRIBUTION SYSTEM (with tier awareness)
export const distributeProteinThroughoutDay = (mealPlan, gender, goal, dietaryFilters = []) => {
    console.log(`🥤 [PROTEIN SYSTEM ACTIVE] Distributing protein for ${gender} with ${goal} goal`);
    console.log(`📊 [PROTEIN] Dietary filters: ${dietaryFilters.join(', ') || 'none'}`);

    // Get protein recommendations from enhanced database
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

    // Enhanced distribution with tier-based limits
    if (gender.toLowerCase() === 'male' && totalScoops >= 4) {
        return distributeMaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters);
    } else {
        return distributeFemaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters);
    }
};

// Male protein distribution with tier-based scaling awareness
const distributeMaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters) => {
    console.log(`👨 [MALE PROTEIN] Distributing ${totalScoops} scoops (up to 2 per meal)`);

    const maxMealsWithProtein = Math.min(4, mealPlan.allMeals.length);
    const scoopsPerMeal = 2;
    const mealsToTarget = Math.min(Math.ceil(totalScoops / scoopsPerMeal), maxMealsWithProtein);

    const mealPriority = getMealPriority(mealPlan);

    let remainingScoops = totalScoops;
    let proteinItemsAdded = 0;

    for (let i = 0; i < mealsToTarget && remainingScoops > 0; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];
        const scoopsToAdd = Math.min(scoopsPerMeal, remainingScoops);

        // Create protein item with tier-based limits awareness
        const proteinItem = createTierAwareProteinItem(protein, scoopsToAdd, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);

        remainingScoops -= scoopsToAdd;
        proteinItemsAdded++;

        console.log(`✅ [MALE PROTEIN] Added ${scoopsToAdd} scoops of ${proteinItem.food} to ${meal.mealName} (Tier ${proteinItem.tier || 'unknown'})`);
    }

    console.log(`🎯 [MALE PROTEIN] Successfully added ${proteinItemsAdded} protein items`);
    return mealPlan;
};

// Female protein distribution with tier awareness
const distributeFemaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters) => {
    console.log(`👩 [FEMALE PROTEIN] Distributing ${totalScoops} scoops (1 per meal)`);

    const scoopsPerMeal = 1;
    const mealsToTarget = Math.min(totalScoops, mealPlan.allMeals.length);

    const mealPriority = getMealPriority(mealPlan);

    let proteinItemsAdded = 0;

    for (let i = 0; i < mealsToTarget; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        const proteinItem = createTierAwareProteinItem(protein, scoopsPerMeal, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);
        proteinItemsAdded++;

        console.log(`✅ [FEMALE PROTEIN] Added ${scoopsPerMeal} scoop of ${proteinItem.food} to ${meal.mealName} (Tier ${proteinItem.tier || 'unknown'})`);
    }

    console.log(`🎯 [FEMALE PROTEIN] Successfully added ${proteinItemsAdded} protein items`);
    return mealPlan;
};

// Create tier-aware protein item with smart combinations
const createTierAwareProteinItem = (protein, scoops, meal, goal, dietaryFilters) => {
    const mealName = meal.mealName.toLowerCase();

    // Check existing meal items for smart combinations
    const hasGreekYogurt = meal.items.some(item => item.food.includes('Greek Yogurt'));
    const hasOats = meal.items.some(item => item.food.includes('Oats'));
    const hasBerries = meal.items.some(item => item.category === 'fruits');

    let proteinFood = protein.name;
    let combination = null;
    let category = 'supplements';

    // Create enhanced combinations from database
    if (hasGreekYogurt && !meal.items.some(item => item.food.includes('Protein'))) {
        if (dietaryFilters.includes('dairyFree')) {
            combination = 'Coconut Yogurt + Plant Protein';
        } else {
            combination = dietaryFilters.includes('vegetarian') ?
                'Greek Yogurt + Plant Protein' :
                'Greek Yogurt + Whey Protein';
        }
        proteinFood = combination;
        category = 'protein_combinations';
    } else if (hasOats && mealName.includes('breakfast')) {
        combination = dietaryFilters.includes('dairyFree') ?
            'Oats + Plant Protein' :
            'Oats + Whey Protein';
        proteinFood = combination;
        category = 'protein_combinations';
    } else if (hasBerries && (goal === 'lose' || goal === 'maintain')) {
        combination = 'Berries + Protein Powder';
        proteinFood = combination;
        category = 'favorite_snacks';
    }

    // Get tier information for this protein
    const tier = getFoodTier(proteinFood, category);
    const maxServing = getFoodMaxServing(proteinFood);

    // Apply tier-based limits to the serving
    const limitedScoops = Math.min(scoops, maxServing.maxServing);

    // Get nutritional data
    let nutritionData = protein;
    if (combination && EnhancedFoodDatabase.protein_combinations[combination]) {
        nutritionData = EnhancedFoodDatabase.protein_combinations[combination];
    } else if (combination && EnhancedFoodDatabase.favorite_snacks[combination]) {
        nutritionData = EnhancedFoodDatabase.favorite_snacks[combination];
    }

    return {
        id: generateId(),
        category,
        food: proteinFood,
        serving: limitedScoops,
        displayServing: limitedScoops.toString(),
        displayUnit: combination ? 'servings' : (limitedScoops === 1 ? 'scoop' : 'scoops'),
        addedBy: 'tier-aware-protein-system',
        isProteinFocus: true,
        combination: combination,
        tier: tier,
        tierLimited: limitedScoops < scoops,
        proteinData: {
            originalProtein: protein.name,
            combination: combination,
            nutritionData: nutritionData,
            requestedScoops: scoops,
            actualScoops: limitedScoops,
            tierInfo: {
                tier: tier,
                maxServing: maxServing.maxServing,
                maxDisplay: maxServing.maxDisplay,
                unit: maxServing.unit
            },
            mealContext: {
                hasGreekYogurt,
                hasOats,
                hasBerries,
                mealName: meal.mealName
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

// ✅ ENHANCED FAVORITE SNACKS SYSTEM
export const addFavoriteSnacks = (mealPlan, goal, dietaryFilters = []) => {
    console.log(`🥨 [SNACKS SYSTEM] Adding favorite snacks for ${goal} goal`);

    if (!['maintain', 'lose'].includes(goal)) {
        console.log('⚠️ [SNACKS] Goal not suitable for favorite snacks');
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

        // Apply tier-based scaling to snack items
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

// Helper functions for user-friendly rounding
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

// Complete meal plan templates
const CompleteMealPlanTemplates = {
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
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
                    createFoodItem('Apple', 'fruits', 1, '1', 'medium'),
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp')
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
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
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
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp')
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
    }
};

/**
 * 🚀 ULTIMATE MEAL PLAN GENERATOR CLASS (Protein + Tier Integration)
 */
export class MealPlanGenerator {
    constructor() {
        this.templates = CompleteMealPlanTemplates;
        this.planCache = new Map();
    }

    /**
     * Generate a complete meal plan with protein priority + tier-based scaling
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

        console.log(`🎯 [ULTIMATE GENERATOR] Starting: ${goal}-${eaterType}-${mealFreq}`);
        console.log(`👤 [USER PROFILE]`, userProfile);
        console.log(`🥗 [DIETARY FILTERS]`, dietaryFilters);

        try {
            // Step 1: Get base template
            const baseTemplate = this.getMealPlanTemplate(goal, eaterType, mealFreq);
            if (!baseTemplate) {
                throw new Error(`No template found for ${goal}-${eaterType}-${mealFreq}`);
            }
            console.log(`📋 [TEMPLATE] Found base template with ${baseTemplate.allMeals.length} meals`);

            // Step 2: Apply dietary filters
            console.log(`🥨 [DIETARY] Applying dietary filters...`);
            const dietaryPlan = applyDietaryFilters ?
                applyDietaryFilters(baseTemplate, dietaryFilters) :
                JSON.parse(JSON.stringify(baseTemplate));

            // Step 3: Add favorite snacks FIRST
            console.log(`🍪 [FAVORITES] Adding favorite snacks...`);
            addFavoriteSnacks(dietaryPlan, goal, dietaryFilters);

            // Step 4: Distribute protein (tier-aware)
            console.log(`💪 [PROTEIN] Starting tier-aware protein distribution...`);
            const gender = userProfile?.gender || 'male';
            console.log(`👤 [GENDER] Using gender: ${gender}`);
            distributeProteinThroughoutDay(dietaryPlan, gender, goal, dietaryFilters);

            // Step 5: Apply tier-based scaling to ALL items
            const targetCalories = this.calculateTargetCalories(goal, calorieData);
            console.log(`📊 [CALORIES] Target calories: ${targetCalories}`);

            // 🔥 NEW: Enhanced scaling with tier-based system
            const scaledPlan = this.scaleMealPlanWithTiers(dietaryPlan, targetCalories, goal);

            // Step 6: Enhance plan with metadata
            const finalPlan = this.enhanceMealPlan(scaledPlan, {
                goal,
                eaterType,
                mealFreq,
                dietaryFilters,
                userProfile,
                targetCalories
            });

            // Step 7: Validate dietary compliance
            if (validateDietaryCompliance) {
                const validation = validateDietaryCompliance(finalPlan, dietaryFilters);
                if (!validation.isCompliant) {
                    console.warn('⚠️ Plan validation warnings:', validation.violations);
                    finalPlan.validationWarnings = validation.violations;
                }
            }

            console.log('✅ [ULTIMATE SUCCESS] Meal plan generation complete');
            console.log(`🎯 [SUMMARY] Final plan: ${finalPlan.allMeals.length} meals, ${this.countProteinItems(finalPlan)} protein items, ${this.countTierLimitedItems(finalPlan)} tier-limited items`);

            return finalPlan;

        } catch (error) {
            console.error('❌ [ULTIMATE ERROR] Error generating meal plan:', error);
            return this.getFallbackPlan();
        }
    }

    /**
     * 🔥 NEW: Enhanced scaling with tier-based system integration
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

        // Clone and apply tier-based scaling
        const scaledPlan = JSON.parse(JSON.stringify(basePlan));
        let totalCalorieDeficit = 0;

        scaledPlan.allMeals = scaledPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => {
                // Apply tier-based scaling to each item
                const tierScaledItem = applyTierBasedScaling(item, scalingFactor, goal);

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
            scalingApproach: 'tier-based-with-makeup'
        };

        console.log(`✅ [TIER SCALING] Complete. Final calories: ${scaledPlan.actualCalories}`);

        return scaledPlan;
    }

    // Helper to count tier-limited items
    countTierLimitedItems(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.filter(item => item.wasLimited || item.tierLimited).length;
        }, 0);
    }

    // Helper to count protein items
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

    calculateTargetCalories(goal, calorieData) {
        if (!calorieData) {
            const defaults = {
                'lose': 1800,
                'maintain': 2200,
                'gain-muscle': 2700,
                'dirty-bulk': 3000
            };
            return defaults[goal] || 2200;
        }

        switch (goal) {
            case 'lose':
                return Math.max(1200, calorieData.bmr + 50);
            case 'maintain':
                return calorieData.targetCalories || calorieData.tdee || 2200;
            case 'gain-muscle':
                return (calorieData.tdee || 2200) + 500;
            case 'dirty-bulk':
                return (calorieData.tdee || 2200) + 700;
            default:
                return calorieData.targetCalories || 2200;
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
            generatedWith: 'ultimate-protein-tier-system-v3',

            userPreferences: {
                goal: options.goal,
                eaterType: options.eaterType,
                mealFreq: options.mealFreq,
                dietaryFilters: options.dietaryFilters,
                gender: options.userProfile?.gender || 'unknown'
            },

            nutrition: this.calculateNutritionBreakdown(mealPlan),
            fruitCount: this.calculateFruitCount(mealPlan),

            // Enhanced metrics with tier analysis
            proteinItemsAdded: this.countProteinItems(mealPlan),
            tierLimitedItems: this.countTierLimitedItems(mealPlan),
            systemEnhancements: {
                proteinSystemActive: true,
                tierBasedScalingActive: true,
                favoriteSnacksActive: true,
                dietaryFiltersApplied: options.dietaryFilters.length > 0,
                makeupCaloriesActive: mealPlan.tierAnalysis?.makeupCaloriesAdded || false
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