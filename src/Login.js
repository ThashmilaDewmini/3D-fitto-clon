import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { auth, db } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = async (e) => {
        e.preventDefault();
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            // Handle specific authentication errors
            if (error.code === 'auth/invalid-login-credentials') {
                alert('Invalid email or password. Please check your credentials and try again.');
            } else {
                // Handle other errors
                console.error('Authentication Error:', error.message);
                alert('Sign-in failed. Please try again.');
            }
        }
    };
    
  return (
    <div className="login">
        <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>
        
        </Link>
        <div className='login_container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password'  onChange={e => setPassword(e.target.value)}/>
                <button type='submit' onClick={signIn} className='sign_in_button' >Sign In</button>
            </form>
            <p>
                By singing-in you agree to the FitTo Conditions of Use & Sale. Please see our Privacy Notice, our cookies notice and our internet based Ads notices.
            </p>
            <Link to="/register" style={{textDecoration:'none', color:'white'}}>
            <center><button className='register_button'>Create your FitTo account</button></center>
            
            </Link>
            
        </div>
    </div>
  )
}

export default Login