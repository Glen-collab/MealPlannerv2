import React, { useState, useEffect } from 'react';
import { X, Printer, ShoppingCart } from 'lucide-react';
import { servingSizeConversions } from './FoodDatabase.js';

const GroceryListModal = ({ isOpen, onClose, allMeals = {}, isMobile = false }) => {
  const [groceryList, setGroceryList] = useState([]);
  const [showPrintView, setShowPrintView] = useState(false);

  useEffect(() => {
    if (isOpen && allMeals) {
      generateGroceryList();
    }
  }, [isOpen, allMeals]);

  const generateGroceryList = () => {
    const foodItems = new Map(); // Use Map to aggregate quantities

    // Process all meals
    Object.entries(allMeals).forEach(([mealType, meal]) => {
      if (meal && meal.items && Array.isArray(meal.items)) {
        meal.items.forEach(item => {
          if (item && item.food && item.food.trim() !== '') {
            const foodName = item.food.trim();
            const serving = item.servings || 1;

            // Aggregate quantities for the same food
            if (foodItems.has(foodName)) {
              const existing = foodItems.get(foodName);
              foodItems.set(foodName, {
                ...existing,
                totalServings: existing.totalServings + serving,
                meals: [...existing.meals, mealType]
              });
            } else {
              foodItems.set(foodName, {
                food: foodName,
                category: item.category || 'other',
                totalServings: serving,
                meals: [mealType],
                brand: item.brand || null
              });
            }
          }
        });
      }
    });

    // Convert Map to array and sort by category
    const groceryArray = Array.from(foodItems.values()).sort((a, b) => {
      const categoryOrder = {
        'protein': 1,
        'carbohydrate': 2,
        'fat': 3,
        'fruits': 4,
        'vegetables': 5,
        'condiments': 6,
        'supplements': 7,
        'snacks': 8,
        'other': 9
      };
      return (categoryOrder[a.category] || 9) - (categoryOrder[b.category] || 9);
    });

    setGroceryList(groceryArray);
  };

  const getSmartServingDisplay = (item) => {
    const { food, category, totalServings } = item;
    const foodName = food.toLowerCase();
    const conversions = servingSizeConversions[category]?.[food];

    if (!conversions) {
      return `${totalServings.toFixed(1)} servings`;
    }

    // Smart quantity display logic
    if (foodName.includes('egg whites')) {
      const numEggWhites = Math.round(totalServings);
      return numEggWhites === 1 ? '1 egg white' : `${numEggWhites} egg whites`;
    }

    if (foodName.includes('eggs') && foodName.includes('whole')) {
      const numEggs = Math.round(totalServings);
      return numEggs === 1 ? '1 egg' : `${numEggs} eggs`;
    }

    if (foodName.includes('greek yogurt') || foodName.includes('cottage cheese')) {
      const totalCups = (conversions.cups * totalServings).toFixed(1);
      const displayCups = totalCups.endsWith('.0') ? totalCups.slice(0, -2) : totalCups;
      return displayCups === '1' ? '1 cup' : `${displayCups} cups`;
    }

    if (foodName.includes('chicken') || foodName.includes('salmon') || foodName.includes('tuna') ||
      foodName.includes('turkey') || foodName.includes('beef') || foodName.includes('cod') ||
      foodName.includes('tilapia') || foodName.includes('shrimp')) {
      const totalOunces = (conversions.ounces * totalServings).toFixed(1);
      const displayOunces = totalOunces.endsWith('.0') ? totalOunces.slice(0, -2) : totalOunces;
      return `${displayOunces} oz`;
    }

    if (foodName.includes('protein') && (foodName.includes('whey') || foodName.includes('scoop'))) {
      const numScoops = totalServings.toFixed(1);
      const displayScoops = numScoops.endsWith('.0') ? numScoops.slice(0, -2) : numScoops;
      return displayScoops === '1' ? '1 scoop' : `${displayScoops} scoops`;
    }

    if (foodName.includes('rice') || foodName.includes('oats') || foodName.includes('pasta') || foodName.includes('quinoa')) {
      const totalCups = (conversions.cups * totalServings).toFixed(1);
      const displayCups = totalCups.endsWith('.0') ? totalCups.slice(0, -2) : totalCups;
      return displayCups === '1' ? '1 cup' : `${displayCups} cups`;
    }

    if (foodName.includes('bread')) {
      const numSlices = Math.round(totalServings);
      return numSlices === 1 ? '1 slice' : `${numSlices} slices`;
    }

    if (category === 'fruits') {
      if (foodName.includes('apple') || foodName.includes('banana') || foodName.includes('orange')) {
        const numPieces = totalServings.toFixed(1);
        const displayPieces = numPieces.endsWith('.0') ? numPieces.slice(0, -2) : numPieces;
        return displayPieces === '1' ? `1 ${foodName}` : `${displayPieces} ${foodName}s`;
      } else {
        const totalCups = (conversions.cups * totalServings).toFixed(1);
        const displayCups = totalCups.endsWith('.0') ? totalCups.slice(0, -2) : totalCups;
        return displayCups === '1' ? '1 cup' : `${displayCups} cups`;
      }
    }

    if (category === 'fat') {
      if (foodName.includes('oil') || foodName.includes('butter')) {
        const totalTbsp = (conversions.ounces * totalServings * 2).toFixed(1);
        const displayTbsp = totalTbsp.endsWith('.0') ? totalTbsp.slice(0, -2) : totalTbsp;
        return displayTbsp === '1' ? '1 tbsp' : `${displayTbsp} tbsp`;
      } else {
        const totalOunces = (conversions.ounces * totalServings).toFixed(1);
        const displayOunces = totalOunces.endsWith('.0') ? totalOunces.slice(0, -2) : totalOunces;
        return `${displayOunces} oz`;
      }
    }

    // Default fallback
    if (conversions.ounces && typeof conversions.ounces === 'number') {
      const totalOunces = (conversions.ounces * totalServings).toFixed(1);
      const displayOunces = totalOunces.endsWith('.0') ? totalOunces.slice(0, -2) : totalOunces;
      return `${displayOunces} oz`;
    }

    return `${totalServings.toFixed(1)} servings`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'protein': '🍗',
      'carbohydrate': '🍞',
      'fat': '🥑',
      'fruits': '🍎',
      'vegetables': '🥬',
      'condiments': '🧂',
      'supplements': '💊',
      'snacks': '🍿',
      'other': '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryName = (category) => {
    const names = {
      'protein': 'Protein',
      'carbohydrate': 'Carbs',
      'fat': 'Healthy Fats',
      'fruits': 'Fruits',
      'vegetables': 'Vegetables',
      'condiments': 'Condiments',
      'supplements': 'Supplements',
      'snacks': 'Snacks',
      'other': 'Other'
    };
    return names[category] || 'Other';
  };

  const handlePrint = () => {
    window.print();
  };

  const groupedItems = groceryList.reduce((groups, item) => {
    const category = item.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-2xl w-full ${isMobile ? 'max-w-sm max-h-full' : 'max-w-2xl max-h-[90vh]'} overflow-hidden flex flex-col`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold flex items-center gap-2`}>
            <ShoppingCart size={24} />
            Grocery List (7 Days)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'} bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2`}
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={isMobile ? 20 : 24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {groceryList.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-gray-600">No food items found in your meal plan.</p>
              <p className="text-gray-500 text-sm mt-2">Add some meals to generate your grocery list!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2 border-b border-gray-200 pb-2">
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                    {getCategoryName(category)}
                  </h4>
                  <div className="grid gap-2">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{item.food}</div>
                          {item.brand && (
                            <div className="text-sm text-blue-600">{item.brand}</div>
                          )}
                          <div className="text-xs text-gray-500">
                            Used in: {item.meals.join(', ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{getSmartServingDisplay(item)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 text-center`}>
            📝 Total items: {groceryList.length} • Organized by category for easy shopping
          </p>
        </div>
      </div>

      {/* Hidden printable content */}
      <div className="hidden print:block print:absolute print:inset-0 print:bg-white print:p-4">
        <div className="print-content">
          <h1 className="text-2xl font-bold text-center mb-4">🛒 Weekly Grocery List</h1>
          <p className="text-center text-gray-600 mb-6">Generated on {new Date().toLocaleDateString()}</p>

          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 pb-1 mb-3">
                {getCategoryIcon(category)} {getCategoryName(category)}
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 py-1">
                    <span>{item.food} {item.brand ? `(${item.brand})` : ''}</span>
                    <span className="font-medium">{getSmartServingDisplay(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 text-center text-sm text-gray-500">
            Total items: {groceryList.length} • Happy shopping! 🛍️
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryListModal;