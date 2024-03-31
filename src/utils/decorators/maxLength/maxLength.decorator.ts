import { Validate } from '../Validate/validate.decorator';
import { LengthValidator } from '../../validators/length/length.validator';

interface maxLengthDecorator {
  errorMsg: string;
  options: {
    max: number;
  };
}

export function maxLength(args: { max: number; errorMsg?: string }) {
  return Validate<maxLengthDecorator>(new LengthValidator(), {
    errorMsg: args.errorMsg
      ? args.errorMsg
      : `the value.length should be lower ${args.max + 1}`,
    options: { max: args.max }
  });
}
