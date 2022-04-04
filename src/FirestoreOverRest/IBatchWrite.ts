interface IBatchWrite {
    updateDocuments:any[]
    createDocuments?:any[]
    writeDocuments?:any[]
    longQueryLimitMs?:number
}
export default IBatchWrite
