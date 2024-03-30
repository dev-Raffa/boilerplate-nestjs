import { lengthValidatorArgs } from '../../../utils/types/lengthValidtorArgs/lengthValidatorArgs.type';
import { Validator } from '../validator';

export class LengthValidator implements Validator {
  validate(args: lengthValidatorArgs): string | void {
    if (args.options.min && args.value.length < args.options.min) {
      return args.msgError;
    }

    if (args.options.max && args.value.length > args.options.max) {
      return args.msgError;
    }

    return;
  }
}
