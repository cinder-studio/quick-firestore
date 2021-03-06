import axios from "axios"
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

import { buildTestFsDocument } from "./testTools"
import FirestoreOverRest, { QuickQuery } from "./index"

const restyFs = new FirestoreOverRest({
    projectName:'mockProjectZy',
    jwt: {
        clientEmail:'',
        privateKeyId:'',
        privateKey:'',
    },
    isUnitTesting:true
})

// make sure all test counters reset after each test
////////////////////////////////////////////////////
afterEach(jest.clearAllMocks)
////////////////////////////////////////////////////

test('config defaults', async () => {
    expect(restyFs.config.projectName).toBe('mockProjectZy')
    expect(restyFs.config.isUnitTesting).toBe(true)
    expect(restyFs.config.databaseName).toBe('(default)')
    expect(restyFs.config.apiUrl).toBe('https://firestore.googleapis.com')
    expect(restyFs.config.softLogErrors).toBe(false)
    expect(restyFs.config.overrideAxiosConfig).toBe(undefined)
})

test("query", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        return {
            "data": [
                buildTestFsDocument({
                    documentName: "projects/mockProjectZy/databases/(default)/documents/mockCollectionUwe/34f3aaf4aw4wa",
                    fields: {
                        email: 'mockXpe@example.com',
                        name: 'Mock XPE'
                    }
                }),
                buildTestFsDocument({
                    documentName: "projects/mockProjectZy/databases/(default)/documents/mockCollectionUwe/34f3aaf4aw4wa",
                    fields: {
                        email: 'mockTer@example.com',
                        name: 'Mock TER'
                    }
                })
            ]
        }
    })

    const result = await restyFs.query(QuickQuery.collection('mockCollectionUwe').select( 'email', 'name' ).limit(2).prepare())

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.length).toBe(2)
    expect(result[0].email).toBe('mockXpe@example.com')
    expect(result[0].name).toBe('Mock XPE')
    expect(result[1].email).toBe('mockTer@example.com')
    expect(result[1].name).toBe('Mock TER')
})

test("read", async () => {
    mockedAxios.get.mockImplementationOnce( async (url) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectZy/databases/(default)/documents/mockCollectionLew/mockIdEwc')
        return {
            "data": buildTestFsDocument({
                documentName: "projects/mockProjectZy/databases/(default)/documents/mockCollectionLew/mockIdEwc",
                fields: {
                    email: 'mockIdEwc@example.com',
                    name: 'Mock EWC'
                }
            }).document
        }
    })

    const result = await restyFs.read({
        collection: 'mockCollectionLew',
        name: 'mockIdEwc'
    })

    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(result.email).toBe('mockIdEwc@example.com')
    expect(result.name).toBe('Mock EWC')
})

test("create", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectZy/databases/(default)/documents/mockCollectionPuz?documentId=mockIdUre')
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {status:'success'}
    })

    const result = await restyFs.create(
        'mockCollectionPuz',
        'mockIdUre',
        {
            mockField:'mockFieldDataLde',
            mockField2:'mockFieldDataUre'
        }
    )

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.mockField).toBe('mockFieldDataLde')
    expect(result.mockField2).toBe('mockFieldDataUre')
})

test("update", async () => {
    mockedAxios.patch.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectZy/databases/(default)/documents/mockCollectionOre/mockIdXrs?updateMask.fieldPaths=mockField2&updateMask.fieldPaths=mockField3')
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {status:'success'}
    })

    const result = await restyFs.update(
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

test("batchWriteAtomic", async () => {
    mockedAxios.post.mockImplementationOnce( async (url, data) => {
        expect(url).toBe('https://firestore.googleapis.com/v1/projects/mockProjectZy/databases/(default)/documents:commit')
        // expect no transactions
        expect(data.transaction).toBe(undefined)
        // expect 5 writes
        expect(data.writes.length).toBe(5)
        // 2 updates
        expect(data.writes[0].currentDocument.exists).toBe(true)
        expect(data.writes[1].currentDocument.exists).toBe(true)
        // 3 creates
        expect(data.writes[2].currentDocument.exists).toBe(false)
        expect(data.writes[3].currentDocument.exists).toBe(false)
        expect(data.writes[4].currentDocument.exists).toBe(false)
// TODO this is an inaccurate mock of the true response. It may not need to be any more accurate for this test
        return {
            data: {
                writeResults: data.writes.map(write=>({
                    updateTime: '1970-01-01T00:00:01.000000Z',
                    transformResults: [] // for this test we don't need to simulate this piece. Maybe in the future we may need to
                })),
                commitTime: '1970-01-01T00:00:01.000000Z'
            }
        }
    })

    const result = await restyFs.batchWriteAtomic({
        updateDocuments: [
            {
                collection: 'mockCollectionPmq',
                id: 'mockIdPmq',
                mockField2: 'mockFieldDataPmq2',
                mockField3: 'mockFieldDataPmq3',
            },
            {
                collection: 'mockCollectionPmq',
                id: 'mockIdPmq2',
                mockField2: 'mockFieldDataPmq2-2',
                mockField3: 'mockFieldDataPmq2-3',
            }
        ],
        createDocuments: [
            {
                collection: 'mockCollectionPmq',
                id: 'mockIdPmq3',
                mockField2: 'mockFieldDataPmq3-2',
                mockField3: 'mockFieldDataPmq3-3',
            },
            {
                collection: 'mockCollectionPmq',
                id: 'mockIdPmq4',
                mockField2: 'mockFieldDataPmq4-2',
                mockField3: 'mockFieldDataPmq4-3',
            },
            {
                collection: 'mockCollectionPmq',
                id: 'mockIdPmq5',
                mockField2: 'mockFieldDataPmq5-2',
                mockField3: 'mockFieldDataPmq5-3',
            }
        ]
    })

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(result.writeResults.length).toBe(5)
})
