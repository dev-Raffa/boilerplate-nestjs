import { Validate } from '../Validate/validate.decorator';
import { StringValidator } from '../../validators/string/string.validator';

interface isStringDecorator {
  errorMsg: string;
  nullable: boolean;
  options?: {
    maxLength?: number;
    minLength?: number;
  };
}

export function isString(args?: Partial<isStringDecorator>) {
  const defaultErrorMsg: string =
    args.options.minLength && args.options.maxLength
      ? `The text should contain more than ${args.options.minLength - 1} characters and fewer than ${args.options.maxLength + 1} characters`
      : args.options.minLength
        ? `the text should contain more than ${args.options.minLength - 1} characters`
        : args.options.maxLength &&
          `the text should contain fewer than ${args.options.maxLength + 1} characters`;

  return Validate<isStringDecorator>(new StringValidator(), {
    errorMsg: args.errorMsg || defaultErrorMsg,
    nullable: args.nullable || false,
    options: {
      minLength: args.options.minLength,
      maxLength: args.options.maxLength
    }
  });
}
