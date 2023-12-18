import axios from "axios";
import React, { useEffect, useState } from "react";
import "./quiz.css";
import Button from "../../component/Button";

// endpoints
const scienceEndPoint =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
const historyEndPoint =
  "https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple";

const QuizPage = ({ category, setResult, setPages }) => {
  // state
  const [quiz, setQuiz] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [quizQustionIndex, setQuizQustionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mark, setMark] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // console.log("correctAnswer", correctAnswer);
  // console.log("selectedAnswer", selectedAnswer);
  // console.log("result", mark);

  // Getting Qustions from Api
  const handleQuizQustions = async () => {
    setLoading(true);
    try {
      const responce = await axios.get(
        category === "Science" ? scienceEndPoint : historyEndPoint
      );
      setQuiz(responce.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.message) {
        setError(err.message);
      } else {
        setError("Something Went Wrong");
      }
      setLoading(false);
    }
  };

  console.log(quiz);

  const handleClick = (selected) => {
    setSelectedAnswer(selected);
  };

  const handleNext = () => {
    const Datalength = quiz.length;
    if (Datalength === quizQustionIndex + 1) {
      setPages("Result");
    } else {
      setCorrectAnswer(quiz[quizQustionIndex].correct_answer);
      if (selectedAnswer === correctAnswer) {
        setMark((prev) => prev + 1);
        console.log(mark);
      }

      setTimeout(() => {
        setQuizQustionIndex((prev) => prev + 1);
        setSelectedAnswer("");
        setCorrectAnswer("");
      }, 500);
    }
  };

  const handleAnswerArray = () => {
    if (quiz.length > 0) {
      const currentQuestion = quiz[quizQustionIndex];
      const answers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ].sort();
      setAnswerData(answers);
    }
  };

  useEffect(() => {
    handleQuizQustions();
    return () => {
      setResult(mark);
    };
  }, []);
  useEffect(() => {
    if (quiz.length > 0) {
      handleAnswerArray();
    }
  }, [quizQustionIndex, quiz]);

  return (
    <div className="homeContainer">
      {loading ? (
        <>Loading...</>
      ) : error !== "" ? (
        <>{error}</>
      ) : (
        <div className="quizContainer">
          <h2 className="quizHeading">Qustion {quizQustionIndex + 1}</h2>

          <p className="qustionItem">
            Qustion :{" "}
            <span className="qustionItem">
              {quiz[quizQustionIndex]?.question}
            </span>
          </p>

          <div className="answerCotainer">
            {answerData.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className={`answerItem 
                  
                  ${
                    correctAnswer === ""
                      ? ""
                      : item === correctAnswer
                      ? "isCorrect"
                      : "isInCorrect"
                  }
                  
                  ${selectedAnswer === item && "isSelected"}`}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="flexCenterContainer">
            <Button handleClick={() => handleNext()}>
              {quiz.length === quizQustionIndex + 1
                ? "Completed"
                : "Next Qustion"}
            </Button>
          </div>
          <p className="NB">nb:please Select Any Option</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
