import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import extractIdFromToken from "../token";
import { JWT_TOKEN } from "@/components/primitives";
import { LoginUser } from "./network";


const loginService = async (email: string, password: string, dispatch: Dispatch, setUserId: ActionCreatorWithPayload<string, "auth/setUserId">, func: () => void) => {
    const response = await LoginUser(email, password)

    if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);

        //Saving the token to Browser's Local Storage
        localStorage.setItem(JWT_TOKEN, result.token);

        dispatch(setUserId(extractIdFromToken(result.token)))
        func()

    } else {
        const errorText = await response.text();
    }

    return response
}


export default loginService