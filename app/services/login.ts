import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import extractIdFromToken from "../token";

const loginService = async (email: string, password: string, dispatch: Dispatch, setUserId: ActionCreatorWithPayload<string, "auth/setUserId">) => {
    const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);

        //Saving the token to Browser's Local Storage
        localStorage.setItem("jwtToken", result.token);

        dispatch(setUserId(extractIdFromToken(result.token)))


    } else {
        const errorText = await response.text();
    }

    return response
}


export default loginService