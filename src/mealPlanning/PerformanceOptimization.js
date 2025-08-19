// PerformanceOptimization.js - Advanced caching and optimization strategies

/**
 * Advanced Performance Optimization System for Meal Planning
 * 
 * This module provides sophisticated caching, memoization, and optimization
 * strategies to handle the complexity of 96+ meal plan combinations efficiently.
 */

// ===== ADVANCED CACHING SYSTEM =====

class AdvancedMealPlanCache {
    constructor(maxSize = 200, ttl = 1000 * 60 * 30) { // 30-minute TTL
        this.cache = new Map();
        this.accessTimes = new Map();
        this.hitCounts = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;

        // Performance metrics
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            totalGenerations: 0
        };

        // Auto-cleanup expired entries every 5 minutes
        setInterval(() => this.cleanupExpired(), 1000 * 60 * 5);
    }

    /**
     * Get cached meal plan or return null
     */
    get(key) {
        const entry = this.cache.get(key);

        if (!entry) {
            this.stats.misses++;
            return null;
        }

        // Check TTL
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            this.accessTimes.delete(key);
            this.hitCounts.delete(key);
            this.stats.misses++;
            return null;
        }

        // Update access patterns
        this.accessTimes.set(key, Date.now());
        this.hitCounts.set(key, (this.hitCounts.get(key) || 0) + 1);
        this.stats.hits++;

        return entry.data;
    }

    /**
     * Store meal plan in cache
     */
    set(key, data) {
        // If cache is full, evict least recently used
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }

        const entry = {
            data: this.deepClone(data),
            timestamp: Date.now(),
            size: this.estimateSize(data)
        };

        this.cache.set(key, entry);
        this.accessTimes.set(key, Date.now());
        this.hitCounts.set(key, 0);
        this.stats.totalGenerations++;
    }

    /**
     * Evict least recently used item
     */
    evictLRU() {
        let oldestKey = null;
        let oldestTime = Infinity;

        for (const [key, time] of this.accessTimes) {
            if (time < oldestTime) {
                oldestTime = time;
                oldestKey = key;
            }
        }

        if (oldestKey) {
            this.cache.delete(oldestKey);
            this.accessTimes.delete(oldestKey);
            this.hitCounts.delete(oldestKey);
            this.stats.evictions++;
        }
    }

    /**
     * Clean up expired entries
     */
    cleanupExpired() {
        const now = Date.now();
        const keysToDelete = [];

        for (const [key, entry] of this.cache) {
            if (now - entry.timestamp > this.ttl) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => {
            this.cache.delete(key);
            this.accessTimes.delete(key);
            this.hitCounts.delete(key);
        });

        if (keysToDelete.length > 0) {
            console.log(`🧹 Cleaned up ${keysToDelete.length} expired cache entries`);
        }
    }

    /**
     * Get cache performance metrics
     */
    getMetrics() {
        const hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
        const totalMemory = Array.from(this.cache.values())
            .reduce((sum, entry) => sum + entry.size, 0);

        return {
            ...this.stats,
            hitRate: Math.round(hitRate * 100 * 100) / 100, // Percentage with 2 decimals
            currentSize: this.cache.size,
            maxSize: this.maxSize,
            estimatedMemoryKB: Math.round(totalMemory / 1024),
            averageHitsPerEntry: this.stats.hits / Math.max(this.stats.totalGenerations, 1)
        };
    }

    /**
     * Preload popular combinations
     */
    async preloadPopularCombinations(popularCombos, generateFunction) {
        console.log(`🔄 Preloading ${popularCombos.length} popular meal plan combinations...`);

        for (const combo of popularCombos) {
            const key = this.createCacheKey(combo);
            if (!this.cache.has(key)) {
                try {
                    const plan = await generateFunction(combo);
                    this.set(key, plan);
                } catch (error) {
                    console.warn(`⚠️ Failed to preload combo ${key}:`, error.message);
                }
            }
        }

        console.log('✅ Preloading completed');
    }

    /**
     * Create standardized cache key
     */
    createCacheKey({ goal, eaterType, mealFreq, dietaryFilters = [], calorieData = {} }) {
        const bmr = calorieData?.bmr || 'default';
        const sortedFilters = [...dietaryFilters].sort().join('-');
        return `${goal}-${eaterType}-${mealFreq}-${sortedFilters}-${bmr}`;
    }

    /**
     * Estimate object size in bytes (rough approximation)
     */
    estimateSize(obj) {
        const jsonStr = JSON.stringify(obj);
        return jsonStr.length * 2; // Rough estimate for UTF-16 encoding
    }

    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Clear cache and reset stats
     */
    clear() {
        this.cache.clear();
        this.accessTimes.clear();
        this.hitCounts.clear();
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            totalGenerations: 0
        };
    }
}

// ===== COMPUTATION MEMOIZATION =====

class ComputationMemoizer {
    constructor() {
        this.memoizedFunctions = new Map();
    }

    /**
     * Memoize expensive nutrition calculations
     */
    memoizeNutritionCalculation(originalFunction) {
        const cache = new Map();
        const memoizedFunction = (mealPlan) => {
            const key = this.createMealPlanHash(mealPlan);

            if (cache.has(key)) {
                return cache.get(key);
            }

            const result = originalFunction(mealPlan);
            cache.set(key, result);

            // Limit cache size
            if (cache.size > 100) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }

            return result;
        };

        memoizedFunction.clearCache = () => cache.clear();
        memoizedFunction.getCacheSize = () => cache.size;

        return memoizedFunction;
    }

    /**
     * Memoize dietary filter applications
     */
    memoizeDietaryFiltering(originalFunction) {
        const cache = new Map();

        return (basePlan, dietaryFilters) => {
            const key = `${this.createMealPlanHash(basePlan)}-${dietaryFilters.sort().join(',')}`;

            if (cache.has(key)) {
                return this.deepClone(cache.get(key));
            }

            const result = originalFunction(basePlan, dietaryFilters);
            cache.set(key, this.deepClone(result));

            return result;
        };
    }

    /**
     * Create hash for meal plan (for memoization keys)
     */
    createMealPlanHash(mealPlan) {
        const simplified = {
            goalType: mealPlan.goalType,
            eaterType: mealPlan.eaterType,
            mealFrequency: mealPlan.mealFrequency,
            mealCount: mealPlan.allMeals?.length,
            firstMealItems: mealPlan.allMeals?.[0]?.items?.length
        };
        return JSON.stringify(simplified);
    }

    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

// ===== BATCH PROCESSING SYSTEM =====

class BatchMealPlanProcessor {
    constructor() {
        this.processingQueue = [];
        this.isProcessing = false;
        this.results = new Map();
    }

    /**
     * Add meal plan generation request to batch
     */
    addToBatch(id, options) {
        this.processingQueue.push({ id, options });

        // Auto-process if queue gets large
        if (this.processingQueue.length >= 10) {
            this.processBatch();
        }
    }

    /**
     * Process entire batch of meal plan requests
     */
    async processBatch(generateFunction) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        console.log(`🔄 Processing batch of ${this.processingQueue.length} meal plans...`);

        const startTime = Date.now();
        const batch = [...this.processingQueue];
        this.processingQueue = [];

        // Process in chunks to avoid blocking
        const chunkSize = 5;
        for (let i = 0; i < batch.length; i += chunkSize) {
            const chunk = batch.slice(i, i + chunkSize);

            await Promise.all(chunk.map(async ({ id, options }) => {
                try {
                    const plan = await generateFunction(options);
                    this.results.set(id, { success: true, plan });
                } catch (error) {
                    this.results.set(id, { success: false, error: error.message });
                }
            }));

            // Small delay to prevent blocking
            if (i + chunkSize < batch.length) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        const duration = Date.now() - startTime;
        console.log(`✅ Batch processed in ${duration}ms (${batch.length} plans)`);

        this.isProcessing = false;
    }

    /**
     * Get result for specific request
     */
    getResult(id) {
        return this.results.get(id);
    }

    /**
     * Clear completed results
     */
    clearResults() {
        this.results.clear();
    }
}

// ===== PERFORMANCE MONITORING =====

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            generationTimes: [],
            cacheHitRates: [],
            memoryUsage: [],
            errors: []
        };
    }

    /**
     * Measure function execution time
     */
    measureExecution(name, fn) {
        return async (...args) => {
            const startTime = performance.now();
            const startMemory = this.getMemoryUsage();

            try {
                const result = await fn(...args);
                const endTime = performance.now();
                const endMemory = this.getMemoryUsage();

                this.recordMetric('generationTimes', {
                    name,
                    duration: endTime - startTime,
                    memoryDelta: endMemory - startMemory,
                    timestamp: Date.now()
                });

                return result;
            } catch (error) {
                this.recordMetric('errors', {
                    name,
                    error: error.message,
                    timestamp: Date.now()
                });
                throw error;
            }
        };
    }

    /**
     * Record metric
     */
    recordMetric(type, data) {
        this.metrics[type].push(data);

        // Keep only last 100 entries
        if (this.metrics[type].length > 100) {
            this.metrics[type] = this.metrics[type].slice(-100);
        }
    }

    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        const generationTimes = this.metrics.generationTimes;

        if (generationTimes.length === 0) {
            return { message: 'No performance data available' };
        }

        const times = generationTimes.map(m => m.duration);
        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);

        return {
            totalGenerations: generationTimes.length,
            averageTimeMs: Math.round(avgTime * 100) / 100,
            minTimeMs: Math.round(minTime * 100) / 100,
            maxTimeMs: Math.round(maxTime * 100) / 100,
            totalErrors: this.metrics.errors.length,
            recentErrors: this.metrics.errors.slice(-5)
        };
    }

    /**
     * Get memory usage (rough estimate)
     */
    getMemoryUsage() {
        if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
            return window.performance.memory.usedJSHeapSize;
        }
        return 0; // Fallback for environments without memory API
    }
}

// ===== OPTIMIZATION STRATEGIES =====

class OptimizationStrategies {
    /**
     * Intelligent preloading based on usage patterns
     */
    static getPreloadRecommendations(usageStats) {
        // Most common combinations to preload
        const recommendations = [
            { goal: 'maintain', eaterType: 'balanced', mealFreq: 5, dietaryFilters: [] },
            { goal: 'lose', eaterType: 'balanced', mealFreq: 5, dietaryFilters: [] },
            { goal: 'gain-muscle', eaterType: 'performance', mealFreq: 5, dietaryFilters: [] },
            { goal: 'maintain', eaterType: 'balanced', mealFreq: 5, dietaryFilters: ['vegetarian'] },
            { goal: 'lose', eaterType: 'balanced', mealFreq: 3, dietaryFilters: ['glutenFree'] }
        ];

        return recommendations;
    }

    /**
     * Optimize meal plan generation order
     */
    static optimizeGenerationOrder(requests) {
        // Sort requests to group similar ones together for better caching
        return requests.sort((a, b) => {
            // Prioritize by goal first
            if (a.goal !== b.goal) {
                const goalPriority = { 'maintain': 0, 'lose': 1, 'gain-muscle': 2, 'dirty-bulk': 3 };
                return goalPriority[a.goal] - goalPriority[b.goal];
            }

            // Then by eater type
            if (a.eaterType !== b.eaterType) {
                return a.eaterType.localeCompare(b.eaterType);
            }

            // Then by meal frequency
            return a.mealFreq - b.mealFreq;
        });
    }

    /**
     * Suggest performance improvements
     */
    static analyzePerformance(metrics) {
        const suggestions = [];

        if (metrics.averageTimeMs > 100) {
            suggestions.push({
                type: 'performance',
                priority: 'high',
                message: 'Generation time is slow. Consider increasing cache size or preloading popular combinations.'
            });
        }

        if (metrics.totalErrors > 10) {
            suggestions.push({
                type: 'reliability',
                priority: 'high',
                message: 'High error rate detected. Review dietary filter logic and food database completeness.'
            });
        }

        return suggestions;
    }
}

// ===== MAIN OPTIMIZATION MANAGER =====

export class OptimizationManager {
    constructor() {
        this.cache = new AdvancedMealPlanCache();
        this.memoizer = new ComputationMemoizer();
        this.batchProcessor = new BatchMealPlanProcessor();
        this.performanceMonitor = new PerformanceMonitor();
    }

    /**
     * Initialize optimization systems
     */
    async initialize(generateFunction) {
        console.log('🚀 Initializing optimization systems...');

        // Preload popular combinations
        const popularCombos = OptimizationStrategies.getPreloadRecommendations();
        await this.cache.preloadPopularCombinations(popularCombos, generateFunction);

        console.log('✅ Optimization systems ready');
    }

    /**
     * Optimized meal plan generation
     */
    generateOptimized(options, generateFunction) {
        return this.performanceMonitor.measureExecution('mealPlanGeneration', async (opts) => {
            const cacheKey = this.cache.createCacheKey(opts);

            // Try cache first
            const cached = this.cache.get(cacheKey);
            if (cached) {
                console.log('⚡ Returning cached meal plan');
                return cached;
            }

            // Generate new plan
            console.log('🔄 Generating new meal plan');
            const plan = await generateFunction(opts);

            // Cache the result
            this.cache.set(cacheKey, plan);

            return plan;
        })(options);
    }

    /**
     * Get comprehensive optimization report
     */
    getOptimizationReport() {
        const cacheMetrics = this.cache.getMetrics();
        const performanceMetrics = this.performanceMonitor.getPerformanceSummary();
        const suggestions = OptimizationStrategies.analyzePerformance(performanceMetrics);

        return {
            cache: cacheMetrics,
            performance: performanceMetrics,
            suggestions,
            status: cacheMetrics.hitRate > 50 ? 'optimal' : 'needs-improvement',
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Clear all optimization caches
     */
    clearAllCaches() {
        this.cache.clear();
        this.batchProcessor.clearResults();
        console.log('🧹 All optimization caches cleared');
    }
}

// Create singleton instance
export const optimizationManager = new OptimizationManager();

export default OptimizationManager;