(function () {
    console.log("🚀 Gender filter with Counter started");

    const MALE_ICON_HINT   = "y61S0RKEIAhUU1BLLf7"; 
    const FEMALE_ICON_HINT = "y71T2Q6DMAyj9EoreuD"; 

    // 📊 Stats Tracking
    const stats = {
        history: [], // Stores "Male" or "Female" strings
        lastDetected: "" // Prevents double-counting the same person
    };

    function updateStats(gender) {
        stats.history.push(gender);
        
        const maleCount = stats.history.filter(g => g === "Male").length;
        const femaleCount = stats.history.filter(g => g === "Female").length;

        console.clear(); // Keeps the console clean
        console.log(`📊 SESSION STATS:`);
        console.log(`👨 Males: ${maleCount}`);
        console.log(`👩 Females: ${femaleCount}`);
        console.log(`📈 Total: ${stats.history.length}`);
        console.log(`--------------------------`);
    }

    function detectAndSkip() {
        const img = document.querySelector(".name img") || document.querySelector(".not-match img");

        if (!img || !img.src) return;

        const src = img.src;

        // Use the image source as a unique ID so we don't count the same person twice
        if (stats.lastDetected === src) return; 

        if (src.includes(MALE_ICON_HINT)) {
            stats.lastDetected = src;
            updateStats("Male");
            
            const nextBtn = document.querySelector(".next-btn.match-button");
            if (nextBtn) nextBtn.click();
        } 
        else if (src.includes(FEMALE_ICON_HINT)) {
            stats.lastDetected = src;
            updateStats("Female");
        }
    }

    const observer = new MutationObserver(() => {
        setTimeout(detectAndSkip, 500);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();


