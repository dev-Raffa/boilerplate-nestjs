import { EnumValidatorArgs } from 'src/utils/types/enumValidatorArgs/enumValidatorArgs.type';

export class EnumValidator {
  static validate(args: EnumValidatorArgs): boolean {
    const enumType = args.options.enum;

    return Object.values(enumType).includes(args.value);
  }
}
