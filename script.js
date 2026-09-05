let xp = 120;
let coins = 100;
let level = 1;


const xpNeeded = 500;


const questButton = document.getElementById("complete-quest");
const xpProgress = document.getElementById("xp-progress");
const xpText = document.getElementById("xp-text");
const coinsText = document.getElementById("coins");
const levelText = document.getElementById("level");


questButton.addEventListener("click", function() {


    xp = xp + 100;
    coins = coins +50;

    if(xp >= xpNeeded) {
        xp = xp - xpNeeded;
        level = level + 1;

        levelText.textContent = "Level" + level + "Adventurer";
    }

    xpText.textContent = xp + "/" + xpNeeded + "XP";
    coinsText.textContent = "💰 " + coins + "Coins";

    xpProgress.style.width = (xp / xpNeeded * 100) + "%";

});