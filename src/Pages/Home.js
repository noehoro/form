import React, { useState } from "react";

const questions = [
  {
    type: "multiple-choice",
    question: "Question 1",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    type: "free-response",
    question: "Question 2",
  },
  {
    type: "multiple-choice",
    question: "Question 3",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    type: "free-response",
    question: "Question 4",
  },
  {
    type: "free-response",
    question: "Question 5",
  },
  {
    type: "multiple-choice",
    question: "Question 6",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  // ... Add other free-response questions
];

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  question: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  multipleChoice: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  freeResponse: {
    marginBottom: "1rem",
  },
  button: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};

const QuestionForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [testerName, setTesterName] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);
  const [responses, setResponses] = useState([]);
  const [answer, setAnswer] = useState();


  const handleNext = () => {
    const currentTime = Date.now();
    const time = currentTime - startTime;
    setResponses((responses) => [
      ...responses,
      {
        answer: answer,
        timeSpent: time,
      },
    ]);

    setStartTime(currentTime);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    const currentTime = Date.now();
    const time = currentTime - startTime;

    setResponses((prevResponses) => {
      const newResponses = [
        ...prevResponses,
        {
          answer: answer,
          timeSpent: time,
        },
      ];

      const storageData = localStorage.getItem("questionData");
      const parsedData = storageData ? JSON.parse(storageData) : {};
      const newStorageData = {
        ...parsedData,
        [testerName]: parsedData[testerName]
          ? [...parsedData[testerName], ...getFormattedResponses(newResponses)]
          : getFormattedResponses(newResponses),
      };

      localStorage.setItem("questionData", JSON.stringify(newStorageData));

      return newResponses;
    });

    setCurrentQuestionIndex(0);
    setResponses([]);
    setTesterName("");
    setStartQuiz(false);
  };


  const getFormattedResponses = (responsesToFormat) => {
    return questions.map((question, index) => ({
      response: responsesToFormat[index]?.answer,
      time: responsesToFormat[index]?.timeSpent,
    }));
  };
  
  const handleAnswerChange = (value) => {
    setAnswer(value);
  };

  const renderQuestion = (question) => {
    if (question.type === "multiple-choice") {
      return (
        <div style={styles.multipleChoice}>
          <p style={styles.question}>{question.question}</p>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      );
    } else if (question.type === "free-response") {
      return (
        <div style={styles.freeResponse}>
          <p style={styles.question}>{question.question}</p>
          <textarea
            rows="4"
            cols="50"
            onChange={(e) => handleAnswerChange(e.target.value)}
          ></textarea>
        </div>
      );
    }
  };

  const handleNameChange = (e) => {
    setTesterName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setStartTime(Date.now());
  };

  return (
    <div style={styles.container}>
      {startQuiz === false || testerName === "" ? (
        <form onSubmit={handleNameSubmit}>
          <label htmlFor="testerName">Enter your name:</label>
          <input
            type="text"
            id="testerName"
            name="testerName"
            value={testerName}
            onChange={handleNameChange}
            required
          />

          <button
            type="submit"
            onClick={() => {
              setStartQuiz(true);
              setStartTime(Date.now());
              console.log("starting");
            }}
          >
            Start Quiz
          </button>
        </form>
      ) : (
        <>
          {renderQuestion(questions[currentQuestionIndex])}
          {currentQuestionIndex < questions.length - 1 ? (
            <button style={styles.button} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button style={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionForm;
