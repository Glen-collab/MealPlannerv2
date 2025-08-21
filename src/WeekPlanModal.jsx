// WeekPlanModal.jsx - Complete advanced meal planning interface

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Clock, Check, AlertTriangle } from 'lucide-react';

// Import the complete meal planning system
import { generateMealPlan } from './mealPlanning/MealPlanGenerator.js';
import { validateDietaryCompliance } from './DietaryFilterSystem.js';

const WeekPlanModal = ({
  isOpen,
  onClose,
  onAddWeekPlan,
  userProfile = {},
  calorieData = null,
  isMobile = false
}) => {
  // State management
  const [selectedEaterType, setSelectedEaterType] = useState('balanced');
  const [selectedMealFreq, setSelectedMealFreq] = useState(5);
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const [error, setError] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(null);
      setValidationResults(null);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentGoal = userProfile.goal || 'maintain';

  // Configuration options
  const goals = [
    { id: 'maintain', label: 'Maintain Weight', color: 'bg-gray-100', icon: '⚖️' },
    { id: 'lose', label: 'Lose Weight', color: 'bg-red-100', icon: '📉' },
    { id: 'gain-muscle', label: 'Gain Muscle', color: 'bg-blue-100', icon: '💪' },
    { id: 'dirty-bulk', label: 'Dirty Bulk', color: 'bg-green-100', icon: '🚀' }
  ];

  const eaterTypes = [
    {
      id: 'balanced',
      label: 'Balanced Eater',
      description: 'Variety of foods, moderate portions',
      icon: '⚖️'
    },
    {
      id: 'performance',
      label: 'Performance Eater',
      description: 'High protein, optimized timing',
      icon: '🏃‍♂️'
    }
  ];

  const mealFrequencies = [
    { id: 3, label: '3 Meals/Day', description: 'Breakfast, Lunch, Dinner' },
    { id: 5, label: '5 Meals/Day', description: 'Main meals + 2 snacks' },
    { id: 6, label: '6 Meals/Day', description: 'Main meals + 2 snacks + post-workout' }
  ];

  const dietaryOptions = [
    {
      id: 'vegetarian',
      label: 'Vegetarian',
      icon: '🌱',
      description: 'Plant-based proteins, no meat or fish',
      color: 'green'
    },
    {
      id: 'glutenFree',
      label: 'Gluten-Free',
      icon: '🌾',
      description: 'No wheat, barley, rye or gluten',
      color: 'yellow'
    },
    {
      id: 'dairyFree',
      label: 'Dairy-Free',
      icon: '🥛',
      description: 'No milk, cheese, or dairy products',
      color: 'blue'
    },
    {
      id: 'keto',
      label: 'Ketogenic',
      icon: '🥑',
      description: 'Very low carb, high fat',
      color: 'purple'
    }
  ];

  // Handle dietary filter selection
  const toggleDietaryFilter = (filterId) => {
    setSelectedDietaryFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  // Calculate target calories for display
  const calculateTargetCalories = () => {
    if (!calorieData) {
      const defaults = { 'lose': 1800, 'maintain': 2200, 'gain-muscle': 2700, 'dirty-bulk': 3000 };
      return defaults[currentGoal] || 2200;
    }

    switch (currentGoal) {
      case 'lose':
        return calorieData.bmr + 50;
      case 'maintain':
        return calorieData.targetCalories || calorieData.tdee;
      case 'gain-muscle':
        return calorieData.tdee + 500;
      case 'dirty-bulk':
        return calorieData.tdee + 700;
      default:
        return calorieData.targetCalories || 2200;
    }
  };

  // Generate meal plan using the new system
  const handleGeneratePlan = async () => {
    if (!userProfile.goal) {
      setError('Please set your goal in Edit Profile first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log('🚀 Generating advanced meal plan...');

      const planOptions = {
        goal: currentGoal,
        eaterType: selectedEaterType,
        mealFreq: selectedMealFreq,
        dietaryFilters: selectedDietaryFilters,
        userProfile: userProfile,
        calorieData: calorieData
      };

      // Generate the meal plan using the new system
      const generatedPlan = generateMealPlan(planOptions);

      // Validate dietary compliance
      const validation = validateDietaryCompliance(generatedPlan, selectedDietaryFilters);

      setSelectedPlan(generatedPlan);
      setValidationResults(validation);

      console.log('✅ Advanced meal plan generated successfully');

    } catch (error) {
      console.error('❌ Error generating meal plan:', error);
      setError(`Failed to generate meal plan: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Confirm and use the generated plan
  const handleConfirmPlan = () => {
    if (selectedPlan) {
      const planWithMetadata = {
        ...selectedPlan,
        generatedWith: 'advanced-system',
        validationResults: validationResults
      };

      onAddWeekPlan(planWithMetadata);
      onClose();
    }
  };

  // Get color for dietary filter badges
  const getFilterColor = (filterId) => {
    const option = dietaryOptions.find(opt => opt.id === filterId);
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return colors[option?.color] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg w-full ${isMobile ? 'max-w-sm max-h-full' : 'max-w-4xl max-h-[95vh]'} overflow-hidden flex flex-col`}>

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-blue-50">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 flex items-center gap-2`}>
            <Calendar size={24} />
            Advanced Meal Planner
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">v2.0</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {!selectedPlan ? (
            /* Configuration Interface */
            <div className="space-y-8">

              {/* Current Goal Display */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Your Current Goal</h3>
                <div className="flex justify-center">
                  <span className={`px-4 py-2 rounded-lg border-2 ${goals.find(g => g.id === currentGoal)?.color || 'bg-gray-100'
                    } border-blue-300`}>
                    <div className="text-2xl mb-1">
                      {goals.find(g => g.id === currentGoal)?.icon || '⚖️'}
                    </div>
                    <div className="font-medium text-gray-800">
                      {goals.find(g => g.id === currentGoal)?.label || 'Maintain Weight'}
                    </div>
                    {calorieData && (
                      <div className="text-xs text-gray-600 mt-1">
                        Target: {calculateTargetCalories()} calories
                      </div>
                    )}
                  </span>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🥗 1. Dietary Preferences
                  <span className="text-sm font-normal text-gray-500">(Optional)</span>
                </h3>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                  {dietaryOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleDietaryFilter(option.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${selectedDietaryFilters.includes(option.id)
                          ? `border-${option.color}-500 bg-${option.color}-50 text-${option.color}-700 shadow-md`
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {selectedDietaryFilters.includes(option.id) && (
                          <Check size={16} className="text-green-600 ml-auto" />
                        )}
                      </div>
                      <div className="text-sm">{option.description}</div>
                    </button>
                  ))}
                </div>

                {/* Selected filters summary */}
                {selectedDietaryFilters.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800 mb-2">
                      Selected Dietary Preferences:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedDietaryFilters.map(filterId => {
                        const option = dietaryOptions.find(opt => opt.id === filterId);
                        return (
                          <span
                            key={filterId}
                            className={`px-3 py-1 rounded-full border text-xs font-medium ${getFilterColor(filterId)}`}
                          >
                            {option?.icon} {option?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Eating Style */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users size={20} />
                  2. Choose Your Eating Style
                </h3>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                  {eaterTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedEaterType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${selectedEaterType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                        {selectedEaterType === type.id && (
                          <Check size={16} className="text-blue-600 ml-auto" />
                        )}
                      </div>
                      <div className="text-sm">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Frequency */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  3. Choose Meal Frequency
                </h3>
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}>
                  {mealFrequencies.map(freq => (
                    <button
                      key={freq.id}
                      onClick={() => setSelectedMealFreq(freq.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${selectedMealFreq === freq.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                      <div className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
                        {freq.label}
                        {selectedMealFreq === freq.id && <Check size={16} className="text-blue-600" />}
                      </div>
                      <div className="text-sm">{freq.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-800">Error</div>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

              {/* Generate Plan Button */}
              <div className="text-center pt-4">
                {userProfile.goal ? (
                  <button
                    onClick={handleGeneratePlan}
                    disabled={isGenerating}
                    className={`px-8 py-3 rounded-lg font-medium text-lg transition-all ${isGenerating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      }`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </span>
                    ) : (
                      <span>
                        🎯 Generate Advanced Meal Plan
                        {selectedDietaryFilters.length > 0 && (
                          <span className="ml-2 text-sm">
                            ({selectedDietaryFilters.length} filter{selectedDietaryFilters.length > 1 ? 's' : ''})
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium text-lg cursor-not-allowed">
                      🎯 Complete Profile First
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Please set your goal in Edit Profile to generate a meal plan
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Plan Preview */
            <div className="space-y-6">

              {/* Plan Header */}
              <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Your Custom Meal Plan</h3>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="bg-blue-100 px-3 py-1 rounded-full">
                    🎯 {goals.find(g => g.id === currentGoal)?.label}
                  </span>
                  <span className="bg-purple-100 px-3 py-1 rounded-full">
                    👥 {eaterTypes.find(e => e.id === selectedEaterType)?.label}
                  </span>
                  <span className="bg-orange-100 px-3 py-1 rounded-full">
                    ⏰ {selectedMealFreq} Meals/Day
                  </span>
                  {selectedDietaryFilters.map(filter => {
                    const option = dietaryOptions.find(opt => opt.id === filter);
                    return (
                      <span key={filter} className={`px-3 py-1 rounded-full ${getFilterColor(filter)}`}>
                        {option?.icon} {option?.label}
                      </span>
                    );
                  })}
                </div>

                {/* Nutrition Summary */}
                {selectedPlan.nutrition && (
                  <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-lg font-bold text-red-600">{selectedPlan.nutrition.calories}</div>
                      <div className="text-xs text-gray-500">Calories</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-lg font-bold text-blue-600">{selectedPlan.nutrition.protein}g</div>
                      <div className="text-xs text-gray-500">Protein</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-lg font-bold text-green-600">{selectedPlan.nutrition.carbs}g</div>
                      <div className="text-xs text-gray-500">Carbs</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="text-lg font-bold text-yellow-600">{selectedPlan.nutrition.fat}g</div>
                      <div className="text-xs text-gray-500">Fat</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Results */}
              {validationResults && (
                <div className={`p-4 rounded-lg border ${validationResults.isCompliant
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                  }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {validationResults.isCompliant ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <AlertTriangle size={16} className="text-yellow-600" />
                    )}
                    <span className={`font-medium text-sm ${validationResults.isCompliant ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                      Dietary Compliance Check
                    </span>
                  </div>
                  <div className={`text-sm ${validationResults.isCompliant ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                    {validationResults.summary}
                  </div>
                </div>
              )}

              {/* Meal Plan Display */}
              <div className="space-y-4">
                {selectedPlan.allMeals.map((meal, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-gray-800">{meal.mealName}</h4>
                      <span className="text-sm text-gray-600">{meal.time}</span>
                    </div>
                    <div className="space-y-1">
                      {meal.items.filter(item => item.food).map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm text-gray-700 flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            {item.food}
                            {item.substitutionReason && (
                              <span className="text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded">
                                {item.substitutionReason}
                              </span>
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
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  ← Back to Options
                </button>
                <button
                  onClick={handleConfirmPlan}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg"
                >
                  ✅ Use This Plan
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WeekPlanModal;