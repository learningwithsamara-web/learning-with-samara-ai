let world = 1
let num1
let num2
let score = 0

function startWorld(w){

world = w

document.getElementById("gameArea").style.display="block"

generateQuestion()

}

function generateQuestion(){

num1 = Math.floor(Math.random()*10)
num2 = Math.floor(Math.random()*10)

document.getElementById("question").innerHTML =
"What is " + num1 + " + " + num2 + " ?"

}

function checkAnswer(){

let answer = document.getElementById("answer").value
let correct = num1 + num2

if(answer == correct){

score++

document.getElementById("result").innerHTML =
"🌟 Correct! Score: " + score

generateQuestion()

}

else{

document.getElementById("result").innerHTML =
"🙂 Try again!"

}

}

function locked(){

alert("Complete the previous world first!")

}
