import React, { useEffect, useState } from 'react';
import styles from '../styles/sidebar.module.css';
import quizImg from '../assets/quizImg.svg';
import axios from 'axios';
import { REQUEST_URL } from '../config';
import Loader from './Loader';
import { useParams } from 'react-router-dom';

const Sidebar = () => {
  const unitId = useParams();
  const [currentChapter,setCurrentChapter] = useState();
  const [chapters,setChapters] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  },[]);

  const fetchChapter = async () => {
    try {
        setLoading(true);
        const response = await axios({
            method: 'get',
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true,
            url: REQUEST_URL + `/chapters/${unitId.id}`
        });
        console.log(response.data);
        setCurrentChapter(response.data);
        setLoading(false);
    } catch (error) {
        setCurrentChapter(null);
        setLoading(false);
    }
  };

  useEffect(() => {
    if(Object.keys(unitId).length > 0){
      fetchChapter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[unitId]);

  const fetchChapters = async () => {
    try {
        const response = await axios({
            method: 'get',
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true,
            url: REQUEST_URL + "/chapters/getAll"
        });
        console.log(response.data);
        setChapters(response.data);
        setLoading(false);
    } catch (error) {
        setChapters(null);
        setLoading(false);
    }
  };

  const getTotal = () => {
    let total = 0;
    if(chapters){
      if(Object.keys(unitId).length > 0){
        return currentChapter?.totalPoints;
      }
      chapters.map((chapter) => {
        total += chapter.totalPoints;
        return chapter;
      })
    }
    return total;
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <div className={styles.scoreDetails}>
          <h3>{getTotal()}</h3>
          <p>Total points in this course</p>
      </div>
      <hr/>
      <div className={styles.courseInfo}>
        <h3>Course Summary</h3>
        <hr/>
        <div className={styles.unitsList}>
      {loading ? <Loader /> : 
        Object.keys(unitId).length === 0 ?
        chapters.map((chapter) => (
              <div key={chapter.id} className={styles.unit}>
                <p> {chapter.unitName}</p>
                <input type='range' min={0} max={chapter.totalPoints} value={chapter.completed} disabled/>
              </div>
        )) : 
        <div className={styles.unitContainer}>
          <h4 style={{margin:0,fontFamily: 'Poppins-Bold'}}>{currentChapter?.unitName}</h4>
          <ol type='1'>
            {currentChapter?.topics.map((topic) => (
                <li key={topic.topicId} className={styles.topics} onClick = {(e)=>{
                  e.preventDefault();
                  window.scrollTo({
                  top: document.getElementById(topic.topicId).offsetTop,
                  behavior: "smooth",
                })}}>
                    {topic.topicName}
                </li>
            ))}
          </ol>
        </div>
      }
        </div>
      </div>
      </div>
      <div className={styles.finalQuiz}>
        <div className={styles.content}>
          <p>Course Challenge</p>
          <p>Test your knowledge</p>
        </div>
        <img src={quizImg} alt='quizimg'/>
      </div>
    </div>
  )
}

export default Sidebar