// src/components/Calendar/DailyQuiz.js
import React, { useState } from "react";
import { Modal, Button, RadioGroup, Card } from "shadcn-ui";

const DailyQuiz = ({ date, onClose }) => {
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    "Question 1?",
    "Question 2?",
    "Question 3?",
    "Question 4?",
    "Question 5?",
  ];

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.every((answer) => answer !== null)) {
      setIsCompleted(true);
      onClose();
    } else {
      alert("Please answer all questions!");
    }
  };

  return (
    <Modal onClose={onClose} isOpen={!isCompleted}>
      <Modal.Header>
        <h2>Quiz for Day {date}</h2>
      </Modal.Header>
      <Modal.Body>
        {questions.map((question, index) => (
          <Card key={index}>
            <p>{question}</p>
            <RadioGroup
              onChange={(e) => handleOptionChange(index, e.target.value)}
              value={answers[index] || ""}
            >
              <RadioGroup.Option value={0} label="Option A" />
              <RadioGroup.Option value={1} label="Option B" />
              <RadioGroup.Option value={2} label="Option C" />
            </RadioGroup>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit Quiz</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DailyQuiz;
