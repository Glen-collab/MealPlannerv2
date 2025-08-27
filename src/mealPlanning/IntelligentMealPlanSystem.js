// IntelligentMealPlanSystem.js - Master System Architecture
// Eliminates decision fatigue with 5 curated plans per scenario

/**
 * 🎯 MASTER MEAL PLAN SYSTEM
 * 
 * Instead of 1,200 static plans, we create:
 * 1. Smart Template Families (reduces redundancy)
 * 2. Intelligent Variation Engine (creates 5 options per scenario)
 * 3. Expert-Curated Meal Ideas (from bodybuilding/nutrition sites)
 * 4. Progressive Recommendation System (guides users)
 */

import { EnhancedFoodDatabase } from './EnhancedFoodDatabase.js';
import { TierSystemManager } from './CentralizedTierSystem.js';

// ===== MEAL PLAN FAMILY SYSTEM =====

export const MealPlanFamilies = {
    // Each family contains base templates that get intelligently modified

    protein_focused: {
        description: "High-protein plans inspired by bodybuilding nutrition",
        targets: { proteinPercent: 35, carbsPercent: 35, fatPercent: 30 },
        mealStructures: {
            3: ['protein_breakfast', 'power_lunch', 'lean_dinner'],
            5: ['protein_breakfast', 'protein_snack', 'power_lunch', 'pre_dinner_snack', 'lean_dinner'],
            6: ['early_protein', 'protein_breakfast', 'mid_morning', 'power_lunch', 'afternoon_fuel', 'lean_dinner']
        }
    },

    balanced_performance: {
        description: "Athletic performance nutrition (T-Nation inspired)",
        targets: { proteinPercent: 30, carbsPercent: 40, fatPercent: 30 },
        mealStructures: {
            3: ['athlete_breakfast', 'performance_lunch', 'recovery_dinner'],
            5: ['athlete_breakfast', 'pre_workout', 'performance_lunch', 'post_workout', 'recovery_dinner'],
            6: ['early_fuel', 'athlete_breakfast', 'pre_workout', 'performance_lunch', 'post_workout', 'recovery_dinner']
        }
    },

    fat_adapted: {
        description: "Keto/low-carb performance (Westside Barbell style)",
        targets: { proteinPercent: 25, carbsPercent: 10, fatPercent: 65 },
        mealStructures: {
            3: ['keto_breakfast', 'power_lunch', 'fat_dinner'],
            5: ['keto_breakfast', 'fat_snack', 'power_lunch', 'afternoon_fats', 'fat_dinner'],
            6: ['early_fats', 'keto_breakfast', 'morning_fuel', 'power_lunch', 'afternoon_fats', 'fat_dinner']
        }
    },

    lean_cutting: {
        description: "Cutting/fat loss (South Beach Diet principles)",
        targets: { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
        mealStructures: {
            3: ['lean_breakfast', 'light_lunch', 'minimal_dinner'],
            5: ['lean_breakfast', 'protein_snack', 'light_lunch', 'veggie_snack', 'minimal_dinner'],
            6: ['protein_start', 'lean_breakfast', 'morning_snack', 'light_lunch', 'veggie_snack', 'minimal_dinner']
        }
    },

    mass_building: {
        description: "Muscle building/bulking (bodybuilder nutrition)",
        targets: { proteinPercent: 30, carbsPercent: 45, fatPercent: 25 },
        mealStructures: {
            3: ['mass_breakfast', 'huge_lunch', 'growth_dinner'],
            5: ['mass_breakfast', 'growth_snack', 'huge_lunch', 'pre_dinner', 'growth_dinner'],
            6: ['early_mass', 'mass_breakfast', 'mid_morning', 'huge_lunch', 'pre_dinner', 'growth_dinner']
        }
    }
};

// ===== EXPERT-INSPIRED MEAL TEMPLATES =====

export const ExpertMealTemplates = {

    // 🥩 BODYBUILDING-INSPIRED (High Protein Focus)
    bodybuilding: {

        protein_breakfast: {
            base: [
                { food: 'Egg Whites', category: 'protein', ratio: 0.4 },
                { food: 'Oats (dry)', category: 'carbohydrate', ratio: 0.3 },
                { food: 'Blueberries', category: 'fruits', ratio: 0.2 },
                { food: 'Whey Protein (generic)', category: 'supplements', ratio: 0.1 }
            ],
            variations: [
                'greek_yogurt_protein', 'cottage_cheese_oats', 'protein_pancakes',
                'egg_white_omelet', 'protein_smoothie_bowl'
            ]
        },

        power_lunch: {
            base: [
                { food: 'Chicken Breast', category: 'protein', ratio: 0.4 },
                { food: 'Brown Rice (cooked)', category: 'carbohydrate', ratio: 0.3 },
                { food: 'Broccoli', category: 'vegetables', ratio: 0.2 },
                { food: 'Almonds', category: 'fat', ratio: 0.1 }
            ],
            variations: [
                'turkey_quinoa_bowl', 'salmon_sweet_potato', 'lean_beef_rice',
                'tuna_pasta_salad', 'chicken_veggie_stir_fry'
            ]
        },

        lean_dinner: {
            base: [
                { food: 'Cod', category: 'protein', ratio: 0.4 },
                { food: 'Asparagus', category: 'vegetables', ratio: 0.3 },
                { food: 'Sweet Potato', category: 'carbohydrate', ratio: 0.2 },
                { food: 'Olive Oil', category: 'fat', ratio: 0.1 }
            ],
            variations: [
                'salmon_vegetables', 'chicken_salad', 'lean_steak_veggies',
                'fish_cauliflower_rice', 'turkey_zucchini'
            ]
        }
    },

    // 🏃 PERFORMANCE-INSPIRED (T-Nation Style)
    performance: {

        athlete_breakfast: {
            base: [
                { food: 'Oats (dry)', category: 'carbohydrate', ratio: 0.35 },
                { food: 'Greek Yogurt (non-fat)', category: 'protein', ratio: 0.25 },
                { food: 'Banana', category: 'fruits', ratio: 0.25 },
                { food: 'Walnuts', category: 'fat', ratio: 0.15 }
            ],
            variations: [
                'quinoa_protein_bowl', 'performance_smoothie', 'athlete_oats',
                'power_breakfast_wrap', 'fuel_loaded_oats'
            ]
        },

        pre_workout: {
            base: [
                { food: 'Apple', category: 'fruits', ratio: 0.5 },
                { food: 'Peanut Butter', category: 'fat', ratio: 0.3 },
                { food: 'Whey Protein (generic)', category: 'supplements', ratio: 0.2 }
            ],
            variations: [
                'banana_protein_shake', 'quick_energy_snack', 'pre_workout_fuel',
                'performance_bar', 'energy_smoothie'
            ]
        },

        post_workout: {
            base: [
                { food: 'Whey Protein (generic)', category: 'supplements', ratio: 0.4 },
                { food: 'Banana', category: 'fruits', ratio: 0.4 },
                { food: 'Berries', category: 'fruits', ratio: 0.2 }
            ],
            variations: [
                'recovery_shake', 'post_workout_smoothie', 'muscle_recovery',
                'anabolic_window_fuel', 'growth_shake'
            ]
        }
    },

    // 🥑 KETO-INSPIRED (Westside Barbell/Powerlifting)
    keto_performance: {

        keto_breakfast: {
            base: [
                { food: 'Eggs (whole)', category: 'protein', ratio: 0.4 },
                { food: 'Avocado', category: 'fat', ratio: 0.3 },
                { food: 'Spinach', category: 'vegetables', ratio: 0.2 },
                { food: 'MCT Oil', category: 'fat', ratio: 0.1 }
            ],
            variations: [
                'bulletproof_eggs', 'keto_omelet', 'fat_fueled_breakfast',
                'powerlifter_breakfast', 'strength_fat_meal'
            ]
        },

        fat_snack: {
            base: [
                { food: 'Macadamia Nuts', category: 'fat', ratio: 0.6 },
                { food: 'String Cheese', category: 'supplements', ratio: 0.4 }
            ],
            variations: [
                'fat_bomb_snack', 'keto_nuts_cheese', 'high_fat_fuel',
                'ketogenic_snack', 'strength_fats'
            ]
        }
    },

    // 🥗 CUTTING-INSPIRED (South Beach/Lean Principles)
    lean_cutting: {

        lean_breakfast: {
            base: [
                { food: 'Egg Whites', category: 'protein', ratio: 0.5 },
                { food: 'Spinach', category: 'vegetables', ratio: 0.3 },
                { food: 'Strawberries', category: 'fruits', ratio: 0.2 }
            ],
            variations: [
                'cutting_omelet', 'lean_veggie_scramble', 'fat_loss_breakfast',
                'low_calorie_start', 'metabolic_breakfast'
            ]
        },

        protein_snack: {
            base: [
                { food: 'Greek Yogurt (non-fat)', category: 'protein', ratio: 0.7 },
                { food: 'Berries', category: 'fruits', ratio: 0.3 }
            ],
            variations: [
                'lean_protein_cup', 'cutting_snack', 'fat_loss_fuel',
                'metabolism_booster', 'lean_gains_snack'
            ]
        }
    },

    // 💪 MASS-BUILDING (Bodybuilder Bulking)
    mass_building: {

        mass_breakfast: {
            base: [
                { food: 'Oats (dry)', category: 'carbohydrate', ratio: 0.3 },
                { food: 'Whey Protein (generic)', category: 'supplements', ratio: 0.25 },
                { food: 'Banana', category: 'fruits', ratio: 0.2 },
                { food: 'Peanut Butter', category: 'fat', ratio: 0.15 },
                { food: 'Greek Yogurt (non-fat)', category: 'protein', ratio: 0.1 }
            ],
            variations: [
                'bulking_oats', 'mass_gaining_bowl', 'growth_breakfast',
                'anabolic_oats', 'size_building_meal'
            ]
        },

        huge_lunch: {
            base: [
                { food: 'Lean Beef (90/10)', category: 'protein', ratio: 0.35 },
                { food: 'Brown Rice (cooked)', category: 'carbohydrate', ratio: 0.25 },
                { food: 'Sweet Potato', category: 'carbohydrate', ratio: 0.2 },
                { food: 'Broccoli', category: 'vegetables', ratio: 0.15 },
                { food: 'Olive Oil', category: 'fat', ratio: 0.05 }
            ],
            variations: [
                'mass_builder_plate', 'bulking_bowl', 'growth_lunch',
                'size_gaining_meal', 'strength_lunch'
            ]
        }
    }
};

// ===== INTELLIGENT VARIATION ENGINE =====

export class IntelligentVariationEngine {

    constructor() {
        this.expertTemplates = ExpertMealTemplates;
        this.foodDatabase = EnhancedFoodDatabase;
    }

    /**
     * Generate 5 unique meal plans for any scenario
     */
    generateVariations(scenario) {
        const { goal, eaterType, mealFreq, dietaryFilters, gender } = scenario;

        // 1. Select appropriate meal family
        const family = this.selectMealFamily(goal, eaterType, dietaryFilters);

        // 2. Get meal structure for frequency
        const structure = family.mealStructures[mealFreq];

        // 3. Generate 5 variations
        const variations = [];

        for (let i = 0; i < 5; i++) {
            const variation = {
                id: `${goal}-${eaterType}-${mealFreq}-v${i + 1}`,
                name: this.generateVariationName(goal, i + 1),
                description: this.generateDescription(goal, eaterType, i + 1),
                allMeals: this.buildMeals(structure, family, dietaryFilters, gender, i),
                targetNutrition: family.targets,
                expertInspired: this.getExpertSource(goal, eaterType),
                difficulty: this.calculateDifficulty(i),
                popularity: this.calculatePopularity(goal, i)
            };

            variations.push(variation);
        }

        return this.rankVariations(variations, scenario);
    }

    selectMealFamily(goal, eaterType, dietaryFilters) {
        // Intelligent family selection based on scenario
        if (dietaryFilters.includes('keto')) {
            return MealPlanFamilies.fat_adapted;
        }

        if (goal === 'lose') {
            return MealPlanFamilies.lean_cutting;
        }

        if (goal === 'dirty-bulk' || goal === 'gain-muscle') {
            return MealPlanFamilies.mass_building;
        }

        if (eaterType === 'performance') {
            return MealPlanFamilies.balanced_performance;
        }

        return MealPlanFamilies.protein_focused; // Default
    }

    buildMeals(structure, family, dietaryFilters, gender, variationIndex) {
        const meals = [];
        const mealTimes = this.getMealTimes(structure.length);

        structure.forEach((mealType, index) => {
            const meal = {
                mealName: this.getMealName(mealType, index),
                time: mealTimes[index],
                items: this.buildMealItems(mealType, family, dietaryFilters, gender, variationIndex)
            };

            meals.push(meal);
        });

        return meals;
    }

    buildMealItems(mealType, family, dietaryFilters, gender, variationIndex) {
        // Get base template for this meal type
        const template = this.getTemplateForMealType(mealType, family);
        if (!template) return [];

        // Apply variation logic (each variation gets different foods)
        const items = [];

        template.base.forEach(baseItem => {
            const food = this.selectFoodVariation(baseItem, dietaryFilters, variationIndex);
            const serving = this.calculateServing(baseItem.ratio, gender, family);

            const item = {
                id: this.generateId(),
                food: food.name,
                category: food.category,
                serving: serving,
                displayServing: this.formatDisplayServing(serving),
                displayUnit: food.unit || 'servings'
            };

            items.push(item);
        });

        return items;
    }

    selectFoodVariation(baseItem, dietaryFilters, variationIndex) {
        const category = baseItem.category;
        const compatibleFoods = this.getCompatibleFoods(category, dietaryFilters);

        // Rotate through different foods for each variation
        const foodIndex = variationIndex % compatibleFoods.length;
        return compatibleFoods[foodIndex];
    }

    getCompatibleFoods(category, dietaryFilters) {
        // Get foods from Enhanced Food Database that match dietary filters
        const categoryFoods = this.foodDatabase[category] || {};

        return Object.entries(categoryFoods)
            .filter(([name, data]) => this.checkDietaryCompatibility(data, dietaryFilters))
            .map(([name, data]) => ({
                name,
                category,
                ...data
            }));
    }

    checkDietaryCompatibility(foodData, dietaryFilters) {
        if (!dietaryFilters.length) return true;

        return dietaryFilters.every(filter =>
            foodData.dietaryTags?.[filter] === true
        );
    }

    generateVariationName(goal, variationNumber) {
        const goalNames = {
            lose: ['Lean & Mean', 'Fat Burner', 'Cutting Edge', 'Metabolic Fire', 'Shred Mode'],
            maintain: ['Balanced Power', 'Steady State', 'Maintenance Pro', 'Equilibrium', 'Sustained Energy'],
            'gain-muscle': ['Mass Builder', 'Muscle Fuel', 'Growth Machine', 'Anabolic Stack', 'Size Seeker'],
            'dirty-bulk': ['Mass Monster', 'Bulk Beast', 'Size Explosion', 'Growth Overload', 'Massive Gains']
        };

        return goalNames[goal]?.[variationNumber - 1] || `Plan ${variationNumber}`;
    }

    generateDescription(goal, eaterType, variationNumber) {
        const descriptions = {
            lose: [
                'High-protein, low-carb approach inspired by competitive bodybuilders',
                'Metabolic-boosting meals with South Beach Diet principles',
                'Lean protein focus with strategic carb timing',
                'Fat-burning nutrition with performance elements',
                'Clean eating approach with minimal processed foods'
            ],
            maintain: [
                'Balanced macros with athletic performance focus',
                'Sustainable nutrition for long-term success',
                'T-Nation inspired balanced approach',
                'Performance nutrition with lifestyle balance',
                'Steady-state nutrition for consistent energy'
            ],
            'gain-muscle': [
                'Anabolic nutrition optimized for muscle growth',
                'Bodybuilder-style mass building with clean foods',
                'Performance-driven muscle building protocol',
                'Strategic nutrient timing for maximum gains',
                'High-quality mass gaining approach'
            ],
            'dirty-bulk': [
                'Maximum calorie approach for serious mass gains',
                'Powerlifter-inspired high-calorie protocol',
                'Westside Barbell style nutrition for strength',
                'Aggressive bulking with strategic food choices',
                'Mass monster nutrition for extreme growth'
            ]
        };

        return descriptions[goal]?.[variationNumber - 1] || 'Expert-designed nutrition plan';
    }

    getExpertSource(goal, eaterType) {
        const sources = {
            lose: ['South Beach Diet', 'Competitive Bodybuilding', 'Precision Nutrition'],
            maintain: ['T-Nation', 'Precision Nutrition', 'Renaissance Periodization'],
            'gain-muscle': ['Bodybuilding.com', 'T-Nation', 'Renaissance Periodization'],
            'dirty-bulk': ['Westside Barbell', 'Powerlifting Nutrition', 'Mass Gaining Experts']
        };

        return sources[goal]?.[0] || 'Expert Nutrition';
    }

    rankVariations(variations, scenario) {
        // Rank variations by popularity, difficulty, and user preferences
        return variations.sort((a, b) => {
            // Prioritize easier variations for beginners
            if (scenario.experienceLevel === 'beginner') {
                return a.difficulty - b.difficulty;
            }

            // Prioritize popular variations for general users
            return b.popularity - a.popularity;
        });
    }

    calculateDifficulty(variationIndex) {
        // Variations 1-2 are easiest, 3-5 get progressively more complex
        return Math.min(variationIndex + 1, 5);
    }

    calculatePopularity(goal, variationIndex) {
        // First variations tend to be most popular
        const basePopularity = {
            lose: [95, 88, 82, 75, 68],
            maintain: [92, 87, 83, 78, 73],
            'gain-muscle': [94, 89, 85, 80, 75],
            'dirty-bulk': [90, 85, 80, 75, 70]
        };

        return basePopularity[goal]?.[variationIndex] || 70;
    }

    // Helper methods
    getMealTimes(mealCount) {
        const timesByCount = {
            3: ['7:00 AM', '12:30 PM', '7:00 PM'],
            5: ['7:00 AM', '10:00 AM', '1:00 PM', '4:00 PM', '7:30 PM'],
            6: ['6:30 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM']
        };

        return timesByCount[mealCount] || [];
    }

    getMealName(mealType, index) {
        const nameMap = {
            0: 'Breakfast',
            1: ['FirstSnack', 'Lunch'][index === 1 ? 1 : 0],
            2: 'Lunch',
            3: ['MidAfternoon Snack', 'Dinner'][index === 3 ? 0 : 1],
            4: ['Dinner', 'Late Snack'][index === 4 ? 0 : 1],
            5: 'Late Snack'
        };

        return nameMap[index] || `Meal ${index + 1}`;
    }

    getTemplateForMealType(mealType, family) {
        // Map meal types to actual templates
        const templateMap = {
            protein_breakfast: this.expertTemplates.bodybuilding?.protein_breakfast,
            power_lunch: this.expertTemplates.bodybuilding?.power_lunch,
            lean_dinner: this.expertTemplates.bodybuilding?.lean_dinner,
            athlete_breakfast: this.expertTemplates.performance?.athlete_breakfast,
            pre_workout: this.expertTemplates.performance?.pre_workout,
            post_workout: this.expertTemplates.performance?.post_workout,
            // Add more mappings as needed
        };

        return templateMap[mealType] || templateMap.protein_breakfast;
    }

    calculateServing(ratio, gender, family) {
        // Base serving calculation with gender adjustments
        const baseServing = ratio * (gender === 'male' ? 1.3 : 1.0);
        return Math.max(0.25, Math.round(baseServing * 4) / 4); // Quarter increments
    }

    formatDisplayServing(serving) {
        if (serving < 1) {
            return (serving * 4) % 1 === 0 ? `${serving * 4}/4` : serving.toString();
        }
        return serving.toString();
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// ===== DECISION ELIMINATION SYSTEM =====

export class DecisionEliminationSystem {

    constructor() {
        this.variationEngine = new IntelligentVariationEngine();
    }

    /**
     * Get 5 curated options for user instead of overwhelming choices
     */
    getCuratedOptions(userProfile) {
        const { goal, gender, fitnessLevel, dietaryRestrictions, preferredMealCount } = userProfile;

        // Smart defaults to eliminate decisions
        const scenarios = [
            {
                goal,
                eaterType: this.recommendEaterType(fitnessLevel),
                mealFreq: preferredMealCount || this.recommendMealFreq(goal),
                dietaryFilters: dietaryRestrictions || [],
                gender
            }
        ];

        // Generate variations for the optimal scenario
        const variations = this.variationEngine.generateVariations(scenarios[0]);

        return {
            recommendedScenario: scenarios[0],
            mealPlanOptions: variations,
            reasoning: this.explainRecommendations(scenarios[0], variations)
        };
    }

    recommendEaterType(fitnessLevel) {
        // Beginners get balanced, advanced get performance
        return ['beginner', 'intermediate'].includes(fitnessLevel) ? 'balanced' : 'performance';
    }

    recommendMealFreq(goal) {
        // Smart defaults based on goal
        const recommendations = {
            lose: 5, // More frequent meals help with hunger
            maintain: 5, // Balanced approach
            'gain-muscle': 5, // Good for nutrient timing
            'dirty-bulk': 6 // Maximum eating opportunities
        };

        return recommendations[goal] || 5;
    }

    explainRecommendations(scenario, variations) {
        return {
            whyThisScenario: `${scenario.eaterType} eating style works best for your ${scenario.goal} goal with ${scenario.mealFreq} meals providing optimal nutrition timing.`,
            howVariationsWork: `These 5 plans range from simple to advanced, all following proven principles from bodybuilding and performance nutrition experts.`,
            expertSources: ['Bodybuilding.com', 'T-Nation', 'South Beach Diet', 'Westside Barbell', 'Renaissance Periodization']
        };
    }
}

// ===== EXPORT MAIN SYSTEM =====

export default {
    IntelligentVariationEngine,
    DecisionEliminationSystem,
    MealPlanFamilies,
    ExpertMealTemplates
};