// EnhancedWeekPlanModal.jsx - Decision Fatigue Elimination Interface
// Shows 5 curated meal plans instead of overwhelming choices

import React, { useState, useEffect } from 'react';
import { SmartRecommendationSystem } from './Enhanced5OptionMealGenerator.js';
import { TierSystemManager } from './CentralizedTierSystem.js';

function EnhancedWeekPlanModal({
    isOpen,
    onClose,
    onAddWeekPlan,
    userProfile,
    calorieData,
    isMobile = false
}) {
    const [currentStep, setCurrentStep] = useState('profile'); // 'profile' | 'options' | 'preview'
    const [userInputs, setUserInputs] = useState({
        goal: userProfile?.goal || 'maintain',
        gender: userProfile?.gender || 'male',
        fitnessLevel: userProfile?.fitnessLevel || 'intermediate',
        dietaryRestrictions: [],
        preferredMealCount: null
    });
    const [generatedOptions, setGeneratedOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    const smartRecommendationSystem = new SmartRecommendationSystem();

    // Generate 5 options based on user profile
    const generateOptions = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            console.log('🎯 Generating 5 curated meal plan options...');

            const options = smartRecommendationSystem.getRecommendedPlans(userInputs);

            setGeneratedOptions(options);
            setCurrentStep('options');

            console.log('✅ Generated 5 options successfully');

        } catch (err) {
            console.error('❌ Error generating options:', err);
            setError(`Failed to generate meal plans: ${err.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setCurrentStep('preview');
    };

    const confirmSelection = () => {
        if (selectedOption) {
            console.log('📥 Adding selected meal plan to tracker:', selectedOption);

            // Convert to format expected by MealTracker
            const mealTrackerData = {
                allMeals: selectedOption.allMeals,
                goalType: userInputs.goal,
                eaterType: selectedOption.expertSource,
                mealFrequency: selectedOption.allMeals.length,
                dietaryFilters: userInputs.dietaryRestrictions,

                // Enhanced metadata
                selectedVariation: selectedOption.variation,
                expertSource: selectedOption.expertSource,
                tierSystemApplied: selectedOption.tierSystemApplied,
                generatedWith: 'Enhanced5OptionSystem'
            };

            onAddWeekPlan(mealTrackerData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-screen overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            🎯 Smart Meal Planning (Decision-Free)
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Get 5 expert-curated plans instead of overwhelming choices
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>

                {/* Step 1: Quick Profile */}
                {currentStep === 'profile' && (
                    <div className="p-6 space-y-6">

                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                🚀 Let's Create Your Perfect Meal Plan
                            </h3>
                            <p className="text-gray-600">
                                Answer a few quick questions and get 5 expert-designed options
                            </p>
                        </div>

                        {/* Goal Selection */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">What's your main goal?</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { value: 'lose', emoji: '🔥', label: 'Lose Weight' },
                                    { value: 'maintain', emoji: '⚖️', label: 'Stay Fit' },
                                    { value: 'gain-muscle', emoji: '💪', label: 'Build Muscle' },
                                    { value: 'dirty-bulk', emoji: '🚀', label: 'Maximum Mass' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setUserInputs({ ...userInputs, goal: option.value })}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${userInputs.goal === option.value
                                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{option.emoji}</div>
                                        <div className="font-medium text-sm">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Gender (affects portion sizes)</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: 'male', emoji: '🚹', label: 'Male' },
                                    { value: 'female', emoji: '🚺', label: 'Female' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setUserInputs({ ...userInputs, gender: option.value })}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${userInputs.gender === option.value
                                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{option.emoji}</div>
                                        <div className="font-medium">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fitness Level */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Fitness experience level?</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'beginner', emoji: '🌱', label: 'Beginner' },
                                    { value: 'intermediate', emoji: '💪', label: 'Intermediate' },
                                    { value: 'advanced', emoji: '🏆', label: 'Advanced' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => setUserInputs({ ...userInputs, fitnessLevel: option.value })}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${userInputs.fitnessLevel === option.value
                                                ? 'border-green-500 bg-green-50 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{option.emoji}</div>
                                        <div className="font-medium text-sm">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dietary Restrictions */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Any dietary restrictions?</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                    { value: 'none', emoji: '🚫', label: 'None' },
                                    { value: 'vegetarian', emoji: '🥬', label: 'Vegetarian' },
                                    { value: 'glutenFree', emoji: '🌾', label: 'Gluten-Free' },
                                    { value: 'keto', emoji: '🥑', label: 'Keto' },
                                    { value: 'dairyFree', emoji: '🥛', label: 'Dairy-Free' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            if (option.value === 'none') {
                                                setUserInputs({ ...userInputs, dietaryRestrictions: [] });
                                            } else {
                                                const current = userInputs.dietaryRestrictions;
                                                const updated = current.includes(option.value)
                                                    ? current.filter(r => r !== option.value)
                                                    : [...current, option.value];
                                                setUserInputs({ ...userInputs, dietaryRestrictions: updated });
                                            }
                                        }}
                                        className={`p-3 rounded-xl border-2 text-center transition-all ${(option.value === 'none' && userInputs.dietaryRestrictions.length === 0) ||
                                                userInputs.dietaryRestrictions.includes(option.value)
                                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-lg mb-1">{option.emoji}</div>
                                        <div className="font-medium text-xs">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={generateOptions}
                                disabled={isGenerating}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:transform-none"
                            >
                                {isGenerating ? (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                                        Creating Your 5 Options...
                                    </div>
                                ) : (
                                    '🎯 Get My 5 Expert Meal Plans'
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
                )}

                {/* Step 2: Choose from 5 Options */}
                {currentStep === 'options' && generatedOptions && (
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                🎯 Your 5 Expert-Designed Meal Plans
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {generatedOptions.userMessage}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                            {generatedOptions.variations.map((option, index) => (
                                <div
                                    key={option.id}
                                    className="border-2 border-gray-200 hover:border-blue-500 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg"
                                    onClick={() => selectOption(option)}
                                >
                                    {/* Option Header */}
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-gray-800">{option.name}</h4>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                    #{option.variation}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ⭐ {option.popularity}%
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">{option.description}</p>
                                        <div className="text-xs text-blue-600 font-medium">
                                            📚 {option.expertSource}
                                        </div>
                                    </div>

                                    {/* Meal Preview */}
                                    <div className="space-y-2">
                                        <div className="text-xs font-medium text-gray-700 mb-1">
                                            Meals ({option.allMeals.length}):
                                        </div>
                                        {option.allMeals.slice(0, 3).map((meal, mealIndex) => (
                                            <div key={mealIndex} className="text-xs text-gray-600">
                                                <span className="font-medium">{meal.mealName}:</span>
                                                <span className="ml-1">
                                                    {meal.items.slice(0, 2).map(item => item.food).join(', ')}
                                                    {meal.items.length > 2 && '...'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Difficulty & Macros */}
                                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                                        <div className="text-xs text-gray-500">
                                            Difficulty: {option.difficulty}/5
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            P{option.targetMacros.protein}% C{option.targetMacros.carbs}% F{option.targetMacros.fat}%
                                        </div>
                                    </div>

                                    <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                        Select This Plan →
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Why These Plans */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                            <h4 className="font-semibold text-blue-800 mb-2">🎯 Why These Plans Work</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                                <div>• {generatedOptions.whyThesePlans.eatingStyle}</div>
                                <div>• {generatedOptions.whyThesePlans.mealTiming}</div>
                                <div>• {generatedOptions.whyThesePlans.expertBasis}</div>
                                <div>• {generatedOptions.whyThesePlans.variety}</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => setCurrentStep('profile')}
                                className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                                ← Back to Edit Preferences
                            </button>
                            <div className="text-sm text-gray-500">
                                Plans based on expert research from top nutrition sites
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Preview Selected Plan */}
                {currentStep === 'preview' && selectedOption && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                📋 {selectedOption.name} - Final Preview
                            </h3>
                            <button
                                onClick={() => setCurrentStep('options')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                ← Choose Different Plan
                            </button>
                        </div>

                        {/* Plan Summary */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-green-800">{selectedOption.allMeals.length}</div>
                                    <div className="text-sm text-green-600">Meals per Day</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-800">
                                        {selectedOption.tierSystemApplied?.limitsApplied || 0}
                                    </div>
                                    <div className="text-sm text-green-600">Items Tier-Limited</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-800">{selectedOption.difficulty}/5</div>
                                    <div className="text-sm text-green-600">Difficulty</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-800">{selectedOption.popularity}%</div>
                                    <div className="text-sm text-green-600">User Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Meal Plan */}
                        <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                            {selectedOption.allMeals.map((meal, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-gray-800">{meal.mealName}</h4>
                                        <span className="text-sm text-gray-500">{meal.time}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {meal.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">
                                                    {item.food}
                                                    {item.wasLimited && (
                                                        <span className="text-green-600 ml-1">(✅ tier-limited)</span>
                                                    )}
                                                    {item.expertSource && (
                                                        <span className="text-blue-600 ml-1">({item.expertSource})</span>
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

                        {/* Confirm Selection */}
                        <div className="flex gap-4">
                            <button
                                onClick={confirmSelection}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                ✅ Add "{selectedOption.name}" to My Meal Tracker
                            </button>
                            <button
                                onClick={() => setCurrentStep('options')}
                                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-medium"
                            >
                                Choose Different Plan
                            </button>
                        </div>

                        {/* Expert Source Attribution */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                            <div className="text-xs text-blue-600">
                                🎓 This plan incorporates principles from {selectedOption.expertSource} and leading nutrition experts
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EnhancedWeekPlanModal;