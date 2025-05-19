import {AxiosError, AxiosResponse, InternalAxiosRequestConfig, isAxiosError} from "axios"

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const {method, url, data, params} = config
    console.log(`🛫 [API - REQ] ${method?.toUpperCase()} ${url}`)
    console.log(`   [API- REQ] ${data} ${params}`)

    return config
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
    const {status, statusText} = res
    const {method, url} = res.config

    if (status !== 200) {
        console.log(`🚨 [API - ERR] ${method?.toUpperCase()} ${url} | ${statusText}`)
    }

    const data = res.data
    const {apiCode, message} = data
    console.log(`🛬 [API - RES] ${method?.toUpperCase()} ${url} | ${apiCode} : ${message}`)

    return res
}

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (isAxiosError(error)) {
        const {method, url} = error.config as InternalAxiosRequestConfig
        if (error.response) {
            const {statusCode, message} = error.response.data
            console.log(`🚨 [API - ERR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`)
        }
    } else {
        console.log(`🚨 [API] | ERR ${error.message}`)
    }
    return Promise.reject(error)
}

export {onRequest, onResponse, onError}
