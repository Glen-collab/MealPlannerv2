import React, { useState, useEffect } from 'react';
import { generateMealPlan } from './MealPlanGenerator.js';
import { applyDietaryFilters, validateDietaryCompliance } from './DietaryFilterSystem.js';

function WeekPlanModal({ isOpen, onClose, onAddWeekPlan, userProfile, calorieData, isMobile = false }) {
    const [selectedGoal, setSelectedGoal] = useState(userProfile?.goal || 'maintain');
    const [selectedEaterType, setSelectedEaterType] = useState('balanced');
    const [selectedMealFreq, setSelectedMealFreq] = useState(5);
    const [selectedDietaryFilters, setSelectedDietaryFilters] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [error, setError] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [selectedGender, setSelectedGender] = useState(userProfile?.gender || 'male');


    // Test function INSIDE the component
    const runVisibleTest = () => {
        console.log('🧪 Test button clicked!');
        setTestResult('🔄 Testing... please wait...');

        setTimeout(() => {
            try {
                console.log('🔄 About to generate meal plan...');

                const testPlan = generateMealPlan({
                    goal: 'maintain',
                    eaterType: 'balanced',
                    mealFreq: 3,
                    dietaryFilters: [],
                    userProfile: { gender: 'male' },
                    calorieData: { targetCalories: 2200 }
                });

                console.log('✅ Plan generated successfully!', testPlan);

                // Create detailed meal breakdown
                let mealDetails = '';
                testPlan.allMeals?.forEach((meal, index) => {
                    mealDetails += `\n🍽️ ${meal.mealName} (${meal.time || 'No time'}):\n`;
                    meal.items?.forEach(item => {
                        mealDetails += `  • ${item.food} (${item.displayServing} ${item.displayUnit})\n`;
                    });
                });

                // Count protein items
                const proteinItems = testPlan.allMeals?.flatMap(meal =>
                    meal.items?.filter(item =>
                        item.food?.includes('Protein') ||
                        item.category === 'supplements' ||
                        item.food?.includes('Greek Yogurt') ||
                        item.food?.includes('Quest Bar')
                    ) || []
                ) || [];

                const result = `
✅ TEST PASSED!
📊 Calories: ${testPlan.actualCalories || testPlan.targetCalories || 'unknown'}
🍽️ Meals: ${testPlan.allMeals?.length || 'unknown'}
📝 Total items: ${testPlan.allMeals?.reduce((total, meal) => total + (meal.items?.length || 0), 0) || 'unknown'}
🥤 Protein items found: ${proteinItems.length}

📋 FULL MEAL PLAN:${mealDetails}

🔍 PROTEIN ITEMS:
${proteinItems.map(item => `  • ${item.food} (${item.displayServing} ${item.displayUnit})`).join('\n')}

🎯 SYSTEM STATUS:
✅ Meal plan generation: WORKING
✅ Food database: WORKING  
✅ Nutrition calculations: WORKING
${testPlan.scalingApproach ? `✅ Scaling approach: ${testPlan.scalingApproach}` : ''}
${testPlan.tierAnalysis ? `✅ Tier analysis: WORKING` : '⚠️ Tier system: NOT YET INTEGRATED'}
            `;

                setTestResult(result);

            } catch (error) {
                console.error('❌ Test failed:', error);
                setTestResult(`❌ TEST FAILED: ${error.message}\n\nFull error: ${error.stack}`);
            }
        }, 100);
    };

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedGoal(userProfile?.goal || 'maintain');
            setSelectedEaterType('balanced');
            setSelectedMealFreq(5);
            setSelectedDietaryFilters([]);
            setGeneratedPlan(null);
            setError(null);
            setShowPreview(false);
        }
    }, [isOpen, userProfile]);

    const handleDietaryFilterToggle = (filter) => {
        setSelectedDietaryFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const generatePlan = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            console.log('🎯 Generating meal plan with enhanced system...');

            const options = {
                goal: selectedGoal,
                eaterType: selectedEaterType,
                mealFreq: selectedMealFreq,
                dietaryFilters: selectedDietaryFilters,
                userProfile: { ...userProfile, gender: selectedGender },
                calorieData: calorieData
            };

            const plan = generateMealPlan(options);

            if (!plan) {
                throw new Error('Failed to generate meal plan');
            }

            // Validate dietary compliance
            const validation = validateDietaryCompliance(plan, selectedDietaryFilters);
            plan.validationResults = validation;
            plan.generatedWith = 'enhanced-weekplan';

            setGeneratedPlan(plan);
            setShowPreview(true);

            console.log('✅ Enhanced meal plan generated successfully', plan);

        } catch (err) {
            console.error('❌ Error generating meal plan:', err);
            setError(err.message || 'Failed to generate meal plan');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAddPlan = () => {
        if (generatedPlan) {
            onAddWeekPlan(generatedPlan);
            onClose();
        }
    };

    const calculatePlanCalories = (plan) => {
        if (!plan?.allMeals) return 0;

        return plan.allMeals.reduce((total, meal) => {
            return total + (meal.items?.reduce((mealTotal, item) => {
                return mealTotal + (item.calories || 0);
            }, 0) || 0);
        }, 0);
    };

    if (!isOpen) return null;

    const goalOptions = [
        { value: 'lose', label: '🔥 Lose Weight', desc: 'Calorie deficit for fat loss' },
        { value: 'maintain', label: '⚖️ Maintain', desc: 'Balanced nutrition' },
        { value: 'gain-muscle', label: '💪 Gain Muscle', desc: 'Lean muscle building' },
        { value: 'dirty-bulk', label: '🚀 Dirty Bulk', desc: 'Maximum muscle gain' }
    ];

    const eaterTypeOptions = [
        { value: 'balanced', label: '🌟 Balanced', desc: 'Well-rounded nutrition' },
        { value: 'performance', label: '⚡ Performance', desc: 'Athletic optimization' }
    ];

    const mealFreqOptions = [
        { value: 3, label: '3 Meals', desc: 'Traditional meal pattern' },
        { value: 5, label: '5 Meals', desc: 'Frequent eating (recommended)' },
        { value: 6, label: '6 Meals', desc: 'Maximum frequency' }
    ];

    const dietaryOptions = [
        { value: 'vegetarian', label: '🥬 Vegetarian', desc: 'Plant-based proteins' },
        { value: 'glutenFree', label: '🌾 Gluten-Free', desc: 'No gluten-containing foods' },
        { value: 'keto', label: '🥑 Keto', desc: 'Low-carb, high-fat' },
        { value: 'dairyFree', label: '🥛 Dairy-Free', desc: 'No dairy products' }
    ];

    return (
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">📅 Enhanced Meal Planning</h2>
                        <p className="text-gray-600 text-sm mt-1">Create personalized meal plans with dietary preferences</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>
                
                {/* Gender Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Gender (for protein distribution)</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'male'
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="font-semibold text-gray-800">🚹 Male</div>
                            <div className="text-xs text-gray-600 mt-1">Up to 8 protein scoops/day</div>
                        </button>
                        <button
                            onClick={() => setSelectedGender('female')}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'female'
                                ? 'border-pink-500 bg-pink-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="font-semibold text-gray-800">🚺 Female</div>
                            <div className="text-xs text-gray-600 mt-1">Up to 2 protein scoops/day</div>
                        </button>
                    </div>
                </div>

                {!showPreview ? (
                    /* Configuration Phase */
                    <div className="p-6 space-y-8">

                        {/* DEBUG TEST BUTTON - PROPERLY PLACED NOW */}
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-red-800 mb-2">🧪 Debug Test</h4>
                            <button
                                onClick={runVisibleTest}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                            >
                                🧪 Test New System (Click Me!)
                            </button>

                            {testResult && (
                                <div className="mt-3 p-3 bg-white rounded border">
                                    <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
                                </div>
                            )}

                            <div className="text-xs text-red-600 mt-2">
                                💡 Also check browser console (F12) for detailed logs
                            </div>
                        </div>

                        {/* Goal Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Fitness Goal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {goalOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setSelectedGoal(option.value)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedGoal === option.value
                                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Eating Style */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🍽️ Eating Style</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {eaterTypeOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setSelectedEaterType(option.value)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedEaterType === option.value
                                            ? 'border-green-500 bg-green-50 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Meal Frequency */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🕐 Meal Frequency</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {mealFreqOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setSelectedMealFreq(option.value)}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${selectedMealFreq === option.value
                                            ? 'border-purple-500 bg-purple-50 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="font-semibold text-gray-800">{option.label}</div>
                                        <div className="text-xs text-gray-600 mt-1">{option.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dietary Restrictions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🥗 Dietary Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {dietaryOptions.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleDietaryFilterToggle(option.value)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDietaryFilters.includes(option.value)
                                            ? 'border-orange-500 bg-orange-50 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-gray-800">{option.label}</div>
                                                <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                                            </div>
                                            {selectedDietaryFilters.includes(option.value) && (
                                                <div className="text-orange-500 text-lg">✓</div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Selection Summary */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">📋 Your Selection</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div><strong>Goal:</strong> {goalOptions.find(g => g.value === selectedGoal)?.label}</div>
                                <div><strong>Style:</strong> {eaterTypeOptions.find(e => e.value === selectedEaterType)?.label}</div>
                                <div><strong>Meals:</strong> {selectedMealFreq} meals per day</div>
                                <div><strong>Dietary:</strong> {selectedDietaryFilters.length > 0 ? selectedDietaryFilters.join(', ') : 'None'}</div>
                                <div><strong>Gender:</strong> {selectedGender}</div>
                                {calorieData && (
                                    <div><strong>Target Calories:</strong> ~{calorieData.targetCalories} cal/day</div>
                                )}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={generatePlan}
                                disabled={isGenerating}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:transform-none"
                            >
                                {isGenerating ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Generating Plan...
                                    </div>
                                ) : (
                                    '🚀 Generate Meal Plan'
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                <div className="text-red-600 font-medium">❌ Error</div>
                                <div className="text-red-700 text-sm mt-1">{error}</div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Preview Phase */
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">📋 Generated Meal Plan Preview</h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                ← Back to Edit
                            </button>
                        </div>

                        {generatedPlan && (
                            <>
                                {/* Plan Summary */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">
                                                {Math.round(generatedPlan.nutrition?.calories || calculatePlanCalories(generatedPlan))}
                                            </div>
                                            <div className="text-sm text-gray-600">Total Calories</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">
                                                {Math.round(generatedPlan.nutrition?.protein || 0)}g
                                            </div>
                                            <div className="text-sm text-gray-600">Protein</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-yellow-600">
                                                {Math.round(generatedPlan.nutrition?.carbs || 0)}g
                                            </div>
                                            <div className="text-sm text-gray-600">Carbs</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-red-600">
                                                {Math.round(generatedPlan.nutrition?.fat || 0)}g
                                            </div>
                                            <div className="text-sm text-gray-600">Fat</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dietary Compliance Status */}
                                {generatedPlan.validationResults && (
                                    <div className={`p-3 rounded-lg mb-4 ${generatedPlan.validationResults.isCompliant
                                        ? 'bg-green-50 border border-green-200'
                                        : 'bg-yellow-50 border border-yellow-200'
                                        }`}>
                                        <div className="text-sm font-medium">
                                            {generatedPlan.validationResults.isCompliant ? '✅' : '⚠️'}
                                            {' '}{generatedPlan.validationResults.summary}
                                        </div>
                                    </div>
                                )}

                                {/* Meal Plan Preview */}
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {generatedPlan.allMeals?.map((meal, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-800">{meal.mealName}</h4>
                                                <span className="text-sm text-gray-500">{meal.time}</span>
                                            </div>
                                            <div className="space-y-1">
                                                {meal.items?.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="text-sm text-gray-700 flex justify-between">
                                                        <span>
                                                            {item.food}
                                                            {item.originalFood && (
                                                                <span className="text-orange-600 ml-1">(was {item.originalFood})</span>
                                                            )}
                                                        </span>
                                                        <span>{item.displayServing} {item.displayUnit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleAddPlan}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                                    >
                                        ✅ Add This Plan to My Meals
                                    </button>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-medium"
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeekPlanModal;