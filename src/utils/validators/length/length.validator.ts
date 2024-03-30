import { lengthValidatorArgs } from '../../../utils/types/lengthValidtorArgs/lengthValidatorArgs.type';
import { Validator } from '../validator';

export class LengthValidator implements Validator {
  validate(args: lengthValidatorArgs): boolean {
    if (args.options.min) {
      return args.value.length >= args.options.min;
    }

    if (args.options.max) {
      return args.value.length <= args.options.max;
    }
  }
}
