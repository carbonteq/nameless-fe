import { BASE_URL } from "@/components/constants"

export class httpClient {

    static LoginUser = async (email: string, password: string) => {
        return await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    }

    static signUpUser = async (username: string, email: string, password: string) => {
        const baseUrl = "http://localhost:3000/user-verify"
        return await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, baseUrl }),
        });
    }

    static FetchUserProfile = async (token: string) => {
        return await fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

    }

    static ForgetPassword = async (email: string) => {
        const baseUrl = "http://localhost:3000/signin"
        return await fetch(`${BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, baseUrl }),
        });
    }

    static ResetPassword = async (newPassword: string, reqId: string) => {
        return await fetch(`${BASE_URL}/auth/reset-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword, reqId }),
        });
    }
}

