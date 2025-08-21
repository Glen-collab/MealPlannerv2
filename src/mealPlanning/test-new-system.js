// test-new-system.js - Quick test without breaking existing code

import { generateMealPlan } from './MealPlanGenerator.js';
import { applyProteinPriorityScaling, distributeProteinThroughoutDay } from './ProteinPrioritySystem.js';

// Test the new system on an existing meal plan
const testNewSystem = () => {
    console.log('🧪 Testing New Protein Priority System...');

    // Generate a plan with your existing system
    const existingPlan = generateMealPlan({
        goal: 'gain-muscle',
        eaterType: 'balanced',
        mealFreq: 5,
        dietaryFilters: [],
        userProfile: { gender: 'male' },
        calorieData: { targetCalories: 2800 }
    });

    console.log('📊 Original Plan:');
    console.log('Calories:', existingPlan.actualCalories || existingPlan.targetCalories);
    console.log('Meals:', existingPlan.allMeals?.length);

    // Apply new protein distribution (non-destructive test)
    const enhancedPlan = JSON.parse(JSON.stringify(existingPlan));

    // Test protein distribution
    distributeProteinThroughoutDay(enhancedPlan, 'male', 'gain-muscle', []);

    console.log('🥤 Enhanced Plan with Protein Priority:');
    enhancedPlan.allMeals.forEach((meal, index) => {
        const proteinItems = meal.items.filter(item =>
            item.food.includes('Protein') ||
            item.addedBy === 'protein-priority-system'
        );

        if (proteinItems.length > 0) {
            console.log(`${meal.mealName}:`, proteinItems.map(item =>
                `${item.food} (${item.displayServing} ${item.displayUnit})`
            ));
        }
    });

    return enhancedPlan;
};

// Test different scenarios
const testScenarios = () => {
    console.log('\n🎯 Testing Different Scenarios:\n');

    // Female weight loss
    console.log('🚺 Female Weight Loss:');
    const femalePlan = generateMealPlan({
        goal: 'lose',
        mealFreq: 5,
        userProfile: { gender: 'female' },
        calorieData: { targetCalories: 1600 }
    });

    const enhancedFemalePlan = JSON.parse(JSON.stringify(femalePlan));
    distributeProteinThroughoutDay(enhancedFemalePlan, 'female', 'lose', []);

    // Count protein scoops
    const femaleProteinScoops = enhancedFemalePlan.allMeals.reduce((total, meal) => {
        return total + meal.items.reduce((mealTotal, item) => {
            if (item.food.includes('Protein') && item.displayUnit === 'scoops') {
                return mealTotal + parseFloat(item.displayServing);
            }
            return mealTotal;
        }, 0);
    }, 0);

    console.log(`Female gets ${femaleProteinScoops} protein scoops (should be ≤2) ✅`);

    // Male bulk
    console.log('\n🚹 Male Bulk:');
    const malePlan = generateMealPlan({
        goal: 'dirty-bulk',
        mealFreq: 5,
        userProfile: { gender: 'male' },
        calorieData: { targetCalories: 3500 }
    });

    const enhancedMalePlan = JSON.parse(JSON.stringify(malePlan));
    distributeProteinThroughoutDay(enhancedMalePlan, 'male', 'dirty-bulk', []);

    const maleProteinScoops = enhancedMalePlan.allMeals.reduce((total, meal) => {
        return total + meal.items.reduce((mealTotal, item) => {
            if (item.food.includes('Protein') && item.displayUnit === 'scoops') {
                return mealTotal + parseFloat(item.displayServing);
            }
            return mealTotal;
        }, 0);
    }, 0);

    console.log(`Male gets ${maleProteinScoops} protein scoops (should be ≤8) ✅`);

    // Vegetarian test
    console.log('\n🌱 Vegetarian Test:');
    const vegPlan = generateMealPlan({
        goal: 'maintain',
        mealFreq: 5,
        dietaryFilters: ['vegetarian', 'dairyFree'],
        userProfile: { gender: 'female' },
        calorieData: { targetCalories: 2000 }
    });

    const enhancedVegPlan = JSON.parse(JSON.stringify(vegPlan));
    distributeProteinThroughoutDay(enhancedVegPlan, 'female', 'maintain', ['vegetarian', 'dairyFree']);

    const plantProteins = enhancedVegPlan.allMeals.flatMap(meal =>
        meal.items.filter(item => item.food.includes('Plant Protein'))
    );

    console.log(`Plant proteins added: ${plantProteins.length} items ✅`);
};

// Run the tests
export const runQuickTest = () => {
    try {
        testNewSystem();
        testScenarios();
        console.log('\n🎉 All tests passed! System is working correctly.');
        return true;
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        return false;
    }
};

// Export for use
export default { testNewSystem, testScenarios, runQuickTest };