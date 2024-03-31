import { Validate } from '../Validate/validate.decorator';
import { NumberValidator } from '../../validators/number/number.validator';

interface minValueDecorator {
  errorMsg: string;
  options: {
    min: number;
  };
}

export function minValue(args: { min: number; errorMsg?: string }) {
  return Validate<minValueDecorator>(new NumberValidator(), {
    errorMsg: args.errorMsg
      ? args.errorMsg
      : `the value should be greater ${args.min - 1}`,
    options: { min: args.min }
  });
}
