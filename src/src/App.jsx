import React from 'react'
import QuizComponent from './component/QuizComponent'
import quizData from './component/Questions'
import './App.css'

export default function () {
  return (
    <div>
      <QuizComponent quizData={quizData} />
    </div>
  )
}
