import React, { useState, useEffect } from 'react';

// USDA API Configuration
const USDA_API_KEY = 'tdlBSP5YGMzEbAkkehT6VFCctFwrVwmg2nYsrgjx';
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

// Serving Picker Modal Component for USDA Foods
function USDAServingPickerModal({ isOpen, currentServing, currentUnit, foodData, onSelectServing, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedFraction, setSelectedFraction] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('servings');

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
    onSelectServing(totalAmount, selectedUnit);
    onClose();
  };

  // Calculate preview nutrition based on selection
  const getPreviewNutrition = () => {
    const totalAmount = selectedAmount + selectedFraction;
    let servingMultiplier = totalAmount;

    // For USDA foods, we'll always work in servings
    // The nutrition data is already per serving

    return {
      calories: Math.round(foodData.calories * servingMultiplier),
      protein: Math.round(foodData.protein * servingMultiplier * 10) / 10,
      carbs: Math.round(foodData.carbs * servingMultiplier * 10) / 10,
      fat: Math.round(foodData.fat * servingMultiplier * 10) / 10
    };
  };

  if (!isOpen) return null;

  const amounts = Array.from({ length: 12 }, (_, i) => i + 1);
  const fractions = [
    { display: '0', value: 0 },
    { display: '1/4', value: 0.25 },
    { display: '1/2', value: 0.5 },
    { display: '3/4', value: 0.75 }
  ];
  const units = ['servings']; // For USDA, we'll stick to servings

  const previewNutrition = getPreviewNutrition();
  const totalAmount = selectedAmount + selectedFraction;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Amount</h3>
            <p className="text-sm text-gray-600">{foodData?.description || 'USDA Food'}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Whole Numbers Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Amount</h4>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                      selectedAmount === amount ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                      selectedFraction === fraction.value ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm ${
                      selectedUnit === unit ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
              {foodData?.servingInfo?.description && (
                <div>Reference: {foodData.servingInfo.description}</div>
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
function TimePickerModal({ isOpen, currentTime, onSelectTime, onClose, mealType }) {
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
  };

  if (!isOpen) return null;

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];
  const periods = ['AM', 'PM'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Select Time</h3>
            <p className="text-sm text-gray-600">{mealType?.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Hours Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Hour</h4>
              <div className="grid grid-cols-2 gap-2">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                      selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Minutes</h4>
              <div className="space-y-3">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    onClick={() => setSelectedMinute(minute)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                      selectedMinute === minute ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    :{minute}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM Column */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Period</h4>
              <div className="space-y-3">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                      selectedPeriod === period ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
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

          <button 
            onClick={handleConfirm} 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Confirm {mealType?.name} at {selectedHour}:{selectedMinute} {selectedPeriod}
          </button>
        </div>
      </div>
    </div>
  );
}

// Main USDA Meal Creator Component
export function USDAMealCreator({ 
  isOpen, 
  onClose, 
  meals, 
  onUpdateMeal, 
  totalMacros,
  mealSources, // Track which system owns each meal
  onClaimMeal  // Function to claim a meal for USDA system
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('12:00 PM');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pendingMealType, setPendingMealType] = useState(null);
  const [hasAddedFoods, setHasAddedFoods] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState('');
  const [foodServings, setFoodServings] = useState({});
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictMealType, setConflictMealType] = useState(null);
  const [showServingPicker, setShowServingPicker] = useState(false);
  const [selectedFoodForServing, setSelectedFoodForServing] = useState(null);

  // Available meal types with mapping to internal names
  const mealTypes = [
    { name: 'Breakfast', internalName: 'Breakfast', emoji: '🍳', defaultTime: '7:00 AM' },
    { name: 'First Snack', internalName: 'FirstSnack', emoji: '🍎', defaultTime: '9:30 AM' },
    { name: 'Second Snack', internalName: 'SecondSnack', emoji: '🥨', defaultTime: '11:00 AM' },
    { name: 'Lunch', internalName: 'Lunch', emoji: '🥗', defaultTime: '12:30 PM' },
    { name: 'Mid-Afternoon Snack', internalName: 'MidAfternoon Snack', emoji: '🥜', defaultTime: '3:30 PM' },
    { name: 'Dinner', internalName: 'Dinner', emoji: '🍽️', defaultTime: '6:30 PM' },
    { name: 'Late Snack', internalName: 'Late Snack', emoji: '🍓', defaultTime: '8:30 PM' },
    { name: 'Post-Workout', internalName: 'PostWorkout', emoji: '💪', defaultTime: '5:00 PM' }
  ];

  // Get available meal types (not owned by quick-view system)
  const getAvailableMealTypes = () => {
    return mealTypes.map(mealType => {
      const meal = meals.find(m => m.name === mealType.internalName);
      const source = mealSources[mealType.internalName];
      const hasQuickViewData = source === 'quickview' && meal && (meal.calories > 0 || (meal.items && meal.items.length > 0));
      
      return {
        ...mealType,
        disabled: hasQuickViewData,
        hasExistingData: hasQuickViewData,
        existingCalories: meal?.calories || 0,
        source: source
      };
    });
  };

  // Handle meal selection with conflict detection
  const handleMealSelection = (mealType) => {
    const meal = meals.find(m => m.name === mealType.internalName);
    const source = mealSources[mealType.internalName];
    
    // Check if meal has quick-view data
    if (source === 'quickview' && meal && (meal.calories > 0 || (meal.items && meal.items.length > 0))) {
      setConflictMealType(mealType);
      setShowConflictModal(true);
      setShowMealPicker(false);
      return;
    }

    // Proceed normally
    setPendingMealType(mealType);
    setSelectedMealTime(mealType.defaultTime);
    setShowMealPicker(false);
    setShowTimePicker(true);
  };

  // Handle conflict resolution
  const handleConflictResolution = (action) => {
    if (action === 'override') {
      // Claim the meal for USDA system and reset its data
      onClaimMeal(conflictMealType.internalName, 'usda');
      
      // Proceed with meal selection
      setPendingMealType(conflictMealType);
      setSelectedMealTime(conflictMealType.defaultTime);
      setShowConflictModal(false);
      setShowTimePicker(true);
    } else {
      // Cancel - go back to meal picker
      setShowConflictModal(false);
      setShowMealPicker(true);
    }
    setConflictMealType(null);
  };

  // Handle time confirmation
  const handleTimeConfirm = (time) => {
    setSelectedMealType(pendingMealType.name);
    setSelectedMealTime(time);
    setShowTimePicker(false);
    setPendingMealType(null);
    setHasAddedFoods(false);
    
    // Claim the meal for USDA system
    onClaimMeal(pendingMealType.internalName, 'usda');
  };

  // Search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchFoods(searchQuery);
    }
  };

  // Search USDA database
  const searchFoods = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${USDA_BASE_URL}/foods/search?query=${encodeURIComponent(query)}&pageSize=20&api_key=${USDA_API_KEY}`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      const processedResults = data.foods.map(food => ({
        fdcId: food.fdcId,
        description: food.description,
        brandName: food.brandName || '',
        dataType: food.dataType,
        servingInfo: extractServingInfo(food),
        nutrition: extractNutritionPerServing(food.foodNutrients, food)
      }));
      
      setSearchResults(processedResults);
      
      // Initialize servings to 1 serving instead of 100g
      const initialServings = {};
      processedResults.forEach(food => {
        initialServings[food.fdcId] = 1;
      });
      setFoodServings(prev => ({ ...prev, ...initialServings }));
    } catch (err) {
      setError('Failed to search foods. Please try again.');
      console.error('USDA API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract serving size information from USDA data
  const extractServingInfo = (food) => {
    // Try to get serving size from different sources
    let servingSize = 100; // Default to 100g if no serving info
    let servingUnit = 'g';
    let servingDescription = '1 serving (100g)';

    // Check food portions for serving size
    if (food.foodPortions && food.foodPortions.length > 0) {
      const portion = food.foodPortions[0]; // Use first portion as default serving
      if (portion.gramWeight) {
        servingSize = portion.gramWeight;
        servingDescription = portion.portionDescription || `1 serving (${servingSize}g)`;
      }
    }
    
    // Check for serving size in food attributes
    if (food.servingSize && food.servingSizeUnit) {
      servingDescription = `1 serving (${food.servingSize}${food.servingSizeUnit})`;
    }

    // For branded foods, often have better serving info
    if (food.brandName && food.servingSize) {
      servingDescription = `1 serving (${food.servingSize}${food.servingSizeUnit || 'g'})`;
    }

    return {
      size: servingSize,
      unit: servingUnit,
      description: servingDescription
    };
  };

  // Extract nutrition per serving instead of per 100g
  const extractNutritionPerServing = (nutrients, food) => {
    const nutritionMap = {
      protein: 0,
      carbs: 0, 
      fat: 0,
      calories: 0,
      sugar: 0
    };

    // Extract nutrition values (these are typically per 100g from USDA)
    nutrients.forEach(nutrient => {
      const name = nutrient.nutrientName?.toLowerCase() || '';
      const value = nutrient.value || 0;

      if (name.includes('protein')) nutritionMap.protein = value;
      else if (name.includes('carbohydrate')) nutritionMap.carbs = value;
      else if (name.includes('total lipid') || name.includes('fat')) nutritionMap.fat = value;
      else if (name.includes('energy') && nutrient.unitName === 'KCAL') nutritionMap.calories = value;
      else if (name.includes('sugars, total')) nutritionMap.sugar = value;
    });

    // Convert from per 100g to per serving
    const servingInfo = extractServingInfo(food);
    const servingMultiplier = servingInfo.size / 100; // Convert from 100g to actual serving size
    
    return {
      protein: Math.round(nutritionMap.protein * servingMultiplier * 10) / 10,
      carbs: Math.round(nutritionMap.carbs * servingMultiplier * 10) / 10,
      fat: Math.round(nutritionMap.fat * servingMultiplier * 10) / 10,
      calories: Math.round(nutritionMap.calories * servingMultiplier),
      sugar: Math.round(nutritionMap.sugar * servingMultiplier * 10) / 10
    };
  };

  // Handle serving picker
  const handleServingClick = (food) => {
    setSelectedFoodForServing(food);
    setShowServingPicker(true);
  };

  const handleServingSelection = (newServings, unit) => {
    if (selectedFoodForServing) {
      setFoodServings(prev => ({
        ...prev,
        [selectedFoodForServing.fdcId]: newServings
      }));
    }
    setShowServingPicker(false);
    setSelectedFoodForServing(null);
  };

  // Add food to selected meal
  const addFoodToSelectedMeal = (food, servings = 1) => {
    const nutrition = food.nutrition;
    const adjustedNutrition = {
      protein: (nutrition.protein * servings).toFixed(1),
      carbs: (nutrition.carbs * servings).toFixed(1),
      fat: (nutrition.fat * servings).toFixed(1),
      calories: Math.round(nutrition.calories * servings),
      sugar: (nutrition.sugar * servings).toFixed(1)
    };

    const foodItem = {
      food: food.description,
      brand: food.brandName,
      fdcId: food.fdcId,
      servings: servings,
      servingInfo: food.servingInfo,
      source: 'usda',
      ...adjustedNutrition
    };

    // Find meal by display name and convert to internal name
    const mealTypeObj = mealTypes.find(mt => mt.name === selectedMealType);
    const internalName = mealTypeObj?.internalName;

    if (internalName) {
      // Ensure the meal is claimed for USDA before adding food
      onClaimMeal(internalName, 'usda');

      onUpdateMeal(internalName, {
        time: selectedMealTime,
        addItem: foodItem,
        source: 'usda'
      });

      setHasAddedFoods(true);
      setShowAddedFeedback(food.description);
      setTimeout(() => setShowAddedFeedback(''), 2000);
    }
  };

  // Reset state when closing
  const handleClose = () => {
    setHasAddedFoods(false);
    setSelectedMealType('');
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  const availableMealTypes = getAvailableMealTypes();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-50">
      <div className="h-full flex flex-col">
        
        {/* Header with Daily Totals */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Create Meal (USDA)</h2>
            <button onClick={handleClose} className="text-white hover:text-gray-200 text-2xl">×</button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <div className="text-xs font-medium">Protein</div>
              <div className="text-sm font-bold">{totalMacros.protein}g</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <div className="text-xs font-medium">Carbs</div>
              <div className="text-sm font-bold">{totalMacros.carbs}g</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <div className="text-xs font-medium">Fat</div>
              <div className="text-sm font-bold">{totalMacros.fat}g</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <div className="text-xs font-medium">Calories</div>
              <div className="text-sm font-bold">{totalMacros.calories}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 p-4">
            
            {/* Meal Selection Button */}
            {!showMealPicker && !showTimePicker && !showConflictModal && (
              <div className="sticky top-0 bg-white pb-4 z-10">
                {!hasAddedFoods ? (
                  <button
                    onClick={() => setShowMealPicker(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 text-left hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl"
                  >
                    {selectedMealType ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">
                            {mealTypes.find(m => m.name === selectedMealType)?.emoji}
                          </span>
                          <div>
                            <div className="text-xl font-bold">{selectedMealType}</div>
                            <div className="text-sm opacity-80">{selectedMealTime}</div>
                          </div>
                        </div>
                        <div className="text-sm opacity-70">Tap to change</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">Select Meal</div>
                        <div className="text-sm opacity-80">Choose meal type and time</div>
                      </div>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowMealPicker(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-3 text-left hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {mealTypes.find(m => m.name === selectedMealType)?.emoji}
                        </span>
                        <div>
                          <div className="text-sm font-bold">{selectedMealType}</div>
                          <div className="text-xs opacity-80">{selectedMealTime}</div>
                        </div>
                        <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                      </div>
                      <div className="text-xs opacity-70">Change</div>
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* Added Food Feedback */}
            {showAddedFeedback && (
              <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-20 animate-pulse">
                <div className="text-sm font-medium">✅ Added {showAddedFeedback.substring(0, 30)}...</div>
              </div>
            )}

            {/* Food Search */}
            {selectedMealType && (
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Search Foods</h3>
                  
                  <div className="flex gap-3 mb-6">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search foods... (nutrition shown per serving)"
                      className="flex-1 p-4 border border-gray-300 rounded-xl text-lg"
                    />
                    <button
                      onClick={() => searchFoods(searchQuery)}
                      disabled={isLoading}
                      className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {isLoading ? '...' : 'Search'}
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  
                  {/* Search Results */}
                  <div className="space-y-3">
                    {isLoading && (
                      <div className="text-center py-8">
                        <div className="text-2xl mb-2">🔍</div>
                        <p className="text-gray-600">Searching USDA database...</p>
                      </div>
                    )}
                    
                    {searchResults.map((food) => (
                      <div key={food.fdcId} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{food.description}</div>
                              {food.brandName && (
                                <div className="text-sm text-blue-600 font-medium">{food.brandName}</div>
                              )}
                              <div className="text-sm text-gray-600 mt-1">
                                {food.nutrition.calories} cal • {food.nutrition.protein}g protein per serving
                              </div>
                              <div className="text-xs text-gray-500">
                                {food.servingInfo.description}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium text-gray-700">Servings:</label>
                              <button
                                onClick={() => handleServingClick(food)}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg font-medium transition-colors"
                              >
                                {foodServings[food.fdcId] || 1} servings
                              </button>
                            </div>
                            
                            <div className="flex-1 text-xs text-gray-600">
                              {Math.round(food.nutrition.calories * (foodServings[food.fdcId] || 1))} cal •{' '}
                              {Math.round(food.nutrition.protein * (foodServings[food.fdcId] || 1) * 10) / 10}g protein
                            </div>
                            
                            <button
                              onClick={() => addFoodToSelectedMeal(food, foodServings[food.fdcId] || 1)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {searchResults.length === 0 && searchQuery && !isLoading && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-2xl mb-2">🍽️</div>
                        <p>No foods found. Try a different search term.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meal Type Picker Modal */}
        {showMealPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-5/6 flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Select Meal</h3>
                <button onClick={() => setShowMealPicker(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-3">
                  {availableMealTypes.map((mealType) => (
                    <button
                      key={mealType.name}
                      onClick={() => handleMealSelection(mealType)}
                      disabled={mealType.disabled}
                      className={`border border-gray-200 rounded-xl p-4 text-center transition-colors hover:shadow-lg ${
                        mealType.disabled 
                          ? 'bg-red-50 border-red-200 cursor-not-allowed opacity-60' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mealType.emoji}</div>
                      <div className="font-medium text-gray-800 text-sm">{mealType.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{mealType.defaultTime}</div>
                      {mealType.hasExistingData && (
                        <div className="text-xs text-red-600 mt-1 font-medium">
                          Quick View: {mealType.existingCalories} cal
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conflict Resolution Modal */}
        {showConflictModal && conflictMealType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">⚠️</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Meal Conflict</h3>
                  <p className="text-gray-600">
                    <strong>{conflictMealType.name}</strong> already has data from Quick View 
                    ({meals.find(m => m.name === conflictMealType.internalName)?.calories || 0} calories).
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleConflictResolution('override')}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    Override & Use USDA
                  </button>
                  <button
                    onClick={() => handleConflictResolution('cancel')}
                    className="w-full bg-gray-300 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors"
                  >
                    Cancel & Choose Different Meal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Picker Modal */}
        <TimePickerModal
          isOpen={showTimePicker}
          currentTime={selectedMealTime}
          onSelectTime={handleTimeConfirm}
          onClose={() => setShowTimePicker(false)}
          mealType={pendingMealType}
        />

        {/* Serving Picker Modal */}
        <USDAServingPickerModal
          isOpen={showServingPicker}
          currentServing={selectedFoodForServing ? (foodServings[selectedFoodForServing.fdcId] || 1) : 1}
          currentUnit="servings"
          foodData={selectedFoodForServing}
          onSelectServing={handleServingSelection}
          onClose={() => {
            setShowServingPicker(false);
            setSelectedFoodForServing(null);
          }}
        />
      </div>
    </div>
  );
}