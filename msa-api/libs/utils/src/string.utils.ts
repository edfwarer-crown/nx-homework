export const dateFormat = (value?: string, pattern: string = "####-##-##") => {
    let i = 0
    const date = value?.toString()

    if (!date) {
        return null
    }

    return pattern.replace(/#/g, () => date[i++])
}

export const alimtalkMessageFormat = (template: string, args: string[]): string => {
    return template.replace(/#\{(\d+)}/g, (match, index) => {
        return args[index] !== undefined ? args[index] : ""
    })
}

export const undefinedIs = (value?: string | number | boolean, defaultValue: string | number | boolean | null = null) => {
    if (value === undefined) {
        return defaultValue
    }
    return value
}

export const emptyIsNull = (value?: string | number | boolean) => {
    if (value === undefined || value === "") {
        return null
    }
    return value
}

export const convertBirthday = (yearValue: number, monthValue?: number, dayValue?: number) => {
    return `${yearValue}${(monthValue || 0).toString().padStart(2, "0")}${(dayValue || 0).toString().padStart(2, "0")}`
}
