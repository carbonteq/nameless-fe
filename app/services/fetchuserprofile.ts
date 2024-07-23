export const fetchUserData = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        console.log("Token Before Sending Request => ", token);
        try {
            const response = await fetch("http://localhost:8000/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    } else {
        throw new Error("No token found in localStorage");
    }
};
