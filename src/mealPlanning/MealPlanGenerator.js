// MealPlanGenerator.js - FIXED: Apply gender-aware limits to base template items

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

// ✅ FIXED: User-friendly rounding functions
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

// 🔧 FIXED: Gender-Aware Protein Distribution with STRICT 12/4 Limits
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

    // Get protein recommendations
    const proteinRecommendations = getProteinRecommendations(dietaryFilters, gender, goal);
    const proteinDistribution = calculateProteinDistribution(gender, goal, mealPlan.allMeals.length);

    if (proteinRecommendations.length === 0) {
        console.log('⚠️ [PROTEIN] No suitable protein sources found');
        return mealPlan;
    }

    const primaryProtein = proteinRecommendations[0];

    // 🔧 FIXED: STRICT LIMITS - Males 12, Females 4
    const maxProteinLimits = {
        male: 12,    // 🚹 12 scoops max for males  
        female: 4    // 🚺 4 scoops max for females
    };

    const genderKey = gender.toLowerCase();
    const maxScoops = maxProteinLimits[genderKey] || maxProteinLimits.male;
    const totalScoops = Math.min(proteinDistribution.totalScoops, maxScoops);

    console.log(`🥤 [PROTEIN] Using ${primaryProtein.name}, distributing ${totalScoops}/${maxScoops} max scoops for ${gender}`);

    // Distribution based on gender with STRICT limits
    if (gender.toLowerCase() === 'male') {
        return distributeMaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters, 12);
    } else {
        return distributeFemaleProtein(mealPlan, primaryProtein, totalScoops, goal, dietaryFilters, 4);
    }
};

// 🔧 FIXED: Male protein distribution with 12 scoop max
const distributeMaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters, maxScoops = 12) => {
    console.log(`👨 [MALE PROTEIN] Distributing ${totalScoops}/${maxScoops} scoops (max 3 per meal)`);

    const maxMealsWithProtein = Math.min(4, mealPlan.allMeals.length);
    const scoopsPerMeal = Math.min(3, Math.ceil(totalScoops / maxMealsWithProtein)); // Up to 3 per meal
    const mealsToTarget = Math.min(Math.ceil(totalScoops / scoopsPerMeal), maxMealsWithProtein);

    const mealPriority = getMealPriority(mealPlan);
    let remainingScoops = Math.min(totalScoops, maxScoops);
    let proteinItemsAdded = 0;

    for (let i = 0; i < mealsToTarget && remainingScoops > 0; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        // Skip if meal already has protein
        const hasProtein = meal.items.some(item => item.addedBy?.includes('protein') || item.isProteinFocus);
        if (hasProtein) {
            console.log(`⚠️ [MALE PROTEIN] ${meal.mealName} already has protein, skipping`);
            continue;
        }

        const scoopsToAdd = Math.min(scoopsPerMeal, remainingScoops);
        const proteinItem = createTierAwareProteinItem(protein, scoopsToAdd, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);

        remainingScoops -= scoopsToAdd;
        proteinItemsAdded++;

        console.log(`✅ [MALE PROTEIN] Added ${scoopsToAdd} scoops to ${meal.mealName} (${remainingScoops} remaining)`);
    }

    console.log(`🎯 [MALE PROTEIN] Added ${proteinItemsAdded} protein items (${totalScoops - remainingScoops}/${maxScoops} total scoops)`);
    return mealPlan;
};

// 🔧 FIXED: Female protein distribution with 4 scoop max
const distributeFemaleProtein = (mealPlan, protein, totalScoops, goal, dietaryFilters, maxScoops = 4) => {
    console.log(`👩 [FEMALE PROTEIN] Distributing ${totalScoops}/${maxScoops} scoops (1 per meal)`);

    const scoopsPerMeal = 1;
    const maxMealsWithProtein = Math.min(maxScoops, mealPlan.allMeals.length);
    const actualScoops = Math.min(totalScoops, maxScoops);
    const mealsToTarget = Math.min(actualScoops, maxMealsWithProtein);

    const mealPriority = getMealPriority(mealPlan);
    let proteinItemsAdded = 0;

    for (let i = 0; i < mealsToTarget; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        // Skip if meal already has protein
        const hasProtein = meal.items.some(item => item.addedBy?.includes('protein') || item.isProteinFocus);
        if (hasProtein) {
            console.log(`⚠️ [FEMALE PROTEIN] ${meal.mealName} already has protein, skipping`);
            continue;
        }

        const proteinItem = createTierAwareProteinItem(protein, scoopsPerMeal, meal, goal, dietaryFilters);
        meal.items.push(proteinItem);
        proteinItemsAdded++;

        console.log(`✅ [FEMALE PROTEIN] Added ${scoopsPerMeal} scoop to ${meal.mealName}`);
    }

    console.log(`🎯 [FEMALE PROTEIN] Added ${proteinItemsAdded}/${maxScoops} protein items`);
    return mealPlan;
};

// ✅ FIXED: Simple protein item - no confusing combinations
const createTierAwareProteinItem = (protein, scoops, meal, goal, dietaryFilters) => {
    let proteinFood = protein.name;
    let category = 'supplements';

    const tier = getFoodTier(proteinFood, category);
    const maxServing = getFoodMaxServing(proteinFood);
    let maxAllowed = maxServing.maxServing;

    // For protein supplements, use gender-specific limits
    if (EnhancedFoodDatabase.protein_supplements[proteinFood]) {
        const genderLimits = EnhancedFoodDatabase.protein_supplements[proteinFood].maxDaily;
        maxAllowed = Math.min(maxAllowed, genderLimits.male || 3);
    }

    const limitedScoops = Math.min(scoops, maxAllowed);

    return {
        id: generateId(),
        category: 'supplements',
        food: proteinFood,
        serving: limitedScoops,
        displayServing: limitedScoops.toString(),
        displayUnit: limitedScoops === 1 ? 'scoop' : 'scoops',
        addedBy: 'fixed-protein-system-v3',
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

// ✅ FIXED: Favorite snacks system
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

    const snackMeals = mealPlan.allMeals.filter(meal =>
        meal.mealName.toLowerCase().includes('snack')
    );

    if (snackMeals.length > 0) {
        addSeparateSnackComponents(snackMeals[0], goal, dietaryFilters);
    } else {
        console.log('⚠️ [SNACKS] No snack meals found to add favorites to');
    }

    return mealPlan;
};

// Add separate snack components
const addSeparateSnackComponents = (snackMeal, goal, dietaryFilters) => {
    let snackComponents = [];

    if (dietaryFilters.includes('glutenFree')) {
        snackComponents = [
            {
                food: 'Hummus',
                category: 'condiments',
                serving: 1,
                displayServing: '2',
                displayUnit: 'tbsp'
            },
            {
                food: 'Rice Cakes',
                category: 'carbohydrate',
                serving: 3,
                displayServing: '3',
                displayUnit: 'cakes'
            }
        ];
    } else {
        snackComponents = [
            {
                food: 'Hummus',
                category: 'condiments',
                serving: 1,
                displayServing: '2',
                displayUnit: 'tbsp'
            },
            {
                food: 'Pretzels (mini)',
                category: 'carbohydrate',
                serving: 1,
                displayServing: '20',
                displayUnit: 'mini pretzels'
            }
        ];
    }

    snackComponents.forEach(component => {
        const snackItem = {
            id: generateId(),
            category: component.category,
            food: component.food,
            serving: component.serving,
            displayServing: component.displayServing,
            displayUnit: component.displayUnit,
            addedBy: 'separate-snacks-system',
            isFavorite: true,
            tier: getFoodTier(component.food, component.category)
        };

        snackMeal.items.push(snackItem);
        console.log(`✅ [SNACKS] Added ${component.food} (${component.displayServing} ${component.displayUnit}) to ${snackMeal.mealName}`);
    });
};

// 🔧 FIXED: Apply realistic limits for BOTH genders (no more 5-cup oatmeal!)
const RealisticPortionLimits = {
    // 🚺 Female limits (conservative, realistic)
    female: {
        'Oats (dry)': 0.75,                    // 3/4 cup max
        'Brown Rice (cooked)': 0.75,           // 3/4 cup max
        'White Rice (cooked)': 0.75,           // 3/4 cup max
        'Quinoa (cooked)': 0.75,               // 3/4 cup max
        'Pasta (cooked)': 0.75,                // 3/4 cup max
        'Sweet Potato': 1.0,                   // 1 medium max
        'Potato (baked)': 1.0,                 // 1 medium max
        'Whole Wheat Bread': 2,                // 2 slices max
        'Bagel (plain)': 0.5,                  // 1/2 bagel max
        'Avocado': 1.0,                        // 1 medium max
        'Greek Yogurt (non-fat)': 1.0,         // 1 cup max
        'Coconut Yogurt': 1.0,                 // 1 cup max
        'Granola': 0.25,                       // 1/4 cup max
        'Nuts (mixed)': 1.0,                   // 1 oz max
        'Almonds': 1.0,                        // 1 oz max
        'Peanut Butter': 2.0,                  // 2 tbsp max
        'Almond Butter': 2.0,                  // 2 tbsp max
        'Chicken Breast': 2.0,                 // 7 oz max
        'Salmon': 2.0,                         // 7 oz max
        'Eggs (whole)': 4,                     // 4 eggs max
        'Whey Protein (generic)': 4,           // 4 scoops max
        'Plant Protein (pea/rice)': 4          // 4 scoops max
    },

    // 🚹 Male limits (generous but still realistic - NO 5-CUP OATMEAL!)
    male: {
        'Oats (dry)': 1.5,                     // 1.5 cups max (not 5 cups!)
        'Brown Rice (cooked)': 1.5,            // 1.5 cups max
        'White Rice (cooked)': 1.5,            // 1.5 cups max
        'Quinoa (cooked)': 1.25,               // 1.25 cups max
        'Pasta (cooked)': 1.5,                 // 1.5 cups max
        'Sweet Potato': 2.0,                   // 2 medium max
        'Potato (baked)': 2.0,                 // 2 medium max
        'Whole Wheat Bread': 4,                // 4 slices max
        'Bagel (plain)': 1.0,                  // 1 whole bagel max
        'Avocado': 2.0,                        // 2 medium max
        'Greek Yogurt (non-fat)': 2.0,         // 2 cups max
        'Coconut Yogurt': 2.0,                 // 2 cups max
        'Granola': 0.75,                       // 3/4 cup max
        'Nuts (mixed)': 2.0,                   // 2 oz max
        'Almonds': 2.0,                        // 2 oz max
        'Peanut Butter': 4.0,                  // 4 tbsp max
        'Almond Butter': 4.0,                  // 4 tbsp max
        'Chicken Breast': 4.0,                 // 14 oz max
        'Salmon': 3.5,                         // 12 oz max
        'Eggs (whole)': 8,                     // 8 eggs max
        'Whey Protein (generic)': 12,          // 12 scoops max
        'Plant Protein (pea/rice)': 12         // 12 scoops max
    }
};

const applyGenderAwareTierScaling = (item, targetScaling, goal, gender) => {
    const tier = getFoodTier(item.food, item.category);
    const tierMaxServing = getFoodMaxServing(item.food);

    // Calculate desired serving after scaling
    const desiredServing = item.serving * targetScaling;

    // 🎯 Get gender-specific realistic limit
    const genderKey = gender.toLowerCase();
    const genderLimits = RealisticPortionLimits[genderKey] || RealisticPortionLimits.male;
    const realisticLimit = genderLimits[item.food];

    let finalServing = desiredServing;

    // Apply gender-specific realistic limit FIRST
    if (realisticLimit !== undefined) {
        const originalServing = finalServing;
        finalServing = Math.min(desiredServing, realisticLimit);

        if (finalServing < originalServing) {
            console.log(`${gender === 'female' ? '🚺' : '🚹'} [${gender.toUpperCase()} REALISTIC LIMIT] ${item.food}: ${desiredServing.toFixed(2)} → ${finalServing} (max: ${realisticLimit})`);
        }
    }

    // Apply tier limits second (as backup safety)
    finalServing = Math.min(finalServing, tierMaxServing.maxServing);

    // Calculate deficit for makeup calories
    const scalingDeficit = desiredServing - finalServing;

    // Calculate display serving
    const originalDisplayServing = parseFloat(item.displayServing || '1');
    const scalingRatio = finalServing / item.serving;
    const newDisplayServing = originalDisplayServing * scalingRatio;

    // Apply user-friendly rounding
    const friendlyDisplayServing = roundToUserFriendly(newDisplayServing, item.displayUnit);
    const standardUnit = standardizeDisplayUnit(friendlyDisplayServing, item.displayUnit);

    return {
        ...item,
        serving: finalServing,
        displayServing: friendlyDisplayServing.toString(),
        displayUnit: standardUnit,
        tier,
        wasLimited: scalingDeficit > 0.01,
        scalingDeficit: scalingDeficit > 0.01 ? scalingDeficit : 0,
        maxPossible: tierMaxServing.maxServing,
        genderLimited: realisticLimit !== undefined && finalServing < desiredServing,
        genderLimit: realisticLimit,
        realisticLimit: realisticLimit, // Track what the realistic limit was
        genderApplied: gender
    };
};

// Complete meal plan templates (include your existing templates here)
const CompleteMealPlanTemplates = {
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
    }
    // Add your other templates here...
};

/**
 * 🚀 CRITICAL FIX: ULTIMATE MEAL PLAN GENERATOR CLASS - Apply Gender Limits to Base Template
 */
export class MealPlanGenerator {
    constructor() {
        this.templates = CompleteMealPlanTemplates;
        this.planCache = new Map();
    }

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

        try {
            // Step 1: Get base template
            const baseTemplate = this.getMealPlanTemplate(goal, eaterType, mealFreq);
            if (!baseTemplate) {
                throw new Error(`No template found for ${goal}-${eaterType}-${mealFreq}`);
            }

            // Step 2: Deep clone to prevent mutations
            const workingPlan = JSON.parse(JSON.stringify(baseTemplate));

            // 🔧 CRITICAL FIX: Step 2.5 - Apply realistic gender limits to BASE TEMPLATE items
            const gender = userProfile?.gender || 'male';
            console.log(`🎯 [REALISTIC LIMITS] Applying ${gender} realistic portions to base template items...`);

            workingPlan.allMeals.forEach(meal => {
                meal.items = meal.items.map(item =>
                    applyGenderAwareTierScaling(item, 1, goal, gender)
                );
            });

            console.log(`✅ [REALISTIC LIMITS] Base template processed with realistic ${gender} portions`);

            // Step 3: Apply dietary filters
            const dietaryPlan = applyDietaryFilters ?
                applyDietaryFilters(workingPlan, dietaryFilters) :
                workingPlan;

            // Step 4: Add favorite snacks FIRST (only once)
            addFavoriteSnacks(dietaryPlan, goal, dietaryFilters);

            // Step 5: Distribute protein (only once)
            console.log(`👤 [GENDER] Using gender: ${gender}`);
            distributeProteinThroughoutDay(dietaryPlan, gender, goal, dietaryFilters);

            // Step 6: Calculate target calories and scale with tier system
            const targetCalories = this.calculateTargetCalories(goal, calorieData, gender);
            console.log(`📊 [CALORIES] Target calories: ${targetCalories}`);

            // 🚺 PASS GENDER INFO to scaling system
            dietaryPlan.userPreferences = { gender, goal, eaterType, mealFreq, dietaryFilters };

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

            console.log('✅ [FIXED SUCCESS] Meal plan generation complete');
            console.log(`🎯 [SUMMARY] Final plan: ${finalPlan.allMeals.length} meals, ${this.countProteinItems(finalPlan)} protein items`);

            return finalPlan;

        } catch (error) {
            console.error('❌ [FIXED ERROR] Error generating meal plan:', error);
            return this.getFallbackPlan();
        }
    }

    // 🔧 FIXED: Enhanced scaling method that ensures female limits are applied
    scaleMealPlanWithTiers(basePlan, targetCalories, goal) {
        const currentCalories = this.calculatePlanCalories(basePlan);
        let scalingFactor = targetCalories / currentCalories;

        const gender = basePlan.userPreferences?.gender || 'male';

        // 🚺 CONSERVATIVE SCALING LIMITS for females
        const scalingLimits = {
            'lose': {
                min: 0.4,
                max: gender.toLowerCase() === 'female' ? 0.85 : 1.2
            },
            'maintain': {
                min: 0.7,
                max: gender.toLowerCase() === 'female' ? 0.95 : 1.3
            },
            'gain-muscle': {
                min: 0.8,
                max: gender.toLowerCase() === 'female' ? 1.05 : 1.5
            },
            'dirty-bulk': {
                min: 0.9,
                max: gender.toLowerCase() === 'female' ? 1.15 : 2.0
            }
        };

        const limits = scalingLimits[goal] || { min: 0.5, max: gender.toLowerCase() === 'female' ? 1.0 : 2.0 };
        scalingFactor = Math.max(limits.min, Math.min(limits.max, scalingFactor));

        console.log(`📊 [GENDER SCALING] ${gender}: ${currentCalories} → ${targetCalories} cal (${scalingFactor.toFixed(2)}x, max: ${limits.max})`);

        // Clone and apply gender-aware scaling
        const scaledPlan = JSON.parse(JSON.stringify(basePlan));
        let totalCalorieDeficit = 0;

        scaledPlan.allMeals = scaledPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => {
                // 🚺 ENFORCE FEMALE LIMITS using fixed function
                const tierScaledItem = applyGenderAwareTierScaling(item, scalingFactor, goal, gender);

                // Track calorie deficits for makeup foods
                if (tierScaledItem.scalingDeficit) {
                    const itemCalories = getFoodNutrition(item.food, item.category)?.calories || 100;
                    totalCalorieDeficit += tierScaledItem.scalingDeficit * itemCalories;
                }

                return tierScaledItem;
            })
        }));

        // Add makeup calories if significant deficit
        const makeupThreshold = gender.toLowerCase() === 'female' ? 150 : 100;
        if (totalCalorieDeficit > makeupThreshold) {
            console.log(`🔄 [MAKEUP] Adding ${Math.round(totalCalorieDeficit)} makeup calories (${gender})`);
            addMakeupCalories(scaledPlan, totalCalorieDeficit, goal, []);
        }

        scaledPlan.actualCalories = this.calculatePlanCalories(scaledPlan);
        scaledPlan.scalingFactor = scalingFactor;
        scaledPlan.targetCalories = targetCalories;

        // Enhanced analysis
        scaledPlan.genderAnalysis = {
            gender: gender,
            realisticLimitsApplied: true, // Both genders get realistic limits
            totalDeficit: totalCalorieDeficit,
            makeupCaloriesAdded: totalCalorieDeficit > makeupThreshold,
            itemsLimited: scaledPlan.allMeals.flatMap(meal => meal.items).filter(item => item.genderLimited).length,
            maxOatsAllowed: gender.toLowerCase() === 'female' ? '0.75 cups' : '1.5 cups'
        };

        console.log(`✅ [SCALING COMPLETE] ${gender}: ${scaledPlan.actualCalories} cal, ${scaledPlan.genderAnalysis.itemsLimited} items limited with realistic portions`);

        return scaledPlan;
    }

    // Helper methods
    countProteinItems(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.filter(item =>
                item.isProteinFocus ||
                item.addedBy?.includes('protein') ||
                item.category === 'supplements'
            ).length;
        }, 0);
    }

    getMealPlanTemplate(goal, eaterType, mealFreq) {
        const key = `${goal}-${eaterType}-${mealFreq}`;
        return this.templates[key] || this.templates['maintain-balanced-5'];
    }

    calculateTargetCalories(goal, calorieData, gender = 'male') {
        if (!calorieData) {
            // 🔧 FIXED: More realistic female portions
            const femaleDefaults = {
                'lose': 1200,
                'maintain': 1400,
                'gain-muscle': 1600,
                'dirty-bulk': 1800
            };

            const maleDefaults = {
                'lose': 1800,
                'maintain': 2200,
                'gain-muscle': 2700,
                'dirty-bulk': 3000
            };

            const defaults = gender.toLowerCase() === 'female' ? femaleDefaults : maleDefaults;
            const targetCalories = defaults[goal] || (gender.toLowerCase() === 'female' ? 1400 : 2200);

            console.log(`📊 [GENDER CALORIES] ${gender} ${goal}: ${targetCalories} calories`);
            return targetCalories;
        }

        // Use provided calorie data with gender limits
        switch (goal) {
            case 'lose':
                const loseCalories = Math.max(1200, calorieData.bmr + 50);
                return gender.toLowerCase() === 'female' ? Math.min(loseCalories, 1300) : loseCalories;
            case 'maintain':
                const maintainCalories = calorieData.targetCalories || calorieData.tdee || (gender.toLowerCase() === 'female' ? 1400 : 2200);
                return gender.toLowerCase() === 'female' ? Math.min(maintainCalories, 1500) : maintainCalories;
            case 'gain-muscle':
                const gainCalories = (calorieData.tdee || (gender.toLowerCase() === 'female' ? 1400 : 2200)) + 500;
                return gender.toLowerCase() === 'female' ? Math.min(gainCalories, 1700) : gainCalories;
            case 'dirty-bulk':
                const bulkCalories = (calorieData.tdee || (gender.toLowerCase() === 'female' ? 1400 : 2200)) + 700;
                return gender.toLowerCase() === 'female' ? Math.min(bulkCalories, 1900) : bulkCalories;
            default:
                return calorieData.targetCalories || (gender.toLowerCase() === 'female' ? 1400 : 2200);
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
        let totalCalories = 0;

        mealPlan.allMeals.forEach(meal => {
            meal.items.forEach(item => {
                const foodData = getFoodNutrition ? getFoodNutrition(item.food, item.category) :
                    { protein: 5, carbs: 10, fat: 2, calories: 100 };
                const multiplier = item.serving;

                totalProtein += foodData.protein * multiplier;
                totalCarbs += foodData.carbs * multiplier;
                totalFat += foodData.fat * multiplier;
                totalCalories += foodData.calories * multiplier;
            });
        });

        return {
            protein: Math.round(totalProtein * 10) / 10,
            carbs: Math.round(totalCarbs * 10) / 10,
            fat: Math.round(totalFat * 10) / 10,
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
            generatedWith: 'realistic-gender-limits-v5-BOTH-GENDERS',

            userPreferences: {
                goal: options.goal,
                eaterType: options.eaterType,
                mealFreq: options.mealFreq,
                dietaryFilters: options.dietaryFilters,
                gender: options.userProfile?.gender || 'unknown'
            },

            nutrition: this.calculateNutritionBreakdown(mealPlan),
            proteinItemsAdded: this.countProteinItems(mealPlan),

            systemEnhancements: {
                proteinSystemActive: true,
                genderAwareLimitsActive: true,
                realisticPortionsForBothGenders: true, // 🆕 No more 5-cup oatmeal!
                proteinLimitsFixed: true, // Males: 12, Females: 4
                baseTemplateLimitsApplied: true, // 🔧 CRITICAL FIX
                bugsFixed: ['female-carb-limits', 'protein-distribution-limits', 'scaling-factors', 'base-template-gender-limits', 'male-unrealistic-portions']
            }
        };

        return enhanced;
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