const verifyEmailTemplate = ({name,url}) => {
    return `
        <p>Dear ${name}</p>
        <p> Thank You For Registering In Binkeyit</p>
        <a href=${url} style="color:white;background:white;margin-top:10px;padding:20px;display:block">
        Verify Email
        </a>
    `
}

export default verifyEmailTemplate