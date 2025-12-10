"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import { BookOpen, Volume2, Check } from "lucide-react";
import Image from "next/image";
import VolumeToggle from "./volumeToggle";

export default function QuestionsCard({
  question = "What is the capital city of Indonesia?",
  options = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
  answer = "Jakarta",
  current = 1,
  total = 5,
  onNext,
}) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showNextMessage, setShowNextMessage] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShowNextMessage(true);

        const nextTimer = setTimeout(() => {
          setSelected(null);
          setSubmitted(false);
          setIsCorrect(null);
          setShowNextMessage(false);
          onNext?.(isCorrect);
        }, 1000);

        return () => clearTimeout(nextTimer);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitted, onNext, isCorrect]);

  const handleSubmit = () => {
    if (selected === null) return;
    const chosen = options[selected];
    const correct = chosen === answer;
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const getOptionClass = (i, opt) => {
    const isActive = selected === i;
    const isAnswer = opt === answer;

    if (!submitted) {
      // Sebelum submit
      if (isActive) {
        return "border-green-500 bg-green-50";
      }
      return "border-primary";
    } else {
      if (isActive && isCorrect) {
        return "border-green-500 bg-green-100";
      } else if (isActive && !isCorrect) {
        return "border-red-500 bg-red-100";
      } else if (isAnswer) {
        return "border-green-500 bg-green-100";
      }
      return "border-gray-300";
    }
  };

  const shouldShowCheckIcon = (i, opt) => {
    if (!submitted) {
      return selected === i;
    } else {
      const isActive = selected === i;
      const isAnswer = opt === answer;
      return (isActive && isCorrect) || isAnswer;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl md:rounded-3xl bg-primary shadow-xl">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 md:px-6 lg:px-7 py-3 md:py-4">
        <div className="flex flex-row gap-2 md:gap-3 items-center">
          <Image
            src="/questionIcon.svg"
            alt="questionsIcon"
            height={50}
            width={50}
            className="md:w-[70px] md:h-[70px] lg:w-[90px] lg:h-[90px]"
          />
          <BookOpen size={24} color="white" className="md:w-8 md:h-8 lg:w-9 lg:h-9" />
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-medium">
            Questions {current} of {total}
          </p>
        </div>
        <VolumeToggle
          size={24}
          color="white"
          onToggle={(muted) => console.log("Muted:", muted)}
          className="md:w-8 md:h-8 lg:w-9 lg:h-9"
        />
      </div>

      {/* Body */}
      <div className="bg-white rounded-b-2xl md:rounded-b-3xl flex flex-col gap-6 md:gap-8 lg:gap-10 items-center py-6 md:py-8 lg:py-10 px-4 md:px-5 lg:px-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-center text-black leading-relaxed">
          {question}
        </h1>

        <ul className="w-full flex flex-col gap-2 md:gap-3">
          {options.map((opt, i) => {
            const optionClass = getOptionClass(i, opt);

            return (
              <li
                key={i}
                onClick={() => !submitted && setSelected(i)}
                className={`flex flex-row justify-between items-center px-3 md:px-4 lg:px-5 py-2 md:py-3 border-2 rounded-xl md:rounded-2xl cursor-pointer transition ${optionClass}`}
              >
                <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 items-center min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                    <span className="text-sm md:text-lg lg:text-xl text-white">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <h1
                    className={`text-base md:text-lg lg:text-xl leading-relaxed ${
                      submitted && opt === answer
                        ? "text-green-700"
                        : submitted && selected === i && !isCorrect
                        ? "text-red-700"
                        : "text-black"
                    }`}
                  >
                    {opt}
                  </h1>
                </div>

                {shouldShowCheckIcon(i, opt) && (
                  <Check
                    size={20}
                    className={`md:w-6 md:h-6 flex-shrink-0 ${
                      submitted && opt === answer
                        ? "text-green-500"
                        : submitted && selected === i && !isCorrect
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {!submitted ? (
          <Button
            size="md"
            variant="primary"
            disabled={selected === null}
            onClick={handleSubmit}
            className="w-full md:w-auto"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="flex flex-col items-center gap-0">
            <Image
              src={isCorrect ? "/hebat.svg" : "/cobaLagi.svg"}
              alt={isCorrect ? "Correct Answer" : "Wrong Answer"}
              width={100}
              height={100}
              className="md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px]"
            />

            <p
              className={`text-lg md:text-xl lg:text-2xl font-semibold text-center -mt-3 md:-mt-4 lg:-mt-5 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect
                ? "Fantastic, that's correct!"
                : "Good try, keep learning!"}
            </p>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center mt-1 md:mt-2">
              Next questions coming up...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}