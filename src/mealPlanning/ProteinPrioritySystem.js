// ProteinPriorityTierSystem.js - Protein-focused tier system with user favorites

import { EnhancedFoodDatabase, getProteinRecommendations, getFavoritesByGoal, calculateProteinDistribution } from './EnhancedFoodDatabase.js';

export const ProteinPriorityTierSystem = {
    // Tier 0: User Favorites & Protein Combinations (HIGHEST PRIORITY)
    tier0_protein_favorites: {
        maxLimits: {
            'Greek Yogurt + Whey Protein': { maxServing: 3, maxDisplay: '3', unit: 'servings' },
            'Greek Yogurt + Plant Protein': { maxServing: 3, maxDisplay: '3', unit: 'servings' },
            'Oats + Whey Protein': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Oats + Plant Protein': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Fairlife Protein Shake + Whey': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Coconut Yogurt + Plant Protein': { maxServing: 3, maxDisplay: '3', unit: 'servings' },
            'Hummus + Pretzels': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Hummus + Gluten-Free Crackers': { maxServing: 2, maxDisplay: '2', unit: 'servings' },
            'Berries + Protein Powder': { maxServing: 2, maxDisplay: '2', unit: 'servings' }
        },
        priority: 'HIGHEST',
        description: 'User favorites and convenient protein combinations'
    },

    // Tier 1: Pure Protein Supplements (Gender-based limits)
    tier1_protein_supplements: {
        maxLimits: {
            'Whey Protein (generic)': {
                maxServing: { female: 2, male: 8 },
                maxDisplay: { female: '2', male: '8' },
                unit: 'scoops'
            },
            'Plant Protein (pea/rice)': {
                maxServing: { female: 2, male: 8 },
                maxDisplay: { female: '2', male: '8' },
                unit: 'scoops'
            },
            'Collagen Protein': {
                maxServing: { female: 2, male: 4 },
                maxDisplay: { female: '2', male: '4' },
                unit: 'scoops'
            },
            'Egg White Protein': {
                maxServing: { female: 2, male: 6 },
                maxDisplay: { female: '2', male: '6' },
                unit: 'scoops'
            },
            'Hemp Protein': {
                maxServing: { female: 2, male: 6 },
                maxDisplay: { female: '2', male: '6' },
                unit: 'scoops'
            },
            'Casein Protein': {
                maxServing: { female: 1, male: 4 },
                maxDisplay: { female: '1', male: '4' },
                unit: 'scoops'
            }
        },
        priority: 'HIGHEST',
        description: 'Protein supplements with gender-specific limits'
    },

    // Tier 2: Protein Bars & Ready Drinks
    tier2_protein_convenience: {
        maxLimits: {
            'Quest Bar': { maxServing: { female: 1, male: 2 }, maxDisplay: { female: '1', male: '2' }, unit: 'bars' },
            'Pure Protein Bar': { maxServing: { female: 1, male: 2 }, maxDisplay: { female: '1', male: '2' }, unit: 'bars' },
            'Plant-Based Protein Bar': { maxServing: { female: 1, male: 2 }, maxDisplay: { female: '1', male: '2' }, unit: 'bars' },
            'Keto Protein Bar': { maxServing: { female: 1, male: 2 }, maxDisplay: { female: '1', male: '2' }, unit: 'bars' },
            'Fairlife Protein Shake': { maxServing: 2, maxDisplay: '2', unit: 'bottles' },
            'Premier Protein Shake': { maxServing: 2, maxDisplay: '2', unit: 'bottles' },
            'Plant-Based Protein Drink': { maxServing: 2, maxDisplay: '2', unit: 'bottles' },
            'Keto Protein Shake': { maxServing: 2, maxDisplay: '2', unit: 'bottles' }
        },
        priority: 'HIGH',
        description: 'Convenient protein bars and ready-to-drink options'
    },

    // Tier 3: Lean Whole Food Proteins
    tier3_lean_proteins: {
        maxLimits: {
            'Chicken Breast': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Turkey Breast': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Cod': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Tuna (canned in water)': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Egg Whites': { maxServing: 15, maxDisplay: '15', unit: 'whites' },
            'Tofu (firm)': { maxServing: 2.5, maxDisplay: '10', unit: 'oz' },
            'Tempeh': { maxServing: 2, maxDisplay: '8', unit: 'oz' }
        },
        priority: 'HIGH',
        description: 'Lean whole food protein sources'
    },

    // Tier 4: Higher Fat Proteins
    tier4_fat_proteins: {
        maxLimits: {
            'Salmon': { maxServing: 3.5, maxDisplay: '12', unit: 'oz' },
            'Lean Beef (90/10)': { maxServing: 6, maxDisplay: '20', unit: 'oz' },
            'Eggs (whole)': { maxServing: 18, maxDisplay: '18', unit: 'eggs' },
            'Greek Yogurt (non-fat)': { maxServing: 3, maxDisplay: '3', unit: 'cups' },
            'Cottage Cheese (low-fat)': { maxServing: 2.5, maxDisplay: '2.5', unit: 'cups' }
        },
        priority: 'MEDIUM-HIGH',
        description: 'Higher fat protein sources'
    },

    // Continue with rest of tiers...
    // (keeping the same tier structure as before for carbs, fats, etc.)
};

/**
 * Enhanced protein distribution across meals
 */
export const distributeProteinThroughoutDay = (mealPlan, gender, goal, dietaryFilters = []) => {
    const proteinRecommendations = getProteinRecommendations(dietaryFilters, gender, goal);
    const proteinDistribution = calculateProteinDistribution(gender, goal, mealPlan.allMeals.length);

    const primaryProtein = proteinRecommendations[0]; // Best protein for user's needs
    if (!primaryProtein) return mealPlan;

    console.log(`🥤 Distributing ${proteinDistribution.totalScoops} scoops of ${primaryProtein.name} for ${gender}`);

    // Strategy based on gender and goals
    if (gender.toLowerCase() === 'male' && proteinDistribution.totalScoops >= 4) {
        // Males: 2 scoops per meal, up to 4 meals
        return distributeMaleProtein(mealPlan, primaryProtein, proteinDistribution, goal);
    } else {
        // Females: 1 scoop per meal, spread across day
        return distributeFemaleProtein(mealPlan, primaryProtein, proteinDistribution, goal);
    }
};

/**
 * Distribute protein for males (up to 8 scoops, 2 scoops per meal)
 */
const distributeMaleProtein = (mealPlan, protein, distribution, goal) => {
    const mealsToTarget = Math.min(4, mealPlan.allMeals.length); // Max 4 meals with protein
    const scoopsPerMeal = Math.min(2, distribution.totalScoops / mealsToTarget);

    // Prioritize meals: breakfast, lunch, dinner, then snacks
    const mealPriority = getMealPriority(mealPlan);

    let remainingScoops = distribution.totalScoops;

    for (let i = 0; i < mealsToTarget && remainingScoops > 0; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];
        const scoopsToAdd = Math.min(scoopsPerMeal, remainingScoops);

        // Try to add protein to existing combinations first
        const proteinItem = createProteinItem(protein, scoopsToAdd, meal, goal);
        if (proteinItem) {
            meal.items.push(proteinItem);
            remainingScoops -= scoopsToAdd;

            console.log(`💪 Added ${scoopsToAdd} scoops ${protein.name} to ${meal.mealName}`);
        }
    }

    return mealPlan;
};

/**
 * Distribute protein for females (up to 2 scoops, 1 scoop per meal)
 */
const distributeFemaleProtein = (mealPlan, protein, distribution, goal) => {
    const scoopsPerMeal = 1;
    const mealsToTarget = Math.min(distribution.totalScoops, mealPlan.allMeals.length);

    // Prioritize breakfast and post-workout meals
    const mealPriority = getMealPriority(mealPlan);

    for (let i = 0; i < mealsToTarget; i++) {
        const mealIndex = mealPriority[i];
        const meal = mealPlan.allMeals[mealIndex];

        const proteinItem = createProteinItem(protein, scoopsPerMeal, meal, goal);
        if (proteinItem) {
            meal.items.push(proteinItem);
            console.log(`💪 Added ${scoopsPerMeal} scoop ${protein.name} to ${meal.mealName}`);
        }
    }

    return mealPlan;
};

/**
 * Create smart protein item based on meal context
 */
const createProteinItem = (protein, scoops, meal, goal) => {
    const mealName = meal.mealName.toLowerCase();

    // Check if meal already has compatible items for combinations
    const hasGreekYogurt = meal.items.some(item => item.food.includes('Greek Yogurt'));
    const hasOats = meal.items.some(item => item.food.includes('Oats'));
    const hasBerries = meal.items.some(item => item.category === 'fruits');

    let proteinFood = protein.name;
    let combination = null;

    // Create smart combinations based on meal context
    if (hasGreekYogurt && !meal.items.some(item => item.food.includes('Protein'))) {
        combination = 'Greek Yogurt + Whey Protein';
        proteinFood = combination;
    } else if (hasOats && mealName.includes('breakfast') && goal !== 'lose') {
        combination = 'Oats + Whey Protein';
        proteinFood = combination;
    } else if (hasBerries && (goal === 'lose' || goal === 'maintain')) {
        combination = 'Berries + Protein Powder';
        proteinFood = combination;
    }

    // If combination was created, adjust nutritional values
    const nutritionData = combination ?
        EnhancedFoodDatabase.protein_combinations[combination] || protein :
        protein;

    return {
        id: generateId(),
        category: 'supplements',
        food: proteinFood,
        serving: scoops,
        displayServing: scoops.toString(),
        displayUnit: combination ? 'servings' : 'scoops',
        addedBy: 'protein-priority-system',
        isProteinFocus: true,
        combination: combination
    };
};

/**
 * Prioritize meals for protein distribution
 */
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

/**
 * Add user favorite snacks for maintain/lose goals
 */
export const addFavoriteSnacks = (mealPlan, goal, dietaryFilters = []) => {
    if (!['maintain', 'lose'].includes(goal)) return mealPlan;

    const favorites = getFavoritesByGoal(goal, dietaryFilters);
    const snackFavorites = favorites.filter(fav => fav.goalSuitability?.includes(goal));

    if (snackFavorites.length === 0) return mealPlan;

    // Find snack meals or create one
    const snackMeals = mealPlan.allMeals.filter(meal =>
        meal.mealName.toLowerCase().includes('snack')
    );

    if (snackMeals.length > 0) {
        // Add hummus + pretzels to a snack meal
        const hummusSnack = snackFavorites.find(fav => fav.name.includes('Hummus'));
        if (hummusSnack) {
            const snackItem = {
                id: generateId(),
                category: 'favorite_snacks',
                food: hummusSnack.name,
                serving: 1,
                displayServing: '1',
                displayUnit: 'serving',
                addedBy: 'favorite-snacks-system',
                isFavorite: true
            };

            snackMeals[0].items.push(snackItem);
            console.log(`🥨 Added favorite snack: ${hummusSnack.name}`);
        }
    }

    return mealPlan;
};

/**
 * Enhanced tier-based scaling with protein priority
 */
export const applyProteinPriorityScaling = (item, targetScaling, goal, gender = 'male') => {
    const foodName = item.food;

    // Get tier and limits
    const tier = getProteinPriorityTier(foodName);
    const maxServing = getProteinPriorityMaxServing(foodName, gender);

    // Calculate desired serving after scaling
    const desiredServing = item.serving * targetScaling;

    // Apply tier-based limits with protein priority
    let finalServing = Math.min(desiredServing, maxServing.maxServing);

    // Special protein priority rules
    if (tier <= 2) { // Protein supplements and combinations
        // More generous scaling for protein
        if (goal === 'gain-muscle' || goal === 'dirty-bulk') {
            finalServing = Math.min(desiredServing, maxServing.maxServing * 1.2);
        }
    } else if (tier === 0) { // User favorites
        // Always prioritize user favorites
        finalServing = Math.min(desiredServing, maxServing.maxServing * 1.5);
    }

    const scalingDeficit = desiredServing - finalServing;
    const finalDisplayServing = parseFloat(item.displayServing || '1') * (finalServing / item.serving);

    return {
        ...item,
        serving: finalServing,
        displayServing: finalDisplayServing < 0.1 ? '0.1' : finalDisplayServing.toFixed(1),
        tier,
        wasLimited: scalingDeficit > 0.1,
        scalingDeficit: scalingDeficit > 0.1 ? scalingDeficit : 0,
        maxPossible: maxServing.maxServing,
        isProteinPriority: tier <= 2
    };
};

// Helper functions
const getProteinPriorityTier = (foodName) => {
    if (Object.keys(ProteinPriorityTierSystem.tier0_protein_favorites.maxLimits).includes(foodName)) return 0;
    if (Object.keys(ProteinPriorityTierSystem.tier1_protein_supplements.maxLimits).includes(foodName)) return 1;
    if (Object.keys(ProteinPriorityTierSystem.tier2_protein_convenience.maxLimits).includes(foodName)) return 2;
    if (Object.keys(ProteinPriorityTierSystem.tier3_lean_proteins.maxLimits).includes(foodName)) return 3;
    return 5; // Default
};

const getProteinPriorityMaxServing = (foodName, gender) => {
    // Check each tier for the food
    for (const tierKey of Object.keys(ProteinPriorityTierSystem)) {
        const tier = ProteinPriorityTierSystem[tierKey];
        if (tier.maxLimits && tier.maxLimits[foodName]) {
            const limit = tier.maxLimits[foodName];

            // Handle gender-specific limits
            if (typeof limit.maxServing === 'object') {
                return {
                    maxServing: limit.maxServing[gender.toLowerCase()] || limit.maxServing.male,
                    maxDisplay: limit.maxDisplay[gender.toLowerCase()] || limit.maxDisplay.male,
                    unit: limit.unit
                };
            }

            return limit;
        }
    }

    return { maxServing: 2, maxDisplay: '2', unit: 'servings' }; // Default
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default {
    distributeProteinThroughoutDay,
    addFavoriteSnacks,
    applyProteinPriorityScaling,
    ProteinPriorityTierSystem
};