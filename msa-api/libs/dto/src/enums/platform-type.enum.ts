export const Platform = {
    PARTNER_WEB: "PARTNER_WEB",
    PARTNER_APP: "PARTNER_APP",
    USER_WEB: "USER_WEB",
    USER_APP: "USER_APP",
    // PARTNER_LANDING = "PARTNER_LANDING",
    // USER_LANDING = "USER_LANDING",
}

export type PlatformType = keyof typeof Platform

export const PlatformNames: Record<PlatformType, string> = {
    PARTNER_WEB: "파트너 웹",
    PARTNER_APP: "파트너 앱",
    USER_WEB: "유저 웹",
    USER_APP: "유저 앱",
}

export const PlatformTypeTags: Record<PlatformType, string> = {
    PARTNER_WEB: "PPD",
    PARTNER_APP: "PPA",
    USER_WEB: "PUW",
    USER_APP: "PUA",
}

// Function to get the title for a given PlatformType
export function getPlatformName(platform: PlatformType): string {
    return PlatformNames[platform]
}

// Function to get the tag for a given PlatformType
export function getPlatformTag(platform: PlatformType): string {
    return PlatformTypeTags[platform]
}
