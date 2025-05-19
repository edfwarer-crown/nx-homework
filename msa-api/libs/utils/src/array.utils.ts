export type IsDuplicate<T> = (a: T, b: T) => boolean
export const removeDuplicate = <TItems>(collection: TItems[], isDuplicate: IsDuplicate<TItems>) => collection.filter((item, index, items: TItems[]) => items.findIndex((secondItem) => isDuplicate(item, secondItem)) === index)
