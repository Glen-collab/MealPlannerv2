import React, { useState, useRef, useEffect } from 'react';
import { FoodDatabase, getFoodsInCategory, getServingInfo } from './FoodDatabase.js';
import { USDAMealCreator } from './USDAMealCreator.jsx';
import { WelcomeScreen } from './WelcomeScreen.jsx';
import MealSwipeGame from './MealSwipeGame.jsx';
import DailyMealPlannerModule from './DailyMealPlannerModule';
import ProfileModule from './ProfileModule.jsx';
import MealIdeasModal from './MealIdeas.jsx';

// Mock the messaging system for now
const MealMessages = {
  getTimeAwareMessage: (allMeals, currentMealType, currentMealTotals, currentMealItems, userProfile, calorieData, selectedTime, pieData) => {
    if (currentMealTotals.calories < 50) return null;

    const proteinPercent = pieData[0]?.percentage || 0;
    const carbPercent = pieData[1]?.percentage || 0;

    if (proteinPercent >= 40) {
      return `${userProfile.firstName || userProfile.name}, excellent protein focus at ${proteinPercent}%! This supports your ${userProfile.goal} goals perfectly.`;
    } else if (carbPercent > 60 && proteinPercent < 25) {
      return `${userProfile.firstName || userProfile.name}, whoa! ${carbPercent}% carbs for ${userProfile.goal}? Your muscles need more protein to build effectively!`;
    } else {
      return `Good nutrition choices, ${userProfile.firstName || userProfile.name}! Keep building toward your ${userProfile.goal} goals.`;
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

// Enhanced Food Category Grid with meal ideas button
function FoodCategoryGrid({ mealId, onSelectCategory, mealSources, mealName, onOpenMealIdeas }) {
  const source = mealSources[mealName];
  const isUSDAOwned = source === 'usda';
  const supportsMealIdeas = ['Breakfast', 'Lunch', 'Dinner'].includes(mealName);

  const getServingReferenceForCategory = (categoryName) => {
    const categoryMapping = {
      'Protein': 'protein',
      'Carbs': 'carbohydrate',
      'Healthy Fats': 'fat',
      'Supplements': 'supplements',
      'Fruit': 'fruits',
      'Vegetables': 'vegetables',
      'Condiments': 'condiments',
      'Junk/Drink': 'snacks'
    };

    const dbCategory = categoryMapping[categoryName];
    if (!dbCategory) return '1 serving';

    const foods = getFoodsInCategory(dbCategory);
    if (foods.length === 0) return '1 serving';

    const servingInfo = getServingInfo(dbCategory, foods[0]);
    return servingInfo.palm;
  };

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
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Add Foods</h3>

      {/* MEAL IDEAS BUTTON - Ready for MealIdeas integration */}
      {supportsMealIdeas && onOpenMealIdeas && (
        <div className="mb-4">
          <button
            onClick={() => onOpenMealIdeas(mealName.toLowerCase())}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">💡</span>
            <span>{mealName} Ideas</span>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Quick</span>
          </button>
        </div>
      )}

      {categories.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-2 gap-3">
          {row.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name, mealId)}
              className={`${category.color} text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex flex-col items-center justify-center gap-1`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
              </div>
              <div className="text-xs opacity-80">{getServingReferenceForCategory(category.name)}</div>
            </button>
          ))}
        </div>
      ))}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mt-4">
        <div className="text-xs text-gray-600 text-center">
          <div className="font-semibold mb-1">👋 Hand-Based Serving Guide</div>
          <div className="text-xs text-gray-500">Use your hand as a visual reference for portion sizes</div>
        </div>
      </div>
    </div>
  );
}

function FoodSelectionModal({ category, mealId, onAddFood, onClose }) {
  const [selectedFood, setSelectedFood] = useState('');
  const [servings, setServings] = useState(1);

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
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {foods.map((food) => {
              const servingInfo = getServingInfo(dbCategory, food);
              return (
                <button
                  key={food}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${selectedFood === food ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="font-medium text-gray-800">{food}</div>
                  <div className="text-sm text-gray-600">{Math.round(FoodDatabase[dbCategory][food].calories)} cal per serving</div>
                  <div className="text-xs text-blue-600 mt-1">{servingInfo.palm}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedFood && (
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3">
              <div className="text-sm text-gray-600 mb-2">Reference: {getServingInfo(dbCategory, selectedFood).palm}</div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Servings:</label>
                <input
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  step="0.1"
                  min="0.1"
                  className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                />
              </div>
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

function MealFoodList({ meal, onRemoveFood, mealSources, readOnly = false }) {
  if (!meal.items || meal.items.length === 0) return null;

  const source = mealSources[meal.name];
  const isUSDAOwned = source === 'usda';

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
        Added Foods:
        {isUSDAOwned && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">USDA</span>}
      </h4>
      {meal.items.map((item, index) => {
        const servingInfo = item.category ? getServingInfo(item.category, item.food) : null;

        return (
          <div key={index} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center">
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800">{item.food}</div>
              {item.brand && <div className="text-xs text-blue-600">{item.brand}</div>}
              <div className="text-xs text-gray-600">
                {Math.round(item.servings * 10) / 10}x serving • {Math.round(item.calories)} cal
                {item.source === 'usda' && item.servingInfo && (
                  <div className="text-xs text-gray-500 mt-1">{item.servingInfo.description}</div>
                )}
                {item.source !== 'usda' && servingInfo && (
                  <div className="text-xs text-blue-500 mt-1">{servingInfo.palm}</div>
                )}
                {item.source === 'usda' && <span className="ml-2 text-blue-500">USDA</span>}
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
  getMealMessage,
  mealSources,
  onClaimMeal,
  onOpenMealIdeas
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
                          {meal.name === 'Late Snack' && '🍓'}
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
                          🕐 {meal.time}
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
    goal: 'gain-muscle',
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
    { id: 1, name: 'Breakfast', protein: 0, carbs: 0, fat: 0, calories: 0, time: '7:00 AM', items: [] },
    { id: 2, name: 'FirstSnack', protein: 0, carbs: 0, fat: 0, calories: 0, time: '9:30 AM', items: [] },
    { id: 3, name: 'SecondSnack', protein: 0, carbs: 0, fat: 0, calories: 0, time: '11:00 AM', items: [] },
    { id: 4, name: 'Lunch', protein: 0, carbs: 0, fat: 0, calories: 0, time: '12:30 PM', items: [] },
    { id: 5, name: 'MidAfternoon Snack', protein: 0, carbs: 0, fat: 0, calories: 0, time: '3:30 PM', items: [] },
    { id: 6, name: 'Dinner', protein: 0, carbs: 0, fat: 0, calories: 0, time: '6:30 PM', items: [] },
    { id: 7, name: 'Late Snack', protein: 0, carbs: 0, fat: 0, calories: 0, time: '8:30 PM', items: [] },
    { id: 8, name: 'PostWorkout', protein: 0, carbs: 0, fat: 0, calories: 0, time: '5:00 PM', items: [] }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [cardPositions, setCardPositions] = useState(meals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [isScrollModal, setIsScrollModal] = useState(false);
  const [isFullScreenSwipe, setIsFullScreenSwipe] = useState(false);
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMealForFood, setSelectedMealForFood] = useState(null);
  // State for MealIdeas
  const [showMealIdeas, setShowMealIdeas] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const dragRef = useRef({ startX: 0, startY: 0 });

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

    // Claim the meal for quickview
    claimMeal(targetMeal.name, 'quickview');

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
        addFoodToMeal(targetMeal.id, dbCategory, item.food, item.serving);
      } else {
        console.warn('Food not found in database:', item.food, 'category:', item.category);
      }
    });

    setShowMealIdeas(false);
  };

  const claimMeal = (mealName, source) => {
    setMealSources(prev => ({ ...prev, [mealName]: source }));
    if (source !== mealSources[mealName]) {
      setMeals(prev => prev.map(meal => {
        if (meal.name === mealName) {
          return { ...meal, protein: 0, carbs: 0, fat: 0, calories: 0, items: [] };
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
            updated.calories = updated.calories + Math.round(parseInt(item.calories));
          }
          return updated;
        }
        return meal;
      }));
    } else {
      setMeals(prev => prev.map(meal => {
        if (meal.id === mealId) {
          const updated = { ...meal, [field]: parseInt(value) || 0 };
          updated.calories = (updated.protein * 4) + (updated.carbs * 4) + (updated.fat * 9);
          return updated;
        }
        return meal;
      }));
      const meal = meals.find(m => m.id === mealId);
      if (meal && mealSources[meal.name] !== 'quickview') {
        claimMeal(meal.name, 'quickview');
      }
    }
  };

  const addFoodToMeal = (mealId, category, foodName, servings = 1) => {
    const foodData = FoodDatabase[category]?.[foodName];
    if (!foodData) return;

    const meal = meals.find(m => m.id === mealId);
    if (meal) claimMeal(meal.name, 'quickview');

    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const newItem = {
          food: foodName,
          category: category,
          servings: servings,
          protein: Math.round(foodData.protein * servings),
          carbs: Math.round(foodData.carbs * servings),
          fat: Math.round(foodData.fat * servings),
          calories: Math.round(foodData.calories * servings),
          source: 'quickview'
        };

        return {
          ...meal,
          items: [...(meal.items || []), newItem],
          protein: Math.round(meal.protein + foodData.protein * servings),
          carbs: Math.round(meal.carbs + foodData.carbs * servings),
          fat: Math.round(meal.fat + foodData.fat * servings),
          calories: Math.round(meal.calories + foodData.calories * servings)
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
        return {
          ...meal,
          items: updatedItems,
          protein: Math.max(0, Math.round(meal.protein - itemToRemove.protein)),
          carbs: Math.max(0, Math.round(meal.carbs - itemToRemove.carbs)),
          fat: Math.max(0, Math.round(meal.fat - itemToRemove.fat)),
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
        const estimatedSugar = Math.round(meal.carbs * 0.3);
        allMeals[mealType] = {
          time: meal.time,
          totals: { calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, sugar: estimatedSugar },
          items: meal.items,
          pieData: calculatePieData(meal)
        };
      }
    });
    return allMeals;
  };

  // Calculate calorie data from profile using ProfileModule's TDEE calculation
  const calculateTDEE = (userProfile) => {
    const { heightFeet, heightInches, weight, exerciseLevel, goal, gender } = userProfile;

    if (!heightFeet || !heightInches || !weight || !exerciseLevel || !goal || !gender) {
      return {
        bmr: 1800,
        tdee: 2200,
        targetCalories: profile.goal === 'dirty-bulk' ? 3200 : profile.goal === 'gain-muscle' ? 2800 : profile.goal === 'lose' ? 2000 : 2500
      };
    }

    const totalHeightInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
    const heightCm = totalHeightInches * 2.54;
    const weightKg = parseFloat(weight) * 0.453592;

    // BMR calculation using Mifflin-St Jeor equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5; // Using age 25 as default
    } else if (gender === 'female') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 - 161;
    } else {
      // Non-binary - use average
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

    // Goal adjustments
    let targetCalories;
    switch (goal) {
      case 'lose':
        targetCalories = tdee - 500; // 500 cal deficit for 1lb/week loss
        break;
      case 'gain-muscle':
        targetCalories = tdee + 300; // 300 cal surplus for lean gains
        break;
      case 'dirty-bulk':
        targetCalories = tdee + 700; // 700 cal surplus for rapid gains
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

    const currentMealTotals = { calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, sugar: 0 };
    const pieData = calculatePieData(meal);
    const userProfileForMessages = { firstName: profile.firstName || profile.name || 'Champion', goal: profile.goal || 'gain-muscle', weight: profile.weight };

    return MealMessages.getTimeAwareMessage(allMeals, currentMealType, currentMealTotals, meal.items, userProfileForMessages, calorieData, meal.time, pieData);
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
        setCurrentCard(prev => (prev + 1) % meals.length);
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
    calories: Math.round(total.calories + meal.calories)
  }), { protein: 0, carbs: 0, fat: 0, calories: 0 });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-blue-500 to-red-600 p-4">
      <div className="max-w-md mx-auto">
        {!isSwipeMode && !isFullScreenSwipe && !showCreateMeal && !showGame && (
          <>
            {/* Replace the old profile section with ProfileModule */}
            <ProfileModule
              isMobile={true}
              initialProfile={profile}
              allMeals={formatMealsForMessaging()}
              onProfileUpdate={handleProfileUpdate}
            />

            <div className="bg-white rounded-2xl p-4 mb-6 shadow-xl">
              <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">Daily Totals</h2>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-blue-100 rounded-lg p-2">
                  <div className="text-xs text-blue-600 font-medium">Protein</div>
                  <div className="text-lg font-bold text-blue-800">{Math.round(totalMacros.protein)}g</div>
                </div>
                <div className="bg-green-100 rounded-lg p-2">
                  <div className="text-xs text-green-600 font-medium">Carbs</div>
                  <div className="text-lg font-bold text-green-800">{Math.round(totalMacros.carbs)}g</div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-2">
                  <div className="text-xs text-yellow-600 font-medium">Fat</div>
                  <div className="text-lg font-bold text-yellow-800">{Math.round(totalMacros.fat)}g</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-2">
                  <div className="text-xs text-purple-600 font-medium">Calories</div>
                  <div className="text-lg font-bold text-purple-800">{Math.round(totalMacros.calories)}</div>
                </div>
              </div>
            </div>

            <WelcomeScreen profile={profile} totalMacros={totalMacros} meals={meals} />

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
              <div className="flex justify-center">
                <button
                  onClick={() => setShowGame(true)}
                  className="bg-white text-pink-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  🎮 Rate Your Meals
                </button>
              </div>
            </div>
          </>
        )}

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
            mealSources={mealSources}
            onClaimMeal={claimMeal}
            onOpenMealIdeas={handleOpenMealIdeas}
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
            <DailyMealPlannerModule
              meals={meals}
              profile={profile}
              totalMacros={totalMacros}
              mealSources={mealSources}
              className="h-full"
            />
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
                    goal: profile.goal || 'gain-muscle',
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
      </div>
    </div>
  );
};

export default MealSwipeApp;