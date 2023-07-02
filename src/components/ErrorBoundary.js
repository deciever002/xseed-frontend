import React, { useEffect, useState } from 'react'
import styles from '../styles/errorboundary.module.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const ErrorBoundary = () => {
  const [timer,setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 10000);
  },[navigate]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer-1);
    }, 1000);
  })


  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
          <p style={{fontFamily: "Poppins-Bold",fontSize: "2em"}}>404</p>
          <p>Something went wrong redirecting back to homepage in {timer}</p>
          <Loader />
      </div>
    </div>
  )
}

export default ErrorBoundary