import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../login/login';
import MainPage from '../mainPage/mainPage';
import Clock from "../clock/clock";
import Description from "../description/description";
import './App.css';
import {connect} from "react-redux";

function App({authStatus}) {
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
                <Route
                    path="/main"
                    element={
                        authStatus ? <MainPage /> : <Navigate to="/" />
                    }
                />
            </Routes>
        </Router>
    );
}
const appProps = (state) => {
    return {
        authStatus: state.authStatus
    };
};
export default connect(appProps)(App);


