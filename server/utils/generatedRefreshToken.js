import jwt from 'jsonwebtoken'
import UserModel from "../models/user.model.js"

const generatedRefreshToken = async(uesrId) => {
    const token = await jwt.sign({ id : uesrId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn : '7d'}
    )

    const updateRefreshTokenUser = await UserModel.updateOne(
        { _id:uesrId },
        {
            refresh_token : token
        }
    )

    return token
}

export default generatedRefreshToken