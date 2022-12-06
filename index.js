let button = document.getElementById("js-btn-tts");
let buttonStop = document.getElementById("js-btn-stop-tts");
let content = document.getElementById("main");

button.addEventListener("click", function() {
    let text = content.textContent;

    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
})
