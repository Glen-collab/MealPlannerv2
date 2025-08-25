import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

// Enhanced Game Mode Burn & Learn Component
function GameModeBurnAndLearn({ onGameSelect }) {
  const games = [
    {
      id: 'protein',
      title: '🍗 Protein Power',
      description: 'Master protein science from basics to biochemistry',
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      subtitleColor: 'text-blue-500'
    },
    {
      id: 'carbs',
      title: '🍌 Carb Truth',
      description: 'Understand carbohydrates at every level',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      subtitleColor: 'text-yellow-600'
    },
    {
      id: 'fats',
      title: '🥑 Fat Facts',
      description: 'Navigate lipid science from simple to complex',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      subtitleColor: 'text-green-500'
    },
    {
      id: 'alcohol',
      title: '🍷 Liquid Calories',
      description: 'Alcohol metabolism from basics to research',
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      subtitleColor: 'text-purple-500'
    },
    {
      id: 'tdee',
      title: '🔥 Burn Reality',
      description: 'Energy expenditure science across all levels',
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      subtitleColor: 'text-red-500'
    },
    {
      id: 'calories',
      title: '📊 Calorie Detective',
      description: 'Food energy from counting to calorimetry',
      color: 'indigo',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      subtitleColor: 'text-indigo-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* Fun Title with Crossed Out Effect */}
        <div className="relative mb-2">
          <h3 className="text-2xl font-bold text-gray-800">
            🔥 Burn & <span className="line-through decoration-red-500 decoration-2">Lurn</span>
          </h3>
          <div
            className="absolute -bottom-5 right-12 text-lg font-bold text-green-600"
            style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
          >
            Learn
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">Choose your nutrition challenge</p>
      </div>

      {/* Game Buttons Grid - 2 columns, 3 rows */}
      <div className="grid grid-cols-2 gap-3">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onGameSelect(game.id)}
            className={`${game.bgColor} rounded-lg p-3 text-center hover:shadow-md transform hover:scale-105 transition-all`}
          >
            <div className={`text-xs ${game.subtitleColor} font-medium mb-1`}>
              {game.title.split(' ')[0]} {/* Emoji */}
            </div>
            <div className={`text-sm font-bold ${game.textColor} mb-1`}>
              {game.title.substring(2)} {/* Title without emoji */}
            </div>
            <div className={`text-xs ${game.subtitleColor} leading-tight`}>
              {game.description}
            </div>
          </button>
        ))}
      </div>

      {/* Game Info Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-center">🎯 How It Works</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• 5 difficulty levels from Elementary to Doctoral</div>
          <div>• Questions change daily for fresh challenges</div>
          <div>• Master nutrition science step by step</div>
          <div>• Track your progress across all topics</div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Clickable Burn & Learn Component
function ClickableBurnAndLearnView({ totalMacros, profile, onItemClick }) {
  const calorieData = {
    bmr: 1800,
    tdee: 2200,
    targetCalories: profile.goal === 'dirty-bulk' ? 3200 : profile.goal === 'gain-muscle' ? 2800 : profile.goal === 'lose' ? 2000 : 2500
  };

  const burnAndLearnItems = [
    {
      id: 'tdee',
      label: 'Daily Burn',
      value: `${calorieData.tdee}`,
      unit: 'cal',
      subtitle: 'TDEE',
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      subtitleColor: 'text-red-500'
    },
    {
      id: 'surplus-deficit',
      label: totalMacros.calories > calorieData.targetCalories ? 'Surplus' : 'Deficit',
      value: `${Math.abs(totalMacros.calories - calorieData.targetCalories)}`,
      unit: 'cal',
      subtitle: totalMacros.calories > calorieData.targetCalories ? 'Over target' : 'Under target',
      color: totalMacros.calories > calorieData.targetCalories ? 'orange' : 'green',
      bgColor: totalMacros.calories > calorieData.targetCalories ? 'bg-orange-100' : 'bg-green-100',
      textColor: totalMacros.calories > calorieData.targetCalories ? 'text-orange-800' : 'text-green-800',
      subtitleColor: totalMacros.calories > calorieData.targetCalories ? 'text-orange-500' : 'text-green-500'
    },
    {
      id: 'protein-target',
      label: 'Protein Goal',
      value: profile.goal === 'dirty-bulk' ? '150' : profile.goal === 'gain-muscle' ? '130' : profile.goal === 'lose' ? '120' : '100',
      unit: 'g',
      subtitle: `${Math.round(totalMacros.protein)}g eaten`,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      subtitleColor: 'text-blue-500'
    },
    {
      id: 'macro-balance',
      label: 'Balance',
      value: totalMacros.calories > 0 ? 'Good' : 'Start',
      unit: '',
      subtitle: totalMacros.calories > 0 ? 'Tracking' : 'Adding',
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      subtitleColor: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🔥 Burn & Learn</h3>
        <p className="text-sm text-gray-600">Tap items to learn more</p>
      </div>

      {/* Clickable Cards Grid - Same as Macro Cards */}
      <div className="grid grid-cols-2 gap-3">
        {burnAndLearnItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`${item.bgColor} rounded-lg p-3 text-center hover:shadow-md transform hover:scale-105 transition-all`}
          >
            <div className={`text-xs ${item.subtitleColor} font-medium mb-1`}>{item.label}</div>
            <div className={`text-lg font-bold ${item.textColor}`}>
              {item.value}{item.unit}
            </div>
            <div className={`text-xs ${item.subtitleColor} mt-1`}>
              {item.subtitle}
            </div>
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-center">Quick Tips</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• TDEE = Total Daily Energy Expenditure</div>
          <div>• Surplus = Eating more than you burn</div>
          <div>• Deficit = Eating less than you burn</div>
          <div>• Protein goal varies by fitness goal</div>
        </div>
      </div>
    </div>
  );
}

// Original Burn & Learn Component (for reference)
function BurnAndLearnView({ totalMacros, profile }) {
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

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔥 Burn & Learn</h3>
        <p className="text-sm text-gray-600">How your food choices affect calorie burn</p>
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
    </div>
  );
}

// Enhanced Trends Component that uses live meal data
function CustomTrendsView({ meals, totalMacros }) {
  const mealTrends = meals.map(meal => ({
    name: meal.name.replace('MidAfternoon Snack', 'Mid Snack').replace('PostWorkout', 'Post-WO'),
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    time: meal.time
  }));

  const highestCalorieMeal = meals.reduce((prev, current) =>
    (prev.calories > current.calories) ? prev : current
  );

  const proteinPercentage = totalMacros.calories > 0 ? Math.round((totalMacros.protein * 4 / totalMacros.calories) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📈 Daily Trends</h3>
        <p className="text-lg text-gray-600">{Math.round(totalMacros.calories)} total calories</p>
      </div>

      {/* Meal Progress Bars */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Meal Distribution</h4>
        {mealTrends.filter(meal => meal.calories > 0).map((meal, index) => {
          const percentage = totalMacros.calories > 0 ? (meal.calories / totalMacros.calories) * 100 : 0;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{meal.name}</span>
                <span className="text-gray-600">{Math.round(meal.calories)} cal ({Math.round(percentage)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Daily Insights</h4>
        <div className="space-y-2 text-sm text-gray-700">
          {totalMacros.calories > 0 ? (
            <>
              <div>🍽️ <strong>Biggest meal:</strong> {highestCalorieMeal.name} ({Math.round(highestCalorieMeal.calories)} cal)</div>
              <div>💪 <strong>Protein intake:</strong> {proteinPercentage}% of calories</div>
              <div>🕐 <strong>Meals logged:</strong> {meals.filter(m => m.calories > 0).length} of {meals.length}</div>
              <div>⚡ <strong>Average per meal:</strong> {Math.round(totalMacros.calories / Math.max(meals.filter(m => m.calories > 0).length, 1))} cal</div>
            </>
          ) : (
            <div>Start adding foods to see your daily trends and insights!</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Original Trends Chart Component
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

// Enhanced Bar Chart that uses live meal data  
function CustomBarChartView({ meals }) {
  const activeMeals = meals.filter(meal => meal.calories > 0);

  if (activeMeals.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No meals to display</h3>
        <p className="text-sm text-gray-500">Start adding foods to see your meal breakdown!</p>
      </div>
    );
  }

  const maxCalories = Math.max(...activeMeals.map(m => m.calories));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📊 Meal Breakdown</h3>
        <p className="text-lg text-gray-600">{activeMeals.length} meals logged</p>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        {activeMeals.map((meal, index) => {
          const heightPercentage = maxCalories > 0 ? (meal.calories / maxCalories) * 100 : 0;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <div className="font-medium text-gray-800 text-sm">{meal.name}</div>
                  <div className="text-xs text-gray-500">{meal.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{Math.round(meal.calories)} cal</div>
                  <div className="text-xs text-gray-600">P:{Math.round(meal.protein)} C:{Math.round(meal.carbs)} F:{Math.round(meal.fat)}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-lg h-8 flex items-end overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${Math.max(heightPercentage, 5)}%`, height: '100%' }}
                >
                  {heightPercentage > 15 ? `${Math.round(meal.calories)}` : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Meal Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Highest:</span>
            <span className="font-medium text-gray-800 ml-1">{Math.round(maxCalories)} cal</span>
          </div>
          <div>
            <span className="text-gray-600">Average:</span>
            <span className="font-medium text-gray-800 ml-1">{Math.round(activeMeals.reduce((sum, m) => sum + m.calories, 0) / activeMeals.length)} cal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Original Bar Chart View Component - Shows calories and sugar
function BarChartView({ meals }) {
  const barData = meals
    .filter(meal => meal.calories > 0)
    .map(meal => {
      // Calculate sugar safely - use actual sugar if available, otherwise estimate from carbs
      const sugarValue = meal.sugar || Math.round(meal.carbs * 0.3);
      console.log(`${meal.name}: ${meal.calories} cal, ${sugarValue}g sugar`);
      return {
        name: meal.name.length > 8 ? meal.name.substring(0, 8) + '...' : meal.name,
        calories: Math.round(meal.calories),
        sugar: Math.round(sugarValue * 10) // Multiply by 10 to make visible alongside calories
      };
    });

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Meal Breakdown</h3>
        <p className="text-sm text-gray-600">Calories and sugar per meal</p>
      </div>

      {barData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === 'sugar' ? `${Math.round(value / 10)}g` : `${value} cal`,
                  name === 'sugar' ? 'Sugar' : 'Calories'
                ]}
              />
              <Bar dataKey="calories" fill="#8884d8" name="calories" />
              <Bar dataKey="sugar" fill="#ff7300" name="sugar" />
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

      {/* Legend */}
      {barData.length > 0 && (
        <div className="text-center text-xs text-gray-600">
          <span className="inline-block w-3 h-3 bg-blue-500 mr-1"></span>Calories
          <span className="inline-block w-3 h-3 bg-orange-500 mr-1 ml-4"></span>Sugar (x10 scale)
        </div>
      )}
    </div>
  );
}

// Enhanced Pie Chart Component with Percentage Labels
function DailyPieChartView({ totalMacros }) {
  // Calculate total calories and percentages
  const proteinCals = totalMacros.protein * 4;
  const carbCals = totalMacros.carbs * 4;
  const fatCals = totalMacros.fat * 9;
  const totalCals = proteinCals + carbCals + fatCals;

  if (totalCals === 0) {
    return (
      <div className="text-center p-6">
        <div className="text-3xl mb-3">🍽️</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No macros to display</h3>
        <p className="text-sm text-gray-500">Start adding foods to see your macro breakdown!</p>
      </div>
    );
  }

  const proteinPercent = Math.round((proteinCals / totalCals) * 100);
  const carbPercent = Math.round((carbCals / totalCals) * 100);
  const fatPercent = Math.round((fatCals / totalCals) * 100);

  const pieData = [
    { name: 'P', value: proteinPercent, color: '#3B82F6' },
    { name: 'C', value: carbPercent, color: '#10B981' },
    { name: 'F', value: fatPercent, color: '#F59E0B' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Daily Macro Breakdown</h3>
        <p className="text-sm text-gray-600">{Math.round(totalCals)} total calories</p>
      </div>

      {/* Pie Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Compact Macro Details - Color Coordinated */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-blue-700">{Math.round(totalMacros.protein)}g</div>
          <div className="text-xs font-bold text-blue-600">Protein</div>
          <div className="text-xs text-blue-500">{proteinPercent}%</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-700">{Math.round(totalMacros.carbs)}g</div>
          <div className="text-xs font-bold text-green-600">Carbs</div>
          <div className="text-xs text-green-500">{carbPercent}%</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-yellow-700">{Math.round(totalMacros.fat)}g</div>
          <div className="text-xs font-bold text-yellow-600">Fat</div>
          <div className="text-xs text-yellow-500">{fatPercent}%</div>
        </div>
      </div>
    </div>
  );
}

// Original Simple Pie Chart View Component
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

      {/* Macro Details */}
      {totalMacros.calories > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{Math.round(totalMacros.protein)}g</div>
            <div className="text-xs text-blue-700">Protein</div>
            <div className="text-xs text-blue-600">{Math.round(totalMacros.protein * 4)} cal</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">{Math.round(totalMacros.carbs)}g</div>
            <div className="text-xs text-green-700">Carbs</div>
            <div className="text-xs text-green-600">{Math.round(totalMacros.carbs * 4)} cal</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-600">{Math.round(totalMacros.fat)}g</div>
            <div className="text-xs text-yellow-700">Fat</div>
            <div className="text-xs text-yellow-600">{Math.round(totalMacros.fat * 9)} cal</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Welcome Screen Component
export function WelcomeScreen({ profile, totalMacros, meals }) {
  const [viewMode, setViewMode] = useState('burn');

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome {profile.name}!</h2>
        <p className="text-gray-600">Ready to track your {profile.goal} journey? Let's get started!</p>
      </div>

      {/* View Mode Toggle Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setViewMode('burn')}
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${viewMode === 'burn'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          🔥 Burn
        </button>
        <button
          onClick={() => setViewMode('trends')}
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${viewMode === 'trends'
            ? 'bg-blue-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          📈 Trends
        </button>
        <button
          onClick={() => setViewMode('bar')}
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${viewMode === 'bar'
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          📊 Graph
        </button>
        <button
          onClick={() => setViewMode('pie')}
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${viewMode === 'pie'
            ? 'bg-purple-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          🥧 Pie
        </button>
      </div>

      {/* Dynamic Chart Content */}
      <div className="min-h-[300px]">
        {viewMode === 'burn' && <BurnAndLearnView totalMacros={totalMacros} profile={profile} />}
        {viewMode === 'trends' && <TrendsView meals={meals} totalMacros={totalMacros} />}
        {viewMode === 'bar' && <BarChartView meals={meals} />}
        {viewMode === 'pie' && <PieChartView totalMacros={totalMacros} />}
      </div>
    </div>
  );
}

export {
  BurnAndLearnView,
  TrendsView,
  BarChartView,
  PieChartView,
  ClickableBurnAndLearnView,
  CustomTrendsView,
  CustomBarChartView,
  DailyPieChartView,
  GameModeBurnAndLearn
};