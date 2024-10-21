
const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", answer: "class", choices: ["class", "define", "create", "initiate"] },
        { question: "2. Which data structure uses LIFO?", answer: "stack", choices: ["queue", "stack", "array", "list"] },
        // Add more easy questions here
    ],
    medium: [
        { question: "11. In Java, what is the difference between == and equals()?", answer: "== checks reference, equals() checks value", choices: ["== checks value, equals() checks reference", "both are the same", "== checks reference, equals() checks value", "none of the above"] },
        { question: "12. Explain the concept of encapsulation.", answer: "hiding data and methods within a class", choices: ["storing data", "hiding data and methods within a class", "using interfaces", "none of the above"] },
        // Add more medium questions here
    ],
    hard: [
        { question: "16. What is the time complexity of quicksort in the average case?", answer: "O(n log n)", choices: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"] },
        { question: "17. Explain the concept of polymorphism in OOP.", answer: "ability to take many forms", choices: ["inheritance", "ability to take many forms", "encapsulation", "abstraction"] },
        // Add more hard questions here
    ]
};

let currentLevel = 0;
let scores = [0, 0, 0];
let currentUsername = '';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password.length >= 6) {
        currentUsername = username;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('game-info').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
    return false; // Prevent form submission
}

function startGame() {
    currentLevel = 0;
    scores = [0, 0, 0]; // Reset scores when starting the game
    document.getElementById('game-info').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestions();
}

function loadQuestions() {
    const levelNames = ['easy', 'medium', 'hard'];
    const currentQuestions = questions[levelNames[currentLevel]];
    const questionContainer = document.getElementById('questions');
    
    // Ensure question container exists before attempting to set innerHTML
    if (questionContainer) {
        questionContainer.innerHTML = '';
        currentQuestions.forEach((q, i) => {
            const label = document.createElement('label');
            label.innerText = q.question;
            questionContainer.appendChild(label);

            q.choices.forEach(choice => {
                const choiceLabel = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${i}`;
                input.value = choice;
                choiceLabel.appendChild(input);
                choiceLabel.appendChild(document.createTextNode(choice));
                questionContainer.appendChild(choiceLabel);
            });
        });
    } else {
        console.error("Question container not found!");
    }
}

function checkAnswers() {
    const levelNames = ['easy', 'medium', 'hard'];
    const currentQuestions = questions[levelNames[currentLevel]];
    let score = 0;
    
    currentQuestions.forEach((q, i) => {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    
    scores[currentLevel] = score;
    
    if (currentLevel < 2) {
        currentLevel++;
        loadQuestions(); // Load next level
    } else {
        displayResults(); // Final results
    }
}

function displayResults() {
    document.getElementById('quiz-section').style.display = 'none';
    const totalScore = scores.reduce((a, b) => a + b, 0);
    let feedback = '';
    if (totalScore >= 25) {
        feedback = "Amazing! You're a programming genius!";
    } else if (totalScore >= 15) {
        feedback = "Great job! You have a solid understanding of programming!";
    } else {
        feedback = "Keep practicing!";
    }
    
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('results').innerHTML = `
        <p>Level 1 Score: ${scores[0]}</p>
        <p>Level 2 Score: ${scores[1]}</p>
        <p>Level 3 Score: ${scores[2]}</p>
        <p>Total Score: ${totalScore}</p>
        <p>${feedback}</p>
    `;
}

function restartQuiz() {
    document.getElementById('result-section').style.display = 'none';
    startGame();
}

function closeGame() {
    location.reload(); // Reload the page to go back to login
}
