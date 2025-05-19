export class VersionUtils {
    // 현재는 사용 안 하는 함수 입니다. 삭제해도 무방하지만 기존 PP 로직에 포함되어 있어 남겨놓았습니다.
    static isLaterVersion(version1: string, version2: string): boolean {
        const version1Parts = version1.split(".").map(Number) as [number, number, number]
        const version2Parts = version2.split(".").map(Number) as [number, number, number]
        const length = Math.max(version1Parts.length, version2Parts.length)

        for (let i = 0; i < length; i++) {
            const v1 = version1Parts[i] ?? 0
            const v2 = version2Parts[i] ?? 0

            if (v1 < v2) return false
            if (v1 > v2) return true
        }

        return false
    }

    /**
     * source 버전이 클 경우만 `true`로 리턴
     * @param source
     * @param target
     */
    static isVersionGreaterOrEqual(source: string, target: string): boolean {
        const v1Parts = source.split(".").map(Number) as [number, number, number]
        const v2Parts = target.split(".").map(Number) as [number, number, number]
        const length = Math.max(v1Parts.length, v2Parts.length)

        for (let i = 0; i < length; i++) {
            const v1 = v1Parts[i] ?? 0
            const v2 = v2Parts[i] ?? 0

            if (v1 > v2) return true
            if (v1 < v2) return false
        }

        return true
    }
}
