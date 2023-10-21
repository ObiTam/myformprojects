// src/App.js
import React, { useState } from 'react';
import MainForm from './components/MainForm';
import styles from './styles.module.css'
import AuthForm from './components/AuthForm';

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div className={styles['app']}>
            <h1>
                Welcome to my Form Project!
            </h1>
            {
                loggedIn ?
                    <MainForm logout={() => setLoggedIn(false)} />
                    :
                    <AuthForm login={() => setLoggedIn(true)} />
            }
        </div>
    )
}

export default App;