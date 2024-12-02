export async function measureTime<T>(
  callback: () => T | Promise<T>,
  label: string
): Promise<T> {
  const start = performance.now();
  const result = await callback();
  const end = performance.now();
  console.log(`${label} is: ${result}, took: ${end - start}ms`);
  return result;
}
