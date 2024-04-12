import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Spin } from 'antd';
import LoadingBar from 'react-top-loading-bar';
import image from '../images/image.png'
import image2 from '../images/result.png'
import './Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(true);
  const [isLoader, setLoader] = useState(true);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [QuizStart, setQuiz] = useState(false)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions/")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    // setSelectedAnswer(null);
    // Shuffle answers when moving to a new question
    if (currentQuestionIndex < questions.length) {
      const allAnswers = shuffleArray([
        ...questions[currentQuestionIndex]?.incorrectAnswers || [],
        questions[currentQuestionIndex]?.correctAnswer,
      ]);
      setShuffledAnswers(allAnswers);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };
 
  const handleNxtQues = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100));

    if (currentQuestionIndex <= 9) {
      setCurrentQuestionIndex((prevQues) => prevQues + 1);
      setSelectedAnswer(null)
      console.log(score)
    } else {
      console.log("select wrong question");
    }


  };

  const playAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(true);
  };
  const selectOpt = (answer) => {
    setSelectedAnswer(answer.target.value);
  
    if (answer.target.value === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    } else {
      console.log("Select Wrong Answer");
    }
  };
  

  const startQuiz = () => {
    setQuiz(true);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      <LoadingBar
        color="#0066ff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="head">
        {isLoader ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : (
          <div className="container">
            {!QuizStart ? (

              <div className='start-div'>
                <img src={image} className='img-fluid' width="300px" />
                <p>
                  Total Question 10 <br />
                  Each question 10 number
                </p>
                <p>
                  Passing Ratio 40%
                </p>
                <p><b>
                  If you start quiz don't skip it between the quiz
                </b></p>
                <Button onClick={startQuiz}>Start Quiz</Button>

              </div>
            ) : showResult ? (
              <div className="main">
                

                <div className="start">
                  
                  <h1 className="heading text-center">Quiz Game</h1>
                  <div>
                    <h3 className="Question">
                      {questions[currentQuestionIndex]?.question?.text}
                    </h3>
                    <h5 className="category">
                      Category: {questions[currentQuestionIndex]?.category}
                    </h5>
                  </div>
                  <div className="mt-4 input">
                    {shuffledAnswers.map((answer, index) => (
                      <div key={index}>
                        <Button
                          onClick={(answer) => { selectOpt(answer) }}
                          className={`optionBtn ${selectedButtonIndex === index ? 'selected' : ''}`}
                          id={`option${index}`}
                          name="answerOptions"
                          value={answer}
                          checked={selectedAnswer === answer}

                          onChange={() => handleAnswerSelect(answer)}
                        >
                          {answer}
                          {/* <label htmlFor={`option${index}`}>{answer}</label> */}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 btn-div ">
                    <Button
                      variant="info"
                      // className='btn-div'
                      disabled={selectedAnswer === null}
                      onClick={handleNxtQues}
                    >
                      {currentQuestionIndex <= 9
                        ? 'Next Question'
                        : setShowResult(false)}
                    </Button>
                        <p className="mt-2">{currentQuestionIndex + 1}/10</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="score-div">
                <div className="showResult">
                  <img src={image2} width={"200px"} />
                  {/* <span className="fw-400 display-6"> Score {score}/100</span> */}
                  <span className="fw-600 percent ">
                    Score {score}/100 <br/>({(score / 100) * 100}%)
                  </span>
                  <Button
                    onClick={playAgain}
                    className="display-3 fw-300 mt-4"
                  >
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;

