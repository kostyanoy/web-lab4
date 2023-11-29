import React, { useState, useEffect } from 'react';
import './clock.css';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const updateTime = () => {
        setCurrentTime(new Date());
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="clock">
            <div id="time">
                {currentTime.toLocaleTimeString()}
            </div>
        </div>
    );
};
export default Clock;
