import jwt from 'jsonwebtoken'

const generatedAccessToken = async(uesrId) => {
    const token = await jwt.sign({ id : uesrId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn : '5h'}
    )

    return token
}

export default generatedAccessToken