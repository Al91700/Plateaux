export declare class LocalStorage {
    protected platformId: Object;
    constructor(platformId: Object);
    getItem<T = any>(index: string): null | T;
    setItem(index: string, value: any): void;
    removeItem(index: string): void;
    clear(): void;
}
