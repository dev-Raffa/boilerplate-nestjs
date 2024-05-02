import { Validator } from '../validator';
import { numberValidatorArgs } from '../../../utils/types/numberValidatorArgs/numberValidatorArgs.type';

export class NumberValidator implements Validator {
  validate(args: numberValidatorArgs): boolean {
    if (
      (args.options.min && args.value < args.options.min) ||
      (args.options.max && args.value > args.options.max) ||
      typeof args.value !== 'number'
    ) {
      return false;
    }

    return true;
  }
}
