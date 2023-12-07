import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";



function Register() {
  const navigate = useNavigate();

  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if(name === '' || email === '' || password === ''){
        alert('Fill the form')
        return;
      }
      if (name && email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
        const userDate = {
          userID: auth.currentUser.uid,
          name,
          email,
          password,
        };
 
        const userRef = collection(db, "users");
        await addDoc(userRef, userDate);

        alert("Successfully Registered");
        setName("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");

        navigate('/');
      }
    } catch (error) {
      alert("register error", error);
      console.log("register error", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h1 className="register-title">CREATE AN ACCOUNT</h1>
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="register-input"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
          className="register-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
          className="register-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
          className="register-input"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="register-agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          
            <div className="register-button">
              <button onClick={handleUserRegister}>CREATE</button>
            </div>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
