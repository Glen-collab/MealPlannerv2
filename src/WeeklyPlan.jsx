// WeeklyPlan.js - Main Component with Goal-Based Week Plan Modal
import React, { useState } from 'react';
import { X, Scale, Coffee, Hand, Users, Clock, Target, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Import our modular components
import { FoodDatabase, servingSizeConversions, getServingInfo } from './FoodDatabase.js';
import {
  calculateTotals,
  preparePieData,
  calculateTDEE,
  getServingWarnings,
  getSugarWarningStyle,
  getSugarWarningMessage,
  getCalorieProgressMessage
} from './Utils.js';
import { MealMessages } from './MealMessages/index.js';
import MealTracker from './MealTracker.jsx';

// Goal-Based Week Plan Modal Component
const WeekPlanModal = ({ isOpen, onClose, onAddWeekPlan, userProfile, calorieData, isMobile = false }) => {
  const [selectedEatingStyle, setSelectedEatingStyle] = useState(null);
  const [selectedMealFrequency, setSelectedMealFrequency] = useState(null);

  if (!isOpen) return null;

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const createFoodItem = (category, food, serving = 1) => ({
    id: generateId(),
    category,
    food,
    serving,
    displayServing: serving.toString(),
    displayUnit: 'servings'
  });

  // Check if profile is complete
  const isProfileComplete = userProfile.firstName && userProfile.weight && userProfile.goal && userProfile.exerciseLevel;

  // Calculate portion multiplier based on calorie target
  const getPortionMultiplier = () => {
    if (!calorieData?.targetCalories) return 1;

    const baseCalories = 2200; // Reference point
    return calorieData.targetCalories / baseCalories;
  };

  const portionMultiplier = getPortionMultiplier();

  // Predefined meal plans based on eating style and goals
  const getMealPlan = (eatingStyle, mealFrequency, goal) => {
    const plans = {
      balanced: {
        3: {
          breakfast: {
            time: "7:00 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.5 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1 * portionMultiplier),
              createFoodItem('protein', 'Greek Yogurt (non-fat)', 0.5 * portionMultiplier),
              createFoodItem('fat', 'Almonds', 0.3 * portionMultiplier)
            ]
          },
          lunch: {
            time: "12:30 PM",
            items: [
              createFoodItem('protein', goal === 'lose' ? 'Chicken Breast' : 'Turkey Breast', 1 * portionMultiplier),
              createFoodItem('carbohydrate', 'Brown Rice (cooked)', 0.8 * portionMultiplier),
              createFoodItem('vegetables', 'Broccoli', 1 * portionMultiplier),
              createFoodItem('fat', 'Olive Oil', 0.5 * portionMultiplier)
            ]
          },
          dinner: {
            time: "6:30 PM",
            items: [
              createFoodItem('protein', 'Salmon', 1 * portionMultiplier),
              createFoodItem('carbohydrate', 'Sweet Potato', 0.8 * portionMultiplier),
              createFoodItem('vegetables', 'Asparagus', 1 * portionMultiplier),
              createFoodItem('vegetables', 'Spinach', 0.5 * portionMultiplier)
            ]
          }
        },
        5: {
          breakfast: {
            time: "7:00 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.4 * portionMultiplier),
              createFoodItem('fruits', 'Blueberries', 0.5 * portionMultiplier),
              createFoodItem('protein', 'Greek Yogurt (non-fat)', 0.5 * portionMultiplier)
            ]
          },
          firstSnack: {
            time: "10:00 AM",
            items: [
              createFoodItem('fruits', 'Apple', 1 * portionMultiplier),
              createFoodItem('fat', goal === 'dirty-bulk' ? 'Peanut Butter' : 'Almonds', 0.5 * portionMultiplier)
            ]
          },
          lunch: {
            time: "12:30 PM",
            items: [
              createFoodItem('protein', 'Turkey Breast', 1 * portionMultiplier),
              createFoodItem('carbohydrate', 'Quinoa (cooked)', 0.8 * portionMultiplier),
              createFoodItem('vegetables', 'Bell Peppers', 1 * portionMultiplier)
            ]
          },
          midAfternoon: {
            time: "3:30 PM",
            items: [
              createFoodItem('protein', 'String Cheese', 1 * portionMultiplier),
              createFoodItem('fruits', 'Grapes', 0.5 * portionMultiplier)
            ]
          },
          dinner: {
            time: "6:30 PM",
            items: [
              createFoodItem('protein', goal === 'lose' ? 'Cod' : 'Lean Beef (90/10)', 1 * portionMultiplier),
              createFoodItem('carbohydrate', 'Sweet Potato', 0.6 * portionMultiplier),
              createFoodItem('vegetables', 'Green Beans', 1 * portionMultiplier),
              createFoodItem('fat', 'Avocado', 0.5 * portionMultiplier)
            ]
          }
        },
        6: {
          breakfast: {
            time: "6:30 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.4 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 0.8 * portionMultiplier),
              createFoodItem('protein', 'Eggs (whole)', 1.5 * portionMultiplier)
            ]
          },
          firstSnack: {
            time: "9:30 AM",
            items: [
              createFoodItem('protein', 'Greek Yogurt (non-fat)', 0.5 * portionMultiplier),
              createFoodItem('fruits', 'Strawberries', 0.5 * portionMultiplier)
            ]
          },
          lunch: {
            time: "12:00 PM",
            items: [
              createFoodItem('protein', 'Chicken Breast', 1.2 * portionMultiplier),
              createFoodItem('carbohydrate', 'Brown Rice (cooked)', 1 * portionMultiplier),
              createFoodItem('vegetables', 'Broccoli', 1 * portionMultiplier)
            ]
          },
          midAfternoon: {
            time: "3:00 PM",
            items: [
              createFoodItem('fat', 'Almonds', 0.5 * portionMultiplier),
              createFoodItem('fruits', 'Apple', 1 * portionMultiplier)
            ]
          },
          postWorkout: {
            time: "5:30 PM",
            items: [
              createFoodItem('protein', 'Whey Protein (generic)', 1 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1 * portionMultiplier)
            ]
          },
          dinner: {
            time: "7:30 PM",
            items: [
              createFoodItem('protein', 'Salmon', 1.2 * portionMultiplier),
              createFoodItem('carbohydrate', 'Quinoa (cooked)', 0.8 * portionMultiplier),
              createFoodItem('vegetables', 'Asparagus', 1 * portionMultiplier),
              createFoodItem('fat', 'Olive Oil', 0.5 * portionMultiplier)
            ]
          }
        }
      },
      performance: {
        3: {
          breakfast: {
            time: "6:00 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.75 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1.5 * portionMultiplier),
              createFoodItem('protein', 'Whey Protein (generic)', 1 * portionMultiplier),
              createFoodItem('fat', 'Peanut Butter', 0.5 * portionMultiplier)
            ]
          },
          lunch: {
            time: "12:00 PM",
            items: [
              createFoodItem('protein', 'Chicken Breast', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'White Rice (cooked)', 1.2 * portionMultiplier),
              createFoodItem('vegetables', 'Broccoli', 1 * portionMultiplier),
              createFoodItem('fat', 'Olive Oil', 0.5 * portionMultiplier)
            ]
          },
          dinner: {
            time: "7:00 PM",
            items: [
              createFoodItem('protein', 'Lean Beef (90/10)', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'Sweet Potato', 1.2 * portionMultiplier),
              createFoodItem('vegetables', 'Spinach', 1 * portionMultiplier),
              createFoodItem('fat', 'Avocado', 0.8 * portionMultiplier)
            ]
          }
        },
        5: {
          breakfast: {
            time: "6:00 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.6 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1 * portionMultiplier),
              createFoodItem('protein', 'Whey Protein (generic)', 1 * portionMultiplier)
            ]
          },
          firstSnack: {
            time: "9:00 AM",
            items: [
              createFoodItem('carbohydrate', 'Rice Cakes', 3 * portionMultiplier),
              createFoodItem('fat', 'Peanut Butter', 0.5 * portionMultiplier)
            ]
          },
          lunch: {
            time: "12:00 PM",
            items: [
              createFoodItem('protein', 'Chicken Breast', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'White Rice (cooked)', 1.2 * portionMultiplier),
              createFoodItem('vegetables', 'Bell Peppers', 1 * portionMultiplier)
            ]
          },
          midAfternoon: {
            time: "3:00 PM",
            items: [
              createFoodItem('protein', 'Greek Yogurt (non-fat)', 1 * portionMultiplier),
              createFoodItem('fruits', 'Strawberries', 0.8 * portionMultiplier)
            ]
          },
          dinner: {
            time: "6:30 PM",
            items: [
              createFoodItem('protein', 'Salmon', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'Sweet Potato', 1 * portionMultiplier),
              createFoodItem('vegetables', 'Green Beans', 1 * portionMultiplier),
              createFoodItem('fat', 'Olive Oil', 0.5 * portionMultiplier)
            ]
          }
        },
        6: {
          breakfast: {
            time: "5:30 AM",
            items: [
              createFoodItem('carbohydrate', 'Oats (dry)', 0.6 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1 * portionMultiplier),
              createFoodItem('protein', 'Whey Protein (generic)', 1 * portionMultiplier)
            ]
          },
          firstSnack: {
            time: "8:30 AM",
            items: [
              createFoodItem('carbohydrate', 'Rice Cakes', 2 * portionMultiplier),
              createFoodItem('fat', 'Almonds', 0.5 * portionMultiplier)
            ]
          },
          lunch: {
            time: "11:30 AM",
            items: [
              createFoodItem('protein', 'Chicken Breast', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'White Rice (cooked)', 1.5 * portionMultiplier),
              createFoodItem('vegetables', 'Broccoli', 1 * portionMultiplier)
            ]
          },
          midAfternoon: {
            time: "2:30 PM",
            items: [
              createFoodItem('protein', 'Greek Yogurt (non-fat)', 1 * portionMultiplier),
              createFoodItem('fruits', 'Blueberries', 0.8 * portionMultiplier)
            ]
          },
          postWorkout: {
            time: "5:00 PM",
            items: [
              createFoodItem('protein', 'Whey Protein (generic)', 1.5 * portionMultiplier),
              createFoodItem('fruits', 'Banana', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'White Rice (cooked)', 0.8 * portionMultiplier)
            ]
          },
          dinner: {
            time: "7:30 PM",
            items: [
              createFoodItem('protein', 'Lean Beef (90/10)', 1.5 * portionMultiplier),
              createFoodItem('carbohydrate', 'Sweet Potato', 1 * portionMultiplier),
              createFoodItem('vegetables', 'Asparagus', 1 * portionMultiplier),
              createFoodItem('fat', 'Avocado', 0.8 * portionMultiplier)
            ]
          }
        }
      }
    };

    return plans[eatingStyle]?.[mealFrequency] || {};
  };

  const handleCreatePlan = () => {
    if (!isProfileComplete) return;

    if (selectedEatingStyle && selectedMealFrequency) {
      const mealPlan = getMealPlan(selectedEatingStyle, selectedMealFrequency, userProfile.goal);

      const weekPlanData = {
        meals: mealPlan,
        fruitCount: 2 // Estimated fruit servings
      };

      onAddWeekPlan(weekPlanData);
      onClose();
      setSelectedEatingStyle(null);
      setSelectedMealFrequency(null);
    }
  };

  const targetCalories = calorieData?.targetCalories || 2200;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📅</span>
            Plan My Week
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Your Goal from Profile */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Target size={18} />
              Your Goal from Profile
            </h4>
            {isProfileComplete ? (
              <div className="text-blue-700">
                <div className="font-medium capitalize mb-1">
                  {userProfile.goal?.replace('-', ' ') || 'Not Set'}
                </div>
                <div className="text-sm">
                  Target: {targetCalories} calories per day for {userProfile.firstName}
                </div>
              </div>
            ) : (
              <div className="text-orange-700 font-medium">
                ⚠️ Complete your profile to get personalized meal plans
              </div>
            )}
          </div>

          {/* Step 1: Choose Eating Style */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Choose Your Eating Style
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedEatingStyle('balanced')}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedEatingStyle === 'balanced'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <h5 className="font-bold text-gray-800 mb-2">Balanced Eater</h5>
                  <p className="text-sm text-gray-600">
                    Wholesome, sustainable nutrition with variety and balance. Perfect for long-term health.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Focus: Whole foods, moderate portions, sustainable habits
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedEatingStyle('performance')}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedEatingStyle === 'performance'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🏃‍♂️</div>
                  <h5 className="font-bold text-gray-800 mb-2">Performance Eater</h5>
                  <p className="text-sm text-gray-600">
                    Optimized nutrition for athletes and active individuals. Higher protein and strategic carbs.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Focus: High protein, strategic carbs, performance optimization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Choose Meal Frequency */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Choose Meal Frequency
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedMealFrequency(3)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedMealFrequency === 3
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <span>🍽️</span>
                      3 Meals/Day
                    </div>
                    <div className="text-sm text-gray-600">Breakfast, Lunch, Dinner</div>
                  </div>
                  <div className="text-xs text-gray-500">Traditional</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMealFrequency(5)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedMealFrequency === 5
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <span>🍎</span>
                      5 Meals/Day
                    </div>
                    <div className="text-sm text-gray-600">Main meals + 2 snack meals</div>
                  </div>
                  <div className="text-xs text-gray-500">Balanced</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMealFrequency(6)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedMealFrequency === 6
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <span>💪</span>
                      6 Meals/Day
                    </div>
                    <div className="text-sm text-gray-600">Main meals + 2 snacks + post-workout meal</div>
                  </div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {selectedEatingStyle && selectedMealFrequency && isProfileComplete && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle size={18} />
                Plan Preview
              </h4>
              <div className="text-green-700 text-sm space-y-1">
                <div>Style: <span className="font-medium capitalize">{selectedEatingStyle} Eater</span></div>
                <div>Frequency: <span className="font-medium">{selectedMealFrequency} meals per day</span></div>
                <div>Target: <span className="font-medium">{targetCalories} calories</span></div>
                <div>Goal: <span className="font-medium capitalize">{userProfile.goal?.replace('-', ' ')}</span></div>
              </div>
              <div className="mt-3 text-xs text-green-600">
                ✨ This plan will replace your current meals with optimized portions for your goals
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePlan}
            disabled={!isProfileComplete || !selectedEatingStyle || !selectedMealFrequency}
            className={`flex-1 py-2 px-6 rounded-md font-medium transition-colors ${isProfileComplete && selectedEatingStyle && selectedMealFrequency
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {!isProfileComplete ? 'Complete Profile First' : 'Create Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WeeklyPlan = () => {
  // ========================
  // USER PROFILE STATE
  // ========================
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    heightFeet: '',
    heightInches: '',
    weight: '',
    exerciseLevel: '',
    goal: ''
  });

  // ========================
  // WEEK PLAN MODAL STATE
  // ========================
  const [isWeekPlanModalOpen, setIsWeekPlanModalOpen] = useState(false);

  // ========================
  // ALL MEAL STATES
  // ========================

  // Breakfast State
  const [breakfastTime, setBreakfastTime] = useState('7:00 AM');
  const [breakfastItems, setBreakfastItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // First Snack State
  const [firstSnackTime, setFirstSnackTime] = useState('9:00 AM');
  const [firstSnackItems, setFirstSnackItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Second Snack State
  const [secondSnackTime, setSecondSnackTime] = useState('11:00 AM');
  const [secondSnackItems, setSecondSnackItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Lunch State
  const [lunchTime, setLunchTime] = useState('12:30 PM');
  const [lunchItems, setLunchItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Mid-Afternoon Snack State
  const [midAfternoonTime, setMidAfternoonTime] = useState('3:00 PM');
  const [midAfternoonItems, setMidAfternoonItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Dinner State
  const [dinnerTime, setDinnerTime] = useState('6:00 PM');
  const [dinnerItems, setDinnerItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Late Snack State
  const [lateSnackTime, setLateSnackTime] = useState('8:00 PM');
  const [lateSnackItems, setLateSnackItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // Post Workout State
  const [postWorkoutTime, setPostWorkoutTime] = useState('6:00 PM');
  const [postWorkoutItems, setPostWorkoutItems] = useState([
    { id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }
  ]);

  // ========================
  // MODAL STATE
  // ========================
  const [showServingModal, setShowServingModal] = useState(false);
  const [modalFoodItem, setModalFoodItem] = useState(null);
  const [modalMealType, setModalMealType] = useState('');
  const [customServing, setCustomServing] = useState({ amount: 1, unit: 'servings' });

  // ========================
  // CALCULATIONS
  // ========================

  // Calculate TDEE data
  const calorieData = calculateTDEE(userProfile);

  // Calculate totals for each meal
  const breakfastTotals = calculateTotals(breakfastItems);
  const firstSnackTotals = calculateTotals(firstSnackItems);
  const secondSnackTotals = calculateTotals(secondSnackItems);
  const lunchTotals = calculateTotals(lunchItems);
  const midAfternoonTotals = calculateTotals(midAfternoonItems);
  const dinnerTotals = calculateTotals(dinnerItems);
  const lateSnackTotals = calculateTotals(lateSnackItems);
  const postWorkoutTotals = calculateTotals(postWorkoutItems);

  // Prepare chart data for each meal
  const breakfastPieData = preparePieData(breakfastTotals);
  const firstSnackPieData = preparePieData(firstSnackTotals);
  const secondSnackPieData = preparePieData(secondSnackTotals);
  const lunchPieData = preparePieData(lunchTotals);
  const midAfternoonPieData = preparePieData(midAfternoonTotals);
  const dinnerPieData = preparePieData(dinnerTotals);
  const lateSnackPieData = preparePieData(lateSnackTotals);
  const postWorkoutPieData = preparePieData(postWorkoutTotals);

  // Get warnings for each meal
  const breakfastWarnings = getServingWarnings(breakfastItems, 'breakfast', userProfile);
  const firstSnackWarnings = getServingWarnings(firstSnackItems, 'firstSnack', userProfile);
  const secondSnackWarnings = getServingWarnings(secondSnackItems, 'secondSnack', userProfile);
  const lunchWarnings = getServingWarnings(lunchItems, 'lunch', userProfile);
  const midAfternoonWarnings = getServingWarnings(midAfternoonItems, 'midAfternoon', userProfile);
  const dinnerWarnings = getServingWarnings(dinnerItems, 'dinner', userProfile);
  const lateSnackWarnings = getServingWarnings(lateSnackItems, 'lateSnack', userProfile);
  const postWorkoutWarnings = getServingWarnings(postWorkoutItems, 'postWorkout', userProfile);

  // Calculate combined daily totals
  const dailyTotals = {
    protein: breakfastTotals.protein + firstSnackTotals.protein + secondSnackTotals.protein +
      lunchTotals.protein + midAfternoonTotals.protein + dinnerTotals.protein +
      lateSnackTotals.protein + postWorkoutTotals.protein,
    carbs: breakfastTotals.carbs + firstSnackTotals.carbs + secondSnackTotals.carbs +
      lunchTotals.carbs + midAfternoonTotals.carbs + dinnerTotals.carbs +
      lateSnackTotals.carbs + postWorkoutTotals.carbs,
    fat: breakfastTotals.fat + firstSnackTotals.fat + secondSnackTotals.fat +
      lunchTotals.fat + midAfternoonTotals.fat + dinnerTotals.fat +
      lateSnackTotals.fat + postWorkoutTotals.fat,
    sugar: breakfastTotals.sugar + firstSnackTotals.sugar + secondSnackTotals.sugar +
      lunchTotals.sugar + midAfternoonTotals.sugar + dinnerTotals.sugar +
      lateSnackTotals.sugar + postWorkoutTotals.sugar,
    calories: breakfastTotals.calories + firstSnackTotals.calories + secondSnackTotals.calories +
      lunchTotals.calories + midAfternoonTotals.calories + dinnerTotals.calories +
      lateSnackTotals.calories + postWorkoutTotals.calories
  };

  const dailyPieData = preparePieData(dailyTotals);

  // ========================
  // EVENT HANDLERS
  // ========================

  const updateUserProfile = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  // Universal meal management functions
  const getMealState = (mealType) => {
    switch (mealType) {
      case 'breakfast': return { items: breakfastItems, setItems: setBreakfastItems };
      case 'firstSnack': return { items: firstSnackItems, setItems: setFirstSnackItems };
      case 'secondSnack': return { items: secondSnackItems, setItems: setSecondSnackItems };
      case 'lunch': return { items: lunchItems, setItems: setLunchItems };
      case 'midAfternoon': return { items: midAfternoonItems, setItems: setMidAfternoonItems };
      case 'dinner': return { items: dinnerItems, setItems: setDinnerItems };
      case 'lateSnack': return { items: lateSnackItems, setItems: setLateSnackItems };
      case 'postWorkout': return { items: postWorkoutItems, setItems: setPostWorkoutItems };
      default: return { items: [], setItems: () => { } };
    }
  };

  const addFoodItem = (mealType) => {
    const { items, setItems } = getMealState(mealType);
    const maxItems = ['breakfast', 'lunch', 'dinner'].includes(mealType) ? 4 : 2;

    if (items.length < maxItems) {
      const newId = Math.max(...items.map(item => item.id)) + 1;
      setItems([...items, {
        id: newId, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings'
      }]);
    }
  };

  const removeFoodItem = (mealType, id) => {
    const { items, setItems } = getMealState(mealType);
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateFoodItem = (mealType, id, field, value) => {
    const { items, setItems } = getMealState(mealType);
    setItems(items.map(item =>
      item.id === id
        ? { ...item, [field]: value, ...(field === 'category' ? { food: '' } : {}) }
        : item
    ));
  };

  // Modal functions
  const openServingModal = (mealType, foodItem) => {
    setModalMealType(mealType);
    setModalFoodItem(foodItem);
    setCustomServing({ amount: parseFloat(foodItem.displayServing) || 1, unit: foodItem.displayUnit || 'servings' });
    setShowServingModal(true);
  };

  const closeServingModal = () => {
    setShowServingModal(false);
    setModalFoodItem(null);
    setModalMealType('');
  };

  const applyCustomServing = () => {
    if (modalFoodItem && modalMealType) {
      let finalServing = customServing.amount;

      // Convert different units to serving multiplier
      if (customServing.unit === 'grams' && modalFoodItem.category && modalFoodItem.food) {
        const baseGrams = servingSizeConversions[modalFoodItem.category]?.[modalFoodItem.food]?.grams || 100;
        finalServing = customServing.amount / baseGrams;
      } else if (customServing.unit === 'ounces' && modalFoodItem.category && modalFoodItem.food) {
        const baseOunces = servingSizeConversions[modalFoodItem.category]?.[modalFoodItem.food]?.ounces || 3.5;
        finalServing = customServing.amount / baseOunces;
      } else if (customServing.unit === 'cups' && modalFoodItem.category && modalFoodItem.food) {
        const baseCups = servingSizeConversions[modalFoodItem.category]?.[modalFoodItem.food]?.cups || 0.5;
        finalServing = customServing.amount / baseCups;
      }

      const { items, setItems } = getMealState(modalMealType);
      const updatedItems = items.map(item =>
        item.id === modalFoodItem.id
          ? {
            ...item,
            serving: finalServing,
            displayServing: customServing.amount.toString(),
            displayUnit: customServing.unit
          }
          : item
      );

      setItems(updatedItems);
      closeServingModal();
    }
  };

  // Week Plan Functions
  const handleAddWeekPlan = (weekPlan) => {
    const meals = weekPlan.meals;

    // Clear all meals first by resetting to empty state
    setBreakfastItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setFirstSnackItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setSecondSnackItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setLunchItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setMidAfternoonItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setDinnerItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setLateSnackItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);
    setPostWorkoutItems([{ id: 1, category: '', food: '', serving: 1, displayServing: '1', displayUnit: 'servings' }]);

    // Update meal states based on what's provided in the plan
    if (meals.breakfast) {
      setBreakfastTime(meals.breakfast.time);
      setBreakfastItems(meals.breakfast.items);
    }
    if (meals.firstSnack) {
      setFirstSnackTime(meals.firstSnack.time);
      setFirstSnackItems(meals.firstSnack.items);
    }
    if (meals.secondSnack) {
      setSecondSnackTime(meals.secondSnack.time);
      setSecondSnackItems(meals.secondSnack.items);
    }
    if (meals.lunch) {
      setLunchTime(meals.lunch.time);
      setLunchItems(meals.lunch.items);
    }
    if (meals.midAfternoon) {
      setMidAfternoonTime(meals.midAfternoon.time);
      setMidAfternoonItems(meals.midAfternoon.items);
    }
    if (meals.dinner) {
      setDinnerTime(meals.dinner.time);
      setDinnerItems(meals.dinner.items);
    }
    if (meals.lateSnack) {
      setLateSnackTime(meals.lateSnack.time);
      setLateSnackItems(meals.lateSnack.items);
    }
    if (meals.postWorkout) {
      setPostWorkoutTime(meals.postWorkout.time);
      setPostWorkoutItems(meals.postWorkout.items);
    }

    // Close modal
    setIsWeekPlanModalOpen(false);
  };

  // ========================
  // PREVIOUS MEALS DATA FOR MESSAGING
  // ========================

  const getPreviousMeals = (currentMealType) => {
    const allMeals = {
      breakfast: { time: breakfastTime, totals: breakfastTotals, items: breakfastItems, pieData: breakfastPieData },
      firstSnack: { time: firstSnackTime, totals: firstSnackTotals, items: firstSnackItems, pieData: firstSnackPieData },
      secondSnack: { time: secondSnackTime, totals: secondSnackTotals, items: secondSnackItems, pieData: secondSnackPieData },
      lunch: { time: lunchTime, totals: lunchTotals, items: lunchItems, pieData: lunchPieData },
      midAfternoon: { time: midAfternoonTime, totals: midAfternoonTotals, items: midAfternoonItems, pieData: midAfternoonPieData },
      dinner: { time: dinnerTime, totals: dinnerTotals, items: dinnerItems, pieData: dinnerPieData },
      lateSnack: { time: lateSnackTime, totals: lateSnackTotals, items: lateSnackItems, pieData: lateSnackPieData },
      postWorkout: { time: postWorkoutTime, totals: postWorkoutTotals, items: postWorkoutItems, pieData: postWorkoutPieData }
    };

    // Return all meals except the current one
    const { [currentMealType]: current, ...previous } = allMeals;
    return previous;
  };

  // Create timeline data for the bar chart
  const timelineData = [
    {
      name: `Breakfast\n${breakfastTime}`,
      calories: Math.round(breakfastTotals.calories),
      sugar: Math.round(breakfastTotals.sugar) * 10
    },
    {
      name: `Snack 1\n${firstSnackTime}`,
      calories: Math.round(firstSnackTotals.calories),
      sugar: Math.round(firstSnackTotals.sugar) * 10
    },
    {
      name: `Snack 2\n${secondSnackTime}`,
      calories: Math.round(secondSnackTotals.calories),
      sugar: Math.round(secondSnackTotals.sugar) * 10
    },
    {
      name: `Lunch\n${lunchTime}`,
      calories: Math.round(lunchTotals.calories),
      sugar: Math.round(lunchTotals.sugar) * 10
    },
    {
      name: `Mid-Aft\n${midAfternoonTime}`,
      calories: Math.round(midAfternoonTotals.calories),
      sugar: Math.round(midAfternoonTotals.sugar) * 10
    },
    {
      name: `Dinner\n${dinnerTime}`,
      calories: Math.round(dinnerTotals.calories),
      sugar: Math.round(dinnerTotals.sugar) * 10
    },
    {
      name: `Late Snack\n${lateSnackTime}`,
      calories: Math.round(lateSnackTotals.calories),
      sugar: Math.round(lateSnackTotals.sugar) * 10
    },
    {
      name: `Post-WO\n${postWorkoutTime}`,
      calories: Math.round(postWorkoutTotals.calories),
      sugar: Math.round(postWorkoutTotals.sugar) * 10
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* User Profile Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Profile & Goals</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Personal Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                value={userProfile.firstName}
                onChange={(e) => updateUserProfile('firstName', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <input
                type="text"
                placeholder="Last name"
                value={userProfile.lastName}
                onChange={(e) => updateUserProfile('lastName', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                value={userProfile.heightFeet}
                onChange={(e) => updateUserProfile('heightFeet', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Feet</option>
                {[4, 5, 6, 7].map(feet => (
                  <option key={feet} value={feet}>{feet} ft</option>
                ))}
              </select>
              <select
                value={userProfile.heightInches}
                onChange={(e) => updateUserProfile('heightInches', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Inches</option>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inches => (
                  <option key={inches} value={inches}>{inches} in</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Weight (lbs)"
                value={userProfile.weight}
                onChange={(e) => updateUserProfile('weight', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <select
              value={userProfile.exerciseLevel}
              onChange={(e) => updateUserProfile('exerciseLevel', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Exercise Level</option>
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very-active">Very Active (2x/day, intense)</option>
            </select>
          </div>

          {/* Goal Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Your Goal</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'maintain', label: 'Maintain', color: 'bg-gray-100 hover:bg-gray-200' },
                { value: 'lose', label: 'Lose Weight/Fat', color: 'bg-red-100 hover:bg-red-200' },
                { value: 'gain-muscle', label: 'Gain Muscle', color: 'bg-blue-100 hover:bg-blue-200' },
                { value: 'dirty-bulk', label: 'Dirty Bulk', color: 'bg-green-100 hover:bg-green-200' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => updateUserProfile('goal', goal.value)}
                  className={`p-3 text-sm font-medium rounded-md border-2 transition-colors ${userProfile.goal === goal.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : `border-gray-200 ${goal.color} text-gray-700`
                    }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>

            {/* Plan My Week Button */}
            <button
              onClick={() => setIsWeekPlanModalOpen(true)}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <span>📅</span>
              Plan My Week
            </button>
          </div>

          {/* TDEE Results */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Your Numbers</h3>
            {calorieData ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">BMR:</span>
                  <span className="font-medium">{calorieData.bmr} cal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TDEE:</span>
                  <span className="font-medium">{calorieData.tdee} cal</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-gray-600 font-medium">Target:</span>
                  <span className="font-bold text-blue-600">{calorieData.targetCalories} cal</span>
                </div>
                {userProfile.firstName && (
                  <div className="text-xs text-gray-500 mt-2">
                    Hey {userProfile.firstName}! These are your daily calorie targets.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Fill out your info to see your personalized calorie targets
              </div>
            )}
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📊 Weekly Plan
      </h1>

      {/* ALL MEAL TRACKERS - Now using the universal component! */}
      <MealTracker
        mealType="breakfast"
        time={breakfastTime}
        setTime={setBreakfastTime}
        items={breakfastItems}
        setItems={setBreakfastItems}
        totals={breakfastTotals}
        pieData={breakfastPieData}
        warnings={breakfastWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('breakfast')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="firstSnack"
        time={firstSnackTime}
        setTime={setFirstSnackTime}
        items={firstSnackItems}
        setItems={setFirstSnackItems}
        totals={firstSnackTotals}
        pieData={firstSnackPieData}
        warnings={firstSnackWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('firstSnack')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="secondSnack"
        time={secondSnackTime}
        setTime={setSecondSnackTime}
        items={secondSnackItems}
        setItems={setSecondSnackItems}
        totals={secondSnackTotals}
        pieData={secondSnackPieData}
        warnings={secondSnackWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('secondSnack')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="lunch"
        time={lunchTime}
        setTime={setLunchTime}
        items={lunchItems}
        setItems={setLunchItems}
        totals={lunchTotals}
        pieData={lunchPieData}
        warnings={lunchWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('lunch')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="midAfternoon"
        time={midAfternoonTime}
        setTime={setMidAfternoonTime}
        items={midAfternoonItems}
        setItems={setMidAfternoonItems}
        totals={midAfternoonTotals}
        pieData={midAfternoonPieData}
        warnings={midAfternoonWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('midAfternoon')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="dinner"
        time={dinnerTime}
        setTime={setDinnerTime}
        items={dinnerItems}
        setItems={setDinnerItems}
        totals={dinnerTotals}
        pieData={dinnerPieData}
        warnings={dinnerWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('dinner')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="lateSnack"
        time={lateSnackTime}
        setTime={setLateSnackTime}
        items={lateSnackItems}
        setItems={setLateSnackItems}
        totals={lateSnackTotals}
        pieData={lateSnackPieData}
        warnings={lateSnackWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('lateSnack')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      <MealTracker
        mealType="postWorkout"
        time={postWorkoutTime}
        setTime={setPostWorkoutTime}
        items={postWorkoutItems}
        setItems={setPostWorkoutItems}
        totals={postWorkoutTotals}
        pieData={postWorkoutPieData}
        warnings={postWorkoutWarnings}
        userProfile={userProfile}
        calorieData={calorieData}
        previousMeals={getPreviousMeals('postWorkout')}
        onOpenServingModal={openServingModal}
        onUpdateFoodItem={updateFoodItem}
        onAddFoodItem={addFoodItem}
        onRemoveFoodItem={removeFoodItem}
      />

      {/* Daily Summary Section */}
      <div className="mt-12 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">📈 Daily Totals</h2>

        <div className="text-center mb-6">
          <div className="text-lg font-bold text-purple-600">
            Daily Totals: Protein {dailyPieData[0]?.percentage || 0}% • Carbs {dailyPieData[1]?.percentage || 0}% • Fat {dailyPieData[2]?.percentage || 0}%
          </div>

          {/* Highlighted Calorie Total Box */}
          <div className="mt-4 mx-auto max-w-md">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <div className="text-white text-center">
                <div className="text-sm font-medium opacity-90">TOTAL DAILY CALORIES</div>
                <div className="text-4xl font-bold mt-1">{Math.round(dailyTotals.calories)}</div>
                {calorieData && (
                  <div className="text-sm opacity-90 mt-2">
                    Target: {calorieData.targetCalories} cal •
                    {(() => {
                      const progress = getCalorieProgressMessage(dailyTotals, calorieData);
                      return progress ? (
                        <span className={progress.className}> {progress.message}</span>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sugar Warning */}
        <div className={`mb-4 flex items-center justify-center gap-2 border rounded-md p-3 ${getSugarWarningStyle(dailyTotals, userProfile)}`}>
          {getSugarWarningMessage(dailyTotals, userProfile)}
        </div>

        {/* Daily Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Macro Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dailyPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dailyPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}g (${props.payload.percentage}%)`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Macronutrients</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(dailyTotals.protein)}g
                </div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(dailyTotals.carbs)}g
                </div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.round(dailyTotals.fat)}g
                </div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(dailyTotals.calories)}
                </div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Timeline Bar Chart */}
        <div className="mt-8 bg-white rounded-lg p-6 border">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Daily Timeline: Calories vs Sugar by Meal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timelineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <YAxis
                  label={{ value: 'Calories', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'sugar') {
                      return [`${Math.round(value / 10)}g (scaled x10 for visibility)`, 'Sugar'];
                    }
                    return [value, name === 'calories' ? 'Calories' : name];
                  }}
                />
                <Bar
                  dataKey="calories"
                  fill="#8B5CF6"
                  name="calories"
                />
                <Bar
                  dataKey="sugar"
                  fill="#EF4444"
                  name="sugar"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Calories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Sugar (scaled x10 for visibility)</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              💡 Sugar bars are scaled 10x larger to make high sugar content more visible!
            </div>
          </div>
        </div>
      </div>

      {/* Week Plan Modal */}
      <WeekPlanModal
        isOpen={isWeekPlanModalOpen}
        onClose={() => setIsWeekPlanModalOpen(false)}
        onAddWeekPlan={handleAddWeekPlan}
        userProfile={userProfile}
        calorieData={calorieData}
      />

      {/* Serving Size Modal */}
      {showServingModal && modalFoodItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Serving Size - {modalFoodItem.food}
              </h3>
              <button
                onClick={closeServingModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={customServing.amount}
                  onChange={(e) => setCustomServing({ ...customServing, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={customServing.unit}
                  onChange={(e) => setCustomServing({ ...customServing, unit: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="servings">Servings</option>
                  <option value="grams">Grams</option>
                  <option value="ounces">Ounces</option>
                  <option value="cups">Cups</option>
                </select>
              </div>

              {modalFoodItem.category && modalFoodItem.food && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Reference Serving Size:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Scale size={14} />
                      <span>{getServingInfo(modalFoodItem.category, modalFoodItem.food).grams}g</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee size={14} />
                      <span>{getServingInfo(modalFoodItem.category, modalFoodItem.food).ounces} oz / {getServingInfo(modalFoodItem.category, modalFoodItem.food).cups} cups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hand size={14} />
                      <span>{getServingInfo(modalFoodItem.category, modalFoodItem.food).palm}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={applyCustomServing}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={closeServingModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlan;