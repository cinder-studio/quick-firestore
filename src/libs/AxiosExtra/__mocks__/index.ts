
let jestRequestFn

export const axios = {
    __setJestAxiosRequestFn: (inFn) => {
        jestRequestFn = inFn
    }
}

export function axiosCreate(config: any) {
    return {
        get: (url) => {
            return jestRequestFn(url, 'get', null)
        },
        post: (url, data) => {
            return jestRequestFn(url, 'post', data)
        },
        put: (url, data) => {
            return jestRequestFn(url, 'put', data)
        },
        patch: (url, data) => {
            return jestRequestFn(url, 'patch', data)
        },
        delete: (url, data) => {
            return jestRequestFn(url, 'delete', data)
        }
    }
}
