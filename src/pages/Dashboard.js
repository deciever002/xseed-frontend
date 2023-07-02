import React from 'react';
import styles from '../styles/dashboard.module.css';
import Sidebar from '../components/Sidebar';
import Chapters from '../components/Chapters';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Math</h1>
      </div>
      <div className={styles.mainContainer}>
        <Sidebar />
        <Chapters />
      </div>
    </div>
  )
}

export default Dashboard