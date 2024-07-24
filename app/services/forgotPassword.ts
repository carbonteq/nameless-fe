import { ForgetPassword } from "./network";


const forgotPasswordService = async (email: string, func: () => void) => {
    const response = await ForgetPassword(email)

    if (response.ok) {
        const result = await response.json();
        console.log(result.message)
        func()
    } else {
        const errorText = await response.text();
    }
    return response
}

export default forgotPasswordService