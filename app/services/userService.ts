import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import { JWT_TOKEN } from "@/components/constants";
import extractIdFromToken from "../token";
import { httpClient } from "./httpClient";
import { toast } from "@/components/ui/use-toast";


export class userService {

    static loginService = async (email: string, password: string, dispatch: Dispatch, setUserId: ActionCreatorWithPayload<string, "auth/setUserId">, func: () => void) => {

        const response = await httpClient.LoginUser(email, password)

        if (response.ok) {
            const result = await response.json();
            console.log("User created successfully:", result);

            //Saving the token to Browser's Local Storage
            localStorage.setItem(JWT_TOKEN, result.token);

            dispatch(setUserId(extractIdFromToken(result.token)))
            func()

        } else {
            if (response.status === 401) {
                toast({
                    title: "Try Again",
                    description: "Invalid Email/Password",
                });
            }
            const errorText = await response.text();
            console.log(errorText)
        }
        return response
    }

    static signUpService = async (username: string, email: string, password: string, dispatch: Dispatch, setUserId: ActionCreatorWithPayload<string, "auth/setUserId">, onSuccess: () => void) => {
        const response = await httpClient.signUpUser(username, email, password)
        if (response.ok) {
            const result = await response.json();
            console.log("User created successfully:", result);

            //Saving the token to Browser's Local Storage
            localStorage.setItem(JWT_TOKEN, result.token);

            dispatch(setUserId(extractIdFromToken(result.token)))
            onSuccess()

        } else {
            if (response.status === 401 || response.status === 422) {
                const errorText = await response.json();

                toast({
                    title: "Try Again",
                    description: errorText.description,
                });
            }
            else if (response.status === 409) {
                const errorText = await response.json();
                toast({
                    title: "Cannot create account",
                    description: errorText.message,
                });
            }
        }
        return response

    }

    static fetchUserData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const response = await httpClient.FetchUserProfile(token)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        else {
            throw new Error("No token found in localStorage");
        }
    };

    static forgotPasswordService = async (email: string, func: () => void) => {
        const response = await httpClient.ForgetPassword(email)

        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            func()
        } else {
            const errorText = await response.text();
        }
        return response
    }

    static resetPasswordService = async (password: string, id: string, func: () => void) => {
        const response = await httpClient.ResetPassword(password, id)
        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            func()
        } else {
            const errorText = await response.text();
            console.log(errorText);

        }
        return response
    }

    static schemaCreator = async (token: string, SCHEMA: { schema: Record<string, unknown> }, onSuccess: () => void) => {
        const response = await httpClient.schemaCreator(SCHEMA, token)
        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            onSuccess()
        } else {
            const errorText = await response.text();
        }
        return response
    }

    static getSchema = async (token: string, onSuccess?: () => void) => {
        const response = await httpClient.fetchSchema(token)
        if (response.ok) {
            const result = await response.json();
            return result
        } else {
            const errorText = await response.text();
        }

        return response
    }

    static getSchemaById = async (id: string, onSuccess?: () => void) => {
        const response = await httpClient.fetchSchemaById(id)
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            return result
        } else {
            const errorText = await response.text();
        }
        return response
    }

    static updateSchema = async (token: string, SCHEMA: { schema: Record<string, unknown>, dataStoreId: null }, id: string, onSuccess: () => void) => {
        const response = await httpClient.updateSchema(SCHEMA, id, token)
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            onSuccess()
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
        return response
    }

    static delSchema = async (token: string, id: string, onSuccess: () => void) => {
        const response = await httpClient.delSchema(id, token)
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            onSuccess()
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
        return response
    }
}