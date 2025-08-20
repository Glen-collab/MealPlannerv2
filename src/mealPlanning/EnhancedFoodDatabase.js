// Enhanced FoodDatabase.js - Protein-focused with user favorites

export const EnhancedFoodDatabase = {
    // Prioritized protein combinations and favorites
    protein_combinations: {
        'Greek Yogurt + Whey Protein': {
            protein: 35, carbs: 11, fat: 1.5, sugar: 7, calories: 200,
            dietaryTags: { vegetarian: true, glutenFree: true },
            components: ['Greek Yogurt (non-fat)', 'Whey Protein (generic)'],
            servingDescription: '1 cup yogurt + 1 scoop protein'
        },
        'Greek Yogurt + Plant Protein': {
            protein: 35, carbs: 11, fat: 1.5, sugar: 7, calories: 200,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            components: ['Greek Yogurt (non-fat)', 'Plant Protein (pea/rice)'],
            servingDescription: '1 cup yogurt + 1 scoop protein'
        },
        'Oats + Whey Protein': {
            protein: 29, carbs: 29, fat: 4.5, sugar: 2, calories: 270,
            dietaryTags: { vegetarian: true, glutenFree: true },
            components: ['Oats (dry)', 'Whey Protein (generic)'],
            servingDescription: '1/2 cup oats + 1 scoop protein'
        },
        'Oats + Plant Protein': {
            protein: 29, carbs: 29, fat: 4.5, sugar: 2, calories: 270,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            components: ['Oats (dry)', 'Plant Protein (pea/rice)'],
            servingDescription: '1/2 cup oats + 1 scoop protein'
        },
        'Fairlife Protein Shake + Whey': {
            protein: 54, carbs: 8, fat: 4, sugar: 6, calories: 290,
            dietaryTags: { vegetarian: true, glutenFree: true },
            components: ['Fairlife Protein Shake', 'Whey Protein (generic)'],
            servingDescription: '1 bottle Fairlife + 1 scoop protein'
        },
        'Coconut Yogurt + Plant Protein': {
            protein: 25, carbs: 8, fat: 6.5, sugar: 5, calories: 190,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            components: ['Coconut Yogurt', 'Plant Protein (pea/rice)'],
            servingDescription: '1 cup coconut yogurt + 1 scoop protein'
        }
    },

    // Enhanced protein supplements with dietary options
    protein_supplements: {
        'Whey Protein (generic)': {
            protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
            dietaryTags: { vegetarian: true, glutenFree: true },
            maxDaily: { female: 2, male: 8 }
        },
        'Plant Protein (pea/rice)': {
            protein: 24, carbs: 2, fat: 1.5, sugar: 1, calories: 120,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            maxDaily: { female: 2, male: 8 }
        },
        'Collagen Protein': {
            protein: 20, carbs: 0, fat: 0, sugar: 0, calories: 80,
            dietaryTags: { glutenFree: true, dairyFree: true, keto: true },
            maxDaily: { female: 2, male: 4 }
        },
        'Egg White Protein': {
            protein: 24, carbs: 1, fat: 0, sugar: 0, calories: 100,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true },
            maxDaily: { female: 2, male: 6 }
        },
        'Hemp Protein': {
            protein: 15, carbs: 8, fat: 3, sugar: 1, calories: 120,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            maxDaily: { female: 2, male: 6 }
        },
        'Casein Protein': {
            protein: 24, carbs: 3, fat: 1, sugar: 1, calories: 120,
            dietaryTags: { vegetarian: true, glutenFree: true },
            maxDaily: { female: 1, male: 4 }
        },
        'Bone Broth Protein': {
            protein: 20, carbs: 0, fat: 0, sugar: 0, calories: 80,
            dietaryTags: { glutenFree: true, dairyFree: true, keto: true },
            maxDaily: { female: 2, male: 4 }
        }
    },

    // Enhanced protein bars with dietary options  
    protein_bars: {
        'Quest Bar': {
            protein: 20, carbs: 4, fat: 8, sugar: 1, calories: 190,
            dietaryTags: { glutenFree: true },
            maxDaily: { female: 1, male: 2 }
        },
        'Pure Protein Bar': {
            protein: 20, carbs: 17, fat: 2, sugar: 3, calories: 180,
            dietaryTags: { glutenFree: true },
            maxDaily: { female: 1, male: 2 }
        },
        'Plant-Based Protein Bar': {
            protein: 15, carbs: 20, fat: 6, sugar: 8, calories: 200,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            maxDaily: { female: 1, male: 2 }
        },
        'Keto Protein Bar': {
            protein: 12, carbs: 3, fat: 15, sugar: 1, calories: 190,
            dietaryTags: { glutenFree: true, keto: true },
            maxDaily: { female: 1, male: 2 }
        },
        'Collagen Protein Bar': {
            protein: 15, carbs: 15, fat: 8, sugar: 6, calories: 180,
            dietaryTags: { glutenFree: true, dairyFree: true },
            maxDaily: { female: 1, male: 2 }
        }
    },

    // User favorite snack combinations
    favorite_snacks: {
        'Hummus + Pretzels': {
            protein: 6, carbs: 30, fat: 6, sugar: 2, calories: 190,
            dietaryTags: { vegetarian: true, dairyFree: true },
            components: ['Hummus', 'Pretzels'],
            servingDescription: '2 tbsp hummus + 1 oz pretzels',
            goalSuitability: ['maintain', 'lose']
        },
        'Hummus + Gluten-Free Crackers': {
            protein: 5, carbs: 25, fat: 7, sugar: 1, calories: 170,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            components: ['Hummus', 'Gluten-Free Crackers'],
            servingDescription: '2 tbsp hummus + 15 crackers',
            goalSuitability: ['maintain', 'lose']
        },
        'Apple + Peanut Butter': {
            protein: 8, carbs: 20, fat: 16, sugar: 13, calories: 240,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            components: ['Apple', 'Peanut Butter'],
            servingDescription: '1 medium apple + 1 tbsp peanut butter',
            goalSuitability: ['maintain', 'gain-muscle']
        },
        'Berries + Protein Powder': {
            protein: 24, carbs: 14, fat: 1.8, sugar: 11, calories: 170,
            dietaryTags: { vegetarian: true, glutenFree: true },
            components: ['Mixed Berries', 'Whey Protein (generic)'],
            servingDescription: '1 cup berries + 1 scoop protein',
            goalSuitability: ['lose', 'maintain']
        }
    },

    // Ready-to-drink protein options
    ready_protein_drinks: {
        'Fairlife Protein Shake': {
            protein: 30, carbs: 6, fat: 2.5, sugar: 4, calories: 170,
            dietaryTags: { vegetarian: true, glutenFree: true },
            servingDescription: '1 bottle (11.5 oz)'
        },
        'Premier Protein Shake': {
            protein: 30, carbs: 4, fat: 3, sugar: 1, calories: 160,
            dietaryTags: { vegetarian: true, glutenFree: true },
            servingDescription: '1 bottle (11 oz)'
        },
        'Plant-Based Protein Drink': {
            protein: 20, carbs: 8, fat: 5, sugar: 6, calories: 150,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            servingDescription: '1 bottle (11 oz)'
        },
        'Keto Protein Shake': {
            protein: 15, carbs: 3, fat: 15, sugar: 1, calories: 200,
            dietaryTags: { glutenFree: true, keto: true },
            servingDescription: '1 bottle (11 oz)'
        }
    },

    // Enhanced supplements for different dietary needs
    enhanced_supplements: {
        'Nutritional Yeast': {
            protein: 8, carbs: 5, fat: 1, sugar: 0, calories: 60,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true },
            servingDescription: '2 tbsp'
        },
        'Spirulina Powder': {
            protein: 4, carbs: 2, fat: 1, sugar: 0, calories: 20,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true },
            servingDescription: '1 tbsp'
        },
        'Chlorella Powder': {
            protein: 3, carbs: 1, fat: 0, sugar: 0, calories: 15,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true, keto: true },
            servingDescription: '1 tbsp'
        }
    },

    // Additional snack foods for maintain/lose goals
    healthy_snacks: {
        'Hummus': {
            protein: 2, carbs: 5, fat: 3, sugar: 1, calories: 50,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            servingDescription: '2 tbsp'
        },
        'Pretzels': {
            protein: 3, carbs: 22, fat: 1, sugar: 1, calories: 110,
            dietaryTags: { vegetarian: true, dairyFree: true },
            servingDescription: '1 oz (about 20 mini pretzels)'
        },
        'Gluten-Free Crackers': {
            protein: 2, carbs: 18, fat: 4, sugar: 0, calories: 110,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            servingDescription: '15 crackers'
        },
        'Rice Cakes (brown rice)': {
            protein: 1, carbs: 7, fat: 0.5, sugar: 0, calories: 35,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            servingDescription: '1 cake'
        },
        'Popcorn (air-popped)': {
            protein: 3, carbs: 19, fat: 1, sugar: 0, calories: 95,
            dietaryTags: { vegetarian: true, glutenFree: true, dairyFree: true },
            servingDescription: '3 cups'
        }
    }
};

/**
 * Get protein supplement recommendations based on dietary restrictions and gender
 */
export const getProteinRecommendations = (dietaryFilters = [], gender = 'male', goal = 'maintain') => {
    const proteinOptions = [];

    // Filter protein supplements based on dietary restrictions
    Object.entries(EnhancedFoodDatabase.protein_supplements).forEach(([name, data]) => {
        const isCompatible = dietaryFilters.every(filter => data.dietaryTags[filter] === true);
        if (isCompatible) {
            proteinOptions.push({
                name,
                ...data,
                maxDailyForUser: data.maxDaily[gender.toLowerCase()] || data.maxDaily.male
            });
        }
    });

    // Sort by priority based on goal
    const goalPriority = {
        'lose': ['Plant Protein (pea/rice)', 'Whey Protein (generic)', 'Egg White Protein'],
        'maintain': ['Whey Protein (generic)', 'Plant Protein (pea/rice)', 'Casein Protein'],
        'gain-muscle': ['Whey Protein (generic)', 'Casein Protein', 'Plant Protein (pea/rice)'],
        'dirty-bulk': ['Whey Protein (generic)', 'Casein Protein', 'Mass Gainer Shake (generic)']
    };

    const priority = goalPriority[goal] || goalPriority['maintain'];

    proteinOptions.sort((a, b) => {
        const aIndex = priority.indexOf(a.name);
        const bIndex = priority.indexOf(b.name);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    return proteinOptions;
};

/**
 * Get favorite food combinations based on goal
 */
export const getFavoritesByGoal = (goal, dietaryFilters = []) => {
    const allFavorites = {
        ...EnhancedFoodDatabase.protein_combinations,
        ...EnhancedFoodDatabase.favorite_snacks,
        ...EnhancedFoodDatabase.ready_protein_drinks
    };

    const filteredFavorites = [];

    Object.entries(allFavorites).forEach(([name, data]) => {
        // Check dietary compatibility
        const isCompatible = dietaryFilters.every(filter => data.dietaryTags[filter] === true);

        // Check goal suitability
        const isGoalSuitable = !data.goalSuitability || data.goalSuitability.includes(goal);

        if (isCompatible && isGoalSuitable) {
            filteredFavorites.push({ name, ...data });
        }
    });

    return filteredFavorites;
};

/**
 * Calculate daily protein distribution for a user
 */
export const calculateProteinDistribution = (gender, goal, mealFrequency) => {
    const maxScoops = EnhancedFoodDatabase.protein_supplements['Whey Protein (generic)'].maxDaily[gender.toLowerCase()];

    // Distribute protein scoops across meals
    const distribution = {
        totalScoops: maxScoops,
        scoopsPerMeal: Math.floor(maxScoops / mealFrequency),
        remainingScoops: maxScoops % mealFrequency,
        recommendations: []
    };

    // For males: can do 2 scoops per meal up to 4 meals
    // For females: max 1 scoop per meal, spread across 2 meals
    if (gender.toLowerCase() === 'male' && maxScoops >= 4) {
        distribution.recommendations.push('Consider 2 scoops per meal for 2-4 meals');
        distribution.recommendations.push('Greek yogurt + protein powder combinations work great');
    } else {
        distribution.recommendations.push('1 scoop per meal, spread across the day');
        distribution.recommendations.push('Try protein + oats for breakfast');
    }

    return distribution;
};

export default EnhancedFoodDatabase;