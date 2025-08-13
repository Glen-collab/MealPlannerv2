import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import MealSwipeGame from './MealSwipeGame.jsx';

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

// Mock meals for when users don't have data - with hilarious names!
const getMockMeals = () => {
  return {
    breakfast: {
      time: '7:00 AM',
      totals: {
        calories: 420,
        protein: 8,
        carbs: 65,
        fat: 16,
        sugar: 45
      },
      items: [
        { food: 'Venti Caramel Diabetes Latte', servings: 1, calories: 320, source: 'mock' },
        { food: 'Chocolate Croissant of Regret', servings: 1, calories: 100, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 32, percentage: 8 },
        { name: 'Carbs', value: 260, percentage: 62 },
        { name: 'Fat', value: 144, percentage: 34 }
      ],
      mockName: "☕ Starbooks Venti Drama",
      mockDescription: "Basic morning fuel for the chronically tired"
    },
    firstsnack: {
      time: '9:30 AM',
      totals: {
        calories: 185,
        protein: 32,
        carbs: 5,
        fat: 12,
        sugar: 2
      },
      items: [
        { food: 'Protein Shake of Champions', servings: 1, calories: 120, source: 'mock' },
        { food: 'Almonds (handful)', servings: 1, calories: 65, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 128, percentage: 45 },
        { name: 'Carbs', value: 20, percentage: 7 },
        { name: 'Fat', value: 108, percentage: 38 }
      ],
      mockName: "💪 Gym Bro Protein Stack",
      mockDescription: "When you actually know what you're doing"
    },
    secondsnack: {
      time: '11:00 AM',
      totals: {
        calories: 290,
        protein: 4,
        carbs: 72,
        fat: 2,
        sugar: 58
      },
      items: [
        { food: 'Office Vending Machine Sadness', servings: 1, calories: 150, source: 'mock' },
        { food: 'Energy Drink of Poor Choices', servings: 1, calories: 140, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 16, percentage: 6 },
        { name: 'Carbs', value: 288, percentage: 99 },
        { name: 'Fat', value: 18, percentage: 6 }
      ],
      mockName: "🤡 Office Vending Machine Tragedy",
      mockDescription: "When 2pm hits and you've given up on life"
    },
    lunch: {
      time: '12:30 PM',
      totals: {
        calories: 380,
        protein: 35,
        carbs: 25,
        fat: 18,
        sugar: 8
      },
      items: [
        { food: 'Grilled Chicken Breast', servings: 1, calories: 165, source: 'mock' },
        { food: 'Mixed Greens Salad', servings: 1, calories: 45, source: 'mock' },
        { food: 'Avocado Slices', servings: 1, calories: 80, source: 'mock' },
        { food: 'Olive Oil Drizzle', servings: 1, calories: 90, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 140, percentage: 37 },
        { name: 'Carbs', value: 100, percentage: 26 },
        { name: 'Fat', value: 162, percentage: 43 }
      ],
      mockName: "🥗 Basic Bae Salad Supreme",
      mockDescription: "When you're actually trying to be healthy"
    },
    midafternoon: {
      time: '3:30 PM',
      totals: {
        calories: 520,
        protein: 12,
        carbs: 85,
        fat: 18,
        sugar: 65
      },
      items: [
        { food: 'Instagram-Worthy Acai Bowl', servings: 1, calories: 350, source: 'mock' },
        { food: 'Coconut Flakes & Granola', servings: 1, calories: 170, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 48, percentage: 9 },
        { name: 'Carbs', value: 340, percentage: 65 },
        { name: 'Fat', value: 162, percentage: 31 }
      ],
      mockName: "📸 Instagram Smoothie Bowl Flex",
      mockDescription: "Looks healthy, basically candy in a bowl"
    },
    dinner: {
      time: '6:30 PM',
      totals: {
        calories: 720,
        protein: 45,
        carbs: 48,
        fat: 32,
        sugar: 12
      },
      items: [
        { food: 'Grass-Fed Beef Steak', servings: 1, calories: 320, source: 'mock' },
        { food: 'Sweet Potato Fries', servings: 1, calories: 180, source: 'mock' },
        { food: 'Roasted Vegetables', servings: 1, calories: 120, source: 'mock' },
        { food: 'Butter (because YOLO)', servings: 1, calories: 100, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 180, percentage: 25 },
        { name: 'Carbs', value: 192, percentage: 27 },
        { name: 'Fat', value: 288, percentage: 40 }
      ],
      mockName: "🥩 Keto Sausage Haus Feast",
      mockDescription: "When you're living your best carnivore life"
    },
    latesnack: {
      time: '8:30 PM',
      totals: {
        calories: 580,
        protein: 8,
        carbs: 78,
        fat: 28,
        sugar: 52
      },
      items: [
        { food: 'Netflix & Chill Ice Cream', servings: 1, calories: 320, source: 'mock' },
        { food: 'Stress-Eating Cookies', servings: 1, calories: 260, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 32, percentage: 6 },
        { name: 'Carbs', value: 312, percentage: 54 },
        { name: 'Fat', value: 252, percentage: 43 }
      ],
      mockName: "😭 3AM Drunk Munchies Special",
      mockDescription: "When emotional eating meets poor life choices"
    },
    postworkout: {
      time: '5:00 PM',
      totals: {
        calories: 285,
        protein: 42,
        carbs: 18,
        fat: 6,
        sugar: 15
      },
      items: [
        { food: 'Post-Workout Protein Shake', servings: 1, calories: 140, source: 'mock' },
        { food: 'Banana (for gains)', servings: 1, calories: 105, source: 'mock' },
        { food: 'Greek Yogurt', servings: 1, calories: 40, source: 'mock' }
      ],
      pieData: [
        { name: 'Protein', value: 168, percentage: 59 },
        { name: 'Carbs', value: 72, percentage: 25 },
        { name: 'Fat', value: 54, percentage: 19 }
      ],
      mockName: "🏋️ Meal Prep Sunday Flex",
      mockDescription: "Actually calculated macros like a responsible adult"
    }
  };
};

// Burn & Learn Component
function BurnAndLearnView({ totalMacros, profile, onLaunchSwipeGame, hasEnoughMeals }) {
  const proteinCalories = totalMacros.protein * 4;
  const carbCalories = totalMacros.carbs * 4;
  const fatCalories = totalMacros.fat * 9;
  const totalCaloriesFromMacros = proteinCalories + carbCalories + fatCalories;

  const proteinPercent = totalCaloriesFromMacros > 0 ? Math.round((proteinCalories / totalCaloriesFromMacros) * 100) : 0;
  const carbPercent = totalCaloriesFromMacros > 0 ? Math.round((carbCalories / totalCaloriesFromMacros) * 100) : 0;
  const fatPercent = totalCaloriesFromMacros > 0 ? Math.round((fatCalories / totalCaloriesFromMacros) * 100) : 0;

  // Calculate estimated metabolic boost
  const proteinThermic = totalMacros.protein * 4 * 0.3; // 30% thermic effect
  const carbThermic = totalMacros.carbs * 4 * 0.1; // 10% thermic effect
  const fatThermic = totalMacros.fat * 9 * 0.05; // 5% thermic effect
  const totalCalorieBurn = proteinThermic + carbThermic + fatThermic;

  const getMetabolismAdvice = () => {
    if (proteinPercent >= 40) {
      return "🔥 METABOLIC FIRE! Your protein intake is torching calories through digestion!";
    } else if (proteinPercent >= 30) {
      return "💪 Good protein levels keeping your metabolism active!";
    } else if (proteinPercent < 25) {
      return "😴 Low protein = sleepy metabolism. Add more to boost calorie burn!";
    } else {
      return "⚡ Decent protein levels for basic metabolic function.";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔥 Burn & Learn</h3>
        <p className="text-sm text-gray-600">Discover how your food choices affect calorie burn</p>
      </div>

      {/* Meal Swipe Game Launch Button - Always Available */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-4 text-center">
        {hasEnoughMeals ? (
          <>
            <div className="text-lg font-bold text-pink-800 mb-2">🎮 Ready to Test Your Nutrition IQ?</div>
            <p className="text-sm text-pink-700 mb-3">
              Swipe through your actual meals and see if you can spot the metabolism boosters vs. killers!
            </p>
          </>
        ) : (
          <>
            <div className="text-lg font-bold text-pink-800 mb-2">🤡 Learn with Hilarious Mock Meals!</div>
            <p className="text-sm text-pink-700 mb-3">
              Swipe through ridiculous meals like "Starbooks Venti Drama" and "3AM Drunk Munchies Special" to learn nutrition!
            </p>
          </>
        )}
        <button
          onClick={onLaunchSwipeGame}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {hasEnoughMeals ? '🔥 Rate My Real Meals' : '😂 Play with Mock Meals'}
        </button>
      </div>

      {/* Calorie Burn Estimate */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            +{Math.round(totalCalorieBurn)} cal
          </div>
          <div className="text-sm text-orange-700 font-medium">Extra Calories Burned</div>
          <div className="text-xs text-orange-600 mt-1">from digesting your food!</div>
        </div>
      </div>

      {/* Macro Breakdown with Burn Info */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-600">{proteinPercent}%</div>
          <div className="text-xs text-blue-700">Protein</div>
          <div className="text-xs text-blue-600 mt-1">Burns {Math.round(proteinThermic)} cal</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600">{carbPercent}%</div>
          <div className="text-xs text-green-700">Carbs</div>
          <div className="text-xs text-green-600 mt-1">Burns {Math.round(carbThermic)} cal</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-600">{fatPercent}%</div>
          <div className="text-xs text-yellow-700">Fat</div>
          <div className="text-xs text-yellow-600 mt-1">Burns {Math.round(fatThermic)} cal</div>
        </div>
      </div>

      {/* Metabolism Advice */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="text-sm font-medium text-purple-800 mb-2">💡 Metabolism Insight:</div>
        <div className="text-sm text-purple-700">{getMetabolismAdvice()}</div>
      </div>

      {/* Quick Facts */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="text-sm font-medium text-gray-800 mb-2">🧠 Did You Know?</div>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• Protein burns 30% of its calories during digestion</div>
          <div>• Carbs burn 10% of their calories during digestion</div>
          <div>• Fats burn only 5% of their calories during digestion</div>
        </div>
      </div>
    </div>
  );
}

// Trends Chart Component
function TrendsView({ meals, totalMacros }) {
  // Create timeline data from meals
  const timelineData = meals
    .filter(meal => meal.calories > 0)
    .map((meal, index) => {
      const timeToHours = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let hour24 = hours;
        if (period === 'PM' && hours !== 12) hour24 += 12;
        if (period === 'AM' && hours === 12) hour24 = 0;
        return hour24 + minutes / 60;
      };

      return {
        name: meal.name.length > 8 ? meal.name.substring(0, 8) + '...' : meal.name,
        time: timeToHours(meal.time),
        calories: Math.round(meal.calories),
        protein: Math.round(meal.protein),
        carbs: Math.round(meal.carbs),
        fat: Math.round(meal.fat),
        cumulativeCalories: 0 // Will be calculated below
      };
    })
    .sort((a, b) => a.time - b.time);

  // Calculate cumulative calories
  let cumulative = 0;
  timelineData.forEach(meal => {
    cumulative += meal.calories;
    meal.cumulativeCalories = cumulative;
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📈 Daily Trends</h3>
        <p className="text-sm text-gray-600">Track your nutrition throughout the day</p>
      </div>

      {timelineData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `Meal: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeCalories" 
                stroke="#8884d8" 
                strokeWidth={3}
                name="Cumulative Calories"
              />
              <Line 
                type="monotone" 
                dataKey="protein" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Protein (g)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-500 font-medium">Add meals to see trends</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {timelineData.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{timelineData.length}</div>
            <div className="text-xs text-blue-700">Meals Today</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">
              {Math.round(totalMacros.calories / timelineData.length)}
            </div>
            <div className="text-xs text-green-700">Avg Cal/Meal</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Bar Chart View Component
function BarChartView({ totalMacros }) {
  const barData = [
    { 
      name: 'Protein', 
      grams: Math.round(totalMacros.protein),
      calories: Math.round(totalMacros.protein * 4),
      color: '#3B82F6'
    },
    { 
      name: 'Carbs', 
      grams: Math.round(totalMacros.carbs),
      calories: Math.round(totalMacros.carbs * 4),
      color: '#10B981'
    },
    { 
      name: 'Fat', 
      grams: Math.round(totalMacros.fat),
      calories: Math.round(totalMacros.fat * 9),
      color: '#F59E0B'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Macro Breakdown</h3>
        <p className="text-sm text-gray-600">Compare your macronutrient intake</p>
      </div>

      {totalMacros.calories > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${name === 'grams' ? 'g' : ' cal'}`, 
                  name === 'grams' ? 'Grams' : 'Calories'
                ]}
              />
              <Bar dataKey="grams" fill="#8884d8" name="grams" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500 font-medium">Add meals to see breakdown</p>
          </div>
        </div>
      )}

      {/* Macro Details */}
      <div className="grid grid-cols-3 gap-3">
        {barData.map((macro) => (
          <div key={macro.name} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold" style={{ color: macro.color }}>
              {macro.grams}g
            </div>
            <div className="text-xs text-gray-700">{macro.name}</div>
            <div className="text-xs text-gray-600">{macro.calories} cal</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Pie Chart View Component
function PieChartView({ totalMacros }) {
  const pieData = totalMacros.calories > 0 ? [
    { name: 'Protein', value: totalMacros.protein * 4, color: '#3B82F6' },
    { name: 'Carbs', value: totalMacros.carbs * 4, color: '#10B981' },
    { name: 'Fat', value: totalMacros.fat * 9, color: '#F59E0B' }
  ] : [];

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🥧 Macro Distribution</h3>
        <p className="text-sm text-gray-600">Visual breakdown of your nutrition</p>
      </div>

      <div className="h-64">
        {totalMacros.calories > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
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
              <div className="text-4xl mb-2">🥧</div>
              <p className="text-gray-500 font-medium">Your macro breakdown will appear here</p>
              <p className="text-gray-400 text-sm">Start adding meals to see your progress!</p>
            </div>
          </div>
        )}
      </div>

      {/* Ideal Ratios Comparison */}
      {totalMacros.calories > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm font-medium text-blue-800 mb-2">🎯 Ideal vs Actual:</div>
          <div className="text-xs text-blue-700 space-y-1">
            <div>Target: 40% Protein • 40% Carbs • 20% Fat</div>
            <div>
              Actual: {Math.round((totalMacros.protein * 4 / totalMacros.calories) * 100)}% • {' '}
              {Math.round((totalMacros.carbs * 4 / totalMacros.calories) * 100)}% • {' '}
              {Math.round((totalMacros.fat * 9 / totalMacros.calories) * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Welcome Screen Component
export function WelcomeScreen({ 
  profile, 
  totalMacros, 
  meals, 
  calorieData 
}) {
  const [viewMode, setViewMode] = useState('pie');
  const [showMealSwipeGame, setShowMealSwipeGame] = useState(false);

  // Helper functions for MealSwipeGame integration
  const formatMealsForSwipeGame = () => {
    const formattedMeals = {};
    const mealsWithFood = meals.filter(meal => meal.calories > 50);
    
    // If we don't have enough real meals, use mock meals
    if (mealsWithFood.length < 2) {
      return getMockMeals();
    }
    
    // Use real meals
    meals.forEach((meal, index) => {
      if (meal.calories > 50) {
        const mealType = meal.name.toLowerCase().replace(/\s+/g, '');
        formattedMeals[mealType] = {
          time: meal.time,
          totals: {
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            sugar: 0 // Can be calculated from items if needed
          },
          items: meal.items || [],
          pieData: calculatePieData(meal)
        };
      }
    });
    
    return formattedMeals;
  };

  const checkHasEnoughMeals = () => {
    const mealsWithFood = meals.filter(meal => meal.calories > 50);
    return mealsWithFood.length >= 2;
  };

  const handleLaunchSwipeGame = () => {
    setShowMealSwipeGame(true);
  };

  const handleCloseSwipeGame = () => {
    setShowMealSwipeGame(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome {profile.name}!</h2>
          <p className="text-gray-600">Ready to track your {profile.goal} journey? Let's get started!</p>
        </div>
        
        {/* View Mode Toggle Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setViewMode('burn')}
            className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
              viewMode === 'burn' 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔥 Burn & Learn
          </button>
          <button
            onClick={() => setViewMode('trends')}
            className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
              viewMode === 'trends' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📈 Trends
          </button>
          <button
            onClick={() => setViewMode('bar')}
            className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
              viewMode === 'bar' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📊 Bar Chart
          </button>
          <button
            onClick={() => setViewMode('pie')}
            className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
              viewMode === 'pie' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🥧 Pie Chart
          </button>
        </div>

        {/* Dynamic Chart Content */}
        <div className="min-h-[300px]">
          {viewMode === 'burn' && (
            <BurnAndLearnView 
              totalMacros={totalMacros} 
              profile={profile} 
              onLaunchSwipeGame={handleLaunchSwipeGame}
              hasEnoughMeals={checkHasEnoughMeals()}
            />
          )}
          {viewMode === 'trends' && <TrendsView meals={meals} totalMacros={totalMacros} />}
          {viewMode === 'bar' && <BarChartView totalMacros={totalMacros} />}
          {viewMode === 'pie' && <PieChartView totalMacros={totalMacros} />}
        </div>
      </div>

      {/* Meal Swipe Game Modal */}
      {showMealSwipeGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-5/6 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">🔥 Meal Swipe Game</h3>
              <button
                onClick={handleCloseSwipeGame}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <MealSwipeGame
                allMeals={formatMealsForSwipeGame()}
                userProfile={{
                  firstName: profile.name || 'Champion',
                  goal: profile.goal || 'gain-muscle',
                  weight: profile.weight,
                  gender: 'non-binary' // Default since we don't track gender
                }}
                calorieData={calorieData}
                onComplete={handleCloseSwipeGame}
                isIntegrated={true}
                isMockData={!checkHasEnoughMeals()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}