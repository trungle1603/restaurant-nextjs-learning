"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import AuthModelInputs from "./AuthModalInput";
import { useAuth } from "@/hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
    const { error, setAuthState, loading, data } = useContext(
        AuthenticationContext
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signIn, signUp } = useAuth();

    let btnCLass = "border p-1 px-4 rounded mr-3";
    let btnMsg = "Sign up";
    if (isSignIn) {
        btnCLass = "bg-blue-400 text-white " + btnCLass;
        btnMsg = "Sign in";
    }

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    });
    const [disabled, setDisable] = useState(false);

    useEffect(() => {
        // Active button login
        if (isSignIn) {
            if (input.password && input.email) {
                return setDisable(false);
            }

            // Active button sign up
        } else {
            if (
                input.firstName &&
                input.lastName &&
                input.password &&
                input.phone &&
                input.email &&
                input.city
            ) {
                return setDisable(false);
            }
        }

        setDisable(true);
    }, [input, isSignIn]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
    };
    const handleClick = async () => {
        if (isSignIn) {
            await signIn(
                { email: input.email, password: input.password },
                handleClose
            );
        } else {
            await signUp(input, handleClose);
        }
    };

    return (
        <div>
            <button className={btnCLass} onClick={handleOpen}>
                {btnMsg}
            </button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {loading ? (
                        <div className="py-24 px-2 flex justify-center">
                            <CircularProgress></CircularProgress>
                        </div>
                    ) : (
                        <div className="p-2">
                            {error ? (
                                <Alert severity="error" className="mb-4">
                                    {error}
                                </Alert>
                            ) : null}
                            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                                <p className="text-sm">
                                    {isSignIn ? "Login" : "Create Your Account"}
                                </p>
                            </div>
                            <div className="m-auto">
                                <h2 className="text-2xl font-light text-center">
                                    {isSignIn
                                        ? "Login Into Your Account"
                                        : "Create Your Account"}
                                </h2>
                                <AuthModelInputs
                                    input={input}
                                    handleChangeInput={handleChangeInput}
                                    isSignIn={isSignIn}
                                ></AuthModelInputs>
                                <button
                                    className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                                    disabled={disabled}
                                    onClick={handleClick}
                                >
                                    {isSignIn ? "Sign In" : "Create Account"}
                                </button>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
