import { AuthenticationContext } from "@/app/context/AuthContext";
import { SignUpInputInterface } from "@/pages/api/auth/signup";
import axios from "axios";
import { useContext } from "react";
import { getCookie } from "cookies-next";

export const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(
        AuthenticationContext
    );

    const signIn = async (
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        },
        handleClose: () => void
    ) => {
        setAuthState({ data: null, error: null, loading: true });

        try {
            setAuthState({ data: null, error: null, loading: true });

            const { data } = await axios.post(
                "http://localhost:3000/api/auth/signin",
                { email, password }
            );
            setAuthState({ data, error: null, loading: false });
            handleClose;
        } catch (error: any) {
            setAuthState({ data: null, error: error.message, loading: false });
        }
    };

    const signUp = async (
        {
            email,
            password,
            city,
            firstName,
            lastName,
            phone,
        }: SignUpInputInterface,
        handleClose: () => void
    ) => {
        setAuthState({ data: null, error: null, loading: true });

        try {
            setAuthState({ data: null, error: null, loading: true });

            const { data } = await axios.post(
                "http://localhost:3000/api/auth/signin",
                { email, password, city, firstName, lastName, phone }
            );
            setAuthState({ data, error: null, loading: false });
            handleClose;
        } catch (error: any) {
            setAuthState({ data: null, error: error.message, loading: false });
        }
    };

    const fetchUser = async () => {
        try {
            const jwt = getCookie("verySecretCookie");
            if (!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false,
                });
            }
            const { data } = await axios.get(
                "http://localhost:300/api/auth/me",
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            );
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

            setAuthState({ data, error: null, loading: false });
        } catch (error: any) {
            setAuthState({ data: null, error: error.message, loading: false });
        }
    };

    return { signIn, signUp, fetchUser };
};
