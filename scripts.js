class QuestionAnswer {
    constructor(question, answer) {
        // Create a new question and answer
        this.question = question;
        this.answer = answer;
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
        for (var i = lowerAnswer.indexOf(letter); i > -1; i = lowerAnswer.indexOf(letter, i + 1)) {
            
        }
    }
};

var QA = new QuestionAnswer("____ ____ wherefore art thou _____?", "Romeo");
QA.ask();