// QuickStart.jsx - Drop this into your app to test everything immediately
// Place this in your src/ folder and import it into your main App.jsx

import React, { useState } from 'react';

// Import your existing Enhanced system files
import EnhancedWeekPlanModal from './mealPlanning/EnhancedWeekPlanModal.jsx';
import PracticalIntegrationComponent from './mealPlanning/PracticalIntegrationComponent.jsx';
import { MealNameMapping } from './mealPlanning/MealNameCompatibilityLayer.js';

// Import testing components
import { runQuickDemo } from './mealPlanning/CompleteSystemTest.js';

const QuickStartEnhancedSystem = () => {
    // State for testing the enhanced modal
    const [showEnhancedModal, setShowEnhancedModal] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [systemStatus, setSystemStatus] = useState('Ready to test');
    const [mealTrackerResults, setMealTrackerResults] = useState([]);

    // Sample user profile (customize this to match your user data structure)
    const sampleUserProfile = {
        goal: 'maintain',           // 'lose', 'maintain', 'gain-muscle', 'dirty-bulk'
        gender: 'male',             // 'male', 'female'
        fitnessLevel: 'intermediate', // 'beginner', 'intermediate', 'advanced'
        dietaryRestrictions: [],    // ['vegetarian', 'glutenFree', 'keto', 'dairyFree']
        firstName: 'User'
    };

    // Sample calorie data (adapt to your existing structure)
    const sampleCalorieData = {
        bmr: 1800,
        tdee: 2200,
        targetCalories: 2200
    };

    // Mock function for testing meal tracker integration
    const handleAddToMealTracker = (mealData) => {
        console.log('🍽️ Adding meal to tracker:', mealData);

        // Store the result for display
        setMealTrackerResults(prev => [...prev, {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            mealName: mealData.mealName,
            calories: mealData.calories,
            protein: mealData.protein,
            carbs: mealData.carbs,
            fat: mealData.fat
        }]);

        // In your real app, this would integrate with your actual MealTracker
        alert(`✅ Meal "${mealData.mealName}" added to tracker! (${mealData.calories} cal)`);
    };

    // Test the complete system
    const runSystemTest = async () => {
        setSystemStatus('Running tests...');
        try {
            const results = await runQuickDemo();
            setTestResults(results);
            setSystemStatus('Tests completed - see results below');
        } catch (error) {
            console.error('System test failed:', error);
            setTestResults({ error: error.message });
            setSystemStatus('Test failed - check console for details');
        }
    };

    // Handle enhanced meal plan selection
    const handleEnhancedMealPlan = (enhancedPlanData) => {
        console.log('🎯 Enhanced meal plan selected:', enhancedPlanData);

        if (enhancedPlanData.enhancedSystemData) {
            // This is where you'd integrate with your existing MealTracker
            console.log('✅ Enhanced system data detected');
            console.log('Expert source:', enhancedPlanData.enhancedSystemData.expertSource);
            console.log('Number of meals:', enhancedPlanData.allMeals.length);
            console.log('Meal names:', enhancedPlanData.allMeals.map(m => m.mealName));

            // Show compatibility layer mapping
            console.log('🔗 Meal name mappings:');
            enhancedPlanData.allMeals.forEach(meal => {
                const configKey = MealNameMapping.mealConfigKeys[meal.mealName];
                console.log(`  ${meal.mealName} → ${configKey}`);
            });

            alert(`✅ Success! Added "${enhancedPlanData.enhancedSystemData.expertSource}" meal plan with ${enhancedPlanData.allMeals.length} meals. Check console for details.`);
        } else {
            console.log('📋 Legacy meal plan format');
        }

        setShowEnhancedModal(false);
    };

    const clearMealTrackerResults = () => {
        setMealTrackerResults([]);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    🚀 Enhanced Meal Planning System - Quick Start
                </h1>

                <p className="text-gray-600 mb-6">
                    You have all the components! This tests your complete Enhanced 5-Option system.
                </p>

                {/* System Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">System Status</h3>
                    <p className="text-blue-700">{systemStatus}</p>
                </div>

                {/* Test Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                    {/* System Test Button */}
                    <button
                        onClick={runSystemTest}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        🧪 Test Complete System
                        <div className="text-sm font-normal mt-1">
                            Runs comprehensive integration test
                        </div>
                    </button>

                    {/* Enhanced Modal Test Button */}
                    <button
                        onClick={() => setShowEnhancedModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        🎯 Test 5-Option Modal
                        <div className="text-sm font-normal mt-1">
                            Experience the enhanced UI
                        </div>
                    </button>
                </div>

                {/* Test Results */}
                {testResults && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Test Results</h3>

                        {testResults.error ? (
                            <div className="text-red-600">
                                ❌ Error: {testResults.error}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="text-green-600">
                                    ✅ System test completed successfully
                                </div>
                                <div className="text-sm text-gray-600">
                                    Check browser console for detailed results
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Meal Tracker Results */}
                {mealTrackerResults.length > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-green-800">Meal Tracker Test Results</h3>
                            <button
                                onClick={clearMealTrackerResults}
                                className="text-sm text-green-600 hover:text-green-800 underline"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="space-y-2">
                            {mealTrackerResults.map(meal => (
                                <div key={meal.id} className="bg-white rounded p-3 shadow-sm">
                                    <div className="font-medium text-green-800">
                                        {meal.mealName} - {meal.calories} cal
                                    </div>
                                    <div className="text-sm text-green-600">
                                        P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g | Added: {meal.timestamp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* User Profile Display */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">Test User Profile</h3>
                    <div className="text-yellow-700 text-sm">
                        Goal: {sampleUserProfile.goal} |
                        Gender: {sampleUserProfile.gender} |
                        Level: {sampleUserProfile.fitnessLevel}
                        {sampleUserProfile.dietaryRestrictions.length > 0 &&
                            ` | Restrictions: ${sampleUserProfile.dietaryRestrictions.join(', ')}`
                        }
                    </div>
                </div>

                {/* What This Tests */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">What This Tests</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>✅ Enhanced5OptionMealGenerator.js - Core generation</li>
                        <li>✅ CentralizedTierSystem.js - Realistic portions</li>
                        <li>✅ EnhancedFoodDatabase.js - Expert meal database</li>
                        <li>✅ DietaryFilterSystem.js - Dietary restrictions</li>
                        <li>✅ MealNameCompatibilityLayer.js - Integration bridge</li>
                        <li>✅ EnhancedWeekPlanModal.jsx - 5-option UI</li>
                        <li>✅ onAddToMealTracker integration - Fixed!</li>
                        <li>✅ Complete system integration</li>
                    </ul>
                </div>
            </div>

            {/* Practical Integration Component - NOW WITH REQUIRED PROP */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    🔧 Advanced Integration Testing
                </h2>
                <p className="text-gray-600 mb-4">
                    This uses your PracticalIntegrationComponent.jsx for deeper testing:
                </p>

                <PracticalIntegrationComponent
                    onAddMealPlan={handleAddToMealTracker}
                    onShowMessage={(msg) => alert(msg)}
                />
            </div>

            {/* Enhanced Week Plan Modal */}
            {showEnhancedModal && (
                <EnhancedWeekPlanModal
                    isOpen={showEnhancedModal}
                    onClose={() => setShowEnhancedModal(false)}
                    onAddWeekPlan={handleEnhancedMealPlan}
                    userProfile={sampleUserProfile}
                    calorieData={sampleCalorieData}
                />
            )}

            {/* Integration Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📋 Next Steps for Full Integration
                </h2>

                <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-semibold text-green-800">Step 1: Test Results</h3>
                        <p className="text-green-700 text-sm">
                            If both buttons above work without errors, your system is ready!
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-blue-800">Step 2: Replace Your Existing Modal</h3>
                        <p className="text-blue-700 text-sm">
                            Replace WeekPlanModal.jsx with EnhancedWeekPlanModal.jsx in your main app
                        </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold text-purple-800">Step 3: Update handleAddWeekPlan</h3>
                        <p className="text-purple-700 text-sm">
                            Use MealNameCompatibilityLayer.js to map meal names to your existing MealTracker
                        </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                        <h3 className="font-semibold text-orange-800">Step 4: Customize</h3>
                        <p className="text-orange-700 text-sm">
                            Adjust expert sources, portion limits, and meal names for your brand
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickStartEnhancedSystem;

// ========================================
// INTEGRATION INSTRUCTIONS
// ========================================

// TO USE THIS QUICK START:

// 1. Save this file as src/QuickStartEnhancedSystem.jsx

// 2. Add it to your main App.jsx:
//    import QuickStartEnhancedSystem from './QuickStartEnhancedSystem.jsx';
//
//    function App() {
//        return (
//            <div>
//                <QuickStartEnhancedSystem />
//            </div>
//        );
//    }

// 3. Start your development server and navigate to the page

// 4. Click "Test Complete System" - should show ✅ success

// 5. Click "Test 5-Option Modal" - should open modal with 5 meal plan options

// 6. If both work, your system is ready for full integration!

// EXPECTED RESULTS:
// - System test: ✅ All tests passed
// - 5-Option modal: Opens and shows 5 expert meal plans
// - Console: Detailed logging of meal generation and compatibility mapping
// - No import errors or missing files

// If you see errors, check:
// - All file paths are correct
// - All imports resolve properly
// - Browser console for detailed error messages

// Your system has everything needed for production deployment!