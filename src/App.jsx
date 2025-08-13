import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FoodDatabase, getFoodsInCategory } from './FoodDatabase.js';

// Import the meal messaging system (uncomment when files are available)
// import { MealMessages } from './src/MealMessages/index.js';

// Mock the messaging system for now - remove when real import is used
const MealMessages = {
  getTimeAwareMessage: (allMeals, currentMealType, currentMealTotals, currentMealItems, userProfile, calorieData, selectedTime, pieData) => {
    // Mock implementation - replace with real import
    if (currentMealTotals.calories < 50) return null;
    
    const proteinPercent = pieData[0]?.percentage || 0;
    const carbPercent = pieData[1]?.percentage || 0;
    
    // Simple mock logic
    if (proteinPercent >= 40) {
      return `${userProfile.firstName}, excellent protein focus at ${proteinPercent}%! This supports your ${userProfile.goal} goals perfectly.`;
    } else if (carbPercent > 60 && proteinPercent < 25) {
      return `${userProfile.firstName}, whoa! ${carbPercent}% carbs for ${userProfile.goal}? Your muscles need more protein to build effectively!`;
    } else {
      return `Good nutrition choices, ${userProfile.firstName}! Keep building toward your ${userProfile.goal} goals.`;
    }
  }
};

// Time Picker Modal Component
function TimePickerModal({ isOpen, currentTime, onSelectTime, onClose }) {
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  useEffect(() => {
    if (isOpen && currentTime) {
      // Parse current time to set initial selection
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
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
                      selectedHour === hour
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                      selectedMinute === minute
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                      selectedPeriod === period
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview and Confirm */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {selectedHour}:{selectedMinute} {selectedPeriod}
            </div>
            <p className="text-gray-600">Selected Time</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Confirm Time
            </button>
          </div>
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

function MealMessageDisplay({ meal, profile, getMealMessage }) {
  if (!meal || meal.calories === 0) return null;
  
  const message = getMealMessage(meal);
  if (!message) return null;
  
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="text-2xl">✨</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Nutrition Insight</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}

function FoodCategoryGrid({ mealId, onSelectCategory }) {
  const categories = [
    [
      { name: 'Protein', icon: '🍗', color: 'bg-blue-500' },
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
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Add Foods</h3>
      {categories.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-2 gap-3">
          {row.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name, mealId)}
              className={`${category.color} text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="text-sm font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function FoodSelectionModal({ category, mealId, onAddFood, onClose }) {
  const [selectedFood, setSelectedFood] = useState('');
  const [servings, setServings] = useState(1);
  
  // Map UI food categories to database categories
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-96 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{category}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {foods.map((food) => (
              <button
                key={food}
                onClick={() => setSelectedFood(food)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                  selectedFood === food 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-800">{food}</div>
                <div className="text-sm text-gray-600">
                  {FoodDatabase[dbCategory][food].calories} cal per serving
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {selectedFood && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <label className="text-sm font-medium text-gray-700">Servings:</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                step="0.1"
                min="0.1"
                className="w-20 p-2 border border-gray-300 rounded-lg text-center"
              />
            </div>
            <button
              onClick={handleAddFood}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Add {selectedFood}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MealFoodList({ meal, onRemoveFood }) {
  if (!meal.items || meal.items.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold text-gray-800 text-sm">Added Foods:</h4>
      {meal.items.map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center">
          <div className="flex-1">
            <div className="font-medium text-sm text-gray-800">{item.food}</div>
            <div className="text-xs text-gray-600">
              {item.servings}x serving • {Math.round(item.calories)} cal
            </div>
          </div>
          <button
            onClick={() => onRemoveFood(meal.id, index)}
            className="text-red-500 hover:text-red-700 text-sm ml-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

// Full Screen Swipe Interface Component
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
  getMealMessage 
}) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedMealForTime, setSelectedMealForTime] = useState(null);

  const openTimePicker = (mealId) => {
    setSelectedMealForTime(mealId);
    setShowTimePicker(true);
  };

  const closeTimePicker = () => {
    setShowTimePicker(false);
    setSelectedMealForTime(null);
  };

  const handleTimeSelection = (newTime) => {
    if (selectedMealForTime) {
      setMeals(prev => prev.map(m => 
        m.id === selectedMealForTime ? { ...m, time: newTime } : m
      ));
    }
  };

  const getCurrentMeal = () => meals.find(m => m.id === selectedMealForTime);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-50">
      <div className="h-full flex flex-col">
        {/* Minimal Header */}
        <div className="p-4 text-center text-white">
          <div className="flex justify-between items-center">
            <div className="w-8"></div>
            <div>
              <p className="text-sm opacity-80">Swipe left or right • Meal {currentCard + 1} of {meals.length}</p>
            </div>
            <button
              onClick={onExit}
              className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Full Size Card Stack */}
        <div className="flex-1 relative px-4 pb-4">
          {meals.map((meal, index) => {
            const isActive = index === currentCard;
            const position = cardPositions[index];
            const zIndex = isActive ? 20 : meals.length - Math.abs(index - currentCard);
            const scale = isActive ? 1 : 0.95;
            const opacity = isActive ? 1 : 0.7;
            
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
                {/* Full Size Card */}
                <div className="bg-white rounded-3xl shadow-2xl w-full h-full flex flex-col">
                  {/* Compact Header */}
                  <div className="p-4 flex-shrink-0">
                    <div className="text-center">
                      {/* Top Line: Meal Name */}
                      <div className="mb-3">
                        <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
                      </div>
                      
                      {/* Second Line: Emoji + Calories + Time Button */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-4xl">
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
                        <div className="text-3xl font-bold text-purple-600">{meal.calories} cal</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            openTimePicker(meal.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                          🕐 {meal.time}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-6 pb-6 no-swipe-zone">
                    <div className="space-y-6">
                      
                      {/* Food Selection Grid */}
                      <FoodCategoryGrid 
                        mealId={meal.id} 
                        onSelectCategory={openFoodSelection} 
                      />
                      
                      {/* Added Foods List */}
                      <MealFoodList 
                        meal={meal} 
                        onRemoveFood={removeFoodFromMeal} 
                      />

                      {/* Manual Macro Entry Section */}
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Manual Entry (Optional)</h4>
                        
                        <div className="space-y-4">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-lg">P</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                                <input
                                  type="number"
                                  value={meal.protein}
                                  onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold text-lg">C</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Carbs (g)</label>
                                <input
                                  type="number"
                                  value={meal.carbs}
                                  onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 font-bold text-lg">F</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fat (g)</label>
                                <input
                                  type="number"
                                  value={meal.fat}
                                  onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-xl text-lg bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Meal Message Section */}
                      <MealMessageSection meal={meal} profile={profile} getMealMessage={getMealMessage} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Picker Modal */}
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
  const [profile, setProfile] = useState({
    height: { feet: 5, inches: 8 },
    weight: 150,
    name: "Champion",
    goal: "gain-muscle"
  });

  // Map meal names to messaging system types
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

  // Map UI food categories to database categories
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

  const [meals, setMeals] = useState([
    { 
      id: 1, 
      name: 'Breakfast', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '7:00 AM',
      items: []
    },
    { 
      id: 2, 
      name: 'FirstSnack', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '9:30 AM',
      items: []
    },
    { 
      id: 3, 
      name: 'SecondSnack', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '11:00 AM',
      items: []
    },
    { 
      id: 4, 
      name: 'Lunch', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '12:30 PM',
      items: []
    },
    { 
      id: 5, 
      name: 'MidAfternoon Snack', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '3:30 PM',
      items: []
    },
    { 
      id: 6, 
      name: 'Dinner', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '6:30 PM',
      items: []
    },
    { 
      id: 7, 
      name: 'Late Snack', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '8:30 PM',
      items: []
    },
    { 
      id: 8, 
      name: 'PostWorkout', 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      calories: 0,
      time: '5:00 PM',
      items: []
    }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [cardPositions, setCardPositions] = useState(meals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [isScrollModal, setIsScrollModal] = useState(false);
  const [isFullScreenSwipe, setIsFullScreenSwipe] = useState(false);
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMealForFood, setSelectedMealForFood] = useState(null);
  const dragRef = useRef({ startX: 0, startY: 0 });

  // USDA API Configuration
  const USDA_API_KEY = 'tdlBSP5YGMzEbAkkehT6VFCctFwrVwmg2nYsrgjx';
  const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

  // Enhanced Create Meal Modal with USDA Search
  function CreateMealModalWithUSDA({ onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('');
    const [selectedMealTime, setSelectedMealTime] = useState('12:00 PM');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMealPicker, setShowMealPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [pendingMealType, setPendingMealType] = useState(null);

    // Available meal types
    const mealTypes = [
      { name: 'Breakfast', emoji: '🍳', defaultTime: '7:00 AM' },
      { name: 'First Snack', emoji: '🍎', defaultTime: '9:30 AM' },
      { name: 'Second Snack', emoji: '🥨', defaultTime: '11:00 AM' },
      { name: 'Lunch', emoji: '🥗', defaultTime: '12:30 PM' },
      { name: 'Mid-Afternoon Snack', emoji: '🥜', defaultTime: '3:30 PM' },
      { name: 'Dinner', emoji: '🍽️', defaultTime: '6:30 PM' },
      { name: 'Late Snack', emoji: '🍓', defaultTime: '8:30 PM' },
      { name: 'Post-Workout', emoji: '💪', defaultTime: '5:00 PM' }
    ];

    // Handle meal selection - goes straight to time picker
    const handleMealSelection = (mealType) => {
      setPendingMealType(mealType);
      setSelectedMealTime(mealType.defaultTime);
      setShowMealPicker(false);
      setShowTimePicker(true);
    };

    // Search on Enter key
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        searchFoods(searchQuery);
      }
    };

    // Handle time confirmation - finalizes meal selection
    const handleTimeConfirm = (time) => {
      setSelectedMealType(pendingMealType.name);
      setSelectedMealTime(time);
      setShowTimePicker(false);
      setPendingMealType(null);
    };

    // Custom Time Picker Modal
    const TimePickerModal = ({ isOpen, currentTime, onSelectTime, onClose }) => {
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
                <p className="text-sm text-gray-600">{pendingMealType?.name}</p>
              </div>
              <button onClick={() => { onClose(); setShowMealPicker(true); }} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
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
                Confirm {pendingMealType?.name} at {selectedHour}:{selectedMinute} {selectedPeriod}
              </button>
            </div>
          </div>
        </div>
      );
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
        
        // Process results to extract key nutrition info
        const processedResults = data.foods.map(food => ({
          fdcId: food.fdcId,
          description: food.description,
          brandName: food.brandName || '',
          dataType: food.dataType,
          // Extract key nutrients (per 100g)
          nutrition: extractNutrition(food.foodNutrients)
        }));
        
        setSearchResults(processedResults);
      } catch (err) {
        setError('Failed to search foods. Please try again.');
        console.error('USDA API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Extract nutrition from USDA nutrient array
    const extractNutrition = (nutrients) => {
      const nutritionMap = {
        protein: 0,
        carbs: 0, 
        fat: 0,
        calories: 0,
        sugar: 0
      };

      nutrients.forEach(nutrient => {
        const name = nutrient.nutrientName?.toLowerCase() || '';
        const value = nutrient.value || 0;

        // Map USDA nutrient names to our format
        if (name.includes('protein')) nutritionMap.protein = value;
        else if (name.includes('carbohydrate')) nutritionMap.carbs = value;
        else if (name.includes('total lipid') || name.includes('fat')) nutritionMap.fat = value;
        else if (name.includes('energy') && nutrient.unitName === 'KCAL') nutritionMap.calories = value;
        else if (name.includes('sugars, total')) nutritionMap.sugar = value;
      });

      return nutritionMap;
    };

    // Add food to selected meal
    const addFoodToSelectedMeal = (food, servings = 100) => {
      const nutrition = food.nutrition;
      const adjustedNutrition = {
        protein: (nutrition.protein * servings / 100).toFixed(1),
        carbs: (nutrition.carbs * servings / 100).toFixed(1),
        fat: (nutrition.fat * servings / 100).toFixed(1),
        calories: Math.round(nutrition.calories * servings / 100),
        sugar: (nutrition.sugar * servings / 100).toFixed(1)
      };

      const foodItem = {
        food: food.description,
        brand: food.brandName,
        fdcId: food.fdcId,
        servings: servings / 100,
        ...adjustedNutrition
      };

      // Find the selected meal type and add food to it
      const selectedMeal = meals.find(meal => meal.name === selectedMealType);
      if (selectedMeal) {
        // Update the existing meal
        setMeals(prev => prev.map(meal => {
          if (meal.name === selectedMealType) {
            const updatedItems = [...(meal.items || []), foodItem];
            const newProtein = meal.protein + parseFloat(adjustedNutrition.protein);
            const newCarbs = meal.carbs + parseFloat(adjustedNutrition.carbs);
            const newFat = meal.fat + parseFloat(adjustedNutrition.fat);
            const newCalories = meal.calories + parseInt(adjustedNutrition.calories);

            return {
              ...meal,
              time: selectedMealTime, // Update time too
              items: updatedItems,
              protein: Math.round(newProtein * 10) / 10,
              carbs: Math.round(newCarbs * 10) / 10,
              fat: Math.round(newFat * 10) / 10,
              calories: Math.round(newCalories)
            };
          }
          return meal;
        }));
      }
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-50">
        <div className="h-full flex flex-col">
          
          {/* Sticky Daily Totals Header */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Create Meal</h2>
              <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">×</button>
            </div>
            
            {/* Daily Totals */}
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
              
              {/* Sticky Select Meal Button */}
              <div className="sticky top-0 bg-white pb-4 z-10">
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
              </div>

              {/* Food Search - Only show if meal is selected */}
              {selectedMealType && (
                <div className="space-y-4">
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Search Foods</h3>
                    
                    {/* Search Input */}
                    <div className="flex gap-3 mb-6">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search foods... (e.g., 'chicken breast')"
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

                    {error && (
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    
                    {/* Search Results */}
                    <div className="space-y-3">
                      {isLoading && (
                        <div className="text-center py-8">
                          <div className="text-2xl mb-2">🔍</div>
                          <p className="text-gray-600">Searching USDA database...</p>
                        </div>
                      )}
                      
                      {searchResults.map((food) => (
                        <div
                          key={food.fdcId}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">
                                {food.description}
                              </div>
                              {food.brandName && (
                                <div className="text-sm text-blue-600 font-medium">
                                  {food.brandName}
                                </div>
                              )}
                              <div className="text-sm text-gray-600 mt-1">
                                {food.nutrition.calories} cal • {food.nutrition.protein}g protein (per 100g)
                              </div>
                            </div>
                            <button
                              onClick={() => addFoodToSelectedMeal(food, 100)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors ml-3"
                            >
                              Add
                            </button>
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
                    {mealTypes.map((mealType) => (
                      <button
                        key={mealType.name}
                        onClick={() => handleMealSelection(mealType)}
                        className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 text-center transition-colors hover:shadow-lg"
                      >
                        <div className="text-3xl mb-2">{mealType.emoji}</div>
                        <div className="font-medium text-gray-800 text-sm">{mealType.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{mealType.defaultTime}</div>
                      </button>
                    ))}
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
          />
        </div>
      </div>
    );
  } // End of CreateMealModalWithUSDA function

  const updateMeal = (mealId, field, value) => {
    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const updated = { ...meal, [field]: parseInt(value) || 0 };
        // Calculate calories: protein*4 + carbs*4 + fat*9
        updated.calories = (updated.protein * 4) + (updated.carbs * 4) + (updated.fat * 9);
        return updated;
      }
      return meal;
    }));
  };

  const addFoodToMeal = (mealId, category, foodName, servings = 1) => {
    const foodData = FoodDatabase[category]?.[foodName];
    if (!foodData) return;

    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const newItem = {
          food: foodName,
          category: category,
          servings: servings,
          protein: foodData.protein * servings,
          carbs: foodData.carbs * servings,
          fat: foodData.fat * servings,
          calories: foodData.calories * servings
        };

        const updatedItems = [...(meal.items || []), newItem];
        const newProtein = meal.protein + (foodData.protein * servings);
        const newCarbs = meal.carbs + (foodData.carbs * servings);
        const newFat = meal.fat + (foodData.fat * servings);
        const newCalories = meal.calories + (foodData.calories * servings);

        return {
          ...meal,
          items: updatedItems,
          protein: Math.round(newProtein * 10) / 10,
          carbs: Math.round(newCarbs * 10) / 10,
          fat: Math.round(newFat * 10) / 10,
          calories: Math.round(newCalories)
        };
      }
      return meal;
    }));
  };

  const removeFoodFromMeal = (mealId, itemIndex) => {
    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const itemToRemove = meal.items[itemIndex];
        const updatedItems = meal.items.filter((_, index) => index !== itemIndex);
        
        const newProtein = meal.protein - itemToRemove.protein;
        const newCarbs = meal.carbs - itemToRemove.carbs;
        const newFat = meal.fat - itemToRemove.fat;
        const newCalories = meal.calories - itemToRemove.calories;

        return {
          ...meal,
          items: updatedItems,
          protein: Math.max(0, Math.round(newProtein * 10) / 10),
          carbs: Math.max(0, Math.round(newCarbs * 10) / 10),
          fat: Math.max(0, Math.round(newFat * 10) / 10),
          calories: Math.max(0, Math.round(newCalories))
        };
      }
      return meal;
    }));
  };

  // Helper function to calculate pie data for a meal
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

  // Convert meals to messaging system format
  const formatMealsForMessaging = () => {
    const allMeals = {};
    meals.forEach(meal => {
      const mealType = mealTypeMapping[meal.name];
      if (mealType) {
        allMeals[mealType] = {
          time: meal.time,
          totals: {
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            sugar: 0 // Can be added later
          },
          items: meal.items,
          pieData: calculatePieData(meal)
        };
      }
    });
    return allMeals;
  };

  // Mock calorie data - replace with real TDEE calculation
  const calorieData = {
    targetCalories: profile.goal === 'dirty-bulk' ? 3200 : 
                   profile.goal === 'gain-muscle' ? 2800 :
                   profile.goal === 'lose' ? 2000 : 2500,
    tdee: profile.weight ? Math.round(profile.weight * 15 + (profile.goal === 'dirty-bulk' ? 500 : 0)) : 2500
  };

  // Generate message for current meal
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
      sugar: 0
    };
    
    const pieData = calculatePieData(meal);
    
    const userProfileForMessages = {
      firstName: profile.name || 'Champion',
      goal: profile.goal || 'gain-muscle',
      weight: profile.weight
    };
    
    return MealMessages.getTimeAwareMessage(
      allMeals,
      currentMealType,
      currentMealTotals,
      meal.items,
      userProfileForMessages,
      calorieData,
      meal.time,
      pieData
    );
  };

  const openFoodSelection = (category, mealId) => {
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
  };

  const exitSwipeMode = () => {
    setIsSwipeMode(false);
    setIsDragging(false);
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    // Reset card positions when exiting
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
    
    // Only allow swiping on specific areas, not the scrollable content
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
    
    // Only process as swipe if horizontal movement is significant
    if (Math.abs(deltaX) > 15) {
      e.preventDefault();
      const rotation = deltaX * 0.1;

      setCardPositions(prev => prev.map((pos, index) => 
        index === currentCard 
          ? { x: deltaX, y: deltaY, rotation }
          : pos
      ));
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
      // Swipe detected - move to next card
      const direction = currentPos.x > 0 ? 'right' : 'left';
      
      // Animate card off screen
      setCardPositions(prev => prev.map((pos, index) => 
        index === currentCard 
          ? { x: direction === 'right' ? 400 : -400, y: pos.y, rotation: direction === 'right' ? 30 : -30 }
          : pos
      ));
      
      // After animation, move to next card and reset positions
      setTimeout(() => {
        setCurrentCard(prev => (prev + 1) % meals.length);
        setCardPositions(prev => prev.map(() => ({ x: 0, y: 0, rotation: 0 })));
      }, 300);
    } else {
      // Snap back to center
      setCardPositions(prev => prev.map((pos, index) => 
        index === currentCard 
          ? { x: 0, y: 0, rotation: 0 }
          : pos
      ));
    }
  };

  const totalMacros = meals.reduce((total, meal) => ({
    protein: total.protein + meal.protein,
    carbs: total.carbs + meal.carbs,
    fat: total.fat + meal.fat,
    calories: total.calories + meal.calories
  }), { protein: 0, carbs: 0, fat: 0, calories: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Profile Section - Hidden in swipe modes */}
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Profile</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={profile.height.feet}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      height: { ...prev.height, feet: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-16 p-2 border rounded-lg text-center"
                    placeholder="5"
                  />
                  <span className="self-center text-gray-600">ft</span>
                  <input
                    type="number"
                    value={profile.height.inches}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      height: { ...prev.height, inches: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-16 p-2 border rounded-lg text-center"
                    placeholder="8"
                  />
                  <span className="self-center text-gray-600">in</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                    className="w-20 p-2 border rounded-lg text-center"
                    placeholder="150"
                  />
                  <span className="self-center text-gray-600">lbs</span>
                </div>
              </div>
            </div>
            
            {/* Name and Goal inputs */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded-lg text-center"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                <select
                  value={profile.goal}
                  onChange={(e) => setProfile(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full p-2 border rounded-lg text-center"
                >
                  <option value="lose">Lose Fat</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain-muscle">Gain Muscle</option>
                  <option value="dirty-bulk">Dirty Bulk</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Daily Totals - Always visible but smaller in swipe modes */}
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Daily Totals</h2>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-blue-100 rounded-lg p-2">
                <div className="text-xs text-blue-600 font-medium">Protein</div>
                <div className="text-lg font-bold text-blue-800">{totalMacros.protein}g</div>
              </div>
              <div className="bg-green-100 rounded-lg p-2">
                <div className="text-xs text-green-600 font-medium">Carbs</div>
                <div className="text-lg font-bold text-green-800">{totalMacros.carbs}g</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-2">
                <div className="text-xs text-yellow-600 font-medium">Fat</div>
                <div className="text-lg font-bold text-yellow-800">{totalMacros.fat}g</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-2">
                <div className="text-xs text-purple-600 font-medium">Calories</div>
                <div className="text-lg font-bold text-purple-800">{totalMacros.calories}</div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message & Pie Chart - Only on main screen */}
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome {profile.name}!</h2>
              <p className="text-gray-600">Ready to track your {profile.goal} journey? Let's get started!</p>
            </div>
            
            {/* Macro Pie Chart */}
            <div className="h-64 mb-4">
              {totalMacros.calories > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Protein', value: totalMacros.protein * 4, color: '#3B82F6' },
                        { name: 'Carbs', value: totalMacros.carbs * 4, color: '#10B981' },
                        { name: 'Fat', value: totalMacros.fat * 9, color: '#F59E0B' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value} cal`}
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} calories`, '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-gray-500 font-medium">Your macro breakdown will appear here</p>
                    <p className="text-gray-400 text-sm">Start adding meals to see your progress!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode Toggle Buttons */}
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && (
          <div className="text-center mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3 justify-center">
              <button
                onClick={enterSwipeMode}
                className="bg-white text-purple-600 px-4 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🍽️ Quick View
              </button>
              <button
                onClick={enterScrollModal}
                className="bg-white text-blue-600 px-4 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                📋 Scroll View
              </button>
              <button
                onClick={enterFullScreenSwipe}
                className="bg-white text-orange-600 px-4 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🌟 Full Screen
              </button>
              <button
                onClick={() => setShowCreateMeal(true)}
                className="bg-white text-green-600 px-4 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🔍 Create Meal
              </button>
            </div>
          </div>
        )}

        {/* Full Screen Swipe Interface - Used by both isSwipeMode and isFullScreenSwipe */}
        {(isSwipeMode || isFullScreenSwipe) && (
          <FullScreenSwipeInterface
            meals={meals}
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
          />
        )}
      </div>

      {/* Scrolling Modal */}
      {isScrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md h-5/6 flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">All Meals</h2>
              <button
                onClick={exitScrollModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {meals.map((meal, index) => (
                <div key={meal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{meal.name}</h3>
                    <div className="text-2xl mt-1">
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
                    <div className="text-xl font-bold text-purple-600 mt-1">{meal.calories} cal</div>
                  </div>

                  {/* Food Selection Grid for Scroll Modal */}
                  <FoodCategoryGrid 
                    mealId={meal.id} 
                    onSelectCategory={openFoodSelection} 
                  />
                  
                  {/* Added Foods List */}
                  <MealFoodList 
                    meal={meal} 
                    onRemoveFood={removeFoodFromMeal} 
                  />

                  {/* Manual Entry Section */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Manual Entry (Optional)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600">Protein</label>
                        <input
                          type="number"
                          value={meal.protein}
                          onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Carbs</label>
                        <input
                          type="number"
                          value={meal.carbs}
                          onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">Fat</label>
                        <input
                          type="number"
                          value={meal.fat}
                          onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={exitScrollModal}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Food Selection Modal */}
      {selectedCategory && selectedMealForFood && (
        <FoodSelectionModal
          category={selectedCategory}
          mealId={selectedMealForFood}
          onAddFood={addFoodToMeal}
          onClose={closeFoodSelection}
        />
      )}

      {/* Create Meal Modal */}
      {showCreateMeal && (
        <CreateMealModalWithUSDA
          onClose={() => setShowCreateMeal(false)}
        />
      )}
    </div>
  );
};

export default MealSwipeApp;