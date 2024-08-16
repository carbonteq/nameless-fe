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

    static schemaCreator = async (testSchema: { schema: Record<string, unknown>; }, token: string | null) => {
        return await fetch(`${BASE_URL}/schema`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(testSchema),
        })
    }

    static fetchSchema = async (token: string) => {
        return await fetch(`${BASE_URL}/schema`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

    }

    static fetchSchemaById = async (id: string) => {
        return await fetch(`${BASE_URL}/schema/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`
            },
        });

    }

    static updateSchema = async (SCHEMA: { schema: Record<string, unknown>; dataStoreId: null; }, id: string, token: string) => {
        return await fetch(`${BASE_URL}/schema/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(SCHEMA)
        });
    }

    static delSchema = async (id: string, token: string) => {
        return await fetch(`${BASE_URL}/schema/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    }
}


