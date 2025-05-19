import {IndicesIndexSettingsKeys} from "@elastic/elasticsearch/lib/api/types"

export class AppConfig {
    frontUrl: string
    deepLinkUrlPrefix: string
    jsonRepositoryUrl: string
}

export type IamportConfig = {
    uuid?: string
    key: string
    secret: string
    endpoint: string
}

export interface EncryptionConfig {
    key: string

    iv: string

    method: string
}

export type AwsConfig = {
    cdn: string
    region: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
}

export interface SlackConfigs {
    [key: string]: SlackConfig
}

export interface SlackConfig {
    url: string
}

export interface ExternApi {
    url: string

    key: string

    [key: string]: string
}

export type ExternApiConfig = {
    [key: string]: ExternApi
}

export type JwtConfig = {
    secret: string
    admin: string
}

export class DefaultPaymentConfig {
    account: string
    secret: string
}

export class NicepaymentsBillingConfig extends DefaultPaymentConfig {}

export type MainpayPaymentConfig = DefaultPaymentConfig & {
    billAccount: string
    billSecret: string
    apiUrl: string
    relayUrl: string
    approvalUrl: string
    closeUrl: string
}

export type MongoConfig = {
    host?: string
    port?: string | number
    username?: string
    password?: string
}

export type EngineElasticsearchConfig = {
    url: string
    settings: IndicesIndexSettingsKeys
}

export type KakaoAlimtalkConfig = {
    url: string
    authorizationKey: string
    senderKey: string
    smsSndNum: string
    smsKind: string
}

export type CacheConfig = {
    host: string
    port: number
    user: string | null
    password: string | null
    ttl: number
}

export type KakaoLoginConfig = {
    kakaoClientId: string
    kakaoCallbackUri: string
}
