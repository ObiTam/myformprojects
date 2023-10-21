// src/App.js
import React from 'react';
import MainForm from './components/MainForm';
import styles from './styles.module.css'

function App() {
    return (
        <div className={styles['app']}>
            <MainForm />
        </div>
    )
}

export default App;