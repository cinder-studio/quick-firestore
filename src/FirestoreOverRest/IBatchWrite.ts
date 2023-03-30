interface IBatchWrite {
    updateDocuments?:any[]
    createDocuments?:any[]
    updateOrCreateDocuments?:any[]
    writeDocuments?:any[]
    longQueryLimitMs?:number
}
export default IBatchWrite
