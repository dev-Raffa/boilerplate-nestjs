import { Validator } from '../validator';
import { numberValidatorArgs } from '../../../utils/types/numberValidatorArgs/numberValidatorArgs.type';

export class NumberValidator implements Validator {
  validate(args: numberValidatorArgs): boolean {
    if (args.options.min) {
      return args.value >= args.options.min;
    }

    if (args.options.max) {
      return args.value <= args.options.max;
    }
  }
}
