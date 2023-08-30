import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import { auth } from './firebase';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email,password)
        .then((auth) => {
            if(auth){
                navigate('/');
            }
        })
        .catch(error => alert(error.message));
    }
    const register = e => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            // it succesfully created a new user with email and password
            if(auth){
                navigate('/');
            }
        })
        .catch(error => alert(error.message))

    }

  return (
    <div className="login">
        <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>
        <div className='logo'>amazon</div>
        </Link>
        <div className='login_container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button type='submit' onClick={signIn} className='sign_in_button' >Sign In</button>
            </form>
            <p>
                By singing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our cookies notice and our internet based Ads notices.
            </p>
            <button onClick={register} className='register_button'>Create your amazon account</button>
        </div>
    </div>
  )
}

export default Login