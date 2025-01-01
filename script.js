//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length);

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear any previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Display the question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
function saveProgress() {
  const allRadioButtons = document.querySelectorAll('input[type="radio"]:checked');
  allRadioButtons.forEach((radioButton) => {
    const questionIndex = parseInt(radioButton.name.split('-')[1]);
    userAnswers[questionIndex] = radioButton.value;
  });
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Calculate the score based on selected answers
function calculateScore() {
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].answer) {
      score++;
    }
  });
  return score;
}

// Display the score and save it in localStorage
function showScore() {
  const score = calculateScore();
  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score); // Save the score in localStorage
}

// Handle submit button click
document.getElementById("submit").addEventListener("click", () => {
  saveProgress(); // Save progress before submitting
  showScore(); // Calculate and display score
});

renderQuestions();
