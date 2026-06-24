import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AXIOS = axios.create({
    baseURL: 'https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app'
});

const useAxios = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const interceptorsSet = useRef(false);

    useEffect(() => {
        if (interceptorsSet.current) return;
        interceptorsSet.current = true;

        const requestInterceptor = AXIOS.interceptors.request.use((request) => {
            const accessToken = localStorage.getItem('access-token');
            if (accessToken) {
                request.headers.Authorization = `Bearer ${accessToken}`;
            }
            return request;
        });

        const responseInterceptor = AXIOS.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            AXIOS.interceptors.request.eject(requestInterceptor);
            AXIOS.interceptors.response.eject(responseInterceptor);
            interceptorsSet.current = false;
        };
    }, [logOut, navigate]);

    return ([AXIOS]);
};

export default useAxios;