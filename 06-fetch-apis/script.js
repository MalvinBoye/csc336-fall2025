let jkButton = document.querySelector("#memeingbutton");
let adviceButton = document.querySelector("#advicebtn");


jkButton.addEventListener("click", e => getJoke());
adviceButton.addEventListener("click", e => getAdvice());



async function getJoke() {
    let timeBeforeRequest = Date.now();

    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();

    document.querySelector("#jokee").textContent = data.setup;
    const punchline = document.querySelector("#actualjoke");
    punchline.textContent= "";

    setTimeout(() => {
        punchline.textContent = data.punchline;
    },1500);
    
    
}

async function getAdvice(){
    let timeBeforeRequest = Date.now();

    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    
    document.querySelector("#advice").textContent = data.slip.advice;

  
    let timePassed = Date.now() - timeBeforeRequest;
    console.log(`It took ${timePassed}ms to fetch both.`);
}