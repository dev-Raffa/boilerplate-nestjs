import { Validate } from '../Validate/validate.decorator';
import { NumberValidator } from '../../validators/number/number.validator';

interface maxDecorator {
  errorMsg: string;
  options: {
    max: number;
  };
}

export function max(args: { max: number; errorMsg?: string }) {
  return Validate<maxDecorator>(new NumberValidator(), {
    errorMsg: args.errorMsg
      ? args.errorMsg
      : `the value should be lower ${args.max + 1}`,
    options: { max: args.max }
  });
}
