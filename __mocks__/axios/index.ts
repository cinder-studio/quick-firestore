import axios from "axios"

const mockAxios = {
    get: jest.fn(),// (url) => any,
    post: jest.fn(),// (url, data) => any
    put: jest.fn(),// (url, data) => any
    patch: jest.fn(),// (url, data) => any
    delete: jest.fn(),// (url, data) => any
    interceptors: {
        request: {
            use: jest.fn()
        },
        response: {
            use: jest.fn()
        }
    }
}

export default {
    ...mockAxios,
    create: (config) => {
        return mockAxios
    }
}
