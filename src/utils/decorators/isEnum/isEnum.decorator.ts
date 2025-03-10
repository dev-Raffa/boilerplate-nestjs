import { EnumValidatorArgs } from 'src/utils/types/enumValidatorArgs/enumValidatorArgs.type';
import { TValidatorsOptions, Validate } from '../validate/validate.decorator';
import { EnumValidator } from 'src/utils/validators/enum/enum.validator';

interface isEnumDecorator
  extends Pick<EnumValidatorArgs, 'options'>,
    Omit<TValidatorsOptions, 'type'> {
  errorMsg: string;
}

interface isEnumDecoratorArgs
  extends Pick<isEnumDecorator, 'isArray' | 'nullable'> {
  errorMsg?: string;
  enum: { [key: string]: string | number };
}

export function isEnum(args: isEnumDecoratorArgs) {
  let values: string = '';
  Object.values(args.enum).forEach((item, index) => {
    if (index === Object.values(args.enum).length - 2) {
      values += ` ${item} ou`;
    } else if (index === Object.values(args.enum).length - 1) {
      values += ` ${item}.`;
    } else if (index === 0) {
      values += `${item},`;
    } else {
      values += ` ${item},`;
    }
  });

  console.log(values);

  const defaultErrorMsg = `the property should be a value like ${values}`;

  return Validate<isEnumDecorator>({
    validator: EnumValidator,
    isArray: args.isArray || false,
    nullable: args.nullable || false,
    validatorArgs: {
      options: {
        enum: args.enum
      },
      errorMsg: args.errorMsg || defaultErrorMsg
    }
  });
}
