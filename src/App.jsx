import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// 🆕 UPDATED IMPORTS - Enhanced meal planning system
import { FoodDatabase, getFoodsInCategory, getServingInfo, checkDietaryCompatibility } from './mealPlanning/FoodDatabase.js';
import { generateMealPlan } from './mealPlanning/MealPlanGenerator.js';
import { applyDietaryFilters } from './mealPlanning/DietaryFilterSystem.js';
import { USDAMealCreator } from './USDAMealCreator.jsx';
import MealSwipeGame from './MealSwipeGame.jsx';
import DailyMealPlannerModule from './DailyMealPlannerModule.jsx';
import ProfileModule from './ProfileModule.jsx';
import MealIdeasModal from './MealIdeas.jsx';
import { MealMessages } from './MealMessages/index.js';
import WeekPlanModal from './mealPlanning/WeekPlanModal.jsx';
import PrintableNutritionPlan from './PrintableNutritionPlan.jsx';
import UltimateFitnessCardTrick from './UltimateFitnessCardTrick.jsx';
import { GlenSaysMotivation, GlenSaysMini } from './MealMessages/DailyMotivation.js';
import { TierSystemManager } from './mealPlanning/CentralizedTierSystem.js';
// Import chart components from WelcomeScreen module
import {
  ClickableBurnAndLearnView,
  CustomTrendsView,
  CustomBarChartView,
  DailyPieChartView,
  BarChartView
} from './WelcomeScreen.jsx';

// 🔧 FIXED: Move helper functions to top level, outside of any component
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = hours * 60 + (minutes || 0);

  if (period === 'PM' && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hours === 12) {
    totalMinutes -= 12 * 60;
  }

  return totalMinutes;
};

const getSortedMealsByTime = (meals) => {
  return [...meals].sort((a, b) => {
    const timeA = timeToMinutes(a.time);
    const timeB = timeToMinutes(b.time);
    return timeA - timeB;
  });
};
// 🔧 ADDED: Rounding function for user-friendly serving sizes
const roundToUserFriendly = (serving, unit) => {
  if (serving <= 0) return 0.25; // Minimum serving

  const normalizedUnit = unit?.toLowerCase() || '';

  // 🥤 CUPS: Round to nice fractions
  if (normalizedUnit.includes('cup')) {
    if (serving <= 0.375) return 0.25;      // → 1/4 cup
    if (serving <= 0.625) return 0.5;       // → 1/2 cup  
    if (serving <= 0.875) return 0.75;      // → 3/4 cup
    if (serving <= 1.25) return 1;          // → 1 cup
    if (serving <= 1.625) return 1.5;       // → 1 1/2 cups
    return Math.round(serving * 2) / 2;     // → 2, 2.5, 3, etc.
  }

  // 🥄 SERVINGS: Round to whole numbers or halves
  else if (normalizedUnit === 'serving' || normalizedUnit === 'servings') {
    if (serving <= 0.75) return 0.5;        // → 1/2 serving
    if (serving <= 1.25) return 1;          // → 1 serving
    if (serving <= 1.75) return 1.5;        // → 1.5 servings
    return Math.round(serving);              // → 2, 3, 4, etc.
  }

  // 🔢 DEFAULT: Round to halves
  else {
    if (serving <= 0.75) return 0.5;        // → 0.5
    if (serving <= 1.25) return 1;          // → 1
    if (serving <= 1.75) return 1.5;        // → 1.5
    return Math.round(serving * 2) / 2;     // → 2, 2.5, 3, etc.
  }
};
// FIXED: ServingPickerModal - NO tier limits for manual additions
function ServingPickerModal({ isOpen, currentServing, currentUnit, foodData, category, foodName, onSelectServing, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedFraction, setSelectedFraction] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('servings');

  const servingInfo = getServingInfo(category, foodName);

  useEffect(() => {
    if (isOpen) {
      // Parse current serving to set initial values
      if (currentServing) {
        const wholeNumber = Math.floor(currentServing);
        const fraction = currentServing - wholeNumber;

        setSelectedAmount(wholeNumber || 1);

        // Set fraction based on decimal
        if (Math.abs(fraction - 0.25) < 0.01) setSelectedFraction(0.25);
        else if (Math.abs(fraction - 0.5) < 0.01) setSelectedFraction(0.5);
        else if (Math.abs(fraction - 0.75) < 0.01) setSelectedFraction(0.75);
        else setSelectedFraction(0);
      }
      setSelectedUnit(currentUnit || 'servings');
    }
  }, [isOpen, currentServing, currentUnit]);

  const handleConfirm = () => {
    const totalAmount = selectedAmount + selectedFraction;
    let finalServings = totalAmount;

    // Convert to servings if different unit selected
    if (selectedUnit === 'ounces' && servingInfo.ounces) {
      finalServings = totalAmount / servingInfo.ounces;
    } else if (selectedUnit === 'grams' && servingInfo.grams) {
      finalServings = totalAmount / servingInfo.grams;
    }

    // 🔧 NO TIER LIMITS - User has full control for manual additions
    onSelectServing(finalServings, selectedUnit);
    onClose();
  };

  // Calculate preview nutrition based on selection (no limits)
  const getPreviewNutrition = () => {
    const totalAmount = selectedAmount + selectedFraction;
    let servingMultiplier = totalAmount;

    if (selectedUnit === 'ounces' && servingInfo.ounces) {
      servingMultiplier = totalAmount / servingInfo.ounces;
    } else if (selectedUnit === 'grams' && servingInfo.grams) {
      servingMultiplier = totalAmount / servingInfo.grams;
    }

    return {
      calories: Math.round(foodData.calories * servingMultiplier),
      protein: Math.round(foodData.protein * servingMultiplier * 10) / 10,
      carbs: Math.round(foodData.carbs * servingMultiplier * 10) / 10,
      fat: Math.round(foodData.fat * servingMultiplier * 10) / 10
    };
  };

  if (!isOpen) return null;

  // Full 12 serving options available for manual additions
  const amounts = Array.from({ length: 12 }, (_, i) => i + 1);
  const fractions = [
    { display: '0', value: 0 },
    { display: '1/4', value: 0.25 },
    { display: '1/2', value: 0.5 },
    { display: '3/4', value: 0.75 }
  ];
  const units = ['servings', 'ounces', 'grams'];

  const previewNutrition = getPreviewNutrition();
  const totalAmount = selectedAmount + selectedFraction;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Amount</h3>
            <p className="text-sm text-gray-600">{foodName}</p>
            {/* 🔧 NEW: Show user freedom message */}
            <p className="text-xs text-blue-600">
              Add any amount you want • No limits on manual additions
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Whole Numbers Column - Full 12 available */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Amount</h4>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedAmount === amount ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Fractions Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">+ Fraction</h4>
              <div className="space-y-3">
                {fractions.map((fraction) => (
                  <button
                    key={fraction.value}
                    onClick={() => setSelectedFraction(fraction.value)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedFraction === fraction.value ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    {fraction.display}
                  </button>
                ))}
              </div>
            </div>

            {/* Units Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Unit</h4>
              <div className="space-y-3">
                {units.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setSelectedUnit(unit)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm ${selectedUnit === unit ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selection Preview */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {totalAmount} {selectedUnit}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {selectedUnit === 'servings' && servingInfo.palm && (
                <div>Reference: {servingInfo.palm}</div>
              )}
              {selectedUnit === 'ounces' && (
                <div>≈ {Math.round((totalAmount / servingInfo.ounces) * 10) / 10} servings</div>
              )}
              {selectedUnit === 'grams' && (
                <div>≈ {Math.round((totalAmount / servingInfo.grams) * 10) / 10} servings</div>
              )}
            </div>

            {/* Nutrition Preview */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-sm font-medium text-gray-700 mb-2">Nutrition Preview:</div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="text-center">
                  <div className="font-bold text-red-600">{previewNutrition.calories}</div>
                  <div className="text-gray-500">cal</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{previewNutrition.protein}g</div>
                  <div className="text-gray-500">protein</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{previewNutrition.carbs}g</div>
                  <div className="text-gray-500">carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-yellow-600">{previewNutrition.fat}g</div>
                  <div className="text-gray-500">fat</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button onClick={handleConfirm} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Add {totalAmount} {selectedUnit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Time Picker Modal Component
function TimePickerModal({ isOpen, currentTime, onSelectTime, onClose }) {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  useEffect(() => {
    if (isOpen && currentTime) {
      const timeParts = currentTime.split(' ');
      if (timeParts.length === 2) {
        const [time, period] = timeParts;
        const [hour, minute] = time.split(':');
        setSelectedHour(parseInt(hour));
        setSelectedMinute(minute);
        setSelectedPeriod(period);
      }
    }
  }, [isOpen, currentTime]);

  const handleConfirm = () => {
    const formattedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    onSelectTime(formattedTime);
    onClose();
  };

  if (!isOpen) return null;

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];
  const periods = ['AM', 'PM'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Select Time</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Hour</h4>
              <div className="grid grid-cols-2 gap-2">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Minutes</h4>
              <div className="space-y-3">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    onClick={() => setSelectedMinute(minute)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedMinute === minute ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    :{minute}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Period</h4>
              <div className="space-y-3">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedPeriod === period ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {selectedHour}:{selectedMinute} {selectedPeriod}
            </div>
            <p className="text-gray-600">Selected Time</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button onClick={handleConfirm} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Confirm Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Foods Modal Component - CLEANED UP VERSION
function AddFoodsModal({ isOpen, onClose, mealId, mealName, onSelectCategory, onOpenMealIdeas, mealSources }) {
  if (!isOpen) return null;

  const source = mealSources[mealName];
  const isUSDAOwned = source === 'usda';

  const categories = [
    [
      { name: 'Protein', icon: '🗲', color: 'bg-blue-500' },
      { name: 'Carbs', icon: '🍞', color: 'bg-green-500' }
    ],
    [
      { name: 'Healthy Fats', icon: '🥑', color: 'bg-yellow-500' },
      { name: 'Supplements', icon: '💊', color: 'bg-purple-500' }
    ],
    [
      { name: 'Fruit', icon: '🍎', color: 'bg-red-500' },
      { name: 'Vegetables', icon: '🥬', color: 'bg-green-600' }
    ],
    [
      { name: 'Condiments', icon: '🧂', color: 'bg-gray-500' },
      { name: 'Junk/Drink', icon: '🍺', color: 'bg-orange-500' }
    ]
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md" style={{ height: '500px' }}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Add Foods to {mealName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-hidden flex flex-col">
          {isUSDAOwned ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center flex-1 flex flex-col items-center justify-center">
              <div className="text-4xl mb-4">🔒</div>
              <div className="text-blue-600 font-medium text-lg mb-2">This meal is managed by USDA Search</div>
              <div className="text-blue-500 text-sm">Use the USDA Create Meal to modify</div>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {categories.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-3">
                  {row.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        onSelectCategory(category.name, mealId);
                        onClose();
                      }}
                      className={`${category.color} text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex flex-col items-center justify-center gap-1`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm font-semibold text-center">{category.name}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MealMessageSection({ meal, profile, getMealMessage }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (meal && meal.calories > 0) {
      const mealMessage = getMealMessage(meal);
      setMessage(mealMessage || '');
    } else {
      setMessage('');
    }
  }, [meal, profile, getMealMessage]);

  if (!message) return null;

  return (
    <div className="pt-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-2">Nutrition Insight</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// UPDATED Food Category Grid - Now just shows Add Foods button
function FoodCategoryGrid({ mealId, onSelectCategory, mealSources, mealName, onOpenMealIdeas, onOpenAddFoodsModal }) {
  const source = mealSources[mealName];
  const isUSDAOwned = source === 'usda';
  const supportsMealIdeas = ['Breakfast', 'Lunch', 'Dinner'].includes(mealName);

  if (isUSDAOwned) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Add Foods</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-blue-600 font-medium text-sm">🔒 This meal is managed by USDA Search</div>
          <div className="text-blue-500 text-xs mt-1">Use the USDA Create Meal to modify</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* ADD FOOD BUTTON */}
      <button
        onClick={() => onOpenAddFoodsModal(mealId, mealName)}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">➕</span>
        <span>Add Foods</span>
      </button>

      {/* MEAL IDEAS BUTTON - Only for main meals */}
      {supportsMealIdeas && onOpenMealIdeas && (
        <button
          onClick={() => onOpenMealIdeas(mealName.toLowerCase())}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">💡</span>
          <span>{mealName} Ideas</span>
          <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Quick</span>
        </button>
      )}
    </div>
  );
}

// FIXED: FoodSelectionModal - Clean interface for manual additions
function FoodSelectionModal({ category, mealId, onAddFood, onClose }) {
  const [selectedFood, setSelectedFood] = useState('');
  const [servings, setServings] = useState(1);
  const [servingUnit, setServingUnit] = useState('servings');
  const [showServingPicker, setShowServingPicker] = useState(false);

  const foodCategoryMapping = {
    'Protein': 'protein',
    'Carbs': 'carbohydrate',
    'Healthy Fats': 'fat',
    'Supplements': 'supplements',
    'Fruit': 'fruits',
    'Vegetables': 'vegetables',
    'Condiments': 'condiments',
    'Junk/Drink': 'snacks'
  };

  const dbCategory = foodCategoryMapping[category];
  const foods = getFoodsInCategory(dbCategory);

  const handleAddFood = () => {
    if (selectedFood && servings > 0) {
      onAddFood(mealId, dbCategory, selectedFood, servings);
      onClose();
    }
  };

  const handleServingSelection = (newServings, unit) => {
    setServings(newServings);
    setServingUnit(unit);
    setShowServingPicker(false);
  };

  const selectedFoodData = selectedFood ? FoodDatabase[dbCategory]?.[selectedFood] : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg h-5/6 flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{category}</h3>
            {/* 🔧 NEW: Show user freedom message */}
            <p className="text-xs text-green-600">Manual addition • Add any amount you want</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        {/* Food List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {foods.map((food) => {
              const servingInfo = getServingInfo(dbCategory, food);
              const foodData = FoodDatabase[dbCategory][food];

              return (
                <button
                  key={food}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full p-2 rounded-lg border-2 text-left transition-colors ${selectedFood === food ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="text-sm leading-tight">
                    <span className="font-bold text-gray-800">{food}</span>
                    <span className="text-gray-600"> - {Math.round(foodData.calories)} cal per serving - </span>
                    <span className="text-blue-600">{servingInfo.palm}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Fixed */}
        {selectedFood && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-3 font-medium">
                Reference: {getServingInfo(dbCategory, selectedFood).palm}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-gray-700">Amount:</label>
                <button
                  onClick={() => setShowServingPicker(true)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {servings} {servingUnit}
                </button>
              </div>

              {/* Nutrition Preview */}
              {selectedFoodData && (
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-700 mb-2">Nutrition Preview:</div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-red-600">{Math.round(selectedFoodData.calories * servings)}</div>
                      <div className="text-gray-500">cal</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{Math.round(selectedFoodData.protein * servings * 10) / 10}g</div>
                      <div className="text-gray-500">protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{Math.round(selectedFoodData.carbs * servings * 10) / 10}g</div>
                      <div className="text-gray-500">carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-600">{Math.round(selectedFoodData.fat * servings * 10) / 10}g</div>
                      <div className="text-gray-500">fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleAddFood}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg"
            >
              Add {selectedFood}
            </button>
          </div>
        )}
      </div>

      {/* Serving Picker Modal - No tier limits */}
      <ServingPickerModal
        isOpen={showServingPicker}
        currentServing={servings}
        currentUnit={servingUnit}
        foodData={selectedFoodData}
        category={dbCategory}
        foodName={selectedFood}
        onSelectServing={handleServingSelection}
        onClose={() => setShowServingPicker(false)}
      />
    </div>
  );
}

// UPDATED: MealFoodList to show different badges for generated vs manual
function MealFoodList({ meal, onRemoveFood, mealSources, readOnly = false }) {
  if (!meal.items || meal.items.length === 0) return null;

  const source = mealSources[meal.name];
  const isUSDAOwned = source === 'usda';
  const isEnhancedPlan = source?.includes('weekplan') || source?.includes('enhanced');

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
        Added Foods:
        {isUSDAOwned && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">USDA</span>}
        {isEnhancedPlan && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Generated</span>}
      </h4>
      {meal.items.map((item, index) => {
        const servingInfo = item.category ? getServingInfo(item.category, item.food) : null;
        const isGenerated = item.source && (item.source.includes('weekplan') || item.source.includes('enhanced') || item.tierData);
        const isManual = item.source === 'manual-addition' || item.source === 'quickview';

        return (
          <div key={index} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center">
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800 flex items-center gap-2">
                {item.food}
                {/* Show different badges for generated vs manual */}
                {isGenerated && item.tierData && (
                  <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded">
                    Generated T{item.tierData.tier}
                    {item.tierData.wasLimited && ' ✓'}
                  </span>
                )}
                {isManual && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded">
                    Manual
                  </span>
                )}
                {/* Show if this was substituted */}
                {item.originalFood && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    Was: {item.originalFood}
                  </span>
                )}
              </div>
              {item.brand && <div className="text-xs text-blue-600">{item.brand}</div>}
              <div className="text-xs text-gray-600">
                {Math.round(item.servings * 10) / 10}x serving • {Math.round(item.calories)} cal

                {/* Show tier limit info for generated items */}
                {isGenerated && item.tierData?.wasLimited && (
                  <div className="text-xs text-green-600 mt-1">
                    Generated: Limited from {item.tierData.originalServing} to {item.servings} servings
                  </div>
                )}

                {item.source === 'usda' && item.servingInfo && (
                  <div className="text-xs text-gray-500 mt-1">{item.servingInfo.description}</div>
                )}
                {item.source !== 'usda' && servingInfo && (
                  <div className="text-xs text-blue-500 mt-1">{servingInfo.palm}</div>
                )}
                {/* Show dietary compliance */}
                {item.dietaryTags && Object.keys(item.dietaryTags).length > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    Dietary: {Object.keys(item.dietaryTags).filter(tag => item.dietaryTags[tag]).join(', ')}
                  </div>
                )}
                {item.substitutionReason && (
                  <div className="text-xs text-orange-600 mt-1">
                    Substituted for: {item.substitutionReason}
                  </div>
                )}
                {item.source === 'usda' && <span className="ml-2 text-blue-500">USDA</span>}
                {isEnhancedPlan && <span className="ml-2 text-green-500">Generated</span>}
              </div>
            </div>
            {!readOnly && !isUSDAOwned && (
              <button onClick={() => onRemoveFood(meal.id, index)} className="text-red-500 hover:text-red-700 text-sm ml-2">✕</button>
            )}
            {isUSDAOwned && <div className="text-gray-400 text-sm ml-2">🔒</div>}
          </div>
        );
      })}
    </div>
  );
}

// 🔧 FIXED: Full Screen Swipe Interface Component
function FullScreenSwipeInterface({
  meals,
  currentCard,
  setCurrentCard,
  cardPositions,
  isDragging,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  onExit,
  openFoodSelection,
  removeFoodFromMeal,
  updateMeal,
  setMeals,
  profile,
  getMealMessage,
  mealSources,
  onClaimMeal,
  onOpenMealIdeas,
  onOpenAddFoodsModal
}) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedMealForTime, setSelectedMealForTime] = useState(null);

  const openTimePicker = (mealId) => {
    const meal = meals.find(m => m.id === mealId);
    const source = mealSources[meal?.name];

    if (source === 'usda') return;

    setSelectedMealForTime(mealId);
    setShowTimePicker(true);
  };

  const closeTimePicker = () => {
    setShowTimePicker(false);
    setSelectedMealForTime(null);
  };

  const handleTimeSelection = (newTime) => {
    if (selectedMealForTime) {
      const meal = meals.find(m => m.id === selectedMealForTime);
      onClaimMeal(meal.name, 'quickview');
      setMeals(prev => prev.map(m => m.id === selectedMealForTime ? { ...m, time: newTime } : m));
    }
  };

  const getCurrentMeal = () => meals.find(m => m.id === selectedMealForTime);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-50">
      <div className="h-full flex flex-col">
        <div className="p-4 text-center text-white">
          <div className="flex justify-between items-center">
            <div className="w-8"></div>
            <div>
              <p className="text-sm opacity-80">Swipe left or right • Meal {currentCard + 1} of {meals.length}</p>
            </div>
            <button onClick={onExit} className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center">×</button>
          </div>
        </div>

        <div className="flex-1 relative px-4 pb-4">
          {/* 🔧 FIXED: Added proper index parameter to map function */}
          {meals.map((meal, index) => {
            const isActive = index === currentCard;
            const position = cardPositions[index];
            const zIndex = isActive ? 20 : meals.length - Math.abs(index - currentCard);
            const scale = isActive ? 1 : 0.95;
            const opacity = isActive ? 1 : 0.7;
            const source = mealSources[meal.name];
            const isUSDAOwned = source === 'usda';

            return (
              <div
                key={meal.id}
                className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{
                  transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${position.rotation}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: isDragging && isActive ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out'
                }}
                onMouseDown={isActive ? handleMouseDown : undefined}
                onMouseMove={isActive ? handleMouseMove : undefined}
                onMouseUp={isActive ? handleMouseUp : undefined}
                onMouseLeave={isActive ? handleMouseUp : undefined}
                onTouchStart={isActive ? handleMouseDown : undefined}
                onTouchMove={isActive ? handleMouseMove : undefined}
                onTouchEnd={isActive ? handleMouseUp : undefined}
              >
                <div className="bg-white rounded-3xl shadow-2xl w-full h-full flex flex-col">
                  <div className="p-4 flex-shrink-0">
                    <div className="text-center">
                      <div className="mb-3 flex items-center justify-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
                        {isUSDAOwned && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">USDA</span>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <div className="text-4xl">
                          {meal.name === 'Breakfast' && '🍳'}
                          {meal.name === 'FirstSnack' && '🍎'}
                          {meal.name === 'SecondSnack' && '🥨'}
                          {meal.name === 'Lunch' && '🥗'}
                          {meal.name === 'MidAfternoon Snack' && '🥜'}
                          {meal.name === 'Dinner' && '🍽️'}
                          {meal.name === 'Late Snack' && '🍔'}
                          {meal.name === 'PostWorkout' && '💪'}
                          {!['Breakfast', 'FirstSnack', 'SecondSnack', 'Lunch', 'MidAfternoon Snack', 'Dinner', 'Late Snack', 'PostWorkout'].includes(meal.name) && '🌟'}
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{Math.round(meal.calories)} cal</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            openTimePicker(meal.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          disabled={isUSDAOwned}
                          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${isUSDAOwned ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                          🕘 {meal.time}
                          {isUSDAOwned && <span className="text-xs">🔒</span>}
                        </button>
                      </div>

                      <div className="mt-2 text-center">
                        <div className="text-xs font-bold text-red-600">
                          P: {Math.round(meal.protein)}g • C: {Math.round(meal.carbs)}g • F: {Math.round(meal.fat)}g
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 pb-6 no-swipe-zone">
                    <div className="space-y-6">
                      <FoodCategoryGrid
                        mealId={meal.id}
                        onSelectCategory={openFoodSelection}
                        mealSources={mealSources}
                        mealName={meal.name}
                        onOpenMealIdeas={onOpenMealIdeas}
                        onOpenAddFoodsModal={onOpenAddFoodsModal}
                      />

                      <MealFoodList
                        meal={meal}
                        onRemoveFood={removeFoodFromMeal}
                        mealSources={mealSources}
                      />

                      <MealMessageSection meal={meal} profile={profile} getMealMessage={getMealMessage} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <TimePickerModal
          isOpen={showTimePicker}
          currentTime={getCurrentMeal()?.time}
          onSelectTime={handleTimeSelection}
          onClose={closeTimePicker}
        />
      </div>
    </div>
  );
}

const MealSwipeApp = () => {
  // Use ProfileModule's default structure instead of simple profile
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    heightFeet: '5',
    heightInches: '8',
    weight: '150',
    exerciseLevel: 'moderate',
    goal: 'Gain-muscle',
    gender: 'non-binary'
  });

  const [mealSources, setMealSources] = useState({
    'Breakfast': null,
    'FirstSnack': null,
    'SecondSnack': null,
    'Lunch': null,
    'MidAfternoon Snack': null,
    'Dinner': null,
    'Late Snack': null,
    'PostWorkout': null
  });

  // 🆕 NEW: Dietary filter state management
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState([]);
  const [complianceCheck, setComplianceCheck] = useState({ isCompliant: true, violations: [] });

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

  const [meals, setMeals] = useState([
    { id: 8, name: 'PostWorkout', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '5:00 AM', items: [] }, // FIRST - 5:00 AM
    { id: 1, name: 'Breakfast', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '7:00 AM', items: [] },      // SECOND - 7:00 AM  
    { id: 2, name: 'FirstSnack', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '9:30 AM', items: [] },    // THIRD - 9:30 AM
    { id: 3, name: 'SecondSnack', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '11:00 AM', items: [] },  // FOURTH - 11:00 AM
    { id: 4, name: 'Lunch', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '12:30 PM', items: [] },        // FIFTH - 12:30 PM
    { id: 5, name: 'MidAfternoon Snack', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '3:30 PM', items: [] }, // SIXTH - 3:30 PM
    { id: 6, name: 'Dinner', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '6:30 PM', items: [] },        // SEVENTH - 6:30 PM
    { id: 7, name: 'Late Snack', protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0, time: '8:30 PM', items: [] }     // EIGHTH - 8:30 PM
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [cardPositions, setCardPositions] = useState(meals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [isScrollModal, setIsScrollModal] = useState(false);
  const [isFullScreenSwipe, setIsFullScreenSwipe] = useState(false);
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showCardMagic, setShowCardMagic] = useState(false); // NEW: Card Magic state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMealForFood, setSelectedMealForFood] = useState(null);

  // NEW: Add Foods Modal state
  const [showAddFoodsModal, setShowAddFoodsModal] = useState(false);
  const [selectedMealForAddFoods, setSelectedMealForAddFoods] = useState(null);
  const [selectedMealNameForAddFoods, setSelectedMealNameForAddFoods] = useState('');

  // State for MealIdeas
  const [showMealIdeas, setShowMealIdeas] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  // Add WeekPlanModal state
  const [isWeekPlanModalOpen, setIsWeekPlanModalOpen] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Analytics modals state
  const [showBurnAndLearn, setShowBurnAndLearn] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const [burnAndLearnDetails, setBurnAndLearnDetails] = useState(null);
  const [showGlenSays, setShowGlenSays] = useState(false);

  const dragRef = useRef({ startX: 0, startY: 0 });

  // 🆕 NEW: Check dietary compliance when dietary filters change
  useEffect(() => {
    if (selectedDietaryFilters.length > 0) {
      const compliance = checkMealPlanCompliance(selectedDietaryFilters);
      setComplianceCheck(compliance);

      if (!compliance.isCompliant) {
        console.warn('Dietary compliance issues:', compliance.violations);
      }
    }
  }, [selectedDietaryFilters, meals]);

  // 🆕 NEW: Dietary compliance checking function
  const checkMealPlanCompliance = (dietaryFilters = []) => {
    if (dietaryFilters.length === 0) return { isCompliant: true, violations: [] };

    const violations = [];

    meals.forEach((meal, mealIndex) => {
      meal.items?.forEach((item, itemIndex) => {
        if (item.food && item.category) {
          const isCompliant = checkDietaryCompatibility(item.food, item.category, dietaryFilters);
          if (!isCompliant) {
            violations.push({
              meal: meal.name,
              food: item.food,
              category: item.category,
              violatedFilters: dietaryFilters.filter(filter =>
                !FoodDatabase[item.category]?.[item.food]?.dietaryTags?.[filter]
              ),
              mealIndex,
              itemIndex
            });
          }
        }
      });
    });

    return {
      isCompliant: violations.length === 0,
      violations,
      summary: violations.length === 0
        ? `✅ All meals comply with ${dietaryFilters.join(', ')} restrictions`
        : `⚠️ Found ${violations.length} dietary violations`
    };
  };

  // 🆕 NEW: Generate custom meal plan using enhanced system
  const generateCustomMealPlan = async () => {
    try {
      const options = {
        goal: profile.goal || 'maintain',
        eaterType: 'balanced',
        mealFreq: 5,
        dietaryFilters: selectedDietaryFilters,
        userProfile: profile,
        calorieData: calculateTDEE(profile)
      };

      console.log('🎯 Generating custom meal plan with options:', options);

      const customPlan = generateMealPlan(options);

      if (customPlan) {
        handleAddWeekPlan(customPlan);
        console.log('✅ Custom meal plan generated successfully');
      }
    } catch (error) {
      console.error('❌ Error generating custom meal plan:', error);
    }
  };

  // Handle Burn & Learn item clicks
  const handleBurnAndLearnClick = (item) => {
    const currentCalorieData = calculateTDEE(profile);
    const details = {
      'tdee': {
        title: '🔥 Total Daily Energy Expenditure',
        content: `Your TDEE of ${currentCalorieData.tdee} calories represents how much energy your body burns in a full day, including exercise. This is calculated from your BMR (${currentCalorieData.bmr} cal) plus activity level (${profile.exerciseLevel}).`
      },
      'surplus-deficit': {
        title: totalMacros.calories > currentCalorieData.targetCalories ? '📈 Caloric Surplus' : '📉 Caloric Deficit',
        content: totalMacros.calories > currentCalorieData.targetCalories
          ? `You're eating ${Math.abs(totalMacros.calories - currentCalorieData.targetCalories)} calories above your target. This surplus will contribute to weight gain - perfect for ${profile.goal === 'dirty-bulk' ? 'dirty bulking' : 'muscle building'} goals!`
          : `You're eating ${Math.abs(totalMacros.calories - currentCalorieData.targetCalories)} calories below your target. This deficit will contribute to weight loss and help with ${profile.goal === 'lose' ? 'fat loss' : 'lean gains'} goals.`
      },
      'protein-target': {
        title: '💪 Protein Target',
        content: `Your protein goal of ${profile.goal === 'dirty-bulk' ? '150g' : profile.goal === 'Gain-muscle' ? '130g' : profile.goal === 'lose' ? '120g' : '100g'} is optimized for ${profile.goal}. You've consumed ${Math.round(totalMacros.protein)}g so far. Protein helps build muscle, keeps you full, and supports recovery.`
      },
      'macro-balance': {
        title: '⚖️ Macro Balance',
        content: totalMacros.calories > 0
          ? `You're tracking your nutrition! Keep logging foods to maintain awareness of your intake and hit your ${profile.goal} goals consistently.`
          : `Start adding foods to track your macro balance. Consistent tracking is key to achieving your ${profile.goal} goals!`
      }
    };
    setBurnAndLearnDetails(details[item.id]);
  };

  // NEW: Add Foods Modal handlers
  const handleOpenAddFoodsModal = (mealId, mealName) => {
    setSelectedMealForAddFoods(mealId);
    setSelectedMealNameForAddFoods(mealName);
    setShowAddFoodsModal(true);
  };

  const handleCloseAddFoodsModal = () => {
    setShowAddFoodsModal(false);
    setSelectedMealForAddFoods(null);
    setSelectedMealNameForAddFoods('');
  };

  // Helper function to handle meal ideas opening
  const handleOpenMealIdeas = (mealType) => {
    console.log(`Opening meal ideas for ${mealType}`);
    setSelectedMealType(mealType);
    setShowMealIdeas(true);
  };

  // Helper function to add meal from MealIdeas to the actual meal
  const handleAddMealFromIdeas = (mealData) => {
    console.log('Adding meal from ideas:', mealData);

    // Find the meal to add to based on selectedMealType
    const targetMealName = selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1);
    const targetMeal = meals.find(m => m.name === targetMealName);

    if (!targetMeal) {
      console.error('Target meal not found:', targetMealName);
      return;
    }

    // Claim the meal for mealideas (this overrides any existing ownership)
    claimMeal(targetMeal.name, 'mealideas');

    // Clear existing items and reset totals
    const clearedMeal = {
      ...targetMeal,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      calories: 0,
      items: []
    };

    // Calculate totals for the new meal
    let totalProtein = 0, totalCarbs = 0, totalFat = 0, totalSugar = 0, totalCalories = 0;
    const processedItems = [];

    // Add each item from the meal idea to the target meal
    mealData.items.forEach(item => {
      const categoryMapping = {
        'protein': 'protein',
        'carbohydrate': 'carbohydrate',
        'fat': 'fat',
        'supplements': 'supplements',
        'fruits': 'fruits',
        'vegetables': 'vegetables',
        'condiments': 'condiments',
        'snacks': 'snacks'
      };

      const dbCategory = categoryMapping[item.category];
      if (dbCategory && FoodDatabase[dbCategory] && FoodDatabase[dbCategory][item.food]) {
        const foodData = FoodDatabase[dbCategory][item.food];
        const serving = item.serving || 1;

        const protein = foodData.protein * serving;
        const carbs = foodData.carbs * serving;
        const fat = foodData.fat * serving;
        const sugar = (foodData.sugar || 0) * serving;
        const calories = foodData.calories * serving;

        totalProtein += protein;
        totalCarbs += carbs;
        totalFat += fat;
        totalSugar += sugar;
        totalCalories += calories;

        processedItems.push({
          food: item.food,
          category: dbCategory,
          servings: roundToUserFriendly(serving, 'servings'), // ← APPLY ROUNDING HERE
          protein: Math.round(protein),
          carbs: Math.round(carbs),
          fat: Math.round(fat),
          sugar: Math.round(sugar),
          calories: Math.round(calories),
          source: 'mealideas',
          // 🆕 NEW: Add dietary tag information
          dietaryTags: foodData.dietaryTags || {},
          dietaryCompliant: true // From meal ideas, so assumed compliant
        });
      } else {
        console.warn('Food not found in database:', item.food, 'category:', item.category);
      }
    });

    // Update the meal with new data
    setMeals(prev => prev.map(meal =>
      meal.name === targetMeal.name ? {
        ...meal,
        items: processedItems,
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fat: Math.round(totalFat),
        sugar: Math.round(totalSugar),
        calories: Math.round(totalCalories)
      } : meal
    ));

    setShowMealIdeas(false);
  };

  // 🆕 ENHANCED: Week Plan Handler with dietary support
  const handleAddWeekPlan = (weekPlan) => {
    console.log('🆕 Received enhanced week plan:', weekPlan);

    // Create meal name mapping (same as before)
    const mealNameMapping = {
      'Breakfast': 'Breakfast',
      'Morning Snack': 'FirstSnack',
      'Mid-Morning Snack': 'SecondSnack',
      'Pre-Lunch': 'SecondSnack',
      'Lunch': 'Lunch',
      'Afternoon Snack': 'MidAfternoon Snack',
      'Mid-Afternoon': 'MidAfternoon Snack',
      'Dinner': 'Dinner',
      'Late Snack': 'Late Snack',
      'Evening Snack': 'Late Snack',
      'Post-Workout': 'PostWorkout',
      'Post Workout': 'PostWorkout',
      'Pre-Workout': 'PostWorkout',
      'Mid-Morning': 'FirstSnack',
    };

    // Clear existing meals
    const newMeals = meals.map(meal => ({
      ...meal,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      calories: 0,
      items: []
    }));

    // Process the enhanced meal plan
    if (weekPlan.allMeals) {
      weekPlan.allMeals.forEach((planMeal) => {
        const appMealName = mealNameMapping[planMeal.mealName] || planMeal.mealName;
        const mealIndex = newMeals.findIndex(m => m.name === appMealName);

        console.log(`Processing meal: ${planMeal.mealName} → ${appMealName} (index: ${mealIndex})`);

        if (mealIndex !== -1 && planMeal.items) {
          let totalProtein = 0, totalCarbs = 0, totalFat = 0, totalSugar = 0, totalCalories = 0;

          const processedItems = planMeal.items.map(item => {
            if (item.food && item.category) {
              // Use the enhanced food database
              const foodData = FoodDatabase[item.category]?.[item.food];
              if (foodData) {
                const serving = item.serving || 1;
                const protein = foodData.protein * serving;
                const carbs = foodData.carbs * serving;
                const fat = foodData.fat * serving;
                const sugar = (foodData.sugar || 0) * serving;
                const calories = foodData.calories * serving;

                totalProtein += protein;
                totalCarbs += carbs;
                totalFat += fat;
                totalSugar += sugar;
                totalCalories += calories;

                return {
                  food: item.food,
                  category: item.category,
                  servings: roundToUserFriendly(serving, 'servings'), // ← APPLY ROUNDING HERE
                  protein: Math.round(protein),
                  carbs: Math.round(carbs),
                  fat: Math.round(fat),
                  sugar: Math.round(sugar),
                  calories: Math.round(calories),
                  source: weekPlan.generatedWith || 'weekplan-enhanced',
                  // 🆕 NEW: Enhanced metadata for tracking substitutions
                  originalFood: item.originalFood, // Track if this was substituted
                  substitutionReason: item.substitutionReason, // Why it was substituted
                  dietaryCompliant: !item.substitutionReason, // If no substitution, it's compliant
                  dietaryTags: foodData.dietaryTags || {} // Dietary information
                };
              } else {
                console.warn('Food not found in enhanced database:', item.food, item.category);
              }
            }
            return null;
          }).filter(item => item !== null);

          newMeals[mealIndex] = {
            ...newMeals[mealIndex],
            time: planMeal.time || newMeals[mealIndex].time,
            items: processedItems,
            protein: Math.round(totalProtein),
            carbs: Math.round(totalCarbs),
            fat: Math.round(totalFat),
            sugar: Math.round(totalSugar),
            calories: Math.round(totalCalories)
          };

          // Claim the meal for the enhanced system
          claimMeal(appMealName, weekPlan.generatedWith || 'weekplan-enhanced');
        }
      });
    }

    setMeals(newMeals);
    setIsWeekPlanModalOpen(false);

    // 🆕 NEW: Show success message with dietary info
    if (weekPlan.dietaryFilters && weekPlan.dietaryFilters.length > 0) {
      console.log(`✅ Applied dietary filters: ${weekPlan.dietaryFilters.join(', ')}`);

      // Count substitutions made
      const substitutionCount = newMeals.reduce((count, meal) => {
        return count + (meal.items?.filter(item => item.substitutionReason).length || 0);
      }, 0);

      if (substitutionCount > 0) {
        console.log(`🔄 Made ${substitutionCount} dietary substitutions`);
      }
    }

    // 🆕 NEW: Log nutritional summary
    const totalNutrition = newMeals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    console.log('📊 Week plan nutrition summary:', totalNutrition);
  };

  const claimMeal = (mealName, source) => {
    console.log(`Claiming meal ${mealName} for ${source}`);

    const previousSource = mealSources[mealName];

    // Update meal sources
    setMealSources(prev => ({ ...prev, [mealName]: source }));

    // If the source is changing, clear the meal data
    if (source !== previousSource) {
      setMeals(prev => prev.map(meal => {
        if (meal.name === mealName) {
          return {
            ...meal,
            protein: 0,
            carbs: 0,
            fat: 0,
            sugar: 0,
            calories: 0,
            items: []
          };
        }
        return meal;
      }));
    }
  };

  const updateMeal = (mealId, field, value) => {
    if (typeof field === 'object') {
      const updateData = field;
      setMeals(prev => prev.map(meal => {
        if (meal.id === mealId || meal.name === mealId) {
          const updated = { ...meal };
          if (updateData.time) updated.time = updateData.time;
          if (updateData.addItem) {
            const item = updateData.addItem;
            updated.items = [...(updated.items || []), item];
            updated.protein = updated.protein + Math.round(parseFloat(item.protein));
            updated.carbs = updated.carbs + Math.round(parseFloat(item.carbs));
            updated.fat = updated.fat + Math.round(parseFloat(item.fat));
            updated.sugar = updated.sugar + Math.round(parseFloat(item.sugar || 0));
            updated.calories = updated.calories + Math.round(parseInt(item.calories));
          }
          return updated;
        }
        return meal;
      }));
    } else {
      const meal = meals.find(m => m.id === mealId);
      if (!meal) return;

      // Check if meal is owned by another system (for manual updates)
      const source = mealSources[meal.name];
      if (source && source !== 'quickview') {
        console.warn(`Cannot manually modify ${meal.name} - owned by ${source} system`);
        return;
      }

      setMeals(prev => prev.map(meal => {
        if (meal.id === mealId) {
          const updated = { ...meal, [field]: parseInt(value) || 0 };
          updated.calories = (updated.protein * 4) + (updated.carbs * 4) + (updated.fat * 9);
          return updated;
        }
        return meal;
      }));

      // Claim the meal for quickview if not already claimed
      if (meal && (!source || source !== 'quickview')) {
        claimMeal(meal.name, 'quickview');
      }
    }
  };

  // Generate smart meal recommendations based on current progress
  const getSmartMealRecommendations = () => {
    if (!profile.firstName || totalMacros.calories < 50) return [];

    const recommendations = [];
    const proteinTarget = profile.goal === 'dirty-bulk' ? 150 :
      profile.goal === 'Gain-muscle' ? 130 :
        profile.goal === 'lose' ? 120 : 100;

    const proteinGap = proteinTarget - totalMacros.protein;
    const calorieGap = calorieData.targetCalories - totalMacros.calories;

    // High priority recommendations (critical gaps)
    if (proteinGap > 50) {
      recommendations.push({
        priority: 'high',
        title: 'Protein Emergency!',
        message: `You need ${Math.round(proteinGap)}g more protein today! Consider adding protein-rich meals like chicken, fish, or protein shakes to catch up.`
      });
    }

    if (profile.goal === 'dirty-bulk' && calorieGap > 800) {
      recommendations.push({
        priority: 'high',
        title: 'Bulk Fuel Shortage!',
        message: `You're ${Math.round(calorieGap)} calories short for dirty bulk! Add calorie-dense meals with healthy fats and complex carbs.`
      });
    }

    // Medium priority recommendations (optimization opportunities)
    if (proteinGap > 20 && proteinGap <= 50) {
      recommendations.push({
        priority: 'medium',
        title: 'Protein Boost Needed',
        message: `Add ${Math.round(proteinGap)}g more protein to hit your ${proteinTarget}g target. Perfect opportunity for a protein-rich snack!`
      });
    }

    if (profile.goal === 'lose' && totalMacros.calories > calorieData.targetCalories * 1.1) {
      recommendations.push({
        priority: 'medium',
        title: 'Calorie Check',
        message: `You're ${Math.round(totalMacros.calories - calorieData.targetCalories)} calories over target. Focus on lean proteins and vegetables for remaining meals.`
      });
    }

    // Low priority recommendations (fine-tuning)
    if (proteinGap <= 20 && proteinGap > 0) {
      recommendations.push({
        priority: 'low',
        title: 'Almost Perfect!',
        message: `Just ${Math.round(proteinGap)}g more protein needed. You're crushing your ${profile.goal} goals today!`
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'low',
        title: 'Excellent Progress!',
        message: `You're hitting your nutrition targets perfectly for ${profile.goal}. Keep this consistency going!`
      });
    }

    // Limit to top 2 recommendations to avoid overwhelming
    return recommendations.slice(0, 2);
  };

  // Generate quick action suggestions based on current state
  const getQuickActionSuggestions = () => {
    const actions = [];
    const proteinTarget = profile.goal === 'dirty-bulk' ? 150 :
      profile.goal === 'Gain-muscle' ? 130 :
        profile.goal === 'lose' ? 120 : 100;

    const proteinGap = proteinTarget - totalMacros.protein;

    // Find the meal with the least calories (most likely to need attention)
    const emptyMeals = meals.filter(meal => meal.calories < 50);
    const lowCalorieMeals = meals.filter(meal => meal.calories >= 50 && meal.calories < 200);

    if (proteinGap > 30) {
      actions.push({
        icon: '💪',
        text: 'Add Protein to Low Meals',
        onClick: () => enterFullScreenSwipe()
      });
    }

    if (emptyMeals.length > 0) {
      const nextMeal = emptyMeals[0];
      if (['Breakfast', 'Lunch', 'Dinner'].includes(nextMeal.name)) {
        actions.push({
          icon: '💡',
          text: `Get ${nextMeal.name} Ideas`,
          onClick: () => {
            handleOpenMealIdeas(nextMeal.name.toLowerCase());
          }
        });
      }
    }

    if (profile.goal === 'dirty-bulk' && totalMacros.calories < calorieData.targetCalories * 0.7) {
      actions.push({
        icon: '🚀',
        text: 'Find High-Calorie Foods',
        onClick: () => setShowCreateMeal(true)
      });
    }

    if (lowCalorieMeals.length > 2) {
      actions.push({
        icon: '📈',
        text: 'Boost Meal Sizes',
        onClick: () => enterSwipeMode()
      });
    }

    // Always suggest meal ideas if no specific issues
    if (actions.length === 0) {
      const mainMeals = ['Breakfast', 'Lunch', 'Dinner'];
      const incompleteMeals = meals.filter(meal =>
        mainMeals.includes(meal.name) && meal.calories < 300
      );

      if (incompleteMeals.length > 0) {
        const targetMeal = incompleteMeals[0];
        actions.push({
          icon: '✨',
          text: `Enhance ${targetMeal.name}`,
          onClick: () => handleOpenMealIdeas(targetMeal.name.toLowerCase())
        });
      }
    }

    // Limit to top 3 actions
    return actions.slice(0, 3);
  };

  // FIXED: addFoodToMeal function - NO tier limits for manual additions
  const addFoodToMeal = (mealId, category, foodName, servings = 1) => {
    const foodData = FoodDatabase[category]?.[foodName];
    if (!foodData) {
      console.error('Food not found in database:', foodName, category);
      return;
    }

    const meal = meals.find(m => m.id === mealId);
    if (!meal) return;

    // Check if meal is owned by another system
    const source = mealSources[meal.name];
    if (source && source !== 'quickview') {
      console.warn(`Cannot modify ${meal.name} - owned by ${source} system`);
      return;
    }

    // Claim the meal for quickview if not already claimed
    if (!source) {
      claimMeal(meal.name, 'quickview');
    }

    console.log(`✅ Manual addition: ${foodName} - ${servings} servings (no tier limits applied)`);

    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        // 🔧 FIXED: Use rounded servings for user-friendly display, but NO tier limits
        const roundedServings = roundToUserFriendly(servings, 'servings');

        const newItem = {
          id: generateId(),
          food: foodName,
          category: category,
          servings: roundedServings,  // User-friendly rounding only
          protein: Math.round(foodData.protein * roundedServings),
          carbs: Math.round(foodData.carbs * roundedServings),
          fat: Math.round(foodData.fat * roundedServings),
          sugar: Math.round((foodData.sugar || 0) * roundedServings),
          calories: Math.round(foodData.calories * roundedServings),
          source: 'manual-addition', // Mark as manual
          // No tier data for manual additions - user choice
          dietaryTags: foodData.dietaryTags || {},
          dietaryCompliant: true
        };

        return {
          ...meal,
          items: [...(meal.items || []), newItem],
          protein: Math.round(meal.protein + foodData.protein * roundedServings),
          carbs: Math.round(meal.carbs + foodData.carbs * roundedServings),
          fat: Math.round(meal.fat + foodData.fat * roundedServings),
          sugar: Math.round(meal.sugar + (foodData.sugar || 0) * roundedServings),
          calories: Math.round(meal.calories + foodData.calories * roundedServings)
        };
      }
      return meal;
    }));
  };

  const removeFoodFromMeal = (mealId, itemIndex) => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return;

    // Check if meal is owned by another system
    const source = mealSources[meal.name];
    if (source && source !== 'quickview') {
      console.warn(`Cannot modify ${meal.name} - owned by ${source} system`);
      return;
    }

    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const itemToRemove = meal.items[itemIndex];
        const updatedItems = meal.items.filter((_, index) => index !== itemIndex);
        return {
          ...meal,
          items: updatedItems,
          protein: Math.max(0, Math.round(meal.protein - itemToRemove.protein)),
          carbs: Math.max(0, Math.round(meal.carbs - itemToRemove.carbs)),
          fat: Math.max(0, Math.round(meal.fat - itemToRemove.fat)),
          sugar: Math.max(0, Math.round(meal.sugar - (itemToRemove.sugar || 0))),
          calories: Math.max(0, Math.round(meal.calories - itemToRemove.calories))
        };
      }
      return meal;
    }));
  };

  const calculatePieData = (meal) => {
    const proteinCals = meal.protein * 4;
    const carbCals = meal.carbs * 4;
    const fatCals = meal.fat * 9;
    const totalCals = proteinCals + carbCals + fatCals;
    if (totalCals === 0) return [];
    return [
      { name: 'Protein', value: proteinCals, percentage: Math.round((proteinCals / totalCals) * 100) },
      { name: 'Carbs', value: carbCals, percentage: Math.round((carbCals / totalCals) * 100) },
      { name: 'Fat', value: fatCals, percentage: Math.round((fatCals / totalCals) * 100) }
    ];
  };

  const formatMealsForMessaging = () => {
    const allMeals = {};
    meals.forEach(meal => {
      const mealType = mealTypeMapping[meal.name];
      if (mealType) {
        allMeals[mealType] = {
          time: meal.time,
          totals: { calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, sugar: meal.sugar },
          items: meal.items,
          pieData: calculatePieData(meal)
        };
      }
    });
    return allMeals;
  };

  // 🆕 ENHANCED: Calculate calorie data with better meal planning support
  const calculateTDEE = (userProfile) => {
    const { heightFeet, heightInches, weight, exerciseLevel, goal, gender } = userProfile;

    if (!heightFeet || !heightInches || !weight || !exerciseLevel || !goal || !gender) {
      return {
        bmr: 1800,
        tdee: 2200,
        targetCalories: profile.goal === 'dirty-bulk' ? 3200 :
          profile.goal === 'Gain-muscle' ? 2800 :
            profile.goal === 'lose' ? 2000 : 2500
      };
    }

    const totalHeightInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
    const heightCm = totalHeightInches * 2.54;
    const weightKg = parseFloat(weight) * 0.453592;

    // BMR calculation using Mifflin-St Jeor equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5;
    } else if (gender === 'female') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 - 161;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 - 78;
    }

    // Activity multipliers
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    const tdee = bmr * activityMultipliers[exerciseLevel];

    // Goal adjustments - 🆕 ENHANCED for better meal planning
    let targetCalories;
    switch (goal) {
      case 'lose':
        targetCalories = Math.max(bmr + 100, tdee - 500); // Don't go below BMR + 100
        break;
      case 'Gain-muscle':
        targetCalories = tdee + 300;
        break;
      case 'dirty-bulk':
        targetCalories = tdee + 700;
        break;
      case 'maintain':
      default:
        targetCalories = tdee;
        break;
    }

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories)
    };
  };

  const calorieData = calculateTDEE(profile);

  const getMealMessage = (meal) => {
    if (!meal || meal.calories < 25) return null;

    const allMeals = formatMealsForMessaging();
    const currentMealType = mealTypeMapping[meal.name];
    if (!currentMealType) return null;

    const currentMealTotals = {
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      sugar: Math.round(meal.carbs * 0.3) // Estimate sugar as 30% of carbs
    };

    const pieData = calculatePieData(meal);

    // Enhanced user profile for messaging
    const userProfileForMessages = {
      firstName: profile.firstName || profile.name || 'Champion',
      goal: profile.goal || 'Gain-muscle',
      weight: profile.weight || 150
    };

    // Use the comprehensive time-aware messaging system
    return MealMessages.getTimeAwareMessage(
      allMeals,                    // All meals with timing
      currentMealType,             // Current meal type
      currentMealTotals,           // Current meal totals
      meal.items || [],            // Current meal items
      userProfileForMessages,      // Enhanced user profile
      calorieData,                // TDEE/BMR data
      meal.time,                  // Current meal time
      pieData                     // Pie chart data
    );
  };

  const openFoodSelection = (category, mealId) => {
    const meal = meals.find(m => m.id === mealId);
    if (meal && mealSources[meal.name] === 'usda') return;
    setSelectedCategory(category);
    setSelectedMealForFood(mealId);
  };

  const closeFoodSelection = () => {
    setSelectedCategory(null);
    setSelectedMealForFood(null);
  };

  const enterSwipeMode = () => {
    setIsSwipeMode(true);
    document.body.style.overflow = 'hidden';
    // 🔧 FIXED: Add proper sorting setup
    setCurrentCard(0);
    const sortedMeals = getSortedMealsByTime(meals);
    setCardPositions(sortedMeals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  };

  const exitSwipeMode = () => {
    setIsSwipeMode(false);
    setIsDragging(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    setCardPositions(prev => prev.map(() => ({ x: 0, y: 0, rotation: 0 })));
  };

  const enterScrollModal = () => {
    setIsScrollModal(true);
    document.body.style.overflow = 'hidden';
  };

  const exitScrollModal = () => {
    setIsScrollModal(false);
    document.body.style.overflow = '';
  };

  const enterFullScreenSwipe = () => {
    setIsFullScreenSwipe(true);
    document.body.style.overflow = 'hidden';
    // 🔧 FIXED: Add proper sorting setup
    setCurrentCard(0);
    const sortedMeals = getSortedMealsByTime(meals);
    setCardPositions(sortedMeals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  };

  const exitFullScreenSwipe = () => {
    setIsFullScreenSwipe(false);
    setIsDragging(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    setCardPositions(prev => prev.map(() => ({ x: 0, y: 0, rotation: 0 })));
  };

  const handleMouseDown = (e) => {
    if (!isSwipeMode && !isFullScreenSwipe) return;
    if (e.target.closest('.no-swipe-zone')) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX || e.touches?.[0]?.clientX || 0,
      startY: e.clientY || e.touches?.[0]?.clientY || 0
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || (!isSwipeMode && !isFullScreenSwipe)) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const currentY = e.clientY || e.touches?.[0]?.clientY || 0;
    const deltaX = currentX - dragRef.current.startX;
    const deltaY = currentY - dragRef.current.startY;

    if (Math.abs(deltaX) > 15) {
      e.preventDefault();
      const rotation = deltaX * 0.1;
      setCardPositions(prev => prev.map((pos, index) => index === currentCard ? { x: deltaX, y: deltaY, rotation } : pos));
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging || (!isSwipeMode && !isFullScreenSwipe)) return;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setIsDragging(false);

    const currentPos = cardPositions[currentCard];
    const swipeThreshold = 100;

    if (Math.abs(currentPos.x) > swipeThreshold) {
      const direction = currentPos.x > 0 ? 'right' : 'left';
      setCardPositions(prev => prev.map((pos, index) =>
        index === currentCard ? { x: direction === 'right' ? 400 : -400, y: pos.y, rotation: direction === 'right' ? 30 : -30 } : pos
      ));
      setTimeout(() => {
        const sortedMeals = getSortedMealsByTime(meals);
        setCurrentCard(prev => (prev + 1) % sortedMeals.length);
        setCardPositions(prev => prev.map(() => ({ x: 0, y: 0, rotation: 0 })));
      }, 300);
    } else {
      setCardPositions(prev => prev.map((pos, index) => index === currentCard ? { x: 0, y: 0, rotation: 0 } : pos));
    }
  };

  const totalMacros = meals.reduce((total, meal) => ({
    protein: Math.round(total.protein + meal.protein),
    carbs: Math.round(total.carbs + meal.carbs),
    fat: Math.round(total.fat + meal.fat),
    sugar: Math.round(total.sugar + (meal.sugar || 0)),
    calories: Math.round(total.calories + meal.calories)
  }), { protein: 0, carbs: 0, fat: 0, sugar: 0, calories: 0 });

  // Handle profile updates from ProfileModule
  const handleProfileUpdate = (newProfile) => {
    setProfile(newProfile);
    console.log('Profile updated:', newProfile);
  };

  // Calculate fruit budget remaining (3 fruits per day max recommended)
  const calculateFruitBudgetRemaining = () => {
    let fruitsConsumed = 0;
    meals.forEach(meal => {
      if (meal.items) {
        meal.items.forEach(item => {
          if (item.category === 'fruits') {
            fruitsConsumed += item.servings;
          }
        });
      }
    });
    return Math.max(0, 3 - fruitsConsumed);
  };

  // Generate daily progress message using the sophisticated messaging system
  const getDailyProgressMessage = () => {
    if (!profile.firstName || totalMacros.calories < 100) {
      return "Start adding meals to see personalized nutrition insights!";
    }

    const proteinTarget = profile.goal === 'dirty-bulk' ? 150 :
      profile.goal === 'Gain-muscle' ? 130 :
        profile.goal === 'lose' ? 120 : 100;

    const proteinProgress = (totalMacros.protein / proteinTarget) * 100;
    const calorieProgress = (totalMacros.calories / calorieData.targetCalories) * 100;

    // Generate goal-specific insights
    if (profile.goal === 'dirty-bulk') {
      if (totalMacros.calories >= calorieData.targetCalories && totalMacros.protein >= proteinTarget) {
        return `${profile.firstName}, BULK DOMINATION! ${Math.round(totalMacros.calories)} calories and ${Math.round(totalMacros.protein)}g protein - you're building SERIOUS mass today!`;
      } else if (totalMacros.calories < calorieData.targetCalories * 0.7) {
        return `${profile.firstName}, only ${Math.round(totalMacros.calories)} calories for dirty bulk? You need ${Math.round(calorieData.targetCalories - totalMacros.calories)} more to hit your mass-building target!`;
      } else {
        return `${profile.firstName}, solid bulk progress at ${Math.round(totalMacros.calories)} calories - keep feeding the machine for maximum gains!`;
      }
    } else if (profile.goal === 'Gain-muscle') {
      if (proteinProgress >= 85 && calorieProgress >= 80 && calorieProgress <= 120) {
        return `${profile.firstName}, LEAN MUSCLE PERFECTION! ${Math.round(totalMacros.protein)}g protein and ${Math.round(totalMacros.calories)} calories - textbook muscle building!`;
      } else if (proteinProgress < 60) {
        return `${profile.firstName}, protein alert! Only ${Math.round(totalMacros.protein)}g of your ${proteinTarget}g target - lean gains need more protein focus!`;
      } else {
        return `${profile.firstName}, good muscle-building progress with ${Math.round(totalMacros.protein)}g protein - stay consistent for lean gains!`;
      }
    } else if (profile.goal === 'lose') {
      if (proteinProgress >= 80 && totalMacros.calories <= calorieData.targetCalories) {
        return `${profile.firstName}, FAT LOSS PRECISION! ${Math.round(totalMacros.protein)}g protein with controlled calories - perfect for preserving muscle while cutting!`;
      } else if (totalMacros.calories > calorieData.targetCalories * 1.2) {
        return `${profile.firstName}, calories running high at ${Math.round(totalMacros.calories)} - fat loss requires staying closer to your ${calorieData.targetCalories} target!`;
      } else {
        return `${profile.firstName}, steady fat loss approach with ${Math.round(totalMacros.protein)}g protein - consistency wins the race!`;
      }
    } else {
      // maintain
      if (proteinProgress >= 70 && Math.abs(calorieProgress - 100) <= 15) {
        return `${profile.firstName}, MAINTENANCE MASTERY! ${Math.round(totalMacros.protein)}g protein and balanced calories - sustainable excellence!`;
      } else {
        return `${profile.firstName}, good maintenance foundation with ${Math.round(totalMacros.calories)} calories - keep building consistent habits!`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-600 p-4">
      <div className="max-w-md mx-auto">
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && !showGame && !showCardMagic && (
          <>
            {/* ProfileModule */}
            <ProfileModule
              isMobile={true}
              initialProfile={profile}
              allMeals={formatMealsForMessaging()}
              onProfileUpdate={handleProfileUpdate}
            />

            {/* NEW UNIFIED Daily Nutrition Summary with Action Buttons and Analytics */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-xl">
              <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Daily Nutrition Summary</h2>
              
              {/* Show mixed approach status */}
              {profile.firstName && totalMacros.calories > 100 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-2 mb-4 text-center">
                  <div className="text-xs text-gray-700">
                    🎯 <span className="text-green-600 font-medium">Generated plans:</span> Tier-limited •
                    <span className="text-blue-600 font-medium"> Manual additions:</span> User choice (up to 12 servings)
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 gap-3 text-center mb-4">
              {/* Macro Grid */}
              <div className="grid grid-cols-4 gap-3 text-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <div className="text-xs text-blue-600 font-medium">Protein</div>
                  <div className="text-lg font-bold text-blue-800">{Math.round(totalMacros.protein)}g</div>
                  <div className="text-xs text-blue-500">
                    {profile.goal === 'dirty-bulk' ? '150g' : profile.goal === 'Gain-muscle' ? '130g' : profile.goal === 'lose' ? '120g' : '100g'} target
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <div className="text-xs text-green-600 font-medium">Carbs</div>
                  <div className="text-lg font-bold text-green-800">{Math.round(totalMacros.carbs)}g</div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <div className="text-xs text-yellow-600 font-medium">Fat</div>
                  <div className="text-lg font-bold text-yellow-800">{Math.round(totalMacros.fat)}g</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <div className="text-xs text-purple-600 font-medium">Calories</div>
                  <div className="text-lg font-bold text-purple-800">{Math.round(totalMacros.calories)}</div>
                  <div className="text-xs text-purple-500">
                    {calorieData.targetCalories} target
                  </div>
                </div>
              </div>
            </div>

              {/* Action Buttons - Same 4-column grid for uniformity */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <button
                  onClick={enterSwipeMode}
                  className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">🍽️</div>
                  <div className="text-xs font-semibold">Add Foods</div>
                </button>
                <button
                  onClick={enterScrollModal}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">📋</div>
                  <div className="text-xs font-semibold">View Plan</div>
                </button>
                <button
                  onClick={() => setShowGlenSays(true)}
                  className="bg-white text-black border-4 border-black p-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">👨‍🏫</div>
                  <div className="text-xs font-semibold">Glen Says</div>
                </button>
                <button
                  onClick={() => setShowCreateMeal(true)}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">🔍</div>
                  <div className="text-xs font-semibold">Food Lookup</div>
                </button>
              </div>

              {/* Analytics Grid - Same 4-column format */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <button
                  onClick={() => setShowBurnAndLearn(true)}
                  className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">🔥</div>
                  <div className="text-xs font-semibold">Burn & Learn</div>
                </button>
                <button
                  onClick={() => setShowTrends(true)}
                  className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">📈</div>
                  <div className="text-xs font-semibold">Trends</div>
                </button>
                <button
                  onClick={() => setShowPieChart(true)}
                  className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">🥧</div>
                  <div className="text-xs font-semibold">Pie Chart</div>
                </button>
                <button
                  onClick={() => setShowGraphs(true)}
                  className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
                >
                  <div className="text-lg mb-1">📊</div>
                  <div className="text-xs font-semibold">Graphs</div>
                </button>
              </div>

              {/* Smart Daily Insight */}
              {totalMacros.calories > 100 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-lg">🎯</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Daily Progress Insight</h4>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {getDailyProgressMessage()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Smart Next Meal Recommendations */}
            {profile.firstName && totalMacros.calories > 50 && (
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-xl">
                <h2 className="text-lg font-bold text-gray-800 mb-3 text-center flex items-center justify-center gap-2">
                  <span>🎯</span> Smart Recommendations
                </h2>
                <div className="space-y-3">
                  {getSmartMealRecommendations().map((rec, index) => (
                    <div key={index} className={`p-3 rounded-xl border-2 ${rec.priority === 'high' ? 'border-red-200 bg-red-50' : rec.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
                      <div className="flex items-start gap-2">
                        <div className="text-lg">{rec.priority === 'high' ? '🚨' : rec.priority === 'medium' ? '⚡' : '💡'}</div>
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm mb-1 ${rec.priority === 'high' ? 'text-red-800' : rec.priority === 'medium' ? 'text-yellow-800' : 'text-green-800'}`}>
                            {rec.title}
                          </h4>
                          <p className={`text-xs leading-relaxed ${rec.priority === 'high' ? 'text-red-700' : rec.priority === 'medium' ? 'text-yellow-700' : 'text-green-700'}`}>
                            {rec.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Action Suggestions */}
            {profile.firstName && totalMacros.calories > 50 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3 mb-4">
                <h3 className="font-semibold text-indigo-800 text-sm mb-2">💡 Suggested Next Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  {getQuickActionSuggestions().map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className="bg-white hover:bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs font-medium border border-indigo-200 hover:border-indigo-300 transition-all"
                    >
                      {action.icon} {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Glen Says Modal */}
            {showGlenSays && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">👨‍🏫 Daily Motivation</h3>
                    <button onClick={() => setShowGlenSays(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                  </div>
                  <div className="p-4">
                    <GlenSaysMotivation userProfile={profile} />
                  </div>
                </div>
              </div>
            )}

            {/* Plan My Week Button */}
            <div className="mb-4">
              <button
                onClick={() => setIsWeekPlanModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 w-full"
              >
                <span>📅</span>
                Plan My Week
              </button>
            </div>

            {/* Game Buttons - Updated to include Card Magic */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowGame(true)}
                className="bg-white text-pink-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🎮 Rate Your Meals
              </button>

              {/* NEW: Card Magic Button */}
              <button
                onClick={() => setShowCardMagic(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🎭 Card Magic
              </button>
            </div>
          </>
        )}

        {(isSwipeMode || isFullScreenSwipe) && (
          <FullScreenSwipeInterface
            meals={getSortedMealsByTime(meals)}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            cardPositions={cardPositions}
            isDragging={isDragging}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            onExit={isSwipeMode ? exitSwipeMode : exitFullScreenSwipe}
            openFoodSelection={openFoodSelection}
            removeFoodFromMeal={removeFoodFromMeal}
            updateMeal={updateMeal}
            setMeals={setMeals}
            profile={profile}
            getMealMessage={getMealMessage}
            mealSources={mealSources}
            onClaimMeal={claimMeal}
            onOpenMealIdeas={handleOpenMealIdeas}
            onOpenAddFoodsModal={handleOpenAddFoodsModal}
          />
        )}

        {isScrollModal && (
          <div className="fixed inset-0 bg-white z-50">
            <button
              onClick={exitScrollModal}
              className="absolute top-4 right-4 z-50 bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-700 transition-colors shadow-lg"
            >
              ×
            </button>

            {/* Custom View Plan Interface */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex-shrink-0">
                <h2 className="text-xl font-bold text-center">📋 Daily Meal Plans</h2>
                <p className="text-center text-blue-100 text-sm mt-1">Your personalized nutrition schedule</p>
              </div>

              {/* Scrollable Meals Section */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4 max-w-md mx-auto">
                  {/* 🔧 FIXED: Use getSortedMealsByTime instead of undefined sortedMeals */}
                  {getSortedMealsByTime(meals).map((meal) => {
                    const source = mealSources[meal.name];
                    const isUSDAOwned = source === 'usda';

                    return (
                      <div key={meal.id} className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">
                              {meal.name === 'Breakfast' && '🍳'}
                              {meal.name === 'FirstSnack' && '🍎'}
                              {meal.name === 'SecondSnack' && '🥨'}
                              {meal.name === 'Lunch' && '🥗'}
                              {meal.name === 'MidAfternoon Snack' && '🥜'}
                              {meal.name === 'Dinner' && '🍽️'}
                              {meal.name === 'Late Snack' && '🍓'}
                              {meal.name === 'PostWorkout' && '💪'}
                              {!['Breakfast', 'FirstSnack', 'SecondSnack', 'Lunch', 'MidAfternoon Snack', 'Dinner', 'Late Snack', 'PostWorkout'].includes(meal.name) && '🌟'}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">{meal.name}</h3>
                              <p className="text-sm text-gray-600">{meal.time}</p>
                            </div>
                          </div>
                          {isUSDAOwned && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">USDA</span>
                          )}
                        </div>

                        {/* Meal Items */}
                        <MealFoodList
                          meal={meal}
                          onRemoveFood={removeFoodFromMeal}
                          mealSources={mealSources}
                          readOnly={true}
                        />

                        {/* Meal Macros (without daily totals) */}
                        {meal.calories > 0 && (
                          <div className="mt-3 bg-gray-50 rounded-lg p-2">
                            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                              <div>
                                <div className="font-bold text-purple-600">{Math.round(meal.calories)}</div>
                                <div className="text-gray-500">cal</div>
                              </div>
                              <div>
                                <div className="font-bold text-blue-600">{Math.round(meal.protein)}g</div>
                                <div className="text-gray-500">protein</div>
                              </div>
                              <div>
                                <div className="font-bold text-green-600">{Math.round(meal.carbs)}g</div>
                                <div className="text-gray-500">carbs</div>
                              </div>
                              <div>
                                <div className="font-bold text-yellow-600">{Math.round(meal.fat)}g</div>
                                <div className="text-gray-500">fat</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Print Options Button */}
              <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-lg">🖨️</span>
                  Print Options
                </button>
              </div>

              {/* Motivational Message */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 text-center flex-shrink-0">
                <div className="text-lg font-bold mb-1">🌟 You've Got This!</div>
                <p className="text-sm text-green-100">
                  Consistent nutrition is the foundation of success. Every meal brings you closer to your goals!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Print Options Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">🖨️ Print Options</h3>
                <button onClick={() => setShowPrintModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4">
                <PrintableNutritionPlan
                  allMeals={formatMealsForMessaging()}
                  userProfile={profile}
                  calorieData={calorieData}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}

        {selectedCategory && selectedMealForFood && (
          <FoodSelectionModal
            category={selectedCategory}
            mealId={selectedMealForFood}
            onAddFood={addFoodToMeal}
            onClose={closeFoodSelection}
          />
        )}

        {/* NEW: Add Foods Modal */}
        <AddFoodsModal
          isOpen={showAddFoodsModal}
          onClose={handleCloseAddFoodsModal}
          mealId={selectedMealForAddFoods}
          mealName={selectedMealNameForAddFoods}
          onSelectCategory={openFoodSelection}
          onOpenMealIdeas={handleOpenMealIdeas}
          mealSources={mealSources}
        />

        <USDAMealCreator
          isOpen={showCreateMeal}
          onClose={() => setShowCreateMeal(false)}
          meals={meals}
          onUpdateMeal={updateMeal}
          totalMacros={totalMacros}
          mealSources={mealSources}
          onClaimMeal={claimMeal}
        />

        {showGame && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Rate Your Meals</h3>
                <button onClick={() => setShowGame(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4">
                <MealSwipeGame
                  allMeals={formatMealsForMessaging()}
                  userProfile={{
                    firstName: profile.firstName || profile.name || 'Champion',
                    goal: profile.goal || 'Gain-muscle',
                    weight: profile.weight,
                    gender: profile.gender || 'non-binary'
                  }}
                  calorieData={calorieData}
                  onComplete={() => setShowGame(false)}
                  isIntegrated={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* NEW: Card Magic Modal */}
        {showCardMagic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">🎭 Fitness Card Magic</h3>
                <button onClick={() => setShowCardMagic(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4">
                <UltimateFitnessCardTrick />
              </div>
            </div>
          </div>
        )}

        {/* MealIdeas Modal Integration */}
        {showMealIdeas && (
          <MealIdeasModal
            isOpen={showMealIdeas}
            onClose={() => setShowMealIdeas(false)}
            onAddMeal={handleAddMealFromIdeas}
            userProfile={profile}
            calorieData={calorieData}
            isMobile={true}
            mealType={selectedMealType}
            fruitBudgetRemaining={calculateFruitBudgetRemaining()}
          />
        )}

        {/* WeekPlanModal Integration */}
        <WeekPlanModal
          isOpen={isWeekPlanModalOpen}
          onClose={() => setIsWeekPlanModalOpen(false)}
          onAddWeekPlan={handleAddWeekPlan}
          userProfile={profile}
          calorieData={calorieData}
          isMobile={true}
        />

        {/* Analytics Modals */}
        {showBurnAndLearn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">🔥 Burn & Learn</h3>
                <button onClick={() => {
                  setShowBurnAndLearn(false);
                  setBurnAndLearnDetails(null);
                }} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4">
                {burnAndLearnDetails ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setBurnAndLearnDetails(null)}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      ← Back to overview
                    </button>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3">{burnAndLearnDetails.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{burnAndLearnDetails.content}</p>
                    </div>
                  </div>
                ) : (
                  <ClickableBurnAndLearnView
                    totalMacros={totalMacros}
                    profile={profile}
                    onItemClick={handleBurnAndLearnClick}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {showTrends && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md" style={{ height: '600px' }}>
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">📈 Daily Trends</h3>
                <button onClick={() => setShowTrends(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4" style={{ height: 'calc(100% - 80px)' }}>
                <CustomTrendsView meals={meals} totalMacros={totalMacros} />
              </div>
            </div>
          </div>
        )}

        {showPieChart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md" style={{ height: '600px' }}>
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">🥧 Macro Distribution</h3>
                <button onClick={() => setShowPieChart(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4" style={{ height: 'calc(100% - 80px)' }}>
                <DailyPieChartView totalMacros={totalMacros} />
              </div>
            </div>
          </div>
        )}

        {showGraphs && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md" style={{ height: '600px' }}>
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">📊 Meal Breakdown</h3>
                <button onClick={() => setShowGraphs(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="p-4" style={{ height: 'calc(100% - 80px)' }}>
                <BarChartView meals={meals} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSwipeApp;