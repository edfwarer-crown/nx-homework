import {TransformFnParams} from "class-transformer/types/interfaces/metadata/transform-fn-params.interface"

export const alwaysShouldBeArray = ({value, key, obj, type}: TransformFnParams) => {
    if (typeof value === "string") {
        value = JSON.parse(value)
    }

    if (Array.isArray(value)) {
        if (typeof value?.[0] === "string") {
            return value.map((vv) => JSON.parse(vv))
        }
        return value
    } else {
        return [value]
    }
}
