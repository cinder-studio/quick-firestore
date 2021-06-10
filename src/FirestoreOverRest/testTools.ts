
// give the caller access to typedValues if they want it
import  typedValues from "./typedValues"
export { default as typedValues } from "./typedValues"

// give the caller the ability to build a test document
export const buildTestFsDocument = (options:{documentName?:string, fields:any}) => {
    return {
        "document": {
            "name": options.documentName ? options.documentName : 'mock-firestore-document-name',
            ...typedValues.encodeDocument(undefined, options.fields),
            "createTime": "1970-01-01T00:00:01.000000Z", // hard-coded because using "now" in unit tests causes instability. We also don't recommend using these fields for actually tracking createdAt and updatedAt data.
            "updateTime": "1970-01-01T00:00:01.000000Z" // hard-coded because using "now" in unit tests causes instability. We also don't recommend using these fields for actually tracking createdAt and updatedAt data.
            },
        "readTime": "1970-01-01T00:00:01.000000Z" // hard-coded because using "now" in unit tests causes instability. We also don't recommend using these fields for actually tracking createdAt, updatedAt, and readAt data.
    }
}

export const objToFsDocument = (obj:any) => {
    return buildTestFsDocument({fields:obj})
}

export const arrToFsDocuments = (arr:any[]) => {
    return arr.map(obj=>objToFsDocument(obj))
}

// TODO write a unit test for this

export const FSDocument = {
    create: buildTestFsDocument,
    fromObj: objToFsDocument,
    fromArr: arrToFsDocuments
}
