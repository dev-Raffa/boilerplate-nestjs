import { Validator } from '../validator';
import { numberValidatorArgs } from '../../../utils/types/numberValidatorArgs/numberValidatorArgs.type';

export class NumberValidator implements Validator {
  validate(args: numberValidatorArgs): string | void {
    if (args.options.min && args.value < args.options.min) {
      return args.msgError;
    }

    if (args.options.max && args.value > args.options.max) {
      return args.msgError;
    }
  }
}
