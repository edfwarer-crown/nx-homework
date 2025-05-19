const _f: Array<(string: string) => string> = [
    (string) => (_hasJong(string) ? "을" : "를"), // 을/를 구분
    (string) => (_hasJong(string) ? "은" : "는"), // 은/는 구분
    (string) => (_hasJong(string) ? "이" : "가"), // 이/가 구분
    (string) => (_hasJong(string) ? "과" : "와"), // 와/과 구분
    (string) => (_hasJong(string) ? "으로" : "로"), // 으로/로 구분
]

// prettier-ignore
const _formats: {[key: string]: (string: string) => string} = {
    "을/를": _f[0],
    "을": _f[0],
    "를": _f[0],
    "을를": _f[0],
    "은/는": _f[1],
    "은": _f[1],
    "는": _f[1],
    "은는": _f[1],
    "이/가": _f[2],
    "이": _f[2],
    "가": _f[2],
    "이가": _f[2],
    "와/과": _f[3],
    "와": _f[3],
    "과": _f[3],
    "와과": _f[3],
    "으로/로": _f[4],
    "으로": _f[4],
    "로": _f[4],
    "으로로": _f[4],
}

function _hasJong(string: string): boolean {
    // string의 마지막 글자가 받침을 가지는지 확인
    const lastCharCode = string.charCodeAt(string.length - 1)
    return (lastCharCode - 0xac00) % 28 > 0
}

export const josa = {
    c: (word: string, format: string): string => {
        if (typeof _formats[format] === "undefined") throw new Error("Invalid format!")
        return _formats[format](word)
    },
    r: (word: string, format: string): string => {
        return word + josa.c(word, format)
    },
}
