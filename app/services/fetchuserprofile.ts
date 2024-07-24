import { FetchUserProfile } from "./network";

export const fetchUserData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const response = await FetchUserProfile(token)

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
