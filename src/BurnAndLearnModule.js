import React, { useState, useEffect } from 'react';

// Get current day of week (0-6) for question rotation
const getCurrentDay = () => new Date().getDay();

// Main Burn & Learn Module
export default function BurnAndLearnModule({ activeGame = null, onExit = null }) {
  const [currentActiveGame, setCurrentActiveGame] = useState(activeGame);

  // If activeGame prop changes, update internal state
  useEffect(() => {
    if (activeGame) {
      setCurrentActiveGame(activeGame);
    }
  }, [activeGame]);

  const games = [
    {
      id: 'protein',
      title: '🥩 Protein Power',
      description: 'Master protein science with muscle-centric medicine',
      color: 'blue',
      bgColor: 'bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'carbs',
      title: '🥬 Smart Carbs',
      description: 'Strategic carb choices for optimal health',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'fats',
      title: '🥑 Healthy Fats',
      description: 'Essential fats for hormones and longevity',
      color: 'green',
      bgColor: 'bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'alcohol',
      title: '🍷 Liquid Truth',
      description: 'Alcohol metabolism and longevity impact',
      color: 'purple',
      bgColor: 'bg-purple-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'tdee',
      title: '🔥 Metabolic Reality',
      description: 'Energy expenditure and muscle metabolism',
      color: 'red',
      bgColor: 'bg-red-50',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'calories',
      title: '⚖️ Energy Balance',
      description: 'Calorie science for body composition',
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  const renderGame = () => {
    switch (currentActiveGame) {
      case 'protein': return <ProteinGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      case 'carbs': return <CarbGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      case 'fats': return <FatGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      case 'alcohol': return <AlcoholGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      case 'tdee': return <TDEEGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      case 'calories': return <CalorieGame onExit={onExit || (() => setCurrentActiveGame(null))} />;
      default: return null;
    }
  };

  if (activeGame) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {renderGame()}
      </div>
    );
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[getCurrentDay()];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🔥 Burn & Learn</h1>
          <p className="text-gray-600 mb-2">Evidence-Based Nutrition Education</p>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-700">📅 Today is {currentDay}</p>
            <p className="text-xs text-gray-500">Expert-backed questions rotate daily - based on cutting-edge research!</p>
          </div>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setCurrentActiveGame(game.id)}
              className={`w-full ${game.bgColor} rounded-xl p-6 text-left hover:shadow-lg transform hover:scale-105 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="bg-white px-2 py-1 rounded-full mr-2">5 Levels</span>
                    <span className="bg-white px-2 py-1 rounded-full">Daily Rotation</span>
                  </div>
                </div>
                <div className="text-2xl">▶️</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">🎯 Evidence Levels</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-600">🟢 Round 1:</span>
              <span className="text-gray-700">Foundation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">🔵 Round 2:</span>
              <span className="text-gray-700">Applied Science</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-600">🟡 Round 3:</span>
              <span className="text-gray-700">Research-Based</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-600">🟠 Round 4:</span>
              <span className="text-gray-700">Expert Level</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">🔴 Round 5:</span>
              <span className="text-gray-700">Cutting Edge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Protein Game with muscle-centric, high-protein philosophy
function ProteinGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // 5 rounds × 7 days = 35 question sets - All updated for high-protein philosophy
  const proteinQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      // Day 0-6 questions for foundation level
      [
        { q: "Which food has the most protein?", opts: ["Apple", "Chicken", "Bread", "Candy"], correct: 1, exp: "Chicken is packed with protein - the muscle-building superstar! As Dr. Gabrielle Lyon says, 'We are not overfat, we are under-muscled!' 💪" },
        { q: "Protein helps build what in your body?", opts: ["Hair", "Muscles", "Teeth", "All of these"], correct: 3, exp: "Protein builds muscles, hair, skin, and helps repair everything! Muscle is your organ of longevity!" }
      ],
      [
        { q: "How much protein should you eat daily?", opts: ["Very little", "1 gram per pound of body weight", "Only at dinner", "Just on weekends"], correct: 1, exp: "Dr. Peter Attia and Arnold Schwarzenegger both recommend about 1 gram of protein per pound of body weight - that's what champions eat!" },
        { q: "When should you eat protein?", opts: ["Only dinner", "Only breakfast", "Never", "Every meal"], correct: 3, exp: "Eating protein at every meal keeps you strong and satisfied all day - just like the pros!" }
      ],
      [
        { q: "Fish is a good source of what?", opts: ["Sugar", "Protein and healthy fats", "Only water", "Carbs"], correct: 1, exp: "Fish gives you protein plus healthy omega-3 fats for your brain and muscles!" },
        { q: "Muscle is called the organ of what?", opts: ["Weakness", "Longevity", "Tiredness", "Hunger"], correct: 1, exp: "Dr. Gabrielle Lyon teaches that muscle is the organ of longevity - more muscle = longer, healthier life!" }
      ],
      [
        { q: "Which snack has the best protein?", opts: ["Candy", "Hard-boiled eggs", "Chips", "Soda"], correct: 1, exp: "Hard-boiled eggs are nature's perfect protein package - complete amino acids! 🥚" },
        { q: "Why do strong people eat lots of protein?", opts: ["It tastes good", "Builds and maintains muscle", "It's trendy", "Makes them tall"], correct: 1, exp: "Protein builds and maintains the muscle that keeps you strong and independent as you age!" }
      ],
      [
        { q: "What happens when you don't eat enough protein?", opts: ["Nothing changes", "Muscle loss", "Better health", "More energy"], correct: 1, exp: "Not enough protein leads to muscle loss - and as Dr. Lyon says, we're not overfat, we're under-muscled!" },
        { q: "Protein makes you feel what?", opts: ["Hungry right away", "Full and satisfied", "Sleepy", "Weak"], correct: 1, exp: "Protein keeps you satisfied longer than any other food - it's the satiety superstar!" }
      ],
      [
        { q: "Which has more protein - chicken or bread?", opts: ["Bread", "Chicken", "Same amount", "Neither"], correct: 1, exp: "Chicken has about 8 times more protein than bread - choose your foods wisely!" },
        { q: "Your body uses protein for what?", opts: ["Only muscles", "Everything important", "Just hair", "Nothing"], correct: 1, exp: "Protein makes enzymes, hormones, antibodies, and repairs everything in your body!" }
      ],
      [
        { q: "What makes protein different from candy?", opts: ["Color", "Builds your body", "Size", "Shape"], correct: 1, exp: "Protein actually builds your body strong, while candy just gives temporary energy!" },
        { q: "The strongest people eat protein at what time?", opts: ["Never", "Only weekends", "Every meal", "Just holidays"], correct: 2, exp: "Champions like Arnold eat protein every meal to maintain their strength and muscle mass!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL  
    [
      [
        { q: "How much protein should active people eat daily?", opts: ["0.8g/kg", "1.2g/kg", "2g/kg (1g/lb)", "3.0g/kg"], correct: 2, exp: "Dr. Peter Attia and longevity experts recommend 2g/kg (1g/lb) for optimal muscle health and aging!" },
        { q: "What happens when you don't eat enough protein?", opts: ["Nothing changes", "Muscle loss and metabolic decline", "Better health", "More energy"], correct: 1, exp: "Inadequate protein leads to muscle loss and metabolic dysfunction - the opposite of healthy aging!" }
      ],
      [
        { q: "The thermic effect of protein is approximately?", opts: ["5%", "15%", "25-30%", "50%"], correct: 2, exp: "Protein burns 25-30% of its calories during digestion - a built-in metabolism booster!" },
        { q: "Which amino acid is most important for muscle building?", opts: ["Leucine", "Glycine", "Alanine", "Proline"], correct: 0, exp: "Leucine triggers muscle protein synthesis - the muscle building switch that keeps you strong!" }
      ],
      [
        { q: "How soon after a workout should women eat protein?", opts: ["Within 6 hours", "Within 30 minutes", "Next day", "Doesn't matter"], correct: 1, exp: "Dr. Stacy Sims' research shows women need protein within 30 minutes post-workout - we process it differently than men!" },
        { q: "Why is muscle mass especially important as we age?", opts: ["Looks good", "Prevents falls and disease", "Uses more clothes", "Makes you taller"], correct: 1, exp: "More muscle = fewer falls, better metabolism, and protection from chronic disease. It's your longevity organ!" }
      ],
      [
        { q: "The current RDA for protein (0.8g/kg) is considered by experts to be?", opts: ["Perfect", "Too high", "Survival minimum only", "Only for athletes"], correct: 2, exp: "Dr. Attia and other longevity experts call the RDA 'a joke' - it's survival level, not thriving level!" },
        { q: "Complete proteins contain all essential what?", opts: ["Vitamins", "Amino acids", "Minerals", "Carbs"], correct: 1, exp: "Complete proteins have all 9 essential amino acids your body can't make - like a perfect construction kit!" }
      ],
      [
        { q: "Which protein source has the highest biological value?", opts: ["Rice", "Beans", "Eggs", "Wheat"], correct: 2, exp: "Eggs score 100 on biological value - the gold standard that all other proteins are measured against!" },
        { q: "Protein needs increase most with which factor?", opts: ["Age only", "Activity level", "Gender only", "Hair color"], correct: 1, exp: "Physical activity dramatically increases protein needs - active people need way more than couch potatoes!" }
      ],
      [
        { q: "According to longevity research, muscle mass is inversely related to?", opts: ["Intelligence", "Height", "Death from any cause", "Hair color"], correct: 2, exp: "More muscle = lower risk of death from any cause. This is why experts call muscle the organ of longevity!" },
        { q: "Casein protein is absorbed how compared to whey?", opts: ["Faster", "Same speed", "Slower and steadier", "Not absorbed"], correct: 2, exp: "Casein provides slow, steady amino acid release for hours - perfect for overnight muscle recovery!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "Dr. Gabrielle Lyon's 'muscle-centric medicine' focuses on?", opts: ["Losing fat only", "Building muscle first", "Counting calories", "Avoiding exercise"], correct: 1, exp: "Lyon revolutionized medicine by focusing on muscle as the key to metabolic health, not just fat loss!" },
        { q: "What percentage less meat does Arnold eat now vs. his bodybuilding days?", opts: ["20%", "50%", "80%", "100%"], correct: 2, exp: "Arnold now eats 80% less meat but still prioritizes protein from eggs, fish, and plant sources!" }
      ],
      [
        { q: "Muscle protein synthesis peaks how long after protein intake?", opts: ["30 min", "1-2 hours", "6 hours", "24 hours"], correct: 1, exp: "Muscle protein synthesis peaks 1-2 hours after eating protein - timing matters for muscle building!" },
        { q: "The leucine threshold for maximizing muscle protein synthesis is?", opts: ["1g", "2.5g", "5g", "10g"], correct: 1, exp: "About 2.5g leucine per meal maximally stimulates muscle protein synthesis - quality matters!" }
      ],
      [
        { q: "Which method measures real-world protein needs in humans?", opts: ["Chemical score", "PDCAAS", "IAAO", "PER"], correct: 2, exp: "IAAO (Indicator Amino Acid Oxidation) measures actual protein requirements in living humans!" },
        { q: "Sarcopenia (muscle loss) begins at approximately what age?", opts: ["25", "35", "45", "55"], correct: 1, exp: "Muscle mass peaks around 30, then we lose 3-8% per decade after 35 - start building now!" }
      ],
      [
        { q: "Protein quality becomes less critical when daily intake exceeds?", opts: ["0.8g/kg", "1.2g/kg", "1.6g/kg", "2.0g/kg"], correct: 2, exp: "Above 1.6g/kg daily, even lower-quality proteins provide adequate amino acids - quantity wins!" },
        { q: "The anabolic resistance of aging affects what primarily?", opts: ["Protein absorption", "mTOR sensitivity", "Amino acid transport", "All of these"], correct: 3, exp: "Aging reduces sensitivity to protein's muscle-building signals at multiple levels - why we need more!" }
      ],
      [
        { q: "Post-workout protein timing matters most within?", opts: ["10 minutes", "30 minutes for women", "6 hours", "1 week"], correct: 1, exp: "Dr. Sims shows women especially need protein within 30 minutes due to hormonal differences!" },
        { q: "Which has higher leucine content per serving?", opts: ["Soy protein", "Whey protein", "Rice protein", "Pea protein"], correct: 1, exp: "Whey protein contains ~14% leucine - the highest natural concentration for muscle building!" }
      ],
      [
        { q: "The 'muscle full effect' duration is approximately?", opts: ["90 min", "3 hours", "6 hours", "12 hours"], correct: 1, exp: "Muscle protein synthesis stays elevated ~3 hours per protein dose - spread it out!" },
        { q: "Protein turnover in healthy adults is approximately?", opts: ["100g/day", "300g/day", "500g/day", "1000g/day"], correct: 1, exp: "We break down and rebuild about 300g of protein daily - constant renovation needs fuel!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "What percentage of Americans increased protein intake in 2024?", opts: ["30%", "48%", "61%", "75%"], correct: 2, exp: "61% of Americans increased protein intake in 2024, up from 48% in 2019 - the protein revolution is here!" },
        { q: "mTOR pathway is primarily activated by which amino acid?", opts: ["Leucine", "Isoleucine", "Valine", "Lysine"], correct: 0, exp: "Leucine directly activates mTOR (mechanistic target of rapamycin) - the master muscle growth regulator!" }
      ],
      [
        { q: "According to Arnold's current protein philosophy, quality vs quantity matters most when intake is?", opts: ["Very low", "Above 1.5g/kg", "Only at breakfast", "Never matters"], correct: 1, exp: "Arnold teaches that above 1.5g/kg daily, protein quantity trumps quality - just get enough!" },
        { q: "Dr. Gabrielle Lyon's 'protein pulsing' approach recommends how many grams per meal?", opts: ["10-15g", "25-30g", "45-50g", "100g"], correct: 2, exp: "Lyon recommends 45-50g protein per meal to maximize muscle protein synthesis - go big on protein!" }
      ],
      [
        { q: "The leucine trigger operates through which signaling complex?", opts: ["mTORC1", "mTORC2", "AMPK", "p70S6K1"], correct: 0, exp: "mTORC1 (mechanistic target of rapamycin complex 1) is leucine's primary target for muscle building!" },
        { q: "Protein synthetic efficiency declines with aging due to?", opts: ["Lower mTOR", "Amino acid transport", "Anabolic resistance", "All of these"], correct: 3, exp: "Multiple mechanisms contribute to age-related anabolic resistance - why protein needs increase!" }
      ],
      [
        { q: "AMPK activation during energy stress primarily?", opts: ["Increases protein synthesis", "Decreases protein synthesis", "Has no effect", "Only affects fat"], correct: 1, exp: "AMPK activation inhibits mTOR and muscle protein synthesis - stress blocks muscle building!" },
        { q: "Hormone-sensitive lipase is relevant to protein metabolism because?", opts: ["It breaks down protein", "It activates mTOR", "Muscle regulates fat metabolism", "It makes amino acids"], correct: 2, exp: "More muscle mass increases hormone-sensitive lipase activity, improving fat metabolism!" }
      ],
      [
        { q: "The protein RDA was based on which outdated method?", opts: ["mTOR studies", "Nitrogen balance", "IAAO", "Muscle biopsies"], correct: 1, exp: "Current protein RDA relies on nitrogen balance studies - now considered inadequate for optimal health!" },
        { q: "Dr. Peter Attia changed from promoting keto to emphasizing?", opts: ["More carbs", "Higher protein with flexibility", "Veganism only", "Fasting only"], correct: 1, exp: "Attia evolved to focus on higher protein intake with metabolic flexibility rather than rigid keto!" }
      ],
      [
        { q: "What does Dr. Stacy Sims say about women and fasted training?", opts: ["Always recommended", "Never train fasted", "Same as men", "Only on weekends"], correct: 1, exp: "Sims' research shows women should never train fasted - it disrupts hormones and metabolism!" },
        { q: "Current nutrition trends in 2025 emphasize which macronutrient most?", opts: ["Carbs", "Protein", "Sugar", "Alcohol"], correct: 1, exp: "2025 nutrition experts universally emphasize higher protein intake - it's the most important macro!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "Leucyl-tRNA synthetase acts as a sensor for which pathway?", opts: ["mTORC1", "AMPK", "p53", "NF-κB"], correct: 0, exp: "LeuRS (Leucyl-tRNA synthetase) functions as an intracellular leucine sensor for mTORC1 activation!" },
        { q: "The GATOR1 complex is inhibited by?", opts: ["Leucine directly", "Sestrin2", "CASTOR1", "Amino acid sufficiency"], correct: 3, exp: "Amino acid sensors (Sestrin2, CASTOR1) inhibit GATOR1 when amino acids are abundant for muscle building!" }
      ],
      [
        { q: "Dr. Lyon's research shows that muscle-centric medicine prevents?", opts: ["Only sarcopenia", "Metabolic dysfunction", "Only falls", "Just weakness"], correct: 1, exp: "Lyon's approach prevents metabolic syndrome, diabetes, and cardiovascular disease by focusing on muscle!" },
        { q: "The protein FNDC5/irisin is secreted by which tissue during exercise?", opts: ["Liver", "Muscle", "Fat", "Brain"], correct: 1, exp: "FNDC5 is cleaved from muscle to produce the myokine irisin - muscle talks to the whole body!" }
      ],
      [
        { q: "Sestrin2 protein binds which amino acid as a sensor?", opts: ["Arginine", "Leucine", "Methionine", "Lysine"], correct: 1, exp: "Leucine-bound Sestrin2 releases RagA/B, allowing mTORC1 lysosomal recruitment for muscle building!" },
        { q: "The integrated stress response affects protein synthesis via?", opts: ["mTOR inhibition", "eIF2α phosphorylation", "Ribosome biogenesis", "4E-BP1 binding"], correct: 1, exp: "ISR convergently phosphorylates eIF2α, globally reducing protein synthesis during stress!" }
      ],
      [
        { q: "CASTOR1 protein specifically senses which amino acid?", opts: ["Leucine", "Arginine", "Methionine", "Lysine"], correct: 1, exp: "CASTOR1 is a specific arginine sensor that regulates mTORC1 activity for muscle protein synthesis!" },
        { q: "The SCAP protein (SREBP cleavage-activating) functions as a?", opts: ["Transcription factor", "Sterol sensor", "Fatty acid sensor", "Amino acid sensor"], correct: 1, exp: "SCAP senses sterol levels and regulates SREBP processing - connecting nutrition to muscle building!" }
      ],
      [
        { q: "Translation initiation is regulated by which mTORC1 substrates?", opts: ["4E-BP1 only", "S6K1 only", "Both 4E-BP1 and S6K1", "Neither"], correct: 2, exp: "mTORC1 phosphorylates both 4E-BP1 (cap-dependent) and S6K1 (ribosome biogenesis) for protein synthesis!" },
        { q: "The KICSTOR complex functions as?", opts: ["Amino acid sensor", "Lysosomal anchor", "mTOR inhibitor", "Ribosome activator"], correct: 1, exp: "KICSTOR anchors GATOR1 to lysosomes for proper amino acid sensing and muscle protein synthesis!" }
      ],
      [
        { q: "Modern muscle-centric medicine views muscle as?", opts: ["Just for looks", "The longevity organ", "Unnecessary after 50", "Only for athletes"], correct: 1, exp: "Revolutionary doctors like Dr. Lyon prove muscle is your organ of longevity - the key to healthy aging!" },
        { q: "Arnold's evolved protein recommendations emphasize?", opts: ["Plant protein only", "Quantity over perfection", "Only whey isolate", "Minimal protein"], correct: 1, exp: "Arnold's philosophy: get enough protein consistently rather than obsessing over perfect sources!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = proteinQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      // Round complete
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = proteinQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Protein Mastery Complete!</h2>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-blue-800">{score}/{totalPossible}</div>
            <div className="text-lg text-blue-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{proteinQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">🥩 Protein Power</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// Smart Carbs Game with strategic, lower-carb approach
function CarbGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // Updated for strategic, lower-carb approach
  const carbQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      [
        { q: "Which is the smartest carb choice?", opts: ["Candy", "Berries", "White bread", "Soda"], correct: 1, exp: "Berries have antioxidants, fiber, and lower sugar impact - nature's perfect carb choice! 🫐" },
        { q: "When are carbs most useful?", opts: ["All day long", "Around workouts", "Never", "Only at night"], correct: 1, exp: "Strategic carb timing around workouts maximizes benefits while keeping intake controlled!" }
      ],
      [
        { q: "If you eat carbs, which gives you the most nutrition?", opts: ["White bread", "Colorful vegetables", "Candy", "Juice"], correct: 1, exp: "Colorful vegetables provide vitamins, minerals, and fiber - the smartest carb investment!" },
        { q: "What keeps you fuller longer?", opts: ["Bread alone", "Protein with vegetables", "Sugar", "Juice"], correct: 1, exp: "Protein with fibrous vegetables provides lasting satiety - the winning combination!" }
      ],
      [
        { q: "Which carb choice supports your gut health best?", opts: ["White rice", "Leafy greens", "Candy", "Soda"], correct: 1, exp: "Leafy greens feed beneficial gut bacteria while providing nutrients - double win!" },
        { q: "What happens when you eat too much sugar?", opts: ["Energy crash and hunger", "Steady energy", "Better health", "Muscle growth"], correct: 0, exp: "Sugar causes blood sugar spikes and crashes, leaving you hungry and tired!" }
      ],
      [
        { q: "If you're active, when should you time carbs?", opts: ["Random times", "Before and after exercise", "Only at breakfast", "Never"], correct: 1, exp: "Active people can use carbs strategically around workouts for performance and recovery!" },
        { q: "Which provides the most stable energy?", opts: ["Candy", "Protein with healthy fats", "White bread", "Juice"], correct: 1, exp: "Protein and healthy fats provide steady energy without blood sugar rollercoasters!" }
      ],
      [
        { q: "The healthiest carbs come with what?", opts: ["Added sugar", "Fiber and nutrients", "Artificial colors", "Nothing extra"], correct: 1, exp: "The best carbs come packaged by nature with fiber, vitamins, and minerals!" },
        { q: "How do vegetables compare to grains nutritionally?", opts: ["Much less nutrition", "Way more nutrition per carb", "Same nutrition", "No comparison"], correct: 1, exp: "Vegetables give you way more nutrition per gram of carb - better bang for your buck!" }
      ],
      [
        { q: "Which eating approach is gaining scientific support?", opts: ["High sugar", "Lower carb, higher protein", "All processed foods", "Candy-based"], correct: 1, exp: "Research increasingly supports lower-carb, higher-protein approaches for health and longevity!" },
        { q: "Smart carb timing means eating them when?", opts: ["All day", "When you can use them", "Never", "Only at night"], correct: 1, exp: "Eat carbs when your body can best use them - around activity and when insulin sensitivity is highest!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL
    [
      [
        { q: "The glycemic index measures how carbs affect what?", opts: ["Protein levels", "Blood sugar", "Hair growth", "Sleep quality"], correct: 1, exp: "GI measures blood sugar response - lower GI carbs create steadier energy levels!" },
        { q: "Which carb approach do longevity experts increasingly recommend?", opts: ["High carb, low fat", "Moderate carb, high protein", "All sugar", "Unlimited carbs"], correct: 1, exp: "Longevity experts like Dr. Attia emphasize moderate carbs with high protein for optimal health!" }
      ],
      [
        { q: "Insulin sensitivity is highest when?", opts: ["After sleeping", "After exercise", "When sedentary", "Never changes"], correct: 1, exp: "Post-exercise insulin sensitivity is highest - the best time for strategic carb intake!" },
        { q: "Which type of fiber helps control blood sugar?", opts: ["No fiber helps", "Soluble fiber", "Only supplements", "Artificial fiber"], correct: 1, exp: "Soluble fiber slows carb absorption, helping maintain steady blood sugar levels!" }
      ],
      [
        { q: "Dr. Peter Attia's current approach to carbs emphasizes?", opts: ["Unlimited carbs", "Strategic timing and quality", "Complete avoidance", "Only sugar"], correct: 1, exp: "Attia evolved from strict keto to strategic carb timing with emphasis on quality sources!" },
        { q: "Fructose is metabolized primarily where?", opts: ["Muscles", "Brain", "Liver", "Skin"], correct: 2, exp: "Fructose goes straight to the liver, potentially causing issues when consumed in excess!" }
      ],
      [
        { q: "The 'glucose disposal' effect is best after?", opts: ["Sitting all day", "Resistance training", "Sleeping", "Fasting"], correct: 1, exp: "Resistance training dramatically improves glucose uptake - muscles become glucose sponges!" },
        { q: "Which creates more stable energy?", opts: ["High GI carbs alone", "Low GI carbs with protein", "Pure sugar", "Juice"], correct: 1, exp: "Low GI carbs with protein provide the most stable, sustained energy release!" }
      ],
      [
        { q: "Continuous glucose monitors show that most people?", opts: ["Have perfect blood sugar", "Spike higher than expected", "Never change levels", "Only spike with protein"], correct: 1, exp: "CGMs reveal many people have significant blood sugar spikes from 'healthy' carbs!" },
        { q: "The dawn phenomenon affects blood sugar how?", opts: ["Lowers it at morning", "Raises it upon waking", "No effect", "Only at night"], correct: 1, exp: "Morning cortisol naturally raises blood sugar - why some people do better with lower-carb breakfasts!" }
      ],
      [
        { q: "Metabolic flexibility refers to the ability to?", opts: ["Only burn carbs", "Switch between fuel sources", "Only burn fat", "Never change"], correct: 1, exp: "Metabolic flexibility means efficiently switching between burning carbs and fats as needed!" },
        { q: "Which macronutrient combination optimizes satiety?", opts: ["Carbs alone", "Protein with fiber", "Sugar with fat", "Only fat"], correct: 1, exp: "Protein with fiber (from vegetables) provides maximum satiety and blood sugar stability!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "GLUT4 transporters are activated by?", opts: ["Only insulin", "Insulin and exercise", "Neither", "Only exercise"], correct: 1, exp: "Both insulin and exercise activate GLUT4 transporters - why post-workout carbs are strategic!" },
        { q: "The Randle cycle describes competition between?", opts: ["Protein and carbs", "Glucose and fatty acids", "Only carbs", "Only fats"], correct: 1, exp: "The glucose-fatty acid cycle: when one is burned, the other is inhibited - metabolic switching!" }
      ],
      [
        { q: "Insulin resistance primarily affects which tissues?", opts: ["Only brain", "Muscle and liver", "Only skin", "Only lungs"], correct: 1, exp: "Muscle and liver become resistant to insulin's glucose uptake signals - why carb tolerance varies!" },
        { q: "The brain's glucose requirement can be reduced by?", opts: ["Nothing", "Ketone production", "More carbs", "Less sleep"], correct: 1, exp: "The brain can use ketones for 60-70% of its energy needs, reducing glucose dependence!" }
      ],
      [
        { q: "Postprandial glucose spikes are concerning because they?", opts: ["Are normal", "Damage blood vessels", "Help health", "Improve metabolism"], correct: 1, exp: "High post-meal glucose spikes damage blood vessel walls and accelerate aging!" },
        { q: "The OGTT (oral glucose tolerance test) measures?", opts: ["Protein levels", "Glucose clearance ability", "Fat storage", "Sleep quality"], correct: 1, exp: "OGTT reveals how well your body handles a glucose load - metabolic health marker!" }
      ],
      [
        { q: "HbA1c reflects average blood sugar over?", opts: ["1 week", "1 month", "2-3 months", "1 year"], correct: 2, exp: "HbA1c shows 2-3 month average blood sugar - crucial longevity biomarker!" },
        { q: "Muscle glycogen can only be used by?", opts: ["Any tissue", "That muscle only", "Brain only", "Liver only"], correct: 1, exp: "Muscle glycogen stays local - why resistance training improves personal glucose disposal!" }
      ],
      [
        { q: "The incretin effect describes?", opts: ["Protein absorption", "Glucose-dependent insulin release", "Fat storage", "Sleep patterns"], correct: 1, exp: "Incretins cause glucose-dependent insulin release - smarter blood sugar management!" },
        { q: "Advanced glycation end products (AGEs) are formed by?", opts: ["Protein only", "High glucose with protein", "Fat only", "Water"], correct: 1, exp: "High glucose binds to proteins forming AGEs - why controlling blood sugar matters for aging!" }
      ],
      [
        { q: "Time-restricted eating affects glucose metabolism by?", opts: ["No effect", "Improving insulin sensitivity", "Worsening glucose control", "Only affecting sleep"], correct: 1, exp: "Time-restricted eating can improve insulin sensitivity and glucose metabolism in many people!" },
        { q: "The Somogyi effect describes?", opts: ["Normal glucose patterns", "Rebound hyperglycemia", "Improved metabolism", "Better sleep"], correct: 1, exp: "Low blood sugar triggers counter-regulatory hormones, causing rebound high glucose!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "AMPK activation during exercise affects glucose uptake how?", opts: ["Decreases uptake", "Increases uptake independently", "No effect", "Only with insulin"], correct: 1, exp: "AMPK activation during exercise increases glucose uptake independent of insulin - exercise as medicine!" },
        { q: "The glucose clamp technique measures?", opts: ["Blood pressure", "Insulin sensitivity directly", "Protein synthesis", "Fat oxidation"], correct: 1, exp: "Glucose clamp is the gold standard for measuring insulin sensitivity in research!" }
      ],
      [
        { q: "Chromium supplementation may help with?", opts: ["Protein synthesis", "Glucose metabolism", "Hair growth", "Sleep"], correct: 1, exp: "Chromium may enhance insulin action and improve glucose metabolism in some individuals!" },
        { q: "The glycemic variability index measures?", opts: ["Average glucose", "Blood sugar fluctuations", "Insulin levels", "Protein levels"], correct: 1, exp: "GVI measures glucose fluctuations - stability may be as important as averages for health!" }
      ],
      [
        { q: "Berberine affects glucose metabolism through?", opts: ["AMPK activation", "Insulin production", "Protein synthesis", "Fat storage"], correct: 0, exp: "Berberine activates AMPK, improving glucose uptake and insulin sensitivity naturally!" },
        { q: "The second meal effect describes how?", opts: ["Meals don't interact", "Previous meal affects next response", "Only breakfast matters", "Sleep affects meals"], correct: 1, exp: "Your previous meal can influence blood sugar response to the next meal!" }
      ],
      [
        { q: "Vinegar consumption before carbs may?", opts: ["Increase spikes", "Reduce glucose response", "Have no effect", "Increase appetite"], correct: 1, exp: "Vinegar can blunt post-meal glucose spikes by slowing gastric emptying!" },
        { q: "The dawn phenomenon is caused primarily by?", opts: ["Diet", "Cortisol and growth hormone", "Exercise", "Sleep"], correct: 1, exp: "Morning hormones like cortisol and growth hormone naturally raise glucose upon waking!" }
      ],
      [
        { q: "Resistant starch acts most like?", opts: ["Sugar", "Fiber", "Protein", "Fat"], correct: 1, exp: "Resistant starch resists digestion and feeds beneficial gut bacteria like fiber!" },
        { q: "The optimal HbA1c for longevity is considered to be?", opts: ["Above 6.5%", "5.0-5.4%", "Below 4.0%", "Above 7.0%"], correct: 1, exp: "Longevity experts suggest optimal HbA1c around 5.0-5.4% for healthspan!" }
      ],
      [
        { q: "CGM data shows individual responses to carbs are?", opts: ["Identical", "Highly variable", "Predictable", "Meaningless"], correct: 1, exp: "CGMs reveal dramatic individual differences in glucose response - personalized nutrition is key!" },
        { q: "Zone 2 training primarily burns which fuel?", opts: ["Only carbs", "Primarily fat", "Only protein", "No fuel"], correct: 1, exp: "Zone 2 cardio trains the body to efficiently burn fat, improving metabolic flexibility!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "The glucose transporter SGLT2 is targeted by diabetes drugs because it?", opts: ["Increases glucose uptake", "Causes glucose excretion", "Stores glucose", "Makes insulin"], correct: 1, exp: "SGLT2 inhibitors force glucose excretion through kidneys - glucose disposal without insulin!" },
        { q: "GLP-1 agonists affect glucose by?", opts: ["Increasing glucose production", "Glucose-dependent insulin release", "Blocking all insulin", "Storing more glucose"], correct: 1, exp: "GLP-1 agonists provide glucose-dependent insulin release - smart glucose management!" }
      ],
      [
        { q: "The glucose paradox in aging refers to?", opts: ["Glucose becoming helpful", "Higher glucose with lower glucose tolerance", "Perfect glucose control", "No glucose changes"], correct: 1, exp: "Aging often brings higher glucose levels despite declining glucose tolerance - metabolic paradox!" },
        { q: "Circadian rhythm affects glucose tolerance how?", opts: ["No effect", "Better tolerance in morning", "Random effects", "Only at night"], correct: 1, exp: "Glucose tolerance follows circadian rhythms - generally better in morning, worse at night!" }
      ],
      [
        { q: "The gut microbiome affects glucose metabolism through?", opts: ["No connection", "Short-chain fatty acid production", "Only fiber intake", "Sleep only"], correct: 1, exp: "Gut bacteria produce SCFAs that improve glucose metabolism and insulin sensitivity!" },
        { q: "Lactate can be converted back to glucose via?", opts: ["Cori cycle", "Krebs cycle", "Pentose pathway", "Beta oxidation"], correct: 0, exp: "The Cori cycle recycles lactate from muscles back to glucose in the liver!" }
      ],
      [
        { q: "Brown adipose tissue activation affects glucose by?", opts: ["Increasing glucose", "Improving glucose uptake", "Blocking glucose", "No effect"], correct: 1, exp: "Brown fat activation improves glucose uptake and insulin sensitivity!" },
        { q: "The brain's glucose requirement is approximately?", opts: ["20g/day", "60g/day", "120g/day", "200g/day"], correct: 2, exp: "The brain uses about 120g glucose daily - 20% of total energy expenditure!" }
      ],
      [
        { q: "Advanced glycation end products are reduced by?", opts: ["Higher glucose", "Lower glucose exposure", "More protein", "Less sleep"], correct: 1, exp: "Reducing glucose exposure and spikes minimizes AGE formation and aging!" },
        { q: "The ketone β-hydroxybutyrate can replace what percentage of brain glucose needs?", opts: ["0%", "30%", "60-70%", "100%"], correct: 2, exp: "Ketones can replace 60-70% of brain glucose needs, reducing glucose dependence!" }
      ],
      [
        { q: "Epigenetic modifications from high glucose affect?", opts: ["Nothing", "Gene expression patterns", "Only appearance", "Only exercise"], correct: 1, exp: "High glucose causes epigenetic changes that can affect gene expression and aging patterns!" },
        { q: "The glucose-fatty acid cycle is most important for?", opts: ["Sleep", "Metabolic flexibility", "Hair growth", "Hearing"], correct: 1, exp: "The Randle cycle enables metabolic flexibility - switching between glucose and fat burning!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = carbQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = carbQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Smart Carbs Mastery!</h2>
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-yellow-800">{score}/{totalPossible}</div>
            <div className="text-lg text-yellow-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{carbQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-yellow-500 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-600">🥬 Smart Carbs</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-yellow-50 hover:border-yellow-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// Healthy Fats Game with hormone and longevity focus
function FatGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // Updated for healthy fats, hormone production, and longevity focus
  const fatQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      [
        { q: "Which fat is best for your hormones?", opts: ["Trans fats", "Omega-3 fish oil", "Vegetable oil", "Margarine"], correct: 1, exp: "Omega-3s support hormone production and reduce inflammation - essential for health! 🐟" },
        { q: "Healthy fats help your body make what?", opts: ["Nothing important", "Hormones like testosterone", "Only hair", "Sugar"], correct: 1, exp: "Healthy fats are the building blocks for hormones like testosterone - crucial for muscle and health!" }
      ],
      [
        { q: "Which cooking fat is healthiest?", opts: ["Vegetable oil", "Olive oil", "Margarine", "Trans fat"], correct: 1, exp: "Olive oil is stable for cooking and provides heart-healthy monounsaturated fats!" },
        { q: "Avocados are good because they contain?", opts: ["Only sugar", "Healthy monounsaturated fats", "Trans fats", "No nutrients"], correct: 1, exp: "Avocados provide healthy fats that support hormone production and heart health! 🥑" }
      ],
      [
        { q: "Why do longevity experts recommend fish oil?", opts: ["It's expensive", "Omega-3s reduce inflammation", "It tastes bad", "No reason"], correct: 1, exp: "Dr. Peter Attia takes omega-3s daily because they fight inflammation and support brain health!" },
        { q: "Saturated fat from natural sources like coconut is?", opts: ["Always terrible", "Can be part of healthy diet", "Pure poison", "Only sugar"], correct: 1, exp: "Natural saturated fats can be part of a healthy diet when balanced with other healthy fats!" }
      ],
      [
        { q: "Which fat should you definitely avoid?", opts: ["Olive oil", "Avocado", "Trans fats", "Fish oil"], correct: 2, exp: "Trans fats damage your arteries and hormones - avoid at all costs!" },
        { q: "Nuts provide what type of beneficial fats?", opts: ["Trans fats", "Healthy fats and protein", "Only sugar", "Harmful fats"], correct: 1, exp: "Nuts give you healthy fats, protein, and minerals - a perfect longevity food! 🌰" }
      ],
      [
        { q: "Your brain is made mostly of what?", opts: ["Sugar", "Protein", "Healthy fats", "Water only"], correct: 2, exp: "Your brain is 60% fat - healthy fats are literally brain food!" },
        { q: "Which fat helps absorb vitamins A, D, E, and K?", opts: ["No fat needed", "Any dietary fat", "Only trans fat", "Only sugar"], correct: 1, exp: "Fat-soluble vitamins need dietary fat for absorption - another reason healthy fats matter!" }
      ],
      [
        { q: "Grass-fed butter vs margarine?", opts: ["Margarine is healthier", "Grass-fed butter is better", "Exactly the same", "Both are terrible"], correct: 1, exp: "Grass-fed butter provides vitamins A, K2, and healthy fats - margarine is processed!" },
        { q: "Which provides the most stable energy?", opts: ["Sugar alone", "Healthy fats with protein", "Candy", "Soda"], correct: 1, exp: "Healthy fats with protein provide steady, long-lasting energy without crashes!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL
    [
      [
        { q: "HDL cholesterol is considered?", opts: ["Bad cholesterol", "Good cholesterol", "Neutral", "Unimportant"], correct: 1, exp: "HDL carries cholesterol away from arteries to the liver - the cleanup crew!" },
        { q: "Omega-3 fats EPA and DHA come primarily from?", opts: ["Vegetables", "Fatty fish", "Sugar", "Grains"], correct: 1, exp: "Fatty fish provide EPA and DHA - the omega-3s most beneficial for health!" }
      ],
      [
        { q: "Which fat ratio is ideal for health?", opts: ["High omega-6, low omega-3", "Balanced omega-6 to omega-3", "Only omega-6", "No omega fats"], correct: 1, exp: "Modern diets have too much omega-6; aim for better balance with omega-3s!" },
        { q: "Healthy fats help with what besides energy?", opts: ["Nothing", "Hormone production", "Only taste", "Making you sick"], correct: 1, exp: "Fats are essential for making steroid hormones like testosterone and estrogen!" }
      ],
      [
        { q: "The Mediterranean diet emphasizes which fats?", opts: ["Trans fats", "Olive oil and fish", "Margarine", "Processed oils"], correct: 1, exp: "Mediterranean diet's health benefits come largely from olive oil and omega-3 rich fish!" },
        { q: "Cholesterol in food affects blood cholesterol how?", opts: ["Dramatically increases it", "Minimally for most people", "Always decreases it", "No relationship"], correct: 1, exp: "For most people, dietary cholesterol has minimal impact on blood cholesterol!" }
      ],
      [
        { q: "MCT oil (medium-chain triglycerides) is special because?", opts: ["It's processed differently", "It's exactly like other fats", "It's harmful", "It has no calories"], correct: 0, exp: "MCTs are rapidly absorbed and can be used for quick energy - bypassing normal fat digestion!" },
        { q: "Which cooking method preserves healthy fats best?", opts: ["Deep frying", "Low-heat cooking", "Extreme heat", "Microwaving"], correct: 1, exp: "Low heat preserves delicate omega-3s and prevents formation of harmful compounds!" }
      ],
      [
        { q: "Conjugated linoleic acid (CLA) is found in?", opts: ["Vegetable oils", "Grass-fed animal products", "Sugar", "Processed foods"], correct: 1, exp: "Grass-fed meat and dairy provide CLA, which may support body composition!" },
        { q: "The brain's preferred fuel during fasting becomes?", opts: ["Sugar only", "Ketones from fat", "Protein only", "Nothing"], correct: 1, exp: "During fasting, the brain efficiently uses ketones produced from fat breakdown!" }
      ],
      [
        { q: "Which fat type is most stable for high-heat cooking?", opts: ["Polyunsaturated", "Monounsaturated", "Trans fat", "Omega-3"], correct: 1, exp: "Monounsaturated fats like olive oil are stable for cooking without oxidizing!" },
        { q: "Dr. Attia recommends omega-3 supplementation because?", opts: ["It's trendy", "Most people don't eat enough fish", "It's expensive", "No reason"], correct: 1, exp: "Attia notes most people need EPA/DHA supplements unless eating lots of fatty fish!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "Lipoprotein lipase (LPL) functions to?", opts: ["Make cholesterol", "Break down triglycerides", "Synthesize hormones", "Store protein"], correct: 1, exp: "LPL breaks down triglycerides in lipoproteins for tissue uptake - key fat metabolism enzyme!" },
        { q: "The rate-limiting enzyme in cholesterol synthesis is?", opts: ["LPL", "HMG-CoA reductase", "Fatty acid synthase", "ACC"], correct: 1, exp: "HMG-CoA reductase controls cholesterol synthesis - target of statin drugs!" }
      ],
      [
        { q: "Bile acids are synthesized from?", opts: ["Fatty acids", "Cholesterol", "Proteins", "Carbs"], correct: 1, exp: "The liver converts cholesterol to bile acids for fat digestion - cholesterol elimination pathway!" },
        { q: "Brown adipose tissue burns fat to produce?", opts: ["Protein", "Heat", "Sugar", "Muscle"], correct: 1, exp: "Brown fat burns calories specifically to generate heat - metabolic furnace!" }
      ],
      [
        { q: "The committed step of fat synthesis is catalyzed by?", opts: ["Acetyl-CoA carboxylase", "Fatty acid synthase", "LPL", "HMG-CoA reductase"], correct: 0, exp: "ACC controls the first committed step in fatty acid biosynthesis!" },
        { q: "Chylomicrons transport dietary fats to?", opts: ["Liver only", "Muscle only", "All tissues", "Kidneys only"], correct: 2, exp: "Chylomicrons deliver dietary fats throughout the body after fat absorption!" }
      ],
      [
        { q: "Hormone-sensitive lipase is activated by?", opts: ["Insulin", "Glucagon and epinephrine", "Food", "Sleep"], correct: 1, exp: "Stress hormones activate HSL to release stored fat for energy!" },
        { q: "Peroxisomal β-oxidation specializes in?", opts: ["Short-chain fats", "Very long-chain fats", "Medium-chain fats", "No fats"], correct: 1, exp: "Peroxisomes handle very long-chain fatty acids that mitochondria can't process!" }
      ],
      [
        { q: "VLDL particles are assembled in the?", opts: ["Intestine", "Liver", "Muscle", "Brain"], correct: 1, exp: "The liver packages endogenous fats into VLDL for transport to tissues!" },
        { q: "The scavenger receptor SR-B1 mediates uptake of?", opts: ["LDL", "VLDL", "HDL cholesterol", "Chylomicrons"], correct: 2, exp: "SR-B1 allows selective uptake of cholesterol from HDL particles!" }
      ],
      [
        { q: "Malonyl-CoA's primary function is to?", opts: ["Activate fat burning", "Inhibit fat oxidation during synthesis", "Store protein", "Make glucose"], correct: 1, exp: "Malonyl-CoA prevents fat burning when the body is making fat - metabolic coordination!" },
        { q: "The Mediterranean diet's benefits are attributed to?", opts: ["High carbs", "Olive oil and omega-3s", "Processed foods", "Sugar"], correct: 1, exp: "Research shows Mediterranean diet benefits come from healthy fat sources!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "SREBP-1c primarily regulates?", opts: ["Cholesterol synthesis", "Fatty acid synthesis", "Protein synthesis", "Glucose metabolism"], correct: 1, exp: "SREBP-1c is the master transcriptional regulator of fatty acid synthesis!" },
        { q: "PPARα activation primarily promotes?", opts: ["Fat storage", "Fat oxidation", "Glucose storage", "Protein breakdown"], correct: 1, exp: "PPARα turns on genes for fatty acid oxidation, especially during fasting!" }
      ],
      [
        { q: "The cholesterol ester transfer protein (CETP) transfers lipids between?", opts: ["Cells", "Different lipoproteins", "Organs", "Tissues"], correct: 1, exp: "CETP moves cholesteryl esters and triglycerides between lipoproteins!" },
        { q: "Adipose triglyceride lipase (ATGL) catalyzes?", opts: ["Fat storage", "Initial fat breakdown", "Cholesterol synthesis", "Protein synthesis"], correct: 1, exp: "ATGL is rate-limiting for the first step of triglyceride hydrolysis!" }
      ],
      [
        { q: "The microsomal triglyceride transfer protein (MTP) is essential for?", opts: ["Fat absorption", "Lipoprotein assembly", "Hormone synthesis", "Muscle building"], correct: 1, exp: "MTP is required for assembling apoB-containing lipoproteins!" },
        { q: "PCSK9 protein functions to?", opts: ["Increase LDL receptors", "Degrade LDL receptors", "Make cholesterol", "Burn fat"], correct: 1, exp: "PCSK9 promotes LDL receptor degradation, raising blood cholesterol!" }
      ],
      [
        { q: "Fatty acid synthase produces which fatty acid as its primary product?", opts: ["Oleic acid", "Palmitic acid", "Stearic acid", "Linoleic acid"], correct: 1, exp: "FAS synthesizes palmitic acid (16:0) as the primary end product!" },
        { q: "The protein FGF21 is released during fasting and promotes?", opts: ["Fat storage", "Fat oxidation", "Glucose storage", "Muscle breakdown"], correct: 1, exp: "FGF21 promotes fat oxidation and glucose sparing during fasting states!" }
      ],
      [
        { q: "Insulin's effect on fat metabolism primarily?", opts: ["Promotes fat burning", "Promotes fat storage", "Has no effect", "Only affects cholesterol"], correct: 1, exp: "Insulin promotes fat storage and inhibits fat burning - the storage hormone!" },
        { q: "The enzyme DGAT catalyzes?", opts: ["Fat breakdown", "Final step of fat synthesis", "Cholesterol synthesis", "Protein synthesis"], correct: 1, exp: "DGAT catalyzes the final committed step in triglyceride biosynthesis!" }
      ],
      [
        { q: "Cold exposure activates brown fat through?", opts: ["Insulin signaling", "Sympathetic nervous system", "Growth hormone", "Cortisol"], correct: 1, exp: "Cold activates sympathetic nerves, releasing norepinephrine to activate brown fat!" },
        { q: "The longevity benefits of omega-3s include?", opts: ["Increased inflammation", "Reduced inflammation", "No benefits", "Only taste"], correct: 1, exp: "Omega-3s reduce chronic inflammation, a key driver of aging and disease!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "The SREBP cleavage-activating protein (SCAP) functions as a?", opts: ["Fat sensor", "Sterol sensor", "Protein sensor", "Sugar sensor"], correct: 1, exp: "SCAP senses cellular sterol levels and regulates SREBP processing accordingly!" },
        { q: "Beige adipocytes differ from brown adipocytes in their?", opts: ["Function", "Developmental origin", "Location", "All of these"], correct: 3, exp: "Beige fat can be recruited from white fat and has different origins than brown fat!" }
      ],
      [
        { q: "The protein CIDEA in brown fat enhances?", opts: ["Fat storage", "Thermogenesis", "Glucose uptake", "Protein synthesis"], correct: 1, exp: "CIDEA promotes lipid droplet formation and enhances thermogenic capacity!" },
        { q: "Fatty acid binding proteins (FABPs) primarily?", opts: ["Synthesize fat", "Transport fat within cells", "Break down fat", "Store fat"], correct: 1, exp: "FABPs transport fatty acids within cells and may regulate gene expression!" }
      ],
      [
        { q: "The G0/G1 switch gene 2 (G0S2) protein?", opts: ["Activates fat breakdown", "Inhibits ATGL", "Promotes fat synthesis", "Has no function"], correct: 1, exp: "G0S2 is a potent inhibitor of adipose triglyceride lipase!" },
        { q: "Stearoyl-CoA desaturase-1 (SCD1) introduces?", opts: ["The first double bond", "Only saturated bonds", "Protein modifications", "Sugar groups"], correct: 0, exp: "SCD1 introduces the first double bond at the Δ9 position in fatty acids!" }
      ],
      [
        { q: "The ATP-binding cassette transporters ABCA1 and ABCG1 facilitate?", opts: ["Fat storage", "Cholesterol efflux", "Glucose transport", "Protein transport"], correct: 1, exp: "ABC transporters mediate cholesterol efflux from cells to HDL particles!" },
        { q: "Perilipins coat lipid droplets to?", opts: ["Promote uncontrolled breakdown", "Regulate lipolysis", "Store protein", "Make glucose"], correct: 1, exp: "Perilipins control access of lipases to stored triglycerides!" }
      ],
      [
        { q: "The liver X receptors (LXRs) are activated by?", opts: ["Fatty acids", "Oxysterols", "Glucose", "Proteins"], correct: 1, exp: "LXRs are activated by oxysterols and regulate cholesterol homeostasis!" },
        { q: "Acetyl-CoA carboxylase has how many major isoforms?", opts: ["1", "2", "3", "4"], correct: 1, exp: "ACC1 (cytosolic) and ACC2 (mitochondrial) have different metabolic roles!" }
      ],
      [
        { q: "The endoplasmic reticulum stress response affects lipid metabolism by?", opts: ["Only activating synthesis", "Only suppressing synthesis", "Complex regulation", "No effect"], correct: 2, exp: "ER stress can both activate certain lipid pathways and suppress others!" },
        { q: "Modern longevity experts emphasize healthy fats because they?", opts: ["Taste good only", "Support hormone production and reduce inflammation", "Are trendy", "Have no benefits"], correct: 1, exp: "Healthy fats are essential for hormone production, brain health, and fighting inflammation!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = fatQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = fatQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Healthy Fats Mastery!</h2>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-green-800">{score}/{totalPossible}</div>
            <div className="text-lg text-green-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{fatQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-green-600 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">🥑 Healthy Fats</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-green-50 hover:border-green-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// I'll continue with the other games - Alcohol, TDEE, and Calories with the same expert-based approach
// For brevity, I'll include the structure but focus on key examples

// Liquid Truth Game - Updated with longevity focus
function AlcoholGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // Updated with expert views on alcohol and longevity
  const alcoholQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      [
        { q: "How does alcohol affect your muscle building?", opts: ["Helps muscle growth", "Hurts muscle building", "No effect", "Only helps"], correct: 1, exp: "Alcohol disrupts protein synthesis and muscle recovery - bad news for gains! 💪" },
        { q: "Dr. Peter Attia's view on alcohol for longevity?", opts: ["Great for health", "Net negative", "Essential nutrient", "No opinion"], correct: 1, exp: "Dr. Attia considers alcohol a net negative for longevity despite some studies showing benefits." }
      ],
      [
        { q: "How many drinks per week does Arnold suggest max?", opts: ["Unlimited", "7 or fewer", "20+", "Never drinks"], correct: 1, exp: "Arnold limits alcohol to no more than 3 times per week and stays under 7 drinks total!" },
        { q: "Alcohol affects your sleep by?", opts: ["Improving deep sleep", "Disrupting sleep quality", "No effect on sleep", "Only helping"], correct: 1, exp: "Alcohol fragments sleep and reduces REM sleep - terrible for recovery!" }
      ],
      [
        { q: "One beer has about how many calories?", opts: ["50", "150", "300", "500"], correct: 1, exp: "Regular beer has ~150 calories with zero protein - empty calories that don't help your goals!" },
        { q: "Alcohol is processed by which organ that's also important for metabolism?", opts: ["Heart", "Liver", "Brain", "Muscle"], correct: 1, exp: "Your liver processes alcohol, but it's also crucial for protein metabolism and glucose control!" }
      ],
      [
        { q: "When you drink alcohol, your body burns it?", opts: ["Last", "First", "Never", "With other fuels"], correct: 1, exp: "Your body prioritizes burning alcohol over fat and carbs - stalling fat loss!" },
        { q: "Alcohol provides how many calories per gram?", opts: ["4", "7", "9", "0"], correct: 1, exp: "Alcohol has 7 calories per gram - almost as much as fat but with no nutritional value!" }
      ],
      [
        { q: "For muscle recovery, alcohol is?", opts: ["Very helpful", "Harmful", "Essential", "The best choice"], correct: 1, exp: "Alcohol impairs muscle protein synthesis and recovery - the opposite of what athletes need!" },
        { q: "If you drink, longevity experts suggest?", opts: ["Drink more", "Drink mindfully and limit", "Never limit", "Drink daily"], correct: 1, exp: "If you choose to drink, do it mindfully and keep it minimal for health!" }
      ],
      [
        { q: "Red wine's 'health benefits' are outweighed by?", opts: ["Nothing", "Alcohol's negative effects", "Positive effects", "Taste"], correct: 1, exp: "Any benefits of compounds in red wine are outweighed by alcohol's negative health impacts!" },
        { q: "Alcohol and protein synthesis?", opts: ["Work great together", "Don't mix well", "Are the same thing", "Both build muscle"], correct: 1, exp: "Alcohol significantly impairs protein synthesis - bad for building and maintaining muscle!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL
    [
      [
        { q: "Blood alcohol content (BAC) affects protein synthesis at what level?", opts: ["Only when drunk", "Even at low levels", "Never affected", "Only helps"], correct: 1, exp: "Even moderate alcohol levels can impair muscle protein synthesis for 24+ hours!" },
        { q: "Alcohol's impact on testosterone is?", opts: ["Increases it", "Decreases it", "No effect", "Only increases"], correct: 1, exp: "Alcohol suppresses testosterone production - crucial for muscle building in both men and women!" }
      ],
      [
        { q: "The enzyme that breaks down alcohol is?", opts: ["Pepsin", "Alcohol dehydrogenase", "Amylase", "Lipase"], correct: 1, exp: "Alcohol dehydrogenase (ADH) processes alcohol, but gets overwhelmed easily!" },
        { q: "Alcohol interferes with which sleep stage most?", opts: ["Light sleep", "REM sleep", "All stages equally", "Doesn't affect sleep"], correct: 1, exp: "Alcohol severely disrupts REM sleep - crucial for recovery and muscle growth!" }
      ],
      [
        { q: "For athletes, alcohol consumption should be?", opts: ["Encouraged", "Minimized or avoided", "Unlimited", "Required"], correct: 1, exp: "Athletes serious about performance minimize alcohol due to its impact on recovery and gains!" },
        { q: "Alcohol calories are metabolized how compared to other macros?", opts: ["Same as protein", "Prioritized over fat burning", "Last", "Not metabolized"], correct: 1, exp: "Your body burns alcohol first, stopping fat burning until alcohol is cleared!" }
      ],
      [
        { q: "The 'muscle-wasting' effect of alcohol occurs through?", opts: ["Improved protein synthesis", "Decreased protein synthesis", "No mechanism", "Only building muscle"], correct: 1, exp: "Alcohol directly impairs the mTOR pathway and muscle protein synthesis!" },
        { q: "Alcohol's effect on inflammation is?", opts: ["Reduces all inflammation", "Increases systemic inflammation", "No effect", "Only positive"], correct: 1, exp: "Chronic alcohol consumption increases systemic inflammation - bad for longevity!" }
      ],
      [
        { q: "Recovery from exercise is impacted by alcohol for?", opts: ["1 hour", "24-48 hours", "1 week", "No impact"], correct: 1, exp: "Alcohol can impair recovery processes for 24-48 hours after consumption!" },
        { q: "Alcohol's impact on growth hormone release?", opts: ["Increases it", "Suppresses it", "No effect", "Only improves"], correct: 1, exp: "Alcohol suppresses growth hormone release during sleep - crucial for recovery!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "Chronic alcohol consumption affects muscle protein synthesis via?", opts: ["mTOR pathway inhibition", "Increased protein synthesis", "No effect", "Only positive effects"], correct: 0, exp: "Alcohol inhibits the mTOR pathway - the master regulator of muscle protein synthesis!" },
        { q: "The 'French Paradox' is better explained by?", opts: ["Red wine benefits", "Lifestyle factors", "Alcohol benefits", "Genetics only"], correct: 1, exp: "The French Paradox is likely due to lifestyle, not alcohol - confounding factors matter!" }
      ],
      [
        { q: "Alcohol's effect on mitochondrial function is?", opts: ["Improves function", "Impairs function", "No effect", "Only positive"], correct: 1, exp: "Alcohol impairs mitochondrial function - reducing your cellular power plants' efficiency!" },
        { q: "Acetaldehyde, alcohol's toxic metabolite, causes?", opts: ["Health benefits", "Cellular damage", "Muscle growth", "Better sleep"], correct: 1, exp: "Acetaldehyde is highly toxic and causes much of alcohol's damage to tissues!" }
      ],
      [
        { q: "Alcohol's impact on autophagy (cellular cleanup) is?", opts: ["Enhances autophagy", "Impairs autophagy", "No effect", "Only positive"], correct: 1, exp: "Alcohol impairs autophagy - your cells' ability to clean up damaged components!" },
        { q: "The 'hormetic effect' claimed for alcohol is?", opts: ["Well-proven", "Controversial and questionable", "Definitely true", "Required for health"], correct: 1, exp: "Claims of alcohol's hormetic benefits are controversial and likely outweighed by harms!" }
      ],
      [
        { q: "Alcohol's effect on lean body mass over time?", opts: ["Increases muscle", "Decreases muscle mass", "No effect", "Only builds muscle"], correct: 1, exp: "Chronic alcohol consumption is associated with decreased lean body mass and strength!" },
        { q: "The enzyme CYP2E1 is induced by alcohol and produces?", opts: ["Beneficial compounds", "Reactive oxygen species", "Protein", "Healthy metabolites"], correct: 1, exp: "CYP2E1 produces harmful reactive oxygen species - contributing to alcohol's damage!" }
      ],
      [
        { q: "Alcohol's impact on muscle protein breakdown is?", opts: ["Decreases breakdown", "Increases breakdown", "No effect", "Only positive"], correct: 1, exp: "Alcohol increases muscle protein breakdown while decreasing synthesis - double negative!" },
        { q: "The 'safe' amount of alcohol according to longevity research?", opts: ["2-3 drinks daily", "Moderate amounts", "Minimal to none", "Unlimited"], correct: 2, exp: "Latest longevity research suggests minimal alcohol intake is best for healthspan!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "Alcohol affects the IGF-1/mTOR pathway by?", opts: ["Enhancing signaling", "Disrupting signaling", "No effect", "Only improving"], correct: 1, exp: "Alcohol disrupts IGF-1 and mTOR signaling - key pathways for muscle maintenance!" },
        { q: "The molecular mechanism of alcohol's sleep disruption involves?", opts: ["GABA enhancement", "REM sleep fragmentation", "Better sleep quality", "No mechanisms"], correct: 1, exp: "Alcohol fragments REM sleep through complex neurotransmitter disruptions!" }
      ],
      [
        { q: "Alcohol's effect on testosterone synthesis occurs through?", opts: ["Enhanced production", "Inhibition of steroidogenesis", "No effect", "Only increases"], correct: 1, exp: "Alcohol directly inhibits the enzymes involved in testosterone synthesis!" },
        { q: "The gut-liver-muscle axis is affected by alcohol how?", opts: ["Only positively", "Through increased intestinal permeability", "No effect", "Only benefits"], correct: 1, exp: "Alcohol increases gut permeability, affecting the gut-liver-muscle communication!" }
      ],
      [
        { q: "Alcohol's impact on exercise-induced protein synthesis?", opts: ["Enhances the response", "Blunts the response", "No effect", "Only improves"], correct: 1, exp: "Alcohol consumption post-exercise blunts the normal protein synthesis response!" },
        { q: "The epigenetic effects of alcohol include?", opts: ["Positive gene expression", "Altered DNA methylation", "No effects", "Only benefits"], correct: 1, exp: "Alcohol causes epigenetic changes that can affect gene expression patterns!" }
      ],
      [
        { q: "Alcohol's interaction with circadian rhythms affects?", opts: ["Only sleep timing", "Multiple physiological processes", "Nothing", "Only benefits"], correct: 1, exp: "Alcohol disrupts circadian biology, affecting multiple systems including muscle recovery!" },
        { q: "The 'binge drinking' threshold is concerning because it?", opts: ["Is healthy", "Causes acute muscle damage", "Has no effects", "Only helps"], correct: 1, exp: "Binge drinking can cause acute muscle damage and severely impair protein synthesis!" }
      ],
      [
        { q: "Alcohol's effect on satellite cell activation (muscle repair) is?", opts: ["Enhances repair", "Impairs muscle repair", "No effect", "Only positive"], correct: 1, exp: "Alcohol impairs satellite cell activation - crucial for muscle repair and growth!" },
        { q: "The current scientific consensus on alcohol for longevity?", opts: ["Essential for health", "Minimal amounts best", "More is better", "Required daily"], correct: 1, exp: "Current longevity science supports minimal alcohol consumption for optimal healthspan!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "Alcohol's effect on the unfolded protein response (UPR) in muscle?", opts: ["Improves protein folding", "Triggers ER stress", "No effect", "Only beneficial"], correct: 1, exp: "Alcohol triggers ER stress and the UPR, impairing muscle protein quality control!" },
        { q: "The interaction between alcohol and mTORC1 involves?", opts: ["Direct activation", "Inhibition via multiple pathways", "No interaction", "Only enhancement"], correct: 1, exp: "Alcohol inhibits mTORC1 through multiple mechanisms including AMPK activation!" }
      ],
      [
        { q: "Alcohol's impact on muscle stem cell function?", opts: ["Enhances function", "Impairs regenerative capacity", "No effect", "Only improves"], correct: 1, exp: "Alcohol impairs muscle stem cell function, reducing regenerative capacity with aging!" },
        { q: "The molecular clock disruption by alcohol affects?", opts: ["Only sleep", "Metabolic gene expression", "Nothing", "Only benefits"], correct: 1, exp: "Alcohol disrupts circadian gene expression, affecting metabolic processes!" }
      ],
      [
        { q: "Alcohol's effect on muscle protein ubiquitination?", opts: ["Decreases breakdown", "Increases protein degradation", "No effect", "Only protective"], correct: 1, exp: "Alcohol increases muscle protein ubiquitination, marking proteins for degradation!" },
        { q: "The gut microbiome changes from alcohol affect muscle through?", opts: ["No connection", "Systemic inflammation", "Only benefits", "Direct muscle growth"], correct: 1, exp: "Alcohol-induced gut dysbiosis creates systemic inflammation affecting muscle health!" }
      ],
      [
        { q: "Alcohol's interaction with exercise-induced autophagy?", opts: ["Enhances autophagy", "Impairs cellular cleanup", "No effect", "Only beneficial"], correct: 1, exp: "Alcohol impairs exercise-induced autophagy, reducing cellular quality control!" },
        { q: "The redox imbalance caused by alcohol metabolism affects muscle via?", opts: ["Improved function", "Oxidative damage", "No effect", "Only protection"], correct: 1, exp: "Alcohol metabolism creates oxidative stress, damaging muscle proteins and membranes!" }
      ],
      [
        { q: "Alcohol's effect on muscle-derived exosomes (communication)?", opts: ["Improves signaling", "Disrupts cell communication", "No effect", "Only enhances"], correct: 1, exp: "Alcohol disrupts muscle-derived exosome signaling, affecting tissue communication!" },
        { q: "The longevity expert consensus on alcohol consumption?", opts: ["Drink more", "Minimize for optimal health", "Essential for longevity", "Unlimited amounts"], correct: 1, exp: "Longevity experts like Attia conclude alcohol should be minimized for optimal healthspan!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = alcoholQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = alcoholQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Liquid Truth Mastery!</h2>
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-purple-800">{score}/{totalPossible}</div>
            <div className="text-lg text-purple-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{alcoholQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-purple-600 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-600">🍷 Liquid Truth</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// Metabolic Reality Game - Updated with muscle-centric metabolism
function TDEEGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // Updated with muscle-centric metabolism and expert insights
  const tdeeQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      [
        { q: "What burns the most calories in your body daily?", opts: ["Exercise", "Just staying alive (BMR)", "Walking", "Thinking"], correct: 1, exp: "Your basic metabolism burns 60-70% of daily calories - even more important than exercise! 🔥" },
        { q: "Which tissue burns the most calories at rest?", opts: ["Fat tissue", "Muscle tissue", "Bone", "Hair"], correct: 1, exp: "Muscle is metabolically active - more muscle = higher metabolism all day long!" }
      ],
      [
        { q: "Dr. Gabrielle Lyon says the key to metabolism is?", opts: ["Eating less", "Building muscle", "Only cardio", "Avoiding food"], correct: 1, exp: "Lyon's muscle-centric approach: build muscle to boost metabolism and health!" },
        { q: "Each pound of muscle burns approximately how many calories daily?", opts: ["1-2", "6-10", "50", "100"], correct: 1, exp: "Each pound of muscle burns 6-10 calories daily at rest - passive calorie burning!" }
      ],
      [
        { q: "NEAT stands for what?", opts: ["New Exercise", "Non-Exercise Activity Thermogenesis", "Never Eat After Ten", "Nutrition Education"], correct: 1, exp: "NEAT is all the movement that isn't formal exercise - fidgeting, posture, daily activities!" },
        { q: "Which burns more calories - lifting weights or walking?", opts: ["Walking", "Weight lifting", "Same", "Neither"], correct: 1, exp: "Weight lifting burns calories during AND after exercise, plus builds calorie-burning muscle!" }
      ],
      [
        { q: "Your metabolism is highest when you're?", opts: ["Sleeping", "Young and muscular", "Old", "Sitting"], correct: 1, exp: "Young, muscular bodies have the highest metabolisms - muscle is the metabolic engine!" },
        { q: "What happens to your metabolism as you age?", opts: ["Stays the same", "Slows down", "Speeds up", "Disappears"], correct: 1, exp: "Metabolism slows 1-2% per decade after 30 - unless you maintain muscle mass!" }
      ],
      [
        { q: "Cold weather makes your body burn?", opts: ["Fewer calories", "More calories", "Same calories", "No calories"], correct: 1, exp: "Your body burns extra calories to maintain temperature - nature's metabolism booster! ❄️" },
        { q: "The best way to boost metabolism long-term?", opts: ["Crash dieting", "Building muscle", "Only cardio", "Eating less"], correct: 1, exp: "Building muscle increases your metabolic rate 24/7 - the ultimate metabolism hack!" }
      ],
      [
        { q: "Protein increases metabolism because of its?", opts: ["Low calories", "Thermic effect", "Color", "Taste"], correct: 1, exp: "Protein has the highest thermic effect - burning 25-30% of its calories during digestion!" },
        { q: "Which activity increases your metabolism for hours after?", opts: ["Watching TV", "Weight training", "Sleeping", "Reading"], correct: 1, exp: "Weight training creates EPOC - excess post-exercise oxygen consumption for hours!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL
    [
      [
        { q: "BMR typically accounts for what percentage of TDEE?", opts: ["30-40%", "60-70%", "10-20%", "90-95%"], correct: 1, exp: "Basal Metabolic Rate is 60-70% of total daily energy expenditure - the biggest component!" },
        { q: "The thermic effect of food (TEF) is highest for which macronutrient?", opts: ["Carbs", "Fat", "Protein", "Alcohol"], correct: 2, exp: "Protein burns 25-30% of its calories during digestion - natural metabolism boost!" }
      ],
      [
        { q: "NEAT can vary between individuals by?", opts: ["50 calories", "200 calories", "800+ calories", "No variation"], correct: 2, exp: "NEAT varies dramatically - some people naturally burn 800+ more calories through movement!" },
        { q: "Brown adipose tissue (brown fat) burns calories to produce?", opts: ["Protein", "Heat", "Sugar", "Muscle"], correct: 1, exp: "Brown fat burns calories specifically for heat production - metabolic furnace!" }
      ],
      [
        { q: "The 'muscle-centric' approach to metabolism focuses on?", opts: ["Losing fat only", "Building metabolic tissue", "Eating less", "Only cardio"], correct: 1, exp: "Dr. Lyon's approach: muscle is your metabolic organ - build it to boost metabolism!" },
        { q: "Adaptive thermogenesis means your metabolism?", opts: ["Never changes", "Slows with dieting", "Always increases", "Stays constant"], correct: 1, exp: "Your body adapts to calorie restriction by slowing metabolism - why muscle matters!" }
      ],
      [
        { q: "Which type of exercise has the longest metabolic effect?", opts: ["Light walking", "Heavy resistance training", "Watching TV", "Stretching"], correct: 1, exp: "Heavy lifting creates the biggest metabolic boost and builds calorie-burning muscle!" },
        { q: "Sarcopenia (muscle loss) affects metabolism by?", opts: ["Increasing it", "Decreasing it significantly", "No effect", "Only helping"], correct: 1, exp: "Muscle loss drastically reduces metabolism - why maintaining muscle is crucial!" }
      ],
      [
        { q: "The 'afterburn effect' (EPOC) is highest after?", opts: ["Light cardio", "High-intensity training", "Sleeping", "Eating"], correct: 1, exp: "High-intensity exercise creates the biggest afterburn - hours of elevated metabolism!" },
        { q: "Thyroid hormones T3 and T4 regulate?", opts: ["Hair growth only", "Metabolic rate", "Sleep only", "Appetite only"], correct: 1, exp: "Thyroid hormones are master metabolic regulators - when healthy, metabolism thrives!" }
      ],
      [
        { q: "Age-related metabolic decline is primarily due to?", opts: ["Genetics only", "Muscle mass loss", "Natural aging", "Eating too much"], correct: 1, exp: "Most age-related metabolic decline comes from muscle loss - preventable with resistance training!" },
        { q: "Which gender typically has higher metabolic rate?", opts: ["Women", "Men", "Same", "Varies randomly"], correct: 1, exp: "Men typically have higher metabolism due to greater muscle mass - muscle drives metabolism!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "The respiratory quotient (RQ) for fat oxidation is approximately?", opts: ["0.7", "0.85", "1.0", "1.3"], correct: 0, exp: "Fat oxidation has RQ ~0.7 - measuring metabolic flexibility!" },
        { q: "Metabolic flexibility refers to the ability to?", opts: ["Only burn carbs", "Switch between fuel sources", "Only burn fat", "Never change"], correct: 1, exp: "Metabolic flexibility = efficiently switching between burning carbs and fats!" }
      ],
      [
        { q: "UCP1 (uncoupling protein 1) in brown fat does what?", opts: ["Stores energy", "Burns calories as heat", "Makes protein", "Stores fat"], correct: 1, exp: "UCP1 uncouples energy production from ATP synthesis, releasing energy as heat!" },
        { q: "The P/O ratio in mitochondrial respiration represents?", opts: ["Protein/Oxygen", "ATP made per oxygen", "Power/Oxygen", "Nothing"], correct: 1, exp: "P/O ratio shows metabolic efficiency - how much ATP made per oxygen consumed!" }
      ],
      [
        { q: "Cold-induced thermogenesis is mediated by?", opts: ["Insulin", "Norepinephrine", "Glucose", "Protein"], correct: 1, exp: "Cold exposure releases norepinephrine, activating brown fat and boosting metabolism!" },
        { q: "The thermoneutral zone for humans is approximately?", opts: ["15-20°C", "22-28°C", "35-40°C", "10-15°C"], correct: 1, exp: "22-28°C is where you don't burn extra calories for temperature regulation!" }
      ],
      [
        { q: "VO2 max represents?", opts: ["Volume of oxygen stored", "Maximum oxygen consumption rate", "Heart rate maximum", "Lung capacity"], correct: 1, exp: "VO2 max = maximum rate of oxygen utilization - marker of metabolic capacity!" },
        { q: "Exercise intensity affects fuel utilization through?", opts: ["The crossover effect", "No effect", "Random changes", "Only using carbs"], correct: 0, exp: "Higher intensities shift from fat to carb utilization - the metabolic crossover!" }
      ],
      [
        { q: "Indirect calorimetry measures metabolism by analyzing?", opts: ["Heart rate only", "Gas exchange (O2/CO2)", "Body temperature", "Blood pressure"], correct: 1, exp: "Measuring oxygen consumption and CO2 production calculates energy expenditure!" },
        { q: "The concept of metabolic equivalent (MET) uses what as 1 MET?", opts: ["100 ml O2/kg/min", "3.5 ml O2/kg/min", "1 kcal/kg/hr", "10 ml O2/kg/min"], correct: 1, exp: "1 MET = 3.5 ml O2/kg/min = resting metabolic rate baseline!" }
      ],
      [
        { q: "Muscle protein turnover affects metabolism because?", opts: ["It uses no energy", "Protein synthesis is energetically expensive", "Only builds muscle", "Doesn't matter"], correct: 1, exp: "Muscle protein synthesis and breakdown burn significant calories - active tissue!" },
        { q: "The 'metabolic syndrome' is characterized by?", opts: ["High metabolism", "Metabolic dysfunction", "Perfect health", "Only muscle"], correct: 1, exp: "Metabolic syndrome involves insulin resistance, inflammation - often linked to low muscle mass!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "The molecular mechanism of UCP1 thermogenesis involves?", opts: ["ATP synthesis", "Proton leak across mitochondrial membrane", "Protein breakdown", "Fat storage"], correct: 1, exp: "UCP1 allows protons to leak, releasing energy as heat instead of making ATP!" },
        { q: "β3-adrenergic receptor activation increases metabolism through?", opts: ["Muscle breakdown", "Brown fat activation", "Sleep", "Eating less"], correct: 1, exp: "β3 receptors activate brown fat and increase energy expenditure!" }
      ],
      [
        { q: "The protein PGC-1α (peroxisome proliferator-activated receptor gamma coactivator 1-alpha) regulates?", opts: ["Only muscle building", "Mitochondrial biogenesis", "Only fat storage", "Sleep"], correct: 1, exp: "PGC-1α is the master regulator of mitochondrial biogenesis and energy metabolism!" },
        { q: "AMPK acts as a cellular?", opts: ["Glucose sensor only", "Energy sensor", "Protein sensor", "Temperature sensor"], correct: 1, exp: "AMPK senses cellular energy status and coordinates metabolic responses!" }
      ],
      [
        { q: "Irisin, released from muscle during exercise, affects?", opts: ["Only muscle", "Brown fat activation", "Only sleep", "Nothing"], correct: 1, exp: "Irisin from muscle promotes brown fat formation - muscle-fat communication!" },
        { q: "The leptin resistance seen in obesity affects?", opts: ["Hunger only", "Metabolic rate regulation", "Only sleep", "Hair growth"], correct: 1, exp: "Leptin resistance impairs the body's ability to maintain metabolic rate!" }
      ],
      [
        { q: "Mitochondrial dysfunction affects metabolism by?", opts: ["Improving efficiency", "Reducing energy production capacity", "Only helping", "No effect"], correct: 1, exp: "Mitochondrial dysfunction reduces cellular energy capacity - metabolic decline!" },
        { q: "The role of FGF21 in metabolism includes?", opts: ["Only fat storage", "Metabolic regulation and adaptation", "Only muscle loss", "No role"], correct: 1, exp: "FGF21 is a key metabolic hormone coordinating energy balance and adaptation!" }
      ],
      [
        { q: "Sirtuin proteins affect metabolism through?", opts: ["NAD+-dependent regulation", "Random effects", "Only fat storage", "No mechanism"], correct: 0, exp: "Sirtuins are NAD+-dependent enzymes regulating metabolic genes and pathways!" },
        { q: "The 'healthy aging' approach to metabolism emphasizes?", opts: ["Only losing weight", "Maintaining muscle mass", "Only cardio", "Eating less"], correct: 1, exp: "Healthy aging focuses on maintaining metabolically active muscle tissue!" }
      ],
      [
        { q: "Exercise-induced mitochondrial adaptations include?", opts: ["Fewer mitochondria", "More efficient mitochondria", "No changes", "Only damage"], correct: 1, exp: "Exercise increases mitochondrial number and efficiency - boosting metabolic capacity!" },
        { q: "The concept of 'metabolic flexibility' is important because?", opts: ["It's trendy", "It indicates healthy metabolism", "It's meaningless", "Only for athletes"], correct: 1, exp: "Metabolic flexibility indicates a healthy, adaptable metabolism - key for longevity!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "The transcriptional coactivator PGC-1α is regulated by?", opts: ["Only genetics", "Exercise and AMPK signaling", "Random factors", "Only diet"], correct: 1, exp: "Exercise activates AMPK, which phosphorylates and activates PGC-1α!" },
        { q: "Beige fat recruitment differs from brown fat because?", opts: ["It's permanent", "It can be induced in adults", "It doesn't work", "It's only in children"], correct: 1, exp: "Beige fat can be recruited from white fat in response to stimuli like cold or exercise!" }
      ],
      [
        { q: "The enzyme NAMPT (nicotinamide phosphoribosyltransferase) affects metabolism by?", opts: ["Breaking down muscle", "Regulating NAD+ synthesis", "Only storing fat", "No function"], correct: 1, exp: "NAMPT controls NAD+ synthesis, affecting sirtuin activity and metabolic regulation!" },
        { q: "Autophagy's role in metabolism includes?", opts: ["Only damage", "Recycling cellular components", "Only fat storage", "No role"], correct: 1, exp: "Autophagy recycles damaged organelles, maintaining metabolic efficiency!" }
      ],
      [
        { q: "The circadian regulation of metabolism involves?", opts: ["Random timing", "Clock genes coordinating metabolic rhythms", "No timing", "Only sleep"], correct: 1, exp: "Circadian clock genes coordinate daily metabolic rhythms for optimal efficiency!" },
        { q: "Extracellular vesicles (exosomes) from muscle can?", opts: ["Do nothing", "Communicate with other tissues", "Only cause damage", "Only store fat"], correct: 1, exp: "Muscle-derived exosomes carry signals that affect metabolism in other tissues!" }
      ],
      [
        { q: "The NAD+/NADH ratio affects metabolism through?", opts: ["No mechanism", "Sirtuin activity regulation", "Only fat storage", "Random effects"], correct: 1, exp: "NAD+/NADH ratio regulates sirtuins, affecting metabolic gene expression!" },
        { q: "Epigenetic modifications affecting metabolism can be influenced by?", opts: ["Only genetics", "Exercise and nutrition", "Nothing", "Only age"], correct: 1, exp: "Exercise and nutrition can modify epigenetic marks affecting metabolic genes!" }
      ],
      [
        { q: "The gut-muscle axis affects metabolism through?", opts: ["No connection", "Microbiome-derived metabolites", "Only digestion", "Random effects"], correct: 1, exp: "Gut bacteria produce metabolites that affect muscle metabolism and energy balance!" },
        { q: "Advanced glycation end products (AGEs) affect metabolism by?", opts: ["Improving function", "Impairing mitochondrial function", "No effect", "Only helping"], correct: 1, exp: "AGEs damage mitochondria and impair metabolic function - why blood sugar control matters!" }
      ],
      [
        { q: "The future of metabolic health focuses on?", opts: ["Only weight loss", "Maintaining muscle and metabolic flexibility", "Only drugs", "Ignoring exercise"], correct: 1, exp: "Cutting-edge metabolic health emphasizes muscle maintenance and metabolic flexibility for longevity!" },
        { q: "Longevity research shows that metabolic health depends most on?", opts: ["Only genetics", "Muscle mass and mitochondrial function", "Only luck", "Only supplements"], correct: 1, exp: "Research reveals muscle mass and mitochondrial function are key determinants of metabolic longevity!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = tdeeQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = tdeeQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Metabolic Reality Mastery!</h2>
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-red-800">{score}/{totalPossible}</div>
            <div className="text-lg text-red-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{tdeeQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-red-600 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">🔥 Metabolic Reality</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-red-50 hover:border-red-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// Energy Balance Game - Updated with body composition focus
function CalorieGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();

  // Updated with body composition focus and expert insights
  const calorieQuestions = [
    // ROUND 1 - FOUNDATION LEVEL
    [
      [
        { q: "What matters more than just calories for body composition?", opts: ["Only calories", "Protein and food quality", "Only exercise", "Nothing else"], correct: 1, exp: "Food quality and protein matter more than just calorie counting - body composition over weight loss! ⚖️" },
        { q: "A calorie measures what?", opts: ["Weight", "Energy", "Size", "Temperature"], correct: 1, exp: "A calorie measures energy, but not all calories affect your body the same way!" }
      ],
      [
        { q: "Which burns more calories to digest?", opts: ["100 calories of candy", "100 calories of chicken", "They're the same", "Neither burns calories"], correct: 1, exp: "Chicken burns 25-30% of its calories during digestion - protein power!" },
        { q: "For body composition, what approach works best?", opts: ["Only counting calories", "High protein with quality foods", "Only eating less", "Avoiding all food"], correct: 1, exp: "High protein with quality foods builds muscle and improves body composition!" }
      ],
      [
        { q: "Which has more impact on your metabolism?", opts: ["100 calories of soda", "100 calories of eggs", "Exactly the same", "Neither affects metabolism"], correct: 1, exp: "Eggs boost metabolism through protein's thermic effect - soda does nothing!" },
        { q: "The most important factor for long-term body composition?", opts: ["Crash dieting", "Building and keeping muscle", "Only cardio", "Eating less"], correct: 1, exp: "Muscle drives your metabolism and creates the body composition you want!" }
      ],
      [
        { q: "A medium banana vs. a cookie with the same calories?", opts: ["Exactly the same effect", "Banana provides better nutrition", "Cookie is healthier", "No difference"], correct: 1, exp: "The banana provides fiber, vitamins, and minerals - calories + nutrition wins!" },
        { q: "Your body uses calories for what?", opts: ["Only exercise", "Everything - breathing, thinking, moving", "Only sleeping", "Only digestion"], correct: 1, exp: "Your body burns calories 24/7 for every function - metabolism never stops!" }
      ],
      [
        { q: "Which approach leads to better body composition?", opts: ["Extreme calorie restriction", "Adequate protein with strength training", "Only eating once daily", "Avoiding exercise"], correct: 1, exp: "Adequate protein with strength training builds the lean, strong body you want!" },
        { q: "The biggest calorie burner in your body daily is?", opts: ["Exercise", "Basic metabolism", "Digestion", "Walking"], correct: 1, exp: "Basic metabolism (keeping you alive) burns 60-70% of daily calories!" }
      ],
      [
        { q: "Which creates lasting body composition changes?", opts: ["Quick weight loss", "Building metabolic muscle", "Crash diets", "Only supplements"], correct: 1, exp: "Building muscle creates permanent improvements to your body composition and health!" },
        { q: "Empty calories refer to foods with?", opts: ["No calories", "Calories but no nutrition", "Lots of protein", "Only healthy nutrients"], correct: 1, exp: "Empty calories provide energy but lack vitamins, minerals, and protein your body needs!" }
      ]
    ],

    // ROUND 2 - APPLIED SCIENCE LEVEL
    [
      [
        { q: "The thermic effect of food (TEF) is highest for?", opts: ["Carbs", "Fat", "Protein", "Alcohol"], correct: 2, exp: "Protein burns 25-30% of its calories during digestion - built-in calorie burning!" },
        { q: "Body recomposition means?", opts: ["Only losing weight", "Gaining muscle while losing fat", "Only gaining weight", "Staying the same"], correct: 1, exp: "Body recomposition improves your physique by building muscle and losing fat simultaneously!" }
      ],
      [
        { q: "Why do calories from protein behave differently?", opts: ["They don't", "Higher thermic effect and satiety", "Lower energy content", "They're magic"], correct: 1, exp: "Protein calories burn more energy to process and keep you full longer - metabolic advantage!" },
        { q: "The 'calories in, calories out' model oversimplifies because?", opts: ["It's completely accurate", "Different foods affect metabolism differently", "Calories don't matter", "It's too complex"], correct: 1, exp: "Different macronutrients have vastly different effects on hormones, metabolism, and satiety!" }
      ],
      [
        { q: "Which creates the biggest metabolic advantage?", opts: ["High carb, low protein", "High protein, resistance training", "Only cardio", "Eating less"], correct: 1, exp: "High protein plus resistance training boosts metabolism and builds calorie-burning muscle!" },
        { q: "Adaptive thermogenesis means your metabolism?", opts: ["Never changes", "Slows when dieting", "Always speeds up", "Stops working"], correct: 1, exp: "Your metabolism adapts to calorie restriction - why maintaining muscle and protein intake matters!" }
      ],
      [
        { q: "The biggest factor affecting your daily calorie needs?", opts: ["Hair color", "Muscle mass", "Clothing", "Favorite food"], correct: 1, exp: "Muscle mass is the biggest factor determining your metabolic rate and calorie needs!" },
        { q: "Which approach preserves muscle during fat loss?", opts: ["Very low protein", "Adequate protein with strength training", "Only cardio", "Starvation diets"], correct: 1, exp: "Adequate protein (1g/lb) plus strength training preserves precious muscle during fat loss!" }
      ],
      [
        { q: "The concept of 'metabolic damage' refers to?", opts: ["Permanent damage", "Adaptive slowdown from extreme dieting", "Improved metabolism", "Normal function"], correct: 1, exp: "Extreme dieting can slow metabolism significantly - why gradual changes work better!" },
        { q: "Which macronutrient has the most stable effect on blood sugar?", opts: ["Sugar", "Refined carbs", "Protein", "High-carb foods"], correct: 2, exp: "Protein provides steady energy without blood sugar spikes and crashes!" }
      ],
      [
        { q: "The 'set point theory' suggests your body?", opts: ["Has no preferences", "Defends a certain weight range", "Always gains weight", "Never changes"], correct: 1, exp: "Your body has mechanisms to defend a certain weight range - why sustainable changes matter!" },
        { q: "For optimal body composition, meal timing should prioritize?", opts: ["Only breakfast", "Post-workout protein", "Only dinner", "Random timing"], correct: 1, exp: "Post-workout protein timing helps maximize muscle protein synthesis and recovery!" }
      ]
    ],

    // ROUND 3 - RESEARCH BASED LEVEL
    [
      [
        { q: "The P-ratio during weight loss represents?", opts: ["Protein ratio", "Proportion of weight lost as protein vs fat", "Phosphorus levels", "Power ratio"], correct: 1, exp: "P-ratio shows what percentage of weight loss comes from protein (muscle) vs fat!" },
        { q: "Which approach optimizes the P-ratio for fat loss?", opts: ["Low protein, high cardio", "High protein, resistance training", "Only dieting", "Random approach"], correct: 1, exp: "High protein with resistance training maximizes fat loss while preserving muscle!" }
      ],
      [
        { q: "The Minnesota Starvation Experiment showed that severe restriction leads to?", opts: ["Only fat loss", "Significant muscle loss", "Only health benefits", "No changes"], correct: 1, exp: "Severe calorie restriction causes significant muscle loss - why moderate, protein-rich approaches work better!" },
        { q: "Leucine's role in body composition is?", opts: ["Fat storage", "Triggering muscle protein synthesis", "Slowing metabolism", "No role"], correct: 1, exp: "Leucine is the amino acid trigger for muscle protein synthesis - crucial for body composition!" }
      ],
      [
        { q: "The DIT (Diet-Induced Thermogenesis) is highest for?", opts: ["Pure fat", "Pure carbs", "Pure protein", "All equal"], correct: 2, exp: "Pure protein has a DIT of 20-30% - significantly higher than carbs (8-12%) or fat (0-5%)!" },
        { q: "Indirect calorimetry measures energy expenditure by?", opts: ["Heart rate", "Gas exchange", "Body temperature", "Blood tests"], correct: 1, exp: "Measuring oxygen consumption and CO2 production calculates real energy expenditure!" }
      ],
      [
        { q: "The RQ (respiratory quotient) indicates which fuel is being burned?", opts: ["Only shows heart rate", "Fat vs carb oxidation ratio", "Only protein use", "Nothing useful"], correct: 1, exp: "RQ = CO2/O2 ratio shows whether you're burning mostly fat (0.7) or carbs (1.0)!" },
        { q: "Metabolic flexibility in relation to calories means?", opts: ["Fixed metabolism", "Ability to switch fuel sources efficiently", "Only burning one fuel", "Broken metabolism"], correct: 1, exp: "Metabolic flexibility allows efficient switching between burning fat and carbs as needed!" }
      ],
      [
        { q: "The 'protein leverage hypothesis' suggests?", opts: ["Protein doesn't matter", "We eat until protein needs are met", "Only calories matter", "Protein is harmful"], correct: 1, exp: "We tend to eat until protein requirements are satisfied - why high-protein foods control appetite!" },
        { q: "Body composition changes are best measured by?", opts: ["Scale weight only", "Waist measurements and strength", "Only photos", "Clothing size only"], correct: 1, exp: "Scale weight alone misses muscle gain and fat loss - measure what actually matters!" }
      ],
      [
        { q: "The concept of 'skinny fat' refers to?", opts: ["Being underweight", "Low weight but high body fat", "Athletic build", "Muscular physique"], correct: 1, exp: "Skinny fat = low weight but high body fat percentage and low muscle mass - poor body composition!" },
        { q: "Which creates superior long-term results?", opts: ["Rapid weight loss", "Sustainable body recomposition", "Extreme measures", "Quick fixes"], correct: 1, exp: "Sustainable muscle building and fat loss creates lasting improvements in health and appearance!" }
      ]
    ],

    // ROUND 4 - EXPERT LEVEL
    [
      [
        { q: "The molecular mechanism of protein's satiety effect involves?", opts: ["Blood sugar spikes", "GLP-1 and PYY hormone release", "Cortisol increase", "Inflammation"], correct: 1, exp: "Protein triggers satiety hormones GLP-1 and PYY, naturally controlling appetite!" },
        { q: "Energy partitioning refers to?", opts: ["Dividing meals", "How nutrients go to muscle vs fat", "Exercise timing", "Sleep patterns"], correct: 1, exp: "Energy partitioning determines whether nutrients build muscle or get stored as fat!" }
      ],
      [
        { q: "The P/E ratio (protein-to-energy) affects body composition by?", opts: ["No effect", "Influencing muscle preservation", "Only affecting fat", "Random effects"], correct: 1, exp: "Higher P/E ratios promote muscle preservation and fat loss during calorie restriction!" },
        { q: "mTOR signaling in relation to calories shows that?", opts: ["Only calories matter", "Protein quality and leucine content matter", "Nothing matters", "Only timing matters"], correct: 1, exp: "mTOR responds more to protein quality and leucine than total calories alone!" }
      ],
      [
        { q: "The cellular nutrient sensing pathways respond to?", opts: ["Only total calories", "Specific amino acids and nutrients", "Only exercise", "Only sleep"], correct: 1, exp: "Cells sense specific nutrients like leucine, not just total calorie availability!" },
        { q: "Insulin's effect on body composition depends on?", opts: ["Only total amount", "Context - muscle vs fat tissue sensitivity", "Time of day only", "Nothing"], correct: 1, exp: "Insulin sensitivity in muscle vs fat tissue determines whether nutrients build muscle or fat!" }
      ],
      [
        { q: "The anabolic window concept has evolved to emphasize?", opts: ["Exact 30-minute timing", "Daily protein totals matter more", "Only pre-workout", "No protein needed"], correct: 1, exp: "Current research shows daily protein totals matter more than precise timing windows!" },
        { q: "Autophagy's role in body composition involves?", opts: ["Only muscle breakdown", "Cellular quality control", "Only fat storage", "No role"], correct: 1, exp: "Autophagy removes damaged cellular components, maintaining muscle quality and function!" }
      ],
      [
        { q: "The gut microbiome affects calorie utilization by?", opts: ["No effect", "Influencing extraction efficiency", "Only causing problems", "Random effects"], correct: 1, exp: "Gut bacteria affect how many calories are extracted from food - individual variation!" },
        { q: "Brown fat activation affects energy balance by?", opts: ["Storing more calories", "Increasing energy expenditure", "No effect", "Only cooling"], correct: 1, exp: "Brown fat burns calories specifically for heat production - metabolic boost!" }
      ],
      [
        { q: "The concept of 'calories per unit of satiety' suggests?", opts: ["All calories equal", "Some foods provide more satiety per calorie", "Satiety doesn't matter", "Only volume matters"], correct: 1, exp: "High-protein, high-fiber foods provide more satiety per calorie - natural portion control!" },
        { q: "Advanced body composition assessment uses?", opts: ["Only BMI", "DEXA, BodPod, or MRI", "Only scale weight", "Only photos"], correct: 1, exp: "DEXA scans and similar methods accurately measure muscle mass, fat mass, and bone density!" }
      ]
    ],

    // ROUND 5 - CUTTING EDGE LEVEL
    [
      [
        { q: "The nutrient sensing network includes which key sensors?", opts: ["Only mTOR", "mTOR, AMPK, and sirtuins", "Only insulin", "Random receptors"], correct: 1, exp: "mTOR, AMPK, and sirtuins form an integrated nutrient sensing network!" },
        { q: "Metabolomics in nutrition research reveals?", opts: ["Nothing new", "Individual metabolic fingerprints", "Only standard responses", "Calories are everything"], correct: 1, exp: "Metabolomics shows how different people metabolize the same foods very differently!" }
      ],
      [
        { q: "The FGF21-adiponectin axis affects energy balance through?", opts: ["No mechanism", "Metabolic hormone signaling", "Only fat storage", "Random effects"], correct: 1, exp: "FGF21 and adiponectin coordinate metabolic responses and energy partitioning!" },
        { q: "Epigenetic modifications from diet can affect?", opts: ["Nothing", "Gene expression patterns", "Only appearance", "Only mood"], correct: 1, exp: "Dietary patterns can modify gene expression through epigenetic mechanisms!" }
      ],
      [
        { q: "The lactate-pyruvate shuttle between tissues affects?", opts: ["Only exercise", "Systemic metabolism", "Nothing", "Only one organ"], correct: 1, exp: "Lactate shuttling between tissues is a key aspect of metabolic flexibility!" },
        { q: "Circadian regulation of metabolism shows that?", opts: ["Timing doesn't matter", "Meal timing affects metabolic responses", "Only sleep matters", "No patterns exist"], correct: 1, exp: "Circadian biology reveals that when you eat affects how nutrients are processed!" }
      ],
      [
        { q: "The muscle-brain-fat axis communication involves?", opts: ["No communication", "Myokines and hormones", "Only nerves", "Random signals"], correct: 1, exp: "Muscle secretes myokines that communicate with brain and fat tissue!" },
        { q: "Precision nutrition based on genetics considers?", opts: ["One-size-fits-all", "Individual genetic variants", "Only calories", "Only exercise"], correct: 1, exp: "Genetic variants affect how individuals respond to different dietary approaches!" }
      ],
      [
        { q: "The role of bile acids in metabolism includes?", opts: ["Only digestion", "Hormone-like signaling", "No metabolic role", "Only fat absorption"], correct: 1, exp: "Bile acids act as signaling molecules affecting glucose and energy metabolism!" },
        { q: "Extracellular vesicles (EVs) in metabolic communication?", opts: ["Don't exist", "Carry signals between tissues", "Only cause problems", "Have no function"], correct: 1, exp: "EVs transport metabolic signals between different tissues and organs!" }
      ],
      [
        { q: "The future of body composition science emphasizes?", opts: ["Only weight loss", "Precision approaches based on individual biology", "One approach for all", "Only supplements"], correct: 1, exp: "Future body composition science will be highly personalized based on individual metabolic profiles!" },
        { q: "Longevity research shows optimal body composition involves?", opts: ["Only being thin", "Adequate muscle mass with metabolic health", "Only weight", "Only appearance"], correct: 1, exp: "Longevity research emphasizes muscle mass and metabolic health over just weight!" }
      ]
    ]
  ];

  const levels = [
    { name: "Foundation", color: "green", emoji: "🟢" },
    { name: "Applied Science", color: "blue", emoji: "🔵" },
    { name: "Research Based", color: "yellow", emoji: "🟡" },
    { name: "Expert Level", color: "orange", emoji: "🟠" },
    { name: "Cutting Edge", color: "red", emoji: "🔴" }
  ];

  const currentQuestions = calorieQuestions[currentRound][currentDay];
  const question = currentQuestions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      const roundScore = score - roundScores.reduce((sum, s) => sum + s, 0);
      setRoundScores([...roundScores, roundScore]);

      if (currentRound < 4) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setRoundScores([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    const totalPossible = calorieQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Energy Balance Mastery!</h2>
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-indigo-800">{score}/{totalPossible}</div>
            <div className="text-lg text-indigo-700">{percentage}% Mastery</div>
          </div>

          <div className="space-y-2 mb-6">
            {levels.map((level, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{level.emoji} {level.name}</span>
                <span className="font-medium">{roundScores[index] || 0}/{calorieQuestions[index][currentDay].length}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button onClick={resetGame} className="w-full bg-indigo-600 text-white py-3 rounded-lg">
              Challenge Again
            </button>
            <button onClick={onExit} className="w-full bg-gray-500 text-white py-3 rounded-lg">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">⚖️ Energy Balance</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name}</span>
          </div>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Round {currentRound + 1}/5 • Question {currentQuestion + 1}/{currentQuestions.length}</span>
          <span>Day: {getCurrentDay() + 1}/7</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentRound * currentQuestions.length + currentQuestion + 1) / (5 * currentQuestions.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.q}</h3>
        <div className="space-y-3">
          {question.opts.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${showResult
                  ? index === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300'
                  : 'bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-800 mb-3">{question.exp}</p>
          <button
            onClick={nextQuestion}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            {currentQuestion < currentQuestions.length - 1 ? 'Next Question' :
              currentRound < 4 ? 'Next Level' : 'See Final Results'}
          </button>
        </div>
      )}
    </div>
  );
}