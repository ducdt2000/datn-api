export function transformTrimSpaceData(rawInput: any): any {
  const rawKeys = Object.keys(rawInput);
  for (const rawKey of rawKeys) {
    rawInput[rawKey] =
      rawInput[rawKey] && typeof rawInput[rawKey] === 'string'
        ? rawInput[rawKey].trim()
        : rawInput[rawKey];
  }
  return rawInput;
}
