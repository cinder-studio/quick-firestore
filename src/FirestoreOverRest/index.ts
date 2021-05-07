import { axiosCreate } from "../libs/AxiosExtra"
import firestoreToken, { IFirestoreToken } from "./firestoreToken"
import IFirestoreOverRestConfig from "./IFirestoreOverRestConfig"
import ILogger from "../ILogger"
import parseDocument from "./parseDocument"
import QuickQueryBuilder from "../QuickQuery"
import typedValues from "./typedValues"

const defaultConfig:IFirestoreOverRestConfig = {
    projectName:'',
    databaseName:'(default)',
    apiUrl:'https://firestore.googleapis.com',
    jwt: {
        clientEmail:'',
        privateKeyId:'',
        privateKey:'',
    },
    options: {
        isUnitTesting:false,
        softLogErrors:false
    }
}

class QuickFirestore {

    config:IFirestoreOverRestConfig
    logger:ILogger
    axios:any // TODO is there a better type?

    constructor(config:IFirestoreOverRestConfig, logger:ILogger) {
        // keep this constructor as thin and fast as possible

        // setup the config
        this.config = {
            ...config,
            ...defaultConfig,
            jwt: {
                ...defaultConfig.jwt,
                ...config.jwt
            }
        }
        this.logger = logger ? logger : console }

        // setup logging


        // setup axios
        this.axios = axiosCreate(config.overrideAxiosConfig ? config.overrideAxiosConfig : {})
    }

    /**
        Query

        Execute Query Blindly

        Run a query without any additional validations. Trust the caller.
    */
    public query = async (queryObj:any): Promise<any> => {

        const { token, startTs, tokenCreatedTs } = firestoreToken(this.config)

        try {

            const result = await this.axios.post(
                `${this.config.apiUrl}/v1/projects/${this.config.projectName}/databases/${this.config.databaseName}/documents:runQuery`,
// TODO there are more query types
                { structuredQuery: queryObj },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            let resultData = []
            if(result.data.length === 1 && Object.keys(result.data[0]).length === 1) {
                resultData = []
            }
            else {
                resultData = result.data.map(resObj=>parseDocument(resObj))
            }

            const queryFinishedTs = Date.now()

            if((queryFinishedTs - startTs) > 1200) {
                this.logger.warn('long QuickFirestore query', `${queryFinishedTs - startTs}ms`, {
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, JSON.stringify(queryObj))
            }

            return resultData

        }
        catch (e) {
            const queryFinishedTs = Date.now()
            if(e.response) {
                this.logger.error({
                    statusCode: e.response.status,
                    message: e.response.statusText,
                    callType: 'executeQueryBlindly',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs,
                }, e.response.data)
            }
            else {
                this.logger.error({
                    statusCode: '500',
                    message: 'please check server logs for details of this error',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, e)
            }
            if(!this.config.softLogErrors) {
                throw e
            }
        }
        return []
    }

    /**
        Read

        Execute Read Blindly

        Run a read call without any additional validations. Trust the caller.
    */
    public read = async (queryObj:any): Promise<any> => {

        if(!queryObj.collection || !queryObj.name) {
            return null
        }

        const { token, startTs, tokenCreatedTs } = firestoreToken(this.config)

        try {

//TODO query masking
////////////////////
            let queryMask = ''
            if(false && queryObj.mask) { queryMask = '?mask=TODO' }
////////////////////

            const getUrl = `${this.config.firestore.apiUrl}/v1/projects/${this.config.firestore.projectName}/databases/${this.config.firestore.databaseName}/documents/${queryObj.collection}/${queryObj.name}${queryMask}`

            const result = await axios.get(
                getUrl,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const parsedResult = parseDocument({document:result.data})

            const queryFinishedTs = Date.now()

            if((queryFinishedTs - startTs) > 1200) {
                this.logger.warn('long QuickFirestore read', `${queryFinishedTs - startTs}ms`, {
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, JSON.stringify(queryObj), getUrl)
            }

            return parsedResult

        }
        catch (e) {
            const queryFinishedTs = Date.now()
            if(e.response) {
                this.logger.error({
                    statusCode: e.response.status,
                    message: e.response.statusText,
                    callType: 'executeReadBlindly',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs,
                }, e.response.data)
            }
            else {
                this.logger.error({
                    statusCode: '500',
                    message: 'please check server logs for details of this error',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs,
                }, e)
            }
            if(!this.config.softLogErrors) {
                throw e
            }
        }
        return null
    }

    /**
        Create

        Execute Create Blindly

        Run a create without any additional validations. Trust the caller.
    */
    public create = async (collection:string, documentId:string, documentObj:any): Promise<any> => {

        const { token, startTs, tokenCreatedTs } = firestoreToken(this.config)

        try {

            await this.axios.post(
                `${this.config.firestore.apiUrl}/v1/projects/${this.config.firestore.projectName}/databases/${this.config.firestore.databaseName}/documents/${collection}?documentId=${documentId}`,
                typedValues.encodeDocument(documentId, documentObj),
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const resultData = documentObj

            const queryFinishedTs = Date.now()

            if((queryFinishedTs - startTs) > 1200) {
                this.config.warn('long QuickFirestore create', `${queryFinishedTs - startTs}ms`, {
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, documentId, JSON.stringify(documentObj))
            }

            return resultData

        }
        catch (e) {
            const queryFinishedTs = Date.now()
            if(e.response) {
                this.config.error({
                    statusCode: e.response.status,
                    message: e.response.statusText,
                    callType: 'executeCreateBlindly',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, e.response.data)
            }
            else {
                this.config.error({
                    statusCode: '500',
                    message: 'please check server logs for details of this error',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, e)
            }
            throw e
        }
    }

    /**
        Update

        Execute Update Blindly

        Run a update without any additional validations. Trust the caller.
    */
    public update = async (collection:string, id:string, documentObj:any): Promise<any> => {

        const { token, startTs, tokenCreatedTs } = firestoreToken(this.config)

        try {

            const updateMaskQueryString = typedValues.encodeUpdateMask(documentObj, {asQueryString:true})
            const url = `${this.config.firestore.projectName}/databases/${this.config.firestore.databaseName}/documents/${collection}/${id}?${updateMaskQueryString}`
            const data = typedValues.encodeDocument(id, documentObj)

            await axios.patch(
                url,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const resultData = id

            const queryFinishedTs = Date.now()

            if((queryFinishedTs - startTs) > 1200) {
                this.config.warn('long QuickFirestore update', `${queryFinishedTs - startTs}ms`, {
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs
                }, collection, JSON.stringify(documentObj))
            }

            return resultData
        }
        catch (e) {
            const queryFinishedTs = Date.now()
            if(e.response) {
                this.config.error({
                    statusCode: e.response.status,
                    message: e.response.statusText,
                    callType: 'executeUpdateBlindly',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs,
                }, e.response.data)
            }
            else {
                this.config.error({
                    statusCode: '500',
                    message: 'please check server logs for details of this error',
                    tokenDelayMs: tokenCreatedTs - startTs,
                    queryDelayMs: queryFinishedTs - tokenCreatedTs,
                }, e)
            }
            throw e
        }
    }

}
export default QuickFirestore
