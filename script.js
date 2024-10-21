const questions = {
    easy: [
        { question: "1. What is the keyword used to define a class in Java?", choices: ["class", "object", "function", "method"], answer: "class" },
        { question: "2. Which data structure uses LIFO?", choices: ["stack", "queue", "tree", "graph"], answer: "stack" },
        { question: "3. What does OS stand for?", choices: ["Operating System", "Open Source", "Online Service", "Optical Storage"], answer: "Operating System" },
        { question: "4. What is the default value of an int variable in Java?", choices: ["0", "null", "undefined", "1"], answer: "0" },
        { question: "5. Which symbol is used for comments in C?", choices: ["//", "/* */", "#", "--"], answer: "//" },
        { question: "6. What is the time complexity of binary search?", choices: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
        { question: "7. What does API stand for?", choices: ["Application Programming Interface", "Advanced Programming Interface", "Application Protocol Interface", "Application Procedure Interface"], answer: "Application Programming Interface" },
        { question: "8. What is the main function in a C program?", choices: ["main", "start", "init", "run"], answer: "main" },
        { question: "9. What is a pointer?", choices: ["A variable that stores a memory address", "A data structure", "A function", "An object"], answer: "A variable that stores a memory address" },
        { question: "10. What does HTML stand for?", choices: ["HyperText Markup Language", "HighText Machine Language", "Hyperloop Machine Language", "None of the above"], answer: "HyperText Markup Language" }
    ],
    medium: [
        { question: "1. What is polymorphism in Object-Oriented Programming?", choices: ["Ability of an object to take many forms", "Object inheritance", "Data encapsulation", "Class abstraction"], answer: "Ability of an object to take many forms" },
        { question: "2. What is a deadlock in operating systems?", choices: ["A situation where processes block each other", "A race condition", "An infinite loop", "A memory leak"], answer: "A situation where processes block each other" },
        { question: "3. What is the default scope of a variable in JavaScript?", choices: ["Global", "Local", "Block", "Module"], answer: "Global" },
        { question: "4. What is recursion?", choices: ["A function calling itself", "A loop repeating itself", "A process calling another", "A data structure"], answer: "A function calling itself" },
        { question: "5. What is abstraction in OOP?", choices: ["Hiding implementation details", "Inheriting classes", "Function overloading", "Class extension"], answer: "Hiding implementation details" },
        { question: "6. What is a virtual function?", choices: ["A function that can be overridden", "A function that is inherited", "A function that cannot be overridden", "A function with no return value"], answer: "A function that can be overridden" },
        { question: "7. What is the TCP protocol used for?", choices: ["Ensuring reliable communication", "Encrypting data", "Compressing data", "Opening connections"], answer: "Ensuring reliable communication" },
        { question: "8. What is an abstract class?", choices: ["A class that cannot be instantiated", "A class that is hidden", "A class without methods", "A class with only static methods"], answer: "A class that cannot be instantiated" },
        { question: "9. What does CPU stand for?", choices: ["Central Processing Unit", "Computer Processing Unit", "Core Processing Unit", "Centralized Processing Unit"], answer: "Central Processing Unit" },
        { question: "10. What does SQL stand for?", choices: ["Structured Query Language", "Sequential Query Language", "Secure Query Language", "Server Query Language"], answer: "Structured Query Language" }
    ],
    hard: [
        { question: "1. What is the difference between == and === in JavaScript?", choices: ["== compares values, === compares values and types", "== compares types, === compares references", "== compares objects, === compares arrays", "== compares functions, === compares strings"], answer: "== compares values, === compares values and types" },
        { question: "2. What is memory segmentation?", choices: ["Dividing memory into sections", "Memory allocation for heap", "Memory allocation for stack", "Fragmentation control"], answer: "Dividing memory into sections" },
        { question: "3. Explain the concept of deadlock prevention.", choices: ["A method to avoid deadlock situations", "A method to break the loop", "Prevent processes from running", "Kill tasks in case of conflict"], answer: "A method to avoid deadlock situations" },
        { question: "4. What is the difference between TCP and UDP?", choices: ["TCP is reliable, UDP is not", "TCP is faster, UDP is slower", "UDP is reliable, TCP is not", "UDP is connection-oriented, TCP is not"], answer: "TCP is reliable, UDP is not" },
        { question: "5. Explain the difference between multithreading and multiprocessing.", choices: ["Multithreading is within a process, multiprocessing involves multiple processes", "Both are the same", "Multithreading is for multi-core CPUs", "Multiprocessing is for single-core CPUs"], answer: "Multithreading is within a process, multiprocessing involves multiple processes" }
    ]
};

// Track the current level and score
let currentLevel = 0;
let totalScore = 0;

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('currentUser', username);
        document.getElementById('userDisplayName').innerText = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        loadQuestions();
    }
}

function loadQuestions() {
    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = ''; // Clear previous questions
    let questionSet;

    if (currentLevel === 0) {
        questionSet = questions.easy.slice(0, 10); // First level (easy questions)
    } else if (currentLevel === 1) {
        questionSet = questions.medium.slice(0, 10); // Second level (medium questions)
    } else if (currentLevel === 2) {
        questionSet = questions.hard.slice(0, 5); // Final level (hard questions)
    }

    questionSet.forEach((q, index) => {
        const label = document.createElement('label');
        label.innerHTML = q.question;
        questionContainer.appendChild(label);

        q.choices.forEach(choice => {
            const choiceLabel = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'q' + index;
            input.value = choice;
            choiceLabel.appendChild(input);
            choiceLabel.appendChild(document.createTextNode(choice));
            questionContainer.appendChild(choiceLabel);
            questionContainer.appendChild(document.createElement('br'));
        });
    });
}

function checkAnswers() {
    let score = 0;
    const totalQuestions = currentLevel === 2 ? 5 : 10;
    const questionSet = currentLevel === 0 ? questions.easy : currentLevel === 1 ? questions.medium : questions.hard;

    for (let i = 0; i < totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && selectedOption.value === questionSet[i].answer) {
            score++;
        }
    }

    totalScore += score;

    // Check if user moves to next level or finish
    if (currentLevel === 2) {
        displayFinalScore();
    } else {
        currentLevel++;
        loadQuestions();
    }
}

function displayFinalScore() {
    const username = localStorage.getItem('currentUser');
    localStorage.setItem(username + '_score', totalScore);

    let feedbackMessage;
    if (totalScore === 25) {
        feedbackMessage = "Outstanding! You are a true programming expert!";
    } else if (totalScore >= 18) {
        feedbackMessage = "Great job! You have an excellent understanding of programming.";
    } else if (totalScore >= 12) {
        feedbackMessage = "Good effort! Keep practicing and you'll get even better.";
    } else {
        feedbackMessage = "Keep practicing, you'll improve with time!";
    }

    document.getElementById('result').textContent = "Final score: " + totalScore + "/25. " + feedbackMessage;
    document.getElementById('questions').style.display = 'none'; // Hide questions after final level
}
