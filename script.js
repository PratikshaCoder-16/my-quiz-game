
const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", answer: "class", type: "mcq", choices: ["class", "define", "create", "initiate"] },
        { question: "2. Which data structure uses LIFO?", answer: "stack", type: "mcq", choices: ["queue", "stack", "array", "list"] },
        { question: "3. What does OS stand for?", answer: "operating system", type: "mcq", choices: ["original system", "operating system", "open source", "online service"] },
        { question: "4. What is the default value of an int variable in Java?", answer: "0", type: "mcq", choices: ["1", "0", "-1", "null"] },
        { question: "5. Which symbol is used for comments in C?", answer: "//", type: "mcq", choices: ["//", "/*", "#", "--"] },
        { question: "6. What is the time complexity of binary search?", answer: "O(log n)", type: "mcq", choices: ["O(n)", "O(n^2)", "O(log n)", "O(1)"] },
        { question: "7. In C++, what is a pointer?", answer: "a variable that stores a memory address", type: "mcq", choices: ["a variable", "a function", "an object", "a class"] },
        { question: "8. What does API stand for?", answer: "Application Programming Interface", type: "mcq", choices: ["Application Programming Interface", "Application Program Interface", "Applied Programming Interface", "Application Product Interface"] },
        { question: "9. Which of the following is a cloud computing service?", answer: "All of the above", type: "mcq", choices: ["IaaS", "PaaS", "SaaS", "All of the above"] },
        { question: "10. What is the main function in a C program?", answer: "main", type: "mcq", choices: ["start", "main", "init", "run"] }
    ],
    medium: [
        { question: "11. In Java, what is the difference between == and equals()?", answer: "== checks reference, equals() checks value", type: "mcq", choices: ["== checks value, equals() checks reference", "both are the same", "== checks reference, equals() checks value", "none of the above"] },
        { question: "12. Explain the concept of encapsulation.", answer: "hiding data and methods within a class", type: "mcq", choices: ["storing data", "hiding data and methods within a class", "using interfaces", "none of the above"] },
        { question: "13. What is the purpose of the virtual keyword in C++?", answer: "to allow method overriding", type: "mcq", choices: ["to create a virtual machine", "to allow method overriding", "to declare variables", "none of the above"] },
        { question: "14. In data structures, what is a binary tree?", answer: "a tree where each node has at most two children", type: "mcq", choices: ["a linear structure", "a tree where each node has at most two children", "a graph", "none of the above"] },
        { question: "15. What is a deadlock in operating systems?", answer: "a situation where two or more processes are blocked forever", type: "mcq", choices: ["a system failure", "a process termination", "a situation where two or more processes are blocked forever", "none of the above"] }
    ],
    hard: [
        { question: "16. What is the time complexity of quicksort in the average case?", answer: "O(n log n)", type: "mcq", choices: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"] },
        { question: "17. Explain the concept of polymorphism in OOP.", answer: "ability to take many forms", type: "mcq", choices: ["inheritance", "ability to take many forms", "encapsulation", "abstraction"] },
        { question: "18. What is a race condition?", answer: "when two or more processes access shared data and try to change it at the same time", type: "mcq", choices: ["when processes are terminated", "when two or more processes access shared data and try to change it at the same time", "none of the above", "all of the above"] },
        { question: "19. What is the purpose of a mutex?", answer: "to prevent race conditions", type: "mcq", choices: ["to manage memory", "to prevent race conditions", "to lock resources", "none of the above"] },
        { question: "20. In database systems, what does ACID stand for?", answer: "Atomicity, Consistency, Isolation, Durability", type: "mcq", choices: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Isolation, Durability", "Atomicity, Clarity, Isolation, Durability", "none of the above"] }
    ]
};

let currentLevel = 0; // 0 for easy, 1 for medium, 2 for hard
let scores = [0, 0, 0]; // Array to hold scores for each level
let currentUsername = '';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation for demo purposes
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
    currentLevel = 0; // Reset to first level
    scores = [0, 0, 0]; // Reset scores
    document.getElementById('game-info').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestions();
}

function loadQuestions() {
    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = ''; // Clear previous questions
    const levelKeys = ['easy', 'medium', 'hard'];
    const selectedQuestions = questions[levelKeys[currentLevel]].slice(0, 10);

    document.getElementById('level-title').innerText = `Level: ${levelKeys[currentLevel]}`;
    
    selectedQuestions.forEach((q, index) => {
        const label = document.createElement('label');
        label.innerHTML = q.question;
        questionContainer.appendChild(label);
        
        // Create radio buttons for choices
        q.choices.forEach(choice => {
            const choiceLabel = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${index}`; // Group radio buttons by question
            input.value = choice;
            choiceLabel.appendChild(input);
            choiceLabel.appendChild(document.createTextNode(choice));
            questionContainer.appendChild(choiceLabel);
            questionContainer.appendChild(document.createElement('br'));
        });
    });
}

function checkAnswers() {
    const totalQuestions = currentLevel === 2 ? 5 : 10; // Hard level has 5 questions
    const levelKeys = ['easy', 'medium', 'hard'];

    for (let i = 0; i < totalQuestions; i++) {
        const question = questions[levelKeys[currentLevel]][i];

        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && selectedOption.value === question.answer) {
            scores[currentLevel]++; // Increment score for correct answer
        }
    }

    displayResults();
}

function displayResults() {
    const totalScore = scores.reduce((a, b) => a + b, 0); // Total score from all levels
    let feedbackMessage = '';

    if (totalScore >= 25) {
        feedbackMessage = "Amazing! You're a programming genius!";
    } else if (totalScore >= 15) {
        feedbackMessage = "Great job! You have a solid understanding of programming!";
    } else {
        feedbackMessage = "Don't worry! Keep practicing, and you'll improve!";
    }

    document.getElementById('quiz-section').innerHTML = `
        <h2>Your Results</h2>
        <p>Level 1 (Easy) Score: ${scores[0]}</p>
        <p>Level 2 (Medium) Score: ${scores[1]}</p>
        <p>Level 3 (Hard) Score: ${scores[2]}</p>
        <p>Total Score: ${totalScore}</p>
        <p>${feedbackMessage}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
        <button onclick="closeGame()">Close Game</button>
    `;
}

function restartQuiz() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('game-info').style.display = 'block'; // Return to game info
}

function closeGame() {
    window.location.reload(); // Reload the page to go back to login
}



