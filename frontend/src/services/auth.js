import React, { useState } from 'react';
import Cookies from 'js-cookie';
import $ from 'jquery';
export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);

    const register = (login, password) => {
        return $.ajax({
            url: 'http://localhost:8080/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: login,
                password: password,
            }),
            success: () => {
                console.log('Registration successful');
            },
            error: (jqXHR, textStatus) => {
                console.error('Registration failed. Status:', textStatus);
            }
        });
    };

    const login = (login, password) => {
        return $.ajax({
            url: 'http://localhost:8080/login',
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            data: {
                username: login,
                password: password,
            },
            withCredentials: true,
            success: (response) => {
                console.log('Login successful:', response);
                setUser(response.user);
                setAuthenticated(true);
            },
            error: (jqXHR, textStatus) => {
                console.error('Login failed. Status:', textStatus);
            }
        });
    };


    const logout = async () => {
        try {
            await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include',
            });

            Cookies.remove('user');

            // Сбрасываем информацию о пользователе и статусе аутентификации
            setUser(null);
            setAuthenticated(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return {
        user,
        isAuthenticated,
        register,
        login,
        logout,
    };
}
