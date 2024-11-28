import { Validate } from '../Validate/validate.decorator';
import { NumberValidator } from '../../validators/number/number.validator';
import { numberValidatorArgs } from 'src/utils/types/numberValidatorArgs/numberValidatorArgs.type';

interface isNumberDecorator extends Pick<numberValidatorArgs, 'options'> {
  errorMsg: string;
  nullable: boolean;
}

export function isNumber(args?: Partial<isNumberDecorator>) {
  const defaultErrorMsg = args.errorMsg
    ? args.errorMsg
    : args.options.max && args.options.min
      ? `the porperty should be a numeric value greater ${args.options.min - 1} and lower ${args.options.max + 1}`
      : args.options.max
        ? `the porperty should be a numeric value lower ${args.options.max + 1}`
        : args.options.min &&
          `the porperty should be a numeric value greater ${args.options.min - 1}`;

  return Validate<isNumberDecorator>(new NumberValidator(), {
    errorMsg: args.errorMsg ? args.errorMsg : defaultErrorMsg,
    options: {
      min: args.options.min,
      max: args.options.max
    },
    nullable: args.nullable || false
  });
}
