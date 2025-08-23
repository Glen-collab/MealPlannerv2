// CentralizedTierSystem.js - THE definitive tier system with realistic limits

/**
 * 🎯 CENTRALIZED TIER SYSTEM
 * This is THE single source of truth for all food limits and tiers
 * Used by: MealPlanGenerator, WeekPlanModal, AddFoodsModal, MealTracker
 */

export const FoodTierSystem = {

    // ===== TIER 1: LEAN PROTEINS =====
    tier1_lean_proteins: {
        priority: 1,
        description: 'Lean protein sources',
        foods: {
            'Chicken Breast': {
                limits: { female: 1.5, male: 2.5 },    // 5.25oz female, 8.75oz male
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,  // 1 serving = 3.5oz
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

    // ===== TIER 2: FAT PROTEINS =====
    tier2_fat_proteins: {
        priority: 2,
        description: 'Higher fat protein sources',
        foods: {
            'Salmon': {
                limits: { female: 1.2, male: 2.0 },    // 4.2oz female, 7oz male
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 250, male: 416 }
            },
            'Lean Beef (90/10)': {
                limits: { female: 1.0, male: 1.8 },    // 3.5oz female, 6.3oz male
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 3.5,
                maxCalories: { female: 176, male: 317 }
            },
            'Greek Yogurt (non-fat)': {
                limits: { female: 1.0, male: 1.5 },    // 1 cup female, 1.5 cups male
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

    // ===== TIER 3: STARCHY CARBS (MOST RESTRICTED) =====
    tier3_starches: {
        priority: 3,
        description: 'Starchy carbohydrates - STRICTLY LIMITED',
        foods: {
            'Oats (dry)': {
                limits: { female: 0.5, male: 0.75 },   // 🚨 MAX 0.5 cups female, 0.75 cups male
                unit: 'servings',
                displayUnit: 'cups',
                displayMultiplier: 0.5,  // 1 serving = 0.5 cups
                maxCalories: { female: 150, male: 225 }
            },
            'Brown Rice (cooked)': {
                limits: { female: 0.6, male: 1.0 },    // 🚨 MAX 0.6 cups female, 1.0 cups male  
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
                limits: { female: 1.0, male: 1.5 },    // 1 medium female, 1.5 medium male
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 86, male: 129 }
            }
        }
    },

    // ===== TIER 4: FRUITS =====
    tier4_fruits: {
        priority: 4,
        description: 'Fruits - moderate limits',
        foods: {
            'Apple': {
                limits: { female: 1.0, male: 1.2 },    // 1 medium female, 1.2 medium male
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

    // ===== TIER 5: VEGETABLES =====
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

    // ===== TIER 6: HEALTHY FATS =====
    tier6_fats: {
        priority: 6,
        description: 'Healthy fats - calorie dense',
        foods: {
            'Avocado': {
                limits: { female: 0.5, male: 1.0 },    // 🚨 0.5 medium female, 1.0 medium male
                unit: 'servings',
                displayUnit: 'medium',
                displayMultiplier: 1,
                maxCalories: { female: 80, male: 160 }
            },
            'Almonds': {
                limits: { female: 0.5, male: 1.0 },    // 0.5oz female, 1oz male
                unit: 'servings',
                displayUnit: 'oz',
                displayMultiplier: 1,
                maxCalories: { female: 82, male: 164 }
            },
            'Peanut Butter': {
                limits: { female: 1.0, male: 2.0 },    // 1 tbsp female, 2 tbsp male
                unit: 'servings',
                displayUnit: 'tbsp',
                displayMultiplier: 1,
                maxCalories: { female: 188, male: 376 }
            },
            'Olive Oil': {
                limits: { female: 1.0, male: 1.5 },    // 1 tbsp female, 1.5 tbsp male
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

    // ===== TIER 7: SUPPLEMENTS =====
    tier7_supplements: {
        priority: 7,
        description: 'Protein supplements - gender specific limits',
        foods: {
            'Whey Protein (generic)': {
                limits: { female: 1.0, male: 1.5 },    // 1 scoop female, 1.5 scoops male PER MEAL
                unit: 'servings',
                displayUnit: 'scoops',
                displayMultiplier: 1,
                maxCalories: { female: 120, male: 180 },
                dailyLimits: { female: 2, male: 6 }     // Total daily limits
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
                limits: { female: 1.0, male: 1.0 },    // 1 bar max for both
                unit: 'servings',
                displayUnit: 'bars',
                displayMultiplier: 1,
                maxCalories: { female: 190, male: 190 }
            }
        }
    }
};

/**
 * 🔧 TIER SYSTEM UTILITIES
 */
export class TierSystemManager {

    /**
     * Get food tier number
     */
    static getFoodTier(foodName) {
        for (const [tierKey, tierData] of Object.entries(FoodTierSystem)) {
            if (tierData.foods && tierData.foods[foodName]) {
                return tierData.priority;
            }
        }
        return 99; // Unknown food
    }

    /**
     * Get food limits for gender
     */
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

        // Default limits for unknown foods
        return {
            maxServing: gender === 'female' ? 1.0 : 1.5,
            displayUnit: 'servings',
            displayMultiplier: 1,
            maxCalories: gender === 'female' ? 200 : 300,
            dailyLimit: null
        };
    }

    /**
     * 🚨 ENFORCE REALISTIC LIMITS - THE MAIN FUNCTION
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

        // Calculate display values
        const displayValue = finalServing * limits.displayMultiplier;
        const displayServing = displayValue < 0.1 ? '0.1' : displayValue.toFixed(displayValue % 1 === 0 ? 0 : 1);

        return {
            ...item,
            serving: finalServing,
            displayServing,
            displayUnit: limits.displayUnit,
            tier,
            wasLimited,
            originalServing: item.serving,
            genderApplied: gender,
            maxAllowed: limits.maxServing,
            tierLimits: limits
        };
    }

    /**
     * Apply limits to entire meal plan
     */
    static applyLimitsToMealPlan(mealPlan, gender = 'male') {
        console.log(`🔒 [TIER SYSTEM] Applying ${gender} realistic limits to all meal items...`);

        let totalLimited = 0;

        mealPlan.allMeals.forEach(meal => {
            meal.items = meal.items.map(item => {
                const limitedItem = this.enforceRealisticLimits(item, gender);
                if (limitedItem.wasLimited) totalLimited++;
                return limitedItem;
            });
        });

        console.log(`✅ [TIER SYSTEM] Applied limits to ${totalLimited} items for ${gender}`);

        // Add metadata
        mealPlan.tierSystemApplied = {
            gender,
            limitsApplied: totalLimited,
            timestamp: new Date().toISOString()
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

    /**
     * Get all foods in a tier
     */
    static getFoodsInTier(tierNumber) {
        for (const tierData of Object.values(FoodTierSystem)) {
            if (tierData.priority === tierNumber && tierData.foods) {
                return Object.keys(tierData.foods);
            }
        }
        return [];
    }

    /**
     * Get realistic limits summary for display
     */
    static getRealisticLimitsSummary(gender = 'male') {
        const genderKey = gender.toLowerCase();
        const summary = [];

        // Key problematic foods
        const keyFoods = ['Oats (dry)', 'Brown Rice (cooked)', 'Avocado', 'Whey Protein (generic)'];

        keyFoods.forEach(food => {
            const limits = this.getFoodLimits(food, gender);
            const displayValue = limits.maxServing * limits.displayMultiplier;
            summary.push({
                food,
                limit: `${displayValue} ${limits.displayUnit}`,
                tier: this.getFoodTier(food)
            });
        });

        return summary;
    }
}

/**
 * 🔧 CONVENIENT HELPER FUNCTIONS
 */
export const enforceRealisticLimits = (item, gender) => TierSystemManager.enforceRealisticLimits(item, gender);
export const getFoodTier = (foodName) => TierSystemManager.getFoodTier(foodName);
export const getFoodLimits = (foodName, gender) => TierSystemManager.getFoodLimits(foodName, gender);
export const validateFoodItem = (foodName, serving, gender) => TierSystemManager.validateFoodItem(foodName, serving, gender);
export const applyLimitsToMealPlan = (mealPlan, gender) => TierSystemManager.applyLimitsToMealPlan(mealPlan, gender);

export default TierSystemManager;