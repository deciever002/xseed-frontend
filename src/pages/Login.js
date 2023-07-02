import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/login.module.css';
import userIcon from '../assets/user.png'
import loginUser from '../assets/login-user.png';
import padlock from '../assets/padlock.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    await login(email,password);
  }

  useEffect(() => {
    document.body.style.background= "url('/background.jpeg')";
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundSize = "cover";
    
    return () => {
      document.body.style.background = "none"
    }
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loginIcon}>
            <img src={userIcon} alt='usericon'/>
          </div>
          <form className={styles.loginForm}>
            <div className={styles.formInput}>
              <label htmlFor='login-email'>
                <img src={loginUser} alt='user'/>
              </label>
              <input required id='login-email' type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={styles.formInput}>
              <label htmlFor='login-password'>
                <img src={padlock} alt='user'/>
              </label>
              <input required id='login-password' type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} /> 
            </div>
           <button type='submit' onClick={handleSubmit} className={styles.btn}>Login</button>
           <p>Don't have an account <Link to="/register" className={styles.link}>Register</Link> here</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login