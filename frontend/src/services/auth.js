import axios from 'axios';
import {useDispatch} from "react-redux";
import {loginAuth,} from "../redux/actions/pointsActions";

export function useAuth() {
    const dispatch = useDispatch();
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
            dispatch(loginAuth());
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
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return {
        register,
        login, logout,
    };
}
