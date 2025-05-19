export abstract class Validator<T> {
    abstract isValid(data: T): Promise<boolean> | boolean
}
