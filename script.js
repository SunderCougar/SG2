document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');

    // Fetch the JSON data from your file
    fetch('comptia_questions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if data is an array
            if (!Array.isArray(data)) {
                throw new Error('JSON data is not an array');
            }
            displayQuestions(data);
        })
        .catch(error => {
            console.error('Error fetching or parsing questions:', error);
            quizContainer.innerHTML = `<p style="color: red; text-align: center;">Could not load questions. Please check the console for errors.</p>`;
        });

    function displayQuestions(questions) {
        if (!questions.length) {
            quizContainer.innerHTML = '<p>No questions found.</p>';
            return;
        }

        questions.forEach(q => {
            // Create the main card container for each question
            const card = document.createElement('div');
            card.className = 'question-card';

            // Create and add the metadata (Exam and Domain)
            const metadata = document.createElement('div');
            metadata.className = 'metadata';
            metadata.innerHTML = `
                <span><strong>Exam:</strong> ${q.exam}</span>
                <span><strong>Domain:</strong> ${q.domain}</span>
            `;
            
            // Create and add the question text
            const questionText = document.createElement('h2');
            questionText.textContent = q.question;

            // Create the show/hide button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-answer-btn';
            toggleBtn.textContent = 'Show Answer';

            // Create the answer section (initially hidden)
            const answerSection = document.createElement('div');
            answerSection.className = 'answer-section';
            answerSection.innerHTML = `<p><strong>Answer:</strong> ${q.answer}</p>`;

            // Append all elements to the card
            card.appendChild(metadata);
            card.appendChild(questionText);
            card.appendChild(toggleBtn);
            card.appendChild(answerSection);

            // Add the event listener for the button
            toggleBtn.addEventListener('click', () => {
                const isHidden = answerSection.style.display === 'none' || answerSection.style.display === '';
                answerSection.style.display = isHidden ? 'block' : 'none';
                toggleBtn.textContent = isHidden ? 'Hide Answer' : 'Show Answer';
            });

            // Add the completed card to the main container
            quizContainer.appendChild(card);
        });
    }
});
