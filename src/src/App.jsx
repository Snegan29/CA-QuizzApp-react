import React from 'react'
import QuizComponent from './component/QuizComponent'
import quizData from './component/Questions'

export default function () {
  return (
    <div>
      <h1>React Quiz App</h1>
      <QuizComponent quizData={quizData} />
    </div>
  )
}
