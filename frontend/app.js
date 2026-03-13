let num1 = Math.floor(Math.random()*10)
let num2 = Math.floor(Math.random()*10)

document.getElementById("question").innerHTML =
"What is " + num1 + " + " + num2 + "?"

function checkAnswer(){

let answer = document.getElementById("answer").value
let correct = num1 + num2

if(answer == correct){
document.getElementById("result").innerHTML =
"⭐ Correct!"
}
else{
document.getElementById("result").innerHTML =
"Try again!"
}

}
