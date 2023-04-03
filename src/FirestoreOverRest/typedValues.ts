import * as querystring from "querystring"

class Singleton {

    public encodeArray = (value:any) => {
        return {
            arrayValue: {
                values: value.map(item=>this.encodeValue(item))
            }
        }
    }

    public encodeMap = (value:any) => {
        return {
            mapValue: {
                fields: ((()=>{
                    const newMap = {}
                    for(const key of Object.keys(value)) {
                        newMap[key] = this.encodeValue(value[key])
                    }
                    return newMap
                })())
            }
        }
    }

    public encodeValue = (value:any) => {
        const typeF = Object.prototype.toString.call(value)
        switch(typeF) {
            case "[object Undefined]":
            case "[object Null]":
                return { nullValue: null }
                break
            case "[object Number]":
                if(value % 1 === 0) {
                    return { integerValue: value }
                } else {
                    return { doubleValue: value }
                }
                break
            case "[object Boolean]":
                return { booleanValue: value }
                break
            case "[object Array]":
                return this.encodeArray(value)
                break
            case "[object Object]":
                return this.encodeMap(value)
                break
            case "[object String]":
            default:
                return { stringValue: value }
                break
            //case "[object Date]":
            //    return TODO date as a string
            //    break
            //case "bytesValue":
            //case "referenceValue":
            //case "geoPointValue":
        }
    }

    public encodeDocument = (documentId:string, value:any) => {
        return {
            // This is placed by the DB name: documentId,
            fields: ((()=>{
                const newMap = {}
                for(const key of Object.keys(value)) {
                    newMap[key] = this.encodeValue(value[key])
                }
                return newMap
            })())
        }
    }

    public encodeUpdateMask = (value:any, options?:any) => {
        const updateMask = {
            fieldPaths: ((()=>{
                const fieldMask = []
                for(const key of Object.keys(value)) {
                    if (!(options && options.excludeFromUpdateMask && options.excludeFromUpdateMask.includes(key))) {
                        fieldMask.push(key)
                    }
                }
                return fieldMask
            })())
        }
        if(options && options.asQueryString) {
            return querystring.stringify({ ['updateMask.fieldPaths']: updateMask.fieldPaths })//.replace(/\.fieldPaths/gi,'[fieldPaths]')
        }
        return updateMask
    }
}

const singletonInstance = new Singleton()

export default singletonInstance
