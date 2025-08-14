import React, { useState, useEffect } from 'react';
import Week1Messages from './MealMessages/Week1Messages.json';

const DailyMealPlannerModule = ({ 
  meals = [], 
  profile = {}, 
  totalMacros = {},
  mealSources = {},
  className = "" 
}) => {
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [dailyQuote, setDailyQuote] = useState('');

  // Get random motivational message and quote on component mount
  useEffect(() => {
    const messages = Week1Messages.week1.messages;
    const quotes = Week1Messages.week1.quotes;
    
    if (messages && messages.length > 0) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      // Replace placeholders with actual profile data
      const personalizedMessage = randomMessage
        .replace(/{name}/g, profile.name || 'Champion')
        .replace(/{goal}/g, profile.goal || 'your goals');
      setMotivationalMessage(personalizedMessage);
    }
    
    if (quotes && quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setDailyQuote(randomQuote);
    }
  }, [profile]);

  // Filter out meals with no calories for cleaner display
  const activeMeals = meals.filter(meal => meal && meal.calories > 0);

  // Sort meals by time for chronological display
  const sortedMeals = [...activeMeals].sort((a, b) => {
    const timeA = convertTimeToMinutes(a.time);
    const timeB = convertTimeToMinutes(b.time);
    return timeA - timeB;
  });

  // Helper function to convert time string to minutes for sorting
  function convertTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + (minutes || 0);
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  }

  // Get meal type emoji
  const getMealEmoji = (mealName) => {
    const emojiMap = {
      'Breakfast': '🍳',
      'FirstSnack': '🍎',
      'SecondSnack': '🥨', 
      'Lunch': '🥗',
      'MidAfternoon Snack': '🥜',
      'Dinner': '🍽️',
      'Late Snack': '🍓',
      'PostWorkout': '💪'
    };
    return emojiMap[mealName] || '🌟';
  };

  // Get meal display name
  const getMealDisplayName = (mealName) => {
    const nameMap = {
      'FirstSnack': 'Morning Snack',
      'SecondSnack': 'Mid-Morning Snack',
      'MidAfternoon Snack': 'Afternoon Snack',
      'PostWorkout': 'Post-Workout'
    };
    return nameMap[mealName] || mealName;
  };

  if (!meals || meals.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center p-8 text-gray-500">
          <div className="text-4xl mb-4">🍽️</div>
          <h3 className="text-lg font-semibold mb-2">No meals planned yet</h3>
          <p className="text-sm">Start adding foods to see your daily meal plan!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <style jsx>{`
        .planner-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(45deg, #2c3e50, #34495e);
          color: white;
          padding: 20px;
          text-align: center;
        }

        .header h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .header p {
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .nutrition-header {
          background: #f8f9fa;
          border-bottom: 3px solid #e9ecef;
          padding: 12px 15px;
          display: grid;
          grid-template-columns: 1fr 70px;
          gap: 12px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #495057;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nutrition-header div {
          text-align: center;
        }

        .nutrition-header div:first-child {
          text-align: left;
        }

        .meals-container {
          max-height: 60vh;
          overflow-y: auto;
          background: white;
        }

        .meal-item {
          border-bottom: 3px solid #e9ecef;
          padding: 15px;
          transition: background-color 0.2s ease;
        }

        .meal-item:hover {
          background-color: #f8f9fa;
        }

        .meal-item:last-child {
          border-bottom: none;
        }

        .meal-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .meal-time {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-right: 12px;
          min-width: 70px;
          text-align: center;
        }

        .meal-type {
          color: #6c757d;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .meal-content {
          display: grid;
          grid-template-columns: 1fr 70px;
          gap: 12px;
          align-items: center;
        }

        .meal-details {
          display: flex;
          flex-direction: column;
        }

        .meal-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .meal-serving {
          color: #6c757d;
          font-size: 0.8rem;
          line-height: 1.3;
          margin-bottom: 6px;
        }

        .macros {
          display: flex;
          gap: 10px;
          font-size: 0.75rem;
          color: #495057;
          font-weight: 600;
        }

        .macro-item {
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 10px;
          border: 1px solid #e9ecef;
        }

        .calorie-value {
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: #495057;
          background: #f8f9fa;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .source-badge {
          font-size: 0.7rem;
          background: #007bff;
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          margin-left: 8px;
        }

        .total-row {
          background: linear-gradient(45deg, #2c3e50, #34495e);
          color: white;
          padding: 15px;
          display: grid;
          grid-template-columns: 1fr 70px;
          gap: 12px;
          align-items: center;
          font-weight: 600;
        }

        .total-row div {
          text-align: center;
        }

        .total-row div:first-child {
          text-align: left;
          font-size: 1.1rem;
        }

        .total-macros {
          display: flex;
          gap: 8px;
          font-size: 0.8rem;
          margin-top: 5px;
          opacity: 0.9;
        }

        .motivation-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
        }

        .motivation-message {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .daily-quote {
          font-style: italic;
          font-size: 0.85rem;
          opacity: 0.9;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          padding-top: 15px;
        }

        /* Custom scrollbar */
        .meals-container::-webkit-scrollbar {
          width: 6px;
        }

        .meals-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .meals-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .meals-container::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @media (max-width: 480px) {
          .nutrition-header,
          .meal-content,
          .total-row {
            grid-template-columns: 1fr 60px;
            gap: 10px;
          }
          
          .nutrition-header {
            font-size: 0.8rem;
            padding: 10px 12px;
          }
          
          .meal-item {
            padding: 12px;
          }
          
          .meal-name {
            font-size: 0.9rem;
          }
          
          .meal-serving {
            font-size: 0.75rem;
          }

          .macros {
            gap: 8px;
            font-size: 0.7rem;
          }

          .macro-item {
            padding: 1px 4px;
          }
        }
      `}</style>

      <div className="planner-container">
        <div className="header">
          <h1>Daily Meal Plan</h1>
          <p>Your personalized nutrition schedule</p>
        </div>

        <div className="nutrition-header">
          <div>Food & Serving</div>
          <div>Calories</div>
        </div>

        <div className="meals-container">
          {sortedMeals.length > 0 ? (
            sortedMeals.map((meal) => {
              const source = mealSources[meal.name];
              const isUSDAOwned = source === 'usda';
              
              return (
                <div key={meal.id} className="meal-item">
                  <div className="meal-header">
                    <div className="meal-time">{meal.time}</div>
                    <div className="meal-type">
                      {getMealEmoji(meal.name)} {getMealDisplayName(meal.name)}
                      {isUSDAOwned && <span className="source-badge">USDA</span>}
                    </div>
                  </div>
                  <div className="meal-content">
                    <div className="meal-details">
                      <div className="meal-name">
                        {meal.items && meal.items.length > 0 ? (
                          meal.items.map((item, index) => (
                            <div key={index}>{item.food}</div>
                          ))
                        ) : (
                          <span style={{ color: '#6c757d', fontStyle: 'italic' }}>No foods added</span>
                        )}
                      </div>
                      {meal.items && meal.items.length > 0 && (
                        <div className="meal-serving">
                          {meal.items.map((item, index) => (
                            <div key={index}>
                              {Math.round(item.servings * 10) / 10}x serving
                              {item.brand && ` • ${item.brand}`}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="macros">
                        <div className="macro-item">P: {Math.round(meal.protein)}g</div>
                        <div className="macro-item">C: {Math.round(meal.carbs)}g</div>
                        <div className="macro-item">F: {Math.round(meal.fat)}g</div>
                      </div>
                    </div>
                    <div className="calorie-value">{Math.round(meal.calories)}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="meal-item" style={{ textAlign: 'center', color: '#6c757d' }}>
              <div className="text-4xl mb-2">🍽️</div>
              <div>Start adding foods to see your meal plan!</div>
            </div>
          )}
        </div>

        <div className="total-row">
          <div>
            DAILY TOTALS
            <div className="total-macros">
              <span>P: {Math.round(totalMacros.protein || 0)}g</span>
              <span>C: {Math.round(totalMacros.carbs || 0)}g</span>
              <span>F: {Math.round(totalMacros.fat || 0)}g</span>
            </div>
          </div>
          <div>{Math.round(totalMacros.calories || 0)}</div>
        </div>

        {/* Motivational Section */}
        <div className="motivation-section">
          {motivationalMessage && (
            <div className="motivation-message">
              💪 {motivationalMessage}
            </div>
          )}
          {dailyQuote && (
            <div className="daily-quote">
              {dailyQuote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMealPlannerModule;