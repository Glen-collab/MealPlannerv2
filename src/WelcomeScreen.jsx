import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

// Burn & Learn Component
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

// Bar Chart View Component - Shows calories and sugar
function BarChartView({ meals }) {
  const barData = meals
    .filter(meal => meal.calories > 0)
    .map(meal => ({
      name: meal.name.length > 8 ? meal.name.substring(0, 8) + '...' : meal.name,
      calories: Math.round(meal.calories),
      sugar: Math.round((meal.carbs * 0.3) * 10) // Estimate sugar as 30% of carbs, x10 to make visible
    }));

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Meal Breakdown</h3>
        <p className="text-sm text-gray-600">Calories and estimated sugar per meal</p>
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
                  name === 'sugar' ? `${Math.round(value/10)}g (est)` : `${value} cal`, 
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
          <span className="inline-block w-3 h-3 bg-orange-500 mr-1 ml-4"></span>Sugar (est, x10)
        </div>
      )}
    </div>
  );
}

// Simple Pie Chart View Component
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
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
            viewMode === 'burn' 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🔥 Burn
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
          📊 Graph
        </button>
        <button
          onClick={() => setViewMode('pie')}
          className={`py-3 px-2 rounded-xl font-medium text-sm transition-all ${
            viewMode === 'pie' 
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
export { BurnAndLearnView, TrendsView, BarChartView, PieChartView };