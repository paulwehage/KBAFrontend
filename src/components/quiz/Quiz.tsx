import { useState, useEffect } from 'react';
import {createAnswer, getAllNotPlayedRounds} from '../../services/roundService.ts';
import './Quiz.css';
import {getWinners} from '../../services/duelService.ts';
import {useUserContext} from '../../hooks/context/useUserContext.ts';

const Quiz = ({ userId, duelId, onBackToStepper }) => {
  const [questions, setQuestions] = useState();
  const [currentQuestionIndexUi, setCurrentQuestionIndexUi] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [endingMessage, setEndingMessage] = useState("");
  const [showEndingMessage, setShowEndingMessage] = useState(false);
  const [loading, setLoading] = useState(true); // Neuer Ladezustand
  const {user} = useUserContext();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions")
        const response = await getAllNotPlayedRounds(userId, duelId);
        setQuestions(response);
        setCurrentQuestionIndexUi(10 - response.length); // Setzt den Startindex basierend auf den bereits gespielten Fragen
        setLoading(false); // Beendet den Ladevorgang, sobald die Daten geladen sind
      } catch (error) {
        console.error('Fehler beim Abrufen der Fragen:', error);
        setLoading(false); // Beendet den Ladevorgang auch im Fehlerfall
      }
    };
    fetchQuestions();
  }, [userId, duelId]);


  if (loading) {
    return <p>Laden der Fragen...</p>;
  }

  const handleAnswerSubmit = async (isCorrect, answerText, roundId) => {
    try {
      await createAnswer(answerText, roundId, user!.userId);
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndexUi(currentQuestionIndexUi + 1);
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        await checkWinners();
        setShowEndingMessage(true);
      }
    } catch (error) {
      console.error('Fehler beim Senden der Antwort:', error);
    }
  };

  const checkWinners = async () => {
    try {
      const winners = await getWinners(duelId);
      if (winners.length > 0) {
        const userWon = winners.some(winner => winner.userId === userId);
        if (userWon) {
          setEndingMessage('Du hast gewonnen. Glückwunsch!');
        } else {
          setEndingMessage('Leider nicht gewonnen. Versuche es nochmal!');
        }
      } else {
        setEndingMessage('Wait until each player is finished playing. Please see results in the Management/Duel Tab.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Gewinner:', error);
    }
  };

  const getCurrentQuestionOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return [];
    }

    const allAnswers = [
      { answerText: currentQuestion.correctAnswer, isCorrect: true, roundId: currentQuestion.roundId},
      { answerText: currentQuestion.wrongAnswer1, isCorrect: false, roundId: currentQuestion.roundId },
      { answerText: currentQuestion.wrongAnswer2, isCorrect: false, roundId: currentQuestion.roundId },
      { answerText: currentQuestion.wrongAnswer3, isCorrect: false, roundId: currentQuestion.roundId }
    ];

    return allAnswers.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <div className="quiz-container">
        <button className="back-button" onClick={onBackToStepper}>Zurück</button>
        {questions!.length > 0 ? (
          showEndingMessage ? (
            <div className='score-section'>
              <b>{endingMessage}</b>
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Frage {currentQuestionIndexUi + 1}</span>/10
                </div>
                <div className='question-text'>Whats the translation of <br/> <span
                  className="question-voc">{questions[currentQuestionIndex]?.question}?</span></div>
              </div>
              <div className='answer-section'>
                {getCurrentQuestionOptions().map((answerOption, index) => (
                  <button key={index}
                          className="answer-button"
                          onClick={() => handleAnswerSubmit(answerOption.isCorrect, answerOption.answerText, answerOption.roundId)}>
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )
        ) : (
          <p><b>Wait until each player is finished playing. Please see results in the Management/Duel Tab.</b></p>
        )}
      </div>
    </>

  );
}


export default Quiz;
