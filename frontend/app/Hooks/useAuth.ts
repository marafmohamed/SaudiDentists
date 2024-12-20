import React from 'react'
import { useApp } from '../Context';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
export default function useAuth() {
    const router = useRouter();
    const { baseUrl, dispatch } = useApp();
    const login = async (email: string, password: string) => {
        // Add login logic here
        const response = await fetch(`${baseUrl}/api/dentist/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            //create the cookie
            cookie.set('token', data.token);
            dispatch({ type: 'LOGIN', payload: data.token })
            router.push("/UpdateProfile");
            return data;
        } else {
            // Add logic for failed login
            console.log('Login Failed', data);
            return data;
        }
    }
    const logout = async () => {
        // Add logout logic here
        cookie.remove('token');
        dispatch({ type: "LOGOUT" })
        router.push('/');
    }
    const loginAdmin = async (email: string, password: string) => {
        // Add login logic here
        const response = await fetch(`${baseUrl}/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            //create the cookie
            cookie.set('admin', data.token);
            dispatch({ type: "LOGIN_AD", payload: data.token });
            router.push('/AdminPanel/Requests');
        } else {
            // Add logic for failed login
            console.log('Login Failed', data);
            return data;
        }
    }
    return {
        login,
        logout,
        loginAdmin
    }
}
