
const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", choices: ["class", "def", "function"], answer: "class", type: "mcq" },
        { question: "2. Which data structure uses LIFO?", choices: ["queue", "stack", "array"], answer: "stack", type: "mcq" },
        { question: "3. What does OS stand for?", choices: ["Operating System", "Object System"], answer: "Operating System", type: "mcq" },
        { question: "4. What is the default value of an int variable in Java?", choices: ["0", "1", "-1"], answer: "0", type: "mcq" },
        { question: "5. Which symbol is used for comments in C?", choices: ["//", "#", "/*"], answer: "//", type: "mcq" },
        { question: "6. Which of the following is a data type?", choices: ["int", "function", "class"], answer: "int", type: "mcq" },
        { question: "7. What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Text Markup Language"], answer: "Hyper Text Markup Language", type: "mcq" },
        { question: "8. Which language is primarily used for web development?", choices: ["Python", "JavaScript", "C++"], answer: "JavaScript", type: "mcq" },
        { question: "9. What is the output of console.log(2 + '2')?", choices: ["4", "22", "Error"], answer: "22", type: "mcq" },
        { question: "10. Which operator is used to assign a value?", choices: ["=", "==", ":="], answer: "=", type: "mcq" }
    ],
    medium: [
        { question: "11. What is the time complexity of binary search?", choices: ["O(n)", "O(log n)", "O(n^2)"], answer: "O(log n)", type: "mcq" },
        { question: "12. In C++, what is a pointer?", choices: ["a variable that stores a memory address", "a data type", "a function"], answer: "a variable that stores a memory address", type: "mcq" },
        { question: "13. What does API stand for?", choices: ["Application Programming Interface", "Application Program Integration"], answer: "Application Programming Interface", type: "mcq" },
        { question: "14. Which of the following is a cloud computing service?", choices: ["IaaS", "PaaS", "SaaS", "All of the above"], answer: "All of the above", type: "mcq" },
        { question: "15. What is the main function in a C program?", choices: ["start", "begin", "main"], answer: "main", type: "mcq" },
        { question: "16. What is recursion?", choices: ["A function that calls itself", "A loop", "A data structure"], answer: "A function that calls itself", type: "mcq" },
        { question: "17. What is encapsulation in OOP?", choices: ["Data hiding", "Inheritance", "Polymorphism"], answer: "Data hiding", type: "mcq" },
        { question: "18. What does SQL stand for?", choices: ["Structured Query Language", "Simple Query Language"], answer: "Structured Query Language", type: "mcq" },
        { question: "19. Which data structure uses FIFO?", choices: ["stack", "queue", "array"], answer: "queue", type: "mcq" },
        { question: "20. What is a hash table?", choices: ["A data structure for storing key-value pairs", "A type of loop", "An array"], answer: "A data structure for storing key-value pairs", type: "mcq" }
    ],
    hard: [
        { question: "21. In Java, what is the difference between == and equals()?", choices: ["== checks reference, equals() checks value", "No difference", "equals() checks reference, == checks value"], answer: "== checks reference, equals() checks value", type: "mcq" },
        { question: "22. Explain the concept of encapsulation.", choices: ["hiding data and methods within a class", "public data access", "data abstraction"], answer: "hiding data and methods within a class", type: "mcq" },
        { question: "23. What is the purpose of the virtual keyword in C++?", choices: ["to allow method overriding", "to make a method static", "to create an instance"], answer: "to allow method overriding", type: "mcq" },
        { question: "24. In data structures, what is a binary tree?", choices: ["a tree where each node has at most two children", "a circular list", "a type of stack"], answer: "a tree where each node has at most two children", type: "mcq" },
        { question: "25. What is a deadlock in operating systems?", choices: ["a situation where two processes wait indefinitely", "a high CPU usage", "a fast processing issue"], answer: "a situation where two processes wait indefinitely", type: "mcq" }
    ]
};

let currentLevel = 0; // Start at the first level
let previousTotalScore = 0; // Initialize previous total score
let userId = '';
let branch = '';
let levelScores = [0, 0, 0]; // Array to store scores for each level

// Shuffle questions for random selection
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load quiz questions based on level
function loadQuestions(level) {
    let allQuestions = [];

    if (level === 0) {
        allQuestions = [...questions.easy];
    } else if (level === 1) {
        allQuestions = [...questions.medium];
    } else if (level === 2) {
        allQuestions = [...questions.hard];
    }

    shuffle(allQuestions); // Shuffle questions for random order
    displayQuestions(allQuestions);
}

// Display questions on the page
function displayQuestions(allQuestions) {
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = ""; // Clear previous questions

    allQuestions.forEach((q, index) => {
        const questionHTML = `
            <label>${q.question}</label>
            ${q.choices.map((choice) => `
                <label>
                    <input type="radio" name="q${index}" value="${choice}">
                    ${choice}
                </label>
            `).join("")}
        `;
        questionsDiv.innerHTML += questionHTML;
    });

    document.getElementById("level-title").innerText = `Level: ${currentLevel + 1}`;
}

// Start the quiz after login
function startQuiz() {
    userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    branch = document.getElementById("branch").value;

    if (validateLogin(userId, password)) {
        document.getElementById("login").style.display = "none"; // Hide login
        document.getElementById("quiz-section").style.display = "block"; // Show quiz
        loadQuestions(currentLevel); // Load questions for the first level
    } else {
        alert("Please ensure that User ID and Password meet the constraints.");
    }
}

// Validate login input constraints
function validateLogin(userId, password) {
    return userId.length >= 4 && password.length >= 6; // Basic constraints
}

// Check answers and calculate score
function checkAnswers() {
    const questionsDiv = document.getElementById("questions");
    const allQuestions = questions[currentLevel === 0 ? "easy" : currentLevel === 1 ? "medium" : "hard"];
    let score = 0;

    allQuestions.forEach((q, index) => {
        const selected = questionsDiv.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    // Store the score for the current level
    levelScores[currentLevel] = score;

    // Display the score for the current level
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Your Score for Level ${currentLevel + 1}: ${score}/${allQuestions.length}`;

    previousTotalScore += score; // Update previous total score

    // If current level is the last one, show final message
    if (currentLevel === 2) {
        resultDiv.innerHTML += `<br>Your Total Score: ${previousTotalScore}`;
        const motivationalMessage = getMotivationalMessage(previousTotalScore);
        resultDiv.innerHTML += `<br>${motivationalMessage}`;
        showFinalOptions();
    } else {
        currentLevel++; // Move to the next level
        loadQuestions(currentLevel); // Load next level questions
    }

    // Show previous total score
    document.getElementById("previous-score").innerHTML = `Previous Total Score: ${previousTotalScore}`;
    document.getElementById("previous-score").style.display = "block";
}

// Get a motivational message based on the total score
function getMotivationalMessage(score) {
    if (score === 30) {
        return "Excellent! You're a programming wizard!";
    } else if (score >= 20) {
        return "Great job! Keep up the good work!";
    } else if (score >= 10) {
        return "Good effort! Keep practicing!";
    } else {
        return "Don't give up! Keep trying!";
    }
}

// Show final options after completing all levels
function showFinalOptions() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML += `<br><button onclick="refreshPage()">Restart Game</button> <button onclick="closeGame()">Close Game</button>`;
}

// Refresh the page to restart the quiz
function refreshPage() {
    currentLevel = 0; // Reset to first level
    previousTotalScore = 0; // Reset previous total score
    levelScores = [0, 0, 0]; // Reset level scores
    document.getElementById("login").style.display = "block"; // Show login
    document.getElementById("quiz-section").style.display = "none"; // Hide quiz section
    document.getElementById("result").innerHTML = ""; // Clear result
    document.getElementById("previous-score").style.display = "none"; // Hide previous score
    document.getElementById("questions").innerHTML = ""; // Clear questions
    document.getElementById("userId").value = ""; // Clear input fields
    document.getElementById("password").value = "";
    document.getElementById("branch").value = ""; // Clear branch selection
}

// Close the game and go back to login
function closeGame() {
    document.getElementById("login").style.display = "block"; // Show login
    document.getElementById("quiz-section").style.display = "none"; // Hide quiz section
    document.getElementById("result").innerHTML = ""; // Clear result
    document.getElementById("previous-score").style.display = "none"; // Hide previous score
    document.getElementById("questions").innerHTML = ""; // Clear questions
    previousTotalScore = 0; // Reset previous total score
    levelScores = [0, 0, 0]; // Reset level scores
}

// Go back to login from game info
function goBackToLogin() {
    document.getElementById("game-info").style.display = "none"; // Hide game info
    document.getElementById("login").style.display = "block"; // Show login
}

// Show game info
function showGameInfo() {
    document.getElementById("game-info").style.display = "block"; // Show game info
    document.getElementById("login").style.display = "none"; // Hide login
}
