import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// Import the meal messaging system (these will be external files)
import { MealMessages } from './src/MealMessages/index.js';

// Mock the messaging system for now since files aren't available in artifact
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

// Mock the Week1Messages data since we can't import JSON directly
const Week1Messages = {
  week1: {
    messages: [
      "Preparation is your secret weapon, {name}. Sticking to your plan is the key to unlocking success, no matter your goal. Remember, consistency beats perfection every time.",
      "Your focus today builds tomorrow's results. Keep your eyes on your {goal} goal and remember why you started. Every meal and choice is a step toward victory.",
      "{name}, this journey is about more than food—it's about forging discipline and character. Lean into the process and watch how your {goal} progress unfolds.",
      "Start strong, {name}. Nourishing your body with intention sets the tone for the entire day. Your {goal} goal is within reach when you honor your plan.",
      "Don't let distractions knock you off course. Your {goal} journey requires a master plan and the will to stick with it. You're building habits that will last a lifetime.",
      "Consistency in nutrition fuels your progress. {name}, keep pushing toward your {goal} with purpose and focus. You're stronger than any excuse.",
      "Meal prep isn't just about food—it's about reclaiming control over your day. {name}, your commitment to your {goal} is your superpower."
    ],
    quotes: [
      "'You must do what you have never done to get what you have never gotten.'",
      "'Having a plan means one less thing to think about when life gets busy.'",
      "'Discipline is not just a task; it's the foundation of your new identity.'",
      "'The plan is your anchor when the waves of temptation come crashing.'",
      "'Commitment to the process beats motivation every single time.'",
      "'Glen says: Consistency is the true game changer in any transformation.'",
      "'Glen says: Trust the process even when the results aren't immediate.'"
    ]
  }
};

function TipsSection({ name = "Champion", goal = "fitness" }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Combine messages and quotes from the correct JSON structure
    const allMessages = [
      ...Week1Messages.week1.messages,
      ...Week1Messages.week1.quotes,
    ];

    // Pick two random unique messages
    function getRandomMessages(arr, num) {
      const copy = [...arr];
      const selected = [];
      for (let i = 0; i < num && copy.length > 0; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(idx, 1)[0]);
      }
      return selected;
    }

    let randomMessages = getRandomMessages(allMessages, 2);

    // Replace placeholders with actual name and goal
    randomMessages = randomMessages.map(msg =>
      msg.replace(/{name}/g, name).replace(/{goal}/g, goal)
    );

    setMessages(randomMessages);
  }, [name, goal]);

  return (
    <div className="pt-4 space-y-3">
      {messages.map((msg, i) => (
        <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600">{msg}</p>
        </div>
      ))}
    </div>
  );
}

const MealSwipeApp = () => {
  const [profile, setProfile] = useState({
    height: { feet: 5, inches: 8 },
    weight: 150,
    name: "Champion",
    goal: "fitness"
  });

  const [meals, setMeals] = useState([
    { id: 1, name: 'Breakfast', protein: 0, carbs: 0, fat: 0, calories: 0 },
    { id: 2, name: 'Morning Snack', protein: 0, carbs: 0, fat: 0, calories: 0 },
    { id: 3, name: 'Lunch', protein: 0, carbs: 0, fat: 0, calories: 0 },
    { id: 4, name: 'Afternoon Snack', protein: 0, carbs: 0, fat: 0, calories: 0 },
    { id: 5, name: 'Dinner', protein: 0, carbs: 0, fat: 0, calories: 0 },
    { id: 6, name: 'Evening Snack', protein: 0, carbs: 0, fat: 0, calories: 0 }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [cardPositions, setCardPositions] = useState(meals.map(() => ({ x: 0, y: 0, rotation: 0 })));
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isScrollModal, setIsScrollModal] = useState(false);
  const [isFullScreenSwipe, setIsFullScreenSwipe] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

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

  const enterSwipeMode = () => {
    setIsSwipeMode(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const exitSwipeMode = () => {
    setIsSwipeMode(false);
    setIsEditMode(false);
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
    // Don't set touchAction = 'none' globally - it blocks scrolling inside the modal
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
    
    // Don't allow swiping in edit mode during quick swipe
    if (isSwipeMode && isEditMode) return;
    
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
    
    // Don't allow swiping in edit mode during quick swipe
    if (isSwipeMode && isEditMode) return;
    
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
    
    // Don't allow swiping in edit mode during quick swipe
    if (isSwipeMode && isEditMode) return;
    
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Profile Section - Hidden in swipe mode */}
        {!isSwipeMode && (
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
                <input
                  type="text"
                  value={profile.goal}
                  onChange={(e) => setProfile(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full p-2 border rounded-lg text-center"
                  placeholder="fitness"
                />
              </div>
            </div>
          </div>
        )}

        {/* Daily Totals - Always visible but smaller in swipe mode */}
        <div className={`bg-white rounded-2xl p-4 mb-6 shadow-xl ${isSwipeMode ? 'scale-90' : ''} transition-transform`}>
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

        {/* Welcome Message & Pie Chart - Only on main screen */}
        {!isSwipeMode && (
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
        {!isSwipeMode ? (
          <div className="text-center mb-6 space-y-3">
            <div className="flex gap-3 justify-center">
              <button
                onClick={enterSwipeMode}
                className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🍽️ Meals!
              </button>
              <button
                onClick={enterScrollModal}
                className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                📋 Scroll View
              </button>
            </div>
            <button
              onClick={enterFullScreenSwipe}
              className="bg-white text-orange-600 px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              🌟 Full Screen Swipe
            </button>
          </div>
        ) : (
          <div className="text-center mb-4 space-y-3">
            <button
              onClick={exitSwipeMode}
              className="bg-red-500 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              ✨ Finish Swiping
            </button>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-6 py-2 rounded-xl font-bold shadow-lg transition-all ${
                isEditMode 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isEditMode ? '🔒 Lock & Swipe' : '✏️ Edit Mode'}
            </button>
          </div>
        )}

        {/* Card Stack - Only visible in swipe mode */}
        {isSwipeMode && (
          <div className="relative h-96 mb-6">
            <div className="text-center text-white mb-4">
              <p className="text-sm opacity-80">
                {isEditMode ? 'Edit mode - tap inputs to enter values' : 'Swipe left or right to navigate meals'}
              </p>
              <p className="text-lg font-semibold">Meal {currentCard + 1} of {meals.length}</p>
            </div>
          
          {meals.map((meal, index) => {
            const isActive = index === currentCard;
            const position = cardPositions[index];
            const zIndex = isActive ? 20 : meals.length - Math.abs(index - currentCard);
            const scale = isActive ? 1 : 0.95;
            const opacity = isActive ? 1 : 0.7;
            
            return (
              <div
                key={meal.id}
                className={`absolute inset-0 ${
                  (isSwipeMode && !isEditMode) || isFullScreenSwipe 
                    ? 'cursor-grab active:cursor-grabbing' 
                    : 'cursor-default'
                }`}
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
                <div className="bg-white rounded-2xl p-6 shadow-2xl h-full">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <div className="text-3xl">
                        {meal.name === 'Breakfast' && '🍳'}
                        {meal.name === 'Morning Snack' && '🍎'}
                        {meal.name === 'Lunch' && '🥗'}
                        {meal.name === 'Afternoon Snack' && '🥜'}
                        {meal.name === 'Dinner' && '🍽️'}
                        {meal.name === 'Evening Snack' && '🍓'}
                      </div>
                      <div className="text-2xl font-bold text-purple-600">{meal.calories} cal</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Breakfast - Protein only */}
                    {meal.name === 'Breakfast' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">P</span>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                          <input
                            type="number"
                            value={meal.protein}
                            onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            placeholder="0"
                            disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Morning Snack - Carbs only */}
                    {meal.name === 'Morning Snack' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">C</span>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                          <input
                            type="number"
                            value={meal.carbs}
                            onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            placeholder="0"
                            disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Lunch - Fat only */}
                    {meal.name === 'Lunch' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-bold">F</span>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                          <input
                            type="number"
                            value={meal.fat}
                            onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            placeholder="0"
                            disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Afternoon Snack - Fat only */}
                    {meal.name === 'Afternoon Snack' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-bold">F</span>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                          <input
                            type="number"
                            value={meal.fat}
                            onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            placeholder="0"
                            disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Dinner - All macros */}
                    {meal.name === 'Dinner' && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">P</span>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                            <input
                              type="number"
                              value={meal.protein}
                              onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              placeholder="0"
                              disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold">C</span>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                            <input
                              type="number"
                              value={meal.carbs}
                              onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              placeholder="0"
                              disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 font-bold">F</span>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                            <input
                              type="number"
                              value={meal.fat}
                              onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              placeholder="0"
                              disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Evening Snack - Protein only */}
                    {meal.name === 'Evening Snack' && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">P</span>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                          <input
                            type="number"
                            value={meal.protein}
                            onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            placeholder="0"
                            disabled={isFullScreenSwipe || (isSwipeMode && !isEditMode)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {/* Navigation Dots - Only visible in swipe mode */}
        {isSwipeMode && (
          <div className="flex justify-center gap-2">
            {meals.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCard(index);
                  setCardPositions(prev => prev.map(() => ({ x: 0, y: 0, rotation: 0 })));
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
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
                      {meal.name === 'Morning Snack' && '🍎'}
                      {meal.name === 'Lunch' && '🥗'}
                      {meal.name === 'Afternoon Snack' && '🥜'}
                      {meal.name === 'Dinner' && '🍽️'}
                      {meal.name === 'Evening Snack' && '🍓'}
                    </div>
                    <div className="text-xl font-bold text-purple-600 mt-1">{meal.calories} cal</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">P</span>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                        <input
                          type="number"
                          value={meal.protein}
                          onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">C</span>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                        <input
                          type="number"
                          value={meal.carbs}
                          onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 font-bold text-sm">F</span>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                        <input
                          type="number"
                          value={meal.fat}
                          onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
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

      {/* Full Screen Swipe Modal */}
      {isFullScreenSwipe && (
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
                  onClick={exitFullScreenSwipe}
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
                      {/* Header */}
                      <div className="p-6 flex-shrink-0">
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-gray-800">{meal.name}</h2>
                          <div className="flex items-center justify-center gap-4 mt-3">
                            <div className="text-4xl">
                              {meal.name === 'Breakfast' && '🍳'}
                              {meal.name === 'Morning Snack' && '🍎'}
                              {meal.name === 'Lunch' && '🥗'}
                              {meal.name === 'Afternoon Snack' && '🥜'}
                              {meal.name === 'Dinner' && '🍽️'}
                              {meal.name === 'Evening Snack' && '🍓'}
                            </div>
                            <div className="text-3xl font-bold text-purple-600">{meal.calories} cal</div>
                          </div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto px-6 pb-6 no-swipe-zone">
                        <div className="space-y-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-xl">P</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Protein (g)</label>
                                <input
                                  type="number"
                                  value={meal.protein}
                                  onChange={(e) => updateMeal(meal.id, 'protein', e.target.value)}
                                  className="w-full p-4 border border-gray-300 rounded-xl text-xl bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold text-xl">C</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Carbs (g)</label>
                                <input
                                  type="number"
                                  value={meal.carbs}
                                  onChange={(e) => updateMeal(meal.id, 'carbs', e.target.value)}
                                  className="w-full p-4 border border-gray-300 rounded-xl text-xl bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 font-bold text-xl">F</span>
                              </div>
                              <div className="flex-1">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Fat (g)</label>
                                <input
                                  type="number"
                                  value={meal.fat}
                                  onChange={(e) => updateMeal(meal.id, 'fat', e.target.value)}
                                  className="w-full p-4 border border-gray-300 rounded-xl text-xl bg-white shadow-sm"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Tips Section */}
                          <TipsSection name={profile.name} goal={profile.goal} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSwipeApp;