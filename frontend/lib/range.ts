export function range(start: number, end?: number, step: number = 1): number[] {
  // If only one argument is provided, treat it as the end value
  if (end === undefined) {
    end = start;
    start = 0;
  }

  // Return empty array if step is 0 or if range is invalid
  if (step === 0 || (start < end && step < 0) || (start > end && step > 0)) {
    return [];
  }

  const result: number[] = [];

  if (start < end) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}
