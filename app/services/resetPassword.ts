import { ResetPassword } from "./network";

const resetPasswordService = async (password: string, id: string, func: () => void) => {
    const response = await ResetPassword(password, id)
    if (response.ok) {
        const result = await response.json();
        console.log(result.message)
        func()
    } else {
        const errorText = await response.text();
    }
    return response
}

export default resetPasswordService