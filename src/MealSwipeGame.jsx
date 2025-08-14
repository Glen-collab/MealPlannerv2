import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, RotateCcw, AlertTriangle } from 'lucide-react';
import { generatePersonalTrainerSummary } from './PersonalTrainerSummary.js';

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
    const summary = generatePersonalTrainerSummary(allMeals, userProfile, calorieData);
    setOverallGrade(summary.grade || 'C');
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
    
    // Fallback to original responses for other scenarios
    return getOriginalResponse(card, swipeDirection, evaluation, firstName, pronouns);
  };

  // Original response logic for non-warning scenarios
  const getOriginalResponse = (card, swipeDirection, evaluation, firstName, pronouns) => {
    const { score, issues, strengths, macros, carbGrams, sugarGrams } = evaluation;
    const swipedRight = swipeDirection === 'right';
    const isGoodMeal = score >= 70;
    
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
    // Limit rotation for smoother feel
    const rotation = Math.max(-10, Math.min(10, deltaX * 0.08));
    const opacity = Math.max(0.7, 1 - Math.abs(deltaX) * 0.001);
    
    setSwipeState({
      x: deltaX,
      rotation,
      opacity
    });
  };

  const handleEnd = () => {
    if (!isDragging || isAnimating || showingReaction) return;
    setIsDragging(false);
    
    const threshold = 80; // More responsive threshold
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
      x: directionMultiplier * 400,
      rotation: directionMultiplier * 20, // Reduced rotation for smoother animation
      opacity: 0
    });
    
    setTimeout(() => {
      handleSwipe(direction);
      setSwipeState({ x: 0, rotation: 0, opacity: 1 });
      setIsAnimating(false);
    }, 300);
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

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
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
    // Create fun demo game with strategic macro profiles
    const demoCards = [
      {
        id: 'demo-balance-1',
        mealType: 'breakfast',
        time: '8:00 AM',
        totals: {
          calories: 420,
          protein: 42, // 40% of calories
          carbs: 42,   // 40% of calories  
          fat: 9,      // 20% of calories
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
      },
      {
        id: 'demo-fatburn-1',
        mealType: 'lunch',
        time: '12:30 PM',
        totals: {
          calories: 350,
          protein: 53, // 60% of calories
          carbs: 18,   // 20% of calories
          fat: 8,      // 20% of calories
          sugar: 6,
          cholesterol: 65,
          glycemicIndex: 25
        },
        pieData: [
          { name: 'Protein', value: 53, percentage: 60, color: '#3B82F6' },
          { name: 'Carbs', value: 18, percentage: 20, color: '#10B981' },
          { name: 'Fat', value: 8, percentage: 20, color: '#F59E0B' }
        ],
        items: ['Lean ground turkey', 'Asparagus', 'Bell peppers'],
        isRealMeal: false,
        demoName: "Lean Turkey & Veggie Stack"
      },
      {
        id: 'demo-balance-2',
        mealType: 'dinner',
        time: '6:00 PM',
        totals: {
          calories: 400,
          protein: 40, // 40% of calories
          carbs: 40,   // 40% of calories
          fat: 9,      // 20% of calories
          sugar: 8,
          cholesterol: 45,
          glycemicIndex: 30
        },
        pieData: [
          { name: 'Protein', value: 40, percentage: 40, color: '#3B82F6' },
          { name: 'Carbs', value: 40, percentage: 40, color: '#10B981' },
          { name: 'Fat', value: 9, percentage: 20, color: '#F59E0B' }
        ],
        items: ['Wild salmon fillet', 'Quinoa', 'Roasted vegetables'],
        isRealMeal: false,
        demoName: "Wild Salmon & Quinoa Perfection"
      },
      {
        id: 'demo-keto-1',
        mealType: 'firstSnack',
        time: '10:00 AM',
        totals: {
          calories: 580,
          protein: 38, // 25% of calories
          carbs: 8,    // 5% of calories
          fat: 48,     // 70% of calories
          sugar: 3,
          cholesterol: 420, // HIGH for warning!
          glycemicIndex: 15
        },
        pieData: [
          { name: 'Protein', value: 38, percentage: 25, color: '#3B82F6' },
          { name: 'Carbs', value: 8, percentage: 5, color: '#10B981' },
          { name: 'Fat', value: 48, percentage: 70, color: '#F59E0B' }
        ],
        items: ['Thick-cut bacon', 'Aged cheddar', 'Avocado'],
        isRealMeal: false,
        demoName: "Bacon & Cheese Keto Bomb"
      },
      {
        id: 'demo-holiday-1',
        mealType: 'lateSnack',
        time: '8:30 PM',
        totals: {
          calories: 750,
          protein: 18, // 10% of calories
          carbs: 125,  // 65% of calories
          fat: 22,     // 25% of calories
          sugar: 89,   // SUGAR BOMB!
          cholesterol: 95,
          glycemicIndex: 85 // HIGH GI!
        },
        pieData: [
          { name: 'Protein', value: 18, percentage: 10, color: '#3B82F6' },
          { name: 'Carbs', value: 125, percentage: 65, color: '#10B981' },
          { name: 'Fat', value: 22, percentage: 25, color: '#F59E0B' }
        ],
        items: ['Christmas cookies', 'Vanilla ice cream', 'Chocolate sauce'],
        isRealMeal: false,
        demoName: "Christmas Cookie Milkshake Madness"
      }
    ];

    return (
      <div className="max-w-sm mx-auto bg-gradient-to-br from-green-800 via-green-900 to-green-800 rounded-xl shadow-lg border-2 border-black p-5 text-center">
        <h2 className="text-xl font-bold text-white mb-2">🎮 Try Our Demo Game!</h2>
        <p className="text-green-200 mb-4">No meals yet? No problem! Test your macro vision with our strategic nutrition challenges!</p>
        <div className="text-xs text-green-300 mb-4">
          • 40-40-20 Balance Masters<br/>
          • 60-20-20 Fat Burning Beast<br/>
          • Keto Cholesterol Challenge<br/>
          • Holiday Sugar Bomb Alert
        </div>
        <button
          onClick={() => {
            setGameCards(demoCards);
            setCurrentCardIndex(0);
            setSwipeResults([]);
            setGameComplete(false);
            setShowingReaction(false);
            setOverallGrade('Demo');
          }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          🔥 Start Demo Dating Game
        </button>
        <div className="text-xs text-green-400 mt-3">
          Perfect for learning macro ratios before tracking real meals!
        </div>
      </div>
    );
  }

  const currentCard = gameCards[currentCardIndex];

  if (gameComplete) {
    const correctCount = swipeResults.filter(r => r.isCorrect).length;
    const finalScore = Math.round((correctCount / swipeResults.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {gameCards[0]?.demoName ? 'Demo Dating Results!' : 'Your Dating Hand:'} {correctCount}/{gameCards.length}
          </h2>
          <div className="text-xl text-green-200">
            {gameCards[0]?.demoName ? 'Demo' : 'Nutrition Dating'} Score: {finalScore}%
          </div>
        </div>

        <div className="bg-green-700 rounded-3xl p-6 mb-6 shadow-2xl border-4 border-green-600">
          <div className="grid grid-cols-4 gap-4">
            {gameCards.map((card, index) => {
              const isCorrect = swipeResults[index] && swipeResults[index].isCorrect;
              
              if (isCorrect) {
                return (
                  <div key={index} className="bg-white rounded-lg shadow-lg border-2 border-gray-300 p-2 w-20 h-28 flex flex-col">
                    <div className="text-lg text-center">❤️</div>
                    <div className="text-xs font-bold text-center text-gray-800 leading-tight mb-1">
                      {card.demoName ? card.demoName.split(' ').slice(0, 2).join(' ') : getMealTypeDisplayName(card.mealType)}
                    </div>
                    <div className="text-xs text-center text-gray-600 mb-1">
                      {Math.round(card.totals.calories)} cal
                    </div>
                    <div className="text-xs text-center text-purple-600 mb-1">
                      {Math.round(card.totals.protein)}p {Math.round(card.totals.carbs)}c {Math.round(card.totals.fat)}f
                    </div>
                    <div className="text-center mt-auto">
                      <div className="text-xs text-green-600 font-bold">MATCH ♠</div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg shadow-lg border-2 border-red-700 p-2 w-20 h-28 flex flex-col items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-xs mb-1">💔</div>
                      <div className="text-xs font-bold">REJECTED</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-black p-5 max-w-sm text-center shadow-xl mx-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            {gameCards[0]?.demoName ? 'Demo Coach Analysis:' : 'Dating Coach Final Verdict:'}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {gameCards[0]?.demoName ? 
              // Demo-specific feedback
              (finalScore >= 80 ? `🏆 MACRO MASTER! You crushed our strategic challenges! You've got the vision to spot 40-40-20 balance, fat-burning ratios, and avoid sugar/cholesterol bombs! Ready for real meal tracking!` :
               finalScore >= 60 ? `💪 SOLID INSTINCTS! You're learning the macro game! You spotted some quality ratios but maybe got tricked by our keto cholesterol bomb or holiday sugar trap. Practice makes perfect!` :
               finalScore >= 40 ? `🤔 LEARNING MODE! Our demo challenges revealed some gaps in your macro knowledge. Focus on 40-40-20 balance, watch for sugar bombs over 25g, and cholesterol over 300mg!` :
               `😅 TRAINING NEEDED! Don't worry - our demo challenges are designed to teach! The 40-40-20 "sweetheart" ratios are your friends, and anything with 70+ sugar or 300+ cholesterol is a dating disaster!`) :
              // Original real meal feedback
              (finalScore >= 80 ? `🏆 DATING LEGEND! ${userProfile.firstName}, you've got excellent nutrition taste! You know quality metabolism fuel when you see it!` :
               finalScore >= 60 ? `💪 SOLID INSTINCTS! ${userProfile.firstName}, you're learning to spot good nutrition dates!` :
               finalScore >= 40 ? `🤔 RISKY CHOICES! ${userProfile.firstName}, your nutrition dating game needs work!` :
               `😅 DISASTER ZONE! ${userProfile.firstName}, you got rejected by your own meals! Time to learn what quality looks like!`)
            }
          </p>
          
          {!isIntegrated && (
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                {gameCards[0]?.demoName ? 'Try Again' : 'Date Again'}
              </button>
              {gameCards[0]?.demoName && (
                <button
                  onClick={() => {
                    setGameCards([]);
                    setCurrentCardIndex(0);
                    setSwipeResults([]);
                    setGameComplete(false);
                    setShowingReaction(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
                >
                  🍽️ Track Real Meals
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showingReaction) {
    const currentEvaluation = evaluateMealQuality(currentCard);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center p-4">
        <div className="relative max-w-sm w-full mx-auto">
          {/* Background depth cards - STATIC */}
          <div className="absolute inset-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-xl transform rotate-1 scale-95 opacity-20"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-xl transform -rotate-1 scale-98 opacity-40"></div>
          
          {/* Reaction Card - FIXED SIZE */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-black p-5 cursor-pointer hover:shadow-3xl transition-all duration-200 w-full max-w-sm mx-4 h-96 relative flex flex-col"
            onClick={handleNextCard}
          >
            {/* Warnings - OVERLAID */}
            {currentEvaluation.warnings.length > 0 && (
              <div className="absolute top-2 left-2 right-2 z-40 space-y-1">
                {currentEvaluation.warnings.includes('sugar') && (
                  <div className="bg-red-100/90 backdrop-blur-sm border border-red-300 rounded-lg p-2 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" size={16} />
                    <span className="text-red-800 text-xs font-medium">SUGAR BOMB: {Math.round(currentCard.totals.sugar)}g!</span>
                  </div>
                )}
                {currentEvaluation.warnings.includes('cholesterol') && (
                  <div className="bg-orange-100/90 backdrop-blur-sm border border-orange-300 rounded-lg p-2 flex items-center gap-2">
                    <AlertTriangle className="text-orange-600" size={16} />
                    <span className="text-orange-800 text-xs font-medium">HEART ATTACK: {currentEvaluation.cholesterolMg}mg!</span>
                  </div>
                )}
                {currentEvaluation.warnings.includes('glycemic') && (
                  <div className="bg-yellow-100/90 backdrop-blur-sm border border-yellow-300 rounded-lg p-2 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-600" size={16} />
                    <span className="text-yellow-800 text-xs font-medium">GLUCOSE SPIKE: GI {currentEvaluation.glycemicIndex}!</span>
                  </div>
                )}
              </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-3 mb-3 text-center border border-gray-200 flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {currentCard.demoName || getMealTypeDisplayName(currentCard.mealType)}
              </h3>
              <div className="flex justify-center gap-4 text-xs text-gray-500 mb-2">
                <span>Cal: {Math.round(currentCard.totals.calories)}</span>
                <span>P: {Math.round(currentCard.totals.protein)}g</span>
                <span>C: {Math.round(currentCard.totals.carbs)}g</span>
                <span>F: {Math.round(currentCard.totals.fat)}g</span>
              </div>
              {currentCard.demoName && (
                <div className="text-xs text-purple-600 font-medium">DEMO CHALLENGE</div>
              )}
            </div>

            {/* Reaction Content */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <div className="text-4xl mb-2">💔</div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Dating Coach Says:</h2>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 flex-1 flex items-center justify-center">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {lastResponse}
                </p>
              </div>
            </div>

            {/* Bottom instruction */}
            <div className="text-center text-gray-500 text-xs p-2 rounded-xl bg-gray-50 border border-gray-200 mt-3 flex-shrink-0">
              {currentCardIndex < gameCards.length - 1 ? 
                `Tap anywhere to continue dating → (${currentCardIndex + 2}/${gameCards.length})` : 
                'Tap anywhere to see your dating results →'
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800 flex items-center justify-center p-4">
      <div className="relative max-w-sm w-full mx-auto">
        {/* Progress indicator - COMPLETELY STATIC */}
        <div className="absolute top-4 left-4 right-4 z-30 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full w-full h-2 shadow-lg">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / gameCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Instructions - COMPLETELY STATIC */}
        <div className="absolute top-12 left-4 right-4 z-30 text-center text-white text-sm pointer-events-none bg-black/30 backdrop-blur-sm rounded-xl p-2">
          ❌ Pass • ❤️ Match • Swipe for dating fate!
        </div>

        {/* Card counter - COMPLETELY STATIC */}
        <div className="absolute bottom-16 left-4 right-4 z-30 text-center text-white text-sm pointer-events-none bg-black/30 backdrop-blur-sm rounded-xl p-2">
          Dating Card {currentCardIndex + 1} of {gameCards.length} • Grade: {overallGrade}
        </div>

        {/* Hot standard reminder - COMPLETELY STATIC */}
        <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center text-xs text-purple-700 border border-purple-200 pointer-events-none">
          SWEETHEART Standard: 40% protein, 40% carbs, 20% fat (±10%), sugar under 25g
        </div>

        {/* Card Container - Only this moves */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {/* Background depth cards - STATIC */}
          <div className="absolute inset-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-xl transform rotate-1 scale-95 opacity-20"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-xl transform -rotate-1 scale-98 opacity-40"></div>
          
          {/* Main swipeable card - ONLY THIS MOVES */}
          <div 
            ref={cardRef}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-black p-5 cursor-grab active:cursor-grabbing select-none w-full max-w-sm mx-4 h-96 relative"
            style={{ 
              transform: `translateX(${swipeState.x}px) rotate(${swipeState.rotation}deg)`,
              opacity: swipeState.opacity,
              transition: isAnimating ? 'all 0.3s ease-out' : isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Swipe indicators - OVERLAID */}
            {isDragging && (
              <>
                <div 
                  className={`absolute top-16 left-4 text-6xl transition-opacity duration-200 pointer-events-none z-40 ${swipeState.x < -30 ? 'opacity-100' : 'opacity-30'}`}
                >
                  ❌
                </div>
                <div 
                  className={`absolute top-16 right-4 text-6xl transition-opacity duration-200 pointer-events-none z-40 ${swipeState.x > 30 ? 'opacity-100' : 'opacity-30'}`}
                >
                  ❤️
                </div>
              </>
            )}
            
            {/* Card Content - Fixed Height Container */}
            <div className="flex flex-col h-full pointer-events-none relative">
              {/* Header */}
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {currentCard.demoName || getMealTypeDisplayName(currentCard.mealType)}
                </h2>
                <div className="text-xs text-gray-600">
                  ⏰ {currentCard.time}
                  {currentCard.demoName && <span className="ml-2 text-purple-600 font-medium">• DEMO</span>}
                </div>
              </div>
              
              {/* Nutrition Display - Compact */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 mb-3 border border-gray-200 flex-shrink-0">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.round(currentCard.totals.calories)}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(currentCard.totals.protein)}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{Math.round(currentCard.totals.carbs)}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{Math.round(currentCard.totals.fat)}g</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="text-center">Sugar: {Math.round(currentCard.totals.sugar)}g</div>
                  <div className="text-center">GI: {currentCard.totals.glycemicIndex}</div>
                </div>
              </div>

              {/* Macro Percentages - Compact */}
              {currentCard.pieData && currentCard.pieData.length > 0 && (
                <div className="text-center mb-3 flex-shrink-0">
                  <div className="text-xs font-medium text-gray-700 mb-1">Dating Profile:</div>
                  <div className="text-xs text-gray-600">
                    💪 {currentCard.pieData[0]?.percentage || 0}% • 
                    🌾 {currentCard.pieData[1]?.percentage || 0}% • 
                    🥑 {currentCard.pieData[2]?.percentage || 0}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    (Sweetheart Target: 40% • 40% • 20%)
                  </div>
                </div>
              )}

              {/* Spacer to push buttons to bottom */}
              <div className="flex-1"></div>

              {/* Swipe Actions - Bottom Fixed */}
              <div className="flex justify-center gap-6 mb-2 flex-shrink-0">
                <button
                  onClick={() => !isDragging && !isAnimating && handleSwipe('left')}
                  className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg pointer-events-auto"
                >
                  <X size={24} />
                </button>
                <button
                  onClick={() => !isDragging && !isAnimating && handleSwipe('right')}
                  className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg pointer-events-auto"
                >
                  <Heart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSwipeGame;