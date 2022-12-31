// Récupérer mes 3 blocks div HTML (le header, la div questions et la div result)

let questions_screen = document.getElementById("questions_screen");
let admin_page = document.getElementById("admin");
let token_page = document.getElementById("token_page");
let result_screen = document.getElementById("result_screen");
let button = document.getElementById("js-btn-tts");
let buttonStop = document.getElementById("js-btn-stop-tts");
let content = document.getElementById("span");
let buttonResult = document.getElementById("js-btn-result-tts");
let buttonStopResult = document.getElementById("js-btn-stop-result-tts");


button.addEventListener("click", function(){
    let header_screen = document.getElementById("header_screen");
    let text = header_screen.textContent;

    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
});

buttonStop.addEventListener("click", function(){
    speechSynthesis.cancel();
});

buttonResult.addEventListener("click", function(){
    let text = result_screen.textContent;

    let speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.8;
    speechSynthesis.speak(speech);
});

buttonStopResult.addEventListener("click", function(){
    speechSynthesis.cancel();
});

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.comment1 = "Votre estime de soi est très faible. Un travail dans ce domaine semble souhaitable.";
    this.comment2 = "Votre estime de soi est faible. Un travail dans ce domaine serait bénéfique.";
    this.comment3 = "Votre estime de soi est dans la moyenne.";
    this.comment4 = "Votre estime de soi est forte.";
    this.comment5 = "Votre estime de soi est très forte et vous avez tendance à être fortement affirmé(e).";
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";

        }
    }

    this.addResult = function() {
        if(this.indexCurrentQuestion === this.questions.length) {
            if(quiz.nbrCorrects < 25) {
                let comment = document.querySelector("#resultat");
                comment.textContent = this.comment1;
            } else if (quiz.nbrCorrects >= 25 && quiz.nbrCorrects < 31){
                let comment = document.querySelector("#resultat");
                comment.textContent = this.comment2;
            } else if (quiz.nbrCorrects >= 31 && quiz.nbrCorrects < 34){
                let comment = document.querySelector("#resultat");
                comment.textContent = this.comment3;
            } else if (quiz.nbrCorrects >= 34 && quiz.nbrCorrects <= 39){
                let comment = document.querySelector("#resultat");
                comment.textContent = this.comment4;
            } else if (quiz.nbrCorrects > 39){
                let comment = document.querySelector("#resultat");
                comment.textContent = this.comment5;
            }
        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers) {
    this.title = title,
    this.answers = answers,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questions_screen = document.getElementById("questions_screen");
        let rate = document.querySelector("rate");

        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        let button = document.createElement("button");
        button.classList.add("js-btn-tts");
        button.textContent = "Lecture";

        let buttonStop = document.createElement("button");
        buttonStop.classList.add("js-btn-stop-tts");
        buttonStop.textContent = "Stop";

        button.addEventListener("click", function(){
            let text = questions_screen.textContent;
        
            let speech = new SpeechSynthesisUtterance(text);
            speech.rate = 0.7;
            speechSynthesis.speak(speech);
        });
        
        buttonStop.addEventListener("click", function(){
            speechSynthesis.cancel();
        });

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.prepend(buttonStop);
        questions_screen.prepend(button);
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + " sur " + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");

        }

        // Mise en place d'une fonction Timeout pour passer à la prochaine question, timer d'une seconde après le click sur un élément
        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
            quiz.addResult();
        }, 550);
    };
    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == (this.answers=1)) {
            quiz.nbrCorrects++;
            return true;
        } else if (answerUser == (this.answers=2)) {
            quiz.nbrCorrects+=2;
            return true;
        } else if (answerUser == (this.answers=3)) {
            quiz.nbrCorrects+=3;
            return true;
        } else if (answerUser == (this.answers=4)) {
            quiz.nbrCorrects+=4;
            return true;
        }
        else {
            return false;
        }
    }
};

function Question2(title, answers) {
    this.title = title,
    this.answers = answers,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questions_screen = document.getElementById("questions_screen");
        let rate = document.querySelector("rate");

        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        let button = document.createElement("button");
        button.classList.add("js-btn-tts");
        button.textContent = "Lecture";

        let buttonStop = document.createElement("button");
        buttonStop.classList.add("js-btn-stop-tts");
        buttonStop.textContent = "Stop";

        button.addEventListener("click", function(){
            let text = questions_screen.textContent;
        
            let speech = new SpeechSynthesisUtterance(text);
            speech.rate = 0.7;
            speechSynthesis.speak(speech);
        });
        
        buttonStop.addEventListener("click", function(){
            speechSynthesis.cancel();
        });

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.prepend(buttonStop);
        questions_screen.prepend(button);
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + " sur " + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");

        }

        // Mise en place d'une fonction Timeout pour passer à la prochaine question, timer d'une seconde après le click sur un élément
        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
            quiz.addResult();
        }, 550);
    };
    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == (this.answers=1)) {
            quiz.nbrCorrects+=4;
            return true;
        } else if (answerUser == (this.answers=2)) {
            quiz.nbrCorrects+=3;
            return true;
        } else if (answerUser == (this.answers=3)) {
            quiz.nbrCorrects+=2;
            return true;
        } else if (answerUser == (this.answers=4)) {
            quiz.nbrCorrects++;
            return true;
        }
        else {
            return false;
        }
    }
};

// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Je pense que je suis une personne de valeur, au moins égale à n'importe qui d'autre", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"],1,2,3,4);
quiz.addQuestion(question1);

let question2 = new Question("Je pense que je possède un certain nombre de belles qualités", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"],1,2,3,4);
quiz.addQuestion(question2);

let question3 = new Question2("Tout bien considéré, je suis porté à me considérer comme un raté", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question3);

let question4 = new Question("Je suis capable de faire les choses aussi bien que la majorité des gens", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question4);

let question5 = new Question2("Je sens peu de raisons d'être fier de moi", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question5);

let question6 = new Question("J'ai une attitude positive viv-à-vis de moi-même", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question6);

let question7 = new Question("Dans l'ensemble, je suis satisfait de moi", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question7);

let question8 = new Question2("J'aimerais avoir plus de respect pour moi-même", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question8);

let question9 = new Question2("Parfois je me sens vraiment inutile", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question9);

let question10 = new Question2("Il m'arrive de penser que je suis un bon à rien", ["Tout à fait en désaccord", "Plutôt en désaccord", "Plutôt en accord", "Tout à fait en accord"]);
quiz.addQuestion(question10);


// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    
    NbrQuestion.textContent = quiz.questions.length;

});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    let header_screen = document.getElementById("header_screen");

    let input = document.forms["RegForm"]["Code"];
    const ACCES_KEY = "5647";

    if (input.value != ACCES_KEY) {
        window.alert("Merci de renseigner un code valide");
        input.focus();
        return false;
    } else {
        header_screen.style.display = "none";
        questions_screen.style.display = "block";
    
        quiz.displayCurrentQuestion();
    }
}

// function Login() {
//     let btn_admin = document.getElementById("btn_admin");
//     let header_screen = document.getElementById("header_screen");

//     btn_admin.addEventListener('click', (e)=>{
//         if(e){
//             admin_page.style.display = "block";
//             header_screen.style.display = "none";
//             btn_admin.style.display = "none";
//         }
//     })
// }

// function changeToken (){
//     let input = document.forms["AdminForm"]["Email"]["Password"];
//     const mail = "christophervioux@gmail.com";
//     const password = "coucou";

//     if (input.mail != mail || input.password != password) {
//         window.alert("Merci de renseigner un mail et/ou un mot de passe valide");
//         input.focus();
//         return false;
//     } else {
//         token_page.style.display = "block";
//         admin_page.style.display = "none";
//     }
// }



// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);

// let btn_admin = document.getElementById("btn_admin");
// btn_admin.addEventListener("click", Login);