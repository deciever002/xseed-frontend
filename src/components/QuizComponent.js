import React from 'react';
import { quiz } from './quizConfig';
import Quiz from 'react-quiz-component';
import styles from '../styles/quiz.module.css';

const QuizComponent = () => {
  return (
    <div className={styles.quizCard}>
        <Quiz quiz={quiz} />
    </div>
  )
}

export default QuizComponent