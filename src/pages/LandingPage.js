import React, { useEffect } from 'react';
import styles from '../styles/landingpage.module.css'

const LandingPage = () => {

  useEffect(()=>{
    document.body.style.overflow = "hidden";
    document.getElementsByTagName('nav')[0].style.position = "fixed";
    return () => {
      document.getElementsByTagName('nav')[0].style.position = "static";
      document.body.style.overflow = "scroll";
    }
  },[])

  return (
    <>
        <video loop autoPlay muted className={styles.promoVideo}>
            <source src='/promo.mp4' type='video/mp4'></source>
        </video>
    </>
  )
}

export default LandingPage