// MealPlanGenerator.js - FIXED: Complete template system with tier rules

import { applyDietaryFilters, validateDietaryCompliance } from './DietaryFilterSystem.js';
import { getFoodNutrition, FoodDatabase } from './FoodDatabase.js';
import { AllMealPlanTemplates, TemplateDebugger } from './ComprehensiveTemplateSystem.js';

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

const roundToUserFriendly = (serving, unit) => {
    if (serving <= 0) return 0.25; // Minimum serving

    const normalizedUnit = unit?.toLowerCase() || '';

    // 🥤 CUPS: Round to nice fractions (1/4, 1/2, 3/4, 1, 1 1/2, etc.)
    if (normalizedUnit.includes('cup')) {
        if (serving <= 0.375) return 0.25;      // → 1/4 cup
        if (serving <= 0.625) return 0.5;       // → 1/2 cup  
        if (serving <= 0.875) return 0.75;      // → 3/4 cup
        if (serving <= 1.25) return 1;          // → 1 cup
        if (serving <= 1.625) return 1.5;       // → 1 1/2 cups
        if (serving <= 1.875) return 1.75;      // → 1 3/4 cups
        return Math.round(serving * 2) / 2;     // → 2, 2.5, 3, etc.
    }

    // 🥄 SCOOPS/SERVINGS: Round to whole numbers or halves
    else if (normalizedUnit === 'scoops' || normalizedUnit === 'scoop' || normalizedUnit === 'serving' || normalizedUnit === 'servings') {
        if (serving <= 0.75) return 0.5;        // → 1/2 scoop
        if (serving <= 1.25) return 1;          // → 1 scoop
        if (serving <= 1.75) return 1.5;        // → 1.5 scoops
        return Math.round(serving);              // → 2, 3, 4, etc.
    }

    // 🥩 OUNCES: Round to whole numbers or halves  
    else if (normalizedUnit === 'oz' || normalizedUnit === 'ounces') {
        if (serving <= 0.75) return 0.5;        // → 0.5 oz
        if (serving <= 1.25) return 1;          // → 1 oz
        if (serving <= 1.75) return 1.5;        // → 1.5 oz
        if (serving <= 2.25) return 2;          // → 2 oz
        return Math.round(serving * 2) / 2;     // → 2.5, 3, 3.5, etc.
    }

    // 🥄 TABLESPOONS: Round to whole numbers or halves
    else if (normalizedUnit === 'tbsp' || normalizedUnit === 'tablespoon' || normalizedUnit === 'tablespoons') {
        if (serving <= 0.75) return 0.5;        // → 1/2 tbsp
        if (serving <= 1.25) return 1;          // → 1 tbsp
        if (serving <= 1.75) return 1.5;        // → 1.5 tbsp
        if (serving <= 2.25) return 2;          // → 2 tbsp
        return Math.round(serving * 2) / 2;     // → 2.5, 3, 3.5, etc.
    }

    // 🥄 TEASPOONS: Round to whole numbers
    else if (normalizedUnit === 'tsp' || normalizedUnit === 'teaspoon' || normalizedUnit === 'teaspoons') {
        return Math.round(serving);              // → 1, 2, 3, etc.
    }

    // 🍎 PIECES/WHOLE ITEMS: Round to whole numbers or halves
    else if (normalizedUnit === 'medium' || normalizedUnit === 'large' || normalizedUnit === 'small' ||
        normalizedUnit === 'pieces' || normalizedUnit === 'piece' || normalizedUnit === 'whole') {
        if (serving <= 0.75) return 0.5;        // → 1/2 medium
        if (serving <= 1.25) return 1;          // → 1 medium
        if (serving <= 1.75) return 1.5;        // → 1.5 medium
        return Math.round(serving);              // → 2, 3, 4, etc.
    }

    // 🍞 SLICES/BARS: Round to whole numbers
    else if (normalizedUnit === 'slices' || normalizedUnit === 'slice' || normalizedUnit === 'bars' || normalizedUnit === 'bar') {
        return Math.round(serving);              // → 1, 2, 3, etc.
    }

    // 🔢 DEFAULT: Round to halves (cleaner than quarters)
    else {
        if (serving <= 0.75) return 0.5;        // → 0.5
        if (serving <= 1.25) return 1;          // → 1
        if (serving <= 1.75) return 1.5;        // → 1.5
        return Math.round(serving * 2) / 2;     // → 2, 2.5, 3, etc.
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

    // 🔒 HARD SAFEGUARD: Force clamp to gender limits as final protection
    if (gender.toLowerCase() === 'female' && RealisticPortionLimits.female[item.food] !== undefined) {
        const femaleMax = RealisticPortionLimits.female[item.food];
        if (finalServing > femaleMax) {
            console.log(`🚨 [EMERGENCY CLAMP] Female ${item.food}: ${finalServing} → ${femaleMax} (HARD LIMIT)`);
            finalServing = femaleMax;
        }
    } else if (gender.toLowerCase() === 'male' && RealisticPortionLimits.male[item.food] !== undefined) {
        const maleMax = RealisticPortionLimits.male[item.food];
        if (finalServing > maleMax) {
            console.log(`🚨 [EMERGENCY CLAMP] Male ${item.food}: ${finalServing} → ${maleMax} (HARD LIMIT)`);
            finalServing = maleMax;
        }
    }

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

// 🆕 COMPREHENSIVE MEAL PLAN TEMPLATES - Imported from separate file
const CompleteMealPlanTemplates = AllMealPlanTemplates;

/**
 * 🚀 ULTIMATE MEAL PLAN GENERATOR CLASS - Apply Gender Limits to Base Template
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

        console.log(`🎯 [MEAL GENERATOR] Starting: ${goal}-${eaterType}-${mealFreq}`);
        console.log(`👤 [USER PROFILE]`, userProfile);

        try {
            // Step 1: Get base template
            const baseTemplate = this.getMealPlanTemplate(goal, eaterType, mealFreq);
            if (!baseTemplate) {
                console.warn(`⚠️ No exact template found for ${goal}-${eaterType}-${mealFreq}, using closest match`);
                const fallbackTemplate = this.getFallbackTemplate(goal, mealFreq);
                if (!fallbackTemplate) {
                    throw new Error(`No suitable template found for ${goal}-${eaterType}-${mealFreq}`);
                }
                console.log(`✅ Using fallback template: ${Object.keys(this.templates).find(key => this.templates[key] === fallbackTemplate)}`);
            }

            const workingTemplate = baseTemplate || this.getFallbackTemplate(goal, mealFreq);

            // Step 2: Deep clone to prevent mutations
            const workingPlan = JSON.parse(JSON.stringify(workingTemplate));

            // Step 3: Apply realistic gender limits to BASE TEMPLATE items
            const gender = userProfile?.gender || 'male';
            console.log(`🎯 [REALISTIC LIMITS] Applying ${gender} realistic portions to base template items...`);

            workingPlan.allMeals.forEach((meal, mealIndex) => {
                console.log(`\n🍽️ [MEAL ${mealIndex + 1}] Processing ${meal.mealName}:`);
                meal.items = meal.items.map((item, itemIndex) => {
                    console.log(`  📋 [ITEM ${itemIndex + 1}] Original: ${item.food} = ${item.serving} ${item.displayUnit}`);
                    const limitedItem = applyGenderAwareTierScaling(item, 1, goal, gender);
                    console.log(`  ✅ [ITEM ${itemIndex + 1}] Limited: ${limitedItem.food} = ${limitedItem.serving} ${limitedItem.displayUnit}`);
                    return limitedItem;
                });
            });

            console.log(`✅ [REALISTIC LIMITS] Base template processed with realistic ${gender} portions`);

            // Step 4: Apply dietary filters
            const dietaryPlan = dietaryFilters.length > 0 ?
                applyDietaryFilters(workingPlan, dietaryFilters) :
                workingPlan;

            // Step 5: Add favorite snacks FIRST (only once)
            addFavoriteSnacks(dietaryPlan, goal, dietaryFilters);

            // Step 6: Distribute protein (only once)
            console.log(`👤 [GENDER] Using gender: ${gender}`);
            distributeProteinThroughoutDay(dietaryPlan, gender, goal, dietaryFilters);

            // Step 7: Calculate target calories and scale with tier system
            const targetCalories = this.calculateTargetCalories(goal, calorieData, gender);
            console.log(`📊 [CALORIES] Target calories: ${targetCalories}`);

            // Pass gender info to scaling system
            dietaryPlan.userPreferences = { gender, goal, eaterType, mealFreq, dietaryFilters };

            const scaledPlan = this.scaleMealPlanWithTiers(dietaryPlan, targetCalories, goal);

            // Step 8: Enhance plan with metadata
            const finalPlan = this.enhanceMealPlan(scaledPlan, {
                goal,
                eaterType,
                mealFreq,
                dietaryFilters,
                userProfile,
                targetCalories
            });

            console.log('✅ [GENERATOR SUCCESS] Meal plan generation complete');
            console.log(`🎯 [SUMMARY] Final plan: ${finalPlan.allMeals.length} meals, ${this.countProteinItems(finalPlan)} protein items`);

            // Final verification: Check that no items exceed gender limits
            this.verifyGenderLimits(finalPlan, gender);

            return finalPlan;

        } catch (error) {
            console.error('❌ [GENERATOR ERROR] Error generating meal plan:', error);
            return this.getFallbackPlan();
        }
    }

    // 🆕 NEW: Get fallback template when exact match not found
    getFallbackTemplate(goal, mealFreq) {
        // Try to find a template with matching goal and closest meal frequency
        const goalTemplates = Object.entries(this.templates)
            .filter(([key]) => key.startsWith(goal))
            .sort(([keyA], [keyB]) => {
                const freqA = parseInt(keyA.split('-')[2]);
                const freqB = parseInt(keyB.split('-')[2]);
                return Math.abs(freqA - mealFreq) - Math.abs(freqB - mealFreq);
            });

        if (goalTemplates.length > 0) {
            console.log(`📋 Found fallback template: ${goalTemplates[0][0]}`);
            return goalTemplates[0][1];
        }

        // If no goal match, use default maintain template
        console.log(`📋 Using default maintain template as last resort`);
        return this.templates['maintain-balanced-5'];
    }

    // Enhanced scaling method that ensures female limits are applied
    scaleMealPlanWithTiers(basePlan, targetCalories, goal) {
        const currentCalories = this.calculatePlanCalories(basePlan);
        let scalingFactor = targetCalories / currentCalories;

        const gender = basePlan.userPreferences?.gender || 'male';

        // Conservative scaling limits for females
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

        // Additional safeguard: Never scale female portions above 1.0x
        if (gender.toLowerCase() === 'female' && scalingFactor > 1.0) {
            console.log(`🚺 [FEMALE PROTECTION] Limiting scaling factor from ${scalingFactor.toFixed(2)} to 1.0 for female`);
            scalingFactor = 1.0;
        }

        console.log(`📊 [GENDER SCALING] ${gender}: ${currentCalories} → ${targetCalories} cal (${scalingFactor.toFixed(2)}x, max: ${limits.max})`);

        // Clone and apply gender-aware scaling
        const scaledPlan = JSON.parse(JSON.stringify(basePlan));
        let totalCalorieDeficit = 0;

        scaledPlan.allMeals = scaledPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => {
                // Enforce female limits using fixed function
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
            realisticLimitsApplied: true,
            totalDeficit: totalCalorieDeficit,
            makeupCaloriesAdded: totalCalorieDeficit > makeupThreshold,
            itemsLimited: scaledPlan.allMeals.flatMap(meal => meal.items).filter(item => item.genderLimited).length,
            maxOatsAllowed: gender.toLowerCase() === 'female' ? '0.75 cups' : '1.5 cups'
        };

        console.log(`✅ [SCALING COMPLETE] ${gender}: ${scaledPlan.actualCalories} cal, ${scaledPlan.genderAnalysis.itemsLimited} items limited with realistic portions`);

        return scaledPlan;
    }

    // Verification: Ensure no items exceed gender limits
    verifyGenderLimits(mealPlan, gender) {
        console.log(`\n🔍 [FINAL VERIFICATION] Checking ${gender} limits compliance...`);

        const genderKey = gender.toLowerCase();
        const limits = RealisticPortionLimits[genderKey] || RealisticPortionLimits.male;
        let violationsFound = 0;

        mealPlan.allMeals.forEach((meal, mealIndex) => {
            meal.items.forEach((item, itemIndex) => {
                const limit = limits[item.food];
                if (limit !== undefined && item.serving > limit) {
                    console.log(`🚨 [VIOLATION] ${meal.mealName} Item ${itemIndex + 1}: ${item.food} = ${item.serving} (EXCEEDS ${gender} limit of ${limit})`);
                    violationsFound++;

                    // Auto-fix the violation
                    item.serving = limit;
                    item.displayServing = roundToUserFriendly(limit, item.displayUnit).toString();
                    item.displayUnit = standardizeDisplayUnit(parseFloat(item.displayServing), item.displayUnit);
                    console.log(`🔧 [AUTO-FIXED] Corrected to: ${item.serving} ${item.displayUnit}`);
                }
            });
        });

        if (violationsFound === 0) {
            console.log(`✅ [VERIFICATION PASSED] All ${mealPlan.allMeals.flatMap(m => m.items).length} items comply with ${gender} limits`);
        } else {
            console.log(`⚠️ [VERIFICATION] Found and fixed ${violationsFound} gender limit violations`);
        }
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
        return this.templates[key];
    }

    calculateTargetCalories(goal, calorieData, gender = 'male') {
        if (!calorieData) {
            // Realistic female portions
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
            generatedWith: 'comprehensive-template-system-v1',

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
                realisticPortionsForBothGenders: true,
                proteinLimitsFixed: true,
                baseTemplateLimitsApplied: true,
                comprehensiveTemplateSystem: true, // 🆕 NEW
                bugsFixed: [
                    'female-carb-limits',
                    'protein-distribution-limits',
                    'scaling-factors',
                    'base-template-gender-limits',
                    'male-unrealistic-portions',
                    'missing-templates-for-all-combinations' // 🆕 NEW
                ]
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