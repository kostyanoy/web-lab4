import { useState } from 'react';
import Cookies from 'js-cookie';
import { URL } from './config';
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
            success: (data) => {
                console.log('Registration successful:');
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error('Registration failed. Status:', textStatus);
                throw errorThrown;
            }
        });
    };


    const login = async (login, password) => {
        try {
            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: `username=${login}&password=${password}`,
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                Cookies.set('user', JSON.stringify(data.user));
                setUser(data.user);
                setAuthenticated(true);
            }

            return data;
        } catch (error) {
            console.error('Login failed.');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch(`${URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            Cookies.remove('user');
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
