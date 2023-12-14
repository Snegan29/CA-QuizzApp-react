import React, { Component } from 'react';
import quizData from './Questions';

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      selectedOption: null,
      score: 0,
      theme: 'light',
      highlight: 'black',
      isHighlighted: false,
      quizScores: [/* Add actual quiz scores here */],
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

  handleNextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  toggleHighlight = () => {
    this.setState((prevState) => ({
      isHighlighted: !prevState.isHighlighted,
    }));
  };

  calculatePercentile = () => {
    const { score, quizScores } = this.state;
    var percentile = (score/quizData.length)*100
    return percentile;
  };

  handleReload = () => {
    location.reload()
  }

  render() {
    const { quizData } = this.props;
    const { currentQuestionIndex, selectedOption, score, theme, isHighlighted } = this.state;

    return (
      <div className={`body ${theme}`}>
        <div className='content'>
          <div className='header'>
            <h1>React Quiz App</h1>
            <button onClick={this.toggleTheme} className='themeBtn'>
              Theme
            </button>
          </div>
          <p className='noOfQuestions'>
            {currentQuestionIndex}/{quizData.length}{' '}
          </p>
          <div>
            {currentQuestionIndex < quizData.length ? (
              <div>
                <h2 className={isHighlighted ? 'highlighted-question' : ''}>
                  {quizData[currentQuestionIndex].question}
                </h2>
                <div className='optionBtns'>
                  {['A', 'B', 'C', 'D'].map((option) => (
                    <button
                      key={option}
                      id='optionBtn'
                      onClick={() =>
                        this.handleOptionSelect(quizData[currentQuestionIndex][`option${option}`])
                      }
                      className={
                        selectedOption === quizData[currentQuestionIndex][`option${option}`]
                          ? 'selected'
                          : ''
                      }
                      disabled={selectedOption !== null}
                    >
                      {quizData[currentQuestionIndex][`option${option}`]}
                    </button>
                  ))}
                </div>
                <div className='footer'>
                  <div>
                    <h3>Your Score: {score}</h3>
                  </div>
                  <div>
                    <button onClick={this.toggleHighlight} className='highlight'>Highlight</button>
                    <button onClick={this.handleNextQuestion} className='skip'>Skip</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>Quiz Completed</h1>
                <h2>Your Final Score: {score} ({this.calculatePercentile().toFixed(2)}%)</h2>
                <button onClick={this.handleReload} className='restart'>Restart</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default QuizComponent;
