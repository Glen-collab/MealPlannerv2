import React, { useState, useEffect } from 'react';
import { Printer, X, ShoppingCart } from 'lucide-react';
import { servingSizeConversions } from './FoodDatabase.js';
import GroceryListModal from './GroceryListModal.jsx';

const PrintableNutritionPlan = ({
  allMeals = {},
  userProfile = {},
  calorieData = null,
  isMobile = false
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showGroceryList, setShowGroceryList] = useState(false);

  // Handle null calorieData by providing safe defaults
  const safeCalorieData = calorieData || {
    targetCalories: 'Not set',
    bmr: 'Not set',
    tdee: 'Not set'
  };

  // Add minimal print styles (since we now use new window method)
  useEffect(() => {
    const printStyles = `
      @media print {
        /* Hide everything when printing main app */
        body * {
          visibility: hidden;
        }
        
        /* This prevents accidental printing of main app */
        .print-hide {
          display: none !important;
          visibility: hidden !important;
        }
      }
    `;

    // Create style element and add to head
    const styleElement = document.createElement('style');
    styleElement.textContent = printStyles;
    styleElement.setAttribute('data-print-styles', 'true');
    document.head.appendChild(styleElement);

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.querySelector('[data-print-styles="true"]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const handlePrint = () => {
    // Generate isolated HTML for meal plan printing (similar to grocery list)
    const formatDate = () => {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getMealTypeLabel = (mealType) => {
      const labels = {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        firstSnack: 'Morning Snack',
        secondSnack: 'Mid-Morning Snack',
        midAfternoon: 'Afternoon Snack',
        lateSnack: 'Evening Snack',
        postWorkout: 'Post-Workout'
      };
      return labels[mealType] || mealType;
    };

    const getSmartServingSize = (item) => {
      const serving = item.servings || item.serving;

      if (!item.food || !item.category || !serving) {
        return `${item.displayServing || serving || '1'} ${item.displayUnit || 'servings'}`;
      }

      const foodName = item.food.toLowerCase();
      const conversions = servingSizeConversions[item.category]?.[item.food];

      if (!conversions) {
        return `${serving.toFixed(1)} servings`;
      }

      // Quick serving size logic for print
      if (foodName.includes('egg')) {
        const numEggs = Math.round(serving);
        return numEggs === 1 ? '1 egg' : `${numEggs} eggs`;
      }

      if (foodName.includes('greek yogurt') || foodName.includes('cottage cheese')) {
        const totalCups = (conversions.cups * serving).toFixed(1);
        const displayCups = totalCups.endsWith('.0') ? totalCups.slice(0, -2) : totalCups;
        return displayCups === '1' ? '1 cup' : `${displayCups} cups`;
      }

      if (conversions.ounces) {
        const totalOunces = (conversions.ounces * serving).toFixed(1);
        const displayOunces = totalOunces.endsWith('.0') ? totalOunces.slice(0, -2) : totalOunces;
        return `${displayOunces} oz`;
      }

      return `${serving.toFixed(1)} servings`;
    };

    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Daily Nutrition Plan</title>
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
            .header { 
              text-align: center; 
              border-bottom: 2px solid #000; 
              padding-bottom: 8px; 
              margin-bottom: 15px; 
            }
            
            .header h1 { font-size: 18px; margin-bottom: 5px; }
            .header h2 { font-size: 16px; margin-bottom: 3px; }
            .header p { font-size: 12px; color: #666; }
            
            /* Table styles */
            .meal-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
              font-size: 11px;
            }
            
            .meal-table th,
            .meal-table td {
              border: 1px solid #333;
              padding: 4px 6px;
              text-align: left;
              vertical-align: top;
            }
            
            .meal-table th {
              background-color: #f0f0f0;
              font-weight: bold;
              font-size: 10px;
            }
            
            .meal-header {
              background-color: #e8e8e8;
              font-weight: bold;
              font-size: 12px;
            }
            
            /* Summary section */
            .summary {
              margin-top: 15px;
              border-top: 2px solid #333;
              padding-top: 10px;
            }
            
            .summary h3 {
              font-size: 14px;
              margin-bottom: 8px;
              border-bottom: 1px solid #333;
              padding-bottom: 3px;
            }
            
            .summary-table {
              width: 60%;
              border-collapse: collapse;
              font-size: 10px;
            }
            
            .summary-table td {
              border: 1px solid #333;
              padding: 3px 5px;
            }
            
            /* Notes section */
            .notes {
              margin-top: 15px;
            }
            
            .notes h3 {
              font-size: 12px;
              margin-bottom: 5px;
              border-bottom: 1px solid #333;
              padding-bottom: 2px;
            }
            
            .notes-box {
              height: 40px;
              border: 1px solid #ccc;
              padding: 5px;
              font-size: 9px;
              color: #666;
            }
            
            /* Footer */
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 9px;
              color: #666;
            }
            
            /* DYNAMIC SCALING - Auto-adjust to fit one page */
            @media print {
              @page {
                margin: 0.4in;
                size: letter;
              }
              
              /* Try base size first */
              body { 
                font-size: 12px;
                margin: 0;
                padding: 0.2in;
              }
              
              /* If content is too big, scale down */
              @media (min-height: 11in) {
                body { 
                  font-size: 11px;
                  transform: scale(0.95);
                  transform-origin: top left;
                }
              }
              
              /* Further scaling if still too big */
              @media (min-height: 10in) {
                body { 
                  font-size: 10px;
                  transform: scale(0.9);
                  transform-origin: top left;
                }
              }
              
              /* Final compact mode */
              @media (min-height: 9in) {
                body { 
                  font-size: 9px;
                  transform: scale(0.85);
                  transform-origin: top left;
                }
                
                .meal-table { font-size: 8px; }
                .meal-table th, .meal-table td { padding: 2px 3px; }
                .header h1 { font-size: 14px; }
                .header h2 { font-size: 12px; }
                .summary h3 { font-size: 11px; }
                .notes-box { height: 25px; font-size: 8px; }
              }
              
              /* Mobile print adjustments */
              @media (max-width: 768px) {
                body { 
                  font-size: 10px;
                  transform: scale(0.8);
                  margin: 0;
                  padding: 0.1in;
                }
                
                .meal-table { font-size: 8px; }
                .meal-table th, .meal-table td { padding: 1px 2px; }
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🥗 Daily Nutrition Plan</h1>
            <h2>${userProfile.firstName || 'User'} ${userProfile.lastName || ''}</h2>
            <p>${formatDate()}</p>
          </div>

          <table class="meal-table">
            <thead>
              <tr>
                <th style="width: 15%">Time</th>
                <th style="width: 50%">Food</th>
                <th style="width: 35%">Serving Size</th>
              </tr>
            </thead>
            <tbody>`;

    // Add meal data
    Object.entries(allMeals).forEach(([mealType, meal]) => {
      const validItems = meal.items ? meal.items.filter(item => item.food && item.food.trim() !== '') : [];

      if (validItems.length > 0) {
        htmlContent += `
              <tr class="meal-header">
                <td colspan="3">${getMealTypeLabel(mealType)} - ${meal.time}</td>
              </tr>`;

        validItems.forEach((item, index) => {
          htmlContent += `
              <tr>
                <td>${index === 0 ? meal.time : ''}</td>
                <td>${item.food}</td>
                <td>${getSmartServingSize(item)}</td>
              </tr>`;
        });
      }
    });

    htmlContent += `
            </tbody>
          </table>

          <div class="summary">
            <h3>📊 Daily Summary</h3>
            <table class="summary-table">
              <tr><td><strong>Target Calories:</strong></td><td>${safeCalorieData.targetCalories || 'Not set'}</td></tr>
              <tr><td><strong>BMR:</strong></td><td>${safeCalorieData.bmr || 'Not set'}</td></tr>
              <tr><td><strong>TDEE:</strong></td><td>${safeCalorieData.tdee || 'Not set'}</td></tr>
              <tr><td><strong>Goal:</strong></td><td style="text-transform: capitalize">${userProfile.goal || 'Not set'}</td></tr>
            </table>
          </div>

          <div class="notes">
            <h3>📝 Notes</h3>
            <div class="notes-box">
              Space for personal notes, meal prep reminders, or adjustments...
            </div>
          </div>

          <div class="footer">
            <p>Generated by Nutrition Tracker • ${formatDate()}</p>
            <p>Stay consistent, stay healthy! 💪</p>
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
      alert('Please allow popups to print the meal plan');
      return;
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="w-full">
      {/* Screen View - Print Buttons */}
      <div className="print-hide space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 text-center`}>
          📄 Print Your Nutrition Plan
        </h3>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-3 gap-3'} justify-center`}>
          <button
            onClick={handlePreview}
            className={`${isMobile ? 'w-full py-4 text-base' : 'px-6 py-3'} bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <span>👁️</span>
            {isMobile ? 'Preview Plan' : 'Preview Plan'}
          </button>

          <button
            onClick={handlePrint}
            className={`${isMobile ? 'w-full py-4 text-base' : 'px-6 py-3'} bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <Printer size={20} />
            {isMobile ? 'Print Plan' : 'Print Plan'}
          </button>

          <button
            onClick={() => setShowGroceryList(true)}
            className={`${isMobile ? 'w-full py-4 text-base' : 'px-6 py-3'} bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2`}
          >
            <ShoppingCart size={20} />
            {isMobile ? 'Grocery List' : 'Grocery List'}
          </button>
        </div>

        <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-gray-600 text-center`}>
          {isMobile ? 'Tap Grocery List for your shopping checklist!' : 'Works with network printers, wireless printers, and mobile printing services'}
        </p>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="print-hide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg w-full ${isMobile ? 'max-w-sm max-h-full' : 'max-w-4xl max-h-[90vh]'} overflow-hidden flex flex-col`}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>Print Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className={`${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'} bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2`}
                >
                  <Printer size={16} />
                  Print
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X size={isMobile ? 20 : 24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white border border-gray-300 p-8 max-w-[8.5in] mx-auto" style={{ minHeight: '11in' }}>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold mb-2">🥗 Daily Nutrition Plan</h1>
                  <h2 className="text-lg mb-2">{userProfile.firstName || 'User'} {userProfile.lastName || ''}</h2>
                  <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📄</div>
                  <p className="text-gray-600 mb-4">This is a preview of your nutrition plan format.</p>
                  <p className="text-gray-500 text-sm">Click "Print" to generate the full formatted document with all your meals.</p>
                </div>

                <div className="mt-8 border-t pt-4">
                  <h3 className="font-bold mb-2">📊 Features:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete meal schedule with times</li>
                    <li>• Smart serving sizes (cups, ounces, slices)</li>
                    <li>• Daily nutrition summary</li>
                    <li>• Space for personal notes</li>
                    <li>• Auto-scales to fit one page</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Printable Content - No longer needed with new window method */}

      {/* Grocery List Modal */}
      <GroceryListModal
        isOpen={showGroceryList}
        onClose={() => setShowGroceryList(false)}
        allMeals={allMeals}
        isMobile={isMobile}
      />
    </div>
  );
};

export default PrintableNutritionPlan;