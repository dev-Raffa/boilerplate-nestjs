import { Validate } from '../Validate/validate.decorator';
import { NumberValidator } from '../../validators/number/number.validator';

interface minDecorator {
  errorMsg: string;
  options: {
    min: number;
  };
}

export function min(args: { min: number; errorMsg?: string }) {
  return Validate<minDecorator>(new NumberValidator(), {
    errorMsg: args.errorMsg
      ? args.errorMsg
      : `the value should be greater ${args.min - 1}`,
    options: { min: args.min }
  });
}
