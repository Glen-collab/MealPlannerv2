import React, { useState } from 'react';

const UltimateFitnessCardTrick = () => {
    const cardThemes = {
        nutrition: {
            name: "Nutrition & Foods",
            cards: [
                'Protein Powder', 'Chicken Breast', 'Quinoa', 'Avocado',
                'Salmon', 'Sweet Potato', 'Greek Yogurt', 'Almonds',
                'Spinach', 'Eggs', 'Oats', 'Broccoli',
                'Berries', 'Lean Beef', 'Brown Rice', 'Cottage Cheese'
            ],
            emojis: {
                'Protein Powder': '🥤',
                'Chicken Breast': '🐔',
                'Quinoa': '🌾',
                'Avocado': '🥑',
                'Salmon': '🐟',
                'Sweet Potato': '🍠',
                'Greek Yogurt': '🥛',
                'Almonds': '🥜',
                'Spinach': '🥬',
                'Eggs': '🥚',
                'Oats': '🌾',
                'Broccoli': '🥦',
                'Berries': '🫐',
                'Lean Beef': '🥩',
                'Brown Rice': '🍚',
                'Cottage Cheese': '🧀'
            },
            tarotReadings: {
                'Protein Powder': "You seek transformation and growth! Your subconscious knows you're ready to build something stronger in your life. This card represents your desire for quick, efficient progress.",
                'Chicken Breast': "The foundation card! You're drawn to reliability and proven methods. Your inner wisdom knows that consistency trumps complexity.",
                'Quinoa': "The ancient grain calls to your adventurous spirit! You're ready to explore new approaches and aren't afraid to try something different on your journey.",
                'Avocado': "Healthy fats for a healthy mind! You understand that not everything valuable comes quickly. You're embracing patience and long-term thinking.",
                'Salmon': "You're swimming upstream toward your goals! This card suggests you're ready to go against the current and make bold moves.",
                'Sweet Potato': "Slow, steady energy - just like your approach to life! You value sustainability over quick fixes and understand the power of consistency.",
                'Greek Yogurt': "Culture and probiotics represent your gut instincts! You're learning to trust your intuition and cultivate inner wisdom.",
                'Almonds': "Small but mighty! You understand that big changes come from accumulating small, smart choices over time.",
                'Spinach': "Power greens for powerful dreams! Your subconscious knows you're ready to fuel yourself properly for the challenges ahead.",
                'Eggs': "The perfect protein suggests perfect timing! You're at a point where all the pieces are coming together for a breakthrough.",
                'Oats': "Comfort food for the soul! You're seeking stability and warmth as you navigate changes in your life.",
                'Broccoli': "Cruciferous courage! You're ready to tackle the things you might not love but know are good for you.",
                'Berries': "Antioxidants for the mind! You're in a phase of protecting and preserving what matters most while fighting off negativity.",
                'Lean Beef': "Raw strength and determination! Your spirit is calling for you to tap into your primal power and take decisive action.",
                'Brown Rice': "The steady grain of progress! You're building a solid foundation and understand that the best results take time to develop.",
                'Cottage Cheese': "Protein-packed simplicity! You're learning that the most effective solutions are often the most straightforward ones."
            }
        },
        bodybuilders: {
            name: "Bodybuilding Legends",
            cards: [
                'Arnold', 'Lou', 'Zane', 'Sergio',
                'Yates', 'Big Ron', 'Heath', 'Cutler',
                'Bumstead', 'Dana', 'Iris', 'Cory',
                'Rachel', 'Lenda', 'Bev', 'Nicole'
            ],
            emojis: {
                'Arnold': '🏆',
                'Lou': '💚',
                'Zane': '✨',
                'Sergio': '🔥',
                'Yates': '⚡',
                'Big Ron': '👑',
                'Heath': '🎯',
                'Cutler': '💼',
                'Bumstead': '🌟',
                'Dana': '📸',
                'Iris': '💎',
                'Cory': '🌈',
                'Rachel': '🦋',
                'Lenda': '⭐',
                'Bev': '💪',
                'Nicole': '🏅'
            },
            tarotReadings: {
                'Arnold': "The Austrian Oak calls to your champion spirit! Like Arnold's 7 Mr. Olympia wins and Hollywood success, you're destined for greatness across multiple arenas. Your subconscious knows it's time to 'pump up' your ambitions.",
                'Lou': "The gentle giant's energy flows through you! Like Lou Ferrigno's transformation from deaf child to Incredible Hulk, you have the power to turn perceived weaknesses into unstoppable strengths.",
                'Zane': "The master of aesthetics has chosen you! Like Frank Zane's perfect proportions, you understand that true beauty comes from balance, precision, and making every detail count.",
                'Sergio': "The Myth speaks to your mysterious potential! Like Sergio Oliva's legendary physique, you possess hidden capabilities that will amaze even yourself. Your uniqueness is your greatest asset.",
                'Yates': "High Intensity Training energy surges through you! Like Dorian Yates' scientific approach to 6 Mr. Olympia titles, you're ready to work smarter, not just harder.",
                'Big Ron': "The king's dominance flows through your spirit! Like Ronnie Coleman's record 8 Mr. Olympia wins, you have the capacity for sustained excellence. Nothing can keep you down!",
                'Heath': "The Gift of precision is yours! Like Phil Heath's 7 consecutive Mr. Olympia victories, your attention to detail will set you apart from the competition.",
                'Cutler': "The businessman-champion mindset awakens! Like Jay Cutler's success, you understand that building your body and building your empire go hand in hand.",
                'Bumstead': "Classic aesthetics call to your modern spirit! Like Chris Bumstead's dominance, you represent the perfect blend of old-school values and new-age appeal.",
                'Dana': "Social influence flows through you! Like Dana Linn Bailey's figure success, you have the power to motivate others while achieving your own goals.",
                'Iris': "Ten-time champion energy is yours! Like Iris Kyle's record Ms. Olympia wins, your consistency and excellence know no bounds.",
                'Cory': "Pioneer spirit awakens within you! Like Cory Everson's 6 titles, you're meant to break barriers and show the world what's possible.",
                'Rachel': "Beauty and strength unite! Like Rachel McLish's groundbreaking career, you're redefining what's possible in your own unique way.",
                'Lenda': "Excellence through consistency is your calling! Like Lenda Murray's 8 Ms. Olympia victories, your persistence will create legendary results.",
                'Bev': "Raw strength flows through your core! Like Bev Francis's powerlifting transition, you have the power to completely reinvent yourself.",
                'Nicole': "Balanced perfection is your path! Like Nicole Wilkins' success, you understand that achievement comes from harmonizing all aspects of life."
            }
        },
        exercises: {
            name: "Exercise & Workouts",
            cards: [
                'Deadlift', 'Squat', 'Bench', 'Pull-ups',
                'Plank', 'Burpees', 'Lunges', 'Push-ups',
                'Rows', 'Dips', 'Curls', 'Cardio',
                'Yoga', 'Abs', 'Sprints', 'Stretches'
            ],
            emojis: {
                'Deadlift': '🏋️',
                'Squat': '🦵',
                'Bench': '💺',
                'Pull-ups': '🔝',
                'Plank': '🧘',
                'Burpees': '💥',
                'Lunges': '🚶',
                'Push-ups': '⬇️',
                'Rows': '🚣',
                'Dips': '📉',
                'Curls': '💪',
                'Cardio': '❤️',
                'Yoga': '🧘‍♀️',
                'Abs': '🏃',
                'Sprints': '⚡',
                'Stretches': '🤸'
            },
            tarotReadings: {
                'Deadlift': "The king of all exercises calls to you! Like the deadlift that works every muscle, you're ready to tackle challenges that demand your full commitment and strength.",
                'Squat': "Foundation power rises within you! Like the squat that builds your base, you're establishing the fundamental strength needed for all your future endeavors.",
                'Bench': "Upper body dominance awaits! Like the bench press that builds pushing power, you're ready to press through obstacles and push your limits higher.",
                'Pull-ups': "Overcome gravity itself! Like pull-ups that defy your own weight, you have the power to rise above any situation through pure determination.",
                'Plank': "Core stability guides your path! Like the plank that strengthens from within, you're building the inner foundation that will support all your goals.",
                'Burpees': "Full-body intensity is your calling! Like burpees that challenge everything at once, you're ready for the complete transformation that comes from total commitment.",
                'Lunges': "Step-by-step progress is your way! Like lunges that build one leg at a time, you understand that consistent forward movement creates powerful results.",
                'Push-ups': "Classic strength never goes out of style! Like push-ups that require no equipment, you have everything within you needed to build the life you want.",
                'Rows': "Pull your destiny toward you! Like rowing movements that build your back, you're developing the strength to draw opportunities into your life.",
                'Dips': "Bodyweight mastery is yours! Like dips that use your own resistance, you're learning to work with what you have to create extraordinary results.",
                'Curls': "Focused development calls to you! Like bicep curls that isolate and build, you're ready to concentrate your energy on specific goals for maximum impact.",
                'Cardio': "Endurance and heart strength flow through you! Like cardiovascular training, you're building the stamina needed for long-term success in all areas.",
                'Yoga': "Mind-body harmony is your path! Like yoga that connects breath and movement, you're finding the balance that leads to holistic wellness and peace.",
                'Abs': "Core power radiates from within! Like abdominal training that strengthens your center, you're developing the stability that supports all other growth.",
                'Sprints': "Explosive speed is your advantage! Like sprint training that builds power, you're ready for rapid progress and breakthrough moments.",
                'Stretches': "Flexibility opens new possibilities! Like stretching that increases range of motion, you're expanding your capacity and opening to new opportunities."
            }
        }
    };

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [phase, setPhase] = useState('themeSelect');
    const [cards, setCards] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [revealedCard, setRevealedCard] = useState('');
    const [currentThemeData, setCurrentThemeData] = useState(null);

    const handleThemeSelection = (themeKey) => {
        const theme = cardThemes[themeKey];
        setSelectedTheme(themeKey);
        setCurrentThemeData(theme);
        setCards(theme.cards);
        setPhase('initial');
    };

    const getCardEmoji = (card) => {
        return currentThemeData?.emojis[card] || '🃏';
    };

    const getTarotReading = (card) => {
        return currentThemeData?.tarotReadings[card] || "A mysterious choice reveals a mysterious path ahead!";
    };

    const handleRowSelection = (rowIndex) => {
        setSelectedRow(rowIndex);

        const rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push(cards.slice(i * 4, i * 4 + 4));
        }

        const orderedRows = [rows[rowIndex]];

        for (let i = 0; i < 4; i++) {
            if (i !== rowIndex) {
                orderedRows.push(rows[i]);
            }
        }

        const collectedCards = orderedRows.flat();
        const newCards = [];

        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                newCards.push(collectedCards[row * 4 + col]);
            }
        }

        setCards(newCards);
        setPhase('columnDisplay');
    };

    const handleColumnSelection = (columnIndex) => {
        setSelectedColumn(columnIndex);
        const chosenCard = cards[columnIndex * 4];
        setRevealedCard(chosenCard);
        setPhase('reveal');
    };

    const startOver = () => {
        setPhase('themeSelect');
        setSelectedTheme(null);
        setCurrentThemeData(null);
        setCards([]);
        setSelectedRow(null);
        setSelectedColumn(null);
        setRevealedCard('');
    };

    const renderThemeSelect = () => (
        <div className="space-y-6 text-center">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">🎭 Ultimate Fitness Card Magic 🎭</h1>
                <p className="text-xl text-gray-600">Choose your theme for a magical experience!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {Object.entries(cardThemes).map(([key, theme]) => (
                    <button
                        key={key}
                        onClick={() => handleThemeSelection(key)}
                        className="bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300 rounded-xl p-8 hover:from-blue-200 hover:to-purple-200 hover:border-blue-400 transition-all transform hover:scale-105"
                    >
                        <div className="text-4xl mb-4">
                            {key === 'nutrition' && '🥗'}
                            {key === 'bodybuilders' && '🏆'}
                            {key === 'exercises' && '💪'}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{theme.name}</h3>
                        <p className="text-gray-600 text-sm">
                            {key === 'nutrition' && 'Foods & supplements for optimal nutrition'}
                            {key === 'bodybuilders' && 'Legendary champions & their inspiration'}
                            {key === 'exercises' && 'Movements & workouts for strength'}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderInitialGrid = () => (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">🎭 {currentThemeData?.name} Magic Trick 🎭</h2>
                <p className="text-gray-600 mb-4">Look at these 16 cards and mentally pick one. Remember it well!</p>
            </div>

            <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
                {cards.map((card, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 rounded-lg p-3 text-center h-20 flex flex-col justify-center">
                        <div className="text-2xl mb-1">{getCardEmoji(card)}</div>
                        <div className="text-sm font-medium text-gray-700">{card}</div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <p className="mb-4 text-lg">Got your card in mind? Now tell me which ROW it's in:</p>
                <div className="flex justify-center gap-2 max-w-md mx-auto">
                    {[1, 2, 3, 4].map((rowNum) => (
                        <button
                            key={rowNum}
                            onClick={() => handleRowSelection(rowNum - 1)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                        >
                            Row {rowNum}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={startOver}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    Choose Different Theme
                </button>
            </div>
        </div>
    );

    const renderColumnDisplay = () => (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">✨ The Cards Have Been Reshuffled! ✨</h2>
                <p className="text-gray-600 mb-4">Now they're arranged in columns. Which COLUMN contains your card?</p>
            </div>

            <div className="grid grid-cols-4 gap-2 max-w-4xl mx-auto">
                {[0, 1, 2, 3].map((colIndex) => (
                    <div key={colIndex} className="space-y-2">
                        <div className="text-center font-bold text-sm text-purple-600 px-1">Column {colIndex + 1}</div>
                        {[0, 1, 2, 3].map((rowIndex) => {
                            const cardIndex = colIndex * 4 + rowIndex;
                            const card = cards[cardIndex];
                            return (
                                <div key={cardIndex} className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-3 text-center h-20 flex flex-col justify-center">
                                    <div className="text-2xl mb-1">{getCardEmoji(card)}</div>
                                    <div className="text-xs font-bold text-gray-700">{card}</div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <p className="mb-4 text-lg">Which column contains your card?</p>
                <div className="grid grid-cols-4 gap-2 max-w-4xl mx-auto">
                    {[1, 2, 3, 4].map((colNum) => (
                        <button
                            key={colNum}
                            onClick={() => handleColumnSelection(colNum - 1)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-2 rounded-lg font-bold text-sm transition-colors"
                        >
                            Column {colNum}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderReveal = () => (
        <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">🎯 Is this your card? 🎯</h2>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-xl p-8 max-w-md mx-auto transform scale-110">
                <div className="text-6xl mb-4">{getCardEmoji(revealedCard)}</div>
                <div className="text-2xl font-bold text-gray-800">{revealedCard}</div>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => setPhase('tarot')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                    ✨ Get Your {currentThemeData?.name} Tarot Reading ✨
                </button>

                <div className="space-x-4">
                    <button
                        onClick={() => {
                            setCards(currentThemeData.cards);
                            setPhase('initial');
                            setSelectedRow(null);
                            setSelectedColumn(null);
                            setRevealedCard('');
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Try Same Theme Again
                    </button>

                    <button
                        onClick={startOver}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Choose New Theme
                    </button>
                </div>
            </div>
        </div>
    );

    const renderTarot = () => (
        <div className="space-y-6 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">🔮 Your {currentThemeData?.name} Tarot Reading 🔮</h2>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-indigo-400 rounded-xl p-6">
                <div className="text-4xl mb-4">{getCardEmoji(revealedCard)}</div>
                <div className="text-xl font-bold text-indigo-800 mb-4">{revealedCard}</div>
                <div className="text-gray-700 leading-relaxed text-lg">
                    {getTarotReading(revealedCard)}
                </div>
            </div>

            <div className="space-x-4">
                <button
                    onClick={() => {
                        setCards(currentThemeData.cards);
                        setPhase('initial');
                        setSelectedRow(null);
                        setSelectedColumn(null);
                        setRevealedCard('');
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                    🎭 Try Same Theme Again 🎭
                </button>

                <button
                    onClick={startOver}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                    🎨 Choose New Theme 🎨
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-4xl mx-auto">
                {phase === 'themeSelect' && renderThemeSelect()}
                {phase === 'initial' && renderInitialGrid()}
                {phase === 'columnDisplay' && renderColumnDisplay()}
                {phase === 'reveal' && renderReveal()}
                {phase === 'tarot' && renderTarot()}
            </div>
        </div>
    );
};

export default UltimateFitnessCardTrick;