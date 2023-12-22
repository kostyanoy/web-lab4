import React, { useState, useEffect } from 'react';
import './clock.css';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock">
            <div id="time">{currentTime.toLocaleTimeString()}</div>
        </div>
    );
};

export default Clock;
