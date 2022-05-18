import { Transform } from 'class-transformer';

export function TransformToArrayTrimSpace(): PropertyDecorator {
  return Transform(({ value }) => {
    if (value instanceof Array) {
      return value
        .map((e) => e && e.trim())
        .filter((e) => e != null && e != '');
    }
    return null;
  });
}
