// src/components/Form.js

import React, { useState, useEffect } from 'react';
import firebaseConfig from '../config/firebase';

const MainForm = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [fruits, setFruits] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Read data from Firestore on component mount
    const fetchData = async () => {
      try {
        const docRef = firebaseConfig.firestore().collection('formData').doc('exampleUserId');
        const doc = await docRef.get();

        if (doc.exists) {
          const data = doc.data();
          setName(data.name || '');
          setColor(data.color || '');
          setFruits(data.fruits || []);
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = {
        name,
        color,
        fruits,
      };

      const docRef = firebaseConfig.firestore().collection('formData').doc('exampleUserId');
      await docRef.set(formData);

      setSuccessMessage('Form data saved successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving document: ', error);
      setSuccessMessage('');
      setErrorMessage('Failed to save form data.');
    }
  };

  return (
    <div>
      <h1>Form</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Color:
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </select>
      </label>
      <br />
      <label>
        Fruits:
        <select multiple value={fruits} onChange={(e) => setFruits(Array.from(e.target.selectedOptions, (option) => option.value))}>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Cherry">Cherry</option>
          <option value="Date">Date</option>
        </select>
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default MainForm;
