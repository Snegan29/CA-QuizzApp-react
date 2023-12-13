
import React, { Component } from 'react';
import './App.css'

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      selectedOption: null,
      score: 0,
    };
  }

  handleOptionSelect = (selectedAnswer) => {
    const { quizData } = this.props;
    const { currentQuestionIndex, score } = this.state;

    if (selectedAnswer === quizData[currentQuestionIndex].answer) {
      this.setState({ score: score + 1 });
    }

    this.setState({
      selectedOption: null,
      currentQuestionIndex: currentQuestionIndex + 1,
    });
  };

  render() {
    const { quizData } = this.props;
    const { currentQuestionIndex, selectedOption, score } = this.state;

    return (
      <div>
        {currentQuestionIndex < quizData.length ? (
          <div>
            <h3>{quizData[currentQuestionIndex].question}</h3>
            <div>
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => this.handleOptionSelect(quizData[currentQuestionIndex][`option${option}`])}
                  className={selectedOption === quizData[currentQuestionIndex][`option${option}`] ? 'selected' : ''}
                  disabled={selectedOption !== null} // Disable button after selection
                >
                  {quizData[currentQuestionIndex][`option${option}`]}
                </button>
              ))}
            </div>
            <p>Your Score: {score}</p>
          </div>
        ) : (
          <div>
            <h3>Quiz Completed</h3>
            <p>Your Final Score: {score}</p>
          </div>
        )}
      </div>
    );
  }
}

export default QuizComponent;
