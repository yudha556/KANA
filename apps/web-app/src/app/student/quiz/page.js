"use client";

import ProgressBar from "./components/progressBar";
import QuestionsCard from "./components/questionCard";
import QuizResult from "./result/page";
import { questions } from "./data/questions";
import { useState } from "react";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(0);

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }

    setAnswered((prev) => prev + 1);

    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setAnswered(0);
    setShowResult(false);
  };

  return (
    <div className="w-full flex flex-col gap-10 px-4 md:px-10">
        {!showResult && (
        <ProgressBar current={answered} total={questions.length} />
      )}

      <div className=" lg:px-20">
        {!showResult ? (
          <QuestionsCard
            question={questions[index].question}
            options={questions[index].options}
            answer={questions[index].answer}
            current={index + 1}
            total={questions.length}
            onNext={handleNext}
          />
        ) : (
          <QuizResult
            correct={correct}
            wrong={wrong}
            total={questions.length}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
}