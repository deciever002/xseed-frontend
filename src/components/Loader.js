import React from 'react';
import styles from '../styles/loader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
     <FontAwesomeIcon className={styles.spinner} icon={faSpinner} />
    </div>
  )
}

export default Loader