let xp = Number(localStorage.getItem("questForgeXP") || 120);
let coins = Number(localStorage.getItem("questForgeCoins") || 100);
let level = Number(localStorage.getItem("questForgeLevel") || 1);
let questsCompleted = Number(localStorage.getItem("questForgeQuests") || 0);
let streak = Number(localStorage.getItem("questForgeStreak") || 0);
let lastQuestDate = localStorage.getItem("questForgeLastQuestDate");
let strength = Number(localStorage.getItem("questForgeStrength") || 1);
let intelligence = Number(localStorage.getItem("questForgeIntelligence") || 1);
let vitality = Number(localStorage.getItem("questForgeVitality") || 1);
let crafting = Number(localStorage.getItem("questForgeCrafting") || 1);
let dailyQuestData = localStorage.getItem("questForgeDailyQuestDate") || "";

let completedQuests = JSON.parse(
    localStorage.getItem("questForgeCompleted") || "[]"
);

let purchasedItems = JSON.parse(
    localStorage.getItem("questForgeItems") || "[]"
);

const xpNeeded = 500;
const today = new Date().toDateString();
const lastCompletedDate = localStorage.getItem("questForgeLastCompletedDate");

if (lastCompletedDate !== today) {
    completedQuests = [];
    localStorage.setItem("questForgeCompleted", JSON.stringify(completedQuests));
}


const questButtons = document.querySelectorAll(".complete-quest");
const xpProgress = document.getElementById("xp-progress");
const xpText = document.getElementById("xp-text");
const coinsText = document.getElementById("coins");
const levelText = document.getElementById("level");
const streakText = document.getElementById("streak");


function updateDisplay() {

    levelText.textContent = "Level " + level + " Adventurer";
    xpText.textContent = xp + " / " + xpNeeded + " XP";
    coinsText.textContent = "💰 " + coins + " Coins";
    streakText.textContent = "🔥 Quest Streak: " + streak + " days";
    xpProgress.style.width = (xp / xpNeeded * 100) + "%";
}


function updateAchievements() {

   
    const firstQuest = document.getElementById("first-quest");

    if (questsCompleted >= 1) {
        firstQuest.textContent = "🏆 Unlocked!";
    }

    
    const levelTwo = document.getElementById("level-2");

    if (level >= 2) {
        levelTwo.textContent = "🏆 Unlocked!";
    }

    
    const coin500 = document.getElementById("coin-500");

    if (coins >= 500) {
        coin500.textContent = "🏆 Unlocked!";
    }

    const streakSeven = document.getElementById("streak-7");

    if (streak >= 7) {
        streakSeven.textContent = "🏆 Unlocked!";
    }

    const questsTen = document.getElementById("quests-10");

    if (questsCompleted >= 10) {
        questsTen.textContent = "🏆 Unlocked!";
    }

    const coin1000 = document.getElementById("coin-1000");

    if (coins >= 1000) {
        coin1000.textContent = "🏆 Unlocked!"
    }

    const dragonBladeAchievement = document.getElementById("dragon-blade-achievement");

    if (purchasedItems.includes("dragon-blade")) {
        dragonBladeAchievement.textContent = "🏆 Unlocked!"
    }

    const levelFive = document.getElementById("level-5");

    if (level >= 5) {
        levelFive.textContent = "🏆 Unlocked!"
    }

}



function updateStats() {

    document.getElementById("strength").textContent = strength;
    document.getElementById("intelligence").textContent = intelligence;
    document.getElementById("vitality").textContent = vitality;
    document.getElementById("crafting").textContent = crafting;
    document.getElementById("streak").textContent = streak;

}

function updateInventory() {
    const inventoryList = document.getElementById("inventory-list");

    inventoryList.innerHTML = "";

    if (purchasedItems.length === 0) {
        inventoryList.innerHTML = "<p>No items purchased yet.</p>";
        return;
    }

    purchasedItems.forEach(function(item) {

        if (item === "iron-sword") {
            inventoryList.innerHTML +=
                "<div class='inventory-item'>" +
                "<strong>⚔️ Iron Sword</strong>" +
                "<span class='inventory-rarity common'>⚪ Common</span>" +
                "<span>+2 Strength</span>" +
                "</div>";
        }

        if (item === "magic-tome") {
            inventoryList.innerHTML +=
                "<div class='inventory-item'>" +
                "<strong>🧠 Magic Tome</strong>" +
                "<span class='inventory-rarity rare'>🔵 Rare</span>" +
                "<span>+2 Intelligence</span>" +
                "</div>";
        }

        if (item === "iron-shield") {
            inventoryList.innerHTML +=
                "<div class='inventory-item'>" +
                "<strong>🛡️ Iron Shield</strong>" +
                "<span class='inventory-rarity epic'>🟣 Epic</span>" +
                "<span>+2 Vitality</span>" +
                "</div>";
        }

        if (item === "dragon-blade") {
            inventoryList.innerHTML +=
                "<div class='inventory-item'>" +
                "<strong>👑 Dragon Blade</strong>" +
                "<span class='inventory-rarity legendary'>🟠 Legendary</span>" +
                "<span>+5 Strength</span>" +
                "</div>";
        }

    });
}


function updateDailyQuest(){
    const dailyButton = document.getElementById("daily-quest-button");

    const today = new Date().toDateString();

    if(dailyQuestData === today) {
        dailyButton.textContent = "✓ Completed Today";
        dailyButton.disabled = true;

    } else {
        dailyButton.textContent = "Complete Daily Quest";
        dailyButton.disabled = false;
    }
}

updateDisplay();
updateAchievements();
updateStats();
updateInventory();
updateDailyQuest();


questButtons.forEach(function(button) {

    if (completedQuests.includes(button.dataset.quest)) {
        button.textContent = "✓ Completed";
        button.disabled = true;
    
    }
});

questButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const xpReward = Number(button.dataset.xp);
        const coinReward = Number(button.dataset.coins);

        xp = xp + xpReward;
        coins = coins + coinReward;
        questsCompleted = questsCompleted + 1;
        completedQuests.push(button.dataset.quest);

        if (button.dataset.quest === "study") {
            intelligence = intelligence + 1;
        }

        if (button.dataset.quest === "exercise") {
            vitality = vitality + 1;
        }

        if (button.dataset.quest === "project") {
            crafting = crafting + 1;
        }

        strength = strength + 1;

        if (lastQuestDate !== today) {
            if(lastQuestDate) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastQuestDate === yesterday.toDateString()) {
                    streak = streak + 1;
                } else {
                    streak = 1;
                }
            } else {
                streak = 1;
            }
            if (streak === 3) {
                coins = coins + 50;
                alert("🔥 3-Day Streak! +50 Bonus Coins!");
            }

            lastQuestDate = today;
            localStorage.setItem("questForgeLastCompletedDate", today);
        }




        if (xp >= xpNeeded) {

            xp = xp - xpNeeded;
            level = level + 1;
        }


        updateDisplay();
        updateAchievements();
        updateStats();
        updateInventory();
        updateDailyQuest();


        button.textContent = "✓ Completed";
        button.disabled = true;


        localStorage.setItem("questForgeXP", xp);
        localStorage.setItem("questForgeCoins", coins);
        localStorage.setItem("questForgeLevel", level);
        localStorage.setItem("questForgeQuests", questsCompleted);
        localStorage.setItem("questForgeCompleted", JSON.stringify(completedQuests));
        localStorage.setItem("questForgeStreak", streak);
        localStorage.setItem("questForgeLastQuestDate", lastQuestDate);
        localStorage.setItem("questForgeStrength", strength);
        localStorage.setItem("questForgeIntelligence", intelligence);
        localStorage.setItem("questForgeVitality", vitality);
        localStorage.setItem("questForgeCrafting", crafting);
        

    });

});


const shopButtons = document.querySelectorAll(".buy-item");

shopButtons.forEach(function(button) {
    const item = button.dataset.item;

    if (purchasedItems.includes(item)) {
        button.textContent = "✓ Purchased";
        button.disabled = true;
    }

    button.addEventListener("click", function() {
        const price = Number(button.dataset.price);

        if (coins < price) {
            button.textContent = "Not Enough Coins";
            return;
}

coins = coins - price;

purchasedItems.push(item);

        if (item === "iron-sword") {
            strength = strength + 2;
        }

        if (item === "magic-tome") {
            intelligence = intelligence + 2;
        }

        if (item === "iron-shield") {
            vitality = vitality + 2;
        }

        if (item === "dragon-blade") {
            strength = strength + 5;
        }

        
        updateDisplay();
        updateStats();
        updateInventory();

        
        localStorage.setItem("questForgeCoins", coins);
        localStorage.setItem("questForgeStrength", strength);
        localStorage.setItem("questForgeIntelligence", intelligence);
        localStorage.setItem("questForgeVitality", vitality);
        localStorage.setItem(
            "questForgeItems",
            JSON.stringify(purchasedItems)
        );

        
        button.textContent = "✓ Purchased";
        button.disabled = true;

        updateInventory();

    });

});

const dailyButton = document.getElementById("daily-quest-button");

dailyButton.addEventListener("click",function() {
    const today = new Date().toDateString();

    xp = xp + 100;
    coins = coins + 100;

    if(xp >= xpNeeded) {
        xp = xp - xpNeeded;
        level = level + 1;

    }
    
    dailyQuestData = today;

    localStorage.setItem("questForgeDailyQuestDate", dailyQuestData);
    localStorage.setItem("questForgeXP", xp);
    localStorage.setItem("questForgeCoins", coins);
    localStorage.setItem("questForgeLevel", level); 

    updateDisplay();
    updateAchievements();
    updateDailyQuest();

});
