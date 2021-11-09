declare interface Fn<T = any, R = T> {
    (...arg: T[]): R
}

declare interface Obj<T = any> {
    [key: string]: T
    [key: number]: T
}

declare type Nullable<T> = T | null

declare type NonNullable<T> = T extends null | undefined ? never : T

declare type RefType<T> = T | null

declare type Indexable<T extends any = any> = {
    [key: string]: T
}

declare type Recordable<T extends any = any> = Record<string, T>

declare type ReadonlyRecordable<T extends any = any> = {
    readonly [key: string]: T
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare type IntervalHandle = ReturnType<typeof setInterval>

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
