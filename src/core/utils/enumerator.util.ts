export class EnumeratorUtil {
    static getEnumValuesArray<T>(enumerator: T, valuesType: 'string' | 'number'): Array<number | string> {
        return Object.values(enumerator).filter((value: string | number): boolean => typeof value === valuesType);
    }
}