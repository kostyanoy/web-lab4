import {useState} from 'react';
import Cookies from 'js-cookie';
import {URL} from './config';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const register = async (login, password) => {
        try {
            return await $.ajax({
                url: `${URL}/register`,
                method: 'POST',
                data: {
                    username: login,
                    password: password
                }
            });
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };
    const login = async (login, password) => {
        try {
            const response = await $.ajax({
                url: `${URL}/login`,
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: `username=${login}&password=${password}`,
            });

            if (response.success) {
                Cookies.set('user', JSON.stringify(response.user));
                setUser(response.user);
                setAuthenticated(true);
            }

            return response;
        } catch (error) {
            console.error('Login failed.');
            throw error;
        }
    };
    const logout = async () => {
        try {
            await $.ajax({
                url: `${URL}/logout`,
                method: 'POST',
                xhrFields: { withCredentials: true },
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
