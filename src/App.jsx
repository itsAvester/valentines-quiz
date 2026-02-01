import { useMemo, useState } from "react";
import StartScreen from "./screens/StartScreen";
import QuizScreen from "./screens/QuizScreen";
import FinalScreen from "./screens/FinalScreen";

export default function App() {
  // 3 screens: "start" -> "quiz" -> "final"
  const [screen, setScreen] = useState("start");

  // Quiz state
  const questions = useMemo(
    () => [
      {
        id: 1,
        prompt: "What is our anniversary?",
        options: ["June 21st", "Kroll", "Greasy sausage rod", "June 5th"],
      },
      {
        id: 2,
        prompt: "What place might you like to eat on valentines day perhaps?",
        options: ["Brewery", "Slice", "Somewhere on Pearl street", "Other"],
      },
      {
        id: 3,
        prompt: "Choose something you really want on valentines day:",
        options: ["Quality time", "kisses", "Princess sophia 😔", "All of the above"],
      },
      {
        id: 4,
        prompt: "What’s activities might you like to do on such a fine evening?",
        options: ["Chill at home", "Go out for a fancy dinner", "Do an activity", "Go somewhere on a random adventure"],
      },
      {
        id: 5,
        prompt: "Will you be my valentine",
        options: ["Yes", "The first thing", "The second thing", "The third thing"],
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // array of {questionId, choice}

  function startQuiz() {
    setScreen("quiz");
  }

  function restartAll() {
    setScreen("start");
    setCurrentIndex(0);
    setAnswers([]);
  }

  function submitAnswer(choice) {
    const q = questions[currentIndex];

    // Update/replace answer for current question
    setAnswers((prev) => {
      const withoutThis = prev.filter((a) => a.questionId !== q.id);
      return [...withoutThis, { questionId: q.id, choice }];
    });

    // Move forward or finish
    const isLast = currentIndex === questions.length - 1;
    if (isLast) {
      setScreen("final");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function goBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  // Helpful derived data
  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id)?.choice ?? null;

  if (screen === "start") {
    return <StartScreen onStart={startQuiz} />;
  }

  if (screen === "quiz") {
    return (
      <QuizScreen
        question={currentQuestion}
        index={currentIndex}
        total={total}
        currentAnswer={currentAnswer}
        onAnswer={submitAnswer}
        onBack={goBack}
        onRestart={restartAll}
        canGoBack={currentIndex > 0}
      />
    );
  }

  // screen === "final"
  return <FinalScreen answers={answers} questions={questions} onRestart={restartAll} />;
}
