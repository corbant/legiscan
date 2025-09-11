export function indexedObjectToArray<T>(object: Record<string, T>): T[] {
  return Object.values(object);
}
