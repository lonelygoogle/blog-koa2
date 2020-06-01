const crypto = require('crypto')

// 密钥
const SECRET_KEY = '493RFDF_HDJF#'

// md5 
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// const result = genPassword('123')
// console.log('result is ', result)

module.exports = {
    genPassword
}