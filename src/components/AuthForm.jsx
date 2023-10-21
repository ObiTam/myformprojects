import React, { useState } from 'react';
import firebaseConfig from '../config/firebase';
import eyeIcon from '../icons/visible.svg';
import eyeStrikeIcon from '../icons/not-visible.svg';
import styles from '../styles.module.css';

const AuthForm = ({ login }) => {
  const [isSignedUp, setSignedUp] = useState(true)

  const defaultData = {
    userID: '',
    password: ''
  }
  const [formData, setData] = useState(defaultData)
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
      const newData = { ...formData }
      newData[field] = value
      setData(newData)
    }
  }

  // useEffect(() => {
  //   // Read data from Firestore on component mount
  //   const fetchData = async () => {
  //     try {
  //       const docRef = firebaseConfig.firestore().collection('formData').doc('exampleUserId');
  //       const doc = await docRef.get();

  //       if (doc.exists) {
  //         const data = doc.data();
  //         setName(data.name || '');
  //         setColor(data.color || '');
  //         setFruits(data.fruits || []);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching document: ', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    // try {
    //   const formData = {
    //     name,
    //     color,
    //     fruits,
    //   };

    //   const docRef = firebaseConfig.firestore().collection('formData').doc('exampleUserId');
    //   await docRef.set(formData);

    //   setSuccessMessage('Form data saved successfully!');
    //   setErrorMessage('');
    // } catch (error) {
    //   console.error('Error saving document: ', error);
    //   setSuccessMessage('');
    //   setErrorMessage('Failed to save form data.');
    // }
    login()
  };

  return (
    <form className={styles['authForm']}>
      <div className={styles['authFormElement']}>
        <label className={styles['authFormLabel']}>
          UserID:
        </label>
        <input
          type="text"
          value={formData.userID}
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
          value={formData.password}
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
