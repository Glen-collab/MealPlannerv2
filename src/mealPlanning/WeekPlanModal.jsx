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

    // 🧪 TIER SYSTEM TEST
    const runTierSystemTest = () => {
        console.log('🧪 Testing Centralized Tier System with ENFORCED limits and user-friendly rounding...');
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

                    const testPlan = generateMealPlan({
                        goal: config.goal,
                        eaterType: 'balanced',
                        mealFreq: 5,
                        dietaryFilters: [],
                        userProfile: { gender: config.gender }
                    });

                    const limitedPlan = TierSystemManager.applyLimitsToMealPlan(testPlan, config.gender);

                    const allItems = [];
                    limitedPlan.allMeals?.forEach(meal => {
                        meal.items?.forEach(item => allItems.push(item));
                    });

                    const checks = {
                        oats: { found: false, compliant: true, amount: 0, displayAmount: '' },
                        rice: { found: false, compliant: true, amount: 0, displayAmount: '' },
                        avocado: { found: false, compliant: true, amount: 0, displayAmount: '' },
                        protein: { found: false, compliant: true, amount: 0, displayAmount: '' },
                        roundingFixed: []
                    };

                    allItems.forEach(item => {
                        const limits = TierSystemManager.getFoodLimits(item.food, config.gender);

                        if (item.food === 'Oats (dry)') {
                            checks.oats.found = true;
                            checks.oats.amount = item.serving;
                            checks.oats.displayAmount = `${item.displayServing} ${item.displayUnit}`;
                            checks.oats.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food === 'Brown Rice (cooked)') {
                            checks.rice.found = true;
                            checks.rice.amount = item.serving;
                            checks.rice.displayAmount = `${item.displayServing} ${item.displayUnit}`;
                            checks.rice.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food === 'Avocado') {
                            checks.avocado.found = true;
                            checks.avocado.amount = item.serving;
                            checks.avocado.displayAmount = `${item.displayServing} ${item.displayUnit}`;
                            checks.avocado.compliant = item.serving <= limits.maxServing;
                        }
                        if (item.food.includes('Protein')) {
                            checks.protein.found = true;
                            checks.protein.amount = Math.max(checks.protein.amount, item.serving);
                            checks.protein.displayAmount = `${item.displayServing} ${item.displayUnit}`;
                            checks.protein.compliant = checks.protein.compliant && (item.serving <= limits.maxServing);
                        }

                        // Check for user-friendly rounding
                        const displayValue = parseFloat(item.displayServing);
                        const isUserFriendly = displayValue === 0.25 || displayValue === 0.5 || displayValue === 0.75 ||
                            displayValue === 1 || displayValue === 1.5 || displayValue === 1.75 ||
                            displayValue === 2 || displayValue % 0.5 === 0;

                        if (isUserFriendly) {
                            checks.roundingFixed.push(`${item.food}: ${item.displayServing} ${item.displayUnit} ✅`);
                        } else {
                            checks.roundingFixed.push(`${item.food}: ${item.displayServing} ${item.displayUnit} ❌`);
                        }
                    });

                    const tierLimits = TierSystemManager.getRealisticLimitsSummary(config.gender);
                    const allCompliant = Object.values(checks).every(check =>
                        typeof check === 'object' && (!check.found || check.compliant)
                    );

                    results.push({
                        config: `${config.goal}-${config.gender}`,
                        checks,
                        tierLimits,
                        itemsLimited: limitedPlan.tierSystemApplied?.limitsApplied || 0,
                        totalItems: allItems.length,
                        allCompliant,
                        roundingFixed: checks.roundingFixed.filter(r => r.includes('✅')).length
                    });
                });

                const resultText = `
🧪 CENTRALIZED TIER SYSTEM TEST RESULTS (FIXED VERSION)

${results.map((r, i) => `
────────── CONFIG ${i + 1}: ${r.config.toUpperCase()} ──────────
🥣 Oats: ${r.checks.oats.found ? `${r.checks.oats.displayAmount} (${r.checks.oats.compliant ? '✅' : '❌'})` : 'Not found'}
🍚 Rice: ${r.checks.rice.found ? `${r.checks.rice.displayAmount} (${r.checks.rice.compliant ? '✅' : '❌'})` : 'Not found'}
🥑 Avocado: ${r.checks.avocado.found ? `${r.checks.avocado.displayAmount} (${r.checks.avocado.compliant ? '✅' : '❌'})` : 'Not found'}
🥤 Protein: ${r.checks.protein.found ? `${r.checks.protein.displayAmount} (${r.checks.protein.compliant ? '✅' : '❌'})` : 'Not found'}
🔒 Items Limited: ${r.itemsLimited}/${r.totalItems}
✅ All Compliant: ${r.allCompliant ? 'YES' : 'NO'}
🎯 Friendly Rounding: ${r.roundingFixed}/${r.checks.roundingFixed.length} items

📏 User-Friendly Limits for ${r.config.split('-')[1]}:
${r.tierLimits.map(limit => `   • ${limit.food}: ${limit.limit} (T${limit.tier})`).join('\n')}
`).join('')}

📊 SUMMARY:
• Configs Tested: ${results.length}
• All Compliant: ${results.filter(r => r.allCompliant).length}/${results.length}
• Total Items Limited: ${results.reduce((sum, r) => sum + r.itemsLimited, 0)}
• Friendly Rounding: ${results.reduce((sum, r) => sum + r.roundingFixed, 0)}/${results.reduce((sum, r) => sum + r.checks.roundingFixed.length, 0)} items

🎯 TIER SYSTEM STATUS: ${results.every(r => r.allCompliant) ? '✅ ALL LIMITS ENFORCED!' : '❌ SOME LIMITS BROKEN'}
🎯 ROUNDING STATUS: ${results.every(r => r.roundingFixed === r.checks.roundingFixed.length) ? '✅ USER-FRIENDLY ROUNDING APPLIED!' : '❌ SOME ROUNDING ISSUES'}

💡 Expected Results:
• Female: 0.25 cups oats, 0.5 medium avocado, 1 or 1.5 scoops protein
• Male: 0.5 cups oats, 1 medium avocado, 1.5 or 2 scoops protein
• All values should be user-friendly (0.25, 0.5, 0.75, 1, 1.5, etc.)
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
            console.log('🎯 Generating meal plan with fixed centralized tier system...');

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

            // 🔧 APPLY FIXED CENTRALIZED TIER SYSTEM LIMITS
            console.log('🔒 Applying fixed centralized tier system limits with user-friendly rounding...');
            const limitedPlan = TierSystemManager.applyLimitsToMealPlan(basePlan, selectedGender);

            console.log('📋 Preparing preview with limited amounts and enhanced data transfer...');
            const previewPlan = {
                ...limitedPlan,
                previewData: {
                    showsLimitedAmounts: true,
                    tierSystemApplied: true,
                    userFriendlyRoundingApplied: true,
                    gender: selectedGender,
                    version: 'v2.1-fixed'
                }
            };

            setGeneratedPlan(previewPlan);
            setShowPreview(true);

            console.log('✅ Meal plan generated with fixed centralized tier system');
            console.log('📊 Plan stats:', {
                meals: previewPlan.allMeals.length,
                itemsLimited: previewPlan.tierSystemApplied?.limitsApplied || 0,
                gender: selectedGender,
                friendlyRounding: previewPlan.tierSystemApplied?.userFriendlyRoundingApplied
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
            console.log('📥 Adding meal plan with tier limits and enhanced data to MealTracker:', generatedPlan);

            // 🔧 FIXED: Enhanced data transfer format
            const mealTrackerData = convertToMealTrackerFormatFixed(generatedPlan);
            onAddWeekPlan(mealTrackerData);
            onClose();
        }
    };

    // 🔧 FIXED: Enhanced conversion to MealTracker format - CORRECTED VERSION
    const convertToMealTrackerFormatFixed = (limitedPlan) => {
        const mealTypeMapping = {
            'Breakfast': 'Breakfast',
            'FirstSnack': 'FirstSnack',
            'SecondSnack': 'SecondSnack',
            'Lunch': 'Lunch',
            'MidAfternoon Snack': 'MidAfternoon Snack',
            'Dinner': 'Dinner',
            'Late Snack': 'Late Snack',
            'PostWorkout': 'PostWorkout'
        };

        // 🔧 CRITICAL FIX: Return the format that handleAddWeekPlan expects!
        const correctedFormat = {
            // This is what handleAddWeekPlan expects
            allMeals: limitedPlan.allMeals.map(meal => ({
                mealName: meal.mealName,
                time: meal.time,
                items: meal.items.map(item => ({
                    id: item.id || Math.random().toString(36).substr(2, 9),
                    food: item.food,
                    category: item.category,

                    // 🔧 CRITICAL: These are the LIMITED, USER-FRIENDLY amounts
                    serving: item.serving,  // This is tier-limited with user-friendly rounding
                    servings: item.serving, // Legacy compatibility

                    // 🔧 ENHANCED: Complete tier metadata for perfect data transfer
                    tierData: {
                        tier: item.tier || 99,
                        wasLimited: item.wasLimited || false,
                        originalServing: item.originalServing || item.serving,
                        maxAllowed: item.maxAllowed || item.serving,
                        genderApplied: item.genderApplied || selectedGender
                    },

                    // Source tracking
                    source: 'weekplan-enhanced',

                    // 🔧 METADATA: For debugging and verification
                    originalFood: item.originalFood,
                    substitutionReason: item.substitutionReason,
                    dietaryCompliant: !item.substitutionReason,
                    dietaryTags: item.dietaryTags || {}
                }))
            })),

            // 🔧 ENHANCED: Metadata for the plan
            generatedWith: 'weekplan-enhanced',
            dietaryFilters: selectedDietaryFilters,
            goalType: selectedGoal,
            eaterType: selectedEaterType,
            mealFrequency: selectedMealFreq,

            // 🔧 TIER SYSTEM: Preserve tier system metadata
            tierSystemApplied: {
                gender: selectedGender,
                limitsApplied: limitedPlan.tierSystemApplied?.limitsApplied || 0,
                timestamp: new Date().toISOString(),
                userFriendlyRoundingApplied: true,
                version: 'v2.1-fixed-transfer'
            }
        };

        // 🔧 VERIFICATION: Log the data transfer
        console.log('🔄 FIXED Data transfer verification:');
        console.log('- Format:', correctedFormat.allMeals ? 'allMeals ✅' : 'meals ❌');
        console.log('- Meals converted:', correctedFormat.allMeals?.length || 0);
        console.log('- Total items:', correctedFormat.allMeals?.reduce((sum, meal) => sum + meal.items.length, 0) || 0);
        console.log('- Enhanced metadata included:', !!correctedFormat.tierSystemApplied);

        return correctedFormat;
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
    const realisticLimits = TierSystemManager.getRealisticLimitsSummary(selectedGender);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">📅 Fixed Tier-Based Meal Planning</h2>
                        <p className="text-gray-600 text-sm mt-1">Generate meal plans with user-friendly rounding and proper data transfer</p>
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

                        {/* 🧪 ENHANCED TIER SYSTEM TEST */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-green-800 mb-2">🎯 Enhanced Tier System Test (v2.1)</h4>
                            <p className="text-sm text-green-700 mb-3">
                                Test the FIXED centralized tier system with user-friendly rounding and proper data transfer
                            </p>
                            <button
                                onClick={runTierSystemTest}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                            >
                                🧪 Test FIXED Tier System v2.1
                            </button>

                            {testResult && (
                                <div className="mt-3 p-3 bg-white rounded border max-h-64 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap font-mono">{testResult}</pre>
                                </div>
                            )}

                            <div className="text-xs text-green-600 mt-2">
                                💡 Tests user-friendly rounding: 0.7 → 0.75, 1.4 → 1.5, 0.9 → 1.0
                            </div>
                        </div>

                        {/* Gender Selection with Enhanced Tier Limits Display */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Gender (Controls User-Friendly Tier Limits)</h3>
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
                                        User-friendly limits: 0.5 cups oats, 1 medium avocado
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
                                        User-friendly limits: 0.25 cups oats, 0.5 medium avocado
                                    </div>
                                </button>
                            </div>

                            {/* Enhanced current gender's tier limits */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm font-medium text-gray-800 mb-2">
                                    🎯 {selectedGender === 'female' ? '🚺 Female' : '🚹 Male'} User-Friendly Tier Limits:
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                                    {realisticLimits.map(limit => (
                                        <div key={limit.food}>
                                            <strong>T{limit.tier}</strong> {limit.food}: <span className="text-green-600 font-medium">{limit.limit}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs text-blue-600 mt-2">
                                    ✨ All values are user-friendly (0.25, 0.5, 0.75, 1, 1.5, etc.)
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
                                        Applying Fixed Tier System...
                                    </div>
                                ) : (
                                    '🎯 Generate Plan with Fixed Tier System v2.1'
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
                    /* Enhanced Preview Phase */
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                📋 Enhanced Preview (User-Friendly Amounts)
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
                                {/* Enhanced Tier System Status */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-green-800 font-bold text-lg mb-2">
                                            🎯 Fixed Centralized Tier System v2.1 Applied
                                        </div>
                                        <div className="text-sm text-green-700 space-y-1">
                                            <div>{selectedGender === 'female' ? '🚺' : '🚹'} {selectedGender} tier limits enforced • {generatedPlan.tierSystemApplied?.limitsApplied || 0} items limited</div>
                                            <div>✨ User-friendly rounding applied • Enhanced data transfer enabled</div>
                                            <div>🔄 Ready for perfect transfer to View Plan & Add Foods Modal</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Preview showing user-friendly amounts */}
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
                                                            {item.enhancedData?.friendlyRoundingApplied && (
                                                                <span className="text-blue-600 ml-1">(✨ rounded)</span>
                                                            )}
                                                        </span>
                                                        <span className="font-medium text-green-700">
                                                            {item.displayServing} {item.displayUnit}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={handleAddPlan}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                                    >
                                        ✅ Add Fixed Plan to MealTracker (v2.1)
                                    </button>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-medium"
                                    >
                                        Edit Plan
                                    </button>
                                </div>

                                {/* Data Transfer Verification */}
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                                    <div className="text-xs text-blue-600">
                                        🔄 Enhanced data transfer ready • User-friendly rounding preserved •
                                        Tier metadata complete • View Plan & Add Foods Modal compatibility ensured
                                    </div>
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