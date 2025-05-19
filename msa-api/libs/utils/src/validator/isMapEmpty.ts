export const isNotMapEmpty = (value: any) => {
    if (value === null || value === undefined || typeof value !== "object" || !(value instanceof Map)) {
        return false
    }
    return Array.from(value.entries()).length > 0
}
