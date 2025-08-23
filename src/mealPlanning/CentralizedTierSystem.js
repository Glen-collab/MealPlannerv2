// CentralizedTierSystem.js - FIXED: User-friendly rounding + better data transfer

/**
 * 🎯 CENTRALIZED TIER SYSTEM - FIXED VERSION
 * This is THE single source of truth for all food limits and tiers
 * Used by: MealPlanGenerator, WeekPlanModal, AddFoodsModal, MealTracker
 */

export const FoodTierSystem = {
    // [All the tier data remains the same - keeping original structure]

    tier1_lean_proteins: {
        priority: 1,
        description: 'Lean protein sources',
        foods: {
            'Chicken Breast': {
                limits: { female: 1.5, male: 2.5 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 248, male: 413 }
            },
            'Turkey Breast': {
                limits: { female: 1.5, male: 2.5 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 203, male: 338 }
            },
            'Cod': {
                limits: { female: 1.5, male: 2.5 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 134, male: 223 }
            },
            'Tuna (canned in water)': {
                limits: { female: 1.5, male: 2.0 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 162, male: 216 }
            }
        }
    },

    tier2_fat_proteins: {
        priority: 2,
        description: 'Higher fat protein sources',
        foods: {
            'Salmon': {
                limits: { female: 1.2, male: 2.0 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 250, male: 416 }
            },
            'Lean Beef (90/10)': {
                limits: { female: 1.0, male: 1.8 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 176, male: 317 }
            },
            'Greek Yogurt (non-fat)': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 130, male: 195 }
            },
            'Cottage Cheese (low-fat)': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 90, male: 135 }
            }
        }
    },

    tier3_starches: {
        priority: 3,
        description: 'Starchy carbohydrates - STRICTLY LIMITED',
        foods: {
            'Oats (dry)': {
                limits: { female: 0.5, male: 0.75 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 0.5,
                maxCalories: { female: 150, male: 225 }
            },
            'Brown Rice (cooked)': {
                limits: { female: 0.6, male: 1.0 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 0.5,
                maxCalories: { female: 134, male: 224 }
            },
            'White Rice (cooked)': {
                limits: { female: 0.6, male: 1.0 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 0.5,
                maxCalories: { female: 156, male: 260 }
            },
            'Quinoa (cooked)': {
                limits: { female: 0.6, male: 1.0 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 0.5,
                maxCalories: { female: 144, male: 240 }
            },
            'Sweet Potato': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 86, male: 129 }
            }
        }
    },

    tier4_fruits: {
        priority: 4,
        description: 'Fruits - moderate limits',
        foods: {
            'Apple': {
                limits: { female: 1.0, male: 1.2 },
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 52, male: 62 }
            },
            'Banana': {
                limits: { female: 1.0, male: 1.2 },
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 89, male: 107 }
            },
            'Blueberries': {
                limits: { female: 1.0, male: 1.2 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 57, male: 68 }
            },
            'Strawberries': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 32, male: 48 }
            },
            'Berries': {
                limits: { female: 1.0, male: 1.2 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 52, male: 62 }
            }
        }
    },

    tier5_vegetables: {
        priority: 5,
        description: 'Vegetables - flexible limits',
        foods: {
            'Broccoli': {
                limits: { female: 2.0, male: 2.5 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 50, male: 63 }
            },
            'Spinach': {
                limits: { female: 2.5, male: 3.0 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 58, male: 69 }
            },
            'Bell Peppers': {
                limits: { female: 1.5, male: 2.0 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 47, male: 62 }
            },
            'Asparagus': {
                limits: { female: 2.0, male: 2.5 },
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 1,
                maxCalories: { female: 40, male: 50 }
            }
        }
    },

    tier6_fats: {
        priority: 6,
        description: 'Healthy fats - calorie dense',
        foods: {
            'Avocado': {
                limits: { female: 0.5, male: 1.0 },
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 80, male: 160 }
            },
            'Almonds': {
                limits: { female: 0.5, male: 1.0 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 1,
                maxCalories: { female: 82, male: 164 }
            },
            'Peanut Butter': {
                limits: { female: 1.0, male: 2.0 },
                unit: 'servings',
                displayUnit: 'tbsp',
                displayMultiplier: 1,
                maxCalories: { female: 188, male: 376 }
            },
            'Olive Oil': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'tbsp',
                displayMultiplier: 1,
                maxCalories: { female: 119, male: 179 }
            },
            'Walnuts': {
                limits: { female: 0.5, male: 1.0 },
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 1,
                maxCalories: { female: 93, male: 185 }
            }
        }
    },

    tier7_supplements: {
        priority: 7,
        description: 'Protein supplements - gender specific limits',
        foods: {
            'Whey Protein (generic)': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'scoops',
                displayMultiplier: 1,
                maxCalories: { female: 120, male: 180 },
                dailyLimits: { female: 2, male: 6 }
            },
            'Plant Protein (pea/rice)': {
                limits: { female: 1.0, male: 1.5 },
                unit: 'servings',
                displayUnit: 'scoops',
                displayMultiplier: 1,
                maxCalories: { female: 120, male: 180 },
                dailyLimits: { female: 2, male: 6 }
            },
            'Quest Bar': {
                limits: { female: 1.0, male: 1.0 },
                unit: 'servings',
                displayUnit: 'bars',
                displayMultiplier: 1,
                maxCalories: { female: 190, male: 190 }
            }
        }
    }
};

// 🔧 FIXED: User-friendly rounding function integrated into tier system
const roundToUserFriendly = (serving, unit) => {
    if (serving <= 0) return 0.25; // Minimum serving

    const normalizedUnit = unit?.toLowerCase() || '';

    // 🥤 CUPS: Round to nice fractions
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
    else if (normalizedUnit === 'scoops' || normalizedUnit === 'scoop' ||
        normalizedUnit === 'serving' || normalizedUnit === 'servings') {
        if (serving <= 0.75) return 0.5;        // → 1/2 scoop/serving
        if (serving <= 1.25) return 1;          // → 1 scoop/serving
        if (serving <= 1.75) return 1.5;        // → 1.5 scoops/servings
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
    else if (normalizedUnit === 'tbsp' || normalizedUnit === 'tablespoon' ||
        normalizedUnit === 'tablespoons') {
        if (serving <= 0.75) return 0.5;        // → 1/2 tbsp
        if (serving <= 1.25) return 1;          // → 1 tbsp
        if (serving <= 1.75) return 1.5;        // → 1.5 tbsp
        if (serving <= 2.25) return 2;          // → 2 tbsp
        return Math.round(serving * 2) / 2;     // → 2.5, 3, 3.5, etc.
    }

    // 🍎 PIECES/WHOLE ITEMS: Round to whole numbers or halves
    else if (normalizedUnit === 'medium' || normalizedUnit === 'large' ||
        normalizedUnit === 'small' || normalizedUnit === 'pieces' ||
        normalizedUnit === 'piece' || normalizedUnit === 'whole') {
        if (serving <= 0.75) return 0.5;        // → 1/2 medium
        if (serving <= 1.25) return 1;          // → 1 medium
        if (serving <= 1.75) return 1.5;        // → 1.5 medium
        return Math.round(serving);              // → 2, 3, 4, etc.
    }

    // 🔢 DEFAULT: Round to halves (cleaner than quarters)
    else {
        if (serving <= 0.75) return 0.5;        // → 0.5
        if (serving <= 1.25) return 1;          // → 1
        if (serving <= 1.75) return 1.5;        // → 1.5
        return Math.round(serving * 2) / 2;     // → 2, 2.5, 3, etc.
    }
};

// 🔧 FIXED: Standardize display unit
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
    } else if (normalizedUnit === 'serving' && serving !== 1) {
        return 'servings';
    } else if (normalizedUnit === 'servings' && serving === 1) {
        return 'serving';
    }

    return unit;
};

/**
 * 🔧 TIER SYSTEM UTILITIES - FIXED VERSION
 */
export class TierSystemManager {

    static getFoodTier(foodName) {
        for (const [tierKey, tierData] of Object.entries(FoodTierSystem)) {
            if (tierData.foods && tierData.foods[foodName]) {
                return tierData.priority;
            }
        }
        return 99; // Unknown food
    }

    static getFoodLimits(foodName, gender = 'male') {
        const genderKey = gender.toLowerCase();

        for (const tierData of Object.values(FoodTierSystem)) {
            if (tierData.foods && tierData.foods[foodName]) {
                const foodData = tierData.foods[foodName];
                return {
                    maxServing: foodData.limits[genderKey] || foodData.limits.male,
                    displayUnit: foodData.displayUnit,
                    displayMultiplier: foodData.displayMultiplier,
                    maxCalories: foodData.maxCalories[genderKey] || foodData.maxCalories.male,
                    dailyLimit: foodData.dailyLimits?.[genderKey] || null
                };
            }
        }

        return {
            maxServing: gender === 'female' ? 1.0 : 1.5,
            displayUnit: 'servings',
            displayMultiplier: 1,
            maxCalories: gender === 'female' ? 200 : 300,
            dailyLimit: null
        };
    }

    /**
     * 🚨 ENFORCE REALISTIC LIMITS - FIXED WITH USER-FRIENDLY ROUNDING
     */
    static enforceRealisticLimits(item, gender = 'male') {
        const limits = this.getFoodLimits(item.food, gender);
        const tier = this.getFoodTier(item.food);

        let finalServing = item.serving;
        let wasLimited = false;

        // Apply realistic limits
        if (item.serving > limits.maxServing) {
            finalServing = limits.maxServing;
            wasLimited = true;
            console.log(`🚨 [TIER SYSTEM] ${gender} ${item.food}: ${item.serving} → ${finalServing} (T${tier} limit enforced)`);
        }

        // 🔧 FIXED: Apply user-friendly rounding to display values
        const rawDisplayValue = finalServing * limits.displayMultiplier;
        const friendlyDisplayValue = roundToUserFriendly(rawDisplayValue, limits.displayUnit);
        const standardizedUnit = standardizeDisplayUnit(friendlyDisplayValue, limits.displayUnit);

        // Convert back to internal serving if needed
        const adjustedServing = friendlyDisplayValue / limits.displayMultiplier;

        return {
            ...item,
            serving: adjustedServing, // Adjusted for user-friendly display
            displayServing: friendlyDisplayValue < 0.1 ? '0.1' :
                (friendlyDisplayValue % 1 === 0 ? friendlyDisplayValue.toString() : friendlyDisplayValue.toFixed(friendlyDisplayValue < 1 ? 2 : 1)),
            displayUnit: standardizedUnit,
            tier,
            wasLimited,
            originalServing: item.serving,
            genderApplied: gender,
            maxAllowed: limits.maxServing,
            tierLimits: limits,

            // 🔧 FIXED: Enhanced metadata for better data transfer
            enhancedData: {
                tier: tier,
                wasLimited: wasLimited,
                originalServing: item.serving,
                maxAllowed: limits.maxServing,
                genderApplied: gender,
                friendlyRoundingApplied: true,
                rawDisplayValue: rawDisplayValue,
                friendlyDisplayValue: friendlyDisplayValue
            }
        };
    }

    /**
     * Apply limits to entire meal plan - FIXED VERSION
     */
    static applyLimitsToMealPlan(mealPlan, gender = 'male') {
        console.log(`🔒 [TIER SYSTEM] Applying ${gender} realistic limits with user-friendly rounding...`);

        let totalLimited = 0;

        mealPlan.allMeals.forEach(meal => {
            meal.items = meal.items.map(item => {
                const limitedItem = this.enforceRealisticLimits(item, gender);
                if (limitedItem.wasLimited) totalLimited++;
                return limitedItem;
            });
        });

        console.log(`✅ [TIER SYSTEM] Applied limits to ${totalLimited} items for ${gender} with user-friendly rounding`);

        // 🔧 FIXED: Enhanced metadata for better data transfer
        mealPlan.tierSystemApplied = {
            gender,
            limitsApplied: totalLimited,
            timestamp: new Date().toISOString(),
            userFriendlyRoundingApplied: true,
            version: 'v2.1-fixed-rounding'
        };

        return mealPlan;
    }

    /**
     * Validate single food item against limits
     */
    static validateFoodItem(foodName, serving, gender = 'male') {
        const limits = this.getFoodLimits(foodName, gender);
        const tier = this.getFoodTier(foodName);

        return {
            isValid: serving <= limits.maxServing,
            tier,
            maxAllowed: limits.maxServing,
            displayUnit: limits.displayUnit,
            exceededBy: serving > limits.maxServing ? serving - limits.maxServing : 0,
            warning: serving > limits.maxServing ?
                `${gender === 'female' ? '🚺' : '🚹'} Exceeds realistic limit of ${limits.maxServing} ${limits.displayUnit}` :
                null
        };
    }

    static getFoodsInTier(tierNumber) {
        for (const tierData of Object.values(FoodTierSystem)) {
            if (tierData.priority === tierNumber && tierData.foods) {
                return Object.keys(tierData.foods);
            }
        }
        return [];
    }

    static getRealisticLimitsSummary(gender = 'male') {
        const genderKey = gender.toLowerCase();
        const summary = [];

        const keyFoods = ['Oats (dry)', 'Brown Rice (cooked)', 'Avocado', 'Whey Protein (generic)'];

        keyFoods.forEach(food => {
            const limits = this.getFoodLimits(food, gender);
            const displayValue = limits.maxServing * limits.displayMultiplier;
            const friendlyValue = roundToUserFriendly(displayValue, limits.displayUnit);

            summary.push({
                food,
                limit: `${friendlyValue} ${limits.displayUnit}`,
                tier: this.getFoodTier(food)
            });
        });

        return summary;
    }
}

// Export functions (keeping same interface)
export const enforceRealisticLimits = (item, gender) => TierSystemManager.enforceRealisticLimits(item, gender);
export const getFoodTier = (foodName) => TierSystemManager.getFoodTier(foodName);
export const getFoodLimits = (foodName, gender) => TierSystemManager.getFoodLimits(foodName, gender);
export const validateFoodItem = (foodName, serving, gender) => TierSystemManager.validateFoodItem(foodName, serving, gender);
export const applyLimitsToMealPlan = (mealPlan, gender) => TierSystemManager.applyLimitsToMealPlan(mealPlan, gender);

export default TierSystemManager;