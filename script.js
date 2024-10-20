
   
        
   const questions = {
    easy: [
        { 
            question: "1. What is the keyword used to define a class in Java?", 
            answer: "class",
            type: "one-word" // One-word answer
        },
        { 
            question: "2. Which data structure uses LIFO?", 
            answer: "stack", 
            type: "one-word" // One-word answer
        },
        { 
            question: "3. What does OS stand for?", 
            answer: "operating system", 
            type: "one-word" // One-word answer
        },
        { 
            question: "4. What is the default value of an int variable in Java?", 
            answer: "0", 
            type: "one-word" // One-word answer
        },
        { 
            question: "5. Which symbol is used for comments in C?", 
            answer: "//", 
            type: "one-word" // One-word answer
        }
    ],
    medium: [
        { 
            question: "6. What is the time complexity of binary search?", 
            choices: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], 
            answer: "O(log n)", 
            type: "mcq" // MCQ question
        },
        { 
            question: "7. In C++, what is a pointer?", 
            answer: "a variable that stores a memory address", 
            type: "one-word" // One-word answer
        },
        { 
            question: "8. What does API stand for?", 
            answer: "Application Programming Interface", 
            type: "one-word" // One-word answer
        },
        { 
            question: "9. Which of the following is a cloud computing service?", 
            choices: ["IaaS", "PaaS", "SaaS", "All of the above"], 
            answer: "All of the above", 
            type: "mcq" // MCQ question
        },
        { 
            question: "10. What is the main function in a C program?", 
            answer: "main", 
            type: "one-word" // One-word answer
        }
    ],
    hard: [
        { 
            question: "11. In Java, what is the difference between == and equals()?", 
            answer: "== checks reference, equals() checks value", 
            type: "one-word" // One-word answer
        },
        { 
            question: "12. Explain the concept of encapsulation.", 
            answer: "hiding data and methods within a class", 
            type: "one-word" // One-word answer
        },
        { 
            question: "13. What is the purpose of the virtual keyword in C++?", 
            answer: "to allow method overriding", 
            type: "one-word" // One-word answer
        },
        { 
            question: "14. In data structures, what is a binary tree?", 
            answer: "a tree where each node has at most two children", 
            type: "one-word" // One-word answer
        },
        { 
            question: "15. What is a deadlock in operating systems?", 
            answer: "a situation where two or more processes are blocked forever", 
            type: "one-word" // One-word answer
        }
    ]
};

// Shuffle questions for random selection
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load quiz questions
function loadQuestions() {
    const allQuestions = [];
    allQuestions.push(...questions.easy);
    allQuestions.push(...questions.medium);
    allQuestions.push(...questions.hard);
    
    shuffle(allQuestions); // Shuffle all questions

    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = ''; // Clear previous questions

    const selectedQuestions = allQuestions.slice(0, 15); // Limit to 15 questions total

    selectedQuestions.forEach((q, index) => {
        const label = document.createElement('label');
        label.innerHTML = q.question;
        questionContainer.appendChild(label);

        if (q.type === 'mcq') {
            // MCQ question type
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
            // One-word question type
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
    let score = 0;
    const totalQuestions = 15; // Total questions

    for (let i = 0; i < totalQuestions; i++) {
        const question = questions.easy.concat(questions.medium, questions.hard)[i]; // Get the question from the original questions

        if (question.type === 'mcq') {
            const selectedOption = document.querySelector(input[name="q${i}"].hecked);
            if (selectedOption && selectedOption.value === question.answer) {
                score++;
            }
        } else {
            const userAnswer = document.getElementById('q' + i).value.toLowerCase();
            if (userAnswer === question.answer.toLowerCase()) {
                score++;
            }
        }
    }

    let feedbackMessage;
    if (score === totalQuestions) {
        feedbackMessage = "Amazing! You're a programming genius!";
    } else if (score >= totalQuestions * 0.6) {
        feedbackMessage = "Great job! You have a solid understanding of programming!";
    } else {
        feedbackMessage = "Don't worry! Keep practicing, and you'll improve!";
    }

    // Display the score and feedback
    document.getElementById('result').textContent = "Your score: " + score + "/" + totalQuestions + ". " + feedbackMessage;
}

// Refresh page and load new questions
function refreshPage() {
    loadQuestions();
}

// Load questions when the page loads
window.onload = loadQuestions;
