export const normalize = (txt) => {
    return txt ? txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";
};

/**
 * answerKey: The field name of the answer you want returned (e.g., 'en', 'es', 'desc')
 */
export const getSmartDistractors = (targetItem, fullPool, count = 2, answerKey = 'en') => {
    if (!fullPool || fullPool.length === 0) return ["Option A", "Option B"];
    
    let candidates = [];
    if (targetItem.category) {
        candidates = fullPool.filter(item => item.category === targetItem.category);
    } else {
        candidates = fullPool;
    }

    if (candidates.length <= 1) candidates = fullPool;

    // Use the answerKey to find the "value" of the target
    const targetVal = normalize(targetItem[answerKey]);
    
    const validDistractors = candidates.filter(item => {
        const itemVal = normalize(item[answerKey]);
        // Filter out items where the answer is the same
        return itemVal !== targetVal;
    });

    return validDistractors
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
        .map(item => item[answerKey]); // Return the specific field we asked for
};