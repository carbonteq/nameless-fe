export const LoginUser = async (email: string, password: string) => {
    return await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
}

export const FetchUserProfile = async (token: string) => {
    return await fetch("http://localhost:8000/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

}

export const ForgetPassword = async (email: string) => {
    const baseUrl = "http://localhost:3000/signin"
    return await fetch("http://localhost:8000/auth/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, baseUrl }),
    });
}

export const ResetPassword = async (newPassword: string, reqId: string) => {
    return await fetch("http://localhost:8000/auth/reset-password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, reqId }),
    });
}