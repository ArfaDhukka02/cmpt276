let interactiveQuizContainer = document.querySelector('#quiz-container');
let s_width = interactiveQuizContainer.clientWidth;
//Data for the quiz
let quizData = [
    {
        question: "How many colors are in the rainbow?",
        options: ["Six", "Five", "Seven", "Nine"],
        correct: "Seven"
    },
    {
        question: "What other country, besides the US, uses the US dollar as its official currency?",
        options: ["Canada", "Ecuador", "United Kingdom", "Mexico"],
        correct: "Ecuador"
    },
    {
        question: "We can't drink ocean water because it causes:",
        options: ["Dehydration", "Allergy ", "Diabetes", "Sweat"],
        correct: "Dehydration"
    },
    {
        question: "Who was the first woman in space?",
        options: ["Sally Ride", "Valentina Tereshkova", "Christina Koch", "Peggy Whitson"],
        correct: "Valentina Tereshkova"
    },
    {
        question: "When was the internet invented?",
        options: ["1983", "1993", "1973", "1963"],
        correct: "1983"
    }
]

let optionSelected = []

let constructForm = ()=>{

    quizData.forEach((quiz, index) => {
        interactiveQuizContainer.innerHTML += `
        <form action="" data-question-index="${index}">
            <p id="question">${quiz.question}</p>
            <div class="options-ontainer">
                ${constructHtmlOption(quiz.options)}
            </div>
        
            <br>
            <div class="button-container">
                ${ ( index > 0? '<button class="prevBtn">Previous</button>': '') }
                <button type="submit" >${(index == quizData.length - 1? 'Submit' : 'Next')}</button>
            </div>
        </form>
        `
    });

}

let constructHtmlOption = (options)=>{
    let htmlOptions = new Array();
    options.forEach((option, index)=>{
        htmlOptions.push(`
        <label for="option-${index}-${option}" class="radio-container">
            <input type="radio" name="options" value="${option}" id="option-${index}-${option}" required>
            ${option}
        </label>
        `)
    })
    return htmlOptions.join("");
}

constructForm();

document.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        let checked = getAnswer(form.querySelectorAll("input[type='radio']"))
        optionSelected[form.dataset.questionIndex] = checked.value;

        interactiveQuizContainer.scrollTo({
            left: interactiveQuizContainer.scrollLeft + s_width,
            behavior: "smooth"
        })

        if (form.dataset.questionIndex == quizData.length - 1) {
            calculateScore();
        }

    })
})

document.querySelectorAll('.prevBtn').forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        event.preventDefault();
        interactiveQuizContainer.scrollTo({
            left: interactiveQuizContainer.scrollLeft - s_width,
            behavior: "smooth"
        })
    })
})

//gives the user selected option
let getAnswer = (radioButtons)=>{

    let selectedOption;
    //  finding selected one using radio buttons
    radioButtons.forEach((radioButton)=>{
        if (radioButton.checked){
            selectedOption = radioButton;
        }
    })

    return selectedOption;
}
//Calculates score and display's answer
let calculateScore = () => {
    let points = 0;

    quizData.forEach((question, index) => {
        if (optionSelected[index] == question.correct) {
            points++;
        }
    });

    interactiveQuizContainer.innerHTML = `<p  id="result" style="color: white;"> <strong> You Scored ${points} out of ${quizData.length} </strong> <br><br>
        1) You selected: <span class="${optionSelected[0] === quizData[0].correct ? 'correct' : 'incorrect'}">${optionSelected[0]}</span> <br><br> correct answer: <span class="correct">${quizData[0].correct}</span> <br><br>
        2) You selected: <span class="${optionSelected[1] === quizData[1].correct ? 'correct' : 'incorrect'}">${optionSelected[1]}</span> <br><br>correct answer: <span class="correct">${quizData[1].correct}</span> <br><br>
        3) You selected: <span class="${optionSelected[2] === quizData[2].correct ? 'correct' : 'incorrect'}">${optionSelected[2]}</span> <br><br>correct answer: <span class="correct">${quizData[2].correct}</span> <br><br>
        4) You selected: <span class="${optionSelected[3] === quizData[3].correct ? 'correct' : 'incorrect'}">${optionSelected[3]}</span> <br><br>correct answer: <span class="correct">${quizData[3].correct}</span> <br><br>
        5) You selected: <span class="${optionSelected[4] === quizData[4].correct ? 'correct' : 'incorrect'}">${optionSelected[4]}</span> <br><br>correct answer: <span class="correct">${quizData[4].correct}</span></p>`;

    const spans = interactiveQuizContainer.querySelectorAll('span');
    spans.forEach(span => {
        if (span.classList.contains('correct')) {
            span.style.color = 'darkgreen';
        } else {
            span.style.color = 'maroon';
        }
    });
};