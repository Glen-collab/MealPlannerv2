// MealNameCompatibilityLayer.js - Ensures perfect compatibility between systems
// This bridges your existing MealTracker with the new Enhanced 5-Option system

/**
 * 🔗 MEAL NAME MAPPING SYSTEM
 * 
 * Your MealTracker.jsx uses these meal configurations:
 * - breakfast: '🥞 Breakfast'
 * - firstSnack: '🍎 First Snack' 
 * - secondSnack: '🥨 Second Snack'
 * - lunch: '🍽️ Lunch'
 * - midAfternoon: '☕ Mid-Afternoon Snack'
 * - dinner: '🍽️ Dinner'
 * - lateSnack: '🌙 Late Snack'
 * - postWorkout: '💪 Post Workout'
 */

// ===== EXACT MEAL NAME MAPPINGS =====
export const MealNameMapping = {
    // Maps Enhanced system names to your MealTracker names
    enhancedToTracker: {
        'Breakfast': 'Breakfast',
        'FirstSnack': 'FirstSnack',           // Maps to firstSnack config
        'SecondSnack': 'SecondSnack',         // Maps to secondSnack config  
        'Lunch': 'Lunch',
        'MidAfternoon Snack': 'MidAfternoon Snack',  // Maps to midAfternoon config
        'Dinner': 'Dinner',
        'Late Snack': 'Late Snack',          // Maps to lateSnack config
        'PostWorkout': 'PostWorkout'         // Maps to postWorkout config
    },

    // Maps your MealTracker names to Enhanced system names
    trackerToEnhanced: {
        'Breakfast': 'Breakfast',
        'FirstSnack': 'FirstSnack',
        'SecondSnack': 'SecondSnack',
        'Lunch': 'Lunch',
        'MidAfternoon Snack': 'MidAfternoon Snack',
        'Dinner': 'Dinner',
        'Late Snack': 'Late Snack',
        'PostWorkout': 'PostWorkout'
    },

    // Maps to your MEAL_CONFIG keys for proper time/color assignment
    mealConfigKeys: {
        'Breakfast': 'breakfast',
        'FirstSnack': 'firstSnack',
        'SecondSnack': 'secondSnack',
        'Lunch': 'lunch',
        'MidAfternoon Snack': 'midAfternoon',
        'Dinner': 'dinner',
        'Late Snack': 'lateSnack',
        'PostWorkout': 'postWorkout'
    }
};

// ===== MEAL TIME ASSIGNMENTS (matching your MealTracker config) =====
export const MealTimeAssignments = {
    3: [
        { name: 'Breakfast', time: '7:00 AM', configKey: 'breakfast' },
        { name: 'Lunch', time: '1:00 PM', configKey: 'lunch' },
        { name: 'Dinner', time: '7:00 PM', configKey: 'dinner' }
    ],
    5: [
        { name: 'Breakfast', time: '7:00 AM', configKey: 'breakfast' },
        { name: 'FirstSnack', time: '10:00 AM', configKey: 'firstSnack' },
        { name: 'Lunch', time: '1:00 PM', configKey: 'lunch' },
        { name: 'MidAfternoon Snack', time: '4:00 PM', configKey: 'midAfternoon' },
        { name: 'Dinner', time: '7:30 PM', configKey: 'dinner' }
    ],
    6: [
        { name: 'Breakfast', time: '6:30 AM', configKey: 'breakfast' },
        { name: 'FirstSnack', time: '9:30 AM', configKey: 'firstSnack' },
        { name: 'SecondSnack', time: '11:30 AM', configKey: 'secondSnack' },
        { name: 'Lunch', time: '1:30 PM', configKey: 'lunch' },
        { name: 'MidAfternoon Snack', time: '4:30 PM', configKey: 'midAfternoon' },
        { name: 'Dinner', time: '7:30 PM', configKey: 'dinner' }
    ]
};

// ===== COMPATIBILITY LAYER CLASS =====
export class MealTrackerCompatibility {

    /**
     * 🔄 Convert Enhanced system meal plan to MealTracker format
     */
    static convertToMealTrackerFormat(enhancedMealPlan, userProfile = {}) {
        console.log('🔄 Converting Enhanced meal plan to MealTracker format...');

        const convertedPlan = {
            // Core meal data - matches what your MealTracker expects
            allMeals: enhancedMealPlan.allMeals.map(meal => ({
                mealName: this.ensureCompatibleMealName(meal.mealName),
                time: meal.time,
                items: meal.items.map(item => ({
                    id: item.id || this.generateId(),
                    category: item.category,
                    food: item.food,
                    serving: item.serving,
                    displayServing: item.displayServing,
                    displayUnit: item.displayUnit,

                    // Enhanced metadata for your system
                    expertSource: item.expertSource,
                    tier: item.tier,
                    wasLimited: item.wasLimited,
                    isProteinFocus: item.isProteinFocus,
                    addedBy: item.addedBy
                }))
            })),

            // Metadata for your system
            goalType: enhancedMealPlan.goalType || userProfile.goal,
            eaterType: enhancedMealPlan.eaterType || 'balanced',
            mealFrequency: enhancedMealPlan.allMeals.length,

            // Enhanced system metadata
            enhancedSystemData: {
                selectedVariation: enhancedMealPlan.selectedVariation,
                expertSource: enhancedMealPlan.expertSource,
                tierSystemApplied: enhancedMealPlan.tierSystemApplied,
                generatedWith: 'Enhanced5OptionSystem-v2'
            }
        };

        console.log('✅ Conversion complete:', convertedPlan);
        return convertedPlan;
    }

    /**
     * 🎯 Ensure meal name is compatible with your MealTracker
     */
    static ensureCompatibleMealName(mealName) {
        // Handle various naming conventions
        const normalizedName = mealName.trim();

        // Direct mapping
        if (MealNameMapping.enhancedToTracker[normalizedName]) {
            return MealNameMapping.enhancedToTracker[normalizedName];
        }

        // Handle alternative names
        const alternativeNames = {
            'Morning Snack': 'FirstSnack',
            'Mid-Morning': 'FirstSnack',
            'Pre-Lunch': 'SecondSnack',
            'Afternoon Snack': 'MidAfternoon Snack',
            'Pre-Workout': 'PostWorkout',
            'Post-Workout': 'PostWorkout',
            'Evening Snack': 'Late Snack',
            'Night Snack': 'Late Snack'
        };

        if (alternativeNames[normalizedName]) {
            return alternativeNames[normalizedName];
        }

        // Default fallback
        console.warn(`⚠️ Unknown meal name: ${normalizedName}, defaulting to Breakfast`);
        return 'Breakfast';
    }

    /**
     * 📊 Create meal structure for Enhanced system that matches your MealTracker
     */
    static createCompatibleMealStructure(mealFrequency) {
        const structure = MealTimeAssignments[mealFrequency];

        if (!structure) {
            console.warn(`⚠️ Unknown meal frequency: ${mealFrequency}, defaulting to 5 meals`);
            return MealTimeAssignments[5];
        }

        return structure.map(meal => ({
            name: meal.name,
            time: meal.time,
            configKey: meal.configKey
        }));
    }

    /**
     * 🔧 Validate meal plan compatibility
     */
    static validateCompatibility(mealPlan) {
        const issues = [];

        // Check meal names
        mealPlan.allMeals?.forEach((meal, index) => {
            if (!MealNameMapping.enhancedToTracker[meal.mealName]) {
                issues.push(`Meal ${index + 1}: Unknown meal name "${meal.mealName}"`);
            }
        });

        // Check required properties
        const requiredProps = ['allMeals'];
        requiredProps.forEach(prop => {
            if (!mealPlan[prop]) {
                issues.push(`Missing required property: ${prop}`);
            }
        });

        // Check meal items
        mealPlan.allMeals?.forEach((meal, mealIndex) => {
            meal.items?.forEach((item, itemIndex) => {
                const requiredItemProps = ['id', 'category', 'food', 'serving'];
                requiredItemProps.forEach(prop => {
                    if (!item[prop]) {
                        issues.push(`Meal ${mealIndex + 1}, Item ${itemIndex + 1}: Missing ${prop}`);
                    }
                });
            });
        });

        return {
            isValid: issues.length === 0,
            issues
        };
    }

    /**
     * 🚀 Create test meal plan data for integration testing
     */
    static createTestMealPlan() {
        return {
            allMeals: [
                {
                    mealName: 'Breakfast',
                    time: '7:00 AM',
                    items: [
                        {
                            id: this.generateId(),
                            category: 'carbohydrate',
                            food: 'Oats (dry)',
                            serving: 0.5,
                            displayServing: '1/2',
                            displayUnit: 'cup',
                            expertSource: 'Bodybuilding.com',
                            tier: 3,
                            wasLimited: false
                        },
                        {
                            id: this.generateId(),
                            category: 'fruits',
                            food: 'Banana',
                            serving: 1,
                            displayServing: '1',
                            displayUnit: 'medium',
                            expertSource: 'T-Nation',
                            tier: 4,
                            wasLimited: false
                        }
                    ]
                },
                {
                    mealName: 'Lunch',
                    time: '1:00 PM',
                    items: [
                        {
                            id: this.generateId(),
                            category: 'protein',
                            food: 'Chicken Breast',
                            serving: 1.5,
                            displayServing: '5.25',
                            displayUnit: 'oz',
                            expertSource: 'Bodybuilding.com',
                            tier: 1,
                            wasLimited: false
                        }
                    ]
                }
            ],
            goalType: 'maintain',
            eaterType: 'balanced',
            mealFrequency: 2,
            enhancedSystemData: {
                selectedVariation: 1,
                expertSource: 'Test System',
                generatedWith: 'Enhanced5OptionSystem-v2'
            }
        };
    }

    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

// ===== INTEGRATION WRAPPER FOR YOUR APP =====
export class Enhanced5OptionIntegration {

    constructor() {
        this.compatibility = MealTrackerCompatibility;
    }

    /**
     * 🎯 Main integration function - call this from your handleAddWeekPlan
     */
    async integrateEnhancedMealPlan(userProfile, onAddToMealTracker, onShowSuccess) {
        console.log('🚀 Starting Enhanced 5-Option integration...');

        try {
            // Step 1: Generate 5 options (you'll import this from Enhanced5OptionMealGenerator)
            const { SmartRecommendationSystem } = await import('./Enhanced5OptionMealGenerator.js');
            const smartSystem = new SmartRecommendationSystem();

            const enhancedOptions = smartSystem.getRecommendedPlans(userProfile);

            // Step 2: Let user select from 5 options (you'll use EnhancedWeekPlanModal for this)
            console.log(`✅ Generated ${enhancedOptions.variations.length} meal plan options`);

            // For now, auto-select first option for testing
            const selectedOption = enhancedOptions.variations[0];

            // Step 3: Convert to MealTracker format
            const compatibleMealPlan = this.compatibility.convertToMealTrackerFormat(
                selectedOption,
                userProfile
            );

            // Step 4: Validate compatibility
            const validation = this.compatibility.validateCompatibility(compatibleMealPlan);

            if (!validation.isValid) {
                console.error('❌ Compatibility issues:', validation.issues);
                throw new Error(`Compatibility issues: ${validation.issues.join(', ')}`);
            }

            // Step 5: Add to your MealTracker
            onAddToMealTracker(compatibleMealPlan);

            // Step 6: Show success message
            onShowSuccess(`Added "${selectedOption.name}" meal plan with ${compatibleMealPlan.allMeals.length} meals!`);

            console.log('✅ Enhanced meal plan integration complete!');
            return compatibleMealPlan;

        } catch (error) {
            console.error('❌ Enhanced integration failed:', error);
            throw error;
        }
    }

    /**
     * 🧪 Test the integration without affecting your app
     */
    async testIntegration() {
        console.log('🧪 Testing Enhanced 5-Option integration...');

        const testUserProfile = {
            goal: 'maintain',
            gender: 'male',
            fitnessLevel: 'intermediate',
            dietaryRestrictions: []
        };

        try {
            const testMealPlan = await this.integrateEnhancedMealPlan(
                testUserProfile,
                (mealPlan) => console.log('✅ Would add to MealTracker:', mealPlan),
                (message) => console.log('✅ Would show success:', message)
            );

            console.log('🎯 Integration test PASSED!');
            return testMealPlan;

        } catch (error) {
            console.error('❌ Integration test FAILED:', error);
            throw error;
        }
    }
}

// ===== STEP-BY-STEP INTEGRATION GUIDE =====
export const IntegrationSteps = {

    step1: {
        title: "1. Add Compatibility Layer",
        description: "Add this file to your project",
        code: `
// Save as: src/mealPlanning/MealNameCompatibilityLayer.js
// This file bridges your existing MealTracker with Enhanced system
        `
    },

    step2: {
        title: "2. Add Enhanced Files",
        description: "Add the Enhanced system files",
        files: [
            "Enhanced5OptionMealGenerator.js",
            "EnhancedWeekPlanModal.jsx"
        ]
    },

    step3: {
        title: "3. Create Test Integration Button",
        description: "Add this to your App.jsx to test",
        code: `
// In your App.jsx, add this test button:

import { Enhanced5OptionIntegration } from './mealPlanning/MealNameCompatibilityLayer.js';

const TestEnhancedSystem = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const testSystem = async () => {
        setIsLoading(true);
        try {
            const integration = new Enhanced5OptionIntegration();
            await integration.testIntegration();
            alert('✅ Enhanced system test passed!');
        } catch (error) {
            alert('❌ Test failed: ' + error.message);
        }
        setIsLoading(false);
    };

    return (
        <button 
            onClick={testSystem}
            disabled={isLoading}
            className="bg-green-500 text-white p-2 rounded m-2"
        >
            {isLoading ? '🔄 Testing...' : '🧪 Test Enhanced System'}
        </button>
    );
};
        `
    },

    step4: {
        title: "4. Integrate with Existing handleAddWeekPlan",
        description: "Modify your existing function",
        code: `
// In your App.jsx, modify handleAddWeekPlan:

const handleAddWeekPlan = async (enhancedPlanData) => {
    console.log('📥 Received meal plan data:', enhancedPlanData);
    
    try {
        // If it's from the enhanced system, it's already converted
        if (enhancedPlanData.enhancedSystemData) {
            console.log('✅ Enhanced system data detected');
            
            // Add to your existing meal state structure
            const newMeals = {};
            
            enhancedPlanData.allMeals.forEach(meal => {
                const mealType = MealNameMapping.mealConfigKeys[meal.mealName];
                if (mealType) {
                    newMeals[mealType] = {
                        time: meal.time,
                        items: meal.items,
                        totals: calculateMealTotals(meal.items), // Your existing function
                        pieData: calculatePieData(meal.items)   // Your existing function
                    };
                }
            });

            // Update your meal state
            setMeals(prevMeals => ({
                ...prevMeals,
                ...newMeals
            }));

            // Show success message
            showSuccessMessage(\`Added "\${enhancedPlanData.enhancedSystemData.expertSource}" meal plan!\`);
            
        } else {
            // Handle old format (existing functionality)
            console.log('📋 Processing standard meal plan format');
            // Your existing handleAddWeekPlan logic here
        }
        
    } catch (error) {
        console.error('❌ Error adding meal plan:', error);
        showErrorMessage('Failed to add meal plan: ' + error.message);
    }
};
        `
    },

    step5: {
        title: "5. Add Enhanced Button to UI",
        description: "Create new enhanced meal planning button",
        code: `
// In your App.jsx, add alongside existing Week Plan button:

<button 
    onClick={() => setShowEnhancedWeekPlan(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
>
    🎯 Enhanced Meal Plans (5 Options)
</button>

// Add the modal:
{showEnhancedWeekPlan && (
    <EnhancedWeekPlanModal
        isOpen={showEnhancedWeekPlan}
        onClose={() => setShowEnhancedWeekPlan(false)}
        onAddWeekPlan={handleAddWeekPlan}
        userProfile={userProfile}
        calorieData={calorieData}
    />
)}
        `
    }
};

// Export everything
export default {
    MealNameMapping,
    MealTimeAssignments,
    MealTrackerCompatibility,
    Enhanced5OptionIntegration,
    IntegrationSteps
};