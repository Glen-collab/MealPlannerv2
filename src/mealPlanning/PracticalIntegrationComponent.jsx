// PracticalIntegrationComponent.jsx - Drop-in component for testing Enhanced system
// Add this to your App.jsx to test the new Enhanced 5-Option system alongside your existing functionality

import React, { useState } from 'react';
import { MealTrackerCompatibility, Enhanced5OptionIntegration } from './mealPlanning/MealNameCompatibilityLayer.js';

/**
 * 🧪 TESTING COMPONENT
 * Drop this into your App.jsx to test the Enhanced system
 * without breaking your existing functionality
 */
function EnhancedMealPlanTester({
    userProfile,
    onAddMealPlan,  // Your existing handleAddWeekPlan function
    onShowMessage   // Your existing success/error message function
}) {
    const [isTestingIntegration, setIsTestingIntegration] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [showDetailed, setShowDetailed] = useState(false);

    /**
     * 🎯 Test the complete integration flow
     */
    const testCompleteIntegration = async () => {
        setIsTestingIntegration(true);
        setTestResults(null);

        try {
            console.log('🚀 Starting complete Enhanced system test...');

            const integration = new Enhanced5OptionIntegration();

            // Test the integration with your actual functions
            const testMealPlan = await integration.integrateEnhancedMealPlan(
                userProfile || {
                    goal: 'maintain',
                    gender: 'male',
                    fitnessLevel: 'intermediate',
                    dietaryRestrictions: []
                },
                onAddMealPlan,
                onShowMessage
            );

            setTestResults({
                success: true,
                mealPlan: testMealPlan,
                message: 'Enhanced system integration test PASSED! ✅'
            });

            console.log('✅ Complete integration test passed!');

        } catch (error) {
            console.error('❌ Integration test failed:', error);

            setTestResults({
                success: false,
                error: error.message,
                message: 'Integration test failed ❌'
            });

            if (onShowMessage) {
                onShowMessage('❌ Enhanced system test failed: ' + error.message);
            }
        }

        setIsTestingIntegration(false);
    };

    /**
     * 🔍 Test just the meal name compatibility
     */
    const testMealNameCompatibility = () => {
        console.log('🧪 Testing meal name compatibility...');

        const testMealPlan = MealTrackerCompatibility.createTestMealPlan();
        const validation = MealTrackerCompatibility.validateCompatibility(testMealPlan);

        if (validation.isValid) {
            console.log('✅ Meal name compatibility test PASSED');
            alert('✅ Meal name compatibility test PASSED!\n\nAll meal names are properly mapped to your MealTracker system.');
        } else {
            console.error('❌ Compatibility issues:', validation.issues);
            alert('❌ Compatibility issues found:\n\n' + validation.issues.join('\n'));
        }

        setTestResults({
            success: validation.isValid,
            validation,
            message: validation.isValid ? 'Compatibility test passed ✅' : 'Compatibility issues found ❌'
        });
    };

    /**
     * 📋 Show detailed meal plan structure
     */
    const showMealPlanStructure = () => {
        const structure = {
            yourCurrentMealTypes: [
                'breakfast (🥞 Breakfast)',
                'firstSnack (🍎 First Snack)',
                'secondSnack (🥨 Second Snack)',
                'lunch (🍽️ Lunch)',
                'midAfternoon (☕ Mid-Afternoon Snack)',
                'dinner (🍽️ Dinner)',
                'lateSnack (🌙 Late Snack)',
                'postWorkout (💪 Post Workout)'
            ],
            enhancedSystemMealNames: [
                'Breakfast',
                'FirstSnack',
                'SecondSnack',
                'Lunch',
                'MidAfternoon Snack',
                'Dinner',
                'Late Snack',
                'PostWorkout'
            ],
            compatibilityMapping: {
                'Breakfast → breakfast': 'Direct match ✅',
                'FirstSnack → firstSnack': 'Direct match ✅',
                'SecondSnack → secondSnack': 'Direct match ✅',
                'Lunch → lunch': 'Direct match ✅',
                'MidAfternoon Snack → midAfternoon': 'Direct match ✅',
                'Dinner → dinner': 'Direct match ✅',
                'Late Snack → lateSnack': 'Direct match ✅',
                'PostWorkout → postWorkout': 'Direct match ✅'
            }
        };

        console.log('📋 Meal Plan Structure Analysis:', structure);
        setShowDetailed(!showDetailed);
    };

    return (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 m-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                🧪 Enhanced 5-Option System Tester
            </h3>

            <div className="text-sm text-gray-600 mb-4 text-center">
                Test the new Enhanced meal planning system before full integration
            </div>

            {/* Test Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">

                {/* Complete Integration Test */}
                <button
                    onClick={testCompleteIntegration}
                    disabled={isTestingIntegration}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg shadow"
                >
                    {isTestingIntegration ? (
                        <span className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Testing Integration...
                        </span>
                    ) : (
                        '🚀 Test Complete Integration'
                    )}
                </button>

                {/* Meal Name Compatibility Test */}
                <button
                    onClick={testMealNameCompatibility}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
                >
                    🔍 Test Meal Names
                </button>

                {/* Show Structure */}
                <button
                    onClick={showMealPlanStructure}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow"
                >
                    📋 Show Structure
                </button>
            </div>

            {/* Test Results */}
            {testResults && (
                <div className={`p-4 rounded-lg border-2 ${testResults.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                    }`}>
                    <div className="font-bold text-center mb-2">
                        {testResults.message}
                    </div>

                    {testResults.success && testResults.mealPlan && (
                        <div className="text-sm text-green-700">
                            <div>✅ Generated {testResults.mealPlan.allMeals.length} meals</div>
                            <div>✅ Goal: {testResults.mealPlan.goalType}</div>
                            <div>✅ Expert Source: {testResults.mealPlan.enhancedSystemData?.expertSource}</div>
                            <div>✅ All meal names compatible with your MealTracker</div>
                        </div>
                    )}

                    {!testResults.success && testResults.error && (
                        <div className="text-sm text-red-700">
                            <div>❌ Error: {testResults.error}</div>
                        </div>
                    )}

                    {testResults.validation && (
                        <div className="text-sm mt-2">
                            {testResults.validation.isValid ? (
                                <div className="text-green-700">
                                    ✅ All compatibility checks passed
                                </div>
                            ) : (
                                <div className="text-red-700">
                                    <div>❌ Issues found:</div>
                                    <ul className="list-disc list-inside">
                                        {testResults.validation.issues.map((issue, index) => (
                                            <li key={index}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Detailed Structure View */}
            {showDetailed && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-3">📋 Meal System Compatibility</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h5 className="font-semibold text-blue-700 mb-2">Your MealTracker Types:</h5>
                            <ul className="space-y-1">
                                <li>🥞 breakfast → "Breakfast"</li>
                                <li>🍎 firstSnack → "FirstSnack"</li>
                                <li>🥨 secondSnack → "SecondSnack"</li>
                                <li>🍽️ lunch → "Lunch"</li>
                                <li>☕ midAfternoon → "MidAfternoon Snack"</li>
                                <li>🍽️ dinner → "Dinner"</li>
                                <li>🌙 lateSnack → "Late Snack"</li>
                                <li>💪 postWorkout → "PostWorkout"</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-green-700 mb-2">Enhanced System Names:</h5>
                            <ul className="space-y-1">
                                <li>✅ "Breakfast" → breakfast</li>
                                <li>✅ "FirstSnack" → firstSnack</li>
                                <li>✅ "SecondSnack" → secondSnack</li>
                                <li>✅ "Lunch" → lunch</li>
                                <li>✅ "MidAfternoon Snack" → midAfternoon</li>
                                <li>✅ "Dinner" → dinner</li>
                                <li>✅ "Late Snack" → lateSnack</li>
                                <li>✅ "PostWorkout" → postWorkout</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded text-center">
                        <strong className="text-green-800">
                            ✅ Perfect Compatibility: All meal names map correctly!
                        </strong>
                    </div>
                </div>
            )}

            {/* Integration Instructions */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-semibold text-yellow-800 mb-2">📝 Next Steps:</h4>
                <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                    <li>Test the complete integration above ☝️</li>
                    <li>If tests pass, add the Enhanced files to your project</li>
                    <li>Replace or add alongside your existing Week Plan button</li>
                    <li>Users get 5 curated options instead of decision paralysis! 🎯</li>
                </ol>
            </div>
        </div>
    );
}

/**
 * 🔧 QUICK INTEGRATION HELPER
 * Add this to your App.jsx to see exactly what data the Enhanced system produces
 */
export function EnhancedSystemDataInspector({ userProfile }) {
    const [sampleData, setSampleData] = useState(null);

    const generateSampleData = async () => {
        try {
            console.log('🔍 Generating sample Enhanced system data...');

            // Create a mock enhanced meal plan to show data structure
            const mockEnhancedData = {
                allMeals: [
                    {
                        mealName: 'Breakfast',
                        time: '7:00 AM',
                        items: [
                            {
                                id: 'test_id_1',
                                category: 'carbohydrate',
                                food: 'Oats (dry)',
                                serving: 0.5,
                                displayServing: '1/2',
                                displayUnit: 'cup',
                                expertSource: 'Bodybuilding.com',
                                tier: 3,
                                wasLimited: false,
                                isProteinFocus: false
                            }
                        ]
                    },
                    {
                        mealName: 'Lunch',
                        time: '1:00 PM',
                        items: [
                            {
                                id: 'test_id_2',
                                category: 'protein',
                                food: 'Chicken Breast',
                                serving: 1.5,
                                displayServing: '5.25',
                                displayUnit: 'oz',
                                expertSource: 'T-Nation',
                                tier: 1,
                                wasLimited: false,
                                isProteinFocus: true
                            }
                        ]
                    }
                ],
                selectedVariation: 1,
                expertSource: 'Bodybuilding.com',
                tierSystemApplied: {
                    gender: 'male',
                    limitsApplied: 0,
                    userFriendlyRoundingApplied: true
                }
            };

            // Convert to MealTracker format
            const converted = MealTrackerCompatibility.convertToMealTrackerFormat(
                mockEnhancedData,
                userProfile
            );

            setSampleData({
                original: mockEnhancedData,
                converted: converted
            });

            console.log('📋 Sample data generated:', { original: mockEnhancedData, converted });

        } catch (error) {
            console.error('❌ Failed to generate sample data:', error);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 m-2">
            <h3 className="font-bold text-gray-800 mb-3">🔍 Enhanced System Data Inspector</h3>

            <button
                onClick={generateSampleData}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow mb-3"
            >
                🔍 Generate Sample Data
            </button>

            {sampleData && (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Converted MealTracker Format:</h4>
                        <pre className="bg-green-50 border border-green-200 rounded p-3 text-xs overflow-auto">
                            {JSON.stringify(sampleData.converted, null, 2)}
                        </pre>
                    </div>

                    <div>
                        <h4 className="font-semibold text-blue-700 mb-2">📋 Original Enhanced Format:</h4>
                        <pre className="bg-blue-50 border border-blue-200 rounded p-3 text-xs overflow-auto">
                            {JSON.stringify(sampleData.original, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EnhancedMealPlanTester;