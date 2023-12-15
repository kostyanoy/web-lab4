import React, { useState } from "react";
import axios from 'axios';

export function useAuth() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const register = async (login, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/register',
                {
                    username: login,
                    password: password,
                }
            );
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('Registration failed.', error);
            throw error;
        }
    };

    const login = async (login, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                new URLSearchParams({
                    username: login,
                    password: password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    withCredentials: true,
                }
            );
            console.log('Login successful', response.data);
            setAuthenticated(true);
        } catch (error) {
            console.error('Login failed.', error);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/logout', {
                withCredentials: true,
            });
            console.log("Logout done")
            setAuthenticated(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return {
        setAuthenticated,
        isAuthenticated,
        register,
        login, logout,
    };
}
