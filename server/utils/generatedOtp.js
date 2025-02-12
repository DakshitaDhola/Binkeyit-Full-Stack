const generatedOtp = () => {
    return Math.floor(Math.random() * 900000) + 100000 // 0 to 900000
}

export default generatedOtp