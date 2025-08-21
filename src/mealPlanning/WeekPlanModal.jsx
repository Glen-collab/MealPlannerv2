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

    // 🧪 ENHANCED TEST FUNCTION - checks comprehensive meal plan generation
    const runVisibleTest = () => {
        console.log('🧪 Running comprehensive meal plan test...');
        setTestResult('🔄 Testing enhanced meal plan generation... please wait...');

        setTimeout(() => {
            try {
                console.log('🔄 Generating test meal plans...');

                // Test different combinations
                const testConfigs = [
                    { goal: 'maintain', gender: 'female', expected: 'Female portions + realistic limits' },
                    { goal: 'maintain', gender: 'male', expected: 'Male portions + larger limits' },
                    { goal: 'lose', gender: 'female', expected: 'Female cutting portions' },
                    { goal: 'gain-muscle', gender: 'male', expected: 'Male muscle building' }
                ];

                const results = [];

                testConfigs.forEach((config, index) => {
                    console.log(`Testing config ${index + 1}:`, config);

                    const testPlan = generateMealPlan({
                        goal: config.goal,
                        eaterType: 'balanced',
                        mealFreq: 5,
                        dietaryFilters: [],
                        userProfile: {
                            gender: config.gender,
                            goal: config.goal,
                            weight: config.gender === 'female' ? '130' : '180'
                        },
                        calorieData: null
                    });

                    console.log(`✅ Generated plan for ${config.goal}-${config.gender}:`, testPlan);

                    // Analyze the generated plan
                    const totalCalories = testPlan.nutrition?.calories || 0;
                    const totalProtein = testPlan.nutrition?.protein || 0;
                    const proteinItems = testPlan.proteinItemsAdded || 0;
                    const mealCount = testPlan.allMeals?.length || 0;

                    // Check for carb limits (females)
                    const carbItems = [];
                    if (testPlan.allMeals) {
                        testPlan.allMeals.forEach(meal => {
                            meal.items?.forEach(item => {
                                if (['Oats (dry)', 'Brown Rice (cooked)', 'Sweet Potato'].includes(item.food)) {
                                    carbItems.push({
                                        food: item.food,
                                        amount: parseFloat(item.displayServing),
                                        unit: item.displayUnit,
                                        limited: item.genderLimited || false
                                    });
                                }
                            });
                        });
                    }

                    const oatsItem = carbItems.find(item => item.food === 'Oats (dry)');
                    const femaleOatsOK = config.gender === 'female' ? (!oatsItem || oatsItem.amount <= 0.75) : true;

                    results.push({
                        config: `${config.goal}-${config.gender}`,
                        calories: totalCalories,
                        protein: totalProtein,
                        proteinItems: proteinItems,
                        meals: mealCount,
                        oatsAmount: oatsItem ? `${oatsItem.amount} ${oatsItem.unit}` : 'None',
                        femaleOatsOK: femaleOatsOK,
                        carbItemsFound: carbItems.length,
                        success: testPlan && mealCount > 0
                    });
                });

                // Format results
                const resultText = `
🧪 COMPREHENSIVE MEAL PLAN TEST RESULTS

${results.map((r, i) => `
────────── CONFIG ${i + 1}: ${r.config.toUpperCase()} ──────────
✅ Plan Generated: ${r.success ? 'YES' : 'NO'}
📊 Calories: ${Math.round(r.calories)}
💪 Protein: ${Math.round(r.protein)}g
🥤 Protein Items: ${r.proteinItems}
🍽️ Meals: ${r.meals}
🥣 Oats Found: ${r.oatsAmount}
🚺 Female Oats OK: ${r.femaleOatsOK ? 'YES' : 'NO'}
🌾 Carb Items: ${r.carbItemsFound}
`).join('')}

📊 SUMMARY:
• Plans Generated: ${results.filter(r => r.success).length}/${results.length}
• Female Oats Compliant: ${results.filter(r => r.femaleOatsOK).length}/${results.filter(r => r.config.includes('female')).length}
• Average Calories: ${Math.round(results.reduce((sum, r) => sum + r.calories, 0) / results.length)}
• Total Protein Items: ${results.reduce((sum, r) => sum + r.proteinItems, 0)}

🎯 STATUS: ${results.every(r => r.success && r.femaleOatsOK) ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED'}

💡 Expected Results:
• Female maintain: ~1400 cal, ≤0.75 cups oats, ≤4 protein items
• Male maintain: ~2200 cal, ≤1.5 cups oats, ≤8 protein items  
• Plans should have 5 meals with realistic portions
                `;

                setTestResult(resultText);

            } catch (error) {
                console.error('❌ Test failed:', error);
                setTestResult(`❌ TEST FAILED: ${error.message}\n\nFull error: ${error.stack}`);
            }
        }, 100);
    };

    const generatePlan = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            console.log('🎯 Generating meal plan with enhanced system...');
            console.log('📋 Options:', {
                goal: selectedGoal,
                eaterType: selectedEaterType,
                mealFreq: selectedMealFreq,
                dietaryFilters: selectedDietaryFilters,
                gender: selectedGender
            });

            const options = {
                goal: selectedGoal,
                eaterType: selectedEaterType,
                mealFreq: selectedMealFreq,
                dietaryFilters: selectedDietaryFilters,
                userProfile: {
                    ...userProfile,
                    gender: selectedGender,
                    goal: selectedGoal // Ensure goal is in userProfile
                },
                calorieData: calorieData
            };

            console.log('🔄 Calling generateMealPlan with options:', options);

            const plan = generateMealPlan(options);

            console.log('📋 Generated plan result:', plan);

            if (!plan) {
                throw new Error('generateMealPlan returned null or undefined');
            }

            if (!plan.allMeals || plan.allMeals.length === 0) {
                throw new Error('Generated plan has no meals');
            }

            // Validate dietary compliance if filters are selected
            if (selectedDietaryFilters.length > 0) {
                const validation = validateDietaryCompliance(plan, selectedDietaryFilters);
                plan.validationResults = validation;
                console.log('🔍 Dietary validation:', validation);
            }

            // Add metadata
            plan.generatedWith = 'enhanced-weekplan-v2';
            plan.generationTimestamp = new Date().toISOString();
            plan.requestedOptions = options;

            setGeneratedPlan(plan);
            setShowPreview(true);

            console.log('✅ Enhanced meal plan generated successfully');
            console.log('📊 Plan stats:', {
                meals: plan.allMeals.length,
                calories: plan.nutrition?.calories || 'Not calculated',
                proteinItems: plan.proteinItemsAdded || 0
            });

        } catch (err) {
            console.error('❌ Error generating meal plan:', err);
            setError(`Failed to generate meal plan: ${err.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAddPlan = () => {
        if (generatedPlan) {
            console.log('📥 Adding generated plan to meals:', generatedPlan);
            onAddWeekPlan(generatedPlan);
            onClose();
        }
    };

    // 🆕 ENHANCED: Handle "No Restrictions" and multiple dietary filters
    const handleDietaryFilterToggle = (filterValue) => {
        if (filterValue === 'none') {
            // "No Restrictions" selected - clear all filters
            setSelectedDietaryFilters([]);
        } else {
            // Regular dietary filter toggle
            if (selectedDietaryFilters.includes(filterValue)) {
                setSelectedDietaryFilters(selectedDietaryFilters.filter(f => f !== filterValue));
            } else {
                setSelectedDietaryFilters([...selectedDietaryFilters, filterValue]);
            }
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

    // 🆕 ENHANCED: Added "No Restrictions" option at the top
    const dietaryOptions = [
        { value: 'none', label: '🚫 No Restrictions', desc: 'All foods allowed' },
        { value: 'vegetarian', label: '🥬 Vegetarian', desc: 'Plant-based proteins' },
        { value: 'glutenFree', label: '🌾 Gluten-Free', desc: 'No gluten-containing foods' },
        { value: 'keto', label: '🥑 Keto', desc: 'Low-carb, high-fat' },
        { value: 'dairyFree', label: '🥛 Dairy-Free', desc: 'No dairy products' }
    ];

    // Check if "No Restrictions" is effectively selected (empty filters array)
    const isNoRestrictionsSelected = selectedDietaryFilters.length === 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">📅 Enhanced Meal Planning</h2>
                        <p className="text-gray-600 text-sm mt-1">Generate personalized meal plans with tier-based scaling</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {!showPreview ? (
                    /* Configuration Phase */
                    <div className="p-6 space-y-8">

                        {/* 🧪 ENHANCED TEST SECTION */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-blue-800 mb-2">🧪 Enhanced System Test</h4>
                            <p className="text-sm text-blue-700 mb-3">
                                Test the complete meal plan generation with tier rules, gender limits, and protein distribution
                            </p>
                            <button
                                onClick={runVisibleTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                            >
                                🧪 Test Complete System (All Goals + Genders)
                            </button>

                            {testResult && (
                                <div className="mt-3 p-3 bg-white rounded border max-h-64 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap font-mono">{testResult}</pre>
                                </div>
                            )}

                            <div className="text-xs text-blue-600 mt-2">
                                💡 Tests: Female limits (0.75 cups carbs, 4 protein max), Male limits (1.5 cups carbs, 8 protein max)
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Gender (Critical for Portion Control)</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedGender('male')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'male'
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-800">🚹 Male</div>
                                    <div className="text-xs text-gray-600 mt-1">Larger portions: 1.5 cups carbs, up to 8 protein scoops/day</div>
                                </button>
                                <button
                                    onClick={() => setSelectedGender('female')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'female'
                                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-800">🚺 Female</div>
                                    <div className="text-xs text-gray-600 mt-1">Realistic portions: 0.75 cups carbs, max 4 protein scoops/day</div>
                                </button>
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

                        {/* 🆕 ENHANCED: Dietary Preferences with "No Restrictions" */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🥗 Dietary Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {dietaryOptions.map(option => {
                                    const isSelected = option.value === 'none'
                                        ? isNoRestrictionsSelected
                                        : selectedDietaryFilters.includes(option.value);

                                    // Different styling for "No Restrictions"
                                    const baseClasses = "p-4 rounded-xl border-2 text-left transition-all";
                                    const selectedClasses = option.value === 'none'
                                        ? 'border-gray-500 bg-gray-50 shadow-lg'
                                        : 'border-orange-500 bg-orange-50 shadow-lg';
                                    const unselectedClasses = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';

                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleDietaryFilterToggle(option.value)}
                                            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{option.label}</div>
                                                    <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                                                </div>
                                                {isSelected && (
                                                    <div className={`text-lg ${option.value === 'none' ? 'text-gray-500' : 'text-orange-500'}`}>
                                                        ✓
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* 🆕 ENHANCED: Show current dietary selection status */}
                            <div className="mt-3 text-center">
                                {isNoRestrictionsSelected ? (
                                    <div className="text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-2 inline-block">
                                        🚫 No dietary restrictions - all foods allowed
                                    </div>
                                ) : (
                                    <div className="text-sm text-orange-600 bg-orange-100 rounded-lg px-3 py-2 inline-block">
                                        🔒 Dietary filters: {selectedDietaryFilters.join(', ')}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Current Selection Summary */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">📋 Your Selection</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div><strong>Goal:</strong> {goalOptions.find(g => g.value === selectedGoal)?.label}</div>
                                <div><strong>Style:</strong> {eaterTypeOptions.find(e => e.value === selectedEaterType)?.label}</div>
                                <div><strong>Meals:</strong> {selectedMealFreq} meals per day</div>
                                <div><strong>Dietary:</strong> {isNoRestrictionsSelected ? 'No restrictions' : selectedDietaryFilters.join(', ')}</div>
                                <div><strong>Gender:</strong> {selectedGender} {selectedGender === 'female' ? '(max 4 protein, 0.75 cups carbs)' : '(up to 8 protein, larger portions)'}</div>
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
                                        Generating Enhanced Plan...
                                    </div>
                                ) : (
                                    '🚀 Generate Enhanced Meal Plan'
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                <div className="text-red-600 font-medium">❌ Error</div>
                                <div className="text-red-700 text-sm mt-1">{error}</div>
                                <div className="text-red-600 text-xs mt-2">Check browser console for details</div>
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
                                {/* Enhanced Plan Summary */}
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

                                    {/* Enhancement Status */}
                                    <div className="mt-4 text-center">
                                        <div className="text-sm text-gray-600">
                                            ✅ Enhanced with: Gender-aware portions • Tier-based scaling • Protein distribution
                                        </div>
                                        {generatedPlan.proteinItemsAdded > 0 && (
                                            <div className="text-xs text-blue-600 mt-1">
                                                🥤 {generatedPlan.proteinItemsAdded} protein items added
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Dietary Compliance Status */}
                                {generatedPlan.validationResults ? (
                                    <div className={`p-3 rounded-lg mb-4 ${generatedPlan.validationResults.isCompliant
                                        ? 'bg-green-50 border border-green-200'
                                        : 'bg-yellow-50 border border-yellow-200'
                                        }`}>
                                        <div className="text-sm font-medium">
                                            {generatedPlan.validationResults.isCompliant ? '✅' : '⚠️'}
                                            {' '}{generatedPlan.validationResults.summary}
                                        </div>
                                    </div>
                                ) : isNoRestrictionsSelected && (
                                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg mb-4">
                                        <div className="text-sm font-medium text-gray-700">
                                            🚫 No dietary restrictions applied - all foods included
                                        </div>
                                    </div>
                                )}

                                {/* Gender Analysis */}
                                {generatedPlan.genderAnalysis && (
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                                        <div className="text-sm">
                                            <div className="font-medium text-purple-800">
                                                {selectedGender === 'female' ? '🚺' : '🚹'} Gender-Aware Portions Applied
                                            </div>
                                            <div className="text-purple-700 mt-1">
                                                Items limited: {generatedPlan.genderAnalysis.itemsLimited} •
                                                Max oats allowed: {generatedPlan.genderAnalysis.maxOatsAllowed}
                                            </div>
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
                                                            {item.genderLimited && (
                                                                <span className="text-pink-600 ml-1">(🚺 limited)</span>
                                                            )}
                                                            {item.isProteinFocus && (
                                                                <span className="text-blue-600 ml-1">(💪 protein)</span>
                                                            )}
                                                            {item.originalFood && (
                                                                <span className="text-orange-600 ml-1">(was {item.originalFood})</span>
                                                            )}
                                                            {item.tier !== undefined && (
                                                                <span className="text-gray-500 ml-1">(T{item.tier})</span>
                                                            )}
                                                        </span>
                                                        <span className="font-medium">{item.displayServing} {item.displayUnit}</span>
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
                                        ✅ Add Enhanced Plan to My Meals
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