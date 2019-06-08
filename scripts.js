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
            } else if (".,\"'".indexOf(this.answer[i]) !== -1) {
                underscores += this.answer[i] + " ";
                ++this.guessed;
            } else underscores += "_ ";
        }
        document.getElementById("answer").innerHTML = underscores;
        document.getElementById("wrong").innerHTML = "Wrong :";
        document.getElementById("correct").innerHTML = "";
    }

    tryLetter(letter) {
        // Check if letter is in answer and if so fill in those letters
        // Return if letter is one of the characters we auto-fill
        if (" .,\"'".indexOf(letter) !== -1) return;
        var lowerAnswer = this.answer.toLowerCase();
        var i = lowerAnswer.indexOf(letter);
        if (i == -1 && this.wrong.indexOf(letter) == -1) {
            this.wrong += letter;
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
                if (this.guessed == this.answer.length) document.getElementById("correct").innerHTML = "Correct! Press any key to continue";
            }
            // Put non-breaking spaces back
            document.getElementById("answer").innerHTML = document.getElementById("answer").innerHTML.replace(/  /g, "&nbsp; ");
        }
    }
};

var QAs = [new QuestionAnswer("O ____, ____! wherefore art thou _____?", "Romeo"),
new QuestionAnswer("Hamlet's mother", "Gertrude"),
new QuestionAnswer("Two households, both alike in dignity,<br>In fair Verona, where we lay our scene.<br>From ancient grudge break to new ______,", "mutiny"),
new QuestionAnswer("Romeo's last words", "Thus with a kiss I die."),
new QuestionAnswer("Prospero's daughter", "Miranda")]
var i = Math.floor(Math.random() * QAs.length);
console.log(i);
QAs[i].ask();
document.addEventListener("keypress", function (event) {
    if (QAs[i].guessed === QAs[i].answer.length) {
        // Question i has been answered
        QAs.splice(i, 1);
        if (QAs.length === 0) {
            // There are no more questions to ask
            document.getElementById("question").innerHTML = "You win!";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("wrong").innerHTML = "";
            document.getElementById("correct").innerHTML = "";
        } else {
            i = Math.floor(Math.random() * QAs.length);
            QAs[i].ask();
        }
    } else QAs[i].tryLetter(event.key);
});