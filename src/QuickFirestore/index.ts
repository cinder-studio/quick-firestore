import FirestoreOverRest from "../FirestoreOverRest"
import IQuickFirestoreConfig from "./IQuickFirestoreConfig"
import * as short from "short-uuid"
import QuickQueryBuilder from "../QuickQuery"

const defaultConfig:IQuickFirestoreConfig = {

    // firestore config

    firestore: {
        projectName:'',
        databaseName:'(default)',
        apiUrl:'https://firestore.googleapis.com',
        jwt: {
            clientEmail:'',
            privateKeyId:'',
            privateKey:'',
        },
        isUnitTesting:false,
        softLogErrors:false,
    },

    // logging control

    logger: console,

    // validation tools

    overrideQueryValidator:(queryObj:any, options?:any) : any => {
        const query = queryObj
        if((!query.select || !query.select.fields || query.select.fields.length < 1) && (!options || !options.skipSelectValidation)) {
            throw new Error('every quickread query must have a "select" projection')
        }
        if(!query.from || query.from.length !== 1) {
            throw new Error('every quickread query must have a singular "from" value')
        }
        if(!query.limit) {
            query.limit = 160
        }
        return query
    },
    overrideCreateTransform:(obj:any, documentId:string)=>({
        ...obj,
        id: documentId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        deletedAt: null
    }),
    overrideUpdateTransform:(obj:any)=>({
        ...obj,
        updatedAt: Date.now()
    }),
    overrideIdCreator:()=>(
        short(short.constants.flickrBase58).new()
    )
}

class QuickFirestore {

    public config:IQuickFirestoreConfig
    public restyFirestore:FirestoreOverRest

    constructor(config:IQuickFirestoreConfig) {
        // keep this constructor as thin and fast as possible

        // setup the config
        this.config = {
            firestore: config.firestore,
            logger: defaultConfig.logger,
            overrideQueryValidator: defaultConfig.overrideQueryValidator,
            overrideCreateTransform: defaultConfig.overrideCreateTransform,
            overrideUpdateTransform: defaultConfig.overrideUpdateTransform,
            overrideIdCreator: defaultConfig.overrideIdCreator,
        }
        if(config.logger) { this.config.logger = config.logger }
        if(config.overrideQueryValidator) { this.config.overrideQueryValidator = config.overrideQueryValidator }
        if(config.overrideCreateTransform) { this.config.overrideCreateTransform = config.overrideCreateTransform }
        if(config.overrideUpdateTransform) { this.config.overrideUpdateTransform = config.overrideUpdateTransform }
        if(config.overrideIdCreator) { this.config.overrideIdCreator = config.overrideIdCreator }

        this.restyFirestore = new FirestoreOverRest(this.config.firestore, this.config.logger)
        this.config.firestore = this.restyFirestore.config
    }

    public read = async (queryObj:{collection:string,name:string,mask?:any}): Promise<any> => {
        return await this.restyFirestore.read(queryObj)
    }

    public create = async (collection:string, documentObj:any, overrideId?:string): Promise<any> => {
        // decide on the document id
        const documentId = overrideId ? overrideId : this.config.overrideIdCreator()
        // transform /enforce create data format
        const documentData = this.config.overrideCreateTransform(documentObj, documentId)
        // create and return
        return await this.restyFirestore.create(collection, documentId, documentData)
    }

    public update = async (collection:string, id:string, documentObj:any): Promise<any> => {
        // transform /enforce update data format
        const documentData = this.config.overrideUpdateTransform(documentObj)
        // create and return
        return await this.restyFirestore.update(collection, id, documentData)
    }

    public query = async (queryObj:any, options?:any): Promise<any> => {
        // validate
        const validatedQueryObj = this.config.overrideQueryValidator(queryObj, options)
        //execute
        return await this.restyFirestore.query(validatedQueryObj)
    }

    public queryOne = async (queryObj:any, options?:any): Promise<any> => {
        // validate
        const validatedQueryObj = this.config.overrideQueryValidator(queryObj, options)
        // ensure the limit is set to 1
        validatedQueryObj.limit = 1
        // now run the query
        const results = await this.restyFirestore.query(validatedQueryObj)
        if(results && results.length > 0) {
            return results[0]
        }
        return null
    }

// TODO review this deeper
///////////////////////////
//        The intention here is it should hopefully take advantage of query stacking technology @ google but i'm not sure how that works
//        with axios and google libraries. We'll need to study this further
///////////////////////////
    /**
        Queries

        Run a set of standardized queries at the same time.
    */
    public queries = (queryObjs:any[], options?:any) : Promise<any[]> => {
        // validate
        const validatedQueryObjs = queryObjs.map(queryObj=>this.config.overrideQueryValidator(queryObj, options))
        //execute
        return Promise.all(validatedQueryObjs.map(validatedQueryObj=>this.restyFirestore.query(validatedQueryObj)))
    }

}

export const QuickQuery = QuickQueryBuilder

export default QuickFirestore
