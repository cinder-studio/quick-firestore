import * as querystring from "querystring"
import typedValues from "./typedValues"

const inputValue = {
    undVal: undefined,
    nulVal: null,
    intVal: 23,
    douVal: 85.23123,
    strVal: 'test value',
    bolVal: false,
    bolVal2: true,
    arrVal: [
        'test str',
        123,
        false
    ],
    mapVal: {
        key1: 'abcd',
        key2: [
            'test abcd',
            321,
            true,
            {
                subArrKey: 'test'
            }
        ],
        key3: {
            something: 'abcd',
            subsubMap: {
                anotherKey: 123
            }
        }
    }
}

test("verify translation happens correctly", async () => {
    const inputId = 'mock-test-document'

    const result = typedValues.encodeDocument(inputId, inputValue)

    const expectedResult = '{"fields":{"undVal":{"nullValue":null},"nulVal":{"nullValue":null},"intVal":{"integerValue":23},"douVal":{"doubleValue":85.23123},"strVal":{"stringValue":"test value"},"bolVal":{"booleanValue":false},"bolVal2":{"booleanValue":true},"arrVal":{"arrayValue":{"values":[{"stringValue":"test str"},{"integerValue":123},{"booleanValue":false}]}},"mapVal":{"mapValue":{"fields":{"key1":{"stringValue":"abcd"},"key2":{"arrayValue":{"values":[{"stringValue":"test abcd"},{"integerValue":321},{"booleanValue":true},{"mapValue":{"fields":{"subArrKey":{"stringValue":"test"}}}}]}},"key3":{"mapValue":{"fields":{"something":{"stringValue":"abcd"},"subsubMap":{"mapValue":{"fields":{"anotherKey":{"integerValue":123}}}}}}}}}}}}'

    expect(JSON.stringify(result)).toBe(expectedResult)
})

test("verify the update mask query string calculates correctly", async () => {
    const updateMaskObj = typedValues.encodeUpdateMask(inputValue)
    const expectedMaskObj = '{"fieldPaths":["undVal","nulVal","intVal","douVal","strVal","bolVal","bolVal2","arrVal","mapVal"]}'
    expect(JSON.stringify(updateMaskObj)).toBe(expectedMaskObj)

    const updateMaskQueryString = typedValues.encodeUpdateMask(inputValue, {asQueryString:true})
    const expectedQueryString = 'updateMask.fieldPaths=undVal&updateMask.fieldPaths=nulVal&updateMask.fieldPaths=intVal&updateMask.fieldPaths=douVal&updateMask.fieldPaths=strVal&updateMask.fieldPaths=bolVal&updateMask.fieldPaths=bolVal2&updateMask.fieldPaths=arrVal&updateMask.fieldPaths=mapVal'
    expect(updateMaskQueryString).toBe(expectedQueryString)
})
