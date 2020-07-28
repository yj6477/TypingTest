const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.getElementById("origin-text");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const DisplayError = document.querySelector(".error");
var updateQuote;
var old;
var index =0;
var errors =0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function getTimer(){
  return (m < 10? "0" + m:m) + ":"+(s<10 ? "0" + s:s) + ":" + (ms<10 ? "0" + ms: ms);
}


// Run a standard minute/second/hundredths timer:
var ms = 0, s = 0, m = 0;
var timer;
//Timer function
function run(){
  theTimer.textContent = getTimer();
  
  ms++;
  if(ms == 100){
    ms = 0;
    s++;
  }
  
  if (s == 60){
    s = 0;
     m++;
  }
}


function stopTimer(){
  clearInterval(timer);
  timer = false;
}

//generate random sentences
var sentence = ["I like cheese, I think cheese is the greatest gift of food that ever existed",
               "Hey, have you seen a guy turning himself into a pickle? Funniest shit I've ever seen",
               "Questions were raised about Kim's well-being after he missed the celebration of his grandfather's birthday on April 15. He had been seen four days before that at a politburo meeting, according to North Korean state media, KCNA.",
                "This one is to test to see if the typing test is working. I hope this test works well and get an A on this project.",
               "You are the shuckiest shuck faced shuck in the world!",
               "Time is an absurdity. An abstraction. The only thing that matters is this moment. This moment a million times over. You have to trust me. If this moment is repeated enough, if you keep trying and you have to keep trying eventually you will come across the next item on your list."];

//Function to generate random sentences
function randsentence(){
  var rand = Math.floor(Math.random()*6);
  updateQuote = sentence[rand];
  
  //display the sentence
  originText.querySelector("p").innerHTML = updateQuote;
}
randsentence();
// Match the text entered with the provided text on the page:
function Textmatch(textArea){
  var quote = updateQuote;
  
  
  //when all the input is correct stop the time
  if (textArea == quote){
    stopTimer();
    testWrapper.style.borderColor = "green";
    //stop the user typing more
    testArea.setAttribute("disabled", "");
  }
  //if current charcter input is incorrect change border box to red
   else if ((quote.charAt(textArea.length-1) != textArea.charAt(textArea.length-1))||(quote.charAt(index) != textArea.charAt(index)))
   {
     //in case if the user happen to backspace that removed the correct input and typed a wrong input, turn the box red
     if(textArea.length > old){
       testWrapper.style.borderColor = "red";
       errors++;
       
     }
     //to make sure that if user types a wrong input on previous character but types a correct character on the current character, it needs to stay red
     else if (quote.charAt(textArea.length-2) != textArea.charAt(textArea.length-2)){
       testWrapper.style.borderColor = "red";
     }
     //When user backspace to remove all the wrong input, turn the box back to blue
     else{
       testWrapper.style.borderColor = "blue";
       index--;
     }
   }
  //if character input is correct change border box to blue
  else{
    testWrapper.style.borderColor = "blue";
    old = textArea.length;
    index++;
  }
    
}


// Start the timer:
function start(){
  //if the timer is already running, dont make it start again
  if (!timer){
    timer = setInterval(run, 10);
  }
  Textmatch(testArea.value);
  //display errors
DisplayError.textContent = "Errors: " + errors;
}


// Reset everything and generate new random sentence
function reset(){
  stopTimer();
  ms = 0;
  s = 0;
  m = 0;
  testArea.value = null;  //reset the input
  testArea.removeAttribute("disabled","");//let user allow to type again
  testWrapper.style.borderColor = "grey";  //turn back to default color
  randsentence();                        //generate another random sentence
  theTimer.textContent = getTimer();    //display timer back to zero
  DisplayError.textContent = ""        //display errors to null
  old = 0;                            //reset old increments
  index = 0;                          //reset index increments
  errors = 0;                        //reset error increments
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener('input',start);
resetButton.addEventListener('click',reset);