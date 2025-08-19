// ErrorHandling.js - Production-ready error handling and recovery system

/**
 * Custom Error Classes for Meal Planning System
 */
export class MealPlanError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'MealPlanError';
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
}

export class ValidationError extends MealPlanError {
    constructor(message, field, value, expected) {
        super(message, 'VALIDATION_ERROR', { field, value, expected });
        this.name = 'ValidationError';
    }
}

export class DietaryFilterError extends MealPlanError {
    constructor(message, filters, incompatibleFood) {
        super(message, 'DIETARY_FILTER_ERROR', { filters, incompatibleFood });
        this.name = 'DietaryFilterError';
    }
}

/**
 * Input Validation System
 */
export class InputValidator {
    static validateMealPlanOptions(options) {
        const errors = [];

        // Validate goal
        const validGoals = ['maintain', 'lose', 'gain-muscle', 'dirty-bulk'];
        if (!options.goal || !validGoals.includes(options.goal)) {
            errors.push(new ValidationError(
                'Invalid goal specified',
                'goal',
                options.goal,
                validGoals
            ));
        }

        // Validate eater type
        const validEaterTypes = ['balanced', 'performance'];
        if (!options.eaterType || !validEaterTypes.includes(options.eaterType)) {
            errors.push(new ValidationError(
                'Invalid eater type specified',
                'eaterType',
                options.eaterType,
                validEaterTypes
            ));
        }

        // Validate meal frequency
        const validMealFreqs = [3, 5, 6];
        if (!options.mealFreq || !validMealFreqs.includes(options.mealFreq)) {
            errors.push(new ValidationError(
                'Invalid meal frequency specified',
                'mealFreq',
                options.mealFreq,
                validMealFreqs
            ));
        }

        // Validate dietary filters
        const validDietaryFilters = ['vegetarian', 'glutenFree', 'keto', 'dairyFree'];
        if (options.dietaryFilters && Array.isArray(options.dietaryFilters)) {
            const invalidFilters = options.dietaryFilters.filter(f => !validDietaryFilters.includes(f));
            if (invalidFilters.length > 0) {
                errors.push(new ValidationError(
                    'Invalid dietary filters specified',
                    'dietaryFilters',
                    invalidFilters,
                    validDietaryFilters
                ));
            }
        }

        // Validate calorie data
        if (options.calorieData) {
            const calorieErrors = this.validateCalorieData(options.calorieData);
            errors.push(...calorieErrors);
        }

        return errors;
    }

    static validateCalorieData(calorieData) {
        const errors = [];

        if (calorieData.bmr && (calorieData.bmr < 800 || calorieData.bmr > 3000)) {
            errors.push(new ValidationError(
                'BMR value is out of reasonable range',
                'bmr',
                calorieData.bmr,
                '800-3000 calories'
            ));
        }

        if (calorieData.tdee && (calorieData.tdee < 1000 || calorieData.tdee > 5000)) {
            errors.push(new ValidationError(
                'TDEE value is out of reasonable range',
                'tdee',
                calorieData.tdee,
                '1000-5000 calories'
            ));
        }

        return errors;
    }

    static validateMealPlan(mealPlan) {
        const errors = [];

        if (!mealPlan || typeof mealPlan !== 'object') {
            errors.push(new ValidationError(
                'Meal plan must be an object',
                'mealPlan',
                typeof mealPlan,
                'object'
            ));
            return errors;
        }

        if (!Array.isArray(mealPlan.allMeals)) {
            errors.push(new ValidationError(
                'Meal plan must have allMeals array',
                'allMeals',
                typeof mealPlan.allMeals,
                'array'
            ));
        }

        return errors;
    }
}

/**
 * Error Recovery System
 */
export class ErrorRecoverySystem {
    static async recoverFromMealPlanError(error, originalOptions, generateFunction) {
        console.warn('🔧 Attempting error recovery:', error.message);

        switch (error.code) {
            case 'DIETARY_FILTER_ERROR':
                return await this.recoverFromDietaryFilterError(error, originalOptions, generateFunction);

            case 'VALIDATION_ERROR':
                return await this.recoverFromValidationError(error, originalOptions, generateFunction);

            default:
                return this.getFallbackMealPlan(originalOptions);
        }
    }

    static async recoverFromDietaryFilterError(error, originalOptions, generateFunction) {
        // Try removing dietary filters one by one
        for (let i = originalOptions.dietaryFilters.length - 1; i >= 0; i--) {
            const reducedFilters = [...originalOptions.dietaryFilters];
            reducedFilters.splice(i, 1);

            console.log(`🔄 Retrying without ${originalOptions.dietaryFilters[i]} filter`);

            try {
                const modifiedOptions = {
                    ...originalOptions,
                    dietaryFilters: reducedFilters
                };

                const plan = await generateFunction(modifiedOptions);

                // Add warning about removed filter
                plan.warnings = plan.warnings || [];
                plan.warnings.push({
                    type: 'dietary_filter_removed',
                    message: `Removed ${originalOptions.dietaryFilters[i]} filter due to compatibility issues`,
                    removedFilter: originalOptions.dietaryFilters[i]
                });

                return plan;
            } catch (retryError) {
                console.warn(`🔧 Retry without ${originalOptions.dietaryFilters[i]} failed`);
            }
        }

        return this.getFallbackMealPlan(originalOptions);
    }

    static async recoverFromValidationError(error, originalOptions, generateFunction) {
        // Try to fix validation issues automatically
        const fixedOptions = this.autoFixValidationIssues(originalOptions, error);

        if (fixedOptions) {
            console.log('🔄 Retrying with auto-fixed options');
            try {
                const plan = await generateFunction(fixedOptions);

                plan.warnings = plan.warnings || [];
                plan.warnings.push({
                    type: 'auto_fixed_validation',
                    message: `Auto-corrected ${error.details.field}: ${error.details.value} → ${fixedOptions[error.details.field]}`,
                    originalValue: error.details.value,
                    correctedValue: fixedOptions[error.details.field]
                });

                return plan;
            } catch (retryError) {
                console.warn('🔧 Auto-fix retry failed');
            }
        }

        return this.getFallbackMealPlan(originalOptions);
    }

    static autoFixValidationIssues(options, error) {
        const fixed = { ...options };

        switch (error.details.field) {
            case 'goal':
                fixed.goal = 'maintain';
                break;
            case 'eaterType':
                fixed.eaterType = 'balanced';
                break;
            case 'mealFreq':
                fixed.mealFreq = 5;
                break;
            case 'dietaryFilters':
                fixed.dietaryFilters = [];
                break;
            default:
                return null; // Can't auto-fix this issue
        }

        return fixed;
    }

    static getFallbackMealPlan(originalOptions) {
        console.log('🆘 Using emergency fallback meal plan');

        // Return a very basic, safe meal plan
        return {
            planId: 'fallback-emergency',
            goalType: originalOptions.goal || 'maintain',
            eaterType: 'balanced',
            mealFrequency: 3,
            dietaryFilters: [],

            allMeals: [
                {
                    mealName: 'Breakfast',
                    time: '8:00 AM',
                    items: [
                        { id: '1', food: 'Oats (dry)', category: 'carbohydrate', serving: 0.5, displayServing: '1/4', displayUnit: 'cup' },
                        { id: '2', food: 'Banana', category: 'fruits', serving: 1, displayServing: '1', displayUnit: 'medium' }
                    ]
                },
                {
                    mealName: 'Lunch',
                    time: '12:00 PM',
                    items: [
                        { id: '3', food: 'Chicken Breast', category: 'protein', serving: 1, displayServing: '3.5', displayUnit: 'oz' },
                        { id: '4', food: 'Brown Rice (cooked)', category: 'carbohydrate', serving: 1, displayServing: '1/2', displayUnit: 'cup' },
                        { id: '5', food: 'Broccoli', category: 'vegetables', serving: 1, displayServing: '1', displayUnit: 'cup' }
                    ]
                },
                {
                    mealName: 'Dinner',
                    time: '6:00 PM',
                    items: [
                        { id: '6', food: 'Salmon', category: 'protein', serving: 1, displayServing: '3.5', displayUnit: 'oz' },
                        { id: '7', food: 'Sweet Potato', category: 'carbohydrate', serving: 1, displayServing: '1', displayUnit: 'medium' },
                        { id: '8', food: 'Spinach', category: 'vegetables', serving: 1, displayServing: '1', displayUnit: 'cup' }
                    ]
                }
            ],

            nutrition: {
                calories: 1200,
                protein: 80,
                carbs: 120,
                fat: 25,
                proteinPercent: 27,
                carbsPercent: 40,
                fatPercent: 19
            },

            fruitCount: 1,
            targetCalories: 1200,
            actualCalories: 1200,

            warnings: [{
                type: 'fallback_plan',
                message: 'This is a basic fallback plan due to generation errors. Please review your preferences and try again.',
                severity: 'high'
            }],

            generatedAt: new Date().toISOString(),
            isFallback: true
        };
    }
}

/**
 * Error Logger for monitoring and debugging
 */
export class ErrorLogger {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 100;
    }

    log(error, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            error: {
                name: error.name,
                message: error.message,
                code: error.code,
                details: error.details
            },
            context,
            stackTrace: error.stack
        };

        this.errorLog.push(logEntry);

        // Keep log size manageable
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog = this.errorLog.slice(-this.maxLogSize);
        }

        // Console logging for development
        console.error('🔴 Error logged:', error.message, context);
    }

    getErrorStats() {
        const errorsByType = {};
        const errorsByCode = {};

        this.errorLog.forEach(entry => {
            const type = entry.error.name;
            const code = entry.error.code;

            errorsByType[type] = (errorsByType[type] || 0) + 1;
            errorsByCode[code] = (errorsByCode[code] || 0) + 1;
        });

        return {
            totalErrors: this.errorLog.length,
            errorsByType,
            errorsByCode,
            recentErrors: this.errorLog.slice(-5).map(e => ({
                timestamp: e.timestamp,
                error: e.error.message,
                code: e.error.code
            }))
        };
    }

    clearLog() {
        this.errorLog = [];
    }
}

/**
 * Main Error Management System
 */
export class ErrorManagementSystem {
    constructor() {
        this.logger = new ErrorLogger();
        this.validator = InputValidator;
        this.recovery = ErrorRecoverySystem;
    }

    async safeGenerateMealPlan(options, generateFunction) {
        try {
            // Step 1: Validate inputs
            const validationErrors = this.validator.validateMealPlanOptions(options);
            if (validationErrors.length > 0) {
                const error = new ValidationError(
                    `Input validation failed: ${validationErrors.map(e => e.message).join(', ')}`,
                    'multiple',
                    options,
                    'valid options'
                );
                this.logger.log(error, { options });

                // Attempt recovery
                return await this.recovery.recoverFromMealPlanError(error, options, generateFunction);
            }

            // Step 2: Generate meal plan
            const mealPlan = await generateFunction(options);

            // Step 3: Validate output
            const planValidationErrors = this.validator.validateMealPlan(mealPlan);
            if (planValidationErrors.length > 0) {
                console.warn('⚠️ Generated plan has validation issues:', planValidationErrors);
                mealPlan.validationIssues = planValidationErrors;
            }

            return mealPlan;

        } catch (error) {
            // Log the error
            this.logger.log(error, { options });

            // Attempt recovery
            try {
                return await this.recovery.recoverFromMealPlanError(error, options, generateFunction);
            } catch (recoveryError) {
                this.logger.log(recoveryError, { originalError: error.message, options });

                // Return fallback plan as last resort
                return this.recovery.getFallbackMealPlan(options);
            }
        }
    }

    getSystemStatus() {
        const errorStats = this.logger.getErrorStats();

        return {
            status: errorStats.totalErrors < 10 ? 'healthy' : 'degraded',
            errorCount: errorStats.totalErrors,
            errorStats,
            lastChecked: new Date().toISOString()
        };
    }
}

// Create singleton instance
export const errorManager = new ErrorManagementSystem();

export default {
    MealPlanError,
    ValidationError,
    DietaryFilterError,
    InputValidator,
    ErrorRecoverySystem,
    ErrorLogger,
    ErrorManagementSystem,
    errorManager
};