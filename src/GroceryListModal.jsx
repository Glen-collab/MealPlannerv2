import React, { useState, useEffect } from 'react';
import { Printer, X, ShoppingCart } from 'lucide-react';
import { servingSizeConversions, FoodDatabase } from './mealPlanning/FoodDatabase.js';

const GroceryListModal = ({
  isOpen,
  onClose,
  allMeals = {},
  isMobile = false
}) => {
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Extract and categorize foods from meal plan
  const extractGroceryList = () => {
    const groceryList = {
      protein: new Map(),
      carbohydrate: new Map(),
      fruits: new Map(),
      vegetables: new Map(),
      fat: new Map(),
      supplements: new Map(),
      condiments: new Map(),
      snacks: new Map()
    };

    console.log('Processing allMeals:', allMeals); // Debug log

    // Process all meals and extract unique foods with quantities
    Object.values(allMeals).forEach(meal => {
      console.log('Processing meal:', meal); // Debug log
      if (!meal.items) return;

      meal.items.forEach(item => {
        console.log('Processing item:', item); // Debug log

        // Fix: Check for both 'serving' and 'servings' (your data uses 'servings')
        const serving = item.servings || item.serving;
        if (!item.food || !serving) {
          console.log('Skipping item - missing food or serving:', item);
          return;
        }

        // If item doesn't have category, try to infer it from FoodDatabase
        let category = item.category;
        if (!category && item.food) {
          // Search through FoodDatabase to find the category
          Object.keys(FoodDatabase).forEach(cat => {
            if (FoodDatabase[cat] && FoodDatabase[cat][item.food]) {
              category = cat;
            }
          });
        }

        // Make sure we have a valid category and map
        const categoryMap = groceryList[category];
        if (!categoryMap) {
          console.log('Unknown category:', category, 'for item:', item.food);
          return;
        }

        // Calculate weekly quantity (7 days)
        const weeklyServing = serving * 7;

        if (categoryMap.has(item.food)) {
          categoryMap.set(item.food, categoryMap.get(item.food) + weeklyServing);
        } else {
          categoryMap.set(item.food, weeklyServing);
        }

        console.log('Added to grocery list:', item.food, 'quantity:', weeklyServing);
      });
    });

    console.log('Final grocery list:', groceryList); // Debug log
    return groceryList;
  };

  // Convert serving to smart grocery quantity
  const getGroceryQuantity = (food, category, totalServings) => {
    const conversions = servingSizeConversions[category]?.[food];
    if (!conversions) return `${totalServings.toFixed(1)} servings`;

    const foodName = food.toLowerCase();

    // Proteins
    if (category === 'protein') {
      if (foodName.includes('egg whites')) {
        return `${Math.ceil(totalServings)} egg whites`;
      }
      if (foodName.includes('eggs') && foodName.includes('whole')) {
        return `${Math.ceil(totalServings)} eggs`;
      }
      if (foodName.includes('greek yogurt') || foodName.includes('cottage cheese')) {
        const totalContainers = Math.ceil((conversions.cups * totalServings) / 2); // 2 cups per container
        return `${totalContainers} container${totalContainers > 1 ? 's' : ''}`;
      }
      if (foodName.includes('chicken') || foodName.includes('salmon') || foodName.includes('turkey') ||
        foodName.includes('beef') || foodName.includes('fish')) {
        const totalPounds = ((conversions.ounces * totalServings) / 16).toFixed(1);
        return `${totalPounds} lb`;
      }
      if (foodName.includes('protein') && foodName.includes('powder')) {
        return `1 container (${Math.ceil(totalServings)} scoops)`;
      }
    }

    // Carbohydrates
    if (category === 'carbohydrate') {
      if (foodName.includes('bread')) {
        const totalLoaves = Math.ceil(totalServings / 10); // ~10 slices per loaf
        return `${totalLoaves} ${totalLoaves > 1 ? 'loaves' : 'loaf'}`;
      }
      if (foodName.includes('rice') || foodName.includes('oats') || foodName.includes('quinoa')) {
        const totalCups = (conversions.cups * totalServings).toFixed(1);
        return `${totalCups} cups (dry)`;
      }
    }

    // Fruits
    if (category === 'fruits') {
      if (foodName.includes('apple') || foodName.includes('banana') || foodName.includes('orange')) {
        return `${Math.ceil(totalServings)} ${food.toLowerCase()}${totalServings > 1 ? 's' : ''}`;
      } else {
        const totalCups = (conversions.cups * totalServings).toFixed(1);
        return `${totalCups} cups`;
      }
    }

    // Vegetables
    if (category === 'vegetables') {
      if (foodName.includes('spinach') || foodName.includes('lettuce') || foodName.includes('kale')) {
        const totalCups = (conversions.cups * totalServings).toFixed(1);
        return `${totalCups} cups`;
      }
      if (foodName.includes('broccoli') || foodName.includes('cauliflower')) {
        const totalHeads = Math.ceil(totalServings / 4); // ~4 servings per head
        return `${totalHeads} head${totalHeads > 1 ? 's' : ''}`;
      }
    }

    // Healthy Fats
    if (category === 'fat') {
      if (foodName.includes('avocado')) {
        return `${Math.ceil(totalServings)} avocado${totalServings > 1 ? 's' : ''}`;
      }
      if (foodName.includes('nuts') || foodName.includes('almonds') || foodName.includes('walnuts')) {
        const totalOunces = (conversions.ounces * totalServings).toFixed(1);
        return `${totalOunces} oz`;
      }
      if (foodName.includes('oil') || foodName.includes('butter')) {
        const totalOunces = (conversions.ounces * totalServings).toFixed(1);
        return `${totalOunces} oz`;
      }
    }

    // Supplements
    if (category === 'supplements') {
      if (foodName.includes('vitamin') || foodName.includes('supplement')) {
        return `1 bottle`;
      }
      if (foodName.includes('protein') && foodName.includes('powder')) {
        return `1 container (${Math.ceil(totalServings)} scoops)`;
      }
    }

    // Condiments
    if (category === 'condiments') {
      if (foodName.includes('salt') || foodName.includes('pepper') || foodName.includes('spice')) {
        return `1 container`;
      }
      const totalOunces = (conversions.ounces * totalServings).toFixed(1);
      return `${totalOunces} oz`;
    }

    // Snacks
    if (category === 'snacks') {
      if (foodName.includes('bar')) {
        return `${Math.ceil(totalServings)} bar${totalServings > 1 ? 's' : ''}`;
      }
    }

    // Default to pounds for most items
    if (conversions.ounces) {
      const totalPounds = ((conversions.ounces * totalServings) / 16).toFixed(1);
      return totalPounds >= 1 ? `${totalPounds} lb` : `${(conversions.ounces * totalServings).toFixed(1)} oz`;
    }

    return `${totalServings.toFixed(1)} servings`;
  };

  const groceryList = extractGroceryList();

  const handlePrint = () => {
    // Count total items to determine layout strategy
    const totalItems = Object.values(groceryList).reduce((total, map) => total + map.size, 0);
    const categoriesWithItems = Object.values(groceryList).filter(map => map.size > 0).length;

    const formatDate = () => {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return `${today.toLocaleDateString()} - ${nextWeek.toLocaleDateString()}`;
    };

    const categoryLabels = {
      protein: '🥩 Proteins',
      carbohydrate: '🍞 Carbohydrates',
      fruits: '🍎 Fruits',
      vegetables: '🥬 Vegetables',
      fat: '🥑 Healthy Fats',
      supplements: '💊 Supplements',
      condiments: '🧂 Condiments',
      snacks: '🍿 Snacks'
    };

    // Determine layout strategy based on content
    const getLayoutStrategy = () => {
      if (totalItems <= 15) return 'normal';
      if (totalItems <= 30) return 'compact';
      if (totalItems <= 50) return 'dense';
      return 'ultra-compact';
    };

    const layoutStrategy = getLayoutStrategy();
    const useColumns = totalItems > 20 && categoriesWithItems >= 4;

    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Weekly Grocery List</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Reset and base styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 15px; 
              font-size: 12px; 
              line-height: 1.3;
              color: #000;
              background: #fff;
            }
            
            /* Header styles */
            h1 { 
              text-align: center; 
              border-bottom: 2px solid #000; 
              padding-bottom: 8px; 
              margin-bottom: 15px; 
              font-size: 18px;
            }
            
            .date-info {
              text-align: center; 
              margin-bottom: 20px; 
              font-size: 11px;
              color: #666;
            }
            
            /* Layout containers */
            .content-container {
              ${useColumns ? 'column-count: 2; column-gap: 20px; column-fill: balance;' : ''}
            }
            
            /* Category headers */
            h3 { 
              background-color: #f0f0f0; 
              padding: 6px 8px; 
              border: 1px solid #333; 
              margin: 12px 0 6px 0; 
              font-size: 13px;
              font-weight: bold;
              ${useColumns ? 'break-inside: avoid; page-break-inside: avoid;' : ''}
            }
            
            /* Category sections */
            .category-section {
              ${useColumns ? 'break-inside: avoid; page-break-inside: avoid; margin-bottom: 15px;' : ''}
            }
            
            /* Grocery items */
            .item { 
              margin: 3px 0; 
              padding: 2px 0 2px 18px; 
              font-size: 11px;
              line-height: 1.2;
            }
            
            .checkbox {
              display: inline-block;
              width: 10px;
              height: 10px;
              border: 1px solid #333;
              margin-right: 6px;
              vertical-align: middle;
            }
            
            /* Footer */
            .footer { 
              margin-top: 20px; 
              text-align: center; 
              border-top: 1px solid #333; 
              padding-top: 8px; 
              font-size: 9px;
              color: #666;
              ${useColumns ? 'column-span: all;' : ''}
            }
            
            /* ADAPTIVE SCALING STYLES */
            .normal {
              /* Default sizes for <= 15 items */
            }
            
            .compact {
              font-size: 11px;
            }
            .compact h1 { font-size: 16px; }
            .compact h3 { font-size: 12px; padding: 4px 6px; margin: 10px 0 5px 0; }
            .compact .item { font-size: 10px; margin: 2px 0; }
            .compact .date-info { font-size: 10px; margin-bottom: 15px; }
            .compact .footer { font-size: 8px; margin-top: 15px; }
            
            .dense {
              font-size: 10px;
            }
            .dense h1 { font-size: 15px; margin-bottom: 10px; }
            .dense h3 { font-size: 11px; padding: 3px 5px; margin: 8px 0 4px 0; }
            .dense .item { font-size: 9px; margin: 1px 0; padding: 1px 0 1px 15px; }
            .dense .date-info { font-size: 9px; margin-bottom: 12px; }
            .dense .footer { font-size: 7px; margin-top: 12px; }
            .dense .checkbox { width: 8px; height: 8px; margin-right: 4px; }
            
            .ultra-compact {
              font-size: 9px;
            }
            .ultra-compact h1 { font-size: 13px; margin-bottom: 8px; }
            .ultra-compact h3 { font-size: 10px; padding: 2px 4px; margin: 6px 0 3px 0; }
            .ultra-compact .item { font-size: 8px; margin: 0; padding: 0 0 0 12px; }
            .ultra-compact .date-info { font-size: 8px; margin-bottom: 10px; }
            .ultra-compact .footer { font-size: 7px; margin-top: 10px; }
            .ultra-compact .checkbox { width: 7px; height: 7px; margin-right: 3px; }
            
            /* Print styles with single-page guarantee */
            @media print {
              @page {
                margin: 0.4in;
                size: letter;
              }
              
              body { 
                margin: 0;
                padding: 0;
              }
              
              /* Force single page */
              * {
                page-break-before: avoid !important;
                page-break-after: avoid !important;
              }
              
              .category-section {
                page-break-inside: avoid !important;
              }
              
              /* If still too big, final scale down */
              @media (min-height: 10.5in) {
                body { 
                  transform: scale(0.95);
                  transform-origin: top left;
                  width: 105.26%;
                }
              }
              
              /* Ultra emergency scaling */
              @media (min-height: 10in) {
                body { 
                  transform: scale(0.9);
                  transform-origin: top left;
                  width: 111.11%;
                }
              }
            }
          </style>
        </head>
        <body class="${layoutStrategy}">
          <h1>🛒 Weekly Grocery Shopping List</h1>
          <div class="date-info">Shopping Period: ${formatDate()}</div>
          
          <div class="content-container">
    `;

    // Add food categories that have items
    Object.entries(categoryLabels).forEach(([category, label]) => {
      const items = groceryList[category];
      if (items && items.size > 0) {
        htmlContent += `
            <div class="category-section">
              <h3>${label}</h3>`;

        Array.from(items.entries()).forEach(([food, quantity]) => {
          htmlContent += `
              <div class="item">
                <span class="checkbox"></span>
                ${getGroceryQuantity(food, category, quantity)} • ${food}
              </div>`;
        });

        htmlContent += `</div>`;
      }
    });

    htmlContent += `
          </div>
          
          <div class="footer">
            <p>✓ Check off items as you shop • Generated from your nutrition plan</p>
            <p>Total unique items: ${totalItems} • Strategy: ${layoutStrategy}${useColumns ? ' + 2-column' : ''}</p>
          </div>
          
          <script>
            // Auto-print when page loads
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    // Create new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');

    if (!printWindow) {
      alert('Please allow popups to print the grocery list');
      return;
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  const handlePreview = () => {
    setShowPrintPreview(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{ zIndex: 9999 }}>
      <div className={`bg-white rounded-lg w-full ${isMobile ? 'max-w-sm max-h-full' : 'max-w-6xl max-h-[95vh]'} overflow-hidden flex flex-col`} style={{ zIndex: 10000 }}>

        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 flex items-center gap-2`}>
            <ShoppingCart size={24} />
            Weekly Grocery List
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePreview}
              className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'} bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2`}
            >
              👁️ Preview
            </button>
            <button
              onClick={handlePrint}
              className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'} bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2`}
            >
              <Printer size={16} />
              Print Grocery List
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {showPrintPreview ? (
            /* Print Preview */
            <div className="bg-white border border-gray-300 p-6 max-w-[8.5in] mx-auto min-h-[11in]">
              <div className="print-preview-content">
                <GroceryListContent
                  groceryList={groceryList}
                  getGroceryQuantity={getGroceryQuantity}
                  isScreenView={true}
                />
              </div>
            </div>
          ) : (
            /* Screen View */
            <div>
              {/* Check if grocery list is empty */}
              {Object.values(groceryList).every(map => map.size === 0) ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-600">No food items found in your meal plan.</p>
                  <p className="text-gray-500 text-sm mt-2">Add some meals to generate your grocery list!</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">📋 7-Day Grocery Shopping List</h3>
                    <p className="text-gray-600">Based on your current meal plan • Quantities calculated for one week</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {Object.values(groceryList).reduce((total, map) => total + map.size, 0)} items •
                      Auto-scales to fit one page perfectly
                    </p>
                  </div>

                  <GroceryListContent
                    groceryList={groceryList}
                    getGroceryQuantity={getGroceryQuantity}
                    isScreenView={true}
                    isMobile={isMobile}
                  />
                </>
              )}
            </div>
          )}
        </div>

        {/* Print Preview Controls */}
        {showPrintPreview && (
          <div className="border-t p-4 flex justify-between items-center">
            <button
              onClick={() => setShowPrintPreview(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              ← Back to List
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Printer size={16} />
              Print Grocery List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GroceryListContent = ({
  groceryList,
  getGroceryQuantity,
  isScreenView = false,
  isMobile = false
}) => {
  const categoryLabels = {
    protein: '🥩 Proteins',
    carbohydrate: '🍞 Carbohydrates',
    fruits: '🍎 Fruits',
    vegetables: '🥬 Vegetables',
    fat: '🥑 Healthy Fats',
    supplements: '💊 Supplements',
    condiments: '🧂 Condiments',
    snacks: '🍿 Snacks'
  };

  const formatDate = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return `${today.toLocaleDateString()} - ${nextWeek.toLocaleDateString()}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 style={{ fontSize: isScreenView ? '24px' : '20px', margin: '0 0 8px 0' }}>
          🛒 Weekly Grocery Shopping List
        </h1>
        <p style={{ fontSize: isScreenView ? '16px' : '12px', margin: '0', color: '#666' }}>
          Shopping Period: {formatDate()}
        </p>
      </div>

      {/* Food Categories */}
      <div className={isScreenView ? 'space-y-6' : 'space-y-4'}>
        {Object.entries(categoryLabels).map(([category, label]) => {
          const items = groceryList[category];
          if (!items || items.size === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className={isScreenView ? 'text-lg font-bold bg-gray-100 p-2 rounded border' : 'category-header'}>
                {label}
              </h3>
              <div className={isScreenView ? 'space-y-1 ml-2' : 'item-list'}>
                {Array.from(items.entries()).map(([food, quantity]) => (
                  <div key={food} className={isScreenView ? 'flex items-center gap-3 py-1' : 'item-row'}>
                    <div className={isScreenView ? 'w-4 h-4 border border-gray-400 rounded' : 'checkbox'}></div>
                    <span className={isScreenView ? 'flex-1' : 'item-text'}>
                      {getGroceryQuantity(food, category, quantity)} • {food}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ marginTop: isScreenView ? '20px' : '15px', textAlign: 'center', fontSize: isScreenView ? '14px' : '10px', color: '#666' }}>
        <p style={{ margin: '0' }}>
          ✓ Check off items as you shop • Generated from your nutrition plan
        </p>
      </div>
    </div>
  );
};

export default GroceryListModal;