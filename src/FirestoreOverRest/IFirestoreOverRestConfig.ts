interface IFirestoreOverRestConfig {

    // required

    projectName:string
    jwt: {
        clientEmail:string
        privateKeyId:string
        privateKey:string
    }

    // optional

    databaseName?:string
    apiUrl?:string
    overrideAxiosConfig?: any
    isUnitTesting?:bool
    softLogErrors?:bool
    
}
export default IFirestoreOverRestConfig
