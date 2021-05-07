class Singleton {

    public translateArray = (array:any[], callerFieldKey) => {
        const result = []
        for(const field of array) {
            result.push(this.translateField(field, callerFieldKey))
        }
        return result
    }

    public translateField = (field:any, callerFieldKey) => {
        const fieldType = Object.keys(field)[0]
        switch(fieldType) {
            case "nullValue":
                return null
                break
            case "timestampValue":
                return new Date(field[fieldType])
                break
            case "mapValue":
                if(!field[fieldType].fields) {
                    return null
                    break
                }
                return this.translateMap(field[fieldType].fields, callerFieldKey)
                break
            case "arrayValue":
                if(!field[fieldType].values) {
                    return null
                    break
                }
                return this.translateArray(field[fieldType].values, callerFieldKey)
                break
            case "booleanValue":
            case "integerValue":
            case "doubleValue":
            case "stringValue":
            case "bytesValue":
            case "referenceValue":
            case "geoPointValue":
                return field[fieldType]
                break
        }
    }

    public translateMap = (mapOfFields, callerFieldKey) => {
        const result = {}
        for(const fieldKey of Object.keys(mapOfFields)) {
            result[fieldKey] = this.translateField(mapOfFields[fieldKey], callerFieldKey)
        }
        return result
    }

    public parseDocument = (inObj) => {
        return this.translateMap(inObj.document.fields, 'document')
    }

}

const singletonInstance = new Singleton()

export default singletonInstance.parseDocument
