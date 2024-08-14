import React, { Component, useEffect, useState } from "react";
import QuizDashboard from "./components/quizDashboard/quizDashboard.component";
import StorageModel from "./dataModel/storageModel";

const App = (props: any) => {
  const [quizState, setQuizState] = useState<StorageModel>({ avgPercentage: 0, totalAppearance: 0 });

  useEffect(() => {
    
    let storageData: StorageModel = JSON.parse(localStorage.getItem('Quiz-Storage') || "{}");
    setQuizState(Object?.keys(storageData)?.length ? storageData : { avgPercentage: 0, totalAppearance: 0 });
  }, []);

  return (
    <QuizDashboard quizState={quizState} setQuizState={setQuizState} />
  );
}

export default App;
