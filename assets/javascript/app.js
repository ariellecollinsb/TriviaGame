
var questions =
    [
        {
            iAsk: "The chemical symbol of Mercury, Hg, is derived from its Greek name...?",
            choices: ["Hagiarchy", "Hydrargyrum", "Hygric", "Hygieia"],
            correctAnswer: 1
        },
        {
            iAsk: "Where was Freddie Mercury born?",
            choices: ["Zanzibar", "India", "Malaysia", "Bangladesh"],
            correctAnswer: 0
        },
        {
            iAsk: "How long is the orbital period for the planet Mercury?",
            choices: ["72days", "88days", "116days", "128days"],
            correctAnswer: 1
        },
        {
            iAsk: "In the 2005 science fiction novel, Mercury, by author Ben Bova, what did the title character study?",
            choices: ["Theatre", "Education", "Physics", "Engineering"],
            correctAnswer: 3
        },
        {
            iAsk: "What is the atomic number of Mercury?",
            choices: ["96", "85", "80", "82"],
            correctAnswer: 2
        },
        {
            iAsk: "In the Indian thriller, Mercury, created by director Karthik Subbaraj the main characters were terrorized by what?",
            choices: ["A Ghost", "A Zombie", "A Serial Killer", "A Curse"],
            correctAnswer: 0
        },
        {
            iAsk: "In the 1960 DC Comics 'Metal Men', Dr William Mangus gave artificially intelligent robot Mercury, the ability to do what?",
            choices: ["Super strength", "Melt and reform", "Super strength", "Block radiation", "Spin into a fine filament"],
            correctAnswer: 1
        },
        {
            iAsk: "Mercury, a character of the New X-Men Universe, and a student of the Xavier Institute, grew up in which US state?",
            choices: ["Portland, Oregon", "Brooklyn, New York", "Ft Lauderdale, Florida", "Kansas City, Missouri"],
            correctAnswer: 0
        },
        {
            iAsk: "Fictional character Mercury was a member of which race of Super-humanoids from the Marvel Universe series of American comic books first published in 1976?",
            choices: ["The Hunters", "The Eternals", "The Infinity", "The Quasars"],
            correctAnswer: 1
        },
        {
            iAsk: "Roman god Mercury, was known in Greek mythology as who?",
            choices: ["Hephaistos", "Demeter", "Dionysus", "Hermes"],
            correctAnswer: 3
        },
    ];

var userScore = 0;
var interval = 0;
var timeLeft = 0;
var currentQuestion = 0;

function start() {
    userScore = 0;
    timer = 0;
    currentQuestion = 0;

    $("#start").hide();

    startRound();
}

function setTimer(time, action) {
    clearInterval(interval);
    
    timeLeft = time;
    $("#timer").html(timeLeft/1000);
    interval = setInterval(function() {
        timeLeft -= 1000;
        $("#timer").html(timeLeft/1000);
        if(timeLeft === 0) {
            clearInterval(interval);
            action();
        }
    }, 1000)
}
function startRound() {
    $("#trivia").show();

    // Display question
    var question = questions[currentQuestion];
    $("#question").html(question.iAsk);
    $("#a").html(question.choices[0]);
    $("#b").html(question.choices[1]);
    $("#c").html(question.choices[2]);
    $("#d").html(question.choices[3]);

    // Start timer; storing it in timer variable
    setTimer(10000, function () {
        setResponse("Ran out of time!");
    })
}

function setResponse(message) {
    $("#trivia").hide();
    $("#response").html(message);

    setTimer(3000, function () { 
        if (currentQuestion < questions.length - 1) {
             // Show next question
             $("#response").html("");
            currentQuestion++;
            startRound();
        } else {
            //Game Over
            $("#response").html(`Your score was: ${userScore}/10`);
        }
    });
}

$("#start").on("click", function () {
    start();
});

$("#choices button").on("click", function () {
    clearInterval(interval);
    var userGuess = $(this).text();
    var question = questions[currentQuestion];
    var correctAnswer = question.choices[question.correctAnswer];

    if (userGuess === correctAnswer) {
        userScore++;
        setResponse("You got it!");
    } else {
        setResponse(`Close! The correct answer was ${correctAnswer}`);
    }
});



