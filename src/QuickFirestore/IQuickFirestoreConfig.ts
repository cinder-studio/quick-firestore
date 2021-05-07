import IFirestoreOverRestConfig from "../IFirestoreOverRestConfig"
import ILogger from "../ILogger"

interface IQuickFirestoreConfig {

    // required

    firestore:IFirestoreOverRestConfig

    // optional

    logger?: ILogger,
    overrideQueryValidator?:(queryObj:any)=>string
    overrideCreateTransform?:(obj:any, documentId:string)=>any
    overrideUpdateTransform?:(obj:any)=>any
    overrideIdCreator?:()=>string
}
export default IQuickFirestoreConfig
