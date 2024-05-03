import { stringValidatorArgs } from '../../types/stringValidtorArgs/stringValidatorArgs.type';
import { Validator } from '../validator';

export class StringValidator implements Validator {
  validate(args: stringValidatorArgs): boolean {
    if (
      (args.options.min && args.value.length < args.options.min) ||
      (args.options.max && args.value.length > args.options.max)
    ) {
      return false;
    }

    return true;
  }
}
