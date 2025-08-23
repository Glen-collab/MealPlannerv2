import React, { useState, useEffect } from 'react';
import { generateMealPlan } from './MealPlanGenerator.js';
import { TierSystemManager, enforceRealisticLimits } from './CentralizedTierSystem.js';

function WeekPlanModal({
    isOpen,
    onClose,
    onAddWeekPlan,
    userProfile,
    calorieData,
    isMobile = false
}) {
    const [selectedGoal, setSelectedGoal] = useState(userProfile?.goal || 'maintain');
    const [selectedEaterType, setSelectedEaterType] = useState('balanced');
    const [selectedMealFreq, setSelectedMealFreq] = useState(5);
    const [selectedDietaryFilters, setSelectedDietaryFilters] = useState([]);
    const [selectedGender, setSelectedGender] = useState(userProfile?.gender || 'male');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [error, setError] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [testResult, setTestResult] = useState(null);

    // 🧪 TIER SYSTEM TEST - Tests the centralized tier system
    const runTierSystemTest = () => {
        console.log('🧪 Testing Centralized Tier System with ENFORCED limits...');
        setTestResult('🔄 Testing centralized tier system... please wait...');

        setTimeout(() => {
            try {
                const testConfigs = [
                    { goal: 'maintain', gender: 'female' },
                    { goal: 'maintain', gender: 'male' },
                    { goal: 'gain-muscle', gender: 'female' },
                    { goal: 'gain-muscle', gender: 'male' }
                ];

                const results = [];

                testConfigs.forEach((config, index) => {
                    console.log(`Testing config ${index + 1}:`, config);

                    // Generate meal plan
                    const testPlan = generateMealPlan({
                        goal: config.goal,
                        eaterType: 'balanced',
                        mealFreq: 5,
                        dietaryFilters: [],
                        userProfile: { gender: config.gender }
                    });

                    // Apply tier system limits
                    const limitedPlan = TierSystemManager.applyLimitsToMealPlan(testPlan, config.gender);

                    // Check all food items for tier compliance
                    const allItems = [];
                    limitedPlan.allMeals?.forEach(meal => {
                        meal.items?.forEach(item => allItems.push(item));
                    });

                    // Validate specific problematic foods
                    const checks = {
                        oats: { found: false, compliant: true, amount: 0 },
                        rice: { found: false, compliant: true, amount: 0 },
                        avocado: { found: false, compliant: true, amount: 0 },
                        protein: { found: false, compliant: true, amount: 0 }
                    };

                    allItems.forEach(item => {
                        const limits = TierSystemManager.getFoodLimits(item.food, config.gender);

                        if (item.food === 'Oats (dry)') {
                            checks.oats.found = true;
                            checks.oats.amount = item.serving;
                            checks.oats.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food === 'Brown Rice (cooked)') {
                            checks.rice.found = true;
                            checks.rice.amount = item.serving;
                            checks.rice.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food === 'Avocado') {
                            checks.avocado.found = true;
                            checks.avocado.amount = item.serving;
                            checks.avocado.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food.includes('Protein')) {
                            checks.protein.found = true;
                            checks.protein.amount = Math.max(checks.protein.amount, item.serving);
                            checks.protein.compliant = checks.protein.compliant && (item.serving <= limits.maxServing);
                        }
                    });

                    // Get tier limits for comparison
                    const tierLimits = TierSystemManager.getRealisticLimitsSummary(config.gender);

                    const allCompliant = Object.values(checks).every(check => !check.found || check.compliant);

                    results.push({
                        config: `${config.goal}-${config.gender}`,
                        checks,
                        tierLimits,
                        itemsLimited: limitedPlan.tierSystemApplied?.limitsApplied || 0,
                        totalItems: allItems.length,
                        allCompliant
                    });
                });

                const resultText = `
🧪 CENTRALIZED TIER SYSTEM TEST RESULTS

${results.map((r, i) => `
────────── CONFIG ${i + 1}: ${r.config.toUpperCase()} ──────────
🥣 Oats: ${r.checks.oats.found ? `${r.checks.oats.amount} (${r.checks.oats.compliant ? '✅' : '❌'})` : 'Not found'}
🍚 Rice: ${r.checks.rice.found ? `${r.checks.rice.amount} (${r.checks.rice.compliant ? '✅' : '❌'})` : 'Not found'}
🥑 Avocado: ${r.checks.avocado.found ? `${r.checks.avocado.amount} (${r.checks.avocado.compliant ? '✅' : '❌'})` : 'Not found'}
🥤 Protein: ${r.checks.protein.found ? `${r.checks.protein.amount} (${r.checks.protein.compliant ? '✅' : '❌'})` : 'Not found'}
🔒 Items Limited: ${r.itemsLimited}/${r.totalItems}
✅ All Compliant: ${r.allCompliant ? 'YES' : 'NO'}

📏 Tier Limits for ${r.config.split('-')[1]}:
${r.tierLimits.map(limit => `   • ${limit.food}: ${limit.limit} (T${limit.tier})`).join('\n')}
`).join('')}

📊 SUMMARY:
• Configs Tested: ${results.length}
• All Compliant: ${results.filter(r => r.allCompliant).length}/${results.length}
• Total Items Limited: ${results.reduce((sum, r) => sum + r.itemsLimited, 0)}

🎯 TIER SYSTEM STATUS: ${results.every(r => r.allCompliant) ? '✅ ALL LIMITS ENFORCED!' : '❌ SOME LIMITS BROKEN'}

💡 Expected Limits:
• Female: 0.5 servings oats (0.25 cups), 0.5 servings avocado (0.5 medium)
• Male: 0.75 servings oats (0.375 cups), 1.0 servings avocado (1 medium)
                `;

                setTestResult(resultText);

            } catch (error) {
                console.error('❌ Tier system test failed:', error);
                setTestResult(`❌ TEST FAILED: ${error.message}\n\nFull error: ${error.stack}`);
            }
        }, 100);
    };

    const generatePlan = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            console.log('🎯 Generating meal plan with centralized tier system...');

            // Generate base meal plan
            const basePlan = generateMealPlan({
                goal: selectedGoal,
                eaterType: selectedEaterType,
                mealFreq: selectedMealFreq,
                dietaryFilters: selectedDietaryFilters,
                userProfile: { ...userProfile, gender: selectedGender },
                calorieData
            });

            if (!basePlan || !basePlan.allMeals) {
                throw new Error('Failed to generate base meal plan');
            }

            // 🔧 APPLY CENTRALIZED TIER SYSTEM LIMITS
            console.log('🔒 Applying centralized tier system limits...');
            const limitedPlan = TierSystemManager.applyLimitsToMealPlan(basePlan, selectedGender);

            // 🔧 ENSURE PREVIEW SHOWS LIMITED DATA
            console.log('📋 Preparing preview with limited amounts...');
            const previewPlan = {
                ...limitedPlan,
                previewData: {
                    showsLimitedAmounts: true,
                    tierSystemApplied: true,
                    gender: selectedGender
                }
            };

            setGeneratedPlan(previewPlan);
            setShowPreview(true);

            console.log('✅ Meal plan generated with centralized tier system');
            console.log('📊 Plan stats:', {
                meals: previewPlan.allMeals.length,
                itemsLimited: previewPlan.tierSystemApplied?.limitsApplied || 0,
                gender: selectedGender
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
            console.log('📥 Adding meal plan with tier limits to MealTracker:', generatedPlan);

            // Convert to MealTracker format with proper limits applied
            const mealTrackerData = convertToMealTrackerFormat(generatedPlan);
            onAddWeekPlan(mealTrackerData);
            onClose();
        }
    };

    // 🔧 Convert to MealTracker format with tier-limited data
    const convertToMealTrackerFormat = (limitedPlan) => {
        const mealTypeMapping = {
            'Breakfast': 'breakfast',
            'FirstSnack': 'firstSnack',
            'SecondSnack': 'secondSnack',
            'Lunch': 'lunch',
            'MidAfternoon Snack': 'midAfternoon',
            'Dinner': 'dinner',
            'Late Snack': 'lateSnack',
            'PostWorkout': 'postWorkout'
        };

        const mealTrackerState = {
            meals: {},
            dayTotals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            enhancedMetadata: {
                tierSystemApplied: true,
                realisticLimitsEnforced: true,
                gender: selectedGender,
                limitsApplied: limitedPlan.tierSystemApplied?.limitsApplied || 0
            }
        };

        // Convert meals with tier-limited amounts
        limitedPlan.allMeals.forEach(meal => {
            const mealType = mealTypeMapping[meal.mealName] || 'breakfast';

            mealTrackerState.meals[mealType] = {
                time: meal.time,
                items: meal.items.map(item => ({
                    id: item.id || Math.random().toString(36).substr(2, 9),
                    food: item.food,
                    category: item.category,
                    serving: item.serving,  // This is the LIMITED amount
                    servings: item.serving, // Legacy compatibility
                    displayServing: item.displayServing, // This shows correct limited amount
                    displayUnit: item.displayUnit,
                    brand: item.brand || '',
                    isExpanded: false,

                    // Tier metadata
                    enhancedData: {
                        tier: item.tier,
                        wasLimited: item.wasLimited,
                        originalServing: item.originalServing,
                        maxAllowed: item.maxAllowed,
                        genderApplied: item.genderApplied
                    }
                }))
            };
        });

        return mealTrackerState;
    };

    const handleDietaryFilterToggle = (filterValue) => {
        if (filterValue === 'none') {
            setSelectedDietaryFilters([]);
        } else {
            if (selectedDietaryFilters.includes(filterValue)) {
                setSelectedDietaryFilters(selectedDietaryFilters.filter(f => f !== filterValue));
            } else {
                setSelectedDietaryFilters([...selectedDietaryFilters, filterValue]);
            }
        }
    };

    if (!isOpen) return null;

    const goalOptions = [
        { value: 'lose', label: '🔥 Lose Weight', desc: 'Calorie deficit with tier limits' },
        { value: 'maintain', label: '⚖️ Maintain', desc: 'Balanced nutrition with limits' },
        { value: 'gain-muscle', label: '💪 Gain Muscle', desc: 'Muscle building with realistic portions' },
        { value: 'dirty-bulk', label: '🚀 Dirty Bulk', desc: 'Higher calories (still limited)' }
    ];

    const eaterTypeOptions = [
        { value: 'balanced', label: '🌟 Balanced', desc: 'Well-rounded with tier limits' },
        { value: 'performance', label: '⚡ Performance', desc: 'Athletic with realistic portions' }
    ];

    const mealFreqOptions = [
        { value: 3, label: '3 Meals', desc: 'Traditional pattern' },
        { value: 5, label: '5 Meals', desc: 'Frequent eating (recommended)' },
        { value: 6, label: '6 Meals', desc: 'Maximum frequency' }
    ];

    const dietaryOptions = [
        { value: 'none', label: '🚫 No Restrictions', desc: 'All foods (with tier limits)' },
        { value: 'vegetarian', label: '🥬 Vegetarian', desc: 'Plant-based with limits' },
        { value: 'glutenFree', label: '🌾 Gluten-Free', desc: 'No gluten (tier limited)' },
        { value: 'keto', label: '🥑 Keto', desc: 'Low-carb with realistic fats' },
        { value: 'dairyFree', label: '🥛 Dairy-Free', desc: 'No dairy (tier limited)' }
    ];

    const isNoRestrictionsSelected = selectedDietaryFilters.length === 0;

    // Get realistic limits for current gender
    const realisticLimits = TierSystemManager.getRealisticLimitsSummary(selectedGender);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">📅 Tier-Based Meal Planning</h2>
                        <p className="text-gray-600 text-sm mt-1">Generate meal plans with centralized tier system limits</p>
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

                        {/* 🧪 TIER SYSTEM TEST SECTION */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-green-800 mb-2">🎯 Centralized Tier System Test</h4>
                            <p className="text-sm text-green-700 mb-3">
                                Test the centralized tier system with realistic limits for both genders
                            </p>
                            <button
                                onClick={runTierSystemTest}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                            >
                                🧪 Test Centralized Tier System
                            </button>

                            {testResult && (
                                <div className="mt-3 p-3 bg-white rounded border max-h-64 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap font-mono">{testResult}</pre>
                                </div>
                            )}

                            <div className="text-xs text-green-600 mt-2">
                                💡 Tests centralized limits for oats, rice, avocado, and protein across all tiers
                            </div>
                        </div>

                        {/* Gender Selection with Tier Limits Display */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Gender (Controls Tier-Based Limits)</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedGender('male')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'male'
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-800">🚹 Male</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        Tier limits: 0.375 cups oats, 1 medium avocado
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedGender('female')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGender === 'female'
                                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-800">🚺 Female</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        Tier limits: 0.25 cups oats, 0.5 medium avocado
                                    </div>
                                </button>
                            </div>

                            {/* Show current gender's tier limits */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-800 mb-2">
                                    🎯 {selectedGender === 'female' ? '🚺 Female' : '🚹 Male'} Tier Limits:
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                                    {realisticLimits.map(limit => (
                                        <div key={limit.food}>
                                            <strong>T{limit.tier}</strong> {limit.food}: {limit.limit}
                                        </div>
                                    ))}
                                </div>
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

                        {/* Generate Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={generatePlan}
                                disabled={isGenerating}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:transform-none"
                            >
                                {isGenerating ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Applying Tier System...
                                    </div>
                                ) : (
                                    '🎯 Generate Plan with Tier Limits'
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
                    /* Preview Phase - FIXED TO SHOW LIMITED AMOUNTS */
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                📋 Meal Plan Preview (Tier-Limited Amounts)
                            </h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                ← Back to Edit
                            </button>
                        </div>

                        {generatedPlan && (
                            <>
                                {/* Tier System Status */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-green-800 font-bold text-lg mb-2">
                                            🎯 Centralized Tier System Applied
                                        </div>
                                        <div className="text-sm text-green-700">
                                            {selectedGender === 'female' ? '🚺' : '🚹'} {selectedGender} tier limits enforced •
                                            {generatedPlan.tierSystemApplied?.limitsApplied || 0} items limited •
                                            Realistic portions guaranteed
                                        </div>
                                    </div>
                                </div>

                                {/* 🔧 FIXED PREVIEW - Shows LIMITED amounts, not raw amounts */}
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {generatedPlan.allMeals?.map((meal, mealIndex) => (
                                        <div key={mealIndex} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-800">{meal.mealName}</h4>
                                                <span className="text-sm text-gray-500">{meal.time}</span>
                                            </div>
                                            <div className="space-y-1">
                                                {meal.items?.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="text-sm text-gray-700 flex justify-between items-center">
                                                        <span>
                                                            {item.food}
                                                            {item.tier && (
                                                                <span className="text-gray-500 ml-1">(T{item.tier})</span>
                                                            )}
                                                            {item.wasLimited && (
                                                                <span className="text-green-600 ml-1">(✅ limited)</span>
                                                            )}
                                                        </span>
                                                        <span className="font-medium">
                                                            {/* 🔧 THIS NOW SHOWS THE LIMITED AMOUNTS */}
                                                            {item.displayServing} {item.displayUnit}
                                                        </span>
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
                                        ✅ Add Tier-Limited Plan to MealTracker
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