import IFirestoreOverRestConfig from "../IFirestoreOverRestConfig"

export interface IFirestoreToken {
    token: token,
    startTs: startTs,
    tokenCreatedTs: tokenCreatedTs
}

// runtime vars
let googleJwt = null

// firestoreToken
export default (config:IFirestoreOverRestConfig) : IFirestoreToken => {
    try {
        const startTs = Date.now()

        // AUTHENTICATION

        let token = null

        if(config.isUnitTesting === "true") {
            token = 'mock-api-token'
        }
        else {
            // gwt library
            if(!googleJwt) {
                googleJwt = require("../libs/google/jwt")
            }
            token = googleJwt.sign({
                clientEmail: config.jwt.clientEmail,
                audience: `${config.firestore.apiUrl}/`,
                privateKeyId: config.jwt.privateKeyId,
                privateKeyStr: config.jwt.privateKey,
                expiresInSeconds: 10
            })
        }

        const tokenCreatedTs = Date.now()

        return {
            token: token,
            startTs: startTs,
            tokenCreatedTs: tokenCreatedTs
        } as IFirestoreToken
    }
    catch(e) {
        throw e
    }
}
