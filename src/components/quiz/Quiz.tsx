import { useState, useEffect } from 'react';
import {createAnswer, getAllNotPlayedRounds} from '../../services/roundService.ts';
import './Quiz.css';

const Quiz = ({ userId, duelId }) => {
  const [questions, setQuestions] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true); // Neuer Ladezustand

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllNotPlayedRounds(userId, duelId);
        setQuestions(response);
        setLoading(false); // Beendet den Ladevorgang, sobald die Daten geladen sind
      } catch (error) {
        console.error('Fehler beim Abrufen der Fragen:', error);
        setLoading(false); // Beendet den Ladevorgang auch im Fehlerfall
      }
    };
    fetchQuestions();
  }, [userId, duelId]);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  const getCurrentQuestionOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return [];
    }

    const allAnswers = [
      { answerText: currentQuestion.correctAnswer, isCorrect: true },
      { answerText: currentQuestion.wrongAnswer1, isCorrect: false },
      { answerText: currentQuestion.wrongAnswer2, isCorrect: false },
      { answerText: currentQuestion.wrongAnswer3, isCorrect: false }
    ];

    return allAnswers.sort(() => Math.random() - 0.5);
  };

  console.log(questions);

  return (
    <div className="quiz-container">
      {questions!.length > 0 ? (
        showScore ? (
          <div className='score-section'>
            Du hast {score} von {questions.length} Punkten erzielt
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Frage {currentQuestionIndex + 1}</span>/{questions.length}
              </div>
              <div className='question-text'>Whats the translation of <br/> <span className="question-voc">{questions[currentQuestionIndex]?.question}?</span></div>
            </div>
            <div className='answer-section'>
              {getCurrentQuestionOptions().map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerSubmit(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )
      ) : (
        <p>Keine Fragen verfügbar.</p> // Nachricht, wenn keine Fragen verfügbar sind
      )}
    </div>
  );
}


  export default Quiz;
