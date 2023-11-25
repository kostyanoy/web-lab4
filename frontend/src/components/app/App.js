import React from 'react';
import Description from '../description/description';
import Clock from "../clock/clock";
import Login from "../login/login";
import './App.css';

function App() {
    return (
        <div>
            <Description />
            <Clock />
            <Login/>
        </div>
    );
}

export default App;
