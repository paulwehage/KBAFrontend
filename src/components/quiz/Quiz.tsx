import React, { useState, useEffect } from 'react';
import {createAnswer, getAllNotPlayedRounds} from '../../services/roundService.ts';

const Quiz = ({ userId, duelId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    // Funktion zum Abrufen der Fragen
    const fetchQuestions = async () => {
      try {
        const response = await getAllNotPlayedRounds(userId, duelId);
        setQuestions(response);
      } catch (error) {
        console.error('Fehler beim Abrufen der Fragen:', error);
      }
    };
    fetchQuestions();
  }, [userId, duelId]);

  const handleAnswerSubmit = async () => {
    try {
      //await createAnswer(selectedAnswer, duelId,userId);

      // Gehe zur nächsten Frage
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentIndex => currentIndex + 1);
        setSelectedAnswer(''); // Reset ausgewählte Antwort
      } else {
        // Quiz beenden
        console.log('Quiz beendet');
        // Hier können Sie die Logik zum Beenden des Quiz hinzufügen
      }
    } catch (error) {
      console.error('Fehler beim Senden der Antwort:', error);
    }
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          {/* Antwortmöglichkeiten */}
          <div className="answers-container">
            {[questions[currentQuestionIndex].correctAnswer, questions[currentQuestionIndex].wrongAnswer1, questions[currentQuestionIndex].wrongAnswer2, questions[currentQuestionIndex].wrongAnswer3]
              .sort(() => Math.random() - 0.5) // Mischen der Antworten
              .map(answer => (
                <button
                  key={answer}
                  onClick={() => setSelectedAnswer(answer)}
                  className={selectedAnswer === answer ? 'selected' : ''}
                >
                  {answer}
                </button>
              ))
            }
          </div>
          <button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Nächste Frage</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
