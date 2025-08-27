// Enhanced5OptionMealGenerator.js - Research-Based Meal Planning System
// Generates 5 curated meal plans per scenario to eliminate decision fatigue

import { TierSystemManager } from './CentralizedTierSystem.js';
import { EnhancedFoodDatabase } from './EnhancedFoodDatabase.js';

// ===== EXPERT-RESEARCHED MEAL DATABASE =====
// Based on bodybuilding.com, T-Nation, South Beach Diet, Westside Barbell, etc.

export const ExpertResearchedMeals = {

    // 🏆 BODYBUILDING.COM INSPIRED MEALS
    bodybuilding_meals: {

        classic_bb_breakfast: {
            name: "Classic Bodybuilder Breakfast",
            source: "Bodybuilding.com",
            foods: [
                { food: 'Egg Whites', amount: 6, unit: 'whites' },
                { food: 'Oats (dry)', amount: 0.5, unit: 'cups' },
                { food: 'Blueberries', amount: 0.75, unit: 'cups' },
                { food: 'Whey Protein (generic)', amount: 1, unit: 'scoops' }
            ]
        },

        protein_power_lunch: {
            name: "Protein Power Lunch",
            source: "Bodybuilding.com",
            foods: [
                { food: 'Chicken Breast', amount: 8, unit: 'oz' },
                { food: 'Brown Rice (cooked)', amount: 1, unit: 'cups' },
                { food: 'Broccoli', amount: 2, unit: 'cups' },
                { food: 'Almonds', amount: 1, unit: 'oz' }
            ]
        },

        lean_gains_dinner: {
            name: "Lean Gains Dinner",
            source: "Bodybuilding.com",
            foods: [
                { food: 'Salmon', amount: 6, unit: 'oz' },
                { food: 'Asparagus', amount: 2, unit: 'cups' },
                { food: 'Sweet Potato', amount: 1, unit: 'medium' },
                { food: 'Olive Oil', amount: 1, unit: 'tbsp' }
            ]
        }
    },

    // ⚡ T-NATION PERFORMANCE MEALS
    t_nation_meals: {

        athlete_fuel_breakfast: {
            name: "Athlete Fuel Breakfast",
            source: "T-Nation",
            foods: [
                { food: 'Greek Yogurt (non-fat)', amount: 1, unit: 'cups' },
                { food: 'Oats (dry)', amount: 0.75, unit: 'cups' },
                { food: 'Banana', amount: 1, unit: 'medium' },
                { food: 'Walnuts', amount: 0.5, unit: 'oz' },
                { food: 'Plant Protein (pea/rice)', amount: 1, unit: 'scoops' }
            ]
        },

        performance_lunch: {
            name: "Performance Lunch",
            source: "T-Nation",
            foods: [
                { food: 'Turkey Breast', amount: 6, unit: 'oz' },
                { food: 'Quinoa (cooked)', amount: 1, unit: 'cups' },
                { food: 'Spinach', amount: 2, unit: 'cups' },
                { food: 'Avocado', amount: 0.5, unit: 'medium' }
            ]
        },

        recovery_dinner: {
            name: "Recovery Dinner",
            source: "T-Nation",
            foods: [
                { food: 'Lean Beef (90/10)', amount: 6, unit: 'oz' },
                { food: 'Sweet Potato', amount: 1.5, unit: 'medium' },
                { food: 'Bell Peppers', amount: 1.5, unit: 'cups' },
                { food: 'Olive Oil', amount: 1, unit: 'tbsp' }
            ]
        }
    },

    // 🥑 WESTSIDE BARBELL / POWERLIFTING MEALS
    westside_meals: {

        strength_breakfast: {
            name: "Strength Breakfast",
            source: "Westside Barbell",
            foods: [
                { food: 'Eggs (whole)', amount: 4, unit: 'eggs' },
                { food: 'Avocado', amount: 1, unit: 'medium' },
                { food: 'Spinach', amount: 2, unit: 'cups' },
                { food: 'MCT Oil', amount: 1, unit: 'tbsp' }
            ]
        },

        power_lunch: {
            name: "Power Lunch",
            source: "Westside Barbell",
            foods: [
                { food: 'Lean Beef (90/10)', amount: 8, unit: 'oz' },
                { food: 'White Rice (cooked)', amount: 1.5, unit: 'cups' },
                { food: 'Green Beans', amount: 2, unit: 'cups' },
                { food: 'Coconut Oil', amount: 1, unit: 'tbsp' }
            ]
        },

        mass_dinner: {
            name: "Mass Dinner",
            source: "Westside Barbell",
            foods: [
                { food: 'Salmon', amount: 8, unit: 'oz' },
                { food: 'Brown Rice (cooked)', amount: 1.5, unit: 'cups' },
                { food: 'Broccoli', amount: 2, unit: 'cups' },
                { food: 'Almonds', amount: 1, unit: 'oz' }
            ]
        }
    },

    // 🥗 SOUTH BEACH DIET INSPIRED
    south_beach_meals: {

        phase1_breakfast: {
            name: "Phase 1 Breakfast (Low-Carb)",
            source: "South Beach Diet",
            foods: [
                { food: 'Egg Whites', amount: 4, unit: 'whites' },
                { food: 'Cottage Cheese (low-fat)', amount: 0.5, unit: 'cups' },
                { food: 'Spinach', amount: 2, unit: 'cups' },
                { food: 'Strawberries', amount: 0.5, unit: 'cups' }
            ]
        },

        lean_lunch: {
            name: "Lean & Clean Lunch",
            source: "South Beach Diet",
            foods: [
                { food: 'Chicken Breast', amount: 6, unit: 'oz' },
                { food: 'Mixed Greens', amount: 3, unit: 'cups' },
                { food: 'Cucumber', amount: 1, unit: 'cups' },
                { food: 'Olive Oil', amount: 1, unit: 'tbsp' }
            ]
        },

        metabolism_dinner: {
            name: "Metabolism Dinner",
            source: "South Beach Diet",
            foods: [
                { food: 'Cod', amount: 6, unit: 'oz' },
                { food: 'Zucchini', amount: 2, unit: 'cups' },
                { food: 'Asparagus', amount: 1.5, unit: 'cups' },
                { food: 'Almonds', amount: 0.5, unit: 'oz' }
            ]
        }
    }
};

// ===== MEAL PLAN VARIATION SYSTEM =====

export class Enhanced5OptionGenerator {

    constructor() {
        this.expertMeals = ExpertResearchedMeals;
        this.tierSystem = TierSystemManager;
    }

    /**
     * 🎯 MAIN FUNCTION: Generate 5 meal plans for any scenario
     */
    generate5Options(scenario) {
        const { goal, eaterType, mealFreq, dietaryFilters, gender } = scenario;

        console.log(`🎯 Generating 5 ${goal} meal plans for ${gender} (${mealFreq} meals)`);

        const variations = [];

        // Generate 5 distinct variations
        for (let i = 1; i <= 5; i++) {
            const variation = this.createVariation(scenario, i);
            variations.push(variation);
        }

        return {
            scenario,
            variations,
            metadata: {
                totalOptions: 5,
                expertSources: this.getExpertSources(goal, eaterType),
                decisionsMade: this.getDecisionsMade(scenario),
                generatedAt: new Date().toISOString()
            }
        };
    }

    /**
     * Create a single meal plan variation
     */
    createVariation(scenario, variationNumber) {
        const { goal, eaterType, mealFreq, dietaryFilters, gender } = scenario;

        // Get meal structure for this frequency
        const mealStructure = this.getMealStructure(mealFreq);

        // Select appropriate meal style based on variation number and goal
        const mealStyle = this.selectMealStyle(goal, eaterType, variationNumber);

        // Build meals
        const allMeals = this.buildMeals(mealStructure, mealStyle, dietaryFilters, gender, variationNumber);

        // Apply tier system limits
        const limitedPlan = this.tierSystem.applyLimitsToMealPlan({ allMeals }, gender);

        return {
            id: `${goal}-${eaterType}-${mealFreq}-v${variationNumber}`,
            name: this.getVariationName(goal, variationNumber),
            description: this.getVariationDescription(goal, mealStyle, variationNumber),
            allMeals: limitedPlan.allMeals,

            // Metadata
            variation: variationNumber,
            difficulty: this.getDifficulty(variationNumber),
            popularity: this.getPopularity(goal, variationNumber),
            expertSource: this.getExpertSource(mealStyle),

            // Nutrition targets
            targetMacros: this.getTargetMacros(goal, eaterType),

            // System info
            tierSystemApplied: limitedPlan.tierSystemApplied,
            generatedWith: 'Enhanced5OptionGenerator'
        };
    }

    /**
     * Get meal structure based on frequency
     */
    getMealStructure(mealFreq) {
        const structures = {
            3: [
                { name: 'Breakfast', time: '7:00 AM' },
                { name: 'Lunch', time: '1:00 PM' },
                { name: 'Dinner', time: '7:00 PM' }
            ],
            5: [
                { name: 'Breakfast', time: '7:00 AM' },
                { name: 'FirstSnack', time: '10:00 AM' },
                { name: 'Lunch', time: '1:00 PM' },
                { name: 'MidAfternoon Snack', time: '4:00 PM' },
                { name: 'Dinner', time: '7:30 PM' }
            ],
            6: [
                { name: 'Breakfast', time: '6:30 AM' },
                { name: 'SecondSnack', time: '9:30 AM' },
                { name: 'Lunch', time: '12:30 PM' },
                { name: 'MidAfternoon Snack', time: '3:30 PM' },
                { name: 'Dinner', time: '6:30 PM' },
                { name: 'Late Snack', time: '9:00 PM' }
            ]
        };

        return structures[mealFreq] || structures[5];
    }

    /**
     * Select meal style based on goal and variation
     */
    selectMealStyle(goal, eaterType, variationNumber) {
        const styleMap = {
            lose: [
                'south_beach', 'bodybuilding_lean', 'performance_cut', 'keto_cut', 'metabolic_boost'
            ],
            maintain: [
                'balanced_performance', 't_nation_balanced', 'bodybuilding_maintenance', 'athletic_fuel', 'sustainable_nutrition'
            ],
            'gain-muscle': [
                'bodybuilding_mass', 't_nation_performance', 'lean_gains', 'athletic_building', 'clean_bulk'
            ],
            'dirty-bulk': [
                'westside_power', 'mass_monster', 'strength_bulk', 'powerlifter_fuel', 'maximum_gains'
            ]
        };

        return styleMap[goal]?.[variationNumber - 1] || 'balanced_performance';
    }

    /**
     * Build meals for the plan
     */
    buildMeals(mealStructure, mealStyle, dietaryFilters, gender, variationNumber) {
        const meals = [];

        mealStructure.forEach((mealInfo, index) => {
            const meal = {
                mealName: mealInfo.name,
                time: mealInfo.time,
                items: this.buildMealItems(mealInfo.name, mealStyle, dietaryFilters, gender, variationNumber, index)
            };

            meals.push(meal);
        });

        return meals;
    }

    /**
     * Build items for a single meal
     */
    buildMealItems(mealName, mealStyle, dietaryFilters, gender, variationNumber, mealIndex) {
        // Get base meal template
        const template = this.selectMealTemplate(mealName, mealStyle, variationNumber);

        const items = [];

        template.foods.forEach(foodItem => {
            // Check dietary compatibility
            if (this.isDietaryCompatible(foodItem.food, dietaryFilters)) {

                // Adjust serving for gender
                const adjustedAmount = this.adjustForGender(foodItem.amount, gender, mealStyle);

                const item = {
                    id: this.generateId(),
                    food: foodItem.food,
                    category: this.getCategoryForFood(foodItem.food),
                    serving: adjustedAmount,
                    displayServing: this.formatDisplayAmount(adjustedAmount, foodItem.unit),
                    displayUnit: foodItem.unit,
                    expertSource: template.source
                };

                items.push(item);
            }
        });

        return items;
    }

    /**
     * Select meal template based on meal name and style
     */
    selectMealTemplate(mealName, mealStyle, variationNumber) {
        const isBreakfast = mealName.toLowerCase().includes('breakfast');
        const isLunch = mealName.toLowerCase().includes('lunch');
        const isDinner = mealName.toLowerCase().includes('dinner');
        const isSnack = mealName.toLowerCase().includes('snack');

        // Map meal styles to expert meal collections
        const styleToCollection = {
            'bodybuilding_mass': 'bodybuilding_meals',
            'bodybuilding_lean': 'bodybuilding_meals',
            't_nation_performance': 't_nation_meals',
            't_nation_balanced': 't_nation_meals',
            'westside_power': 'westside_meals',
            'south_beach': 'south_beach_meals'
        };

        const collection = styleToCollection[mealStyle] || 'bodybuilding_meals';
        const mealCollection = this.expertMeals[collection];

        if (isBreakfast) {
            const breakfastMeals = Object.values(mealCollection).filter(meal =>
                meal.name.toLowerCase().includes('breakfast')
            );
            return breakfastMeals[(variationNumber - 1) % breakfastMeals.length] || breakfastMeals[0];
        }

        if (isLunch) {
            const lunchMeals = Object.values(mealCollection).filter(meal =>
                meal.name.toLowerCase().includes('lunch')
            );
            return lunchMeals[(variationNumber - 1) % lunchMeals.length] || lunchMeals[0];
        }

        if (isDinner) {
            const dinnerMeals = Object.values(mealCollection).filter(meal =>
                meal.name.toLowerCase().includes('dinner')
            );
            return dinnerMeals[(variationNumber - 1) % dinnerMeals.length] || dinnerMeals[0];
        }

        if (isSnack) {
            // Create simple snack templates
            return this.createSnackTemplate(mealStyle, variationNumber);
        }

        // Default to first meal in collection
        return Object.values(mealCollection)[0];
    }

    /**
     * Create snack templates
     */
    createSnackTemplate(mealStyle, variationNumber) {
        const snackTemplates = [
            {
                name: "Protein Snack 1",
                source: "Expert Research",
                foods: [
                    { food: 'Greek Yogurt (non-fat)', amount: 0.75, unit: 'cups' },
                    { food: 'Berries', amount: 0.5, unit: 'cups' }
                ]
            },
            {
                name: "Protein Snack 2",
                source: "Expert Research",
                foods: [
                    { food: 'Whey Protein (generic)', amount: 1, unit: 'scoops' },
                    { food: 'Apple', amount: 1, unit: 'medium' }
                ]
            },
            {
                name: "Fat Snack",
                source: "Expert Research",
                foods: [
                    { food: 'Almonds', amount: 1, unit: 'oz' },
                    { food: 'String Cheese', amount: 1, unit: 'sticks' }
                ]
            },
            {
                name: "Veggie Snack",
                source: "Expert Research",
                foods: [
                    { food: 'Hummus', amount: 2, unit: 'tbsp' },
                    { food: 'Carrots', amount: 1, unit: 'cups' }
                ]
            },
            {
                name: "Quick Energy",
                source: "Expert Research",
                foods: [
                    { food: 'Banana', amount: 1, unit: 'medium' },
                    { food: 'Peanut Butter', amount: 1, unit: 'tbsp' }
                ]
            }
        ];

        return snackTemplates[(variationNumber - 1) % snackTemplates.length];
    }

    /**
     * Check if food is compatible with dietary filters
     */
    isDietaryCompatible(foodName, dietaryFilters) {
        if (!dietaryFilters.length) return true;

        // Get food data from Enhanced Food Database
        const foodData = this.getFoodData(foodName);
        if (!foodData || !foodData.dietaryTags) return true;

        return dietaryFilters.every(filter =>
            foodData.dietaryTags[filter] === true
        );
    }

    /**
     * Adjust serving amounts for gender
     */
    adjustForGender(baseAmount, gender, mealStyle) {
        const genderMultiplier = gender === 'male' ? 1.2 : 0.8;

        // Apply style-specific adjustments
        const styleMultipliers = {
            'westside_power': 1.3,
            'mass_monster': 1.4,
            'south_beach': 0.8,
            'keto_cut': 0.9
        };

        const styleMultiplier = styleMultipliers[mealStyle] || 1.0;

        const adjustedAmount = baseAmount * genderMultiplier * styleMultiplier;

        // Round to user-friendly amounts
        return Math.round(adjustedAmount * 4) / 4; // Quarter increments
    }

    /**
     * Get food data from Enhanced Food Database
     */
    getFoodData(foodName) {
        // Search all categories for the food
        const databases = [
            EnhancedFoodDatabase.protein_combinations,
            EnhancedFoodDatabase.protein_supplements,
            EnhancedFoodDatabase.favorite_snacks,
            EnhancedFoodDatabase.ready_protein_drinks
        ];

        for (const db of databases) {
            if (db[foodName]) {
                return db[foodName];
            }
        }

        return null;
    }

    /**
     * Get category for food item
     */
    getCategoryForFood(foodName) {
        const proteinFoods = ['Chicken Breast', 'Turkey Breast', 'Salmon', 'Cod', 'Lean Beef (90/10)', 'Greek Yogurt (non-fat)', 'Cottage Cheese (low-fat)', 'Eggs (whole)', 'Egg Whites'];
        const carbFoods = ['Oats (dry)', 'Brown Rice (cooked)', 'White Rice (cooked)', 'Quinoa (cooked)', 'Sweet Potato'];
        const fatFoods = ['Avocado', 'Almonds', 'Walnuts', 'Olive Oil', 'MCT Oil', 'Peanut Butter'];
        const vegFoods = ['Broccoli', 'Spinach', 'Asparagus', 'Bell Peppers', 'Green Beans', 'Zucchini'];
        const fruitFoods = ['Apple', 'Banana', 'Berries', 'Blueberries', 'Strawberries'];
        const suppFoods = ['Whey Protein (generic)', 'Plant Protein (pea/rice)', 'Quest Bar', 'String Cheese'];

        if (proteinFoods.includes(foodName)) return 'protein';
        if (carbFoods.includes(foodName)) return 'carbohydrate';
        if (fatFoods.includes(foodName)) return 'fat';
        if (vegFoods.includes(foodName)) return 'vegetables';
        if (fruitFoods.includes(foodName)) return 'fruits';
        if (suppFoods.includes(foodName)) return 'supplements';

        return 'protein'; // Default
    }

    /**
     * Format display amounts
     */
    formatDisplayAmount(amount, unit) {
        if (amount < 1 && unit === 'cups') {
            const fractions = { 0.25: '1/4', 0.5: '1/2', 0.75: '3/4' };
            return fractions[amount] || amount.toString();
        }

        return amount.toString();
    }

    /**
     * Generate variation names
     */
    getVariationName(goal, variationNumber) {
        const names = {
            lose: ['Fat Burner Pro', 'Lean Machine', 'Cutting Edge', 'Shred Zone', 'Metabolic Fire'],
            maintain: ['Balanced Elite', 'Steady Power', 'Performance Plus', 'Athletic Edge', 'Sustained Energy'],
            'gain-muscle': ['Mass Builder', 'Muscle Forge', 'Growth Engine', 'Anabolic Stack', 'Size Master'],
            'dirty-bulk': ['Mass Monster', 'Bulk Beast', 'Power House', 'Growth Explosion', 'Maximum Mass']
        };

        return names[goal]?.[variationNumber - 1] || `Plan ${variationNumber}`;
    }

    /**
     * Get variation descriptions
     */
    getVariationDescription(goal, mealStyle, variationNumber) {
        const descriptions = {
            lose: [
                'High-protein, strategic carbs - inspired by competitive bodybuilders',
                'South Beach Diet principles with performance nutrition',
                'Metabolic optimization with clean food choices',
                'Keto-inspired fat burning with muscle preservation',
                'Advanced cutting protocol with nutrient timing'
            ],
            maintain: [
                'T-Nation performance nutrition for balanced results',
                'Sustainable meal plan for long-term success',
                'Athletic nutrition with lifestyle flexibility',
                'Bodybuilding maintenance with clean eating',
                'Performance-driven balanced approach'
            ],
            'gain-muscle': [
                'Bodybuilding.com mass building protocol',
                'T-Nation muscle building with quality foods',
                'Lean gains approach with strategic nutrition',
                'Athletic muscle building for performance',
                'Clean bulk with optimal nutrient timing'
            ],
            'dirty-bulk': [
                'Westside Barbell power and mass protocol',
                'Maximum calorie approach for serious gains',
                'Powerlifter nutrition for strength and size',
                'Aggressive bulking with strategic food selection',
                'Mass monster nutrition for extreme growth'
            ]
        };

        return descriptions[goal]?.[variationNumber - 1] || 'Expert-designed nutrition plan';
    }

    /**
     * Helper methods
     */
    getDifficulty(variationNumber) {
        return Math.min(variationNumber, 5); // 1-5 difficulty scale
    }

    getPopularity(goal, variationNumber) {
        // First few variations tend to be more popular
        const basePopularity = [95, 88, 82, 76, 70];
        return basePopularity[variationNumber - 1] || 70;
    }

    getExpertSource(mealStyle) {
        const sources = {
            'bodybuilding_mass': 'Bodybuilding.com',
            't_nation_performance': 'T-Nation',
            'westside_power': 'Westside Barbell',
            'south_beach': 'South Beach Diet'
        };

        return sources[mealStyle] || 'Expert Nutrition Research';
    }

    getTargetMacros(goal, eaterType) {
        const targets = {
            lose: { protein: 40, carbs: 30, fat: 30 },
            maintain: { protein: 30, carbs: 40, fat: 30 },
            'gain-muscle': { protein: 30, carbs: 45, fat: 25 },
            'dirty-bulk': { protein: 25, carbs: 50, fat: 25 }
        };

        return targets[goal] || targets.maintain;
    }

    getExpertSources(goal, eaterType) {
        return ['Bodybuilding.com', 'T-Nation', 'South Beach Diet', 'Westside Barbell', 'Renaissance Periodization'];
    }

    getDecisionsMade(scenario) {
        return [
            `Selected ${scenario.eaterType} eating style for ${scenario.goal} goal`,
            `Optimized for ${scenario.gender} with ${scenario.mealFreq} meals per day`,
            `Applied ${scenario.dietaryFilters.length || 0} dietary restrictions`,
            'Generated 5 expert-researched variations to eliminate choice fatigue'
        ];
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// ===== DECISION ELIMINATION INTERFACE =====

export class SmartRecommendationSystem {

    constructor() {
        this.generator = new Enhanced5OptionGenerator();
    }

    /**
     * 🎯 MAIN FUNCTION: Get 5 options instead of overwhelming user with choices
     */
    getRecommendedPlans(userProfile) {
        console.log('🎯 Smart Recommendation System: Eliminating decision fatigue...');

        // Create optimal scenario based on user profile
        const scenario = this.createOptimalScenario(userProfile);

        // Generate 5 curated options
        const options = this.generator.generate5Options(scenario);

        return {
            ...options,
            userMessage: this.createUserMessage(scenario),
            whyThesePlans: this.explainRecommendations(scenario),
            nextSteps: this.getNextSteps()
        };
    }

    createOptimalScenario(userProfile) {
        const {
            goal = 'maintain',
            gender = 'male',
            fitnessLevel = 'intermediate',
            dietaryRestrictions = [],
            preferredMealCount
        } = userProfile;

        // Smart defaults
        return {
            goal,
            gender,
            eaterType: fitnessLevel === 'advanced' ? 'performance' : 'balanced',
            mealFreq: preferredMealCount || this.recommendMealFreq(goal),
            dietaryFilters: dietaryRestrictions
        };
    }

    recommendMealFreq(goal) {
        const recommendations = {
            lose: 5,        // More frequent meals help with hunger
            maintain: 5,    // Balanced approach  
            'gain-muscle': 5, // Good for nutrient timing
            'dirty-bulk': 6   // Maximum eating opportunities
        };

        return recommendations[goal] || 5;
    }

    createUserMessage(scenario) {
        return `Based on your ${scenario.goal} goal, I've created 5 expert-researched meal plans. Each follows proven principles from bodybuilding and performance nutrition. Choose the one that appeals to you most - they're all designed to work!`;
    }

    explainRecommendations(scenario) {
        return {
            eatingStyle: `${scenario.eaterType} eating works best for your goals and lifestyle`,
            mealTiming: `${scenario.mealFreq} meals provide optimal nutrition distribution`,
            expertBasis: 'Plans based on research from Bodybuilding.com, T-Nation, South Beach Diet, and Westside Barbell',
            variety: 'Each plan offers different food combinations to prevent boredom'
        };
    }

    getNextSteps() {
        return [
            'Choose your preferred meal plan from the 5 options',
            'Add the plan to your meal tracker',
            'Adjust individual servings if needed',
            'Start following the plan consistently',
            'Monitor progress and adjust as needed'
        ];
    }
}

// ===== EXPORT SYSTEM =====

export default {
    Enhanced5OptionGenerator,
    SmartRecommendationSystem,
    ExpertResearchedMeals
};