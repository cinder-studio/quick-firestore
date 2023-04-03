interface IBatchWrite {
    updateDocuments?:any[]
    createDocuments?:any[]
    updateOrCreateDocuments?:any[]
    writeDocuments?:any[]
    longQueryLimitMs?:number,
    excludeFromUpdateMask?:any[]
}
export default IBatchWrite
