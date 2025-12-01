let words = [
  "Python",
  "GitHub",
  "TensorFlow",
  "Kubernetes",
  "Blockchain",
  "Linux",
  "Docker",
  "Android",
  "Firebase",
  "React",
];
let levels = {
  Easy: 8,
  Normal: 5,
  Hard: 3,
};

// catch all selectores
let levlSpan = document.querySelector(".massege .lvl");
let secondsSpan = document.querySelector(".massege .seconds");
let startGameBtn = document.querySelector(".start-playing-btn");
let word = document.querySelector(".word");
let userInputField = document.querySelector("#user-input");
let upcomingWordsDiv = document.querySelector(".upcoming-word");
let timeLeftSpan = document.querySelector(".time .time-left-span");
let gotScoreSpan = document.querySelector(".got");
let totalScoreSpan = document.querySelector(".score .total");
let finishDiv = document.querySelector(".finish");
let selectedLvl = document.getElementById("lvlselect");

userInputField.onpaste = () => {
  return false;
};

//
startGameBtn.onclick = () => {
  startGameBtn.remove();
  let lvlSelected = selectedLvl.value;
  console.log(lvlSelected);
  // set default level and secondes
  let defaultLevel = lvlSelected; ///////////   can we make a select box
  let defaultSeconds = levels[defaultLevel];

  // set the default lvls and secondes
  levlSpan.innerHTML = defaultLevel;
  secondsSpan.innerHTML = defaultSeconds;
  // set time left and score count
  timeLeftSpan.innerHTML = defaultSeconds;
  totalScoreSpan.innerHTML = words.length;
  // Disable paste event
  userInputField.focus();
  // generate Words fn
  generateWords(defaultLevel, defaultSeconds);
};
function generateWords(defaultLevel, defaultSeconds) {
  console.log(defaultSeconds);
  // get a randomWord from words array
  let randomIndex = Math.floor(Math.random() * words.length);
  // set randome word in word position
  word.innerHTML = words[randomIndex];
  // delete the word from the array
  words.splice(randomIndex, 1);
  upcomingWordsDiv.innerHTML = "";
  // catch words in upcoming words div

  for (let i = 0; i < words.length; i++) {
    let upcomingWord = document.createElement("span");
    let wordName = document.createTextNode(words[i]);
    upcomingWord.className = "upComingWord";
    upcomingWord.appendChild(wordName);
    upcomingWordsDiv.appendChild(upcomingWord);
  }
  startPlay(defaultLevel, defaultSeconds);
}
function startPlay(defaultLevel, defaultSeconds) {
  timeLeftSpan.innerHTML = defaultSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (word.innerHTML.toLowerCase() === userInputField.value.toLowerCase()) {
        gotScoreSpan.innerHTML++;
        userInputField.value = "";
        userInputField.focus();
        if (words.length > 0) {
          generateWords(defaultLevel, defaultSeconds);
        } else {
          finishDiv.innerHTML = "";
          let congratolation = document.createElement("span");
          congratolation.className = "congratolation";
          let congratolationmsg = document.createTextNode("congratolation");
          congratolation.appendChild(congratolationmsg);
          finishDiv.appendChild(congratolation);
        }
      } else {
        let gameover = document.createElement("span");
        gameover.className = "gameOver";
        let gameoverMsg = document.createTextNode("Game Over");
        gameover.appendChild(gameoverMsg);
        finishDiv.appendChild(gameover);
      }
    }
  }, 1000);
}
