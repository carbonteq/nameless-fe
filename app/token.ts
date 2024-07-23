import Jwt from "jsonwebtoken"

const extractIdFromToken = (Token: string) => {

    const decodedToken = Jwt.decode(Token);
    if (decodedToken && typeof decodedToken !== 'string') {
        return decodedToken.data.userId
    }
}

export default extractIdFromToken

