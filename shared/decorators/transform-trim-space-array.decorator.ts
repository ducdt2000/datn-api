import { Transform } from 'class-transformer';

export function TransformTrimSpaceArray(): PropertyDecorator {
  return Transform((param) => {
    const valueParam = param.value;

    if (Array.isArray(valueParam) && valueParam.length) {
      valueParam.forEach((value, index) => {
        if (value && typeof value == 'string') {
          valueParam[index] = value.trim();
        }
      });
    }

    return valueParam;
  });
}
