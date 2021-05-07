import axios from "axios"
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

import QuickFirestore, { QuickQuery } from "./index"

const quickFs = new QuickFirestore({
    firestore: {
        projectName:'mockProjectYx',
        jwt: {
            clientEmail:'',
            privateKeyId:'',
            privateKey:'',
        },
        isUnitTesting:true,
    }
})

// make sure all test counters reset after each test
////////////////////////////////////////////////////
afterEach(jest.clearAllMocks)
////////////////////////////////////////////////////

test('config defaults', async () => {
    expect(quickFs.config.firestore.projectName).toBe('mockProjectYx')
    expect(quickFs.config.firestore.isUnitTesting).toBe(true)
    expect(quickFs.config.firestore.databaseName).toBe('(default)')
    expect(quickFs.config.firestore.apiUrl).toBe('https://firestore.googleapis.com')
    expect(quickFs.config.firestore.softLogErrors).toBe(false)
    expect(quickFs.config.firestore.overrideAxiosConfig).toBe(undefined)

    expect(quickFs.config.logger).not.toBe(undefined)
    expect(quickFs.config.overrideQueryValidator).not.toBe(undefined)
    expect(quickFs.config.overrideCreateTransform).not.toBe(undefined)
    expect(quickFs.config.overrideUpdateTransform).not.toBe(undefined)
    expect(quickFs.config.overrideIdCreator).not.toBe(undefined)
})

test("query", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents:runQuery')
        return {
            "data": [
                {
                    "document": {
                        "name": "projects/mockProjectYx/databases/(default)/documents/mockCollectionUwe/34f3aaf4aw4wa",
                        "fields": {
                            "email": {
                                "stringValue": "mockXpe@example.com"
                            },
                            "name": {
                                "stringValue": "Mock XPE"
                            },
                        },
                        "createTime": "1970-01-01T00:00:01.000000Z",
                        "updateTime": "1970-01-01T00:00:01.000000Z"
                    },
                    "readTime": "1970-01-01T00:00:01.000000Z"
                },
                {
                    "document": {
                        "name": "projects/mockProjectYx/databases/(default)/documents/mockCollectionUwe/34f3aaf4aw4wa",
                        "fields": {
                            "email": {
                                "stringValue": "mockTer@example.com"
                            },
                            "name": {
                                "stringValue": "Mock TER"
                            },
                        },
                        "createTime": "1970-01-01T00:00:01.000000Z",
                        "updateTime": "1970-01-01T00:00:01.000000Z"
                    },
                    "readTime": "1970-01-01T00:00:01.000000Z"
                }
            ]
        }
    })

    const result = await quickFs.query(QuickQuery.collection('mockCollectionUwe').select( 'email', 'name' ).limit(2).prepare())

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.length).toBe(2)
    expect(result[0].email).toBe('mockXpe@example.com')
    expect(result[0].name).toBe('Mock XPE')
    expect(result[1].email).toBe('mockTer@example.com')
    expect(result[1].name).toBe('Mock TER')
})

test("query validation", async () => {
    const errors = []
    try {
        await quickFs.query(QuickQuery.collection('mockCollectionUwe').limit(2).prepare())
    } catch (e) {
        errors.push(e)
    }
    expect(errors.length > 0).toBe(true)
    expect(errors[0].message).toBe('every quickread query must have a "select" projection')
})

test("read", async () => {
    mockedAxios.get.mockImplementationOnce( async (url) => {
        console.log('get called', url)
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents/mockCollectionLew/mockIdEwc')
        return {
            "data": {
                "name": "projects/mockProjectYx/databases/(default)/documents/mockCollectionLew/mockIdEwc",
                "fields": {
                    "email": {
                        "stringValue": "mockIdEwc@example.com"
                    },
                    "name": {
                        "stringValue": "Mock EWC"
                    },
                },
                "createTime": "1970-01-01T00:00:01.000000Z",
                "updateTime": "1970-01-01T00:00:01.000000Z"
            }
        }
    })

    const result = await quickFs.read({
        collection: 'mockCollectionLew',
        name: 'mockIdEwc'
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(result.email).toBe('mockIdEwc@example.com')
    expect(result.name).toBe('Mock EWC')
})

test("create with default transform", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents/mockCollectionPuz?documentId=mockIdMur')
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {status:'success'}
    })

    const result = await quickFs.create(
        'mockCollectionPuz',
        {
            mockField:'mockFieldDataLde',
            mockField2:'mockFieldDataUre'
        },
        'mockIdMur'
    )

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.mockField).toBe('mockFieldDataLde')
    expect(result.mockField2).toBe('mockFieldDataUre')
    expect(result.id).toBe('mockIdMur')
    expect(result.createdAt > 0).toBe(true)
    expect(result.updatedAt > 0).toBe(true)
    expect(result.deletedAt).toBe(null)
})

test("create with default ID creation", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        expect(url).not.toBe('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents/mockCollectionPuz?documentId=mockIdMur')
        expect(url.startsWith('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents/mockCollectionPuz?documentId=')).toBe(true)
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {status:'success'}
    })

    const result = await quickFs.create(
        'mockCollectionPuz',
        {
            mockField:'mockFieldDataLde',
            mockField2:'mockFieldDataUre'
        }
    )

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.mockField).toBe('mockFieldDataLde')
    expect(result.mockField2).toBe('mockFieldDataUre')
    expect(result.id).not.toBe('mockIdMur')
    expect(result.id.length > 8).toBe(true)
    expect(result.createdAt > 0).toBe(true)
    expect(result.updatedAt > 0).toBe(true)
    expect(result.deletedAt).toBe(null)
})

test("update with default transform", async () => {
    mockedAxios.patch.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectYx/databases/(default)/documents/mockCollectionOre/mockIdXrs?updateMask.fieldPaths=mockField2&updateMask.fieldPaths=mockField3&updateMask.fieldPaths=updatedAt')
        expect(data.fields.updatedAt.integerValue > 0).toBe(true)
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {status:'success'}
    })

    const result = await quickFs.update(
        'mockCollectionOre',
        'mockIdXrs',
        {
            mockField2:'mockFieldDataPwt',
            mockField3:'mockFieldDataNex'
        }
    )

    expect(mockedAxios.patch).toHaveBeenCalledTimes(1)
    expect(result).toBe('mockIdXrs')
})
