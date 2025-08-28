// IntegrationHelper.js - Complete wiring of Enhanced 5-Option System
// Place this in src/mealPlanning/IntegrationHelper.js

import { SmartRecommendationSystem } from './Enhanced5OptionMealGenerator.js';
import { MealNameMapping } from './MealNameCompatibilityLayer.js';
import { TierSystemManager } from './CentralizedTierSystem.js';

/**
 * 🎯 COMPLETE INTEGRATION HELPER
 * This class handles all the wiring between components
 */
export class EnhancedMealPlanIntegration {
    constructor() {
        this.smartSystem = new SmartRecommendationSystem();
    }

    /**
     * Main function to generate 5 options and handle user selection
     */
    async generateEnhancedOptions(userProfile) {
        console.log('🚀 Generating 5 enhanced meal plan options...');

        try {
            // Generate 5 curated options using smart system
            const options = this.smartSystem.getRecommendedPlans(userProfile);

            console.log(`✅ Generated ${options.variations.length} options from expert sources`);

            return {
                success: true,
                options: options,
                message: `Generated ${options.variations.length} expert meal plans`,
                expertSources: options.variations.map(v => v.expertSource)
            };

        } catch (error) {
            console.error('❌ Error generating enhanced options:', error);

            return {
                success: false,
                error: error.message,
                fallbackOptions: this.getFallbackOptions(userProfile)
            };
        }
    }

    /**
     * Convert selected option to MealTracker format
     */
    convertToMealTrackerFormat(selectedOption, userProfile) {
        console.log('🔄 Converting enhanced option to MealTracker format...');

        try {
            // Apply tier system limits based on gender
            const gender = userProfile.gender || 'male';
            const tierLimitedPlan = TierSystemManager.applyLimitsToMealPlan(
                { allMeals: selectedOption.allMeals },
                gender
            );

            // Create MealTracker compatible format
            const mealTrackerData = {
                allMeals: tierLimitedPlan.allMeals,

                // Core metadata
                goalType: userProfile.goal,
                eaterType: selectedOption.expertSource,
                mealFrequency: selectedOption.allMeals.length,

                // Enhanced system metadata
                enhancedSystemData: {
                    selectedVariation: selectedOption.variation,
                    expertSource: selectedOption.expertSource,
                    difficulty: selectedOption.difficulty,
                    popularity: selectedOption.popularity,
                    tierSystemApplied: tierLimitedPlan.tierSystemApplied,
                    generatedWith: 'Enhanced5OptionSystem-v2',
                    userProfile: userProfile
                }
            };

            console.log('✅ Conversion successful');
            return mealTrackerData;

        } catch (error) {
            console.error('❌ Error converting to MealTracker format:', error);
            throw new Error(`Conversion failed: ${error.message}`);
        }
    }

    /**
     * Create meal state object for your existing state structure
     */
    createMealStateObject(enhancedPlanData, calculateTotals, calculatePieData) {
        console.log('📊 Creating meal state objects...');

        const newMeals = {};

        enhancedPlanData.allMeals.forEach(meal => {
            // Use compatibility layer to map meal names
            const configKey = MealNameMapping.mealConfigKeys[meal.mealName];

            if (configKey) {
                newMeals[configKey] = {
                    time: meal.time,
                    items: meal.items,
                    totals: calculateTotals(meal.items),
                    pieData: calculatePieData(meal.items),
                    warnings: [],

                    // Enhanced metadata
                    expertSource: enhancedPlanData.enhancedSystemData?.expertSource,
                    tierCompliant: true,
                    variation: enhancedPlanData.enhancedSystemData?.selectedVariation,
                    difficulty: enhancedPlanData.enhancedSystemData?.difficulty
                };
            } else {
                console.warn(`⚠️ Unknown meal name: ${meal.mealName}`);
            }
        });

        console.log(`✅ Created ${Object.keys(newMeals).length} meal state objects`);
        return newMeals;
    }

    /**
     * Get fallback options if main system fails
     */
    getFallbackOptions(userProfile) {
        return [
            {
                id: 'fallback-1',
                name: 'Simple Balanced Plan',
                description: 'Basic nutrition plan with balanced macros',
                difficulty: 1,
                popularity: 85,
                expertSource: 'Nutrition Basics',
                allMeals: [
                    {
                        mealName: 'Breakfast',
                        time: '8:00 AM',
                        items: [
                            {
                                id: 'fb1',
                                food: 'Oats (dry)',
                                category: 'carbohydrate',
                                serving: userProfile.gender === 'female' ? 0.5 : 0.75,
                                displayServing: userProfile.gender === 'female' ? '1/2' : '3/4',
                                displayUnit: 'cup'
                            }
                        ]
                    }
                ]
            }
        ];
    }

    /**
     * Validate system integration
     */
    validateIntegration() {
        console.log('🔍 Validating Enhanced System integration...');

        const checks = [
            { name: 'SmartRecommendationSystem', check: () => !!this.smartSystem },
            { name: 'MealNameMapping', check: () => !!MealNameMapping.mealConfigKeys },
            { name: 'TierSystemManager', check: () => !!TierSystemManager.applyLimitsToMealPlan },
        ];

        const results = checks.map(({ name, check }) => ({
            component: name,
            status: check() ? '✅ Ready' : '❌ Missing'
        }));

        const allPassed = results.every(r => r.status.includes('✅'));

        console.log('Integration validation results:', results);

        return {
            valid: allPassed,
            results: results,
            message: allPassed ?
                '✅ All components ready for integration' :
                '❌ Some components missing or misconfigured'
        };
    }
}

/**
 * 🚀 ENHANCED WEEK PLAN HANDLER
 * Drop-in replacement for your existing handleAddWeekPlan
 */
export const createEnhancedWeekPlanHandler = (setMeals, calculateTotals, calculatePieData, showSuccessMessage) => {
    const integration = new EnhancedMealPlanIntegration();

    return async (enhancedPlanData) => {
        console.log('📥 Enhanced Week Plan Handler - Received data:', enhancedPlanData);

        try {
            // Check if it's Enhanced system data
            if (enhancedPlanData.enhancedSystemData) {
                console.log('✅ Enhanced 5-Option system data detected');

                // Create meal state objects
                const newMeals = integration.createMealStateObject(
                    enhancedPlanData,
                    calculateTotals,
                    calculatePieData
                );

                // Update meal state
                setMeals(prevMeals => ({
                    ...prevMeals,
                    ...newMeals
                }));

                // Show success message
                const expertSource = enhancedPlanData.enhancedSystemData.expertSource;
                const mealCount = enhancedPlanData.allMeals.length;
                const variation = enhancedPlanData.enhancedSystemData.selectedVariation;

                showSuccessMessage(
                    `✅ Added "${expertSource}" meal plan (Variation ${variation}) with ${mealCount} meals!`
                );

                console.log(`🎯 Success: Added ${expertSource} plan with ${mealCount} meals`);

            } else {
                // Handle legacy format
                console.log('📋 Processing legacy meal plan format');
                // Your existing handleAddWeekPlan logic here
            }

        } catch (error) {
            console.error('❌ Error in enhanced week plan handler:', error);
            showSuccessMessage(`❌ Error adding meal plan: ${error.message}`);
        }
    };
};

/**
 * 🧪 COMPLETE SYSTEM TESTER
 * Use this to verify everything is wired correctly
 */
export class SystemTester {
    static async runCompleteTest() {
        console.log('\n🧪 RUNNING COMPLETE SYSTEM INTEGRATION TEST\n');

        const integration = new EnhancedMealPlanIntegration();
        let testsPassed = 0;
        let totalTests = 0;

        // Test 1: Validate Integration
        totalTests++;
        console.log('Test 1: Validating integration...');
        const validation = integration.validateIntegration();
        if (validation.valid) {
            console.log('✅ Integration validation passed');
            testsPassed++;
        } else {
            console.log('❌ Integration validation failed');
        }

        // Test 2: Generate Options
        totalTests++;
        console.log('Test 2: Generating enhanced options...');
        const testProfile = {
            goal: 'maintain',
            gender: 'male',
            fitnessLevel: 'intermediate',
            dietaryRestrictions: []
        };

        const optionsResult = await integration.generateEnhancedOptions(testProfile);
        if (optionsResult.success && optionsResult.options.variations.length === 5) {
            console.log(`✅ Generated ${optionsResult.options.variations.length} options`);
            testsPassed++;
        } else {
            console.log('❌ Option generation failed');
        }

        // Test 3: Conversion
        if (optionsResult.success) {
            totalTests++;
            console.log('Test 3: Converting to MealTracker format...');
            try {
                const selectedOption = optionsResult.options.variations[0];
                const converted = integration.convertToMealTrackerFormat(selectedOption, testProfile);

                if (converted.allMeals && converted.enhancedSystemData) {
                    console.log('✅ Conversion successful');
                    testsPassed++;
                } else {
                    console.log('❌ Conversion missing required data');
                }
            } catch (error) {
                console.log(`❌ Conversion failed: ${error.message}`);
            }
        }

        // Results
        console.log(`\n📊 TEST RESULTS: ${testsPassed}/${totalTests} tests passed`);

        if (testsPassed === totalTests) {
            console.log('🎉 ALL TESTS PASSED - System ready for integration!');
            return { success: true, message: 'System integration successful' };
        } else {
            console.log('⚠️ Some tests failed - check logs for details');
            return { success: false, message: `${totalTests - testsPassed} tests failed` };
        }
    }
}

// Export the main integration class and helper functions
export default EnhancedMealPlanIntegration;