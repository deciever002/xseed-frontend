import React, { useEffect, useState } from 'react'
import styles from '../styles/chapters.module.css'
import unitIcon from '../assets/unitIcon.png';
import axios from 'axios';
import { REQUEST_URL } from '../config';
import Loader from './Loader';
import { useNavigate, useParams } from 'react-router-dom';
import QuizCard from './QuizCard';

const Chapters = () => {
  const unitId = useParams();
  const navigate = useNavigate();
  const [currentChapter,setCurrentChapter] = useState();
  const [chapters,setChapters] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  },[]);

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

  const fetchChapter = async () => {
    try {
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

  const handleChapterClick = (chapterId) => {
    navigate(`/dashboard/unit/${chapterId}`);
  }


  return (
    <div className={styles.chapters}>
      {
        loading ? <Loader /> : 
          Object.keys(unitId).length===0 ? 
          chapters.map((chapter) => (
            <div key={chapter.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.nameContainer}>
                  <img src={unitIcon} alt='unitIcon'/>
                  <h3> {chapter.unitName} </h3>
                </div>
                <div className={styles.scoreContainer}>
                  <p>{chapter.completed}/{chapter.totalPoints} Mastery Points</p>
                  <input readOnly type='range' min={0} max={chapter.totalPoints} value={chapter.completed}/>
                </div>
              </div>
              <hr />
              <div className={styles.topics}>
                {
                  chapter.topics.map((topic) => (
                    <p key={topic.topicId}>{topic.topicName}</p>
                  ))
                }
              </div>
              <button className={styles.btn} onClick={() => handleChapterClick(chapter.id)}>Get Started</button>
            </div>
          )) :
          <div className={styles.card}>
            <h2 style={{textAlign: 'center',fontFamily:'Poppins-Bold'}}>{currentChapter?.unitName}</h2>
            <hr />
            <p style={{fontSize: "0.9em"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales tellus pharetra tortor congue, euismod rutrum nunc faucibus. Pellentesque imperdiet non ligula a pellentesque. Aliquam sit amet fermentum velit. Nunc sed eros ex. Vivamus interdum quam ex, vel pretium sem consectetur a. Nulla pellentesque commodo vulputate. Ut iaculis placerat congue.
            </p>
            <div className={styles.video}>
            <iframe 
              width="70%" 
              height="80%" 
              src="https://www.youtube.com/embed/S29LVPMKw48" 
              title="Place Value Of The Digits In A Number | Mathematics Grade 5 | Periwinkle" 
              frameborder="0" 
              allowfullscreen />
            </div>
            <div className={styles.topicsDescribed}>
                {currentChapter?.topics.map((topic) => (
                  <div key={topic.topicId} id={topic.topicId}>
                    <h2>{topic.topicName}</h2>
                    <hr />
                    <p style={{fontSize: "0.9em"}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales tellus pharetra tortor congue, euismod rutrum nunc faucibus. Pellentesque imperdiet non ligula a pellentesque. Aliquam sit amet fermentum velit. Nunc sed eros ex. Vivamus interdum quam ex, vel pretium sem consectetur a. Nulla pellentesque commodo vulputate. Ut iaculis placerat congue.
                      Phasellus laoreet dictum turpis at molestie. Vestibulum ac maximus neque. Maecenas condimentum urna et aliquet vulputate. Nulla tristique faucibus lectus, vel vulputate dui fermentum sed. Donec rutrum sem a nunc tincidunt consectetur. Vestibulum ultrices ipsum id leo convallis, ut lobortis nulla luctus. Etiam venenatis lobortis eros, sed auctor arcu. Sed semper mauris tortor, eget dapibus tortor vestibulum bibendum. Maecenas ut odio non est congue convallis ac sit amet leo.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        }
      <QuizCard />
    </div>
  )
}

export default Chapters