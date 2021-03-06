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
    overrideAxiosConfig?:any
    isUnitTesting?:boolean
    softLogErrors?:boolean

}
export default IFirestoreOverRestConfig
