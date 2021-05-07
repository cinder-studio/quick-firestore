const jwt = require("jsonwebtoken")

export interface ISignOptions {
    clientEmail: string
    audience: string
    privateKeyId: string
    privateKeyStr: string
    expiresInSeconds: number
}

export const sign = (options:ISignOptions, payload?:any) => {
    const truePayload = payload ? payload : {}
    const jwtOptions = {
        algorithm: 'RS256',
        expiresIn: options.expiresInSeconds,
        issuer: options.clientEmail,
        subject: options.clientEmail,
        audience: options.audience,
        header: {'kid': options.privateKeyId }
    }

    return jwt.sign(truePayload, options.privateKeyStr, jwtOptions)
}

export const verify = (token:string, publicKeyStr:string) => {
    return jwt.verify(token, publicKeyStr)
}

export const decode = (token:string) => {
    return jwt.decode(token)
}
