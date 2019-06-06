class QuestionAnswer {
    constructor(question, answer) {
        // Create a new question and answer
        this.question = question;
        this.answer = answer;
        this.guessed = 0;
        this.wrong = 0;
    }

    ask() {
        // Display the question and underscores for the answer
        document.getElementById("question").innerHTML = this.question;
        var undescores = "";
        for (var i = 0; i < this.answer.length; ++i) {
            undescores += "_ ";
        }
        document.getElementById("answer").innerHTML = undescores;
    }

    tryLetter(letter) {
        // Check if letter is in answer and if so fill in those letters
        var lowerAnswer = this.answer.toLowerCase();
        var i = lowerAnswer.indexOf(letter);
        if (i == -1) ++this.wrong;
        for (; i > -1; i = lowerAnswer.indexOf(letter, i + 1)) {
            // Found the letter at index i
            var oldAnswer = document.getElementById("answer").innerHTML;
            if (oldAnswer[i * 2] == "_") {
                document.getElementById("answer").innerHTML = oldAnswer.substring(0, i * 2) + this.answer[i] + oldAnswer.substring(i * 2 + 1);
                ++this.guessed;
            }
        }
    }
};

var QAs = [new QuestionAnswer("____ ____ wherefore art thou _____?", "Romeo"),
new QuestionAnswer("What is the name of Hamlet's mother?", "Gertrude"),
new QuestionAnswer("From ancient strife break to new ______", "mutiny")]
var i = Math.floor(Math.random() * QAs.length);
console.log(i);
QAs[i].ask();
document.addEventListener("keypress", function (event) {
    QAs[i].tryLetter(event.key);
    if (QAs[i].guessed === QAs[i].answer.length) {
        // Question i has been answered
        QAs.splice(i, 1);
        if (QAs.length === 0) {
            document.getElementById("question").innerHTML = "You win!";
            document.getElementById("answer").innerHTML = "";
        } else {
            i = Math.floor(Math.random() * QAs.length);
            QAs[i].ask();
        }
    }
});