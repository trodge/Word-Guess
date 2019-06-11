class QuestionAnswer {
    constructor(question, answer) {
        // Create a new question and answer
        this.question = question;
        this.answer = answer;
        this.guessed = 0;
        this.wrong = "";
    }

    ask() {
        // Display the question and underscores for the answer
        document.getElementById("question").innerHTML = this.question;
        var underscores = "";
        for (var i = 0; i < this.answer.length; ++i) {
            if (this.answer[i] === " ") {
                underscores += "&nbsp; ";
                ++this.guessed;
            } else if ("!.,\"'".indexOf(this.answer[i]) !== -1) {
                underscores += this.answer[i] + " ";
                ++this.guessed;
            } else underscores += "_ ";
        }
        document.getElementById("answer").innerHTML = underscores;
        document.getElementById("wrong").innerHTML = "Wrong: ";
    }

    tryLetter(letter) {
        // Check if letter is in answer and if so fill in those letters
        // Return if letter is one of the characters we auto-fill
        if (" !.,\"'".indexOf(letter) !== -1) return;
        var lowerAnswer = this.answer.toLowerCase();
        var i = lowerAnswer.indexOf(letter);
        if (i == -1 && this.wrong.indexOf(letter) == -1) {
            this.wrong += letter;
            ++wrong;
            document.getElementById("wrong").innerHTML = "Wrong: " + this.wrong;
        }
        for (; i > -1; i = lowerAnswer.indexOf(letter, i + 1)) {
            // Found the letter at index i
            var oldAnswer = document.getElementById("answer").innerHTML;
            // Remove non-breaking spaces to make characters line up
            oldAnswer = oldAnswer.replace(/\&nbsp; /g, "  ");
            if (oldAnswer[i * 2] == "_") {
                document.getElementById("answer").innerHTML = oldAnswer.substring(0, i * 2) + this.answer[i] + oldAnswer.substring(i * 2 + 1);
                ++this.guessed;
                if (this.guessed == this.answer.length) document.getElementById("wrong").innerHTML = "Correct! Press any key to continue";
            }
            // Put non-breaking spaces back
            document.getElementById("answer").innerHTML = document.getElementById("answer").innerHTML.replace(/   /g, " &nbsp; ");
        }
    }
};

function clockTick() {
    if (timeLeft) {
        --timeLeft;
        document.getElementById("clock").innerHTML = "0:" + timeLeft;
    } else {
        document.getElementById("clock").innerHTML = "Time's Up"
    }
}

var QAs = [new QuestionAnswer("O ____, ____! wherefore art thou _____?", "Romeo"),
new QuestionAnswer("Hamlet's mother", "Gertrude"),
new QuestionAnswer("Two households, both alike in dignity,<br>In fair Verona, where we lay our scene.<br>From ancient grudge break to new ______,", "mutiny"),
new QuestionAnswer("Romeo's last words", "Thus with a kiss I die."),
new QuestionAnswer("Prospero's daughter", "Miranda"),
new QuestionAnswer("Prince of Norway", "Fortinbras"),
new QuestionAnswer("Setting of Twelfth Night", "Illyria"),
new QuestionAnswer("The play Hamlet stages for Claudius", "The Murder of Gonzago"),
new QuestionAnswer("What does Hamlet say while holding a skull?", "Alas, poor Yorick! I knew him, Horatio")]
// Pick a random question to start with.
var i = Math.floor(Math.random() * QAs.length);
console.log(i);
QAs[i].ask();
// Track time left in seconds.
var timeLeft = 60;
// Call clock tick function every second.
document.getElementById("clock").innerHTML = "1:00"
window.setInterval(clockTick, 1000);
// Track the total wrong guesses
var wrong = 0;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // We are on mobile, add a text input
    var listener = document.createElement("input");
    document.getElementsByTagName("body")[0].appendChild(listener);
    listener.focus();
} else {
    var listener = document;
}

listener.addEventListener("keypress", function (event) {
    if (QAs[i].guessed === QAs[i].answer.length) {
        // Question i has been answered
        QAs.splice(i, 1);
        if (QAs.length === 0) {
            // There are no more questions to ask
            document.getElementById("question").innerHTML = "You win!";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("wrong").innerHTML = "Total wrong: " + wrong;
        } else {
            i = Math.floor(Math.random() * QAs.length);
            QAs[i].ask();
        }
    } else QAs[i].tryLetter(event.key);
});