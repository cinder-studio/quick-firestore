class QuickQuery {

    private hasBeenPrepared = false
    private query:any = {}

    constructor(collectionName) {
        this.from(collectionName)
    }

    public from = (collectionName) => {
        this.query.from = [ { collectionId: collectionName } ]
        return this
    }

    public select = (...listOfFieldNames) => {
        this.query.select = {
            fields: listOfFieldNames.map(fieldName =>({fieldPath:fieldName}))
        }
        return this
    }

    public selectWithCommonFields = (...listOfFieldNames) => {
        const fieldsSelected = [
            ...listOfFieldNames,
            'id','createdAt','updatedAt','deletedAt'
        ]
        this.query.select = {
            fields: fieldsSelected.map(fieldName =>({fieldPath:fieldName}))
        }
        return this
    }

    public limit = (limit) => {
        this.query.limit = limit
        return this
    }

    public whereComposite = (fieldPath, operation, valueType?, value?) => {

        if(!this.query.where) {
            this.query.where = {
                compositeFilter: {
                    filters: [],
                    op: 'AND'
                }
            }
        }

        if(operation === 'IS_NULL' || operation === 'IS_NOT_NULL' || operation === 'IS_NAN' || operation === 'IS_NOT_NAN' ) {
            this.query.where.compositeFilter.filters.push({
                unaryFilter: {
                    field: { fieldPath: fieldPath },
                    op: operation
                }
            })
        }
        else if(valueType === 'arrayOfStrings') {
            this.query.where.compositeFilter.filters.push({
                fieldFilter: {
                    field: { fieldPath: fieldPath },
                    op: operation,
                    value: {
                        arrayValue: {
                            values: value === undefined || value === null ? [] : value.map(item=>({
                                stringValue: item
                            }))
                        }
                    }
                }
            })
        }
        else if(valueType === 'array') {
            throw new Error('currently we only support a type of "arrayOfStrings"')
        }
        else {
            this.query.where.compositeFilter.filters.push({
                fieldFilter: {
                    field: { fieldPath: fieldPath },
                    op: operation,
                    value: {[`${valueType}Value`]: value !== undefined ? value : null }
                }
            })
        }

        return this
    }

    public orderBy = (fieldPath:string, direction) => {
        if(!this.query.orderBy) {
            this.query.orderBy = []
        }
        this.query.orderBy.push({
            field: { fieldPath: fieldPath },
            direction: direction
        })
        return this
    }

    public paginatedAfter = (lastCursorPrepped:any[]|any|null|undefined, limitSize:number) => {
        this.query.startAt = {
            values: lastCursorPrepped,
            before: false
        }
        return this
    }

    public endBefore = (lastCursorPrepped:any[]|any|null|undefined, limitSize:number) => {
        this.query.endBefore = {
            values: lastCursorPrepped,
            before: true
        }
        return this
    }

    public prepare = () => {
        if(this.hasBeenPrepared) {
            throw new Error('preparing a previously prepared object')
        }
        this.hasBeenPrepared = true
        return JSON.parse(JSON.stringify(this.query))
    }

    public asString = () => {
        if(this.hasBeenPrepared) {
            throw new Error('preparing a previously prepared object')
        }
        this.hasBeenPrepared = true
        return JSON.stringify(this.query)
    }

}

export default {
    collection: (collectionName) => (new QuickQuery(collectionName))
}
