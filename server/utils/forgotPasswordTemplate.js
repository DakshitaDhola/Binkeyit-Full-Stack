const forgotPasswordTemplate = ({ name , otp }) => {
    return `
    <div>
        <p>Dear ${name}</p>
        <p>You're requested a password reset. Please Use Foloowing OTP code to reset your password.</p>
    </div>
    <div style="background:yellow;font-size:20px;padding:20px;text-align:center;font-weight:800;">
        ${otp}
    </div>
    <p>This OTP is Valid For 1 Hour Only. Enter This Otp in the binkeyit website to proceed with resetting your password</p>
    <br/></br>
    <p>Thanks</p>
    <p>Binkeyit</p>
    `
}

export default forgotPasswordTemplate