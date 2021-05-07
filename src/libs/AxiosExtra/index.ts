import axios from "axios"

function addTimerInterceptors(axiosInstance: any) {

    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config: any) => {
            config._localtimers = {
                start: Date.now(),
            }
            return config;
        },
        (error: any) => {
            error._localtimers = {
                start: (error.config && error.config._localtimers) ? error.config._localtimers.start : Date.now(),
                end: Date.now(),
            }
            error._localtimers.elapsed = error._localtimers.end - error._localtimers.start
            return Promise.reject(error);
        },
    )

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (response: any) => {
            response._localtimers = {
                start: response.config._localtimers.start,
                end: Date.now(),
            }
            response._localtimers.elapsed = response._localtimers.end - response._localtimers.start
            return response;
        },
        (error: any) => {
            error._localtimers = {
                start: (error.config && error.config._localtimers) ? error.config._localtimers.start : Date.now(),
                end: Date.now(),
            }
            error._localtimers.elapsed = error._localtimers.end - error._localtimers.start
            return Promise.reject(error);
        },
    )

}

export const axiosHttpAdapter = require('axios/lib/adapters/http')

export { axios as axios }
export function axiosCreate(config: any) {
    const instance = axios.create(config)
    addTimerInterceptors(instance)
    return instance
}
