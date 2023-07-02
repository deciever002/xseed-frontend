import React, { useEffect, useState } from 'react';
import styles from '../styles/register.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import registerUserIcon from '../assets/register-user.png'
import loginUser from '../assets/login-user.png';
import key from '../assets/key.png';
import emailImg from '../assets/email.png'
import padlock from '../assets/padlock.png';
import { Link, useNavigate } from 'react-router-dom';
import { REQUEST_URL } from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading,setLoading] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: 'post',
      data: {
        name,email,password,confirmPassword
      },
      withCredentials: true,
      url: REQUEST_URL + "/user/register",
    })
    .then((res) => {
      console.log(res)
      toast('🦄 ' + res.data, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if(res.data === 'User Registered'){
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      }
      setLoading(false);
    })
    .catch((err) => console.log(err));
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
            <img src={registerUserIcon} alt='usericon'/>
          </div>
          <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
            <div className={styles.formInput}>
              <label htmlFor='register-name'>
                <img src={loginUser} alt='user'/>
              </label>
              <input id='register-name' required type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} pattern='[a-zA-Z\s]{2,20}'/>
            </div>
            <div className={styles.formInput}>
              <label htmlFor='register-email'>
                <img src={emailImg} alt='user'/>
              </label>
              <input id='register-email' required type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={styles.formInput}>
              <label htmlFor='register-password'>
                <img src={key} alt='user'/>
              </label>
              <input id='register-password' required type='password' placeholder='Enter password' minLength={6} maxLength={20} value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className={styles.formInput}>
              <label htmlFor='register-cnf-password'>
                <img src={padlock} alt='user'/>
              </label>
              <input id='register-cnf-password' required type='password' placeholder='Confirm password' minLength={6} maxLength={20} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/> 
            </div>
           <button type='submit' disabled={isLoading} className={styles.btn}>{isLoading ? 'Registering....' : 'Register'}</button>
           <p>Already have an account <Link to="/login" className={styles.link}>Login</Link> here</p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register