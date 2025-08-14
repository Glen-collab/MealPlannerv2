import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, RotateCcw } from 'lucide-react';

// Personal Trainer Summary Logic (extracted from PersonalTrainerSummary.js)
const getUserProteinTarget = (userProfile) => {
  const weight = Number(userProfile.weight);
  switch(userProfile.goal) {
    case 'dirty-bulk': return Math.round(weight * 1.2);
    case 'gain-muscle': return Math.round(weight * 1.1);
    case 'maintain': return Math.round(weight * 1);
    case 'lose': return Math.round(weight * 0.8);
    default: return 120;
  }
};

const getSugarLimitForGoal = (goal) => {
  switch(goal) {
    case 'maintain': return 45;
    case 'lose': return 25;
    case 'gain-muscle': return 25;
    case 'dirty-bulk': return 50;
    default: return 25;
  }
};

const calculateDailyTotalsFromMeals = (allMeals) => {
  return Object.values(allMeals).reduce((totals, meal) => {
    const mealTotals = meal.totals || { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 };
    return {
      calories: totals.calories + mealTotals.calories,
      protein: totals.protein + mealTotals.protein,
      carbs: totals.carbs + mealTotals.carbs,
      fat: totals.fat + mealTotals.fat,
      sugar: totals.sugar + mealTotals.sugar
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 });
};

const calculateOverallGrade = (dailyTotals, userProfile, calorieData) => {
  let score = 0;
  
  // Protein score (40 points)
  const proteinTarget = getUserProteinTarget(userProfile);
  const proteinScore = Math.min((dailyTotals.protein / proteinTarget) * 40, 40);
  score += proteinScore;
  
  // Calorie accuracy (30 points)
  const calorieTarget = calorieData?.targetCalories || 2500;
  const calorieAccuracy = 1 - Math.abs(dailyTotals.calories - calorieTarget) / calorieTarget;
  score += Math.max(calorieAccuracy * 30, 0);
  
  // Sugar control (20 points)
  const sugarLimit = getSugarLimitForGoal(userProfile.goal);
  const sugarScore = dailyTotals.sugar <= sugarLimit ? 20 : Math.max(20 - ((dailyTotals.sugar - sugarLimit) * 2), 0);
  score += sugarScore;
  
  // Macro balance (10 points)
  const totalMacros = dailyTotals.protein + dailyTotals.carbs + dailyTotals.fat;
  const proteinPercent = totalMacros > 0 ? (dailyTotals.protein / totalMacros) * 100 : 0;
  const macroScore = proteinPercent >= 35 ? 10 : proteinPercent >= 25 ? 7 : proteinPercent >= 20 ? 5 : 0;
  score += macroScore;
  
  // Convert to letter grade
  if (score >= 90) return { grade: 'A', score: Math.round(score) };
  if (score >= 80) return { grade: 'B', score: Math.round(score) };
  if (score >= 70) return { grade: 'C', score: Math.round(score) };
  if (score >= 60) return { grade: 'D', score: Math.round(score) };
  return { grade: 'F', score: Math.round(score) };
};

// Main Component
const MealSwipeGame = ({ 
  allMeals = {}, 
  userProfile = {}, 
  calorieData = {},
  onComplete = () => {},
  isIntegrated = false
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [gameCards, setGameCards] = useState([]);
  const [swipeResults, setSwipeResults] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [overallGrade, setOverallGrade] = useState('');
  const [lastResponse, setLastResponse] = useState('');
  const [swipeState, setSwipeState] = useState({ x: 0, rotation: 0, opacity: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showingReaction, setShowingReaction] = useState(false);
  const cardRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Enhanced meal evaluation with new warnings
  const evaluateMealQuality = (card) => {
    const { totals } = card;
    let score = 0;
    const issues = [];
    const strengths = [];
    const warnings = [];

    // Calculate macro percentages
    const totalMacroCalories = (totals.protein * 4) + (totals.carbs * 4) + (totals.fat * 9);
    const proteinPercent = totalMacroCalories > 0 ? (totals.protein * 4) / totalMacroCalories * 100 : 0;
    const carbPercent = totalMacroCalories > 0 ? (totals.carbs * 4) / totalMacroCalories * 100 : 0;
    const fatPercent = totalMacroCalories > 0 ? (totals.fat * 9) / totalMacroCalories * 100 : 0;

    // Check for warnings first
    if (totals.sugar > 25) warnings.push('sugar');
    if (totals.cholesterol > 300) warnings.push('cholesterol');
    if (totals.glycemicIndex > 70) warnings.push('glycemic');

    // Sweetheart criteria (40-40-20 ±10%)
    const proteinSweetheart = Math.abs(proteinPercent - 40) <= 10;
    const carbSweetheart = Math.abs(carbPercent - 40) <= 10;
    const fatSweetheart = Math.abs(fatPercent - 20) <= 10;

    if (proteinSweetheart && carbSweetheart && fatSweetheart) {
      score += 50;
      strengths.push('sweetheart_macros');
    } else if (proteinPercent >= 45) {
      score += 35;
      strengths.push('metabolism_booster');
    } else if (proteinPercent < 25) {
      score -= 20;
      issues.push('metabolism_killer');
    }

    // High carb = digestive destroyer
    if (totals.carbs > 55) {
      score -= 30;
      issues.push('carb_bloater');
    } else if (totals.carbs <= 30) {
      score += 15;
      strengths.push('lean_machine');
    }

    // Enhanced sugar evaluation
    if (totals.sugar <= 15) {
      score += 25;
      strengths.push('sugar_angel');
    } else if (totals.sugar <= 25) {
      score += 10;
      strengths.push('manageable_sugar');
    } else if (totals.sugar > 25) {
      const sugarOverage = totals.sugar - 25;
      const warningLevel = Math.floor(sugarOverage / 10) + 1;
      score -= (15 + (warningLevel * 10));
      issues.push(`sugar_bomb_level_${warningLevel}`);
    }

    // Calorie burn potential
    if (totals.calories >= 100 && totals.calories <= 600) {
      score += 15;
      strengths.push('calorie_burn_friendly');
    } else if (totals.calories > 800) {
      score -= 20;
      issues.push('calorie_bomb');
    }

    // Protein metabolism boost bonus
    if (proteinPercent >= 50) {
      score += 20;
      strengths.push('fat_burning_machine');
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      issues,
      strengths,
      warnings,
      macros: { proteinPercent, carbPercent, fatPercent },
      carbGrams: totals.carbs,
      sugarGrams: totals.sugar,
      cholesterolMg: totals.cholesterol,
      glycemicIndex: totals.glycemicIndex
    };
  };

  // Initialize game cards from actual meal data
  useEffect(() => {
    if (!allMeals || Object.keys(allMeals).length === 0) return;
    
    const cards = [];
    
    // Only include meals that have actual food (calories > 50)
    Object.entries(allMeals).forEach(([mealType, mealData]) => {
      if (mealData.totals && mealData.totals.calories > 50) {
        // Add glycemic index estimation based on carbs and sugar
        const estimatedGI = Math.min(95, Math.max(10, (mealData.totals.carbs * 1.2) + (mealData.totals.sugar * 1.8)));
        
        cards.push({
          id: `${mealType}-${Date.now()}`,
          mealType,
          time: mealData.time,
          totals: {
            ...mealData.totals,
            glycemicIndex: Math.round(estimatedGI),
            cholesterol: mealData.totals.cholesterol || Math.round((mealData.totals.fat * 8) + (mealData.totals.protein * 2))
          },
          pieData: mealData.pieData || [],
          items: mealData.items || [],
          isRealMeal: true
        });
      }
    });

    // Sort by meal time chronologically
    const timeToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      return hour24 * 60 + minutes;
    };

    cards.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    
    setGameCards(cards);
    
    // Get overall grade from personal trainer summary
    const dailyTotals = calculateDailyTotalsFromMeals(allMeals);
    const gradeInfo = calculateOverallGrade(dailyTotals, userProfile, calorieData);
    setOverallGrade(gradeInfo.grade || 'C');
  }, [allMeals, userProfile, calorieData]);

  // Enhanced responses with new warning types
  const getSwipeResponse = (card, swipeDirection, evaluation) => {
    const { firstName, gender } = userProfile;
    const { score, issues, strengths, warnings, macros, carbGrams, sugarGrams, cholesterolMg, glycemicIndex } = evaluation;
    const swipedRight = swipeDirection === 'right';
    const isGoodMeal = score >= 70;
    
    // Gender-specific pronouns for dating theme
    const genderPronouns = {
      male: { they: 'she', possessive: 'her', title: 'queen' },
      female: { they: 'he', possessive: 'his', title: 'king' },
      'non-binary': { they: 'they', possessive: 'their', title: 'royalty' }
    };
    
    const pronouns = genderPronouns[gender] || genderPronouns['non-binary'];
    
    // Priority: Show warning-specific responses first
    if (swipedRight && warnings.includes('glycemic')) {
      const glycemicRejectionMessages = [
        `💔 GHOSTED! GI of ${glycemicIndex}?! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} said "A moment on the lips, FOREVER on the hips" and blocked you!`,
        `🍯💥 DIABETES ALERT! That ${glycemicIndex} GI spike just gave you the "I don't date pre-diabetics" speech! Moment on lips = lifetime on hips!`,
        `📈⚡ BLOOD SUGAR REJECTION! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} wants stable energy, not glucose roller coasters! Forever on the hips, baby!`,
        `🎢 SUGAR CRASH ZONE! That GI spike screamed "moment on the lips, forever on the hips" and ran away crying!`
      ];
      return glycemicRejectionMessages[Math.floor(Math.random() * glycemicRejectionMessages.length)];
    }
    
    if (swipedRight && warnings.includes('sugar')) {
      const sugarLevel = issues.find(issue => issue.startsWith('sugar_bomb_level_'))?.split('_')[3] || '1';
      const sugarRejectionMessages = [
        `🍭💀 DIABETES DATING DISASTER! ${Math.round(sugarGrams)}g sugar just filed a restraining order! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} said "Call me when your pancreas works!"`,
        `💔 INSULIN SPIKE REJECTION! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} doesn't date people who crash harder than the stock market!`,
        `🚨 SUGAR EMERGENCY! That ${Math.round(sugarGrams)}g bomb just blocked you on all dating apps! Level ${sugarLevel} catastrophe!`,
        `🤡 Even CANDY doesn't want to be associated with that sugar disaster! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} wants someone stable!`
      ];
      return sugarRejectionMessages[Math.floor(Math.random() * sugarRejectionMessages.length)];
    }
    
    if (swipedRight && warnings.includes('cholesterol')) {
      const cholesterolRejectionMessages = [
        `❤️💥 HEART ATTACK HOOKUP! ${cholesterolMg}mg cholesterol just clogged your dating chances! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} wants to live past 50!`,
        `🫀🚨 CARDIAC ARREST ALERT! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} said "I don't date people who kill my arteries on the first meal!"`,
        `💓⚠️ CHOLESTEROL CHAOS! That artery-clogging disaster wants someone with WORSE cardiovascular health!`,
        `🫁💀 HEART HEALTH HORROR! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} heard your blood pressure from three states away and fled!`
      ];
      return cholesterolRejectionMessages[Math.floor(Math.random() * cholesterolRejectionMessages.length)];
    }
    
    // Regular dating responses for non-warning scenarios
    if (swipedRight && isGoodMeal) {
      if (strengths.includes('sweetheart_macros')) {
        const sweetheartMessages = [
          `🔥 SWEETHEART MATCH! That 40-40-20 balance will have your metabolism PURRING like a Ferrari engine!`,
          `💍 WIFEY/HUBBY MATERIAL! Perfect macros = fat-burning machine activated, ${firstName}!`,
          `🏆 KEEPER ALERT! That balanced beauty will torch calories for HOURS after eating!`,
          `✨ MARRIAGE MATERIAL! Your metabolism just found its soulmate - prepare for the calorie burn!`
        ];
        return sweetheartMessages[Math.floor(Math.random() * sweetheartMessages.length)];
      } else if (strengths.includes('metabolism_booster')) {
        const metabolismMessages = [
          `💪 METABOLISM ROCKET! That protein will have you burning calories while you sleep!`,
          `🚀 FAT BURNING ACTIVATED! High protein = thermogenic BEAST MODE engaged!`,
          `🔥 CALORIE INCINERATOR! Your body is about to work OVERTIME digesting that protein!`,
          `⚡ METABOLIC LIGHTNING! That protein percentage just turned you into a calorie-burning machine!`
        ];
        return metabolismMessages[Math.floor(Math.random() * metabolismMessages.length)];
      }
    }
    
    if (swipedRight && !isGoodMeal) {
      if (issues.includes('carb_bloater')) {
        const carbBloaterMessages = [
          `💔 REJECTED! ${firstName}, ${Math.round(carbGrams)}g carbs?! ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} said "I don't date people who make me look pregnant!"`,
          `🚫 GHOSTED! That ${Math.round(carbGrams)}g carb bomb just called you "bloat buddy" and ran away!`,
          `❌ ${pronouns.they.charAt(0).toUpperCase() + pronouns.they.slice(1)} swiped LEFT on your stomach! Too many carbs = looking 6 months pregnant tomorrow!`
        ];
        return carbBloaterMessages[Math.floor(Math.random() * carbBloaterMessages.length)];
      }
    }
    
    if (!swipedRight && warnings.includes('glycemic')) {
      const smartGlycemicMessages = [
        `🍯👑 GLUCOSE GENIUS! You spotted that ${glycemicIndex} GI disaster immediately! Saved yourself from "moment on lips, forever on hips!"`,
        `📈🛡️ BLOOD SUGAR BODYGUARD! You protected your energy stability like a CHAMPION! No glucose roller coasters here!`,
        `🎯 METABOLIC MASTERMIND! That glycemic bomb couldn't fool your fat-burning instincts!`
      ];
      return smartGlycemicMessages[Math.floor(Math.random() * smartGlycemicMessages.length)];
    }
    
    // Fallback responses
    if (!swipedRight && isGoodMeal) {
      if (strengths.includes('sweetheart_macros')) {
        return `😱 WHAT?! ${firstName}, you just rejected METABOLIC PERFECTION! That 40-40-20 was your calorie-burning soulmate!`;
      }
      return `🤷‍♀️ Your loss! That was decent metabolism fuel and you pushed it away!`;
    }
    
    if (!swipedRight && !isGoodMeal) {
      if (issues.includes('carb_bloater')) {
        return `👑 DIGESTIVE ROYALTY! You spotted that ${Math.round(carbGrams)}g bloat-bomb immediately!`;
      }
      return `👍 SOLID INSTINCTS! You're learning to protect your metabolism!`;
    }
    
    return `✅ SOLID CHOICE! Your metabolism approves of this calorie-burning combination!`;
  };

  // Smooth drag handlers
  const handleStart = (clientX, clientY) => {
    if (isAnimating || showingReaction) return;
    setIsDragging(true);
    startPosRef.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging || isAnimating || showingReaction) return;
    
    const deltaX = clientX - startPosRef.current.x;
    // Constrain to horizontal movement only, no rotation
    const clampedDeltaX = Math.max(-150, Math.min(150, deltaX));
    const opacity = Math.max(0.8, 1 - Math.abs(clampedDeltaX) * 0.002);
    
    setSwipeState({
      x: clampedDeltaX,
      rotation: 0, // No rotation for cleaner horizontal swipe
      opacity
    });
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating || showingReaction) return;
    setIsDragging(false);
    
    // Tighter threshold for more controlled swiping
    const threshold = 50; // Reduced from 60-80
    if (Math.abs(swipeState.x) > threshold) {
      const direction = swipeState.x > 0 ? 'right' : 'left';
      animateSwipeOut(direction);
    } else {
      setSwipeState({ x: 0, rotation: 0, opacity: 1 });
    }
  };

  const animateSwipeOut = (direction) => {
    setIsAnimating(true);
    const directionMultiplier = direction === 'right' ? 1 : -1;
    
    setSwipeState({
      x: directionMultiplier * 300, // Reduced distance for cleaner animation
      rotation: 0, // No rotation
      opacity: 0
    });
    
    setTimeout(() => {
      handleSwipe(direction);
      setSwipeState({ x: 0, rotation: 0, opacity: 1 });
      setIsAnimating(false);
    }, 250); // Faster animation
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events with improved mobile handling
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length > 1) return; // Ignore multi-touch
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, swipeState.x]);

  const handleSwipe = (direction) => {
    const currentCard = gameCards[currentCardIndex];
    if (!currentCard) return;

    const evaluation = evaluateMealQuality(currentCard);
    const response = getSwipeResponse(currentCard, direction, evaluation);
    
    setLastResponse(response);
    setShowingReaction(true);
    
    setSwipeResults(prev => [...prev, {
      card: currentCard,
      direction,
      response,
      evaluation,
      isCorrect: direction === 'right' ? evaluation.score >= 70 : evaluation.score < 70
    }]);
  };

  const handleNextCard = () => {
    setShowingReaction(false);
    
    if (currentCardIndex >= gameCards.length - 1) {
      setGameComplete(true);
      setTimeout(() => {
        if (isIntegrated) {
          onComplete();
        }
      }, 3000);
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentCardIndex(0);
    setSwipeResults([]);
    setGameComplete(false);
    setLastResponse('');
    setShowingReaction(false);
    setSwipeState({ x: 0, rotation: 0, opacity: 1 });
  };

  const getMealTypeDisplayName = (mealType) => {
    const names = {
      breakfast: 'Breakfast',
      firstSnack: 'Morning Snack',
      secondSnack: 'Mid-Morning Snack', 
      lunch: 'Lunch',
      midAfternoon: 'Afternoon Snack',
      dinner: 'Dinner',
      lateSnack: 'Evening Snack',
      postWorkout: 'Post-Workout'
    };
    return names[mealType] || mealType;
  };

  if (gameCards.length === 0) {
    // Demo cards setup (when no real meal data)
    const demoCards = [
      {
        id: 'demo-balance-1',
        mealType: 'breakfast',
        time: '8:00 AM',
        totals: {
          calories: 420,
          protein: 42,
          carbs: 42,
          fat: 9,
          sugar: 12,
          cholesterol: 75,
          glycemicIndex: 35
        },
        pieData: [
          { name: 'Protein', value: 42, percentage: 40, color: '#3B82F6' },
          { name: 'Carbs', value: 42, percentage: 40, color: '#10B981' },
          { name: 'Fat', value: 9, percentage: 20, color: '#F59E0B' }
        ],
        items: ['Grilled chicken breast', 'Sweet potato', 'Mixed greens'],
        isRealMeal: false,
        demoName: "Grilled Chicken & Sweet Potato Power Bowl"
      }
    ];

    return (
      <div className="h-screen w-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-5 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">🎮 Try Our Demo Game!</h2>
          <p className="text-gray-600 mb-4">No meals yet? No problem! Test your macro vision with our strategic nutrition challenges!</p>
          <button
            onClick={() => {
              setGameCards(demoCards);
              setCurrentCardIndex(0);
              setSwipeResults([]);
              setGameComplete(false);
              setShowingReaction(false);
              setOverallGrade('Demo');
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg active:scale-95 transition-all duration-200 touch-manipulation"
          >
            🔥 Start Demo Dating Game
          </button>
        </div>
      </div>
    );
  }

  const currentCard = gameCards[currentCardIndex];

  if (gameComplete) {
    const correctCount = swipeResults.filter(r => r.isCorrect).length;
    const finalScore = Math.round((correctCount / swipeResults.length) * 100);
    
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex flex-col justify-center p-4 overflow-y-auto">
        <div className="text-center mb-6 flex-shrink-0">
          <h2 className="text-3xl font-bold text-white mb-2">
            Dating Results: {correctCount}/{gameCards.length}
          </h2>
          <div className="text-xl text-green-200">
            Final Score: {finalScore}%
          </div>
        </div>

        <div className="bg-white w-full max-w-sm mx-auto text-center shadow-xl flex-1 max-h-[600px] overflow-y-auto p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Dating Coach Analysis:</h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {finalScore >= 80 ? `🏆 DATING LEGEND! You've got excellent nutrition taste!` :
             finalScore >= 60 ? `💪 SOLID INSTINCTS! You're learning to spot good nutrition dates!` :
             finalScore >= 40 ? `🤔 RISKY CHOICES! Your nutrition dating game needs work!` :
             `😅 DISASTER ZONE! Time to learn what quality looks like!`}
          </p>
          
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2 text-sm">Your Swipe History:</h4>
            <div className="text-xs space-y-1 max-h-40 overflow-y-auto">
              {swipeResults.map((result, index) => (
                <div key={index} className={`p-2 rounded ${result.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className="font-medium text-xs">{getMealTypeDisplayName(result.card.mealType)}</div>
                  <div className="text-gray-600 text-xs">
                    {result.direction === 'right' ? '❤️' : '❌'} • Score: {result.evaluation.score}/100 • 
                    {result.isCorrect ? ' ✅ Correct!' : ' ❌ Wrong choice'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isIntegrated && (
            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
            >
              <RotateCcw size={16} />
              Date Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (showingReaction) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm h-full max-h-[500px] cursor-pointer active:scale-95 transition-all duration-200 touch-manipulation"
          onClick={handleNextCard}
        >
          <div className="text-center h-full flex flex-col justify-center p-6">
            <div className="text-4xl mb-4">💘</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dating Coach Says:</h2>
            <div className="bg-gray-50 rounded-lg p-4 flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-sm text-gray-700 leading-relaxed">
                {lastResponse}
              </p>
            </div>
            <div className="text-center text-gray-500 text-xs p-3 bg-gray-50 rounded-lg mt-4 flex-shrink-0">
              {currentCardIndex < gameCards.length - 1 ? 
                `Tap to continue → (${currentCardIndex + 2}/${gameCards.length})` : 
                'Tap to see results →'
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading Game...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center overflow-hidden">
      {/* Main swipeable content - full screen */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <div 
          ref={cardRef}
          className="bg-white w-full max-w-sm h-full max-h-[600px] relative touch-manipulation"
          style={{ 
            transform: `translateX(${swipeState.x}px)`,
            opacity: swipeState.opacity,
            transition: isAnimating ? 'all 0.25s ease-out' : isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Content - Clean mobile layout */}
          <div className="flex flex-col h-full p-4 pointer-events-none relative">
            {/* Subtle swipe indicators */}
            {isDragging && (
              <>
                <div 
                  className={`absolute top-1/2 left-2 transform -translate-y-1/2 text-3xl transition-opacity duration-200 ${
                    swipeState.x > 20 ? 'opacity-70' : 'opacity-20'
                  }`}
                >
                  ❤️
                </div>
                <div 
                  className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-3xl transition-opacity duration-200 ${
                    swipeState.x < -20 ? 'opacity-70' : 'opacity-20'
                  }`}
                >
                  ❌
                </div>
              </>
            )}
            
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {currentCard.demoName || getMealTypeDisplayName(currentCard.mealType)}
              </h2>
              <div className="text-sm text-gray-600">
                ⏰ {currentCard.time} • {currentCardIndex + 1}/{gameCards.length}
                {currentCard.demoName && <span className="ml-1 text-purple-600 font-medium">• DEMO</span>}
              </div>
            </div>
            
            {/* Nutrition Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex-shrink-0">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{Math.round(currentCard.totals.calories)}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{Math.round(currentCard.totals.protein)}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{Math.round(currentCard.totals.carbs)}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{Math.round(currentCard.totals.fat)}g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                <div className="text-center">Sugar: {Math.round(currentCard.totals.sugar)}g</div>
                <div className="text-center">GI: {currentCard.totals.glycemicIndex}</div>
              </div>
            </div>

            {/* Macro Percentages */}
            {currentCard.pieData && currentCard.pieData.length > 0 && (
              <div className="text-center mb-4 flex-shrink-0">
                <div className="text-sm font-medium text-gray-700 mb-2">Macro Profile:</div>
                <div className="text-sm text-gray-600 mb-2">
                  💪 {currentCard.pieData[0]?.percentage || 0}% • 
                  🌾 {currentCard.pieData[1]?.percentage || 0}% • 
                  🥑 {currentCard.pieData[2]?.percentage || 0}%
                </div>
                <div className="text-xs text-gray-500">
                  (Target: 40% • 40% • 20%)
                </div>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Swipe Actions */}
            <div className="flex justify-center gap-8 flex-shrink-0">
              <button
                onClick={() => !isDragging && !isAnimating && handleSwipe('left')}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg pointer-events-auto touch-manipulation"
              >
                <X size={28} />
              </button>
              <button
                onClick={() => !isDragging && !isAnimating && handleSwipe('right')}
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg pointer-events-auto touch-manipulation"
              >
                <Heart size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSwipeGame;