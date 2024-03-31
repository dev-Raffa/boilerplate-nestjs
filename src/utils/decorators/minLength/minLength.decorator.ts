import { Validate } from '../Validate/validate.decorator';
import { LengthValidator } from '../../../utils/validators/length/length.validator';

interface minLengthDecorator {
  errorMsg: string;
  options: {
    min: number;
  };
}

export function minLength(args: { min: number; errorMsg?: string }) {
  return Validate<minLengthDecorator>(new LengthValidator(), {
    errorMsg: args.errorMsg
      ? args.errorMsg
      : `the value.length should be greater ${args.min - 1}`,
    options: { min: args.min }
  });
}
