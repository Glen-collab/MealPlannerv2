import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import BurnAndLearnModule from './BurnAndLearnModule.js';

// ========================
// CHART COMPONENTS
// ========================

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
            className="absolute -bottom-5 right-14 text-lg font-bold text-green-600"
            style={{
              fontFamily: 'Comic Sans MS, cursive, sans-serif',
              fontWeight: '900'
            }}
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

// Updated CalorieSugarTrendsView component - Replace in your WelcomeScreen.jsx

function CalorieSugarTrendsView({ meals, totalMacros }) {
  // Create line chart data from meals
  const lineData = meals
    .filter(meal => meal.calories > 0)
    .map((meal, index) => {
      // Calculate sugar safely - use actual sugar if available, otherwise estimate from carbs
      const sugarValue = meal.sugar || Math.round(meal.carbs * 0.3);

      // Get top 2 food items for display
      const topFoods = meal.items && meal.items.length > 0
        ? meal.items
          .sort((a, b) => b.calories - a.calories)
          .slice(0, 2)
          .map(item => item.food)
          .join(', ')
        : 'No foods added';

      return {
        name: meal.name.length > 8 ? meal.name.substring(0, 8) + '...' : meal.name,
        fullName: meal.name,
        time: meal.time,
        calories: Math.round(meal.calories),
        sugar: Math.round(sugarValue),
        sugarScaled: Math.round(sugarValue * 10), // x10 for visibility on chart
        topFoods: topFoods,
        totalItems: meal.items ? meal.items.length : 0
      };
    })
    .sort((a, b) => {
      // Sort by time
      const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + (minutes || 0);
        if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
        if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
        return totalMinutes;
      };
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg">
          <h4 className="font-bold text-gray-800">{data.fullName}</h4>
          <p className="text-sm text-gray-600 mb-2">{data.time}</p>
          <div className="space-y-1 text-sm">
            <div className="text-blue-600">
              <span className="font-medium">Calories:</span> {data.calories}
            </div>
            <div className="text-orange-600">
              <span className="font-medium">Sugar:</span> {data.sugar}g
            </div>
            <div className="text-gray-700 mt-2">
              <span className="font-medium">Top Foods:</span>
              <div className="text-xs text-gray-600 mt-1">{data.topFoods}</div>
            </div>
            <div className="text-xs text-gray-500">
              {data.totalItems} item{data.totalItems !== 1 ? 's' : ''} total
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📈 Calorie vs Sugar Trends</h3>
        <p className="text-lg text-gray-600">{lineData.length} meals • {Math.round(totalMacros.calories)} total calories</p>
      </div>

      {lineData.length > 0 ? (
        <>
          {/* Line Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
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
                <Tooltip content={<CustomTooltip />} />

                {/* Calories Line */}
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Calories"
                />

                {/* Sugar Line (x10 scale) */}
                <Line
                  type="monotone"
                  dataKey="sugarScaled"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                  name="Sugar (x10)"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500 rounded"></div>
              <span className="text-gray-700">Calories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-orange-500 rounded border-dashed border border-orange-500"></div>
              <span className="text-gray-700">Sugar (x10 scale)</span>
            </div>
          </div>

          {/* ENHANCED TREND INSIGHTS - This replaces the old basic insights */}
          <EnhancedTrendInsights lineData={lineData} totalMacros={totalMacros} />

        </>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-500 font-medium">Add meals to see trends</p>
            <p className="text-gray-400 text-sm">Your calorie vs sugar trends will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Trend Insights Component (includes all the smart analysis)
const EnhancedTrendInsights = ({ lineData, totalMacros }) => {

  // Generate enhanced insights using the analysis functions
  const generateEnhancedTrendInsights = (lineData, totalMacros) => {
    if (!lineData || lineData.length === 0) return [];

    const insights = [];

    // Calculate key metrics
    const avgCalories = Math.round(lineData.reduce((sum, meal) => sum + meal.calories, 0) / lineData.length);
    const avgSugar = Math.round(lineData.reduce((sum, meal) => sum + meal.sugar, 0) / lineData.length);
    const totalSugar = lineData.reduce((sum, meal) => sum + meal.sugar, 0);
    const highestSugarMeal = lineData.reduce((prev, current) => (prev.sugar > current.sugar) ? prev : current);

    // 1. MEAL TIMING ANALYSIS
    const mealTimings = analyzeMealTimings(lineData);
    insights.push(...mealTimings);

    // 2. SUGAR PATTERN ANALYSIS  
    const sugarPatterns = analyzeSugarPatterns(lineData, totalSugar, avgSugar);
    insights.push(...sugarPatterns);

    // 3. ENERGY BALANCE INSIGHTS
    const energyInsights = analyzeEnergyBalance(lineData, avgCalories);
    insights.push(...energyInsights);

    // 4. DAILY SUMMARY MESSAGES
    const dailySummary = generateDailySummary(lineData, totalSugar, avgSugar);
    insights.push(...dailySummary);

    return insights;
  };

  const analyzeMealTimings = (meals) => {
    const insights = [];

    // Convert times to minutes for analysis
    const timesInMinutes = meals.map(meal => {
      const [time, period] = meal.time.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let totalMinutes = hours * 60 + (minutes || 0);
      if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
      if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
      return { name: meal.fullName, time: totalMinutes, calories: meal.calories, sugar: meal.sugar };
    }).sort((a, b) => a.time - b.time);

    if (timesInMinutes.length < 2) return insights;

    // Calculate gaps between meals
    const gaps = [];
    for (let i = 1; i < timesInMinutes.length; i++) {
      const gapMinutes = timesInMinutes[i].time - timesInMinutes[i - 1].time;
      const gapHours = Math.round(gapMinutes / 60 * 10) / 10;
      gaps.push({
        from: timesInMinutes[i - 1].name,
        to: timesInMinutes[i].name,
        hours: gapHours,
        minutes: gapMinutes
      });
    }

    // Analyze meal spacing
    const avgGap = gaps.reduce((sum, gap) => sum + gap.hours, 0) / gaps.length;
    const longestGap = Math.max(...gaps.map(g => g.hours));

    // Generate timing insights
    if (avgGap >= 3 && avgGap <= 4.5) {
      insights.push({
        type: 'timing-good',
        icon: '🕐',
        message: `Perfect meal spacing! Your meals are spaced ${avgGap.toFixed(1)} hours apart on average - ideal for steady energy levels.`,
        category: 'timing'
      });
    } else if (avgGap > 4.5) {
      insights.push({
        type: 'timing-warning',
        icon: '⏰',
        message: `Consider eating more frequently - your ${avgGap.toFixed(1)} hour average gap between meals might cause energy dips and increased hunger.`,
        category: 'timing'
      });
    } else if (avgGap < 2.5) {
      insights.push({
        type: 'timing-info',
        icon: '🍽️',
        message: `You're eating frequently with ${avgGap.toFixed(1)} hours between meals. This can help with portion control and steady blood sugar.`,
        category: 'timing'
      });
    }

    // Check for problematic gaps
    const longGaps = gaps.filter(g => g.hours > 5);
    if (longGaps.length > 0) {
      const longestGapDetail = gaps.find(g => g.hours === longestGap);
      insights.push({
        type: 'timing-warning',
        icon: '⚠️',
        message: `Long gap alert: ${longestGap.toFixed(1)} hours between ${longestGapDetail.from.replace(/Snack|FirstSnack|SecondSnack/g, match => match === 'FirstSnack' ? 'Morning Snack' : match === 'SecondSnack' ? 'Afternoon Snack' : match)} and ${longestGapDetail.to.replace(/Snack|FirstSnack|SecondSnack/g, match => match === 'FirstSnack' ? 'Morning Snack' : match === 'SecondSnack' ? 'Afternoon Snack' : match)}. Consider adding a snack to prevent overeating later.`,
        category: 'spacing'
      });
    }

    return insights;
  };

  const analyzeSugarPatterns = (meals, totalSugar, avgSugar) => {
    const insights = [];

    // Find high sugar meals (>20g)
    const highSugarMeals = meals.filter(meal => meal.sugar > 20);

    // Sugar timing analysis
    const morningSugar = meals.filter(meal => meal.time.includes('AM')).reduce((sum, meal) => sum + meal.sugar, 0);
    const afternoonSugar = meals.filter(meal => {
      const hour = parseInt(meal.time.split(':')[0]);
      const isPM = meal.time.includes('PM');
      return isPM && hour >= 12 && hour < 6;
    }).reduce((sum, meal) => sum + meal.sugar, 0);
    const eveningSugar = meals.filter(meal => {
      const hour = parseInt(meal.time.split(':')[0]);
      const isPM = meal.time.includes('PM');
      return isPM && hour >= 6;
    }).reduce((sum, meal) => sum + meal.sugar, 0);

    // Daily sugar assessment
    if (totalSugar <= 40) {
      insights.push({
        type: 'sugar-excellent',
        icon: '🌟',
        message: `Excellent sugar control! Your daily total of ${Math.round(totalSugar)}g is well within healthy limits (under 50g/day).`,
        category: 'sugar-daily'
      });
    } else if (totalSugar <= 60) {
      insights.push({
        type: 'sugar-good',
        icon: '👍',
        message: `Good sugar intake at ${Math.round(totalSugar)}g daily. Aim to keep it under 50g for optimal health benefits.`,
        category: 'sugar-daily'
      });
    } else {
      insights.push({
        type: 'sugar-warning',
        icon: '🍭',
        message: `Daily sugar intake of ${Math.round(totalSugar)}g is high. Try to reduce to under 50g by choosing lower-sugar alternatives.`,
        category: 'sugar-daily'
      });
    }

    // High sugar meal alerts
    if (highSugarMeals.length > 0) {
      const highestSugar = Math.max(...highSugarMeals.map(m => m.sugar));
      const highestSugarMeal = highSugarMeals.find(m => m.sugar === highestSugar);

      insights.push({
        type: 'sugar-spike',
        icon: '📈',
        message: `Sugar spike detected: ${highestSugarMeal.fullName.replace(/Snack|FirstSnack|SecondSnack/g, match => match === 'FirstSnack' ? 'Morning Snack' : match === 'SecondSnack' ? 'Afternoon Snack' : match)} contains ${Math.round(highestSugar)}g sugar. Consider pairing with protein or fiber to slow absorption.`,
        category: 'sugar-meals'
      });
    }

    // Sugar timing insights
    if (eveningSugar > afternoonSugar && eveningSugar > morningSugar && eveningSugar > 15) {
      insights.push({
        type: 'sugar-timing',
        icon: '🌙',
        message: `Most of your sugar (${Math.round(eveningSugar)}g) comes in the evening. Consider moving high-sugar foods earlier in the day for better energy utilization.`,
        category: 'sugar-timing'
      });
    } else if (morningSugar > 20) {
      insights.push({
        type: 'sugar-timing-good',
        icon: '🌅',
        message: `Great timing! You're consuming ${Math.round(morningSugar)}g sugar in the morning when your body can best utilize it for energy.`,
        category: 'sugar-timing'
      });
    }

    // Sugar distribution analysis
    const sugarMealsCount = meals.filter(m => m.sugar > 5).length;
    if (sugarMealsCount === meals.length && avgSugar < 15) {
      insights.push({
        type: 'sugar-distribution',
        icon: '⚖️',
        message: `Well-balanced approach! You're spreading ${Math.round(avgSugar)}g average sugar across all meals instead of having sugar spikes.`,
        category: 'sugar-balance'
      });
    }

    return insights;
  };

  const analyzeEnergyBalance = (meals, avgCalories) => {
    const insights = [];

    // Find calorie and sugar correlation
    const highCalHighSugar = meals.filter(meal => meal.calories > avgCalories && meal.sugar > 15);
    const lowCalHighSugar = meals.filter(meal => meal.calories < avgCalories && meal.sugar > 15);

    if (highCalHighSugar.length > 0) {
      insights.push({
        type: 'energy-correlation',
        icon: '🔗',
        message: `Pattern alert: Your highest calorie meals also tend to be highest in sugar. This can cause energy crashes - try balancing with protein and healthy fats.`,
        category: 'energy'
      });
    }

    if (lowCalHighSugar.length > 0) {
      const meal = lowCalHighSugar[0];
      insights.push({
        type: 'empty-calories',
        icon: '🍬',
        message: `${meal.fullName.replace(/Snack|FirstSnack|SecondSnack/g, match => match === 'FirstSnack' ? 'Morning Snack' : match === 'SecondSnack' ? 'Afternoon Snack' : match)} is relatively low in calories but high in sugar (${Math.round(meal.sugar)}g). Consider adding protein for better satiety.`,
        category: 'energy'
      });
    }

    return insights;
  };

  const generateDailySummary = (meals, totalSugar, avgSugar) => {
    const insights = [];

    // Overall assessment
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const sugarPercentage = Math.round((totalSugar * 4 / totalCalories) * 100);

    if (sugarPercentage <= 10) {
      insights.push({
        type: 'summary-excellent',
        icon: '🏆',
        message: `Outstanding nutrition profile! Sugar makes up only ${sugarPercentage}% of your calories - you're prioritizing nutrient-dense foods.`,
        category: 'summary'
      });
    } else if (sugarPercentage <= 15) {
      insights.push({
        type: 'summary-good',
        icon: '✅',
        message: `Solid nutrition balance with ${sugarPercentage}% of calories from sugar. You're making mostly healthy choices with room for treats.`,
        category: 'summary'
      });
    } else {
      insights.push({
        type: 'summary-improve',
        icon: '💡',
        message: `${sugarPercentage}% of your calories come from sugar. Focus on whole foods to improve your nutrition quality and energy stability.`,
        category: 'summary'
      });
    }

    return insights;
  };

  const insights = generateEnhancedTrendInsights(lineData, totalMacros);

  // Group insights by category for better organization
  const insightCategories = {
    timing: insights.filter(i => ['timing', 'spacing'].includes(i.category)),
    sugar: insights.filter(i => i.category.startsWith('sugar')),
    energy: insights.filter(i => i.category === 'energy'),
    summary: insights.filter(i => i.category === 'summary')
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="font-semibold text-gray-800 mb-3">🔍 Smart Trend Analysis</h4>

      {/* Scrollable Content Container */}
      <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
        {/* Timing Insights */}
        {insightCategories.timing.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2 sticky top-0 bg-gray-50 py-1">⏰ Meal Timing</h5>
            {insightCategories.timing.map((insight, index) => (
              <div key={index} className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                <span className="flex-shrink-0">{insight.icon}</span>
                <span>{insight.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sugar Insights */}
        {insightCategories.sugar.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2 sticky top-0 bg-gray-50 py-1">🍯 Sugar Patterns</h5>
            {insightCategories.sugar.map((insight, index) => (
              <div key={index} className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                <span className="flex-shrink-0">{insight.icon}</span>
                <span>{insight.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Energy Insights */}
        {insightCategories.energy.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2 sticky top-0 bg-gray-50 py-1">⚡ Energy Balance</h5>
            {insightCategories.energy.map((insight, index) => (
              <div key={index} className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                <span className="flex-shrink-0">{insight.icon}</span>
                <span>{insight.message}</span>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {insightCategories.summary.length > 0 && (
          <div className="border-t pt-3">
            <h5 className="text-sm font-medium text-gray-700 mb-2 sticky top-0 bg-gray-50 py-1">📊 Daily Summary</h5>
            {insightCategories.summary.map((insight, index) => (
              <div key={index} className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                <span className="flex-shrink-0">{insight.icon}</span>
                <span>{insight.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Footer - Always visible at bottom */}
      <div className="mt-4 pt-3 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span className="font-medium">Meals analyzed:</span> {lineData.length}
          </div>
          <div>
            <span className="font-medium">Insights generated:</span> {insights.length}
          </div>
        </div>
      </div>
    </div>
  );
};

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

// ========================
// MAIN ANALYTICS MODULE
// ========================

// Main Analytics Module that handles all chart modals
function AnalyticsModule({
  meals,
  totalMacros,
  profile,
  showTrends,
  setShowTrends,
  showPieChart,
  setShowPieChart,
  showGraphs,
  setShowGraphs,
  showBurnAndLearnGames,
  setShowBurnAndLearnGames,
  handleBurnAndLearnClick,
  burnAndLearnDetails,
  setBurnAndLearnDetails,
  activeBurnAndLearnGame,
  setActiveBurnAndLearnGame
}) {

  const handleBurnAndLearnGameSelect = (gameId) => {
    setActiveBurnAndLearnGame(gameId);
  };

  const closeBurnAndLearnGames = () => {
    setShowBurnAndLearnGames(false);
    setActiveBurnAndLearnGame(null);
  };

  return (
    <>
      {/* Trends Modal */}
      {showTrends && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md" style={{ height: '600px' }}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">📈 Calorie vs Sugar Trends</h3>
              <button onClick={() => setShowTrends(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="p-4" style={{ height: 'calc(100% - 80px)' }}>
              <CalorieSugarTrendsView meals={meals} totalMacros={totalMacros} />
            </div>
          </div>
        </div>
      )}

      {/* Pie Chart Modal */}
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

      {/* Graphs Modal */}
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

      {/* Nutrition Games Modal */}
      {showBurnAndLearnGames && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">🎮 Nutrition Games</h3>
              <button onClick={closeBurnAndLearnGames} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="p-4">
              {activeBurnAndLearnGame ? (
                <BurnAndLearnModule
                  activeGame={activeBurnAndLearnGame}
                  onExit={closeBurnAndLearnGames}
                />
              ) : (
                <GameModeBurnAndLearn onGameSelect={handleBurnAndLearnGameSelect} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Burn & Learn Details Modal */}
      {burnAndLearnDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{burnAndLearnDetails.title}</h3>
              <button onClick={() => setBurnAndLearnDetails(null)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed">{burnAndLearnDetails.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main Welcome Screen Component (Original)
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

export {
  BurnAndLearnView,
  TrendsView,
  BarChartView,
  PieChartView,
  ClickableBurnAndLearnView,
  CustomTrendsView,
  CalorieSugarTrendsView,
  CustomBarChartView,
  DailyPieChartView,
  GameModeBurnAndLearn,
  AnalyticsModule
};