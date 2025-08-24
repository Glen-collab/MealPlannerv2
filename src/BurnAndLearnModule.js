import React, { useState } from 'react';

// Get current day of week (0-6) for question rotation
const getCurrentDay = () => new Date().getDay();

// Main Burn & Learn Module
export default function BurnAndLearnModule() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 'protein',
      title: '🍗 Protein Power',
      description: 'Master protein science from basics to biochemistry',
      color: 'blue',
      bgColor: 'bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'carbs',
      title: '🍌 Carb Truth',
      description: 'Understand carbohydrates at every level',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'fats',
      title: '🥑 Fat Facts',
      description: 'Navigate lipid science from simple to complex',
      color: 'green',
      bgColor: 'bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'alcohol',
      title: '🍷 Liquid Calories',
      description: 'Alcohol metabolism from basics to research',
      color: 'purple',
      bgColor: 'bg-purple-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'tdee',
      title: '🔥 Burn Reality',
      description: 'Energy expenditure science across all levels',
      color: 'red',
      bgColor: 'bg-red-50',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'calories',
      title: '📊 Calorie Detective',
      description: 'Food energy from counting to calorimetry',
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  const renderGame = () => {
    switch(activeGame) {
      case 'protein': return <ProteinGame onExit={() => setActiveGame(null)} />;
      case 'carbs': return <CarbGame onExit={() => setActiveGame(null)} />;
      case 'fats': return <FatGame onExit={() => setActiveGame(null)} />;
      case 'alcohol': return <AlcoholGame onExit={() => setActiveGame(null)} />;
      case 'tdee': return <TDEEGame onExit={() => setActiveGame(null)} />;
      case 'calories': return <CalorieGame onExit={() => setActiveGame(null)} />;
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
          <p className="text-gray-600 mb-2">Progressive Nutrition Education</p>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-700">📅 Today is {currentDay}</p>
            <p className="text-xs text-gray-500">Questions rotate daily - come back tomorrow for new challenges!</p>
          </div>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
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
          <h3 className="font-semibold text-gray-800 mb-3">🎯 Difficulty Levels</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-600">🟢 Round 1:</span>
              <span className="text-gray-700">Elementary</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">🔵 Round 2:</span>
              <span className="text-gray-700">High School</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-600">🟡 Round 3:</span>
              <span className="text-gray-700">College</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-600">🟠 Round 4:</span>
              <span className="text-gray-700">Graduate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">🔴 Round 5:</span>
              <span className="text-gray-700">Doctoral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Protein Game with 5 levels and 7-day rotation
function ProteinGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  // 5 rounds × 7 days = 35 question sets
  const proteinQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      // Day 0-6 questions for elementary level
      [
        { q: "Which food has the most protein?", opts: ["Apple", "Chicken", "Bread", "Candy"], correct: 1, exp: "Chicken is packed with protein to help you grow strong! 💪" },
        { q: "Protein helps build what in your body?", opts: ["Hair", "Muscles", "Teeth", "All of these"], correct: 3, exp: "Protein builds muscles, hair, skin, and even helps repair your body!" }
      ],
      [
        { q: "What happens when you eat protein?", opts: ["You get sleepy", "You feel full longer", "You get thirsty", "Nothing"], correct: 1, exp: "Protein keeps you full much longer than candy or chips!" },
        { q: "Which is a good breakfast protein?", opts: ["Donut", "Eggs", "Soda", "Cookies"], correct: 1, exp: "Eggs are a perfect protein to start your day strong!" }
      ],
      [
        { q: "Fish is a good source of what?", opts: ["Sugar", "Protein", "Fat only", "Water"], correct: 1, exp: "Fish gives you protein plus healthy fats for your brain!" },
        { q: "How does protein make you feel?", opts: ["Hungry right away", "Full and satisfied", "Sleepy", "Sick"], correct: 1, exp: "Protein satisfies hunger better than any other food!" }
      ],
      [
        { q: "Which snack has protein?", opts: ["Candy", "Nuts", "Chips", "Soda"], correct: 1, exp: "Nuts are nature's protein power pack! 🥜" },
        { q: "Why do athletes eat lots of protein?", opts: ["It tastes good", "Builds strong muscles", "It's cheap", "Makes them tall"], correct: 1, exp: "Athletes need protein to build and repair their hardworking muscles!" }
      ],
      [
        { q: "What food group includes meat and beans?", opts: ["Dairy", "Grains", "Protein", "Vegetables"], correct: 2, exp: "Meat, fish, eggs, and beans are all in the protein group!" },
        { q: "Protein helps your body do what?", opts: ["Grow and repair", "Only sleep", "Only run", "Get sick"], correct: 0, exp: "Protein is like your body's construction worker - it builds and fixes everything!" }
      ],
      [
        { q: "Which has more protein - a cookie or yogurt?", opts: ["Cookie", "Yogurt", "Same amount", "Neither"], correct: 1, exp: "Yogurt has way more protein than a cookie! Plus it has good bacteria for your tummy!" },
        { q: "When should you eat protein?", opts: ["Only dinner", "Only breakfast", "Never", "Every meal"], correct: 3, exp: "Eating protein at every meal keeps you strong and satisfied all day!" }
      ],
      [
        { q: "What makes protein different from candy?", opts: ["Color", "Helps build body", "Size", "Shape"], correct: 1, exp: "Protein actually helps build your body, while candy just gives quick energy!" },
        { q: "Beans are a protein that also gives you what?", opts: ["Sugar", "Fiber", "Fat", "Water"], correct: 1, exp: "Beans are awesome - they give you protein AND fiber to keep your tummy happy!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL  
    [
      [
        { q: "What is the thermic effect of protein?", opts: ["5%", "15%", "25-30%", "50%"], correct: 2, exp: "Protein burns 25-30% of its calories just being digested - natural metabolism boost!" },
        { q: "Complete proteins contain all essential what?", opts: ["Vitamins", "Amino acids", "Minerals", "Carbs"], correct: 1, exp: "Complete proteins have all 9 essential amino acids your body can't make itself!" }
      ],
      [
        { q: "How much protein should active teens eat daily?", opts: ["0.5g/kg", "0.8g/kg", "1.2-2.0g/kg", "3.0g/kg"], correct: 2, exp: "Active teens need 1.2-2.0g protein per kg of body weight for growth and recovery!" },
        { q: "What happens to excess protein in the body?", opts: ["Stored as protein", "Converted to fat", "Immediate energy", "Passed unchanged"], correct: 1, exp: "Excess protein can be converted to glucose or fat - calories still count!" }
      ],
      [
        { q: "Which amino acid is most important for muscle growth?", opts: ["Leucine", "Glycine", "Alanine", "Proline"], correct: 0, exp: "Leucine is the key trigger for muscle protein synthesis - the muscle building switch!" },
        { q: "Post-workout protein timing matters most within?", opts: ["10 minutes", "2 hours", "24 hours", "1 week"], correct: 2, exp: "The 24-hour window matters more than the mythical '30-minute window'!" }
      ],
      [
        { q: "Protein quality is measured by what score?", opts: ["Amino Score", "PDCAAS", "Protein Index", "Quality Rating"], correct: 1, exp: "PDCAAS (Protein Digestibility Corrected Amino Acid Score) measures protein quality!" },
        { q: "Which plant protein is considered complete?", opts: ["Rice", "Beans", "Quinoa", "Wheat"], correct: 2, exp: "Quinoa is one of the few plant proteins with all essential amino acids!" }
      ],
      [
        { q: "Protein synthesis peaks how long after eating?", opts: ["15 minutes", "1-2 hours", "6 hours", "24 hours"], correct: 1, exp: "Muscle protein synthesis peaks 1-2 hours after eating protein-rich meals!" },
        { q: "What's the biological value of egg protein?", opts: ["75", "85", "100", "125"], correct: 2, exp: "Eggs score 100 on biological value - the gold standard for protein quality!" }
      ],
      [
        { q: "Casein protein is absorbed how compared to whey?", opts: ["Faster", "Same speed", "Slower", "Not absorbed"], correct: 2, exp: "Casein digests slowly, providing steady amino acid release for hours!" },
        { q: "BCAAs make up what percent of muscle protein?", opts: ["10%", "25%", "35%", "50%"], correct: 2, exp: "Branched-Chain Amino Acids (leucine, isoleucine, valine) comprise 35% of muscle protein!" }
      ],
      [
        { q: "Protein needs increase with which factor most?", opts: ["Age", "Activity level", "Gender", "Height"], correct: 1, exp: "Physical activity is the biggest driver of increased protein requirements!" },
        { q: "Which has higher leucine content?", opts: ["Soy protein", "Whey protein", "Rice protein", "Pea protein"], correct: 1, exp: "Whey protein is exceptionally high in leucine, the muscle-building trigger!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "mTOR pathway is primarily activated by which amino acid?", opts: ["Leucine", "Isoleucine", "Valine", "Lysine"], correct: 0, exp: "Leucine directly activates mTOR (mechanistic target of rapamycin) - the master regulator of muscle growth!" },
        { q: "Protein turnover in healthy adults is approximately?", opts: ["100g/day", "300g/day", "500g/day", "1000g/day"], correct: 1, exp: "We break down and rebuild about 300g of protein daily - constant renovation!" }
      ],
      [
        { q: "The muscle full effect occurs at what leucine threshold?", opts: ["1.8g", "2.5g", "3.5g", "5.0g"], correct: 1, exp: "About 2.5g leucine per meal maximally stimulates muscle protein synthesis!" },
        { q: "Protein efficiency ratio (PER) uses which animal model?", opts: ["Mice", "Rats", "Rabbits", "Monkeys"], correct: 1, exp: "PER testing uses growing rats to measure protein quality for growth!" }
      ],
      [
        { q: "Which method measures protein digestibility in vivo?", opts: ["Chemical score", "PDCAAS", "IAAO", "PER"], correct: 2, exp: "IAAO (Indicator Amino Acid Oxidation) measures real protein needs in living humans!" },
        { q: "Sarcopenia begins at approximately what age?", opts: ["25", "35", "45", "55"], correct: 1, exp: "Muscle mass peaks around 30, then we lose 3-8% per decade after 35!" }
      ],
      [
        { q: "Protein synthesis vs breakdown determines what?", opts: ["Energy", "Net protein balance", "Appetite", "Digestion"], correct: 1, exp: "Net protein balance = synthesis minus breakdown. Positive balance builds muscle!" },
        { q: "Which has the highest DIAAS score?", opts: ["Soy", "Wheat", "Milk protein", "Rice"], correct: 2, exp: "DIAAS (Digestible Indispensable Amino Acid Score) ranks milk proteins highest!" }
      ],
      [
        { q: "Muscle protein synthesis remains elevated for how long?", opts: ["2 hours", "6 hours", "24-48 hours", "1 week"], correct: 2, exp: "A single protein dose keeps muscle building elevated for 24-48 hours!" },
        { q: "The anabolic resistance of aging affects what primarily?", opts: ["Protein absorption", "mTOR sensitivity", "Amino acid transport", "All of these"], correct: 3, exp: "Aging reduces sensitivity to protein's muscle-building signals at multiple levels!" }
      ],
      [
        { q: "Leucine content is highest in which protein source?", opts: ["Casein", "Whey", "Soy", "Pea"], correct: 1, exp: "Whey protein isolate contains ~14% leucine - the highest natural concentration!" },
        { q: "Protein quality becomes less important when intake exceeds?", opts: ["0.8g/kg", "1.2g/kg", "1.6g/kg", "2.0g/kg"], correct: 2, exp: "Above 1.6g/kg daily, even lower-quality proteins provide adequate amino acids!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL
    [
      [
        { q: "Which signaling pathway inhibits protein synthesis?", opts: ["mTOR", "AMPK", "IGF-1", "Akt"], correct: 1, exp: "AMPK activation (energy stress) inhibits mTOR and muscle protein synthesis!" },
        { q: "Postprandial protein synthesis peaks at what plasma leucine level?", opts: ["100μM", "200μM", "300μM", "400μM"], correct: 1, exp: "Plasma leucine around 200μM maximally stimulates muscle protein synthesis!" }
      ],
      [
        { q: "The leucine trigger operates through which complex?", opts: ["mTORC1", "mTORC2", "AMPK", "p70S6K1"], correct: 0, exp: "mTORC1 (mechanistic target of rapamycin complex 1) is leucine's primary target!" },
        { q: "Protein synthetic efficiency declines with aging due to?", opts: ["Lower mTOR", "Amino acid transport", "Anabolic resistance", "All of these"], correct: 3, exp: "Multiple mechanisms contribute to age-related anabolic resistance!" }
      ],
      [
        { q: "The muscle full effect duration is approximately?", opts: ["90 min", "3 hours", "6 hours", "12 hours"], correct: 1, exp: "Muscle protein synthesis stays elevated ~3 hours per protein dose!" },
        { q: "Which amino acid transporter is most important for leucine?", opts: ["LAT1", "SNAT2", "CAT1", "PAT1"], correct: 0, exp: "LAT1 (L-type amino acid transporter 1) is the primary leucine transporter!" }
      ],
      [
        { q: "Autophagy and protein synthesis are regulated by?", opts: ["Independent pathways", "Same pathway (mTOR)", "Opposite hormones", "Random factors"], correct: 1, exp: "mTOR coordinately regulates both protein synthesis (↑) and autophagy (↓)!" },
        { q: "The RDA for protein is based on what method?", opts: ["Nitrogen balance", "IAAO", "PDCAAS", "Factorial method"], correct: 0, exp: "Current protein RDA relies on nitrogen balance studies (now considered inadequate)!" }
      ],
      [
        { q: "Leucine's effect on mTOR occurs through which protein?", opts: ["Rheb", "TSC1/2", "Ragulator", "Sestrin2"], correct: 3, exp: "Leucine binds Sestrin2, releasing its inhibition of mTORC1!" },
        { q: "Protein requirements increase most with which stressor?", opts: ["Heat", "Altitude", "Exercise training", "Cold"], correct: 2, exp: "Resistance training can double protein needs due to increased synthesis and breakdown!" }
      ],
      [
        { q: "The leucine metabolite HMB works through which mechanism?", opts: ["mTOR activation", "Protein breakdown reduction", "Both", "Neither"], correct: 2, exp: "HMB (β-Hydroxy β-Methylbutyrate) both stimulates synthesis and reduces breakdown!" },
        { q: "Muscle protein fractional synthetic rate is typically?", opts: ["0.5%/day", "1-2%/day", "5%/day", "10%/day"], correct: 1, exp: "Healthy adults rebuild 1-2% of their muscle protein daily!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "Leucyl-tRNA synthetase acts as a sensor for which pathway?", opts: ["mTORC1", "AMPK", "p53", "NF-κB"], correct: 0, exp: "LeuRS (Leucyl-tRNA synthetase) functions as an intracellular leucine sensor for mTORC1!" },
        { q: "The leucine-sensitive GCN2 kinase primarily affects?", opts: ["mTOR", "eIF2α", "p70S6K1", "4E-BP1"], correct: 1, exp: "GCN2 phosphorylates eIF2α, reducing global protein synthesis under amino acid stress!" }
      ],
      [
        { q: "Ragulator complex localization to lysosomes requires?", opts: ["ATP", "Leucine", "v-ATPase", "All of these"], correct: 3, exp: "Ragulator needs v-ATPase, ATP, and amino acids for proper lysosomal mTORC1 signaling!" },
        { q: "The integrated stress response affects protein synthesis via?", opts: ["mTOR inhibition", "eIF2α phosphorylation", "Ribosome biogenesis", "4E-BP1 binding"], correct: 1, exp: "ISR convergently phosphorylates eIF2α, globally reducing protein synthesis!" }
      ],
      [
        { q: "CASTOR1 protein specifically senses which amino acid?", opts: ["Leucine", "Arginine", "Methionine", "Lysine"], correct: 1, exp: "CASTOR1 is a specific arginine sensor that regulates mTORC1 activity!" },
        { q: "The GATOR1 complex is inhibited by?", opts: ["Leucine directly", "Sestrin2", "CASTOR1", "Amino acid sufficiency"], correct: 3, exp: "Amino acid sensors (Sestrin2, CASTOR1) inhibit GATOR1 when amino acids are abundant!" }
      ],
      [
        { q: "Leucine catabolism produces which ketogenic metabolite?", opts: ["Acetyl-CoA", "HMG-CoA", "Acetoacetate", "β-hydroxybutyrate"], correct: 1, exp: "Leucine degrades to HMG-CoA, contributing to ketogenesis during fasting!" },
        { q: "The TSC1/2 complex is phosphorylated by which kinases?", opts: ["Akt only", "AMPK only", "Both Akt and AMPK", "Neither"], correct: 2, exp: "TSC2 is phosphorylated by Akt (activating) and AMPK (inactivating mTOR)!" }
      ],
      [
        { q: "Ribosomal protein S6 phosphorylation indicates activation of?", opts: ["mTORC1", "mTORC2", "AMPK", "p53"], correct: 0, exp: "S6K1 downstream of mTORC1 phosphorylates ribosomal S6, indicating active protein synthesis!" },
        { q: "The amino acid transporter PAT1 is specific for which amino acids?", opts: ["BCAAs", "Aromatic", "Small neutral", "Basic"], correct: 2, exp: "PAT1 transports small neutral amino acids like proline and glycine!" }
      ],
      [
        { q: "Leucine supplementation can inhibit autophagy through?", opts: ["ULK1 phosphorylation", "Beclin-1 binding", "ATG13 inhibition", "VPS34 activation"], correct: 0, exp: "mTORC1 phosphorylates ULK1, preventing autophagosome formation!" },
        { q: "The leucine sensor Sestrin2 binds which GTPase?", opts: ["Rag A/B", "Rag C/D", "Rheb", "Ran"], correct: 0, exp: "Leucine-bound Sestrin2 releases RagA/B, allowing mTORC1 lysosomal recruitment!" }
      ],
      [
        { q: "Translation initiation is regulated by which mTORC1 substrates?", opts: ["4E-BP1 only", "S6K1 only", "Both 4E-BP1 and S6K1", "Neither"], correct: 2, exp: "mTORC1 phosphorylates both 4E-BP1 (cap-dependent) and S6K1 (ribosome biogenesis)!" },
        { q: "The KICSTOR complex functions as?", opts: ["Amino acid sensor", "Lysosomal anchor", "mTOR inhibitor", "Ribosome activator"], correct: 1, exp: "KICSTOR anchors GATOR1 to lysosomes for proper amino acid sensing!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
        <h2 className="text-2xl font-bold text-blue-600">🍗 Protein Power</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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

// Complete Carb Game with all 35 question sets
function CarbGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  const carbQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      [
        { q: "Which food is a healthy carb?", opts: ["Candy", "Apple", "Soda", "Cookies"], correct: 1, exp: "Apples have healthy carbs plus fiber and vitamins! 🍎" },
        { q: "Carbs give your body what?", opts: ["Protein", "Energy", "Fat", "Water"], correct: 1, exp: "Carbs are your body's favorite fuel for energy!" }
      ],
      [
        { q: "Which carb keeps you full longer?", opts: ["White bread", "Brown rice", "Candy", "Juice"], correct: 1, exp: "Brown rice has fiber that keeps you satisfied!" },
        { q: "Vegetables are what type of food?", opts: ["Protein", "Fat", "Carbs", "None"], correct: 2, exp: "Surprise! Vegetables ARE carbs - the healthy kind!" }
      ],
      [
        { q: "What makes some carbs better than others?", opts: ["Color", "Fiber", "Size", "Price"], correct: 1, exp: "Fiber makes carbs digest slowly and keeps you full!" },
        { q: "Which breakfast carb is healthiest?", opts: ["Donut", "Oatmeal", "Pastry", "Candy"], correct: 1, exp: "Oatmeal gives you energy that lasts all morning!" }
      ],
      [
        { q: "Whole grains are better because they have?", opts: ["More sugar", "More fiber", "More fat", "Less food"], correct: 1, exp: "Whole grains keep all their fiber and nutrients!" },
        { q: "Which snack has good carbs?", opts: ["Chips", "Banana", "Candy bar", "Soda"], correct: 1, exp: "Bananas give you natural carbs plus potassium!" }
      ],
      [
        { q: "What happens when you eat too much sugar?", opts: ["Energy crash", "Stay full", "Get stronger", "Nothing"], correct: 0, exp: "Sugar gives quick energy then makes you crash and feel tired!" },
        { q: "Sweet potatoes are what color inside?", opts: ["White", "Orange", "Green", "Purple"], correct: 1, exp: "Orange sweet potatoes are packed with healthy carbs and vitamins!" }
      ],
      [
        { q: "Which has more fiber - white or wheat bread?", opts: ["White", "Wheat", "Same", "Neither"], correct: 1, exp: "Wheat bread keeps the fiber that white bread removes!" },
        { q: "Berries are good carbs because they have?", opts: ["Lots of sugar", "Fiber and vitamins", "Fat", "Protein"], correct: 1, exp: "Berries are nature's perfect carb - sweet but full of good stuff!" }
      ],
      [
        { q: "Why do athletes eat pasta?", opts: ["It tastes good", "Quick energy", "It's cheap", "It's heavy"], correct: 1, exp: "Pasta gives athletes the carb energy they need for sports!" },
        { q: "What makes fruit different from candy?", opts: ["Nothing", "Fruit has fiber", "Fruit has protein", "Candy is bigger"], correct: 1, exp: "Fruit comes with fiber, vitamins, and water - candy is just sugar!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL
    [
      [
        { q: "What is the glycemic index of white bread approximately?", opts: ["35", "55", "75", "95"], correct: 2, exp: "White bread has a high GI of ~75, causing rapid blood sugar spikes!" },
        { q: "Complex carbohydrates are primarily made of?", opts: ["Glucose only", "Fructose chains", "Glucose polymers", "Amino acids"], correct: 2, exp: "Complex carbs are long chains of glucose molecules!" }
      ],
      [
        { q: "The recommended daily carb intake is what percentage of calories?", opts: ["20-30%", "45-65%", "70-80%", "5-10%"], correct: 1, exp: "Health experts recommend 45-65% of calories from carbs - mostly complex ones!" },
        { q: "Which type of fiber helps lower cholesterol?", opts: ["Insoluble", "Soluble", "Both equally", "Neither"], correct: 1, exp: "Soluble fiber binds cholesterol and helps remove it from your body!" }
      ],
      [
        { q: "Fructose is primarily metabolized in which organ?", opts: ["Muscle", "Brain", "Liver", "Kidney"], correct: 2, exp: "Unlike glucose, fructose goes straight to the liver for processing!" },
        { q: "What causes the 'sugar crash' after eating candy?", opts: ["Insulin spike", "Dehydration", "Protein lack", "Fat content"], correct: 0, exp: "Rapid insulin release after sugar causes blood glucose to drop quickly!" }
      ],
      [
        { q: "Resistant starch acts most like what in your body?", opts: ["Sugar", "Protein", "Fiber", "Fat"], correct: 2, exp: "Resistant starch resists digestion and feeds good gut bacteria like fiber!" },
        { q: "The glycemic load considers both GI and what?", opts: ["Fiber content", "Portion size", "Protein content", "Cooking method"], correct: 1, exp: "Glycemic load = GI × carb grams per serving. Portion matters!" }
      ],
      [
        { q: "Which carb source has the most resistant starch?", opts: ["White rice", "Cooked potatoes", "Green bananas", "White bread"], correct: 2, exp: "Green bananas are packed with resistant starch that feeds gut bacteria!" },
        { q: "Beta-glucan fiber is found mainly in?", opts: ["Wheat", "Oats", "Rice", "Corn"], correct: 1, exp: "Oats contain beta-glucan, a special fiber that lowers cholesterol!" }
      ],
      [
        { q: "Carb loading before endurance events works by?", opts: ["Burning fat", "Storing glycogen", "Building muscle", "Reducing weight"], correct: 1, exp: "Athletes maximize muscle glycogen stores for sustained energy!" },
        { q: "The 'keto flu' happens because your brain needs?", opts: ["Fat", "Protein", "Glucose", "Ketones"], correct: 2, exp: "Your brain normally runs on glucose - it takes time to adapt to ketones!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "The primary glucose transporter in muscle is?", opts: ["GLUT1", "GLUT2", "GLUT4", "GLUT5"], correct: 2, exp: "GLUT4 is insulin-responsive and moves glucose into muscle cells!" },
        { q: "Insulin resistance primarily affects which tissues?", opts: ["Brain only", "Muscle and liver", "Kidneys only", "Skin only"], correct: 1, exp: "Muscle and liver become resistant to insulin's glucose uptake signals!" }
      ],
      [
        { q: "The Cori cycle recycles lactate back to?", opts: ["Fat", "Protein", "Glucose", "Ketones"], correct: 2, exp: "The liver converts lactate from muscles back into glucose!" },
        { q: "Amylose vs amylopectin differ in their?", opts: ["Sugar type", "Branching pattern", "Color", "Taste"], correct: 1, exp: "Amylose is linear, amylopectin is highly branched - affecting digestibility!" }
      ],
      [
        { q: "The rate-limiting enzyme in glycolysis is?", opts: ["Hexokinase", "Phosphofructokinase", "Pyruvate kinase", "Glucose-6-phosphatase"], correct: 1, exp: "PFK-1 is the key regulatory step controlling glucose breakdown!" },
        { q: "Muscle glycogen can only be used by?", opts: ["Any tissue", "Muscle itself", "Brain and muscle", "Liver and brain"], correct: 1, exp: "Muscle lacks glucose-6-phosphatase, so glycogen stays local!" }
      ],
      [
        { q: "The pentose phosphate pathway generates?", opts: ["ATP only", "NADH only", "NADPH and ribose", "Lactate"], correct: 2, exp: "PPP makes NADPH for biosynthesis and ribose for DNA/RNA!" },
        { q: "Glycogen phosphorylase is activated by?", opts: ["Insulin", "Glucagon", "Glucose", "Fatty acids"], correct: 1, exp: "Glucagon signals glycogen breakdown when blood glucose is low!" }
      ],
      [
        { q: "The brain's glucose consumption is approximately?", opts: ["50g/day", "100g/day", "120g/day", "200g/day"], correct: 2, exp: "Your brain uses about 120g glucose daily - 20% of total energy!" },
        { q: "Fructose bypasses which regulatory enzyme?", opts: ["Hexokinase", "PFK-1", "Pyruvate kinase", "G6Pase"], correct: 1, exp: "Fructose skips PFK-1 regulation, potentially causing metabolic issues!" }
      ],
      [
        { q: "The glucose-alanine cycle serves to?", opts: ["Store energy", "Transport nitrogen", "Make fat", "Build muscle"], correct: 1, exp: "Muscle sends nitrogen as alanine to liver for glucose production!" },
        { q: "Insulin's effect on glycogen synthesis works through?", opts: ["Direct activation", "Protein phosphorylation", "Gene expression", "Enzyme induction"], correct: 1, exp: "Insulin activates glycogen synthase through protein phosphorylation cascades!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL  
    [
      [
        { q: "Gluconeogenesis is primarily regulated by which enzyme?", opts: ["Hexokinase", "PEPCK", "Pyruvate kinase", "G6Pase"], correct: 1, exp: "PEPCK (phosphoenolpyruvate carboxykinase) is the rate-limiting step!" },
        { q: "The Randle cycle describes competition between?", opts: ["Glucose and fructose", "Glucose and fatty acids", "Protein and carbs", "Insulin and glucagon"], correct: 1, exp: "Glucose-fatty acid cycle: fat oxidation inhibits glucose use and vice versa!" }
      ],
      [
        { q: "AMPK activation in muscle primarily?", opts: ["Increases glucose uptake", "Decreases glucose uptake", "Has no effect", "Only affects fat"], correct: 0, exp: "AMPK increases GLUT4 translocation and glucose uptake during energy stress!" },
        { q: "The allosteric regulator of PFK-1 that indicates energy abundance is?", opts: ["AMP", "ATP", "ADP", "Pi"], correct: 1, exp: "ATP inhibits PFK-1, slowing glycolysis when energy is plentiful!" }
      ],
      [
        { q: "Glycogen synthase kinase-3 is inhibited by?", opts: ["Insulin", "Glucagon", "Cortisol", "Adrenaline"], correct: 0, exp: "Insulin inhibits GSK-3, relieving its inhibition of glycogen synthase!" },
        { q: "The glucose transporter in pancreatic beta cells is?", opts: ["GLUT1", "GLUT2", "GLUT3", "GLUT4"], correct: 1, exp: "GLUT2's high Km allows beta cells to sense glucose concentration changes!" }
      ],
      [
        { q: "Hepatic glucose production is suppressed by insulin at what concentration?", opts: ["10 μU/ml", "30 μU/ml", "100 μU/ml", "500 μU/ml"], correct: 1, exp: "Low insulin levels (~30 μU/ml) suppress hepatic glucose output!" },
        { q: "The committed step of glycogen synthesis is catalyzed by?", opts: ["Glycogen phosphorylase", "Glycogen synthase", "Branching enzyme", "Debranching enzyme"], correct: 1, exp: "Glycogen synthase catalyzes the committed step in glycogen formation!" }
      ],
      [
        { q: "Lactate transport across cell membranes occurs via?", opts: ["Simple diffusion", "MCT transporters", "Glucose transporters", "Active transport"], correct: 1, exp: "Monocarboxylate transporters (MCTs) facilitate lactate movement!" },
        { q: "The brain can adapt to use ketones but still requires what minimum glucose?", opts: ["30g/day", "50g/day", "75g/day", "100g/day"], correct: 0, exp: "Even in ketosis, brain needs ~30g glucose daily for specific functions!" }
      ],
      [
        { q: "Insulin's rapid effects on muscle glucose uptake occur within?", opts: ["Seconds", "Minutes", "Hours", "Days"], correct: 1, exp: "GLUT4 translocation to membrane happens within minutes of insulin binding!" },
        { q: "The glucose sensor in liver that regulates glucokinase is?", opts: ["GKRP", "G6Pase", "PFK-1", "Hexokinase"], correct: 0, exp: "Glucokinase regulatory protein (GKRP) sequesters glucokinase in nucleus!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "The pentose phosphate pathway generates NADPH primarily for?", opts: ["Energy", "Fat synthesis", "Protein synthesis", "DNA repair"], correct: 1, exp: "PPP provides NADPH for fatty acid synthesis and antioxidant defense!" },
        { q: "ChREBP transcription factor is activated by?", opts: ["Glucose", "Insulin", "Glucagon", "Fatty acids"], correct: 0, exp: "ChREBP (carbohydrate response element-binding protein) senses glucose directly!" }
      ],
      [
        { q: "The enzyme that bypasses pyruvate kinase in gluconeogenesis is?", opts: ["PEPCK", "PC", "G6Pase", "F1,6BPase"], correct: 1, exp: "Pyruvate carboxylase (PC) converts pyruvate to oxaloacetate, bypassing PK!" },
        { q: "Insulin receptor substrate (IRS) proteins are phosphorylated on?", opts: ["Serine only", "Tyrosine only", "Both Ser and Tyr", "Threonine only"], correct: 2, exp: "IRS proteins have both activating Tyr and inhibitory Ser phosphorylation sites!" }
      ],
      [
        { q: "The glucose-sensing mechanism in pancreatic β-cells involves?", opts: ["Glucokinase as sensor", "GLUT2 transport", "ATP-sensitive K+ channels", "All of these"], correct: 3, exp: "β-cells use glucokinase, GLUT2, and K-ATP channels for glucose sensing!" },
        { q: "FOXO1 transcription factor in liver promotes?", opts: ["Glycolysis", "Gluconeogenesis", "Fatty acid synthesis", "Protein synthesis"], correct: 1, exp: "FOXO1 upregulates PEPCK and G6Pase, promoting glucose production!" }
      ],
      [
        { q: "The enzyme that generates glucose-6-phosphate from glucose-1-phosphate is?", opts: ["Hexokinase", "Glucokinase", "Phosphoglucomutase", "G6Pase"], correct: 2, exp: "Phosphoglucomutase interconverts G1P and G6P in glycogen metabolism!" },
        { q: "Hepatic insulin resistance is characterized by failure to suppress?", opts: ["Glycolysis", "Gluconeogenesis", "Fatty acid oxidation", "Protein synthesis"], correct: 1, exp: "Insulin-resistant liver continues glucose production despite high insulin!" }
      ],
      [
        { q: "The rate-limiting enzyme in the hexosamine biosynthetic pathway is?", opts: ["GFAT", "Hexokinase", "PFK-1", "G6PD"], correct: 0, exp: "GFAT (glutamine:fructose-6-phosphate amidotransferase) controls flux into hexosamine pathway!" },
        { q: "O-GlcNAc modification of proteins is regulated by?", opts: ["Glucose availability", "OGT and OGA enzymes", "Hexosamine pathway", "All of these"], correct: 3, exp: "O-GlcNAcylation integrates glucose sensing with protein regulation!" }
      ],
      [
        { q: "The allosteric activator of acetyl-CoA carboxylase is?", opts: ["Citrate", "Palmitoyl-CoA", "AMP", "Glucagon"], correct: 0, exp: "Citrate activates ACC, linking glucose metabolism to fat synthesis!" },
        { q: "SREBP-1c transcription is activated by?", opts: ["Insulin", "ChREBP", "LXR", "All of these"], correct: 3, exp: "Multiple pathways converge on SREBP-1c to coordinate lipogenesis!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
    const totalPossible = carbQuestions.reduce((sum, round) => sum + round[currentDay].length, 0);
    const percentage = Math.round((score / totalPossible) * 100);
    
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Carb Mastery Complete!</h2>
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
        <h2 className="text-2xl font-bold text-yellow-600">🍌 Carb Truth</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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

// Complete Fat Game with all 35 question sets
function FatGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  const fatQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      [
        { q: "Which contains the healthiest fats?", opts: ["French fries", "Avocado", "Butter", "Fried chicken"], correct: 1, exp: "Avocados have heart-healthy monounsaturated fats! 🥑" },
        { q: "Fat gives your body what?", opts: ["Quick energy", "Long-lasting energy", "Protein", "Water"], correct: 1, exp: "Fat provides slow-burning, long-lasting energy!" }
      ],
      [
        { q: "Which fat is good for your heart?", opts: ["Butter", "Olive oil", "Lard", "Fried foods"], correct: 1, exp: "Olive oil has healthy fats that help your heart stay strong!" },
        { q: "Nuts have what kind of fat?", opts: ["Bad fat", "Good fat", "No fat", "Sweet fat"], correct: 1, exp: "Nuts have healthy fats plus protein and fiber! 🥜" }
      ],
      [
        { q: "Which fish has healthy fats?", opts: ["Fried fish sticks", "Grilled salmon", "Fish and chips", "Canned tuna in oil"], correct: 1, exp: "Salmon has omega-3 fats that make your brain and heart happy!" },
        { q: "How much fat should you eat daily?", opts: ["None at all", "A little bit", "Lots and lots", "Only fried foods"], correct: 1, exp: "You need some healthy fat every day, but not too much!" }
      ],
      [
        { q: "Trans fats are found in?", opts: ["Fresh fruits", "Vegetables", "Some processed foods", "Water"], correct: 2, exp: "Trans fats hide in some packaged foods and aren't good for you!" },
        { q: "Which cooking fat is healthiest?", opts: ["Olive oil", "Butter", "Lard", "Margarine"], correct: 0, exp: "Olive oil is a great choice for cooking healthy foods!" }
      ],
      [
        { q: "Fat has how many calories per gram?", opts: ["4", "7", "9", "12"], correct: 2, exp: "Fat has 9 calories per gram - more than carbs or protein!" },
        { q: "Which snack has good fats?", opts: ["Chips", "Almonds", "Candy", "Cookies"], correct: 1, exp: "Almonds give you good fats and protein to keep you full!" }
      ],
      [
        { q: "Saturated fat is found mostly in?", opts: ["Fruits", "Animal products", "Vegetables", "Water"], correct: 1, exp: "Animal foods like meat and dairy have saturated fat!" },
        { q: "Why does your body need some fat?", opts: ["To store vitamins", "To taste good", "To look pretty", "No reason"], correct: 0, exp: "Your body needs fat to absorb vitamins A, D, E, and K!" }
      ],
      [
        { q: "Coconut oil is what type of fat?", opts: ["Unsaturated", "Saturated", "Trans fat", "Protein"], correct: 1, exp: "Coconut oil is mostly saturated fat, even though it's plant-based!" },
        { q: "Which has more fat - an avocado or apple?", opts: ["Apple", "Avocado", "Same amount", "Neither has fat"], correct: 1, exp: "Avocados are full of healthy fats, while apples have almost none!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL
    [
      [
        { q: "Omega-3 fatty acids are considered what type?", opts: ["Saturated", "Monounsaturated", "Polyunsaturated", "Trans"], correct: 2, exp: "Omega-3s are polyunsaturated fats essential for health!" },
        { q: "The recommended fat intake is what percent of calories?", opts: ["10-15%", "20-35%", "45-60%", "5-10%"], correct: 1, exp: "Health experts recommend 20-35% of calories from healthy fats!" }
      ],
      [
        { q: "HDL cholesterol is considered?", opts: ["Bad cholesterol", "Good cholesterol", "Neutral", "Protein"], correct: 1, exp: "HDL (High-Density Lipoprotein) carries cholesterol away from arteries!" },
        { q: "Which fat raises LDL cholesterol most?", opts: ["Monounsaturated", "Polyunsaturated", "Saturated", "Omega-3"], correct: 2, exp: "Saturated fats raise LDL (bad) cholesterol more than other fats!" }
      ],
      [
        { q: "Essential fatty acids must be obtained from?", opts: ["Body production", "Diet", "Supplements only", "Exercise"], correct: 1, exp: "Your body can't make essential fatty acids - you must eat them!" },
        { q: "Trans fats are created by?", opts: ["Nature", "Hydrogenation", "Fermentation", "Heating"], correct: 1, exp: "Hydrogenation turns liquid oils into solid trans fats!" }
      ],
      [
        { q: "The Mediterranean diet emphasizes which fat?", opts: ["Butter", "Olive oil", "Lard", "Coconut oil"], correct: 1, exp: "Mediterranean diet features olive oil and its heart-healthy benefits!" },
        { q: "Cholesterol is found in which foods?", opts: ["Plants only", "Animals only", "Both", "Neither"], correct: 1, exp: "Only animal products contain dietary cholesterol!" }
      ],
      [
        { q: "Omega-6 to omega-3 ratio should ideally be?", opts: ["1:1", "4:1", "10:1", "20:1"], correct: 1, exp: "Modern diets have too much omega-6; aim for 4:1 or lower ratio!" },
        { q: "Fat-soluble vitamins are?", opts: ["B and C", "A, D, E, K", "All vitamins", "No vitamins"], correct: 1, exp: "Vitamins A, D, E, and K need fat for absorption!" }
      ],
      [
        { q: "The ketogenic diet gets most calories from?", opts: ["Carbs", "Protein", "Fat", "Alcohol"], correct: 2, exp: "Keto diets are 70-80% fat to induce ketosis!" },
        { q: "Which cooking method preserves healthy fats best?", opts: ["Deep frying", "Low-heat cooking", "High-heat frying", "Boiling"], correct: 1, exp: "High heat damages delicate omega-3 and other healthy fats!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "Lipoprotein lipase (LPL) functions to?", opts: ["Make cholesterol", "Break down triglycerides", "Synthesize fatty acids", "Absorb vitamins"], correct: 1, exp: "LPL breaks down triglycerides in lipoproteins for tissue uptake!" },
        { q: "The rate-limiting enzyme in fatty acid synthesis is?", opts: ["Acetyl-CoA carboxylase", "Fatty acid synthase", "HMG-CoA reductase", "Lipoprotein lipase"], correct: 0, exp: "ACC controls the committed step in fatty acid biosynthesis!" }
      ],
      [
        { q: "Bile salts are synthesized from?", opts: ["Fatty acids", "Cholesterol", "Proteins", "Carbohydrates"], correct: 1, exp: "Cholesterol is converted to bile salts for fat digestion!" },
        { q: "Adipose tissue releases fatty acids through?", opts: ["Lipogenesis", "Lipolysis", "Gluconeogenesis", "Glycolysis"], correct: 1, exp: "Lipolysis breaks down stored triglycerides into free fatty acids!" }
      ],
      [
        { q: "The committed step of cholesterol synthesis is catalyzed by?", opts: ["ACC", "HMG-CoA reductase", "Fatty acid synthase", "LPL"], correct: 1, exp: "HMG-CoA reductase is the regulated step in cholesterol biosynthesis!" },
        { q: "Hormone-sensitive lipase is activated by?", opts: ["Insulin", "Glucagon", "Glucose", "Fatty acids"], correct: 1, exp: "Glucagon and epinephrine activate HSL to release stored fat!" }
      ],
      [
        { q: "Chylomicrons transport dietary fats to?", opts: ["Liver only", "Muscle only", "Adipose tissue", "All tissues"], correct: 3, exp: "Chylomicrons deliver dietary fats throughout the body!" },
        { q: "The Randle cycle involves competition between?", opts: ["Fat and protein", "Fat and carbs", "Protein and carbs", "All macros"], correct: 1, exp: "Fat oxidation inhibits glucose utilization and vice versa!" }
      ],
      [
        { q: "Peroxisomal β-oxidation handles?", opts: ["Short-chain fatty acids", "Medium-chain fatty acids", "Very long-chain fatty acids", "All fatty acids equally"], correct: 2, exp: "Peroxisomes specialize in very long-chain fatty acid oxidation!" },
        { q: "Lecithin-cholesterol acyltransferase (LCAT) functions in?", opts: ["Fat synthesis", "Cholesterol esterification", "Fat digestion", "Vitamin absorption"], correct: 1, exp: "LCAT esterifies cholesterol in HDL for reverse cholesterol transport!" }
      ],
      [
        { q: "Malonyl-CoA inhibits which process?", opts: ["Fat synthesis", "Fat oxidation", "Cholesterol synthesis", "Protein synthesis"], correct: 1, exp: "Malonyl-CoA blocks CPT1, preventing fatty acid oxidation during fat synthesis!" },
        { q: "VLDL particles are assembled in the?", opts: ["Intestine", "Liver", "Adipose tissue", "Muscle"], correct: 1, exp: "The liver packages endogenous fats into VLDL particles!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL
    [
      [
        { q: "SREBP-1c primarily regulates?", opts: ["Cholesterol synthesis", "Fatty acid synthesis", "Fat oxidation", "Protein synthesis"], correct: 1, exp: "SREBP-1c is the master transcriptional regulator of lipogenesis!" },
        { q: "Carnitine palmitoyltransferase I (CPT1) is inhibited by?", opts: ["Acetyl-CoA", "Malonyl-CoA", "Citrate", "ATP"], correct: 1, exp: "Malonyl-CoA prevents fat oxidation when the body is making fat!" }
      ],
      [
        { q: "PPARα activation primarily promotes?", opts: ["Fat storage", "Fat oxidation", "Cholesterol synthesis", "Glucose production"], correct: 1, exp: "PPARα turns on genes for fatty acid oxidation, especially during fasting!" },
        { q: "The scavenger receptor SR-B1 mediates uptake of?", opts: ["LDL", "VLDL", "HDL", "Chylomicrons"], correct: 2, exp: "SR-B1 selectively takes up cholesterol from HDL in the liver!" }
      ],
      [
        { q: "AMPK activation in adipose tissue promotes?", opts: ["Lipolysis", "Lipogenesis", "Both equally", "Neither"], correct: 0, exp: "AMPK phosphorylates and activates hormone-sensitive lipase!" },
        { q: "The cholesterol 7α-hydroxylase enzyme is regulated by?", opts: ["Insulin", "Cholesterol levels", "Fatty acids", "Glucose"], correct: 1, exp: "CYP7A1 converts excess cholesterol to bile acids for elimination!" }
      ],
      [
        { q: "Adipose triglyceride lipase (ATGL) is the rate-limiting enzyme for?", opts: ["Fat synthesis", "Initial lipolysis", "Complete fat breakdown", "Fat storage"], correct: 1, exp: "ATGL catalyzes the first step of triglyceride hydrolysis in fat cells!" },
        { q: "PCSK9 protein functions to?", opts: ["Increase LDL receptors", "Degrade LDL receptors", "Synthesize cholesterol", "Transport cholesterol"], correct: 1, exp: "PCSK9 promotes degradation of LDL receptors, raising blood cholesterol!" }
      ],
      [
        { q: "The microsomal triglyceride transfer protein (MTP) is essential for?", opts: ["Fat absorption", "Lipoprotein assembly", "Fat oxidation", "Cholesterol synthesis"], correct: 1, exp: "MTP is required for assembling apoB-containing lipoproteins!" },
        { q: "Fatty acid synthase produces which fatty acid?", opts: ["Oleic acid", "Palmitic acid", "Stearic acid", "Linoleic acid"], correct: 1, exp: "FAS synthesizes palmitic acid (16:0) as the primary product!" }
      ],
      [
        { q: "The cholesteryl ester transfer protein (CETP) transfers lipids between?", opts: ["Cells", "Lipoproteins", "Tissues", "Organs"], correct: 1, exp: "CETP moves cholesteryl esters and triglycerides between lipoproteins!" },
        { q: "Insulin's effect on adipose tissue lipolysis is mediated through?", opts: ["Direct enzyme activation", "Phosphodiesterase activation", "cAMP elevation", "PKA activation"], correct: 1, exp: "Insulin activates phosphodiesterase, lowering cAMP and reducing lipolysis!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "The SREBP cleavage-activating protein (SCAP) functions as a?", opts: ["Transcription factor", "Sterol sensor", "Fatty acid sensor", "Glucose sensor"], correct: 1, exp: "SCAP senses sterol levels and regulates SREBP processing!" },
        { q: "Insig proteins regulate SREBP by?", opts: ["Direct binding", "Retaining SCAP-SREBP in ER", "Enhancing cleavage", "Blocking transcription"], correct: 1, exp: "Insig proteins retain SCAP-SREBP complex in ER when sterols are abundant!" }
      ],
      [
        { q: "The acyl-CoA:diacylglycerol acyltransferase (DGAT) enzymes catalyze?", opts: ["First step of lipolysis", "Final step of triglyceride synthesis", "Cholesterol esterification", "Fatty acid oxidation"], correct: 1, exp: "DGAT catalyzes the final committed step in triglyceride biosynthesis!" },
        { q: "Comparative gene identification-58 (CGI-58) functions as?", opts: ["Lipase inhibitor", "Lipase co-activator", "Transcription factor", "Fatty acid transporter"], correct: 1, exp: "CGI-58 is a co-activator required for ATGL-mediated lipolysis!" }
      ],
      [
        { q: "The G0/G1 switch gene 2 (G0S2) protein?", opts: ["Activates lipolysis", "Inhibits ATGL", "Promotes fat synthesis", "Transports fatty acids"], correct: 1, exp: "G0S2 is a potent inhibitor of adipose triglyceride lipase!" },
        { q: "Stearoyl-CoA desaturase-1 (SCD1) introduces double bonds at which position?", opts: ["Δ6", "Δ9", "Δ12", "Δ15"], correct: 1, exp: "SCD1 introduces the first double bond at the Δ9 position!" }
      ],
      [
        { q: "The ATP-binding cassette transporters ABCA1 and ABCG1 facilitate?", opts: ["Fat absorption", "Cholesterol efflux", "Fatty acid uptake", "Triglyceride synthesis"], correct: 1, exp: "ABC transporters mediate cholesterol efflux from cells to HDL!" },
        { q: "Fatty acid binding proteins (FABPs) function primarily as?", opts: ["Enzymes", "Intracellular transporters", "Membrane receptors", "Transcription factors"], correct: 1, exp: "FABPs transport fatty acids within cells and may regulate gene expression!" }
      ],
      [
        { q: "The endoplasmic reticulum stress response affects lipid metabolism through?", opts: ["SREBP activation", "SREBP suppression", "Both activation and suppression", "No effect"], correct: 2, exp: "ER stress can both activate SREBP1c and suppress SREBP2 depending on conditions!" },
        { q: "Perilipins are proteins that?", opts: ["Synthesize fat", "Coat lipid droplets", "Transport cholesterol", "Absorb vitamins"], correct: 1, exp: "Perilipins coat lipid droplets and regulate lipolysis access!" }
      ],
      [
        { q: "The liver X receptors (LXRs) are activated by?", opts: ["Fatty acids", "Cholesterol metabolites", "Glucose", "Amino acids"], correct: 1, exp: "LXRs are activated by oxysterols and regulate cholesterol homeostasis!" },
        { q: "Acetyl-CoA carboxylase exists in how many isoforms?", opts: ["1", "2", "3", "4"], correct: 1, exp: "ACC1 (cytosolic) and ACC2 (mitochondrial) have different metabolic roles!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
          <h2 className="text-2xl font-bold text-green-600 mb-4">Fat Mastery Complete!</h2>
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
        <h2 className="text-2xl font-bold text-green-600">🥑 Fat Facts</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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

// Complete Alcohol Game with all 35 question sets
function AlcoholGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  const alcoholQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      [
        { q: "How many calories in one beer?", opts: ["50", "100", "150", "200"], correct: 2, exp: "A regular beer has about 150 calories - like a slice of bread! 🍺" },
        { q: "Alcohol gives your body what?", opts: ["Vitamins", "Empty calories", "Protein", "Fiber"], correct: 1, exp: "Alcohol has calories but no vitamins, minerals, or other good stuff!" }
      ],
      [
        { q: "Which drink has the most calories?", opts: ["Light beer", "Wine", "Margarita", "Water"], correct: 2, exp: "Cocktails like margaritas can have 400+ calories - like a meal! 🍹" },
        { q: "Drinking alcohol makes you feel what?", opts: ["Hungry", "Full", "Thirsty", "Sleepy"], correct: 0, exp: "Alcohol can make you hungrier and eat more food!" }
      ],
      [
        { q: "How many drinks per week is considered safe for adults?", opts: ["0-7", "10-15", "20-25", "Any amount"], correct: 0, exp: "Health experts suggest no more than 7 drinks per week for women, 14 for men!" },
        { q: "Wine has calories because it contains?", opts: ["Grapes", "Sugar and alcohol", "Water", "Vitamins"], correct: 1, exp: "Wine has calories from leftover sugar and the alcohol itself!" }
      ],
      [
        { q: "Which has fewer calories?", opts: ["Regular beer", "Light beer", "Same amount", "Neither has calories"], correct: 1, exp: "Light beer has about 100 calories vs 150 for regular beer!" },
        { q: "Alcohol affects your body's ability to?", opts: ["Think clearly", "Burn fat", "Both", "Neither"], correct: 2, exp: "Alcohol slows down thinking AND fat burning!" }
      ],
      [
        { q: "A glass of wine has about the same calories as?", opts: ["Apple", "Cookie", "Carrot", "Celery"], correct: 1, exp: "Wine has 120-130 calories - similar to a cookie! 🍷" },
        { q: "Drinking alcohol before bed affects your?", opts: ["Dreams", "Sleep quality", "Height", "Hair"], correct: 1, exp: "Alcohol disrupts deep sleep, making you tired the next day!" }
      ],
      [
        { q: "Which drink is lowest in calories?", opts: ["Beer", "Vodka soda", "Piña colada", "Daiquiri"], correct: 1, exp: "Vodka with soda water is one of the lowest calorie alcoholic drinks!" },
        { q: "Alcohol is processed by which organ?", opts: ["Heart", "Liver", "Brain", "Stomach"], correct: 1, exp: "Your liver works hard to break down alcohol!" }
      ],
      [
        { q: "'Beer belly' happens because beer?", opts: ["Has no calories", "Has many calories", "Builds muscle", "Contains protein"], correct: 1, exp: "Beer calories can add up and get stored as belly fat!" },
        { q: "Alcohol provides how many calories per gram?", opts: ["4", "7", "9", "0"], correct: 1, exp: "Alcohol has 7 calories per gram - almost as much as fat!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL
    [
      [
        { q: "Blood alcohol content (BAC) of 0.08% is considered?", opts: ["Sober", "Buzzed", "Legally drunk", "Tipsy"], correct: 2, exp: "0.08% BAC is the legal limit for drunk driving in most places!" },
        { q: "Binge drinking is defined as how many drinks?", opts: ["2-3", "4-5", "6-7", "8-9"], correct: 1, exp: "4+ drinks for women, 5+ for men in 2 hours = binge drinking!" }
      ],
      [
        { q: "Alcohol is primarily absorbed in the?", opts: ["Mouth", "Stomach", "Small intestine", "Large intestine"], correct: 2, exp: "About 80% of alcohol is absorbed in the small intestine!" },
        { q: "Women process alcohol differently because they have less?", opts: ["Liver tissue", "Alcohol dehydrogenase", "Body water", "All of these"], correct: 3, exp: "Women have less of the enzyme that breaks down alcohol plus less body water!" }
      ],
      [
        { q: "The recommended limit for women is how many drinks per day?", opts: ["1", "2", "3", "4"], correct: 0, exp: "Health guidelines suggest no more than 1 drink per day for women!" },
        { q: "Alcohol calories are metabolized differently because they?", opts: ["Burn slower", "Can't be stored as fat", "Are processed first", "Have no energy"], correct: 2, exp: "Your body prioritizes burning alcohol calories over fat or carbs!" }
      ],
      [
        { q: "Congeners in darker alcohols cause more?", opts: ["Calories", "Hangovers", "Nutrition", "Hydration"], correct: 1, exp: "Congeners in whiskey and red wine can make hangovers worse!" },
        { q: "Alcohol interferes with which vitamins?", opts: ["A and D", "B vitamins", "C and E", "K only"], correct: 1, exp: "Alcohol depletes B vitamins, especially thiamine and folate!" }
      ],
      [
        { q: "The liver can process about how much alcohol per hour?", opts: ["0.5 oz", "1 oz", "2 oz", "4 oz"], correct: 1, exp: "Your liver can only handle about 1 drink (1 oz alcohol) per hour!" },
        { q: "Alcohol's effect on metabolism lasts how long?", opts: ["1 hour", "6 hours", "24 hours", "3 days"], correct: 2, exp: "Alcohol can slow fat burning for up to 24 hours after drinking!" }
      ],
      [
        { q: "Which mixer adds the most calories?", opts: ["Soda water", "Diet coke", "Fruit juice", "Ice"], correct: 2, exp: "Fruit juice mixers can add 100+ calories to your drink!" },
        { q: "Alcohol affects hormones that control?", opts: ["Height", "Hunger", "Hair growth", "Hearing"], correct: 1, exp: "Alcohol messes with leptin and ghrelin - your hunger hormones!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "Ethanol is metabolized primarily by which enzyme?", opts: ["Alcohol dehydrogenase", "Acetaldehyde dehydrogenase", "CYP2E1", "Catalase"], correct: 0, exp: "Alcohol dehydrogenase (ADH) is the main enzyme for ethanol metabolism!" },
        { q: "The toxic intermediate in alcohol metabolism is?", opts: ["Acetate", "Acetaldehyde", "Ethyl acetate", "Pyruvate"], correct: 1, exp: "Acetaldehyde is toxic and causes many hangover symptoms!" }
      ],
      [
        { q: "Chronic alcohol consumption induces which enzyme system?", opts: ["ADH", "ALDH", "CYP2E1", "Catalase"], correct: 2, exp: "CYP2E1 is induced by chronic drinking, increasing alcohol tolerance!" },
        { q: "The MEOS (microsomal ethanol-oxidizing system) is located in?", opts: ["Cytoplasm", "Mitochondria", "Endoplasmic reticulum", "Nucleus"], correct: 2, exp: "MEOS operates in the smooth endoplasmic reticulum!" }
      ],
      [
        { q: "Alcohol metabolism produces which cofactor?", opts: ["NAD+", "NADH", "FADH2", "ATP"], correct: 1, exp: "Both ADH and ALDH steps produce NADH, altering cellular metabolism!" },
        { q: "The Michaelis constant (Km) of ADH for ethanol is?", opts: ["Very low", "Very high", "Moderate", "Variable"], correct: 0, exp: "ADH has low Km for ethanol, meaning it's easily saturated (zero-order kinetics)!" }
      ],
      [
        { q: "Disulfiram (Antabuse) works by inhibiting?", opts: ["ADH", "ALDH", "CYP2E1", "All enzymes"], correct: 1, exp: "Disulfiram blocks ALDH, causing acetaldehyde buildup and hangover symptoms!" },
        { q: "Alcohol's effect on gluconeogenesis leads to?", opts: ["Hyperglycemia", "Hypoglycemia", "No change", "Ketosis"], correct: 1, exp: "Alcohol inhibits gluconeogenesis, potentially causing low blood sugar!" }
      ],
      [
        { q: "The Asian alcohol flush reaction is due to deficiency in?", opts: ["ADH", "ALDH2", "CYP2E1", "Catalase"], correct: 1, exp: "ALDH2 deficiency causes acetaldehyde buildup and facial flushing!" },
        { q: "Alcohol's thermogenic effect is approximately?", opts: ["0%", "15%", "25%", "50%"], correct: 1, exp: "About 15% of alcohol calories are lost as heat during metabolism!" }
      ],
      [
        { q: "Chronic alcohol consumption affects lipid metabolism by?", opts: ["Increasing lipolysis", "Decreasing lipogenesis", "Promoting fatty liver", "Reducing cholesterol"], correct: 2, exp: "Alcohol metabolism favors fatty acid synthesis and liver fat accumulation!" },
        { q: "The blood-brain barrier permeability to alcohol is?", opts: ["Very low", "Moderate", "Very high", "Variable"], correct: 2, exp: "Alcohol easily crosses the blood-brain barrier due to its lipophilic nature!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL
    [
      [
        { q: "Alcohol metabolism follows which kinetics at physiological concentrations?", opts: ["First-order", "Zero-order", "Michaelis-Menten", "Sigmoidal"], correct: 1, exp: "ADH is saturated at low alcohol concentrations, following zero-order kinetics!" },
        { q: "The rate-limiting step in alcohol metabolism is?", opts: ["Ethanol to acetaldehyde", "Acetaldehyde to acetate", "Both equally", "Neither"], correct: 0, exp: "ADH conversion of ethanol to acetaldehyde is typically rate-limiting!" }
      ],
      [
        { q: "CYP2E1 induction by alcohol increases production of?", opts: ["Acetaldehyde only", "Reactive oxygen species", "NADH", "Acetate"], correct: 1, exp: "CYP2E1 generates ROS, contributing to alcohol-induced oxidative stress!" },
        { q: "The altered NADH/NAD+ ratio from alcohol metabolism affects?", opts: ["Glycolysis only", "TCA cycle only", "Multiple metabolic pathways", "No pathways"], correct: 2, exp: "High NADH/NAD+ ratio disrupts gluconeogenesis, fatty acid oxidation, and TCA cycle!" }
      ],
      [
        { q: "Alcohol-induced fatty liver is primarily due to?", opts: ["Increased lipogenesis", "Decreased fatty acid oxidation", "Impaired VLDL secretion", "All of these"], correct: 3, exp: "All three mechanisms contribute to alcoholic fatty liver disease!" },
        { q: "The polymorphism in ADH1B gene affects?", opts: ["Enzyme activity", "Alcohol metabolism rate", "Addiction susceptibility", "All of these"], correct: 3, exp: "ADH1B variants significantly influence alcohol pharmacokinetics and addiction risk!" }
      ],
      [
        { q: "Chronic alcohol exposure leads to mitochondrial dysfunction via?", opts: ["Acetaldehyde toxicity", "ROS damage", "Altered calcium homeostasis", "All of these"], correct: 3, exp: "Multiple mechanisms converge to damage mitochondria in chronic alcoholism!" },
        { q: "The microRNA miR-122 is regulated by alcohol and affects?", opts: ["Cholesterol synthesis", "Fatty acid metabolism", "Both", "Neither"], correct: 2, exp: "miR-122 is a key regulator of hepatic lipid metabolism affected by alcohol!" }
      ],
      [
        { q: "Alcohol's interaction with the endocannabinoid system involves?", opts: ["CB1 receptors", "Endocannabinoid levels", "Addiction pathways", "All of these"], correct: 3, exp: "Alcohol modulates endocannabinoid signaling, influencing addiction and metabolism!" },
        { q: "The epigenetic effects of alcohol include modifications to?", opts: ["DNA methylation", "Histone acetylation", "microRNA expression", "All of these"], correct: 3, exp: "Alcohol causes widespread epigenetic changes affecting gene expression!" }
      ],
      [
        { q: "Aldehyde dehydrogenase exists in how many major isoforms?", opts: ["2", "4", "6", "8"], correct: 1, exp: "ALDH1 and ALDH2 are cytosolic and mitochondrial isoforms, respectively!" },
        { q: "The gut microbiome changes with alcohol consumption affect?", opts: ["Intestinal permeability", "Inflammation", "Metabolism", "All of these"], correct: 3, exp: "Alcohol-induced dysbiosis contributes to leaky gut and systemic inflammation!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "The transcription factor SREBP-1c is activated by alcohol via?", opts: ["Direct binding", "LXR activation", "ChREBP pathway", "JNK signaling"], correct: 1, exp: "Alcohol activates LXRα, which then induces SREBP-1c expression!" },
        { q: "Alcohol-induced steatosis involves dysregulation of?", opts: ["PPARα only", "SREBP-1c only", "Both PPARα and SREBP-1c", "Neither"], correct: 2, exp: "Alcohol suppresses PPARα (fat oxidation) while activating SREBP-1c (fat synthesis)!" }
      ],
      [
        { q: "The enzyme CYP2E1 is regulated by alcohol through?", opts: ["Transcriptional activation", "Post-translational stabilization", "Both mechanisms", "Neither"], correct: 2, exp: "Alcohol both induces CYP2E1 transcription and stabilizes the protein!" },
        { q: "Kupffer cells in alcoholic liver disease are activated by?", opts: ["Endotoxins", "Acetaldehyde", "ROS", "All of these"], correct: 3, exp: "Multiple alcohol metabolites and gut-derived endotoxins activate hepatic macrophages!" }
      ],
      [
        { q: "The sirtuin SIRT1 is affected by alcohol metabolism through?", opts: ["NAD+ depletion", "Direct inhibition", "Acetaldehyde binding", "ROS inactivation"], correct: 0, exp: "Alcohol metabolism consumes NAD+, reducing SIRT1 activity and metabolic regulation!" },
        { q: "Alcohol-induced autophagy dysregulation involves?", opts: ["mTOR signaling", "AMPK signaling", "Lysosomal function", "All of these"], correct: 3, exp: "Alcohol disrupts multiple autophagy pathways, contributing to hepatocyte damage!" }
      ],
      [
        { q: "The FGF21 hormone response to alcohol serves to?", opts: ["Increase alcohol metabolism", "Protect against steatosis", "Promote inflammation", "Reduce insulin sensitivity"], correct: 1, exp: "FGF21 is a protective hormone induced by alcohol to counter metabolic dysfunction!" },
        { q: "Chronic alcohol consumption affects the hypothalamic-pituitary-adrenal axis via?", opts: ["CRH dysregulation", "Cortisol alterations", "Stress response changes", "All of these"], correct: 3, exp: "Alcohol profoundly alters neuroendocrine stress responses!" }
      ],
      [
        { q: "The acetaldhyde-protein adducts formed during alcohol metabolism?", opts: ["Are inert", "Trigger immune responses", "Are rapidly cleared", "Have no effects"], correct: 1, exp: "Acetaldehyde-protein adducts are immunogenic and contribute to liver damage!" },
        { q: "Alcohol's effect on the circadian rhythm involves disruption of?", opts: ["CLOCK genes", "NAD+ oscillations", "Hormonal rhythms", "All of these"], correct: 3, exp: "Alcohol disrupts multiple components of the circadian timing system!" }
      ],
      [
        { q: "The gut-liver axis in alcoholic liver disease involves?", opts: ["Intestinal permeability", "Bacterial translocation", "Immune activation", "All of these"], correct: 3, exp: "Alcohol disrupts the gut barrier, allowing bacterial products to reach the liver!" },
        { q: "Retinoid metabolism is altered by alcohol through competition for?", opts: ["ADH", "ALDH", "Both ADH and ALDH", "Neither"], correct: 2, exp: "Alcohol and retinoids compete for the same metabolic enzymes, affecting vitamin A!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Alcohol Mastery Complete!</h2>
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
        <h2 className="text-2xl font-bold text-purple-600">🍷 Liquid Calories</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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

// Complete TDEE Game with all 35 question sets
function TDEEGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  const tdeeQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      [
        { q: "TDEE stands for what?", opts: ["Total Daily Exercise Energy", "Total Daily Energy Expenditure", "Total Diet Energy Estimate", "Total Daily Eating Energy"], correct: 1, exp: "TDEE = Total Daily Energy Expenditure - all calories you burn in a day! 🔥" },
        { q: "Which burns more calories?", opts: ["Sitting", "Walking", "Sleeping", "Watching TV"], correct: 1, exp: "Walking burns way more calories than sitting around!" }
      ],
      [
        { q: "Your body burns calories when you?", opts: ["Exercise only", "Sleep only", "All the time", "Never"], correct: 2, exp: "Your body burns calories 24/7 - even while sleeping!" },
        { q: "Which person burns more calories daily?", opts: ["Bigger person", "Smaller person", "Same amount", "Depends on clothes"], correct: 0, exp: "Bigger bodies need more energy to function, so they burn more calories!" }
      ],
      [
        { q: "Walking for 30 minutes burns about how many calories?", opts: ["10", "100", "500", "1000"], correct: 1, exp: "A 30-minute walk burns roughly 100-150 calories!" },
        { q: "Your heart beating and breathing burns calories called?", opts: ["Exercise calories", "Resting calories", "Food calories", "Fun calories"], correct: 1, exp: "Your resting metabolism keeps you alive and burns lots of calories!" }
      ],
      [
        { q: "Which activity burns the most calories?", opts: ["Reading", "Swimming", "Texting", "Napping"], correct: 1, exp: "Swimming is a great full-body workout that burns tons of calories! 🏊" },
        { q: "Men usually burn more calories than women because they have more?", opts: ["Hair", "Muscle", "Clothes", "Books"], correct: 1, exp: "More muscle mass means burning more calories all day long!" }
      ],
      [
        { q: "To lose 1 pound, you need to burn how many extra calories?", opts: ["100", "1000", "3500", "10000"], correct: 2, exp: "It takes about 3500 calories to lose 1 pound of fat!" },
        { q: "Fidgeting and moving around burns calories called?", opts: ["Neat calories", "NEAT", "Moving energy", "Fidget fuel"], correct: 1, exp: "NEAT = Non-Exercise Activity Thermogenesis - fidgeting counts!" }
      ],
      [
        { q: "Your metabolism is fastest when you're?", opts: ["Sleeping", "Young", "Old", "Cold"], correct: 1, exp: "Young people have faster metabolisms than older people!" },
        { q: "Which burns more calories - building muscle or maintaining it?", opts: ["Building", "Maintaining", "Same amount", "Neither burns calories"], correct: 0, exp: "Building new muscle burns more calories than keeping existing muscle!" }
      ],
      [
        { q: "Cold weather makes your body burn?", opts: ["Fewer calories", "More calories", "Same calories", "No calories"], correct: 1, exp: "Your body burns extra calories to stay warm in cold weather! 🥶" },
        { q: "The biggest part of your daily calorie burn is?", opts: ["Exercise", "Just staying alive", "Walking", "Thinking"], correct: 1, exp: "Your basic body functions (staying alive) burn 60-70% of your daily calories!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL
    [
      [
        { q: "BMR stands for?", opts: ["Basic Metabolic Rate", "Body Mass Rate", "Basal Metabolic Rate", "Best Metabolic Rate"], correct: 2, exp: "Basal Metabolic Rate - the calories you burn just staying alive!" },
        { q: "BMR is typically what percent of TDEE?", opts: ["30-40%", "60-70%", "80-90%", "10-20%"], correct: 1, exp: "Your BMR accounts for 60-70% of total daily calorie burn!" }
      ],
      [
        { q: "The thermic effect of food (TEF) burns what percent of calories eaten?", opts: ["1-3%", "8-12%", "20-25%", "50%"], correct: 1, exp: "About 8-12% of calories are burned digesting and processing food!" },
        { q: "NEAT includes which activities?", opts: ["Planned exercise", "Fidgeting and posture", "Sleeping", "Eating"], correct: 1, exp: "NEAT = all movement that isn't formal exercise!" }
      ],
      [
        { q: "Age affects metabolism by decreasing it approximately?", opts: ["1-2% per decade", "5% per decade", "10% per decade", "20% per decade"], correct: 0, exp: "Metabolism drops 1-2% per decade after age 30!" },
        { q: "Muscle tissue burns how many calories per pound per day?", opts: ["1-2", "6-7", "15-20", "50"], correct: 1, exp: "Each pound of muscle burns about 6-7 calories per day at rest!" }
      ],
      [
        { q: "The Harris-Benedict equation estimates?", opts: ["Body weight", "BMR", "Exercise calories", "Food intake"], correct: 1, exp: "Harris-Benedict calculates your Basal Metabolic Rate!" },
        { q: "Activity factors for TDEE calculation range from?", opts: ["0.5-1.0", "1.2-1.9", "2.0-3.0", "5.0-10.0"], correct: 1, exp: "Sedentary = 1.2, Very Active = 1.9 multiplied by BMR!" }
      ],
      [
        { q: "Adaptive thermogenesis means your metabolism?", opts: ["Never changes", "Slows with dieting", "Speeds up always", "Only works at night"], correct: 1, exp: "Your body slows metabolism when you diet to conserve energy!" },
        { q: "Brown adipose tissue (brown fat) burns calories to produce?", opts: ["Protein", "Heat", "Vitamins", "Water"], correct: 1, exp: "Brown fat burns calories specifically to generate body heat!" }
      ],
      [
        { q: "Interval training burns more calories than steady cardio because of?", opts: ["EPOC", "NEAT", "TEF", "BMR"], correct: 0, exp: "EPOC = Excess Post-Exercise Oxygen Consumption - afterburn effect!" },
        { q: "Thyroid hormones T3 and T4 regulate?", opts: ["Heart rate only", "Metabolic rate", "Muscle growth only", "Sleep patterns"], correct: 1, exp: "Thyroid hormones are master regulators of metabolic rate!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "The respiratory quotient (RQ) for fat oxidation is approximately?", opts: ["0.7", "0.85", "1.0", "1.3"], correct: 0, exp: "Fat oxidation has RQ ~0.7 (CO2 produced / O2 consumed)!" },
        { q: "Metabolic flexibility refers to the ability to switch between?", opts: ["Fat and carb oxidation", "Rest and exercise", "Hot and cold", "Day and night"], correct: 0, exp: "Metabolic flexibility = efficiently switching between fuel sources!" }
      ],
      [
        { q: "The P/O ratio in mitochondrial respiration represents?", opts: ["Protein/Oxygen", "ATP/Oxygen", "Power/Oxygen", "Phosphate/Oxygen"], correct: 1, exp: "P/O ratio = molecules of ATP synthesized per oxygen atom consumed!" },
        { q: "Uncoupling proteins (UCPs) in mitochondria do what?", opts: ["Increase ATP", "Generate heat", "Store energy", "Build protein"], correct: 1, exp: "UCPs uncouple oxidation from phosphorylation, releasing energy as heat!" }
      ],
      [
        { q: "VO2 max represents?", opts: ["Maximum oxygen consumption", "Maximum heart rate", "Maximum power", "Maximum speed"], correct: 0, exp: "VO2 max = maximum rate of oxygen utilization during exercise!" },
        { q: "The thermoneutral zone for humans is approximately?", opts: ["15-20°C", "22-28°C", "30-35°C", "37-40°C"], correct: 1, exp: "22-28°C is where you don't need to burn extra calories for temperature regulation!" }
      ],
      [
        { q: "Exercise intensity is often expressed as percent of?", opts: ["Body weight", "VO2 max", "Heart rate max", "Both B and C"], correct: 3, exp: "Exercise intensity uses both %VO2max and %HRmax!" },
        { q: "The lactate threshold occurs at approximately what % VO2 max?", opts: ["50-60%", "70-85%", "90-95%", "100%"], correct: 1, exp: "Lactate threshold typically occurs around 70-85% VO2 max!" }
      ],
      [
        { q: "Substrate utilization during exercise depends on?", opts: ["Intensity", "Duration", "Training status", "All of these"], correct: 3, exp: "Multiple factors determine whether you burn fat or carbs during exercise!" },
        { q: "The crossover effect describes the shift from?", opts: ["Fat to carb oxidation", "Aerobic to anaerobic", "Rest to exercise", "Carb to protein"], correct: 0, exp: "Higher exercise intensities shift fuel use from fat to carbohydrate!" }
      ],
      [
        { q: "Indirect calorimetry measures energy expenditure by analyzing?", opts: ["Heart rate", "Body temperature", "Gas exchange", "Blood lactate"], correct: 2, exp: "Measuring O2 consumption and CO2 production calculates energy expenditure!" },
        { q: "The concept of metabolic equivalent (MET) uses what as 1 MET?", opts: ["100 ml O2/kg/min", "3.5 ml O2/kg/min", "1 kcal/kg/hr", "10 ml O2/kg/min"], correct: 1, exp: "1 MET = 3.5 ml O2/kg/min = resting metabolic rate!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL
    [
      [
        { q: "The molecular mechanism of thermogenesis in brown fat involves?", opts: ["ATP synthase", "UCP1", "Complex IV", "Cytochrome c"], correct: 1, exp: "UCP1 (thermogenin) uncouples oxidative phosphorylation in brown fat!" },
        { q: "Sympathetic nervous system activation increases energy expenditure via?", opts: ["β3-adrenergic receptors", "α1-adrenergic receptors", "Cholinergic receptors", "GABA receptors"], correct: 0, exp: "β3-adrenergic receptors mediate sympathetic stimulation of thermogenesis!" }
      ],
      [
        { q: "The futile cycle involving PFK-1 and F-1,6-BPase results in?", opts: ["ATP generation", "Heat production", "Glucose synthesis", "Fat storage"], correct: 1, exp: "Futile cycles waste ATP and generate heat without net product formation!" },
        { q: "Leptin's effect on energy expenditure is mediated through?", opts: ["Peripheral tissues", "Hypothalamic neurons", "Muscle directly", "Adipose tissue"], correct: 1, exp: "Leptin acts on hypothalamic neurons to regulate energy balance!" }
      ],
      [
        { q: "The melanocortin pathway in energy balance involves?", opts: ["MC4R", "POMC", "AgRP", "All of these"], correct: 3, exp: "The hypothalamic melanocortin system is central to energy homeostasis!" },
        { q: "Adaptive thermogenesis during caloric restriction involves changes in?", opts: ["Thyroid hormones", "Sympathetic activity", "Mitochondrial efficiency", "All of these"], correct: 3, exp: "Multiple physiological systems adapt to reduce energy expenditure!" }
      ],
      [
        { q: "The protein FGF21 functions as?", opts: ["Muscle growth factor", "Metabolic regulator", "Immune mediator", "Bone factor"], correct: 1, exp: "FGF21 is a key metabolic hormone regulating energy expenditure!" },
        { q: "Sirtuin proteins affect metabolism by?", opts: ["NAD+-dependent deacetylation", "ATP synthesis", "Protein degradation", "Glucose transport"], correct: 0, exp: "Sirtuins are NAD+-dependent deacetylases regulating metabolic genes!" }
      ],
      [
        { q: "The enzyme AMPK acts as a?", opts: ["Glucose sensor", "Energy sensor", "Fat sensor", "Protein sensor"], correct: 1, exp: "AMPK is activated by high AMP/ATP ratios, sensing energy depletion!" },
        { q: "PGC-1α (peroxisome proliferator-activated receptor gamma coactivator 1-alpha) regulates?", opts: ["Mitochondrial biogenesis", "Gluconeogenesis", "Fatty acid oxidation", "All of these"], correct: 3, exp: "PGC-1α is a master regulator of energy metabolism!" }
      ],
      [
        { q: "The protein PRDM16 is important for?", opts: ["White fat development", "Brown fat development", "Muscle development", "Bone development"], correct: 1, exp: "PRDM16 is a transcriptional regulator of brown adipocyte development!" },
        { q: "Beige adipocytes differ from brown adipocytes in their?", opts: ["UCP1 content", "Developmental origin", "Thermogenic capacity", "Mitochondrial number"], correct: 1, exp: "Beige fat cells can be recruited from white fat precursors!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "The transcriptional coactivator PGC-1α is regulated by which post-translational modifications?", opts: ["Phosphorylation only", "Acetylation only", "Both phosphorylation and acetylation", "Neither"], correct: 2, exp: "PGC-1α activity is controlled by both phosphorylation (AMPK) and acetylation (SIRT1)!" },
        { q: "The BMP7-PRDM16 pathway specifically promotes?", opts: ["White adipogenesis", "Brown adipogenesis", "Myogenesis", "Osteogenesis"], correct: 1, exp: "BMP7 induces PRDM16, driving brown fat differentiation!" }
      ],
      [
        { q: "The protein CIDEA in brown adipose tissue functions to?", opts: ["Inhibit lipolysis", "Enhance thermogenesis", "Store lipids", "Transport glucose"], correct: 1, exp: "CIDEA promotes lipid droplet enlargement and enhances thermogenic capacity!" },
        { q: "The transcription factor IRF4 in adipose tissue macrophages regulates?", opts: ["Inflammation", "Thermogenesis", "Both", "Neither"], correct: 2, exp: "IRF4 in macrophages promotes thermogenic gene expression and reduces inflammation!" }
      ],
      [
        { q: "The enzyme type II deiodinase (DIO2) in brown fat converts?", opts: ["T4 to T3", "T3 to T4", "T4 to rT3", "T3 to rT3"], correct: 0, exp: "DIO2 activates thyroid hormone locally by converting T4 to the active T3!" },
        { q: "The protein FNDC5/irisin is secreted by which tissue?", opts: ["Liver", "Muscle", "Fat", "Brain"], correct: 1, exp: "FNDC5 is cleaved from muscle to produce the myokine irisin!" }
      ],
      [
        { q: "The long non-coding RNA lnc-BATE1 regulates?", opts: ["White fat genes", "Brown fat genes", "Muscle genes", "Liver genes"], correct: 1, exp: "lnc-BATE1 is a brown fat-enriched lncRNA that promotes thermogenesis!" },
        { q: "The protein EHMT1 in adipocytes functions as a?", opts: ["Transcriptional activator", "Histone methyltransferase", "Deacetylase", "Kinase"], correct: 1, exp: "EHMT1 is an H3K9 methyltransferase that represses thermogenic genes!" }
      ],
      [
        { q: "The circadian clock protein BMAL1 affects metabolism through?", opts: ["Direct gene regulation", "Metabolic enzyme rhythms", "Hormonal oscillations", "All of these"], correct: 3, exp: "BMAL1 coordinates circadian control of multiple metabolic processes!" },
        { q: "The enzyme creatine kinase in the thermogenic futile cycle involves?", opts: ["ATP hydrolysis only", "PCr synthesis only", "Both ATP hydrolysis and PCr synthesis", "Neither"], correct: 2, exp: "Futile creatine kinase cycling wastes ATP to generate heat!" }
      ],
      [
        { q: "The protein ZFP516 functions as a?", opts: ["Brown fat repressor", "Brown fat activator", "White fat activator", "Myogenic factor"], correct: 1, exp: "ZFP516 is a transcriptional activator of brown fat thermogenic programs!" },
        { q: "MicroRNA miR-155 in adipose tissue affects?", opts: ["Lipogenesis", "Lipolysis", "Thermogenesis", "All of these"], correct: 2, exp: "miR-155 specifically targets and represses thermogenic gene expression!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">TDEE Mastery Complete!</h2>
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
        <h2 className="text-2xl font-bold text-red-600">🔥 Burn Reality</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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

// Complete Calorie Game with all 35 question sets
function CalorieGame({ onExit }) {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentDay = getCurrentDay();
  
  const calorieQuestions = [
    // ROUND 1 - ELEMENTARY LEVEL
    [
      [
        { q: "A calorie is a measure of what?", opts: ["Weight", "Energy", "Size", "Temperature"], correct: 1, exp: "A calorie measures energy - like fuel for your body! ⚡" },
        { q: "Which has more calories?", opts: ["Apple", "Donut", "Water", "Celery"], correct: 1, exp: "Donuts are packed with calories from sugar and fat!" }
      ],
      [
        { q: "How many calories in 1 gram of fat?", opts: ["4", "7", "9", "12"], correct: 2, exp: "Fat has 9 calories per gram - the most of any nutrient!" },
        { q: "Which food has almost no calories?", opts: ["Bread", "Cucumber", "Cheese", "Nuts"], correct: 1, exp: "Cucumber is mostly water and has very few calories!" }
      ],
      [
        { q: "A medium banana has about how many calories?", opts: ["25", "100", "200", "500"], correct: 1, exp: "A banana has about 100 calories - perfect snack size! 🍌" },
        { q: "Calories on food labels tell you how much what?", opts: ["Weight", "Energy you get", "Protein", "Water"], correct: 1, exp: "Food labels show energy your body gets from eating that food!" }
      ],
      [
        { q: "Which has more calories per gram?", opts: ["Carbs", "Protein", "Fat", "Water"], correct: 2, exp: "Fat has 9 cal/gram vs 4 cal/gram for carbs and protein!" },
        { q: "A slice of pizza has about how many calories?", opts: ["50", "150", "300", "1000"], correct: 2, exp: "Pizza slices vary, but average around 250-300 calories!" }
      ],
      [
        { q: "Your body uses calories for what?", opts: ["Everything it does", "Only exercise", "Only thinking", "Only sleeping"], correct: 0, exp: "Your body needs calories for breathing, thinking, moving - everything!" },
        { q: "Which snack has fewer calories?", opts: ["Bag of chips", "Large apple", "Cookie", "Candy bar"], correct: 1, exp: "An apple has way fewer calories than processed snacks!" }
      ],
      [
        { q: "How many calories does your body need daily?", opts: ["100-500", "800-1200", "2000-2500", "5000-10000"], correct: 2, exp: "Most people need 2000-2500 calories per day to stay healthy!" },
        { q: "Diet sodas have how many calories?", opts: ["0", "50", "100", "200"], correct: 0, exp: "Diet sodas use artificial sweeteners and have zero calories!" }
      ],
      [
        { q: "A tablespoon of olive oil has about how many calories?", opts: ["20", "60", "120", "200"], correct: 2, exp: "Oil is pure fat - 1 tablespoon = 120 calories!" },
        { q: "To lose weight, you should eat what compared to calories burned?", opts: ["More calories", "Same calories", "Fewer calories", "No calories"], correct: 2, exp: "To lose weight, eat fewer calories than you burn!" }
      ]
    ],
    
    // ROUND 2 - HIGH SCHOOL LEVEL
    [
      [
        { q: "A food calorie (kcal) is actually how many scientific calories?", opts: ["1", "100", "1000", "10000"], correct: 2, exp: "1 food Calorie = 1000 scientific calories (1 kcal)!" },
        { q: "The Atwater system assigns how many calories per gram to alcohol?", opts: ["4", "7", "9", "0"], correct: 1, exp: "Alcohol provides 7 calories per gram in the Atwater system!" }
      ],
      [
        { q: "Empty calories refer to foods with?", opts: ["No calories", "Calories but few nutrients", "Only protein calories", "Negative calories"], correct: 1, exp: "Empty calories come from foods high in calories but low in vitamins/minerals!" },
        { q: "The concept of 'negative calorie foods' is?", opts: ["Scientifically proven", "A myth", "Only true for celery", "Only true for ice water"], correct: 1, exp: "No food actually burns more calories to digest than it provides!" }
      ],
      [
        { q: "Caloric density refers to?", opts: ["Weight of food", "Calories per gram", "Nutritional value", "Fiber content"], correct: 1, exp: "Caloric density = calories per gram of food!" },
        { q: "Which macronutrient has the highest thermic effect?", opts: ["Carbohydrates", "Fats", "Proteins", "Alcohol"], correct: 2, exp: "Protein burns 20-30% of its calories during digestion!" }
      ],
      [
        { q: "A 3500-calorie deficit theoretically equals how much weight loss?", opts: ["0.5 lb", "1 lb", "2 lb", "5 lb"], correct: 1, exp: "The 3500-calorie rule estimates 1 pound of fat loss!" },
        { q: "Basal metabolic rate accounts for what percentage of daily calories?", opts: ["20-30%", "40-50%", "60-70%", "80-90%"], correct: 2, exp: "BMR typically accounts for 60-70% of total daily energy expenditure!" }
      ],
      [
        { q: "The Harris-Benedict equation calculates?", opts: ["Body fat %", "BMR", "Daily protein needs", "Water requirements"], correct: 1, exp: "Harris-Benedict estimates basal metabolic rate (BMR)!" },
        { q: "Metabolic adaptation during dieting means?", opts: ["Metabolism speeds up", "Metabolism slows down", "No change", "Metabolism stops"], correct: 1, exp: "The body slows metabolism to conserve energy during calorie restriction!" }
      ],
      [
        { q: "The thermic effect of food peaks at what time after eating?", opts: ["30 minutes", "1-3 hours", "6 hours", "24 hours"], correct: 1, exp: "TEF peaks 1-3 hours after eating and can last up to 6 hours!" },
        { q: "Restaurant meals typically contain what multiple of stated calories?", opts: ["0.5x", "1x", "1.2-1.5x", "3x"], correct: 2, exp: "Restaurant portions often contain 20-50% more calories than listed!" }
      ]
    ],
    
    // ROUND 3 - COLLEGE LEVEL
    [
      [
        { q: "Bomb calorimetry measures food energy by?", opts: ["Digestion simulation", "Complete combustion", "Metabolic chambers", "Chemical analysis"], correct: 1, exp: "Bomb calorimeters burn food completely to measure total energy content!" },
        { q: "The Atwater factors were derived from studies measuring?", opts: ["Metabolic rate", "Digestibility and metabolism", "Food composition", "Exercise energy"], correct: 1, exp: "Atwater factors account for digestion efficiency and metabolic losses!" }
      ],
      [
        { q: "Indirect calorimetry measures energy expenditure by analyzing?", opts: ["Heart rate", "Body temperature", "O2 consumption and CO2 production", "Blood glucose"], correct: 2, exp: "Gas exchange (VO2 and VCO2) allows calculation of energy expenditure!" },
        { q: "The respiratory quotient (RQ) for protein oxidation is approximately?", opts: ["0.7", "0.8", "0.85", "1.0"], correct: 2, exp: "Protein oxidation has an RQ of about 0.8!" }
      ],
      [
        { q: "The concept of metabolizable energy accounts for?", opts: ["Gross energy only", "Digestible energy only", "Losses in urine and gases", "Physical form only"], correct: 2, exp: "Metabolizable energy subtracts urinary and gaseous losses from digestible energy!" },
        { q: "Doubly labeled water (DLW) technique measures?", opts: ["Body composition", "Total daily energy expenditure", "Metabolic rate", "Food intake"], correct: 1, exp: "DLW uses isotopes to measure CO2 production and total energy expenditure!" }
      ],
      [
        { q: "The conversion factor from oxygen consumption to energy expenditure is approximately?", opts: ["3.5 kcal/L O2", "5.0 kcal/L O2", "7.5 kcal/L O2", "10 kcal/L O2"], correct: 1, exp: "About 5.0 kcal of energy per liter of oxygen consumed!" },
        { q: "Diet-induced thermogenesis is mediated primarily by?", opts: ["Insulin", "Sympathetic nervous system", "Thyroid hormones", "Growth hormone"], correct: 1, exp: "Sympathetic activation drives the thermic effect of food!" }
      ],
      [
        { q: "The concept of adaptive thermogenesis involves changes in?", opts: ["BMR only", "Activity thermogenesis only", "Both BMR and activity", "Food absorption"], correct: 2, exp: "Adaptive thermogenesis affects both metabolic rate and movement!" },
        { q: "Metabolic chambers (room calorimeters) directly measure?", opts: ["Heat production", "O2 consumption", "CO2 production", "All of these"], correct: 3, exp: "Room calorimeters can measure both direct (heat) and indirect (gas) calorimetry!" }
      ],
      [
        { q: "The biological value of protein affects its?", opts: ["Caloric content", "Thermic effect", "Digestibility", "Storage efficiency"], correct: 1, exp: "Higher quality proteins tend to have greater thermic effects!" },
        { q: "Energy balance equation includes which components?", opts: ["Intake and expenditure", "Storage changes", "Both A and B", "Neither"], correct: 2, exp: "Energy balance = Energy in - Energy out ± Storage changes!" }
      ]
    ],
    
    // ROUND 4 - GRADUATE LEVEL
    [
      [
        { q: "The molecular basis of the thermic effect involves?", opts: ["ATP synthesis", "Protein synthesis", "Na+/K+-ATPase activity", "All of these"], correct: 3, exp: "Multiple ATP-consuming processes contribute to diet-induced thermogenesis!" },
        { q: "Brown adipose tissue thermogenesis is mediated by?", opts: ["ATP synthase", "UCP1", "Cytochrome oxidase", "Complex I"], correct: 1, exp: "UCP1 uncouples oxidative phosphorylation to produce heat!" }
      ],
      [
        { q: "The P/O ratio in mitochondrial respiration affects?", opts: ["ATP yield", "Heat production", "Metabolic efficiency", "All of these"], correct: 3, exp: "Lower P/O ratios mean less ATP and more heat per oxygen consumed!" },
        { q: "Substrate cycling between glycolysis and gluconeogenesis results in?", opts: ["Net glucose production", "Net ATP synthesis", "Heat generation", "Protein synthesis"], correct: 2, exp: "Futile cycles waste ATP and generate heat without net product!" }
      ],
      [
        { q: "The thermogenesis induced by β3-agonists involves activation of?", opts: ["Brown adipose tissue", "Muscle thermogenesis", "Liver metabolism", "All of these"], correct: 3, exp: "β3-adrenergic stimulation affects multiple thermogenic tissues!" },
        { q: "Uncoupling proteins (UCPs) are found in?", opts: ["Mitochondria only", "Cell membrane only", "Both mitochondria and cell membranes", "Nucleus"], correct: 0, exp: "UCPs are specifically located in the inner mitochondrial membrane!" }
      ],
      [
        { q: "The concept of metabolic flexibility refers to?", opts: ["Changing metabolic rate", "Switching between fuel types", "Adapting to temperature", "All of these"], correct: 1, exp: "Metabolic flexibility = ability to switch between fat and carbohydrate oxidation!" },
        { q: "Leptin's effect on energy expenditure involves?", opts: ["Peripheral tissues", "Central nervous system", "Both", "Neither"], correct: 2, exp: "Leptin acts centrally and peripherally to regulate energy expenditure!" }
      ],
      [
        { q: "The protein PGC-1α regulates?", opts: ["Mitochondrial biogenesis", "Gluconeogenesis", "Thermogenesis", "All of these"], correct: 3, exp: "PGC-1α is a master coactivator of metabolic gene programs!" },
        { q: "Thyroid hormones affect metabolic rate by?", opts: ["Increasing Na+/K+-ATPase", "Promoting protein synthesis", "Enhancing mitochondrial function", "All of these"], correct: 3, exp: "T3 and T4 have multiple metabolic effects increasing energy expenditure!" }
      ],
      [
        { q: "The measurement of 24-hour energy expenditure requires?", opts: ["Metabolic chambers", "Doubly labeled water", "Heart rate monitoring", "Either A or B"], correct: 3, exp: "Both room calorimetry and DLW can measure 24-hour energy expenditure!" },
        { q: "Non-exercise activity thermogenesis (NEAT) includes?", opts: ["Planned exercise", "Unconscious muscle activity", "Basal metabolism", "Thermic effect of food"], correct: 1, exp: "NEAT includes fidgeting, posture maintenance, and spontaneous movement!" }
      ]
    ],
    
    // ROUND 5 - DOCTORAL LEVEL
    [
      [
        { q: "The stoichiometry of ATP synthesis in oxidative phosphorylation yields approximately how many ATP per glucose?", opts: ["30-32", "36-38", "40-42", "45-50"], correct: 0, exp: "Modern estimates suggest ~30-32 ATP per glucose due to proton leak!" },
        { q: "Proton leak across the inner mitochondrial membrane accounts for what percentage of basal metabolic rate?", opts: ["5-10%", "15-25%", "30-40%", "50-60%"], correct: 1, exp: "Proton leak represents a significant portion of resting energy expenditure!" }
      ],
      [
        { q: "The enzyme creatine kinase contributes to thermogenesis through?", opts: ["ATP hydrolysis", "Futile cycling", "Substrate phosphorylation", "Both A and B"], correct: 3, exp: "CK can participate in futile cycles that waste ATP and generate heat!" },
        { q: "Calcium cycling in the sarcoplasmic reticulum contributes to?", opts: ["Muscle contraction only", "Heat production", "ATP synthesis", "Protein degradation"], correct: 1, exp: "Ca2+-ATPase activity generates heat even without contraction!" }
      ],
      [
        { q: "The efficiency of muscular work is typically?", opts: ["10-15%", "20-25%", "30-35%", "40-45%"], correct: 1, exp: "Muscle converts ~20-25% of chemical energy to mechanical work!" },
        { q: "Mitochondrial uncoupling can be induced by?", opts: ["Fatty acids", "Thyroid hormones", "Cold exposure", "All of these"], correct: 3, exp: "Multiple factors can induce mitochondrial uncoupling and thermogenesis!" }
      ],
      [
        { q: "The Q10 effect describes how metabolic rate changes with?", opts: ["pH", "Temperature", "Pressure", "Oxygen concentration"], correct: 1, exp: "Q10 quantifies how reaction rates change with 10°C temperature difference!" },
        { q: "Allometric scaling of metabolic rate follows which relationship?", opts: ["Linear with body mass", "Mass^0.75", "Mass^1.0", "Mass^2.0"], correct: 1, exp: "Kleiber's law: metabolic rate scales with body mass to the 0.75 power!" }
      ],
      [
        { q: "The concept of metabolic scope refers to?", opts: ["Range of metabolic rates", "Maximum/minimum metabolism ratio", "Metabolic flexibility", "All of these"], correct: 1, exp: "Metabolic scope = ratio of maximum to minimum metabolic rate!" },
        { q: "Surface area to volume ratio affects metabolic rate by influencing?", opts: ["Heat production", "Heat loss", "Both", "Neither"], correct: 2, exp: "Smaller organisms have higher surface/volume ratios affecting heat balance!" }
      ],
      [
        { q: "The respiratory exchange ratio (RER) can exceed 1.0 during?", opts: ["Fat oxidation", "Protein oxidation", "Net lipogenesis", "Starvation"], correct: 2, exp: "RER > 1.0 occurs when converting carbs to fat (net CO2 production)!" },
        { q: "Quantum efficiency of ATP synthesis is limited by?", opts: ["Proton stoichiometry", "Thermodynamic constraints", "Enzyme kinetics", "All of these"], correct: 3, exp: "Multiple factors limit the theoretical maximum efficiency of ATP synthesis!" }
      ]
    ]
  ];

  const levels = [
    { name: "Elementary", color: "green", emoji: "🟢" },
    { name: "High School", color: "blue", emoji: "🔵" },
    { name: "College", color: "yellow", emoji: "🟡" },
    { name: "Graduate", color: "orange", emoji: "🟠" },
    { name: "Doctoral", color: "red", emoji: "🔴" }
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
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Calorie Mastery Complete!</h2>
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
        <h2 className="text-2xl font-bold text-indigo-600">📊 Calorie Detective</h2>
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{levels[currentRound].emoji}</span>
            <span className="font-bold">{levels[currentRound].name} Level</span>
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
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
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