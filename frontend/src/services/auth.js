import React, { useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

export function useAuth() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const handleAuthentication = (status) => {
        setAuthenticated(status);
    };

    const register = async (login, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/register',
                {
                    username: login,
                    password: password,
                }
            );
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration failed.');
        }
    };
    const login = async (login, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                new URLSearchParams({
                    username: login,
                    password: password,
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    withCredentials: true,
                }
            );
            console.log('Login successful');
            handleAuthentication(true);
        } catch (error) {
            console.error('Login failed.');
            handleAuthentication(false);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/logout', null, {
                withCredentials: true,
            });
            Cookies.remove('user');
            setAuthenticated(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };
    return {
        setAuthenticated,
        isAuthenticated,
        register,
        login,
        logout,
    };
}
