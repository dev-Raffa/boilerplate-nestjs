import { stringValidatorArgs } from '../../types/stringValidtorArgs/stringValidatorArgs.type';
import { Validator } from '../validator';

export class StringValidator implements Validator {
  validate(args: stringValidatorArgs): boolean {
    if (
      (args.options.minLength !== undefined &&
        args.value.length < args.options.minLength) ||
      (args.options.maxLength !== undefined &&
        args.value.length > args.options.maxLength)
    ) {
      return false;
    }
    return true;
  }
}
