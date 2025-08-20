// MealPlanGenerator.js - Main orchestrator for the complete meal planning system

import { applyDietaryFilters, validateDietaryCompliance } from './DietaryFilterSystem.js';
import { getFoodNutrition, FoodDatabase } from './FoodDatabase.js';

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

// Add this function at the top of your MealPlanGenerator.js file:

const roundToUserFriendly = (serving, unit) => {
    if (serving <= 0) return 0.25; // Minimum serving

    // Normalize unit to lowercase for consistent matching
    const normalizedUnit = unit?.toLowerCase() || '';

    if (normalizedUnit === 'oz') {
        // Round oz to nearest 0.5: 7.7oz → 8oz, 7.2oz → 7oz  
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit.includes('cup')) {
        // Handle both "cup" and "cups": 3.3 cups → 3.25 cups, 1.1 cup → 1 cup
        return Math.round(serving * 4) / 4;
    } else if (normalizedUnit === 'tbsp') {
        // Round tbsp to nearest 0.5: 2.3 tbsp → 2.5 tbsp
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit === 'tsp') {
        // Round tsp to whole numbers: 1.7 tsp → 2 tsp
        return Math.round(serving);
    } else if (normalizedUnit === 'medium' || normalizedUnit === 'large' || normalizedUnit === 'small' || normalizedUnit === 'pieces') {
        // Round pieces to nearest 0.5: 1.1 medium → 1 medium, 1.7 medium → 1.5 medium
        return Math.round(serving * 2) / 2;
    } else if (normalizedUnit === 'scoops' || normalizedUnit === 'scoop' || normalizedUnit === 'bars' || normalizedUnit === 'slices') {
        // Round protein scoops/bars to nearest 0.5
        return Math.round(serving * 2) / 2;
    } else {
        // Default: round to nearest 0.5
        return Math.round(serving * 2) / 2;
    }
};

// Also, let's add a function to standardize display units:
const standardizeDisplayUnit = (serving, unit) => {
    const normalizedUnit = unit?.toLowerCase() || '';

    if (normalizedUnit.includes('cup')) {
        // Use "cup" for 1, "cups" for anything else
        return serving === 1 ? 'cup' : 'cups';
    } else if (normalizedUnit === 'medium' || normalizedUnit === 'large' || normalizedUnit === 'small') {
        // Keep as-is for pieces
        return unit;
    } else if (normalizedUnit === 'scoop' && serving !== 1) {
        return 'scoops';
    } else if (normalizedUnit === 'scoops' && serving === 1) {
        return 'scoop';
    }

    return unit; // Keep original unit for everything else
};


// Complete meal plan templates (24 base combinations)
const CompleteMealPlanTemplates = {
    // MAINTAIN WEIGHT PLANS
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
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
                    createFoodItem('Peanut Butter', 'fat', 0.5, '1/2', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 0.75, '3/4', 'scoop')
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

    // LOSE WEIGHT PLANS
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
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop'),
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

    // GAIN MUSCLE PLANS
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
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
                    createFoodItem('Peanut Butter', 'fat', 1, '1', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1, '1', 'scoop')
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

    // DIRTY BULK PLANS
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
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop')
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
                    createFoodItem('Peanut Butter', 'fat', 1.5, '1.5', 'tbsp'),
                    createFoodItem('Whey Protein (generic)', 'supplements', 1.5, '1.5', 'scoop')
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
 * Main Meal Plan Generator Class
 */
export class MealPlanGenerator {
    constructor() {
        this.templates = CompleteMealPlanTemplates;
        this.planCache = new Map(); // Simple cache
    }

    /**
     * Generate a complete meal plan based on user preferences
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

        console.log(`🎯 Generating meal plan: ${goal}-${eaterType}-${mealFreq}`, dietaryFilters);

        try {
            // Step 1: Get base template
            const baseTemplate = this.getMealPlanTemplate(goal, eaterType, mealFreq);
            if (!baseTemplate) {
                throw new Error(`No template found for ${goal}-${eaterType}-${mealFreq}`);
            }

            // Step 2: Apply dietary filters
            const dietaryPlan = applyDietaryFilters(baseTemplate, dietaryFilters);

            // Step 3: Scale to target calories if needed
            const targetCalories = this.calculateTargetCalories(goal, calorieData);
            const scaledPlan = this.scaleMealPlan(dietaryPlan, targetCalories, goal);

            // Step 4: Enhance plan with metadata
            const finalPlan = this.enhanceMealPlan(scaledPlan, {
                goal,
                eaterType,
                mealFreq,
                dietaryFilters,
                userProfile,
                targetCalories
            });

            // Step 5: Validate dietary compliance
            const validation = validateDietaryCompliance(finalPlan, dietaryFilters);
            if (!validation.isCompliant) {
                console.warn('⚠️ Plan validation warnings:', validation.violations);
                finalPlan.validationWarnings = validation.violations;
            }

            console.log('✅ Meal plan generation complete');
            return finalPlan;

        } catch (error) {
            console.error('❌ Error generating meal plan:', error);
            return this.getFallbackPlan();
        }
    }

    /**
     * Get meal plan template by parameters
     */
    getMealPlanTemplate(goal, eaterType, mealFreq) {
        const key = `${goal}-${eaterType}-${mealFreq}`;
        return this.templates[key] || this.templates['maintain-balanced-5']; // fallback
    }

    /**
     * Calculate target calories based on goal and user data
     */
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

    /**
     * Scale meal plan to target calories
     */
    scaleMealPlan(basePlan, targetCalories, goal) {
        const currentCalories = this.calculatePlanCalories(basePlan);
        let scalingFactor = targetCalories / currentCalories;

        // Apply scaling limits based on goal
        const scalingLimits = {
            'lose': { min: 0.4, max: 1.2 },
            'maintain': { min: 0.7, max: 1.3 },
            'gain-muscle': { min: 0.8, max: 1.5 },
            'dirty-bulk': { min: 0.9, max: 2.0 }
        };

        const limits = scalingLimits[goal] || { min: 0.5, max: 2.0 };
        scalingFactor = Math.max(limits.min, Math.min(limits.max, scalingFactor));

        console.log(`📊 Scaling: ${currentCalories} → ${targetCalories} calories (${scalingFactor.toFixed(2)}x)`);

        // Clone and scale the plan
        const scaledPlan = JSON.parse(JSON.stringify(basePlan));
        scaledPlan.allMeals = scaledPlan.allMeals.map(meal => ({
            ...meal,
            items: meal.items.map(item => this.scaleIndividualItem(item, scalingFactor))
        }));

        scaledPlan.actualCalories = this.calculatePlanCalories(scaledPlan);
        scaledPlan.scalingFactor = scalingFactor;
        scaledPlan.targetCalories = targetCalories;

        return scaledPlan;
    }

    /**
     * Scale an individual food item
     */
    scaleIndividualItem(item, scalingFactor) {
        const newServing = item.serving * scalingFactor;
        const rawDisplayServing = parseFloat(item.displayServing || '1') * scalingFactor;

        // Apply user-friendly rounding
        const friendlyDisplayServing = roundToUserFriendly(rawDisplayServing, item.displayUnit);

        // Standardize the unit display
        const standardUnit = standardizeDisplayUnit(friendlyDisplayServing, item.displayUnit);

        // Special handling for different food categories
        let finalServing = newServing;
        let finalDisplayServing = friendlyDisplayServing;

        if (item.category === 'fruits') {
            // Limit fruits to reasonable portions
            finalServing = Math.min(newServing, 1.5);
            finalDisplayServing = Math.min(friendlyDisplayServing, 1.5);
        } else if (item.category === 'condiments') {
            // Limit condiments scaling
            finalServing = Math.min(newServing, item.serving * 1.5);
            finalDisplayServing = Math.min(friendlyDisplayServing, parseFloat(item.displayServing || '1') * 1.5);
            finalDisplayServing = roundToUserFriendly(finalDisplayServing, item.displayUnit);
        }

        return {
            ...item,
            serving: finalServing,
            displayServing: finalDisplayServing < 0.25 ? '0.25' : finalDisplayServing.toString(),
            displayUnit: standardizeDisplayUnit(finalDisplayServing, item.displayUnit)
        };
    }

    /**
     * Calculate total calories in a meal plan
     */
    calculatePlanCalories(mealPlan) {
        return mealPlan.allMeals.reduce((total, meal) => {
            return total + meal.items.reduce((mealTotal, item) => {
                const foodData = getFoodNutrition(item.food, item.category);
                return mealTotal + (foodData.calories * item.serving);
            }, 0);
        }, 0);
    }

    /**
     * Calculate nutritional breakdown for a meal plan
     */
    calculateNutritionBreakdown(mealPlan) {
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalSugar = 0;
        let totalCalories = 0;

        mealPlan.allMeals.forEach(meal => {
            meal.items.forEach(item => {
                const foodData = getFoodNutrition(item.food, item.category);
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

            // Calculate percentages
            proteinPercent: Math.round((totalProtein * 4 / totalCalories) * 100),
            carbsPercent: Math.round((totalCarbs * 4 / totalCalories) * 100),
            fatPercent: Math.round((totalFat * 9 / totalCalories) * 100)
        };
    }

    /**
     * Enhance meal plan with additional metadata
     */
    enhanceMealPlan(mealPlan, options) {
        const enhanced = {
            ...mealPlan,

            // Generation metadata
            generatedAt: new Date().toISOString(),
            planId: `${options.goal}-${options.eaterType}-${options.mealFreq}${options.dietaryFilters.length ? '-' + options.dietaryFilters.join('-') : ''}`,

            // User preferences
            userPreferences: {
                goal: options.goal,
                eaterType: options.eaterType,
                mealFreq: options.mealFreq,
                dietaryFilters: options.dietaryFilters
            },

            // Nutritional analysis
            nutrition: this.calculateNutritionBreakdown(mealPlan),

            // Calculate fruit count
            fruitCount: this.calculateFruitCount(mealPlan)
        };

        return enhanced;
    }

    /**
     * Calculate total fruit servings in the plan
     */
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

    /**
     * Get fallback meal plan for error cases
     */
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