import React, { useState } from 'react';
import SelectColor from './SelectColor'
import SelectFruits from './SelectFruits';
import firebaseConfig from '../config/firebase';
import styles from '../styles.module.css'

const MainForm = () => {
  const defaultData = {
    name: '',
    color: '',
    fruits: []
  }
  const [formData, setData] = useState(defaultData)

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const colors = ["Red", "Blue", "Green"]
  const fruits = ["Apple", "Banana", "Cherry", "Date"]

  const handleChange = (field, value) => {
    const newData = { ...formData }
    if (field === 'name') {
      newData[field] = value
    }
    else if (field === 'color') {
      newData[field] = value
    }
    else if (field === 'fruits') {
      if (formData[field].includes(value)) {
        newData[field] = formData[field].filter(fruit => fruit !== value)
      }
      else {
        newData[field] = [...formData[field], value];
      }
    }
    else {
      console.error('Invalid Operation')
    }
    setData(newData)
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
  };

  return (
    <>
      <h1>
        Welcome to my Form Project!
      </h1>
      <form className={styles['mainForm']}>
        <div className={styles['formElement']}>
          <label>
            Name:
          </label>
          <input type="text" value={formData.name} alt={'name'} placeholder='Input your name' onChange={(e) => { handleChange('name', e.target.value) }} />
        </div>

        <div className={styles['formElement']}>
          <label>
            Color:
          </label>
          <SelectColor color={formData.color} colors={colors} handleChange={handleChange} />
        </div>

        <div className={styles['formElement']}>
          <label>
            Fruits:
          </label>
          <SelectFruits selectedFruits={formData.fruits} fruits={fruits} handleChange={handleChange} />
        </div>

        <button onClick={handleSubmit}>Submit</button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form >
    </>
  );
};

export default MainForm;
