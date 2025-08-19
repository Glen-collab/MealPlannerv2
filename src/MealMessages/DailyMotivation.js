// DailyMotivation.js - Time-aware motivational messages for Week 1

import React from 'react';

// Week1Messages data (since we can't import JSON in this environment)
const Week1Messages = {
    "week1": {
        "messages": [
            "Preparation is your secret weapon, {name}. Sticking to your plan is the key to unlocking success, no matter your goal. Remember, consistency beats perfection every time.",
            "Your focus today builds tomorrow's results. Keep your eyes on your {goal} goal and remember why you started. Every meal and choice is a step toward victory.",
            "{name}, this journey is about more than food—it's about forging discipline and character. Lean into the process and watch how your {goal} progress unfolds.",
            "Start strong, {name}. Nourishing your body with intention sets the tone for the entire day. Your {goal} goal is within reach when you honor your plan.",
            "Don't let distractions knock you off course. Your {goal} journey requires a master plan and the will to stick with it. You're building habits that will last a lifetime.",
            "Consistency in nutrition fuels your progress. {name}, keep pushing toward your {goal} with purpose and focus. You're stronger than any excuse.",
            "Meal prep isn't just about food—it's about reclaiming control over your day. {name}, your commitment to your {goal} is your superpower.",
            "Every choice you make feeds your future. Stay locked into your {goal} plan and let nothing deter your momentum, {name}.",
            "Your discipline today creates your transformation tomorrow. Remember, {name}, the path to your {goal} is paved with daily decisions.",
            "Small wins add up. Celebrate every meal prepped, every healthy choice, and every step closer to your {goal}, {name}.",
            "Fuel your body like the champion you are, {name}. Your {goal} demands your best effort, and you're more than capable of delivering it.",
            "Sticking to the plan isn't always easy, but it's always worth it. Keep your {goal} in sight, {name}, and stay relentless in pursuit.",
            "The road to your {goal} isn't a sprint—it's a marathon. {name}, pace yourself, stay consistent, and trust the process.",
            "Your meals are the building blocks of your transformation. {name}, honor your {goal} by nourishing with intention and care.",
            "Refuel with purpose, {name}. Your {goal} depends on how well you recover and prepare for what's next.",
            "Accountability starts with you. Own your {goal} journey, {name}, and remember that every decision counts.",
            "Your {goal} is personal, and so is your power. {name}, keep showing up and the results will follow.",
            "Don't let one off day define you. {name}, recommit to your {goal} plan and keep moving forward.",
            "When temptation calls, remember your why. Your {goal} is worth every sacrifice, {name}.",
            "Master your routine, master your {goal}. {name}, success is built on consistent habits.",
            "Plan your meals, plan your success. {name}, your {goal} is a reflection of your preparation.",
            "You've got the tools and the talent, {name}. Now it's time to execute your {goal} plan with grit and grace.",
            "Keep your eyes on the prize, {name}. Your {goal} is a journey worth every effort you put in.",
            "The discipline you build now will carry you beyond your {goal}, {name}. This is more than a program—it's a lifestyle.",
            "Celebrate the small victories, {name}. Every healthy meal and workout brings you closer to your {goal}.",
            "Consistency is your best friend on this journey, {name}. Stay committed to your {goal} plan and success will follow.",
            "Remember, {name}, nutrition fuels not just your body but your confidence too. Own your {goal} journey with pride.",
            "Make each meal count, {name}. Your {goal} demands your focus and dedication, and you're ready to deliver.",
            "Your plan is your roadmap, {name}. Trust it, follow it, and watch your {goal} come to life.",
            "No shortcuts, just steady progress. {name}, your {goal} is a marathon, and you're in it for the long haul.",
            "Harness your discipline, {name}. Your {goal} is within reach when you honor your plan every day.",
            "You're writing your own success story, {name}. Keep the {goal} vision clear and the habits strong.",
            "Fuel your ambition with intentional meals, {name}. Your {goal} depends on the consistency you show today.",
            "Trust the process, {name}. Your {goal} will reward your persistence and focus.",
            "It's okay to have tough days, {name}. What matters is that you come back stronger toward your {goal}.",
            "Stay hungry for success, not just food, {name}. Your {goal} is waiting on the other side of discipline.",
            "Your daily choices build your legacy, {name}. Keep your {goal} front and center in every decision.",
            "Stay relentless, {name}. Your {goal} isn't just about weight—it's about building unshakable confidence.",
            "Preparation today makes tomorrow easier, {name}. Stay committed to your {goal} and trust the journey.",
            "Your {goal} journey is uniquely yours, {name}. Own it with pride and purpose every single day.",
            "The power to change is in your hands, {name}. Stay focused and dedicated to your {goal} plan.",
            "Keep moving forward, {name}. Your {goal} is achievable through consistent, intentional effort.",
            "You are stronger than any excuse, {name}. Your {goal} is worth the work and the discipline.",
            "Every step toward your {goal} counts, {name}. Keep your head high and your plan tight.",
            "Your commitment is your greatest asset, {name}. Stay true to your {goal} and let the results follow."
        ],
        "quotes": [
            "'You must do what you have never done to get what you have never gotten.'",
            "'Having a plan means one less thing to think about when life gets busy.'",
            "'Discipline is not just a task; it's the foundation of your new identity.'",
            "'The plan is your anchor when the waves of temptation come crashing.'",
            "'Commitment to the process beats motivation every single time.'",
            "'Glen says: Consistency is the true game changer in any transformation.'",
            "'Glen says: Trust the process even when the results aren't immediate.'",
            "'Glen says: Every small victory adds up to a huge success story.'",
            "'Success doesn't come from luck—it comes from showing up day after day.'",
            "'Your mindset shapes your journey; stay relentless and focused.'"
        ]
    }
};

// ========================
// TIME-AWARE MOTIVATION SYSTEM
// ========================

export const getTimeAwareMotivation = (userProfile) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const isAM = hour < 12;

    // Create a unique index based on day and time period
    // 7 days × 2 periods = 14 different combinations
    const timeSlot = isAM ? 0 : 1;
    const motivationIndex = (dayOfWeek * 2 + timeSlot) % Week1Messages.week1.messages.length;
    const quoteIndex = (dayOfWeek * 2 + timeSlot) % Week1Messages.week1.quotes.length;

    // Get the message and quote
    let message = Week1Messages.week1.messages[motivationIndex];
    let quote = Week1Messages.week1.quotes[quoteIndex];

    // Replace placeholders with user data
    const firstName = userProfile.firstName || userProfile.name || 'Champion';
    const goal = formatGoalForDisplay(userProfile.goal || 'gain-muscle');

    message = message.replace(/{name}/g, firstName).replace(/{goal}/g, goal);
    quote = quote.replace(/{name}/g, firstName).replace(/{goal}/g, goal);

    // Get period description
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[dayOfWeek];
    const period = isAM ? 'Morning' : 'Afternoon/Evening';

    return {
        message,
        quote,
        currentDay,
        period,
        timeSlot: `${currentDay} ${period}`
    };
};

// ========================
// GOAL FORMATTING
// ========================

const formatGoalForDisplay = (goal) => {
    const goalMap = {
        'dirty-bulk': 'mass building',
        'gain-muscle': 'lean muscle gain',
        'lose': 'fat loss',
        'maintain': 'maintenance'
    };
    return goalMap[goal] || goal;
};

// ========================
// GLEN SAYS COMPONENT
// ========================

export const GlenSaysMotivation = ({ userProfile, className = "" }) => {
    const motivation = getTimeAwareMotivation(userProfile);

    return (
        <div className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-xl ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🏫</span>
                </div>
                <div>
                    <h3 className="font-bold text-lg">Glen Says</h3>
                    <p className="text-indigo-100 text-sm">{motivation.timeSlot}</p>
                </div>
            </div>

            {/* Main Message */}
            <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-3 backdrop-blur-sm">
                <p className="text-white leading-relaxed text-sm">
                    {motivation.message}
                </p>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-white border-opacity-50 pl-3">
                <p className="text-indigo-100 text-sm italic">
                    {motivation.quote}
                </p>
            </div>

            {/* Time indicator */}
            <div className="flex justify-between items-center mt-3 text-xs text-indigo-200">
                <span>Week 1 Motivation</span>
                <span>Updates every 12 hours</span>
            </div>
        </div>
    );
};

// ========================
// MINI VERSION FOR DASHBOARD
// ========================

export const GlenSaysMini = ({ userProfile, onClick, className = "" }) => {
    const motivation = getTimeAwareMotivation(userProfile);

    // Get first sentence of the message for preview
    const previewMessage = motivation.message.split('.')[0] + '...';

    return (
        <button
            onClick={onClick}
            className={`bg-gradient-to-r from-indigo-400 to-purple-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-left w-full ${className}`}
        >
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">👨‍🏫</span>
                <span className="font-semibold text-sm">Glen Says</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {motivation.currentDay}
                </span>
            </div>
            <p className="text-xs text-indigo-100 leading-tight">
                {previewMessage}
            </p>
        </button>
    );
};

// ========================
// TESTING HELPER
// ========================

export const testMotivationCycle = () => {
    // Test all 14 combinations (7 days × 2 periods)
    const results = [];

    for (let day = 0; day < 7; day++) {
        for (let period = 0; period < 2; period++) {
            const mockDate = new Date();
            mockDate.setDay(day);
            mockDate.setHours(period === 0 ? 8 : 16); // 8 AM or 4 PM

            const motivation = getTimeAwareMotivation({ firstName: 'Test', goal: 'gain-muscle' });
            results.push({
                day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day],
                period: period === 0 ? 'AM' : 'PM',
                message: motivation.message.substring(0, 50) + '...',
                quote: motivation.quote.substring(0, 40) + '...'
            });
        }
    }

    console.table(results);
    return results;
};