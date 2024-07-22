const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0;
let mistake = (isTyping = 0); //setting both 0

function randomPara() {
  //getting random no. and it's always less than the paragraphs length
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML="";
  //getting random item from paragraph array, splitting all characters of it,
  //adding each character inside span and then adding this span inside p tag
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  //focusing input field on keydown or click event
  document.addEventListener("keydown", () => inpField.focus()); //focusing input field on key down
  typingText.addEventListener("click", () => inpField.focus()); //focusing input field on click
}

function initTyping() {
  const character = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < character.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      //once the timer is started then it wont restart again on every key clicked
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      charIndex--;
      //decrement mistakes only if the character span contains incorrect class
      if (character[charIndex].classList.contains("incorrect")) {
        mistake--;
      }
      character[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (character[charIndex].innerText === typedChar) {
        character[charIndex].classList.add("correct");
      } else {
        mistake++; //increment mistakes for incorrect class
        character[charIndex].classList.add("incorrect");
      } //if user types the character shown correct class is added to span in p element , else incorrect class is added
      charIndex++; //increment the char index irrespective of correct or incorrect
      character.forEach((span) => span.classList.remove("active")); //first,removing active class from all span &then adding it to current span only
      character[charIndex].classList.add("active"); //adds active class for next element after assigning correct or incorrect to before element

      let wpm = Math.round(
        ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
      );
      //if wpm value is 0 or empty or infinity it'll show 0
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      mistakeTag.innerText = mistake;
      wpmTag.innerText = wpm;
      cpmTag.innerText = charIndex - mistake; //cpm will not count mistakes
    }
  } else {
    inpField.value = ""; //user cant type after timeleft is 0
    clearInterval(timer);
  }
}

function initTimer() {
  //if timeleft is greater than 0 then decrement timeleft else clear the timer
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  //calling loadParagraph,function & resetting each variable & element to default
  randomPara();
  inpField.value="";
  clearInterval(timer),
  (timeLeft = maxTime), (charIndex = 0);
  let mistake = (isTyping = 0);
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistake;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0; 
}

randomPara();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
