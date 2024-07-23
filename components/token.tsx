import { setUserId } from "@/app/redux/slices/authSlice";
import Jwt from "jsonwebtoken"
import { useDispatch } from "react-redux";

const Token = () => {
    console.log("HELLO")

    const JwtToken = localStorage.getItem('jwtToken')
    if (JwtToken) {
        console.log("HELLO")
        const dispatch = useDispatch();
        const decodedToken = Jwt.decode(JwtToken);
        if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken.data) {
            console.log("User ID:", decodedToken.data.userId);
            dispatch(setUserId(decodedToken.data.userId));
        } else {
            console.error("Invalid token");
        }
    }

    return (
        <></>
    )
}

export default Token