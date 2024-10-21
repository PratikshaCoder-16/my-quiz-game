
const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", answer: "class", type: "mcq", choices: ["class", "object", "method", "variable"] },
        { question: "2. Which data structure uses LIFO?", answer: "stack", type: "mcq", choices: ["queue", "stack", "array", "list"] },
        { question: "3. What does OS stand for?", answer: "operating system", type: "mcq", choices: ["open source", "operating system", "output system", "online system"] },
        { question: "4. What is the default value of an int variable in Java?", answer: "0", type: "mcq", choices: ["0", "1", "null", "undefined"] },
        { question: "5. Which symbol is used for comments in C?", answer: "//", type: "mcq", choices: ["//", "#", "/*", "<!--"] },
        { question: "6. What is the time complexity of binary search?", answer: "O(log n)", type: "mcq", choices: ["O(n)", "O(n^2)", "O(log n)", "O(1)"] },
        { question: "7. In C++, what is a pointer?", answer: "a variable that stores a memory address", type: "one-word" },
        { question: "8. What does API stand for?", answer: "Application Programming Interface", type: "one-word" },
        { question: "9. Which of the following is a cloud computing service?", answer: "All of the above", type: "mcq", choices: ["IaaS", "PaaS", "SaaS", "All of the above"] },
        { question: "10. What is the main function in a C program?", answer: "main", type: "one-word" }
    ],
    medium: [
        { question: "11. In Java, what is the difference between == and equals()?", answer: "== checks reference, equals() checks value", type: "one-word" },
        { question: "12. Explain the concept of encapsulation.", answer: "hiding data and methods within a class", type: "one-word" },
        { question: "13. What is the purpose of the virtual keyword in C++?", answer: "to allow method overriding", type: "one-word" },
        { question: "14. In data structures, what is a binary tree?", answer: "a tree where each node has at most two children", type: "one-word" },
        { question: "15. What is a deadlock in operating systems?", answer: "a situation where two or more processes are blocked forever", type: "one-word" }
    ],
    hard: [
        { question: "16. What is the time complexity of quicksort?", answer: "O(n log n)", type: "one-word" },
        { question: "17. What is a race condition?", answer: "a situation where two threads access shared data at the same time", type: "one-word" },
        { question: "18. What is the difference between a process and a thread?", answer: "a process is an independent program, while a thread is a smaller unit of a process", type: "one-word" },
        { question: "19. What is polymorphism in OOP?", answer: "the ability to present the same interface for different data types", type: "one-word" },
        { question: "20. What is a stack overflow?", answer: "when a stack pointer exceeds the stack bound", type: "one-word" }
    ]
};

let currentLevel = 0; // Tracks the current level (0 for easy, 1 for medium, 2 for hard)
let scores = { easy: 0, medium: 0, hard: 0 }; // Store scores for each level
let totalScore = 0; // Store total score

// Shuffle questions for random selection
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load quiz questions for the current level
function loadQuestions() {
    let levelQuestions;
    if (currentLevel === 0) {
        levelQuestions = questions.easy;
        document.getElementById('level-title').textContent = "Level: Easy";
    } else if (currentLevel === 1) {
        levelQuestions = questions.medium;
        document.getElementById('level-title').textContent = "Level: Medium";
    } else if (currentLevel === 2) {
        levelQuestions = questions.hard;
        document.getElementById('level-title').textContent = "Level: Hard";
    }

    shuffle(levelQuestions); // Shuffle questions

    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = ''; // Clear previous questions

    const selectedQuestions = levelQuestions.slice(0, currentLevel === 2 ? 5 : 10); // Limit to 10 or 5 questions based on level

    selectedQuestions.forEach((q, index) => {
        const label = document.createElement('label');
        label.innerHTML = q.question;
        questionContainer.appendChild(label);

        if (q.type === 'mcq') {
            q.choices.forEach(choice => {
                const choiceLabel = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'q' + index; // Group radio buttons by question
                input.value = choice;
                choiceLabel.appendChild(input);
                choiceLabel.appendChild(document.createTextNode(choice));
                questionContainer.appendChild(choiceLabel);
                questionContainer.appendChild(document.createElement('br'));
            });
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'q' + index;
            questionContainer.appendChild(input);
            questionContainer.appendChild(document.createElement('br'));
        }
    });
}

// Check answers and provide feedback
function checkAnswers() {
    const totalQuestions = currentLevel === 2 ? 5 : 10; // Total questions based on level
    let levelScore = 0;

    for (let i = 0; i < totalQuestions; i++) {
        let question = questions.easy.concat(questions.medium, questions.hard)[i + currentLevel * 10];

        if (question.type === 'mcq') {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption && selectedOption.value === question.answer) {
                levelScore++;
            }
        } else {
            const userAnswer = document.getElementById('q' + i).value.toLowerCase();
            if (userAnswer === question.answer.toLowerCase()) {
                levelScore++;
            }
        }
    }

    scores[Object.keys(scores)[currentLevel]] = levelScore; // Store the score for the current level
    totalScore += levelScore; // Update total score

    let feedbackMessage = "";
    if (currentLevel === 2) {
        feedbackMessage = `Your total score: ${totalScore}. Great job!`;
        feedbackMessage += ` You scored ${scores.easy} in Easy, ${scores.medium} in Medium, and ${scores.hard} in Hard.`;
        feedbackMessage += " Do you want to restart the quiz?";
        document.getElementById('previous-score').textContent = feedbackMessage;
        document.getElementById('previous-score').style.display = 'block';
        document.getElementById('quiz-section').style.display = 'none';
        return;
    } else {
        feedbackMessage = `You scored ${levelScore} out of ${totalQuestions} in this level.`;
        alert(feedbackMessage);
    }

    currentLevel++; // Move to the next level
    loadQuestions(); // Load questions for the next level
}

// Refresh page and load new questions
function refreshPage() {
    loadQuestions();
}

// Start quiz
function startQuiz() {
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const branch = document.getElementById('branch').value;

    if (userId.length < 4 || password.length < 6 || branch === "") {
        alert("Please enter valid User ID (min 4 characters), Password (min 6 characters), and select your branch.");
        return;
    }

    document.getElementById('login').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestions(); // Load first level questions
}

// Go back to login
function goBackToLogin() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'none';
    currentLevel = 0; // Reset level
    totalScore = 0; // Reset total score
    scores = { easy: 0, medium: 0, hard: 0 }; // Reset level scores
}

// Show game info
function showGameInfo() {
    document.getElementById('game-info').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

