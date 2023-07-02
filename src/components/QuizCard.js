import React from 'react';
import styles from '../styles/quiz.module.css';
import quizImg from '../assets/quizImgCard.svg';
import { useNavigate } from 'react-router-dom';

const QuizCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/quiz');
  }

  return (
    <div className={styles.card}>
      <img src={quizImg} className={styles.quizImg} alt='quiz-img'/>
      <h1>Quiz 1</h1>
      <p>Level up on the above skills and collect Mastery points</p>
      <button onClick={handleClick} className={styles.btn}>Start Quiz</button>
    </div>
  )
}

export default QuizCard