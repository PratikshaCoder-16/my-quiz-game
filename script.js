const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", choices: ["class", "def", "function"], answer: "class", type: "mcq" },
        { question: "2. Which data structure uses LIFO?", choices: ["queue", "stack", "array"], answer: "stack", type: "mcq" },
        { question: "3. What does OS stand for?", choices: ["Operating System", "Object System"], answer: "Operating System", type: "mcq" },
        { question: "4. What is the default value of an int variable in Java?", choices: ["0", "1", "-1"], answer: "0", type: "mcq" },
        { question: "5. Which symbol is used for comments in C?", choices: ["//", "#", "/*"], answer: "//", type: "mcq" }
    ],
    medium: [
        { question: "6. What is the time complexity of binary search?", choices: ["O(n)", "O(log n)", "O(n^2)"], answer: "O(log n)", type: "mcq" },
        { question: "7. In C++, what is a pointer?", choices: ["a variable that stores a memory address", "a data type", "a function"], answer: "a variable that stores a memory address", type: "mcq" },
        { question: "8. What does API stand for?", choices: ["Application Programming Interface", "Application Program Integration"], answer: "Application Programming Interface", type: "mcq" },
        { question: "9. Which of the following is a cloud computing service?", choices: ["IaaS", "PaaS", "SaaS", "All of the above"], answer: "All of the above", type: "mcq" },
        { question: "10. What is the main function in a C program?", choices: ["start", "begin", "main"], answer: "main", type: "mcq" }
    ],
    hard: [
        { question: "11. In Java, what is the difference between == and equals()?", choices: ["== checks reference, equals() checks value", "No difference", "equals() checks reference, == checks value"], answer: "== checks reference, equals() checks value", type: "mcq" },
        { question: "12. Explain the concept of encapsulation.", choices: ["hiding data and methods within a class", "public data access", "data abstraction"], answer: "hiding data and methods within a class", type: "mcq" },
        { question: "13. What is the purpose of the virtual keyword in C++?", choices: ["to allow method overriding", "to make a method static", "to create an instance"], answer: "to allow method overriding", type: "mcq" },
        { question: "14. In data structures, what is a binary tree?", choices: ["a tree where each node has at most two children", "a circular list", "a type of stack"], answer: "a tree where each node has at most two children", type: "mcq" },
        { question: "15. What is a deadlock in operating systems?", choices: ["a situation where two processes wait indefinitely", "a high CPU usage", "a fast processing issue"], answer: "a situation where two processes wait indefinitely", type: "mcq" }
    ]
};

let currentLevel = 0; // Start at the first level
let previousScore = 0; // Initialize previous score
let userId = '';
let branch = '';

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

    if (userId && password && branch) {
        document.getElementById("login").style.display = "none"; // Hide login
        document.getElementById("quiz-section").style.display = "block"; // Show quiz
        loadQuestions(currentLevel); // Load questions for the first level
    } else {
        alert("Please fill in all fields.");
    }
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

    // Display the score
    previousScore = score; // Store the score for the next level
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Your Score: ${score}/${allQuestions.length}`;
    document.getElementById("previous-score").innerHTML = `Previous Score: ${previousScore}`;
    document.getElementById("previous-score").style.display = "block";

    currentLevel++; // Move to the next level
    if (currentLevel < 3) {
        loadQuestions(currentLevel); // Load next level questions
    } else {
        alert("Quiz completed!");
        refreshPage(); // Reset for the next user
    }
}

// Refresh the page to restart the quiz
function refreshPage() {
    currentLevel = 0; // Reset to first level
    previousScore = 0; // Reset previous score
    document.getElementById("login").style.display = "block"; // Show login
    document.getElementById("quiz-section").style.display = "none"; // Hide quiz section
    document.getElementById("result").innerHTML = ""; // Clear result
    document.getElementById("previous-score").style.display = "none"; // Hide previous score
    document.getElementById("questions").innerHTML = ""; // Clear questions
    document.getElementById("userId").value = ""; // Clear input fields
    document.getElementById("password").value = "";
    document.getElementById("branch").value = ""; // Clear branch selection
}
