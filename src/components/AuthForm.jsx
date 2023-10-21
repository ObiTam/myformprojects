import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import eyeIcon from '../icons/visible.svg';
import eyeStrikeIcon from '../icons/not-visible.svg';
import styles from '../styles.module.css';

const AuthForm = ({ login }) => {
  const [isSignedUp, setSignedUp] = useState(true)

  const defaultData = {
    userID: '',
    password: ''
  }
  const [authData, setData] = useState(defaultData)
  const [confirmPassword, setPassword] = useState('')

  const [visibility, setVisibility] = useState({ password: false, confirmPassword: false })

  const changeVisibity = (field) => {
    const newBools = { ...visibility }
    newBools[field] = !visibility[field]
    setVisibility(newBools)
  }

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field, value) => {
    if (field === 'confirmPassword') {
      setPassword(value)
    }
    else {
      const newData = { ...authData }
      newData[field] = value
      setData(newData)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "authentication data"), authData);
      console.log("Document written with ID: ", docRef.id);
      login()
      setData(defaultData)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form className={styles['authForm']}>
      <div className={styles['authFormElement']}>
        <label className={styles['authFormLabel']}>
          UserID:
        </label>
        <input
          type="text"
          value={authData.userID}
          alt={'userID'}
          placeholder={`${isSignedUp ? 'Input' : 'Set your'} UserID`}
          onChange={(e) => { handleChange('userID', e.target.value) }}
        />
      </div>

      <div className={styles['authFormElement']}>
        <label className={styles['authFormLabel']}>
          Password:
        </label>
        <input
          className={styles['passwordInput']}
          type={visibility['password'] ? 'text' : 'password'}
          value={authData.password}
          alt={'password'}
          placeholder={`${isSignedUp ? 'Input' : 'Set your'} Password`}
          onChange={(e) => { handleChange('password', e.target.value) }}
        />
        <img
          className={styles['eyes']}
          src={visibility['password'] ? eyeStrikeIcon : eyeIcon} alt="logout"
          onClick={(e) => changeVisibity('password')}
        />
      </div>

      {
        !isSignedUp &&
        <div className={styles['authFormElement']}>
          <label className={styles['authFormLabel']}>
            Confirm Password:
          </label>
          <input
            className={styles['passwordInput']}
            type={visibility['confirmPassword'] ? 'text' : 'password'}
            value={confirmPassword}
            alt={'confirm password'}
            placeholder='Confirm your Password'
            onChange={(e) => { handleChange('confirmPassword', e.target.value) }}
          />
          <img
            className={styles['eyes']}
            src={visibility['confirmPassword'] ? eyeStrikeIcon : eyeIcon} alt="logout"
            onClick={(e) => changeVisibity('confirmPassword')}
          />
        </div>
      }

      <button onClick={handleSubmit}>
        {
          isSignedUp ?
            'LogIn'
            :
            'SignUp'
        }
      </button>

      <div className={styles['signupText']}>
        {
          isSignedUp ?
            <>Don't have an account? <span onClick={() => setSignedUp(false)}>SignUp</span></>
            :
            <>Already have an account? <span onClick={() => setSignedUp(true)}>LogIn</span></>
        }
      </div>


      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form >
  );
};

export default AuthForm;
