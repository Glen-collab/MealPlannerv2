/*
  SELF-CONTAINED PROFILE MODULE
  
  This module includes all necessary functionality without external dependencies.
  In your actual app, you can replace the inline functions with imports:
  - import { generatePersonalTrainerSummary } from './PersonalTrainerSummary.js';
  - import MealIdeasModal from './MealIdeas.jsx';
  
  Usage:
  <ProfileModule 
    isMobile={window.innerWidth < 768}
    initialProfile={existingUserData}
    allMeals={mealsData}
    onProfileUpdate={(newProfile) => setUserProfile(newProfile)}
  />
*/

import React, { useState } from 'react';
import { X, User, Target, Activity, Calendar, Dumbbell, TrendingUp, ChefHat, Clock, Zap, Apple } from 'lucide-react';

// Simplified Personal Trainer Analysis (inline version)
const generatePersonalTrainerSummary = (allMeals, userProfile, calorieData) => {
  if (!userProfile.firstName) {
    return {
      title: "Complete Your Profile First",
      content: "Please fill out your profile information to get your personalized trainer analysis!"
    };
  }

  // Check if user has minimal food data
  const totalCalories = Object.values(allMeals).reduce((sum, meal) => 
    sum + (meal.totals?.calories || 0), 0
  );
  
  if (totalCalories < 200) {
    return {
      title: `${userProfile.firstName}'s Jumpstart Plan`,
      isJumpstart: true,
      goalMotivation: `Ready to achieve your ${userProfile.goal} goals, ${userProfile.firstName}? Let's build the perfect nutrition strategy!`,
      recommendations: [
        `🎯 Target ${calorieData?.targetCalories || 2200} calories daily for your ${userProfile.goal} goal`,
        `💪 Focus on protein at every meal - aim for 20-30g per meal`,
        `⏰ Plan 4-6 meals throughout the day for optimal results`
      ],
      proTips: [
        `🏆 "Consistency beats perfection every time" - Focus on building sustainable habits`,
        `💡 "Small daily improvements lead to staggering yearly results" - Plan your meals in advance`
      ],
      targets: {
        calories: calorieData?.targetCalories || 2200,
        protein: Math.round((userProfile.weight || 150) * 1.0),
        goal: userProfile.goal
      },
      callToAction: `🎯 Start by planning your meals above! Fill out each meal with foods that support your ${userProfile.goal} goals.`,
      bottomLine: `${userProfile.firstName}, you're about to transform your nutrition. Champions plan their meals like their success depends on it!`
    };
  }
  
  // Regular analysis for users with data
  const totalProtein = Object.values(allMeals).reduce((sum, meal) => 
    sum + (meal.totals?.protein || 0), 0
  );
  
  const grade = totalCalories > 1800 && totalProtein > 100 ? 'A' : totalProtein > 80 ? 'B' : 'C';
  const score = totalCalories > 1800 && totalProtein > 100 ? 92 : totalProtein > 80 ? 78 : 65;
  
  return {
    title: `${userProfile.firstName}'s Personal Trainer Analysis`,
    grade,
    score,
    strengths: [
      `💪 Good start with ${Math.round(totalProtein)}g protein!`,
      `✅ You're tracking your nutrition consistently`,
      `🎯 Working toward your ${userProfile.goal} goal`
    ],
    issues: totalProtein < 100 ? [`🥩 Need more protein - aim for ${Math.round((userProfile.weight || 150) * 1.0)}g daily`] : [],
    proteinAnalysis: `Current protein: ${Math.round(totalProtein)}g. ${totalProtein > 100 ? 'Excellent!' : 'Needs improvement.'}`,
    carbAnalysis: `Reasonable carb intake for your goals`,
    timingAnalysis: `Good meal distribution throughout the day`,
    goalAlignment: `Nutrition aligns well with your ${userProfile.goal} objective`,
    weeklyAdvice: `Keep this consistency up 5-6 days per week for optimal results!`,
    recommendations: [
      `🥩 Add lean protein to every meal`,
      `💧 Stay hydrated with 3-4 liters of water daily`,
      `⏰ Plan meals in advance for consistency`
    ],
    bottomLine: `${userProfile.firstName}, you're building great habits! Focus on consistency and you'll reach your goals!`,
    dailyTotals: {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(Object.values(allMeals).reduce((sum, meal) => sum + (meal.totals?.carbs || 0), 0)),
      fat: Math.round(Object.values(allMeals).reduce((sum, meal) => sum + (meal.totals?.fat || 0), 0)),
      sugar: Math.round(Object.values(allMeals).reduce((sum, meal) => sum + (meal.totals?.sugar || 0), 0))
    }
  };
};

// Simplified Meal Ideas Modal (inline version)
const MealIdeasModal = ({ isOpen, onClose, onAddMeal, userProfile, calorieData, isMobile, mealType }) => {
  const [currentMeal, setCurrentMeal] = useState(0);
  
  if (!isOpen) return null;

  const mealIdeas = [
    {
      name: `Protein Power ${mealType}`,
      description: `High-protein option for ${userProfile.goal} goals`,
      calories: 350,
      prepTime: "5 min",
      ingredients: ["Eggs", "Toast", "Greek Yogurt"],
      icon: "🍳"
    },
    {
      name: `Quick ${mealType} Bowl`,
      description: `Fast and nutritious ${mealType} option`,
      calories: 280,
      prepTime: "2 min",
      ingredients: ["Protein Shake", "Banana", "Almonds"],
      icon: "🥤"
    },
    {
      name: `Balanced ${mealType}`,
      description: `Perfect macro balance for your goals`,
      calories: 420,
      prepTime: "8 min",
      ingredients: ["Chicken", "Rice", "Vegetables"],
      icon: "🍽️"
    }
  ];

  const currentMealIdea = mealIdeas[currentMeal];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${isMobile ? 'w-full max-h-[80vh]' : 'max-w-md w-full'} overflow-hidden`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">
              {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Ideas ({currentMeal + 1}/{mealIdeas.length})
            </h3>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <p className="text-purple-100 text-sm mt-1">
            Goal: {userProfile.goal} • Target: {calorieData?.targetCalories || 2200} cal/day
          </p>
        </div>

        {/* Meal Card */}
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{currentMealIdea.icon}</div>
            <h4 className="text-xl font-bold text-gray-800">{currentMealIdea.name}</h4>
            <p className="text-gray-600 text-sm">{currentMealIdea.description}</p>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
              <div className="text-lg font-bold text-blue-600">{currentMealIdea.calories}</div>
              <div className="text-xs text-gray-600">Calories</div>
            </div>
            <div className="bg-green-100 rounded-lg px-3 py-2 text-center flex items-center gap-1">
              <Clock size={14} />
              <span className="text-sm font-medium text-green-700">{currentMealIdea.prepTime}</span>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="font-bold text-gray-800 mb-2">Ingredients:</h5>
            <div className="space-y-2">
              {currentMealIdea.ingredients.map((ingredient, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-2 text-sm text-gray-700">
                  • {ingredient}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onAddMeal({ 
                name: currentMealIdea.name,
                calories: currentMealIdea.calories,
                ingredients: currentMealIdea.ingredients
              });
              onClose();
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            ✅ Add to My {mealType}
          </button>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 p-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentMeal(Math.max(0, currentMeal - 1))}
            disabled={currentMeal === 0}
            className={`px-4 py-2 rounded-md ${
              currentMeal === 0 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            ← Previous
          </button>
          
          <div className="flex space-x-2">
            {mealIdeas.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMeal(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentMeal ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentMeal(Math.min(mealIdeas.length - 1, currentMeal + 1))}
            disabled={currentMeal === mealIdeas.length - 1}
            className={`px-4 py-2 rounded-md ${
              currentMeal === mealIdeas.length - 1
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

// Default user profile structure
const defaultUserProfile = {
  firstName: '',
  lastName: '',
  heightFeet: '',
  heightInches: '',
  weight: '',
  exerciseLevel: '',
  goal: '',
  gender: ''
};

// TDEE Calculation Functions
const calculateTDEE = (userProfile) => {
  const { heightFeet, heightInches, weight, exerciseLevel, goal, gender } = userProfile;
  
  if (!heightFeet || !heightInches || !weight || !exerciseLevel || !goal || !gender) {
    return null;
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

// Profile Display Component
const ProfileDisplay = ({ 
  userProfile, 
  calorieData, 
  isMobile = false, 
  onOpenProfile,
  onPersonalTrainer,
  onPlanWeek 
}) => {
  return (
    <div className={`${isMobile ? 'mb-4' : 'mb-6'} bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-between'}`}>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-6'}`}>
          <div className="text-center">
            <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-blue-800 flex items-center justify-center gap-2`}>
              <User size={isMobile ? 20 : 24} />
              {userProfile.firstName ? `${userProfile.firstName}${userProfile.lastName ? ` ${userProfile.lastName}` : ''}` : 'Setup Your Profile'}
            </div>
            {userProfile.goal && (
              <div className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-600 capitalize flex items-center justify-center gap-1 mt-1`}>
                <Target size={16} />
                Goal: {userProfile.goal.replace('-', ' ')}
              </div>
            )}
          </div>
          
          {calorieData && (
            <div className={`flex ${isMobile ? 'justify-center space-x-4' : 'space-x-6'} text-center`}>
              <div>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-600`}>
                  {calorieData.bmr}
                </div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-700`}>BMR</div>
              </div>
              <div>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-purple-600`}>
                  {calorieData.tdee}
                </div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-700`}>TDEE</div>
              </div>
              <div>
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-orange-600`}>
                  {calorieData.targetCalories}
                </div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-700`}>Target</div>
              </div>
            </div>
          )}
        </div>
        
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-3'}`}>
          <button
            onClick={onOpenProfile}
            className={`${isMobile ? 'w-full py-3' : 'py-2 px-6'} bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <User size={16} />
            {userProfile.firstName ? 'Edit Profile' : 'Setup Profile'}
          </button>
          
          <button
            onClick={onPersonalTrainer}
            className={`${isMobile ? 'w-full py-3' : 'py-2 px-6'} bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md hover:from-green-600 hover:to-emerald-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <Dumbbell size={16} />
            Personal Trainer
          </button>
          
          <button
            onClick={onPlanWeek}
            className={`${isMobile ? 'w-full py-3' : 'py-2 px-6'} bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <Calendar size={16} />
            Plan My Week
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile Modal Component
const ProfileModal = ({ 
  isOpen, 
  onClose, 
  userProfile, 
  onUpdateProfile, 
  isMobile = false 
}) => {
  const [localProfile, setLocalProfile] = useState(userProfile);
  const calorieData = calculateTDEE(localProfile);

  const updateLocalProfile = (field, value) => {
    setLocalProfile(prev => ({ ...prev, [field]: value }));
  };

  const setDemoMaleProfile = () => {
    const demoProfile = {
      firstName: 'John',
      lastName: 'Doe',
      heightFeet: '5',
      heightInches: '10',
      weight: '165',
      exerciseLevel: 'moderate',
      goal: 'maintain',
      gender: 'male'
    };
    setLocalProfile(demoProfile);
  };

  const setDemoFemaleProfile = () => {
    const demoProfile = {
      firstName: 'Jane',
      lastName: 'Doe',
      heightFeet: '5',
      heightInches: '6',
      weight: '135',
      exerciseLevel: 'moderate',
      goal: 'maintain',
      gender: 'female'
    };
    setLocalProfile(demoProfile);
  };

  const handleSave = () => {
    onUpdateProfile(localProfile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${isMobile ? 'p-4 w-full max-h-[90vh]' : 'p-6 max-w-4xl w-full mx-4 max-h-[85vh]'} overflow-hidden flex flex-col`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-800 flex items-center gap-2`}>
            <User size={isMobile ? 20 : 24} />
            Your Profile & Goals
          </h3>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 ${isMobile ? 'p-2' : ''} hover:bg-gray-100 rounded-full transition-colors`}
          >
            <X size={isMobile ? 20 : 24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Quick Demo Setup Buttons */}
          <div className={`mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200`}>
            <h4 className="font-semibold text-gray-700 mb-3 text-center flex items-center justify-center gap-2">
              <Activity size={20} />
              🚀 Quick Demo Setup
            </h4>
            <div className={`flex ${isMobile ? 'flex-col gap-3' : 'gap-4 justify-center'}`}>
              <button
                onClick={setDemoMaleProfile}
                className={`${isMobile ? 'w-full py-3' : 'px-6 py-3'} bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg`}
              >
                👨 Demo Male (John, 5'10", 165lbs)
              </button>
              <button
                onClick={setDemoFemaleProfile}
                className={`${isMobile ? 'w-full py-3' : 'px-6 py-3'} bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg`}
              >
                👩 Demo Female (Jane, 5'6", 135lbs)
              </button>
            </div>
            <p className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-600 text-center mt-3`}>
              Click for instant setup with realistic values • Both set to "Moderate" exercise & "Maintain" goal
            </p>
          </div>

          <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'lg:grid-cols-3 gap-8'}`}>
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <User size={20} />
                Personal Info
              </h4>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3'}`}>
                <input
                  type="text"
                  placeholder="First name"
                  value={localProfile.firstName}
                  onChange={(e) => updateLocalProfile('firstName', e.target.value)}
                  className={`${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={localProfile.lastName}
                  onChange={(e) => updateLocalProfile('lastName', e.target.value)}
                  className={`${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
              </div>
              
              <select
                value={localProfile.gender}
                onChange={(e) => updateLocalProfile('gender', e.target.value)}
                className={`w-full ${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 gap-2'}`}>
                  <select
                    value={localProfile.heightFeet}
                    onChange={(e) => updateLocalProfile('heightFeet', e.target.value)}
                    className={`${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  >
                    <option value="">Feet</option>
                    {[4, 5, 6, 7].map(feet => (
                      <option key={feet} value={feet}>{feet} ft</option>
                    ))}
                  </select>
                  <select
                    value={localProfile.heightInches}
                    onChange={(e) => updateLocalProfile('heightInches', e.target.value)}
                    className={`${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  >
                    <option value="">Inches</option>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inches => (
                      <option key={inches} value={inches}>{inches} in</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={localProfile.weight}
                  onChange={(e) => updateLocalProfile('weight', e.target.value)}
                  className={`w-full ${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Activity size={16} />
                  Exercise Level
                </label>
                <select
                  value={localProfile.exerciseLevel}
                  onChange={(e) => updateLocalProfile('exerciseLevel', e.target.value)}
                  className={`w-full ${isMobile ? 'p-3 text-base' : 'p-3 text-sm'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                >
                  <option value="">Select Exercise Level</option>
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very-active">Very Active (2x/day, intense)</option>
                </select>
              </div>
            </div>
            
            {/* Goal Selection */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Target size={20} />
                Your Goal
              </h4>
              <div className="space-y-3">
                {[
                  { 
                    value: 'maintain', 
                    label: 'Maintain Weight', 
                    description: 'Keep current weight',
                    icon: '⚖️',
                    color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' 
                  },
                  { 
                    value: 'lose', 
                    label: 'Lose Weight/Fat', 
                    description: '500 cal deficit/day',
                    icon: '📉',
                    color: 'bg-red-50 hover:bg-red-100 border-red-300' 
                  },
                  { 
                    value: 'gain-muscle', 
                    label: 'Gain Muscle', 
                    description: '300 cal surplus/day',
                    icon: '💪',
                    color: 'bg-blue-50 hover:bg-blue-100 border-blue-300' 
                  },
                  { 
                    value: 'dirty-bulk', 
                    label: 'Dirty Bulk', 
                    description: '700 cal surplus/day',
                    icon: '🚀',
                    color: 'bg-green-50 hover:bg-green-100 border-green-300' 
                  }
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => updateLocalProfile('goal', goal.value)}
                    className={`w-full ${isMobile ? 'p-4 text-left' : 'p-4 text-left'} font-medium rounded-lg border-2 transition-all duration-300 ${
                      localProfile.goal === goal.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-105'
                        : `border-gray-200 ${goal.color} text-gray-700 hover:shadow-md`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <div className="font-bold">{goal.label}</div>
                        <div className="text-sm opacity-75">{goal.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* TDEE Results */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Activity size={20} />
                Your Numbers
              </h4>
              {calorieData ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-700 font-medium">BMR (Base Metabolic Rate)</span>
                      <span className="font-bold text-green-600 text-xl">{calorieData.bmr} cal</span>
                    </div>
                    <p className="text-sm text-green-600">Calories burned at rest</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-700 font-medium">TDEE (Total Daily Energy)</span>
                      <span className="font-bold text-purple-600 text-xl">{calorieData.tdee} cal</span>
                    </div>
                    <p className="text-sm text-purple-600">BMR + activity level</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-orange-700 font-medium">Daily Target</span>
                      <span className="font-bold text-orange-600 text-2xl">{calorieData.targetCalories} cal</span>
                    </div>
                    <p className="text-sm text-orange-600">TDEE adjusted for your goal</p>
                  </div>
                  
                  {localProfile.firstName && (
                    <div className={`${isMobile ? 'text-sm' : 'text-sm'} text-gray-600 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200`}>
                      🎯 Hey {localProfile.firstName}! These are your personalized daily calorie targets based on your profile.
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${isMobile ? 'text-base' : 'text-sm'} text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center`}>
                  <User size={32} className="mx-auto mb-2 text-gray-400" />
                  Fill out your info to see your personalized calorie targets
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className={`${isMobile ? 'flex-1 py-3' : 'px-6 py-3'} bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`${isMobile ? 'flex-1 py-3' : 'px-6 py-3'} bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium`}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Personal Trainer Analysis Modal Component
const PersonalTrainerModal = ({ 
  isOpen, 
  onClose, 
  userProfile, 
  calorieData, 
  allMeals = {}, 
  isMobile = false 
}) => {
  if (!isOpen) return null;

  const analysis = generatePersonalTrainerSummary(allMeals, userProfile, calorieData);

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'from-green-500 to-emerald-500';
      case 'B': return 'from-blue-500 to-cyan-500';
      case 'C': return 'from-yellow-500 to-orange-500';
      case 'D': return 'from-orange-500 to-red-500';
      case 'F': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${isMobile ? 'w-full h-full overflow-y-auto' : 'w-full max-w-4xl max-h-[90vh] overflow-y-auto'}`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${analysis.grade ? getGradeColor(analysis.grade) : 'from-blue-500 to-purple-500'} text-white p-6 rounded-t-lg`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold flex items-center gap-2`}>
                <Dumbbell size={isMobile ? 24 : 28} />
                {analysis.title}
              </h3>
              {analysis.grade && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">{analysis.grade}</span>
                    <span className="text-sm ml-2">Grade</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold">{analysis.score}</span>
                    <span className="text-sm ml-2">Score</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X size={isMobile ? 24 : 28} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Jumpstart Message (for new users) */}
          {analysis.isJumpstart && (
            <div className="space-y-6">
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <h4 className="text-xl font-bold text-gray-800 mb-3">{analysis.goalMotivation}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="font-medium text-gray-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h5 className="font-bold text-gray-800 mb-3">🏆 Pro Tips from the Experts:</h5>
                <div className="space-y-3">
                  {analysis.proTips.map((tip, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-yellow-200">
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h5 className="font-bold text-gray-800 mb-3">🎯 Your Targets:</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{analysis.targets.calories}</div>
                    <div className="text-sm text-gray-600">Daily Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{analysis.targets.protein}g</div>
                    <div className="text-sm text-gray-600">Daily Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{analysis.targets.goal}</div>
                    <div className="text-sm text-gray-600">Goal</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="font-medium text-gray-800">{analysis.callToAction}</p>
              </div>

              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <p className="font-bold text-gray-800">{analysis.bottomLine}</p>
              </div>
            </div>
          )}

          {/* Regular Analysis (for users with data) */}
          {!analysis.isJumpstart && (
            <>
              {/* Daily Totals */}
              {analysis.dailyTotals && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-bold text-gray-800 mb-3">📊 Today's Nutrition</h5>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{analysis.dailyTotals.calories}</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{analysis.dailyTotals.protein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-600">{analysis.dailyTotals.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{analysis.dailyTotals.fat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-600">{analysis.dailyTotals.sugar}g</div>
                      <div className="text-xs text-gray-600">Sugar</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Strengths */}
              {analysis.strengths && analysis.strengths.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h5 className="font-bold text-green-800 mb-3">🏆 Your Strengths</h5>
                  <div className="space-y-2">
                    {analysis.strengths.map((strength, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="text-sm text-gray-700">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Critical Issues */}
              {analysis.issues && analysis.issues.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h5 className="font-bold text-red-800 mb-3">🚨 Critical Issues</h5>
                  <div className="space-y-2">
                    {analysis.issues.map((issue, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-red-200">
                        <p className="text-sm text-gray-700">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {analysis.proteinAnalysis && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h6 className="font-bold text-blue-800 mb-2">💪 Protein Analysis</h6>
                    <p className="text-sm text-gray-700">{analysis.proteinAnalysis}</p>
                  </div>
                )}

                {analysis.carbAnalysis && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h6 className="font-bold text-yellow-800 mb-2">🍞 Carb Strategy</h6>
                    <p className="text-sm text-gray-700">{analysis.carbAnalysis}</p>
                  </div>
                )}

                {analysis.timingAnalysis && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h6 className="font-bold text-purple-800 mb-2">⏰ Meal Timing</h6>
                    <p className="text-sm text-gray-700">{analysis.timingAnalysis}</p>
                  </div>
                )}

                {analysis.goalAlignment && (
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h6 className="font-bold text-orange-800 mb-2">🎯 Goal Alignment</h6>
                    <p className="text-sm text-gray-700">{analysis.goalAlignment}</p>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h5 className="font-bold text-blue-800 mb-3">💡 Top Recommendations</h5>
                  <div className="space-y-2">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Advice */}
              {analysis.weeklyAdvice && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h5 className="font-bold text-green-800 mb-3">📅 Weekly Consistency Plan</h5>
                  <p className="text-sm text-gray-700">{analysis.weeklyAdvice}</p>
                </div>
              )}

              {/* Bottom Line */}
              {analysis.bottomLine && (
                <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <h5 className="font-bold text-gray-800 mb-2">🏁 Bottom Line</h5>
                  <p className="font-medium text-gray-800">{analysis.bottomLine}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Week Planning Modal Component
const WeekPlanningModal = ({ 
  isOpen, 
  onClose, 
  userProfile, 
  calorieData, 
  isMobile = false 
}) => {
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [showMealIdeas, setShowMealIdeas] = useState(false);
  const [weekPlan, setWeekPlan] = useState({});

  if (!isOpen) return null;

  const mealTypes = [
    { key: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { key: 'lunch', name: 'Lunch', icon: '☀️' },
    { key: 'dinner', name: 'Dinner', icon: '🌙' }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddMeal = (mealData) => {
    // This would integrate with your meal planning logic
    console.log('Adding meal:', mealData);
    setShowMealIdeas(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`bg-white rounded-lg ${isMobile ? 'w-full h-full overflow-y-auto' : 'w-full max-w-6xl max-h-[90vh] overflow-y-auto'}`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold flex items-center gap-2`}>
                  <Calendar size={isMobile ? 24 : 28} />
                  Plan My Week
                </h3>
                <p className="text-purple-100 mt-1">
                  Plan your meals for optimal {userProfile.goal} results
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={isMobile ? 24 : 28} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Goal Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{calorieData?.targetCalories || 2200}</div>
                  <div className="text-sm text-gray-600">Daily Calories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{userProfile.goal?.replace('-', ' ') || 'maintain'}</div>
                  <div className="text-sm text-gray-600">Your Goal</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{userProfile.exerciseLevel || 'moderate'}</div>
                  <div className="text-sm text-gray-600">Activity Level</div>
                </div>
              </div>
            </div>

            {/* Meal Type Selector */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Select Meal Type to Plan:</h4>
              <div className="flex gap-3 flex-wrap">
                {mealTypes.map(meal => (
                  <button
                    key={meal.key}
                    onClick={() => setSelectedMealType(meal.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMealType === meal.key
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {meal.icon} {meal.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Week Planning Grid */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">
                {mealTypes.find(m => m.key === selectedMealType)?.icon} {mealTypes.find(m => m.key === selectedMealType)?.name} Plan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {daysOfWeek.map(day => (
                  <div key={day} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="font-medium text-gray-800 text-sm mb-2">{day}</div>
                    <div className="min-h-[60px] bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <button
                        onClick={() => setShowMealIdeas(true)}
                        className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
                      >
                        + Add Meal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowMealIdeas(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <ChefHat size={20} />
                Browse Meal Ideas
              </button>
              <button
                onClick={() => console.log('Generate weekly plan')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <TrendingUp size={20} />
                Auto-Generate Plan
              </button>
            </div>

            {/* Planning Tips */}
            <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h5 className="font-bold text-yellow-800 mb-2">💡 Planning Tips for {userProfile.goal} Success:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Plan your meals 1-2 days in advance for better consistency</li>
                <li>• Prep ingredients on Sunday for the week ahead</li>
                <li>• Have backup meal options ready for busy days</li>
                <li>• Track your progress and adjust portions based on results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Ideas Modal */}
      <MealIdeasModal
        isOpen={showMealIdeas}
        onClose={() => setShowMealIdeas(false)}
        onAddMeal={handleAddMeal}
        userProfile={userProfile}
        calorieData={calorieData}
        isMobile={isMobile}
        mealType={selectedMealType}
        fruitBudgetRemaining={3}
      />
    </>
  );
};

// Main Profile Module Component
const ProfileModule = ({ 
  isMobile = false,
  initialProfile = defaultUserProfile,
  allMeals = {}, // Pass in meal data for trainer analysis
  onProfileUpdate = () => {} // Callback when profile is updated
}) => {
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isWeekPlanModalOpen, setIsWeekPlanModalOpen] = useState(false);
  
  const calorieData = calculateTDEE(userProfile);

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
  };

  const handleUpdateProfile = (newProfile) => {
    setUserProfile(newProfile);
    onProfileUpdate(newProfile); // Notify parent component
    console.log('Profile updated:', newProfile);
  };

  const handleOpenTrainer = () => {
    setIsTrainerModalOpen(true);
  };

  const handleCloseTrainer = () => {
    setIsTrainerModalOpen(false);
  };

  const handleOpenWeekPlan = () => {
    setIsWeekPlanModalOpen(true);
  };

  const handleCloseWeekPlan = () => {
    setIsWeekPlanModalOpen(false);
  };

  return (
    <>
      <ProfileDisplay
        userProfile={userProfile}
        calorieData={calorieData}
        isMobile={isMobile}
        onOpenProfile={handleOpenProfile}
        onPersonalTrainer={handleOpenTrainer}
        onPlanWeek={handleOpenWeekPlan}
      />
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfile}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        isMobile={isMobile}
      />

      <PersonalTrainerModal
        isOpen={isTrainerModalOpen}
        onClose={handleCloseTrainer}
        userProfile={userProfile}
        calorieData={calorieData}
        allMeals={allMeals}
        isMobile={isMobile}
      />

      <WeekPlanningModal
        isOpen={isWeekPlanModalOpen}
        onClose={handleCloseWeekPlan}
        userProfile={userProfile}
        calorieData={calorieData}
        isMobile={isMobile}
      />
    </>
  );
};

// Export the module and utilities
export default ProfileModule;
export { 
  ProfileDisplay, 
  ProfileModal, 
  PersonalTrainerModal,
  WeekPlanningModal,
  calculateTDEE, 
  defaultUserProfile 
};