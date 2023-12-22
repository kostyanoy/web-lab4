import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../login/Login';
import MainPage from '../mainPage/MainPage';
import Clock from '../clock/Clock';
import Description from '../description/Description';
import './App.css';

function App() {
    const authStatus = useSelector((state) => state.authStatus);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Description />
                            <Clock />
                            {authStatus ? <Navigate to="/main" /> : <LoginPage />}
                        </>
                    }
                />
                <Route path="/main" element={authStatus ? <MainPage /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
