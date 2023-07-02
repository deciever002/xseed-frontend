import React, { useContext } from 'react'
import styles from '../styles/navbar.module.css';
import logo from '../assets/logo.png'
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {

    const {user,logout} = useContext(AuthContext);
  
    let isLoggedIn = false;
    if(user?.email){
      isLoggedIn = true;
    }
  return (
    <>
        <nav>
            <NavLink to="/" style={{textDecoration: "none",color: 'black'}}>
                <div className={styles.brandContainer} >
                    <img src={logo} alt='logo'/>
                </div>
            </NavLink>
            <div className={styles.links}>
                { isLoggedIn ? 
                <> 
                    <NavLink to="/dashboard" style={({isActive}) => { 
                        return{
                            color: "rgb(23, 177, 248)"
                        }
                    }}> Courses </NavLink>
                    <NavLink onClick={logout} style={({isActive}) => { 
                        return{
                            color: "rgb(23, 177, 248)"
                        }
                    }}> Logout </NavLink>
                </> :
                <> 
                    <NavLink to="/login" style={({isActive}) => { 
                        return{
                            backgroundClip: isActive ? "border-box" : "",
                            color: isActive ? "white" : ""
                        }
                    }}> Login </NavLink>
                    <NavLink to="/register" style={({isActive}) => { 
                        return{
                            backgroundClip: isActive ? "border-box" : "",
                            color: isActive ? "white" : ""
                        }
                    }}> Register </NavLink> 
                </> 
                }
            </div>
        </nav>
        <Outlet />
    </>
  )
}

export default Navbar